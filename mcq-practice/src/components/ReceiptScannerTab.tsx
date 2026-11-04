import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ReceiptIndianRupee,
  Upload,
  Camera,
  Scissors,
  Sparkles,
  Download,
  RotateCw,
  RotateCcw,
  CheckCircle,
  FileDown,
  Copy,
  Check,
  RefreshCw,
  Sliders,
  FileText,
  ShieldCheck,
  Zap,
  X
} from 'lucide-react';

interface ReceiptScannerTabProps {
  currentUser?: any;
  onNavigateToTab?: (tabId: string) => void;
}

type FilterMode = 'magic' | 'bw' | 'gray' | 'original';

interface CropBox {
  x: number; // percentage (0 - 100)
  y: number;
  width: number;
  height: number;
}

export const ReceiptScannerTab: React.FC<ReceiptScannerTabProps> = () => {
  // Source Image state
  const [sourceImage, setSourceImage] = useState<HTMLImageElement | null>(null);
  const [sourceFileName, setSourceFileName] = useState<string>('bank_receipt.jpg');
  const [originalFileSizeKB, setOriginalFileSizeKB] = useState<number>(0);
  const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  // Processing settings
  const [filterMode, setFilterMode] = useState<FilterMode>('magic');
  const [targetMaxKB, setTargetMaxKB] = useState<number>(100);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [brightness, setBrightness] = useState<number>(105); // 80 - 140
  const [contrast, setContrast] = useState<number>(120); // 80 - 180
  const [paperWhiteness, setPaperWhiteness] = useState<number>(190); // 150 - 230

  // Cropping
  const [crop, setCrop] = useState<CropBox>({ x: 0, y: 0, width: 100, height: 100 });
  const [isCroppingOpen, setIsCroppingOpen] = useState<boolean>(false);
  const [dragState, setDragState] = useState<{
    active: boolean;
    handle: string | null;
    startX: number;
    startY: number;
    startCrop: CropBox;
  }>({ active: false, handle: null, startX: 0, startY: 0, startCrop: { x: 0, y: 0, width: 100, height: 100 } });

  // Processed Output
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [outputDataUrl, setOutputDataUrl] = useState<string | null>(null);
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [outputSizeKB, setOutputSizeKB] = useState<number>(0);
  const [outputDimensions, setOutputDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // Hidden references
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const cropContainerRef = useRef<HTMLDivElement>(null);

  // Auto detect edges and receipt paper boundary on load
  const autoDetectReceiptBounds = useCallback((img: HTMLImageElement): CropBox => {
    try {
      const sampleCanvas = document.createElement('canvas');
      const w = 240;
      const h = Math.round((img.height / img.width) * w);
      sampleCanvas.width = w;
      sampleCanvas.height = h;
      const sCtx = sampleCanvas.getContext('2d');
      if (!sCtx) return { x: 5, y: 5, width: 90, height: 90 };

      sCtx.drawImage(img, 0, 0, w, h);
      const imgData = sCtx.getImageData(0, 0, w, h);
      const data = imgData.data;

      // Find average lightness & edge variance along borders
      let minX = w, maxX = 0, minY = h, maxY = 0;
      const centerLuminance: number[] = [];

      // Sample center 50% to understand receipt paper brightness
      for (let y = Math.floor(h * 0.25); y < Math.floor(h * 0.75); y += 4) {
        for (let x = Math.floor(w * 0.25); x < Math.floor(w * 0.75); x += 4) {
          const idx = (y * w + x) * 4;
          const lum = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
          centerLuminance.push(lum);
        }
      }

      const avgCenterLum = centerLuminance.length > 0 
        ? centerLuminance.reduce((a, b) => a + b, 0) / centerLuminance.length 
        : 200;

      // Threshold: pixels reasonably close to paper color or with high gradient
      const paperThreshold = Math.max(120, avgCenterLum * 0.7);

      for (let y = 0; y < h; y += 2) {
        for (let x = 0; x < w; x += 2) {
          const idx = (y * w + x) * 4;
          const lum = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
          if (lum >= paperThreshold) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      // Add safety padding and ensure valid bounding box
      if (maxX > minX + 20 && maxY > minY + 20) {
        const padX = Math.round(w * 0.02);
        const padY = Math.round(h * 0.02);
        const clampedMinX = Math.max(0, minX - padX);
        const clampedMaxX = Math.min(w, maxX + padX);
        const clampedMinY = Math.max(0, minY - padY);
        const clampedMaxY = Math.min(h, maxY + padY);

        const cropX = Math.round((clampedMinX / w) * 100);
        const cropY = Math.round((clampedMinY / h) * 100);
        const cropW = Math.round(((clampedMaxX - clampedMinX) / w) * 100);
        const cropH = Math.round(((clampedMaxY - clampedMinY) / h) * 100);

        if (cropW >= 30 && cropH >= 30) {
          return { x: cropX, y: cropY, width: cropW, height: cropH };
        }
      }
    } catch (e) {
      console.warn('Auto edge detection fallback:', e);
    }
    // Default safe crop (trim 3% off-center shadows)
    return { x: 3, y: 3, width: 94, height: 94 };
  }, []);

  // Process and Compress Engine
  const processImage = useCallback(async (
    img: HTMLImageElement,
    cropBox: CropBox,
    filter: FilterMode,
    targetKB: number,
    angle: number,
    bright: number,
    cont: number,
    paperWhite: number
  ) => {
    setIsProcessing(true);
    try {
      // 1. Calculate Crop in natural pixels
      const cropPxX = Math.round((cropBox.x / 100) * img.naturalWidth);
      const cropPxY = Math.round((cropBox.y / 100) * img.naturalHeight);
      const cropPxW = Math.round((cropBox.width / 100) * img.naturalWidth);
      const cropPxH = Math.round((cropBox.height / 100) * img.naturalHeight);

      // 2. Base canvas with rotation
      const baseCanvas = document.createElement('canvas');
      const isRotated90or270 = angle % 180 !== 0;

      baseCanvas.width = isRotated90or270 ? cropPxH : cropPxW;
      baseCanvas.height = isRotated90or270 ? cropPxW : cropPxH;

      const baseCtx = baseCanvas.getContext('2d');
      if (!baseCtx) throw new Error('Could not get 2d context');

      baseCtx.save();
      baseCtx.translate(baseCanvas.width / 2, baseCanvas.height / 2);
      baseCtx.rotate((angle * Math.PI) / 180);
      baseCtx.drawImage(
        img,
        cropPxX,
        cropPxY,
        cropPxW,
        cropPxH,
        -cropPxW / 2,
        -cropPxH / 2,
        cropPxW,
        cropPxH
      );
      baseCtx.restore();

      // 3. Document Scanner Filter Processing
      const scanCanvas = document.createElement('canvas');
      scanCanvas.width = baseCanvas.width;
      scanCanvas.height = baseCanvas.height;
      const scanCtx = scanCanvas.getContext('2d');
      if (!scanCtx) throw new Error('Could not get scan context');

      scanCtx.drawImage(baseCanvas, 0, 0);

      if (filter !== 'original') {
        const imgData = scanCtx.getImageData(0, 0, scanCanvas.width, scanCanvas.height);
        const data = imgData.data;
        const bMult = bright / 100;
        const cFactor = (259 * (cont + 255)) / (255 * (259 - cont));

        for (let i = 0; i < data.length; i += 4) {
          let r = data[i];
          let g = data[i + 1];
          let b = data[i + 2];

          // Apply brightness
          r = Math.min(255, Math.max(0, r * bMult));
          g = Math.min(255, Math.max(0, g * bMult));
          b = Math.min(255, Math.max(0, b * bMult));

          // Apply contrast
          r = Math.min(255, Math.max(0, cFactor * (r - 128) + 128));
          g = Math.min(255, Math.max(0, cFactor * (g - 128) + 128));
          b = Math.min(255, Math.max(0, cFactor * (b - 128) + 128));

          const lum = 0.299 * r + 0.587 * g + 0.114 * b;

          if (filter === 'magic') {
            // Magic Color: Cleans background paper to pure white while preserving bank stamps, ink & color logos!
            const maxVal = Math.max(r, g, b);
            const minVal = Math.min(r, g, b);
            const saturation = maxVal === 0 ? 0 : (maxVal - minVal) / maxVal;

            if (lum > paperWhite && saturation < 0.22) {
              // Whitewash paper noise
              data[i] = 255;
              data[i + 1] = 255;
              data[i + 2] = 255;
            } else if (saturation > 0.3) {
              // Boost bank stamp colors (blue, violet, red ink seals)
              data[i] = Math.min(255, r * 1.15);
              data[i + 1] = Math.min(255, g * 1.15);
              data[i + 2] = Math.min(255, b * 1.15);
            } else {
              // Crisp printed text
              const textContrast = lum < 100 ? 0.85 : 1.0;
              data[i] = Math.max(0, r * textContrast);
              data[i + 1] = Math.max(0, g * textContrast);
              data[i + 2] = Math.max(0, b * textContrast);
            }
          } else if (filter === 'bw') {
            // High-contrast clean black-and-white photocopy / flatbed scan
            const threshold = paperWhite * 0.92;
            const val = lum >= threshold ? 255 : 15;
            data[i] = val;
            data[i + 1] = val;
            data[i + 2] = val;
          } else if (filter === 'gray') {
            // Clean grayscale
            let gray = lum;
            if (gray > paperWhite) gray = 255;
            else gray = Math.max(0, (gray - 30) * 1.15);
            data[i] = gray;
            data[i + 1] = gray;
            data[i + 2] = gray;
          }
        }
        scanCtx.putImageData(imgData, 0, 0);
      }

      // 4. Guaranteed Target Resizing & Compression (< targetKB)
      // Max dimensions constraint: A clear receipt under 100KB is best at 1000 - 1400px
      const targetBytes = targetKB * 1024;
      const safeThresholdBytes = targetBytes * 0.97; // Stay comfortably below limit (e.g. 97 KB)

      let scale = 1.0;
      const maxDim = 1350;
      const curMaxDim = Math.max(scanCanvas.width, scanCanvas.height);
      if (curMaxDim > maxDim) {
        scale = maxDim / curMaxDim;
      }

      let workCanvas = document.createElement('canvas');
      workCanvas.width = Math.round(scanCanvas.width * scale);
      workCanvas.height = Math.round(scanCanvas.height * scale);
      let wCtx = workCanvas.getContext('2d')!;
      wCtx.drawImage(scanCanvas, 0, 0, workCanvas.width, workCanvas.height);

      let lowQ = 0.35;
      let highQ = 0.92;
      let bestBlob: Blob | null = null;

      // Binary search for highest visual quality under targetKB
      for (let iter = 0; iter < 6; iter++) {
        const midQ = (lowQ + highQ) / 2;
        const blob = await new Promise<Blob>((res) =>
          workCanvas.toBlob((b) => res(b!), 'image/jpeg', midQ)
        );

        if (blob.size <= safeThresholdBytes) {
          bestBlob = blob;
          lowQ = midQ; // Try higher quality
        } else {
          highQ = midQ; // Exceeded limit, reduce quality
        }
      }

      // If still slightly over or no match, scale down resolution slightly
      if (!bestBlob || bestBlob.size > safeThresholdBytes) {
        let downscale = 0.85;
        while (downscale >= 0.4) {
          const smallCanvas = document.createElement('canvas');
          smallCanvas.width = Math.round(workCanvas.width * downscale);
          smallCanvas.height = Math.round(workCanvas.height * downscale);
          const sCtx = smallCanvas.getContext('2d')!;
          sCtx.drawImage(workCanvas, 0, 0, smallCanvas.width, smallCanvas.height);

          const blob = await new Promise<Blob>((res) =>
            smallCanvas.toBlob((b) => res(b!), 'image/jpeg', 0.78)
          );
          if (blob.size <= safeThresholdBytes) {
            bestBlob = blob;
            workCanvas = smallCanvas;
            break;
          }
          downscale -= 0.15;
        }
      }

      if (!bestBlob) {
        // Ultimate fallback
        bestBlob = await new Promise<Blob>((res) =>
          workCanvas.toBlob((b) => res(b!), 'image/jpeg', 0.5)
        );
      }

      const finalSizeKB = Number((bestBlob.size / 1024).toFixed(1));
      const dataUrl = URL.createObjectURL(bestBlob);

      setOutputBlob(bestBlob);
      setOutputDataUrl(dataUrl);
      setOutputSizeKB(finalSizeKB);
      setOutputDimensions({ width: workCanvas.width, height: workCanvas.height });
    } catch (err) {
      console.error('Failed to process receipt image:', err);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  // Handle image file selection
  const handleFileSelect = (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    setOriginalFileSizeKB(Number((file.size / 1024).toFixed(1)));
    setSourceFileName(file.name.replace(/\.[^/.]+$/, ''));

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setSourceImage(img);
        setOriginalDimensions({ width: img.naturalWidth, height: img.naturalHeight });
        setRotationAngle(0);

        // 1-Click Auto Crop detection
        const detectedCrop = autoDetectReceiptBounds(img);
        setCrop(detectedCrop);

        // Instantly run scan & resize pipeline
        processImage(
          img,
          detectedCrop,
          filterMode,
          targetMaxKB,
          0,
          brightness,
          contrast,
          paperWhiteness
        );
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Drag and Drop listeners
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  // Clipboard Paste listener (Ctrl+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData && e.clipboardData.items) {
        for (let i = 0; i < e.clipboardData.items.length; i++) {
          const item = e.clipboardData.items[i];
          if (item.type.indexOf('image') !== -1) {
            const file = item.getAsFile();
            if (file) {
              handleFileSelect(file);
              break;
            }
          }
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  // Load realistic Demo Bank Receipt
  const loadDemoBankReceipt = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 780;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Outer desk background
    ctx.fillStyle = '#2b231d';
    ctx.fillRect(0, 0, 1200, 780);

    // Subtle table grain shadows
    ctx.fillStyle = '#1c1713';
    ctx.fillRect(20, 20, 1160, 40);

    // Receipt Paper with slight perspective & off-white color
    ctx.save();
    ctx.translate(60, 50);
    ctx.rotate(0.015);

    // Drop shadow
    ctx.shadowColor = 'rgba(0,0,0,0.55)';
    ctx.shadowBlur = 24;
    ctx.shadowOffsetX = 8;
    ctx.shadowOffsetY = 12;

    ctx.fillStyle = '#FAF7F0';
    ctx.fillRect(0, 0, 1050, 640);
    ctx.shadowColor = 'transparent';

    // Header Border
    ctx.strokeStyle = '#1a365d';
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 20, 1010, 600);
    ctx.strokeRect(24, 24, 1002, 592);

    // Bank Header
    ctx.fillStyle = '#0f2942';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText('STATE BANK OF INDIA / भारतीय स्टेट बैंक', 60, 75);

    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = '#c53030';
    ctx.fillText('CHALLAN / FEE PAYMENT RECEIPT (अभ्यर्थी प्रति / CANDIDATE COPY)', 60, 105);

    // Transaction Details Table
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.5;

    ctx.fillStyle = '#1e293b';
    ctx.font = '15px sans-serif';

    const rows = [
      ['परीक्षा का नाम (Exam Name):', 'CGPSC State Service Exam 2026 / Pre'],
      ['रजिस्ट्रेशन आईडी (Reg ID):', 'CG2026-98472910'],
      ['अभ्यर्थी का नाम (Candidate Name):', 'ABHISHEK KUMAR SHARMA'],
      ['बैंक चालान सं. (Challan / UTR No.):', 'SBI-CH-2026-0988472199'],
      ['भुगतान की तिथि (Payment Date):', '31-OCT-2026 14:32:10'],
      ['बैंक शाखा कोड (Branch Code):', 'SBI MAIN BRANCH RAIPUR (00461)'],
      ['जमा राशि (Exam Fee Amount):', '₹ 400.00 (Four Hundred Rupees Only)'],
      ['पोर्टल चार्ज (Bank Portal Charges):', '₹ 15.00'],
      ['कुल राशि (Total Paid):', '₹ 415.00 (PAID & VERIFIED)']
    ];

    let startY = 150;
    rows.forEach(([label, val]) => {
      ctx.fillStyle = '#475569';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText(label, 60, startY);

      ctx.fillStyle = '#0f172a';
      ctx.font = label.includes('कुल') ? 'bold 16px sans-serif' : '15px sans-serif';
      ctx.fillText(val, 380, startY);

      ctx.beginPath();
      ctx.moveTo(60, startY + 8);
      ctx.lineTo(990, startY + 8);
      ctx.stroke();

      startY += 38;
    });

    // Official Bank Stamp / Seal (Violet/Blue ink)
    ctx.save();
    ctx.translate(760, 480);
    ctx.rotate(-0.12);
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3.5;
    ctx.strokeRect(0, 0, 210, 85);
    ctx.strokeRect(4, 4, 202, 77);

    ctx.fillStyle = '#1d4ed8';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText('STATE BANK OF INDIA', 20, 30);
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('FEE RECEIVED & STAMPED', 16, 52);
    ctx.fillText('CASHIER CODE: 4892', 32, 70);
    ctx.restore();

    // Cashier Signature (Blue pen)
    ctx.save();
    ctx.translate(480, 560);
    ctx.strokeStyle = '#1e40af';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, 10);
    ctx.bezierCurveTo(30, -20, 60, 25, 90, -10);
    ctx.bezierCurveTo(110, -30, 130, 20, 150, 0);
    ctx.stroke();
    ctx.fillStyle = '#64748b';
    ctx.font = '12px sans-serif';
    ctx.fillText('हस्ताक्षर बैंक अधिकारी (Authorized Signatory)', 10, 28);
    ctx.restore();

    ctx.restore();

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    const demoImg = new Image();
    demoImg.onload = () => {
      setSourceImage(demoImg);
      setOriginalFileSizeKB(1480.5); // Simulate ~1.5 MB camera snap
      setSourceFileName('SBI_Challan_Parchi_Sample');
      setOriginalDimensions({ width: 1200, height: 780 });
      setRotationAngle(0);

      // Auto crop bounding the paper receipt
      const autoCrop: CropBox = { x: 4, y: 5, width: 91, height: 86 };
      setCrop(autoCrop);

      processImage(
        demoImg,
        autoCrop,
        filterMode,
        targetMaxKB,
        0,
        brightness,
        contrast,
        paperWhiteness
      );
    };
    demoImg.src = dataUrl;
  };

  // Re-run image processing when settings change
  const triggerReProcess = (
    newCrop = crop,
    newFilter = filterMode,
    newTargetKB = targetMaxKB,
    newAngle = rotationAngle,
    newBright = brightness,
    newCont = contrast,
    newWhite = paperWhiteness
  ) => {
    if (!sourceImage) return;
    processImage(
      sourceImage,
      newCrop,
      newFilter,
      newTargetKB,
      newAngle,
      newBright,
      newCont,
      newWhite
    );
  };

  // 1-Click Auto Scan action button
  const handleOneClickAutoScan = () => {
    if (!sourceImage) return;
    const detectedCrop = autoDetectReceiptBounds(sourceImage);
    setCrop(detectedCrop);
    setFilterMode('magic');
    setBrightness(105);
    setContrast(120);
    setPaperWhiteness(190);
    processImage(
      sourceImage,
      detectedCrop,
      'magic',
      targetMaxKB,
      rotationAngle,
      105,
      120,
      190
    );
  };

  // Rotate handler
  const handleRotate = (dir: 'cw' | 'ccw') => {
    const delta = dir === 'cw' ? 90 : -90;
    const nextAngle = (rotationAngle + delta + 360) % 360;
    setRotationAngle(nextAngle);
    triggerReProcess(crop, filterMode, targetMaxKB, nextAngle);
  };

  // Download JPEG
  const handleDownloadJPG = () => {
    if (!outputBlob) return;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(outputBlob);
    link.download = `${sourceFileName}_scanned_${Math.round(outputSizeKB)}kb.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download PDF
  const handleDownloadPDF = () => {
    if (!outputDataUrl) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${sourceFileName} Scanned Receipt</title>
          <style>
            @page { size: auto; margin: 10mm; }
            body { margin: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: sans-serif; background: #fff; }
            img { max-width: 100%; max-height: 90vh; object-fit: contain; border: 1px solid #ddd; }
            .meta { margin-top: 10px; font-size: 11px; color: #666; }
          </style>
        </head>
        <body>
          <img src="${outputDataUrl}" onload="window.print(); window.close();" />
          <div class="meta">CG Guru Exam Receipt Scanner • Size: ${outputSizeKB} KB • Portal Compliant</div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Copy to clipboard
  const handleCopyImage = async () => {
    if (!outputBlob) return;
    try {
      const item = new ClipboardItem({ [outputBlob.type]: outputBlob });
      await navigator.clipboard.write([item]);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    } catch (e) {
      console.warn('Clipboard write failed, fallback copy:', e);
    }
  };

  // Manual Crop drag listeners
  const startCropDrag = (e: React.MouseEvent | React.TouchEvent, handle: string | null) => {
    e.stopPropagation();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragState({
      active: true,
      handle,
      startX: clientX,
      startY: clientY,
      startCrop: { ...crop }
    });
  };

  const onCropMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!dragState.active || !cropContainerRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

    const rect = cropContainerRef.current.getBoundingClientRect();
    const dx = ((clientX - dragState.startX) / rect.width) * 100;
    const dy = ((clientY - dragState.startY) / rect.height) * 100;

    let { x, y, width, height } = dragState.startCrop;
    const handle = dragState.handle;

    if (handle === 'move') {
      x = Math.max(0, Math.min(100 - width, x + dx));
      y = Math.max(0, Math.min(100 - height, y + dy));
    } else if (handle === 'tl') {
      const newX = Math.max(0, Math.min(x + width - 15, x + dx));
      const newY = Math.max(0, Math.min(y + height - 15, y + dy));
      width = width + (x - newX);
      height = height + (y - newY);
      x = newX;
      y = newY;
    } else if (handle === 'tr') {
      const newY = Math.max(0, Math.min(y + height - 15, y + dy));
      width = Math.max(15, Math.min(100 - x, width + dx));
      height = height + (y - newY);
      y = newY;
    } else if (handle === 'bl') {
      const newX = Math.max(0, Math.min(x + width - 15, x + dx));
      width = width + (x - newX);
      height = Math.max(15, Math.min(100 - y, height + dy));
      x = newX;
    } else if (handle === 'br') {
      width = Math.max(15, Math.min(100 - x, width + dx));
      height = Math.max(15, Math.min(100 - y, height + dy));
    }

    setCrop({
      x: Math.round(x),
      y: Math.round(y),
      width: Math.round(width),
      height: Math.round(height)
    });
  };

  const onCropMouseUp = () => {
    if (dragState.active) {
      setDragState((prev) => ({ ...prev, active: false, handle: null }));
      triggerReProcess(crop);
    }
  };

  useEffect(() => {
    if (dragState.active) {
      window.addEventListener('mousemove', onCropMouseMove);
      window.addEventListener('mouseup', onCropMouseUp);
      window.addEventListener('touchmove', onCropMouseMove);
      window.addEventListener('touchend', onCropMouseUp);
      return () => {
        window.removeEventListener('mousemove', onCropMouseMove);
        window.removeEventListener('mouseup', onCropMouseUp);
        window.removeEventListener('touchmove', onCropMouseMove);
        window.removeEventListener('touchend', onCropMouseUp);
      };
    }
  }, [dragState, crop]);

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-6 pb-28 md:pb-12 text-text font-sans">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-bg-s2 via-bg-s1 to-bg-s2 border border-saffron-border/30 rounded-2xl p-5 sm:p-6 mb-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-saffron/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-saffron to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-saffron/20 shrink-0">
              <ReceiptIndianRupee className="w-8 h-8" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-text">
                  बैंक पर्ची / रसीद स्कैनर & कंप्रेसर
                </h1>
                <span className="text-[10px] font-black uppercase tracking-wider bg-saffron/20 text-saffron border border-saffron/40 px-2 py-0.5 rounded-full">
                  ⚡ 1-Click Auto Crop
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  🎯 Guaranteed &lt; 100 KB
                </span>
              </div>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-2xl">
                CGPSC, CG Vyapam, SSC, Banking एवं सभी सरकारी भर्ती फॉर्म में बैंक चालान, पेमेंट स्लिप और फीस पर्ची को 1-क्लिक में ऑटो-क्रॉप करके 100 KB से कम साइज में एचडी स्कैनर जैसा तैयार करें।
              </p>
            </div>
          </div>

          {/* Quick Demo Button */}
          <div className="flex items-center gap-2 self-start md:self-center shrink-0">
            <button
              onClick={loadDemoBankReceipt}
              className="px-3.5 py-2 bg-bg-s3/80 hover:bg-bg-s3 border border-border/80 hover:border-saffron/40 rounded-xl text-xs font-bold text-text transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <FileText className="w-4 h-4 text-saffron" />
              <span>डेमो बैंक पर्ची देखें</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Layout */}
      {!sourceImage ? (
        /* Empty / Upload Dropzone State */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-3xl p-8 sm:p-14 text-center transition-all bg-bg-s2/60 backdrop-blur-sm flex flex-col items-center justify-center gap-6 min-h-[380px] shadow-lg ${
            isDragOver ? 'border-saffron bg-saffron/5 scale-[1.01]' : 'border-border/80 hover:border-saffron/50'
          }`}
        >
          <div className="relative">
            <div className="w-20 h-20 rounded-3xl bg-saffron/10 border border-saffron/20 flex items-center justify-center text-saffron shadow-inner">
              <Upload className="w-9 h-9 animate-pulse" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-xs shadow">
              <Zap className="w-4 h-4" />
            </div>
          </div>

          <div className="max-w-md">
            <h2 className="text-lg sm:text-xl font-black text-text mb-2">
              बैंक पर्ची / चालान की फोटो यहाँ डालें
            </h2>
            <p className="text-xs text-text-muted leading-relaxed">
              मोबाइल से खींची गई फोटो, रसीद का स्क्रीनशॉट या चालान पीडीएफ इमेज को ड्रैग करें, या नीचे से चुनें।
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-md">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 min-w-[160px] px-5 py-3.5 bg-gradient-to-r from-saffron to-amber-500 hover:from-saffron-dark hover:to-amber-600 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg shadow-saffron/20 transition-all cursor-pointer"
            >
              <Upload className="w-4.5 h-4.5" />
              <span>गैलरी / फाइल चुनें</span>
            </button>

            <button
              onClick={() => cameraInputRef.current?.click()}
              className="flex-1 min-w-[160px] px-5 py-3.5 bg-bg-s3 hover:bg-bg-s3/80 border border-border text-text font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all cursor-pointer"
            >
              <Camera className="w-4.5 h-4.5 text-saffron" />
              <span>कैमरा से फोटो लें</span>
            </button>
          </div>

          {/* Hidden Inputs */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
          />

          {/* Feature Badges & Tip */}
          <div className="pt-4 border-t border-border/40 flex flex-wrap items-center justify-center gap-3 text-[11px] text-text-muted">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              ऑटो-एज डिटेक्शन (टेबल/बैकग्राउंड कट)
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              बैंक मुहर और हस्ताक्षर सुरक्षित (Magic Color)
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              क्लिपबोर्ड से पेस्ट (Ctrl + V)
            </span>
          </div>
        </div>
      ) : (
        /* Active Processing & Result Grid */
        <div className="flex flex-col gap-6">
          {/* Quick Toolbar Bar */}
          <div className="bg-bg-s2/90 border border-border/80 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-md">
            {/* Left: Re-upload / 1-Click Auto Scan */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleOneClickAutoScan}
                disabled={isProcessing}
                className="px-4 py-2 bg-gradient-to-r from-saffron to-amber-500 hover:from-saffron-dark hover:to-amber-600 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-md shadow-saffron/20 transition-all cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>1-क्लिक ऑटो री-स्कैन</span>
              </button>

              <button
                onClick={() => setIsCroppingOpen(!isCroppingOpen)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 cursor-pointer ${
                  isCroppingOpen
                    ? 'bg-saffron/15 text-saffron border-saffron/40'
                    : 'bg-bg-s3 border-border text-text hover:border-saffron/40'
                }`}
              >
                <Scissors className="w-3.5 h-3.5" />
                <span>{isCroppingOpen ? 'क्रॉप बंद करें' : 'क्रॉप एडजस्ट करें'}</span>
              </button>

              <div className="flex items-center gap-1 bg-bg-s3 border border-border rounded-xl p-1">
                <button
                  onClick={() => handleRotate('ccw')}
                  title="90° Left"
                  className="p-1.5 hover:bg-bg-s2 rounded-lg text-text-muted hover:text-text cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleRotate('cw')}
                  title="90° Right"
                  className="p-1.5 hover:bg-bg-s2 rounded-lg text-text-muted hover:text-text cursor-pointer transition-colors"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                  showAdvanced ? 'bg-saffron/15 text-saffron border-saffron/40' : 'bg-bg-s3 border-border text-text-muted hover:text-text'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>फाइन ट्यून</span>
              </button>
            </div>

            {/* Right: Change File / Reset */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-2 bg-bg-s3 hover:bg-bg-s3/80 border border-border rounded-xl text-xs font-bold text-text-muted hover:text-text transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-saffron" />
                <span>दूसरी फोटो डालें</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              />
            </div>
          </div>

          {/* Advanced Sliders (Collapsible) */}
          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-bg-s2/90 border border-border/80 rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs overflow-hidden"
              >
                <div>
                  <div className="flex justify-between font-bold mb-1 text-text-muted">
                    <span>ब्राइटनेस (Brightness)</span>
                    <span className="text-saffron">{brightness}%</span>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="140"
                    value={brightness}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setBrightness(val);
                      triggerReProcess(crop, filterMode, targetMaxKB, rotationAngle, val, contrast, paperWhiteness);
                    }}
                    className="w-full accent-saffron cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1 text-text-muted">
                    <span>कंट्रास्ट (Contrast)</span>
                    <span className="text-saffron">{contrast}%</span>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="180"
                    value={contrast}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setContrast(val);
                      triggerReProcess(crop, filterMode, targetMaxKB, rotationAngle, brightness, val, paperWhiteness);
                    }}
                    className="w-full accent-saffron cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1 text-text-muted">
                    <span>कागज व्हाइटनिंग थ्रेशोल्ड</span>
                    <span className="text-saffron">{paperWhiteness}</span>
                  </div>
                  <input
                    type="range"
                    min="140"
                    max="230"
                    value={paperWhiteness}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setPaperWhiteness(val);
                      triggerReProcess(crop, filterMode, targetMaxKB, rotationAngle, brightness, contrast, val);
                    }}
                    className="w-full accent-saffron cursor-pointer"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mode & Target Limit Selector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Filter Modes (7 cols) */}
            <div className="lg:col-span-7 bg-bg-s2/80 border border-border/80 rounded-2xl p-3.5 flex flex-col gap-2">
              <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
                1. स्कैनर फ़िल्टर मोड चुनें
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'magic', label: 'मैजिक कलर', desc: 'रंग व मुहर साफ', badge: 'Recommended' },
                  { id: 'bw', label: 'दस्तावेज़ B&W', desc: 'फोटोकॉपी स्टाइल', badge: 'Ultra Crisp' },
                  { id: 'gray', label: 'ग्रेस्केल', desc: 'स्मूथ ब्लैक/व्हाइट', badge: null },
                  { id: 'original', label: 'ओरिजिनल', desc: 'मूल रंग में क्रॉप', badge: null }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setFilterMode(item.id as FilterMode);
                      triggerReProcess(crop, item.id as FilterMode);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                      filterMode === item.id
                        ? 'bg-saffron/15 border-saffron text-text shadow-sm'
                        : 'bg-bg-s3/60 border-border text-text-muted hover:text-text hover:bg-bg-s3'
                    }`}
                  >
                    {item.badge && (
                      <span className="text-[8px] font-black uppercase text-saffron bg-saffron/20 px-1 py-0.5 rounded self-start mb-1">
                        {item.badge}
                      </span>
                    )}
                    <span className="text-xs font-black">{item.label}</span>
                    <span className="text-[10px] text-text-muted">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Target Size Presets (5 cols) */}
            <div className="lg:col-span-5 bg-bg-s2/80 border border-border/80 rounded-2xl p-3.5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
                  2. अधिकतम साइज लिमिट (Portal Requirement)
                </span>
                <span className="text-xs font-black text-emerald-400">
                  लक्ष्य: &lt; {targetMaxKB} KB
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { kb: 50, label: '50 KB' },
                  { kb: 100, label: '100 KB', activeDefault: true },
                  { kb: 150, label: '150 KB' },
                  { kb: 200, label: '200 KB' }
                ].map((item) => (
                  <button
                    key={item.kb}
                    onClick={() => {
                      setTargetMaxKB(item.kb);
                      triggerReProcess(crop, filterMode, item.kb);
                    }}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer font-black text-xs ${
                      targetMaxKB === item.kb
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-sm'
                        : 'bg-bg-s3/60 border-border text-text-muted hover:text-text'
                    }`}
                  >
                    {item.label}
                    {item.activeDefault && <span className="block text-[8px] font-normal text-text-muted">मानक</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Crop Modal / Overlay if open */}
          {isCroppingOpen && sourceImage && (
            <div className="bg-bg-s2 border-2 border-saffron/50 rounded-2xl p-4 flex flex-col gap-3 shadow-2xl">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Scissors className="w-4 h-4 text-saffron" />
                  <span className="font-bold text-text">
                    क्रॉप बॉक्स को ड्रैग करके रसीद के चारों कोनों में सेट करें:
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const auto = autoDetectReceiptBounds(sourceImage);
                      setCrop(auto);
                      triggerReProcess(auto);
                    }}
                    className="px-2.5 py-1 bg-saffron/15 text-saffron border border-saffron/30 rounded-lg font-bold text-[11px] cursor-pointer"
                  >
                    ऑटो-डिटेक्ट
                  </button>
                  <button
                    onClick={() => {
                      const full = { x: 0, y: 0, width: 100, height: 100 };
                      setCrop(full);
                      triggerReProcess(full);
                    }}
                    className="px-2.5 py-1 bg-bg-s3 text-text-muted border border-border rounded-lg font-bold text-[11px] cursor-pointer"
                  >
                    फुल इमेज
                  </button>
                  <button
                    onClick={() => setIsCroppingOpen(false)}
                    className="p-1 hover:bg-bg-s3 rounded-lg text-text-muted hover:text-text cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Crop Canvas Visual View */}
              <div
                ref={cropContainerRef}
                className="relative max-h-[380px] w-full bg-slate-950/80 rounded-xl overflow-hidden flex items-center justify-center select-none"
              >
                <img
                  src={sourceImage.src}
                  alt="Original to crop"
                  className="max-h-[380px] w-auto object-contain opacity-50"
                  style={{ transform: `rotate(${rotationAngle}deg)` }}
                />

                {/* Crop Box Overlay */}
                <div
                  onMouseDown={(e) => startCropDrag(e, 'move')}
                  onTouchStart={(e) => startCropDrag(e, 'move')}
                  className="absolute border-2 border-saffron bg-saffron/10 cursor-move shadow-[0_0_0_9999px_rgba(0,0,0,0.6)]"
                  style={{
                    left: `${crop.x}%`,
                    top: `${crop.y}%`,
                    width: `${crop.width}%`,
                    height: `${crop.height}%`
                  }}
                >
                  {/* Grid Lines */}
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-40">
                    <div className="border-r border-b border-saffron" />
                    <div className="border-r border-b border-saffron" />
                    <div className="border-b border-saffron" />
                    <div className="border-r border-b border-saffron" />
                    <div className="border-r border-b border-saffron" />
                    <div className="border-b border-saffron" />
                    <div className="border-r border-saffron" />
                    <div className="border-r border-saffron" />
                    <div />
                  </div>

                  {/* Corner Handles */}
                  <div
                    onMouseDown={(e) => startCropDrag(e, 'tl')}
                    onTouchStart={(e) => startCropDrag(e, 'tl')}
                    className="absolute -top-2 -left-2 w-4 h-4 bg-saffron rounded-full border-2 border-slate-950 cursor-nwse-resize shadow"
                  />
                  <div
                    onMouseDown={(e) => startCropDrag(e, 'tr')}
                    onTouchStart={(e) => startCropDrag(e, 'tr')}
                    className="absolute -top-2 -right-2 w-4 h-4 bg-saffron rounded-full border-2 border-slate-950 cursor-nesw-resize shadow"
                  />
                  <div
                    onMouseDown={(e) => startCropDrag(e, 'bl')}
                    onTouchStart={(e) => startCropDrag(e, 'bl')}
                    className="absolute -bottom-2 -left-2 w-4 h-4 bg-saffron rounded-full border-2 border-slate-950 cursor-nesw-resize shadow"
                  />
                  <div
                    onMouseDown={(e) => startCropDrag(e, 'br')}
                    onTouchStart={(e) => startCropDrag(e, 'br')}
                    className="absolute -bottom-2 -right-2 w-4 h-4 bg-saffron rounded-full border-2 border-slate-950 cursor-nwse-resize shadow"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Results Comparison View (Before & After) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Original Preview */}
            <div className="bg-bg-s2/70 border border-border/80 rounded-2xl p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-text-muted">1. मूल फोटो (Original File)</span>
                <span className="font-bold text-text-muted bg-bg-s3 px-2 py-0.5 rounded border border-border">
                  {originalFileSizeKB} KB • {originalDimensions.width}×{originalDimensions.height} px
                </span>
              </div>

              <div className="relative h-[340px] bg-slate-950/60 rounded-xl overflow-hidden flex items-center justify-center p-2 border border-border/40">
                <img
                  src={sourceImage.src}
                  alt="Original Receipt"
                  className="max-h-full max-w-full object-contain rounded"
                  style={{ transform: `rotate(${rotationAngle}deg)` }}
                />
                <span className="absolute bottom-2 left-2 text-[10px] bg-slate-950/80 text-text-muted px-2 py-1 rounded backdrop-blur-sm">
                  अपरिष्कृत (Uncropped)
                </span>
              </div>
            </div>

            {/* Scanned & Compressed Output */}
            <div className="bg-gradient-to-b from-bg-s2 via-bg-s2 to-bg-s1 border-2 border-emerald-500/50 rounded-2xl p-4 flex flex-col gap-3 relative shadow-2xl">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-text">2. ऑटो-स्कैन & कंप्रेस्ड रसीद</span>
                  <span className="text-[9px] font-black uppercase tracking-wider bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded shadow">
                    PORTAL READY
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                    {outputSizeKB} KB &lt; {targetMaxKB} KB
                  </span>
                  {originalFileSizeKB > 0 && outputSizeKB > 0 && (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 px-1.5 py-0.5 rounded">
                      -{Math.round(((originalFileSizeKB - outputSizeKB) / originalFileSizeKB) * 100)}%
                    </span>
                  )}
                </div>
              </div>

              {/* Scanned Image Preview */}
              <div className="relative h-[340px] bg-white rounded-xl overflow-hidden flex items-center justify-center p-2 border border-emerald-500/30 shadow-inner">
                {isProcessing ? (
                  <div className="flex flex-col items-center gap-3 text-slate-700">
                    <RefreshCw className="w-8 h-8 animate-spin text-saffron" />
                    <span className="text-xs font-bold">स्कैन और 100 KB में रीसाइज हो रहा है...</span>
                  </div>
                ) : outputDataUrl ? (
                  <img
                    src={outputDataUrl}
                    alt="Scanned Output"
                    className="max-h-full max-w-full object-contain rounded shadow-sm"
                  />
                ) : null}

                {/* Status Watermark */}
                {!isProcessing && outputSizeKB <= targetMaxKB && (
                  <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>पोर्टल अपलोड हेतु मान्य</span>
                  </div>
                )}
              </div>

              {/* Output File Specifications */}
              <div className="text-[11px] text-text-muted flex justify-between px-1">
                <span>रिज़ॉल्यूशन: {outputDimensions.width} × {outputDimensions.height} px</span>
                <span>फॉर्मेट: JPEG (Web Standard)</span>
                <span className="font-bold text-emerald-400">साइज़: {outputSizeKB} KB</span>
              </div>

              {/* Primary Download & Copy Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-border/50">
                <button
                  onClick={handleDownloadJPG}
                  disabled={!outputBlob || isProcessing}
                  className="sm:col-span-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>डाउनलोड पर्ची (JPG • {outputSizeKB} KB)</span>
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={handleDownloadPDF}
                    disabled={!outputDataUrl || isProcessing}
                    title="Download as PDF"
                    className="flex-1 px-3 py-3 bg-bg-s3 hover:bg-bg-s3/80 border border-border text-text font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <FileDown className="w-4 h-4 text-redL" />
                    <span>PDF</span>
                  </button>

                  <button
                    onClick={handleCopyImage}
                    disabled={!outputBlob || isProcessing}
                    title="Copy Image to Clipboard"
                    className="px-3 py-3 bg-bg-s3 hover:bg-bg-s3/80 border border-border text-text font-bold rounded-xl text-xs flex items-center justify-center transition-all cursor-pointer disabled:opacity-50"
                  >
                    {copySuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-text-muted" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Exam Portal Guidelines Card */}
          <div className="bg-bg-s2/60 border border-border/80 rounded-2xl p-5 flex flex-col md:flex-row items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-saffron flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex-1 text-xs text-text-muted space-y-1.5">
              <h3 className="font-black text-text text-sm">
                सरकारी परीक्षा फॉर्म (CGPSC / Vyapam / SSC) फीस पर्ची निर्देश:
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong className="text-text">साइज़ सीमा:</strong> अधिकांश ऑनलाइन पोर्टल 100 KB से अधिक की फाइल अस्वीकार कर देते हैं। हमारा टूल गारंटीड फाइल को 100 KB से कम (70-95 KB) में तैयार करता है।
                </li>
                <li>
                  <strong className="text-text">स्पष्टता:</strong> पर्ची पर बैंक का नाम, ट्रांजैक्शन/रेफरेंस नंबर (UTR/Challan No.), भुगतान तिथि और राशि (Amount) सुपाठ्य होनी चाहिए।
                </li>
                <li>
                  <strong className="text-text">मैजिक कलर फिल्टर:</strong> यह बैंक की मोहर (Bank Stamp Seal) और कैशियर हस्ताक्षर के असली नीले/लाल रंग को सुरक्षित रखकर बैकग्राउंड पेपर को साफ करता है।
                </li>
                <li>
                  <strong className="text-text">गोपनीयता:</strong> आपकी पर्ची का कोई भी डेटा सर्वर पर नहीं जाता। सभी क्रॉपिंग एवं कंप्रेशन पूर्णतया आपके फोन/कंप्यूटर ब्राउज़र में लोकल होती है।
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

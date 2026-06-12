import React from 'react';
import { motion } from 'framer-motion';

interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  glow?: boolean;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  percentage,
  size = 70,
  strokeWidth = 6,
  className = '',
  glow = true
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Glow Filters */}
        <defs>
          <filter id="glow-orange" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="gradient-orange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffb84d" />
            <stop offset="100%" stopColor="#ff9933" />
          </linearGradient>
        </defs>

        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="var(--bg-s3, #1d263b)"
          strokeWidth={strokeWidth}
        />

        {/* Animated Foreground Circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="url(#gradient-orange)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut" }}
          strokeLinecap="round"
          style={{
            filter: glow && percentage > 0 ? 'url(#glow-orange)' : 'none',
          }}
        />
      </svg>

      {/* Centered Percentage Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-base font-black text-text font-sans">
          {Math.round(percentage)}<span className="text-[10px] font-normal text-text-muted">%</span>
        </span>
      </div>
    </div>
  );
};

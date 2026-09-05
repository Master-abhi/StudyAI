/**
 * In-browser Hindi Typing Engine for Vedmata m17n & Mangal (Remington Gail)
 * Built strictly according to official GNU m17n-db (hi-vedmata.mim & hi-remington.mim)
 * Enables seamless Hindi typing on standard QWERTY keyboards without requiring OS IME.
 */

export interface TypingEngineState {
  pendingChhotiI: boolean;
  pendingMultiKey: string;
}

export function createInitialTypingState(): TypingEngineState {
  return {
    pendingChhotiI: false,
    pendingMultiKey: ''
  };
}

// Single Key Map for Vedmata m17n (CG High Court Ubuntu Linux)
export const VEDMATA_SINGLE_MAP: Record<string, string> = {
  // Consonants (full)
  'e': 'म',
  'r': 'त',
  't': 'ज',
  'y': 'ल',
  'u': 'न',
  'i': 'प',
  'o': 'व',
  'p': 'च',
  'd': 'क',
  'G': 'ळ',
  'g': 'ह',
  'j': 'र',
  'l': 'स',
  ';': 'य',
  'x': 'ग',
  'c': 'ब',
  'V': 'ट',
  'B': 'ठ',
  'b': 'इ',
  'N': 'छ',
  'n': 'द',
  'M': 'ड',
  'm': 'उ',
  '<': 'ढ',
  ',': 'ए',
  '>': 'झ',
  'v': 'अ',
  'Q': 'ऊ',

  // Half Consonants (Shift keys)
  'E': 'म्',
  'R': 'त्',
  'T': 'ज्',
  'Y': 'ल्',
  'U': 'न्',
  'I': 'प्',
  'O': 'व्',
  'P': 'च्',
  '{': 'क्ष्',
  'D': 'क्',
  'F': 'थ्',
  'H': 'भ्',
  'L': 'स्',
  '"': 'ष्',
  "'": 'श्',
  'Z': 'र्', // Reph
  'X': 'ग्',
  'C': 'ब्',
  '.': 'ण्',
  '?': 'घ्',
  '/': 'ध्',
  '[': 'ख्',

  // Matras & modifiers
  '`': '्', // Halant
  '1': '़', // Nukta
  '2': 'ृ',
  '%': 'ः', // Visarga
  'q': 'ु',
  'W': 'ॅ',
  'w': 'ू',
  'A': 'ँ',
  'a': 'ं',
  'S': 'ै',
  's': 'े',
  'h': 'ी',
  'k': 'ा',
  'z': '्र',
  '@': ' ॒',

  // Specials & Punctuation
  ')': 'द्घ',
  '}': 'द्व',
  '|': 'द्य',
  'J': 'श्र',
  'K': 'ज्ञ',
  '!': '?',
  '#': '.',
  '$': 'ङ',
  '&': '-',
  '*': 'ञ',
  '(': '।', // Poornaviram
  '_': 'त्र',
  '+': 'ऋ',
  '\\': '\\',
  ']': ',',
  ':': 'ॐ',

  // Hindi Numerals (Vedmata m17n official)
  '3': '१',
  '4': '२',
  '5': '३',
  '6': '४',
  '7': '५',
  '8': '६',
  '9': '७',
  '0': '८',
  '-': '९',
  '=': '०'
};

// Single Key Map for Mangal Remington Gail (Standard Government / CPCT)
export const MANGAL_REMINGTON_MAP: Record<string, string> = {
  ...VEDMATA_SINGLE_MAP,
  'A': '।', // In Remington Gail, Shift+A is Poornaviram ।
  '!': '।', // In Windows Remington, Shift+1 is Poornaviram
  '~': 'द्य',
  '*': 'द्ध',
  '(': 'त्र',
  ')': 'ऋ',
  '=': 'ृ',
  '+': '्',
  '-': ';',
  '_': '.',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '0': '0'
};

/**
 * Handles typing a key for Vedmata or Mangal layout.
 * Returns the modified text and updated cursor position if handled.
 */
export function handleHindiKeyPress(
  key: string,
  text: string,
  cursorPos: number,
  layout: 'vedmata' | 'mangal',
  state: TypingEngineState
): {
  handled: boolean;
  newText: string;
  newCursorPos: number;
  newState: TypingEngineState;
} {
  const map = layout === 'vedmata' ? VEDMATA_SINGLE_MAP : MANGAL_REMINGTON_MAP;

  // If already Hindi or control key, let standard input handle it
  if (key.length !== 1 || key.charCodeAt(0) > 127 || key === ' ') {
    return { handled: false, newText: text, newCursorPos: cursorPos, newState: state };
  }

  const newState = { ...state };
  const prevChar = cursorPos > 0 ? text[cursorPos - 1] : '';

  // 1. CHHOTI-I (f) Key Handling
  if (key === 'f') {
    // If f is pressed twice, insert independent ि
    if (newState.pendingChhotiI) {
      newState.pendingChhotiI = false;
      const newText = text.slice(0, cursorPos) + '\u093f' + text.slice(cursorPos);
      return { handled: true, newText, newCursorPos: cursorPos + 1, newState };
    }
    // Set pending chhoti-i
    newState.pendingChhotiI = true;
    return { handled: true, newText: text, newCursorPos: cursorPos, newState };
  }

  // 2. REPH (Z = र्) Handling
  if (key === 'Z') {
    if (prevChar === 'इ' || prevChar === '\u0907') {
      // 'इ' + 'Z' -> 'ई'
      const newText = text.slice(0, cursorPos - 1) + 'ई' + text.slice(cursorPos);
      return { handled: true, newText, newCursorPos: cursorPos, newState };
    }
    // Reph goes before the previous character cluster
    if (prevChar && prevChar !== ' ') {
      const newText = text.slice(0, cursorPos - 1) + '\u0930\u094d' + prevChar + text.slice(cursorPos);
      return { handled: true, newText, newCursorPos: cursorPos + 2, newState };
    }
    const newText = text.slice(0, cursorPos) + '\u0930\u094d' + text.slice(cursorPos);
    return { handled: true, newText, newCursorPos: cursorPos + 2, newState };
  }

  // 3. HALANT + 'k' (Removes Halant, Making Half-Consonant Full)
  if (key === 'k' && prevChar === '\u094d') {
    // Delete halant (e.g. क् + k -> क, भ् + k -> भ, श् + k -> श)
    const newText = text.slice(0, cursorPos - 1) + text.slice(cursorPos);
    return { handled: true, newText, newCursorPos: cursorPos - 1, newState };
  }

  // 4. COMPOUND MATRAS & VOWELS
  // अ + k -> आ
  if (key === 'k' && prevChar === 'अ') {
    const newText = text.slice(0, cursorPos - 1) + 'आ' + text.slice(cursorPos);
    return { handled: true, newText, newCursorPos: cursorPos, newState };
  }
  // आ + s -> ओ
  if (key === 's' && prevChar === 'आ') {
    const newText = text.slice(0, cursorPos - 1) + 'ओ' + text.slice(cursorPos);
    return { handled: true, newText, newCursorPos: cursorPos, newState };
  }
  // आ + S -> औ
  if (key === 'S' && prevChar === 'आ') {
    const newText = text.slice(0, cursorPos - 1) + 'औ' + text.slice(cursorPos);
    return { handled: true, newText, newCursorPos: cursorPos, newState };
  }
  // आ + W -> ऑ
  if (key === 'W' && prevChar === 'आ') {
    const newText = text.slice(0, cursorPos - 1) + 'ऑ' + text.slice(cursorPos);
    return { handled: true, newText, newCursorPos: cursorPos, newState };
  }
  // ा + s -> ो
  if (key === 's' && prevChar === 'ा') {
    const newText = text.slice(0, cursorPos - 1) + 'ो' + text.slice(cursorPos);
    return { handled: true, newText, newCursorPos: cursorPos, newState };
  }
  // ा + S -> ौ
  if (key === 'S' && prevChar === 'ा') {
    const newText = text.slice(0, cursorPos - 1) + 'ौ' + text.slice(cursorPos);
    return { handled: true, newText, newCursorPos: cursorPos, newState };
  }
  // ा + a -> ां
  if (key === 'a' && prevChar === 'ा') {
    const newText = text.slice(0, cursorPos) + 'ं' + text.slice(cursorPos);
    return { handled: true, newText, newCursorPos: cursorPos + 1, newState };
  }

  // 5. RESOLVE SINGLE KEY
  if (map.hasOwnProperty(key)) {
    let charToInsert = map[key];

    // If pending chhoti-i was active, attach ि after the consonant
    if (newState.pendingChhotiI) {
      newState.pendingChhotiI = false;
      // Remove any trailing halant if half-character
      charToInsert = charToInsert.replace(/\u094d$/, '') + '\u093f';
    }

    const newText = text.slice(0, cursorPos) + charToInsert + text.slice(cursorPos);
    const newCursorPos = cursorPos + charToInsert.length;
    return { handled: true, newText, newCursorPos, newState };
  }

  // Key not mapped, pass through
  return { handled: false, newText: text, newCursorPos: cursorPos, newState };
}


import { ColorValue } from '../types/color';

export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

export const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: h = 0;
    }
    h /= 6;
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

export const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
  h /= 360;
  s /= 100;
  l /= 100;

  const hue2rgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
};

export const parseColorString = (colorString: string): ColorValue | null => {
  // Remove whitespace
  const clean = colorString.replace(/\s/g, '');
  
  // Hex color
  if (clean.match(/^#[0-9A-F]{6}$/i)) {
    const rgb = hexToRgb(clean);
    if (rgb) {
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      return {
        hex: clean,
        rgb,
        hsl,
        opacity: 1
      };
    }
  }
  
  // RGB/RGBA color
  const rgbMatch = clean.match(/^rgba?\((\d+),(\d+),(\d+)(?:,([0-9.]+))?\)$/i);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1]);
    const g = parseInt(rgbMatch[2]);
    const b = parseInt(rgbMatch[3]);
    const opacity = rgbMatch[4] ? parseFloat(rgbMatch[4]) : 1;
    
    const hex = rgbToHex(r, g, b);
    const hsl = rgbToHsl(r, g, b);
    
    return {
      hex,
      rgb: { r, g, b },
      hsl,
      opacity
    };
  }
  
  // HSL/HSLA color
  const hslMatch = clean.match(/^hsla?\((\d+),(\d+)%,(\d+)%(?:,([0-9.]+))?\)$/i);
  if (hslMatch) {
    const h = parseInt(hslMatch[1]);
    const s = parseInt(hslMatch[2]);
    const l = parseInt(hslMatch[3]);
    const opacity = hslMatch[4] ? parseFloat(hslMatch[4]) : 1;
    
    const rgb = hslToRgb(h, s, l);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    
    return {
      hex,
      rgb,
      hsl: { h, s, l },
      opacity
    };
  }
  
  return null;
};

export const formatColorString = (color: ColorValue, format: 'hex' | 'rgb' | 'hsl' | 'rgba' | 'hsla'): string => {
  switch (format) {
    case 'hex':
      return color.hex;
    case 'rgb':
      return `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
    case 'rgba':
      return `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.opacity})`;
    case 'hsl':
      return `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`;
    case 'hsla':
      return `hsla(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%, ${color.opacity})`;
    default:
      return color.hex;
  }
};

export const createColorValue = (hex: string, opacity: number = 1): ColorValue => {
  const rgb = hexToRgb(hex);
  if (!rgb) throw new Error('Invalid hex color');
  
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  return {
    hex,
    rgb,
    hsl,
    opacity: Math.max(0, Math.min(1, opacity))
  };
};

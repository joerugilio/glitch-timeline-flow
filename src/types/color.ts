
export interface ColorValue {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  opacity: number;
}

export type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'rgba' | 'hsla';

export interface ColorPickerProps {
  value?: ColorValue;
  onChange: (color: ColorValue) => void;
  format?: ColorFormat;
  showOpacity?: boolean;
  disabled?: boolean;
  className?: string;
}

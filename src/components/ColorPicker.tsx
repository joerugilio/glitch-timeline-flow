import React, { useState, useEffect } from 'react';
import { ColorPickerProps, ColorValue, ColorFormat } from '../types/color';
import { parseColorString, formatColorString, createColorValue, hexToRgb, rgbToHex, hslToRgb } from '../utils/colorUtils';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent } from './ui/card';
import { cn } from '../lib/utils';

const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  format = 'hex',
  showOpacity = true,
  disabled = false,
  className
}) => {
  const [currentColor, setCurrentColor] = useState<ColorValue>(
    value || createColorValue('#000000', 1)
  );
  const [selectedFormat, setSelectedFormat] = useState<ColorFormat>(format);
  const [colorInput, setColorInput] = useState('');

  useEffect(() => {
    if (value) {
      setCurrentColor(value);
      setColorInput(formatColorString(value, selectedFormat));
    }
  }, [value, selectedFormat]);

  const handleColorChange = (newColor: ColorValue) => {
    setCurrentColor(newColor);
    setColorInput(formatColorString(newColor, selectedFormat));
    onChange(newColor);
  };

  const handleHexInputChange = (hex: string) => {
    try {
      const newColor = createColorValue(hex, currentColor.opacity);
      handleColorChange(newColor);
    } catch (error) {
      // Invalid hex, keep current color
    }
  };

  const handleRgbChange = (component: 'r' | 'g' | 'b', value: number) => {
    const newRgb = { ...currentColor.rgb, [component]: Math.max(0, Math.min(255, value)) };
    const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    const newColor = createColorValue(hex, currentColor.opacity);
    handleColorChange(newColor);
  };

  const handleHslChange = (component: 'h' | 's' | 'l', value: number) => {
    const newHsl = { ...currentColor.hsl };
    if (component === 'h') {
      newHsl.h = Math.max(0, Math.min(360, value));
    } else {
      newHsl[component] = Math.max(0, Math.min(100, value));
    }
    
    const rgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    const newColor = createColorValue(hex, currentColor.opacity);
    handleColorChange(newColor);
  };

  const handleOpacityChange = (opacity: number[]) => {
    const newColor = { ...currentColor, opacity: opacity[0] };
    handleColorChange(newColor);
  };

  const handleColorInputChange = (inputValue: string) => {
    setColorInput(inputValue);
    const parsed = parseColorString(inputValue);
    if (parsed) {
      handleColorChange(parsed);
    }
  };

  const getPreviewStyle = () => {
    const { r, g, b } = currentColor.rgb;
    return {
      backgroundColor: `rgba(${r}, ${g}, ${b}, ${currentColor.opacity})`,
      backgroundImage: currentColor.opacity < 1 
        ? 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)'
        : undefined,
      backgroundSize: currentColor.opacity < 1 ? '10px 10px' : undefined,
      backgroundPosition: currentColor.opacity < 1 ? '0 0, 0 5px, 5px -5px, -5px 0px' : undefined
    };
  };

  return (
    <Card className={cn('w-full max-w-md', className)}>
      <CardContent className="p-4 space-y-4">
        {/* Color Preview */}
        <div className="space-y-2">
          <Label>Color Preview</Label>
          <div 
            className="w-full h-16 rounded border border-border"
            style={getPreviewStyle()}
          />
        </div>

        {/* Format Selector */}
        <div className="space-y-2">
          <Label>Format</Label>
          <Select
            value={selectedFormat}
            onValueChange={(value: ColorFormat) => setSelectedFormat(value)}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hex">HEX</SelectItem>
              <SelectItem value="rgb">RGB</SelectItem>
              <SelectItem value="rgba">RGBA</SelectItem>
              <SelectItem value="hsl">HSL</SelectItem>
              <SelectItem value="hsla">HSLA</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Color Input */}
        <div className="space-y-2">
          <Label>Color Value</Label>
          <Input
            value={colorInput}
            onChange={(e) => handleColorInputChange(e.target.value)}
            disabled={disabled}
            placeholder="Enter color value"
          />
        </div>

        {/* Native Color Picker */}
        <div className="space-y-2">
          <Label>Color Picker</Label>
          <input
            type="color"
            value={currentColor.hex}
            onChange={(e) => handleHexInputChange(e.target.value)}
            disabled={disabled}
            className="w-full h-10 rounded border border-border cursor-pointer disabled:cursor-not-allowed"
          />
        </div>

        {/* RGB Controls */}
        <div className="space-y-3">
          <Label>RGB Values</Label>
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <Label className="text-xs">Red</Label>
              <Input
                type="number"
                min="0"
                max="255"
                value={currentColor.rgb.r}
                onChange={(e) => handleRgbChange('r', parseInt(e.target.value) || 0)}
                disabled={disabled}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Green</Label>
              <Input
                type="number"
                min="0"
                max="255"
                value={currentColor.rgb.g}
                onChange={(e) => handleRgbChange('g', parseInt(e.target.value) || 0)}
                disabled={disabled}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Blue</Label>
              <Input
                type="number"
                min="0"
                max="255"
                value={currentColor.rgb.b}
                onChange={(e) => handleRgbChange('b', parseInt(e.target.value) || 0)}
                disabled={disabled}
              />
            </div>
          </div>
        </div>

        {/* HSL Controls */}
        <div className="space-y-3">
          <Label>HSL Values</Label>
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <Label className="text-xs">Hue</Label>
              <Input
                type="number"
                min="0"
                max="360"
                value={currentColor.hsl.h}
                onChange={(e) => handleHslChange('h', parseInt(e.target.value) || 0)}
                disabled={disabled}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Saturation</Label>
              <Input
                type="number"
                min="0"
                max="100"
                value={currentColor.hsl.s}
                onChange={(e) => handleHslChange('s', parseInt(e.target.value) || 0)}
                disabled={disabled}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Lightness</Label>
              <Input
                type="number"
                min="0"
                max="100"
                value={currentColor.hsl.l}
                onChange={(e) => handleHslChange('l', parseInt(e.target.value) || 0)}
                disabled={disabled}
              />
            </div>
          </div>
        </div>

        {/* Opacity Slider */}
        {showOpacity && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Opacity</Label>
              <span className="text-sm text-muted-foreground">
                {Math.round(currentColor.opacity * 100)}%
              </span>
            </div>
            <Slider
              value={[currentColor.opacity]}
              onValueChange={handleOpacityChange}
              min={0}
              max={1}
              step={0.01}
              disabled={disabled}
              className="w-full"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ColorPicker;

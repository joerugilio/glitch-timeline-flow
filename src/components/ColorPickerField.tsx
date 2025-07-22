
import React from 'react';
import { useController, FieldPath, FieldValues, Control } from 'react-hook-form';
import ColorPicker from './ColorPicker';
import { ColorValue, ColorFormat } from '../types/color';
import { formatColorString } from '../utils/colorUtils';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';

interface ColorPickerFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  format?: ColorFormat;
  showOpacity?: boolean;
  disabled?: boolean;
  className?: string;
}

const ColorPickerField = <T extends FieldValues>({
  name,
  control,
  label,
  format = 'hex',
  showOpacity = true,
  disabled = false,
  className
}: ColorPickerFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <ColorPicker
              value={field.value}
              onChange={(color: ColorValue) => {
                field.onChange(color);
              }}
              format={format}
              showOpacity={showOpacity}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ColorPickerField;

import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { Radio } from './radio';

export interface RadioItem {
  id: number | string;
  label: string;
}

interface RadioListProps {
  options: RadioItem[];
  value?: number | string;
  onChange: (value: number | string) => void;
}

export const RadioGroup = ({ options = [], value, onChange }: RadioListProps): ReactElement => {
  return (
    <View>
      {options.map((option) => (
        <Radio
          key={option.id}
          label={option.label}
          value={option.id}
          onChange={() => onChange(option.id)}
          isSelected={option.id === value}
        />
      ))}
    </View>
  );
};

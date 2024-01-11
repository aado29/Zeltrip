import { ImageSourcePropType, StyleProp, TextInput, TextStyle, ViewStyle } from 'react-native';
import { MaskedTextInputProps } from 'react-native-mask-text';
import { IconName } from '../icons';

export type InputType = 'time' | 'mask' | 'password' | 'text' | 'custom' | 'currency';

export type InputSize = 'md' | 'lg';

export interface InputProps extends Omit<MaskedTextInputProps, 'type'>, Partial<TextInput> {
  label?: string;
  startIcon?: IconName;
  endIcon?: IconName;
  /** @deprecated */
  leftIcon?: ImageSourcePropType;
  placeholder?: string;
  message?: string;
  error?: boolean;
  mask?: string;
  type?: InputType;
  size?: InputSize;
  onChangeText: (text: string) => void;
  overwriteStyles?: {
    rootStyles?: StyleProp<ViewStyle>;
    labelStyles?: StyleProp<TextStyle>;
    inputStyles?: StyleProp<TextStyle>;
    messageStyles?: StyleProp<TextStyle>;
  };
}

import React, { ReactElement } from 'react';
import { Dimensions, View, Text, TouchableOpacity, StyleProp, TextStyle } from 'react-native';
import { ToastProvider, useToast } from 'react-native-toast-notifications';
import { ToastProps } from 'react-native-toast-notifications/lib/typescript/toast';

export const useToaster = useToast;

const Toast = ({ message, data }: ToastProps): ReactElement => {
  const screenWidth = Dimensions.get('screen').width;
  const textStyles: StyleProp<TextStyle> = {
    color: 'white',
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#222D4B',
        height: 56,
        paddingHorizontal: 16,
        borderRadius: 16,
        width: screenWidth - 32,
        marginBottom: 16,
        shadowColor: '#1B316B',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.12,
        shadowRadius: 14,
        elevation: 10,
      }}
    >
      <Text style={textStyles}>{message}</Text>
      {data?.rollback ? (
        <TouchableOpacity onPress={(): void => data.rollback()}>
          <Text style={{ ...textStyles, fontWeight: '700' }}>Deshacer</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export const ToasterProvider = ({ children }: { children: ReactElement }): ReactElement => {
  return (
    <ToastProvider renderToast={Toast} offsetBottom={88}>
      {children}
    </ToastProvider>
  );
};

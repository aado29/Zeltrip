import { Portal } from '@gorhom/portal';
import React, { ReactElement, ReactNode } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
// import { Modal as BaseModal } from 'react-native-paper';
import BaseModal from 'react-native-modal';

export interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

const MODAL_WIDTH = Dimensions.get('screen').width - 32;

const style = StyleSheet.create({
  root: { alignItems: 'center' },
  modal: {
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
    width: MODAL_WIDTH,
    backgroundColor: '#FFF',
    borderRadius: 24,
  },
  buttons: {
    width: '100%',
    flexDirection: 'row',
  },
});

export const Modal = ({ isOpen, children }: ModalProps & { children: ReactNode }): ReactElement => {
  return (
    <Portal>
      <BaseModal
        isVisible={isOpen}
        style={style.root}
        // theme={{
        //   colors: { background: 'rgba(35, 36, 72, 0.4)', backdrop: 'rgba(35, 36, 72, 0.4)' },
        // }}
      >
        <View style={style.modal}>{children}</View>
      </BaseModal>
    </Portal>
  );
};

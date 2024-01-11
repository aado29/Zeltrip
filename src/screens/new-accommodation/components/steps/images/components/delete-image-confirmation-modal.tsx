import React, { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../../../../../../shared/components/button';
import IconWrapper from '../../../../../../shared/components/icons/icon-wrapper';
import { Modal, ModalProps } from '../../../../../../shared/components/modal/modal';
import { Text } from '../../../../../../shared/components/text';

interface DeleteImageConfirmationModalProps extends ModalProps {
  index: number;
  onDelete: () => void;
}

const style = StyleSheet.create({
  buttons: {
    width: '100%',
    flexDirection: 'row',
  },
});

export const DeleteImageConfirmationModal = ({
  index,
  isOpen,
  onClose,
  onDelete,
}: DeleteImageConfirmationModalProps): ReactElement => {
  return (
    <Modal isOpen={isOpen}>
      <IconWrapper size="lg" name="delete" isActive />
      <Text variant="heading" style={{ fontWeight: '700', marginVertical: 8, textAlign: 'center' }}>
        {`¿Deseas eliminar la imagen #${index + 1}?`}
      </Text>
      <Text variant="paragraph" style={{ textAlign: 'center', marginBottom: 32 }}>
        {`Al realizar esta acción se va eliminar imagen #${index + 1} de tu publicación`}
      </Text>
      <View style={style.buttons}>
        <View style={{ paddingHorizontal: 8, flex: 1 }}>
          <Button kind="outline" onPress={onClose ? (): void => onClose() : undefined}>
            Cancel
          </Button>
        </View>
        <View style={{ paddingHorizontal: 8, flex: 1 }}>
          <Button onPress={onDelete ? (): void => onDelete() : undefined}>Eliminar</Button>
        </View>
      </View>
    </Modal>
  );
};

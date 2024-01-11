/* eslint-disable no-empty-pattern */
import React, { ReactNode } from 'react';
import Modal from 'react-native-modal';
import AndroidDimensions from 'react-native-extra-dimensions-android';
import { Dimensions, Platform, TouchableHighlight, View } from 'react-native';
import { Text } from '../text';

interface SwipeablePanelProps {
  isActive: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

const deviceWidth = Dimensions.get('window').width;

const deviceHeight =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height
    : AndroidDimensions.get('REAL_WINDOW_HEIGHT');

export const SwipeablePanel = ({ isActive, title, children, onClose }: SwipeablePanelProps) => {
  return (
    <Modal
      testID="modal"
      isVisible={isActive}
      style={{ justifyContent: 'flex-end', margin: 0 }}
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      useNativeDriverForBackdrop
      customBackdrop={<View style={{ flex: 1, backgroundColor: 'rgba(35, 36, 72, 0.6)' }} />}
      swipeDirection={['down']}
      onDismiss={onClose}
    >
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 16,
          marginHorizontal: 16,
          marginBottom: 32,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            height: 20,
            alignItems: 'center',
          }}
        >
          <View style={{ width: 36, height: 4, borderRadius: 1, backgroundColor: '#C3CBDA' }} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 16,
            marginTop: 6,
            marginBottom: 8,
            height: 48,
          }}
        >
          <Text variant="paragraph" style={{ fontWeight: '700' }}>
            {title}
          </Text>
          <TouchableHighlight onPress={onClose} underlayColor="transparent">
            <Text
              variant="smallparagraph"
              style={{ textDecorationLine: 'underline', textDecorationStyle: 'solid' }}
            >
              Cerrar
            </Text>
          </TouchableHighlight>
        </View>

        {children}
      </View>
    </Modal>
  );
};

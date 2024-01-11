import React, { ReactElement, useState } from 'react';
import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';
import { ClickableItem } from '../room-details';
import { SwipeablePanel } from '../../../../../shared/components/swipeable-panel';

export interface ImageData {
  id: number;
  uri: string;
  fileName: string;
}

interface GalleryProps {
  isLoading: boolean;
  images: ImageData[];
  onAddImage: (image: ImageData) => void;
  onRemoveImage: (image: ImageData) => void;
}

const deviceWidth = Dimensions.get('window').width;

const GalleryPlaceholder = ({ onImageSelect }: { onImageSelect: () => void }): ReactElement => {
  return (
    <View style={{ width: deviceWidth / 3 - 6, height: deviceWidth / 3 - 6, padding: 8 }}>
      <TouchableOpacity
        onPress={onImageSelect}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 8,
        }}
      >
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            borderRadius: 8,
            borderColor: '#C3CBDA',
            borderWidth: 1,
            borderStyle: 'solid',
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              backgroundColor: '#E4EDF5',
              borderRadius: 16,
            }}
          >
            <FontAwesome name="plus" size={12} color="#405885" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const GalleryItem = ({
  image: { fileName, uri, id },
  onRemoveImage,
}: {
  image: ImageData;
  onRemoveImage: () => void;
}): ReactElement => {
  return (
    <View key={id} style={{ width: deviceWidth / 3 - 6, height: deviceWidth / 3 - 6, padding: 8 }}>
      <View
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 8,
        }}
      >
        <TouchableOpacity
          onPress={onRemoveImage}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 32,
            height: 32,
            borderRadius: 16,

            position: 'absolute',
            zIndex: 1,
            top: '80%',
            left: '80%',

            shadowColor: '#1B316B',
            shadowOpacity: 0.12,
            shadowRadius: 4,
            backgroundColor: '#ffffff',
            elevation: 4,
          }}
        >
          <FontAwesome name="close" size={12} color="#405885" />
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            borderRadius: 8,
            borderColor: '#C3CBDA',
            borderWidth: 1,
            borderStyle: 'solid',
            overflow: 'hidden',
          }}
        >
          <Image
            accessibilityLabel="image"
            accessibilityValue={{ text: fileName }}
            source={{ uri }}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
      </View>
    </View>
  );
};

const getPlaceholder = (_, index: number): ImageData => ({
  id: index,
  uri: '',
  fileName: '',
});

const placeholders = Array(6).fill(null).map(getPlaceholder);

export const Gallery = ({
  images,
  isLoading,
  onAddImage,
  onRemoveImage,
}: GalleryProps): ReactElement => {
  // const [selectedIndexImageId, setSelectedIndexImage] = useState<number | null>(null);
  // const [modalVisible, setModalVisible] = useState(false);

  // const handleImageSelect = (indexPlaceholder: number) => {
  //   setSelectedIndexImage(indexPlaceholder);
  //   setModalVisible(true);
  // };

  // const handleModalClose = () => {
  //   setModalVisible(false);
  // };

  // const addImage = (_images: ImagePicker.ImagePickerAsset[]): void => {
  //   const [image] = _images;

  //   onAddImage({
  //     id: 0,
  //     fileName: image.fileName ?? image.uri.split('/').pop() ?? '',
  //     uri: image.uri,
  //   });
  // };

  // const handleChooseFromGallery = async (): Promise<void> => {
  //   if (selectedIndexImageId === null) {
  //     return;
  //   }

  //   try {
  //     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     if (status !== 'granted') {
  //       alert('No se han otorgado permisos para acceder a la galería de imágenes.');
  //       return;
  //     }

  //     const result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       quality: 0,
  //       allowsEditing: true,
  //     });

  //     if (!result.canceled && result.assets) {
  //       addImage(result.assets);
  //     }

  //     setModalVisible(false);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // const handleTakePhoto = async () => {
  //   if (selectedIndexImageId === null) {
  //     return;
  //   }

  //   const { status } = await ImagePicker.requestCameraPermissionsAsync();
  //   if (status !== 'granted') {
  //     alert('No se han otorgado permisos para acceder a la cámara.');
  //     return;
  //   }

  //   const result = await ImagePicker.launchCameraAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //   });

  //   if (!result.canceled && result.assets) {
  //     addImage(result.assets);
  //   }

  //   setModalVisible(false);
  // };

  // return (
  //   <>
  //     <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', padding: 8 }}>
  //       {placeholders.map((placeholder, indexPlaceholder) => {
  //         const image = images[indexPlaceholder];

  //         return image ? (
  //           <GalleryItem
  //             key={`image-${image.id ?? 0}`}
  //             image={image}
  //             onRemoveImage={(): void => onRemoveImage(image)}
  //           />
  //         ) : (
  //           <GalleryPlaceholder
  //             key={`placeholder-${placeholder.id}`}
  //             onImageSelect={(): void => handleImageSelect(indexPlaceholder)}
  //           />
  //         );
  //       })}
  //     </View>
  //     <SwipeablePanel isActive={modalVisible} title="Abrir desde" onClose={handleModalClose}>
  //       <ClickableItem title="Galería" icon="image" onPress={handleChooseFromGallery} />
  //       <ClickableItem title="Cámara" icon="camera" onPress={handleTakePhoto} />
  //     </SwipeablePanel>
  //   </>
  // );
  <></>
};

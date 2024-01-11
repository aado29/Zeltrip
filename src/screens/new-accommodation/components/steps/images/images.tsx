import React, { ReactElement, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from '../../../../../shared/components/text';
import { Button } from '../../../../../shared/components/button';
import { Gallery, ImageData } from './gallery';
import { StepComponentProps } from '../../step';
import { MediaFile } from '../../../../../interfaces/accommodation';
import {
  useRemoveAccommodationPhoto,
  useUploadAccommodationPhoto,
} from '../../../../../api-queries/queries/accommodation.query';
import { DeleteImageConfirmationModal } from './components/delete-image-confirmation-modal';

const mapImageData = (images: MediaFile[]): ImageData[] =>
  images.map((image) => ({ id: image.id, uri: image.url, fileName: image.filename }));

export const Images = ({
  onSelect,
  payload: { photos },
  isLoading,
  accommodationId,
}: StepComponentProps): ReactElement => {
  const [imageIdToDelete, setImageIdToDelete] = useState<number | undefined>(undefined);
  const uploadAccommodationPhoto = useUploadAccommodationPhoto();
  const removeAccommodationPhoto = useRemoveAccommodationPhoto();

  const images = useMemo(() => mapImageData(photos ?? []), [photos]);

  const isDisabled = useMemo(() => images.every((image) => !image.uri), [images]);

  const handleAddImage = (image: ImageData) => {
    uploadAccommodationPhoto.mutate(
      {
        accommodationId,
        photo: { url: image.uri, filename: image.fileName, id: image.id ?? 0 },
      },
      {
        onSuccess: ({ steps }) => {
          console.log(steps[steps.length - 1]);
        },
        onError: () => {
          console.log('ERROR: Uploading an image');
        },
      }
    );
  };

  const handleRemoveImage = () => {
    if (!imageIdToDelete) {
      return;
    }

    removeAccommodationPhoto.mutate(
      {
        accommodationId,
        photoId: imageIdToDelete,
      },
      {
        onSuccess: ({ steps }) => {
          console.log(steps[steps.length - 1]);
        },
        onError: () => {
          console.log('ERROR: Deleting an image');
        },
      }
    );
  };

  const handleSelect = (): void => {
    if (!images?.length) {
      return;
    }

    onSelect({});
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: 16 }}>
            <Text variant="subtile" style={{ fontWeight: '700', marginTop: 16, marginBottom: 6 }}>
              Tipo de servicio
            </Text>
            <Text variant="paragraph" style={{ marginBottom: 16 }}>
              Te recomendamos un mínimo de 3 fotos
            </Text>
          </View>
          <ScrollView style={{ flex: 1 }}>
            <Gallery
              onAddImage={handleAddImage}
              onRemoveImage={({ id }): void => {
                setImageIdToDelete(id);
              }}
              images={images}
              isLoading={uploadAccommodationPhoto.isLoading || removeAccommodationPhoto.isLoading}
            />
          </ScrollView>
        </View>

        <View style={{ paddingHorizontal: 16 }}>
          <Button
            onPress={handleSelect}
            disabled={isDisabled || uploadAccommodationPhoto.isLoading || isLoading}
          >
            {uploadAccommodationPhoto.isLoading || isLoading ? 'Cargando' : 'Siguiente'}
          </Button>
        </View>
      </View>

      <DeleteImageConfirmationModal
        index={imageIdToDelete ?? 0}
        isOpen={!!imageIdToDelete}
        onClose={() => {
          setImageIdToDelete(undefined);
        }}
        onDelete={handleRemoveImage}
      />
    </>
  );
};

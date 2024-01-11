import React, { ReactElement } from 'react';
import { Image } from 'react-native';
import { bg1 } from '../../../../../shared/staticImgs';
import { MediaFile } from '../../../../../interfaces/accommodation';

export const Gallery = ({ photos }: { photos: MediaFile[] }): ReactElement => {
  return (
    <Image
      style={{ width: '100%', height: 300, margin: 0 }}
      source={photos.length ? { uri: photos[0]?.url } : bg1}
    />
  );
};

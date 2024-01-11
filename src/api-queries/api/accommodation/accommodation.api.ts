import axios, { AxiosRequestConfig } from 'axios';

import { Accommodation, AccommodationType } from 'interfaces/accommodation';
import { transformAccommodation } from './accommodation.transform';
import {
  CreateAccommodationPayload,
  RemoveAccommodationPhotoPayload,
  UpdateAccommodationPayload,
  UploadAccommodationPhotoPayload,
} from '../../../interfaces/accommodation-api';

const baseUrl = 'http://64.225.62.178:3000';

const baseUrlV1 = `${baseUrl}/api/v1`;

const getAxiosConfig = (accessToken: string, isMedia = false): AxiosRequestConfig => ({
  headers: {
    Authorization: `Bearer ${accessToken}`,
    ...(isMedia
      ? {
          'Content-Type': 'multipart/form-data',
        }
      : {}),
  },
});

const getBase64fromUri = async (uri: string): Promise<string> => {
  const fileResponse = await fetch(uri, { headers: { 'Content-Type': 'blob' } });
  const blob = await fileResponse.blob();

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function handleOnLoaded() {
      resolve(String(reader.result));
    };
  });
};

export const getAccommodationTypes = async (accessToken: string): Promise<AccommodationType[]> => {
  const { data } = await axios.get(`${baseUrlV1}/accommodation_types`, getAxiosConfig(accessToken));

  return data;
};

export const createAccommodation = async (
  { accommodationTypeId }: CreateAccommodationPayload,
  accessToken: string
): Promise<Accommodation> => {
  const { data } = await axios.post(
    `${baseUrlV1}/accommodations`,
    {
      accommodation_type_id: accommodationTypeId,
    },
    getAxiosConfig(accessToken)
  );

  return transformAccommodation(data);
};

export const getAccommodations = async (accessToken: string): Promise<Accommodation[]> => {
  const { data } = await axios.get(`${baseUrlV1}/accommodations`, getAxiosConfig(accessToken));

  return data.map(transformAccommodation);
};

export const getAccommodation = async (
  accommodationId: number,
  accessToken: string
): Promise<Accommodation> => {
  const { data } = await axios.get(
    `${baseUrlV1}/accommodations/${accommodationId}`,
    getAxiosConfig(accessToken)
  );

  return transformAccommodation(data);
};

export const updateAccommodation = async (
  { accommodationId, step, payload, publish = false }: UpdateAccommodationPayload,
  accessToken: string
): Promise<Accommodation> => {
  const { data } = await axios.put(
    `${baseUrlV1}/accommodations/${accommodationId}`,
    {
      current_step: step,
      payload,
      ...(publish ? { accommodation_status: 'published' } : {}),
    },
    getAxiosConfig(accessToken)
  );

  return transformAccommodation(data);
};

export const uploadAccommodationPhoto = async (
  { accommodationId, photo: { url, filename } }: UploadAccommodationPhotoPayload,
  accessToken: string
): Promise<Accommodation> => {
  const imageBase64 = await getBase64fromUri(url);

  const { data } = await axios.post(
    `${baseUrlV1}/accommodations/${accommodationId}/media`,
    { base64: imageBase64, fileName: filename },
    getAxiosConfig(accessToken)
  );

  return transformAccommodation(data);
};

export const removeAccommodationPhoto = async (
  { accommodationId, photoId }: RemoveAccommodationPhotoPayload,
  accessToken: string
): Promise<Accommodation> => {
  const { data } = await axios.delete(
    `${baseUrlV1}/accommodations/${accommodationId}/media/${photoId}`,
    getAxiosConfig(accessToken)
  );

  return transformAccommodation(data);
};

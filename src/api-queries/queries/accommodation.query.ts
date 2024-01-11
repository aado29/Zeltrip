import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { Accommodation, AccommodationType } from '../../interfaces/accommodation';
import {
  createAccommodation,
  getAccommodation,
  getAccommodations,
  getAccommodationTypes,
  removeAccommodationPhoto,
  updateAccommodation,
  uploadAccommodationPhoto,
} from '../api/accommodation/accommodation.api';
import { useSession } from '../../contexts/session-provider';
import {
  CreateAccommodationPayload,
  RemoveAccommodationPhotoPayload,
  UpdateAccommodationPayload,
  UploadAccommodationPhotoPayload,
} from '../../interfaces/accommodation-api';

const getAccommodationQueryKey = (id: number) => ['accommodation', id];

export const useAccommodationTypes = (): UseQueryResult<AccommodationType[], Error> => {
  const { accessToken = '' } = useSession();

  return useQuery('accommodation-types', () => getAccommodationTypes(accessToken));
};

export const useAccommodations = (): UseQueryResult<Accommodation[], Error> => {
  const { accessToken = '' } = useSession();

  return useQuery('accommodations', () => getAccommodations(accessToken));
};

export const useAccommodation = (accommodationId = 0): UseQueryResult<Accommodation, Error> => {
  const { accessToken = '' } = useSession();

  return useQuery(
    getAccommodationQueryKey(accommodationId),
    () => getAccommodation(accommodationId, accessToken),
    {
      enabled: accommodationId > 0,
    }
  );
};

export const useCreateAccommodation = (): UseMutationResult<
  Accommodation,
  Error,
  CreateAccommodationPayload
> => {
  const queryClient = useQueryClient();
  const { accessToken = '' } = useSession();

  return useMutation((payload) => createAccommodation(payload, accessToken), {
    onSuccess: (accommodation) => {
      queryClient.setQueryData(getAccommodationQueryKey(accommodation.id), accommodation);
    },
  });
};

export const useUpdateAccommodation = (): UseMutationResult<
  Accommodation,
  Error,
  UpdateAccommodationPayload
> => {
  const queryClient = useQueryClient();
  const { accessToken = '' } = useSession();

  return useMutation((payload) => updateAccommodation(payload, accessToken), {
    onSuccess: (accommodation) => {
      queryClient.setQueryData(getAccommodationQueryKey(accommodation.id), accommodation);
    },
  });
};

export const useUploadAccommodationPhoto = (): UseMutationResult<
  Accommodation,
  Error,
  UploadAccommodationPhotoPayload
> => {
  const queryClient = useQueryClient();
  const { accessToken = '' } = useSession();

  return useMutation((payload) => uploadAccommodationPhoto(payload, accessToken), {
    onSuccess: (accommodation) => {
      queryClient.setQueryData(getAccommodationQueryKey(accommodation.id), accommodation);
    },
  });
};

export const useRemoveAccommodationPhoto = (): UseMutationResult<
  Accommodation,
  Error,
  RemoveAccommodationPhotoPayload
> => {
  const queryClient = useQueryClient();
  const { accessToken = '' } = useSession();

  return useMutation((payload) => removeAccommodationPhoto(payload, accessToken), {
    onSuccess: (accommodation) => {
      queryClient.setQueryData(getAccommodationQueryKey(accommodation.id), accommodation);
    },
  });
};

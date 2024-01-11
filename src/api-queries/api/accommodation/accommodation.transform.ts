/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Accommodation,
  AccommodationFeatures,
  AccommodationFeaturesData,
  AccommodationFeaturesDataListItem,
  AccommodationStep,
  AccommodationType,
  MediaFile,
} from 'interfaces/accommodation';
import { transformsUser } from '../user/user.transforms';

const transformMediaFile = (rawMediaFile: any): MediaFile => ({
  id: rawMediaFile.id,
  url: rawMediaFile.url,
  filename: rawMediaFile.filename,
});

const transformAccommodationType = (rawAccommodationType: any): AccommodationType => ({
  id: rawAccommodationType.id,
  name: rawAccommodationType.name,
  description: rawAccommodationType.description,
  icon: rawAccommodationType.icon,
});

const transformAccommodationFeaturesListItem = (
  rawAccommodationFeaturesDataListItem: any
): AccommodationFeaturesDataListItem => ({
  id: rawAccommodationFeaturesDataListItem.id,
  name: rawAccommodationFeaturesDataListItem.feature_value,
  description: rawAccommodationFeaturesDataListItem.feature_description,
  icon: rawAccommodationFeaturesDataListItem.icon_slug,
});

const transformsAccommodationStepPayload = (
  rawAccommodationStepPayload: any
): AccommodationFeatures => ({
  ...(Array.isArray(rawAccommodationStepPayload.air_conditioning)
    ? {
        airConditioning: rawAccommodationStepPayload.air_conditioning.map(
          transformAccommodationFeaturesListItem
        ),
      }
    : {}),

  ...(rawAccommodationStepPayload.check_in !== undefined
    ? { checkIn: rawAccommodationStepPayload.check_in }
    : {}),

  ...(rawAccommodationStepPayload.check_out !== undefined
    ? { checkOut: rawAccommodationStepPayload.check_out }
    : {}),

  ...(rawAccommodationStepPayload.bathrooms !== undefined
    ? { bathrooms: rawAccommodationStepPayload.bathrooms }
    : {}),

  ...(Array.isArray(rawAccommodationStepPayload.basic_services)
    ? {
        basicServices: rawAccommodationStepPayload.basic_services.map(
          transformAccommodationFeaturesListItem
        ),
      }
    : {}),

  ...(Array.isArray(rawAccommodationStepPayload.bathrooms_type)
    ? {
        bathroomsType: transformAccommodationFeaturesListItem(
          rawAccommodationStepPayload.bathrooms_type[0]
        ),
      }
    : {}),

  ...(rawAccommodationStepPayload.hosting_type?.id
    ? {
        hostingType: transformAccommodationFeaturesListItem(
          rawAccommodationStepPayload.hosting_type
        ),
      }
    : {}),

  ...(rawAccommodationStepPayload.category?.id
    ? { category: transformAccommodationFeaturesListItem(rawAccommodationStepPayload.category) }
    : {}),

  ...(rawAccommodationStepPayload.childrens_permited !== undefined
    ? { childrenAllowed: rawAccommodationStepPayload.childrens_permited }
    : {}),

  ...(rawAccommodationStepPayload.commune !== undefined
    ? { commune: rawAccommodationStepPayload.commune }
    : {}),

  ...(rawAccommodationStepPayload.country !== undefined
    ? { country: rawAccommodationStepPayload.country }
    : {}),

  ...(rawAccommodationStepPayload.description
    ? { description: rawAccommodationStepPayload.description }
    : {}),

  ...(Array.isArray(rawAccommodationStepPayload.facilities)
    ? {
        facilities: (rawAccommodationStepPayload.facilities ?? []).map(
          transformAccommodationFeaturesListItem
        ),
      }
    : {}),

  ...(rawAccommodationStepPayload.lat !== undefined
    ? { lat: rawAccommodationStepPayload.lat }
    : {}),

  ...(rawAccommodationStepPayload.lng !== undefined
    ? { lng: rawAccommodationStepPayload.lng }
    : {}),

  ...(rawAccommodationStepPayload.number !== undefined
    ? { streetNumber: rawAccommodationStepPayload.number }
    : {}),

  ...(rawAccommodationStepPayload.parking_count !== undefined
    ? { parkingCount: rawAccommodationStepPayload.parking_count }
    : {}),

  ...(rawAccommodationStepPayload.parking_type?.id
    ? {
        parkingType: transformAccommodationFeaturesListItem(
          rawAccommodationStepPayload.parking_type
        ),
      }
    : {}),

  ...(rawAccommodationStepPayload.pets_permited !== undefined
    ? { petsPermited: rawAccommodationStepPayload.pets_permited }
    : {}),

  ...(rawAccommodationStepPayload.postalcode !== undefined
    ? { postalCode: rawAccommodationStepPayload.postalcode }
    : {}),

  ...(rawAccommodationStepPayload.privacy_type?.id
    ? {
        privacyType: transformAccommodationFeaturesListItem(
          rawAccommodationStepPayload.privacy_type
        ),
      }
    : {}),

  ...(rawAccommodationStepPayload.guests !== undefined
    ? { guests: rawAccommodationStepPayload.guests }
    : {}),

  ...(rawAccommodationStepPayload.pets !== undefined
    ? { pets: rawAccommodationStepPayload.pets }
    : {}),

  ...(rawAccommodationStepPayload.region !== undefined
    ? { region: rawAccommodationStepPayload.region }
    : {}),

  ...(rawAccommodationStepPayload.shower !== undefined
    ? { shower: rawAccommodationStepPayload.shower }
    : {}),

  ...(Array.isArray(rawAccommodationStepPayload.shower_type)
    ? {
        showerType: transformAccommodationFeaturesListItem(
          rawAccommodationStepPayload.shower_type[0]
        ),
      }
    : {}),

  ...(Array.isArray(rawAccommodationStepPayload.shower_type_other)
    ? {
        showerTypeOthers: (rawAccommodationStepPayload.shower_type_other ?? []).map(
          transformAccommodationFeaturesListItem
        ),
      }
    : {}),

  ...(Array.isArray(rawAccommodationStepPayload.shower_type_water)
    ? {
        showerTypeWaters: (rawAccommodationStepPayload.shower_type_water ?? []).map(
          transformAccommodationFeaturesListItem
        ),
      }
    : {}),

  ...(rawAccommodationStepPayload.size_in_square_meters !== undefined
    ? { sizeInSquareMeters: rawAccommodationStepPayload.size_in_square_meters }
    : {}),

  ...(rawAccommodationStepPayload.street !== undefined
    ? { street: rawAccommodationStepPayload.street }
    : {}),

  ...(rawAccommodationStepPayload.title !== undefined
    ? { title: rawAccommodationStepPayload.title }
    : {}),

  ...(rawAccommodationStepPayload.unit !== undefined
    ? { unit: rawAccommodationStepPayload.unit }
    : {}),

  ...(Array.isArray(rawAccommodationStepPayload.rooms)
    ? {
        rooms: rawAccommodationStepPayload.rooms.map((rawRoom: any) => ({
          beds: (rawRoom.beds ?? []).map((rawBed: any) => ({
            bedType: transformAccommodationFeaturesListItem(rawBed.bed_type),
            count: rawBed.count,
          })),
        })),
      }
    : {}),

  ...(Array.isArray(rawAccommodationStepPayload.photos)
    ? {
        photos: rawAccommodationStepPayload.photos.map(transformMediaFile),
      }
    : {}),
});

const transformsAccommodationStepPayloadData = (
  rawAccommodationStepMeta: any
): AccommodationFeaturesData => ({
  ...transformsAccommodationStepPayload(rawAccommodationStepMeta ?? {}),
  categories: (rawAccommodationStepMeta.category ?? []).map(transformAccommodationFeaturesListItem),
  privacyTypes: (rawAccommodationStepMeta.privacy_type ?? []).map(
    transformAccommodationFeaturesListItem
  ),
  hostingTypes: (rawAccommodationStepMeta.hosting_type ?? []).map(
    transformAccommodationFeaturesListItem
  ),
  bathroomsTypes: (rawAccommodationStepMeta.bathrooms_type ?? []).map(
    transformAccommodationFeaturesListItem
  ),
  showerTypes: (rawAccommodationStepMeta.shower_type ?? []).map(
    transformAccommodationFeaturesListItem
  ),
  showerTypeWaters: (rawAccommodationStepMeta.shower_type_water ?? []).map(
    transformAccommodationFeaturesListItem
  ),
  parkingTypes: (rawAccommodationStepMeta.parking_type ?? []).map(
    transformAccommodationFeaturesListItem
  ),
  bedTypes: ((rawAccommodationStepMeta.rooms ?? [])[0]?.beds[0]?.bed_type ?? []).map(
    transformAccommodationFeaturesListItem
  ),
});

const transformAccommodationStep = (rawAccommodationStep: any): AccommodationStep => ({
  id: rawAccommodationStep.name,
  name: rawAccommodationStep.name_in_human,
  meta: transformsAccommodationStepPayloadData(rawAccommodationStep.meta ?? {}),
  payload: transformsAccommodationStepPayload(rawAccommodationStep.payload ?? {}),
});

export const transformAccommodation = (rawAccommodation: any): Accommodation => ({
  id: rawAccommodation.id,
  accommodationType: transformAccommodationType(rawAccommodation.accommodation_type ?? {}),
  currentStep: rawAccommodation.current_step === -1 ? undefined : rawAccommodation.current_step,
  description: rawAccommodation.description,
  title: rawAccommodation.title,
  user: transformsUser(rawAccommodation.user ?? {}),
  steps: (rawAccommodation.steps ?? []).map(transformAccommodationStep),
  status: rawAccommodation.accommodation_status ?? 'draft',
});

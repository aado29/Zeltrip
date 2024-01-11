import { IconName } from '../shared/components/icons';
import { User } from './user';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AccommodationStepMeta = Record<string, any>;

export interface AccommodationType {
  id: number;
  name: string;
  icon?: IconName;
  description?: string;
}

type AccommodationStepName =
  | 'hosting_type'
  | 'air_conditioning'
  | 'category'
  | 'check_in_and_check_out'
  | 'rooms'
  | 'privacy'
  | 'address'
  | 'basic_information'
  | 'plot_size'
  | 'sanitary_service'
  | 'basic_services'
  | 'facilities'
  | 'parking'
  | 'description'
  | 'attachments';

export interface MediaFile {
  id: number;
  url: string;
  filename: string;
}

interface RoomBedDetails {
  bedType: AccommodationFeaturesDataListItem;
  count: number;
}

export interface RoomData {
  beds: RoomBedDetails[];
}

interface AccommodationFeaturesDataListItem {
  id: number;
  name: string;
  description: string;
  icon: IconName;
}

interface AccommodationFeatures {
  airConditioning?: AccommodationFeaturesDataListItem[];
  category?: AccommodationFeaturesDataListItem;
  checkIn?: string;
  checkOut?: string;
  privacyType?: AccommodationFeaturesDataListItem;
  hostingType?: AccommodationFeaturesDataListItem;
  street?: string;
  streetNumber?: string;
  unit?: string;
  region?: string;
  commune?: string;
  country?: string;
  postalCode?: string;
  lat?: string;
  lng?: string;
  guests?: number;
  pets?: number;
  childrenAllowed?: boolean;
  petsPermited?: boolean;
  sizeInSquareMeters?: number;
  bathrooms?: number;
  shower?: number;
  basicServices?: AccommodationFeaturesDataListItem[];
  bathroomsType?: AccommodationFeaturesDataListItem;
  showerType?: AccommodationFeaturesDataListItem;
  showerTypeOthers?: AccommodationFeaturesDataListItem[];
  showerTypeWaters?: AccommodationFeaturesDataListItem[];
  facilities?: AccommodationFeaturesDataListItem[];
  parkingCount?: number;
  parkingType?: AccommodationFeaturesDataListItem;
  title?: string;
  description?: string;
  rooms?: RoomData[];
  photos?: MediaFile[];
}

interface AccommodationFeaturesData extends AccommodationFeatures {
  categories?: AccommodationFeaturesDataListItem[];
  hostingTypes?: AccommodationFeaturesDataListItem[];
  showerTypes?: AccommodationFeaturesDataListItem[];
  privacyTypes?: AccommodationFeaturesDataListItem[];
  bathroomsTypes?: AccommodationFeaturesDataListItem[];
  parkingTypes?: AccommodationFeaturesDataListItem[];
  bedTypes?: AccommodationFeaturesDataListItem[];
}

interface AccommodationStep {
  id: AccommodationStepName;
  name: string;
  meta: AccommodationFeaturesData;
  payload: AccommodationFeatures;
}

export interface Accommodation {
  id: number;
  title: string | null;
  description: string | null;
  accommodationType: AccommodationType;
  user: User;
  /** Index current step begins from 0 */
  currentStep?: 0;
  steps: AccommodationStep[];
  status: 'draft' | 'published';
}

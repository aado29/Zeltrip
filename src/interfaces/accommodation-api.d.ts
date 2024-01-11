import { MediaFile } from './accommodation';

interface CreateAccommodationPayload {
  accommodationTypeId: number;
}

interface UpdateAccommodationPayload {
  accommodationId: number;
  step: number;
  publish?: boolean;
  payload: AccommodationStepPayload;
}

interface UploadAccommodationPhotoPayload {
  accommodationId: number;
  photo: MediaFile;
}

interface RemoveAccommodationPhotoPayload {
  accommodationId: number;
  photoId: number;
}

/* Separated by modules  */
type AccommodationStepPayload =
  | {
      hosting_type: {
        id: number;
      };
    }
  | {
      check_in: string;
      check_out: string;
    }
  | {
      air_conditioning: {
        id: number;
      }[];
    }
  | {
      category: {
        id: number;
      };
    }
  | {
      rooms: {
        beds: {
          bed_type: {
            id: number;
          }[];
          count: number;
        }[];
      }[];
    }
  | {
      privacy_type: {
        id: number;
      };
    }
  | {
      street: string | null;
      number: number | null;
      unit: string | null;
      region: string | null;
      commune: string | null;
      country: string | null;
      postalcode: number | null;
      lat: string | null;
      lng: string | null;
    }
  | {
      guests: number;
      pets: number;
      childrens_permited: boolean;
      pets_permited: boolean;
    }
  | {
      size_in_square_meters: number;
    }
  | {
      bathrooms: number;
      shower: number;
      bathrooms_type: {
        id: number;
      }[];
      shower_type: {
        id: number;
      }[];
      shower_type_other: {
        id: number;
      }[];
      shower_type_water: {
        id: number;
      }[];
    }
  | {
      basic_services: { id: number }[];
    }
  | {
      facilities: {
        id: number;
      }[];
    }
  | {
      parking_count: number;
      parking_type: {
        id: number;
      };
    }
  | {
      title: string | null;
      description: string | null;
    }
  | Record<string, string>;

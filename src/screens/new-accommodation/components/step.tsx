import React, { ReactElement } from 'react';
import {
  AccommodationFeatures,
  AccommodationFeaturesData,
  AccommodationStepName,
} from '../../../interfaces/accommodation';
import {
  ServiceCategory,
  BasicInformation,
  AirConditioningService,
  RoomDetails,
  CheckInCheckOut,
  BasicServices,
  Description,
  FacilitiesInformation,
  NoDefined,
  Parking,
  PrivacyType,
  SanitaryServices,
  Address,
  HostingType,
  Images,
} from './steps';
import { AccommodationStepPayload } from '../../../interfaces/accommodation-api';

export interface StepComponentProps {
  accommodationId: number;
  isLoading: boolean;
  meta: AccommodationFeaturesData;
  payload: AccommodationFeatures;
  onSelect: (payload: AccommodationStepPayload, type?: AccommodationStepName) => void;
}

interface StepProps extends StepComponentProps {
  name: AccommodationStepName;
}

const mapAccommodationComponents: Record<
  AccommodationStepName,
  ({ onSelect }: StepComponentProps) => ReactElement
> = {
  category: ServiceCategory,
  hosting_type: HostingType,
  air_conditioning: AirConditioningService,
  check_in_and_check_out: CheckInCheckOut,
  rooms: RoomDetails,
  privacy: PrivacyType,
  address: Address,
  basic_information: BasicInformation,
  plot_size: (props) => <NoDefined name="plot_size" {...props} />,
  sanitary_service: SanitaryServices,
  basic_services: BasicServices,
  facilities: FacilitiesInformation,
  parking: Parking,
  description: Description,
  attachments: Images,
};

export const Step = ({ name, ...props }: StepProps): ReactElement | null => {
  const Component = mapAccommodationComponents[name] ?? null;

  return <Component {...props} />;
};

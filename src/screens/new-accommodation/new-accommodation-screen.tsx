/* eslint-disable no-nested-ternary */
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RouteProp } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import { useTheme } from '../../theme';
import { AppNavigation, AppNavigationProp } from '../../config/navigation/type';
import { AccommodationFeatures, AccommodationStepName } from '../../interfaces/accommodation';
import { AccommodationStepPayload } from '../../interfaces/accommodation-api';
import {
  useAccommodation,
  useCreateAccommodation,
  useUpdateAccommodation,
} from '../../api-queries/queries/accommodation.query';

import { AccommodationType } from './components/steps';
import { ProgressBar } from './components/progress-bar';
import { Step } from './components/step';
import { Text } from '../../shared/components/text';
import { Preview } from './components/preview';

const MenuButtonLeft = ({
  isCloseButton,
  onBack,
  buttonIconColor,
  isDisabled = false,
}: {
  isCloseButton: boolean;
  onBack: () => void;
  buttonIconColor: string;
  isDisabled?: boolean;
}): ReactElement => (
  <TouchableOpacity
    disabled={isDisabled}
    onPress={onBack}
    style={{
      marginLeft: 8,
      height: 48,
      width: 48,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <AntDesign name={isCloseButton ? 'close' : 'arrowleft'} size={24} color={buttonIconColor} />
  </TouchableOpacity>
);

const MenuButtonRight = ({
  onPress,
  buttonIconColor,
}: {
  buttonIconColor: string;
  onPress: () => void;
}): ReactElement => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      marginRight: 8,
      height: 48,
      width: 48,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <AntDesign name="close" size={24} color={buttonIconColor} />
  </TouchableOpacity>
);

export const NewAccommodationScreen = ({
  navigation,
  route,
}: {
  navigation: AppNavigationProp;
  route: RouteProp<AppNavigation, 'NewAccommodation'>;
}): ReactElement => {
  const { colors } = useTheme();
  const createAccommodation = useCreateAccommodation();
  const updateAccommodation = useUpdateAccommodation();

  const [step, setStep] = useState<number>(0);
  const [isPreviewed, setIsPreviewed] = useState(false);

  const id = useMemo(() => route?.params?.id, [route]);
  const { data: { id: accommodationId = 0, steps = [], currentStep, user } = {}, isLoading } =
    useAccommodation(id);

  const totalDisplaySteps = steps.length + 1;
  const currentDisplayStep = step + 1;

  const handleNext = (payload: AccommodationStepPayload, type?: AccommodationStepName) => {
    updateAccommodation.mutate(
      { step, accommodationId, payload },
      {
        onSuccess: () => {
          const isLastStep = steps.length - 1 === step;

          if (!isLastStep) {
            setStep(step + 1);
          } else {
            setIsPreviewed(true);
          }

          if (type) {
            console.log(type, 'updated');
          }
        },
      }
    );
  };

  const handleCreate = (accommodationTypeId: number) => {
    createAccommodation.mutate(
      { accommodationTypeId },
      {
        onSuccess: ({ id: _id }) => {
          navigation.navigate('NewAccommodation', { id: _id });
        },
      }
    );
  };

  const handlePublish = () => {
    updateAccommodation.mutate(
      { step, accommodationId, payload: {}, publish: true },
      {
        onSuccess: () => {
          navigation.navigate('MyAccommodations');
        },
      }
    );
  };

  useEffect(() => {
    if (!!accommodationId && currentStep === undefined) {
      setIsPreviewed(true);

      if (steps.length > 0) {
        setStep(steps.length - 1);
      }
    }

    if (!!accommodationId && currentStep) {
      setStep(currentStep);
    }
  }, [steps, accommodationId, currentStep]);

  useEffect(() => {
    const headerLeft = () => (
      <MenuButtonLeft
        isDisabled={isLoading}
        isCloseButton={(!accommodationId || step === 0) && !isPreviewed}
        onBack={() => {
          if (isPreviewed) {
            setIsPreviewed(false);
            return;
          }

          if (!accommodationId || step < 1) {
            navigation.goBack();
          } else {
            setStep(step - 1);
          }
        }}
        buttonIconColor={colors.blue['500']}
      />
    );

    const headerRight = () =>
      accommodationId && step > 0 ? (
        <MenuButtonRight
          onPress={() => navigation.navigate('MyAccommodations')}
          buttonIconColor={colors.blue['500']}
        />
      ) : null;

    navigation.setOptions({
      title: '',
      headerLeft,
      headerRight,
    });
  }, [navigation, step, steps, colors, isPreviewed, accommodationId, currentStep, isLoading]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingBottom: 16 }}>
      <ProgressBar
        steps={totalDisplaySteps}
        step={!id ? 0 : isPreviewed ? totalDisplaySteps : currentDisplayStep}
      />

      {isLoading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text variant="paragraph">Cargando...</Text>
        </View>
      ) : null}

      {!id ? (
        <AccommodationType onSelect={(_, { id: _id }: { id: number }): void => handleCreate(_id)} />
      ) : null}

      {id && accommodationId && steps[step] && !isPreviewed ? (
        <Step
          accommodationId={accommodationId}
          isLoading={updateAccommodation.isLoading}
          name={steps[step].id}
          onSelect={handleNext}
          meta={steps[step].meta}
          payload={steps[step].payload}
        />
      ) : null}

      {id && accommodationId && steps.length < 1 ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text variant="paragraph">No hay pasos para esta publicación</Text>
        </View>
      ) : null}

      {id && accommodationId && steps.length > 0 && isPreviewed ? (
        <Preview
          isLoading={updateAccommodation.isLoading}
          onPublish={handlePublish}
          autor={user}
          accommodationFeatures={steps.reduce(
            (acc, _step) => ({ ...acc, ..._step.payload }),
            {} as AccommodationFeatures
          )}
        />
      ) : null}
    </SafeAreaView>
  );
};

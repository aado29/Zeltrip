import React, { ReactElement, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { CounterField } from '../../../../shared/components/counter-field';
import { Text } from '../../../../shared/components/text';
import { Button } from '../../../../shared/components/button';
import { CheckboxGroup } from '../../../../shared/components/checkbox';
import { RadioGroup } from '../../../../shared/components/radio/radio-group';
import { Divider } from '../../../../shared/components/divider/divider';
import { StepComponentProps } from '../step';

export const SanitaryServices = ({
  onSelect,
  meta,
  payload,
  isLoading,
}: StepComponentProps): ReactElement => {
  const [bathrooms, setBathrooms] = useState(payload.bathrooms ?? 0);
  const [bathroomsType, setBathroomsType] = useState(
    payload.bathroomsType?.id || (meta.bathroomsTypes ?? [])[0]?.id
  );
  const [showers, setShowers] = useState(payload.shower ?? 0);
  const [showersType, setShowersType] = useState(
    payload.showerType?.id || (meta.showerTypes ?? [])[0]?.id
  );
  const [waterTemperatures, setWaterTemperatures] = useState<number[]>(
    (payload.showerTypeWaters ?? []).map((stw) => stw.id)
  );
  const [bathAlternatives, setBathAlternatives] = useState<number[]>(
    (payload.showerTypeOthers ?? []).map((sto) => sto.id)
  );

  const isDisabled = false;

  const handleSelect = (): void => {
    if (isDisabled) {
      return;
    }

    onSelect({
      bathrooms,
      shower: showers,
      bathrooms_type: [
        {
          id: bathroomsType,
        },
      ],
      shower_type: [
        {
          id: showersType,
        },
      ],
      shower_type_other: bathAlternatives.map((bathAlternative) => ({ id: bathAlternative })),
      shower_type_water: waterTemperatures.map((waterTemperature) => ({ id: waterTemperature })),
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 16 }}>
          <Text variant="subtile" style={{ fontWeight: '700', marginBottom: 24, marginTop: 16 }}>
            Servicio sanitario
          </Text>
        </View>

        <View style={{ marginBottom: 8 }}>
          <View style={{ marginBottom: 8 }}>
            <CounterField title="Baños" value={bathrooms} onChange={setBathrooms} />
          </View>
          {bathrooms > 0 ? (
            <RadioGroup
              options={(meta.bathroomsTypes ?? [])?.map((showerType) => ({
                id: showerType.id,
                label: showerType.name,
              }))}
              value={bathroomsType}
              onChange={setBathroomsType}
            />
          ) : null}
        </View>

        <View style={{ marginBottom: 8 }}>
          <View style={{ marginBottom: 8 }}>
            <CounterField title="Ducha" value={showers} onChange={setShowers} />
          </View>
          {showers > 0 ? (
            <>
              <RadioGroup
                options={(meta.showerTypes ?? [])?.map((showerType) => ({
                  id: showerType.id,
                  label: showerType.name,
                }))}
                value={showersType}
                onChange={setShowersType}
              />
              <CheckboxGroup
                withScroll={false}
                title="¿Qué tipo de agua tiene la ducha?"
                value={waterTemperatures}
                options={(meta.showerTypeWaters ?? [])?.map((showerType) => ({
                  id: showerType.id,
                  label: showerType.name,
                  icon: showerType.icon,
                }))}
                onChange={setWaterTemperatures}
              />
            </>
          ) : null}
        </View>

        <Divider />

        <View style={{ paddingBottom: 16 }}>
          <CheckboxGroup
            withScroll={false}
            title="¿Qué otras opciones hay para bañarse?"
            value={bathAlternatives}
            options={(meta.showerTypeOthers ?? [])?.map((showerType) => ({
              id: showerType.id,
              label: showerType.name,
              icon: showerType.icon,
            }))}
            onChange={setBathAlternatives}
          />
        </View>
      </ScrollView>
      <View style={{ paddingHorizontal: 16 }}>
        <Button onPress={handleSelect} disabled={isDisabled || isLoading}>
          {isLoading ? 'Cargando' : 'Siguiente'}
        </Button>
      </View>
    </View>
  );
};

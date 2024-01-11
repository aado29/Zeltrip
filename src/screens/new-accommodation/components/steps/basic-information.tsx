import React, { ReactElement, useState } from 'react';
import { View } from 'react-native';
import { Text } from '../../../../shared/components/text';
import { Button } from '../../../../shared/components/button';
import { CounterField } from '../../../../shared/components/counter-field';
import { SwitchLayout } from '../../../../shared/components/switch/switch-layout';
import { StepComponentProps } from '../step';

export const BasicInformation = ({
  onSelect,
  payload,
  isLoading,
}: StepComponentProps): ReactElement => {
  const [guestCount, setGuestCount] = useState(payload?.guests ?? 0);
  const [allowChildren, setAllowChildren] = useState(payload?.childrenAllowed ?? false);
  const [allowPets, setAllowPets] = useState(payload?.petsPermited ?? false);
  const [petsCount, setPetsCount] = useState(payload?.pets ?? 0);

  const handleSelect = (): void => {
    onSelect({
      guests: guestCount,
      childrens_permited: allowChildren,
      pets_permited: allowPets,
      pets: petsCount,
    });
  };

  const isDisabled = false;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text
          variant="subtile"
          style={{ fontWeight: '700', marginBottom: 24, marginTop: 16, paddingHorizontal: 16 }}
        >
          Información básica
        </Text>

        <View style={{ marginBottom: 8 }}>
          <CounterField
            title="Huéspedes"
            subtitle="Cantidad máxima que acepta."
            value={guestCount}
            onChange={setGuestCount}
          />
        </View>

        <SwitchLayout
          icon="children"
          title="¿Permites menores de edad?"
          subtitle="Niños menores de 12 años"
          value={allowChildren}
          onChange={setAllowChildren}
        />

        <SwitchLayout
          icon="pet"
          title="¿Permites mascotas?"
          value={allowPets}
          onChange={setAllowPets}
        />
        {allowPets ? (
          <CounterField title="Cantidad" value={petsCount} onChange={setPetsCount} />
        ) : null}
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        <Button onPress={handleSelect} disabled={isDisabled || isLoading}>
          {isLoading ? 'Cargando' : 'Siguiente'}
        </Button>
      </View>
    </View>
  );
};

export default BasicInformation;

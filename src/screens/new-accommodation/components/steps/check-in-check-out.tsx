import React, { ReactElement, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button } from '../../../../shared/components/button';
import { Text } from '../../../../shared/components/text';
import { Input } from '../../../../shared/components/input';
import { StepComponentProps } from '../step';

export const CheckInCheckOut = ({
  onSelect,
  payload,
  isLoading,
}: StepComponentProps): ReactElement => {
  const [checkIn, setCheckIn] = useState(payload.checkIn ?? '');
  const [checkOut, setCheckOut] = useState(payload.checkOut ?? '');
  const isDisabled = false;

  const handleSubmit = (): void => {
    onSelect({ check_in: checkIn, check_out: checkOut });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 16 }}>
          <Text variant="subtile" style={{ fontWeight: '700', marginBottom: 32, marginTop: 16 }}>
            Check In - Check Out
          </Text>
        </View>

        <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
          <Text variant="paragraph" style={{ fontWeight: '700', marginBottom: 16 }}>
            Check In del alojamiento
          </Text>
          <Input
            label="Desde"
            endIcon="clock"
            size="lg"
            value={checkIn}
            type="time"
            onChangeText={setCheckIn}
          />
        </View>

        <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          <Text variant="paragraph" style={{ fontWeight: '700', marginBottom: 16 }}>
            Check Out del alojamiento
          </Text>
          <Input
            label="Hasta"
            endIcon="clock"
            size="lg"
            value={checkOut}
            type="time"
            onChangeText={setCheckOut}
          />
        </View>
      </ScrollView>
      <View style={{ paddingHorizontal: 16 }}>
        <Button onPress={handleSubmit} disabled={isDisabled || isLoading}>
          {isLoading ? 'Cargando' : 'Siguiente'}
        </Button>
      </View>
    </View>
  );
};

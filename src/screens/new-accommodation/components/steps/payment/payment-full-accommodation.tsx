import React, { ReactElement, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Divider } from '../../../../../shared/components/divider/divider';
import { Button } from '../../../../../shared/components/button';
import { Text } from '../../../../../shared/components/text';
import { Input } from '../../../../../shared/components/input';
import { useTheme } from '../../../../../theme';
import { IconWrapper } from '../../../../../shared/components/icons/icon-wrapper';
import { Icon } from '../../../../../shared/components/icons';
import { SwipeablePanel } from '../../../../../shared/components/swipeable-panel';

const Selector = () => {
  const [value, setValue] = useState<null | number>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { colors, borderRadius } = useTheme();

  const options = [
    {
      id: 1,
      title: 'Cancelación gratis',
      subtitle:
        'El cliente puede cancelar la reserva hasta 24 horas antes del Check in y es reembolsable el 100% del pago.',
    },
    {
      id: 2,
      title: 'Cancelación moderada',
      subtitle:
        'El cliente puede cancelar la reserva hasta 7 días antes del Check in y es reembolsable el 100% del pago. ',
    },
    {
      id: 3,
      title: 'Cancelación rigurosa',
      subtitle:
        'El cliente puede cancelar hasta 30 días antes del Check in y es reembolsable el 100% del pago.',
    },
  ];

  const handlePress = (id: number) => {
    setValue(id === value ? null : id);
    setIsOpen(false);
  };

  return (
    <>
      <TouchableOpacity style={{ paddingHorizontal: 16 }} onPress={(): void => setIsOpen(true)}>
        <View
          style={{
            borderWidth: 1,
            borderColor: !value ? colors.gray[100] : colors.pink['500'],
            borderRadius: borderRadius.md,
            paddingRight: 8,
          }}
        >
          <View
            style={{
              flex: 1,
              height: 56,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', padding: 8 }}>
              <IconWrapper name="no-money" isActive={!!value} />
              <Text variant="paragraph" style={{ marginLeft: 8 }} color={['blue', '500']}>
                {!value ? 'Tipo de cancelación' : options.find(({ id }) => id === value)?.title}
              </Text>
            </View>
            <Icon name={!value ? 'edit' : 'exchange'} />
          </View>
          {value ? (
            <View
              style={{
                borderTopWidth: 1,
                borderColor: colors.gray['200'],
                paddingTop: 8,
                paddingBottom: 16,
                paddingHorizontal: 16,
              }}
            >
              <Text variant="smallparagraph">
                {options.find(({ id }) => id === value)?.subtitle}
              </Text>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
      <SwipeablePanel
        title="Tipo de cancelación"
        isActive={isOpen}
        onClose={() => setIsOpen(false)}
      >
        {options.map(({ id, title, subtitle }) => {
          const isSelected = value === id;

          return (
            <TouchableOpacity
              onPress={(): void => handlePress(id)}
              key={id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingTop: 14,
                paddingBottom: 16,
                backgroundColor: isSelected ? colors.blue['200'] : undefined,
              }}
            >
              <View style={{ flexGrow: 1, flexShrink: 1, paddingRight: 12 }}>
                <Text
                  variant="paragraph"
                  style={{ fontWeight: '700', marginBottom: 10 }}
                  color={['blue', '800']}
                >
                  {title}
                </Text>
                <Text variant="smallparagraph">{subtitle}</Text>
              </View>
              <View style={{ flexShrink: 0 }}>
                <MaterialIcons
                  name={isSelected ? 'radio-button-on' : 'radio-button-off'}
                  color={isSelected ? colors.pink[500] : colors.blue[700]}
                  size={24}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </SwipeablePanel>
    </>
  );
};

export const PaymentFullAccommodation = ({
  onSelect,
}: {
  onSelect: (props: { accommodationFee: string; cleaningFee: string | null }) => void;
}): ReactElement => {
  const [accommodationFee, setAccommodationFee] = useState('');
  const [cleaningFee, setCleaningFee] = useState('0');
  const isDisabled = false;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 16 }}>
          <Text variant="subtile" style={{ fontWeight: '700', marginBottom: 24, marginTop: 16 }}>
            Cobro
          </Text>
        </View>

        <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
          <Text variant="paragraph" style={{ fontWeight: '700', marginBottom: 16 }}>
            Tarifa alojamiento completo
          </Text>
          <Input
            label="Por noche"
            startIcon="money"
            size="lg"
            value={accommodationFee}
            keyboardType="numeric"
            onChangeText={setAccommodationFee}
          />
        </View>

        <View style={{ marginBottom: 16 }}>
          <Text
            variant="paragraph"
            style={{ fontWeight: '700', marginBottom: 16, paddingHorizontal: 16 }}
          >
            ¿Qué harás si el huésped cancela?
          </Text>
          <Selector />
        </View>

        <Divider />

        <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          <Text variant="paragraph" style={{ fontWeight: '700', marginBottom: 16 }}>
            Tarifa de limpieza (Opcional)
          </Text>
          <Input
            startIcon="money"
            size="lg"
            value={cleaningFee}
            keyboardType="numeric"
            onChangeText={setCleaningFee}
          />
        </View>
      </ScrollView>
      <View style={{ paddingHorizontal: 16 }}>
        <Button
          onPress={(): void => onSelect({ accommodationFee, cleaningFee })}
          disabled={isDisabled}
        >
          Siguiente
        </Button>
      </View>
    </View>
  );
};

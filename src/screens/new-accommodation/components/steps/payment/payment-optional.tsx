import React, { ReactElement, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button } from '../../../../../shared/components/button';
import { Text } from '../../../../../shared/components/text';
import { Theme, useTheme } from '../../../../../theme';
import { Icon, IconName } from '../../../../../shared/components/icons';

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    rootStyles: {
      paddingHorizontal: 16,
      height: 40,
      borderWidth: 1,
      justifyContent: 'center',
      borderRadius: 8,
    },
    activeRootStyles: {
      borderWidth: 2,
      borderColor: theme.colors.pink['500'],
    },
  });

const ButtonSelector = ({
  children,
  isActive,
  onPress,
}: {
  children: string;
  isActive: boolean;
  onPress: () => void;
}): ReactElement => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const rootStyles = { ...styles.rootStyles, ...(isActive ? styles.activeRootStyles : {}) };

  return (
    <TouchableOpacity style={rootStyles} onPress={onPress}>
      <Text variant="paragraph">{children}</Text>
    </TouchableOpacity>
  );
};

const Selector = () => {
  const [value, setValue] = useState<Record<number, boolean>>({});
  const options: { id: number; icon: IconName; title: string }[] = [
    {
      id: 1,
      icon: 'jars',
      title: 'Tinajas',
    },
    {
      id: 2,
      icon: 'jacuzzi',
      title: 'Jacuzzi',
    },
    {
      id: 3,
      icon: 'baths',
      title: 'Termas',
    },
  ];

  const handlePress = (id: number, isPaid?: boolean): void => {
    const newValue = { ...value };
    newValue[id] = Boolean(isPaid);
    setValue(newValue);
  };

  return (
    <>
      {options.map(({ id, icon, title }) => (
        <View
          key={id}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 72,
            paddingHorizontal: 16,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ marginRight: 8 }}>
              <Icon name={icon} />
            </View>
            <Text variant="paragraph">{title}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginRight: 8 }}>
              <ButtonSelector isActive={!value[id]} onPress={(): void => handlePress(id)}>
                Gratis
              </ButtonSelector>
            </View>
            <ButtonSelector isActive={value[id]} onPress={(): void => handlePress(id, true)}>
              De pago
            </ButtonSelector>
          </View>
        </View>
      ))}
    </>
  );
};

export const PaymentOptional = ({
  onSelect,
}: {
  onSelect: (props: { accommodationFee: string; cleaningFee: string | null }) => void;
}): ReactElement => {
  const isDisabled = false;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text variant="subtile" style={{ fontWeight: '700', marginTop: 16, marginBottom: 6 }}>
            Cobro
          </Text>
          <Text variant="paragraph">Estos serán cancelados en el alojamiento</Text>
        </View>
        <Selector />
      </ScrollView>
      <View style={{ paddingHorizontal: 16 }}>
        <Button onPress={(): void => onSelect({})} disabled={isDisabled}>
          Siguiente
        </Button>
      </View>
    </View>
  );
};

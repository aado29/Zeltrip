import React, { ReactElement, useEffect } from 'react';
import { SafeAreaView, View, TouchableOpacity, ScrollView } from 'react-native';

import { useAccommodations } from '../../api-queries/queries/accommodation.query';
import { Text } from '../../shared/components/text';
import { AppNavigationProp } from '../../config/navigation/type';
import { Icon } from '../../shared/components/icons';

export const MyAccommodations = ({
  navigation,
}: {
  navigation: AppNavigationProp;
}): ReactElement => {
  const { data = [], isLoading } = useAccommodations();

  useEffect(() => {
    navigation.setOptions({
      title: 'Mis publicaciones',
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingBottom: 16 }}>
      {isLoading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text variant="paragraph">Cargando...</Text>
        </View>
      ) : null}

      {!isLoading && data.length < 1 ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text variant="subtile">No hay publicaciones</Text>
        </View>
      ) : null}

      {!isLoading && data.length > 0 ? (
        <ScrollView style={{ paddingHorizontal: 16 }}>
          {data.map((accommodation) => (
            <View key={accommodation.id} style={{ borderBottomWidth: 1, paddingBottom: 8 }}>
              <View style={{ flexDirection: 'row', paddingVertical: 8 }}>
                {accommodation.accommodationType.icon && (
                  <Icon name={accommodation.accommodationType.icon} />
                )}
                <Text variant="paragraph" style={{ fontWeight: '700' }}>
                  #{accommodation.id}
                </Text>
                <Text variant="paragraph"> - {accommodation.accommodationType.name}</Text>
                <Text variant="paragraph"> - {accommodation.status}</Text>
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate('NewAccommodation', { id: accommodation.id })}
              >
                <Text variant="paragraph">Editar</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
};

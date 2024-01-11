import React, { ReactElement, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button } from '../../../../shared/components/button';
import { Text } from '../../../../shared/components/text';
import { Input } from '../../../../shared/components/input';
import { StepComponentProps } from '../step';

const MAX_TITLE_LENGTH = 100;
const MAX_DESCRIPTION_LENGTH = 2000;

export const Description = ({ onSelect, payload, isLoading }: StepComponentProps): ReactElement => {
  const [title, setTitle] = useState(payload.title ?? '');
  const [description, setDescription] = useState(payload.description ?? '');

  const isDisabled = useMemo(
    () =>
      !title.length ||
      title.length > MAX_TITLE_LENGTH ||
      !description.length ||
      description.length > MAX_DESCRIPTION_LENGTH,
    [title, description]
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 16 }}>
          <Text variant="subtile" style={{ fontWeight: '700', marginBottom: 32, marginTop: 16 }}>
            Descripción del alojamiento
          </Text>
        </View>

        <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
          <Input
            label="Titulo"
            size="lg"
            value={title}
            onChangeText={setTitle}
            message={`${title.length}/${MAX_TITLE_LENGTH}`}
            overwriteStyles={{
              messageStyles: { textAlign: 'right', width: '100%' },
            }}
          />
        </View>

        <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          <Input
            label="¿Qué descripción tendrá tu alojamiento?"
            size="lg"
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
            numberOfLines={9}
            message={`${description.length}/${MAX_DESCRIPTION_LENGTH}`}
            overwriteStyles={{
              inputStyles: { height: 178, paddingHorizontal: 16 },
              rootStyles: { paddingVertical: 16 },
              messageStyles: { textAlign: 'right', width: '100%' },
            }}
          />
        </View>
      </ScrollView>
      <View style={{ paddingHorizontal: 16 }}>
        <Button
          onPress={(): void => onSelect({ title, description })}
          disabled={isDisabled || isLoading}
        >
          {isLoading ? 'Cargando' : 'Siguiente'}
        </Button>
      </View>
    </View>
  );
};

import React, { ReactElement, useState } from 'react';
import { View } from 'react-native';
import { Text } from '../../../../../shared/components/text';
import { Button } from '../../../../../shared/components/button';

export const Description = ({
  subtitle,
  content,
}: {
  subtitle: string;
  content: string;
}): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  const buttonTitle = isOpen ? 'Ver menos' : 'Ver más';
  const visibleContent = isOpen ? content : content.split(' ').slice(0, 22).join(' ').concat('...');

  return (
    <View>
      <Text variant="paragraph" style={{ marginBottom: 12, fontWeight: '700' }}>
        Descripción
      </Text>
      <Text variant="paragraph" color="#56659D" style={{ fontWeight: '700', marginBottom: 4 }}>
        {subtitle}
      </Text>
      <Text variant="paragraph" color="#56659D" style={{ marginBottom: 16 }}>
        {visibleContent}
      </Text>
      <Button kind="outline" onPress={(): void => setIsOpen(!isOpen)}>
        {buttonTitle}
      </Button>
    </View>
  );
};

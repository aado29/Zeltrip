import React, { ReactElement } from 'react';
import { View } from 'react-native';

import { Text } from '../../../../../shared/components/text';
import { Button } from '../../../../../shared/components/button';
import { User } from '../../../../../interfaces/user';

import { Tag } from './tag';
import { HostIndicators } from './host-indicator';

export const HostCard = ({ user }: { user?: User }): ReactElement => {
  return (
    <View style={{ paddingHorizontal: 16 }}>
      <Text variant="paragraph" color="#222D4B" style={{ fontWeight: '700', marginBottom: 16 }}>
        Anfitrión
      </Text>

      <View
        style={{
          width: 40,
          height: 40,
          backgroundColor: 'gray',
          borderRadius: 20,
          marginBottom: 8,
        }}
      />

      <Text variant="paragraph" color="#222D4B" style={{ fontWeight: '700' }}>
        {user?.firstName} {user?.lastName}
      </Text>

      <Text variant="smallparagraph" style={{ marginBottom: 8 }}>
        Anfitrión desde 20/05/2021
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Tag
          name="Anfitrión"
          icon="hosting"
          overwriteStyles={{
            rootStyles: { backgroundColor: '#F1F6FA', marginRight: 8 },
          }}
        />

        <Tag
          name="4.1"
          icon="start"
          overwriteStyles={{
            iconStyles: { color: '#ABAE08' },
            rootStyles: { backgroundColor: '#F1F6FA' },
          }}
        />
      </View>

      <View style={{ marginVertical: 24 }}>
        <HostIndicators publication={2} responseRate={90} reviews={230} />
      </View>

      <Text variant="paragraph" color="#222D4B" style={{ fontWeight: '700' }}>
        Sobre
      </Text>

      <Text variant="paragraph" style={{ marginBottom: 24 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </Text>

      <Button kind="outline">Contactar al anfitrión</Button>
    </View>
  );
};

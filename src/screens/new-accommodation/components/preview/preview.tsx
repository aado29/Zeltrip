import React, { ReactElement } from 'react';
import { ScrollView, View } from 'react-native';

import { Text } from '../../../../shared/components/text';
import { IconName } from '../../../../shared/components/icons';
import { Button } from '../../../../shared/components/button';
import { AccommodationFeatures } from '../../../../interfaces/accommodation';
import { User } from '../../../../interfaces/user';

import { Rating } from './components/rating';
import { MainBox } from './components/main-box';
import { Box, BoxWrapper } from './components/box';
import { List } from './components/list';
import { HostCard } from './components/host-card';
import { Tag } from './components/tag';
import { Description } from './components/description';
import { Gallery } from './components/gallery';
import { Divider } from './components/divider';

interface PreviewProps {
  isLoading?: boolean;
  accommodationFeatures: AccommodationFeatures;
  autor?: User;
  onPublish: () => void;
}

const data = {
  type: {
    name: 'Alojamineto entero',
    tagName: 'Alojamiento',
    icon: 'hosting' as IconName,
  },
  rating: 4.1,
  reviews: 20,
  sustainability: [
    {
      title: 'Orgánico',
      subtitle:
        'Utilizar productos y materiales fabricados sin fertilizantes, persticidadas, ni OMG',
    },
    {
      title: 'Eco-Friendly',
      subtitle: 'Utiliza productos y materiales no tóxicos y sin químicos',
    },
    {
      title: 'Ético',
      subtitle:
        'Funciona de manera justa y utiliza prácticas y productos libres y libres de crueldad',
    },
  ],
};

export const Preview = ({
  autor,
  accommodationFeatures: {
    title = '',
    description = '',
    region = '',
    commune = '',
    street = '',
    category,
    guests,
    rooms,
    bathrooms,
    shower,
    basicServices: _basicServices,
    facilities,
    airConditioning,
    parkingType,
    parkingCount,
    hostingType,
    photos = [],
  },
  isLoading = false,
  onPublish,
}: PreviewProps): ReactElement => {
  const { type } = data;

  const location = `${street}, ${commune}, ${region}`;

  const accommodationOverview = [
    { content: category?.name, icon: category?.icon, title: 'Tipo' },
    { content: guests, icon: 'users' as IconName, title: 'Huespedes' },
    { content: rooms?.length, icon: 'door' as IconName, title: 'Dormitorios' },
    {
      content: (rooms ?? []).reduce(
        (acc, r) => acc + r.beds.reduce((accB, b) => accB + b.count, 0),
        0
      ),
      icon: 'bed' as IconName,
      title: 'Camas',
    },
    { content: bathrooms, icon: 'toilet' as IconName, title: 'Baño' },
    { content: shower, icon: 'bathroom' as IconName, title: 'Duchas' },
  ];

  const basicServices = (_basicServices ?? []).map((bs) => ({ icon: bs.icon, title: bs.name }));

  const accessibility = [
    {
      icon: 'parking' as IconName,
      title: 'Estacionamiento para personas en situación de discapacidad',
    },
    { icon: 'bathroom' as IconName, title: 'Baños para personas en situación de discapacidad' },
    { icon: 'elevator' as IconName, title: 'Ascensor' },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <Gallery photos={photos} />

        <View style={{ flex: 1, paddingVertical: 24 }}>
          <View style={{ paddingHorizontal: 16 }}>
            <View style={{ flexDirection: 'row' }}>
              <Tag name={type.tagName} icon={type.icon} />
            </View>

            <Text variant="subtile" style={{ fontWeight: '700', marginTop: 6, marginBottom: 4 }}>
              {title}
            </Text>

            <Text variant="paragraph">{location}</Text>

            {/* <Rating rating={reviews={reviews} /> */}

            <View style={{ marginTop: 16, marginBottom: 32 }}>
              <MainBox cancellationType="Gratis" serviceType={hostingType?.name ?? ''} />
            </View>
          </View>

          <BoxWrapper title="Resumen del Alojamiento">
            {accommodationOverview.map(({ content, icon, title: _title }) => (
              <Box key={_title} content={content ?? ''} icon={icon} title={_title} />
            ))}
          </BoxWrapper>

          <Divider />

          <View style={{ paddingHorizontal: 16 }}>
            <Description subtitle={title} content={description} />
          </View>

          <Divider size="lg" />

          <BoxWrapper title="¿Dónde dormiras?">
            {(rooms ?? []).map((room, indexRoom) => (
              <Box
                key={room.beds.map((b) => `${b.count} - ${b.bedType.name}`).join(',')}
                content={room.beds.map((b) => `${b.count} - ${b.bedType.name}`).join(',')}
                icon="bed"
                title={`Habitación ${indexRoom + 1}`}
              />
            ))}
          </BoxWrapper>

          <Divider size="lg" />

          <List title="Servicios básicos" items={basicServices} />

          <Divider size="lg" />

          {/* <List title="Accesibilidad" items={accessibility} />

          <Divider size="lg" /> */}

          <View style={{ paddingHorizontal: 16 }}>
            <Text variant="paragraph" color="#222D4B" style={{ fontWeight: '700' }}>
              Ubicacion del alojamiento
            </Text>
            <Text variant="smallparagraph">{location}</Text>
          </View>

          <Divider />

          <BoxWrapper title="Acceso al alojamiento">
            <Box content={parkingCount ?? 0} icon="car" title={parkingType?.name} />
          </BoxWrapper>

          <Divider />

          {/* <BoxWrapper title="Actividades del alojamiento">
            <Box content="Pesca" icon="fishing" title="Gratis" />
            <Box content="Kayak" icon="kayak" title="De pago" />
          </BoxWrapper>

          <Divider /> */}

          {/* <BoxWrapper title="Entorno cerca del alojamiento">
            <Box content="Montaña" icon="mountains" />
            <Box content="Hospital" icon="hosting" />
            <Box content="playa" icon="beach" />
          </BoxWrapper>

          <Divider size="lg" /> */}

          {/* <List title="Sustentabilidad" items={sustainability} />

          <Divider size="lg" /> */}

          <BoxWrapper title="Instalaciones">
            {(facilities ?? []).map((facility) => (
              <Box key={facility.id} content={facility.name} icon={facility.icon} />
            ))}
          </BoxWrapper>

          <BoxWrapper title="Climatización">
            {(airConditioning ?? []).map((a) => (
              <Box key={a.id} content={a.name} icon={a.icon} />
            ))}
          </BoxWrapper>

          <Divider size="lg" />

          <HostCard user={autor} />
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 16,
          paddingTop: 16,
          borderTopColor: '#CFCFE2',
          borderTopWidth: 1,
        }}
      >
        <Button kind="primary" onPress={onPublish} disabled={isLoading}>
          {isLoading ? 'Cargando' : 'Finalizar Publicación'}
        </Button>
      </View>
    </View>
  );
};

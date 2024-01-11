import React, { ReactElement, useMemo, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Portal } from '@gorhom/portal';
import { Text } from '../../../../../shared/components/text';
import { Button } from '../../../../../shared/components/button';
import { Icon, IconName } from '../../../../../shared/components/icons';
import { useTheme } from '../../../../../theme';
import { IconWrapper } from '../../../../../shared/components/icons/icon-wrapper';
import { SwipeablePanel } from '../../../../../shared/components/swipeable-panel';
import { ListItemProps } from '../../../../../shared/components/list';
import RoomFactory from './room-factory';
import { useToaster } from '../../../../../contexts/toaster-provider';
import { DeleteRoomConfirmationModal } from './delete-room-confirmation-modal';
import { StepComponentProps } from '../../step';
import { RoomData } from '../../../../../interfaces/accommodation';

export const ClickableItem = ({
  title,
  icon,
  onPress,
}: {
  title: string;
  icon: IconName;
  onPress?: () => void;
}): ReactElement => {
  return (
    <TouchableOpacity onPress={onPress ? () => onPress() : undefined}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 60,
          paddingHorizontal: 16,
        }}
      >
        <Icon name={icon} />
        <Text variant="paragraph" style={{ marginLeft: 8 }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const calculateOriginalRooms = (roomTotals: RoomData[]): number[][] => {
  return roomTotals.map((room) =>
    room.beds.reduce(
      (acc, { bedType, count }) => acc.concat(Array.from({ length: count }).map(() => bedType.id)),
      [] as number[]
    )
  );
};

const RoomList = ({
  rooms,
  bedTypes,
  onRemove,
  onEdit,
  onDuplicate,
}: {
  rooms: number[][];
  bedTypes: ListItemProps[];
  onRemove: (index: number) => void;
  onEdit: (index: number) => void;
  onDuplicate: (index: number) => void;
}): ReactElement => {
  const [indexBed, setIndexBed] = useState<number | null>(null);
  const { borderRadius, colors } = useTheme();

  const getTitle = (room: string[]): string => {
    const bedCount = room.length;
    return `${bedCount} ${bedCount === 1 ? 'cama' : 'camas'}`;
  };

  const getSubtitle = (room: string[]): string => {
    return room
      .map((bedId) => bedTypes.find((bedType) => bedType.id === bedId)?.title ?? 'unknown')
      .join(', ');
  };

  return (
    <ScrollView>
      {rooms.map((room, indexRoom) => (
        <View
          // eslint-disable-next-line react/no-array-index-key
          key={indexRoom}
          style={{
            borderRadius: borderRadius.md,
            borderWidth: 1,
            borderColor: colors.gray[100],
            marginBottom: 16,
          }}
        >
          <TouchableOpacity
            onPress={() => onEdit(indexRoom)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 16,
              paddingLeft: 16,
              paddingRight: 12,
              borderBottomWidth: 1,
              borderBottomColor: colors.gray[100],
            }}
          >
            <Text variant="paragraph" style={{ fontWeight: '700', flexGrow: 1 }}>
              {`Habitación #${indexRoom + 1}`}
            </Text>
            <TouchableOpacity onPress={(): void => setIndexBed(indexRoom)}>
              <Icon name="more" />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: 'row', padding: 16 }}
            onPress={() => onEdit(indexRoom)}
          >
            <IconWrapper name="bed" isActive />
            <View style={{ flex: 1, flexGrow: 1, paddingLeft: 8 }}>
              <Text variant="paragraph" style={{ fontWeight: '700' }}>
                {getTitle(room)}
              </Text>
              <Text variant="paragraph">{getSubtitle(room)}</Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
      {indexBed !== null && (
        <SwipeablePanel
          isActive={indexBed !== null}
          title={`Opciones habitación #${indexBed + 1}`}
          onClose={() => setIndexBed(null)}
        >
          <View>
            <ClickableItem
              title="Editar habitación"
              icon="edit"
              onPress={() => {
                onEdit(indexBed);
                setIndexBed(null);
              }}
            />
            <ClickableItem
              title="Duplicar habitación"
              icon="duplicate"
              onPress={() => {
                onDuplicate(indexBed);
                setIndexBed(null);
              }}
            />
            <ClickableItem
              title="Eliminar habitación"
              icon="delete"
              onPress={() => {
                onRemove(indexBed);
                setIndexBed(null);
              }}
            />
          </View>
        </SwipeablePanel>
      )}
    </ScrollView>
  );
};

export const RoomDetails = ({
  onSelect,
  meta,
  payload,
  isLoading,
}: StepComponentProps): ReactElement => {
  const [indexRoom, setIndexRoom] = useState<number | null>(null);
  const [roomIndexToDelete, setRoomIndexToDelete] = useState<null | number>(null);
  const [rooms, setRooms] = useState<number[][]>(() => calculateOriginalRooms(payload.rooms ?? []));
  const [isModalRoomOpen, setIsModalRoomOpen] = useState(false);
  const toaster = useToaster();

  const id = useMemo(
    () => (indexRoom !== null ? indexRoom + 1 : rooms.length + 1),
    [indexRoom, rooms]
  );

  const initialValues = useMemo(
    () => (indexRoom !== null ? rooms[indexRoom] : undefined),
    [indexRoom, rooms]
  );

  const bedTypes: ListItemProps[] = useMemo(
    () =>
      (meta.bedTypes ?? []).map((bedType) => ({
        id: bedType.id,
        title: bedType.name,
        icon: bedType.icon,
      })),
    [meta]
  );

  const handleSaveRoom = (roomData: number[]) => {
    const sanitizedRoomData = roomData.filter((bed) => bed);

    if (indexRoom !== null) {
      const newRooms = rooms;
      newRooms[indexRoom] = sanitizedRoomData;
      setRooms(newRooms);
      setIndexRoom(null);
    } else {
      setRooms(rooms.concat([sanitizedRoomData]));
    }

    setIsModalRoomOpen(false);
  };

  const handleRemoveRoom = (index: number) => {
    const newRooms = [...rooms.slice(0, index), ...rooms.slice(index + 1)];
    setRooms(newRooms);

    const toastId = toaster.show(`Habitación #${index + 1} eliminada`, {
      data: {
        rollback: () => {
          setRooms(rooms);
          toaster.hide(toastId);
        },
      },
    });
  };

  const handleDuplicateRoom = (index: number) => {
    const newRooms = [...rooms, rooms[index]];
    setRooms(newRooms);

    const toastId = toaster.show(`Habitación #${index + 1} duplicada`, {
      data: {
        rollback: () => {
          setRooms(rooms);
          toaster.hide(toastId);
        },
      },
    });
  };

  const handleEdit = (index: number) => {
    setIndexRoom(index);
    setIsModalRoomOpen(true);
  };

  const handleSubmit = (): void => {
    onSelect({
      rooms: rooms.map((room) => {
        const roomBeds: Map<number, number> = new Map();

        room.forEach((bedTypeId) => {
          const sum = (roomBeds.get(bedTypeId) || 0) + 1;
          roomBeds.set(bedTypeId, sum);
        });

        return {
          beds: Array.from(roomBeds.entries(), ([bedTypeId, count]) => {
            return {
              bed_type: [
                {
                  id: bedTypeId,
                },
              ],
              count,
            };
          }),
        };
      }),
    });
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 16 }}>
          <Text variant="subtile" style={{ fontWeight: '700', marginBottom: 24, marginTop: 16 }}>
            Habitación
          </Text>
          {rooms.length > 0 ? (
            <RoomList
              bedTypes={bedTypes}
              rooms={rooms}
              onRemove={setRoomIndexToDelete}
              onEdit={handleEdit}
              onDuplicate={handleDuplicateRoom}
            />
          ) : null}
          <Button
            kind="outline"
            onPress={(): void => setIsModalRoomOpen(true)}
            startEnhancer={<Icon name="plus-circle" />}
          >
            Agregar habitación
          </Button>
        </View>
        <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          <Button onPress={handleSubmit} disabled={rooms.length < 1 || isLoading}>
            {isLoading ? 'Cargando' : 'Siguiente'}
          </Button>
        </View>
      </View>

      {isModalRoomOpen ? (
        <Portal>
          <RoomFactory
            id={id}
            initialValue={initialValues}
            bedTypes={bedTypes}
            onSave={handleSaveRoom}
            onClose={() => {
              setIsModalRoomOpen(false);
              setIndexRoom(null);
            }}
          />
        </Portal>
      ) : null}

      <DeleteRoomConfirmationModal
        index={roomIndexToDelete ?? 0}
        isOpen={roomIndexToDelete !== null}
        onClose={() => {
          setRoomIndexToDelete(null);
        }}
        onDelete={(): void => {
          if (roomIndexToDelete !== null) {
            handleRemoveRoom(roomIndexToDelete);
          }
          setRoomIndexToDelete(null);
        }}
      />
    </>
  );
};

export default RoomDetails;

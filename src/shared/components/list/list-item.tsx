import React, { ReactElement, useCallback, useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { TouchableHighlight, View } from 'react-native';
import { useTheme } from '../../../theme';
import { Text } from '../text';
import ListItemSubmenu from './list-item-submenu';
import { IconProps, IconName } from '../icons';
import IconWrapper from '../icons/icon-wrapper';

export interface ListItemProps {
  id?: string | number;
  icon?: IconName;
  title?: string;
  subtitle?: string;
  children?: Omit<ListItemProps, 'children'>[];
  isActive?: boolean;
  value?: string | number;
  endEnhancer?: (iconProps: Partial<IconProps>) => ReactElement;
  onPress?: (id: string | number) => void;
}

const getTextColor = (isActive: boolean): string | string[] =>
  !isActive ? ['blue', '500'] : ['blue', '700'];

export const ListItem = ({
  id = 0,
  icon,
  title = '',
  subtitle,
  children,
  isActive = false,
  value,
  endEnhancer = ({ size }) => <Entypo name="chevron-small-down" size={size ?? 24} />,
  onPress,
}: ListItemProps): JSX.Element => {
  const { borderRadius, colors } = useTheme();
  const [isPanelActive, setIsPanelActive] = useState(false);

  const handlePress = () => {
    if (children?.length) {
      setIsPanelActive(true);
    } else if (onPress) {
      onPress(id);
    }
  };

  const onChange = useCallback(
    (selectedId: string | number): void => {
      if (onPress) {
        onPress(selectedId);
        setIsPanelActive(false);
      }
    },
    [onPress]
  );

  return (
    <>
      <TouchableHighlight
        onPress={handlePress}
        underlayColor="trasparent"
        accessible
        accessibilityLabel={title}
        accessibilityHint={subtitle}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: borderRadius.md,
            borderWidth: 2,
            height: 56,
            padding: 6,
            borderColor: !isActive ? colors.gray[100] : colors.pink['450'],
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {icon ? <IconWrapper name={icon} isActive={isActive} /> : null}
            <View style={{ marginLeft: 8 }}>
              <Text
                variant="paragraph"
                color={getTextColor(isActive)}
                style={{ fontWeight: !subtitle ? '400' : '700' }}
              >
                {title}
              </Text>
              {subtitle && (
                <Text variant="smallparagraph" color={getTextColor(isActive)}>
                  {subtitle}
                </Text>
              )}
            </View>
          </View>
          {children?.length && <View style={{ paddingRight: 4 }}>{endEnhancer({ size: 24 })}</View>}
        </View>
      </TouchableHighlight>
      {children?.length ? (
        <ListItemSubmenu
          isActive={isPanelActive}
          title={title}
          onClose={(): void => setIsPanelActive(false)}
          onChange={onChange}
          items={children}
          value={value}
        />
      ) : null}
    </>
  );
};

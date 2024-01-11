import React, { ReactElement } from 'react';
import { View, Text, StyleProp, ViewStyle } from 'react-native';

const Divider = ({
  title,
  style,
  color = 'white',
}: {
  title: string;
  style: StyleProp<ViewStyle>;
  color: string;
}): ReactElement => {
  return (
    <View style={[{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }, style]}>
      <View
        style={{
          flexGrow: 1,
          borderWidth: 0.6,
          borderColor: color,
          height: 1,
          marginHorizontal: 0,
        }}
      />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <Text style={{ color, fontSize: 12 }}>{title}</Text>
      </View>
      <View
        style={{
          flexGrow: 1,
          borderWidth: 0.6,
          borderColor: color,
          height: 1,
          marginHorizontal: 0,
        }}
      />
    </View>
  );
};

export default Divider;

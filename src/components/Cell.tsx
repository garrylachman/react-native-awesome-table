import React from 'react';
import {View, StyleSheet, ViewProps } from 'react-native';

type CellProps = {
  children: React.ReactElement,
  style?: {}
  flex?: number
} & ViewProps;

const Cell = (props: CellProps) => {
  const {
    children,
    flex=1,
    style={}
  } = props;

  return (
    <View style={[styles.container, style, {flex: flex}]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  }
})

export default Cell;
import React from 'react';
import {View, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';

type RowProps = {
  style?: {},
  children: React.ReactElement|React.ReactElement[]
} & TouchableOpacityProps;

const Row = (props: RowProps) => {
  const {
    children,
    style = {}
  } = props;

  console.log(children)

  return (
    <TouchableOpacity style={[styles.container, style]}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
  }
})

export default Row;
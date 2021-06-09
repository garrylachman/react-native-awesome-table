import React from 'react';
import { storiesOf } from '@storybook/react';
import Cell from './Cell';
import { Text } from 'react-native'

storiesOf('Cell', module)
  .add('default',
    () => <Cell><Text>Text</Text></Cell>
  )
import React from 'react';
import { storiesOf } from '@storybook/react';
import Row from './Row';
import Cell from './Cell'
import { Text } from 'react-native'

import { color, withKnobs, select } from '@storybook/addon-knobs';

storiesOf('Row', module)
  .addDecorator(withKnobs)
  .add('no flex',
    () => <Row>
          <Cell key={'row-1-cel-1'}><Text>Text1</Text></Cell>
          <Cell key={'row-1-cel-2'}><Text>Text2</Text></Cell>
        </Row>
  )
  .add('cell styling',
    () => {
      const label = 'Cell Background';
      const defaultValue = '#C1C1C1';
      const bgColor = color(label, defaultValue);

      const withPadding = select('Cell Padding', ['yes', 'no'], 'no');
      const paddingStyle = withPadding === 'yes' ? {padding: 5} : {};

      const withMargin = select('Cell Margin', ['yes', 'no'], 'no');
      const marginStyle = withMargin === 'yes' ? {margin: 5} : {};

      return (
      <Row>
        <Cell key={'row-1-cel-1'} style={[{backgroundColor: bgColor}, paddingStyle, marginStyle]}><Text>Text1</Text></Cell>
        <Cell key={'row-1-cel-2'} style={[{backgroundColor: bgColor}, paddingStyle, marginStyle]}><Text>Text2</Text></Cell>
      </Row>
      )
    }
  )
  .add('flex 1-1-3',
    () => <Row>
          <Cell flex={1} key={'row-2-cel-1'}><Text>flex-1</Text></Cell>
          <Cell flex={1} key={'row-3-cel-2'}><Text>flex-1</Text></Cell>
          <Cell flex={3} key={'row-4-cel-2'}><Text>flex-3</Text></Cell>
        </Row>
  )
  .add('flex 1-3-1-1-5',
    () => <Row>
          <Cell flex={1} key={'row-2-cel-1'}><Text>flex-1</Text></Cell>
          <Cell flex={3} key={'row-3-cel-2'}><Text>flex-3</Text></Cell>
          <Cell flex={1} key={'row-4-cel-2'}><Text>flex-1</Text></Cell>
          <Cell flex={1} key={'row-4-cel-2'}><Text>flex-1</Text></Cell>
          <Cell flex={5} key={'row-4-cel-2'}><Text>flex-5</Text></Cell>
        </Row>
  )
  .add('multi-row',
    () => <>
      <Row>
        <Cell flex={1} key={'row-2-cel-1'}><Text>flex-1</Text></Cell>
        <Cell flex={1} key={'row-3-cel-2'}><Text>flex-1</Text></Cell>
        <Cell flex={3} key={'row-4-cel-2'}><Text>flex-3</Text></Cell>
      </Row>
      <Row>
        <Cell flex={1} key={'row-2-cel-1'}><Text>flex-1</Text></Cell>
        <Cell flex={1} key={'row-3-cel-2'}><Text>flex-1</Text></Cell>
        <Cell flex={3} key={'row-4-cel-2'}><Text>flex-3</Text></Cell>
      </Row>
    </>
  )
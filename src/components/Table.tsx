import React from 'react';
import {View, StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native';
import Row from './Row';
import Cell from './Cell';

type GetCellProp = {
  getCell?: ({data, rowIndex, columnIndex}:CellContentProps) => React.ReactElement
}

export type ColumnProps = {
  flex: number,
  title: string,
  dataKey: string,
} & GetCellProp;

export type CellContentProps = {
  data: any,
  rowIndex: number,
  columnIndex: number
}

type GetCellHandlerProps = {
  column: ColumnProps, 
} & CellContentProps

export type TableProps = {
  rowStyle?: {},
  headerRowStyle?: {},
  headerRowTextStyle?: {},
  columns: ColumnProps[],
  data: any[],
  showHeader: boolean,
  onPress?: (data: any) => {},
  stickyHeader: boolean,
  contentHeight?: number | string,
  isLoading:boolean,
  loadingText: string,
  loaddingTextStyle?: {},
  flexAutoAdjustment?: boolean
}

type StickyWrapperProps = {
  sticky: boolean,
  children: any,
  style: any
}

const GetCellDefaultHandler = ({data, rowIndex, columnIndex}:CellContentProps) => (
  <Text>{data}</Text>
)

const GetCellHandler = ({column, ...args}: GetCellHandlerProps) => {
  if (!column.getCell) {
    return <GetCellDefaultHandler {...args} />
  }
  return <column.getCell {...args} />
}

const StickyWrapper = ({sticky, children, style}:StickyWrapperProps) => {
  if (sticky) {
    return <ScrollView style={style}>{children}</ScrollView>
  }
  return <View style={style}>{children}</View>
}

const Table = (props: TableProps) => {
  const {
    rowStyle = {},
    headerRowStyle = {},
    headerRowTextStyle = {},
    columns,
    data = [],
    showHeader = true,
    onPress,
    stickyHeader = true,
    contentHeight = "auto",
    isLoading = false,
    loadingText = "Loading...",
    loaddingTextStyle = {},
    flexAutoAdjustment = false
  } = props;

  const adjustColumns = React.useMemo<ColumnProps[]>(() => {
    // No auto adjustment, return user definded columns
    if (!flexAutoAdjustment)  {
      return columns;
    }
    let totalLength:number, precent:number;
    // No data, adjust columns by title only
    if (data.length == 0) {
      totalLength = columns.map(c => c.title.length).reduce((a,b) => a + b, 0);
      precent = 100/totalLength;
      return [...columns].map(c => ({...c, flex: c.title.length * precent}));
    }
    // Have data, adjust by title/data (first row)
    const firstRow = data[0];
    totalLength = columns
      .map(c => Math.max(c.title.length, `${firstRow[c.dataKey]}`.length))
      .reduce((a,b) => a + b, 0);
    precent = 100/totalLength;
    return [...columns].map(c => ({...c, flex: Math.max(c.title.length, `${firstRow[c.dataKey]}`.length) * precent}));
  }, [flexAutoAdjustment, columns, data])

  return (
    <SafeAreaView style={styles.container}>
      {showHeader &&
        <Row style={headerRowStyle}>
        {adjustColumns.map((column, columnIndex) => (
          <Cell key={`row-header-col-${columnIndex}`} flex={column.flex}>
            <Text style={headerRowTextStyle}>{column.title}</Text>
          </Cell>
        ))}
        </Row>
      }
      <StickyWrapper style={{height: contentHeight}} sticky={stickyHeader}>
      {isLoading &&
        <Text style={loaddingTextStyle}>{loadingText}</Text>
      }
      {!isLoading && data.map((dataRow, rowIndex) => (
        <Row key={`row-${rowIndex}`} style={rowStyle} onPress={onPress}>
          {adjustColumns.map((column, columnIndex) => (
            <Cell key={`row-${rowIndex}-col-${columnIndex}`} flex={column.flex}>
              <GetCellHandler
                column={column}
                data={data[rowIndex][column.dataKey]}
                rowIndex={rowIndex}
                columnIndex={columnIndex}
              />
            </Cell>
          ))}
        </Row>
      ))}
      </StickyWrapper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default Table;
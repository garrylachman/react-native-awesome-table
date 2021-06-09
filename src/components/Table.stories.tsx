import React from 'react';
import { Meta, Story } from '@storybook/react';
import Table, { TableProps, CellContentProps } from './Table';
import { Text, Button } from 'react-native'

export default {
  title: 'Table',
  argTypes: {
    contentHeight: {
      description: 'Fixed content height, used with sticky header to create scrollview',
      table: {
        defaultValue: { summary: 'auto' }
      }
    },
    rowsCount: {
      description: 'Generate of rows, for demostration only',
      control: {
        type: 'range',
        min: 1,
        max: 100
      }
    },
    showHeader: {
      description: 'Show/Hide Header',
      table: {
        defaultValue: { summary: true },
      }
    },
    data: {
      type: {
        required: true
      },
      description: 'Array of data objects',
    },
    columns: {
      type: {
        required: true
      },
      description: 'Array of collumns objects',
      table: {
        type: {
          summary: 'More details', 
          detail: 'each object represent one column with flex, title, dataKey and optinal getCell callback'
        }
      }
    },
    headerRowStyle: {
      type: {
        required: false
      },
      description: 'Style for header row'
    },
    headerRowTextStyle: {
      type: {
        required: false
      },
      description: 'Style for header row text'
    },
    rowStyle: {
      type: {
        required: false
      },
      description: 'Style for table row'
    }
}
} as Meta;

const Template: Story<TableProps & {rowsCount:number}> = ({ data, rowsCount, ...res }) => {
  data = [...Array(rowsCount)].map((_, i) => ({...data[0], id: ++i}));

  const [isLoadingState, setIsLoadingState] = React.useState(res.isLoading);
  const [loadingTextState, setLoadingTextState] = React.useState("Loading ");

  React.useEffect(() => {
    const intervalID = setInterval(() => setLoadingTextState(oldState => `${oldState}.`), 500);
    setTimeout(() => {
      setIsLoadingState(false);
      clearInterval(intervalID);
    }, 5*1000)

    return () => {
      clearInterval(intervalID);
    }
  }, [])
 
  return <Table data={data} {...res} isLoading={isLoadingState} loadingText={loadingTextState} />;
};

export const Basic = Template.bind({})
Basic.args = {
  rowsCount: 1,
  showHeader: true,
  isLoading: false,
  data: [{id: 1, firstName: 'garry', lastName: 'lachman', country: 'Israel'}],
  columns: [
    { flex: 1, title: 'ID', dataKey: 'id'},
    { flex: 2, title: 'First Name', dataKey: 'firstName'},
    { flex: 2, title: 'Last Name', dataKey: 'lastName'},
    { flex: 3, title: 'Country', dataKey: 'country'}
  ],
  headerRowStyle: {backgroundColor: "#636e72"},
  headerRowTextStyle: {fontWeight: 'bold', color: '#FFFFFF'},
  rowStyle: {backgroundColor: '#dfe6e9', borderBottomWidth: 1},
};
Basic.parameters = { controls: { exclude: ['contentHeight'] } };


export const CustomCell = Template.bind({});
  
const _customCell = ({data, rowIndex, columnIndex}:CellContentProps) => (
  <Text>Custom Cell <Text style={{color:'red'}}>{data}</Text></Text>
)

CustomCell.args = {
  ...Basic.args,
  columns: [
    { flex: 1, title: 'ID', dataKey: 'id'},
    { flex: 2, title: 'First Name', dataKey: 'firstName', getCell: _customCell},
    { flex: 2, title: 'Last Name', dataKey: 'lastName'},
    { flex: 3, title: 'Country', dataKey: 'country'}
  ],
};


export const CustomCellButton = Template.bind({});
  
const _customCellButton = ({data, rowIndex, columnIndex}:CellContentProps) => {
  const [state, setState] = React.useState(0);

  return (<Button title={`clicked ${state}`} onPress={()=>setState(old => old+1)} />)
}

CustomCellButton.args = {
  ...Basic.args,
  rowsCount: 10,
  columns: [
    { flex: 1, title: 'ID', dataKey: 'id'},
    { flex: 2, title: 'First Name', dataKey: 'firstName'},
    { flex: 2, title: 'Last Name', dataKey: 'lastName'},
    { flex: 1, title: 'Country', dataKey: 'country', getCell: _customCellButton}
  ],
};


export const StickyHeader = Template.bind({});

StickyHeader.args = {
  ...Basic.args,
  rowsCount: 20,
  stickyHeader: true,
  contentHeight: 100,
}

export const IsLoading = Template.bind({});
  
IsLoading.args = {
  ...Basic.args,
  isLoading: true,
  loaddingTextStyle: {
    fontSize: 17,
    paddingVertical: 10,
    alignSelf: 'center'
  },
  columns: [
    { flex: 1, title: 'ID', dataKey: 'id'},
    { flex: 2, title: 'First Name', dataKey: 'firstName'},
    { flex: 2, title: 'Last Name', dataKey: 'lastName'},
    { flex: 3, title: 'Country', dataKey: 'country'}
  ],
};
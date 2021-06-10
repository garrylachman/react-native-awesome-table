
# react-native-awesome-table

React-Native Simple Data Tables

  
Examples cam be found on our Storybook https://garrylachman.github.io/react-native-awesome-table/?path=/story/cell--default

## Installation
#### NPM
``` bash
npm -i --save react-native-awesome-table
```
### YARN
``` bash
yarn add react-native-awesome-table
```

## Examples
### Basic Example
![Basic Example](https://i.imgur.com/sLqnXre.png)

``` ts
import React from 'react';
import Table, {ColumnProps} from 'react-native-awesome-table';

type DataRow = {
	id: number,
	firstName: string,
	lastName: string,
	country: string
};

const columns:ColumnProps[] = [
	{ 'dataKey': 'id', title: 'ID', flex: 1 },
	{ 'dataKey': 'firstName', title: 'First Name', flex: 2 },
	{ 'dataKey': 'lastName', title: 'Last Name', flex: 2 }
	{ 'dataKey': 'country', title: 'Country', flex: 3 }
]

const exampleRow:DataRow = {
	id: 0,
	firstName: "Garry",
	lastName: "Lachman",
	country: "Israel"
};

export BasicTable = () => {
	const [data, setData] = React.useState<DataRow[]>([]);

	React.useEffect(() => {
		setData(
			[...Array(10)].map(
				(_, i) => ({...exampleRow, id: ++i})
			)
		);
	}, []);

	return (
		<Table 
			columns={columns}
			data={data}
		/>
	)
};
```
Basic example storybook: https://garrylachman.github.io/react-native-awesome-table/?path=/story/table--basic&args=rowsCount:10



### License
React Native Awesome Table is [MIT licensed](./LICENSE).
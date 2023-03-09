import React, {FC} from 'react';
import {Input, DatePicker, Table, Space, Button} from 'antd';
import type { DatePickerProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

interface DataType {
  key: string;
  name: string;
  date: string;
  list: string;
  edit: string;
  delete: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
    // render: (text) => <a>{text}</a>,
  },
  {
    title: 'Дата',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Список',
    dataIndex: 'list',
    key: 'list',
  },
  {
    title: '',
    dataIndex: 'edit',
    key: 'edit',
    align: 'center',
    render: (_, record) => (
          <a>Редактировать</a>
    ),
  },
  {
    title: '',
    dataIndex: 'delete',
    key: 'delete',
    align: 'center',
    render: (_, record) => (
          <a style={{color: "#ff0303"}}>Удалить</a>
    ),
  },
  // {
  //   title: 'Tags',
  //   key: 'tags',
  //   dataIndex: 'tags',
  //   render: (_, { tags }) => (
  //       <>
  //         {tags.map((tag) => {
  //           let color = tag.length > 5 ? 'geekblue' : 'green';
  //           if (tag === 'loser') {
  //             color = 'volcano';
  //           }
  //           return (
  //               <Tag color={color} key={tag}>
  //                 {tag.toUpperCase()}
  //               </Tag>
  //           );
  //         })}
  //       </>
  //   ),
  // },
  // {
  //   title: 'Action',
  //   key: 'action',
  //   render: (_, record) => (
  //       <Space size="middle">
  //         <a>Invite {record.name}</a>
  //         <a>Delete</a>
  //       </Space>
  //   ),
  // },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'Первый',
    date: '01.03.2023',
    list: 'раз, два, три, четыре',
    edit: 'редактировать',
    delete: 'удалить',
  },
  // {
  //   key: '2',
  //   name: 'Jim Green',
  //   age: 42,
  //   address: 'London No. 1 Lake Park',
  //   tags: ['loser'],
  // },
  // {
  //   key: '3',
  //   name: 'Joe Black',
  //   age: 32,
  //   address: 'Sydney No. 1 Lake Park',
  //   tags: ['cool', 'teacher'],
  // },
];

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = 'DD.MM.YYYY';
const customFormat: DatePickerProps['format'] = (value) =>
    `${value.format(dateFormat)}`;



const App: FC = () => (
    <div style={{ paddingLeft: 100, paddingRight: 100 }}>
      <Space direction="horizontal" style={{ width: "100%" }} size={12}>
      <p>Название:</p>
      <Input
          style={{ width: 800 }}
      />
      <p>Дата:</p>
      <RangePicker
          defaultValue={[dayjs('01.03.2023', dateFormat), dayjs('01.03.2023', dateFormat)]}
          format={customFormat}
          style={{ width: 600 }}
      />
      <Button type="primary">Найти</Button>
        <Button type="primary" ghost>Очистить</Button>
      {/*<DatePicker defaultValue={dayjs('01.03.2023', dateFormat)} format={customFormat} />*/}

      </Space>

    <Table columns={columns}
           dataSource={data}
           bordered
           pagination={false} />
    </div>
)

export default App;

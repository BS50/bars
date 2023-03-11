import React, {FC, useState} from 'react';
import './App.css'
import {
    Input,
    DatePicker,
    Space,
    Button,
    Drawer,
    Table,
    Checkbox,
    Form,
    Modal,
    Avatar,
    List,
    Card,
    Divider
} from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {ColumnsType} from "antd/es/table";
import {DataType} from "../../interfaces/interfaces";
import _Form from "../Form/Form";



dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = 'DD.MM.YYYY';
const customFormat: DatePickerProps['format'] = (value) =>
    `${value.format(dateFormat)}`;


const App: FC = () => {

    const { confirm } = Modal;

    const showDeleteConfirm = () => {
        confirm({
            title: 'Вы уверены что хотите удалить данную запись?',
            icon: <ExclamationCircleFilled />,
            // content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const [listNumeralRow, setListNumeralRow] = useState<any>([])

    const getListNumeralRow = (rowItem:any) => {

        //[один, два, три]
        let listNumeral: object[] = []
        rowItem.list.split(', ').forEach((elem: string) => {
            const objNumber = {}

            // @ts-ignore
            objNumber.title = elem

            listNumeral.push(objNumber)
        })

        // @ts-ignore
        setListNumeralRow(listNumeral)
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
            render: (_, rowItem) => (
                <a onClick={() => {
                    showDrawer()
                    getListNumeralRow(rowItem)
                }}>
                    Редактировать
                </a>
            ),
        },
        {
            title: '',
            dataIndex: 'delete',
            key: 'delete',
            align: 'center',
            render: (_, record) => (
                <button onClick={showDeleteConfirm} className="delete-button">Удалить</button>
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

    const [rows, setRows] = useState(

    // const rows: DataType[] =
        [
        {
            key: '1',
            name: 'Первый',
            date: '01.03.2023',
            list: 'раз, два, три, четыре',
            edit: 'редактировать',
            delete: 'удалить',
        },
        {
            key: '2',
            name: 'Пятый',
            date: '05.03.2021',
            list: 'раз, два',
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
    ]
    )

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);


    };
    const onClose = () => {
        setOpen(false);
    };

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    const dates = [
        {
            title: 'два',
            delete: 'Удалить'
        },
        {
            title: 'пять',
            delete: 'Удалить'
        },
        {
            title: 'семь',
            delete: 'Удалить'
        }
    ];

    console.log(listNumeralRow)


    return (
    <div className="page">
        <Space direction="horizontal" className="search" wrap={true}>
            <p>Название:</p>
            <Input
                className="search__input"
            />
            <p>Дата:</p>
            <RangePicker
                defaultValue={[dayjs('01.03.2023', dateFormat), dayjs('01.03.2023', dateFormat)]}
                format={customFormat}
            />
            <Button type="primary">Найти</Button>
            <Button type="primary" ghost>Очистить</Button>
            <Button type="primary" ghost onClick={showDrawer}>Добавить</Button>

        </Space>
        <Table columns={columns}
               dataSource={rows}
               bordered
               pagination={false}
               className="table"
        />
        <Drawer title="Новый элемент" placement="right" onClose={onClose} open={open} width="45%">
            <_Form listNumeralRow={listNumeralRow}/>


        </Drawer>
    </div>
  )
}

export default App;

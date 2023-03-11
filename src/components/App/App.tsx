import React, {FC, useState} from 'react';
import {nanoid} from "nanoid";
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
import {DataType, INumeralRow} from "../../interfaces/interfaces";
import _Form from "../Form/Form";



dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = 'DD.MM.YYYY';
const customFormat: DatePickerProps['format'] = (value) =>
    `${value.format(dateFormat)}`;


const App: FC = () => {

    const { confirm } = Modal;

    const showDeleteConfirm = (rowItem: DataType) => {
        confirm({
            title: 'Вы уверены что хотите удалить данную запись?',
            icon: <ExclamationCircleFilled />,
            // content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                setRows(rows.filter(item => item.key !== rowItem.key))
            },
            // onCancel() {
            //     console.log('Cancel');
            // },
        });
    };


    const [currentRowName, setCurrentRowName] = useState('')
    const [currentRowDate, setCurrentRowDate] = useState('')
    const [currentListNumeralRow, setCurrentListNumeralRow] = useState<INumeralRow[]>([])


    const getValueCurrentRow = (rowItem:DataType) => {
        console.log(rowItem)
        let listNumeral: INumeralRow[] = []
        rowItem.list.split(', ').forEach((elem: string) => {
            const objNumber:INumeralRow = {}
            objNumber.title = elem
            listNumeral.push(objNumber)
        })
        setCurrentRowName(rowItem.name)
        setCurrentRowDate(convertData(rowItem.date))

        setCurrentListNumeralRow(listNumeral)
    }


    const convertData = (date:string):string => {
        let dateList = date.split('.')
        dateList = [dateList[1], dateList[0], dateList[2]]
        return dateList.join('/')
    }

    const getValueNewRow = () => {
        setCurrentRowName('')
        setCurrentRowDate(Date())

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
                    getValueCurrentRow(rowItem)
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
            render: (_, rowItem) => (
                <button onClick={() => showDeleteConfirm(rowItem)} className="delete-button">Удалить</button>
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

    const [rows, setRows] = useState<DataType[]>(

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
        setCurrentListNumeralRow([])
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



    const onFinish = (event:any) => {

        // @ts-ignore
        const date = Date(event.date.$d)

        const name:string = event.name

        const list = currentListNumeralRow.map(item => item.title)

        const key = nanoid()

        const row: DataType = {
            key,
            name,
            date,
            list: list.join(', '),
            edit: 'редактировать',
            delete: 'удалить'
        }

        setRows((oldData: DataType[]): DataType[] => {
            return [...oldData, row]
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


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
            <Button type="primary" ghost onClick={ () => {
                showDrawer()
                getValueNewRow()
            }}>Добавить</Button>

        </Space>
        <Table columns={columns}
               dataSource={rows}
               bordered
               pagination={false}
               className="table"
        />
        <Drawer title="Новый элемент" placement="right" onClose={onClose} open={open} width="45%" destroyOnClose={true}>
            <_Form currentListNumeralRow={currentListNumeralRow} currentRowName={currentRowName} currentRowDate={currentRowDate} onFinish={onFinish} onFinishFailed={onFinishFailed}/>


        </Drawer>
    </div>
  )
}

export default App;

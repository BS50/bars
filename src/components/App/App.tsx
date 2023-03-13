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
import type {RangeValue} from "../../interfaces/interfaces"
import dayjs, {Dayjs} from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {ColumnsType} from "antd/es/table";
import {DataType, INumeralRow} from "../../interfaces/interfaces";
import _Form from "../Form/Form";
import {titleDrawer} from "../../constants/constants";



const App: FC = () => {

    const { confirm } = Modal;


    dayjs.extend(customParseFormat);
    const { RangePicker } = DatePicker;
    const dateFormat = 'DD.MM.YYYY';
    const customFormat: DatePickerProps['format'] = (value) =>
        `${value.format(dateFormat)}`;



    const [currentRowName, setCurrentRowName] = useState('')
    const [currentRowDate, setCurrentRowDate] = useState('')
    const [currentListNumeralRow, setCurrentListNumeralRow] = useState<INumeralRow[]>([])
    const [keyEditableRow, setKeyEditableRow] = useState('')

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
            }
        ]
    )

    const [open, setOpen] = useState(false);



    const columns: ColumnsType<DataType> = [
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
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
                <button onClick={() => {
                    showDrawer()
                    getValueCurrentRow(rowItem)
                }} className="select-button">
                    Редактировать
                </button>
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
    ];



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



    const getValueCurrentRow = (rowItem:DataType) => {

        let listNumeral: INumeralRow[] = []
        rowItem.list.split(', ').forEach((elem: string) => {
            const objNumbers:INumeralRow = {}
            objNumbers.title = elem
            objNumbers.id = nanoid()
            listNumeral.push(objNumbers)
        })
        setCurrentRowName(rowItem.name)
        setCurrentRowDate(convertData(rowItem.date))
        setCurrentListNumeralRow(listNumeral)

        setKeyEditableRow(rowItem.key)
    }

    const addListNumeralRow = (selectObjNumber:any) => {
        setCurrentListNumeralRow((oldList) => {
            return [...oldList, selectObjNumber]
        })
    }

   const deleteListNumeralRow = (event:any) => {
        // event.stopPropagation();
        event.preventDefault();
       setCurrentListNumeralRow(
           currentListNumeralRow.filter(item => item.id !== event.target.id)
       )
    }

    const getCurrentListNumerals = (list:[]) => {
        setCurrentListNumeralRow(list)
    }



    const convertData = (date: string):string => {
        let dateList = date.split('.')
        dateList = [dateList[1], dateList[0], dateList[2]]
        return dateList.join('.')
    }

    const getValueNewRow = () => {
        setCurrentRowName('')
        setKeyEditableRow('')
        setCurrentRowDate(Date())
    }



    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setCurrentListNumeralRow([])
        setOpen(false);
    };



    const getIntervalDates = (
        dates: RangeValue, dateStrings: string[]) =>
    {
        console.log(dates, dateStrings);
    };









    const editRowTable = (event:any) => {

        const name:string = event.name
        const list = currentListNumeralRow.map(item => item.title)
        // @ts-ignore
        const date:string = event.date.$d.toLocaleDateString('pt-PT').replace(/\//g, '.')

        rows.forEach((item) => {
            if (item.key === keyEditableRow) {
                // @ts-ignore
                item.name = name
                // @ts-ignore
                item.list = list.join(', ')
                // @ts-ignore
                item.date = date
            }
        })
        setRows(rows)
        onClose()
    }

    const addRowTable = (event:any) => {
        // @ts-ignore
        const date = event.date.$d.toLocaleDateString('pt-PT').replace(/\//g, '.')
        const name:string = event.name
        const list = currentListNumeralRow.map(item => item.title)
        const key = nanoid()

        // @ts-ignore
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
        onClose()
    }



    const onFinish = (event:any) => {
        if (keyEditableRow) {
            editRowTable(event)
        } else {
            addRowTable(event)
        }
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
                onChange={(dates, dateStrings) => getIntervalDates(dates, dateStrings)}
                // defaultValue={[dayjs('01.03.2023', dateFormat), dayjs('01.03.2023', dateFormat)]}
                format={customFormat}
            />
            <Button type="primary">Найти</Button>
            <Button type="primary" ghost>Очистить</Button>
            <Button type="primary" ghost
                    onClick={ () => {
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
        <Drawer title={keyEditableRow ? titleDrawer.editElement : titleDrawer.newElement} placement="right" onClose={onClose} open={open} width="45%" destroyOnClose={true}>
            <_Form
                currentListNumeralRow={currentListNumeralRow}
                currentRowName={currentRowName}
                currentRowDate={currentRowDate}
                addListNumeralRow={addListNumeralRow}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                deleteListNumeralRow={deleteListNumeralRow}
                getCurrentListNumerals={getCurrentListNumerals}
            />


        </Drawer>
    </div>
  )
}

export default App;

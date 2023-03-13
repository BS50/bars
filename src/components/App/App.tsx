import React, {FC, useEffect, useState} from 'react';
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


    const [form] = Form.useForm();

    const [currentRowName, setCurrentRowName] = useState('')
    const [currentRowDate, setCurrentRowDate] = useState('')
    const [currentListNumeralRow, setCurrentListNumeralRow] = useState<INumeralRow[]>([])
    const [keyEditableRow, setKeyEditableRow] = useState('')

    const [initialRows, setInitialRows] = useState<DataType[]>([])
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
                if (initialRows.length) {
                    setRows(rows.filter(item => item.key !== rowItem.key))
                    setInitialRows(initialRows.filter(item => item.key !== rowItem.key))
                } else {
                    setRows(rows.filter(item => item.key !== rowItem.key))
                }
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
        setCurrentRowDate(convertFormatData(rowItem.date))
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



    const convertFormatData = (date: string):string => {
        let dateList = date.split('.')
        dateList = [dateList[1], dateList[0], dateList[2]]
        return dateList.join('/')
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


    //
    // const getIntervalDates = (
    //     dates: RangeValue, dateStrings: string[]) =>
    // {
    //     console.log(dates, dateStrings);
    // };





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

    const onSearch = (event: any) => {
        const searchSubstring = event.name;
        const fromInterval = Date.parse(event.dateRange[0].$d.toDateString());
        const toInterval = Date.parse(event.dateRange[1].$d.toDateString());

        const sortRows = rows.filter((row) => {
            const dateRow = new Date(convertFormatData(row.date)).getTime()

            const searchString = row.name.toLowerCase().includes(searchSubstring.toLowerCase());

            const searchInterval = dateRow >= fromInterval && dateRow <= toInterval

            if (searchString && searchInterval) {
                return row
            }
        })
        setInitialRows(rows)
        setRows(sortRows)
    }

    const clearSearch = () => {
        if (initialRows.length) {
            setRows(initialRows)
        }
        form.resetFields()
    }



    return (
    <div className="page">
        <Form
            name="search"
            labelCol={{ span: 1, offset: 10  }}
            wrapperCol={{ span: 1, offset: 15 }}
            layout="inline"
            onFinish={onSearch}
            autoComplete="off"
            form={form}
            style={{width: "100%", marginBottom: "20px"}}


        >
            <Form.Item
                label="Название"
                name="name"
                labelCol={{ span: 4, offset: 1 }}
                wrapperCol={{ span: 15, offset: 0 }}
                colon={true}
                style={{width: "43%"}}

            >
                <Input style={{width: "135%"}}   />
            </Form.Item>
            <Form.Item
                label="Дата"
                name="dateRange"
                colon={true}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 15, offset: 1 }}
                style={{width: "35%"}}
            >
                <RangePicker
                    // onChange={(dates, dateStrings) => getIntervalDates(dates, dateStrings)}
                    // defaultValue={[dayjs('01.03.2023', dateFormat), dayjs('01.03.2023', dateFormat)]}
                    format={customFormat}
                    style={{width: "125%"}}
                />
            </Form.Item>
            <Form.Item
                labelCol={{ span: 1, offset: 1 }}
                wrapperCol={{ span: 1, offset: 1 }}
                // style={{width: "10%"}}

            >
                <Button type="primary" htmlType="submit">
                    Найти
                </Button>
            </Form.Item>
            <Form.Item
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 15, offset: 1 }}
            >
                <Button type="primary" ghost onClick={clearSearch}>
                    Очистить
                </Button>

            </Form.Item>
        </Form>
        <Button type="primary" ghost
                onClick={ () => {
                    showDrawer()
                    getValueNewRow()
                }}>Добавить</Button>

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

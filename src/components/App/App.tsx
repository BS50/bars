import React, {FC, useState} from 'react';
import {nanoid} from "nanoid";
import './App.css'
import {Button, Drawer, Table, Form, Modal} from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import {ColumnsType} from "antd/es/table";
import {DataType, IEventForm, IEventSearch, INumeralRow} from "../../interfaces/interfaces";
import {titleDrawer} from "../../constants/constants";
import SearchForm from "../SearchForm/SearchForm";
import DrawerForm from "../DrawerForm/DrawerForm";


const App: FC = () => {

    const { confirm } = Modal;
    const [form] = Form.useForm();

    const [currentRowName, setCurrentRowName] = useState<string>('')
    const [currentRowDate, setCurrentRowDate] = useState<string>('')
    const [currentListNumeralRow, setCurrentListNumeralRow] = useState<INumeralRow[]>([])
    const [keyEditableRow, setKeyEditableRow] = useState<string>('')
    const [initialRows, setInitialRows] = useState<DataType[]>([])
    const [open, setOpen] = useState<boolean>(false);
    const [rows, setRows] = useState<DataType[]>(
        [
            {
                key: '1',
                name: 'Первый',
                date: '01.03.2023',
                list: 'раз, два, четыре',
                edit: 'редактировать',
                delete: 'удалить',
            },
            {
                key: '2',
                name: 'Пятый',
                date: '02.03.2023',
                list: 'два, три',
                edit: 'редактировать',
                delete: 'удалить',
            }
        ]
    )

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

    const showDeleteConfirm = (rowItem: DataType): void => {
        confirm({
            title: 'Вы уверены что хотите удалить данную запись?',
            icon: <ExclamationCircleFilled />,
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
            }
        });
    };

    const getValueCurrentRow = (rowItem:DataType): void => {

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
    };

   const deleteListNumeralRow = (event: React.MouseEvent<HTMLButtonElement>) => {
       const target = event.target as HTMLButtonElement;
        event.preventDefault();
       setCurrentListNumeralRow(
           currentListNumeralRow.filter(item => item.id !== target.id)
       )
    };

    const getCurrentListNumerals = (list:INumeralRow[]):void => {
        setCurrentListNumeralRow(list)
    };

    const convertFormatData = (date: string):string => {
        let dateList = date.split('.')
        dateList = [dateList[1], dateList[0], dateList[2]]
        return dateList.join('/')
    };

    const getValueNewRow = ():void => {
        setCurrentRowName('')
        setKeyEditableRow('')
        setCurrentRowDate(Date())
    };

    const showDrawer = ():void => {
        setOpen(true);
    };

    const onCloseDrawer = ():void => {
        setCurrentListNumeralRow([])
        setOpen(false);
    };

    const editRowTable = (event:IEventForm) => {
        const name = event.name
        const list = currentListNumeralRow.map(item => item.title)
        const date = event.date.$d.toLocaleDateString('pt-PT').replace(/\//g, '.')

        rows.forEach((item) => {
            if (item.key === keyEditableRow) {
                item.name = name
                item.list = list.join(', ')
                item.date = date
            }
        })
        setRows(rows)
        onCloseDrawer()
    };

    const addRowTable = (event:IEventForm) => {
        const date = event.date.$d.toLocaleDateString('pt-PT').replace(/\//g, '.')
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
        onCloseDrawer()
    }

    const saveDrawerForm = (event:IEventForm) => {
        if (keyEditableRow) {
            editRowTable(event)
        } else {
            addRowTable(event)
        }
    };

    const onSearch = (event: IEventSearch) => {
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
        <SearchForm onSearch={onSearch} clearSearch={clearSearch} form={form}/>
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
        <Drawer title={keyEditableRow ? titleDrawer.editElement : titleDrawer.newElement} placement="right" onClose={onCloseDrawer} open={open} width="45%" destroyOnClose={true}>
            <DrawerForm
                currentListNumeralRow={currentListNumeralRow}
                currentRowName={currentRowName}
                currentRowDate={currentRowDate}
                saveDrawerForm={saveDrawerForm}
                deleteListNumeralRow={deleteListNumeralRow}
                getCurrentListNumerals={getCurrentListNumerals}
            />
        </Drawer>
    </div>
  )
}

export default App;

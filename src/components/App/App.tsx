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
                <a onClick={showDrawer}>Редактировать</a>
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
    const data: DataType[] = [
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
    ];




    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };


    const onFinish = (values: any) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };


    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
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
               dataSource={data}
               bordered
               pagination={false}
               className="table"
        />
        <Drawer title="Новый элемент" placement="right" onClose={onClose} open={open} width="45%">

            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="form"
            >
                <Form.Item
                    label="Название"
                    name="name"
                    rules={[{ required: true, message: 'Введите название строки' }]}
                    className="form__item"
                >
                    <Input className="form__input"  />
                </Form.Item>

                <Form.Item
                    label="Дата"
                    name="date"
                    rules={[{ required: true, message: 'Введите название дату' }]}
                    className="form__item"
                >
                    {/*<DatePicker onChange={onChange} className="search__picker" />*/}
                    <DatePicker defaultValue={dayjs('01.03.2023', dateFormat)} format={customFormat} />
                </Form.Item>
                <Form.Item
                    label="Список"
                    name="list"
                    rules={[{ required: true, message: 'Добавьте число' }]}
                    className="form__item"
                >
                    <Card size={"small"} className="card card_form">
                        <div className={"card__content"}>
                            <p className={"card__paragraph"}>Card content</p>
                            <button className={"delete-button"}>Удалить</button>
                        </div>
                    </Card>

                </Form.Item>

                <Button type="primary" ghost onClick={showModal} className="form__add-button">
                    Добавить
                </Button>

                <Divider className="drawer__divider" />


                <Modal title="Выбор элемента для списка" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={800} footer={null} bodyStyle={{height: "650px"}}>
                    <Card size={"small"} className="card">
                        <div className={"card__content"}>
                            <p className={"card__paragraph"}>Пять</p>
                            <button className={"select-button"}>Выбрать</button>
                        </div>
                    </Card>



                    <Button type="primary" ghost onClick={showModal} className="form__add-button">
                        Закрыть
                    </Button>




                </Modal>



                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>

        </Drawer>
    </div>
  )
}

export default App;

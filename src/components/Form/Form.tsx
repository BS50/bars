import React, {useState} from 'react';
import {Button, Card, DatePicker, DatePickerProps, Divider, Form, Input, List, Modal} from "antd";
import events from "node:events";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
const dateFormat = 'DD.MM.YYYY';
const customFormat: DatePickerProps['format'] = (value) =>
    `${value.format(dateFormat)}`;


// @ts-ignore
const _Form = ({ listNumeralRow }) => {


    const onFinish = (event: events) => {

        // @ts-ignore

        const date = Date(event.date.$d)
        // @ts-ignore
        const name = event.name
        const row = {
            key: 3,
            name,
            date,
            list: 'два, пять',
            edit: 'редактировать',
            delete: 'удалить'
        }
        // @ts-ignore
        setData((oldData) => {
            return [...oldData, row]
        })
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
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



    return (
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
                <Input className="form__input" />
            </Form.Item>

            <Form.Item
                label="Дата"
                name="date"
                rules={[{ required: true, message: 'Введите название дату' }]}
                className="form__item"
            >
                {/*<DatePicker onChange={onChange} className="search__picker" />*/}
                <DatePicker format={customFormat} />
            </Form.Item>
            <Form.Item
                label="Список"
                name="list"
                rules={[{ required: true, message: 'Добавьте число' }]}
                className="form__item"
            >
                <List
                    dataSource={listNumeralRow}
                    split={false}
                    renderItem={(item: any) => (
                        <List.Item>

                            <Card size={"small"} className="card card_form">
                                <div className={"card__content"}>
                                    <p className={"card__paragraph"}>{item.title}</p>
                                    <button className={"delete-button"}>Удалить</button>
                                </div>
                            </Card>

                        </List.Item>
                    )}
                />


                {/*{listNumber.map((item) => {*/}
                {/*    return (*/}
                {/*        <Card size={"small"} className="card card_form">*/}
                {/*            <div className={"card__content"}>*/}
                {/*                <p className={"card__paragraph"}>{item}</p>*/}
                {/*                <button className={"delete-button"}>Удалить</button>*/}
                {/*            </div>*/}
                {/*        </Card>*/}
                {/*    )*/}

                {/*})}*/}


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
    );
};

export default _Form;
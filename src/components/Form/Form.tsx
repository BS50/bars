import React, {FC, useState} from 'react';
import {Button, Card, DatePicker, DatePickerProps, Divider, Form, Input, List, Modal} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import moment from 'moment';

dayjs.extend(customParseFormat);
const dateFormat = 'DD.MM.YYYY';
// const customFormat: DatePickerProps['format'] = (value) =>
//     `${value.format(dateFormat)}`;


// @ts-ignore
const _Form = ({ currentListNumeralRow, currentRowName, currentRowDate, onFinishFailed, onFinish }) => {




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


    const currentDate = {
        date: dayjs(new Date(currentRowDate)),
        name: currentRowName
    };




    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            layout="vertical"
            // initialValues={{ remember: false }}
            initialValues={currentDate}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="form"
            // fields={[{ name: "name", value: currentRowName }]}

        >
            <Form.Item
                label="Название"
                name="name"
                rules={[{ required: true, message: 'Введите название строки' }]}
                className="form__item"

            >
                <Input className="form__input"/>
            </Form.Item>

            <Form.Item
                label="Дата"
                name="date"
                rules={[{ required: true, message: 'Введите название дату' }]}
                className="form__item"
            >
                {/*<DatePicker onChange={onChange} className="search__picker" />*/}
                <DatePicker format={dateFormat} />
            </Form.Item>
            <Form.Item
                label="Список"
                name="list"
                rules={[{ message: 'Добавьте число' }]}
                className="form__item"
            >
                <List
                    dataSource={currentListNumeralRow}
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
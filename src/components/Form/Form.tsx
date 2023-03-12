import React, {FC, useState} from 'react';
import {Button, Card, DatePicker, DatePickerProps, Divider, Form, Input, List, Modal} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {INumeralRow} from "../../interfaces/interfaces";
import {nanoid} from "nanoid";

dayjs.extend(customParseFormat);
const dateFormat = 'DD.MM.YYYY';
// const customFormat: DatePickerProps['format'] = (value) =>
//     `${value.format(dateFormat)}`;


// @ts-ignore
const _Form = ({ currentListNumeralRow, currentRowName, currentRowDate, onFinishFailed, onFinish, addListNumeralRow, deleteListNumeralRow }) => {




    const [isModalOpen, setIsModalOpen] = useState(false);

    const [listSelectableNumerals, setListSelectableNumerals] = useState(
        [
            {id: '1', title: 'раз'},
            {id: '2', title: 'два'},
            {id: '3', title: 'три'},
            {id: '4', title: 'четыре'},
            {id: '5', title: 'пять'},
            {id: '6', title: 'шесть'},
            {id: '7', title: 'семь'},
            {id: '8', title: 'восемь'},
            {id: '9', title: 'девять'},
            {id: '10', title: 'десять'},
        ]
    )

    const showModal = () => {
        const currentListSelectNumerals = listSelectableNumerals.filter((item) => {
            if (!(currentListNumeralRow.some((elem:INumeralRow) => elem.title === item.title))) {
                return item
            }
        })
        setListSelectableNumerals(currentListSelectNumerals)
        setIsModalOpen(true);
    };

    const addNumberCurrentList = (event:any) => {
        setListSelectableNumerals(listSelectableNumerals.filter(item => item.id !== event.target.id))
        listSelectableNumerals.forEach((item) => {
            if (item.id === event.target.id) {
                addListNumeralRow(item)
            }
        })
    }

    const removeNumberCurrentList = (event:any) => {
        currentListNumeralRow.forEach((item:any) => {
            if (item.id === event.target.id) {
                setListSelectableNumerals((oldData) => {
                    return [...oldData, item]
                })
            }
        })
        deleteListNumeralRow(event)
    }


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
                rules={[{required: true, message: 'Добавьте число', validator: (_,value) => {
                    if (currentListNumeralRow.length) {
                        return Promise.resolve();
                    } else {
                        return Promise.reject('Error!');
                    }
                    }}]}
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
                                    <button className={"delete-button"} id={item.id} onClick={(event) => removeNumberCurrentList(event)}>Удалить</button>
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

            <Button
                type="primary"
                ghost
                onClick={showModal}
                className="form__add-button"
                disabled={currentListNumeralRow.length === 10 && true}>Добавить
            </Button>

            <Divider className="drawer__divider" />


            <Modal title="Выбор элемента для списка" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={800} footer={null} bodyStyle={{height: "650px"}}>
                {/*<Card size={"small"} className="card">*/}
                {/*    <div className={"card__content"}>*/}
                {/*        <p className={"card__paragraph"}>Пять</p>*/}
                {/*        <button className={"select-button"}>Выбрать</button>*/}
                {/*    </div>*/}
                {/*</Card>*/}
                <List
                    dataSource={listSelectableNumerals}
                    split={false}
                    renderItem={(item: any, index) => (
                        <List.Item
                            // key={nanoid()}
                            // extra={<Button onClick={(numberItem) => addNumberCurrentList(numberItem)} size="small">Delete</Button>}
                            style={{padding:0, paddingBottom: 10}}
                        >

                            <Card size={"small"} className="card card_form">
                                <div className={"card__content"}>
                                    <p className={"card__paragraph"}>{item.title}</p>
                                    <button className={"select-button"} id={item.id} onClick={(event) => addNumberCurrentList(event)}>Выбрать</button>
                                </div>
                            </Card>

                        </List.Item>
                    )}
                />



                <Button type="primary" ghost onClick={handleCancel} className="form__add-button">
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
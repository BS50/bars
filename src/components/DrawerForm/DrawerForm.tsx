import React, {FC, useState} from 'react';
import {Button, Card, DatePicker, Divider, Form, Input, List} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {DrawerFormProps, INumeralRow} from "../../interfaces/interfaces";
import {numerals} from "../../constants/constants";
import ModalWindow from "../ModalWindow/ModalWindow";


const DrawerForm: FC <DrawerFormProps> = (
    {
        currentListNumeralRow,
        currentRowName,
        currentRowDate,
        saveDrawerForm,
        deleteListNumeralRow,
        getCurrentListNumerals
    }) => {

    dayjs.extend(customParseFormat);
    const dateFormat = 'DD.MM.YYYY';



    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [listSelectableNumerals, setListSelectableNumerals] = useState<INumeralRow[]>([])

    const drawListSelectNumerals = () => {
        const currentListSelectNumerals = numerals.filter((item) => {

            if (!(currentListNumeralRow.some((elem:INumeralRow) => elem.title === item.title))) {
                return item
            }
        })
        setListSelectableNumerals(currentListSelectNumerals)
    };

    const closeModal = () => {
        const currentListNumerals = numerals.filter((item) => {

            if (!(listSelectableNumerals.some((elem) => elem.title === item.title))) {
                return item
            }
        })
        getCurrentListNumerals(currentListNumerals)
    };

    const addNumberCurrentList = (event: React.MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLButtonElement;
        setListSelectableNumerals(listSelectableNumerals.filter(item => item.id !== target.id))
    };

    const removeNumberCurrentList = (event: React.MouseEvent<HTMLButtonElement>) => {
        deleteListNumeralRow(event)
    };

    const openModal = ():void => {
        drawListSelectNumerals()
        setIsModalOpen(true);
    };

    const handleCancelModal = ():void => {
        closeModal()
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
            onFinish={saveDrawerForm}
            // onFinishFailed={onFinishFailed}
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
                <DatePicker format={dateFormat} />
            </Form.Item>
            <Form.Item
                label="Список"
                name="list"
                rules={[{required: true, validator: (rule,value) => {
                    value = currentListNumeralRow.length
                    if (value) {
                        return Promise.resolve();
                    } else {
                        return Promise.reject('Добавьте число');
                    }
                    }}]}
                className="form__item"

            >
                <List
                    dataSource={currentListNumeralRow}
                    split={false}
                    renderItem={(item) => (
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
            </Form.Item>

            <Button
                type="primary"
                ghost
                onClick={openModal}
                className="form__add-button"
                disabled={currentListNumeralRow.length === 10 && true}>Добавить
            </Button>

            <Divider className="drawer__divider" />

            <ModalWindow listSelectableNumerals={listSelectableNumerals} isModalOpen={isModalOpen} openModal={openModal} handleCancelModal={handleCancelModal} addNumberCurrentList={addNumberCurrentList}/>

            <Form.Item >
                <Button type="primary" htmlType="submit">
                    Сохранить
                </Button>
            </Form.Item>
        </Form>
    );
};

export default DrawerForm;
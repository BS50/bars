import React, {FC} from 'react';
import {Button, Card, List, Modal} from "antd";
import {ModalProps} from "../../interfaces/interfaces";


const ModalWindow: FC <ModalProps> = ({ listSelectableNumerals, isModalOpen, openModal, handleCancelModal, addNumberCurrentList }) => {

    return (
        <Modal title="Выбор элемента для списка" open={isModalOpen} onOk={openModal} onCancel={handleCancelModal} width={800} footer={null} bodyStyle={{height: "650px"}}>
            <List
                dataSource={listSelectableNumerals}
                split={false}
                renderItem={(item, index) => (
                    <List.Item
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

            <Button type="primary" ghost onClick={handleCancelModal} className="form__add-button">
                Закрыть
            </Button>
        </Modal>
    );
};

export default ModalWindow;
import React, {FC} from 'react';
import {Button, DatePicker, DatePickerProps, Form, Input} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {MainFormProps} from "../../interfaces/interfaces";

const SearchForm: FC <MainFormProps> = ({onSearch, clearSearch, form}) => {

    dayjs.extend(customParseFormat);
    const { RangePicker } = DatePicker;
    const dateFormat = 'DD.MM.YYYY';
    const customFormat: DatePickerProps['format'] = (value) =>
        `${value.format(dateFormat)}`;

    return (
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
    );
};

export default SearchForm;
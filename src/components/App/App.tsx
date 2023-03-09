import React, {FC} from 'react';
import {Input, DatePicker, Space, Button} from 'antd';
import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import List from "../List/List";


dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = 'DD.MM.YYYY';
const customFormat: DatePickerProps['format'] = (value) =>
    `${value.format(dateFormat)}`;



const App: FC = () => (
    <div style={{ paddingLeft: 100, paddingRight: 100 }}>
      <Space direction="horizontal" style={{ width: "100%" }} size={12} wrap={true}>
      <p>Название:</p>
      <Input
          style={{ width: 450 }}
      />
      <p>Дата:</p>
      <RangePicker
          defaultValue={[dayjs('01.03.2023', dateFormat), dayjs('01.03.2023', dateFormat)]}
          format={customFormat}
          style={{ width: 300 }}
      />
      <Button type="primary">Найти</Button>
      <Button type="primary" ghost>Очистить</Button>
        <Button type="primary" ghost>Добавить</Button>
      {/*<DatePicker defaultValue={dayjs('01.03.2023', dateFormat)} format={customFormat} />*/}

      </Space>
    <List/>
    </div>
)

export default App;

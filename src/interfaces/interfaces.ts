import React from "react";
import {DatePicker} from "antd";

export interface DataType {
    key: string;
    name: string;
    date: string;
    list: string;
    edit: string;
    delete: string;
}

export interface INumeralRow {
    title?: string;
    id?: string
}

export type RangeValue = Parameters<NonNullable<React.ComponentProps<typeof DatePicker.RangePicker>['onChange']>>[0]
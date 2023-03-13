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

export interface IDate {
        $D: number,
        $H: number,
        $L: string,
        $M: number,
        $W: number,
        $d: Date,
        $m: number,
        $ms: number,
        $s: number,
        $u: undefined,
        $x: object,
        $y: number
}

export interface IEventForm {
    date: IDate
    list: undefined,
    name: string
}

export interface IEventSearch {
    dateRange: [IDate, IDate]
    name: string
}

export type RangeValue = Parameters<NonNullable<React.ComponentProps<typeof DatePicker.RangePicker>['onChange']>>[0]

export interface DrawerFormProps {
    currentListNumeralRow: INumeralRow[],
    currentRowName: string,
    currentRowDate: string,
    saveDrawerForm: (arg: IEventForm) => void,
    deleteListNumeralRow: (event: React.MouseEvent<HTMLButtonElement>) => void,
    getCurrentListNumerals: (arg: INumeralRow[]) => void
}

export interface MainFormProps {
    onSearch: (event: IEventSearch) => void,
    clearSearch: () => void,
    form: any
}

export interface ModalProps {
    listSelectableNumerals: INumeralRow[],
    isModalOpen: boolean,
    openModal: () => void,
    handleCancelModal: () => void,
    addNumberCurrentList: (event: React.MouseEvent<HTMLButtonElement>) => void
}

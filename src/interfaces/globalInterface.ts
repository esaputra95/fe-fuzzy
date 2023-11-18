import { Dispatch, SetStateAction } from "react";

export interface DataSelectOptionInterface {
    label: string;
    value: string
}

export interface PageInterface {
    page: number;
    total: number;
    limit: number;
    setLimit: Dispatch<SetStateAction<number>>;
    handlePage: (dataPage: number) => void;
    setTotal: Dispatch<SetStateAction<number>>
}
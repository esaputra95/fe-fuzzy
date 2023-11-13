import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { DataSelectOptionInterface } from "../globalInterface";
import { SubVariableInterface } from "./subVariableInterface";
import { ChangeEvent } from "react";

export interface IndicatorInterface {
    id?: number;
    code?: string;
    subVariableId: number;
    subVariableValue?: DataSelectOptionInterface 
    name: string;
    description?: string;
    subVariables?: SubVariableInterface
}

export interface IndicatorSearchInterface {
    name?: string;
    code?: string
}

export interface IndicatorFormProps {
	handleSubmit: UseFormHandleSubmit<IndicatorInterface>
	onSubmit: (data:IndicatorInterface) => void;
	register: UseFormRegister<IndicatorInterface>;
    onCancel: () => void;
    onSearchSubVariable: (event:ChangeEvent<HTMLInputElement>)=> void;
    optionSubVariable: DataSelectOptionInterface[];
    errors: FieldErrors<IndicatorInterface>;
    isLoading?: boolean;
    idDetail?: number | null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleChangeSelect:(event:any)=> void;
    selectSubVariable:DataSelectOptionInterface;
}

interface Info {
    page: number;
    limit: number;
    total: number;
  }
  
export interface ClassDataTypeInterface {
    Indicator: IndicatorInterface[];
    info: Info;
}
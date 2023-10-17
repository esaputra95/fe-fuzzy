import { ChangeEvent } from "react";
import { FieldErrors, UseFormGetValues, UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { DataSelectOptionInterface } from "../globalInterface";
import { VariableInterface } from "./variableInterface";

export interface SubVariableInterface {
    id?: number;
    code?: string;
    variableId: number
    name: string;
    description?: string;
    variables?: VariableInterface
}

export interface SubVariableSearchInterface {
    name?: string;
    code?: string
}

export type SubVariableFormProps = {
	handleSubmit: UseFormHandleSubmit<SubVariableInterface>
	onSubmit: (data:SubVariableInterface) => void;
	register: UseFormRegister<SubVariableInterface>;
    onCancel: () => void;
    onSearchVariable: (event:ChangeEvent<HTMLInputElement>)=> void;
    setValue: UseFormSetValue<SubVariableInterface>;
    optionVariable: DataSelectOptionInterface[];
    errors: FieldErrors<SubVariableInterface>;
    isLoading?: boolean;
    idDetail?: number | null,
    handleChangeSelect:(event:any)=> void;
    selectSubVariable:DataSelectOptionInterface;
    getValues: UseFormGetValues<SubVariableInterface>
}

interface Info {
    page: number;
    limit: number;
    total: number;
  }
  
export interface ClassDataTypeInterface {
    SubVariable: SubVariableInterface[];
    info: Info;
  }
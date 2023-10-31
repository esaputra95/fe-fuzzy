import { ChangeEvent } from "react";
import { FieldArrayWithId, FieldErrors, UseFieldArrayAppend, UseFormGetValues, UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { DataSelectOptionInterface } from "./globalInterface";
import { SubVariableInterface } from "./master/subVariableInterface";
import { IndicatorInterface } from "./master/IndicatorInterface";
import { FactorInterface } from "./master/factorInterface";

export interface KnowledgeManagementArrayFormInterface {
    indicatorId?: number | null;
    reference: string;
    number: number;
}
export interface KnowledgeManagementInterface {
    id?: number;
    subVariableId: number;
    factorId: number;
    indicatorId?: number;
    number?: number;
    reference?: string;
    indicator?: IndicatorInterface;
    indicators?: KnowledgeManagementArrayFormInterface[]
}

export interface KnowledgeManagementTableInterface {
    id: number;
    subVariableId: number;
    factorId: number;
    indicatorId?: number;
    reference?: string;
    subVariables?: SubVariableInterface;
    indicators?: IndicatorInterface;
    factors?: FactorInterface
}

export interface KnowledgeManagementSearchInterface {
    name?: string;
    code?: string
}

export type KnowledgeManagementFormProps = {
	handleSubmit: UseFormHandleSubmit<KnowledgeManagementInterface>
	onSubmit: (data:KnowledgeManagementInterface) => void;
	register: UseFormRegister<KnowledgeManagementInterface>;
    onCancel: () => void;
    setValue: UseFormSetValue<KnowledgeManagementInterface>;
    optionVariable?: DataSelectOptionInterface[];
    errors: FieldErrors<KnowledgeManagementInterface>;
    isLoading?: boolean;
    idDetail?: number | null,
    handleChangeSelect:(name: keyof KnowledgeManagementInterface, event:any)=> void;
    selectOption:{subVariable: {
        label: string;
        value: string;
    };
    factor: {
        label: string;
        value: string;
    }};
    optionSubVariable: DataSelectOptionInterface[];
    onSearchSubVariable: (event: ChangeEvent<HTMLInputElement>) => void;
    optionFactor: DataSelectOptionInterface[]
    onSearchFactor: (event: ChangeEvent<HTMLInputElement>) => void;
    listFormIndicator: FieldArrayWithId<KnowledgeManagementInterface, "indicators", "id">[];
    appendListFormIndicator: UseFieldArrayAppend<KnowledgeManagementInterface, "indicators">;
    selectIndicator:DataSelectOptionInterface[];
    handleChangeSelectArray: (name: keyof KnowledgeManagementArrayFormInterface, index: number, event: any) => void;
    optionIndicator: DataSelectOptionInterface[]
    onSearchIndicator: (event: ChangeEvent<HTMLInputElement>) => void
}

interface Info {
    page: number;
    limit: number;
    total: number;
  }
  
export interface DataKnowledgeManagementInterface {
    knowledgeManagements: KnowledgeManagementTableInterface[];
    info: Info;
}
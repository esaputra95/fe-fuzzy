import { ChangeEvent } from "react";
import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { DataSelectOptionInterface } from "./globalInterface";
import { SubVariableInterface } from "./master/subVariableInterface";
import { FactorInterface } from "./master/factorInterface";

export interface FuzzyInterface {
    subVariableId: number,
    factorId: number
}

export interface FuzzySearchInterface {
    subVariableId: number,
    factorId: number
}

export type FuzzyFormProps = {
	handleSubmit: UseFormHandleSubmit<FuzzyInterface>
	onSubmit: (data:FuzzyInterface) => void;
	register: UseFormRegister<FuzzyInterface>;
    onCancel: () => void;
    errors: FieldErrors<FuzzyInterface>;
    isLoading?: boolean;
    idDetail?: number | null;
    onSearchSubVariable: (event:ChangeEvent<HTMLInputElement>)=> void;
    optionSubVariable: DataSelectOptionInterface[];
    selectSubVariable:DataSelectOptionInterface;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleChangeSelect:(event:any, key:keyof FuzzyInterface)=> void;
    optionFactor: DataSelectOptionInterface[];
    selectFactor:DataSelectOptionInterface;
    onSearchFactor: (event:ChangeEvent<HTMLInputElement>)=> void;
}

interface Info {
    page: number;
    limit: number;
    total: number;
}

export interface FuzzyData {
    data: number[][][];
    respondentName: string;
    subVariableCode: string;
}  
export interface FuzzyDataTypeInterface {
    fuzzy: FuzzyData[];
    info: Info;
    multiplicationMatrix: number[][];
    squaredRootOf: number[][];
    eigenVector: number[][];
    lamda: number[][];
    subVariable?: SubVariableInterface,
    factor?: FactorInterface,
    stageFuzzy?: FuzzyData[],
    multiplicationMatrixStageFuzzy: number[][],
    squaredRootOfStageFuzzy: number[][],
    sintesisFuzzy: number[][],
    resultSI: number [][],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    valueVactor: any [][][],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    valueMin: any [][],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    normalization: any [][]
}

export type SheetData = {
    sheet: string;
    columns: Column[];
    content: Content[];
  };
  
  type Column = {
    label: string;
    value: string;
  };
  
  type Content = {
    JC1: number;
    JC2: number;
    JC3: number;
    min: number;
    cluster: string; // Anda perlu menambahkan tipe yang sesuai untuk properti "cluster"
  };

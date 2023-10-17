import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

export interface VariableInterface {
    id?: number;
    code?: string;
    name: string;
    description?: string;
}

export interface VariableSearchInterface {
    name?: string;
    code?: string
}

export type VariableFormProps = {
	handleSubmit: UseFormHandleSubmit<VariableInterface>
	onSubmit: (data:VariableInterface) => void;
	register: UseFormRegister<VariableInterface>;
    onCancel: () => void;
    errors: FieldErrors<VariableInterface>;
    isLoading?: boolean;
    idDetail?: string | null
}

interface Info {
    page: number;
    limit: number;
    total: number;
  }
  
export interface ClassDataTypeInterface {
    Variable: VariableInterface[];
    info: Info;
  }
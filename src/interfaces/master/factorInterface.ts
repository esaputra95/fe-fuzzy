import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

export interface FactorInterface {
    id?: number;
    code?: string;
    name: string;
    description?: string;
}

export interface FactorSearchInterface {
    name?: string;
    code?: string
}

export type FactorFormProps = {
	handleSubmit: UseFormHandleSubmit<FactorInterface>
	onSubmit: (data:FactorInterface) => void;
	register: UseFormRegister<FactorInterface>;
    onCancel: () => void;
    errors: FieldErrors<FactorInterface>;
    isLoading?: boolean;
    idDetail?: number | null;
}

interface Info {
    page: number;
    limit: number;
    total: number;
}

export interface ClassDataTypeInterface {
    Factor: FactorInterface[];
    info: Info;
}
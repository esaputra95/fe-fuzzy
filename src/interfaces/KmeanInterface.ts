import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

export interface KMeansInterface {
    id?: string;
    code?: string;
    name: string;
    price: number;
    description?: string;
    userCreate?: string | null,
    createdAt?: Date | null,
    updatedAt?: Date | null,
    deletedAt?: Date | null
}

export interface KMeansSearchInterface {
    name?: string;
    code?: string
}

export type KMeansFormProps = {
	handleSubmit: UseFormHandleSubmit<KMeansInterface>
	onSubmit: (data:KMeansInterface) => void;
	register: UseFormRegister<KMeansInterface>;
    onCancel: () => void;
    errors: FieldErrors<KMeansInterface>;
    isLoading?: boolean;
    idDetail?: string | null
}

interface Info {
    page: number;
    limit: number;
    total: number;
  }
  
export interface ClassDataTypeInterface {
    KMeans: KMeansInterface[];
    info: Info;
  }
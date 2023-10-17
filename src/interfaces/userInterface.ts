import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

export interface UserInterface {
    id?: number | null;
    username: string;
    name: string;
    password: string;
    role?: string;
}

export interface UserSearchInterface {
    name?: string;
    code?: string
}

export type UserFormProps = {
	handleSubmit: UseFormHandleSubmit<UserInterface>
	onSubmit: (data:UserInterface) => void;
	register: UseFormRegister<UserInterface>;
    onCancel: () => void;
    errors: FieldErrors<UserInterface>;
    isLoading?: boolean;
    idDetail?: number | null
}

interface Info {
    page: number;
    limit: number;
    total: number;
  }
  
export interface ClassDataTypeInterface {
    User: UserInterface[];
    info: Info;
  }
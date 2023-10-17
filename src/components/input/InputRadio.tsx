import { FC, InputHTMLAttributes } from "react";

interface InputRadioProps extends InputHTMLAttributes<HTMLInputElement> {
    register: any;
    label?: string;
    errors?: any;
    index: number;
    nameObj: string;
    valueRadio: any
}
const InputRadio: FC<InputRadioProps> = (props) => {
    const {
        label,
        register,
        errors,
        name,
        index,
        nameObj,
        valueRadio
    } = props
    return (
        <div className="flex items-center mb-4">
            <input
                {...register(`${name}.${index}.${nameObj}`)}
                type="radio"
                value={valueRadio}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
                htmlFor="default-radio-1"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
                {label}
            </label>
            <label className="text-red-300">
                {
                    errors[name??'']?.message ?? ''
                }
            </label>
        </div>
    )
}

export default InputRadio
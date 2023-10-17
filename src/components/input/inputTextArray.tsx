import { FC, InputHTMLAttributes } from "react"

interface  InputTextProps extends InputHTMLAttributes<HTMLInputElement>{
    register: any;
    label?: string;
    errors: any,
    index: number,
    nameObj?: string;
}

const InputTextArray: FC<InputTextProps> = (props) => {
    const { name, register, label, errors, index, nameObj, ...rest } = props
    return (
        <div className="w-full">
            <label className=" text-gray-700 text-sm font-bold mb-2">
                {label}
            </label>
            <input {...register(`${name}.${index}.${nameObj}`)}  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...rest} />
            <label className="text-red-300">
                {
                    errors[name??'']?.message ?? ''
                }
            </label>
        </div>
    )
}

export default InputTextArray
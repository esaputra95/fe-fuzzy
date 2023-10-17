import { FC, SelectHTMLAttributes } from 'react'
import { DataSelectOptionInterface } from '../../interfaces/globalInterface'

interface  SelectOptionProps extends SelectHTMLAttributes<HTMLSelectElement>{
    register: any;
    label?: string;
    errors?: any;
    data: DataSelectOptionInterface[];
}

const SelectOption: FC<SelectOptionProps> = (props) => {
    const { data, name, register, label, ...rest } = props
    return (
        <div className='w-full'>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <select 
                {...register(name)}
                id="countries" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...rest}>
                {
                    data.length > 0 ? data.map((value)=>(
                        <option key={value.value} value={value.value}>{value.label}</option>
                    )):null
                }
            </select>
        </div>
    )
}

export default SelectOption
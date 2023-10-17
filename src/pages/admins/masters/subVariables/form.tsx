import { FC } from 'react'
import { InputText, Button, SelectOption } from '../../../../components/input';
import { SubVariableFormProps } from '../../../../interfaces/master/subVariableInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../../components/ui/Spinner';
import Select from "react-tailwindcss-select";

const FormSubVariable: FC<SubVariableFormProps> = (props) => {
    const { handleSubmit, onSubmit, register, onCancel, optionVariable, onSearchVariable, selectSubVariable, handleChangeSelect, errors, isLoading, idDetail } = props;
    const {t} = useTranslation()

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col space-y-4'>
                <SelectOption register={register} name='km' data={[{label: "Tidak", value:'no'},{label: "Ya", value:'yes'}]} /> 
                <div className='w-full'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Variable    
                    </label>
                    <Select
                        {...register('variableId')}
                        onSearchInputChange={onSearchVariable}
                        isSearchable={true}
                        value={selectSubVariable}
                        onChange={(event)=> handleChangeSelect(event)}
                        options={optionVariable} 
                        primaryColor={''}
                    />
                </div>
                <InputText errors={errors} readOnly={idDetail?true:false} register={register} label={t("code")} name='code' />
                <InputText errors={errors} readOnly={idDetail?true:false} register={register} label={t("name")} name='name' />
                <InputText errors={errors} readOnly={idDetail?true:false} register={register} label={t("description")} name='description' />
            </div>
            <div className='w-full flex justify-end space-x-2'>
                <Button type='button' variant="error" onClick={onCancel} size="medium" className='my-4' >Batal</Button>
                {!idDetail ? <Button disabled={isLoading?true:false} variant="primary" type='submit' size="medium" className='my-4' >Simpan {isLoading?<Spinner />:null}</Button>: null}
            </div>
        </form>
    )
}

export default FormSubVariable
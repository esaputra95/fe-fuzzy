import { FC, useState } from 'react'
import { InputText, Button } from '../../../../components/input';
import { IndicatorFormProps } from '../../../../interfaces/master/IndicatorInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../../components/ui/Spinner';
import Select from "react-tailwindcss-select";

const FormIndicator: FC<IndicatorFormProps> = (props) => {
    const { 
        handleSubmit, 
        onSubmit, 
        register, 
        onCancel, 
        onSearchSubVariable,
        optionSubVariable,
        errors,
        isLoading,
        idDetail,
        selectSubVariable,
        handleChangeSelect
    } = props;
    const {t} = useTranslation()
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col space-y-4'>
                <div className='w-full'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Sub Variable    
                    </label>
                    <Select
                        {...register('subVariableId')}
                        onSearchInputChange={onSearchSubVariable}
                        isSearchable={true}
                        value={selectSubVariable}
                        onChange={(event)=> handleChangeSelect(event)}
                        options={optionSubVariable} primaryColor={''}
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

export default FormIndicator
import { FC } from 'react'
import { InputText, Button } from '../../../../components/input';
import { VariableFormProps } from '../../../../interfaces/master/variableInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../../components/ui/Spinner';

const FormVariable: FC<VariableFormProps> = (props) => {
    const { handleSubmit, onSubmit, register, onCancel, errors, isLoading, idDetail } = props;
    const {t} = useTranslation()
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col space-y-4'>
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

export default FormVariable
import { FC } from 'react'
import { Button, InputTextArray } from '../../../components/input';
import { KnowledgeManagementFormProps } from '../../../interfaces/knowledgeManagementInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../components/ui/Spinner';
import Select from "react-tailwindcss-select";

const FormKnowledgeManagement: FC<KnowledgeManagementFormProps> = (props) => {
    const {
        handleSubmit,
        onSubmit,
        register,
        onCancel,
        selectOption,
        appendListFormIndicator,
        handleChangeSelect,
        errors,
        isLoading,
        idDetail,
        optionSubVariable,
        onSearchSubVariable,
        optionFactor,
        onSearchFactor,
        listFormIndicator,
        selectIndicator,

        optionIndicator,
        onSearchIndicator,
        handleChangeSelectArray
    } = props;

    const {t} = useTranslation()

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col space-y-4'>
                {/* <SelectOption register={register} name='knowledgeManagement' data={[{label: "Tidak", value:'no'},{label: "Ya", value:'yes'}]} />  */}
                <div className='w-full'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        {t('subVariable')}   
                    </label>
                    <Select
                        {...register('subVariableId')}
                        onSearchInputChange={onSearchSubVariable}
                        isSearchable={true}
                        value={selectOption.subVariable}
                        onChange={(event)=> handleChangeSelect('subVariableId', event)}
                        options={optionSubVariable} 
                        primaryColor={''}
                    />
                </div>
                <div className='w-full'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        {t('factor')}    
                    </label>
                    <Select
                        {...register('factorId')}
                        onSearchInputChange={onSearchFactor}
                        isSearchable={true}
                        value={selectOption.factor}
                        onChange={(event)=> handleChangeSelect('factorId', event)}
                        options={optionFactor} 
                        primaryColor={''}
                    />
                </div>
                <div className='w-full flex justify-end'>
                <Button type='button' className='w-32' onClick={()=> appendListFormIndicator({ indicatorId:null, reference:'' })}>+ {t("indicator")}</Button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th className='flex text-start'>
                                Indikator
                            </th>
                            <th>
                                Referensi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                listFormIndicator.map((field, index)=> (
                                    <tr key={field.id}>
                                        <td>
                                            <Select
                                                {...register(`indicators.${index}.indicatorId`)} 
                                                onSearchInputChange={onSearchIndicator}
                                                isSearchable={true}
                                                value={selectIndicator[index]}
                                                onChange={(event)=> handleChangeSelectArray('indicatorId', index, event)}
                                                options={optionIndicator} 
                                                primaryColor={''}
                                            />
                                        </td>
                                        <td>
                                            <InputTextArray 
                                                errors={errors} 
                                                readOnly={idDetail?true:false} 
                                                register={register}
                                                index={index}
                                                name='indicators'
                                                nameObj='reference'
                                            />
                                        </td>
                                    </tr>
                                ))
                            }
                    </tbody>
                </table>
            </div>
            <div className='w-full flex justify-end space-x-2'>
                <Button type='button' variant="error" onClick={onCancel} size="medium" className='my-4' >Batal</Button>
                {!idDetail ? <Button disabled={isLoading?true:false} variant="primary" type='submit' size="medium" className='my-4' >Simpan {isLoading?<Spinner />:null}</Button>: null}
            </div>
        </form>
    )
}

export default FormKnowledgeManagement
import { FC, Fragment, useState } from 'react'
import { Button, InputTextArray } from '../../../../components/input';
import { ExpertQuestionnaireFormProps } from '../../../../interfaces/expertQuestionnaireInterface';
import { useTranslation } from 'react-i18next';
import InputRadio from '../../../../components/input/InputRadio';
import FormBiodata from './formBiodata';
import FormTable from './formTable';

const FormClassType: FC<ExpertQuestionnaireFormProps> = (props) => {
    const { 
        handleSubmit,
        onSubmit,
        register,
        errors,
        dataForm 
    } = props;
    const {t} = useTranslation()
    const [ tab, setTab ] = useState("biodata")
    let indexData=0
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text-sm font-medium text-center 
                text-gray-500 border-b border-gray-200 
                dark:text-gray-400 dark:border-gray-700"
            >
                <ul className="flex -mb-px overflow-auto">
                    <li className="mr-2">
                        <span
                            onClick={()=> setTab("biodata") }
                            className={`
                                hover:cursor-pointer
                                inline-block
                                text-md
                                font-semibold
                                p-4
                                border-b-2
                                border-transparent
                                rounded-t-lg
                                hover:text-blue-500
                                hover:border-gray-300
                                dark:hover:text-gray-300
                                ${tab==="biodata" ? 'text-blue-500': ''}`
                            }
                        >
                            {t("expert-Lecturer-data")}
                        </span>
                    </li>
                    <li className="mr-2">
                        <span
                            onClick={()=> setTab("Pendidikan dan Pengajaran") }
                            className={`
                                hover:cursor-pointer
                                inline-block
                                p-4
                                text-md
                                font-semibold
                                border-b-2
                                border-transparent
                                rounded-t-lg
                                hover:text-blue-500
                                hover:border-gray-300
                                dark:hover:text-gray-300
                                ${tab==="Pendidikan dan Pengajaran" ? 'text-blue-500': ''}`
                            }
                        >
                            Kuesioner
                        </span>
                    </li>
                </ul>
            </div>
            <div className='w-full'>
                {
                    tab==="biodata" ? 
                    <FormBiodata
                        register={register}
                        errors={errors}
                    /> :
                    tab === "Pendidikan dan Pengajaran" ?
                    dataForm?.map((valueSub)=> (
                        <Fragment key={Math.random().toString(36)}>
                            <label>{valueSub.name} - {valueSub.code}</label>
                            {
                                valueSub.factor.map((valueFac)=> (
                                    <Fragment key={Math.random().toString(36)}>
                                        <label>{valueFac.name} - {valueFac.code+'_'+valueSub.code}</label>
                                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                            <FormTable />
                                            <tbody>
                                                {
                                                    valueFac.knowledge.map((valueKnow, indexKnow)=> (
                                                        <Fragment key={Math.random().toString(36)}>
                                                            {
                                                                valueFac.knowledge.map((valueKnow2, indexKnow2)=>{
                                                                    if(indexKnow < indexKnow2){
                                                                        indexData++
                                                                        return(
                                                                            <tr key={Math.random().toString(36)} className="overflow-auto bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                                                <td className='border-2'>
                                                                                    {indexData}
                                                                                    <InputTextArray 
                                                                                        type="hidden"
                                                                                        name="questionary"
                                                                                        nameObj="indicatorId1"
                                                                                        index={indexData}
                                                                                        register={register}
                                                                                        errors={errors}
                                                                                        value={valueKnow.indicators.id}
                                                                                    />
                                                                                    <InputTextArray 
                                                                                        type="hidden"
                                                                                        name="questionary"
                                                                                        nameObj="indexIndicator1"
                                                                                        index={indexData}
                                                                                        register={register}
                                                                                        errors={errors}
                                                                                        value={indexKnow}
                                                                                    />
                                                                                    <InputTextArray 
                                                                                        type="hidden"
                                                                                        name="questionary"
                                                                                        nameObj="subVariableId"
                                                                                        index={indexData}
                                                                                        register={register}
                                                                                        errors={errors}
                                                                                        value={valueSub.id}
                                                                                    />
                                                                                    <InputTextArray 
                                                                                        type="hidden"
                                                                                        name="questionary"
                                                                                        nameObj="factorId"
                                                                                        index={indexData}
                                                                                        register={register}
                                                                                        errors={errors}
                                                                                        value={valueFac.id}
                                                                                    />
                                                                                </td>
                                                                                <td className='border-2'>
                                                                                    {valueKnow.indicators.name} {valueFac.code+'_'+valueSub.code+(indexKnow+1)}
                                                                                </td>
                                                                                <td className='border-2' align='center'>
                                                                                    <InputRadio 
                                                                                        name='questionary'
                                                                                        register={register}
                                                                                        errors={errors}
                                                                                        nameObj='value'
                                                                                        index={indexData}
                                                                                        valueRadio="-9"
                                                                                    />
                                                                                </td>
                                                                                <td className='border-2'>
                                                                                    <InputRadio 
                                                                                        name='questionary'
                                                                                        register={register}
                                                                                        errors={errors}
                                                                                        nameObj='value'
                                                                                        index={indexData}
                                                                                        valueRadio="-7"
                                                                                    />
                                                                                </td>
                                                                                <td className='border-2'>
                                                                                    <InputRadio 
                                                                                        name='questionary'
                                                                                        register={register}
                                                                                        errors={errors}
                                                                                        nameObj='value'
                                                                                        index={indexData}
                                                                                        valueRadio="-5"
                                                                                    />
                                                                                </td>
                                                                                <td className='border-2'>
                                                                                    <InputRadio 
                                                                                        name='questionary'
                                                                                        register={register}
                                                                                        errors={errors}
                                                                                        nameObj='value'
                                                                                        index={indexData}
                                                                                        valueRadio="-3"
                                                                                    />
                                                                                </td>
                                                                                <td className='border-2'>
                                                                                    <InputRadio 
                                                                                        name='questionary'
                                                                                        register={register}
                                                                                        errors={errors}
                                                                                        nameObj='value'
                                                                                        index={indexData}
                                                                                        valueRadio="1"
                                                                                    />
                                                                                </td>
                                                                                <td className='border-2'>
                                                                                    <InputRadio 
                                                                                        name='questionary'
                                                                                        register={register}
                                                                                        errors={errors}
                                                                                        nameObj='value'
                                                                                        index={indexData}
                                                                                        valueRadio="3"
                                                                                    />
                                                                                </td>
                                                                                <td className='border-2'>
                                                                                    <InputRadio 
                                                                                        name='questionary'
                                                                                        register={register}
                                                                                        errors={errors}
                                                                                        nameObj='value'
                                                                                        index={indexData}
                                                                                        valueRadio="5"
                                                                                    />
                                                                                </td>
                                                                                <td className='border-2'>
                                                                                    <InputRadio 
                                                                                        name='questionary'
                                                                                        register={register}
                                                                                        errors={errors}
                                                                                        nameObj='value'
                                                                                        index={indexData}
                                                                                        valueRadio="7"
                                                                                    />
                                                                                </td>
                                                                                <td className='border-2'>
                                                                                    <InputRadio 
                                                                                        name='questionary'
                                                                                        register={register}
                                                                                        errors={errors}
                                                                                        nameObj='value'
                                                                                        index={indexData}
                                                                                        valueRadio="9"
                                                                                    />
                                                                                </td>
                                                                                <td className='border-2'>
                                                                                    <InputTextArray 
                                                                                        type="hidden"
                                                                                        name="questionary"
                                                                                        nameObj="indicatorId2"
                                                                                        index={indexData}
                                                                                        register={register}
                                                                                        errors={errors}
                                                                                        value={valueKnow2.indicators.id}
                                                                                    />
                                                                                    {valueKnow2.indicators.name} {valueFac.code+'_'+valueSub.code+(indexKnow2+1)}
                                                                                </td>

                                                                                <InputTextArray 
                                                                                        type="hidden"
                                                                                        name="questionary"
                                                                                        nameObj="indexIndicator2"
                                                                                        index={indexData}
                                                                                        register={register}
                                                                                        errors={errors}
                                                                                        value={indexKnow2}
                                                                                    />
                                                                            </tr>
                                                                        )
                                                                    }
                                                                })
                                                            }
                                                        </Fragment>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </Fragment>
                                ))
                            }
                        </Fragment>
                    ))
                    
                        :
                    null
                }
                <div className='w-full flex justify-end pt-4'>
                    <Button type='submit'>{t("save")}</Button>
                </div>
            </div>
        </form>
    )
}

export default FormClassType
import { FC, Fragment, useState } from 'react'
import { InputText, Button } from '../../../components/input';
import { ExpertQuestionnaireFormProps } from '../../../interfaces/expertQuestionnaireInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../components/ui/Spinner';
import InputRadio from '../../../components/input/InputRadio';
import FormBiodata from './formBiodata';
import FormTabPendidikan from './formTabPendidikan';

const FormClassType: FC<ExpertQuestionnaireFormProps> = (props) => {
    const { 
        handleSubmit,
        onSubmit,
        register,
        onCancel,
        errors,
        isLoading,
        idDetail,
        dataForm 
    } = props;
    const {t} = useTranslation()
    const [ tab, setTab ] = useState("biodata")
    
    console.log({errors});
    
    const tabPendidikan = dataForm?.filter(a=> a.name === "Pendidikan dan Pengajaran")[0];
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text-sm font-medium text-center 
                text-gray-500 border-b border-gray-200 
                dark:text-gray-400 dark:border-gray-700"
            >
                <ul className="flex flex-wrap -mb-px">
                    <li className="mr-2">
                        <span
                            onClick={()=> setTab("biodata") }
                            className={`
                                hover:cursor-pointer
                                inline-block
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
                                border-b-2
                                border-transparent
                                rounded-t-lg
                                hover:text-blue-500
                                hover:border-gray-300
                                dark:hover:text-gray-300
                                ${tab==="Pendidikan dan Pengajaran" ? 'text-blue-500': ''}`
                            }
                        >
                            Pendidikan dan Pengajaran
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
                        <FormTabPendidikan 
                            register={register}
                            errors={errors}
                            tabPendidikan={tabPendidikan}
                        />
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
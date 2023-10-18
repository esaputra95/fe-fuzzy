import { FC, Fragment, useState } from 'react'
import { InputText, Button } from '../../../components/input';
import { ExpertQuestionnaireFormProps } from '../../../interfaces/expertQuestionnaireInterface';
import { useTranslation } from 'react-i18next';
import Spinner from '../../../components/ui/Spinner';
import InputRadio from '../../../components/input/InputRadio';
import FormBiodata from './formBiodata';
import FormTabPendidikan from './formTabPendidikan';
import FormTabPenelitian from './formTabPenelitian';

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
    const tabPenelitian = dataForm?.filter(a=> a.name === "Penelitian dan Publikasi")[0];
    
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
                            Pendidikan dan Pengajaran
                        </span>
                    </li>
                    <li className="mr-2">
                        <span
                            onClick={()=> setTab("Penelitian dan Publikasi") }
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
                                ${tab==="Penelitian dan Publikasi" ? 'text-blue-500': ''}`
                            }
                        >
                            Penelitian dan Publikasi
                        </span>
                    </li>
                    <li className="mr-2">
                        <span
                            onClick={()=> setTab("Pengabdian kepada Masyarakat") }
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
                                ${tab==="Pengabdian kepada Masyarakat" ? 'text-blue-500': ''}`
                            }
                        >
                            Pengabdian kepada Masyarakat
                        </span>
                    </li>
                    <li className="mr-2">
                        <span
                            onClick={()=> setTab("Unsur Penunjang") }
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
                                ${tab==="Unsur Penunjang" ? 'text-blue-500': ''}`
                            }
                        >
                            Unsur Penunjang
                        </span>
                    </li>
                    <li className="mr-2">
                        <span
                            onClick={()=> setTab("Perilaku Kerja") }
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
                                ${tab==="Perilaku Kerja" ? 'text-blue-500': ''}`
                            }
                        >
                            Perilaku Kerja
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
                    tab === "Penelitian dan Publikasi" ?
                        <FormTabPenelitian 
                            register={register}
                            errors={errors}
                            tabPenelitian={tabPenelitian}
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
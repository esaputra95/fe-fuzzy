import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { InputText } from '../../../components/input'
import { ExpertQuestionnaireInterface } from '../../../interfaces/expertQuestionnaireInterface';
import { FC } from 'react';
import { t } from 'i18next';
interface FormDataProps {
    register: UseFormRegister<ExpertQuestionnaireInterface>;
    errors: FieldErrors<ExpertQuestionnaireInterface>;
}
const FormBiodata: FC<FormDataProps> = (props) => {
    const {
        register,
        errors
    } = props;
    return (
        <div className='w-full'>
            <div className='py-2'>
                <InputText
                    name='name'
                    register={register}
                    errors={errors}
                    label={t("name")}
                />
            </div>
            <div className='py-2'>
                <InputText
                    name='nik'
                    register={register}
                    errors={errors}
                    label={t("nik")}
                />
            </div>
            <div className='py-2'>
                <InputText
                    name='gender'
                    register={register}
                    errors={errors}
                    label={t("gender")}
                />
            </div>
            <div className='py-2'>
                <InputText
                    name='specialty'
                    register={register}
                    errors={errors}
                    label={t("specialty")}
                />
            </div>
            <div className='py-2'>
                <InputText
                    name='position'
                    register={register}
                    errors={errors}
                    label={t("position")}
                />
            </div>
            <div className='py-2'>
                <InputText
                    name='faculty'
                    register={register}
                    errors={errors}
                    label={t("faculty")}
                />
            </div>

            <div className='py-2'>
                <InputText
                    name='university'
                    register={register}
                    errors={errors}
                    label={t("universities")}
                />
            </div>
        </div>
    )
}

export default FormBiodata
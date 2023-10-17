import { useTranslation } from "react-i18next";
import * as yup from "yup"

const ExpertQuestionnaireSchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        name: yup.string().required(`${t("name")} ${t("required")}`),
        nik: yup.string().required(`${t("nik")} ${t("required")}`),
        gender: yup.string().required(`${t("gender")} ${t("required")}`),
        position: yup.string().required(`${t("position")} ${t("required")}`),
        specialty: yup.string().required(`${t("specialty")} ${t("required")}`),
        faculty: yup.string().required(`${t("faculty")} ${t("required")}`),
        university: yup.string().required(`${t("universities")} ${t("required")}`),
        questionary: yup.array().required('harus disisi')
    });

    return {
        schema
    }
}
export default ExpertQuestionnaireSchema
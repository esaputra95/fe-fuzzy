import { useTranslation } from "react-i18next";
import * as yup from "yup"

const QuestionnaireSchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        name: yup.string().required(`${t("name")} ${t("required")}`),
        // questionary: yup.array().of(
        //     yup.object({
        //         value: yup.string().required('harus diisi')
        //     })
        // ).required('harus di isi')
    });

    return {
        schema
    }
}
export default QuestionnaireSchema
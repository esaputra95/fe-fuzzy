import { useTranslation } from "react-i18next";
import * as yup from "yup"

const FuzzySchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        subVariableId: yup.number().required(`${t("subVariable")} ${t("required")}`),
        factorId: yup.number().required(`${t("factor")} ${t("required")}`),
        university: yup.string().optional()
    });

    return {
        schema
    }
}
export default FuzzySchema
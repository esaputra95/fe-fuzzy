import { useTranslation } from "react-i18next";
import * as yup from "yup"

const RankingSchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        subVariableId: yup.number().required(`${t("subVariable")} ${t("required")}`),
        factorId: yup.number().required(`${t("factor")} ${t("required")}`)
    });

    return {
        schema
    }
}
export default RankingSchema
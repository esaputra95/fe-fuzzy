import { useTranslation } from "react-i18next";
import * as yup from "yup"

const userSchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        name: yup.string().required(`${t("name")} ${t("required")}`),
        username: yup.string().typeError(`${t("price")} ${t("mustNumber")}`).required(`${t("price")} ${t("required")}`),
        password: yup.string().required()
    });

    return {
        schema
    }
}
export default userSchema
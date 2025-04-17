import { useTranslation } from "react-i18next";
import * as yup from "yup"

const LoginSchema = () => {
    const {t} = useTranslation()
    const schema = yup.object({
        username: yup.string().required(`${t("username")} ${t("required")}`),
        password: yup.string().required(`${t("password")} ${t("required")}`),
        type: yup.boolean()
    });

    return {
        schema
    }
}
export default LoginSchema
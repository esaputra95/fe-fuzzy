import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const locatioanName = () => {
    const { t } = useTranslation();
    const location = useLocation()
    return {
        pathName: t(location.pathname.replace('/', ''))
    }
}

export default locatioanName
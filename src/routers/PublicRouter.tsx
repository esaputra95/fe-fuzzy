import PublicLayout from "../components/layouts/PublicLayout";
import { FormQuestionnaire } from "../pages/admins/fuzzys";
import RegisterStudents from "../pages/publics/RegisterStudents";

const PublicRouters = [
    {
        path: '/',
        element: <PublicLayout />,
        children: [
            {
                path: '/register',
                element: <RegisterStudents />
            },
            {
                path: 'questionnaire-respondent/form',
                element: <FormQuestionnaire />
            },
        ]
    }
];

export default PublicRouters;
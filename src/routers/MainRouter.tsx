import AdminLayout from "../components/layouts/admin/AdminLayout";
import HomePage from "../pages/admins/dashboard/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import UserPage from "../pages/admins/users";
import Middleware from "./MiddlewareRouter";
import { 
    ClassTypePage,
    VariablePage,
    SubVariablePage,
    FactorPage,
    IndicatorPage
} from "../pages/admins/masters";
import KnowledgeManagementPage from "../pages/admins/knowledgeManagement";
import ExpertQuestionnairePage from "../pages/admins/expertQuestionnaire";
const MainRouters = [
    {
        path: '/',
        element: <Middleware page={<AdminLayout />} />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'dashboard',
                element: <HomePage />
            },
            {
                path: 'user',
                element: <UserPage />
            },
            {
                path: 'class-types',
                element: <ClassTypePage />
            },
            {
                path: 'variable',
                element: <VariablePage />
            },
            {
                path: 'sub-variable',
                element: <SubVariablePage />
            },
            {
                path: 'factor',
                element: <FactorPage />
            },
            {
                path: 'indicator',
                element: <IndicatorPage />
            },
            {
                path: 'knowledge-management',
                element: <KnowledgeManagementPage />
            },
            {
                path: 'expert-questionnaire',
                element: <ExpertQuestionnairePage />
            },
            {
                path: '*', 
                element: <NotFoundPage />
            }
        ], 
    }
];

export default MainRouters;
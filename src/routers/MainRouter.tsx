import AdminLayout from "../components/layouts/admin/AdminLayout";
import HomePage from "../pages/admins/dashboard/HomePage";
import UserPage from "../pages/admins/users";
import Middleware from "./MiddlewareRouter";
import { 
    ClassTypePage,
    VariablePage,
    SubVariablePage,
    FactorPage,
    // IndicatorPage
} from "../pages/admins/masters";
import { 
    RankingPage,
    FuzzyPage,
    ExpertQuestionnairePage,
    KnowledgeManagementPage,
    PerformancePage,
    QuestionnairePage
} from "../pages/admins/fuzzys";
import { CalculationsPage, KMeansPage } from "../pages/admins/kmeans";
import TestingPage from "../pages/admins/pengujian";
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
            // {
            //     path: 'indicator',
            //     element: <IndicatorPage />
            // },
            {
                path: 'indicator',
                element: <KnowledgeManagementPage />
            },
            {
                path: 'expert-questionnaire',
                element: <ExpertQuestionnairePage />
            },
            {
                path: 'fuzzy',
                element: <FuzzyPage />
            },
            {
                path: 'ranking',
                element: <RankingPage />
            },
            {
                path: 'kmeans',
                element: <KMeansPage />
            },
            {
                path: 'performance',
                element: <PerformancePage />
            },
            {
                path: 'questionnaire-respondent',
                element: <QuestionnairePage />
            },
            {
                path: 'calculations',
                element: <CalculationsPage />
            },
            {
                path: 'testing',
                element: <TestingPage />
            }
        ], 
    }
];

export default MainRouters;
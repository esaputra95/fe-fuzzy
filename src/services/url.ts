const url = {
    user: {
        get: 'users',
        post: 'users',
        put: 'users',
        getById: 'users',
        delete: 'users'
    },
    classType: {
        get: 'class-types',
        post: 'class-types',
        put: 'class-types',
        getById: 'class-types',
        delete: 'class-types'
    },
    variable: {
        get: 'variables',
        post: 'variables',
        put: 'variables',
        getById: 'variables',
        delete: 'variables',
        getSelect: 'variables/select',
    },
    subVariable: {
        get: 'sub-variables',
        post: 'sub-variables',
        put: 'sub-variables',
        getById: 'sub-variables',
        delete: 'sub-variables',
        getSelect: 'sub-variables/select'
    },
    factor: {
        get: 'factors',
        post: 'factors',
        put: 'factors',
        getById: 'factors',
        delete: 'factors',
        getSelect: 'factors/select'
    },
    indicator: {
        get: 'indicators',
        post: 'indicators',
        put: 'indicators',
        getById: 'indicators',
        delete: 'indicators',
        getSelect: 'indicators/select'
    },
    knowledgeManagement: {
        get: 'knowledge-managements',
        post: 'knowledge-managements',
        put: 'knowledge-managements',
        getById: 'knowledge-managements',
        delete: 'knowledge-managements'
    },
    expertQuestionnaire: {
        get: 'expert-questionnaires',
        post: 'expert-questionnaires',
        put: 'expert-questionnaires',
        getById: 'expert-questionnaires',
        delete: 'expert-questionnaires',
        form: 'expert-questionnaires/form'
    },
    Fuzzy: {
        get: 'fuzzy',
        post: 'fuzzy',
        put: 'fuzzy',
        getById: 'fuzzy',
        delete: 'fuzzy',
        getSelect: 'fuzzy/select'
    },
    Ranking: {
        get: 'fuzzy/rankings',
        post: 'rankings',
        put: 'rankings',
        getById: 'rankings',
        delete: 'rankings',
        getSelect: 'rankings/select'
    },
    Performance: {
        get: 'fuzzy/performance'
    },
    Questionnaire: {
        indicator: 'questionnaire'
    }
};

export default url
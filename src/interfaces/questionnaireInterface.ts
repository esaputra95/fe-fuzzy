import { KnowledgeManagementTableInterface } from "./knowledgeManagementInterface";
import { FactorInterface } from "./master/factorInterface";
import { SubVariableInterface } from "./master/subVariableInterface";

export interface QuestionnaireInterface {
    name: string;
    questionary?: ScalaInterface[]
}

export interface QuestionnaireDataInterface {
    name: string;
    gender?: string;
    golongan?: string;
    lastStudy?: string;
    skill?: string;
    status?: string;
    studyProgram?: string;
    university?: string;
    questionary?: ScalaInterface[]
}

interface ScalaInterface {
    value: string,
    label?: string
}

interface Factor extends FactorInterface {
    knowledge: KnowledgeManagementTableInterface[]
}
export interface FormQuestionnaire extends SubVariableInterface {
    factor: Factor[]
}
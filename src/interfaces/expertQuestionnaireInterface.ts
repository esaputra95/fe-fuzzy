import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { KnowledgeManagementInterface, KnowledgeManagementTableInterface } from "./knowledgeManagementInterface";
import { SubVariableInterface } from "./master/subVariableInterface";
import { FactorInterface } from "./master/factorInterface";
import { IndicatorInterface } from "./master/IndicatorInterface";

export interface ExpertQuestionnaireInterface {
    id?: number;
    name: string;
    nik: string;
    gender: string;
    position: string;
    specialty: string;
    faculty: string;
    university: string;
    type?: string;
    questionary: ScalaInterface[];
    description?: string;
}

interface ScalaInterface {
  value?: any
}

export interface ExpertQuestionnaireSearchInterface {
    name?: string;
    code?: string
}

export type ExpertQuestionnaireFormProps = {
	handleSubmit: UseFormHandleSubmit<ExpertQuestionnaireInterface>
	onSubmit: (data:ExpertQuestionnaireInterface) => void;
	register: UseFormRegister<ExpertQuestionnaireInterface>;
  onCancel: () => void;
  errors: FieldErrors<ExpertQuestionnaireInterface>;
  isLoading?: boolean;
  idDetail?: number | null;
  dataForm: DataForm[] | undefined
}

interface Info {
    page: number;
    limit: number;
    total: number;
  }
  
export interface ClassDataTypeInterface {
    ExpertQuestionnaire: ExpertQuestionnaireInterface[];
    info: Info;
}

export interface DataFormExpertQuestionnaireInterface {
    id: number;
    variableId: number;
    code: string;
    name: string;
    description: string;
    km: string;
    knowledgeManagement : KnowledgeManagementTableInterface[]
}

interface SubVariable {
    id: number;
    name: string;
  }
  
interface Indicator {
    id: number;
    name: string;
}

type Knowledge = Omit<KnowledgeManagementInterface, 'indicators' >

interface KnowledgeManagement extends Knowledge{
	indicators: IndicatorInterface
}
interface Factor extends FactorInterface {
    knowledge: KnowledgeManagement[]
}
  
  export interface DataForm  extends SubVariableInterface {
    factor: Factor[];
  }
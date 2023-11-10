import { FactorInterface } from "./master/factorInterface";
import { SubVariableInterface } from "./master/subVariableInterface";

export interface SubFactor {
    factor: FactorInterface;
    bobot: {value: number, label: string}[];
}

interface SubVariableData extends SubVariableInterface {
  total: number
}

export interface RankingData {
    subVariable?: SubVariableData,
    data?: SubFactor[];
}
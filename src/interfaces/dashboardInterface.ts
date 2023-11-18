export interface BobotInterface {
    label: string[],
    bobot: {
        [key:string]: number
    }
}

export interface ClusterInterface {
    c1: number;
    c2: number;
    c3: number
}

export interface TotalPerformanceInterface {
    label: string;
    value: number
}


export interface KmeansInterface {
    labels: string[],
    datasets: {
        label: string,
        data: number[],
        borderColor?: string,
        backgroundColor?: string,
    }[]
}
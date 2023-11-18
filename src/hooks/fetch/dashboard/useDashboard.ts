import { useEffect, useState } from "react"
import { 
    getBobot,
    getCluster,
    getKmeans, getTotalPerformance } from "../../models/dashboard/dashboardModel"
import { 
    BobotInterface, 
    ClusterInterface, 
    KmeansInterface, 
    TotalPerformanceInterface 
} from "../../../interfaces/dashboardInterface"


const color = [
    {
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
    },
    {
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }, 
    {
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
    }
]
export const useDashboard = () => {
    const [bobot, setBobot] = useState<BobotInterface>()
    const [cluster, setCluster] = useState<ClusterInterface>();
    const [totalPerformance, setTotalPerformance] = useState<TotalPerformanceInterface[]>()
    const [kmeans, setKmeans] = useState<KmeansInterface>({
        labels:['-'],
        datasets: [
            {
            label: '-',
            data: [0],
            },
            {
            label: '-',
            data: [0],
            },
        ],
    })

    useEffect(()=> {
        getDataBobot();
        getDataCluster();
        getPerformance();
        getDataKmeans()
    }, [])

    const getDataBobot = async () => {
        const data = await getBobot();
        if(data.status){
            setBobot(data.data)
        }
    }

    const getDataCluster = async () => {
        const data = await getCluster();
        if(data.status){
            setCluster(data.data)
        }
    }

    const getPerformance = async () => {
        const data = await getTotalPerformance()
        if(data.status){
            let dataPerformance:TotalPerformanceInterface[]=[]
            for (const key in data.data) {
                dataPerformance=[...dataPerformance,
                    {
                        label: key,
                        value: data.data[key],
                    }
                ]
            }
            setTotalPerformance(dataPerformance)
        }
    }

    const getDataKmeans = async () => {
        const data = await getKmeans();
        if(data.status){
            // let dataPerformance:KmeansInterface
            const kmeansData = data.data
            let labels:string[]=[]
            let dataSet:{
                label: string,
                data: number[]
            }[]=[]

            for (let index = 0; index < kmeansData.length; index++) {
                labels = Object.keys(kmeansData[index])
                dataSet=[...dataSet,
                    {
                        label: `C${(index+1)}`,
                        data: labels.map((value)=> (kmeansData[index][value])),
                        ...color[index]
                    }
                ]
            }
            // console.log({labels});
            
            setKmeans({
                labels: labels,
                datasets: dataSet
            })
        }
    }

    return{
        bobot,
        cluster,
        totalPerformance,
        kmeans
    }
}
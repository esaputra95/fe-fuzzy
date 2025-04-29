import { useEffect, useState } from "react"
import { 
    getBobot,
    getCluster,
    getKmeans,
    getTotalPerformance,
    getMaster
} from "../../models/dashboard/dashboardModel"
import { 
    BobotInterface, 
    ClusterInterface, 
    KmeansInterface, 
    TotalPerformanceInterface 
} from "../../../interfaces/dashboardInterface"
import { DataSelectOptionInterface } from "../../../interfaces/globalInterface"


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
    const [bobot, setBobot] = useState<BobotInterface>();
    const [cluster, setCluster] = useState<ClusterInterface>();
    const [loadingPerformance, setLoadingPerformance] = useState(false)
    const [totalPerformance, setTotalPerformance] = useState<TotalPerformanceInterface[]>();
    const [programStudy, setProgramStudy] = useState<DataSelectOptionInterface[]>();
    const [university, setUniversity] = useState<DataSelectOptionInterface[]>();
    const [name, setName] = useState<DataSelectOptionInterface[]>();
    const [gender, setGender] = useState<DataSelectOptionInterface[]>();
    const [faculty, setFaculty] = useState<DataSelectOptionInterface[]>();
    const [filter, setFilter] = useState({university: '', gender:'', faculty:'', programStudy:'', code:''})
    const [filterKm, setFilterKm] = useState({university: '', gender:'', faculty:'', programStudy:'', code:''})
    const [loadingKm, setLoadingKm] = useState(false)
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
        getDataKmeans(filterKm.university, filterKm.gender, filterKm.faculty, filterKm.programStudy, filterKm.code);
        getDataMaster();
    }, [])

    const getDataBobot = async () => {
        const data = await getBobot();
        if(data.status){
            setBobot(data.data)
        }
    }

    const getDataMaster = async () => {
        const data = await getMaster();
        if(data.status){
            setUniversity(data.data.university)
            setGender(data.data.gender)
            setFaculty(data.data.faculty)
            setProgramStudy(data?.data?.programStudy)
            setName(data?.data?.name)
        }
    }

    const getDataCluster = async () => {
        const data = await getCluster();
        if(data.status){
            setCluster(data.data)
        }
    }

    const getPerformance = async () => {
        setLoadingPerformance(true)
        const data = await getTotalPerformance(filter.university, filter.gender, filter.faculty)
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
            setLoadingPerformance(false)
        }
    }

    const getDataKmeans = async (univ:string, gender:string, faculty:string, programStudy:string, code:string) => {
        setLoadingKm(true)
        const data = await getKmeans(univ, gender, faculty, programStudy, code);
        if(data.status){
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
            setKmeans({
                labels: labels,
                datasets: dataSet
            })
            setLoadingKm(false)
        }
    }

    const handleFilter = async (univ:string, gender:string, faculty:string) => {
        setLoadingPerformance(true)
        const data = await getTotalPerformance(univ, gender, faculty);
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
            setLoadingPerformance(false)
        }
    }

    const handleFilterKm = async (univ:string, gender:string, faculty:string, programStudy:string, code:string) => {
        await getDataKmeans(univ, gender, faculty, programStudy, code);
    }

    return{
        bobot,
        cluster,
        totalPerformance,
        kmeans,
        university,
        gender,
        handleFilter,
        filter,
        setFilter,
        loadingPerformance,
        faculty,
        filterKm,
        setFilterKm,
        handleFilterKm,
        loadingKm,
        programStudy,
        setProgramStudy,
        name
    }
}
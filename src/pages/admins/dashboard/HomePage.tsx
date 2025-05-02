import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    ChartData,
    // ChartArea,
    PointElement,
    LineElement
} from 'chart.js';
import { Bar, Chart } from 'react-chartjs-2';
import { useDashboard } from '../../../hooks/fetch/dashboard/useDashboard';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../../../components/input';
import Skeleton from '../../../components/ui/Skeleton';
import useAccess from '../../../utils/useAccess';
import Select from 'react-select'
import { getRecommendation } from '../../../hooks/models/kmean/kmeanModel';
import ModalForm from '../../../components/ui/modal/ModalForm';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ArcElement, Tooltip, Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
        position: 'top' as const,
        },
    },
};

const colors = [
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

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


export const dataLine = {
    labels,
    datasets: [
        {
        label: 'Dataset 1',
        data: [1,2,4,4,2,6,9],
        },
        {
        label: 'Dataset 2',
        data: [9,4,7,2,3,5,4],
        },
    ],
};


const HomePage = () => {
    const {token} = useAccess()
    const chartRef = useRef<ChartJS>(null);
    const [dataRekom, setDataRekom]= useState<{label: string;
        variabel: string;
        type: 'Rendah' | 'Sedang' | 'Tinggi'; // Jika hanya 3 pilihan, bisa di-restrict
        rekomendasi: string;}[]>([])
    const [chartData, setChartData] = useState<ChartData<'bar'>>({
        datasets: [],
    });
    const [recommendationName, setRecommendationName] = useState('')

    const {
        bobot,
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
        name,
        getMasterFaculty,
        getMasterProgramStudy,
        dataKmean,
        getMasterCode
    } = useDashboard();
    
    useEffect(() => {
        const chart = chartRef.current;

        if (!chart) return;
        console.log({kmeans});
        
        setChartData({...kmeans});
    }, [kmeans]);
    

    const dataBobot = {
        labels: bobot?.label,
        datasets: [
            {
                label: 'Sub Variabel',
                data: bobot?.label.map((key) => bobot.bobot[key]),
                backgroundColor: colors[getRandomInt(3)].backgroundColor,
            },
        ],
    };

    const dataPerformance = {
        labels: totalPerformance?.map((value) => value.label),
        datasets: [
            {
                label: 'Sub Variabel',
                data: totalPerformance?.map((value) => value.value ),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const showRecommendation = async (dataKmeans:any) => {
        // if(filter){
        if(filterKm.programStudy || filterKm.faculty || filterKm.gender || filterKm.code){
            const count = [0, 0, 0];
            const keys = Object.keys(dataKmeans[0]);

            for (const key of keys) {
                let min = Infinity;
                let minIndex = -1;

                for (let i = 0; i < dataKmeans.length; i++) {
                    if (dataKmeans[i][key] < min) {
                        min = dataKmeans[i][key];
                        minIndex = i;
                    }
                }

                count[minIndex]++;
            }

            const maxValue = Math.max(...count);
            const dominantIndex = count.indexOf(maxValue);
            const response:{status:boolean, data:{label: string;
                variabel: string;
                type: 'Rendah' | 'Sedang' | 'Tinggi';
                rekomendasi: string;}[]} = await getRecommendation(`C${dominantIndex+1}`) 
                if(response?.status){
                    setRecommendationName(`C${dominantIndex+1}`)
                    setDataRekom(response?.data)
                }
        }else{
            if(!filterKm.university || filterKm.university === 'UIN Sultan Syarif Kasim Riau'){
                const response:{status:boolean, data:{label: string;
                variabel: string;
                type: 'Rendah' | 'Sedang' | 'Tinggi';
                rekomendasi: string;}[]} = await getRecommendation('C3') 
                if(response?.status){
                    setRecommendationName('C3')
                    setDataRekom(response?.data)
                }
            }
            if(filterKm.university === 'UIN Sjech M. Djamil Djambek Bukittinggi' || filterKm.university === 'UIN Mahmud Yunus Batusangkar' || filterKm.university === 'UIN Syarif Hidayahtullah Jakarta'){
                const response:{status:boolean, data:{label: string;
                    variabel: string;
                    type: 'Rendah' | 'Sedang' | 'Tinggi';
                    rekomendasi: string;}[]} = await getRecommendation('C1') 
                    if(response?.status){
                        setRecommendationName('C1')
                        setDataRekom(response?.data)
                    }
            }
            if(filterKm.university === 'UIN Imam Bonjol Padang'){
                const response:{status:boolean, data:{label: string;
                    variabel: string;
                    type: 'Rendah' | 'Sedang' | 'Tinggi';
                    rekomendasi: string;}[]} = await getRecommendation('C2') 
                    if(response?.status){
                        setRecommendationName('C2')
                        setDataRekom(response?.data)
                    }
            }
        }
            
            // if(response?.status){
            //     setDataFilter([])
            //     setDataRekom(response?.data)
            // }
        // }
    }

    return (
        <>
        {
            token?.userType === "admin" ? (<div className='w-full space-y-16'>
                <div className='w-full flex flex-col justify-center m-auto'>
                    <label className='font-semibold text-center'>
                        NILAI BOBOT FUZZY AHP
                    </label>
                    <Bar options={options} data={dataBobot} />
                </div>
                <div className='w-full flex flex-col justify-center m-auto'>
                    <label className='font-semibold text-center'>
                        NILAI PERFORMANSI AKADEMISI
                    </label>
                    <div className='w-full flex gap-4'>
                        <div className='w-full'>
                            <label
                                htmlFor="countries"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Universitas
                            </label>
                            <select
                                value={filter.university}
                                onChange={(e)=>setFilter({...filter, 'university': e.target.value})}
                                id="university"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value=''>Semua</option>
                                {
                                    university?.map((value)=>(
                                        <option key={Math.random().toString(4)} value={value.value}>{value.label}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='w-full'>
                            <label
                                htmlFor="countries"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Jenis Kelamin
                            </label>
                            <select
                                value={filter.gender}
                                onChange={(e)=>setFilter({...filter, 'gender': e.target.value})}
                                id="gender"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value=''>Semua</option>
                                {
                                    gender?.map((value)=>(
                                        <option key={Math.random().toString(4)} value={value.value}>{value.label}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='w-full'>
                            <label
                                htmlFor="countries"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Fakultas
                            </label>
                            <select
                                value={filter.faculty}
                                onChange={(e)=>setFilter({...filter, 'faculty': e.target.value})}
                                id="faculty"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value=''>Semua</option>
                                {
                                    faculty?.map((value)=>(
                                        <option key={Math.random().toString(4)} value={value.value}>{value.label}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='flex items-end'>
                            <Button
                                variant='primary'
                                onClick={()=>handleFilter(filter.university, filter.gender, filter.faculty)}
                            >
                                Filter
                            </Button>
                        </div>
                    </div>
                    {
                        !loadingPerformance ? <Bar options={options} data={dataPerformance} /> :
                        <Skeleton cols={4} rows={16} />
                    }
                    
                </div>
                <div className='w-full flex flex-col justify-center m-auto'>
                    <label className='font-semibold text-center'>
                        NILAI CLUSTERING K-MEANS
                    </label>
                    <div className='w-full flex gap-4'>
                        <div className='w-full'>
                            <label
                                htmlFor="countries"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Universitas
                            </label>
                            <select
                                value={filterKm.university}
                                onChange={(e)=>setFilterKm({...filterKm, 'university': e.target.value})}
                                id="university"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value=''>Semua</option>
                                {
                                    university?.map((value)=>(
                                        <option key={Math.random().toString(4)} value={value.value}>{value.label}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='w-full'>
                            <label
                                htmlFor="countries"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Jenis Kelamin
                            </label>
                            <select
                                value={filterKm.gender}
                                onChange={(e)=>setFilterKm({...filterKm, 'gender': e.target.value})}
                                id="gender"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value=''>Semua</option>
                                {
                                    gender?.map((value)=>(
                                        <option key={Math.random().toString(4)} value={value.value}>{value.label}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='w-full'>
                            <label
                                htmlFor="countries"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Fakultas
                            </label>
                            <Select onFocus={getMasterFaculty} onChange={(e)=>setFilterKm({...filterKm, 'faculty': e?.value as string})} options={faculty} />
                            {/* <select
                                value={filterKm.faculty}
                                onChange={(e)=>setFilterKm({...filterKm, 'faculty': e.target.value})}
                                id="faculty"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value=''>Semua</option>
                                {
                                    faculty?.map((value)=>(
                                        <option key={Math.random().toString(4)} value={value.value}>{value.label}</option>
                                    ))
                                }
                            </select> */}
                        </div>
                        <div className='w-full'>
                            <label
                                htmlFor="countries"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Program Studi
                            </label>
                            {/* <select
                                value={filterKm.programStudy}
                                onChange={(e)=>setFilterKm({...filterKm, 'programStudy': e.target.value})}
                                id="programStudy"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            > */}
                                <Select onFocus={getMasterProgramStudy} onChange={(e)=>setFilterKm({...filterKm, 'programStudy': e?.value as string})} options={programStudy} />
                                
                                {/* {
                                    programStudy?.map((value)=>(
                                        <option key={Math.random().toString(4)} value={value.value}>{value.label}</option>
                                    ))
                                } */}
                            {/* </select> */}
                        </div>
                        <div className='w-full'>
                            <label
                                htmlFor="countries"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Kode
                            </label>
                            {/* <select
                                value={filterKm.programStudy}
                                onChange={(e)=>setFilterKm({...filterKm, 'programStudy': e.target.value})}
                                id="programStudy"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            > */}
                                <Select onFocus={getMasterCode} onChange={(e)=>setFilterKm({...filterKm, 'code': e?.value as string})} options={name} />
                                
                                {/* {
                                    programStudy?.map((value)=>(
                                        <option key={Math.random().toString(4)} value={value.value}>{value.label}</option>
                                    ))
                                } */}
                            {/* </select> */}
                        </div>
                        <div className='flex items-end'>
                            <Button
                                variant='primary'
                                onClick={()=>handleFilterKm(filterKm.university, filterKm.gender, filterKm.faculty, filterKm.programStudy, filterKm.code)}
                            >
                                Filter
                            </Button>
                        </div>
                    </div>
                    
                    {
                        !loadingKm ? <Chart ref={chartRef} type='line' data={chartData} /> :
                        <Skeleton cols={4} rows={16} />
                    }
                    
                </div>
                <div className='w-full flex justify-center'>
                    <Button onClick={()=>showRecommendation(dataKmean)}>Lihat Rekomendasi</Button>
                </div>
                <ModalForm pathName={false} onClose={()=>setDataRekom([])} title={`Rekomendasi ${recommendationName}`} visible={Boolean(dataRekom?.length)}>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th className="px-6 py-3">Variabel</th>
                                <th className="px-6 py-3">Label</th>
                                <th className="px-6 py-3">Rekomendasi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dataRekom.length>0 && dataRekom?.map(v=>(
                                    <tr>
                                        <td className="px-6 py-3">
                                            {v.label}
                                        </td>
                                        <td className="px-6 py-3">
                                            {v.variabel}
                                        </td>
                                        <td className="px-6 py-3">
                                            {v.rekomendasi}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </ModalForm>
            </div>): (
                <div className='h-full w-full flex items-center justify-center text-center'>
                    <label className='text-lg font-bold'>Selamat Datang</label>
                    </div>
                )
            }
        </>        
    );
}

export default HomePage
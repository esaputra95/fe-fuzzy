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
    const [chartData, setChartData] = useState<ChartData<'bar'>>({
        datasets: [],
    });

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
        loadingKm
    } = useDashboard();
    
    useEffect(() => {
        const chart = chartRef.current;

        if (!chart) return;
        
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
                            <select
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
                            </select>
                        </div>
                        <div className='flex items-end'>
                            <Button
                                variant='primary'
                                onClick={()=>handleFilterKm(filterKm.university, filterKm.gender, filterKm.faculty)}
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
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

// function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
//     const colorStart = 'red'
//     const colorMid = 'blue'
//     const colorEnd = 'green'

//     const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

//     gradient.addColorStop(0, colorStart);
//     gradient.addColorStop(0.5, colorMid);
//     gradient.addColorStop(1, colorEnd);

//     return gradient;
// }

const HomePage = () => {
    const chartRef = useRef<ChartJS>(null);
    const [chartData, setChartData] = useState<ChartData<'bar'>>({
        datasets: [],
    });

    const {
        bobot,
        totalPerformance,
        kmeans
    } = useDashboard();

    console.log({kmeans});
    

    useEffect(() => {
        const chart = chartRef.current;

        if (!chart) return;
        
        setChartData({...kmeans});
    }, [kmeans]);
    

    const dataBobot = {
        labels: bobot?.label,
        datasets: [
          {
            label: 'Indikator',
            data: bobot?.label.map((key) => bobot.bobot[key]),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
    };

    const dataPerformance = {
        labels: totalPerformance?.map((value) => value.label),
        datasets: [
          {
            label: 'Indikator',
            data: totalPerformance?.map((value) => value.value ),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
    };

    return (
        <div className='w-full space-y-16'>
            <div className='w-full flex flex-col justify-center m-auto'>
                <label className='font-semibold text-center'>
                    HASIL NILAI BOBOT FUZZY AHP
                </label>
                <Bar options={options} data={dataBobot} />
            </div>
            <div className='w-full flex flex-col justify-center m-auto'>
                <label className='font-semibold text-center'>
                    HASIL NILAI JUMLAH PERFORMANCE
                </label>
                <Bar options={options} data={dataPerformance} />
            </div>
            <div className='w-full flex flex-col justify-center m-auto'>
                <label className='font-semibold text-center'>
                    HASIL NILAI CLUSTERING K-MENAS
                </label>
                <Chart ref={chartRef} type='line' data={chartData} />
            </div>
        </div>
        
    );
}

export default HomePage
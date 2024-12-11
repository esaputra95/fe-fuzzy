import React from 'react'

interface ClusteringMetrics {
    numberOfClusters: number; // Jumlah cluster
    inertia: number; // Inertia (Elbow)
    silhouetteScore: number; // Silhouette Score
    daviesBouldinIndex: number; // Davies-Bouldin Index
    calinskiHarabaszScore: number; // Calinski-Harabasz Score
}
const clusteringData: ClusteringMetrics[] = [
    {
        numberOfClusters: 2,
        inertia: 24294.42323,
        silhouetteScore: 0.202238149,
        daviesBouldinIndex: 1.837976417,
        calinskiHarabaszScore: 137.4544766
    },
    {
        numberOfClusters: 3,
        inertia: 22102.82246,
        silhouetteScore: 0.177028148,
        daviesBouldinIndex: 2.181595134,
        calinskiHarabaszScore: 100.0301488
    },
    {
        numberOfClusters: 4,
        inertia: 20989.56535,
        silhouetteScore: 0.144732341,
        daviesBouldinIndex: 2.20035394,
        calinskiHarabaszScore: 78.85149128
    },
    {
        numberOfClusters: 5,
        inertia: 20086.54297,
        silhouetteScore: 0.132046354,
        daviesBouldinIndex: 2.277799561,
        calinskiHarabaszScore: 67.23607488
    },
    {
        numberOfClusters: 6,
        inertia: 19444.24351,
        silhouetteScore: 0.132350172,
        daviesBouldinIndex: 2.552111746,
        calinskiHarabaszScore: 58.71705631
    },
    {
        numberOfClusters: 7,
        inertia: 18944.5815,
        silhouetteScore: 0.119835067,
        daviesBouldinIndex: 2.529699107,
        calinskiHarabaszScore: 52.28690608
    },
    {
        numberOfClusters: 8,
        inertia: 18572.03266,
        silhouetteScore: 0.120045664,
        daviesBouldinIndex: 2.529349624,
        calinskiHarabaszScore: 47.03354647
    },
    {
        numberOfClusters: 9,
        inertia: 18246.88683,
        silhouetteScore: 0.131119495,
        daviesBouldinIndex: 2.480467626,
        calinskiHarabaszScore: 42.89621175
    },
    {
        numberOfClusters: 10,
        inertia: 17950.17177,
        silhouetteScore: 0.111152249,
        daviesBouldinIndex: 2.532933938,
        calinskiHarabaszScore: 39.58127296
    }
];

const TestingPage = () => {
    return (
        <div className='flex flex-col justify-center'>
            <label className='text-center font-semibold'>Tabel Hasil Pengujian</label>
            <table className='w-full text-sm text-left text-gray-900 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                        <th className='px-6 py-3 text-center'>Number of Clusters</th>
                        <th className='px-6 py-3 text-center'>Inertia (Elbow)</th>
                        <th className='px-6 py-3 text-center'>Silhouette Score</th>
                        <th className='px-6 py-3 text-center'>Davies-Bouldin Index</th>
                        <th className='px-6 py-3 text-center'>Calinski-Harabasz Score</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        clusteringData.map((v)=>(
                            <tr>
                                <td className='px-6 py-3 text-center'>{v.numberOfClusters}</td>
                                <td className='px-6 py-3 text-center'>{v.inertia}</td>
                                <td className='px-6 py-3 text-center'>{v.silhouetteScore}</td>
                                <td className='px-6 py-3 text-center'>{v.daviesBouldinIndex}</td>
                                <td className='px-6 py-3 text-center'>{v.calinskiHarabaszScore}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className='w-full flex flex-col text-center justify-center mt-14 mb-12'>
                <label className='text-center font-semibold'>Grafik Hasil Pengujian</label>
                <div className='grid grid-cols-2 gap-2'>
                    <img src='./data/inertia.jpeg' />
                    <img src='./data/silhouetteScore.jpeg' />
                    <img src='./data/daviesBouldinIndex.jpeg' />
                    <img src='./data/calinskiHarabaszScore.jpeg' />
                </div>
            </div>
        </div>
    )
}

export default TestingPage;

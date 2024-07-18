import { useKMeans } from '../../../../hooks/fetch/kmeans/useKmeans'
import { Button } from '../../../../components/input'
import Spinner from '../../../../components/ui/Spinner'
import Table from './Table'
import { ChangeEvent } from 'react'

const KMeansPage = () => {
    const { 
        handleOnProcessKMeans,
        loading,
        data,
        handleDownload,
        form,
        setForm,
        dataCentroid,
        university,
        selectUniversity,
        setSelectUniversity,
        randomCentroid,
        dataCtr
    } = useKMeans()

    return (
        <div className='w-full'>
            <div className='w-full'>
                <div className='w-full mb-4'>
                    <label className='font-semibold'>Tentukan Nilai Centroid</label>
                </div>
                <div className='w-full grid grid-cols-3 gap-4'>
                    <div className="mb-5">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Centroid 1
                        </label>
                        <input
                            type="text"
                            id="centroid1"
                            value={form.centroid1}
                            onChange={(e:ChangeEvent<HTMLInputElement>)=> setForm({...form, 'centroid1': e.target.value})}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Centroid 2
                        </label>
                        <input
                            type="text"
                            id="centroid2"
                            value={form.centroid2}
                            onChange={(e:ChangeEvent<HTMLInputElement>)=> setForm({...form, 'centroid2': e.target.value})}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Centroid 3
                        </label>
                        <input
                            type="text"
                            id="centroid3"
                            value={form.centroid3}
                            onChange={(e:ChangeEvent<HTMLInputElement>)=> setForm({...form, 'centroid3': e.target.value})}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                </div>
                <Button className='' onClick={()=> randomCentroid()}>Acak Nilai Centroid</Button>
                <div className='w-full my-4'>
                    <label
                        htmlFor="countries"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Universitas
                    </label>
                    <select
                        value={selectUniversity}
                        onChange={(e) =>{
                            setSelectUniversity(e.target.value)
                            setForm(state=> ({...state, university: e.target.value}))
                        }}
                        id="university"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value=''>Semua</option>
                        {university?.map((value) => (
                            <option key={Math.random().toString(4)} value={value.value}>{value.label}</option>
                        ))}
                    </select>
                </div>
                <div className='w-full grid grid-cols-2 gap-4'>
                    <Button 
                        onClick={handleOnProcessKMeans} 
                        disabled={loading ?? false}
                        className='w-full flex'
                        variant="primary" type='submit' size="medium"
                    >
                        Proses Data K-Means
                        { loading ? <div className='w-24'><Spinner  /></div> : null }
                    </Button>
                    <Button
                        onClick={handleDownload}
                        className='w-full'
                    >
                        Download Data K-Means
                    </Button>
                </div>
                <div className='w-full mt-4 overflow-x-auto max-h-100'>
                    <label className='font-semibold text-lg'>Nilai Centroid</label>
                    <table className="w-full overflow-auto text-sm text-left rtl:text-right text-gray-900 dark:text-gray-400">
                        <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th className='px-2 py-2'>Centroid</th>
                                {
                                    dataCentroid?.header?.map((value:string)=>
                                    (
                                        <th key={Math.random().toString(3)} className='px-2 py-2'>
                                            {
                                                value
                                            }
                                        </th>
                                    )
                                    )
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dataCentroid?.dataBody?.map((value:number[], index:number)=>(
                                    <tr key={Math.random().toString(3)}>
                                        <td className='px-2 py-2'>{(index+1)}</td>
                                        {
                                            
                                            value?.map((val:number)=> (
                                                <td key={Math.random().toString(3)} className='px-2 py-2'>
                                                    {val}
                                                </td>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <Table
                    data={data}
                    centroid={dataCtr}
                />
            </div>
        </div>
    )
}

export default KMeansPage
import { Button } from '../../../../components/input'
import Spinner from '../../../../components/ui/Spinner'
import { usePerformance } from '../../../../hooks/fetch/fuzzys/usePerformance'
import Table from './Table'

const PerformancePage = () => {
    const { 
        data,
        isLoading,
        onSearch,
        university,
        selectUniversity,
        setSelectUniversity
    } = usePerformance()

    return (
        <div className='w-full'>
            <div className='w-full my-4'>
                <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Universitas
                </label>
                <select
                    value={selectUniversity}
                    onChange={(e) => setSelectUniversity(e.target.value)}
                    id="university"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value=''>Semua</option>
                    {university?.map((value) => (
                        <option key={Math.random().toString(4)} value={value.value}>{value.label}</option>
                    ))}
                </select>
            </div>
            <div className='w-full'>
                <Button
                    variant="primary"
                    type='submit'
                    size="medium"
                    className='w-full'
                    onClick={()=>onSearch(selectUniversity)}
                    disabled={isLoading ?? false}
                >
                    Lihat Data Performance
                    {isLoading ? <Spinner /> : null}
                </Button>
            </div>
            <Table
                data={data}
                isLoading={isLoading}
            />
        </div>
    )
}

export default PerformancePage
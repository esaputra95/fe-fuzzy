import { Button } from '../../../../components/input'
import Spinner from '../../../../components/ui/Spinner'
import { usePerformance } from '../../../../hooks/fetch/fuzzys/usePerformance'
import Table from './Table'

const PerformancePage = () => {
    const { 
        data,
        isLoading,
        onSearch
    } = usePerformance()

    return (
        <div className='w-full'>
            <div className='w-full'>
                <div className='w-full'>
                <Button  
                    variant="primary" 
                    type='submit' 
                    size="medium" 
                    className='w-full' 
                    onClick={onSearch}
                    disabled={isLoading??false}
                >
                    Lihat Data Performance
                    {
                        isLoading? <Spinner /> : null
                    }
                </Button>
                </div>
                <Table 
                    data={data}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}

export default PerformancePage
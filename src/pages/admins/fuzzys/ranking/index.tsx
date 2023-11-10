import { Button } from '../../../../components/input'
import { useRanking } from '../../../../hooks/fetch/fuzzys/useRanking'
import Table from './Table'

const RankingPage = () => {
    const { 
        data,
        isLoading,
        onSearch
    } = useRanking()

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
                >
                    Lihat dan Simpan Data Perankingan 
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

export default RankingPage
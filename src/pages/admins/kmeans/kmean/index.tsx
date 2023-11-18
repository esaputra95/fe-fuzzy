import { useKMeans } from '../../../../hooks/fetch/kmeans/useKmeans'
import { Button } from '../../../../components/input'
import Spinner from '../../../../components/ui/Spinner'
import Table from './Table'

const KMeansPage = () => {
    const { 
        handleOnProcessKMeans,
        loading,
        data,
        handleDownload
    } = useKMeans()

    return (
        <div className='w-full'>
            
            <div className='w-full'>
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
                <Table
                    data={data}
                />
             </div>
        </div>
    )
}

export default KMeansPage
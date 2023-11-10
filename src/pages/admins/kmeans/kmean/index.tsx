import { useKMeans } from '../../../../hooks/fetch/kmeans/useKmeans'
import { Button } from '../../../../components/input'
import Spinner from '../../../../components/ui/Spinner'

const KMeansPage = () => {
    const { 
        handleOnProcessKMeans,
        loading
    } = useKMeans()

    return (
        <div className='w-full'>
            
            <div className='w-full'>
                <div className='w-full'>
                    <Button 
                        onClick={handleOnProcessKMeans} 
                        disabled={loading ?? false}
                        className='w-full flex'
                        variant="primary" type='submit' size="medium"
                    >
                        Proses & Download K-Means
                        { loading ? <div className='w-24'><Spinner  /></div> : null }
                    </Button>
                </div>
             </div>
        </div>
    )
}

export default KMeansPage
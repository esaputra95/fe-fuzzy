import { useCalculations } from '../../../../hooks/fetch/kmeans/useCalculation'
import { Button } from '../../../../components/input'
import Spinner from '../../../../components/ui/Spinner'

const CalculationsPage = () => {
    const { 
        handleOnProcessCalculations,
        loading,
        message,
    } = useCalculations()

    return (
        <div className='w-full'>
            
            <div className='w-full'>
                <div className='w-full flex justify-center'>
                    <Button 
                        onClick={handleOnProcessCalculations} 
                        disabled={loading ?? false}
                        className='w-full flex'
                        variant="primary" type='submit' size="medium"
                    >
                        Proses Data K-Means
                        { loading ? <div className='w-24'><Spinner  /></div> : null }
                    </Button>
                </div>
                <div className='w-full flex justify-center mt-16 mb-8'>
                {
                    message ? (
                        <div className='w-full bg-white rounded-md'>
                            <span className='m-4 rounded-md bg-green-100 p-4'>
                                {message}
                            </span>
                        </div>
                    ) : null
                }
                </div>
             </div>
        </div>
    )
}

export default CalculationsPage
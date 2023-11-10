import { FC } from 'react'
import { Button } from '../../../../components/input';
import { RankingFormProps } from '../../../../interfaces/rankingInterface';
import Spinner from '../../../../components/ui/Spinner';

const FormRanking: FC<RankingFormProps> = (props) => {
    const { 
        handleSubmit,
        onSubmit,
        isLoading,
        idDetail,
    } = props;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex space-x-2'>
                <div className='w-full flex justify-end '>
                    {!idDetail ? 
                        <Button 
                            disabled={isLoading?true:false} 
                            variant="primary" 
                            type='submit' 
                            size="medium" 
                            className='w-full' 
                        >
                            Lihat dan Simpan Data Perankingan 
                            {isLoading?<Spinner />:null}
                        </Button>
                    : null}
                </div>
            </div>
            
        </form>
    )
}

export default FormRanking
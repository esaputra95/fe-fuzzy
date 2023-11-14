import { useNavigate } from 'react-router-dom'
import { Button } from '../../../../components/input'
import { useQuestionnaire } from '../../../../hooks/fetch/fuzzys/useQuestionnaire'
import Table from './Table'

const QuestionnairePage = () => {
    const navigate = useNavigate()
    const {
        data
    } = useQuestionnaire()
    return(
        <div>
            <Button type='button' onClick={()=>navigate('form')}>
                Tambah Kuesioner
            </Button>
            <Table 
                data={data}
            />
        </div>
    )
}

export default QuestionnairePage
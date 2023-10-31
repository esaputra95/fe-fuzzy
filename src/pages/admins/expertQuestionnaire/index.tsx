import Table from './Table'
import TablePaging from './TablePaging'
import { useExpertQuestionnaire } from '../../../hooks/fetch/expertQuestionnaire/useExpertQuestionnaire'
import ModalForm from '../../../components/ui/modal/ModalForm'
import FormExpertQuestionnaire from './form'
import { Button } from '../../../components/input'
import locatioanName from '../../../utils/location'
import ModalConfirm from '../../../components/ui/modal/ModalConfirm'

const ExpertQuestionnairePage = () => {
    const { 
        dataExpertQuestionnaire, 
        isFetching,
        errors,
        isLoadingMutate,
        register,
        onSubmit,
        handleSubmit,
        modalForm,
        setModalForm,
        onDelete,
        modalConfirm,
        onUpdate,
        onCancel,
        onDetail,
        idDetail,
        page,
        dataForm
    } = useExpertQuestionnaire()

    return (
        <div className='w-full'>
            <ModalConfirm data={modalConfirm.modalConfirm}  />
            <ModalForm 
                visible={modalForm.visible}
                onClose={onCancel}
                title={modalForm.label}
                size="full"
            >
                <FormExpertQuestionnaire
                    onCancel={onCancel}
                    isLoading={isLoadingMutate}
                    errors={errors}
                    idDetail={idDetail}
                    handleSubmit={handleSubmit}
                    register={register}
                    onSubmit={onSubmit}
                    dataForm={dataForm}
                />
            </ModalForm>
            <div className='w-full'>
                <div className='py-4'>
                    <Button 
                        onClick={()=>setModalForm((state)=> ({...state, visible:true}))} 
                    >
                        + {locatioanName().pathName}
                    </Button>
                </div>
                <Table
                    data={dataExpertQuestionnaire?.factors ?? []}
                    isFetching={isFetching}
                    page={page.page}
                    limit={page.limit}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    onDetail={onDetail}
                />
                <TablePaging
                    page={page.page}
                    total={page.total}
                    handlePage={page.handlePage}
                />
            </div>
        </div>
    )
}

export default ExpertQuestionnairePage
import Table from './Table'
import TablePaging from './TablePaging'
import { useKnowledgeManagement } from '../../../hooks/fetch/knowledgeManagement/useKnowledgeManagement'
import ModalForm from '../../../components/ui/modal/ModalForm'
import FormKnowledgeManagement from './form'
import { Button } from '../../../components/input'
import locatioanName from '../../../utils/location'
import ModalConfirm from '../../../components/ui/modal/ModalConfirm'

const KnowledgeManagementPage = () => {
    const { 
        dataKnowledgeManagement, 
        isFetching,
        errors,
        isLoadingMutate,
        setValue,
        register,
        appendListFormIndicator,
        listFormIndicator,
        onSubmit,
        handleSubmit,
        modalForm,
        setModalForm,
        onDelete,
        modalConfirm,
        onCancel,
        onDetail,
        idDetail,
        page,
        handleChangeSelect,
        selectOption,
        optionSubVariable,
        onSearchSubVariable,
        optionFactor,
        onSearchFactor,
        selectIndicator,
        handleChangeSelectArray,

        optionIndicator,
        onSearchIndicator
    } = useKnowledgeManagement()

    return (
        <div className='w-full'>
            <ModalConfirm data={modalConfirm.modalConfirm}  />
            <ModalForm 
                visible={modalForm.visible}
                onClose={onCancel}
                title={modalForm.label}
                size="large"
                className='max-h-screen overflow-auto'
            >
                <FormKnowledgeManagement
                    onCancel={onCancel}
                    isLoading={isLoadingMutate}
                    errors={errors}
                    idDetail={idDetail}
                    setValue={setValue}
                    handleSubmit={handleSubmit}
                    register={register}
                    listFormIndicator={listFormIndicator}
                    appendListFormIndicator={appendListFormIndicator}
                    onSubmit={onSubmit}
                    handleChangeSelect={handleChangeSelect}
                    selectOption={selectOption}
                    optionSubVariable={optionSubVariable}
                    onSearchSubVariable={onSearchSubVariable}
                    optionFactor={optionFactor}
                    onSearchFactor={onSearchFactor}
                    selectIndicator={selectIndicator}
                    handleChangeSelectArray={handleChangeSelectArray}
                    optionIndicator={optionIndicator}
                    onSearchIndicator={onSearchIndicator}
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
                    data={dataKnowledgeManagement?.knowledgeManagements ?? []}
                    isFetching={isFetching}
                    page={page.page}
                    limit={page.limit}
                    onDelete={onDelete}
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

export default KnowledgeManagementPage
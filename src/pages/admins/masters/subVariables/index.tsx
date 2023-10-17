import Table from './Table'
import TablePaging from './TablePaging'
import { useSubVariable } from '../../../../hooks/fetch/master/useSubVariable'
import ModalForm from '../../../../components/ui/modal/ModalForm'
import FormSubVariable from './form'
import { Button } from '../../../../components/input'
import locatioanName from '../../../../utils/location'
import ModalConfirm from '../../../../components/ui/modal/ModalConfirm'

const SubVariablePage = () => {
    const { 
        dataSubVariable, 
        isFetching,
        errors,
        isLoadingMutate,
        setValue,
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
        handleChangeSelect,
        selectSubVariable,
        getValues,
        optionVariable,
        onSearchVariable
    } = useSubVariable()

    return (
        <div className='w-full'>
            <ModalConfirm data={modalConfirm.modalConfirm}  />
            <ModalForm 
                visible={modalForm.visible}
                onClose={onCancel}
                title={modalForm.label}
                size="medium"
            >
                <FormSubVariable
                    onCancel={onCancel}
                    isLoading={isLoadingMutate}
                    errors={errors}
                    idDetail={idDetail}
                    setValue={setValue}
                    onSearchVariable={onSearchVariable}
                    optionVariable={optionVariable}
                    handleSubmit={handleSubmit}
                    getValues={getValues}
                    register={register}
                    onSubmit={onSubmit}
                    handleChangeSelect={handleChangeSelect}
                    selectSubVariable={selectSubVariable}
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
                    data={dataSubVariable?.subVariables ?? []}
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

export default SubVariablePage
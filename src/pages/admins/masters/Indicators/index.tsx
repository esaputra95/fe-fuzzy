import Table from './Table'
import TablePaging from './TablePaging'
import { useIndicator } from '../../../../hooks/fetch/master/useIndicator'
import ModalForm from '../../../../components/ui/modal/ModalForm'
import FormIndicator from './form'
import { Button } from '../../../../components/input'
import locatioanName from '../../../../utils/location'
import ModalConfirm from '../../../../components/ui/modal/ModalConfirm'

const IndicatorPage = () => {
    const { 
        dataIndicator, 
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
        optionSubVariable,
        onSearchSubVariable,
        selectSubVariable,
        handleChangeSelect
    } = useIndicator()

    return (
        <div className='w-full'>
            <ModalConfirm data={modalConfirm.modalConfirm}  />
            <ModalForm 
                visible={modalForm.visible}
                onClose={onCancel}
                title={modalForm.label}
                size="medium"
            >
                <FormIndicator
                    onCancel={onCancel}
                    isLoading={isLoadingMutate}
                    errors={errors}
                    idDetail={idDetail}
                    optionSubVariable={optionSubVariable}
                    selectSubVariable={selectSubVariable}
                    handleChangeSelect={handleChangeSelect}
                    onSearchSubVariable={onSearchSubVariable}
                    handleSubmit={handleSubmit}
                    register={register}
                    onSubmit={onSubmit}
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
                    data={dataIndicator?.indicators ?? []}
                    isFetching={isFetching}
                    page={page.page}
                    limit={page.limit}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    onDetail={onDetail}
                />
                <TablePaging
                    props={page}
                />
            </div>
        </div>
    )
}

export default IndicatorPage
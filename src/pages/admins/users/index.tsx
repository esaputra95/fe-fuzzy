import Table from './Table'
import TablePaging from './TablePaging'
import { useUser } from './../../../hooks/fetch/useUser'
import ModalForm from '../../../components/ui/modal/ModalForm'
import FormUser from './form'
import { Button } from '../../../components/input'
import locatioanName from '../../../utils/location'
import ModalConfirm from '../../../components/ui/modal/ModalConfirm'

const UserPage = () => {
    const { 
        dataUser, 
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
        page
    } = useUser()

    return (
        <div className='w-full'>
            <ModalConfirm data={modalConfirm.modalConfirm}  />
            <ModalForm 
                visible={modalForm.visible}
                onClose={onCancel}
                title={modalForm.label}
                size="medium"
            >
                <FormUser
                    onCancel={onCancel}
                    isLoading={isLoadingMutate}
                    errors={errors}
                    idDetail={idDetail}
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
                    data={dataUser?.users ?? []}
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

export default UserPage
import Table from './Table'
import { useFuzzy } from '../../../../hooks/fetch/fuzzys/useFuzzy'
import FormFuzzy from './form'
import ModalConfirm from '../../../../components/ui/modal/ModalConfirm'

const FuzzyPage = () => {
    const { 
        dataFuzzy, 
        isFetching,
        errors,
        register,
        onSubmit,
        handleSubmit,
        onDelete,
        modalConfirm,
        onUpdate,
        onCancel,
        onDetail,
        idDetail,
        onSearchSubVariable,
        optionSubVariable,
        selectSubVariable,
        handleChangeSelect,
        optionFactor,
        onSearchFactor,
        selectFactor
    } = useFuzzy()

    return (
        <div className='w-full'>
            <ModalConfirm data={modalConfirm.modalConfirm}  />
            <FormFuzzy
                onCancel={onCancel}
                errors={errors}
                idDetail={idDetail}
                handleSubmit={handleSubmit}
                register={register}
                onSubmit={onSubmit}
                optionSubVariable={optionSubVariable}
                onSearchSubVariable={onSearchSubVariable}
                selectSubVariable={selectSubVariable}
                handleChangeSelect={handleChangeSelect}
                optionFactor={optionFactor}
                onSearchFactor={onSearchFactor}
                selectFactor={selectFactor}
            />
            <div className='w-full'>
                <Table
                    data={dataFuzzy?.fuzzy ?? []}
                    isFetching={isFetching}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    onDetail={onDetail}
                    multiplicationMatrix={dataFuzzy?.multiplicationMatrix}
                    squaredRootOf={dataFuzzy?.squaredRootOf}
                    eigenVector={dataFuzzy?.eigenVector}
                    subVariable={dataFuzzy?.subVariable}
                    factor={dataFuzzy?.factor}
                    lamda={dataFuzzy?.lamda}
                    stageFuzzy={dataFuzzy?.stageFuzzy ?? []}
                    multiplicationMatrixStageFuzzy={dataFuzzy?.multiplicationMatrixStageFuzzy}
                    squaredRootOfStageFuzzy={dataFuzzy?.squaredRootOfStageFuzzy}
                    sintesisFuzzy={dataFuzzy?.sintesisFuzzy}
                    resultSI={dataFuzzy?.resultSI}
                    valueVactor={dataFuzzy?.valueVactor}
                    valueMin={dataFuzzy?.valueMin}
                    normalization={dataFuzzy?.normalization}
                />
            </div>
        </div>
    )
}

export default FuzzyPage
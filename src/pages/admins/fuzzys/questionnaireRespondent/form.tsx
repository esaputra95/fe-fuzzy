import { Fragment } from "react";
import { Button, InputText, InputTextArray, SelectOption } from "../../../../components/input";
import { useQuestionnaireForm } from "../../../../hooks/fetch/fuzzys/useQuestionnaireForm"
import InputRadio from "../../../../components/input/InputRadio";


const FormQuestionnaire = () => {
    const {
        register,
        errors,
        indicator,
        handleSubmit,
        onSubmit
    } = useQuestionnaireForm();
    let indexData:number=0
    return (
        <div className="w-full p-4 md:p-16 xl:p-16 lg:p-16">
            <div className="w-full">
                <label className="font-bold text-lg">IDENTITTAS RESPONDENT</label>
            </div>
            <div className="w-full">
                <label className="font-normal text-base">
                    Kuisioner ini ditujukan kepada Bapak/Ibu para akademisi (dosen) di Perguruan Tinggi. Silahkan Bapak/Ibu isi biodata berikut ini:
                </label>
            </div>
            <div className="w-full border-t bg-gray-600 my-4" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 gap-4">
                    <div className="w-12/12 py-2">
                        <InputText
                            name="name"
                            register={register}
                            label="Nama"
                            className="shadow-none"
                            errors={errors}
                        />
                    </div>
                    <div className="w-12/12 py-2">
                        <SelectOption
                            name="gender"
                            data={[
                                {value: undefined, label: ''},
                                {value: '1', label: 'Laki-Laki'},
                                {value: '0', label: 'Perempuan'}
                            ]}
                            register={register}
                            errors={errors}
                            label="Jenis Kelamin"
                        />
                    </div>
                    <div className="w-12/12 py-2">
                        <InputText
                            name="lastStudy"
                            register={register}
                            label="Pedidikan Terakhir"
                            className="shadow-none"
                            errors={errors}
                        />
                    </div>
                    <div className="w-12/12 py-2">
                        <InputText
                            name="group"
                            register={register}
                            label="Golongan /Ruang"
                            className="shadow-none"
                            errors={errors}
                        />
                    </div>
                    <div className="w-12/12 py-2">
                        <SelectOption
                            name="status"
                            data={[
                                {value: undefined, label: ''},
                                {value: 'PNS', label: 'PNS'},
                                {value: 'PPPK', label: 'PPPK'},
                                {value: 'non-PNS', label: 'non-PNS'},
                            ]}
                            register={register}
                            errors={errors}
                            label="Status Dosen"
                        />
                    </div>
                    <div className="w-12/12 py-2">
                        <InputText
                            name="studyProgram"
                            register={register}
                            label="Prodi"
                            className="shadow-none"
                            errors={errors}
                        />
                    </div>
                    <div className="w-12/12 py-2">
                        <InputText
                            name="faculty"
                            register={register}
                            label="Fakultas"
                            className="shadow-none"
                            errors={errors}
                        />
                    </div>
                    <div className="w-12/12 py-2">
                        <InputText
                            name="skill"
                            register={register}
                            label="Keahlian"
                            className="shadow-none"
                            errors={errors}
                        />
                    </div>
                    <div className="w-12/12 py-2">
                        <InputText
                            name="university"
                            register={register}
                            label="Perguruan Tinggi"
                            className="shadow-none"
                            errors={errors}
                        />
                    </div>
                </div>
                <div className="w-full border-t bg-gray-600 my-4" />
                {
                    indicator?.length && indicator?.length > 0 ? indicator?.map((valueSub)=>(
                        <div className="w-full" key={Math.random().toFixed(4)}>
                            <div className="w-full bg-green-50 my-4 p-2">
                                <label className="font-semibold">
                                    {valueSub.name}
                                </label>
                            </div>
                            <table className="w-full" border={1}>
                                <thead>
                                    <tr>
                                        <td className="border-2 border-gray-400" rowSpan={2}>
                                            Pernyataan
                                        </td>
                                        <td colSpan={5} className="text-center border-2 border-gray-400">
                                            Skala
                                        </td>
                                    </tr>
                                    <tr className="text-center">
                                        <td className="border-2 border-gray-400">1</td>
                                        <td className="border-2 border-gray-400">2</td>
                                        <td className="border-2 border-gray-400">3</td>
                                        <td className="border-2 border-gray-400">4</td>
                                        <td className="border-2 border-gray-400">5</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        valueSub.factor.length > 0 ? valueSub.factor.map((valueFactor)=> (
                                            <Fragment key={Math.random.toString()}>
                                                <tr>
                                                    <td colSpan={6} className="border-2 border-gray-400 bg-cyan-50">
                                                        {valueFactor.name}
                                                    </td>
                                                </tr>
                                                {
                                                    valueFactor.knowledge.map((valueKnowledge, index)=> {
                                                        indexData++
                                                        return(
                                                            <tr className="w-full">
                                                                <td className="w-9/12 border-2 border-gray-400">
                                                                    {valueKnowledge.indicators?.name}
                                                                    <InputTextArray
                                                                        type="hidden"
                                                                        name="questionary"
                                                                        nameObj="label"
                                                                        index={indexData}
                                                                        register={register}
                                                                        errors={errors}
                                                                        value={valueFactor.code+'_'+valueSub.code+''+(index+1)}
                                                                    />
                                                                </td>
                                                                <td className="border-2 border-gray-400">
                                                                    <InputRadio 
                                                                        name='questionary'
                                                                        register={register}
                                                                        errors={errors}
                                                                        nameObj='value'
                                                                        index={indexData}
                                                                        valueRadio="1"
                                                                    />
                                                                </td>
                                                                <td className="border-2 border-gray-400">
                                                                    <InputRadio 
                                                                        name='questionary'
                                                                        register={register}
                                                                        errors={errors}
                                                                        nameObj='value'
                                                                        index={indexData}
                                                                        valueRadio="2"
                                                                    />
                                                                </td>
                                                                <td className="border-2 border-gray-400">
                                                                    <InputRadio 
                                                                        name='questionary'
                                                                        register={register}
                                                                        errors={errors}
                                                                        nameObj='value'
                                                                        index={indexData}
                                                                        valueRadio="3"
                                                                    />
                                                                </td>
                                                                <td className="border-2 border-gray-400">
                                                                    <InputRadio 
                                                                        name='questionary'
                                                                        register={register}
                                                                        errors={errors}
                                                                        nameObj='value'
                                                                        index={indexData}
                                                                        valueRadio="4"
                                                                    />
                                                                </td>
                                                                <td className="border-2 border-gray-400">
                                                                    <InputRadio 
                                                                        name='questionary'
                                                                        register={register}
                                                                        errors={errors}
                                                                        nameObj='value'
                                                                        index={indexData}
                                                                        valueRadio="5"
                                                                    />
                                                                </td>
                                                            </tr>
                                                            )
                                                })
                                                }
                                            </Fragment>
                                        )) : null
                                    }        
                                </tbody>
                            </table>
                        </div>
                    )) : null
                }
                <div className="w-full flex justify-end py-8">
                    <Button type="submit">
                        Simpan Kuesioner
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default FormQuestionnaire
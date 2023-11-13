import { InputText, SelectOption } from "../../../../components/input";
import { useQuestionnaire } from "../../../../hooks/fetch//fuzzys/useQuestionnaire"


const FormQuestionnaire = () => {
    const {
        register,
        errors,
        indicator
    } = useQuestionnaire();
    
    return (
        <div className="w-full">
            <div className="w-full">
                <label className="font-bold text-lg">IDENTITTAS RESPONDENT</label>
            </div>
            <div className="w-full">
                <label className="font-normal text-base"> Kuisioner ini ditujukan kepada Bapak/Ibu para akademisi (dosen) di Perguruan Tinggi. Silahkan Bapak/Ibu isi biodata berikut ini:
                </label>
            </div>
            <div className="w-full border-t bg-gray-600 my-4" />
            <div className="grid grid-cols-2 gap-4">
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
            <div className="w-full">
                <table className="w-full" border={1}>
                    <thead>
                        <tr>
                            <td className="border" rowSpan={2}>Pernyataan</td>
                            <td colSpan={5} className="text-center border">Skala</td>
                        </tr>
                        <tr className="text-center">
                            <td className="border">1</td>
                            <td className="border">2</td>
                            <td className="border">3</td>
                            <td className="border">4</td>
                            <td className="border">5</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            indicator?.map((value)=>(
                                <tr>
                                    <td>
                                        {value.name}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FormQuestionnaire
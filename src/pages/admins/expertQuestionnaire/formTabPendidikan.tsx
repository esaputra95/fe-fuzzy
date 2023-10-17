import { FC, Fragment } from "react"
import { DataForm, ExpertQuestionnaireInterface } from "../../../interfaces/expertQuestionnaireInterface"
import InputRadio from "../../../components/input/InputRadio";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface FormTabPendidikanProps {
    tabPendidikan?: DataForm | undefined;
    register: UseFormRegister<ExpertQuestionnaireInterface>;
    errors: FieldErrors<ExpertQuestionnaireInterface>;
}

const FormTabPendidikan: FC<FormTabPendidikanProps> = (props) => {
    const {
        tabPendidikan,
        register,
        errors
    } = props;

    let indexData=0

    return (
        <div className='w-full'>
            <div className='w-full p-2'>
                <label className='font-bold text-lg'>{tabPendidikan?.name}</label>
            </div>
            {
                tabPendidikan && tabPendidikan.factor.length > 0 ? tabPendidikan.factor.map((value, index)=> {
                return(
                    <Fragment key={index}>
                        <div className='w-full bg-green-50 p-2'>
                            <label className='font-semibold'>Factor : {value.name}</label>
                        </div>
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs border-spacing-1 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th rowSpan={2} key={Math.random()} scope="col" className='w-8 text-center border-2'>
                                        No
                                    </th>
                                    <th rowSpan={2} align='center' className='w-96 border-2'>
                                        Kriteria A
                                    </th>
                                    <th align='center' colSpan={4} className='border-2'>
                                        Skala
                                    </th>
                                    <th align='center' className='border-2'>
                                        
                                    </th>
                                    <th align='center' colSpan={4} className='border-2'>
                                        Skala
                                    </th>
                                    <th align='center' className='w-96 text-center border-2' rowSpan={2}>
                                        Kriteria B
                                    </th>
                                </tr>
                                <tr>
                                    <th className='w-8 text-center border-2'>
                                        9
                                    </th>
                                    <th className='w-8 text-center border-2'>
                                        7
                                    </th>
                                    <th className='w-8 text-center border-2'>
                                        5
                                    </th>
                                    <th className='w-8 text-center border-2'>
                                        3
                                    </th>
                                    <th className='w-8 text-center border-2'>
                                        1
                                    </th>
                                    <th className='w-8 text-center border-2'>
                                        3
                                    </th>
                                    <th className='w-8 text-center border-2'>
                                        5
                                    </th>
                                    <th className='w-8 text-center border-2'>
                                        7
                                    </th>
                                    <th className='w-8 text-center border-2'>
                                        9
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    value.knowledge.map((value1, index1)=> (
                                        <Fragment key={index1}>
                                            {
                                                value.knowledge.map((value2, index2)=> {
                                                    indexData++
                                                    return (
                                                        <>
                                                        {
                                                            index1 < index2 ? 
                                                            <tr key={index} className="overflow-auto bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                            <td className='border-2'>
                                                                {index1+1}
                                                            </td>
                                                            <td className='border-2'>
                                                                {value1.indicators.name} I 1 {index1}
                                                            </td>
                                                            <td className='border-2' align='center'>
                                                                <InputRadio 
                                                                    name='questionary'
                                                                    register={register}
                                                                    errors={errors}
                                                                    nameObj='value'
                                                                    index={indexData}
                                                                    valueRadio="-9"
                                                                />
                                                            </td>
                                                            <td className='border-2'>
                                                                <InputRadio 
                                                                    name='questionary'
                                                                    register={register}
                                                                    errors={errors}
                                                                    nameObj='value'
                                                                    index={indexData}
                                                                    valueRadio="-7"
                                                                />
                                                            </td>
                                                            <td className='border-2'>
                                                                <InputRadio 
                                                                    name='questionary'
                                                                    register={register}
                                                                    errors={errors}
                                                                    nameObj='value'
                                                                    index={indexData}
                                                                    valueRadio="-5"
                                                                />
                                                            </td>
                                                            <td className='border-2'>
                                                                <InputRadio 
                                                                    name='questionary'
                                                                    register={register}
                                                                    errors={errors}
                                                                    nameObj='value'
                                                                    index={indexData}
                                                                    valueRadio="-3"
                                                                />
                                                            </td>
                                                            <td className='border-2'>
                                                                <InputRadio 
                                                                    name='questionary'
                                                                    register={register}
                                                                    errors={errors}
                                                                    nameObj='value'
                                                                    index={indexData}
                                                                    valueRadio="1"
                                                                />
                                                            </td>
                                                            <td className='border-2'>
                                                                <InputRadio 
                                                                    name='questionary'
                                                                    register={register}
                                                                    errors={errors}
                                                                    nameObj='value'
                                                                    index={indexData}
                                                                    valueRadio="3"
                                                                />
                                                            </td>
                                                            <td className='border-2'>
                                                                <InputRadio 
                                                                    name='questionary'
                                                                    register={register}
                                                                    errors={errors}
                                                                    nameObj='value'
                                                                    index={indexData}
                                                                    valueRadio="5"
                                                                />
                                                            </td>
                                                            <td className='border-2'>
                                                                <InputRadio 
                                                                    name='questionary'
                                                                    register={register}
                                                                    errors={errors}
                                                                    nameObj='value'
                                                                    index={indexData}
                                                                    valueRadio="7"
                                                                />
                                                            </td>
                                                            <td className='border-2'>
                                                                <InputRadio 
                                                                    name='questionary'
                                                                    register={register}
                                                                    errors={errors}
                                                                    nameObj='value'
                                                                    index={indexData}
                                                                    valueRadio="9"
                                                                />
                                                            </td>
                                                            <td className='border-2'>
                                                                {value2.indicators.name} I 2 {index2}
                                                            </td>
                                                        </tr> :null
                                                        }
                                                    </>
                                                )})
                                            }
                                        </Fragment>
                                    ))
                                }
                        </tbody>
                        </table>
                    </Fragment>
                )}) : null
            }
            </div> 
    )
}

export default FormTabPendidikan
// import React, { FC } from 'react'
// import { FieldErrors, UseFormRegister } from 'react-hook-form';
// import { ExpertQuestionnaireInterface } from '../../../interfaces/expertQuestionnaireInterface';
// import { InputTextArray } from '../../../components/input';
// import InputRadio from '../../../components/input/InputRadio';

// interface FormListPropsInterface {
//     register: UseFormRegister<ExpertQuestionnaireInterface>;
//     errors: FieldErrors<ExpertQuestionnaireInterface>;
// }

// const FormList:FC<FormListPropsInterface> = (props) => {
//     const {
//         register,
//         errors
//     } =  props
//     return (
        
//             <tr key={index} className="overflow-auto bg-white border-b dark:bg-gray-800 dark:border-gray-700">
//             <td className='border-2'>
//                 {index1+1}

//                 <InputTextArray 
//                     type="hidden"
//                     name="questionary"
//                     nameObj="indicatorId1"
//                     index={indexData}
//                     register={register}
//                     errors={errors}
//                     value={value1.indicators.id}
//                 />
//             </td>
//             <td className='border-2'>
//                 {value1.indicators.name} I 1 {index1}
//             </td>
//             <td className='border-2' align='center'>
//                 <InputRadio 
//                     name='questionary'
//                     register={register}
//                     errors={errors}
//                     nameObj='value'
//                     index={indexData}
//                     valueRadio="-9"
//                 />
//             </td>
//             <td className='border-2'>
//                 <InputRadio 
//                     name='questionary'
//                     register={register}
//                     errors={errors}
//                     nameObj='value'
//                     index={indexData}
//                     valueRadio="-7"
//                 />
//             </td>
//             <td className='border-2'>
//                 <InputRadio 
//                     name='questionary'
//                     register={register}
//                     errors={errors}
//                     nameObj='value'
//                     index={indexData}
//                     valueRadio="-5"
//                 />
//             </td>
//             <td className='border-2'>
//                 <InputRadio 
//                     name='questionary'
//                     register={register}
//                     errors={errors}
//                     nameObj='value'
//                     index={indexData}
//                     valueRadio="-3"
//                 />
//             </td>
//             <td className='border-2'>
//                 <InputRadio 
//                     name='questionary'
//                     register={register}
//                     errors={errors}
//                     nameObj='value'
//                     index={indexData}
//                     valueRadio="1"
//                 />
//             </td>
//             <td className='border-2'>
//                 <InputRadio 
//                     name='questionary'
//                     register={register}
//                     errors={errors}
//                     nameObj='value'
//                     index={indexData}
//                     valueRadio="3"
//                 />
//             </td>
//             <td className='border-2'>
//                 <InputRadio 
//                     name='questionary'
//                     register={register}
//                     errors={errors}
//                     nameObj='value'
//                     index={indexData}
//                     valueRadio="5"
//                 />
//             </td>
//             <td className='border-2'>
//                 <InputRadio 
//                     name='questionary'
//                     register={register}
//                     errors={errors}
//                     nameObj='value'
//                     index={indexData}
//                     valueRadio="7"
//                 />
//             </td>
//             <td className='border-2'>
//                 <InputRadio 
//                     name='questionary'
//                     register={register}
//                     errors={errors}
//                     nameObj='value'
//                     index={indexData}
//                     valueRadio="9"
//                 />
//             </td>
//             <td className='border-2'>
//                 <InputTextArray 
//                     type="hidden"
//                     name="questionary"
//                     nameObj="indicatorId2"
//                     index={indexData}
//                     register={register}
//                     errors={errors}
//                     value={value1.indicators.id}
//                 />
//                 {value2.indicators.name} I 2 {index2}
//             </td>
//         </tr>
        
//     )
// }

// export default FormList
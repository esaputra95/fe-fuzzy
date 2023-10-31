import { FC } from 'react'
import { Button } from '../../../components/input';
import { FuzzyFormProps } from '../../../interfaces/fuzzyInterface';
import Spinner from '../../../components/ui/Spinner';
import Select from 'react-tailwindcss-select';

const FormFuzzy: FC<FuzzyFormProps> = (props) => {
    const { 
        handleSubmit,
        onSubmit,
        register,
        errors,
        isLoading,
        idDetail,
        onSearchSubVariable,
        optionSubVariable,
        selectSubVariable,
        handleChangeSelect,
        optionFactor,
        onSearchFactor,
        selectFactor
    } = props;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex space-x-2'>
                <div className='w-full'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Sub Variable    
                    </label>
                    <Select
                        {...register('subVariableId')}
                        onSearchInputChange={onSearchSubVariable}
                        isSearchable={true}
                        value={selectSubVariable}
                        onChange={(event)=> handleChangeSelect(event, 'subVariableId')}
                        options={optionSubVariable} 
                        primaryColor={''}
                    />
                    <label className="block text-red-400 text-sm mb-2">
                        {errors.subVariableId?.message}   
                    </label>
                </div>
                <div className='w-full'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Factor    
                    </label>
                    <Select
                        {...register('subVariableId')}
                        onSearchInputChange={onSearchFactor}
                        isSearchable={true}
                        value={selectFactor}
                        onChange={(event)=> handleChangeSelect(event, 'factorId')}
                        options={optionFactor} 
                        primaryColor={''}
                    />
                    <label className="block text-red-400 text-sm mb-2">
                        {errors.factorId?.message}   
                    </label>
                </div>
                <div className='w-4/12 flex justify-end '>
                    {!idDetail ? <Button disabled={isLoading?true:false} variant="primary" type='submit' size="medium" className='my-4' >Lihat Data {isLoading?<Spinner />:null}</Button>: null}
                </div>
            </div>
            
        </form>
    )
}

export default FormFuzzy
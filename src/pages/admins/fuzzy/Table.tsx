import { FC } from "react";
import { FuzzyData } from "../../../interfaces/fuzzyInterface";
import Skeleton from "../../../components/ui/Skeleton";
import { SubVariableInterface } from "../../../interfaces/master/subVariableInterface";
import { FactorInterface } from "../../../interfaces/master/factorInterface";

type tableProps = {
    data?: FuzzyData[],
    multiplicationMatrix?: number [][],
    squaredRootOf?: number [][],
    eigenVector?: number [][],
    lamda?: number [][],
    isFetching?: boolean,
    subVariable?: SubVariableInterface;
    factor?: FactorInterface;
    onDelete:(id:number)=>void,
    onUpdate:(id:number)=>void,
    onDetail:(id:number)=>void,
    stageFuzzy?: FuzzyData[],
    multiplicationMatrixStageFuzzy?: number [][],
    squaredRootOfStageFuzzy?:number [][],
    sintesisFuzzy?:number [][],
    resultSI?: number [][],
}


const Table: FC<tableProps> = (props) => {
    const { 
        data,
        isFetching,
        multiplicationMatrix,
        squaredRootOf,
        eigenVector,
        subVariable,
        factor,
        lamda,
        stageFuzzy,
        multiplicationMatrixStageFuzzy,
        squaredRootOfStageFuzzy,
        sintesisFuzzy,
        resultSI
    } = props;

    return (
        <div className="w-full">
            <div className="relative w-full overflow-x-auto max-h-100">
            
            <div className="w-full">
                <div className="bg-cyan-300 w-full my-4 p-6 rounded-md text-gray-50">
                    1.  MENENTUKAN MATRIKS PERBANDINGAN AHP
                </div>
            {
                !isFetching && data && data.length > 0 ? data.map((value)=>(
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-4">
                        <tbody className="w-full">
                            <tr className="bg-gray-400 w-full">
                                <td colSpan={value.data.length+1} className="px-2 py-2 text-gray-50">
                                    { value.respondentName }
                                </td>
                            </tr>
                            {
                                value.data.map((valueData, index)=> (
                                    <>
                                        {
                                            index===0 ? (
                                            <>
                                                <td></td>
                                                {
                                                    valueData.map((value, index)=> (
                                                        <td className="px-2 py-2 bg-gray-100">
                                                            {factor?.code+'_'+subVariable?.code+''+(index+1)} 
                                                        </td>
                                                        
                                                    ))
                                                }
                                            </>) : null
                                        }
                                        <tr className="overflow-auto bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            
                                            {
                                                valueData.map((valueTd, index2)=> (
                                                    <>
                                                        {
                                                            index2===0 ? (<td className="px-2 py-2 bg-gray-100">
                                                                {factor?.code+'_'+subVariable?.code+''+(index+1)} 
                                                            </td>) : null
                                                        }
                                                        <td className="px-2 py-2">
                                                            {valueTd}
                                                        </td>
                                                    </>
                                                    
                                                ))
                                            }
                                        </tr>
                                    </>
                                ))
                            }
                        </tbody>
                    </table>
                )) : null
            }
            </div>
            <div className="w-full">
                <div className="bg-cyan-300 w-full my-4 p-6 rounded-md text-gray-50">
                    2. PERKALIAN ANTAR MATRIKS PERBANDINGAN
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    {
                        multiplicationMatrix?.map((valueMultiplication, index)=> (
                            <>
                                 {
                                    index===0 ? (
                                    <>
                                        <td></td>
                                        {
                                            valueMultiplication.map((value, index)=> (
                                                <td className="px-2 py-2 bg-gray-100">
                                                    {factor?.code+'_'+subVariable?.code+''+(index+1)} 
                                                </td>
                                                
                                            ))
                                        }
                                    </>) : null
                                }
                                <tr className="overflow-auto bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    {
                                        valueMultiplication.map((valueTd, index2)=> (
                                            <>
                                                {
                                                    index2===0 ? (<td className="px-2 py-2 bg-gray-100">
                                                        {factor?.code+'_'+subVariable?.code+''+(index+1)} 
                                                    </td>) : null
                                                }
                                                <td className="px-2 py-2">
                                                    {valueTd}
                                                </td>
                                            </>
                                        ))
                                    }
                                </tr>
                            </>
                        ))
                    }
                </table>
            </div>
            <div className="w-full">
                <div className="bg-cyan-300 w-full my-4 p-6 rounded-md text-gray-50">
                    3. AKAR PANGKAT SEBANYAK RESPONDEN
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    {
                        squaredRootOf?.map((valueSquaredRootOf, index)=> (
                            <>
                                 {
                                    index===0 ? (
                                    <>
                                        <td></td>
                                        {
                                            valueSquaredRootOf.map((value, index)=> (
                                                <td className="px-2 py-2 bg-gray-100">
                                                    {factor?.code+'_'+subVariable?.code+''+(index+1)} 
                                                </td>
                                                
                                            ))
                                        }
                                    </>) : null
                                }
                                <tr className="overflow-auto bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    {
                                        valueSquaredRootOf.map((valueTd, index2)=> (
                                            <>
                                                {
                                                    index2===0 && index!==valueSquaredRootOf.length ? 
                                                    (<td className="px-2 py-2 bg-gray-100">
                                                        {factor?.code+'_'+subVariable?.code+''+(index+1)} 
                                                    </td>) : null
                                                }
                                                {
                                                    index2===0 && index===valueSquaredRootOf.length ? 
                                                    (<td className="px-2 py-2 bg-gray-100">
                                                        Total
                                                    </td>) : null
                                                }
                                                <td className="px-2 py-2">
                                                    {valueTd}
                                                </td>
                                            </>
                                        ))
                                    }
                                </tr>
                            </>
                        ))
                    }
                </table>
            </div>
            <div className="w-full">
                <div className="bg-cyan-300 w-full my-4 p-6 rounded-md text-gray-50">
                    4. EIGEN VECTOR
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    {
                        eigenVector?.map((valueEigenVector, index)=> (
                            <>
                                 {
                                    index===0 ? (
                                    <>
                                        <td></td>
                                        {
                                            valueEigenVector.map((value, index)=> (
                                                <>
                                                    {
                                                        index !== (eigenVector.length-1) ? (
                                                            <td className="px-2 py-2 bg-gray-100">
                                                                {factor?.code+'_'+subVariable?.code+''+(index+1)} 
                                                            </td>
                                                        ) : (
                                                            <td className="px-2 py-2 bg-gray-100">
                                                                Nilai
                                                            </td>
                                                        )
                                                    }
                                                </>
                                                
                                            ))
                                        }
                                    </>) : null
                                }
                                <tr className="overflow-auto bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    {
                                        valueEigenVector.map((valueTd, index2)=> (
                                            <>
                                                {
                                                    index2===0 && index !== valueEigenVector.length ? 
                                                    (<td className="px-2 py-2 bg-gray-100">
                                                        {factor?.code+'_'+subVariable?.code+''+(index+1)} 
                                                    </td>) : null
                                                }
                                                {
                                                    index2===0 && index === valueEigenVector.length ? 
                                                    (<td className="px-2 py-2 bg-gray-100">
                                                        Total 
                                                    </td>) : null
                                                }
                                                <td className="px-2 py-2">
                                                    {valueTd}
                                                </td>
                                            </>
                                        ))
                                    }
                                </tr>
                            </>
                        ))
                    }
                </table>
            </div>
            <div className="w-full">
                <div className="bg-cyan-300 w-full my-4 p-6 rounded-md text-gray-50">
                    5. MENGUKUR KONSISTENSI UNTUK MENDAPATKAN NILAI LAMDA
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-auto">
                    {
                        lamda?.map((valueLamda, index)=> (
                            <>
                                 {
                                    index===0 ? (
                                    <>
                                        <td></td>
                                        {
                                            valueLamda.map((value, index)=> (
                                                <>
                                                    {
                                                        index <= (lamda.length-2) ? (
                                                            <td className="px-2 py-2 font-semibold bg-gray-100">
                                                                {factor?.code+'_'+subVariable?.code+''+(index+1)} 
                                                            </td>
                                                        ) :
                                                        index === lamda.length ? (
                                                            <td className="px-2 py-2 font-semibold bg-gray-100">
                                                                Rata-Rata
                                                            </td>
                                                        ):
                                                         (
                                                            <td className="px-2 py-2 font-semibold bg-gray-100">
                                                                Jumlah
                                                            </td>
                                                        )
                                                    }
                                                </>
                                                
                                            ))
                                        }
                                    </>) : null
                                }
                                <tr className="overflow-auto bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    {
                                        valueLamda.map((valueTd, index2)=> (
                                            <>
                                                {
                                                    index2===0 
                                                    && index!==lamda.length-4 
                                                    && index !==lamda.length-3 
                                                    && index !== lamda.length-2 
                                                    && index!==lamda.length-1? 
                                                    (<td className="px-2 py-2 font-semibold bg-gray-100">
                                                        {factor?.code+'_'+subVariable?.code+''+(index+1)} {lamda.length}
                                                    </td>) : null
                                                }
                                                {
                                                    index2===0 && index === lamda.length-4 ? 
                                                    (<td className="px-2 py-2 font-semibold bg-gray-100">
                                                        Lamda 
                                                    </td>) : null
                                                }
                                                {
                                                    index2===0 && index === lamda.length-3 ? 
                                                    (<td className="px-2 py-2 font-semibold bg-gray-100">
                                                        CI 
                                                    </td>) : null
                                                }
                                                {
                                                    index2===0 && index === lamda.length-2 ? 
                                                    (<td className="px-2 py-2 font-semibold bg-gray-100">
                                                        IR 
                                                    </td>) : null
                                                }
                                                {
                                                    index2===0 && index === lamda.length-1 ? 
                                                    (<td className="px-2 py-2 font-semibold bg-gray-100">
                                                        CR
                                                    </td>) : null
                                                }
                                                <td className="px-2 py-2">
                                                    {valueTd}
                                                </td>
                                            </>
                                        ))
                                    }
                                </tr>
                            </>
                        ))
                    }
                </table>
            </div>
            <div className="w-full">
                <div className="bg-cyan-300 w-full my-4 p-6 rounded-md text-gray-50">
                    6. TAHAPAN TFN (FUZZYFIKASI)
                    
                </div>
                {
                    !isFetching && stageFuzzy && stageFuzzy.length > 0 ? stageFuzzy.map((value)=>(
                        <table className="w-full text-sm text-left overflow-auto text-gray-500 dark:text-gray-400 mt-4">
                            <tbody className="w-full">
                                <tr className="bg-gray-400 w-full">
                                    <td colSpan={value.data.length+1} className="px-2 py-2 text-gray-50">
                                        { value.respondentName }
                                    </td>
                                </tr>
                                {
                                    value.data.map((valueData, index)=> (
                                        <>
                                            {
                                                index===0 ? (
                                                <>
                                                    <td></td>
                                                    {
                                                        valueData.map((value, index)=> (
                                                            <td className="px-2 py-2 bg-gray-100">
                                                                {factor?.code+'_'+subVariable?.code+''+(index+1)} 
                                                            </td>
                                                            
                                                        ))
                                                    }
                                                </>) : null
                                            }
                                            <tr className="w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                
                                                {
                                                    valueData.map((valueTd, index2)=> (
                                                        <>
                                                            {
                                                                index2===0 ? 
                                                                (<td className="px-2 py-2 bg-gray-100">
                                                                    {factor?.code+'_'+subVariable?.code+''+(index+1)} 
                                                                </td>) : null
                                                            }
                                                            <td className="px-2 py-2">
                                                                {valueTd}
                                                            </td>
                                                        </>
                                                        
                                                    ))
                                                }
                                            </tr>
                                        </>
                                    ))
                                }
                            </tbody>
                        </table>
                    )) : null
                }
            </div>
            <div className="w-full">
                <div className="bg-cyan-300 w-full my-4 p-6 rounded-md text-gray-50">
                    7. PERKALIAN ANTAR MATRIKS PERBANDINGAN
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-4">
                    {
                        multiplicationMatrixStageFuzzy?.map((valueMultiplication, index)=> (
                            <>
                                 {
                                    index===0 ? (
                                    <>
                                        <td></td>
                                        {
                                            valueMultiplication.map((value, index)=> (
                                                <td className="px-2 py-2 bg-gray-100">
                                                    {factor?.code+'_'+subVariable?.code+''+(Math.ceil((index+1)/3))} 
                                                </td>
                                                
                                            ))
                                        }
                                    </>) : null
                                }
                                <tr className="overflow-auto bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    {
                                        valueMultiplication.map((valueTd, index2)=> (
                                            <>
                                                {
                                                    index2===0 ? 
                                                    (<td className="px-2 py-2 bg-gray-100">
                                                        {factor?.code+'_'+subVariable?.code+''+(Math.ceil((index+1)))} 
                                                    </td>) : null
                                                }
                                                <td className="px-2 py-2">
                                                    {valueTd}
                                                </td>
                                            </>
                                        ))
                                    }
                                </tr>
                            </>
                        ))
                    }
                </table>
            </div>
            <div className="w-full">
                <div className="bg-cyan-300 w-full my-4 p-6 rounded-md text-gray-50">
                    8. AKAR PANGKAT SEBANYAK RESPONDEN
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    {
                        squaredRootOfStageFuzzy?.map((valueSquaredRootOf, index)=> (
                            <>
                                 {
                                    index===0 ? (
                                    <>
                                        <td></td>
                                        {
                                            valueSquaredRootOf.map((value, index)=> (
                                                <td className="px-2 py-2 bg-gray-100">
                                                    {factor?.code+'_'+subVariable?.code+''+(Math.ceil((index+1)/3))}
                                                </td>
                                                
                                            ))
                                        }
                                    </>) : null
                                }
                                <tr className="overflow-auto bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    {
                                        valueSquaredRootOf.map((valueTd, index2)=> (
                                            <>
                                                {
                                                    index2===0 && index!==valueSquaredRootOf.length ? 
                                                    (<td className="px-2 py-2 bg-gray-100">
                                                        {factor?.code+'_'+subVariable?.code+''+(index+1)} 
                                                    </td>) : null
                                                }
                                                {
                                                    index2===0 && index===valueSquaredRootOf.length ? (
                                                    <td className="px-2 py-2 bg-gray-100">
                                                        Total
                                                    </td>) : null
                                                }
                                                <td className="px-2 py-2">
                                                    {valueTd}
                                                </td>
                                            </>
                                        ))
                                    }
                                </tr>
                            </>
                        ))
                    }
                </table>
            </div>
            <div className="grid grid-cols-2 gap-8">
                <div className="w-full">
                    <div className="bg-cyan-300 w-full my-4 p-6 rounded-md text-gray-50">
                        9. Menentukan nilai sintesis fuzzy 
                    </div>
                    <div className="
                        flex
                        p-4
                        text-gray-500
                    ">
                        Jumlah Penilai
                    </div>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        {
                            sintesisFuzzy?.map((valueSquaredRootOf, index)=> (
                                <>
                                    {
                                        index===0 ? (
                                        <>
                                            <td></td>
                                            {
                                                valueSquaredRootOf.map((value, index)=> (
                                                    <td className="px-2 py-2 bg-gray-100">
                                                        {index+1}
                                                    </td>
                                                    
                                                ))
                                            }
                                        </>) : null
                                    }
                                    <tr className="overflow-auto bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        {
                                            valueSquaredRootOf.map((valueTd, index2)=> (
                                                <>
                                                    {
                                                        index2===0 
                                                        && index!== sintesisFuzzy.length-1
                                                        && index!== sintesisFuzzy.length-2
                                                        && index!== sintesisFuzzy.length-3 
                                                        ? (<td className="px-2 py-2 w-20 bg-gray-100">
                                                            {factor?.code+'_'+subVariable?.code+''+(index+1)} 
                                                        </td>) : null
                                                    }
                                                    {
                                                        index2===0 && index=== sintesisFuzzy.length-3 ? 
                                                        (<td className="px-2 py-2 w-20 bg-gray-100">
                                                            Jumlah
                                                        </td>) : null
                                                    }
                                                    {
                                                        index2===0 && index=== sintesisFuzzy.length-2 ? 
                                                        (<td className="px-2 py-2 w-20 bg-gray-100">
                                                            1/Jumlah
                                                        </td>) : null
                                                    }
                                                    {
                                                        index2===0 && index=== sintesisFuzzy.length-1 ? 
                                                        (<td className="px-2 py-2 w-20 bg-gray-100">
                                                            Dibalik
                                                        </td>) : null
                                                    }
                                                    <td className="px-2 py-2">
                                                        {valueTd}
                                                    </td>
                                                </>
                                            ))
                                        }
                                    </tr>
                                </>
                            ))
                        }
                    </table>
                </div>
                <div className="w-full">
                    <div className="bg-cyan-300 w-full my-4 p-6 rounded-md text-gray-50">
                        9. Menentukan nilai sintesis fuzzy 
                    </div>
                    <div className="
                        flex
                        p-4
                        text-gray-500
                    ">
                        Hasil SI
                    </div>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        {
                            resultSI?.map((valueSquaredRootOf, index)=> (
                                <>
                                    {
                                        index===0 ? (
                                        <>
                                            <td></td>
                                            {
                                                valueSquaredRootOf.map((value, index)=> (
                                                    <td className="px-2 py-2 bg-gray-100">
                                                        {index+1}
                                                    </td>
                                                    
                                                ))
                                            }
                                        </>) : null
                                    }
                                    <tr className="overflow-auto bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        {
                                            valueSquaredRootOf.map((valueTd, index2)=> (
                                                <>
                                                    {
                                                        index2===0 
                                                        ? (<td className="px-2 py-2 w-20 bg-gray-100">
                                                            {factor?.code+'_'+subVariable?.code+''+(index+1)} 
                                                        </td>) : null
                                                    }
                                                    
                                                    <td className="px-2 py-2">
                                                        {valueTd}
                                                    </td>
                                                </>
                                            ))
                                        }
                                    </tr>
                                </>
                            ))
                        }
                    </table>
                </div>
            </div>
            {
                isFetching ? 
                <Skeleton cols={4} rows={2} /> : null
            }
            
        </div>

        </div>
    )
}

export default Table
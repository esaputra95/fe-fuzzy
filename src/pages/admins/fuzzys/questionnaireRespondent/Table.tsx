import { FC, Fragment } from "react";
import Skeleton from "../../../../components/ui/Skeleton";
import { QuestionnaireDataInterface } from "../../../../interfaces/questionnaireInterface";

type TableProps = {
    isLoading?: boolean,
    data: QuestionnaireDataInterface[] | undefined
}

const Table: FC<TableProps> = (props) => {
    const { 
        isLoading,
        data
    } = props;
    return (
        <div className="w-full pt-8">
            <div className="relative w-full overflow-x-auto max-h-100">
                {
                    isLoading ? 
                    <Skeleton cols={4} rows={2} /> : null
                }
                <table className="w-full table-auto p-4 text-sm text-left text-gray-900 dark:text-gray-400">
                    <thead>
                        <tr className="">
                            <th className="p-4">
                                Kode
                            </th>
                            <th className="p-4">
                                Jenis Kelamin
                            </th>
                            <th className="p-4">
                                Golongan
                            </th>
                            <th className="p-4">
                                Pendidikan Terakhir
                            </th>
                            <th className="p-4">
                                Bidang Keahlian
                            </th>
                            <th className="p-4">
                                Universitas
                            </th>
                        </tr>
                    </thead>
                    {
                        data && data?.length > 0 && data?.map((value)=>(
                            <Fragment key={Math.random().toString(5)}>
                                <tr className="bg-white p-4 border-y dark:bg-gray-800 dark:border-gray-700">
                                    <td className="p-4">
                                        {
                                            value.name ?? ''
                                        }
                                    </td>
                                    <td className="p-4">
                                        {
                                            value.gender ?? ''
                                        }
                                    </td>
                                    <td className="p-4">
                                        {
                                            value.golongan ?? ''
                                        }
                                    </td>
                                    <td className="p-4">
                                        {
                                            value?.lastStudy
                                        }
                                    </td>
                                    <td className="p-4">
                                        {
                                            value?.skill
                                        }
                                    </td>
                                    <td className="p-4">
                                        {
                                            value?.university
                                        }
                                    </td>
                                </tr>
                            </Fragment>
                        ))
                    }
                </table>
            </div>
        </div>
    )
}

export default Table
const FormTable = () => {
    return (
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
    )
}

export default FormTable
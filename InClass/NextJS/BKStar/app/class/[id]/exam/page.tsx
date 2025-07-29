'use client'

import {Button} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import DescriptionIcon from '@mui/icons-material/Description'

const tests = [
    {title: 'ĐỀ THI LẦN 1', date: '05/01/2024'},
    {title: 'Thi thu lan 2', date: '26/01/2024'},
    {title: 'Thu Thu Lan 3', date: '28/01/2024'},
    {title: 'Thi Thu 4', date: '30/01/2024'},
    {title: 'Thu Thu 5', date: '22/04/2024'},
    {title: 'test 4', date: '07/07/2025'},
    {title: 'test5', date: '07/07/2025'},
    {title: '123123', date: '17/07/2025'},
    {title: 'test bài thi', date: '22/07/2025'},
    {title: 'test 1', date: '18/07/2025'},
    {title: '1234', date: '24/07/2025'},
]

export default function TestListPage() {
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Danh sách Bài thi</h1>

                <div className="flex flex-col lg:flex-row gap-3 items-center lg:items-center w-full lg:w-auto">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Tìm kiếm"
                            className="border-2 border-blue-500 rounded px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base h-[40px] w-full"
                        />
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                                    fontSize="medium"/>
                    </div>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon/>}
                        className="h-[40px] w-full lg:w-auto"
                        sx={{
                            height: '40px',
                            textTransform: 'none',
                            fontSize: {xs: '1rem', lg: '1.125rem'},
                            padding: {xs: '6px 12px', lg: '8px 20px'},
                            minWidth: {lg: '160px'}
                        }}
                    >
                        Tạo bài thi
                    </Button>
                </div>
            </div>

            {/* Bài thi đang diễn ra */}
            <div className="mb-4 text-blue-600 font-semibold text-lg">Bài thi đang diễn ra</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
                {tests.map((test, index) => (
                    <div
                        key={index}
                        className="bg-white shadow p-4 min-h-[80px] flex items-start gap-4 border-l-5 border-blue-500 rounded-r-lg"
                    >
                        <DescriptionIcon className="text-blue-500 mt-1" style={{fontSize: '48px'}}/>
                        <div>
                            <div className="font-semibold text-gray-800 text-base md:text-lg">{test.title}</div>
                            <div className="text-xs text-gray-500 mt-1.5">Ngày bắt đầu: {test.date}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bài thi chưa bắt đầu */}
            <div className="mt-6 text-blue-600 font-semibold text-lg">Bài thi chưa bắt đầu</div>
            <div className="text-gray-500 text-sm mt-2">Không có bài thi nào.</div>
        </div>
    )
}
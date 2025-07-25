'use client'

import {Button, InputBase, Paper} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import Link from 'next/link'

const classes = [
    {name: 'Test Thi Thu', code: '123456', members: 1},
    {name: 'lol', code: '123456', members: 1},
    {name: 'A1', code: '123456', members: 1},
    {name: 'A2', code: 'abcdef', members: 1},
]

export default function ClassesPage() {
    return (
        <div className="px-4 md:px-8 py-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Danh sách lớp học</h1>

                <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                    <Paper
                        component="form"
                        className="flex items-center px-2 py-1 w-full sm:w-80 border border-blue-500 rounded-md"
                        elevation={0}
                    >
                        <SearchIcon className="text-gray-500 mr-2"/>
                        <InputBase
                            placeholder="Tìm kiếm"
                            className="w-full"
                            inputProps={{'aria-label': 'search classes'}}
                        />
                    </Paper>

                    <Link href="/classes/add">
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: '#f4c644',
                                color: '#fff',
                                fontWeight: 600,
                                textTransform: 'none',
                                '&:hover': {
                                    bgcolor: '#e3b92f',
                                },
                                boxShadow: 'none',
                            }}
                            startIcon={<AddIcon/>}
                        >
                            Thêm lớp học
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Class cards */}
            <div className="grid gap-6 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {classes.map((cls, idx) => (
                    <div
                        key={idx}
                        className="bg-sky-400 text-white rounded-lg p-4 flex flex-col justify-between"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold text-lg">{cls.name}</h2>
                            <button className="flex items-center gap-1 text-lg font-semibold hover:underline">
                                <span role="img" aria-label="enter">📋</span> Vào lớp
                            </button>
                        </div>

                        {/* Số lượng thành viên */}
                        <div className="mt-4 text-4xl font-bold">{cls.members}</div>

                        {/* Dòng thông tin phía dưới */}
                        <div className="flex justify-between items-center mt-2 text-base">
                            <div>Thành viên tham gia</div>

                            <div className="flex items-center gap-4">
                                <div>Mã lớp: {cls.code}</div>
                                <button
                                    className="bg-white text-sky-500 rounded-md px-2 py-1 text-xs font-medium flex items-center gap-1 hover:bg-gray-100"
                                >
                                    📋 Chia sẻ
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

'use client'

import {useState, useEffect} from 'react'
import {Button, InputBase, Paper} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import Link from 'next/link'
import {toast} from 'react-toastify'
import {getClasses} from '@/lib/api/classService'
import {Class} from '@/lib/types/auth'
import {useSearchParams} from 'next/navigation'

export default function ClassesPage() {
    const [classes, setClasses] = useState<Class[]>([])
    const [loading, setLoading] = useState(true)
    const searchParams = useSearchParams()

    const fetchClasses = async () => {
        try {
            setLoading(true)
            const data = await getClasses()
            console.log('Fetched classes:', data) // Log chi tiết danh sách lớp
            setClasses(data)
        } catch (error: any) {
            toast.error(error.message || 'Không thể tải danh sách lớp học')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchClasses()
    }, [searchParams.get('refresh')]) // Chạy lại khi query param refresh thay đổi

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
                                width: {xs: '100%', sm: '12rem'},
                                minHeight: '40px',
                                padding: '8px 20px',
                            }}
                            startIcon={<AddIcon/>}
                        >
                            Thêm lớp học
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Class cards */}
            {loading ? (
                <div className="text-center text-gray-500">Đang tải...</div>
            ) : classes.length === 0 ? (
                <div className="text-center text-gray-500">Chưa có lớp học nào</div>
            ) : (
                <div className="grid gap-6 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {classes.map((cls) => (
                        <div
                            key={cls.id}
                            className="bg-sky-400 text-white rounded-lg p-4 flex flex-col justify-between"
                        >
                            <div className="flex items-center justify-between">
                                <h2 className="font-semibold text-lg">{cls.name}</h2>
                                <div className="flex items-center gap-1">
                                    <Link href={`/classes/${cls.code}`}
                                          className="text-lg font-semibold hover:underline cursor-pointer">
                                        Vào lớp
                                    </Link>
                                    <span role="img" aria-label="enter">📋</span>
                                </div>
                            </div>

                            {/* Số lượng thành viên */}
                            <div className="mt-4 text-4xl font-bold">{cls.users.length}</div>

                            {/* Dòng thông tin phía dưới */}
                            <div className="flex justify-between items-center mt-2 text-sm">
                                <div>Thành viên tham gia</div>

                                <div className="flex items-center gap-4">
                                    <div>Mã lớp: {cls.code}</div>
                                    <button
                                        className="bg-white text-sky-500 rounded-md px-2 py-1 text-xs font-medium flex items-center gap-1 hover:bg-gray-100 cursor-pointer"
                                    >
                                        📋 Chia sẻ
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
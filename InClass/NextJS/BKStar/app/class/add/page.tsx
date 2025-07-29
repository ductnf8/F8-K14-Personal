'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {Button} from '@mui/material'

export default function AddClassPage() {
    const [className, setClassName] = useState('')
    const [secretCode, setSecretCode] = useState('')
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log({className, secretCode})
    }

    return (
        <div className="min-h-screen flex flex-col px-4 md:px-6 pt-12 bg-gray-50">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-8 px-2">
                Thêm lớp học mới
            </h1>

            <div className="flex-1 flex justify-center items-center w-full">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-md rounded-xl p-6 sm:p-8 w-full md:max-w-lg space-y-6"
                >
                    <div>
                        <label className="block text-base font-medium text-gray-700 mb-2">
                            Tên lớp học <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                            className="w-full border border-blue-500 rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập tên lớp học"
                        />
                    </div>

                    <div>
                        <label className="block text-base font-medium text-gray-700 mb-2">
                            Mã bảo vệ <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={secretCode}
                            onChange={(e) => setSecretCode(e.target.value)}
                            className="w-full border border-blue-500 rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập mã bảo vệ"
                        />
                    </div>

                    <div className="flex justify-center gap-6">
                        <Button
                            variant="outlined"
                            onClick={() => router.back()}
                            sx={{
                                padding: '8px 20px',
                            }}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                padding: '8px 20px',
                            }}
                        >
                            Tạo mới
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

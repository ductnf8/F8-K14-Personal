'use client'

import {useParams} from 'next/navigation'

const exam = {
    name: 'ĐỀ THI LẦN 1',
    startDate: '2024-01-05',
    timeBetween: 5,
}

const exercises = [
    {title: 'PHẦN 1: TƯ DUY TOÁN HỌC', code: '01', time: '60 phút', questions: 40},
    {title: 'PHẦN 3: TƯ DUY KHOA HỌC/ GIẢI QUYẾT VẤN ĐỀ', code: '01', time: '60 phút', questions: 20},
    {title: 'PHẦN 2: TƯ DUY ĐỌC HIỂU', code: '01', time: '30 phút', questions: 40},
]

const submissions = [
    {
        name: 'Phạm Thùy Dương',
        email: 'duongduoshawn@gmail.com',
        status: 'chờ chấm lại',
    },
    {
        name: 'bang',
        email: 'bang@test.com',
        status: 'chờ chấm lại',
    },
]

export default function ExamDetail() {
    const {id} = useParams()

    return (
        <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
            {/* Breadcrumb */}
            <p className="text-gray-600 mb-4 text-xl">
                <a href={`/class/${id}/exam`}
                   className="font-semibold text-gray-800 hover:text-blue-600 cursor-pointer">
                    Danh sách bài thi
                </a> &gt; Chi tiết bài thi
            </p>

            {/* Thông tin bài thi */}
            <div
                className="border border-blue-300 rounded-md p-4 mt-6 mb-6 bg-white flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="mb-4 md:mb-0">
                    <p className="font-semibold text-lg text-gray-800 mb-3">Tên bài thi: {exam.name}</p>
                    <p className="text-gray-700">Ngày bắt đầu: {exam.startDate}</p>
                    <p className="text-gray-700">Thời gian chờ giữa các đề bài: {exam.timeBetween} phút</p>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                    <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                        Chỉnh sửa
                    </button>
                    <button className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-100">
                        Xóa bỏ
                    </button>
                </div>
            </div>

            {/* Danh sách đề bài */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-gray-800 text-lg">Danh sách đề bài</h2>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        + Thêm đề bài
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-10">
                    {exercises.map((ex, idx) => (
                        <div key={idx}
                             className="border border-dotted border-blue-300 rounded-lg p-4 relative bg-white max-w-md">
                            <p className="font-semibold text-gray-800 text-lg mb-3">{ex.title}</p>
                            <p className="text-gray-700">Mã đề: {ex.code}</p>
                            <p className="text-gray-700">Thời gian làm bài: {ex.time}</p>
                            <p className="text-gray-700">Số câu hỏi: {ex.questions}</p>
                            <button
                                className="absolute top-2 right-2 text-sm text-gray-500 hover:text-blue-600 cursor-pointer">
                                ✎ Edit
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Danh sách bài làm */}
            <div>
                <h2 className="font-semibold text-gray-800 text-lg mb-4">Danh sách bài làm</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-10">
                    {submissions.map((s, idx) => (
                        <div key={idx} className="border border-blue-300 rounded-lg p-4 bg-white max-w-md">
                            <div className="flex items-center gap-3 mb-3">
                                <div
                                    className="w-10 h-10 bg-blue-400 text-white flex items-center justify-center rounded-full font-semibold">
                                    {s.name
                                        .split(' ')
                                        .map((w) => w[0])
                                        .join('')
                                        .toUpperCase()
                                        .slice(0, 2)}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">{s.name}</p>
                                    <p className="text-sm text-gray-600">{s.email}</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-700">Thời gian làm bài:</p>
                            <p className="text-sm text-gray-700">Số đề đã hoàn thành:</p>
                            <p className="text-sm text-orange-500 font-medium">
                                Trạng thái: {s.status}
                            </p>
                            <button
                                className="mt-3 w-full md:w-auto md:mx-auto block bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
                                Chi tiết
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
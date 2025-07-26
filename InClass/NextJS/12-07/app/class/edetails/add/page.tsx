'use client'

import {useState} from 'react'
import {useParams} from 'next/navigation'

export default function CreateExercise() {
    const [questions, setQuestions] = useState(1)
    const {id} = useParams()

    return (
        <div className="p-8 md:p-10 bg-gray-100 min-h-screen">
            {/* Breadcrumb */}
            <p className="text-xl text-gray-600 mb-6 font-medium">
                <a href={`/class/${id}/exam`}
                   className="text-blue-600 hover:text-blue-800 transition-colors duration-200 font-semibold">
                    Danh sách bài thi
                </a> &gt;{' '}
                <a href={`/class/${id}/exam/details`}
                   className="text-blue-600 hover:text-blue-800 transition-colors duration-200 font-semibold">
                    ĐỀ THI LẦN 1
                </a> &gt; <span className="text-gray-900">Thêm đề bài</span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl p-8 shadow-md">
                {/* Tải file Excel */}
                <div
                    className="flex flex-col justify-center items-center border-2 border-dashed border-blue-200 rounded-xl min-h-[400px] bg-blue-50 shadow-sm hover:bg-blue-100 transition-colors duration-200">
                    <button
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-base font-semibold">
                        ⬇ Tải lên từ máy
                    </button>
                </div>

                {/* Form nhập đề bài */}
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-1 text-gray-900">
                                Tên đề <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Nhập tên đề"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-1 text-gray-900">
                                Mã đề <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Nhập mã đề"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-1 text-gray-900">
                                Thời gian làm bài (phút) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Nhập thời gian"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-1 text-gray-900">
                                Số câu <span className="text-red-500">*</span>
                            </label>
                            <select
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                                value={questions}
                                onChange={(e) => setQuestions(Number(e.target.value))}
                            >
                                {[...Array(50)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Danh sách đáp án câu hỏi */}
                    {[...Array(questions)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <span className="text-sm font-semibold text-gray-900 min-w-[60px]">Câu {i + 1}:</span>
                            <select
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm">
                                <option>Chọn 1 đáp án</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                            </select>
                            <div className="flex items-center gap-4">
                                {['A', 'B', 'C', 'D'].map((ans) => (
                                    <label key={ans} className="flex items-center text-sm gap-1.5 text-gray-700">
                                        <input type="radio" name={`question-${i}`} value={ans}
                                               className="text-blue-600 focus:ring-blue-400"/> {ans}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}

                    <button
                        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-base font-semibold transition-colors duration-200 shadow-sm">
                        Tạo đề bài
                    </button>
                </div>
            </div>
        </div>
    )
}
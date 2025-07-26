'use client'

import {useParams} from 'next/navigation'

const members = [
    {name: 'Trần Xuân Bằng', role: 'Giáo viên'},
    {name: 'Phạm Thùy Dương', role: 'Học sinh'},
    {name: 'bang', role: 'Học sinh'},
    {name: 'Putin', role: 'Học sinh'},
]

export default function MemberPage() {
    const {id} = useParams()

    return (
        <div className="flex flex-col h-screen bg-gray-50 p-4 md:p-6">
            <h2 className="text-xl md:text-2xl xl:text-3xl font-semibold text-gray-800 mb-4 md:mb-6">
                Danh sách thành viên
            </h2>
            <div className="bg-white p-3 md:p-4 rounded-xl shadow w-full">
                <div className="overflow-x-auto md:overflow-x-hidden max-w-full">
                    <div className="w-full max-w-[calc(100vw-2rem)] md:max-w-[calc(100vw-3rem)]">
                        <table className="w-full min-w-[700px] text-left text-base md:text-lg">
                            <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="px-4 md:px-6 py-2">No.</th>
                                <th className="px-4 md:px-6 py-2">Họ tên</th>
                                <th className="px-4 md:px-6 py-2">Vị trí</th>
                                <th className="px-4 md:px-6 py-2"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {members.map((m, idx) => (
                                <tr
                                    key={idx}
                                    className={`${
                                        idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                    } hover:bg-gray-100`}
                                >
                                    <td className="px-4 md:px-6 py-2">{idx + 1}</td>
                                    <td className="px-4 md:px-6 py-2">{m.name}</td>
                                    <td className="px-4 md:px-6 py-2">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                    m.role === 'Giáo viên'
                                                        ? 'bg-pink-200 text-pink-800'
                                                        : 'bg-green-200 text-green-800'
                                                }`}
                                            >
                                                {m.role}
                                            </span>
                                    </td>
                                    <td className="px-4 md:px-6 py-2">
                                        {m.role === 'Giáo viên' && (
                                            <span className="text-yellow-500 text-sm md:text-base">🔑</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
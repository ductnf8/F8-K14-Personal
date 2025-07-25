'use client'

import {useParams} from 'next/navigation'
import {Button} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import PersonIcon from '@mui/icons-material/Person'
import DescriptionIcon from '@mui/icons-material/Description'

const members = [
    {name: 'Trần Xuân Bằng', role: 'Giáo viên'},
    {name: 'Phạm Thùy Dương', role: 'Học sinh'},
    {name: 'bang', role: 'Học sinh'},
    {name: 'Putin', role: 'Học sinh'},
]

const activities = [
    {title: 'test 1', time: '16-07-2025 09:31:14'},
    {title: 'test bài thi', time: '13-07-2025 09:39:27'},
    {title: 'test5', time: '07-07-2025 02:58:37'},
    {title: 'test 4', time: '07-07-2025 02:35:15'},
    {title: '123123', time: '06-07-2025 09:32:32'},
    {title: 'Thu Thu 5', time: '22-04-2024 06:24:49'},
    {title: 'Thu Thu 4', time: '30-01-2024 09:04:04'},
    {title: 'Thu Lan 3', time: '28-01-2024 10:21:55'},
    {title: 'Thu lan 2', time: '26-01-2024 10:59:23'},
    {title: 'ĐỀ THI LẦN 1', time: '23-01-2024 04:40:21'},
]

export default function ClassDetailPage() {
    const {id} = useParams()

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            {/* Main layout */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                {/* Left content */}
                <div className="xl:col-span-3 space-y-6">
                    {/* Class Info */}
                    <div className="bg-gradient-to-r from-sky-500 to-sky-400 text-white p-6 rounded-xl shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-xl font-bold">Test Thi Thu</h1>
                                <p className="text-sm mt-1">Giáo viên: Trần Xuân Bằng</p>

                                <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<ContentCopyIcon/>}
                                    className="mt-4"
                                    sx={{
                                        borderColor: 'white',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255,255,255,0.1)',
                                            borderColor: 'white',
                                        },
                                    }}
                                >
                                    Sao chép liên kết
                                </Button>
                            </div>

                            {/* Avatars */}
                            <div className="flex space-x-1">
                                {['P', 'B', 'PD', 'TB'].map((txt, i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-8 rounded-full bg-purple-800 text-white flex items-center justify-center text-xs font-semibold border-2 border-white"
                                    >
                                        {txt}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-3">
                            <PersonIcon className="text-sky-500"/>
                            <div>
                                <div className="font-semibold text-gray-800">4 Thành Viên</div>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-3">
                            <DescriptionIcon className="text-sky-500"/>
                            <div>
                                <div className="font-semibold text-gray-800">10 Bài Kiểm Tra</div>
                            </div>
                        </div>
                    </div>

                    {/* Member Table */}
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold text-blue-600 mb-4">Danh sách thành viên</h2>
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="px-2 py-2">No.</th>
                                <th className="px-2 py-2">Họ tên</th>
                                <th className="px-2 py-2">Vị trí</th>
                                <th className="px-2 py-2"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {members.map((m, idx) => (
                                <tr key={idx} className="border-b hover:bg-gray-50">
                                    <td className="px-2 py-2">{idx + 1}</td>
                                    <td className="px-2 py-2">{m.name}</td>
                                    <td className="px-2 py-2">
                      <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                              m.role === 'Giáo viên'
                                  ? 'bg-pink-200 text-pink-800'
                                  : 'bg-green-200 text-green-800'
                          }`}
                      >
                        {m.role}
                      </span>
                                    </td>
                                    <td className="px-2 py-2">
                                        {m.role === 'Giáo viên' && (
                                            <span className="text-yellow-500 text-lg">🔑</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right sidebar */}
                <div className="space-y-4">
                    <div className="bg-white rounded-lg shadow p-4">
                        <h2 className="text-lg font-semibold mb-3">📋 Hoạt động gần đây</h2>
                        <ul className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                            {activities.map((a, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <img
                                        src="/avatar.jpg"
                                        alt="avatar"
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <div className="text-sm">
                                        <div>
                                            Bài thi <span className="font-medium text-blue-600">{a.title}</span> vừa
                                            được tải lên
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">{a.time}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

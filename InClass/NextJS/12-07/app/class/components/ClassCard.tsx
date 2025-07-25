'use client'

import {Box, Typography} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import GroupsIcon from '@mui/icons-material/Groups'

const menuItems = [
    {label: 'Tổng quan', icon: <DashboardIcon fontSize="small"/>, active: true},
    {label: 'Bài thi', icon: <EmojiEventsIcon fontSize="small"/>, active: false},
    {label: 'Thành viên', icon: <GroupsIcon fontSize="small"/>, active: false},
]

export default function ClassCard() {
    return (
        <Box
            className="w-[240px] bg-white h-[calc(100vh-65px)] fixed top-[65px] left-0 flex flex-col justify-between"
        >
            {/* Menu chính */}
            <Box className="pt-8 px-8 space-y-6">
                {menuItems.map((item, idx) => (
                    <Box
                        key={idx}
                        className={`flex items-center gap-3 cursor-pointer text-base font-semibold p-2 rounded ${
                            item.active
                                ? 'text-sky-500 border-r-2 border-sky-500 pr-0'
                                : 'text-black hover:bg-gray-100'
                        }`}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </Box>
                ))}
            </Box>

            {/* Footer */}
            <Box className="text-center text-sm text-gray-500 pb-6 px-4">
                <div className="mt-auto">
                    ©2024 Allrights reserved<br/>
                    <span className="font-medium text-sky-600">BKStar</span><br/>
                    Version 1.3.1
                </div>
            </Box>
        </Box>
    )
}
'use client'

import {Box, Typography, IconButton} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import GroupsIcon from '@mui/icons-material/Groups'
import CloseIcon from '@mui/icons-material/Close'

const menuItems = [
    {label: 'Tổng quan', icon: <DashboardIcon fontSize="small"/>, active: true},
    {label: 'Bài thi', icon: <EmojiEventsIcon fontSize="small"/>, active: false},
    {label: 'Thành viên', icon: <GroupsIcon fontSize="small"/>, active: false},
]

interface ClassCardProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ClassCard({isOpen, onClose}: ClassCardProps) {
    return (
        <Box
            className={`fixed top-[65px] left-0 h-[calc(100vh-65px)] w-full bg-white flex flex-col justify-between transition-transform duration-300 md:transform-none ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 md:w-[240px] md:static md:h-[calc(100vh-65px)] z-50`}
        >
            {/* Nút đóng cho mobile */}
            <Box className="flex justify-end p-2 md:hidden">
                <IconButton onClick={onClose} aria-label="Close sidebar">
                    <CloseIcon/>
                </IconButton>
            </Box>

            {/* Menu chính */}
            <Box className="pt-8 px-8 space-y-6 flex-1">
                {menuItems.map((item, idx) => (
                    <Box
                        key={idx}
                        className={`flex items-center gap-3 cursor-pointer text-base font-semibold p-2 ${
                            item.active
                                ? 'text-sky-500 border-r-3 border-sky-500 pr-0 -mr-8'
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
'use client'

import {useState, useRef, useEffect} from 'react'
import {IconButton, Avatar} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AddIcon from '@mui/icons-material/Add'
import HomeIcon from '@mui/icons-material/Home'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Image from 'next/image'
import {useAuth} from '@/store/authContext'

interface HeaderProps {
    toggleSidebar: () => void;
    isSidebarOpen: boolean;
}

export default function Header({toggleSidebar}: HeaderProps) {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRefDesktop = useRef<HTMLDivElement>(null)
    const dropdownRefMobile = useRef<HTMLDivElement>(null)
    const {logout} = useAuth()

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                (dropdownRefDesktop.current && !dropdownRefDesktop.current.contains(event.target as Node)) &&
                (dropdownRefMobile.current && !dropdownRefMobile.current.contains(event.target as Node))
            ) {
                setDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault()
        console.log('Logout button clicked')
        console.log('Calling logout function...')
        logout()
        setDropdownOpen(false)
    }

    return (
        <header className="w-full min-h-[65px] px-5 py-2 flex items-center justify-between bg-white relative z-50">
            <div className="flex items-center gap-2">
                <IconButton
                    className="md:!hidden"
                    onClick={toggleSidebar}
                    aria-label="Toggle sidebar"
                    disableRipple
                    sx={{
                        '&:hover': {
                            backgroundColor: 'transparent',
                        },
                    }}
                >
                    <MenuIcon/>
                </IconButton>

                <div className="hidden md:flex items-center gap-2">
                    <div className="w-8 h-8 relative">
                        <Image
                            src="/assets/loginbg.jpg"
                            alt="Logo"
                            fill
                            style={{objectFit: 'contain'}}
                        />
                    </div>

                    <div className="flex flex-col">
                        <span className="font-bold leading-none text-[clamp(1.1rem,3vw,1.5rem)]">
                            <span className="text-[#113249]">BK</span>
                            <span className="text-[#FF8E03]">Star</span>
                        </span>
                        <span className="text-xs text-black leading-tight font-semibold">Classroom</span>
                    </div>
                </div>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 md:hidden">
                <span className="font-bold text-[clamp(1.2rem,4vw,1.8rem)] leading-none">
                    <span className="text-[#113249]">BK</span>
                    <span className="text-[#FF8E03]">STAR</span>
                </span>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden md:flex gap-4 mr-6">
                    <button
                        className="flex items-center gap-2 border border-sky-500 text-sky-500 px-5 py-2 rounded-md hover:bg-[#1976d210] transition font-medium text-base cursor-pointer"
                    >
                        <AddIcon fontSize="small"/> Tạo lớp
                    </button>
                    <button
                        className="flex items-center gap-2 text-sky-500 px-5 py-2 rounded-md hover:bg-[#1976d210] transition font-medium text-base cursor-pointer"
                    >
                        <HomeIcon fontSize="small"/> Trang chủ
                    </button>
                </div>

                <div className="hidden md:block relative" ref={dropdownRefDesktop}>
                    <button
                        onClick={() => setDropdownOpen(prev => !prev)}
                        className="flex items-center gap-2 p-1 rounded transition cursor-pointer"
                    >
                        <Avatar alt="Tran Xuan Bang" src="/avatar.jpg"/>
                        <div className="text-left leading-tight">
                            <p className="text-sm font-semibold">Tran Xuan Bang</p>
                            <p className="text-xs text-gray-500">Giáo viên</p>
                        </div>
                        <KeyboardArrowDownIcon
                            className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {dropdownOpen && (
                        <div
                            className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 opacity-0 translate-y-2 transition-all duration-200 ease-in-out"
                            style={{
                                opacity: dropdownOpen ? 1 : 0,
                                transform: dropdownOpen ? 'translateY(0)' : 'translateY(8px)',
                            }}
                        >
                            <button className="w-full text-left px-4 py-3 hover:bg-gray-100 border-b border-gray-200">
                                Thông tin cá nhân
                            </button>
                            <button onClick={handleLogout} className="w-full text-left px-4 py-3 hover:bg-gray-100">
                                Đăng xuất
                            </button>
                        </div>
                    )}
                </div>

                <div className="md:hidden relative" ref={dropdownRefMobile}>
                    <button
                        onClick={() => setDropdownOpen(prev => !prev)}
                        className="p-1 rounded-full transition cursor-pointer"
                    >
                        <Avatar alt="User" src="/avatar.jpg"/>
                    </button>

                    {dropdownOpen && (
                        <div
                            className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 opacity-0 translate-y-2 transition-all duration-200 ease-in-out"
                            style={{
                                opacity: dropdownOpen ? 1 : 0,
                                transform: dropdownOpen ? 'translateY(0)' : 'translateY(8px)',
                            }}
                        >
                            <button className="w-full text-left px-4 py-3 hover:bg-gray-100 border-b border-gray-200">
                                Thông tin cá nhân
                            </button>
                            <button onClick={handleLogout} className="w-full text-left px-4 py-3 hover:bg-gray-100">
                                Đăng xuất
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
'use client'

import {useState} from 'react'
import {Button, IconButton, Menu, MenuItem, Avatar} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Image from 'next/image'

export default function Header() {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)


    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    return (
        <header className="w-full min-h-[65px] shadow-md px-4 py-2 flex items-center justify-between bg-white relative">
            {/* Left section */}
            <div className="flex items-center gap-2">
                {/* Menu icon - only visible on mobile */}
                <IconButton
                    className="md:!hidden"
                    onClick={() => console.log('Open menu')}
                    aria-label="Open menu"
                    disableRipple
                    sx={{
                        '&:hover': {
                            backgroundColor: 'transparent',
                        },
                    }}
                >
                    <MenuIcon/>
                </IconButton>

                {/* Logo - only visible on desktop */}
                <div className="hidden md:flex items-center gap-2">
                    <div className="w-8 h-8 relative">
                        <Image
                            src="/assets/loginbg.jpg"
                            alt="Logo"
                            fill
                            style={{objectFit: 'contain'}}
                        />
                    </div>

                    {/* BKSTAR + Classroom */}
                    <div className="flex flex-col">
                        <span className="font-bold leading-none text-[clamp(1.1rem,3vw,1.5rem)]">
                            <span className="text-[#113249]">BK</span>
                            <span className="text-[#FF8E03]">Star</span>
                        </span>
                        <span className="text-xs text-gray-500 leading-tight">Classroom</span>
                    </div>
                </div>
            </div>

            {/* BKSTAR in the center for mobile */}
            <div className="absolute left-1/2 -translate-x-1/2 md:hidden">
                <span className="font-bold text-[clamp(1.2rem,4vw,1.8rem)] leading-none">
                    <span className="text-[#113249]">BK</span>
                    <span className="text-[#FF8E03]">STAR</span>
                </span>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-4">
                {/* Buttons - desktop only */}
                <div className="hidden md:flex gap-4 mr-6">
                    <Button variant="outlined" size="medium">
                        Tao Lop
                    </Button>
                    <Button variant="text" size="medium">
                        Trang chu
                    </Button>
                </div>

                {/* Avatar + info with menu - desktop only */}
                <div className="hidden md:block">
                    <IconButton
                        aria-label="User menu"
                        className="flex items-center gap-2 p-1"
                        disableRipple
                        sx={{
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                        }}
                    >
                        <Avatar alt="Tran Xuan Bang" src="/avatar.jpg"/>
                        <div className="text-left leading-tight">
                            <p className="text-sm font-semibold">Tran Xuan Bang</p>
                            <p className="text-xs text-gray-500">Giáo viên</p>
                        </div>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                        transformOrigin={{vertical: 'top', horizontal: 'right'}}
                    >
                        <MenuItem onClick={handleMenuClose}>Thông tin chi tiết</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Đăng xuất</MenuItem>
                    </Menu>
                </div>

                {/* Avatar + menu - mobile only */}
                <div className="md:hidden">
                    <IconButton
                        aria-label="User menu"
                        disableRipple
                        sx={{
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                        }}
                    >
                        <Avatar alt="User" src="/avatar.jpg"/>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                        transformOrigin={{vertical: 'top', horizontal: 'right'}}
                    >
                        <MenuItem onClick={handleMenuClose}>Thông tin chi tiết</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Đăng xuất</MenuItem>
                    </Menu>
                </div>
            </div>
        </header>
    )
}
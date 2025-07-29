'use client'

import {ReactNode, useState} from 'react'
import ClassCard from './components/ClassCard'
import Header from './components/Header'

export default function ClassLayout({children}: { children: ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header - fixed */}
            <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}/>

            {/* Layout chia ngang: sidebar + nội dung */}
            <div className="flex">
                {/* Sidebar */}
                <ClassCard isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}/>

                {/* Nội dung chính */}
                <div className="flex-1 px-4 md:px-6 py-4">
                    {children}
                </div>
            </div>
        </div>
    )
}

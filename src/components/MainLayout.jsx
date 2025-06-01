import { useState, useEffect } from 'react'
import Carousel from "./Carousel"
import Footer from "./Footer"
import Header from "./Header"
import SidebarDetail from "./SidebarDetail"
import SidebarMobile from "./SidebarMobile"


const MainLayout = ({ children }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDetailSidebarOpen, setIsDetailSidebarOpen] = useState(false)

    return (
        <>
            <Header
                showDropdown={showDropdown}
                setShowDropdown={setShowDropdown}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
            {isSidebarOpen && !isDetailSidebarOpen && (
                <SidebarMobile
                    setIsSidebarOpen={setIsSidebarOpen}
                    setIsDetailSidebarOpen={setIsDetailSidebarOpen}
                />
            )}
            {isSidebarOpen && isDetailSidebarOpen && (
                <SidebarDetail setIsDetailSidebarOpen={setIsDetailSidebarOpen} />
            )}
            
            {children}
            <Footer />
        </>
    )
}

export default MainLayout
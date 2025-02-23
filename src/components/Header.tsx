'use client'
import React from 'react'
import Link from 'next/link'

const menuItems = [
    {href: '/#about-me', label: 'About Me'},
    {href: '/#experiences', label: 'Experiences'},
    {href: '/#projects', label: 'Projects'},
    {href: '/#contacts', label: 'Contacts'}
]

type IHeaderProps = object
const Header: React.FC<IHeaderProps> = () => {
    /*const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen)
    }

    useEffect(() => {
        if (isDrawerOpen) {
            document.body.classList.add('overflow-hidden')
        } else {
            document.body.classList.remove('overflow-hidden')
        }
    }, [isDrawerOpen])*/

    return (
        <header className="static md:fixed top-0 left-0 right-0 z-50">
            <nav
                className="hidden lg:block max-w-screen-2xl mx-auto px-8 py-8 bg-white/80 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none">
                <div className="flex justify-center items-center lg:justify-end">
                    <span className="font-extrabold text-2xl mr-auto">cipo.</span>
                    <div className="flex space-x-4 lowercase">
                        {menuItems.map(item => (
                            <Link key={item.href} href={item.href}
                                  className="lg:text-lg text-black hover:underline underline-offset-2">
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>
            {/*<div className="w-full px-8 py-8 flex justify-end lg:hidden">
                <button onClick={toggleDrawer}>
                    <Menu width={40} height={40}/>
                </button>
            </div>
            isDrawerOpen && (
                <div
                    className="fixed inset-0 bg-white bg-opacity-75 backdrop-blur-md flex flex-col items-center justify-center z-30">
                    <button onClick={toggleDrawer} className="absolute top-4 right-4 text-black">
                        <X width={40} height={40}/>
                    </button>
                    {menuItems.map(item => (
                        <Link key={item.href} href={item.href} className="text-2xl text-black mb-4"
                              onClick={toggleDrawer}>
                            {item.label}
                        </Link>
                    ))}
                </div>
            )*/}
        </header>
    )
}

export default Header

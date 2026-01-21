import {useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
const Header = () => {
    const token = localStorage.getItem('user');
    const userName = localStorage.getItem('userName');
    const links: string[] = ["Home", "Products", "Categories", "Brands", "Wishlist"];
    const [open, setOpen] = useState<boolean>(false);
    const { data: cart } = useCart()

    const handelMenuBar = (): void =>  {
        setOpen(!open)
    }

    const  logout = (): void => {
        localStorage.removeItem('user')
        localStorage.removeItem('userName')
    }

    return (
        <header className="sticky  top-0 left-0 z-9999 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 border-b shadow-sm w-full flex justify-between items-center mb-8 mx-auto py-3 sm:py-4 px-3 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                <Link to="/" className="flex items-center space-x-2">
                    <motion.h1
                        className="text-xl sm:text-2xl lg:text-3xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        FreshCart
                    </motion.h1>
                </Link>
            </motion.div>
            <nav className="hidden lg:flex">
                <ul className="flex gap-5 text-[18px] font-medium">
                    {links.map((link: string) => (
                        <li key={link}>
                            <NavLink to={link === "Home" ? "/" : link.toLowerCase()}>
                                {({ isActive }) => (
                                    <motion.div
                                        className={`relative px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent"}`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {link}

                                        {/* Active underline */}
                                        {isActive && (
                                            <motion.span
                                                layoutId="activeTab"
                                                className="absolute bottom-0 left-1 right-1 h-0.5 rounded-full bg-primary"
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 500,
                                                    damping: 30,
                                                }}
                                            />
                                        )}
                                    </motion.div>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            {/* Mobile Menu */}
            <div className={`absolute top-14 sm:top-15.5 left-0 w-full lg:hidden overflow-hidden transition-all duration-500 ease-in-out z-50 ${open ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                <nav className="bg-[#ffffff] rounded-lg shadow-inner">
                    <ul className="py-4">
                        {links.map((link: string, index: number) => (
                            <li
                                key={link}
                                className={`transform transition-all duration-300 ${open ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                                    }`}
                                style={{ transitionDelay: `${index * 50}ms` }}
                            >
                                <NavLink to={link === "Home" ? "/" : link.toLowerCase()}
                                    className={({ isActive }) => `w-full text-left block px-6 py-3 text-[18px] font-medium transition-all duration-300 ${isActive ? "text-foreground border-l-4 border-[#212121]" : "text-muted-foreground hover:text-foreground hover:bg-accent"}`}
                                >
                                    {link}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="flex  justify-between w-[50%] lg:w-auto items-center gap-2 sm:gap-5 text-center text-[#5c6c75]">
                {token && <div className="cursor-pointer hover:text-[#000000] transition-colors duration-300">
                    <i className="fa-regular fa-circle-user sm:text-[18px]"></i>
                    <p className="text-[13px] font-medium">{userName}</p>
                </div>}
                {!token ? <Link to="auth/sign-in" className="cursor-pointer hover:text-[#000000] transition-colors duration-300">
                    <i className="fa-regular fa-user sm:text-[18px]"></i>
                    <p className="text-[13px] font-medium">Sign In</p>
                </Link> : <Link to="auth/sign-in" onClick={logout} className="cursor-pointer hover:text-[#000000] transition-colors duration-300">
                    <i className="fa-solid fa-arrow-right-from-bracket sm:text-[18px]"></i>
                    <p className="text-[13px] font-medium" >LogOut</p>
                </Link>}
                <Link to={!token ? "/auth/sign-in" : "cart"} className="relative cursor-pointer hover:text-[#000000] transition-colors duration-300">
                    <i className="fa-solid fa-cart-shopping sm:text-[18px]"></i>
                    <p className="text-[13px] font-medium">Shopping Cart</p>
                    <span className={`${!token && "hidden"} absolute -top-2.5 bg-[#b20c14] text-white font-medium w-5 h-5 leading-5 rounded-lg`}>{cart?.products?.length}</span>
                </Link>
            </div>
            <Button className="w-10 h-10 md:lg:hidden leading-5 cursor-pointer flex items-center justify-center" onClick={handelMenuBar}><i className={`fa-solid fa-${open ? "xmark" : "bars"} sm:text-[18px]`}></i></Button>
        </header>
    )
}

export default Header
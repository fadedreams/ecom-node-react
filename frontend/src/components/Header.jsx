import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from 'react';

const Header = () => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        const { value } = e.target;
        setSearch(value);
        if (value) {
            navigate(`/search?q=${value}`);
        } else {
            navigate('/search');
        }
    };

    return (
        <header className="h-16 shadow-md bg-white fixed w-full z-40">
            <div className="h-full container mx-auto flex items-center px-4 justify-between">
                <Link to="/">
                    <Logo w={90} h={50} />
                </Link>
                {/* Search bar */}
                <div className="hidden lg:flex items-center w-full max-w-sm border rounded-full focus-within:shadow pl-2">
                    <input
                        type="text"
                        placeholder="Search product here..."
                        className="w-full outline-none"
                        onChange={handleSearch}
                        value={search}
                    />
                    <div className="text-lg min-w-[50px] h-8 bg-gray-600 flex items-center justify-center rounded-r-full text-white">
                        <GrSearch />
                    </div>
                </div>
                {/* Icons section */}
                <div className="flex items-center gap-6">
                    <span className="text-2xl cursor-pointer">
                        <FaShoppingCart />
                        <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute top-3 right-7'>
                            <p className='text-sm'>0</p>
                        </div>
                    </span>
                    <div className="text-3xl cursor-pointer relative">
                        <FaRegCircleUser />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

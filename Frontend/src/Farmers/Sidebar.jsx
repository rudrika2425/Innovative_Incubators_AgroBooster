import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Tractor,
    Wrench,
    ShoppingCart,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import { useUser } from '../Context/UserContext';

export const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout, user } = useUser();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/");
    }

    const menuItems = [
        { id: 'Home', icon: LayoutDashboard, label: 'Home', path: '/farmerdashboard' },
        { id: 'yourfarms', icon: Tractor, label: 'Your Farms', path: '/farmerdashboard/your-farms' },
        { id: 'rentouttools', icon: Wrench, label: 'Rent Out Tools', path: '/farmerdashboard/rent-out-tools' },
        { id: 'borowtools', icon: ShoppingCart, label: 'Borrow Tools', path: '/farmerdashboard/borrow-tools' },
    ];

    const renderMenuItem = (item) => (
        <button
            key={item.id}
            onClick={() => {
                navigate(item.path);
                setIsOpen(false);
            }}
            className={`flex items-center w-full px-6 py-3 text-left
                ${location.pathname === item.path
                    ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
        >
            <item.icon className="w-5 h-5 mr-3" />
            <span className="font-medium">{item.label}</span>
        </button>
    );

    return (
        <>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow"
            >
                {isOpen ? <X /> : <Menu />}
            </button>

            <div className={`
                w-64 h-screen bg-white shadow-lg fixed left-0 top-0 
                transform transition-transform duration-300
                md:translate-x-0 
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                flex flex-col z-40
            `}>
                <div className="flex-1">
                    <div className="p-4 flex flex-col items-center">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">AgroBooster</h1>
                        
                        <img 
                            src={user?.profilePicture || "https://img.freepik.com/premium-psd/male-farmer-3d-avatar-isolated-transparent-background-3d-rendering-illustration_986479-585.jpg"} 
                            alt="Profile" 
                            className="w-24 h-24 rounded-full object-cover mb-4"
                        />
                        
                        <div className="text-center">
                            <h2 className="text-2xl font-semibold">{user?.fullname || "Farmer"}</h2>
                        </div>

                        <nav className="w-full mt-8">
                            {menuItems.map(renderMenuItem)}
                        </nav>
                    </div>
                </div>
                
                <div className="p-4">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-6 py-3 text-left text-red-600 hover:bg-red-50 rounded"
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </div>

            {isOpen && (
                <div 
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black opacity-50 md:hidden z-30"
                />
            )}
        </>
    );
};
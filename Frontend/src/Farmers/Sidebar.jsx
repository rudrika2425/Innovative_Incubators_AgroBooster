import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Tractor,
    Wrench,
    ShoppingCart,
    LogOut,
    Menu,
    X,
    Sprout
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
            className={`flex items-center w-full px-6 py-3 text-left rounded-lg transition-all duration-300
                ${location.pathname === item.path
                    ? 'bg-gradient-to-r from-yellow-100 to-lime-50 text-yellow-700 border-r-4 border-yellow-600'
                    : 'text-yellow-800 hover:bg-yellow-50'
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
                className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-lg text-yellow-600"
            >
                {isOpen ? <X /> : <Menu />}
            </button>

            <div className={`
                w-64 h-screen bg-gradient-to-b from-yellow-100 to-yellow-200 shadow-xl fixed left-0 top-0 
                transform transition-transform duration-300
                md:translate-x-0 
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                flex flex-col z-40
            `}>
                <div className="flex-1">
                    <div className="p-6 flex flex-col items-center">
                        <div className="flex items-center gap-2 mb-6">
                            <Sprout className="w-8 h-8 text-yellow-600" />
                            <h1 className="text-3xl font-bold text-yellow-900">AgroBooster</h1>
                        </div>
                        
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-lime-400 rounded-full blur-xl opacity-20"></div>
                            <img 
                                src={user?.profilePicture || "https://img.freepik.com/premium-psd/male-farmer-3d-avatar-isolated-transparent-background-3d-rendering-illustration_986479-585.jpg"} 
                                alt="Profile" 
                                className="relative w-24 h-24 rounded-full object-cover mb-4 border-4 border-white shadow-lg"
                            />
                        </div>
                        
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-semibold text-yellow-900">{user?.fullname || "Farmer"}</h2>
                        </div>

                        <nav className="w-full space-y-2">
                            {menuItems.map(renderMenuItem)}
                        </nav>
                    </div>
                </div>
                
                <div className="p-4">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-6 py-3 text-left text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
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
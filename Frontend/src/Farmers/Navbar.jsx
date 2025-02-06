import React from 'react';
import { User } from 'lucide-react';
import { useUser } from '../Context/UserContext';

export const Navbar = () => {

    const {user} = useUser(); 

    console.log(user.id);

    return (
        <header className="fixed top-0 right-0 left-64 bg-white shadow-sm z-10">
            <div className="flex items-center justify-end px-6 py-3">
                <div className="flex items-center space-x-4">
                    <span className="font-medium text-gray-700">{user.fullname}</span>
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-600" />
                    </div>
                </div>
            </div>
        </header>
    );
};
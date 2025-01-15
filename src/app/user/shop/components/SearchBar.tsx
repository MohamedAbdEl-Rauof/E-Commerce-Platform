import React from 'react';
import {FaSearch} from 'react-icons/fa';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({value, onChange}) => {
    return (
        <div className="mt-8 mb-6">
            <div className="relative max-w-xl mx-auto">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full px-4 py-3 pl-12 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"/>
            </div>
        </div>
    );
};

export default SearchBar;
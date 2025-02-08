import React from 'react';

const MapControls = () => {
    return (
        <>
            {/* Navigation controls */}
            <div className="absolute top-4 right-4 flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
                <button className="p-3 hover:bg-gray-50 transition-colors border-b border-gray-100">
                    <span className="text-gray-600 text-sm font-medium">+</span>
                </button>
                <button className="p-3 hover:bg-gray-50 transition-colors">
                    <span className="text-gray-600 text-sm font-medium">−</span>
                </button>
            </div>

            {/* Compass */}
            <div className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow-lg">
                <div className="w-6 h-6 relative">
                    <div className="absolute inset-0 border-2 border-gray-200 rounded-full"></div>
                    <div
                        className="absolute top-1/2 left-1/2 w-4 h-0.5 bg-red-500 transform -translate-x-1/2 -translate-y-1/2 -rotate-45"></div>
                    <div
                        className="absolute top-1/2 left-1/2 w-4 h-0.5 bg-gray-300 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
                </div>
            </div>

            {/* Scale */}
            <div className="absolute bottom-4 left-4 bg-white rounded-full shadow-lg px-4 py-1">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-0.5 bg-gray-400"></div>
                    <span className="text-xs text-gray-600 font-medium">100m</span>
                </div>
            </div>
        </>
    );
};

export default MapControls;
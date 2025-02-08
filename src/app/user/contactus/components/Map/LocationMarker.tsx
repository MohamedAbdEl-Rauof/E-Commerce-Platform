import React from 'react';
import {FaLocationDot} from 'react-icons/fa6';

const LocationMarker = () => {
    return (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative group">
                {/* Ripple effect */}
                <div className="absolute -inset-4">
                    <div className="w-8 h-8 bg-primary-500/20 rounded-full animate-ping"/>
                </div>

                {/* Marker */}
                <FaLocationDot className="relative text-3xl text-primary-500 animate-bounce"/>

                {/* Info card */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4
                            opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                    <div className="bg-white rounded-xl shadow-lg p-4 w-64">
                        <div className="flex items-start space-x-4">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-semibold text-gray-900">3legant Store</h3>
                                <p className="text-xs text-gray-500 mt-1">234 Arish Haram, Giza, Egypt</p>
                                <div className="mt-2 flex items-center text-xs text-gray-500">
                                    <span className="inline-block w-1 h-1 rounded-full bg-green-500 mr-1"></span>
                                    Open Now
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationMarker;
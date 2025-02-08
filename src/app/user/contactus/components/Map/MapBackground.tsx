import React from 'react';

const MapBackground = () => {
    return (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Decorative circles */}
            <div className="absolute inset-0 overflow-hidden">
                {Array.from({length: 5}).map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white/30"
                        style={{
                            width: `${Math.random() * 200 + 100}px`,
                            height: `${Math.random() * 200 + 100}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            transform: `translate(-50%, -50%)`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default MapBackground;
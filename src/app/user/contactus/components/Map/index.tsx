import React from 'react';
import MapBackground from './MapBackground';
import LocationMarker from './LocationMarker';
import MapControls from './MapControls';

const Map = () => {
    return (
        <div className="relative h-[400px] w-full rounded-xl shadow-lg overflow-hidden">
            <MapBackground/>
            <LocationMarker/>
            <MapControls/>

            {/* Grid overlay */}
            <div className="absolute inset-0 pointer-events-none"
                 style={{
                     backgroundImage: `
                        linear-gradient(to right, rgba(229, 231, 235, 0.1) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(229, 231, 235, 0.1) 1px, transparent 1px)
                    `,
                     backgroundSize: '40px 40px'
                 }}
            />
        </div>
    );
};

export default Map;
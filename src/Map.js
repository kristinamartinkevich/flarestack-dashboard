import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


mapboxgl.accessToken = 'pk.eyJ1Ijoia3Jpc3RpbmFtYXJ0aW5rIiwiYSI6ImNsb3U3MTVmazBobm4yanFkOW1jY2R2c24ifQ.KxLIQK6WRueHi9oTzI54ig';
const Map = ({ flarestacks, onSelectFlarestack }) => {
    const [map, setMap] = useState(null);
    const mapContainerRef = useRef(null);

    const [selectedFlarestack, setSelectedFlarestack] = useState(flarestacks[0]);

    useEffect(() => {
        const initializeMap = () => {
            const newMap = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [-118.993, 35.4465],
                zoom: 12,
            });

            flarestacks.forEach((flarestack, index) => {
                const marker = new mapboxgl.Marker()
                    .setLngLat([parseFloat(flarestack.longitude), parseFloat(flarestack.latitude)])
                    .addTo(newMap)
                    .setPopup(new mapboxgl.Popup().setHTML(`<h2>${flarestack.flare_stack_name}</h2>`))
                    .getElement()
                    .addEventListener('click', () => handleMarkerClick(flarestack));
            });

            setMap(newMap);
        };

        const handleMarkerClick = (flarestack) => {
            setSelectedFlarestack(flarestack);
            onSelectFlarestack(flarestack);
        };

        initializeMap();

        return () => {
            if (map) {
                map.remove();
            }
        };
    }, [flarestacks, onSelectFlarestack]);
    return <div id="map" className="map-container" ref={mapContainerRef} />;
};

export default Map;

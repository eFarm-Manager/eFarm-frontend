// Obviously we need react and some goodies
import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

// Here's our Mapbox imports
import L from 'leaflet';

export const MapComponent = ({ onMapClick }) => {
  const mapContainerRef = useRef(null);
  const map = useRef(null);
  //starting coordinates
  const [lng] = useState(20.00);
  const [lat] = useState(52.05);
  const [zoom] = useState(6); // starting zoom
  useEffect(() => {
	if (!map.current) {
            map.current = L.map(mapContainerRef.current, {
	}).setView([lat, lng], zoom);

            // Add base tile layer
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
		maxNativeZoom:19, // need this line for zoom >19 to work
		maxZoom:20 // making max zoom on map 20
            }).addTo(map.current);

            // Add WMS layer
	const wmsLayer = L.tileLayer.wms("https://integracja02.gugik.gov.pl/cgi-bin/KrajowaIntegracjaEwidencjiGruntow?", {
		request:'GetMap',
	        layers: 'dzialki,numery_dzialek,budynki', // Specify the layers to display, comma-separated
		format: 'image/png',
                transparent: true,
                version: '1.1.1',
                srs: 'EPSG:2180', // Specify the coordinate reference system
		maxZoom:20, //making max zoom on map 20
		tileSize: 750, // sending tileSize x tileSize request(height, width)
            });
            wmsLayer.addTo(map.current); // Add WMS layer to the map
        map.current.on('click', (e) => {
        const latitude = e.latlng.lat;
        const longitude = e.latlng.lng;

        // Get map size for width and height
        const width = map.current.getSize().x;
        const height = map.current.getSize().y;
        // Get the map bounds (BBOX)
	
  const bounds = map.current.getBounds();
  const minLng = bounds.getWest();
  const minLat = bounds.getSouth();
  const maxLng = bounds.getEast();
  const maxLat = bounds.getNorth();

  // Create the BBOX string
  const bbox = `${minLng},${minLat},${maxLng},${maxLat}`;
        // Calculate I and J based on the clicked lat/lng and the current map view

        const point = map.current.latLngToContainerPoint(e.latlng);
        const i = Math.floor(point.x);
        const j = Math.floor(point.y);

        // Call the function passed from the parent component
        onMapClick({  i, j, width, height, bbox, latitude, longitude});
      });
	}

        // Cleanup function to remove the map on unmount
        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null; // Reset the reference to allow re-initialization if needed
            }
        };
    }, [lat, lng, zoom, onMapClick]);
  return <div ref={mapContainerRef} style={{ height: '750px', width: '120%' }} />;
};

MapComponent.propTypes = {
    onMapClick: PropTypes.func.isRequired,
};
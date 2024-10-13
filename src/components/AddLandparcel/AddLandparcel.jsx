import { useState } from 'react';
import { MapComponent } from './Map';
import { ParcelForm } from './AddLandparcelForm';
import './AddLandparcel.css'; // Make sure this CSS file is imported
import { parseXmlResponse } from '../helpers/parseXmlResponse';	
const AddLandparcel = () => {
const [selectedParcel, setSelectedParcel] = useState(null);

// Handle map clicks
const handleMapClick = async ({ i, j, width, height, bbox, latitude, longitude }) => {
  const wmsUrl = `https://integracja.gugik.gov.pl/cgi-bin/KrajowaIntegracjaEwidencjiGruntow?service=WMS&version=1.1.1&request=GetFeatureInfo&layers=dzialki,numery_dzialek,budynki&query_layers=dzialki,numery_dzialek,budynki&transparency=true&format=image/png&info_format=text/xml&srs=EPSG:4326&bbox=${bbox}&width=${width}&height=${height}&x=${i}&y=${j}`;

  try {
    const response = await fetch(wmsUrl);
    const data = await response.text(); // Use .text() for XML response
	const parsedData = parseXmlResponse(data);
	const combinedData = {
	...parsedData,
	additionalInfo: {
	latitude,
	longitude,
	}
	};
    console.log(combinedData);
    setSelectedParcel(combinedData);
  } catch (error) {
    console.error('Error fetching WMS data:', error);
  }
};
return (
  <div className="parcel-container">
    <div className="form-wrapper">
      <ParcelForm parcelData={selectedParcel} onChange={setSelectedParcel} />
    </div>
    <div className="map-wrapper">
      <MapComponent onMapClick={handleMapClick} />
    </div>
  </div>
);
};

export default AddLandparcel;

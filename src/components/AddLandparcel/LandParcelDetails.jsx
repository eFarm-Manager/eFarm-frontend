import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../AuthContext.jsx';
import './LandParcelDetails.css';

const LandParcelDetails = () => {
    const { id } = useParams();
    const [parcelDetails, setParcelDetails] = useState(null);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/sign-in');
            return;
        }

        fetchParcelDetails();
    }, [isAuthenticated, id, navigate]);

    const fetchParcelDetails = async () => {
        try {
            // Replace the URL below with your backend API endpoint
            const response = await fetch(`/api/landparcel/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`Error fetching parcel details: ${response.statusText}`);
            }

            const data = await response.json();
            setParcelDetails(data);
        } catch (error) {
            console.error('Error fetching parcel details:', error);
        }
    };

    if (!parcelDetails) {
        return <p>Ładowanie szczegółów działki...</p>;
    }

    return (
        <div>
            <h3>Szczegóły działki</h3>
            <p><strong>Nazwa:</strong> {parcelDetails.name}</p>
            <p><strong>Gmina:</strong> {parcelDetails.commune}</p>
            <p><strong>Numer działki:</strong> {parcelDetails.landparcelNumber}</p>
            <p><strong>Powierzchnia:</strong> {parcelDetails.area} ha</p>
            <p><strong>Status własności:</strong> {parcelDetails.landOwnershipStatus}</p>
            <p><strong>Województwo:</strong> {parcelDetails.voivodeship}</p>
            <p><strong>Powiat:</strong> {parcelDetails.district}</p>
            <p><strong>Numer geodezyjny:</strong> {parcelDetails.geodesyRegistrationDistrictNumber}</p>
            <p><strong>Szerokość geograficzna:</strong> {parcelDetails.latitude}</p>
            <p><strong>Długość geograficzna:</strong> {parcelDetails.longitude}</p>
            <button onClick={() => navigate(-1)} className="action-button">Powrót</button>
        </div>
    );
};

export default LandParcelDetails;

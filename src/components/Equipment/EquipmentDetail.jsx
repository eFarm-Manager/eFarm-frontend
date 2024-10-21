import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import PropTypes from 'prop-types';

const EquipmentDetail = ({ onLogout }) => {
    const { id } = useParams();
    const [equipmentData, setEquipmentData] = useState(null);
    const [userRole, setUserRole] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedRoles = sessionStorage.getItem('roles');
        const username = sessionStorage.getItem('username');

        setUsername(username);

        if (!username || !storedRoles) {
            navigate('/sign-in');
            return;
        }

        const roles = JSON.parse(storedRoles);

        if (roles.includes('ROLE_FARM_MANAGER') || roles.includes('ROLE_FARM_OWNER')) {
            setUserRole('MANAGER_OR_OWNER');
        } else {
            navigate('/not-authorized');
            return;
        }

        fetchEquipmentDetail();
    }, []);

    const fetchEquipmentDetail = async () => {
        try {
            const response = await fetch(`/api/equipment/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setEquipmentData(data);
            } else {
                console.error('Failed to fetch equipment details');
            }
        } catch (error) {
            console.error('Error fetching equipment details:', error);
        }
    };

    if (!equipmentData) {
        return (
            <div>
                <Navbar onLogout={onLogout} userRole={userRole} username={username} />
                <div style={{ padding: '20px' }}>
                    <p>Loading equipment details...</p>
                </div>
            </div>
        );
    }

    const {
        equipmentName,
        category,
        brand,
        model,
        power,
        capacity,
        workingWidth,
        insurancePolicyNumber,
        insuranceExpirationDate,
        inspectionExpireDate,
    } = equipmentData;

    return (
        <div>
            <Navbar onLogout={onLogout} userRole={userRole} username={username} />
            <div style={{ padding: '20px' }}>
                <h2>Szczegóły Sprzętu</h2>
                <div>
                    <p>
                        <strong>Nazwa Sprzętu:</strong> {equipmentName}
                    </p>
                    <p>
                        <strong>Kategoria:</strong> {category}
                    </p>
                    <p>
                        <strong>Marka:</strong> {brand}
                    </p>
                    <p>
                        <strong>Model:</strong> {model}
                    </p>
                    {power !== null && (
                        <p>
                            <strong>Moc:</strong> {power}
                        </p>
                    )}
                    {capacity !== null && (
                        <p>
                            <strong>Pojemność:</strong> {capacity}
                        </p>
                    )}
                    {workingWidth !== null && (
                        <p>
                            <strong>Szerokość Robocza:</strong> {workingWidth}
                        </p>
                    )}
                    {insurancePolicyNumber !== null && (
                        <p>
                            <strong>Numer Polisy Ubezpieczeniowej:</strong> {insurancePolicyNumber}
                        </p>
                    )}
                    {insuranceExpirationDate !== null && (
                        <p>
                            <strong>Data Wygaśnięcia Ubezpieczenia:</strong> {insuranceExpirationDate}
                        </p>
                    )}
                    {inspectionExpireDate !== null && (
                        <p>
                            <strong>Data Wygaśnięcia Przeglądu:</strong> {inspectionExpireDate}
                        </p>
                    )}
                </div>
                <button onClick={() => navigate('/equipment')}>Powrót do listy sprzętu</button>
            </div>
        </div>
    );
};

EquipmentDetail.propTypes = {
    onLogout: PropTypes.func.isRequired,
};

export default EquipmentDetail;

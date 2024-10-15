// components/FarmDetails/FarmDetails.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import PropTypes from 'prop-types';

const FarmDetails = ({ onLogout }) => {
    const [farmData, setFarmData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        farmName: '',
        farmNumber: '',
        feedNumber: '',
        sanitaryRegisterNumber: '',
        street: '',
        buildingNumber: '',
        zipCode: '',
        city: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
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
            setUserRole('OTHER_ROLE');
        }
        fetchFarmDetails();
    }, [navigate]);

    const fetchFarmDetails = async () => {
        try {
            const response = await fetch('/api/farm/details', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setFarmData(data);
                setFormData({
                    farmName: data.farmName || '',
                    farmNumber: data.farmNumber || '',
                    feedNumber: data.feedNumber || '',
                    sanitaryRegisterNumber: data.sanitaryRegisterNumber || '',
                    street: data.street || '',
                    buildingNumber: data.buildingNumber || '',
                    zipCode: data.zipCode || '',
                    city: data.city || ''
                });
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Failed to fetch farm details.');
            }
        } catch (error) {
            setErrorMessage(`Error: ${error.message}`);
        }
    };
    const toggleEditMode = () => {
        setEditMode(!editMode);
        setSuccessMessage('');
        setErrorMessage('');
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCancelEdit = () => {
        setFormData({
            farmName: farmData.farmName || '',
            farmNumber: farmData.farmNumber || '',
            feedNumber: farmData.feedNumber || '',
            sanitaryRegisterNumber: farmData.sanitaryRegisterNumber || '',
            street: farmData.street || '',
            buildingNumber: farmData.buildingNumber || '',
            zipCode: farmData.zipCode || '',
            city: farmData.city || ''
        });
        setEditMode(false);
        setSuccessMessage('');
        setErrorMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await fetch('/api/farm/details', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccessMessage('Farm details updated successfully.');
                setFarmData({
                    ...farmData,
                    ...formData,
                });
                setEditMode(false);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Failed to update farm details.');
            }
        } catch (error) {
            setErrorMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <Navbar onLogout={onLogout} userRole={userRole} username={username} />
            <div style={{ padding: '20px' }}>
                <h2>Farm Details</h2>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                {farmData ? (
                    editMode ? (
                        // Edit Mode Form
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Farm Name:</label>
                                <input
                                    type="text"
                                    name="farmName"
                                    value={formData.farmName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label>Farm Number:</label>
                                <input
                                    type="text"
                                    name="farmNumber"
                                    value={formData.farmNumber}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label>Feed Number:</label>
                                <input
                                    type="text"
                                    name="feedNumber"
                                    value={formData.feedNumber}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label>Sanitary Register Number:</label>
                                <input
                                    type="text"
                                    name="sanitaryRegisterNumber"
                                    value={formData.sanitaryRegisterNumber}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label>Street:</label>
                                <input
                                    type="text"
                                    name="street"
                                    value={formData.street}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label>Building Number:</label>
                                <input
                                    type="text"
                                    name="buildingNumber"
                                    value={formData.buildingNumber}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label>ZIP Code:</label>
                                <input
                                    type="text"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label>City:</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button type="submit">Save Changes</button>
                            <button type="button" onClick={handleCancelEdit}>
                                Cancel
                            </button>
                        </form>
                    ) : (
                        // View Mode
                        <div>
                            <p>
                                <strong>Farm Name:</strong> {farmData.farmName}
                            </p>
                            <p>
                                <strong>Farm Number:</strong> {farmData.farmNumber}
                            </p>
                            <p>
                                <strong>Feed Number:</strong> {farmData.feedNumber}
                            </p>
                            <p>
                                <strong>Sanitary Register Number:</strong> {farmData.sanitaryRegisterNumber}
                            </p>
                            <p>
                                <strong>Street:</strong> {farmData.street}
                            </p>
                            <p>
                                <strong>Building Number:</strong> {farmData.buildingNumber}
                            </p>
                            <p>
                                <strong>ZIP Code:</strong> {farmData.zipCode}
                            </p>
                            <p>
                                <strong>City:</strong> {farmData.city}
                            </p>
                            {userRole === 'MANAGER_OR_OWNER' && farmData.expireCodeDate && (
                                <p>
                                    <strong>Activation Code Expires On:</strong> {farmData.expireCodeDate}
                                </p>
                            )}
                            {userRole === 'MANAGER_OR_OWNER' && (
                                <button onClick={toggleEditMode}>Edit Farm Details</button>
                            )}
                            {/*<button onClick={() => navigate('/change-password')}>Zmień hasło</button>*/}
                        </div>
                    )
                ) : (
                    <p>Loading farm details...</p>
                )}
            </div>
        </div>
    );
};
FarmDetails.propTypes = {
    onLogout: PropTypes.func.isRequired,
};

export default FarmDetails;
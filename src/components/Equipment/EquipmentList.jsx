import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import PropTypes from 'prop-types';

const EquipmentList = ({ onLogout }) => {
    const [equipmentList, setEquipmentList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
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
        fetchEquipmentList('');
    }, []);

    const fetchEquipmentList = async (query) => {
        try {
            const url = query.length >= 3 ? `/api/equipment/all?searchQuery=${encodeURIComponent(query)}` : '/api/equipment/all';
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setEquipmentList(data);
            } else {
                console.error('Failed to fetch equipment list');
            }
        } catch (error) {
            console.error('Error fetching equipment list:', error);
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length >= 3 || query.length === 0) {
            fetchEquipmentList(query);
        }
    };

    const handleEquipmentClick = (equipmentId) => {
        navigate(`/equipment/${equipmentId}`);
    };

    return (
        <div>
            <Navbar onLogout={onLogout} userRole={userRole} username={username} />
            <div style={{ padding: '20px' }}>
                <h2>Lista Sprzętu</h2>
                <input
                    type="text"
                    placeholder="Wyszukaj (minimum 3 znaki)"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{ width: '100%', padding: '8px', marginBottom: '20px' }}
                />
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                    <tr>
                        <th style={tableHeaderStyle}>Nazwa Sprzętu</th>
                        <th style={tableHeaderStyle}>Kategoria</th>
                        <th style={tableHeaderStyle}>Marka</th>
                        <th style={tableHeaderStyle}>Model</th>
                    </tr>
                    </thead>
                    <tbody>
                    {equipmentList.map((equipment) => (
                        <tr
                            key={equipment.id}
                            style={{cursor: 'pointer'}}
                            onClick={() => handleEquipmentClick(equipment.id)}
                        >
                            <td style={tableCellStyle} data-label="Nazwa Sprzętu">
                                {equipment.equipmentName}
                            </td>
                            <td style={tableCellStyle} data-label="Kategoria">
                                {equipment.category}
                            </td>
                            <td style={tableCellStyle} data-label="Marka">
                                {equipment.brand}
                            </td>
                            <td style={tableCellStyle} data-label="Model">
                                {equipment.model}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const tableHeaderStyle = {
    borderBottom: '2px solid #ddd',
    padding: '8px',
    textAlign: 'left',
};

const tableCellStyle = {
    borderBottom: '1px solid #ddd',
    padding: '8px',
};

EquipmentList.propTypes = {
    onLogout: PropTypes.func.isRequired,
};

export default EquipmentList;

import { useState } from 'react';
import { ParcelForm } from './AddLandparcelForm';
import './AddLandparcel.css';
import PropTypes from 'prop-types';

const EditLandparcel = ({ onClose, parcelData }) => {
    const [selectedParcel, setSelectedParcel] = useState({
        landOwnershipStatus: parcelData.landOwnershipStatus || 'STATUS_PRIVATELY_OWNED',
        name: parcelData.name || '',
        longitude: parcelData.longitude || '',
        latitude: parcelData.latitude || '',
        area: parcelData.area || ''
    });

    const handleSubmit = async () => {
        const longitude = parseFloat(selectedParcel.longitude);
        const latitude = parseFloat(selectedParcel.latitude);
        const area = parseFloat(selectedParcel.area);
        const name = selectedParcel.name || '';
        const landOwnershipStatus = selectedParcel.landOwnershipStatus || 'STATUS_PRIVATELY_OWNED';

        if (isNaN(longitude) || isNaN(latitude) || isNaN(area)) {
            alert('Proszę wprowadzić poprawne wartości liczbowe dla długości, szerokości i powierzchni.');
            return;
        }

        const formData = {
            landOwnershipStatus,
            name,
            longitude,
            latitude,
            area
        };

        try {
          const response = await fetch(`/api/landparcel/${parcelData.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(formData),
          });

          if (response.ok) {
            onClose();
          } else {
            console.error('Failed to update parcel');
          }
        } catch (error) {
          console.error('Error updating parcel:', error);
        }

    };

    const fieldLabels = {
        landOwnershipStatus: 'Status własności',
        name: 'Nazwa',
        longitude: 'Długość geograficzna',
        latitude: 'Szerokość geograficzna',
        area: 'Pole pow. w ewidencji gruntów (ha)'
    };

    return (
        <div style={modalStyle}>
            <div style={modalContentStyle}>
                <h3>Edytuj Działkę</h3>
                <div className="parcel-container">
                    <div className="form-wrapper">
                        <ParcelForm parcelData={selectedParcel} onChange={setSelectedParcel} isEditMode={true} fieldLabels={fieldLabels}/>
                        {selectedParcel && (
                            <div style={{ marginTop: '20px' }}>
                                <button onClick={handleSubmit} className="form-submit-button">
                                    Zapisz Zmiany
                                </button>
                                <button onClick={onClose} className="form-cancel-button" style={{ marginLeft: '10px' }}>
                                    Anuluj
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const modalContentStyle = {
    backgroundColor: 'white',
    padding: '20px',
    width: '90%',
    maxHeight: '90%',
    overflowY: 'auto',
};

EditLandparcel.propTypes = {
    onClose: PropTypes.func.isRequired,
    parcelData: PropTypes.object.isRequired,
};

export default EditLandparcel;

import PropTypes from 'prop-types';
import './AddLandparcelForm.css';

export function ParcelForm({ parcelData, onChange, isEditMode }) {
    if (!parcelData) {
        return <p>Wybierz działkę, aby wyświetlić jej szczegóły.</p>;
    }
    const fieldLabels = {
        'Identyfikator działki': 'Identyfikator działki',
        'landOwnershipStatus': 'Status Własności',
        'name': 'Nazwa',
        'Województwo': 'Województwo',
        'Powiat': 'Powiat',
        'Gmina': 'Gmina',
        'Obręb': 'Numer Obrębu Ewidencyjnego',
        'Numer działki': 'Numer działki',
        'longitude': 'Długość geograficzna',
        'latitude': 'Szerokość geograficzna',
        'Pole pow. w ewidencji gruntów (ha)': 'Pole pow. w ewidencji gruntów (ha)',
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange({ ...parcelData, [name]: value });
    };

    // Lista pól, które mają być edytowalne w trybie edycji
    const editableFieldsInEditMode = [
        'landOwnershipStatus',
        'name',
        'longitude',
        'latitude',
        'Pole pow. w ewidencji gruntów (ha)',
    ];

    // Funkcja pomocnicza do określenia, czy pole jest edytowalne
    const shouldFieldBeRendered = (fieldName) => {
        if (isEditMode) {
            // W trybie edycji wyświetlamy tylko pola, które są edytowalne
            return editableFieldsInEditMode.includes(fieldName);
        }
        // W trybie "nie edycji" (np. dodawania) wyświetlamy wszystkie pola
        return true;
    };

    const renderField = (fieldName, type = 'text', isSelect = false, options = []) => {
        if (!shouldFieldBeRendered(fieldName)) return null;

        const label = fieldLabels[fieldName] || fieldName;
        const readOnly = isEditMode && !editableFieldsInEditMode.includes(fieldName);
        const value = parcelData[fieldName] || '';

        if (isSelect) {
            return (
                <div key={fieldName}>
                    <label>{label}:</label>
                    <select
                        name={fieldName}
                        value={value}
                        onChange={handleChange}
                        disabled={readOnly}
                    >
                        {options.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
            );
        }

        return (
            <div key={fieldName}>
                <label>{label}:</label>
                <input
                    type={type}
                    name={fieldName}
                    value={value}
                    onChange={handleChange}
                    readOnly={readOnly}
                />
            </div>
        );
    };

    return (
        <form>
            {renderField('Identyfikator działki')}
            {renderField('landOwnershipStatus', 'text', true, [
                {value: 'STATUS_PRIVATELY_OWNED', label: 'Własność Prywatna'},
                {value: 'STATUS_LEASE', label: 'Dzierżawa'},
            ])}
            {renderField('name')}
            {renderField('Województwo')}
            {renderField('Powiat')}
            {renderField('Gmina')}
            {renderField('Obręb')}
            {renderField('Numer działki')}
            {renderField('longitude')}
            {renderField('latitude')}
            {renderField('Pole pow. w ewidencji gruntów (ha)')}
        </form>
    );
}

ParcelForm.propTypes = {
    parcelData: PropTypes.shape({
        'Identyfikator działki': PropTypes.string,
        landOwnershipStatus: PropTypes.string,
        name: PropTypes.string,
        'Województwo': PropTypes.string,
        'Powiat': PropTypes.string,
        'Gmina': PropTypes.string,
        'Obręb': PropTypes.string,
        'Numer działki': PropTypes.string,
        longitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        latitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        'Pole pow. w ewidencji gruntów (ha)': PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    onChange: PropTypes.func.isRequired,
    isEditMode: PropTypes.bool.isRequired,
};

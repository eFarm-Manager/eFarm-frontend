export function ParcelForm({ parcelData, onChange }) {
  if (!parcelData) {
    return <p>Select a parcel to view its details.</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...parcelData, [name]: value });
  };

  return (
    <form>
	<div>
		<label> identyfikator dzialki:</label>
		<input
		type="text"
		name="iden_dzialki"
		value={parcelData["Identyfikator działki"]}
		onChange={handleChange}
		/>
	</div>
      <div>
        <label>Land Ownership Status:</label>
        <input
          type="text"
          name="status"
          value={parcelData.landOwnershipStatus}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Wojewodztwo:</label>
        <input
          type="text"
          name="voivodeship"
          value={parcelData["Województwo"]}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>powiat:</label>
        <input
          type="text"
          name="district"
          value={parcelData["Powiat"]}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>gmina:</label>
        <input
          type="text"
          name="commune"
          value={parcelData["Gmina"]}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Numer okregu rejestracyjnego:</label>
        <input
          type="text"
          name="Numer okręgu rejestracyjnego"
          value={parcelData["Obręb"]}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>numer dzialki:</label>
        <input
          type="text"
          name="Numer działki"
          value={parcelData["Numer działki"]}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Longitude:</label>
        <input
          type="number"
          name="longitude"
          value={parcelData.additionalInfo.longitude}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Latitude:</label>
        <input
          type="number"
          name="latitude"
          value={parcelData.additionalInfo.latitude}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Area:</label>
        <input
          type="number"
          name="area"
          value={parcelData["Pole pow. w ewidencji gruntów (ha)"]}
          onChange={handleChange}
        />
      </div>
    </form>
  );
}

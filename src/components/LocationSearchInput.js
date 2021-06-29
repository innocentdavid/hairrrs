import React, { useEffect, useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

function LocationSearchInput ({ setLocation }) {
  const [address, setAddress] = useState('')
  const [cordinates, setCordinates] = useState({
    lat: null,
    lng: null
  })

  // handleChange = address => {
  //   this.setState({ address });
  // };

  const handleSelect = async value => {
    const r = await geocodeByAddress(address)
    const ll = await getLatLng(r[0])
    console.log(ll)
    setAddress(value)
    setCordinates(ll )
  };

  useEffect(() => {
    if(address){
      console.log(address)
      setLocation(address)
    }
  }, [address, setLocation])

  useEffect(() => {
    if(cordinates){
      console.log(cordinates)
    }
  }, [cordinates])

    return (
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
  export default LocationSearchInput
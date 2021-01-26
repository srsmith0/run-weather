import React, { useState } from 'react'

const GetLocation = () => {
  const [ zipcode, setZipcode ] = useState("");
  const [ latitude, setLatitude ] = useState("");
  const [ longitude, setLongitude ] = useState("");

  const getUserLocation = () => {
    const status = document.querySelector('#status');
  
    function success(position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);

      status.textContent = '';
      console.log(latitude, longitude)

    }
  
    function error() {
      status.textContent = 'Unable to retrieve your location';
    }
  
    if(!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
      status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
  
  }

  return (
    <>
    <button onClick={getUserLocation}>
      Use My Location
    </button>
    <p id = "status"></p>
    <p>OR</p>
    <form>
      <label htmlFor='zipcode'>Zipcode</label>
      <input name='zipcode' value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
      <button>Submit</button>
    </form>
    </>
  )
}

export default GetLocation;
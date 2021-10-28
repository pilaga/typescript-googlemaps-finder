import axios from 'axios';

//form elements
const form = document.querySelector('form')! as HTMLFormElement;
const addressInput = document.getElementById('address')! as HTMLInputElement;
const GOOGLE_API_KEY = 'AIzaSyA30vELYQ2QzH5iNpFRmxRhR7OtjG2heZk';

type GoogleGeocodingResponse = {
    results: { geometry : { location: { lat: number, lng: number}}}[];
    status: 'OK' | 'ZERO_RESULTS';
}

function submitHandler(event: Event) {
    event.preventDefault();

    const enteredAddress = encodeURI(addressInput.value);
    console.log('input: ' + enteredAddress);

    //send this to google's API
    axios
    .get<GoogleGeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${enteredAddress}&key=${GOOGLE_API_KEY}`)
    .then(response => {
        if(response.data.status != 'OK') {
            throw new Error('could not fetch location');
        }        
        const coords = response.data.results[0].geometry.location;
    }).catch(error => {
        console.log(error);
    })
}

form.addEventListener('submit', submitHandler);
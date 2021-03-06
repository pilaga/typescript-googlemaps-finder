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
        
        console.log(response);
        const coords = response.data.results[0].geometry.location;

        //create map
        const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
            center: coords,
            zoom: 11,
          });

        //create marker;
        const marker = new google.maps.Marker({position: coords, map: map});

    }).catch(error => {
        console.log(error);
    })
}

form.addEventListener('submit', submitHandler);
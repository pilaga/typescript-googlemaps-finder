//
const form = document.querySelector('form')! as HTMLFormElement;
const addressInput = document.getElementById('address')! as HTMLInputElement;

function submitHandler(event: Event) {
    event.preventDefault();

    const enteredAddress = addressInput.value;
    console.log('input: ' + enteredAddress);

    //send this to google's API
}

form.addEventListener('submit', submitHandler);
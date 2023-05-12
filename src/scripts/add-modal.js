
const openModalBtn = document.getElementById('btn-add');
const editButton = document.getElementById('btn-edit');
const modal = document.getElementById('add-modal');
const closeBtn = modal.querySelector('.close');
const messageStatus = modal.querySelector('.operation-status');
const inputName = document.getElementById('nameInput');
const confirmButton = document.getElementById('btn-confirm');
const url = 'http://localhost:8080/rocket/'


var containerII = document.getElementById('rocket-div');

let idSelectedII = null;

function operationOnRocket(rocketName, httpMethod, id='') {
    const postData = {
        name: rocketName,
    };

    const options = {
        method: httpMethod,
        headers: {
            'Content-Type': 'application/json',
            // Add any other headers if required
        },
        body: JSON.stringify(postData),
    };

    fetch(url+id, options)
        .then(response => {
            if (response.ok) {
                // The request was successful
                return response.json(); // Parse the response body as JSON
            } else {
                // The request failed
                throw new Error('Request failed');
            }
        })
        .then(data => {
            // Handle the response data
            console.log(data);
        })
        .catch(error => {
            // Handle the error or display an error message to the user
            console.error(error);
        });
}


// Open the modal
openModalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

editButton.addEventListener('click', () => {
    modal.style.display = 'block';
});


// Close the modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close the modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

inputName.addEventListener('focus', () => {
    console.log('Input clicked and focused');
    messageStatus.textContent = '';
});

function handleCreateRocket() {
    if (inputName.value.trim() !== '') {
        operationOnRocket(inputName.value.trim(), 'POST');

        inputName.value = '';
        messageStatus.textContent = 'Rocket Created with success';
    }
    else {
        messageStatus.textContent = 'Please enter a valid name';

    }
}

function handleUpdateRocket() {
    if (inputName.value.trim() !== '') {
        operationOnRocket(inputName.value.trim(), 'PUT', idSelectedII);

        inputName.value = '';
        messageStatus.textContent = 'Rocket updated with success';
    }
    else {
        messageStatus.textContent = 'Please enter a valid name';

    }
}


// Event handler for container click event
function handleContainerClick(event) {
    const clickedElement = event.target;
  
    // Check if the clicked element is a dynamic content element
    if (clickedElement.matches('#rocket-div div')) {
      const contentId = clickedElement.dataset.id;
      console.log(`Dynamic content with ID ${contentId} was clicked. -> ${clickedElement.childNodes[0]}`);
      idSelectedII = contentId;
      for (child of container.children){
        if (child.classList.contains('flex-item-selected'))
          child.classList.remove('flex-item-selected')
      }
      clickedElement.classList.add('flex-item-selected');
    }
  }
containerII.addEventListener('click', handleContainerClick);

confirmButton.addEventListener('click', () => {
    console.log(idSelectedII);
    if (idSelectedII != null)
        handleUpdateRocket();
    else
        handleCreateRocket();

    containerII.innerHTML = '';
});

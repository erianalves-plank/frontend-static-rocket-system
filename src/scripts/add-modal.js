
const addButton = document.getElementById('btn-add');
const editButton = document.getElementById('btn-edit');

const modal = document.getElementById('add-modal');
const closeBtn = modal.querySelector('.close');
const messageStatus = modal.querySelector('.operation-status');
const titleModal = modal.querySelector('h2');

const inputName = document.getElementById('nameInput');
const confirmButton = document.getElementById('btn-confirm');

const url_II = 'http://localhost:8080/rocket/'


var containerII = document.getElementById('rocket-div');

var idSelectedII = null;

function operationOnRocket(rocketName, httpMethod, id = '') {
    const postData = {
        name: rocketName,
    };
    const options = {
        method: httpMethod,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    };

    fetch(url_II + id, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Request failed');
            }
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
}


addButton.addEventListener('click', () => {
    titleModal.textContent = 'Create a new rocket';
    messageStatus.textContent = '';
    modal.style.display = 'block';
});

editButton.addEventListener('click', () => {
    titleModal.textContent = 'Update a rocket';
    messageStatus.textContent = '';
    modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {

    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

inputName.addEventListener('focus', () => {
    messageStatus.textContent = '';
});

function handleRocketOperation(method, id = '') {
    const rocketName = inputName.value.trim();

    if (rocketName !== '') {
        operationOnRocket(rocketName, method, id);
        inputName.value = '';
        messageStatus.textContent = (method === 'POST') ? 'Rocket created with success' : 'Rocket updated with success';
    } else {
        messageStatus.textContent = 'Please enter a valid name';
    }
}

function handleCreateRocket() {
    handleRocketOperation('POST');
}

function handleUpdateRocket() {
    handleRocketOperation('PUT', idSelectedII);
}

function handleContainerClick(event) {
    const clickedElement = event.target;

    if (clickedElement.matches('#rocket-div div')) {
        const contentId = clickedElement.dataset.id;
        idSelectedII = contentId;
        for (child of container.children) {
            if (child.classList.contains('flex-item-selected'))
                child.classList.remove('flex-item-selected')
        }
        clickedElement.classList.add('flex-item-selected');
    }
}
containerII.addEventListener('click', handleContainerClick);

confirmButton.addEventListener('click', () => {
    if (idSelectedII != null)
        handleUpdateRocket();
    else
        handleCreateRocket();

    containerII.innerHTML = '';
    idSelectedII = null;
});

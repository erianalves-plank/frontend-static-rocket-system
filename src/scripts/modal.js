
const addButton = document.getElementById('btn-add');
const editButton = document.getElementById('btn-edit');

const modal = document.getElementById('add-modal');
const closeBtn = modal.querySelector('.close');
const messageStatus = modal.querySelector('.operation-status');
const titleModal = modal.querySelector('h2');

const inputName = document.getElementById('nameInput');
const confirmButton = document.getElementById('btn-confirm');

const url_II = 'http://localhost:8080/'

var path = window.location.pathname;
var fileName = path.split('/').pop();
var fileNameWithoutExtension = fileName.split('.')[0];

var containerII = document.getElementById('rocket-div');

var idSelectedII = null;

function operationOnResource(data, httpMethod, id = '') {
    const options = {
        method: httpMethod,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    fetch(url_II + fileNameWithoutExtension + '/' + id, options)
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

    titleModal.textContent = `Create a new ${fileNameWithoutExtension}`;
    messageStatus.textContent = '';
    modal.style.display = 'block';
});

editButton.addEventListener('click', () => {
    titleModal.textContent = `Update a ${fileNameWithoutExtension}`;
    messageStatus.textContent = '';
    modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    collectDataFromInputTags();

});

window.addEventListener('click', (event) => {

    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

inputName.addEventListener('focus', () => {
    messageStatus.textContent = '';
});

function collectDataFromInputTags() {
    const modalContent = document.getElementById(`modal-content-${fileNameWithoutExtension}`);
    var inputs = modalContent.getElementsByTagName('input');
    console.log(inputs);

    var data = {};

    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        console.log('--> ' + input.name + ' ' + input.value);
        var name = input.name;
        var value = input.value.trim();
        data[name] = value;
        input.value = '';
    }

    console.log(data);
    return data;
}
function checkContentAllInputs() {
    const modalContent = document.getElementById(`modal-content-${fileNameWithoutExtension}`);
    var inputs = modalContent.getElementsByTagName('input');

    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        if (input.value.trim() === '')
            return false
    }
    return true;
}


function handleRocketOperation(method, id = '') {

    if (checkContentAllInputs()) {
        const data = collectDataFromInputTags();
        operationOnResource(data, method, id);
        messageStatus.textContent = (method === 'POST') ? `${fileNameWithoutExtension} created with success` : `${fileNameWithoutExtension} updated with success`;
    } else {
        messageStatus.textContent = 'Please enter valid data in all fields';
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

let loadButton = document.getElementById('load');
let container = document.getElementById('rocket-div');
let deleteButton = document.getElementById('btn-delete');

let url = 'http://localhost:8080/';

var path = window.location.pathname;
var fileName = path.split('/').pop();
var fileNameWithoutExtension = fileName.split('.')[0];

let idSelected = null;

function capitalizeFirstLetter(str) {
  if (typeof str !== 'string' || str.length === 0) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

function setDataAsContentToPage(data) {
  let content = '';


  for (let attribute in data) {
    if (attribute === 'id')
      continue;
    if (Array.isArray(data[attribute])) {

      content += `<p class="sub-item"><strong>${capitalizeFirstLetter(attribute)}</strong></p>`;

      data[attribute].forEach(obj => {
        for (let prop in obj) {
          if (prop === 'id')
            continue;
          content += `<p class="sub-item"><strong>${capitalizeFirstLetter(prop)}:</strong> ${obj[prop]}</p>`;
        }
      });
    } else {
      content += `<p><strong>${capitalizeFirstLetter(attribute)}:</strong> ${data[attribute]}</p>`;
    }
  }
  return content;
}


function addResourceToPage() {
  container.innerHTML = '';

  fetch(url + fileNameWithoutExtension)
    .then(response => response.json())
    .then(data => {
      data.forEach(resource => {
        let resourceDiv = document.createElement('div');
        let divTitle = document.createElement('h3');
        let contentDiv = document.createElement('div');

        divTitle.textContent = 'Details';
        divTitle.classList.add('title-div');

        resourceDiv.classList.add('flex-item');
        resourceDiv.dataset.id = resource.id;

        contentDiv.classList.add('flex-item-content');

        contentDiv.innerHTML = setDataAsContentToPage(resource);
        resourceDiv.appendChild(divTitle);
        resourceDiv.appendChild(contentDiv);
        container.appendChild(resourceDiv);

      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


function deleteResource(id) {
  fetch(url + fileNameWithoutExtension + '/' + `${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (response.ok) {
        console.log('Delete request was successful');
      } else {
        console.log('Delete request failed');
      }
    })
    .catch(error => {
      console.log('An error occurred:', error);
    });
}

function handleContainerClick(event) {
  const clickedElement = event.target;

  if (clickedElement.matches('#rocket-div div')) {
    const contentId = clickedElement.dataset.id;
    idSelected = contentId;
    for (child of container.children) {
      if (child.classList.contains('flex-item-selected'))
        child.classList.remove('flex-item-selected')
    }
    clickedElement.classList.add('flex-item-selected');
  }
}

function deleteButtonPressed() {
  if (idSelected != null) {
    deleteResource(idSelected);
    idSelected = null;
    container.innerHTML = '';
  }
}



container.addEventListener('click', handleContainerClick);

loadButton.addEventListener('click', addResourceToPage);
deleteButton.addEventListener('click', deleteButtonPressed);


let loadButton = document.getElementById('load');
let container = document.getElementById('rocket-div');
let deleteButton = document.getElementById('btn-delete');

let url = 'http://localhost:8080/';

var path = window.location.pathname;
var fileName = path.split('/').pop();
var fileNameWithoutExtension = fileName.split('.')[0];


let idSelected = null;

function addResourceToPage() {
  container.innerHTML = '';

  fetch(url + fileNameWithoutExtension)
    .then(response => response.json())
    .then(data => {
      data.forEach(resource => {
        let resourceDiv = document.createElement('div');
        resourceDiv.classList.add('flex-item');
        resourceDiv.classList.add('flex-item-rocket');
        resourceDiv.dataset.id = resource.id;

        let content = `<h3>${fileNameWithoutExtension} Details:</h3>`;

        for (let attribute in resource) {
          content += `<p>${attribute}: ${resource[attribute]}</p>`;
        }

        resourceDiv.innerHTML = content;
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


let loadButton = document.getElementById('load');
let container = document.getElementById('rocket-div');
let deleteButton = document.getElementById('btn-delete');

let url = 'http://localhost:8080/rocket/';

let idSelected = null;

function addRocketToPage() {
  container.innerHTML = '';
  fetch(url)
    .then(response => response.json())
    .then(data => {
      data.forEach(rocket => {

        let rocketDiv = document.createElement('div');
        rocketDiv.classList.add('flex-item');
        rocketDiv.classList.add('flex-item-rocket');
        rocketDiv.dataset.id = rocket.id;
        let content = `
          <h3>Name: ${rocket.name}</h3>
        `;

        rocketDiv.innerHTML = content;
        container.appendChild(rocketDiv);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


function deleteRocket(id) {
  fetch(url +`${id}`, {
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
    for (child of container.children){
      if (child.classList.contains('flex-item-selected'))
        child.classList.remove('flex-item-selected')
    }
    clickedElement.classList.add('flex-item-selected');
  }
}

function deleteButtonPressed() {
  if (idSelected != null){
    deleteRocket(idSelected);
    idSelected = null;
    container.innerHTML = '';
  }
}



container.addEventListener('click', handleContainerClick);

loadButton.addEventListener('click', addRocketToPage);
deleteButton.addEventListener('click', deleteButtonPressed);


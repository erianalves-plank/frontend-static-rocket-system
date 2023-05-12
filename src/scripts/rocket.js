
// Get references to the button and container elements
var loadButton = document.getElementById('load');
var container = document.getElementById('rocket-div');
var deleteButton = document.getElementById('btn-delete');

let idSelected = null;

// Function to add Rocket to the page
function addRocketToPage() {
  container.innerHTML = '';
  // Make an API request to retrieve the data
  fetch('http://localhost:8080/rocket')
    .then(response => response.json())
    .then(data => {
      // Iterate over the array of people
      console.log(data);
      data.forEach(rocket => {
        // Create a div for each rocket
        var rocketDiv = document.createElement('div');
        rocketDiv.classList.add('flex-item');
        rocketDiv.classList.add('flex-item-rocket');
        rocketDiv.dataset.id = rocket.id;
        // Create HTML content for the rocket
        var content = `
          <h3>Name: ${rocket.name}</h3>
        `;

        // Set the content of the rocket div
        rocketDiv.innerHTML = content;

        // Append the rocket div to the container
        container.appendChild(rocketDiv);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


function deleteRocket(id) {
  fetch(`http://localhost:8080/rocket/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers if required
  },
})
  .then(response => {
    if (response.ok) {
      // The request was successful
      console.log('Delete request was successful');
      // Handle any further operations or UI updates as needed
    } else {
      // The request failed
      console.log('Delete request failed');
      // Handle the error or display an error message to the user
    }
  })
  .catch(error => {
    console.log('An error occurred:', error);
    // Handle the error or display an error message to the user
  });
}

// Event handler for container click event
function handleContainerClick(event) {
  const clickedElement = event.target;

  // Check if the clicked element is a dynamic content element
  if (clickedElement.matches('#rocket-div div')) {
    const contentId = clickedElement.dataset.id;
    console.log(`Dynamic content with ID ${contentId} was clicked. -> ${clickedElement.childNodes[0]}`);
    idSelected = contentId;
    for (child of container.children){
      if (child.classList.contains('flex-item-selected'))
        child.classList.remove('flex-item-selected')
    }
    clickedElement.classList.add('flex-item-selected');
  }
}

function deleteButtonPressed() {
  console.log('>>>> ' + idSelected);
  if (idSelected != null){
    deleteRocket(idSelected);
    idSelected = null;
    container.innerHTML = '';
  }
}






deleteButton.addEventListener('click', deleteButtonPressed);
// Event delegation: Listen for clicks on the container
container.addEventListener('click', handleContainerClick);


// Add event listener to the button
loadButton.addEventListener('click', addRocketToPage);


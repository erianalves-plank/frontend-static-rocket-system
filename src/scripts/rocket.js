const mainDiv = document.querySelector('.container');
const elementLoadData = document.querySelector('.load');

elementLoadData.addEventListener('click', () => {
    fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => {
    // Process the retrieved data
    console.log(data);
  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error('Error:', error);
  });
})

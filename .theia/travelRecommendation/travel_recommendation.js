let currentIndex = 0;
const slides = document.querySelectorAll('.slide'); 
const totalSlides = slides.length;
const slidesContainer = document.querySelector('.slides');

// Show the first slide initially
slides[currentIndex].style.display = 'block';

// Function to change slides
function nextSlide() {
    // Move to the next slide
    currentIndex = (currentIndex + 1) % totalSlides;
    
    // Apply the transform to move the slides
    slidesContainer.style.transform = `translateX(-${currentIndex-1 * 100}%)`;
}

setInterval(nextSlide, 2000);

var destObject = {
	'country' : 'C',
	'countries' : 'C',
	'beach': 'B',
	'beaches': 'B',
	'temple': 'T',
	'temples': 'T'
};

function resetSearch(){
	searchDestination('A');
}
resetSearch();
function doSearch(){
	searchText = document.getElementById("search-input").value;
	searchText = searchText === undefined ? '' : searchText.toLowerCase();
	searchDestination(destObject[searchText]);
}

function searchDestination(dest){
	const container = document.getElementById('destination-container');
	container.innerHTML = '';
	loadTravelDestination(dest);
}

// Function to display the travel destinations
function loadTravelDestination(dest){
	fetch('travel_recommendation_api.json')
  .then(response => response.json())
  .then(data => {
		switch(dest){
			case 'C':
				// Load countries
      			loadCountries(data.countries);
				break;
			case 'B':
				// Load beaches
      			loadBeaches(data.beaches);
				break;
			case 'T':
				 // Load temples
     			 loadTemples(data.temples);
				break;
			case 'A':
				loadCountries(data.countries);
				loadBeaches(data.beaches);
				loadTemples(data.temples);
				break;
			default:
				console.log("No search result found.");
				break;
		}
  })
  .catch(error => console.error('Error loading JSON:', error));
}

// Function to display countries
function loadCountries(countries) {
    const container = document.getElementById('destination-container');
    countries.forEach(country => {
        country.cities.forEach(city => {
            const card = createDestinationCard(city.name, city.imageUrl, city.description);
            container.appendChild(card);
        });
    });
}

// Function to display temples
function loadTemples(temples) {
    const container = document.getElementById('destination-container');
    temples.forEach(temple => {
        const card = createDestinationCard(temple.name, temple.imageUrl, temple.description);
        container.appendChild(card);
    });
}

// Function to display beaches
function loadBeaches(beaches) {
    const container = document.getElementById('destination-container');
    beaches.forEach(beach => {
        const card = createDestinationCard(beach.name, beach.imageUrl, beach.description);
        container.appendChild(card);
    });
}

// Function to create the card element
function createDestinationCard(name, imageUrl, description) {
    const card = document.createElement('div');
    card.classList.add('destination-card');

    const image = document.createElement('img');
    image.src = imageUrl;
    image.alt = name;
    
    const info = document.createElement('div');
    info.classList.add('destination-info');
    
    const title = document.createElement('h3');
    title.textContent = name;
    
    const desc = document.createElement('p');
    desc.textContent = description;

    info.appendChild(title);
    info.appendChild(desc);
    card.appendChild(image);
    card.appendChild(info);

    return card;
}



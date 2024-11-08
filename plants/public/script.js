// Add to collection - in local storage
const addToCollection = (plant) => {
	const collection = JSON.parse(localStorage.getItem('plantCollection')) || [];
	collection.push(plant);
	localStorage.setItem('plantCollection', JSON.stringify(collection));
	console.log(`${plant.common_name} added to collection`);

	const myCollection = document.getElementById('my-collection');
	myCollection.innerHTML += `<p>${plant.common_name}</p>`;
};

document.getElementById('plant-form').onsubmit = async (event) => {
    event.preventDefault();
    const query = document.getElementById('plant-search').value;

    try {
        const response = await fetch(`/?plant=${encodeURIComponent(query)}`, {
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });
        const html = await response.text();

        // Replace only the plant items without duplicating the entire layout
        document.getElementById('plants-container').innerHTML = html;
    } catch (error) {
        console.error('Error fetching plants:', error);
    }
};


const beerTableBody = document.querySelector('#beer-table tbody');
const modal = document.getElementById('modal');
const beerForm = document.getElementById('beer-form');

// Open and Close Modal
function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

// Fetch and Display Beers in Table
async function fetchBeers() {
    const response = await fetch('/api/beers');
    const beers = await response.json();

    beerTableBody.innerHTML = beers.map(beer => `
        <tr id="beer-${beer.id}">
            <td>${beer.id}</td>
            <td>${beer.name}</td>
            <td>${beer.type}</td>
            <td>${beer.description || 'No description'}</td>
            <td>
                <button onclick="deleteBeer(${beer.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Add Beer
beerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('beer-name').value;
    const type = document.getElementById('beer-type').value;
    const description = document.getElementById('beer-description').value;

    const response = await fetch('/api/beers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, type, description })
    });

    const newBeer = await response.json();
    addBeerToTable(newBeer);

    // Reset form and close modal
    beerForm.reset();
    closeModal();
});

// Add New Beer Row to Table
function addBeerToTable(beer) {
    const newRow = document.createElement('tr');
    newRow.id = `beer-${beer.id}`;
    newRow.innerHTML = `
        <td>${beer.id}</td>
        <td>${beer.name}</td>
        <td>${beer.type}</td>
        <td>${beer.description || 'No description'}</td>
        <td>
            <button onclick="deleteBeer(${beer.id})">Delete</button>
        </td>
    `;
    beerTableBody.appendChild(newRow);
}

// Delete Beer
async function deleteBeer(id) {
    await fetch(`/api/beers/${id}`, { method: 'DELETE' });
    document.getElementById(`beer-${id}`).remove();
}

// Initial Fetch
fetchBeers();

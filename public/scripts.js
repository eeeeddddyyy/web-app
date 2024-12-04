const beerTableBody = document.querySelector('#beer-table tbody');
const modal = document.getElementById('modal');
const beerForm = document.getElementById('beer-form');

function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

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
    beerForm.reset();
    closeModal();
});

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
async function deleteBeer(id) {
    await fetch(`/api/beers/${id}`, { method: 'DELETE' });
    document.getElementById(`beer-${id}`).remove();
}
fetchBeers();
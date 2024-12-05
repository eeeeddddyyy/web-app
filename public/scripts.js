function openModal() {
    document.getElementById("modal").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

document.getElementById("beer-form").addEventListener("submit", function (event) {
    event.preventDefault(); 

    const name = document.getElementById("beer-name").value;
    const type = document.getElementById("beer-type").value;
    const description = document.getElementById("beer-description").value;

    addBeerToTable(name, type, description);
    document.getElementById("beer-name").value = "";
    document.getElementById("beer-type").value = "";
    document.getElementById("beer-description").value = "";

    closeModal();
});

let beerId = 1;

function addBeerToTable(name, type, description) {
    const tableBody = document.querySelector("#beer-table tbody");

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${beerId}</td>
        <td>${name}</td>
        <td>${type}</td>
        <td>${description}</td>
        <td><button onclick="deleteBeer(this)">Delete</button></td>
    `;

    tableBody.appendChild(row);
    beerId++;
}

// Function to delete a beer row
function deleteBeer(button) {
    const row = button.parentElement.parentElement;
    row.remove();
}

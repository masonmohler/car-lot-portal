document.addEventListener("DOMContentLoaded", () => {
  fetchCars();
});

async function fetchCars() {
  try {
    const response = await fetch("https://car-lot-inventory.onrender.com/cars");
    if (!response.ok) throw new Error("Failed to fetch data");

    const cars = await response.json();
    const tableBody = document.querySelector("#carTable tbody");

    tableBody.innerHTML = "";

    cars.forEach((car) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${car.stock_number}</td>
                <td>${car.vin}</td>
                <td>${car.year}</td>
                <td>${car.make}</td>
                <td>${car.model}</td>
                <td>${car.color}</td>
                <td>$${car.price}</td>
            `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading inventory:", error);
  }
}

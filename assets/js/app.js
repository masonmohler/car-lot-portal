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
                <td>
                    <button class="delete-btn" data-id="${car.id}">Delete</button>
                </td>
  
            `;
      tableBody.appendChild(row);
    });
    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const carId = event.target.getAttribute("data-id");
        deleteCar(carId);
      });
    });
  } catch (error) {
    console.error("Error loading inventory:", error);
  }
}

async function deleteCar(carId) {
  if (!confirm("Are you sure you want to delete this car?")) return;

  try {
    const response = await fetch(
      `https://car-lot-inventory.onrender.com/cars/${carId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) throw new Error("Failed to delete car");

    fetchCars();
  } catch (error) {
    console.error("Error deleting car:", error);
    alert("Error deleting car. Please try again.");
  }
}

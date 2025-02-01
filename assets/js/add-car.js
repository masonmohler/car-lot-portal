document
  .getElementById("addCarForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const carData = {
      vin: document.getElementById("vin").value,
      stock_number: document.getElementById("stockNumber").value,
      price: parseFloat(document.getElementById("price").value),
      make: document.getElementById("make").value,
      model: document.getElementById("model").value,
      color: document.getElementById("color").value,
      year: parseInt(document.getElementById("year").value),
    };

    try {
      const response = await fetch(
        "https://car-lot-inventory.onrender.com/cars",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(carData),
        }
      );

      if (!response.ok) throw new Error("Failed to add car");

      alert("Car added successfully!");
      document.getElementById("addCarForm").reset(); // Clear the form
    } catch (error) {
      console.error("Error adding car:", error);
      alert("Error adding car. Please try again.");
    }
  });

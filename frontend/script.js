
// Elements
const quantityInput = document.getElementById("quantity");
const productSelect = document.getElementById("product");
const totalPriceDisplay = document.getElementById("totalPrice");
const orderForm = document.getElementById("orderForm");
const successMsg = document.getElementById("successMsg");

// Function to update total price instantly
function updatePrice() {
  const qty = Number(quantityInput.value);
  const pricePerUnit = Number(productSelect.selectedOptions[0].dataset.price);
  const total = qty * pricePerUnit;
  totalPriceDisplay.textContent = "Total Price: ₹" + total;
}

// Update price on page load and on changes
updatePrice();
quantityInput.addEventListener("input", updatePrice);
productSelect.addEventListener("change", updatePrice);

// Handle form submit
orderForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const orderData = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    product: productSelect.value,
    quantity: Number(quantityInput.value)
  };

  try {
    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData)
    });
    const result = await response.json();

    if (result.message) {
      successMsg.textContent = `✅ Order Successful! Total Price: ₹${result.totalPrice}. You will receive your product in 7 days.`;
      successMsg.style.display = "block";
      orderForm.reset();
      updatePrice();
    }
  } catch (err) {
    alert("Error submitting order. Please try again.");
  }
});

// Elements
const quantityInput = document.getElementById("quantity");
const productSelect = document.getElementById("product");
const totalPriceDisplay = document.getElementById("totalPrice");
const orderForm = document.getElementById("orderForm");
const successMsg = document.getElementById("successMsg");

// Function to update total price instantly
function updatePrice() {
  const qty = Number(quantityInput.value) || 0;
  const pricePerUnit = Number(productSelect.selectedOptions[0].dataset.price) || 0;
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
    name: document.getElementById("name").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    address: document.getElementById("address").value.trim(),
    product: productSelect.value,
    quantity: Number(quantityInput.value)
  };

  // Basic validation
  if (!orderData.name || !orderData.phone || !orderData.address) {
    alert("Please fill in all required fields!");
    return;
  }

  try {
    // ✅ Correct backend route — this matches your Express route
    const backendURL = "https://order-app-1-hvdu.onrender.com/api/orders";

    const response = await fetch(backendURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData)
    });

    const result = await response.json();
    console.log("✅ Server response:", result); // Debug log

    if (response.ok && result.message) {
      successMsg.textContent = `✅ Order Successful! Total Price: ₹${result.totalPrice}. You will receive your product in 7 days.`;
      successMsg.style.display = "block";

      // Reset form
      orderForm.reset();
      updatePrice();
    } else {
      alert("❌ Error: " + (result.error || "Unable to place order."));
    }
  } catch (err) {
    console.error("❌ Fetch error:", err);
    alert("❌ Error submitting order. Please try again.");
  }
});

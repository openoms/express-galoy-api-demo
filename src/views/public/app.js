const displayBalance = async () => {
  try {
    const response = await fetch("/get-balance");
    const data = await response.json();
    const balanceDiv = document.getElementById("balance");
    balanceDiv.textContent = data.balance;
    balanceDiv.style.display = "block";
  } catch (error) {
    console.error("Failed to fetch the balance:", error);
  }
};

const createInvoice = async () => {
  const amountInput = document.getElementById("amount");
  const amount = amountInput.value;
  if (!amount) {
    alert("Please enter a valid amount");
    return;
  }

  try {
    const response = await fetch("/create-invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount }),
    });
    const { paymentRequest } = await response.json();

    // Display the invoice below the form
    const invoiceDisplay = document.getElementById("invoiceDisplay");
    invoiceDisplay.textContent = paymentRequest;
    invoiceDisplay.style.display = "block";

    // Generate and display QR code
    const qrCodeResponse = await fetch("/generate-qrcode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ invoice: paymentRequest }),
    });

    // Check if the response is successful
    if (!qrCodeResponse.ok) {
      throw new Error(`Server responded with status: ${qrCodeResponse.status}`);
    }

    const { qrCodeDataURL } = await qrCodeResponse.json();
    const qrCodeDisplay = document.getElementById("qrCodeDisplay");
    qrCodeDisplay.innerHTML = `<img src="${qrCodeDataURL}" alt='QR code'>`;
    qrCodeDisplay.style.display = "block";

    // Reset form field value and hide the invoice form
    amountInput.value = "";
    invoiceForm.style.display = "none";
  } catch (error) {
    console.error("Failed to create invoice or generate QR code:", error);
  }
};

// Show the form and hide the invoice and QR code when the "Create Invoice" button is clicked
const showInvoiceBtn = document.getElementById("showInvoiceBtn");
const invoiceForm = document.getElementById("invoiceForm");
const qrCodeDisplay = document.getElementById("qrCodeDisplay");
showInvoiceBtn.addEventListener("click", () => {
  invoiceForm.style.display = "block";
  invoiceDisplay.style.display = "none";
  qrCodeDisplay.style.display = "none";
});

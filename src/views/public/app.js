const displayBalance = async () => {
  try {
    const response = await fetch('/get-balance')
    const data = await response.json()
    const balanceDiv = document.getElementById('balance')
    balanceDiv.textContent = data.balance
    balanceDiv.style.display = 'block'
  } catch (error) {
    console.error("Failed to fetch the balance:", error)
  }
}

const createInvoice = async () => {
  const amountInput = document.getElementById('amount')
  const amount = amountInput.value
  if (!amount) { alert('Please enter a valid amount') }

  const response = await fetch('/create-invoice', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ amount: amount })
  })
  const { paymentRequest } = await response.json()
  // Hide the invoice form
  invoiceForm.style.display = 'none'

  // Display the invoice below the form
  const invoiceDisplay = document.getElementById('invoiceDisplay')
  invoiceDisplay.textContent = paymentRequest
  invoiceDisplay.style.display = 'block'

  // Reset form field value
  amountInput.value = ''
}

// Show the form and hide the invoice when the "Create Invoice" button is clicked
const showInvoiceBtn = document.getElementById('showInvoiceBtn')
const invoiceForm = document.getElementById('invoiceForm')
showInvoiceBtn.addEventListener('click', () => {
  invoiceForm.style.display = 'block'
  invoiceDisplay.style.display = 'none'
})

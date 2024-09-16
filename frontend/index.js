import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
  const addTaxPayerForm = document.getElementById('addTaxPayerForm');
  const searchButton = document.getElementById('searchButton');
  const searchTid = document.getElementById('searchTid');
  const searchResult = document.getElementById('searchResult');
  const taxPayerList = document.getElementById('taxPayerList');

  // Function to display all tax payers
  async function displayAllTaxPayers() {
    const taxPayers = await backend.getAllTaxPayers();
    taxPayerList.innerHTML = '<h3>Tax Payer List:</h3>';
    taxPayers.forEach(tp => {
      taxPayerList.innerHTML += `
        <p>
          TID: ${tp.tid}<br>
          Name: ${tp.firstName} ${tp.lastName}<br>
          Address: ${tp.address}
        </p>
      `;
    });
  }

  // Add new tax payer
  addTaxPayerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const tid = document.getElementById('tid').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const address = document.getElementById('address').value;

    await backend.addTaxPayer(tid, firstName, lastName, address);
    addTaxPayerForm.reset();
    displayAllTaxPayers();
  });

  // Search for a tax payer
  searchButton.addEventListener('click', async () => {
    const tid = searchTid.value;
    const result = await backend.searchTaxPayer(tid);
    if (result) {
      searchResult.innerHTML = `
        <h3>Search Result:</h3>
        <p>
          TID: ${result.tid}<br>
          Name: ${result.firstName} ${result.lastName}<br>
          Address: ${result.address}
        </p>
      `;
    } else {
      searchResult.innerHTML = '<p>No tax payer found with this TID.</p>';
    }
  });

  // Initial display of all tax payers
  displayAllTaxPayers();
});
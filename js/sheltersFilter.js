// shelters.js

// Function to display shelters based on category filter
function displayShelters(category = "All") {
    const container = document.getElementById('shelters-container');
    container.innerHTML = '';
  
    const allShelters = getAllShelters();
    const filteredShelters = category === "All"
      ? allShelters
      : allShelters.filter(shelter => shelter.category === category);
  
    if (filteredShelters.length === 0) {
      container.innerHTML = "<p>No shelters found in this category.</p>";
      return;
    }
  
    filteredShelters.forEach(shelter => {
      container.innerHTML += createShelterCard(shelter);
    });
  }
  
  // Initialize shelter filter and display logic on page load
  document.addEventListener('DOMContentLoaded', function() {
    displayShelters(); // Show all shelters by default
  
    // Listen for changes in the category filter dropdown
    document.getElementById('category-filter').addEventListener('change', (event) => {
      const selectedCategory = event.target.value;
      displayShelters(selectedCategory);
    });
  });
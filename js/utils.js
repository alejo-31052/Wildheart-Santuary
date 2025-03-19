// Function to get all shelters (both predefined and custom)
function getAllShelters() {
  const customShelters = JSON.parse(localStorage.getItem("customShelters") || "[]");
  return [...shelters, ...customShelters];
}

// Function to get a shelter by ID
function getShelterById(id) {
  const allShelters = getAllShelters();
  return allShelters.find((shelter) => shelter.id === id);
}

// Function to format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

// Function to format date
function formatDate(dateInput) {
  if (!dateInput) return "Unknown";
  const date = new Date(dateInput);
  if (isNaN(date)) return "Unknown";
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}


// Function to create shelter cards HTML
function createShelterCard(shelter) {
  return `
    <div class="shelter-card">
      <div class="shelter-card-image">
        <img src="${shelter.image || "https://placehold.co/500x300?text=Shelter"}" alt="${shelter.name}">
      </div>
      <div class="shelter-card-content">
        <h3>${shelter.name}</h3>
        <p>${shelter.description}</p>
        <a href="shelter-detail.html?id=${shelter.id}" class="btn-primary">Donate Now</a>
      </div>
    </div>
  `;
}

// Function to create HTML for shelter detail page
function createShelterDetail(shelter) {
  if (!shelter) {
    return `
      <div class="shelter-not-found">
        <h1>Shelter Not Found</h1>
        <p>The shelter you're looking for doesn't exist or has been removed.</p>
        <a href="shelters.html" class="btn-primary">Back to Shelters</a>
      </div>
    `;
  }

  const needsHTML = shelter.donationNeeds?.length
    ? `
      <div class="shelter-needs">
        <h3>Current Needs</h3>
        <ul>${shelter.donationNeeds.map((need) => `<li>${need}</li>`).join("")}</ul>
      </div>
    ` : "";

  const contactHTML = `
    ${shelter.location ? `<div class="contact-item"><h4>Location</h4><p>${shelter.location}</p></div>` : ""}
    ${shelter.contactEmail ? `<div class="contact-item"><h4>Email</h4><p>${shelter.contactEmail}</p></div>` : ""}
    ${shelter.contactPhone ? `<div class="contact-item"><h4>Phone</h4><p>${shelter.contactPhone}</p></div>` : ""}
    ${shelter.website ? `<div class="contact-item"><h4>Website</h4><a href="${shelter.website}" target="_blank">Visit Website</a></div>` : ""}
  `;

  const wishlistHTML = shelter.amazonWishlist ? `
    <div class="shelter-sidebar-card">
      <h3>Amazon Wishlist</h3>
      <p>You can help by purchasing items directly from ${shelter.name}'s Amazon wishlist.</p>
      <a href="${shelter.amazonWishlist}" target="_blank" class="btn-primary">View Wishlist</a>
    </div>
  ` : "";

  return `
    <div class="shelter-header">
      <h1>${shelter.name}</h1>
      <p>${shelter.description}</p>
    </div>

    <div class="shelter-content">
      <div class="shelter-main">
        <img src="${shelter.image || "https://placehold.co/800x400?text=Shelter"}" alt="${shelter.name}" class="shelter-image">

        <div class="shelter-info">
          <h2>About ${shelter.name}</h2>
          <p>${shelter.longDescription || shelter.description}</p>
          ${needsHTML}
        </div>

        <div class="donation-section">
          <h2>Support ${shelter.name}</h2>
          <!-- Donation forms and tabs would be implemented here -->
        </div>
      </div>

      <div class="shelter-sidebar">
        <div class="shelter-sidebar-card">
          <h3>Contact Information</h3>
          ${contactHTML}
        </div>
        ${wishlistHTML}
      </div>
    </div>
  `;
}

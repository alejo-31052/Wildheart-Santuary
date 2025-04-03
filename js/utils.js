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
        <h3 style="text-align:center;">${shelter.name}</h3>
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

  return `
    <div class="shelter-header">
      <h1>${shelter.name}</h1>
      <p>${shelter.description || ''}</p>
    </div>

    <div class="shelter-content">
      <div class="shelter-main">
        <img src="${shelter.image || 'https://placehold.co/800x400?text=Shelter'}" alt="${shelter.name}" class="shelter-image">

        <div class="shelter-info">
          <h2>About ${shelter.name}</h2>
          <p>${shelter.longDescription || shelter.description || ''}</p>
        </div>
      </div>

      <div class="shelter-sidebar">
        <div class="shelter-sidebar-card">
          <h3>Contact Information</h3>
          <p><strong>Address:</strong> ${shelter.address || 'Not provided'}</p>
          <p><strong>City & Province:</strong> ${shelter.cityProvince || 'Not provided'}</p>
          <p><strong>Country:</strong> ${shelter.country || 'Not provided'}</p>
          <p><strong>Email:</strong> 
            ${shelter.contactEmail 
              ? `<a href="mailto:${shelter.contactEmail}">${shelter.contactEmail}</a>` 
              : 'Not provided'}
          </p>
          <p><strong>Phone:</strong> ${shelter.contactPhone || 'Not provided'}</p>
          <p><strong>Website:</strong> 
            ${shelter.website ? `<a href="${shelter.website}" target="_blank">Visit Website</a>` : 'Not provided'}
          </p>
        </div>

        ${shelter.amazonWishlist ? `
          <div class="shelter-sidebar-card">
            <h3>Amazon Wishlist</h3>
            <p>You can help by purchasing items directly from ${shelter.name}'s Amazon wishlist.</p>
            <a href="${shelter.amazonWishlist}" target="_blank" class="btn-primary">View Wishlist</a>
          </div>` 
          : ''
        }
      </div>
    </div>
  `;
}


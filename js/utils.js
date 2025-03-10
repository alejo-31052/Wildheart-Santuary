// Function to get all shelters (both predefined and custom)
function getAllShelters() {
  // Get custom shelters from localStorage
  const customShelters = JSON.parse(localStorage.getItem("customShelters") || "[]")

  // Combine and return all shelters
  return [...shelters, ...customShelters]
}

// Function to get a shelter by ID
function getShelterById(id) {
  const allShelters = getAllShelters()
  return allShelters.find((shelter) => shelter.id === id)
}

// Function to format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

// Function to format date
function formatDate(dateString) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
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
  `
}

// Function to create HTML for shelter detail
function createShelterDetail(shelter) {
  if (!shelter) {
    return `
      <div class="shelter-not-found">
        <h1>Shelter Not Found</h1>
        <p>The shelter you're looking for doesn't exist or has been removed.</p>
        <a href="shelters.html" class="btn-primary">Back to Shelters</a>
      </div>
    `
  }

  // Create HTML for donation needs if they exist
  let needsHTML = ""
  if (shelter.donationNeeds && shelter.donationNeeds.length > 0) {
    const needsItems = shelter.donationNeeds.map((need) => `<li>${need}</li>`).join("")
    needsHTML = `
      <div class="shelter-needs">
        <h3>Current Needs</h3>
        <ul>${needsItems}</ul>
      </div>
    `
  }

  // Create HTML for contact information
  let contactHTML = ""

  if (shelter.location) {
    contactHTML += `
      <div class="contact-item">
        <h4>Location</h4>
        <p>${shelter.location}</p>
      </div>
    `
  }

  if (shelter.contactEmail) {
    contactHTML += `
      <div class="contact-item">
        <h4>Email</h4>
        <p>${shelter.contactEmail}</p>
      </div>
    `
  }

  if (shelter.contactPhone) {
    contactHTML += `
      <div class="contact-item">
        <h4>Phone</h4>
        <p>${shelter.contactPhone}</p>
      </div>
    `
  }

  if (shelter.website) {
    contactHTML += `
      <div class="contact-item">
        <h4>Website</h4>
        <a href="${shelter.website}" target="_blank" rel="noopener noreferrer">
          Visit Website
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      </div>
    `
  }

  // Amazon wishlist card
  let wishlistHTML = ""
  if (shelter.amazonWishlist) {
    wishlistHTML = `
      <div class="shelter-sidebar-card">
        <h3>Amazon Wishlist</h3>
        <p>You can help by purchasing items directly from ${shelter.name}'s Amazon wishlist. Items will be shipped directly to the shelter.</p>
        <a href=\"${shelter.amazonWishlist  Items will be shipped directly to the shelter.</p>
        <a href="${shelter.amazonWishlist}" target="_blank" rel="noopener noreferrer" class="btn-primary">
          View Wishlist
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      </div>
    `
  }

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
          
          <div class="donation-tabs">
            <div class="tabs">
              <button class="tab-btn active" data-tab="donate">Make a Donation</button>
              <button class="tab-btn" data-tab="membership">Become a Member</button>
            </div>
            
            <div class="tab-content active" id="donate">
              <form id="donation-form">
                <input type="hidden" id="shelter-id" value="${shelter.id}">
                
                <div>
                  <label for="donation-amount">Donation Amount</label>
                  <div class="amount-buttons">
                    <button type="button" class="btn-outline amount-btn" data-amount="10">$10</button>
                    <button type="button" class="btn-primary amount-btn" data-amount="25">$25</button>
                    <button type="button" class="btn-outline amount-btn" data-amount="50">$50</button>
                    <button type="button" class="btn-outline amount-btn" data-amount="100">$100</button>
                  </div>
                  
                  <div class="custom-amount">
                    <label for="custom-amount">Custom Amount</label>
                    <div class="input-with-prefix">
                      <span class="input-prefix">$</span>
                      <input type="number" id="custom-amount" min="1" step="1" value="25">
                    </div>
                  </div>
                </div>
                
                <div class="radio-group">
                  <div class="radio-option">
                    <input type="radio" id="one-time" name="donation-type" value="one-time" checked>
                    <label for="one-time">One-time donation</label>
                  </div>
                  <div class="radio-option">
                    <input type="radio" id="recurring" name="donation-type" value="recurring">
                    <label for="recurring">Recurring donation</label>
                  </div>
                  
                  <div class="frequency-options hidden" id="frequency-options">
                    <div class="radio-option">
                      <input type="radio" id="monthly" name="frequency" value="monthly" checked>
                      <label for="monthly">Monthly</label>
                    </div>
                    <div class="radio-option">
                      <input type="radio" id="quarterly" name="frequency" value="quarterly">
                      <label for="quarterly">Quarterly</label>
                    </div>
                    <div class="radio-option">
                      <input type="radio" id="yearly" name="frequency" value="yearly">
                      <label for="yearly">Yearly</label>
                    </div>
                  </div>
                </div>
                
                <button type="submit" class="btn-primary full-width" id="donate-button">
                  Donate $25
                </button>
              </form>
            </div>
            
            <div class="tab-content" id="membership">
              <p>Become a member of ${shelter.name} and provide ongoing support. Members receive updates about the animals they're helping and special recognition on the shelter's website.</p>
              
              <div class="membership-options">
                <div class="membership-card">
                  <h3>Basic</h3>
                  <p class="membership-price">$10/month</p>
                  <ul class="membership-features">
                    <li>Monthly newsletter</li>
                    <li>Name on supporter wall</li>
                  </ul>
                  <button class="btn-primary full-width membership-btn" data-amount="10" data-frequency="monthly">Select</button>
                </div>
                
                <div class="membership-card featured">
                  <h3>Supporter</h3>
                  <p class="membership-price">$25/month</p>
                  <ul class="membership-features">
                    <li>Monthly newsletter</li>
                    <li>Name on supporter wall</li>
                    <li>Quarterly impact report</li>
                    <li>Digital certificate</li>
                  </ul>
                  <button class="btn-primary full-width membership-btn" data-amount="25" data-frequency="monthly">Select</button>
                </div>
                
                <div class="membership-card">
                  <h3>Champion</h3>
                  <p class="membership-price">$50/month</p>
                  <ul class="membership-features">
                    <li>Monthly newsletter</li>
                    <li>Name on supporter wall</li>
                    <li>Quarterly impact report</li>
                    <li>Digital certificate</li>
                    <li>Annual thank you gift</li>
                    <li>VIP shelter events</li>
                  </ul>
                  <button class="btn-primary full-width membership-btn" data-amount="50" data-frequency="monthly">Select</button>
                </div>
              </div>
            </div>
          </div>
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
  `
}


// Mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle")
  const mobileMenu = document.querySelector(".mobile-menu")

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")

      // Change icon based on menu state
      const menuIcon = menuToggle.querySelector("svg")
      if (mobileMenu.classList.contains("active")) {
        menuIcon.innerHTML = `
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        `
      } else {
        menuIcon.innerHTML = `
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        `
      }
    })
  }
})

// Display featured shelters on home page
function displayFeaturedShelters() {
  const featuredSheltersContainer = document.getElementById("featured-shelters")
  if (!featuredSheltersContainer) return

  // Get all shelters and select first 3 for featured section
  const allShelters = getAllShelters()
  const featuredShelters = allShelters.slice(0, 3)

  // Create HTML for each shelter card
  const shelterCardsHTML = featuredShelters.map((shelter) => createShelterCard(shelter)).join("")

  // Add cards to container
  featuredSheltersContainer.innerHTML = shelterCardsHTML
}


// Setup tab functionality
function setupTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn")
  if (!tabButtons.length) return

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Get all tabs and contents
      const tabs = document.querySelectorAll(".tab-btn")
      const contents = document.querySelectorAll(".tab-content")

      // Remove active class from all
      tabs.forEach((tab) => tab.classList.remove("active"))
      contents.forEach((content) => content.classList.remove("active"))

      // Add active class to current tab and content
      button.classList.add("active")
      const contentId = button.getAttribute("data-tab")
      document.getElementById(contentId).classList.add("active")
    })
  })
}

// Setup donation form functionality
function setupDonationForm(shelterId) {
  // Amount buttons
  const amountButtons = document.querySelectorAll(".amount-btn")
  if (amountButtons.length) {
    amountButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Update active button
        amountButtons.forEach((btn) => btn.classList.remove("btn-primary"))
        amountButtons.forEach((btn) => btn.classList.add("btn-outline"))
        button.classList.remove("btn-outline")
        button.classList.add("btn-primary")

        // Update custom amount input
        const amount = button.getAttribute("data-amount")
        document.getElementById("custom-amount").value = amount

        // Update donate button text
        updateDonateButtonText()
      })
    })
  }

  // Custom amount input
  const customAmountInput = document.getElementById("custom-amount")
  if (customAmountInput) {
    customAmountInput.addEventListener("input", () => {
      // Reset active buttons
      amountButtons.forEach((btn) => btn.classList.remove("btn-primary"))
      amountButtons.forEach((btn) => btn.classList.add("btn-outline"))

      // Update donate button text
      updateDonateButtonText()
    })
  }

  // Donation type radio buttons
  const donationTypeRadios = document.querySelectorAll('input[name="donation-type"]')
  if (donationTypeRadios.length) {
    donationTypeRadios.forEach((radio) => {
      radio.addEventListener("change", () => {
        // Show/hide frequency options
        const frequencyOptions = document.getElementById("frequency-options")
        if (radio.value === "recurring") {
          frequencyOptions.classList.remove("hidden")
        } else {
          frequencyOptions.classList.add("hidden")
        }

        // Update donate button text
        updateDonateButtonText()
      })
    })
  }

  // Frequency radio buttons
  const frequencyRadios = document.querySelectorAll('input[name="frequency"]')
  if (frequencyRadios.length) {
    frequencyRadios.forEach((radio) => {
      radio.addEventListener("change", () => {
        // Update donate button text
        updateDonateButtonText()
      })
    })
  }

  // Membership buttons
  const membershipButtons = document.querySelectorAll(".membership-btn")
  if (membershipButtons.length) {
    membershipButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const amount = button.getAttribute("data-amount")
        const frequency = button.getAttribute("data-frequency")

        // Switch to donate tab
        document.querySelector('[data-tab="donate"]').click()

        // Set amount
        document.getElementById("custom-amount").value = amount
        amountButtons.forEach((btn) => {
          if (btn.getAttribute("data-amount") === amount) {
            btn.click()
          }
        })

        // Set recurring
        document.getElementById("recurring").checked = true
        document.getElementById("frequency-options").classList.remove("hidden")

        // Set frequency
        document.getElementById(frequency).checked = true

        // Update donate button text
        updateDonateButtonText()
      })
    })
  }

  // Donation form submission
  const donationForm = document.getElementById("donation-form")
  if (donationForm) {
    donationForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const amount = document.getElementById("custom-amount").value
      const donationType = document.querySelector('input[name="donation-type"]:checked').value
      const frequency =
        donationType === "recurring" ? document.querySelector('input[name="frequency"]:checked').value : null

      // Save donation
      const success = saveDonation(shelterId, amount, donationType, frequency)

      if (success) {
        // Show success message
        alert(
          `Thank you for your ${donationType === "one-time" ? "one-time" : "recurring"} donation of $${amount} to ${getShelterById(shelterId).name}!`,
        )
      }
    })
  }

  // Function to update donate button text
  function updateDonateButtonText() {
    const donateButton = document.getElementById("donate-button")
    if (!donateButton) return

    const amount = document.getElementById("custom-amount").value
    const donationType = document.querySelector('input[name="donation-type"]:checked').value

    if (donationType === "one-time") {
      donateButton.textContent = `Donate $${amount}`
    } else {
      const frequency = document.querySelector('input[name="frequency"]:checked').value
      donateButton.textContent = `Donate $${amount} ${frequency}`
    }
  }
}

async function loadShelterDetails(shelterId) {
  const shelterDetailContainer = document.getElementById('shelter-detail');

  try {
    const shelterDoc = await firebase.firestore().collection('shelters').doc(shelterId).get();

    if (!shelterDoc.exists) {
      shelterDetailContainer.innerHTML = `
        <div class="shelter-not-found">
          <h1>Shelter Not Found</h1>
          <p>The shelter you're looking for doesn't exist or has been removed.</p>
          <a href="shelters.html" class="btn-primary">Back to Shelters</a>
        </div>
      `;
      return;
    }

    const shelter = shelterDoc.data();

    const shelterHTML = `
      <h1>${shelter.name}</h1>
      <p>${shelter.description}</p>

      <img src="${shelter.image || "https://placehold.co/800x400?text=No+Image"}" alt="${shelter.name}" class="shelter-image">

      <div class="shelter-info">
        <h2>About ${shelter.name}</h2>
        <p>${shelter.longDescription || shelter.description}</p>
      </div>

      <div class="shelter-sidebar-card">
        <h3>Contact Information</h3>
        ${shelter.address ? `<p><strong>Address:</strong> ${shelter.address}</p>` : ""}
        ${shelter.cityProvince ? `<p><strong>City & Province:</strong> ${shelter.cityProvince}</p>` : ""}
        ${shelter.country ? `<p><strong>Country:</strong> ${shelter.country}</p>` : ""}
        ${shelter.contactEmail ? `<p><strong>Email:</strong> <a href="mailto:${shelter.contactEmail}">${shelter.contactEmail}</a></p>` : ""}
        ${shelter.contactPhone ? `<p><strong>Phone:</strong> ${shelter.contactPhone}</p>` : ""}
        ${shelter.website ? `<p><strong>Website:</strong> <a href="${shelter.website}" target="_blank">Visit Website</a></p>` : ""}
      </div>

      ${shelter.amazonWishlist ? `
        <div class="shelter-sidebar-card">
          <h3>Amazon Wishlist</h3>
          <p>You can help by purchasing items directly from ${shelter.name}'s Amazon wishlist.</p>
          <a href="${shelter.amazonWishlist}" target="_blank" class="btn-primary">View Wishlist</a>
        </div>
      ` : ''}
    `;

    shelterDetailContainer.innerHTML = shelterHTML;

  } catch (error) {
    console.error("Error loading shelter details:", error);
    shelterDetailContainer.innerHTML = `
      <div class="shelter-not-found">
        <h1>Error Loading Shelter</h1>
        <p>There was a problem loading the shelter details. Please try again later.</p>
        <a href="shelters.html" class="btn-primary">Back to Shelters</a>
      </div>
    `;
  }
}


async function displayAllShelters() {
  try {
    const sheltersSnapshot = await firebase.firestore().collection('shelters').get();
    const shelters = sheltersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    const container = document.getElementById('all-shelters');
    const countryFilter = document.getElementById('country-filter');
    const cityFilter = document.getElementById('city-filter');
    const needsFilter = document.getElementById('needs-filter'); // Agregado para filtrar por necesidades

    // Crear listas únicas de países y ciudades (se queda dinámico)
    const countries = new Set();
    const cities = new Set();
    shelters.forEach(shelter => {
      if (shelter.country) countries.add(shelter.country);
      if (shelter.cityProvince) cities.add(shelter.cityProvince);
    });

    // Llenar select de países
    countries.forEach(country => {
      const option = document.createElement('option');
      option.value = country;
      option.textContent = country;
      countryFilter.appendChild(option);
    });

    // Llenar select de ciudades
    cities.forEach(city => {
      const option = document.createElement('option');
      option.value = city;
      option.textContent = city;
      cityFilter.appendChild(option);
    });

    function renderShelters(filteredShelters) {
      container.innerHTML = filteredShelters.map(createShelterCard).join('');
    }

    // Mostrar todos al inicio
    renderShelters(shelters);

    // Filtrar según selección
    function applyFilters() {
      const selectedCountry = countryFilter.value;
      const selectedCity = cityFilter.value;
      const selectedNeed = needsFilter.value; // Nuevo filtro por necesidad

      const filtered = shelters.filter(shelter => {
        const countryMatch = selectedCountry === 'All' || shelter.country === selectedCountry;
        const cityMatch = selectedCity === 'All' || shelter.cityProvince === selectedCity;
        const needsMatch = selectedNeed === 'All' || (shelter.donationNeeds && shelter.donationNeeds.includes(selectedNeed));
        return countryMatch && cityMatch && needsMatch;
      });

      renderShelters(filtered);
    }

    countryFilter.addEventListener('change', applyFilters);
    cityFilter.addEventListener('change', applyFilters);
    needsFilter.addEventListener('change', applyFilters); // Listener para necesidades

  } catch (error) {
    console.error("Error fetching shelters:", error);
  }
}


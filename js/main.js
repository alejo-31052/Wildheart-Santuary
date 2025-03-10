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

// Display all shelters on shelters page
function displayAllShelters() {
  const allSheltersContainer = document.getElementById("all-shelters")
  if (!allSheltersContainer) return

  // Get all shelters
  const allShelters = getAllShelters()

  // Create HTML for each shelter card
  const shelterCardsHTML = allShelters.map((shelter) => createShelterCard(shelter)).join("")

  // Add cards to container
  allSheltersContainer.innerHTML = shelterCardsHTML
}

// Load shelter details on shelter detail page
function loadShelterDetails(shelterId) {
  const shelterDetailContainer = document.getElementById("shelter-detail")
  if (!shelterDetailContainer) return

  // Get shelter by ID
  const shelter = getShelterById(shelterId)

  // Update page title
  document.title = shelter ? `${shelter.name} - PawFund` : "Shelter Not Found - PawFund"

  // Create HTML for shelter detail
  shelterDetailContainer.innerHTML = createShelterDetail(shelter)

  // If shelter not found, show error message
  if (!shelter) {
    document.querySelector(".shelter-not-found").classList.remove("hidden")
    return
  }

  // Setup tab functionality
  setupTabs()

  // Setup donation form functionality
  setupDonationForm(shelterId)
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


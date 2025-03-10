// Function to check if user is logged in
function isLoggedIn() {
  return localStorage.getItem("currentUser") !== null
}

// Function to update UI based on authentication status
function updateAuthUI() {
  const isUserLoggedIn = isLoggedIn()

  // Desktop auth buttons
  const authButtonsContainer = document.getElementById("auth-buttons")
  if (authButtonsContainer) {
    authButtonsContainer.innerHTML = isUserLoggedIn
      ? `
        <a href="dashboard.html" class="btn-ghost">Dashboard</a>
        <button id="logout-btn" class="btn-outline">Logout</button>
      `
      : `
        <a href="login.html" class="btn-ghost">Login</a>
        <a href="register-user.html" class="btn-primary">Register</a>
      `

    // Add event listener to logout button if it exists
    const logoutBtn = document.getElementById("logout-btn")
    if (logoutBtn) {
      logoutBtn.addEventListener("click", logout)
    }
  }

  // Mobile menu
  const mobileMenuItems = document.getElementById("mobile-menu-items")
  if (mobileMenuItems) {
    // Remove any existing auth items
    const authItems = mobileMenuItems.querySelectorAll(".auth-item")
    authItems.forEach((item) => item.remove())

    // Add appropriate auth items
    if (isUserLoggedIn) {
      mobileMenuItems.innerHTML += `
        <li class="auth-item"><a href="dashboard.html">Dashboard</a></li>
        <li class="auth-item"><a href="#" id="mobile-logout-btn">Logout</a></li>
      `

      // Add event listener to mobile logout button
      const mobileLogoutBtn = document.getElementById("mobile-logout-btn")
      if (mobileLogoutBtn) {
        mobileLogoutBtn.addEventListener("click", (e) => {
          e.preventDefault()
          logout()
        })
      }
    } else {
      mobileMenuItems.innerHTML += `
        <li class="auth-item"><a href="login.html">Login</a></li>
        <li class="auth-item"><a href="register-user.html">Register as User</a></li>
        <li class="auth-item"><a href="register-shelter.html">Register as Shelter</a></li>
      `
    }
  }
}

// Function to handle user login
function loginUser(email, password, callback) {
  // Get users from localStorage
  const users = JSON.parse(localStorage.getItem("users") || "[]")
  const user = users.find((u) => u.email === email)

  if (!user || user.password !== password) {
    return callback("Invalid email or password")
  }

  // Login successful
  localStorage.setItem("currentUser", JSON.stringify(user))
  updateAuthUI()
  callback(null, user)
}

// Function to handle user registration
function registerUser(name, email, password, callback) {
  // Get existing users from localStorage
  const users = JSON.parse(localStorage.getItem("users") || "[]")

  // Check if email already exists
  if (users.some((user) => user.email === email)) {
    return callback("Email already in use")
  }

  // Create new user
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password, // In a real app, this would be hashed
    createdAt: new Date().toISOString(),
  }

  // Add user to localStorage
  users.push(newUser)
  localStorage.setItem("users", JSON.stringify(users))

  // Auto login
  localStorage.setItem("currentUser", JSON.stringify(newUser))
  updateAuthUI()
  callback(null, newUser)
}

// Function to handle shelter registration
function registerShelter(shelterData, callback) {
  // Get existing custom shelters from localStorage
  const customShelters = JSON.parse(localStorage.getItem("customShelters") || "[]")

  // Check if shelter name already exists
  if (customShelters.some((shelter) => shelter.name === shelterData.name)) {
    return callback("A shelter with this name already exists")
  }

  // Create new shelter
  const newShelter = {
    id: `custom-${Date.now()}`,
    ...shelterData,
    donationNeeds: [],
  }

  // Add shelter to localStorage
  customShelters.push(newShelter)
  localStorage.setItem("customShelters", JSON.stringify(customShelters))
  callback(null, newShelter)
}

// Function to handle logout
function logout() {
  localStorage.removeItem("currentUser")
  updateAuthUI()

  // Redirect to home page if on a protected page
  if (window.location.pathname.includes("dashboard")) {
    window.location.href = "index.html"
  }
}

// Function to save donation
function saveDonation(shelterId, amount, type, frequency) {
  // Check if user is logged in
  if (!isLoggedIn()) {
    window.location.href = `login.html?redirect=shelter-detail.html?id=${shelterId}`
    return false
  }

  // Get current user
  const user = JSON.parse(localStorage.getItem("currentUser"))

  // Create donation object
  const donation = {
    id: Date.now().toString(),
    userId: user.id,
    shelterId,
    amount: Number.parseFloat(amount),
    type,
    frequency: type === "recurring" ? frequency : undefined,
    createdAt: new Date().toISOString(),
  }

  // Save to localStorage
  const donations = JSON.parse(localStorage.getItem("donations") || "[]")
  donations.push(donation)
  localStorage.setItem("donations", JSON.stringify(donations))

  return true
}


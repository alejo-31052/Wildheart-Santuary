async function registerUser() {
  console.log("Register button clicked!"); // <-- Add this
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
}


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


async function registerUser() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const registerBtn = document.getElementById('register-button'); 
registerBtn.disabled = true;
registerBtn.textContent = 'Creating account...';


  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    await db.collection('users').doc(user.uid).set({
      name: name,
      email: email,
      createdAt: new Date()
    });

    // Simple popup confirmation
    Swal.fire({
      icon: 'success',
      title: 'Account Created!',
      text: 'Your account has been successfully registered. Redirecting to login...',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
      timer: 2500,
      timerProgressBar: true,
      didClose: () => {
        window.location.href = 'login.html';
      }
    });
    
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops!',
      text: error.message,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Try Again'
    });
  }
}

  
async function loginUser() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Fetch user data from Firestore
    const userDoc = await db.collection('users').doc(user.uid).get();
    const userData = userDoc.data();

    // Convert createdAt from Firestore timestamp to a plain string
    const createdAtDate = userData.createdAt.toDate().toISOString();

    // Store user info in localStorage
    const currentUser = {
      id: user.uid,
      name: userData.name,
      email: userData.email,
      createdAt: createdAtDate
    };

    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    Swal.fire({
      icon: 'success',
      title: 'Welcome back!',
      text: 'Login successful! Redirecting to dashboard...',
      confirmButtonColor: '#3085d6',
      timer: 2000,
      timerProgressBar: true,
      didClose: () => {
        window.location.href = 'dashboard.html';
      }
    });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: error.message,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Try Again'
    });
  }
}



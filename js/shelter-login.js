// Function to handle login for shelters
async function loginShelter(email, password) {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
  
      // Get shelter data from Firestore
      const shelterDoc = await db.collection('shelters').doc(user.uid).get();
      const shelterData = shelterDoc.data();
  
      if (!shelterData) {
        throw new Error('Shelter not found in database.');
      }
  
      // Store session data in localStorage
      localStorage.setItem('currentShelter', JSON.stringify({
        uid: user.uid,
        name: shelterData.name,
        email: shelterData.registeredEmail || shelterData.contactEmail,
        createdAt: shelterData.createdAt
      }));
  
      Swal.fire({
        icon: 'success',
        title: 'Login successful!',
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        window.location.href = 'index.html';
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
  
  // Event listener for shelter login form submission
  document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
  
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
  
        loginShelter(email, password);
      });
    }
  });
  
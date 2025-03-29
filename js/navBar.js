// Function to update the navigation bar buttons based on user login state
function updateAuthUI() {
    const authButtonsDiv = document.getElementById('auth-buttons');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
    if (currentUser) {
      authButtonsDiv.innerHTML = `
          <a href="dashboard.html" class="btn-primary">My profile</a>
          <button onclick="logout()" class="btn-ghost">Loggout</button>
      `;
    } else {
      authButtonsDiv.innerHTML = `
         <a href="login.html" class="btn-ghost">Login</a>
        <a href="register-user.html" class="btn-primary">Register</a>
      `;
    }
  }
  // Function to log out the user and show a confirmation popup
function logout() {
    localStorage.removeItem('currentUser');
    Swal.fire({
      icon: 'success',
      title: 'Logged out',
      text: 'You have successfully logged out.',
      confirmButtonColor: '#3085d6',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      didClose: () => {
        window.location.href = 'index.html';
      }
    });
  }
  
  
  // Run auth UI update after DOM loads
  document.addEventListener('DOMContentLoaded', function() {
    updateAuthUI();
  });
  

//service_a255mko

         
window.addEventListener("unlockProtocol.status", function (event) {
  // We hide all .unlock-content elements
  document.querySelector(".unlock-content").style.display = "none";
  // We show only the relevant element
  document
    .querySelectorAll(`.unlock-content.${event.detail.state}`)
    .forEach((element) => {
      element.style.display = "contents";
    });
});



// Listen for the unlockProtocol event
window.addEventListener('unlockProtocol', function (e) {
  var state = e.detail;

  if (state === 'locked') {
      // Hide elements with the class 'unlock-content locked'
      document.querySelectorAll('.unlock-content.locked').forEach(function (element) {
          element.style.display = 'none'; // Hide the element
      });

      // Optionally, load ad rendering component here
    console.log('Content is locked.');
    
    // Clear the nonce from session storage
    sessionStorage.removeItem('unlock_nonce');

  } else {
      // Show elements with the class 'unlock-content locked'
      document.querySelectorAll('.unlock-content.locked').forEach(function (element) {
          element.style.display = ''; // Show the element (default display)
      });

      // Optionally, stop ad rendering component
      console.log('Content is unlocked.');

      // Save the nonce into session storage
      if (typeof myNonce !== 'undefined') {
          // Save nonce in session storage
          sessionStorage.setItem('unlock_nonce', myNonce);
      } else {
          console.error('Security Nonce is not defined.');
      }
  }
});

var unlockProtocolConfig = {
  "icon": "",
  "locks": {
      "0x89a1b8642a6942f619f78d5e89e23bb14ad03e26": { "name": "Free Access", "order": 0, "network": 137, "recipient": "", "dataBuilder": "", "emailRequired": true, "maxRecipients": null }
  },
  "title": "Gain Access",
  "referrer": "0xd5e3a9199cC1DeD984B44892ef5c8fBB93Bf62d6",
  "skipSelect": false,
  "hideSoldOut": false,
  "pessimistic": true,
  "skipRecipient": true,
  "endingCallToAction": "Unlock",
  "persistentCheckout": true,
  "redirectUri": window.location.href
}


;

document.addEventListener('DOMContentLoaded', function () {
  var logOutButton = document.querySelector('[button="log-out"]');
  if (logOutButton) {
      logOutButton.addEventListener('click', function (e) {
          e.preventDefault(); // Prevent default behavior of the link
          
          localStorage.removeItem('userInfo'); // Clear the local storage key
          location.reload(); // Refresh the page
      });
  }
});



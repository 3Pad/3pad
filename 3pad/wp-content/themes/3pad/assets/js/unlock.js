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

// Check if 'unlock_nonce' is present in sessionStorage
if (!sessionStorage.getItem('unlock_nonce')) {
  // 'unlock_nonce' is not set, execute the unlockProtocolConfig code
  var unlockProtocolConfig = {
      "icon": "https://053d5f40691c2c46d614df8c3be6ac57.ipfs.4everland.link/ipfs/bafybeieqfzh2jxrbjstx5h5h6lktspb2yilzpn4eizueqsvcebubvimjci",
      "locks": {
          "0x89a1b8642a6942f619f78d5e89e23bb14ad03e26": {
              "name": "Free Access",
              "order": 0,
              "network": 137,
              "recipient": "",
              "dataBuilder": "",
              "emailRequired": true,
          "maxRecipients": null,
              "captcha": true,
          }
      },
      "title": "Gain Access",
      "referrer": "0xd5e3a9199cC1DeD984B44892ef5c8fBB93Bf62d6",
      "skipSelect": false,
      "hideSoldOut": false,
      "pessimistic": true,
      "skipRecipient": true,
      "endingCallToAction": "Access Granted",
      "persistentCheckout": false,
      "redirectUri": window.location.href
  };

  // Additional code to use the unlockProtocolConfig as needed
  console.log('unlockProtocolConfig is loaded because unlock_nonce is not set.');
} else {
  var unlockProtocolConfig = {
  "locks": {
    "0x4b63670232e58574c9f94b2382e7db27161b66ea": {
      "network": 137,
      "skipRecipient": true,
      "name": "A Dollar A Day Contribution",
      "captcha": false,
      "password": false,
      "promo": false,
      "emailRequired": false,
      "maxRecipients": null,
      "dataBuilder": "",
      "recurringPayments": "forever"
    },
    "0x8d9799dbb790af451f4370bcae727cf33bcb35b6": {
      "network": 137,
      "name": "A Monthly Contribution",
      "recurringPayments": "forever",
      "skipRecipient": true,
      "captcha": false,
      "password": false,
      "promo": false,
      "emailRequired": false,
      "maxRecipients": null,
      "dataBuilder": ""
      },
    "0x89a1b8642a6942f619f78d5e89e23bb14ad03e26": {

            "order": 0,
            "network": 137,
            "recipient": "",
            "dataBuilder": "",
            "emailRequired": true,
            "maxRecipients": null,
            "name": "Access Key",
        }
  },
  "pessimistic": false,
  "skipRecipient": true,
  "title": "Your Contribution Goes A Long Way & You Can Always Cancel Anytime | Burnafter",
  "icon": "https://media.giphy.com/media/E1bpjy0otOn3a9bn8s/giphy-downsized.gif",
  "persistentCheckout": false,
  "referrer": "",
  "hideSoldOut": false
  
  };
  
 
  console.log('unlock_nonce is already present in sessionStorage.');
}


;

document.addEventListener('DOMContentLoaded', function () {
  var logOutButton = document.querySelector('[button="log-out"]');
  if (logOutButton) {
      logOutButton.addEventListener('click', function (e) {
          e.preventDefault(); // Prevent default behavior of the link
          
          localStorage.removeItem('userInfo'); // Clear the local storage key
          window.location.href; // Reload to /?current with a timestamp to bypass cache

      });
  }
});



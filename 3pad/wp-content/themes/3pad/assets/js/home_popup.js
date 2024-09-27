///Hide App button if in PWA mode
// Function to check if the app is in standalone mode
function isStandalone() {
    return ('standalone' in window.navigator && window.navigator.standalone) || 
           (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
  }
  
  // Function to hide the app button
  function hideAppButton() {
    if (typeof jQuery !== 'undefined') {
        // Hide all elements with class 'appinstall' using jQuery
        jQuery('.appinstall').hide();
    } else {
        // Hide all elements with class 'appinstall' using vanilla JavaScript
        var appButtons = document.getElementsByClassName('appinstall');
        for (var i = 0; i < appButtons.length; i++) {
            appButtons[i].style.display = 'none';
        }
    }
}

  
  // Function to check standalone mode and hide button
  function checkStandaloneAndHide() {
    if (isStandalone()) {
        hideAppButton();
    }
  }
  
  // jQuery ready function for broader compatibility
  if (typeof jQuery !== 'undefined') {
    jQuery(document).ready(checkStandaloneAndHide);
  }
  
  // Vanilla JS event listeners
  document.addEventListener('DOMContentLoaded', checkStandaloneAndHide);
  window.addEventListener('load', checkStandaloneAndHide);
  document.addEventListener('touchend', checkStandaloneAndHide);
  
  // Listen for changes in display mode
  if (window.matchMedia) {
    window.matchMedia('(display-mode: standalone)').addListener(function(e) {
        if (e.matches) {
            hideAppButton();
        }
    });
  }
  
  // Immediate check (for browsers that might have already loaded)
  checkStandaloneAndHide();
  
  
  


document.addEventListener('DOMContentLoaded', function () {
    const installBtn = document.querySelector('.appinstall');
    const popup = document.getElementById('pwa-installPopup');
    const closeBtn = document.querySelector('.pwa-close');
    const instructions = document.getElementById('pwa-instructions');

    // Function to determine platform and show correct instructions
    function showInstallInstructions() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // Check if it's iOS
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            instructions.innerHTML = `
                <p>To install this app on iOS:</p>
                <ol>
                    <li>Tap the <strong>Share</strong> button in Safari's bottom bar.</li>
                    <li>Scroll down and tap <strong>Add to Home Screen</strong>.</li>
                    <li>Confirm by tapping <strong>Add</strong> in the top-right corner.</li>
                </ol>
            `;
        } 
        // Check if it's Android
        else if (/android/i.test(userAgent)) {
            instructions.innerHTML = `
                <p>To install this app on Android:</p>
                <ol>
                    <li>Tap the <strong>three dots</strong> menu in the top-right corner of your browser.</li>
                    <li>Select <strong>Add to Home Screen</strong>.</li>
                    <li>Confirm by tapping <strong>Add</strong>.</li>
                </ol>
            `;
        } 
        // Default message if platform cannot be detected
        else {
            // Check for Safari
            if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
                instructions.innerHTML = `
                    <p>To install this app in Safari:</p>
                    <ol>
                        <li>Tap the <strong>Share</strong> button in Safari's bar.</li>
                        <li>Scroll down and tap <strong>Add to Home Screen or Add to Dock</strong>.</li>
                        <li>Confirm by tapping <strong>Add</strong> in the top-right corner.</li>
                    </ol>
                `;
            } 
            // Check for Chrome
            else if (userAgent.includes("Chrome")) {
                instructions.innerHTML = `
                    <p>To install this app in Chrome:</p>
                    <ol>
                        <li>Tap the <strong>three dots</strong> menu in the top-right corner of your browser.</li>
                        <li>Select <strong>Add to Home Screen</strong>.</li>
                        <li>Confirm by tapping <strong>Add</strong>.</li>
                    </ol>
                `;
            } 
            // Default message if no specific browser is detected
            else {
                instructions.innerHTML = `
                    <p>We couldn't detect your platform. Please use either Safari or Chrome and follow these steps to install:</p>
                    <ol>
                        <li>Open the browser menu.</li>
                        <li>Look for the <strong>Add to Home Screen</strong> option.</li>
                        <li>Confirm the installation.</li>
                    </ol>
                `;
            }
        }
    }

    // Show the popup when the button is clicked
    installBtn.addEventListener('click', function () {
        showInstallInstructions();
        popup.style.display = 'block';
    });

    // Close the popup when the close button is clicked
    closeBtn.addEventListener('click', function () {
        popup.style.display = 'none';
    });

    // Close the popup when clicking outside the content
    window.addEventListener('click', function (event) {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    });
});


// Pop-up FAQ functionality
document.addEventListener('DOMContentLoaded', function () {
const popup = document.getElementById('faq-popup');
const popupTrigger = document.querySelector('.about-pop-up');
const closeBtn2 = document.querySelector('.close-btn');

// Open popup
popupTrigger.addEventListener('click', () => {
  popup.style.display = 'flex';
});
    
    // Close the popup when the close button is clicked
    closeBtn2.addEventListener('click', function () {
        popup.style.display = 'none';
    });



// Close popup if user clicks outside the content
window.addEventListener('click', (event) => {
  if (event.target === popup) {
    popup.style.display = 'none';
  }
});

// FAQ Dropdown functionality
const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach((question) => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            answer.style.display = (answer.style.display === 'block') ? 'none' : 'block';
        });
    });
});


// Pop-up Terms functionality
document.addEventListener('DOMContentLoaded', function () {
    const popup3 = document.querySelector('.popup-container3');

    const popupTrigger3 = document.querySelector('.terms-pop-up');
    const closeBtn3 = document.querySelector('.close-btn3');
    
    // Open popup
    popupTrigger3.addEventListener('click', () => {
      popup3.style.display = 'flex';
    });
        
        // Close the popup when the close button is clicked
        closeBtn3.addEventListener('click', function () {
            popup3.style.display = 'none';
        });
    
    
    
    // Close popup if user clicks outside the content
    window.addEventListener('click', (event) => {
      if (event.target === popup3) {
        popup3.style.display = 'none';
      }
    });
    
 
    });

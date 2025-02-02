


function exitFullscreen() {
  var element = document.getElementById("button_fullscreen");
  if (document.exitFullscreen) {
    element.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    element.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    element.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    element.msExitFullscreen();
  }
}


// // //////////////////////////////////////////////////Unmute Youtube Vimeo///////////////////////////////////////////////

//
var muteControls = document.querySelectorAll(".mute_control");
muteControls.forEach(function (control) {
  control.addEventListener("click", function (event) {
    if (typeof vid1 !== "undefined") {
      vid1.getVolume().then(function (volume) {
        // If the volume is 0, set it to 1 (unmute)
        if (volume === 0) {
          vid1.setVolume(1);
          vid1.play();
        }
        // Otherwise, set it to 0 (mute)
        else {
          vid1.setVolume(0);
          vid1.play();
        }
      });
    }
    // Check if player is defined before trying to access it
    if (typeof player !== "undefined") {
      console.log(player);

      if (player.isMuted()) {
        player.unMute();
        player.playVideo();
      } else {
        player.mute();
        player.playVideo();
      }
    }
  });
});

// get the current path and split it into an array of segments
// get the age restricted prompt element

///Resend Form Stop
if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}
// Check if the div with id 'age-restriction-prompt' exists
if (document.getElementById('age-restriction-prompt')) {
  // Select the age restriction prompt element
  var promptElement = $(".age-restriction-prompt");

  // Check if the prompt element exists
  if (promptElement.length > 0) {
    var match = window.location.pathname.match(/^\/(.+)$/);
    var uniqueValue = match ? match[1] : null;

    // Check if the age restricted flag is set
    if (sessionStorage.getItem("ageRestricted" + uniqueValue) === "true") {
      // Hide the age restricted prompt
      promptElement.hide();
    } else {
      // Show the age restricted prompt
      promptElement.show();

      // Handle the "Yes" button
      $(".yes").click(function () {
        // Hide the age restricted prompt
        promptElement.hide();

        // Set a flag in session storage to remember that the user is over 18 for the session
        sessionStorage.setItem("ageRestricted" + uniqueValue, "true");
      });

      // Handle the "No" button
      $(".no").click(function () {
        // Go back in history
        window.history.back();
      });
    }
  }
}




/////Refresh
const buttonHomeRefresh = document.querySelector(".button_home_refresh");

if (buttonHomeRefresh !== null) {
  buttonHomeRefresh.addEventListener("click", (event) => {
    event.preventDefault();
    const timestamp = new Date().getTime();
    const currentUrl = window.location.href;
    const newUrl =
      currentUrl.indexOf("?") > -1 ? currentUrl.split("?")[0] : currentUrl;
    window.location.href = newUrl + "?page_reload=" + timestamp;
  });
}


//Show Activate Button
jQuery(document).ready(function ($) {
  if ($(".checkout-button-container").is(":visible")) {
    $(".activate-button").hide();
  }

  if ($("#app-version").is(":visible")) {
    $(".firstlogout").show();
  }

  //////////////////////////////////////////////////FadebuttonYoutube///////////////////////////////////////////////

  // Unmute/Mute
  jQuery(".unmute").click(function () {
    jQuery(".mute").fadeIn("fast");
  });
  jQuery(".unmute").click(function () {
    jQuery(".unmute").fadeOut("fast");
  });
  jQuery(".mute").click(function () {
    jQuery(".unmute").fadeIn("fast");
  });
  jQuery(".mute").click(function () {
    jQuery(".mute").fadeOut("fast");
  });
  ///// Exit/Fullscren
  jQuery(".fullscreen").click(function () {
    jQuery(".exitfullscreen").fadeIn("fast");
  });
  jQuery(".fullscreen").click(function () {
    jQuery(".fullscreen").fadeOut("fast");
  });
  jQuery(".exitfullscreen").click(function () {
    jQuery(".fullscreen").fadeIn("fast");
  });
  jQuery(".exitfullscreen").click(function () {
    jQuery(".exitfullscreen").fadeOut("fast");
  });
  ////////////////////////////////////////////////FadebuttonYoutube///////////////////////////////////////////////

  ////////////////////////////////////////////////Lockscreenbuttonfade///////////////////////////////////////////////
  jQuery(".elementor-widget-wrap").click(function () {
    jQuery(".autohide").fadeIn("slow");
  });

  setInterval(function () {
    jQuery(".autohide").fadeOut("slow");
  }, 20000); // <-- time in milliseconds

  jQuery(".elementor-widget-wrap").click(function () {
    jQuery(".videos").fadeOut("slow");
  });

  setInterval(function () {
    jQuery(".videos").css("display", "block");
  }, 20000); // <-- time in milliseconds

  ////////////////////////////////////////////////Lockscreenbuttonfade///////////////////////////////////////////////

  // //////////////////////////////////////////////////Fullscreen///////////////////////////////////////////////
  // Select the fullscreen button
  $(document).ready(function () {
    $(".fullscreen-button").click(function () {
        // Toggle fullscreen-like behavior by adding/removing a custom class
        $("body").toggleClass("fullscreen-mode");

        // Apply fade-in/fade-out animations, excluding #topright
        if ($("body").hasClass("fullscreen-mode")) {
            fadeOutElements(".fullscreenhide:not(#topright)");
            fadeInElements(".fullscreenshow:not(#topright)");
        } else {
            fadeInElements(".fullscreenhide:not(#topright)");
            fadeOutElements(".fullscreenshow:not(#topright)");
        }
    });
});

function fadeInElements(selector) {
    $(selector).each(function() {
        $(this).stop(true, true).css({
            opacity: 0,
            display: 'block'
        }).animate({
            opacity: 1
        }, 750); // Duration in milliseconds
    });
}

function fadeOutElements(selector) {
    $(selector).each(function() {
        $(this).stop(true, true).animate({
            opacity: 0
        }, 750, function() {
            $(this).css('display', 'none');
        }); // Duration in milliseconds
    });
}




  // //////////////////////////////////////////////////Popup///////////////////////////////////////////////
  // Unmute/Mute
  jQuery(".closestream").click(function () {
    jQuery(".streamon").fadeIn("fast");
  });
  jQuery(".closestream").click(function () {
    jQuery(".streamoopen").fadeOut("fast");
  });
  jQuery(".streamon").click(function () {
    jQuery(".streamoopen").fadeIn("fast");
  });
  jQuery(".streamon").click(function () {
    jQuery(".streamon").fadeOut("fast");
  });

  // //////////////////////////////////////////////////Popup///////////////////////////////////////////////
  // // //////////////////////////////////////////////////Unmute Youtube///////////////////////////////////////////////

  /*MP4*/
  jQuery(".unmute").click(function () {
    if (jQuery("video").length > 0) {
      jQuery("video").prop("muted", false);
      jQuery("video").get(0).play();
    }
  });

  jQuery(".mute").click(function () {
    if (jQuery("video").length > 0) {
      jQuery("video").prop("muted", true);
      jQuery("video").get(0).play();
    }
  });

  ////Unmute Button

  ///////////////////Attr Add /////////////////////////////
  if (jQuery(".page-content").is(":visible")) {
    jQuery(".page-numbers").attr("target", "_self");
    jQuery(".post-page-numbers").attr("target", "_self");
  }

  if (jQuery(".page-content > .elementor").is(":visible")) {
    jQuery(".page-content").css("padding", "0");
  }

  jQuery("#unlocklink.w-button").attr(
    "href",
    jQuery(".login-button").attr("href")
  );
  jQuery(".purchase.w-button").attr(
    "href",
    jQuery(".checkout-button").attr("href")
  );
  jQuery(".acc_status_link").attr(
    "href",
    jQuery(".checkout-button").attr("href")
  );

  // /////////////////////////////Attr Add /////////////////////////////
  ////////////////////////////////Age Restrction Prompt

  ///Close Button  & Home Button
  $(".full").click(function () {
    $(".button_home_refresh").hide();
    $(".close_button_home").show();
  });

  $(".close_button_home").click(function () {
    $(".close_button_home").hide();
    $(".button_home_refresh").show();
  });

  //Close Embeds
  ///Comment Button

  $(document).on(
    "click",
    ".close_button_home, #button_fullscreen",
    function () {
      $(".embed1-button-wrapper").removeClass("expanded");
      $(".embed2-button-wrapper").removeClass("expanded");
      $(".embed3-button-wrapper").removeClass("expanded");
      $(".embed4-button-wrapper").removeClass("expanded");
      $(".embed5-button-wrapper").removeClass("expanded");
      $(".embed6-button-wrapper").removeClass("expanded");
      $(".embed10-button-wrapper").removeClass("expanded");
    }
  );

  ///Help Button
  $(document).on("click", ".help-button", function () {
    $(".help-button-wrapper").toggleClass("expanded");
  });

  ///Comment Button
  $(document).on("click", ".comments-button", function () {
    $(".comments-button-wrapper").toggleClass("expanded");
    $(".embed7-button-wrapper").removeClass("expanded");
    $(".embed8-button-wrapper").removeClass("expanded");
    $(".embed9-button-wrapper").removeClass("expanded");
  });

  ////////////Bottom Menu

  ///Embed Button 7 (Bottom Menu)
  $(document).on("click", ".embed7-button, .embed7-content", function () {
    $(".embed7-button-wrapper").toggleClass("expanded");
    $(".embed8-button-wrapper").removeClass("expanded");
    $(".embed9-button-wrapper").removeClass("expanded");
  });

  ///Embed Button 8 (Bottom Menu)
  $(document).on("click", ".embed8-button, .embed8-content", function () {
    $(".embed8-button-wrapper").toggleClass("expanded");
    $(".embed7-button-wrapper").removeClass("expanded");
    $(".embed9-button-wrapper").removeClass("expanded");
  });

  ///Embed Button 9 (Bottom Menu)
  $(document).on("click", ".embed9-button, .embed9-content", function () {
    $(".embed9-button-wrapper").toggleClass("expanded");
    $(".embed7-button-wrapper").removeClass("expanded");
    $(".embed8-button-wrapper").removeClass("expanded");
  });

  ////////////Text Links

  ///Embed Button 2 (Top Middle)
  $(document).on("click", ".embed2-button, .embed2-content", function () {
    $(".embed2-button-wrapper").toggleClass("expanded");
    $(".embed1-button-wrapper").removeClass("expanded");
    $(".embed3-button-wrapper").removeClass("expanded");
    $(".embed4-button-wrapper").removeClass("expanded");
    $(".embed5-button-wrapper").removeClass("expanded");
    $(".embed6-button-wrapper").removeClass("expanded");
    $(".embed10-button-wrapper").removeClass("expanded");
  });

  ///Embed Button 4 (Middle Left)
  $(document).on("click", ".embed4-button, .embed4-content", function () {
    $(".embed4-button-wrapper").toggleClass("expanded");
    $(".embed1-button-wrapper").removeClass("expanded");
    $(".embed2-button-wrapper").removeClass("expanded");
    $(".embed3-button-wrapper").removeClass("expanded");
    $(".embed5-button-wrapper").removeClass("expanded");
    $(".embed6-button-wrapper").removeClass("expanded");
    $(".embed10-button-wrapper").removeClass("expanded");
  });

  ///Embed Button 5 (Middle Right)
  $(document).on("click", ".embed5-button, .embed5-content", function () {
    $(".embed5-button-wrapper").toggleClass("expanded");
    $(".embed1-button-wrapper").removeClass("expanded");
    $(".embed2-button-wrapper").removeClass("expanded");
    $(".embed3-button-wrapper").removeClass("expanded");
    $(".embed4-button-wrapper").removeClass("expanded");
    $(".embed6-button-wrapper").removeClass("expanded");
    $(".embed10-button-wrapper").removeClass("expanded");
  });

  ////////////Corner Icons

  ///Embed Button 1 (Top Left Icon)
  $(document).on("click", ".embed1-button, .embed1-content", function () {
    $(".embed1-button-wrapper").toggleClass("expanded");
    $(".embed2-button-wrapper").removeClass("expanded");
    $(".embed3-button-wrapper").removeClass("expanded");
    $(".embed4-button-wrapper").removeClass("expanded");
    $(".embed5-button-wrapper").removeClass("expanded");
    $(".embed6-button-wrapper").removeClass("expanded");
    $(".embed10-button-wrapper").removeClass("expanded");
  });

  ///Embed Button 3 (Top Right Icon)
  $(document).on("click", ".embed3-button, .embed3-content", function () {
    $(".embed3-button-wrapper").toggleClass("expanded");
    $(".embed1-button-wrapper").removeClass("expanded");
    $(".embed2-button-wrapper").removeClass("expanded");
    $(".embed4-button-wrapper").removeClass("expanded");
    $(".embed5-button-wrapper").removeClass("expanded");
    $(".embed6-button-wrapper").removeClass("expanded");
    $(".embed10-button-wrapper").removeClass("expanded");
  });

  ///Embed Button 6 (Bottom Left Icon)
  $(document).on("click", ".embed6-button, .embed6-content", function () {
    $(".embed6-button-wrapper").toggleClass("expanded");
    $(".embed1-button-wrapper").removeClass("expanded");
    $(".embed2-button-wrapper").removeClass("expanded");
    $(".embed3-button-wrapper").removeClass("expanded");
    $(".embed4-button-wrapper").removeClass("expanded");
    $(".embed5-button-wrapper").removeClass("expanded");
    $(".embed10-button-wrapper").removeClass("expanded");
  });

  ///Embed Button 10 (Bottom Right Icon)
  $(document).on("click", ".embed10-button, .embed10-content", function () {
    $(".embed10-button-wrapper").toggleClass("expanded");
    $(".embed1-button-wrapper").removeClass("expanded");
    $(".embed2-button-wrapper").removeClass("expanded");
    $(".embed3-button-wrapper").removeClass("expanded");
    $(".embed4-button-wrapper").removeClass("expanded");
    $(".embed5-button-wrapper").removeClass("expanded");
    $(".embed6-button-wrapper").removeClass("expanded");
  });

  ///Close PopUP Button
  $(document).on("click", ".close_button", function () {
    $(".embed10-button-wrapper").removeClass("expanded");
    $(".embed1-button-wrapper").removeClass("expanded");
    $(".embed2-button-wrapper").removeClass("expanded");
    $(".embed3-button-wrapper").removeClass("expanded");
    $(".embed4-button-wrapper").removeClass("expanded");
    $(".embed5-button-wrapper").removeClass("expanded");
    $(".embed6-button-wrapper").removeClass("expanded");
    $(".embed7-button-wrapper").removeClass("expanded");
    $(".embed8-button-wrapper").removeClass("expanded");
    $(".embed9-button-wrapper").removeClass("expanded");
  });
});

// Ensure the script runs after the DOM is fully loaded
window.onload = function () {
    // Function to show the install instructions popup
    window.showInstallPopup = function() {
        const popup = document.getElementById('pwa-installPopup');
        const instructions = document.getElementById('pwa-instructions');
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
                        <li>Tap the <strong>Share</strong> button in Safari's bottom bar.</li>
                        <li>Scroll down and tap <strong>Add to Home Screen</strong>.</li>
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
        
        // Show the popup
        popup.style.display = 'block';
    };

    // Function to close the popup
    window.closePopup = function() {
        const popup = document.getElementById('pwa-installPopup');
        popup.style.display = 'none';
    };

    // Close the popup when clicking outside the content
    window.addEventListener('click', function (event) {
        const popup = document.getElementById('pwa-installPopup');
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
};



// Register Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
      function registerServiceWorker(path) {
          return navigator.serviceWorker.register(path)
              .then(function(registration) {
                  console.log("Service worker registered successfully:", registration);
                  return registration;
              })
              .catch(function(error) {
                  console.error("Service worker registration failed for path " + path + ":", error);
                  throw error;
              });
      }

      registerServiceWorker("mobile_app.js")
          .catch(function() {
              // If the first registration attempt fails, try with the local path
              return registerServiceWorker("/../wp-content/themes/3pad/assets/js/pwa_js.js");
          })
          .then(function(registration) {
              // This will run if either registration attempt succeeds
              console.log("Service worker registration completed.");
          })
          .catch(function(error) {
              // This will run if both registration attempts fail
              console.error("All service worker registration attempts failed:", error);
          });
  });
}

///Hide App button if in PWA mode
// Function to check if the app is in standalone mode
function isStandalone() {
  return ('standalone' in window.navigator && window.navigator.standalone) || 
         (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
}

// Function to hide the app button
function hideAppButton() {
  if (typeof jQuery !== 'undefined') {
      jQuery('#app_button').hide();
  } else {
      var appButton = document.getElementById('app_button');
      if (appButton) {
          appButton.style.display = 'none';
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







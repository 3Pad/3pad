


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
  $(".fullscreen-button").click(function () {
    // Toggle fullscreen mode
    $(document).toggleFullScreen();
  });

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


// Register Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/../wp-content/themes/3pad/assets/js/pwa_js.js")
      .then(
        function (registration) {
          console.log("Service worker registered successfully:", registration);
        }
      )
      .catch(function (error) {
        console.error("Service worker registration failed:", error);
      });
  });
}





//Hide app install button
if (window.matchMedia("(display-mode: standalone)").matches) {
  document.getElementById("app_button").style.display = "none";
}
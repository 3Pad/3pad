




//////////////////////////////////////////////////FadebuttonYoutube///////////////////////////////////////////////

jQuery(document).ready(function(){
  // Unmute/Mute
jQuery('.unmute').click(function(){
  jQuery('.mute').fadeIn('fast'); 
});
  jQuery('.unmute').click(function(){
  jQuery('.unmute').fadeOut('fast'); 
});
  jQuery('.mute').click(function(){
  jQuery('.unmute').fadeIn('fast'); 
});
  jQuery('.mute').click(function(){
  jQuery('.mute').fadeOut('fast'); 
});
  ///// Exit/Fullscren
  jQuery('.fullscreen').click(function(){
  jQuery('.exitfullscreen').fadeIn('fast'); 
});
  jQuery('.fullscreen').click(function(){
  jQuery('.fullscreen').fadeOut('fast'); 
});
  jQuery('.exitfullscreen').click(function(){
  jQuery('.fullscreen').fadeIn('fast'); 
});
  jQuery('.exitfullscreen').click(function(){
  jQuery('.exitfullscreen').fadeOut('fast'); 
});
  });
////////////////////////////////////////////////FadebuttonYoutube///////////////////////////////////////////////

////////////////////////////////////////////////Lockscreenbuttonfade///////////////////////////////////////////////
jQuery(document).ready(function(){
jQuery('.elementor-widget-wrap').click(function(){
  jQuery('.autohide').fadeIn('slow'); 
});
  });

jQuery(document).ready(function(){
setInterval(function() {
  jQuery('.autohide').fadeOut('slow');
}, 20000); // <-- time in milliseconds
});

jQuery(document).ready(function(){
jQuery('.elementor-widget-wrap').click(function(){
  jQuery('.videos').fadeOut('slow'); 
});
  });

jQuery(document).ready(function(){
setInterval(function() {
  jQuery('.videos').css('display', 'block');
}, 20000); // <-- time in milliseconds
});
////////////////////////////////////////////////Lockscreenbuttonfade///////////////////////////////////////////////

// //////////////////////////////////////////////////Fullscreen///////////////////////////////////////////////
// Select the fullscreen button
$(document).ready(function() {
$('.fullscreen-button').click(function() {
  // Toggle fullscreen mode
  $(document).toggleFullScreen();
});
});

function exitFullscreen () {
var element = document.getElementById('button_fullscreen');
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

// //////////////////////////////////////////////////Popup///////////////////////////////////////////////
jQuery(document).ready(function(){
  // Unmute/Mute
jQuery('.closestream').click(function(){
  jQuery('.streamon').fadeIn('fast'); 
});
  jQuery('.closestream').click(function(){
  jQuery('.streamoopen').fadeOut('fast'); 
});
  jQuery('.streamon').click(function(){
  jQuery('.streamoopen').fadeIn('fast'); 
});
  jQuery('.streamon').click(function(){
  jQuery('.streamon').fadeOut('fast'); 
});
  });
// //////////////////////////////////////////////////Popup///////////////////////////////////////////////
// // //////////////////////////////////////////////////Unmute Youtube///////////////////////////////////////////////

// // //////////////////////////////////////////////////Unmute Youtube Vimeo///////////////////////////////////////////////


//
var muteControls = document.querySelectorAll(".mute_control");
muteControls.forEach(function(control) {
control.addEventListener('click', function (event) {
  if (typeof vid1 !== 'undefined') {
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
  if (typeof player !== 'undefined') {
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

/*MP4*/
jQuery(document).ready(function () {
  jQuery(".unmute").click( function (){
    if (jQuery("video").length > 0) {
      jQuery("video").prop("muted", false);
      jQuery("video").get(0).play();
    }
  });
  
  jQuery(".mute").click( function (){
    if (jQuery("video").length > 0) {
      jQuery("video").prop("muted", true);
      jQuery("video").get(0).play();
    }
  });
});




////Unmute Button

///////////////////Attr Add /////////////////////////////
jQuery(window).ready(function(){
if (jQuery(".page-content").is(":visible")) {
      jQuery(".page-numbers").attr("target","_self");
  jQuery(".post-page-numbers").attr("target","_self");
  }
});

jQuery(window).ready(function(){
if (jQuery(".page-content > .elementor").is(":visible")) {
      jQuery(".page-content").css("padding","0");
  }
});

jQuery(document).ready(function () {
jQuery('#unlocklink.w-button').attr('href', jQuery('.login-button').attr('href')); 
jQuery('.purchase.w-button').attr('href', jQuery('.checkout-button').attr('href')); 
jQuery('.acc_status_link').attr('href', jQuery('.checkout-button').attr('href')); 
});




// /////////////////////////////Attr Add /////////////////////////////
////////////////////////////////Age Restrction Prompt
// get the current path and split it into an array of segments
var pathSegments = location.pathname.split('/');

// check if the current path has more than one segment (i.e. it's a subsite)
if (pathSegments.length > 1) {
// set the subsitePath to the first segment of the path
var subsitePath = '/' + pathSegments[1];

// get the age restricted prompt element
var promptElement = document.getElementById("age-restriction-prompt");

// check if the prompt element exists
if (promptElement) {
  // show the age restricted prompt
  promptElement.style.display = "block";

  // handle the "Yes" button
  document.querySelector(".yes").onclick = function () {
    // hide the age restricted prompt
    promptElement.style.display = "none";

    // set a flag in local storage to remember that the user is over 18 for the session
    localStorage.setItem(subsitePath, "ageRestricted");
  }

  // handle the "No" button
  document.querySelector(".no").onclick = function () {
    // go back in history
    window.history.back();
  }

  // check if the age restricted flag is set for the current subsite
  if (localStorage.getItem(subsitePath) === "ageRestricted") {
    // hide the age restricted prompt
    promptElement.style.display = "none";
  }
}
}

///Close Button  & Home Button 
jQuery(window).ready(function () {
  $('.full').click(function () {
    $('.button_home').hide();
    $('.close_button_home').show();
  });

  $('.close_button_home').click(function () {
    $('.close_button_home').hide();
    $('.button_home').show();
  });
});

//Close Embeds
///Comment Button
jQuery(document).ready(function($){
  $(document).on('click', '.close_button_home, #button_fullscreen', function() {
    $('.embed1-button-wrapper').removeClass('expanded');
    $('.embed2-button-wrapper').removeClass('expanded');
    $('.embed3-button-wrapper').removeClass('expanded');
    $('.embed4-button-wrapper').removeClass('expanded');
    $('.embed5-button-wrapper').removeClass('expanded');
    $('.embed6-button-wrapper').removeClass('expanded');
    $('.embed10-button-wrapper').removeClass('expanded');
  });
});

///Help Button
jQuery(document).ready(function($){
$(document).on('click', '.help-button', function() {
  $('.help-button-wrapper').toggleClass('expanded');
});
});

///Comment Button
jQuery(document).ready(function($){
  $(document).on('click', '.comments-button', function() {
    $('.comments-button-wrapper').toggleClass('expanded');
    $('.embed7-button-wrapper').removeClass('expanded');
    $('.embed8-button-wrapper').removeClass('expanded');
    $('.embed9-button-wrapper').removeClass('expanded');
  });
});

////////////Bottom Menu 

///Embed Button 7 (Bottom Menu)
jQuery(document).ready(function($){
  $(document).on('click', '.embed7-button', function() {
    $('.embed7-button-wrapper').toggleClass('expanded');
    $('.embed8-button-wrapper').removeClass('expanded');
    $('.embed9-button-wrapper').removeClass('expanded');
  });
});

///Embed Button 8 (Bottom Menu)
jQuery(document).ready(function($){
  $(document).on('click', '.embed8-button', function() {
    $('.embed8-button-wrapper').toggleClass('expanded');
    $('.embed7-button-wrapper').removeClass('expanded');
    $('.embed9-button-wrapper').removeClass('expanded');
  });
});
  
///Embed Button 9 (Bottom Menu)
jQuery(document).ready(function($){
  $(document).on('click', '.embed9-button', function() {
    $('.embed9-button-wrapper').toggleClass('expanded');
    $('.embed7-button-wrapper').removeClass('expanded');
    $('.embed8-button-wrapper').removeClass('expanded');
  });
});

////////////Text Links

///Embed Button 2 (Top Middle)
jQuery(document).ready(function($){
  $(document).on('click', '.embed2-button', function() {
    $('.embed2-button-wrapper').toggleClass('expanded');
    $('.embed1-button-wrapper').removeClass('expanded');
    $('.embed3-button-wrapper').removeClass('expanded');
    $('.embed4-button-wrapper').removeClass('expanded');
    $('.embed5-button-wrapper').removeClass('expanded');
    $('.embed6-button-wrapper').removeClass('expanded');
    $('.embed10-button-wrapper').removeClass('expanded');
  });
});

///Embed Button 4 (Middle Left)
jQuery(document).ready(function($){
  $(document).on('click', '.embed4-button', function() {
    $('.embed4-button-wrapper').toggleClass('expanded');
    $('.embed1-button-wrapper').removeClass('expanded');
    $('.embed2-button-wrapper').removeClass('expanded');
    $('.embed3-button-wrapper').removeClass('expanded');
    $('.embed5-button-wrapper').removeClass('expanded');
    $('.embed6-button-wrapper').removeClass('expanded');
    $('.embed10-button-wrapper').removeClass('expanded');
  });
});
  
///Embed Button 5 (Middle Right)
jQuery(document).ready(function($){
  $(document).on('click', '.embed5-button', function() {
    $('.embed5-button-wrapper').toggleClass('expanded');
    $('.embed1-button-wrapper').removeClass('expanded');
    $('.embed2-button-wrapper').removeClass('expanded');
    $('.embed3-button-wrapper').removeClass('expanded');
    $('.embed4-button-wrapper').removeClass('expanded');
    $('.embed6-button-wrapper').removeClass('expanded');
    $('.embed10-button-wrapper').removeClass('expanded');
  });
});

////////////Corner Icons

///Embed Button 1 (Top Left Icon)
jQuery(document).ready(function($){
  $(document).on('click', '.embed1-button', function() {
    $('.embed1-button-wrapper').toggleClass('expanded');
    $('.embed2-button-wrapper').removeClass('expanded');
    $('.embed3-button-wrapper').removeClass('expanded');
    $('.embed4-button-wrapper').removeClass('expanded');
    $('.embed5-button-wrapper').removeClass('expanded');
    $('.embed6-button-wrapper').removeClass('expanded');
    $('.embed10-button-wrapper').removeClass('expanded');
  });
});

///Embed Button 3 (Top Right Icon)
jQuery(document).ready(function($){
  $(document).on('click', '.embed3-button', function() {
    $('.embed3-button-wrapper').toggleClass('expanded');
    $('.embed1-button-wrapper').removeClass('expanded');
    $('.embed2-button-wrapper').removeClass('expanded');
    $('.embed4-button-wrapper').removeClass('expanded');
    $('.embed5-button-wrapper').removeClass('expanded');
    $('.embed6-button-wrapper').removeClass('expanded');
    $('.embed10-button-wrapper').removeClass('expanded');
  });
});

///Embed Button 6 (Bottom Left Icon)
jQuery(document).ready(function($){
  $(document).on('click', '.embed6-button', function() {
    $('.embed6-button-wrapper').toggleClass('expanded');
    $('.embed1-button-wrapper').removeClass('expanded');
    $('.embed2-button-wrapper').removeClass('expanded');
    $('.embed3-button-wrapper').removeClass('expanded');
    $('.embed4-button-wrapper').removeClass('expanded');
    $('.embed5-button-wrapper').removeClass('expanded');
    $('.embed10-button-wrapper').removeClass('expanded');
  });
});

///Embed Button 10 (Bottom Right Icon)
jQuery(document).ready(function($){
  $(document).on('click', '.embed10-button', function() {
    $('.embed10-button-wrapper').toggleClass('expanded');
    $('.embed1-button-wrapper').removeClass('expanded');
    $('.embed2-button-wrapper').removeClass('expanded');
    $('.embed3-button-wrapper').removeClass('expanded');
    $('.embed4-button-wrapper').removeClass('expanded');
    $('.embed5-button-wrapper').removeClass('expanded');
    $('.embed6-button-wrapper').removeClass('expanded');
  });
});

///Resend Form Stop
if ( window.history.replaceState ) {
  window.history.replaceState( null, null, window.location.href );
}

////Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/wp-content/themes/3pad/assets/js/pwa_js.js').then(function(registration) {
      console.log('Service worker registered successfully:', registration);
    }, function(error) {
      console.error('Service worker registration failed:', error);
    });
  });
}
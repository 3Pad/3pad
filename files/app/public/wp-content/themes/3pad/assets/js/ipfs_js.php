<?php

$nonce        = wp_create_nonce('js-nonce');
$current_user = wp_get_current_user();
$page         = strtolower($current_user->user_login);

$user_login  = $current_user->user_login;
$authpage    = get_page_by_path($user_login);
$authpage_id = $authpage ? $authpage->ID : null;
$custom      = get_field("custom_domain", $authpage_id);

/*
 * echo '<script defer nonce="' . $nonce . '">
 * var xIpfsPath = new XMLHttpRequest();
 * xIpfsPath.open("GET", "https://3pad.eth.limo/';
 * echo $page;
 * $random = wp_rand(8);
 * echo '/?ipfs-check-' . $nonce . '&t=' . time() . '", true);
 * xIpfsPath.onreadystatechange = function() {
 *   if (xIpfsPath.readyState === XMLHttpRequest.DONE) {
 *     var ipfsPath = xIpfsPath.getResponseHeader("x-ipfs-roots")?.split(",")[1].trim();
 *
 *     if (ipfsPath) {
 *       var ipfsHash = document.createElement("a");
 *       ipfsHash.href = "https://dweb.link/ipfs/" + ipfsPath;
 *       ipfsHash.innerText = "" + ipfsPath;
 *       ipfsHash.target = "_blank";
 *       document.getElementById("ipfsPath").innerHTML = "";
 *       document.getElementById("ipfsPath").appendChild(ipfsHash);
 *       var siteLink = document.createElement("a");
 *       siteLink.href = "https://3pad.eth.limo/';
 * echo $page;
 *
 * echo '/";
 *                   siteLink.innerText = "3pad.eth.limo/';
 * echo $page;
 * echo '";
 *       var ipfsLink = document.createElement("a");
 *       ipfsLink.href = "https://3pad.icp.xyz/" + "';
 * echo $page;
 * echo '/"
 *                     ipfsLink.innerText = "3pad.icp.xyz/" + "';
 * echo $page;
 *
 * echo '"
 *       ipfsLink.target = "_blank";
 *
 *       document.getElementById("site_path").innerHTML = "";
 *       document.getElementById("site_path").appendChild(siteLink);
 *     } else {
 *       document.getElementById("ipfsPath").innerHTML = "🛰 Awaiting IPFS CID... 📡";
 *       document.getElementById("site_path").innerHTML = "⏳ Awaiting Publication... 📄";
 *     }
 *   }
 * };
 * xIpfsPath.send();
 * </script>
 *
 * ';
 *
 * echo '<script nonce="' . $nonce . '">
 * function checkSiteAccessibility(url, callback) {
 *   fetch(url, { mode: "no-cors" })
 *     .then(function(response) {
 *       if (response.type === "opaque") {
 *         callback(true);
 *       } else {
 *         callback(false);
 *       }
 *     })
 *     .catch(function(error) {
 *       callback(false);
 *     });
 * }
 *
 * var customDomain = "' . $custom . '";
 * if (customDomain) {
 *   checkSiteAccessibility(customDomain, function(isAccessible) {
 *     if (isAccessible) {
 *       var link = document.createElement("a");
 *       link.href = customDomain;
 *       customDomain = customDomain.replace(/^(https?:\/\/)/, "");
 *       link.innerText = customDomain;
 *       link.target = "_blank";
 *       document.getElementById("ipfsPath_custom").innerHTML = "";
 *       document.getElementById("ipfsPath_custom").appendChild(link);
 *     }else {
 *       var errorLink = document.createElement("a");
 *       errorLink.href = "https://app.tango.us/app/workflow/How-to-link-Custom-Domain-To-site-Using-4everland-2dcafbe3377b424d85998290eda49d18";
 *       errorLink.innerText = "Custom Domain Error..";
 *       errorLink.target = "_blank";
 *       document.getElementById("ipfsPath_custom").innerHTML = "";
 *       document.getElementById("ipfsPath_custom").appendChild(errorLink);
 *     }
 *   });
 * } else {
 *   var setupLink = document.createElement("a");
 *   setupLink.href = "https://app.tango.us/app/workflow/How-to-link-Custom-Domain-To-site-Using-4everland-2dcafbe3377b424d85998290eda49d18";
 *   setupLink.innerText = "↪ Setup Custom URL... ↩";
 *   setupLink.target = "_blank";
 *   document.getElementById("ipfsPath_custom").innerHTML = "";
 *   document.getElementById("ipfsPath_custom").appendChild(setupLink);
 * }
 * </script>';
 */

echo '
 <script defer nonce="' . $nonce . '">
 document.addEventListener("DOMContentLoaded", function() {
   var sitePath = document.getElementById("site_path");
   var customValue = ' . json_encode($custom) . ';
 
   if (customValue && customValue.trim() !== "") {
     // Remove http:// or https:// from the URL
     var cleanedUrl = customValue.replace(/^https?:\/\//, "");
 
     // Create a clickable link with the cleaned URL
     sitePath.innerHTML = "<a href=\"" + customValue + "\" target=\"_blank\" rel=\"noopener noreferrer\">" + cleanedUrl + "</a>";
   } else {
     sitePath.innerHTML = "⏳ Awaiting Publication... 📄";
   }
 
   // Use the custom value as the input for fetching the URL
   var fetchUrl = customValue && customValue.trim() !== "" 
                  ? customValue + "/?app-version-check=' . wp_rand(8) . '" 
                  : "";
 
   // Only fetch if customValue is not empty
   if (fetchUrl) {
     fetch(fetchUrl, {})
       .then(response => response.text())
       .then(html_content => {
         var parser = new DOMParser();
         var doc = parser.parseFromString(html_content, "text/html");
         var meta_tags = doc.getElementsByTagName("meta");
         var versionFound = false;
 
         for (var i = 0; i < meta_tags.length; i++) {
           var metaContent = meta_tags[i].getAttribute("content");
 
           // Check if meta content contains the version number
           if (metaContent && metaContent.includes("3Pad - Version")) {
             versionFound = true;
 
             if (metaContent === "3Pad - Version 1.0") {
               // Show the confirmed-app element for 3 seconds, then slide down
               var confirmedApp = document.getElementById("confirmed-app");
               if (confirmedApp) {
                 confirmedApp.style.display = "block";
                 confirmedApp.style.maxHeight = "0"; // Initialize for transition
                 confirmedApp.style.opacity = "0"; // Initialize for transition
                 setTimeout(function() {
                   confirmedApp.style.transition = "max-height 0.5s ease-out, opacity 0.5s ease-out";
                   confirmedApp.style.maxHeight = "100px"; // Adjust to your max-height value
                   confirmedApp.style.opacity = "1";
                 }, 10); // Timeout to ensure styles are applied correctly
 
                 // Hide after 3 seconds
                 setTimeout(function() {
                   confirmedApp.style.transition = "max-height 0.5s ease-in, opacity 0.5s ease-in";
                   confirmedApp.style.maxHeight = "0";
                   confirmedApp.style.opacity = "0";
                   setTimeout(function() {
                     confirmedApp.style.display = "none";
                   }, 500);
                 }, 3000);
               }
             } else {
               // If the version is not the required version, show the update message
               var updateApp = document.getElementById("update-app");
               if (updateApp) {
                 updateApp.style.display = "block";
                 updateApp.style.maxHeight = "0";
                 updateApp.style.opacity = "0";
                 setTimeout(function() {
                   updateApp.style.transition = "max-height 0.5s ease-out, opacity 0.5s ease-out";
                   updateApp.style.maxHeight = "100px";
                   updateApp.style.opacity = "1";
                 }, 10);
               }
             }
             break;
           }
         }
 
         // If no specific version found or other conditions
         if (!versionFound) {
           var unknownApp = document.getElementById("unknown-app");
           if (unknownApp) {
             unknownApp.style.display = "block";
             unknownApp.style.maxHeight = "0";
             unknownApp.style.opacity = "0";
             setTimeout(function() {
               unknownApp.style.transition = "max-height 0.5s ease-out, opacity 0.5s ease-out";
               unknownApp.style.maxHeight = "100px";
               unknownApp.style.opacity = "1";
             }, 10);
           } else {
             console.error("Element with ID \'unknown-app\' not found.");
           }
         }
       })
       .catch(error => {
         console.error("Error fetching version:", error);
 
         // Handle ERR_FAILED or any fetch error
         var unknownApp = document.getElementById("unknown-app");
         if (unknownApp) {
           unknownApp.style.display = "block";
           unknownApp.style.maxHeight = "0";
           unknownApp.style.opacity = "0";
           setTimeout(function() {
             unknownApp.style.transition = "max-height 0.5s ease-out, opacity 0.5s ease-out";
             unknownApp.style.maxHeight = "100px";
             unknownApp.style.opacity = "1";
           }, 10);
         } else {
           console.error("Element with ID \'unknown-app\' not found.");
         }
       });
   }
 });
 </script>
 ';

?>
<?php

$nonce        = wp_create_nonce('js-nonce');
$current_user = wp_get_current_user();
$page         = strtolower($current_user->user_login);

echo '<script defer nonce="' . $nonce . '">
var xIpfsPath = new XMLHttpRequest();
xIpfsPath.open("GET", "https://3pad.eth.limo/';
echo $page;
$random = wp_rand(8);
echo '/?ipfs-check-' . $nonce . '&t=' . time() . '", true);
xIpfsPath.onreadystatechange = function() {
  if (xIpfsPath.readyState === XMLHttpRequest.DONE) {
    var ipfsPath = xIpfsPath.getResponseHeader("x-ipfs-roots")?.split(",")[1].trim();

    if (ipfsPath) {
      var ipfsHash = document.createElement("a");
      ipfsHash.href = "https://dweb.link/ipfs/" + ipfsPath;
      ipfsHash.innerText = "ipfsPath;
      ipfsHash.target = "_blank"; // Add this line
      document.getElementById("ipfsPath").innerHTML = "";
      document.getElementById("ipfsPath").appendChild(ipfsHash);
      var siteLink = document.createElement("a");
      siteLink.href = "https://3pad.eth.limo/';
echo $page;

echo '/";
                  siteLink.innerText = "3pad.eth.limo/';
echo $page;
echo '";
      var ipfsLink = document.createElement("a");
      ipfsLink.href = "https://3pad.icp.xyz/" + "';
echo $page;
echo '/"
                    ipfsLink.innerText = "3pad.icp.xyz/" + "';
echo $page;

echo '"
      ipfsLink.target = "_blank"; // Add this line
      document.getElementById("ipfsPath_backup").innerHTML = "";
      document.getElementById("ipfsPath_backup").appendChild(ipfsLink);
      document.getElementById("site_path").innerHTML = "";
      document.getElementById("site_path").appendChild(siteLink);
    } else {
      document.getElementById("ipfsPath").innerHTML = "🛰 Awaiting IPFS CID... 📡";
      document.getElementById("ipfsPath_backup").innerHTML = "☁️ Awaiting Link... 🌎";
      document.getElementById("site_path").innerHTML = "⏳ Awaiting Publication... 📄";
    }
  }
};
xIpfsPath.send();  
</script>

';

echo '
<script defer nonce="' . $nonce . '">
fetch("https:///3pad.eth.limo/';
$site_url = do_shortcode('[author_site]');
$random   = wp_rand(8);
echo '/?app-version-check' . $random . '", {},  true)
  .then(response => response.text())
  .then(html_content => {
    var parser = new DOMParser();
    var doc = parser.parseFromString(html_content, "text/html");
    var meta_tags = doc.getElementsByTagName("meta");
    var found = false;
    for (var i = 0; i < meta_tags.length; i++) {
      if (meta_tags[i].getAttribute("content") === "3Pad - Version 1.0") {
        found = true;
        break;
      }
    }
    if (found != true) {
      document.getElementById("update-app").style.display = "block";
    } 
  })
  .catch(error => {
    console.error("Error fetching version:", error);
  });
</script>
';

?>
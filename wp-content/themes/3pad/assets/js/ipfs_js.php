<?php
$nonce = wp_create_nonce('js-nonce');

echo '<script defer nonce="' . $nonce . '">
var xIpfsPath = new XMLHttpRequest();
xIpfsPath.open("GET", "https://3pad.eth.limo/';
$url    = do_shortcode('[author_site]');
$random = wp_rand(8);
echo '/?ipfs-check-' . $nonce . '&t=' . time() . '", true);
xIpfsPath.onreadystatechange = function() {
  if (xIpfsPath.readyState === XMLHttpRequest.DONE) {
    var ipfsPath = xIpfsPath.getResponseHeader("x-ipfs-roots")?.split(",")[1].trim();

    if (ipfsPath) {
      var ipfsHash = document.createElement("a");
      ipfsHash.href = "https://dweb.link/ipfs/" + ipfsPath;
      ipfsHash.innerText = "" + ipfsPath;
      ipfsHash.target = "_blank"; // Add this line
      document.getElementById("ipfsPath").innerHTML = "";
      document.getElementById("ipfsPath").appendChild(ipfsHash);

      var ipfsLink = document.createElement("a");
      ipfsLink.href = "https://3pad.eth.limo/" + "';
$url = do_shortcode('[author_site]');
echo '/"
      ipfsLink.innerText = "3pad.eth.limo" + "';
$url = do_shortcode('[author_site]');
echo '/"
      ipfsLink.target = "_blank"; // Add this line
      document.getElementById("ipfsPath_backup").innerHTML = "";
      document.getElementById("ipfsPath_backup").appendChild(ipfsLink);
    } else {
      document.getElementById("ipfsPath").innerHTML = "🛰 Awaiting IPFS CID... 📡";
      document.getElementById("ipfsPath_backup").innerHTML = "☁️ Awaiting Link... 🌎";
    }
  }
};
xIpfsPath.send();  
</script>

';

echo '
<script defer nonce="' . $nonce . '">
var site_ready = new XMLHttpRequest();
site_ready.open("HEAD", "https://3pad.xyz/';
$site_url = do_shortcode('[author_site]');
$random   = wp_rand(8);
echo '/?publiction-check-' . $random . '", true);
site_ready.onreadystatechange = function() {
  if (site_ready.readyState === XMLHttpRequest.DONE) {
    if (site_ready.status === 200) {
      var siteLink = document.createElement("a");
      siteLink.href = "https://3pad.xyz/';
$site_url = do_shortcode('[author_site]');
echo '";
      siteLink.innerText = "3pad.xyz';
$site_url = do_shortcode('[author_site]');
echo '";
      siteLink.target = "_blank"; // Add this line
      document.getElementById("site_path").innerHTML = "";
      document.getElementById("site_path").appendChild(siteLink);
    }
    else {
      document.getElementById("site_path").innerHTML = "⏳ Awaiting Publication... 📄";
    }
  }
};
site_ready.send();
</script>
';

echo '

<script defer nonce="' . $nonce . '">
fetch("https://3pad.xyz/';
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
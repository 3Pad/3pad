<?php

/**
 * CACHE
 */

////Logout Cache Bust
function my_logout_redirect()
{
  // Check if headers have already been sent
  if (!headers_sent()) {
    // Send Cache-Control and Pragma headers to prevent caching
    header("Cache-Control: no-cache, no-store, must-revalidate");
    header("Pragma: no-cache");
  }

  // Redirect to the home page with a cache-busting parameter
  $url = network_site_url() . '?logged-out=' . wp_generate_password(64, false);
  wp_redirect($url);
  exit;
}

add_action('wp_logout', 'my_logout_redirect');

function unlock_redirect()
{
  // Check if the query string contains "signature="
  if (isset($_SERVER['QUERY_STRING']) && strpos($_SERVER['QUERY_STRING'], 'code=') !== false) {
    // Redirect to the same URL with an additional "unlockpassed=" parameter and a random value between 1 and 9999
    header("Location: " . $_SERVER['PHP_SELF'] . "?unlock_login=" . rand(1, 9999), true, 302);
    exit;
  }
  // Check if the query string contains "signature="
  if (isset($_SERVER['QUERY_STRING']) && strpos($_SERVER['QUERY_STRING'], 'signature=') !== false) {
    // Redirect to the same URL with an additional "unlockpassed=" parameter and a random value between 1 and 9999
    header("Location: " . $_SERVER['PHP_SELF'] . "?unlock_passed=" . rand(1, 9999), true, 302);
    exit;
  }
}

add_action('shutdown', 'unlock_redirect', 99);

function no_cache()
{
  if (isset($_SERVER['QUERY_STRING']) && strpos($_SERVER['QUERY_STRING'], 'code=') !== false) {
    header("Cache-Control: no-cache, no-store, must-revalidate");  // HTTP 1.1.
    header("Pragma: no-cache");  // HTTP 1.0.
    header("Expires: 0");  // Proxies.
  }
}

add_action('wp_login', 'no_cache');

<?php

/**
 * CACHE
 */

// //Logout Cache Bust
function my_logout_redirect()
{
  // Check if headers have already been sent
  if (!headers_sent()) {
    // Send Cache-Control and Pragma headers to prevent caching
    header("Cache-Control: no-cache, no-store");
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

// Redirect To Html Pages
$host       = $_SERVER['HTTP_HOST'];
$requestUri = $_SERVER['REQUEST_URI'];

// Check if the user is a site admin
if (current_user_can('manage_options')) {
  // The user is a site admin, do not perform the redirection
} else {
  // Check if the specific nonce is present
  $expected_nonce = isset($_GET['unique_page_nonce']) ? sanitize_text_field($_GET['unique_page_nonce']) : '';

  // Allow any subdomain before any top-level domain and any path
  if (
    preg_match('/^([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+\.[a-zA-Z]+\/?.*$/', $host) &&
    !preg_match('/^\/(sites\/_sites\/|wp-admin|wp-login\.php)/', $requestUri) &&
    empty($expected_nonce) &&
    !(empty($requestUri) || $requestUri === '/' || parse_url($requestUri, PHP_URL_PATH) === '/')
  ) {
    // Redirect to the specified folder
    header("Location: /sites/_sites$requestUri", true, 301);
    exit ();
  }
}

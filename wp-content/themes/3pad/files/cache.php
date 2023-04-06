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

///Trigger Page Cache Front Page
add_action('acf/save_post', 'update_home_page');

function update_home_page($post_id)
{
  // Check if the action is being called on the options page
  if (!empty($_GET['page']) && $_GET['page'] === 'customize-home') {
    // Get the home page ID
    $home_page_id = get_option('page_on_front');

    // Update the home page
    wp_update_post(
      array(
        'ID'                => $home_page_id,
        'post_modified'     => current_time('mysql'),
        'post_modified_gmt' => current_time('mysql', 1)
      )
    );
  }
}

///Random URL

function add_random_string_to_url($active)
{
  ///Change Url For admins
  if (!is_admin() && is_user_logged_in() && is_main_site() && is_home() && current_user_can('author') && !isset($_GET['post'])) {
    if (!isset($_GET['admin'])) {
      $random_string = wp_rand();
      $current_url   = add_query_arg('admin', $random_string, get_permalink());
      wp_redirect($current_url);
      exit;
    }
  }

  // Get the current time & meta & user
  $user_id                   = get_current_user_id();  //User iD
  $current_time              = time();
  $user_meta_expiration_time = get_user_meta($user_id, 'admin-premium', true);

  ///Change Url For Home Authors
  if (!is_admin() && $user_meta_expiration_time > $current_time && is_user_logged_in() && is_main_site() && !current_user_can('manage_options') && !isset($_GET['post'])) {
    if (!isset($_GET['home-prem'])) {
      $random_string = wp_rand();
      $current_url   = add_query_arg('home-prem', $random_string, get_permalink());
      wp_redirect($current_url);
      exit;
    }
  }

  // Get the current meta
  $current_expiration = get_user_meta($user_id, 'admin-token-expiration', true);
  $starter            = get_user_meta($user_id, 'starter', true);

  ///Change Url For Home Non - Basic
  if (!is_admin() && !empty($current_expiration) && is_user_logged_in() && is_main_site() && !current_user_can('manage_options') && !isset($_GET['post'])) {
    if (!isset($_GET['home-basic'])) {
      $random_string = wp_rand();
      $current_url   = add_query_arg('home-basic', $random_string, get_permalink());
      wp_redirect($current_url);
      exit;
    }
  }

  ///Change Url For Starters
  if (!is_admin() && empty($current_expiration) && is_user_logged_in() && is_main_site() && !current_user_can('manage_options') && !isset($_GET['post'])) {
    if (!isset($_GET['home-setup'])) {
      $random_string = wp_rand();
      $current_url   = add_query_arg('home-setup', $random_string, get_permalink());
      wp_redirect($current_url);
      exit;
    }
  }
}

add_action('init', 'add_random_string_to_url');

// Check if the query string contains "signature="
if (isset($_SERVER['QUERY_STRING']) && strpos($_SERVER['QUERY_STRING'], 'signature=') !== false) {
  // Redirect to the same URL with an additional "unlockpassed=" parameter and a random value between 1 and 9999
  header("Location: " . $_SERVER['PHP_SELF'] . "?unlockpassed=" . rand(1, 9999), true, 301);
  exit;
}

//if (is_main_site()){
//header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1.
//header("Pragma: no-cache"); // HTTP 1.0.
//header("Expires: 0"); // Proxies.
//}

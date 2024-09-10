<?php

/** Users */

// ////////////////////////////Disable Login.php///////////////////////////////////
add_action('init', 'prevent_wp_login');

function prevent_wp_login()
{
  // WP tracks the current page - global the variable to access it
  global $pagenow;
  // /Check IF IP Address if($_SERVER["REMOTE_ADDR"]=='111.111.111.111'){
  // Check if a $_GET['action'] is set, and if so, load it into $action variable
  $action = (isset($_GET['action'])) ? $_GET['action'] : '';
  // Check if we're on the login page, and ensure the action is not 'logout'
  if (!is_user_logged_in() && $pagenow == 'wp-login.php' && (!$action || ($action && !in_array($action, array('logout', 'lostpassword', 'rp', 'resetpass', 'postpass'))))) {
    // Load the home page url
    $page = get_bloginfo('url');
    // Redirect to the home page
    wp_redirect($page);
    // Stop execution to prevent the page loading for any reason
    exit();
  }
}

function disable_wp_login()
{
  // Redirect users away from the login page if they try to access it directly
  if (in_array($GLOBALS['pagenow'], array('wp-login.php', 'wp-register.php'))) {
    wp_redirect(home_url());
    exit();
  }
}

add_action('wp', 'disable_wp_login');

// ////////////////////////////Disable Login.Php///////////////////////////////////

// ////////Disable Password Reset //////////////
class Password_Reset_Removed
{
  function __construct()
  {
    add_filter('show_password_fields', array($this, 'disable'));
    add_filter('allow_password_reset', array($this, 'disable'));
    add_filter('gettext', array(             $this, 'remove'));
  }

  function disable()
  {
    if (is_admin()) {
      $userdata = wp_get_current_user();
      $user     = new WP_User($userdata->ID);
      if (!empty($user->roles) && is_array($user->roles) && $user->roles[0] == 'administrator')
        return true;
    }

    return false;
  }

  function remove($text)
  {
    return str_replace(array('Lost your password?', 'Lost your password'), '', trim($text, '?'));
  }
}

$pass_reset_removed = new Password_Reset_Removed();

function disable_lost_password()
{
  if (isset($_GET['action'])) {
    if (in_array($_GET['action'], array('lostpassword', 'retrievepassword'))) {
      wp_redirect(wp_login_url(), 301);
      exit;
    }
  }
}

add_action("login_init", "disable_lost_password");
// ////////Disable Password Reset //////////////

// ///////////////Disable Registration Page//////////////

add_filter('option_users_can_register', function ($value) {
  $script = basename(parse_url($_SERVER['SCRIPT_NAME'], PHP_URL_PATH));

  if ($script == 'wp-login.php') {
    $value = false;
  }

  return $value;
});

// ///////////////Disable Registration Page//////////////

// ///////////Custom Css Login Page /////////////
function custom_login()
{
?>
<style type="text/css">
  .forgetmenot {
    display: none;
  }

  #backtoblog {
    text-align: center;
    font-weight: bold;
    font-size: 17px;
    padding: 0;
    text-transform: uppercase;
  }

  .uip-login h1 a {
    visibility: hidden;
  }

  body.uip-login::before {
    background-color: black;
  }

  .login .login-button-container {
    bottom: 45px !important;
  }

  body {
    background: black !important;
  }

  .login form {
    background: black !important;
    border: none !important;
  }

  .login .login-button-container .login-button,
  .login-button-container .login-button {
    background-color: #fff !important;
    color: #000 !important;
  }
</style>
<?php
}

add_action('login_enqueue_scripts', 'custom_login');
// ///////////Custom Css Login Page /////////////

// ///Disable default Login/////////
add_action('login_init', function () {
  if (isset($_POST['log']) || isset($_POST['user_login'])) {
    die;
  }
});
// ///Disable default Login//////////

/** This hides the login and password fields so only the social login button is visible */
add_action('login_head', 'wpse_121687_hide_login');

function wpse_121687_hide_login()
{
  $style  = '';
  $style .= '<style type="text/css">';
  $style .= '.login label, .login-button-container::before, .login-button-container::after{ display: none }';
  $style .= '.login .button.wp-hide-pw .dashicons{ display: none }';
  $style .= '.login form .input{ display: none }';
  $style .= '.login form .forgetmenot{ display: none }';
  $style .= '.login #nav a, #wp-submit, .login #backtoblog a { display: none }';
  $style .= '</style>';

  echo $style;
}

/** This hides the login and password fields so only the social login button is visible */

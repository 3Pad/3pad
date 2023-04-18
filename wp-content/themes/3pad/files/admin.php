<?php

/**
 * ADMIN
 */

/////////Disable Deleting Categories

//////Remove Page/Post Widgets

function remove_page_attribute_support()
{
  if (is_admin()) {
    remove_post_type_support('page', 'page-attributes');
    remove_post_type_support('page', 'excerpt');
    remove_post_type_support('page', 'thumbnail');
  }
}

add_action('init', 'remove_page_attribute_support');
/////////Remove Page Widgets

// Update CSS within in Elementor

/////////Removes the leftover 'Visual Editor', 'Keyboard Shortcuts' and 'Toolbar' options.
if (is_admin()) {
  add_action('admin_head', function () {
    ob_start(
      function ($subject) {
        $subject = preg_replace('#<h[0-9]>' . __("Personal Options") . '</h[0-9]>.+?/table>#s', '', $subject, 1);

        return $subject;
      }
    );
  });

  add_action('admin_footer', function () {
    ob_end_flush();
  });
}
/////////Removes the leftover 'Visual Editor', 'Keyboard Shortcuts' and 'Toolbar' options.

////////////////////////////////////// Disable Blocks /////////////////////////////////
add_filter('allowed_block_types_all', 'misha_allowed_block_types');

function misha_allowed_block_types($allowed_blocks)
{
  if (!current_user_can('administrator')) {
    return array(
      'core/paragraph',
      'core/image',
      'core/heading',
      'core/list',
      'core/quote',
      'core/audio',
      'core/video',
      'core/table',
      'core/html',
      'core/preformatted',
      'core/pullquote',
      'core/buttons',
      'core/text-columns',
      'core/nextpage',
      'core/separator',
      'core/spacer',
      'core/embed',
      'unlock-protocol/unlock-box',
      'acf/encrypted-content',
      'acf/bunny-cdn'
    );
  }
}

////////////////////////////////////// Disable Blocks /////////////////////////////////

///////////////////////Disable Admin Full Screen Edit ///////
if (is_admin()) {
  function jba_disable_editor_fullscreen_by_default()
  {
    $script = "jQuery( window ).load(function() { const isFullscreenMode = wp.data.select( 'core/edit-post' ).isFeatureActive( 'fullscreenMode' ); if ( isFullscreenMode ) { wp.data.dispatch( 'core/edit-post' ).toggleFeature( 'fullscreenMode' ); } });";
    wp_add_inline_script('wp-blocks', $script);
  }

  add_action('enqueue_block_editor_assets', 'jba_disable_editor_fullscreen_by_default');
}
///////////////////////Disable Admin Full Screen Edit ///////

///////////////////////Remove Customizer Settings ///////
if (is_admin()) {
  function wpse257129_remove_colors_section(WP_Customize_Manager $wp_customize)
  {
    $wp_customize->remove_section('colors');
    $wp_customize->remove_section('header_image');
    $wp_customize->remove_section('static_front_page');

    echo '<style>
              #accordion-panel-nav_menus{
                  display: none !important;
              } 
              .wp-full-overlay-sidebar-content{
                  background: white;
              } 
              </style>';
  }

  add_action('customize_register', 'wpse257129_remove_colors_section', 100);
}
///////////////////////Remove Customizer Settings ///////

// Remove admin bar menu search box.
add_action(
  'admin_bar_menu',
  function ($wp_admin_bar) {
    $wp_admin_bar->remove_menu('search');
  },
  11
);
// Remove admin bar menu search box.

///////////////// Disable Certain Admin Pages
add_action('admin_head', 'restrict_access');  // action hook for loading code in wp-admin pages.

function restrict_access()
{
  $Path      = $_SERVER['REQUEST_URI'];  // in this case $_SERVER['REQUEST_URI']; will return “/wp-admin”
  $homeadmin = home_url('/wp-admin');
  $home      = home_url();
  $basepath  = $homeadmin;
  $URI       = $home . $Path;

  /*if you want to restrict any other admin page just replace “post-new.php” OR “edit.php” with your desired page.
  current_user_can ('administrator') will check if the user has not administrative capabilities
  */

  if (!current_user_can('administrator')) {  ////Admin Only
    if (
      ($URI == ($basepath . '/options-general.php?page=unlock-protocol')) || ($URI == ($basepath . '/options-privacy.php')) ||
        ($URI == ($basepath . '/options-permalink.php')) || ($URI == ($basepath . '/options-media.php')) ||
        //($URI ==($basepath . '/options-discussion.php'))
        ($URI == ($basepath . '/options-reading.php')) ||
        ($URI == ($basepath . '/options-writing.php')) || ($URI == ($basepath . '/options-general.php')) ||
        ($URI == ($basepath . '/options.php')) || ($URI == ($basepath . '/themes.php')) ||
        ($URI == ($basepath . '/nav-menus.php')) || ($URI == ($basepath . '/admin.php?page=elementor')) ||
        ($URI == ($basepath . '/edit.php?post_type=elementor_font')) || ($URI == ($basepath . '/edit.php?post_type=elementor_icons')) ||
        ($URI == ($basepath . '/admin.php?page=elementor-system-info')) || ($URI == ($basepath . '/admin.php?page=elementor-license')) ||
        ($URI == ($basepath . '/edit.php?post_type=acf-field-group')) || ($URI == ($basepath . '/post-new.php?post_type=acf-field-group')) ||
        ($URI == ($basepath . '/edit.php?post_type=acf-field-group&page=acf-tools')) ||
        ($URI == ($basepath . '/admin.php?page=wp-postratings%2Fpostratings-templates.php')) ||
        ($URI == ($basepath . '/admin.php?page=wp-postratings%2Fpostratings-options.php')) ||
        ($URI == ($basepath . '/edit-comments.php?page=commentpress.php')) ||
        ($URI == ($basepath . '/admin.php?page=elementor-tools')) ||
        ($URI == ($basepath . '/admin-ajax.php?action=elementor_library_direct_actions&library_action=export_template')) ||
        ($URI == ($basepath . '/admin.php?page=uip-overview')) || ($URI == ($basepath . '/admin.php?page=uip-content')) ||
        ($URI == ($basepath . '/users.php?page=wp-user-profile-avatar-settings')) ||
        ($URI == ($basepath . '/wp-admin/post-new.php?post_type=elementor_library')) ||
        ($URI == ($basepath . '/wp-admin/index.php?page=burst#settings'))
    ) {
      // anyone attempting to access this page except administrator will be sent to the below page.

      echo '<meta http-equiv="Refresh" content = "0.01; URL=' . site_url() . '">
                                          <body id="error-page">
                                              <div class="wp-die-message" style="
                                              text-align: center;
                                          "><h1>You need a higher level of permission.</h1><p>Sorry, you are not allowed to manage options for this site.</p><a href="javascript:history.back()">
                                          <h2>GO BACK</h2></a></div>                                
                                          </body>
                                          ';

      exit ();
    }
  }
}

///////////////// Disable Certain Admin Pages

//////////Customize Page Site Settings
add_filter('use_block_editor_for_post', 'disable_gutenberg_on_settings_page', 5, 2);  //////Hiding Gutenberg

function disable_gutenberg_on_settings_page($can, $post)
{
  if ($post) {
    // Replace "site-settings" with the slug of your site settings page.
    //Disable home page editing
    if ($post->ID === 1000) {
      return false;
    }
  }

  return $can;
}
//////////Customize Page Site Settings

/////////////Hide Settings & HOME From Menu

/////////////Hide Settings & HOME From Menu

//////Limit Post Creation
function post_published_limit($post_id)
{
  $author = get_current_user_id();  // Post author ID.
  $post   = get_post($post_id);  // Get the post object.

  if ($post->post_status == 'publish' && count_user_posts($author, 'page') > 5) {
    // Post is being published and count is too high, let's prevent the post from being saved.

    //Trash Post
    $post = array(
      'post_status' => 'trash'
    );
    wp_update_post($post);

    //Show Error Message
    wp_die('Error: Cannot publish more than 5 pages. Check trash.');
    exit;
  }
}

add_action('save_post', 'post_published_limit');

add_action('save_post', 'limit_pages');

/////
function limit_pages($post_id)
{
  $post_type = get_post_type($post_id);
  if ($post_id != 1000) {
    if ($post_type == 'page') {
      $page_count = wp_count_posts('page');
      $published_pages = $page_count->publish + $page_count->draft
        + $page_count->pending;  // count both published and draft/pending pages
      if (isset($_GET['action']) && $_GET['action'] == 'trash') {
        // do nothing if trashing a page
      } else {
        if ($published_pages >= 7) {
          $output = "<style>
#wpwrap {
height: 100%;
display: flex;
align-items: center;
justify-content: center;
}
.wp-die-message {
background-color: #000;
color: #fff;
padding: 20px;
border-radius: 5px;
text-align: center;
}
.wp-die-message p {
margin: 0;
}
.wp-die-message a {
color: #fff;
text-decoration: underline;
}
</style>";
          $output .= "<div class='wp-die-message'>⚠️ You've reached your page limit & can't create more than 5 pages.  <br><br>";
          $output .= "<a href='javascript:history.back()'>Go Back</a></div>";
          wp_die($output);
        }
      }
    }
  }
}

//////Limit Post Creation

///Disable Fields Profile PHP
function disable_first_last_name_fields($user)
{
  // Remove the first name and last name fields from the user profile page
  remove_meta_box('first_name', 'user', 'normal');
  remove_meta_box('last_name', 'user', 'normal');
}

add_action('show_user_profile', 'disable_first_last_name_fields');
add_action('edit_user_profile', 'disable_first_last_name_fields');

////////////////Disable menu items
function remove_menus()
{
  $user          = wp_get_current_user();
  $allowed_roles = array('subscriber', 'editor', 'author', 'contributor');
  if (array_intersect($allowed_roles, $user->roles)) {
    remove_menu_page('site-health.php');  //Dashboard Hide
    remove_menu_page('upload.php');  //Media
    remove_menu_page('options-general.php');  //Options General Hide
    remove_menu_page('themes.php');  //Themes Hide
    remove_menu_page('uip-content');  //Uip Hide
    remove_menu_page('tools.php');  //Tools Hide
    remove_menu_page('edit.php');  //Edit Hide
    remove_menu_page('edit.php?post_type=page');  //Tools Hide
    remove_menu_page('edit-comments.php');  //comments Hide
    remove_menu_page('wp-postratings/postratings-manager.php');  //Ratings Hide
    remove_menu_page('edit.php?post_type=acf-field-group');  //ACF Hide
    remove_submenu_page('edit-comments.php', 'commentpress.php');  //Comment Hide
    remove_submenu_page('user.php', 'wp-user-profile-avatar-settings');
  }
}

add_action('admin_menu', 'remove_menus', 1000);
////////////////Disable menu items

/////////////Redirect Help To 3Pad
$words = array('?3padhelp');
foreach ($words as $word) {
  if (stristr($_SERVER["REQUEST_URI"], $word) !== false) {
    exit (header("Location: https://www.youtube.com/playlist?list=PLvDo1PIwr6nqF61OmJgZGDfq-cD_8bcnf"));
    //exit(header("HTTP/1.0 410 Gone"));
  }
}

/////////////Redirect TO Launchpad
$words = array('?launchpad');
foreach ($words as $word) {
  if (stristr($_SERVER["REQUEST_URI"], $word) !== false) {
    $random = time();
    exit (header("Location: /?" . urlencode($random)));
    //exit(header("HTTP/1.0 410 Gone"));
  }
}
/////////////Unlock Protocol Locks Page
$words = array('?page=locks');
foreach ($words as $word) {
  if (stristr($_SERVER["REQUEST_URI"], $word) !== false) {
    exit (header("Location: https://app.unlock-protocol.com/locks"));
    //exit(header("HTTP/1.0 410 Gone"));
  }
}
/////////////Encrypt Page
$words = array('?encrypt');
foreach ($words as $word) {
  if (stristr($_SERVER["REQUEST_URI"], $word) !== false) {
    exit (header("Location: https://3pad.xyz/encrypt.html"));
    //exit(header("HTTP/1.0 410 Gone"));
  }
}
/*
/////////////Status
$words = array('?status');
foreach ($words as $word) {
if (stristr($_SERVER["REQUEST_URI"], $word) !== false) {
exit(header("Location: https://app.unlock-protocol.com/keychain"));
//exit(header("HTTP/1.0 410 Gone"));
}
}
*/
/////////////Analytics
$words = array('?analytics');
foreach ($words as $word) {
  if (stristr($_SERVER["REQUEST_URI"], $word) !== false) {
    $site = site_url();
    exit (header("Location: $site/wp-admin/index.php?page=burst"));
    //exit(header("HTTP/1.0 410 Gone"));
  }
}

/////////////Bug Report
$words = array('?bugreport');
foreach ($words as $word) {
  if (stristr($_SERVER["REQUEST_URI"], $word) !== false) {
    $site = site_url();
    exit (header("Location: https://tally.so/r/nWJbQe"));
    //exit(header("HTTP/1.0 410 Gone"));
  }
}

///////ENS
/////////////Analytics
$words = array('?go-to-ens');
foreach ($words as $word) {
  if (stristr($_SERVER["REQUEST_URI"], $word) !== false) {
    // Get the admin email address
    $admin_email = get_bloginfo('admin_email');

    // Extract the part of the email address before the "@" symbol
    $at_index = strpos($admin_email, '@');
    if ($at_index !== false) {
      $email_username = substr($admin_email, 0, $at_index);
    } else {
      // Handle the case where "@" is not found
      $email_username = $admin_email;
    }

    $site_path = '/' . $email_username;

    exit (header("Location: https://app.ens.domains/address$site_path"));
    //exit(header("HTTP/1.0 410 Gone"));
  }
}

//Redirect To Custom Dashboard
function custom_site_name_url()
{
  global $wp_admin_bar;

  // Get the home URL of the network
  $network_home_url = site_url();

  // Get the "Site Name" menu item
  $site_name_menu_item = $wp_admin_bar->get_node('site-name');

  // Set the custom URL for the "Site Name" menu item
  $site_name_menu_item->href = $network_home_url . '/wp-admin/admin.php?page=customize-home';

  // Add the modified "Site Name" menu item
  $wp_admin_bar->add_node($site_name_menu_item);
}

add_action('wp_before_admin_bar_render', 'custom_site_name_url');

////////////////////Add Menu Option
add_action('admin_menu', 'add_nav_menus_link_for_editor');

function add_nav_menus_link_for_editor()
{
  // Check for the user's wp-admin-token-expiration meta field
  $user_id = get_current_user_id();

  // Get the current time & meta
  $current_time              = time();
  $user_meta_expiration_time = get_user_meta($user_id, 'admin-premium', true);

  // The user meta field is not valid (premium), deny access to the admin page...
  if ($user_meta_expiration_time < $current_time && !is_super_admin()) {
    /////////Add Content Page
    /*
    add_menu_page(
      ////Customize Main Menu
      __('Pages'),
      // the page title
      __('Pages 🔒'),
      //menu title
      'edit_pages',
      //capability
      'edit.php?post_type=page',
      //menu slug/handle this is what you need!!!
      '',
      //callback function
      'dashicons-welcome-write-blog',
      //icon_url,
      10 //position
    );

*/
  }
  ///All

  add_menu_page(
    __('Launchpad'),
    // the page title
    __('Launchpad 🚀'),
    // the menu title
    'author',
    //capability
    '?launchpad',
    // 3pad help page //menu slug
    'launchpad',
    'dashicons-info',
    900
  );

  //<------------> If user is premium Member <------------>
  if ($user_meta_expiration_time > $current_time && !is_super_admin()) {
    // Custom link to the nav menus page
    /*
    add_menu_page(
    __('Site menu'),
    __('Edit Site Info'),
    'edit_pages',
    '/customize.php', // Site Info
    '',
    'dashicons-edit',
    0
    );
    ////
    add_menu_page(
    __('Help'),
    // the page title
    __('Help ℹ️'),
    // the menu title
    'delete_private_pages',
    //capability
    '?3padhelp',
    // 3pad help page //menu slug
    '3padhelp',
    'dashicons-editor-help',
    2000
    );
    */

    /////////Add Domain Mapping Page
    /*
    add_menu_page(
    ////Customize Main Menu
    __('Beta'),
    // the page title
    __('Beta Test ⌛'),
    //menu title
    'edit_pages',
    //capability
    '#',
    //menu slug/handle this is what you need!!!
    '',
    //callback function
    'dashicons-hourglass',
    //icon_url,
    800 //position
    );
    */

    /////////Add Content Page
    add_menu_page(
      ////Customize Main Menu
      __('Pages'),
      // the page title
      __('Pages'),
      //menu title
      'edit_pages',
      //capability
      'edit.php?post_type=page',
      //menu slug/handle this is what you need!!!
      '',
      //callback function
      'dashicons-welcome-write-blog',
      //icon_url,
      10  //position
    );
    /*
    add_menu_page(
      __('Analytics'),
      // the page title
      __('Analytics'),
      // the menu title
      'delete_private_pages',
      //capability
      '?analytics',
      // 3pad help page //menu slug
      'status',
      'dashicons-chart-area',
      50
    );
    */
  }
}

/////Remove Dashboard Widgets
function remove_dashboard_widgets()
{
  global $wp_meta_boxes;

  unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_quick_press']);
  unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_incoming_links']);
  unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_right_now']);
  unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_plugins']);
  unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_recent_drafts']);
  unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_recent_comments']);
  unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_primary']);
  unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_secondary']);
  unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_activity']);
}

add_action('wp_dashboard_setup', 'remove_dashboard_widgets');

////Redirect if Trying To edit home page
add_action('init', function () {
  $current_page = "$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

  if (strpos($current_page, 'wp-admin/post.php?post=1000&action=edit') !== false && is_user_logged_in()) {
    wp_redirect('admin.php?page=customize-home');
    exit;
  }
});

///Detect if Title is empty if so redirect (New Users) (ACF ERROR)
function check_if_home_pending()
{
  //Get blog Id
  $user_id = get_current_user_id();
  $blog_id = get_current_blog_id();
  //Check if title is empty
  $title   = get_field('site_title', 'option');
  //If Title is empty. Isn't on admin page. isn't on login page. Isn't mainsite (WPMU)
  if ($title == NULL && !is_main_site() && current_user_can('edit_pages')) {
    echo "<script>alert('Please Setup Your Landing Page. Enter Title To Start'); </script>";
  }
}

add_action('admin_notices', 'check_if_home_pending');
add_action('template_redirect', 'check_if_home_pending');

//Disable Avatars
add_filter('option_show_avatars', '__return_false');

///Remove Post Revision
function limit_post_revisions($num, $post)
{
  return 0;
}

add_filter('wp_revisions_to_keep', 'limit_post_revisions', 10, 2);

///Admin Tiltle & Favicon Changes
function remove_admin_bar_wp_title($admin_title)
{
  $admin_title = str_replace('WordPress', 'Dashboard | 3Pad', $admin_title);

  return $admin_title;
}

add_filter('admin_title', 'remove_admin_bar_wp_title');

function metahead()
{
  $title = get_field('site_title', 'option');
  $ico   = get_theme_file_uri('/assets/images/favicon.ico');
  echo ' <link href="' . $ico . '" rel=icon type=image/x-icon>
  <meta content="#000000" name=theme-color>
  ';
}

add_action('admin_head', 'metahead', 0);

remove_action('admin_head', '_admin_bar_bump_cb');

///Redirect from page edit screen non admin
function my_custom_redirect()
{
  if (!current_user_can('manage_options')) {
    if (isset($_GET['action']) && $_GET['action'] === 'edit') {
      wp_redirect(admin_url('/admin.php?page=customize-home'), 301);
      exit;
    }
  }
}

add_action('admin_init', 'my_custom_redirect');

///Simply Static Menu
function change_ss_settings_capability($capability)
{
  return 'manage_options';
}

add_filter('ss_settings_capability', 'change_ss_settings_capability');

///Load Custom admin Javascript file
function load_admin_js() {
	if ( ! is_super_admin() ) {
		wp_enqueue_script( 'dashboard-js1', get_theme_file_uri( '/assets/js/dashboard.js' ), array( 'jquery' ), '1.0', true );
	}
}

add_action( 'admin_enqueue_scripts', 'load_admin_js' );

function load_admin_css() {
  if ( ! is_super_admin() ) {
    wp_enqueue_style( 'dashboard-css', get_theme_file_uri( '/assets/css/admin.css' ), array(), '1.0', 'all', 999 );
  }
}

add_action( 'admin_enqueue_scripts', 'load_admin_css', 0 );




/******ADMIN AREA*****/

<?php

/** Security */

// //////Disable Global Search Uipress??

// ////////Disable Delete option post/pages & Catgories
function disable_create_newpost()
{
  global $wp_post_types;
  global $wp_taxonomies;
  if (!current_user_can('administrator') && is_admin()) {
    $wp_post_types['post']->cap->create_posts     = 'do_not_allow';
    $wp_post_types['post']->cap->delete_post      = 'do_not_allow';
    $wp_taxonomies['category']->cap->delete_terms = 'do_not_allow';
    $wp_taxonomies['category']->hierarchical      = false;
  }
}

add_action('init', 'disable_create_newpost');
// ////////Disable Delete option post/pages

// /////////////////Disable Trashing Pages

/*
 * function restrict_page_home_deletion($wp_post_types){
 *   global $wp_post_types;
 *   $screen = get_current_screen();
 *   if(!current_user_can('administrator')){
 *   if($screen->id == 'elementor_library'){
 *     echo '<html>
 *     <head>
 *       <title></title>
 *     </head>
 *     <body style="background: black;">
 *       <h1 style="color: white; text-align: center; margin-top: 50vh;">Too important?</h1><a href="javascript:history.back()">
 *       <h1 style="color: white; text-align: center;">Go back...</h1></a>
 *     </body>
 *     </html>';
 *     exit;
 *   }
 *     }
 *
 * }
 * add_action('before_delete_post', 'restrict_page_home_deletion');
 */
// /////////////////Disable Trashing Pages

// /////////////Disable Elementor Delete OPtions

/*
 * add_filter( 'post_row_actions', 'remove_row_actions', 100, 1 );
 * function remove_row_actions( $actions )
 * {
 *     if( get_post_type() === 'elementor_library' ){
 *     unset( $actions['clone'] );
 *     unset( $actions['trash'] );
 *     unset($actions['edit']);
 *     unset($actions['view']);
 *     unset($actions['inline hide-if-no-js']);
 *     unset($actions['elementor_export_multiple_templates']);
 *     }
 *      return $actions;
 * }
 */
// /////////////Disable Elementor Delete Options

// /////Disable Quick Edit Trash
add_filter('post_row_actions', 'my_disable_quick_edit', 10, 2);
add_filter('page_row_actions', 'my_disable_quick_edit', 10, 2);

function my_disable_quick_edit($actions = array(), $post = null)
{
  if (isset($actions['inline hide-if-no-js'])) {
    unset($actions['inline hide-if-no-js']);
    unset($actions['trash']);
  }

  return $actions;
}
// /////Disable Quick Edit Trash

// ///////Disable Media upload options
function remove_media_tabs($strings)
{
  unset($strings["setFeaturedImageTitle"]);
  unset($strings["createGalleryTitle"]);
  unset($strings["uploadFilesTitle"]);
  unset($strings["insertMediaTitle"]);
  unset($strings["searchMediaLabel"]);
  unset($strings["attachmentDetails"]);
  unset($strings["mediaLibraryTitle"]);
  unset($strings["addMedia"]);

  return $strings;
}

add_filter('media_view_strings', 'remove_media_tabs');
// ///////Disable Media upload options

// /////////////Disable ACF Edit Non Admin
function my_acf_settings_capability($path)
{
  return 'administrator';
}

add_filter('acf/settings/capability', 'my_acf_settings_capability');
// /////////////Disable ACF Edit Non Admin

// ///////////Disable Deleting Specific Pages

/*
 * function restrict_customize_page_deletion($post_ID){
 *
 *   //Check If Admin First Or not main site
 *   if ( !is_super_admin() || !is_main_site()){
 *     //Restrict The Default Pages Fom Being Deleted or Trashed
 *   if(($post_ID == 1000 || $post_ID == 2000 || $post_ID == 3000 || $post_ID == 4000 || $post_ID == 5000 || $post_ID == 6000  ))
 *    {
 *     echo '<html>
 *     <head>
 *       <title></title>
 *     </head>
 *     <body style="background: black;">
 *       <h1 style="color: white; text-align: center; margin-top: 50vh;">Too Important To Delete</h1><a href="javascript:history.back()">
 *       <h1 style="color: white; text-align: center;">Go back...</h1></a>
 *     </body>
 *     </html>';
 *     exit;
 *    }
 *   }
 * }
 * add_action('wp_trash_post', 'restrict_customize_page_deletion', 10, 1);
 * add_action('before_delete_post', 'restrict_customize_page_deletion');
 */
// ///////////Disable Deleting Specific Pages

// //Redirect Reusable Blocks - Security Json Upload
add_action('init', function () {
  $current_page = "$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

  if (strpos($current_page, 'wp-admin/edit.php?post_type=wp_block') !== false && is_admin() && !current_user_can('manage_options')) {
    wp_redirect('edit.php?post_type=page');
    exit;
  }
});

// Disable the "Import from JSON" button in the Gutenberg editor.
add_filter('wp_import_post_data', '__return_empty_array', 10);

// ///////////Disable Export Elementor
$words = array('elementor_export_multiple_templates', 'export_template');
foreach ($words as $word) {
  if (stristr($_SERVER["REQUEST_URI"], $word) !== false) {
    exit(header("Location: /"));
    // exit(header("HTTP/1.0 410 Gone"));
  }
}
// ///////////Disable Export Elementor

// /Hide User Capabilities
function remove_additional_capabilities()
{
  return false;
}

add_filter('additional_capabilities_display', 'remove_additional_capabilities');

// //////////////Disable menu page access
function wpdocs_remove_menus()
{
  $user          = wp_get_current_user();
  $allowed_roles = array('editor', 'author', 'contributor');
  if (array_intersect($allowed_roles, $user->roles)) {
    remove_menu_page('index.php');  // Dashboard
  }
}

add_action('admin_menu', 'wpdocs_remove_menus');
// //////////////Disable dashboard access

// ////////////////Disable Application Password
if (is_admin()) {
  function your_prefix_customize_app_password_availability($available, $user)
  {
    if (!in_array('administrator', (array) $user->roles) && !in_array('contributor', (array) $user->roles) && !in_array('author', (array) $user->roles)) {
      $available = false;
    }

    return $available;
  }

  add_filter('wp_is_application_passwords_available_for_user', 'your_prefix_customize_app_password_availability', 10, 2);
}
// ////////////////Disable Application Password

// ////////////////////////////Remover Logo & Version Number
add_filter('admin_footer_text', '__return_empty_string', 11);
add_filter('update_footer', '__return_empty_string', 11);

/* Remove WordPress menu from admin bar */
add_action('admin_bar_menu', 'remove_wp_logo', 999);

function remove_wp_logo($wp_admin_bar)
{
  $wp_admin_bar->remove_node('wp-logo');
}

// ////////////////////////////Remover Logo & Version Number

// /////////////////////////////LogOut No Confirm
add_action('login_form_logout', function () {
  $user = wp_get_current_user();

  wp_logout();

  if (!empty($_REQUEST['redirect_to'])) {
    $redirect_to = $requested_redirect_to = $_REQUEST['redirect_to'];
  } else {
    $redirect_to           = '#loggedout';
    $requested_redirect_to = '';
  }

  wp_safe_redirect(home_url());
  exit();
});
// //////////////////////////////Logout No Confirm
if (!is_admin()) {
  /*
   * /////////////////////////////Only Load Iframes////////////////////////
   * function iframe_protection() {
   * if(!is_front_page()){
   * if(!current_user_can( 'edit_posts' )) {
   * echo '
   * <script type="text/javascript">
   * if (frameElement == null) {
   * //change location or close
   * window.location = "/";
   * // or window.close();
   * }
   * </script>
   * '
   * ;
   * }
   * }
   * }
   * add_action('wp_head', 'iframe_protection', 0);
   * /////////////////////////////Only Load Iframes////////////////////////
   */

  // /* Disable Rest api */
  // Add a filter to the rest_authentication_errors hook to disable the REST API
  add_filter('rest_authentication_errors', 'wp_snippet_disable_rest_api');

  // Define the function that will be called when the filter is applied
  function wp_snippet_disable_rest_api($access)
  {
    // Get the current user and blog IDs
    $user_id = get_current_user_id();
    $blog_id = get_current_blog_id();

    // Check if the current user is a super admin and is logged in
    if (current_user_can('manage_options') && is_user_logged_in()) {
      // If the user is a super admin and is logged in, allow access to the REST API
      return $access;
    }
    // Check if the current user is logged in and is a member of the current blog
    elseif (is_user_logged_in() && is_user_member_of_blog($user_id, $blog_id)) {
      // If the user is logged in and is a member of the current blog, allow access to the REST API
      return $access;
    } else {
      // If none of the above conditions are met, return a WP_Error object with the message "REST API is disabled"
      return new WP_Error('rest_disabled', __('REST API is disabled.'), array('status' => rest_authorization_required_code()));
    }
  }

  // Remove the 'rest_output_link_wp_head' action, which outputs a link to the REST API in the site's `<head>` element
  remove_action('wp_head', 'rest_output_link_wp_head');

  // /* Disable Rest api */

  // //////////////////////////////////Disable Post Page////////////////////////////////////
  add_action('pre_get_posts', 'wpse44983_single_post_404');

  function wpse44983_single_post_404($query)
  {
    if ($query->is_main_query() && $query->is_single() && !current_user_can('edit_posts')) {
      $query->is_404 = true;
    }
  }
  // //////////////////////////////Disable Post Page////////////////////////////////////

  // ///404
  function shailan_redirect_404()
  {
    global $wp_query;
    if ($wp_query->is_404) {
      wp_redirect(home_url('#404'), 301);
      exit;
    }
  }

  add_action('template_redirect', 'shailan_redirect_404', 1);
  // /404

  // Prevent search queries.
  add_action(
    'parse_query',
    function ($query, $error = true) {
      if (is_search() && !current_user_can('manage_options')) {
        $query->is_search       = false;
        $query->query_vars['s'] = false;
        $query->query['s']      = false;
        if (true === $error) {
          $query->is_404 = true;
        }
      }
    },
    15,
    2
  );

  // Remove the Search Widget.
  add_action(
    'widgets_init',
    function () {
      unregister_widget('WP_Widget_Search');
    }
  );

  // Remove the search form.
  add_filter('get_search_form', '__return_empty_string', 999);

  // Remove the core search block.
  add_action(
    'init',
    function () {
      if (!function_exists('unregister_block_type') || !class_exists('WP_Block_Type_Registry')) {
        return;
      }
      $block = 'core/search';
      if (WP_Block_Type_Registry::get_instance()->is_registered($block)) {
        unregister_block_type($block);
      }
    }
  );

  // Remove wpml meta generator tag
  add_action('wp_head', '_remove_wpml_generator', 0);

  function _remove_wpml_generator()
  {
    if (!empty($GLOBALS['sitepress'])) {
      remove_action(current_filter(), array($GLOBALS['sitepress'], 'meta_generator_tag'));
    }
  }
  // Remove wpml meta generator tag

  // //////Emoji end
  function disable_emojis()
  {
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('admin_print_scripts', 'print_emoji_detection_script');
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('admin_print_styles', 'print_emoji_styles');
    remove_filter('the_content_feed', 'wp_staticize_emoji');
    remove_filter('comment_text_rss', 'wp_staticize_emoji');
    remove_filter('wp_mail', 'wp_staticize_emoji_for_email');

    // Remove from TinyMCE
    add_filter('tiny_mce_plugins', 'disable_emojis_tinymce');
  }

  add_action('init', 'disable_emojis');

  function disable_emojis_tinymce($plugins)
  {
    if (is_array($plugins)) {
      return array_diff($plugins, array('wpemoji'));
    } else {
      return array();
    }
  }

  // //////Emoji end

  // Remove Version #
  add_filter('the_generator', '__return_empty_string');

  // ////Disable Feed
  function itsme_disable_feed()
  {
    wp_die(__('No feed available, please visit the <a href="' . esc_url(home_url('/')) . '">homepage</a>!'));
  }

  add_action('do_feed', 'itsme_disable_feed', 1);
  add_action('do_feed_rdf', 'itsme_disable_feed', 1);
  add_action('do_feed_rss', 'itsme_disable_feed', 1);
  add_action('do_feed_rss2', 'itsme_disable_feed', 1);
  add_action('do_feed_atom', 'itsme_disable_feed', 1);
  add_action('do_feed_rss2_comments', 'itsme_disable_feed', 1);
  add_action('do_feed_atom_comments', 'itsme_disable_feed', 1);
  remove_action('wp_head', 'feed_links_extra', 3);
  remove_action('wp_head', 'feed_links', 2);
  // ////Disable Feed

  // Disable wlwmanifest
  remove_action('wp_head', 'wlwmanifest_link');

  // /Remove Shortlink
  remove_action('wp_head', 'wp_shortlink_wp_head');

  // Remove Really Simple Discovery Link
  remove_action('wp_head', 'rsd_link');

  // Turn off oEmbed auto discovery.
  add_filter('embed_oembed_discover', '__return_false');

  // Don't filter oEmbed results.
  remove_filter('oembed_dataparse', 'wp_filter_oembed_result', 10);

  // Remove oEmbed discovery links.
  remove_action('wp_head', 'wp_oembed_add_discovery_links');

  // Remove oEmbed-specific JavaScript from the front-end and back-end.
  remove_action('wp_head', 'wp_oembed_add_host_js');

  // Remove all embeds rewrite rules.
  /* add_filter( 'rewrite_rules_array', 'disable_embeds_rewrites' ); */

  // ////////////////////////////Remove Google Font///////////////////////////////////
  function bunny_fonts_swap_src($src)
  {
    // Define patterns and replacements
    $patterns = [
      '/fonts\.googleapis\.com\/css2/' => 'fonts.bunny.net/css2',  // Replace googleapis css2
      '/fonts\.googleapis\.com\/css/'  => 'fonts.bunny.net/css',  // Replace googleapis css
      '/fonts\.googleapis\.com/'       => 'fonts.bunny.net',  // Replace googleapis base
      '/fonts\.gstatic\.com/'          => 'fonts.bunny.net',  // Replace gstatic
    ];

    // Perform the replacements
    $src = preg_replace(array_keys($patterns), array_values($patterns), $src);

    return $src;
  }

  // Change font embed urls.
  add_filter('style_loader_src', 'bunny_fonts_swap_src');
  // Change dns-prefetch urls.
  add_filter('wp_resource_hints', 'bunny_fonts_swap_src');
  // ////////////////////////////Remove Google Font///////////////////////////////////

  // Disable Login.php
  function disable_wp_login_php()
  {
    if (!isset($_GET['action'])) {
      // Redirect to homepage if the user is not logged in and the 'action' query parameter is not set
      wp_redirect(home_url());
      exit;
    }
  }

  add_action('login_init', 'disable_wp_login_php');

  // ///////Disable Category Page
  add_action('template_redirect', 'meks_remove_wp_archives');

  function meks_remove_wp_archives()
  {
    // If we are on category or tag or date or author archive
    if (is_category() || is_tag() || is_date() || is_author()) {
      wp_redirect(home_url('#denied'));
    }
  }

  // /////Disable Category Page
}

// ////////Disable XML Rpc
// Disable all xml-rpc endpoints
add_filter('xmlrpc_methods', function () {
  return [];
}, PHP_INT_MAX);
// ////////Disable XML Rpc

// ////////Disable Application Password
add_filter('wp_is_application_passwords_available', '__return_false');
// ////////Disable Application Password

// /////Enable SVG Upload
function add_file_types_to_uploads($file_types)
{
  $new_filetypes        = array();
  $new_filetypes['svg'] = 'image/svg+xml';
  $file_types           = array_merge($file_types, $new_filetypes);

  return $file_types;
}

add_filter('upload_mimes', 'add_file_types_to_uploads');
// /////Enable SVG Upload

// /////Disable Media Uploads
// ////Disable Media Uploads

// /////Disable All Comments
add_action('admin_init', function () {
  // Redirect any user trying to access comments page
  global $pagenow;

  if ($pagenow === 'edit-comments.php') {
    wp_safe_redirect(admin_url());
    exit;
  }

  // Remove comments metabox from dashboard
  remove_meta_box('dashboard_recent_comments', 'dashboard', 'normal');

  // Disable support for comments and trackbacks in post types
  foreach (get_post_types() as $post_type) {
    if (post_type_supports($post_type, 'comments')) {
      remove_post_type_support($post_type, 'comments');
      remove_post_type_support($post_type, 'trackbacks');
    }
  }
});

// Close comments on the front-end
add_filter('comments_open', '__return_false', 20, 2);
add_filter('pings_open', '__return_false', 20, 2);

// Hide existing comments
add_filter('comments_array', '__return_empty_array', 10, 2);

// Remove comments page in menu
add_action('admin_menu', function () {
  // Remove the 'Comments' page from the WordPress admin menu
  remove_menu_page('edit-comments.php');
});

// Remove comments links from admin bar
add_action('init', function () {
  // Check if the admin bar is showing
  if (is_admin_bar_showing()) {
    // Remove the 'Comments' link from the admin bar
    remove_action('admin_bar_menu', 'wp_admin_bar_comments_menu', 60);
  }
});

// ///Disalbe All Comments

// //////////////////////////////////////////////////////////////// DON'T allow users to access WordPress admin

add_action('init', 'remove_dashboard_access', 0);

function remove_dashboard_access()
{
  // Check if the current user is a non-member
  if (current_user_can('non-member') && !current_user_can('manage_options') && is_admin()) {
    // Redirect the user to the homepage
    wp_redirect(home_url());
    exit;
  }
}

// Redirect logged-out users who try to access wp-login.php and logged-in users who try to access wp-signup.php
add_action('init', function () {
  // Check if the current page URL contains 'wp-login.php' and the user is not logged in
  if (strpos($_SERVER['REQUEST_URI'], 'wp-login.php') !== false && !is_user_logged_in()) {
    // Redirect logged-out users to the homepage
    wp_redirect('/');
  }
  // Check if the current page URL contains 'wp-signup.php' and the user is logged in
  if (strpos($_SERVER['REQUEST_URI'], 'wp-signup.php') !== false && is_user_logged_in()) {
    // Redirect logged-in users to the homepage
    wp_redirect('/');
  }
});

// Redirect non-super admins who attempt to access the main site wp-admin
add_action('admin_init', function () {
  // Check if the current user is not a super admin
  if (!current_user_can('manage_options')) {
    // Check if the current page is not the edit post or profile page, or the dashboard
    $screen = get_current_screen();
    if ($screen && $screen->id !== 'post' && $screen->id !== 'profile' && $screen->id == 'dashboard') {
      // Redirect non-super admins to the homepage
      wp_redirect('/');
      exit;
    }
  }
});

// /Redirect From index.php
add_action('admin_init', function () {
  if (is_admin() && !wp_doing_ajax() && !current_user_can('manage_options')) {
    global $pagenow;
    if ($pagenow === 'index.php') {
      wp_redirect(home_url());
      exit();
    }
  }
});

// /Disable Admin Notices
function wpse_hide_update_notification()
{
  if (!current_user_can('update_core')) {
    remove_action('admin_notices', 'update_nag', 3);
  }
}

add_action('admin_head', 'wpse_hide_update_notification');

// Remove the admin bar from non-admin users
add_action('after_setup_theme', 'endo_remove_admin_bar');

function endo_remove_admin_bar()
{
  // Check if the current user can edit pages
  if (!current_user_can('author')) {
    // Hide the admin bar for non-admin users
    show_admin_bar(false);
  }
}

// Disable Post if individual lock and page lock enabled
function page_lock_clash($postid)
{
  // Get the value of the "enable_page_lock" field
  $pagelock = get_field("enable_page_lock");

  // Check if the post status is 'publish'
  if ($pagelock == "Yes" && has_block('unlock-protocol/unlock-box') && is_admin() && get_post_status($postid) == 'publish') {
    // Set the post status to 'pending'
    $post = array(
      'post_status' => 'pending'
    );

    // Update the post with the new status
    wp_update_post($post);
  }
}

add_action('save_post', 'page_lock_clash');

// Add Sandbox To Iframe

function add_iframe_sandbox_attr($content)
{
  $content = preg_replace('/<iframe/', '<iframe loading="lazy" referrerpolicy="strict-origin-when-cross-origin" ', $content);
  $content = preg_replace('/<img/', '<img loading="lazy" referrerpolicy="strict-origin-when-cross-origin" ', $content);

  return $content;
}

add_filter('the_content', 'add_iframe_sandbox_attr');

/******SECURITY****
/******SECURITY*****/

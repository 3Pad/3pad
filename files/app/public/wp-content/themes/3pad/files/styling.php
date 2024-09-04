<?php

// /Super Admin dont display styling

/** Styling */

// REMOVE GUTENBERG BLOCK LIBRARY CSS FROM LOADING ON FRONT PAGES
function remove_wp_block_library_css()
{
  if (is_front_page()) {
    wp_dequeue_style('wp-block-library');
    wp_dequeue_style('wp-block-library-theme');
    wp_dequeue_style('wc-block-style');  // REMOVE WOOCOMMERCE BLOCK CSS
    wp_dequeue_style('global-styles');  // REMOVE THEME.JSON

    wp_deregister_style('classic-theme-styles');
    wp_dequeue_style('classic-theme-styles');
  }
}

add_action('wp_enqueue_scripts', 'remove_wp_block_library_css', 100);

add_action('wp_enqueue_scripts', 'remove_global_styles');

function remove_global_styles()
{
  wp_dequeue_style('global-styles');
}

// ////////////////////////////Password Protected CSS///////////////////////////////////
function my_custom_password_form()
{
  if (is_page()) {  // Private Page

    global $post;

    $label  = 'pwbox-' . (empty($post->ID) ? rand() : $post->ID);
    $output = '
		<div class="secretlogin">
				<form action="' . esc_url(site_url('wp-login.php?action=postpass', 'login_post')) . '" class="form-inline post-password-form" method="post">
					<p>' . __('This session is resereved for our VIP members . To view it please enter your password below') . '</p>
					<label style="display: grid;" for="' . $label . '">' . __('') . ' <input name="post_password" id="' . $label . '" type="password" size="20" class="form-control" /></label><button style=" width: 100%; padding: 5px; margin-top: 9px; background: black; border: none; border-radius: 10px; color: white; font-family: inherit; font-weight: bold; text-transform: uppercase; box-shadow: -2px -1px 20px 0px #fd30f2; " type="submit" name="Submit" class="button-primary">' . esc_attr_x('Enter', 'post password form') . '</button>			
		</form>
				</div>';

    return $output;
  }
}

add_filter('the_password_form', 'my_custom_password_form', 99);
// ////////////////////////////Password Protected CSS///////////////////////////////////

// ///////Custom CSS for admin area

// Add Bg-Image
function add_bg_image_div()
{
  if (is_admin() && !current_user_can('manage_options')) {
    echo '<div class="bg-image">
    <div class="yellow_bg"></div>
    <div class="red_bg"></div>
    <div class="green_bg"></div>
    <div class="blue_bg"></div>
    <div class="red2"></div>
  </div>
  ';
  }
}

add_action('admin_head', 'add_bg_image_div');

// Add Help Videos
function add_help_videos()
{
  if (is_admin() && !current_user_can('manage_options')) {
    echo '
    <div class="help-button-wrapper">
    <ul class="help-list">
      <li>
        <iframe loading="lazy" src="https://e.widgetbot.io/channels/1061496413474783352/1067294783153901588"
          height="300" width="100%"></iframe>
      </li>
      <li>
      <li>
      <ul style="text-align: left; color: white !important; font-size: 13px; line-height: normal; font-weight: 500;">
          <li style="font-weight: 900;">How To <img draggable="false" role="img" class="emoji" alt="⤵" src="https://s.w.org/images/core/emoji/14.0.0/svg/2935.svg" /></li>
  
          <li style="background: #29bf005e; border-radius: 5px; padding: 10px; ">
              <a target="_blank" href="https://app.tango.us/app/workflow/How-to-link-Custom-Domain-To-site-Using-4everland-2dcafbe3377b424d85998290eda49d18" style="text-decoration: none; color: white;">
                  Setup Custom Domain ⏎
              </a>
          </li>
          <li style="background: #d093005e; border-radius: 5px; padding: 10px; ">
              <a target="_blank" href="https://app.tango.us/app/workflow/How-to-Link-your-site-with-ENS-Domain-009e61569c29434c902f2bc61659e762" style="text-decoration: none; color: white;">Setup Custom Domain Using "ENS" ⏎</a>
          </li>
          <li style="background: #8000d05e; border-radius: 5px; padding: 10px; ">
              <a target="_blank" href="https://app.tango.us/app/workflow/Embedding-content-using-iframely-3cb4d648d78f4f3fb2f1b6d920fc8b76" style="text-decoration: none; color: white;">Embed Content ⏎</a>
          </li>
          <li style="background: #d000005e; border-radius: 5px; padding: 10px; ">
              <a target="_blank" href="https://app.tango.us/app/workflow/How-to-Insert-image---videos--628c5990357f40c0a073dd1eebf5ec78" style="text-decoration: none; color: white;">Add Background Image &amp; Video ⏎</a>
          </li>
      </ul>
  </li>
  
      </li>
      <li>
        <iframe loading="lazy" data-tally-src="https://tally.so/embed/npeq51?alignLeft=1&transparentBackground=1&dynamicHeight=1" loading="lazy"
          width="100%" height="300" frameborder="0" marginheight="0" marginwidth="0" title="Bug Report"></iframe>
      </li>
    </ul>
    <script defer src="https://tally.so/widgets/embed.js"></script>
    <button class="help-button">
    👋 Help
  </button>
  </div>
  <div class="altmenu">
      <center>
      <ul>
        <li class="button_home" style="background: rgb(211, 42, 42); border-radius: 30px;"><a><span id="icon_1" class="fa fa-home"></span></a></li>
        <li class="menu_5"><a id="app-install" ><span id="icon_5" class="fas fa-photo-film"></span></a></li>
        <li class="menu_2"><a class="text-links"><span id="icon_2" class="fa fa-text-width"></span></a></li>
        <li class="menu_3"><a class="icons-links   " ><span id="icon_3" class="fa-solid fa-icons"></span></a></li>
        <li class="menu_4"><a class="embed-links   " ><span id="icon_4" class="fas fa-network-wired"></span></a></li>
        <li class="menu_6"><a target="_blank" href="/"; class="embed-links   " ><span id="icon_6" class="fa fa-user-circle"></span></a></li>
      </ul>
    </center>
    </div>
  ';
  }
}

add_action('admin_head', 'add_help_videos', 100);

// Remove Dashboard Dropdown
function custom_dashboard_url($wp_admin_bar)
{
  // Remove the default "Dashboard" menu item
  $wp_admin_bar->remove_menu('dashboard');
}

add_action('admin_bar_menu', 'custom_dashboard_url', 999);

// Hide New Page For Non Premium
add_action('admin_bar_menu', 'remove_add_new_page', 999);

function remove_add_new_page($wp_admin_bar)
{
  // Check for the user's wp-admin-token-expiration meta field
  $user_id = get_current_user_id();

  // Get the current time & meta
  $current_time              = time();
  $user_meta_expiration_time = get_user_meta($user_id, 'admin-premium', true);

  // The user meta field is not valid (premium), deny access to the admin page...
  if ($user_meta_expiration_time < $current_time && !current_user_can('manage_options')) {
    // Remove the "Add New" menu item
    $wp_admin_bar->remove_node('new-content');
  }
}

// //// Super Admin Hide Dont add code below this

// Hide My Sites From Admin Bar
function hide_my_sites_admin_bar()
{
  // Only hide the "My Sites" menu for non-super admins who have the "author" role
  if (!current_user_can('manage_options')) {
    // Echo a style element that sets the display property of the "My Sites" menu to "none"
    echo '<style>#wp-admin-bar-my-sites{display: none !important;} </style>';
    add_filter('show_admin_bar', '__return_false');
  }
}

// Add the "hide_my_sites_admin_bar" function to the "wp_head" and "admin_head" actions
add_action('wp_head', 'hide_my_sites_admin_bar');
add_action('admin_head', 'hide_my_sites_admin_bar');
add_action('admin_head', 'hide_admin_bar_site_name');

function hide_admin_bar_site_name()
{
  echo '<style> #wp-admin-bar-site-name { display: none !important; }</style>';
}

// /Disable application password
add_filter('wp_is_application_passwords_available', '__return_false');

// /Remove Dashboard Menu Icon
function remove_dashboard_icon()
{
  remove_menu_page('index.php');
}

add_action('admin_menu', 'remove_dashboard_icon');

// Disable WordPress update failed notice
// Your PHP code here

// Check if the user is an administrator
if (!current_user_can('manage_options')) {
  add_action('admin_head', 'remove_update_nag');

  function remove_update_nag()
  {
    echo '<style> .update-nag { display: none !important;} </style>';
  }
}

// /Load Summernote WYSIWYG

// Global CSS

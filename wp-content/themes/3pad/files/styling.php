<?php

///Super ADmin dont display styling

/**
 * Styling
 */

//REMOVE GUTENBERG BLOCK LIBRARY CSS FROM LOADING ON FRONT PAGES
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

//////////////////////////////Password Protected CSS///////////////////////////////////
function my_custom_password_form()
{
  if (is_page()) {  //Private Page

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
//////////////////////////////Password Protected CSS///////////////////////////////////

/////////Custom CSS for admin area

//Add Bg-Image
function add_bg_image_div()
{
  if (is_admin() && !is_super_admin()) {
    echo '<div class="bg-image">
    <div class="blur"></div>
    <div class="yellow_bg"></div>
    <div class="red_bg"></div>
    <div class="green_bg"></div>
    <div class="blue_bg"></div>
    <div class="red2"></div>
  </div>';
  }
}

add_action('admin_head', 'add_bg_image_div');

//Add Help Videos
function add_help_videos()
{
  if (is_admin() && !is_super_admin()) {
    echo '
    <div class="help-button-wrapper">
    <ul class="help-list">
      <li>
        <iframe loading="lazy" src="https://e.widgetbot.io/channels/1061496413474783352/1067294783153901588"
          height="300" width="100%"></iframe>
      </li>
      <li>
        <iframe loading="lazy" width="100%" src="https://www.youtube-nocookie.com/embed/5C7b_eqG0SY?vq=hd1080&rel=0"
          title="YouTube video player" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen></iframe>
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
  ';
  }
}

add_action('admin_head', 'add_help_videos', 100);

//Remove Dashboard Dropdown
function custom_dashboard_url($wp_admin_bar)
{
  // Remove the default "Dashboard" menu item
  $wp_admin_bar->remove_menu('dashboard');
}

add_action('admin_bar_menu', 'custom_dashboard_url', 999);

//Hide New Page For Non Premium
add_action('admin_bar_menu', 'remove_add_new_page', 999);

function remove_add_new_page($wp_admin_bar)
{
  // Check for the user's wp-admin-token-expiration meta field
  $user_id = get_current_user_id();

  // Get the current time & meta
  $current_time              = time();
  $user_meta_expiration_time = get_user_meta($user_id, 'admin-premium', true);

  // The user meta field is not valid (premium), deny access to the admin page...
  if ($user_meta_expiration_time < $current_time && !is_super_admin()) {
    // Remove the "Add New" menu item
    $wp_admin_bar->remove_node('new-content');
  }
}

function quick_styling()
{
  if (!is_front_page()) {
    echo '<style>.altmenu{ display: none;}</style>
  ';
  }
}

add_action('wp_head', 'quick_styling');

////// Super Admin Hide Dont add code below this

// Hide My Sites From Admin Bar
function hide_my_sites_admin_bar()
{
  // Only hide the "My Sites" menu for non-super admins who have the "author" role
  if (!is_super_admin() && current_user_can('author')) {
    // Echo a style element that sets the display property of the "My Sites" menu to "none"
    echo '<style>#wp-admin-bar-my-sites{display: none !important;}</style>';
  }
}

// Add the "hide_my_sites_admin_bar" function to the "wp_head" and "admin_head" actions
add_action('wp_head', 'hide_my_sites_admin_bar');
add_action('admin_head', 'hide_my_sites_admin_bar');

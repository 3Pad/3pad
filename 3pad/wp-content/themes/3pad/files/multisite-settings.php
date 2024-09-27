<?php

// //Default Multisite Settings
update_option('template', '3pad');
update_option('stylesheet', '3pad');
update_option('current_theme', '3pad');
update_option('users_can_register', '1');

// ////Delete Defalt Wordpress First Post/Pages
if (get_post_status(1) == 'publish') {
	// 'Hello World!' post
	wp_delete_post(1, true);

	// 'Sample page' page
	wp_delete_post(2, true);

	// 'Privacy Policy' page
	wp_delete_post(3, true);
}

// ////Create Default Pages Home/Settings on New Site
// If it isn'tmain site
if (!is_main_site()) {
	// Set default static front page
	$frontpage = 1000;
	update_option('page_on_front', $frontpage);
	update_option('show_on_front', 'page');
}

// Create Home Pages Automatically
function create_default_pages()
{
	// Check if the current site is the main site
	if (is_main_site()) {
		// Check if the "Home Page" post with an ID of 10 exists
		if (get_post(10) == NULL) {
			// If the post does not exist, insert it into the database
			global $wpdb;

			$wpdb->insert(
				$wpdb->posts,
				array(
					'ID'             => 10,
					'post_title'     => 'Launchpad',
					'post_status'    => 'publish',
					'post_type'      => 'page',
					'comment_status' => 'closed',
					'post_date'      => date('2020-01-01 01:01:01', time())
				)
			);
		}

		// Set the newly created "Home Page" post as the default front page
		$frontpage = 10;
		update_option('page_on_front', $frontpage);
		update_option('show_on_front', 'page');
	}

	// If the current site is not the main site
	if (!is_main_site()) {
		// Check if the "Home Page" post with an ID of 1000 exists
		if (get_post(1000) == NULL) {
			// If the post does not exist, insert it into the database
			global $wpdb;

			$wpdb->insert(
				$wpdb->posts,
				array(
					'ID'             => 1000,
					'post_title'     => 'Launchpad',
					'post_status'    => 'publish',
					'post_type'      => 'page',
					'comment_status' => 'closed',
					'post_date'      => date('2020-01-01 01:01:01', time())
				)
			);
		}
	}
}

// Add the "create_default_pages" function to the "admin_head" action
add_action('admin_head', 'create_default_pages');

// Create or Update Page for User
function create_or_update_user_page()
{
	// Get the current user
	$current_user = wp_get_current_user();

	// Check if a page already exists for the current user with the status 'publish'
	$args = array(
		'name'        => $current_user->user_login,
		'post_type'   => 'page',
		'post_status' => 'publish',
		'numberposts' => 1
	);

	$existing_page = get_posts($args);

	// If a published page already exists for the current user, do nothing
	if (!empty($existing_page)) {
		return;
	}

	// If a page exists but is not published, check the author and update if needed
	$draft_page = get_page_by_path($current_user->user_login, OBJECT, 'page');

	if ($draft_page && $draft_page->post_status !== 'publish' && $draft_page->post_author !== $current_user->ID) {
		wp_update_post(array(
			'ID'          => $draft_page->ID,
			'post_author' => $current_user->ID
		));
		return;
	}

	// If the current user has the 'manage_options' capability or is a 'non-member', do not create a new page
	if (current_user_can('manage_options') || current_user_can('non-member')) {
		return;
	}

	// If user is logged in, create a new page for the current user
	if (is_user_logged_in() && !$existing_page) {
		$page = array(
			'post_title'   => $current_user->display_name,
			'post_content' => '',
			'post_status'  => 'publish',
			'post_author'  => $current_user->ID,
			'post_type'    => 'page',
			'post_name'    => $current_user->user_login
		);

		wp_insert_post($page);
	}
}

add_action('init', 'create_or_update_user_page');

// //Delete USER if meta dosent contain Unlock

/*
 * add_action('wp_login', 'delete_user_if_meta_empty', 10, 2);
 *
 * function delete_user_if_meta_empty($user_login, $user)
 * {
 * 	// Check if user is admin
 * 	if (in_array('administrator', $user->roles)) {
 * 		return;
 * 	}
 *
 * 	// Check if user has meta value
 * 	$meta_value = get_user_meta($user->ID, 'unlock_ethereum_address', true);
 * 	if (!empty($meta_value)) {
 * 		return;
 * 	}
 *
 * 	// Delete the user and any pages they authored
 * 	$pages = get_posts(array(
 * 		'post_type'   => 'page',
 * 		'author'      => $user->ID,
 * 		'post_status' => 'any',
 * 		'fields'      => 'ids',
 * 	));
 *
 * 	if (!empty($pages)) {
 * 		foreach ($pages as $page_id) {
 * 			wp_delete_post($page_id, true);
 * 		}
 * 	}
 *
 * 	wp_delete_user($user->ID, true);
 * }
 */

// Only allow Logged in Users to Signup Page
function only_logged_in_create()
{
	// Only run the code if the current page is the "wp-signup.php" page
	if (in_array($GLOBALS['pagenow'], array('wp-signup.php'))) {
		// If the user is not a super admin, redirect them to the home page
		if (!current_user_can('manage_options')) {
			wp_redirect(home_url());
			exit;
		}
	}
}

// Add the "only_logged_in_create" function to the "init" action
add_action('init', 'only_logged_in_create');

// Automatically log in as a subscriber on page load
add_action('init', 'auto_login_as_subscriber');

function auto_login_as_subscriber()
{
	// Check if the user is already logged in
	if (is_user_logged_in() || is_admin()) {
		return;  // No need to log in if already logged in
	}

	// Define subscriber username and password
	$username = '3pad';
	$password = '3pad';

	// Check if the subscriber already exists
	$user = get_user_by('login', $username);

	if (!$user) {
		// If the subscriber does not exist, create a new user
		$userdata = array(
			'user_login' => $username,
			'user_pass'  => $password,
			'user_email' => $username . '@example.com',
			'role'       => 'subscriber'
		);

		$user_id = wp_insert_user($userdata);

		if (is_wp_error($user_id)) {
			error_log('Failed to create subscriber: ' . $user_id->get_error_message());
			return;  // Exit if user creation failed
		}

		// Retrieve the newly created user
		$user = get_user_by('id', $user_id);
	}

	// Log in the subscriber
	wp_set_auth_cookie($user->ID, true);  // Set the authentication cookie
	wp_set_current_user($user->ID);  // Set the current user
	do_action('wp_login', $user->user_login, $user);  // Trigger login actions

	// Optionally redirect or perform actions after login . Randomize home_url to avoid caching issues
	wp_safe_redirect(home_url(rand(1, 1000)));
	exit;
}

// Add User To Site After User Creates/Login On SUBSITE Only

/*
 * function create_site_after_signup_subsite()
 * {
 * 	// Get the current user ID and the current blog ID
 * 	$user_id = get_current_user_id();
 * 	$blog_id = get_current_blog_id();
 *
 * 	// Only run the code if the current site is not the main site and the user is not already a member of the current site
 * 	if (!is_main_site() && !is_user_member_of_blog($user_id, $blog_id)) {
 * 		// Add the user to the current site as a subscriber
 * 		add_user_to_blog($blog_id, $user_id, 'subscriber');
 * 	}
 * }
 *
 * // Add the "create_site_after_signup_subsite" function to the "wp_login" action
 * add_action('wp_login', 'create_site_after_signup_subsite');
 */

// Get Author Blog Site Turn into shortcode

/*
 * function blog_url_shortcode()
 * {
 * 	// Only show the blog URL if the user is logged in
 * 	if (is_user_logged_in()) {
 * 		// Get the current user ID
 * 		$current_user_id = get_current_user_id();
 *
 * 		// Get all the sites that the user is a member of
 * 		$blogs = get_blogs_of_user($current_user_id);
 *
 * 		// Loop through each site and check if the user has the "author" role
 * 		foreach ($blogs as $blog_id => $blog) {
 * 			$user = new WP_User($current_user_id, '', $blog_id);
 * 			if (in_array('author', $user->roles)) {
 * 				// Get the blog URL without https
 * 				$blog_url = set_url_scheme($blog->siteurl);
 *
 * 				// Replace https:// with an empty string in the blog URL
 * 				$blog_url = str_replace('https://', '', $blog_url);
 *
 * 				// Remove http:// if it is still present in the blog URL
 * 				$blog_url = str_replace('http://', '', $blog_url);
 *
 * 				// Get the substring of the blog URL starting from the 13th character "app.3pad.xyz/" (First trailing slash)
 * 				$output = substr($blog_url, 13);
 *
 * 				// Echo the blog URL
 * 				echo $output;
 * 			}
 * 		}
 * 	}
 * }
 *
 * // Add the "blog_url_shortcode" function as a shortcode handler for the "author_site" shortcode
 * add_shortcode('author_site', 'blog_url_shortcode');
 */
// Show author status variable

/*
 * function author_status()
 * {
 * 	// Only show the author status if the user is logged in and is on the main site and on the front page
 * 	if (is_user_logged_in() && is_main_site() && is_front_page()) {
 * 		// Get the current user ID
 * 		$current_user_id = get_current_user_id();
 *
 * 		// Get all the sites that the user is a member of
 * 		$blogs = get_blogs_of_user($current_user_id);
 *
 * 		// Loop through each site and check if the user has the "author" role
 * 		foreach ($blogs as $blog_id => $blog) {
 * 			$user = new WP_User($current_user_id, '', $blog_id);
 * 			if (in_array('author', $user->roles)) {
 * 				// If the user has the "author" role, return true
 * 				$active = true;
 *
 * 				return $active;
 * 			}
 * 		}
 * 	}
 * }
 */

// Redirect Main Site To hello
// Get the current meta & user

/*
 * $user_id            = get_current_user_id();  //User iD
 * $current_expiration = get_user_meta($user_id, 'admin-token-expiration', true);
 * $starter            = get_user_meta($user_id, 'starter', true);
 */

/*
 * function remove_user_from_current_site($user_id, $user)
 * {
 * 	// Remove user from current site
 * 	remove_user_from_blog($user_id, get_current_blog_id());
 * }
 *
 * // Hook the function to the unlock_protocol_user_created action
 * add_action('unlock_protocol_user_created', 'remove_user_from_current_site', 10, 2);
 */

// ////Create Site After User Create ##########

/*
 * function create_site_after_signup($user_id)
 * {
 * 	// Only run on main site and not on admin
 * 	if (is_main_site() && !is_admin()) {
 * 		global $wpdb;
 *
 * 		$network   = network_site_url();  // your domain (or subdomain)
 * 		$domain    = parse_url($network, PHP_URL_HOST);  // Remove http
 * 		$user_name = get_user_meta($user_id, 'unlock_ethereum_address', true);
 * 		$path      = '/' . $user_name;  // path to your site
 *
 * 		// Check if site already exists
 * 		$site_id = $wpdb->get_var($wpdb->prepare("SELECT blog_id FROM $wpdb->blogs WHERE domain = %s AND path = %s", $domain, $path));
 * 		if ($site_id) {
 * 			// Delete site if it already exists
 * 			wpmu_delete_blog($site_id, true);
 * 		}
 *
 * 		$title = $user_name;  // site title
 *
 * 		// hide db errors
 * 		$wpdb->hide_errors();
 * 		// create the new site
 * 		$blog_id = wpmu_create_blog($domain, $path, $title, $user_id, array('public' => true));
 *
 * 		// Add user to blog
 * 		add_user_to_blog($blog_id, $user_id, 'author');
 * 		// enable db errors
 * 		$wpdb->show_errors();
 * 		//Remove User from main site
 * 		wp_delete_user($user_id);
 * 	}
 *
 * 	if (is_main_site()) {
 * 		$user_id          = get_current_user_id();
 * 		$blogs            = get_blogs_of_user($user_id);
 * 		$has_primary_blog = false;
 * 		foreach ($blogs as $blog) {
 * 			if ($blog->userblog_id == get_user_meta($user_id, 'primary_blog', true)) {
 * 				$has_primary_blog = true;
 * 				break;
 * 			}
 * 		}
 * 		if (!$has_primary_blog) {
 * 			delete_metadata('user', $user_id, 'primary_blog', '', true);
 *
 * 			global $wpdb;
 *
 * 			$wpdb->delete($wpdb->usermeta, array('user_id' => $user_id));
 * 			$wpdb->delete($wpdb->users, array('ID' => $user_id));
 * 		}
 * 	}
 * }
 *
 * add_action('wp_login', 'create_site_after_signup', 20);
 */
// ////Create Site After User Login #######

// Delete User Meta If NO site detected

/*
 * function delete_usermeta_and_user_if_not_primary_blog()
 * {
 * 	if (is_main_site()) {
 * 		$user_id          = get_current_user_id();
 * 		$blogs            = get_blogs_of_user($user_id);
 * 		$has_primary_blog = false;
 * 		foreach ($blogs as $blog) {
 * 			if ($blog->userblog_id == get_user_meta($user_id, 'primary_blog', true)) {
 * 				$has_primary_blog = true;
 * 				break;
 * 			}
 * 		}
 * 		if (!$has_primary_blog) {
 * 			delete_metadata('user', $user_id, 'primary_blog', '', true);
 *
 * 			global $wpdb;
 *
 * 			$wpdb->delete($wpdb->usermeta, array('user_id' => $user_id));
 * 			$wpdb->delete($wpdb->users, array('ID' => $user_id));
 * 		}
 * 	}
 * }
 *
 * add_action('wp_loaded', 'delete_usermeta_and_user_if_not_primary_blog');
 */

// ############## Change URL Path

/*
 * function update_multisite_blog_path()
 * {
 * 	// Get the current user ID.
 * 	$user_id        = get_current_user_id();
 * 	// Get the current user data.
 * 	$user_info      = get_userdata($user_id);
 * 	// Get the current user login name.
 * 	$user_name      = $user_info->user_login;
 * 	// Get the current blog ID.
 * 	$blog_id        = get_current_blog_id();
 * 	// Get the blog path from the options page.
 * 	$blog_path      = strtolower(get_field('blog_path', "options"));
 * 	// Get the ens name from the user meta.
 * 	$ens_name       = get_user_meta($user_id, 'ens_name', true);
 * 	// Get the current site.
 * 	$current_site   = get_current_site();
 * 	// Get the revert to default path from the options page.
 * 	$default        = get_field('revert_to_default_path', "options");
 * 	// Explode the ens name into parts.
 * 	$ens_name_parts = explode('.', $ens_name);
 * 	// Get the ens path from the ens name parts.
 * 	$ens_path       = array_shift($ens_name_parts);
 * 	// Create a nonce for the JavaScript.
 * 	$nonce          = wp_create_nonce('js-nonce');
 * 	// Remove any slashes from the blog name.
 * 	$blog_name      = str_replace('/', '', $blog_path);
 * 	// Check if the ENS path is already in use.
 * 	$existing_blog  = get_blog_details(array('domain' => $current_site->domain, 'path' => "/$ens_path/", 'limit' => 1));
 * 	// If the ENS path is already in use and the ens name is equal to the blog path and the blog path is not empty.
 * 	if ($existing_blog && $ens_name == $blog_path && !empty($blog_path)) {
 * 		echo '<script nonce="' . $nonce . '">alert("😲 Site name is already in use. 😲");</script>';
 *
 * 		return false;
 * 	}
 * 	// If the ENS path is already in use and the ens name is not equal to the blog path and the blog path is not empty.
 * 	elseif ($existing_blog && $ens_name !== $blog_path && !empty($blog_path)) {
 * 		echo '<script nonce="' . $nonce . '">alert("ENS name is not connected");</script>';
 *
 * 		return false;
 * 	}
 * 	// If the ENS path is not already in use.
 * 	elseif (!$existing_blog) {
 * 		// If the blog path is not empty and is not equal to the user name and the revert to default path is not set to yes.
 * 		if ($blog_path && $blog_path !== "/$user_name/" && $default != 'Yes') {
 * 			// If the blog path is equal to the ens name.
 * 			if ($blog_path == $ens_name) {
 * 				// Explode the blog path into parts.
 * 				$blog_path_parts = explode('.', $blog_path);
 * 				// Get the blog path from the blog path parts.
 * 				$blog_path       = $blog_path_parts[0];
 * 				// Remove any non-alphanumeric characters from the blog path.
 * 				$blog_path       = preg_replace("/[^a-zA-Z0-9]/", "", $blog_path);
 * 				// Switch to the current blog.
 * 				switch_to_blog($blog_id);
 * 				// Update the site URL.
 * 				update_option('siteurl', network_site_url("/$blog_path/"));
 * 				// Update the home URL.
 * 				update_option('home', network_site_url("/$blog_path/"));
 * 				// Update the blog name.
 * 				update_option('blogname', $blog_path);
 * 				// Update the permalink structure (optional).
 * 				update_option('permalink_structure', '/%postname%/');
 * 				// Get the blog details.
 * 				$details       = get_blog_details($blog_id);
 * 				// Set the blog path.
 * 				$details->path = "/$blog_path/";
 * 				// Update the blog details.
 * 				update_blog_details($blog_id, $details);
 * 				// Restore the current blog.
 * 				restore_current_blog();
 * 			}
 * 		}
 * 	}
 * }
 *
 * // Add the action to the admin footer.
 * add_action('admin_footer', 'update_multisite_blog_path');
 */
// ############## Change URL Path

/*
 * #################################################
 *
 * function revert_multisite_blog_path()
 * {
 * 	//Get USer INfo BLog ID
 * 	$user_id   = get_current_user_id();
 * 	$user_info = get_userdata($user_id);
 *
 * 	//Get Username
 * 	$user_name = $user_info->user_login;
 *
 * 	//Get Current BLog ID
 * 	$blog_id = get_current_blog_id();
 *
 * 	//Get ENS name meta
 * 	$ens_name = get_user_meta($user_id, 'ens_name', true);
 *
 * 	//Get current Site
 * 	$current_site = get_current_site();
 *
 * 	//Get user Eth address
 * 	$ethereum_address = get_user_meta($user_id, 'unlock_ethereum_address', true);
 *
 * 	//GEt default Option
 * 	$default = get_field('revert_to_default_path', "options");
 *
 * 	//Get BLog Path
 * 	$current_blog_details = get_blog_details($blog_id);
 * 	$current_blog_path    = $current_blog_details->path;
 *
 * 	$blog_path = $user_name;
 * 	// Check if the ethereum address is not equal to the current blog path and if the default is set to yes
 * 	if ($ethereum_address != $current_blog_path && $default == 'Yes') {
 * 		// Switch to the blog
 * 		switch_to_blog($blog_id);
 * 		// Update the siteurl, home, blogname and permalink structure
 * 		update_option('siteurl', network_site_url("/$blog_path/"));
 * 		update_option('home', network_site_url("/$blog_path/"));
 * 		update_option('blogname', $blog_path);
 * 		update_option('permalink_structure', '/%postname%/');
 * 		// Get the blog details
 * 		$details       = get_blog_details($blog_id);
 * 		$details->path = "/$blog_path/";
 * 		// Update the blog details
 * 		update_blog_details($blog_id, $details);
 * 		// Restore the current blog
 * 		restore_current_blog();
 * 	}
 * }
 *
 * add_action('acf/save_post', 'revert_multisite_blog_path', 20);
 *
 * #################################################
 */
// ################################################ ENS NAME

/*
 * function check_ens()
 * {
 * 	// Get the current user ID
 * 	$user_id            = get_current_user_id();
 * 	// Get the user's Ethereum address and ENS name from their meta data
 * 	$ethereum_address   = get_user_meta($user_id, 'unlock_ethereum_address', true);
 * 	$ens                = get_user_meta($user_id, 'ens_name', true);
 * 	// Get the expiration date of the user's token
 * 	$current_expiration = get_user_meta($user_id, 'admin-token-expiration', true);
 * 	// Initialize the ENS name variable
 * 	$ens_name           = null;
 * 	// If the user has an expiration date, make a request to the Moralis API
 * 	if (!empty($current_expiration)) {
 * 		// Set the API key and URL
 * 		$moralis_api_key = MORALIS_API_KEY;
 * 		$moralis_url     = "https://deep-index.moralis.io/api/v2/resolve/$ethereum_address/reverse";
 * 		// Initialize the cURL request
 * 		$ch              = curl_init();
 * 		// Set the cURL options
 * 		curl_setopt($ch, CURLOPT_URL, $moralis_url);
 * 		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
 * 		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
 * 			'accept: application/json',
 * 			"X-API-Key: $moralis_api_key"
 * 		));
 * 		// Execute the cURL request and close it
 * 		$result = curl_exec($ch);
 * 		curl_close($ch);
 * 		// Decode the response
 * 		$data = json_decode($result, true);
 * 		// If the response contains an ENS name, set the variable
 * 		if (isset($data['name'])) {
 * 			$ens_name = $data['name'];
 * 		}
 * 	}
 * 	// If an ENS name was found, update the user's meta data
 * 	if ($ens_name) {
 * 		update_user_meta($user_id, 'ens_name', $ens_name);
 * 	}
 * }
 *
 * // Add the function to the unlock_authenticate_user action
 * add_action('wp_login', 'check_ens');
 *
 * #####################################################
 */
// ################################################### Delete BLog

/*
 * function deleteDirectory($dir)
 * {
 * 	// Check if the directory exists
 * 	if (!file_exists($dir)) {
 * 		return true;
 * 	}
 * 	// Check if it is a directory
 * 	if (!is_dir($dir)) {
 * 		return unlink($dir);
 * 	}
 * 	// Loop through the contents of the directory
 * 	foreach (scandir($dir) as $item) {
 * 		// Skip the current and parent directories
 * 		if ($item == '.' || $item == '..') {
 * 			continue;
 * 		}
 * 		// Recursively delete the contents of the directory
 * 		if (!deleteDirectory($dir . DIRECTORY_SEPARATOR . $item)) {
 * 			return false;
 * 		}
 * 	}
 *
 * 	// Delete the directory
 * 	return rmdir($dir);
 * }
 */

/*
 * function delete_pages_on_save($post_id)
 * {
 * 	// Check if the post is a page and if it has a custom field with the key "delete_blog" set to "true"
 * 	if (get_post_type($post_id) === 'page' && get_field('delete_blog', $post_id) === 'Delete My Site') {
 * 		// Get the current user ID
 * 		$current_user_id = get_current_user_id();
 *
 * 		// Delete the pages authored by the current user
 * 		$args = array(
 * 			'post_type'      => 'page',
 * 			'author'         => $current_user_id,
 * 			'posts_per_page' => -1,
 * 		);
 * 		$pages = get_posts($args);
 *
 * 		foreach ($pages as $page) {
 * 			wp_delete_post($page->ID, true);
 * 		}
 *
 * 		// Delete user meta associated with the pages
 * 		$meta_keys = get_user_meta($current_user_id);
 * 		foreach ($meta_keys as $meta_key => $meta_value) {
 * 			if (strpos($meta_key, '_edit_page') !== false) {
 * 				delete_user_meta($current_user_id, $meta_key);
 * 			}
 * 		}
 *
 * 		// Delete the user from the database
 * 		if ($current_user_id) {
 * 			wp_delete_user($current_user_id);
 * 		}
 *
 * 		/*
 *
 * // Remove the files and directories from the file system
 * $upload_dir = wp_upload_dir();
 * $blog_dir   = $upload_dir['basedir'] . '/sites/_sites/' . $current_user_id;
 *
 * #######################
 * // Delete IPFS Path
 * $site_url  = get_site_url();
 * $site_path = parse_url($site_url, PHP_URL_PATH);
 *
 * $site_id = get_current_blog_id();
 *
 * $options['local_dir'] = IPFS_PATH . $site_path . '/';
 *
 * // Get the path to the directory
 * $dir_path = $options['local_dir'];
 *
 * // Check if the directory exists
 * if (file_exists($dir_path)) {
 * 	if (!deleteDirectory($dir_path)) {
 * 		echo 'Error deleting directory.';
 *
 * 		return;
 * 	}
 * }
 *
 * #######################
 *
 * WP_Filesystem();
 *
 * global $wp_filesystem;
 *
 * $wp_filesystem->rmdir($blog_dir, true);
 *
 *
 * 		// Redirect the user to the home page with meta refresh
 * 		echo '<meta http-equiv="refresh" content="0; url=' . home_url() . '">';
 * 		exit;
 * 	}
 * }
 *
 * add_action('acf/save_post', 'delete_pages_on_save');
 */

// ################################################# Delete Blog

// ######  Update Blog Admin Email

/*
 * if (!function_exists('wp_get_current_user')) {
 * 	// Check if the admin email address contains '3pad.xyz'
 * 	add_action('init', 'check_admin_email_address');
 *
 * 	function check_admin_email_address()
 * 	{
 * 		$admin_email = get_option('admin_email');
 * 		if (strpos($admin_email, '3pad.xyz') === false) {
 * 			// Update the admin email address if it does not contain '3pad.xyz'
 * 			update_admin_email_address();
 * 		}
 * 	}
 *
 * 	function update_admin_email_address()
 * 	{
 * 		// Get the current user's 'unlock_ethereum_address' key
 * 		$current_user_id         = get_current_user_id();
 * 		$unlock_ethereum_address = get_user_meta($current_user_id, 'unlock_ethereum_address', true);
 *
 * 		// Get the admin email option name
 * 		$admin_email_option = 'admin_email';
 *
 * 		// Update the admin email option with the 'unlock_ethereum_address' key
 * 		if (!empty($unlock_ethereum_address)) {
 * 			// Remove everything after and including the "@" symbol
 * 			$at_index = strpos($unlock_ethereum_address, '@');
 * 			if ($at_index !== false) {
 * 				$email_username = substr($unlock_ethereum_address, 0, $at_index);
 * 			} else {
 * 				$email_username = $unlock_ethereum_address;
 * 			}
 * 			// Update the admin email option with the new email username
 * 			update_option($admin_email_option, $email_username . '@3pad.xyz');
 * 		}
 * 	}
 * }
 */
// ######  Update Blog Admin Email

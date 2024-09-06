<?php
// Function to add the custom headers

/*
 * function add_custom_headers($headers)
 * {
 *
 *
 * // Web 3 Go
 * $headers['Web-3'] = 'Go';
 * // Add the Strict-Transport-Security header
 * $headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubdomains; preload';
 * // Add the X-Content-Type-Options header
 * $headers['X-Content-Type-Options'] = 'nosniff';
 * // Access Control Origin
 * // $headers['access-control-allow-origin'] = '*.3pad.xyz';
 * // Add the Referrer-Policy header
 * $headers['Referrer-Policy'] = 'strict-origin';
 * // Add the X-Download-Options header
 * $headers['X-Download-Options'] = 'noopen';
 * // Prevent Hotlinking
 * $headers['X-Frame-Options'] = 'SAMEORIGIN';
 * // not to be indexed or followed by search engines
 * $headers['X-Robots-Tag'] = 'noindex, nofollow, true';
 * // Add the X-Permitted-Cross-Domain-Policies header
 * $headers['X-Permitted-Cross-Domain-Policies'] = 'none';
 * // Add the Keep-Alive header
 * $headers['Keep-Alive'] = 'timeout=5, max=100';
 * // Add the Cross-Origin-Embedder-Policy header
 * $headers['Cross-Origin-Embedder-Policy'] = 'unsafe-none';
 * // Add the Cross-Origin-Opener-Policy header
 * $headers['Cross-Origin-Opener-Policy'] = 'unsafe-none';
 * // Generate a nonce for the Content-Security-Policy header
 * $jsnonce = wp_create_nonce('js-nonce');
 * // Hide PHP Versioning
 * $headers['X-Powered-By:'] = '3Pad';
 * // Hide PHP Versioning
 * $headers['Server:'] = '3Pad';
 * // Add the Content-Security-Policy header
 *
 * /*
 * $headers['Content-Security-Policy']           = "default-src 'self' *.unlock-protocol.com; script-src 'self' 'nonce-$jsnonce' *.arweave.net *.3pad.xyz tally.so *.cloudflareinsights.com *.google-analytics.com *.pinterest.com *.jsdelivr.net comments.app *.google-analytics.com *.disqus.com *.disquscdn.com *.Twitter.com *.YouTube.com *.WordPress.com *.SoundCloud.com *.Spotify.com *.Flickr.com *.Vimeo.com *.Animoto.com *.CloudUp.com *.Crowdsignal.com *.Dailymotion.com *.Imgur.com *.Issuu.com *.Kickstarter.com *.Mixcloud.com *.PocketCasts.com *.Reddit.com *.redditmedia.com *.embedly.com *.ReverbNation.com *.Screencast.com *.Scribd.com *.Slideshare.com *.SmugMug.com *.SpeakerDeck.com *.tiktok.com *.ttwstatic.com *.TED.com *.Tumblr.com *.VideoPress.com *.WordPress.tv *.AmazonKindle.com *.Wolfram.com *.Facebook.com *.Instagram.com ; style-src 'unsafe-inline' 'self' *.embedly.com *.arweave.net ; style-src-elem 'self' 'unsafe-inline' *.arweave.net; style-src-attr 'unsafe-inline' 'self'; img-src * 'self'; font-src 'self' *.arweave.net; connect-src 'self' *.eth.limo *.eth.link *.fleek.co 3pad.xyz cloudflareinsights.com *.3pad.xyz vimeo.com *.reddit.com *.libring.com; media-src *; object-src *.b-cdn.net 'self'; frame-src *; worker-src 'self'; form-action 'self'; upgrade-insecure-requests; block-all-mixed-content; base-uri 'self'; manifest-src 'self' 'nonce-$jsnonce' *.arweave.net ";
 *
 * // Set the headers for ugly permalinks
 * // header('Content-Security-Policy: ' . $headers['Content-Security-Policy']);
 * // Add Permissions Policy
 * $headers['Permissions-Policy'] = "interest-cohort=(), accelerometer=*, ambient-light-sensor=*, autoplay=*, camera=*, display-capture=(), document-domain=*, encrypted-media=*, execution-while-not-rendered=*, execution-while-out-of-viewport=*, fullscreen=*, gamepad=*, geolocation=*, gyroscope=*, magnetometer=*, microphone=*, midi=*, navigation-override=*, payment=*, picture-in-picture=*, publickey-credentials-get=(), sync-xhr=(), usb=(), xr-spatial-tracking=() ";
 * // Set the headers for ugly permalinks
 * header('Permissions-Policy: ' . $headers['Permissions-Policy']);
 *
 *
 * 	// Send the custom headers
 * 	return $headers;
 * }
 *
 * // Hook into the 'wp_headers' action
 * add_action('wp_headers', 'add_custom_headers');
 */

// /Last Modified update Home Page With ACF

/*
 * function update_acf_fields_last_modified_date()
 * {
 * 	// Update the last modified date of the ACF fields
 * 	update_option('acf_fields_last_modified', time());
 * }
 *
 * add_action('acf/save_post', 'update_acf_fields_last_modified_date', 10);
 */

// //Pagination Fix For Cache

/*
 * function modify_pagination_links($link, $i)
 * {
 * 	// Get the current site URL and the post slug
 * 	$site_url  = get_site_url();
 * 	$post_slug = get_post_field('post_name', get_the_ID());
 *
 * 	// Check if the current page is a paginated page
 * 	if ($i > 1) {
 * 		// Modify the pagination link to include the 'pg-' prefix
 * 		$link = str_replace($site_url . '/' . $post_slug . '/', $site_url . '/' . $post_slug . '/' . $i . '/?pgs', $link);
 * 	}
 *
 * 	return $link;
 * }
 *
 * add_filter('wp_link_pages_link', 'modify_pagination_links', 10, 2);
 */

// /Add Cookies

/*
 * function cookie_display()
 * {
 * 	if (!is_user_logged_in() || !is_admin()) {
 * 		echo '<div class="cookie-message">
 * 		<img src="https://img.icons8.com/plasticine/100/000000/cookie.png">
 * 		<span>We use cookies to provide you the best possible experience. But do not panic - we will not share any of your data. You can find more informations about our cookies <a href="3pad.xyz/hello">here</a>.</span>
 * 		<a class="close" href="#">❌</a>
 * 	  </div>';
 * 	}
 * }
 */

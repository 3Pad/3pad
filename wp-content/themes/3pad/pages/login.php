<?php get_header(); ?>


<link href="<?php echo get_theme_file_uri('/assets/js/pwa_manifest_home.json'); ?>" rel="manifest" />
<link href="<?php echo get_theme_file_uri('/assets/css/w3.css'); ?>" rel="stylesheet" />
<link href="<?php echo get_theme_file_uri('/assets/css/n3.css'); ?>" rel="stylesheet" />
<link href="<?php echo get_theme_file_uri('/assets/css/3pad.css'); ?>" rel="stylesheet" />
<link href="<?php echo get_theme_file_uri('/assets/css/3pad_home.css'); ?>" rel="stylesheet" />



<div class="bg-image">
	<div class="blur"></div>
	<div class="yellow"></div>
	<div class="red"></div>
	<div class="green"></div>
	<div class="blue"></div>
	<div class="red2"></div>
</div>

<?php
/* //Secure Header
<div id="secure-url">Always Make Sure The URL Is Correct:<?php echo site_url(); ?></div>
*/
?>

<?php
//Check If Author is active
$active = author_status();
?>
<?php
// I'm already logged in, so I don't need to worry about signing up.
if (is_user_logged_in()) {
	?>
	<!--- Logged IN --->

	<meta http-equiv="refresh" content="3600;URL='/?home-status-check=<?php echo wp_rand(24); ?>'" />
	<style>
		.checkout-button-container.blurred p {
			color: white !important;
		}
	</style>
	<section class="section-login wf-section">
		<div class="container-login">
			<div id="logo"></div>
			<h3 id="header-user" class="centered-heading">
				<?php
	global $current_user;
	wp_get_current_user();
	?>
				<?php
	if (is_user_logged_in()) {
		echo $current_user->display_name;
	}
	?>
				</h5>
				<h1 id="header-login" class="centered-heading">You Are Connected</h1>
				<div class="status free-tier">
					<a id="statuslink" target="_blank" href="https://app.unlock-protocol.com/keychain">
						<div class="light"></div>
						<p id="subheader-status" class="centered-subheading">🧑‍🚀 Status | Beta ↪</p>
					</a>
				</div>

				<?php
	/*
				function change_status()
				{
				////Change Status Styling
				// Get the current time
				$current_time = time();
				//Get Current User Id
				$user_id = get_current_user_id();
				//Check meta expiration time
				$user_meta_expiration_time_premium = get_user_meta($user_id, 'admin-premium', true);
				///Update Premium Value
				if (is_main_site() && is_front_page()) {
				// Calculate the expiration time (24 hours from now)
				$expiration_time = $current_time + 86400; // 86400 seconds is 24 hours
				//Check meta expiration time
				$user_meta_expiration_time_premium = get_user_meta($user_id, 'admin-premium', true);
				//If premium Time expired update meta..
				if ($user_meta_expiration_time_premium < $current_time) {
				// The user meta field is not valid, update token time
				update_user_meta($user_id, 'admin-premium', $expiration_time);
				}
				echo ' <div class="status premium-tier" style="position: fixed;">
				<a id="statuslink" target="_blank" href="https://app.unlock-protocol.com/keychain">
				<div class="light"></div>
				<p id="subheader-status" class="centered-subheading">🧑‍🚀 Status | Premium ↪</p>
				</a>
				</div>
				<style>.free-tier, .acc_status {
				display: none !important;
				}
				#lockpay {
				overflow: inherit;
				}
				</style>';
				}
				}
				add_shortcode('premium-status', 'change_status');
				*/
	?>


				<?php  ///If author is detected don't display create site form
	if (!$active):
		?>
					<?php

		///add starter meta since it's not author

		// Add the token as a user meta field
		$user_id = get_current_user_id();
		$starter = get_user_meta($user_id, 'starter', true);

		if ($starter == NULL) {
			//Add new meta field
			add_user_meta($user_id, 'starter', true);
		}

		function my_custom_form_callback($content)
		{
			//In Order To Echo The Content Behind Lock
			$form  = '<p id="subheader-login" class="centered-subheading">Launch A New Site Below';
			$form .= '</p>';
			$form .= '<form id="create-site-form" method="post">';
			$form .= '<input type="text" name="site-title" placeholder="Enter Site Name" required>';
			$form .= wp_nonce_field('create-site', 'create-site-nonce', true, false);
			$form .= '<input type="submit" id="create-site-button" name="create-site-button" value="🚀 Launch">';
			$form .= '</form>';

			//Style Logout Button Center
			$form .= '<style>';
			$form .= '.w-col-3{display: contents;}';
			$form .= '</style>';

			return $form;
		}

		$site_form = my_custom_form_callback('Site-Form');

		///Lock Website Create Form
		//add_filter('the_content', 'my_custom_form_callback');
		?>

					<?php
		///Show The Site Form Here
		the_content();
		?>
					<div class="column-4 w-col w-col-3 w-col-small-small-stack w-col-tiny-tiny-stack">
						<a id="unlocklink" button="log-out" href="<?php echo wp_logout_url(get_permalink()); ?>"
							class="b4 w-button">🚪
							Log Out</a>
					</div>

					<style>
						.w-col-3 {
							display: contents;
						}
					</style>
					
				<?php
	endif;
	?>

				<?php  ///If author is detected don't display create site form
	$active = author_status();
	if ($active):
		?>
					<?php
		///Remove starter meta since it's author

		// Add the token as a user meta field
		$user_id = get_current_user_id();
		//remove starter meta field
		delete_user_meta($user_id, 'starter');
		?>
	<div id="lockpay" class="container-2 w-container">
						<?php

		///Random Link
		function randomize_variable($link)
		{
			$link_array  = explode(',', $link);
			$random_link = trim($link_array[array_rand($link_array)]);

			return $random_link;
		}

		function my_custom_form_callback($content)
		{
			///Current User Id
			$current_user_id = get_current_user_id();

			//Random Link
			//$link = 'https://3pad.xyz/explore3, https://3pad.xyz/explore1, https://3pad.xyz/explore2';
			//$random_link = randomize_variable($link);

			// Get all the sites that the user is a member of
			$blogs = get_blogs_of_user($current_user_id);

			// Loop through each site and check if the user has the "author" role
			foreach ($blogs as $blog_id => $blog) {
				$user = new WP_User($current_user_id, '', $blog_id);
				if (in_array('author', $user->roles)) {
					// If the user has the "author" role, get the site URL and make it HTTPS
					$blog_url = set_url_scheme($blog->siteurl, 'https');
					$gif      = 'https://media.giphy.com/media/3ohhwkciVuXOgX7z44/giphy-downsized.gif';
					$random   = wp_rand(24);

					$html = '<div class="columns w-row">';

					//Account Staus
					/*
									$html .= '<div class="acc_status">';
									$html .= '<a class="acc_status_link">';
									$html .= '<p class="acc_status_text">';
									$html .= 'Upgrade';
									$html .= '</p>';
									$html .= '</a>';
									$html .= '</div>';
									*/

					$html .= '<div class="column w-col w-col-3 w-col-small-small-stack w-col-tiny-tiny-stack">';
					$html .= '<a id="unlocklink" target="_parent" button="home" href="';
					$html .= $blog_url;
					$html .= '/wp-admin/admin.php?page=customize-home" class="email-login w-button">🏠 Dashboard</a>';
					$html .= '</div>';

					$html .= '<div class="column-2 w-col w-col-3 w-col-small-small-stack w-col-tiny-tiny-stack">';
					$html .= '<a id="unlocklink" button="site" target="_blank" href="https://app.unlock-protocol.com/checkout?paywallConfig=%7B%22locks%22%3A%7B%220x4b63670232e58574c9f94b2382e7db27161b66ea%22%3A%7B%22network%22%3A137%2C%22skipRecipient%22%3Atrue%2C%22name%22%3A%22A+Dollar+A+Day+Contribution%22%2C%22captcha%22%3Atrue%2C%22password%22%3Afalse%2C%22promo%22%3Afalse%2C%22emailRequired%22%3Afalse%2C%22maxRecipients%22%3Anull%2C%22dataBuilder%22%3A%22%22%2C%22recurringPayments%22%3A%22forever%22%7D%2C%220x8d9799dbb790af451f4370bcae727cf33bcb35b6%22%3A%7B%22network%22%3A137%2C%22name%22%3A%22A+Monthly+Contribution%22%2C%22recurringPayments%22%3A%22forever%22%2C%22skipRecipient%22%3Atrue%2C%22captcha%22%3Atrue%2C%22password%22%3Afalse%2C%22promo%22%3Afalse%2C%22emailRequired%22%3Afalse%2C%22maxRecipients%22%3Anull%2C%22dataBuilder%22%3A%22%22%7D%7D%2C%22pessimistic%22%3Atrue%2C%22skipRecipient%22%3Atrue%2C%22title%22%3A%22Your+Contribution+Goes+A+Long+Way+%26+You+Can+Always+Cancel+Anytime+%7C+3Pad%22%2C%22icon%22%3A%22https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FE1bpjy0otOn3a9bn8s%2Fgiphy-downsized.gif%22%2C%22persistentCheckout%22%3Afalse%2C%22referrer%22%3A%22%22%2C%22messageToSign%22%3A%22Thank+You+For+Your+Contribution.%22%2C%22hideSoldOut%22%3Afalse%7D" class="loginwithnft w-button">💸 Contribute';
					$html .= '</a>';
					$html .= '</div>';

					$html .= '<div class="column-3 w-col w-col-3 w-col-small-small-stack w-col-tiny-tiny-stack">';
					$html .= '<a id="unlocklink" button="status" href="https://tally.so/r/npeq51" target="_blank" rel="noopener noreferrer" class="cryptologin w-button help-button">💬 Feedback</a>';
					$html .= '</div>';

					$html .= '<div class="column-4 w-col w-col-3 w-col-small-small-stack w-col-tiny-tiny-stack">';
					$html .= '<a id="unlocklink" button="log-out" href="';
					$html .= wp_logout_url(get_permalink());
					$html .= '"class="b4 w-button">🚪 Log Out</a>';
					$html .= '</div>';
					$html .= '</div>';

					///remove Logout Button if status is acttive member & add some css
					$html .= '<style>';
					$html .= '.checkout-button{ display: none; }';
					$html .= '.checkout-button-container.blurred{background:url(' . $gif . ')no-repeat 50% !important;}';
					$html .= '.logoutbefore{display: none;}';
					$html .= '@keyframes blink { from {background-color: lime; box-shadow: 1px 1px 9px 3px rgb(51, 197, 50);} to {background-color: transparent;}}';
					$html .= '</style>';

					// Return the original content in addition to the "Upgrade?" message
					return $content . $html;
				}
			}
		}

		///Lock Website Create Form
		add_filter('the_content', 'my_custom_form_callback');

		?>
						<?php
		///Show The Site Dashboard Buttons Here
		the_content();
		?>


					</div>

					<!-- HTML for field box -->
					<div id="field-box">
						<div class="hide-from">
							<div id="app-version" style="position: fixed;left: 0px;bottom: 11px;opacity: 0.5;"><span
									style="color: white;padding: 5px;border-radius: 20px;font-family: system-ui;font-size: 6px;">V 1.0</span>
							</div>
							<div id="update-app"
								style=" background: #ffc71e;  top: 0; width: 100%; height: 20px; position: fixed; left: 0; display: none;">
								<p
									style=" color: black; text-align: center; font-family: monospace; font-size: 10px;  font-weight: 500; margin-top: 10px;">
									🔮 New Version Available. Update Site.</p>
							</div>
							<p id="subheader-login" class="centered-subheading" style=" margin-bottom: 5px; ">This is your 3Pad URL</p>
							<div id="sitepathdiv">
								<div id="sitePathstyle"><span id="site_path"></span></div>
							</div>
							<div id="secondary_urls">
							<div id="pathdiv" >
								<div id="ipfsPathstyle" style="width: 80%;text-overflow: ellipsis;overflow: hidden;"><span id="ipfsPath_backup"></span></div>
							</div>
							</div>
							<p class="centered-subheading" style="font-size: 9px;margin-top: -4px;margin-bottom: -12px;"><a >⚡️ Decentralized URL ⚡️</a></p>
							<div id="pathdiv">
								<div id="ipfsPathstyle"><span id="ipfsPath"></span></div>
							</div>
							<p class="centered-subheading" style="font-size: 9px;margin-top: -5px;"><a target="_blank"
									href="https://ipfsgate.com/">ⓘ Your Trustless App ⓘ</a></p>
							<p class="centered-subheading" style="font-size: 9px;margin-top: -22px;">(Subject to Changes - Always Save)
							</p>
						</div>
						<div class="column-4 w-col w-col-3 w-col-small-small-stack w-col-tiny-tiny-stack logoutbefore">
							<a id="unlocklink" button="log-out" href="<?php echo wp_logout_url(get_permalink()); ?>"
								class="b4 w-button">🚪 Log
								Out</a>
						</div>

						<?php  //IPFS Get Path
		get_template_part('assets/js/ipfs_js');
		?>

					<?php
		/// Important endif position . Keeps url box in tact and site created in tact
	endif;
	?>
				</div>
				<?php  // Check if the create site button was clicked and create the new site if valid
	//create_site_from_button();
	?>

	</section>

<?php
} else {
	?>
	<!--- Logged Out --->
	<!--- IPFS Message --->
	<div style=" background: black; z-index: 99999999999999999999; top: 0px; width: 100%; height: 20px; position: fixed; ">
		<p
			style=" color: white; text-align: center; font-family: monospace; font-size: 10px; /* text-transform: uppercase; */ font-weight: 500; ">
			Confirm your URL https://app.3pad.xyz</p>
	</div>
	<!--- IPFS Message --->
	<section class="section-login wf-section">
		<div class="container-login">
			<div id="logo"></div>
			<h1 id="header-login" class="centered-heading">Connect Your Wallet To Launch</h1>
			<p id="subheader-login" class="centered-subheading">Choose A Option Below To Connect With</p>
			<p id="subheader-login" class="centered-subheading"
				style="font-size: 9px; line-height: 14px; margin: -16px 40px 0px 41px;">By connecting, you agree to our <a
					target="_blank" href="https://hello.3pad.xyz/terms/index.html" style="font-weight: bold; color: bisque;">Terms</a> . Learn
				how we collect, use and share your data in our <a href="https://hello.3pad.xyz/terms/index.html" target="_blank"
					style="font-weight: bold; color: bisque;">Privacy Policy</a> and how we use cookies.</p>
			<div id="lockpay" class="container-2 w-container">
				<div class="columns w-row">
					<div class="column w-col w-col-3 w-col-small-small-stack w-col-tiny-tiny-stack">
						<a target="_parent" id="unlocklink" button="email" href="#" class="email-login w-button">📧 Connect Email</a>
					</div>
					<div class="column-2 w-col w-col-3 w-col-small-small-stack w-col-tiny-tiny-stack">
						<a target="_parent" id="unlocklink" button="nft" href="#" class="loginwithnft w-button">🤳 Connect NFT</a>
					</div>
					<div class="column-3 w-col w-col-3 w-col-small-small-stack w-col-tiny-tiny-stack">
						<a target="_parent" id="unlocklink" button="crypto" href="#" class="cryptologin w-button">₿ Connect Crypto</a>
					</div>
					<div class="column-4 w-col w-col-3 w-col-small-small-stack w-col-tiny-tiny-stack">
						<a target="_parent" id="unlocklink" button="pass" href="#" class="b4 w-button">🎟️ Subscription</a>
					</div>
				</div>
			</div>
		</div>
	</section>
	<style>
		/* Hide Unlock's Login Button */
		.login-button-container {
			display: none;
		}

		#lockpay {
			overflow: inherit;
		}
	</style>
	<div class="info"
		style="bottom: -1px;position: fixed;width: 100%;text-align: center;height: 23px;color: #ffffffc9;font-family: system-ui;font-size: 10px;z-index: 9;">
		<p style=" display: inline-block; "><a target="_blank" href="https://hello.3pad.xyz">About</a> •</p>
		<p style=" display: inline-block; "><a target="_blank" href="https://hello.3pad.xyz/terms/index.html">Terms •</a></p>
		<p style=" width: 74px; display: inline-block; "><a target="_blank" href="https://hello.3pad.xyz/terms/index.html"> Privacy
				Policy</a></p>
	</div>
	<?php
	///Get The Unlock Login URL
	the_content();
	?>
<?php
}
?>



<script src="<?php echo get_theme_file_uri('/assets/js/jquery.js'); ?>"></script>
<script src="<?php echo get_theme_file_uri('/assets/js/3pad.js'); ?>" async></script>


<div class="footer">
	<?php do_shortcode("[analytics]"); ?>
</div>
<!-- .Footer -->
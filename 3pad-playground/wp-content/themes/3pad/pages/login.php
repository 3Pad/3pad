<?php get_header(); ?>


<link href="<?php echo get_theme_file_uri('/assets/js/pwa_manifest_home.json'); ?>" rel="manifest" />
<link href="<?php echo get_theme_file_uri('/assets/css/w3.css'); ?>" rel="stylesheet" />
<link href="<?php echo get_theme_file_uri('/assets/css/n3.css'); ?>" rel="stylesheet" />
<link href="<?php echo get_theme_file_uri('/assets/css/3pad.css'); ?>" rel="stylesheet" />
<link href="<?php echo get_theme_file_uri('/assets/css/3pad_home.css'); ?>" rel="stylesheet" />



<div class="bg-image">
	<div class="yellow"></div>
	<div class="red"></div>
	<div class="green"></div>
	<div class="blue"></div>
	<div class="red2"></div>
</div>

<?php

/*
 * //Secure Header
 * <div id="secure-url">Always Make Sure The URL Is Correct:<?php echo site_url(); ?></div>
 */
?>

<?php
// Check If Author is active
$active = current_user_can('subscriber');

?>
<?php
// I'm already logged in, so I don't need to worry about signing up.
if (is_user_logged_in()) {
	?>
	<!--- Logged IN --->

	<style>
		.checkout-button-container.blurred p {
			color: white !important;
		}
	</style>
	<section class="section-login wf-section">
	   <div class="container-login" >
		   <div class="unlock-content unlocked">
			<div id="logo"></div>
			
				<h1 id="header-login" class="centered-heading">You Are Connected</h1>
				<div class="status free-tier">
					<a id="statuslink" target="_blank" href="https://app.unlock-protocol.com/keychain">
						<div class="light"></div>
						<p id="subheader-status" class="centered-subheading">🧑‍🚀 Status | Beta ↪</p>
					</a>
				</div>

				<?php

				/*
				 * function change_status()
				 * {
				 * ////Change Status Styling
				 * // Get the current time
				 * $current_time = time();
				 * //Get Current User Id
				 * $user_id = get_current_user_id();
				 * //Check meta expiration time
				 * $user_meta_expiration_time_premium = get_user_meta($user_id, 'admin-premium', true);
				 * ///Update Premium Value
				 * if (is_main_site() && is_front_page()) {
				 * // Calculate the expiration time (24 hours from now)
				 * $expiration_time = $current_time + 86400; // 86400 seconds is 24 hours
				 * //Check meta expiration time
				 * $user_meta_expiration_time_premium = get_user_meta($user_id, 'admin-premium', true);
				 * //If premium Time expired update meta..
				 * if ($user_meta_expiration_time_premium < $current_time) {
				 * // The user meta field is not valid, update token time
				 * update_user_meta($user_id, 'admin-premium', $expiration_time);
				 * }
				 * echo ' <div class="status premium-tier" style="position: fixed;">
				 * <a id="statuslink" target="_blank" href="https://app.unlock-protocol.com/keychain">
				 * <div class="light"></div>
				 * <p id="subheader-status" class="centered-subheading">🧑‍🚀 Status | Premium ↪</p>
				 * </a>
				 * </div>
				 * <style>.free-tier, .acc_status {
				 * display: none !important;
				 * }
				 * #lockpay {
				 * overflow: inherit;
				 * }
				 * </style>';
				 * }
				 * }
				 * add_shortcode('premium-status', 'change_status');
				 */
				?>

					
				<?php  // /If author is detected don't display create site form
				if ($active = false):
				?>
					<?php

					// /add starter meta since it's not author
					// Add the token as a user meta field
					$user_id = get_current_user_id();
					$starter = get_user_meta($user_id, 'starter', true);

					if ($starter == NULL) {
						// Add new meta field
						add_user_meta($user_id, 'starter', true);
					}

								?>


					<?php
					// /Show The Site Form Here
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

				<?php  // /If author is detected don't display create site form

				$active = current_user_can('subscriber');
				if ($active = true):
				?>
					<?php
					// /Remove starter meta since it's author
					// Add the token as a user meta field
					$user_id = get_current_user_id();
					// remove starter meta field
					delete_user_meta($user_id, 'starter');
								?>
	<div id="lockpay" class="container-2 w-container">
						<?php

						// /Random Link
						function randomize_variable($link)
						{
							$link_array  = explode(',', $link);
							$random_link = trim($link_array[array_rand($link_array)]);

							return $random_link;
						}

						function my_custom_form_callback($content)
						{
							if (current_user_can('subscriber') && !current_user_can('manage_options')) {
								// If the user has the "author" role, get the site URL and make it HTTPS
								// $blog_url = set_url_scheme($blog->siteurl, 'https');
								$current_user = wp_get_current_user();
								$user_login   = $current_user->user_login;
								$page         = get_page_by_path($user_login);
								$page_id      = $page ? $page->ID : null;

								$gif    = '/wp-content/themes/3pad/assets/img/member2.gif';
								$random = wp_rand(24);

								$html = '<div class="columns w-row">';

								// Account Staus

								/*
								 * $html .= '<div class="acc_status">';
								 * $html .= '<a class="acc_status_link">';
								 * $html .= '<p class="acc_status_text">';
								 * $html .= 'Upgrade';
								 * $html .= '</p>';
								 * $html .= '</a>';
								 * $html .= '</div>';
								 */

								$html .= '<div class="column w-col w-col-3 w-col-small-small-stack w-col-tiny-tiny-stack">';
								$html .= '<a id="unlocklink" button="home" href="';

								$html .= '/wp-admin/post.php?action=edit&post=' . $page_id . '" class="email-login w-button">🏠 Dashboard</a>';
								$html .= '</div>';

								$html .= '<div class="column-2 w-col w-col-3 w-col-small-small-stack w-col-tiny-tiny-stack">';
								$html .= '<a id="unlocklink" button="site" target="_blank" href="https://app.unlock-protocol.com/checkout?paywallConfig=%7B%22locks%22%3A%7B%220x4b63670232e58574c9f94b2382e7db27161b66ea%22%3A%7B%22network%22%3A137%2C%22skipRecipient%22%3Atrue%2C%22name%22%3A%22A+Dollar+A+Day+Contribution%22%2C%22captcha%22%3Atrue%2C%22password%22%3Afalse%2C%22promo%22%3Afalse%2C%22emailRequired%22%3Afalse%2C%22maxRecipients%22%3Anull%2C%22dataBuilder%22%3A%22%22%2C%22recurringPayments%22%3A%22forever%22%7D%2C%220x8d9799dbb790af451f4370bcae727cf33bcb35b6%22%3A%7B%22network%22%3A137%2C%22name%22%3A%22A+Monthly+Contribution%22%2C%22recurringPayments%22%3A%22forever%22%2C%22skipRecipient%22%3Atrue%2C%22captcha%22%3Atrue%2C%22password%22%3Afalse%2C%22promo%22%3Afalse%2C%22emailRequired%22%3Afalse%2C%22maxRecipients%22%3Anull%2C%22dataBuilder%22%3A%22%22%7D%7D%2C%22pessimistic%22%3Atrue%2C%22skipRecipient%22%3Atrue%2C%22title%22%3A%22Your+Contribution+Goes+A+Long+Way+%26+You+Can+Always+Cancel+Anytime+%7C+3Pad%22%2C%22icon%22%3A%22https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FE1bpjy0otOn3a9bn8s%2Fgiphy-downsized.gif%22%2C%22persistentCheckout%22%3Afalse%2C%22referrer%22%3A%22%22%2C%22messageToSign%22%3A%22Thank+You+For+Your+Contribution.%22%2C%22hideSoldOut%22%3Afalse%7D" class="loginwithnft w-button">💸 Contribute';
								$html .= '</a>';
								$html .= '</div>';

								$html .= '<div class="column-3 w-col w-col-3 w-col-small-small-stack w-col-tiny-tiny-stack">';
								$html .= '<a id="unlocklink" button="status" href="#" rel="noopener noreferrer" class="cryptologin w-button help-button">👋 Help</a>';
								$html .= '</div>';

								$html .= '<div class="column-4 w-col w-col-3 w-col-small-small-stack w-col-tiny-tiny-stack">';
								$html .= '<a id="unlocklink" button="log-out" href="';
								$html .= wp_logout_url(get_permalink());
								$html .= '"class="b4 w-button">🚪 Log Out</a>';
								$html .= '</div>';
								$html .= '</div>';

								// /remove Logout Button if status is acttive member & add some css
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

						// /Lock Website Create Form
						add_filter('the_content', 'my_custom_form_callback');

									?>
						<?php
						// /Show The Site Dashboard Buttons Here
						the_content();
									?>


					</div>
					<?php
					// ////IPFS SITE BOXES
					if (current_user_can('subscriber') && !current_user_can('manage_options')) {
						echo '
					<!-- HTML for field box -->
					<div id="field-box">
						<div class="hide-from">
							<div id="app-version" style="position: fixed;left: 0px;bottom: 11px;opacity: 0.5;"><span style="color: white;padding: 5px;border-radius: 20px;font-family: system-ui;font-size: 6px;">V 1.0</span>
							</div>
							<div id="update-app" style=" background: #ffc71e;  top: 0; width: 100%; height: 20px; position: fixed; left: 0; display: none;">
								<p style=" color: black; text-align: center; font-family: monospace; font-size: 10px;  font-weight: 500; margin-top: 10px;">
									🔮 New Version Available. Re-Publish Site. 🆕</p>
							</div>
							<div id="unknown-app" style=" background: #ff1e1e;  top: 0; width: 100%; height: 20px; position: fixed; left: 0; display: none;">
								<p style=" color: white; text-align: center; font-family: monospace; font-size: 10px;  font-weight: 500; margin-top: 10px;">
									❌ Re-Publish Site or Check URL. ❌</p>
							</div>
							<div id="confirmed-app" style=" background: #00b822;  top: 0; width: 100%; height: 20px; position: fixed; left: 0; display: none;">
								<p style=" color: white; text-align: center; font-family: monospace; font-size: 10px;  font-weight: 500; margin-top: 10px;">
									✅ Your Site Version is Up-To-Date. ✅</p>
							</div>
							<p id="subheader-login" class="centered-subheading" style=" margin-bottom: 5px; ">This is your site URL</p>
							<p id="subheader-login" class="centered-subheading" style="font-size: 6px;line-height: 0;">(Updates May Take Time To Reflect)</p>
							<div id="sitepathdiv">
								<div id="sitePathstyle"><span id="site_path"><a href="https://example.com" target="_blank" rel="noopener noreferrer">example.com</a></span></div>
							</div>
							
							
							
							
							
						</div>
						</div>

						<!-- Div Help -->
						<div class="help-button-wrapper">
							<ul class="help-list">
							<li>
								<iframe loading="lazy" src="https://e.widgetbot.io/channels/1061496413474783352/1067294783153901588"
								height="300" width="100%"></iframe>
							</li>
							<li>
							<li>
							<ul style="text-align: left; color: white !important; font-size: 13px; line-height: normal; font-weight: 500;">
								<li style="font-weight: 900;">How To </li>
						
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
							<button class="help-button help-button-bottom">
							👋 Help
						</button>
						</div>
						<style>
						.expanded .help-button {
							display: block;
							float: right;
						}
						.help-button-bottom{ 
							display: none;
						}
						</style>
						';
					}
								?>
			<?php
					if (current_user_can('manage_options')) {
						echo '<div class="column-4 w-col w-col-3 w-col-small-small-stack w-col-tiny-tiny-stack logoutbefore activate-button"> 
				<a id="unlocklink" button="log-out" href="/wp-admin" class="b4 w-button" style="background: white;color: black;">Admin Dashboard</a>
				 </div>';
					}
						?>			
			

			 <?php
					if (!current_user_can('manage_options')) {
						echo '<div class="column-4 w-col w-col-3 w-col-small-small-stack w-col-tiny-tiny-stack logoutbefore activate-button"> 
			<a id="unlocklink" button="log-out" href="/?launch_site" class="b4 w-button" style="background: yellow;color: black;">Launch Site 🚀</a>
			 </div>';
					}
					?>	
			


						<div class="column-4 w-col w-col-3 w-col-small-small-stack w-col-tiny-tiny-stack logoutbefore">
							<a id="unlocklink" button="log-out" href="<?php echo wp_logout_url(get_permalink()); ?>"
								class="b4 w-button firstlogout">🚪 Log
								Out</a>
						</div>
	
						

						<?php  // IPFS Get Path
						get_template_part('assets/js/ipfs_js');
									?>

					<?php
					// / Important endif position . Keeps url box in tact and site created in tact
				endif;
				?>
				</div>
				<?php  // Check if the create site button was clicked and create the new site if valid
				// create_site_from_button();
				?>
	</div>
	</section>

<?php

?>
<div class="unlock-content locked" >
	<section class="section-login wf-section">
		<div class="container-login ">
			<div id="logo"></div>
			<h1 id="header-login" class="centered-heading">Connect With WEB3 To Launch</h1>
			<p id="subheader-login" class="centered-subheading">Choose A Option Below To Connect With</p>
			<p id="subheader-login" class="centered-subheading"
				style="font-size: 9px; line-height: 14px; margin: -16px 40px 0px 41px;">By connecting, you agree to our <a
					target="_blank" href="https://hello.3pad.xyz/terms/index.html" style="font-weight: bold; color: bisque;">Terms</a> . Learn
				how we collect, use and share your data in our <a href="https://hello.3pad.xyz/terms/index.html" target="_blank"
					style="font-weight: bold; color: bisque;">Privacy Policy</a> and how we use cookies.</p>
			<div id="lockpay" class="container-2 w-container">
				<div class="columns w-row">
					<div class="column w-col w-col-3 w-col-small-small-stack w-col-tiny-tiny-stack">
						<a onclick="window.unlockProtocol && window.unlockProtocol.loadCheckoutModal()" id="unlocklink" button="email" href="#" class="email-login w-button">📧 Connect Email</a>
					</div>
					<div class="column-2 w-col w-col-3 w-col-small-small-stack w-col-tiny-tiny-stack">
						<a onclick="window.unlockProtocol && window.unlockProtocol.loadCheckoutModal()" id="unlocklink" button="nft" href="#" class="loginwithnft w-button">🤳 Connect NFT</a>
					</div>
					<div class="column-3 w-col w-col-3 w-col-small-small-stack w-col-tiny-tiny-stack">
						<a onclick="window.unlockProtocol && window.unlockProtocol.loadCheckoutModal()" id="unlocklink" button="crypto" href="#" class="cryptologin w-button">₿ Connect Crypto</a>
					</div>
					<div class="column-4 w-col w-col-3 w-col-small-small-stack w-col-tiny-tiny-stack">
						<a tonclick="window.unlockProtocol && window.unlockProtocol.loadCheckoutModal()" id="unlocklink" button="pass" href="#" class="b4 w-button">🎟️ Subscription</a>
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
</div>


<?php
}
?>



<script src="<?php echo get_theme_file_uri('/assets/js/unlock.js'); ?>" defer></script>

<script>
(function (d, s) {
    var js = d.createElement(s),
      sc = d.getElementsByTagName(s)[0];
    js.src = "https://paywall.unlock-protocol.com/static/unlock.latest.min.js";
    sc.parentNode.insertBefore(js, sc);
}(document, "script"));
</script>

<script>
	window.addEventListener("unlockProtocol.status", function (event) {
    // We hide all .unlock-content elements
    document.querySelector(".unlock-content").style.display = "none";
    // We show only the relevant element
    document
      .querySelectorAll(`.unlock-content.${event.detail.state}`)
      .forEach((element) => {
        element.style.display = "contents";
      });
  });

  
  
// Listen for the unlockProtocol event
window.addEventListener('unlockProtocol', function (e) {
    var state = e.detail;

    if (state === 'locked') {
        // Hide elements with the class 'unlock-content locked'
        document.querySelectorAll('.unlock-content.locked').forEach(function (element) {
            element.style.display = 'none'; // Hide the element
        });

        // Optionally, load ad rendering component here
        console.log('Content is locked.');

    } else {
        // Show elements with the class 'unlock-content locked'
        document.querySelectorAll('.unlock-content.locked').forEach(function (element) {
            element.style.display = ''; // Show the element (default display)
        });

        // Optionally, stop ad rendering component
        console.log('Content is unlocked.');

        // Save the nonce into session storage
        if (typeof myNonce !== 'undefined') {
            // Save nonce in session storage
            sessionStorage.setItem('unlock_nonce', myNonce);
        } else {
            console.error('Security Nonce is not defined.');
        }
    }
});



  
</script>

  <script>var unlockProtocolConfig = {
    "icon": "",
    "locks": {
        "0x89a1b8642a6942f619f78d5e89e23bb14ad03e26": { "name": "Free Member", "order": 0, "network": 137, "recipient": "", "dataBuilder": "", "emailRequired": true, "maxRecipients": null },
        "0x8d9799dbb790af451f4370bcae727cf33bcb35b6": { "name": "Monthly (Donation)", "order": 1, "network": 137, "recipient": "", "dataBuilder": "", "emailRequired": false, "maxRecipients": null },
        "0x9f1066ea080912c6a3b2d4f0ceb071417d3842fd": { "name": "Donate a ETH", "order": 3, "network": 137, "recipient": "", "dataBuilder": "", "emailRequired": false, "maxRecipients": null }
    },
    "title": "Gain Access",
    "referrer": "0xd5e3a9199cC1DeD984B44892ef5c8fBB93Bf62d6",
    "skipSelect": false,
    "hideSoldOut": false,
    "pessimistic": true,
    "skipRecipient": true,
    "endingCallToAction": "Unlock",
    "persistentCheckout": false,
    "redirectUri": window.location.href
}


;

</script>


<div class="footer">
	<?php do_shortcode("[analytics]"); ?>
</div>





<!-- .Footer -->
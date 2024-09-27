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

								$html .= 'wp-admin/post.php?action=edit&post=' . $page_id . '" class="email-login w-button">🏠 Dashboard</a>';
								$html .= '</div>';

								$html .= '<div class="column-2 w-col w-col-3 w-col-small-small-stack w-col-tiny-tiny-stack">';
								$html .= '<a id="unlocklink" button="site" onclick="window.unlockProtocol && window.unlockProtocol.loadCheckoutModal()" href="javascript:void(0);" class="loginwithnft w-button">💸 Contribute';
								$html .= '</a>';
								$html .= '</div>';

								$html .= '<div class="column-3 w-col w-col-3 w-col-small-small-stack w-col-tiny-tiny-stack">';
								$html .= '<a id="unlocklink" button="status" href="#" rel="noopener noreferrer" class="cryptologin w-button help-button">Coming Soon 🚀 </a>';
								$html .= '</div>';

								$html .= '<div class="column-4 w-col w-col-3 w-col-small-small-stack w-col-tiny-tiny-stack">';
								$html .= '<a id="unlocklink" button="log-out" href="#';
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
				<a id="unlocklink"  href="/wp-admin/about.php" class="b4 w-button" style="background: white;color: black;">Admin Dashboard</a>
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
			<h1 id="header-login" class="centered-heading">BUILD FAST,<BR>
			 EXPORT FREE,<br>
			YOURS FORVER</h1>
			<p id="subheader-login" class="centered-subheading">Create and export websites quickly. Your data stays with you, and your sites can be used as long as you need. Simple, secure, and under your control.</p>
			<div id="lockpay" class="container-2 w-container">
				<div class="columns w-row">
					<div class="column w-col w-col-3 w-col-small-small-stack w-col-tiny-tiny-stack lockedbuttons">
						<a onclick="window.unlockProtocol && window.unlockProtocol.loadCheckoutModal()" id="unlocklink" button="email" href="#" class="email-login w-button">Get Started</a>
						<a id="unlocklink" href="javascript:void(0);" onclick="showInstallPopup()" class="appinstall email-login w-button" style="margin-top: 10px;">Install App</a>

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
		<p style=" display: inline-block; "><a class="about-pop-up"  href="#">FAQ</a> •</p>
		<p style=" display: inline-block; "><a class="terms-pop-up"  href="#">Terms of Service</a></p>
	</div>
</div>


<?php
}
?>
<div class="bg-image unlock-content locked" style="display: inherit;">
<div class="img1"></div>
	<div class="img2"></div>
	<div class="img3"></div>
	<div class="img4"></div>
	<div class="img5"></div>
	<div class="img6"></div>
	<div class="img7"></div>
	<div class="img8"></div>
	</div>


	<script src="<?php echo get_theme_file_uri('/assets/js/unlock.js'); ?>"></script>
	<script src="<?php echo get_theme_file_uri('/assets/js/home_popup.js'); ?>"></script>

<script defer>
(function (d, s) {
    var js = d.createElement(s),
      sc = d.getElementsByTagName(s)[0];
    js.src = "https://paywall.unlock-protocol.com/static/unlock.latest.min.js";
    sc.parentNode.insertBefore(js, sc);
}(document, "script"));

</script>






<div class="footer">
	
	<div id="pwa-installPopup" class="pwa-popup">
        <div class="pwa-popup-content">
            <span class="pwa-close">&times;</span>
            <h2>Install This App</h2>
            <div id="pwa-instructions"></div>
        </div>
    </div>

<!-- Pop-Up Modal -->
<div class="popup-container" id="faq-popup">
  <div class="popup-content">
    <span class="close-btn">&times;</span>
    <h2>Frequently Asked Questions</h2>

    <!-- FAQ Dropdowns -->
    <div class="faq-item">
  <button class="faq-question">What is 3Pad?</button>
  <div class="faq-answer">
    3Pad is a Web3-based platform that provides landing pages for users. It offers content creators an easy-to-use framework for building and managing a single webpage or landing page. The platform allows creators to own, control, and engage with their audience in a secure, censor-resistant, and transparent manner.
  </div>
</div>

<div class="faq-item">
  <button class="faq-question">How does 3Pad enhance the landing page experience?</button>
  <div class="faq-answer">
    3Pad helps users transition to web3 and improve their landing experience. It allows content creators to keep their audience engaged by seamlessly linking or embedding content directly on one page. The platform also supports real-time chat, live video, or audio, all from a single page.
  </div>
</div>

<div class="faq-item">
  <button class="faq-question">What is Web3?</button>
  <div class="faq-answer">
    Web3 refers to the next generation of the internet, which is decentralized and focused on user privacy and security. It's powered by decentralized technologies like blockchain and IPFS, giving users greater control over their data and online identity. Web3 aims to create a more equitable, open, and trustworthy internet that works for everyone, not just a few powerful corporations.
  </div>
</div>

<div class="faq-item">
  <button class="faq-question">Do I need to know how to code to use 3Pad?</button>
  <div class="faq-answer">
    No, users do not need to know how to code to create a landing page using 3Pad. The platform provides a user-friendly interface that allows users to input text, images, and links without any coding knowledge. This empowers users to create beautiful, functional landing pages that suit their needs and reflect their style.
  </div>
</div>

<div class="faq-item">
  <button class="faq-question">How does content embedding work on 3Pad?</button>
  <div class="faq-answer">
    Content embedding and iframes are used to include content from one website into another. 3Pad allows users to embed various types of content, such as videos, maps, or even shopping pages. As long as the site you plan on using allows iframe embedding, you are free to incorporate it into your landing page.
  </div>
</div>

<div class="faq-item">
  <button class="faq-question">How do I get started with 3Pad?</button>
  <div class="faq-answer">
    To get started with 3Pad, you need to sign up using a Web-3 wallet. You'll be prompted to enter your email address and any additional required information. After receiving an invitation and completing the sign-up process, you may need to purchase an NFT to gain access to the service. Once you have an NFT, you can use it to unlock the service and start customizing your profile, posting updates, and interacting with your audience.
  </div>
</div>

<div class="faq-item">
  <button class="faq-question">Does 3Pad own my data?</button>
  <div class="faq-answer">
    No, 3Pad does not own your data. The data collected, Eth address, email, and name, is provided by you and used to provide and improve the service. No files are uploaded to the website/app. You own the data and have control over it.
  </div>
</div>

<div class="faq-item">
  <button class="faq-question">What makes 3Pad unique?</button>
  <div class="faq-answer">
    3Pad is designed to be a fully decentralized platform, offering a more secure and private experience. It uses IPFS for hosting landing pages and NFT technology for passwordless login, ensuring no central point of control or data collection. The platform also features built-in censorship resistance, making it ideal for those who value online freedom and autonomy.
  </div>
</div>
    </div>
  </div>
</div>

<!-- Pop-Up Terms Modal -->
<div class="popup-container3" >
  <div class="popup-content3">
    <span class="close-btn3">&times;</span>
				<header><h1><i>The Terms &amp; conditions were last updated on February 10, 2023</i></h1></header><h3><strong>BETA DISCLAIMER</strong></h3>
<p>The website/app is currently in beta testing and may contain errors or inaccuracies. We make no warranties, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the website/app or the information, products, services, or related graphics contained on the website/app for any purpose. Any reliance you place on such information is therefore strictly at your own risk. In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of or in connection with the use of the website/app.</p>
<p>By using the website/app, you acknowledge that it is provided on an “as is” and “as available” basis and that your use of the website/app is at your own risk.</p>
<div>
<h2>1. Introduction</h2>
<p>Welcome to 3Pad, a website/app owned and operated by 3Pad (“website/app”, “we”, “us”, or “our”). By accessing or using the website/app, you agree to be bound by these terms and conditions (“Terms of Service” or “TOS”). If you do not agree to all the terms and conditions of this TOS, you should not use the website/app.</p>
<p>These Terms and conditions apply to this website and to the transactions related to our products and services.&nbsp;You may be bound by additional contracts related to your relationship with us or any products or services that you receive from us.&nbsp;If any provisions of the additional contracts conflict with any provisions of these Terms, the provisions of these additional contracts will control and prevail.</p>
<h2>2. Binding</h2>
<p>By registering with, accessing, or otherwise using this website, you hereby agree to be bound by these Terms and conditions set forth below.&nbsp;The mere use of this website implies the knowledge and acceptance of these Terms and conditions.&nbsp;In some particular cases, we can also ask you to explicitly agree.</p>
<h2>3. Electronic communication</h2>
<p>By using this website or communicating with us by electronic means, you agree and acknowledge that we may communicate with you electronically on our website or by sending an email to you, and you agree that all agreements, notices, disclosures, and other communications that we provide to you electronically satisfy any legal requirement, including but not limited to the requirement that such communications should be in writing.</p>
<h2>4. Intellectual property</h2>
<p>We or our licensors own and control all of the copyright and other intellectual property rights in the website and the data, information, and other resources displayed by or accessible within the website.</p>
<h2>5. Newsletter</h2>
<p>Notwithstanding the foregoing, you may forward our newsletter in the electronic form to others who may be interested in visiting our website.</p>
<h2>6. Third-party property</h2>
<p>Our website may include hyperlinks or other references to other party’s websites.&nbsp;We do not monitor or review the content of other party’s websites which are linked to from this website.&nbsp;Products or services offered by other websites shall be subject to the applicable Terms and Conditions of those third parties.&nbsp;Opinions expressed or material appearing on those websites are not necessarily shared or endorsed by us.</p>
<p>We will not be responsible for any privacy practices or content of these sites. You bear all risks associated with the use of these websites and any related third-party services. We will not accept any responsibility for any loss or damage in whatever manner, however caused, resulting from your disclosure to third parties of personal information.</p>
</div>
<p><strong>6.1 </strong>Use of IPFS</p>
<p>3Pad utilizes the InterPlanetary File System (IPFS) for the storage and distribution of landing pages and other files.</p>
<p>Content: 3Pad is not responsible for the content it uploads and makes available through IPFS and for ensuring that it complies with all applicable laws. IPFS does not control or endorse the content stored or distributed through its network.</p>
<p>Liability: 3Pad shall not be liable for any damages arising from IPFS, including but not limited to the loss, alteration, or unauthorized access to any files stored on IPFS. You acknowledge that IPFS is provided “as is” and that IPFS makes no representations or warranties of any kind, express or implied, as to the operation of the network or the content stored or distributed through it.</p>
<p>Files on IPFS: You acknowledge that files stored on IPFS may remain on the network forever, unless deleted by the original uploader. Even if a file is deleted, there is a possibility that it may still be accessible on IPFS through cached nodes or other means.</p>
<div>
<p><strong>6.2</strong>&nbsp;THIRD PARTY COMMENTING SERVICES</p>
<p>The website/app may allow users to post comments using third party services, such as Disqus or Telegram (“third party commenting services”). By posting a comment using a third party commenting service, you agree to be bound by the terms and conditions of the third party commenting service. You acknowledge that we are not responsible for the third party commenting services and that we do not endorse or guarantee the quality of the third party commenting services.</p>
<p>You are solely responsible for your interactions with the third party commenting services. We are not responsible for any loss or damage that may result from your use of the third party commenting services.</p>
<p>We reserve the right to remove access to any third party commenting services at any time, for any reason, and without notice.</p>
<h2>7. Responsible use</h2>
<p>By visiting our website, you agree to use it only for the purposes intended and as permitted by these Terms, any additional contracts with us, and applicable laws, regulations, and generally accepted online practices and industry guidelines.&nbsp;You must not use our website or services to use, publish or distribute any material which consists of (or is linked to) malicious computer software; use data collected from our website for any direct marketing activity, or conduct any systematic or automated data collection activities on or in relation to our website.</p>
<p>You may not use the website/app for any illegal or unauthorized purpose. You must not, in the use of the website/app, violate any laws in your jurisdiction (including but not limited to copyright laws). You may not engage in any activity that could disable, overburden, or impair the proper working or appearance of the website/app, such as a denial of service attack or interference with page rendering or other website/app functionality. You may not use the website/app to engage in any spamming or phishing activity.</p>
<p>You may not use the website/app to post or transmit any content that is illegal, obscene, child endangering, or otherwise offensive. You are solely responsible for the content that you post on the website/app and the consequences of posting or publishing it. You represent and warrant that you have all the rights, power, and authority necessary to post the content and that the content does not violate any intellectual property rights or other rights of any third party.</p>
<p>We reserve the right to remove any content that violates these terms or that we deem inappropriate for any reason, and without notice.</p>
<h2>8. Registration</h2>
<p>You may register for an account with our website.&nbsp;During this process, you may be required to choose a password.&nbsp;You are responsible for maintaining the confidentiality of passwords and account information and agree not to share your passwords, account information, or secured access to our website or services with any other person.&nbsp;You must not allow any other person to use your account to access the website because you are responsible for all activities that occur through the use of your passwords or accounts.&nbsp;You must notify us immediately if you become aware of any disclosure of your password.</p>
<p>After account termination, you will not attempt to register a new account without our permission.</p>
<p><strong>8.1</strong>&nbsp;ETHEREUM WALLETS</p>
<p>You may be required to sign up for the website/app using an Ethereum wallet. By signing up with an Ethereum wallet, you represent and warrant that you have the right to use the Ethereum wallet and that you will not use the website/app for any illegal or unauthorized purpose. You are solely responsible for the security and integrity of your Ethereum wallet and any transactions that you make using your Ethereum wallet. We are not responsible for any loss or damage that may result from the use of your Ethereum wallet on the website/app.</p>
<p><strong>8.2</strong>&nbsp;AGE REQUIREMENT</p>
<p>The website/app is intended for users who are at least 18 years old. By using the website/app, you represent and warrant that you are at least 18 years old and that you have the right, authority, and capacity to enter into this TOS and to abide by all of its terms and conditions. If you are under the age of 18, you may not use the website/app.</p>
<p><strong>8.3</strong>&nbsp;SUBSCRIPTIONS</p>
<p>The website/app may offer subscription-based services that require you to pay a fee on a recurring basis. By subscribing to a service, you agree to pay the applicable subscription fee and any other charges associated with your subscription (such as taxes and fees). You are responsible for maintaining the confidentiality of your account and password and for restricting access to your account. You agree to accept responsibility for all activities that occur under your account or password.</p>
<p>We reserve the right to change the subscription fees or any other charges associated with the subscription-based services at any time, and we will provide you with notice of any such changes. If you do not agree to the changes, you may cancel your subscription.</p>
<p>If you cancel your subscription, you will not be entitled to a refund of any subscription fees or other charges that you have already paid. We reserve the right to terminate your subscription at any time, for any reason, and without notice.</p>
<p>You may not transfer your subscription to another person or entity.</p>
<p><strong>8.4</strong>&nbsp;THIRD PARTY SIGN-IN AND REGISTRATION SERVICES</p>
<p>The website/app may allow users to sign in and register using third party services, such as Unlock Protocol (“third party sign-in and registration services”). By signing in or registering using a third party sign-in and registration service, you agree to be bound by the terms and conditions of the third party service. You acknowledge that we are not responsible for the third party sign-in and registration services and that we do not endorse or guarantee the quality of the third party sign-in and registration services.</p>
<p>You are solely responsible for your interactions with the third party sign-in and registration services. We are not responsible for any loss or damage that may result from your use of the third party sign-in and registration services.</p>
<p>We reserve the right to remove access to any third party sign-in and registration services at any time, for any reason, and without notice.</p>
<h2>9. Content posted by you</h2>
<p>We may provide various open communication tools on our website, such as blog comments, blog posts, forums, message boards, ratings and reviews, and various social media services.&nbsp;It might not be feasible for us to screen or monitor all content that you or others may share or submit on or through our website.&nbsp;However, we reserve the right to review the content and to monitor all use of and activity on our website, and remove or reject any content in our sole discretion.&nbsp;By posting information or otherwise using any open communication tools as mentioned, you agree that your content will comply with these Terms and Conditions and must not be illegal or unlawful or infringe any person’s legal rights.</p>
<p><strong>9.1&nbsp;</strong>USER-GENERATED CONTENT AND PRODUCTS</p>
<p>The website/app may allow users to sell their own content or products, such as photos, videos, and physical goods (“user-generated products”). You are solely responsible for your own user-generated products and the consequences of selling or purchasing them. You retain ownership of your user-generated products, but by selling them on the website/app, you grant us a non-exclusive, worldwide, perpetual, royalty-free, and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform your user-generated products in connection with the website/app and our business. You represent and warrant that you have all the rights, power, and authority necessary to grant the above license and that your user-generated products do not violate any intellectual property rights or other rights of any third party.</p>
<p>You are required to provide accurate descriptions of your user-generated products and to set appropriate prices for your products. You are also required to comply with all applicable laws and regulations related to the sale of your products.</p>
<p>We are not responsible for the quality or safety of any user-generated products or the accuracy of any descriptions provided by users. We do not endorse or guarantee the quality of any user-generated products or the accuracy of any descriptions provided by users. We are not responsible for any disputes that may arise between users related to the sale of user-generated products.</p>
<p>We are not responsible for any loss or damage that may result from the unauthorized access or use of your generated content.</p>
<p>By purchasing a user-generated product, you acknowledge that it is provided on an “as is” and “as available” basis and that your use of the user-generated product is at your own risk. We are not responsible for any loss or damage that may result from the purchase or use of a user-generated product.</p>
<p><strong>9.2</strong>&nbsp;ENCRYPTED CONTENT</p>
<p>The website/app may allow users to encrypt their content and make it unlockable by a password (“encrypted content”). By encrypting your content and making it unlockable by a password, you represent and warrant that you have the right to do so and that the encrypted content does not violate any intellectual property rights or other rights of any third party. You are solely responsible for the encrypted content and the consequences of making it available on the website/app. You acknowledge that we have no obligation to decrypt or otherwise access the encrypted content.</p>
<p>You are responsible for maintaining the confidentiality of your password and for restricting access to your encrypted content. You agree to accept responsibility for all activities that occur under your password. If you believe that your password has been compromised, you should immediately change it.</p>
<p>We are not responsible for any loss or damage that may result from the unauthorized access or use of your encrypted content.</p>
<p>You may not use the website/app to store or transmit any encrypted content that is illegal, obscene, child endangering, or otherwise offensive. We reserve the right to remove any encrypted content that violates these terms or that we deem inappropriate for any reason, and without notice.</p>
<p>You may not sell or otherwise transfer your password or the access to your encrypted content to any third party.</p>
<p><strong>9.3</strong>&nbsp;THIRD PARTY NFT LOCK SERVICES</p>
<p>The website/app may allow users to access third party services that allow them to create non-fungible token (NFT) locks (“third party NFT lock services”). By accessing or using third party NFT lock services, you agree to be bound by the terms and conditions of the third party that provides the services. You acknowledge that we are not responsible for the third party NFT lock services and that we do not endorse or guarantee the quality of the third party NFT lock services.</p>
<p>You are solely responsible for your use of the third party NFT lock services and any NFT locks that you create using the services. We are not responsible for any loss or damage that may result from your use of the third party NFT lock services.</p>
<p>We reserve the right to remove access to any third party NFT lock services at any time, for any reason, and without notice.</p>
<h2>10. Idea submission</h2>
<p>Do not submit any ideas, inventions, works of authorship, or other information that can be considered your own intellectual property that you would like to present to us unless we have first signed an agreement regarding the intellectual property or a non-disclosure agreement.&nbsp;If you disclose it to us absent such written agreement, you grant to us a worldwide, irrevocable, non-exclusive, royalty-free license to use, reproduce, store, adapt, publish, translate and distribute your content in any existing or future media.</p>
<h2>11. Termination of use</h2>
<p>We may, in our sole discretion, at any time modify or discontinue access to, temporarily or permanently, the website or any Service thereon.&nbsp;You agree that we will not be liable to you or any third party for any such modification, suspension or discontinuance of your access to, or use of, the website or any content that you may have shared on the website.&nbsp;You will not be entitled to any compensation or other payment, even if certain features, settings, and/or any Content you have contributed or have come to rely on, are permanently lost.&nbsp;You must not circumvent or bypass, or attempt to circumvent or bypass, any access restriction measures on our website.</p>
<h2>12. Warranties and liability</h2>
<p>Nothing in this section will limit or exclude any warranty implied by law that it would be unlawful to limit or to exclude.&nbsp;This website and all content on the website are provided on an “as is” and “as available” basis and may include inaccuracies or typographical errors.&nbsp;We expressly disclaim all warranties of any kind, whether express or implied, as to the availability, accuracy, or completeness of the Content.&nbsp;We make no warranty that:</p>
<ul>
<li>this website or our products or services will meet your requirements;</li>
<li>this website will be available on an uninterrupted, timely, secure, or error-free basis;</li>
<li>the quality of any product or service purchased or obtained by you through this website will meet your expectations.</li>
</ul>
<p>Nothing on this website constitutes or is meant to constitute, legal, financial or medical advice of any kind.&nbsp;If you require advice you should consult an appropriate professional.</p>
<p>The following provisions of this section will apply to the maximum extent permitted by applicable law and will not limit or exclude our liability in respect of any matter which it would be unlawful or illegal for us to limit or to exclude our liability.&nbsp;In no event will we be liable for any direct or indirect damages (including any damages for loss of profits or revenue, loss or corruption of data, software or database, or loss of or harm to property or data) incurred by you or any third party, arising from your access to, or use of, our website.</p>
<p>Except to the extent any additional contract expressly states otherwise, our maximum liability to you for all damages arising out of or related to the website or any products and services marketed or sold through the website, regardless of the form of legal action that imposes liability (whether in contract, equity, negligence, intended conduct, tort or otherwise) will be limited to the total price that you paid to us to purchase such products or services or use the website.&nbsp;Such limit will apply in the aggregate to all of your claims, actions and causes of action of every kind and nature.</p>
<h2>13. Privacy</h2>
<p>To access our website and/or services, you may be required to provide certain information about yourself as part of the registration process.&nbsp;You agree that any information you provide will always be accurate, correct, and up to date.</p>
<p>We take your personal data seriously and are committed to protecting your privacy.&nbsp;We will not use your email address for unsolicited mail.&nbsp;Any emails sent by us to you will only be in connection with the provision of agreed products or services.</p>
<p>We have developed a policy to address any privacy concerns you may have.&nbsp;For more information, please see our&nbsp;Privacy Statement.</p>
<p><strong>13.1</strong>&nbsp;ANALYTICS</p>
<p>The website/app may provide users with access to analytics data and other information related to their use of the website/app (“analytics data”). The analytics data may include information about the number of visits to the website/app, the pages viewed, the time spent on the website/app, and other similar data. The analytics data is provided for informational purposes only and is not intended to be relied upon for any purpose. We do not guarantee the accuracy, completeness, or reliability of the analytics data.</p>
<p>By accessing the analytics data on your dashboard, you agree that you will use the analytics data only for your own internal business purposes and will not share the analytics data with any third party. You may not use the analytics data to engage in any spamming or phishing activity, or to engage in any other activity that could disable, overburden, or impair the proper working or appearance of the website/app.</p>
<p>We reserve the right to change the analytics data or to stop providing analytics data at any time, and without notice.</p>
<p><strong>13.2</strong>&nbsp;USER-GENERATED PRODUCTS OR CONTENT THAT COLLECT DATA FROM USERS</p>
<p>The website/app may allow users to create or upload products or content that may collect data from other users (“user-generated products or content”). By creating or uploading user-generated products or content, you represent and warrant that you have the right to do so and that the user-generated products or content does not violate any intellectual property rights or other rights of any third party. You are solely responsible for the user-generated products or content and the consequences of making it available on the website/app.</p>
<p>You are required to provide clear and conspicuous notice to users about the data collection practices of your user-generated products or content. You must also provide users with the opportunity to opt-out of the data collection and obtain a copy of the collected data upon request. You are responsible for ensuring that your user-generated products or content comply with all applicable laws and regulations related to data protection and privacy.</p>
<p>We are not responsible for the data collection practices of your user-generated products or content and we are not responsible for any loss or damage that may result from the collection of data by your user-generated products or content.</p>
<p>We reserve the right to remove any user-generated products or content that violates these terms or that we deem inappropriate for any reason, and without notice.</p>
<h2>14. Accessibility</h2>
<p>We are committed to making the content we provide accessible to individuals with disabilities.&nbsp;If you have a disability and are unable to access any portion of our website due to your disability, we ask you to give us a notice including a detailed description of the issue you encountered.&nbsp;If the issue is readily identifiable and resolvable in accordance with industry-standard information technology tools and techniques we will promptly resolve it.</p>
<h2>15. Export restrictions / Legal compliance</h2>
<p>Access to the website from territories or countries where the Content or purchase of the products or Services sold on the website is illegal is prohibited.&nbsp;You may not use this website in violation of export laws and regulations of United States.</p>
<h2>16. Affiliate marketing</h2>
<p>Through this Website we may engage in affiliate marketing whereby we receive a percentage of or a commission on the sale of services or products on or through this website.&nbsp;We may also accept sponsorships or other forms of advertising compensation from businesses.&nbsp;This disclosure is intended to comply with legal requirements on marketing and advertising which may apply, such as the US Federal Trade Commission Rules.</p>
<h2>17. Assignment</h2>
<p>You may not assign, transfer or sub-contract any of your rights and/or obligations under these Terms and conditions, in whole or in part, to any third party without our prior written consent.&nbsp;Any purported assignment in violation of this Section will be null and void.</p>
<h2>18. Breaches of these Terms and conditions</h2>
<p>Without prejudice to our other rights under these Terms and Conditions, if you breach these Terms and Conditions in any way, we may take such action as we deem appropriate to deal with the breach, including temporarily or permanently suspending your access to the website, contacting your internet service provider to request that they block your access to the website, and/or commence legal action against you.</p>
<h2>19. Force majeure</h2>
<p>Except for obligations to pay money hereunder, no delay, failure or omission by either party to carry out or observe any of its obligations hereunder will be deemed to be a breach of these Terms and conditions if and for as long as such delay, failure or omission arises from any cause beyond the reasonable control of that party.</p>
<h2>20. Indemnification</h2>
<p>You agree to indemnify, defend and hold us harmless, from and against any and all claims, liabilities, damages, losses and expenses, relating to your violation of these Terms and conditions, and applicable laws, including intellectual property rights and privacy rights.&nbsp;You will promptly reimburse us for our damages, losses, costs and expenses relating to or arising out of such claims.</p>
<h2>21. Waiver</h2>
<p>Failure to enforce any of the provisions set out in these Terms and Conditions and any Agreement, or failure to exercise any option to terminate, shall not be construed as waiver of such provisions and shall not affect the validity of these Terms and Conditions or of any Agreement or any part thereof, or the right thereafter to enforce each and every provision.</p>
<h2>22. Language</h2>
<p>These Terms and Conditions will be interpreted and construed exclusively in English.&nbsp;All notices and correspondence will be written exclusively in that language.</p>
<h2>23. Entire agreement</h2>
<p>These Terms and Conditions, together with our privacy statement, constitute the entire agreement between you and 3Pad in relation to your use of this website.</p>
<h2>24. Updating of these Terms and conditions</h2>
<p>We may update these Terms and Conditions from time to time.&nbsp;It is your obligation to periodically check these Terms and Conditions for changes or updates.&nbsp;The date provided at the beginning of these Terms and Conditions is the latest revision date.&nbsp;Changes to these Terms and Conditions will become effective upon such changes being posted to this website.&nbsp;Your continued use of this website following the posting of changes or updates will be considered notice of your acceptance to abide by and be bound by these Terms and Conditions.</p>
<h2>25. Choice of Law and Jurisdiction</h2>
<p>These Terms and Conditions shall be governed by the laws of United States.&nbsp;Any disputes relating to these Terms and Conditions shall be subject to the jurisdiction of the courts of United States.&nbsp;If any part or provision of these Terms and Conditions is found by a court or other authority to be invalid and/or unenforceable under applicable law, such part or provision will be modified, deleted and/or enforced to the maximum extent permissible so as to give effect to the intent of these Terms and Conditions.&nbsp;The other provisions will not be affected.</p>
<h2>26. Contact information</h2>
<p>This website is owned and operated by 3Pad.</p>
<p>You may contact us regarding these Terms and Conditions by writing or emailing us at the following address:&nbsp;contact@3pad.xyz</p>
</div>					</div>
</div>
<?php do_shortcode("[analytics]"); ?>
</div>





<!-- .Footer -->
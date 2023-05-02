<?php

/**
 * unlock Protocol
 */

/******UNLOCK PROTOCOL*****/
if (!is_admin()) {  //////FRONTEND

    ///////Checkout Button Template
    function unlock_checkout()
    {
        $pagelock = get_field("enable_page_lock");

        //Default Purchase
        if ($pagelock == "No" && has_block('unlock-protocol/unlock-box') && is_singular()) {
            //Get Custom Fields Inividual Locks
            $bgimage           = get_field("background_image_url");
            $bg_color          = get_field("button_background_color");
            $button_text_color = get_field("button_text_color");
            $pre_text_color    = get_field("button_pre_text_color");

            echo '<style>
                .checkout-button-container{
                background-image: url("' . $bgimage . '") !important;
                background-color: grey !important;
                }
                .checkout-button-container .checkout-button{
                    background-color: ' . $bg_color . ' !important;
                    color: ' . $button_text_color . ' !important;
                }
                .checkout-button-container.blurred p{
                    color: ' . $pre_text_color . ' !important;
                }
                </style>';
        }

        // Check If unlock Is First & No blocks after & is not single post . If true, render template
        $pagelock = get_field("enable_page_lock");
        if ($pagelock == "Yes" && !has_block('unlock-protocol/unlock-box')) {
            //////Background Image
            if (is_user_logged_in()) {
                $bgimage = get_field("background_image_logged_in_users");
            }
            if (!is_user_logged_in()) {
                $bgimage = get_field("background_image");
            }
            $bg_color = get_field("background_color");
            echo '<style> 
            body{
            background-image: url("' . $bgimage . '") !important;
            background-color: ' . $bg_color . ' !important;
            }
            .checkout-button-container  {
                display: none;
                background-color: grey !important;
            }
            </style>';
            //////Background Image

            get_template_part('pages/page-paywall');
            add_filter('comments_open', '__return_false', 20, 2);
            add_filter('wp_link_pages', '__return_false', 20, 2);
            remove_shortcode('ads_below', 0);
            remove_shortcode('ads_above', 0);
            remove_shortcode('darkmode_shortcode');
            remove_shortcode('custom_comment_shortcode');
            remove_shortcode('back_to_top_shortcode');
            remove_shortcode('disqus_shortcode');
            remove_shortcode('disqus_react');
            remove_shortcode('discord_comment_shortcode');
            remove_shortcode('telegram_comment_shortcode');
            add_filter('pings_open', '__return_false', 20, 2);
            add_filter('comments_array', '__return_empty_array', 10, 2);
            add_filter('the_title', '__return_empty_array', 10, 2);
            echo "<style>.checkout-button-container.blurred{ display: none;} 
            .saic-wrapper{display: none;}.page-header, 
            .no-comments{display: none;}</style>
            ";

            /******Background Video*****/

            $video_select = get_field("video_choices");

            if (is_user_logged_in()) {
                $vid_id     = get_field("enter_video_id_logged_in");
                $vid_id_mp4 = get_field("mp4_link_logged_in_users");
            }
            if (!is_user_logged_in()) {
                $vid_id     = get_field("enter_video_id");
                $vid_id_mp4 = get_field("mp4_link");
            }

            if ($video_select == "Vimeo") {
                echo '
            <div class="vid-wrapper">
            <iframe src="https://player.vimeo.com/video/' . $vid_id . '?background=1&autoplay=1&muted=1&loop=1&byline=0&title=0"
            frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
            </div>
            ';
            }

            /******Vimeo Autoplay*****/

            /******Youtube Autoplay*****/

            if ($video_select == "Youtube" && $video_select !== NULL) {
                echo '
                <div id="bgvd" class="vid-wrapper">
                ' . get_template_part('assets/js/youtube_unlock') . '
                    </div>
                ';
            }

            /******Youtube Autoplay*****/

            /******MP4 Autoplay*****/

            if ($video_select == "MP4") {
                echo '
        <!-- The video -->
<video autoplay muted loop id="mp4video">
<source src="' . $vid_id_mp4 . '" type="video/mp4">
</video>
        
        ';
            }

            /******Background Video*****/
        } else {
            return false;
        }
    }

    add_action("unlock_after_checkout_button", "unlock_checkout");
    ///////Checkout Button Template

    ///////Login Button Template
    function unlock_login()
    {
        $pagelock = get_field("enable_page_lock");

        //Default Blurred Logged In
        if ($pagelock == "No" && has_block('unlock-protocol/unlock-box') && is_singular()) {
            //Get Custom Fields Inividual Locks
            $bgimage           = get_field("background_image_url_login");
            $bg_color          = get_field("button_background_color_login");
            $button_text_color = get_field("button_text_color_login");
            $pre_text_color    = get_field("button_pre_text_color_login");

            echo '<style>
                .login-button-container{
                background-image: url("' . $bgimage . '") !important;
                background-color: grey !important;
                }
                .login-button-container .login-button{
                    background-color: ' . $bg_color . ' !important;
                    color: ' . $button_text_color . ' !important;
                }
                .login-button-container.blurred p{
                    color: ' . $pre_text_color . ' !important;
                }
                </style>';
        }

        if ($pagelock == "Yes") {
            //////Background Image
            if (is_user_logged_in()) {
                $bgimage_primary = get_field("background_image_logged_in_users");
            }
            if (!is_user_logged_in()) {
                $bgimage_primary = get_field("background_image");
            }
            $bg_color_primary = get_field("background_color");
            /// Don't display on main site Front Page (Multisite)
            if (!is_main_site() && !is_front_page()) {
                echo '<style>
                body{
                background-image: url("' . $bgimage_primary . '") !important;
                background-color: ' . $bg_color_primary . ' !important;
                }
                .login-button-container {
                    display: none;
                }
                </style>';
            }
            //////Background Image

            get_template_part('pages/page-register');
            add_filter('comments_open', '__return_false', 20, 2);
            add_filter('wp_link_pages', '__return_false', 20, 2);
            remove_shortcode('ads_below');
            remove_shortcode('ads_above');
            remove_shortcode('analytics');
            remove_shortcode('darkmode_shortcode');
            remove_shortcode('custom_comment_shortcode');
            remove_shortcode('back_to_top_shortcode');
            remove_shortcode('disqus_shortcode');
            remove_shortcode('disqus_react');
            remove_shortcode('discord_comment_shortcode');
            remove_shortcode('telegram_comment_shortcode');
            add_filter('pings_open', '__return_false', 20, 2);
            add_filter('comments_array', '__return_empty_array', 10, 2);
            add_action('the_title', '__return_empty_array', 10, 2);
            echo "<style>.login-button-container.blurred{ display: none;} 
            .saic-wrapper{display: none;}.page-header, 
            .no-comments{display: none;}</style>
            ";

            /******Background Video*****/

            $video_select = get_field("video_choices");

            if (is_user_logged_in()) {
                $vid_id     = get_field("enter_video_id_logged_in");
                $vid_id_mp4 = get_field("mp4_link_logged_in_users");
            }
            if (!is_user_logged_in()) {
                $vid_id     = get_field("enter_video_id");
                $vid_id_mp4 = get_field("mp4_link");
            }

            if ($video_select == "Vimeo") {
                echo '
                <div class="vid-wrapper">
                <iframe src="https://player.vimeo.com/video/' . $vid_id . '?background=1&autoplay=1&muted=1&loop=1&byline=0&title=0"
                frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                </div>
                ';
            }

            /******Vimeo Autoplay*****/

            /******Youtube Autoplay*****/

            if ($video_select == "Youtube") {
                echo '
                <div id="bgvd" class="vid-wrapper_encrypted">
                ' . get_template_part('assets/js/youtube_unlock') . '
                    </div>
                ';
            }

            /******Youtube Autoplay*****/

            /******MP4 Autoplay*****/

            if ($video_select == "MP4") {
                echo '
            <!-- The video -->
<video autoplay muted loop id="mp4video">
  <source src="' . $vid_id_mp4 . '" type="video/mp4">
</video>
            
            ';
            }

            /******Background Video*****/
        }
    }

    add_action("unlock_after_login_button", "unlock_login");
}

//////FRONTEND
///////Login Button Template

///////// Page Lock Code (ACF)

function bts_add_html_to_content($content)
{
    $pagelock = get_field("enable_page_lock");
    if ($pagelock == "Yes") {
        $network      = get_field("network");
        $lock_address = get_field("lock_address");
        $additional1  = get_sub_field("additional_locks1");
        echo get_sub_field("lock_address");
        $additional2 = get_field("additional_locks2");

        $network1      = get_field("network_1");
        $network2      = get_field("network_1");
        $lock_address1 = get_field("lock_address_1");
        $lock_address2 = get_field("lock_address_2");

        if ($network1 == NULL) {
            $network1 = get_field("network");
        }
        if ($lock_address1 == NULL) {
            $lock_address1 = get_field("lock_address");
        }

        if ($network2 == NULL) {
            $network2 = get_field("network");
        }
        if ($lock_address2 == NULL) {
            $lock_address2 = get_field("lock_address");
        }

        $html_top = '<!-- wp:unlock-protocol/unlock-box {"locks":[{"address":"' . $lock_address . '","network":' . $network . '},
    {"address":"' . $lock_address1 . '","network":' . $network1 . '},
    {"address":"' . $lock_address2 . '","network":' . $network2 . '}],
    "ethereumNetworks":[{"label":"None","value":-1},
    {"label":"goerli","value":5},
    {"label":"gnosis chain","value":100},
    {"label":"polygon","value":137},
    {"label":"optimism","value":10},
    {"label":"arbitrum","value":42161},
    {"label":"avalanche","value":43114},
    {"label":"celo","value":42220},
    {"label":"binance","value":56}]} -->';
        $html_bottom = '<!-- /wp:unlock-protocol/unlock-box -->';
        $content     = $html_top . $content . $html_bottom;
    }

    if ($pagelock == "No") {
        $content;
    }

    //If Main Site Front Page
    //if (is_main_site() && is_page(10) && is_user_logged_in()) {
    //    return $pagelock == "No";
    // }

    return $content;
}

add_filter('the_content', 'bts_add_html_to_content', 0);

////Modify Paywall Config
function modify_paywall_config($paywall_config)
{
    //Options Page
    $settings_page = "options";

    //Get Site Title
    $site_title = get_field("site_title", $settings_page);

    //Get Site Logo Image
    $icon = get_field("unlock_icon");

    if ($icon == NULL) {
        $icon = 'http://ipfs.io/ipfs/QmeJ13XnVj1pdEnCGzRQEKLsmPUhzTCd8ryArBwmRDK2CB/';
    }

    //Get Site Welcome Text
    $welcome_text = get_field("checkout_welcome_text");

    //If empty
    if ($welcome_text == NULL) {
        $welcome_text = 'Choose a Membership Plan To Get Started';
    }

    // Add the 'Title' => '3Pad' setting to the paywall configuration array
    //Only Main Site
    if (is_main_site()) {
        $paywall_config['title'] = '3Pad ' . $site_title . ' | ' . $welcome_text . '';
    }
    if (!is_main_site()) {
        $paywall_config['title'] = '' . $site_title . ' | ' . $welcome_text . '';
    }

    // Add the 'pessimistic' => true setting to the paywall configuration array
    $paywall_config['pessimistic'] = true;

    // Add the 'referrer' => '0x' setting to the paywall configuration array

    //Get Referrer
    $referrer = get_field("referrer_unlock");

    $paywall_config['referrer'] = $referrer;

    // Add the 'icon' => Img URL setting to the paywall configuration array
    $paywall_config['icon'] = '' . $icon . '';

    // Add the 'captcha' => 'true' setting to the paywall configuration array
    $paywall_config['captcha'] = 'true';

    // Add the 'messagetosigh' => 'true' setting to the paywall configuration array
    $date          = date('F j, Y, g:i a');
    // Generate a random number between 1 and 26
    $random_number = wp_rand(1, 26);

    // Generate a random letter based on the random number
    $random_letter = chr($random_number + 64);

    // Generate a random string of 10 characters
    $random_string = str_shuffle($random_letter . wp_rand(1000000000000000, 9999999999999999));

    $messagetosign = get_field("message_to_sign");

    //Site URL
    $site_url      = site_url();
    //Get Main Site
    $main_site_url = get_site_url(1);

    //Mainsite Message
    if (is_main_site() && is_front_page()) {
        $messagetosign = 'By signing this message, you agree to the terms and policy of this site.' . "\n" . "\n" . 'Our terms and policy pages outline the rules and guidelines for using and accessing our services.' . "\n" . "\n" . 'Please review them carefully before proceeding.' . "\n" . "\n" . 'Terms can be found at https://hello.3pad.xyz/terms';
    }

    $paywall_config['messageToSign'] = $messagetosign . "\n" . "\n" . 'URI: ' . $main_site_url . '' . "\n" . 'Signed: ' . $date . ' UTC ' . "\n" . 'REFID: ' . $random_string . '' . "\n" . "\n" . 'Resource - ' . $site_url . '';

    //Custom Options
    //Get If Birthday
    $birthdate_choice = get_field("ask_for_birthdate");
    if ($birthdate_choice == 'Yes') {
        //Get If Birthday Required
        $birthdate_required = get_field("is_birthdate_required");
        $birthdate          = array(
            "name"        => "Birthdate",
            "type"        => "date",
            "placeholder" => "Enter Your Birthdate",
            "public"      => false,
            "required"    => $birthdate_required
        );
    }

    //Get If Location Required
    $location_choice = get_field("ask_for_location");
    if ($location_choice == 'Yes') {
        $location_required = get_field("is_location_required");
        $location          = array(
            "name"        => "Where Are You From?",
            "type"        => "text",
            "placeholder" => "Tokyo,India,Germany,Texas?",
            "public"      => false,
            "required"    => $location_required
        );
    }

    //Get If Shipping address is required
    $shipping_choice = get_field("ask_for_shipping_address");
    if ($shipping_choice == 'Yes') {
        $shipping_required = get_field("is_shipping_address_required");
        $shipping          = array(
            "name"        => "Shipping Address",
            "type"        => "text",
            "placeholder" => "Ex.7 Oak St, Miami, FL, US, 19384",
            "public"      => false,
            "required"    => $shipping_required
        );
    }

    //Get If Ask About Us Is Required
    $about_us_choice = get_field("ask_how_did_you_discover_us");
    if ($about_us_choice == 'Yes') {
        $about_us_required = get_field("is_ask_how_did_you_discover_us_required");
        $about_us          = array(
            "name"        => "How Did You Discover Us?",
            "type"        => "text",
            "placeholder" => "Enter You Answer",
            "public"      => false,
            "required"    => $about_us_required
        );
    }

    //Get If Phone Number Is Required
    $phone_choice = get_field("ask_for_phone_number");
    if ($phone_choice == 'Yes') {
        $phone_required = get_field("is_phone_number_required");
        $phone          = array(
            "name"        => "Phone Number",
            "type"        => "text",
            "placeholder" => "Enter Your Phone Number?",
            "public"      => false,
            "required"    => $phone_required
        );
    }

    //Get If Comments Is Required
    $comments_choice = get_field("ask_for_comments");
    if ($comments_choice == 'Yes') {
        $comments_required = get_field("is_comments_required");
        $comments          = array(
            "name"        => "Additonal Comments",
            "type"        => "text",
            "placeholder" => "Comments",
            "public"      => false,
            "required"    => $comments_required
        );
    }

    ///Paywall Config

    $paywall_config['metadataInputs'] = array(
        array(
            "name"        => "Name",
            "type"        => "text",
            "placeholder" => "Enter Your Name",
            "public"      => false,
            "required"    => true
        ),
        array(
            "name"        => "Email",
            "type"        => "email",
            "placeholder" => "Enter Your Email",
            "public"      => false,
            "required"    => true
        )
    );

    // Add the phone input if it is not empty
    if ($phone_choice == 'Yes') {
        $paywall_config['metadataInputs'][] = $phone;
    }
    // Add the shipping input if it is not empty
    if ($shipping_choice == 'Yes') {
        $paywall_config['metadataInputs'][] = $shipping;
    }
    // Add the birthdate input if it is not empty
    if ($birthdate_choice == 'Yes') {
        $paywall_config['metadataInputs'][] = $birthdate;
    }
    // Add the location input if it is not empty
    if ($location_choice == 'Yes') {
        $paywall_config['metadataInputs'][] = $location;
    }
    // Add the about us input if it is not empty
    if ($about_us_choice == 'Yes') {
        $paywall_config['metadataInputs'][] = $about_us;
    }
    // Add the comments input if it is not empty
    if ($comments_choice == 'Yes') {
        $paywall_config['metadataInputs'][] = $comments;
    }

    // Return the modified paywall configuration array
    return $paywall_config;
}

// Hook the modify_paywall_config function to the unlock_protocol_paywall_config filter
add_filter('unlock_protocol_paywall_config', 'modify_paywall_config');

//Update Network Settings

$rpc_networks_unlock = 'a:1:{s:8:"networks";a:9:{i:0;a:3:{s:10:"network_id";i:5;s:12:"network_name";s:6:"Goerli";s:20:"network_rpc_endpoint";s:31:"https://rpc.ankr.com/eth_goerli";}i:1;a:3:{s:10:"network_id";i:1;s:12:"network_name";s:8:"Ethereum";s:20:"network_rpc_endpoint";s:24:"https://rpc.ankr.com/eth";}i:2;a:3:{s:10:"network_id";i:100;s:12:"network_name";s:12:"Gnosis Chain";s:20:"network_rpc_endpoint";s:27:"https://rpc.ankr.com/gnosis";}i:3;a:3:{s:10:"network_id";i:137;s:12:"network_name";s:7:"Polygon";s:20:"network_rpc_endpoint";s:28:"https://rpc.ankr.com/polygon";}i:4;a:3:{s:10:"network_id";i:10;s:12:"network_name";s:8:"Optimism";s:20:"network_rpc_endpoint";s:29:"https://rpc.ankr.com/optimism";}i:5;a:3:{s:10:"network_id";i:42161;s:12:"network_name";s:8:"Arbitrum";s:20:"network_rpc_endpoint";s:29:"https://rpc.ankr.com/arbitrum";}i:6;a:3:{s:10:"network_id";i:56;s:12:"network_name";s:7:"Binance";s:20:"network_rpc_endpoint";s:24:"https://rpc.ankr.com/bsc";}i:7;a:3:{s:10:"network_id";i:42220;s:12:"network_name";s:4:"Celo";s:20:"network_rpc_endpoint";s:25:"https://rpc.ankr.com/celo";}i:8;a:3:{s:10:"network_id";i:43114;s:12:"network_name";s:9:"Avalanche";s:20:"network_rpc_endpoint";s:32:"https://rpc.ankr.com/avalanche-c";}}}
';

// Unserialize the value
$unserialized_value = unserialize($rpc_networks_unlock);

// Update the option
update_option('unlock_protocol_settings', $unserialized_value, false);

/******UNLOCK PROTOCOL*****/

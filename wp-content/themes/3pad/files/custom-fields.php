<?php

/**
 * Custom Fields
 */

/******CUSTOM FIELDS*****/
if (!is_admin()) {
    ////// Create Shortcode custom//////
    // Shortcode: [custom id=""]
    /*
function create_custom_shortcode($atts, $field)
{
    // Attributes
    $atts = shortcode_atts(
        [
            "id" => "",
        ],
        $atts,
        "custom"
    );
    // Attributes in var
    $id = $atts["id"];
    // Your Code
    $value = get_option($field); // Array of All Options

    ////1. Analytics Embed (Code)
    if ($id == "1") {
        return get_option("1");
    }
    ///2. Footer Embed (Code)
    if ($id == "2") {
        return get_option("2");
    }
    ///3. Header Embed (Code)
    if ($id == "3") {
        return get_option("3");
    }
    //4. Bunny CDN Authentication Key (Video)
    if ($id == "4") {
        return get_option("4");
    }
    //5. Bunny CDN Video Library ID (Video)
    if ($id == "5") {
        return get_option("5");
    }
    //6. Bunny CDN Auth Key (Image)
    if ($id == "6") {
        return get_option("6");
    }
    //7. CloudFlare Stream API Private Key
  //  if ($id == "7") {
 //       return get_option("7");
//	}
    //5. CloudFlare Stream API Private Key
    //if ($id == "5") {
    //    return get_option("5");
    //}
    //5. CloudFlare Stream API Private Key
    //if ($id == "5") {
    //    return get_option("5");
    //}
    //5. CloudFlare Stream API Private Key
    //if ($id == "5") {
    //    return get_option("5");
    //}
    //5. CloudFlare Stream API Private Key
    //if ($id == "5") {
    //    return get_option("5");
    //}
    else {
        return "";
    }
    return $id;
}
add_shortcode("custom", "create_custom_shortcode");
*/
    ////// Create Shortcode custom//////

    ////////HEADER FOOTER ANALYTICS /////////
    /*
    add_action("wp_footer", function () {
    ?>
    <!-- Site Analytics-->
    <?php echo do_shortcode('[custom id="1"]'); ?>
    <?php
    });
    add_action("wp_footer", function () {
    ?>
    <!-- Footer Code-->
    <?php echo do_shortcode('[custom id="2"]'); ?>
    <?php
    });
    add_action("wp_head", function () {
    ?>
    <!-- Header Code-->
    <?php echo do_shortcode('[custom id="3"]'); ?>
    <?php
    });
    */
    ////////HEADER FOOTER ANALYTICS /////////

    //////////////////////////////Title
    ///////////////////////////Custom ACF Code////////////////////////

    //////Individual Purchase Lock Customize
    function individual_purchase_lock_css()
    {
        if (is_singular()) {
            $bgimage       = get_field("background_image_url");
            $buttonbg      = get_field("button_background_color");
            $buttontext    = get_field("button_text_color");
            $buttonpretext = get_field("button_pre_text_color");
            if (!empty($bgimage)) {
                echo '<style>
.checkout-button-container.blurred, .checkout-button-container.blurred {
    background: url('
                    . $bgimage
                    . ') no-repeat center center !important;
	background-size: cover;
    background-color: grey !important;
}
</style>';
            }
            if (!empty($buttonbg)) {
                echo '<style>.page-content .checkout-button-container .checkout-button{
    background-color: '
                    . $buttonbg
                    . ' !important;
	}
	.page-content .checkout-button-container .checkout-button:hover{
    background-color: '
                    . $buttonbg
                    . ' !important;
	}
	</style>';
            }
            if (!empty($buttontext)) {
                echo '<style>.checkout-button-container .checkout-button{
   	color: '
                    . $buttontext
                    . ' !important;
	}</style>';
            }
            if (!empty($buttonpretext)) {
                echo '<style>.checkout-button-container.blurred p{
   	color: '
                    . $buttonpretext
                    . ' !important;
	}</style>';
            }
        }
    }
    add_action("wp_head", "individual_purchase_lock_css");
    //////Individual Purchase Lock Customize

    //////Individual Login Lock Customize
    function individual_login_lock_css()
    {
        $settings_page = "options";    ///Get Page ID
        if (is_singular()) {
            $bgimage       = get_field("background_image_url_login", $settings_page);
            $buttonbg      = get_field("button_background_color_login", $settings_page);
            $buttontext    = get_field("button_text_color_login", $settings_page);
            $buttonpretext = get_field("button_pre_text_color_login", $settings_page);
            if (!empty($bgimage)) {
                echo '<style>
        .login-button-container.blurred, .login-button-container.blurred {
            background: url('
                    . $bgimage
                    . ') no-repeat center center;
            background-size: cover;
            background-color: grey !important;
}
</style>';
            }
            if (!empty($buttonbg)) {
                echo '<style>.page-content .login-button-container .login-button:hover{
    background-color: '
                    . $buttonbg
                    . ' !important;
	}
	.page-content .login-button-container .login-button{
    background-color: '
                    . $buttonbg
                    . ' !important;
	}
	</style>';
            }
            if (!empty($buttontext)) {
                echo '<style>.login-button-container .login-button{
   	color: '
                    . $buttontext
                    . ' !important;
	}</style>';
            }
            if (!empty($buttonpretext)) {
                echo '<style>.login-button-container.blurred p{
   	color: '
                    . $buttonpretext
                    . ' !important;
	}</style>';
            }
        }
    }
    add_action("wp_head", "individual_login_lock_css");
    //////Individual Login Lock Customize

    ////Hide Mute/Fullscreen Button
    /*
function mutefull_acf(){
    $settings_page = 6403; ///Get Page ID
    $display_logged_in = get_field("hide_logged_in", $settings_page);
    if (is_front_page() && is_user_logged_in() && $display_logged_in === true) {
        echo "<style> #mutefull{display: none;} #topright{display: block;} </style>";
    }
    if (
        is_front_page() &&
        is_user_logged_in() &&
        $display_logged_in === false
    ) {
        echo "<style> #topright{display: none;}</style>";
    }

    $display_loggedout = get_field("hide_logged_out", $settings_page);

    if (
        is_front_page() &&
        !is_user_logged_in() &&
        $display_loggedout === true
    ) {
        echo "<style> #mutefull{display: none;} #topright{display: block;}  </style>";
    }
    if (
        is_front_page() &&
        !is_user_logged_in() &&
        $display_loggedout === false
    ) {
        echo "<style>#topright{display: none;}  </style>";
    }
    if($display_loggedout === NULL){
        echo "<style>#topright{display: block;}  </style>";
    }
}
add_action("wp_head", "mutefull_acf");
*/
    /////////////////////////Hide Mute/Fullscreen Button////////////////////////

    /////////Site info ACF
    function prefix_site_info()
    {
        $settings_page = "options";                                                            ///Get Page ID
                                                                                               //Get Page
        $page          = get_query_var('page');
        $site_title    = get_the_title() . ' | ' . get_field("site_title", $settings_page);
        if (is_front_page()) {
            $site_title = get_field("site_title", $settings_page);
        }

        if ($page) {
            $site_title .= " | $page";
        }

        echo "
<title>$site_title | 3Pad</title>
";
    }
    add_action('wp_head', 'prefix_site_info', 0);    //front end
    add_action('admin_head', 'prefix_site_info');    //admin end
    add_action('login_head', 'prefix_site_info');

    /////////Site Info ACF

    ///////// Shortcode: [videos]
    function create_videos_shortcode()
    {
        $settings_page = "options";    ///Get Page ID
        if (!is_user_logged_in()) {
            return get_field("background_videofor_logged_out_users", $settings_page);
        }
        if (is_user_logged_in()) {
            return get_field("enter_video_url_for_logged_in_users", $settings_page);
        }
    }
    add_shortcode('videos', 'create_videos_shortcode');
    ////////// Create Shortcode videos
}

/******Bottom Menu*****/
function bottom_menu()
{
    $settings_page = "options";    ///Get Page ID

    $icon_2 = get_field("menu_icon_2", $settings_page);
    $icon_3 = get_field("menu_icon_3", $settings_page);
    $icon_4 = get_field("menu_icon_4", $settings_page);

    $icon_2_link_external = get_field("menu_icon_url_2", $settings_page);
    $icon_3_link_external = get_field("menu_icon_url_3", $settings_page);
    $icon_4_link_external = get_field("menu_icon_url_4", $settings_page);

    $icon_2_link = get_field("menu_icon_url_2", $settings_page);
    $icon_3_link = get_field("menu_icon_url_3", $settings_page);
    $icon_4_link = get_field("menu_icon_url_4", $settings_page);

    //New Tab Choice
    $new_tab_2 = get_field("open_in_new_tab_2", $settings_page);
    $new_tab_3 = get_field("open_in_new_tab_3", $settings_page);
    $new_tab_4 = get_field("open_in_new_tab_4", $settings_page);

    //Embed Field Choice
    $popup2 = get_field("enable_popup_7", $settings_page);
    $popup3 = get_field("enable_popup_8", $settings_page);
    $popup4 = get_field("enable_popup_9", $settings_page);

    //Enable Full Screen
    $fullscreen7 = get_field("enable_full_screen_7", $settings_page);
    $fullscreen8 = get_field("enable_full_screen_8", $settings_page);
    $fullscreen9 = get_field("enable_full_screen_9", $settings_page);

    //Blank Else
    $embed_fullscreen_7 = '';
    $embed_fullscreen_8 = '';
    $embed_fullscreen_9 = '';

    //Embed Check for Comments If statement
    $content_embed7 = get_field("embed_7", $settings_page);
    $content_embed8 = get_field("embed_8", $settings_page);
    $content_embed9 = get_field("embed_9", $settings_page);

    $hide_pwa = get_field("hide_download_button_pwa", $settings_page);

    $icon_color       = get_field("menu_icon_color", $settings_page);
    $icon_color_hover = get_field("menu_icon_color_hover", $settings_page);
    $bottom_menu      = get_field("display_bottom_menu", $settings_page);
    $home_url         = home_url();

    ///Target Blank
    if ($new_tab_2 == 'Yes') {
        $new_tab_2 = 'target="_blank"';
    }

    if ($new_tab_3 == 'Yes') {
        $new_tab_3 = 'target="_blank"';
    }

    if ($new_tab_4 == 'Yes') {
        $new_tab_4 = 'target="_blank"';
    }

    $logoutlink = wp_logout_url(get_permalink());

    //if (!is_user_logged_in()) {
    //echo '<style> #logoutlink{display: none;} </style>';
    //$logoutlink = FALSE;
    /// }
    if (is_front_page() && $bottom_menu != false) {
        echo '<style>#bottomright, #bottomleft{display: none;}
             #main_titles{display: flex; flex-direction: column !important; margin-bottom: 35px !important;} </style>';
    }
    if (is_front_page() && $hide_pwa == 'Yes') {
        echo '<style>#app_button {display: none;}
              </style>';
    }
    if (is_front_page() && $bottom_menu != false) {
        echo '
        <style>
    /************ Style Menu ********/
.altmenu ul li a:hover {color: ' . $icon_color_hover . ' !important;}
.altmenu ul li a {font-size: 30px !important; color: ' . $icon_color . ' !important;}
/************ Style Menu ********/
</style>
    <div class="altmenu fullscreenhide">
      <center>
      <ul>
        <li class="button_home_refresh"><a><span id="icon_1" class="fa fa-home"></span></a></li>
        <li class="close_button_home" ><a href="#"><span id="icon_1" class="fa fa-circle-xmark"></span></a></li>
        <li class="menu_2"><a ' . $new_tab_2 . ' class="ex_button ' . $embed_fullscreen_7 . ' ' . $popup2 . ' " href="' . $icon_2_link . '#icon-1"><span id="icon_2" class="' . $icon_2 . '"></span></a></li>
        <li class="menu_3"><a ' . $new_tab_3 . ' class="ex_button ' . $embed_fullscreen_8 . ' ' . $popup3 . ' " href="' . $icon_3_link . '##icon-2"><span id="icon_3" class=" ' . $icon_3 . '"></span></a></li>
        <li class="menu_4"><a ' . $new_tab_4 . ' class="ex_button ' . $embed_fullscreen_9 . ' ' . $popup4 . ' " href="' . $icon_4_link . '##icon-3"><span id="icon_4" class=" ' . $icon_4 . '"></span></a></li>
        <li id="app_button"><a id="app-install" href="#"><span id="icon_5" class="fa-solid fa-download"></span></a></li>
      </ul>
    </center>
    </div>
    ';
    }

    if (is_front_page() && $bottom_menu != false) {
        $site_title = get_field("site_title", $settings_page);

        echo '<script defer nonce="' . wp_create_nonce('js-nonce') . '">
        function logoutconfirm(){if(1!=confirm("📲 To install ❝ ' . $site_title . ' ❞ as an app, look for 👉 Add to Homescreen 👈 or 👉 Install 👈 option in your device native browsers (Safari or Chrome) menu. Click Ok for Instructional Video 👨🏽‍💻."))return!1;window.location="https://www.youtube.com/watch?v=iYUmzdp1cM0", "_blank"}var logoutLink=document.getElementById("app-install");logoutLink.addEventListener("click",(function(o){o.preventDefault(),logoutconfirm()}));
          </script>';
    }
}
add_action('wp_footer', 'bottom_menu');
/******Bottom Menu*****/

/******Home Text Links*****/
function home_text_links()
{
    $settings_page   = "options";    ///Get Page ID
    $show_text_links = get_field("display_text_links_on_home_page", $settings_page);

    //text color
    $text_color_top   = get_field("top_middle_text_color", $settings_page);
    $text_color_left  = get_field("left_middle_text_color", $settings_page);
    $text_color_right = get_field("right_middle_text_color", $settings_page);

    //text family/weight
    $text_font_family = get_field("font_family", $settings_page);
    $text_font_weight = get_field("font_weight", $settings_page);

    //text URL
    $text_right_URL  = get_field("right_middle_text_url", $settings_page);
    $text_left_URL   = get_field("left_middle_text_url", $settings_page);
    $text_middle_URL = get_field("top_middle_text_url", $settings_page);

    //text Page
    $text_right_page  = get_field("link_page_right", $settings_page);
    $text_left_page   = get_field("link_page_middle", $settings_page);
    $text_middle_page = get_field("link_page_left", $settings_page);

    //text output
    $text_right  = get_field("right_middle_text", $settings_page);
    $text_left   = get_field("left_middle_text", $settings_page);
    $text_middle = get_field("top_middle_text", $settings_page);

    //text tab
    $text_right_tab  = get_field("new_tab_right", $settings_page);
    $text_left_tab   = get_field("new_tab_left", $settings_page);
    $text_middle_tab = get_field("new_tab_middle", $settings_page);

    //text stroke
    $text_right_stroke_size  = get_field("text_stroke_right", $settings_page);
    $text_left_stroke_size   = get_field("text_stroke_left", $settings_page);
    $text_middle_stroke_size = get_field("text_stroke_middle", $settings_page);

    //text stroke color
    $text_right_stroke_color  = get_field("text_stroke_right_color", $settings_page);
    $text_left_stroke_color   = get_field("text_stroke_left_color", $settings_page);
    $text_middle_stroke_color = get_field("text_stroke_middle_color", $settings_page);

    //Embed Field Choice
    $popup2 = get_field("enable_popup_2", $settings_page);
    $popup4 = get_field("enable_popup_4", $settings_page);
    $popup5 = get_field("enable_popup_5", $settings_page);

    //Enable Full Screen
    $fullscreen2 = get_field("enable_full_screen_2", $settings_page);
    $fullscreen4 = get_field("enable_full_screen_4", $settings_page);
    $fullscreen5 = get_field("enable_full_screen_5", $settings_page);

    //Blank Else
    $embed_fullscreen_2 = '';
    $embed_fullscreen_4 = '';
    $embed_fullscreen_5 = '';

    //Full Screen Choice
    if ($fullscreen2 == 'Yes') {
        $embed_fullscreen_2 = 'full';
    }

    if ($fullscreen4 == 'Yes') {
        $embed_fullscreen_4 = 'full';
    }

    if ($fullscreen5 == 'Yes') {
        $embed_fullscreen_5 = 'full';
    }

    ///// If External UrL Empty Get Page
    if ($text_middle_URL == NULL) {
        $text_middle_URL = get_field("link_page_left", $settings_page);
    }

    if ($text_right_URL == NULL) {
        $text_right_URL = get_field("link_page_right", $settings_page);
    }

    if ($text_left_URL == NULL) {
        $text_left_URL = get_field("link_page_middle", $settings_page);
    }

    ///// If new window is true
    if ($text_right_tab == 'Yes') {
        $text_right_tab = 'target="_blank"';
    }

    if ($text_left_tab == 'Yes') {
        $text_left_tab = 'target="_blank"';
    }

    if ($text_middle_tab == 'Yes') {
        $text_middle_tab = 'target="_blank"';
    }

    if (is_front_page() && $show_text_links === TRUE) {
        echo '
            <div class="elementor-element elementor-element-6fd90596 elementor-absolute e-transform fullscreenhide elementor-widget-mobile__width-inherit elementor-widget elementor-widget-heading" id=middleleft>
        <div class=elementor-widget-container>
        <h2 class="elementor-heading-title elementor-size-default"><a class="ex_button ' . $embed_fullscreen_4 . ' ' . $popup4 . '" ' . $text_left_tab . ' href="' . $text_left_URL . '#middle-left">' . $text_left . '</a></h2> </div>
        </div>
        <div class="elementor-element elementor-element-83b32e e-transform animated-slow elementor-widget__width-auto fullscreenhide elementor-widget elementor-widget-heading" id=topmiddle>
        <div class=elementor-widget-container>
        <h2 class="elementor-heading-title elementor-size-default"><a class="ex_button ' . $embed_fullscreen_2 . ' ' . $popup2 . '" ' . $text_middle_tab . ' href="' . $text_middle_URL . '#middle">' . $text_middle . '</a></h2> </div>
        </div>
        <div class="elementor-element elementor-element-df6b6ef elementor-absolute e-transform fullscreenhide elementor-widget elementor-widget-heading" id=middleright>
        <div class=elementor-widget-container>
        <h2 class="elementor-heading-title elementor-size-default"><a class="ex_button ' . $embed_fullscreen_5 . ' ' . $popup5 . '" ' . $text_right_tab . ' href="' . $text_right_URL . '#middle-right">' . $text_right . '</a></h2> </div>
        </div>
    <style>
    /************ Style Text Links ********/
        #middleleft a{-webkit-text-stroke: ' . $text_left_stroke_size . 'px ' . $text_left_stroke_color . '; text-stroke: ' . $text_left_stroke_size . 'px ' . $text_left_stroke_color . '; color: ' . $text_color_left . ' ;}
        #middleright a{-webkit-text-stroke: ' . $text_right_stroke_size . 'px ' . $text_right_stroke_color . '; text-stroke: ' . $text_right_stroke_size . 'px ' . $text_right_stroke_color . '; color: ' . $text_color_right . ' ;}
        #topmiddle a{-webkit-text-stroke: ' . $text_middle_stroke_size . 'px ' . $text_middle_stroke_color . '; text-stroke: ' . $text_middle_stroke_size . 'px ' . $text_middle_stroke_color . '; color: ' . $text_color_top . ' ;}
        #topmiddle a, #middleright a, #middleleft a{font-family: ' . $text_font_family . ' !important; font-weight: ' . $text_font_weight . ' !important;}
/************ Style Text Links ********/
</style>
    ';
    }
}
add_shortcode('text_links_shortcode', 'home_text_links');
/******Home Text Links*****/

/******Home Titles*****/
function home_titles()
{
    $settings_page = "option";    ///Get Page ID
    $show_titles   = get_field("display_titles", $settings_page);

    //Text Color
    $text_color_sub  = get_field("sub_title_color", $settings_page);
    $text_color_main = get_field("main_title_color", $settings_page);

    //Text Font Family Sub
    $text_font_family_sub = get_field("sub_title_font", $settings_page);
    $text_font_weight_sub = get_field("sub_title_weight", $settings_page);

    //Text Font Family Main
    $text_font_family_main = get_field("main_title_font", $settings_page);
    $text_font_weight_main = get_field("main_title_font_weight", $settings_page);

    //Text stroke color
    $text_stroke_main_color = get_field("text_stroke_main_color", $settings_page);
    $text_stroke_sub_color  = get_field("text_stroke_sub_color", $settings_page);

    //Text stroke size
    $text_stroke_size_main = get_field("text_stroke_main", $settings_page);
    $text_stroke_size_sub  = get_field("text_stroke_sub", $settings_page);

    //Text output
    $text_sub  = get_field("sub_title", $settings_page);
    $text_main = get_field("main_title", $settings_page);

    if (is_front_page() && $show_titles === TRUE) {
        echo '
        <div class="elementor-element elementor-element-d1c28e4 elementor-widget elementor-widget-heading">
        <div class=elementor-widget-container>
       <p class="elementor-heading-title elementor-size-default sub-title-home">' . $text_sub . '</p> </div>
        </div>
        <div class="elementor-element elementor-element-0237ce7 elementor-widget elementor-widget-heading">
        <div class=elementor-widget-container>
        <h1 class="elementor-heading-title elementor-size-default main-title-home">' . $text_main . '</h1> </div>
        </div>
        <style>
        /************ Style Titles ********/
            .sub-title-home{-webkit-text-stroke: ' . $text_stroke_size_sub . 'px ' . $text_stroke_sub_color . '; text-stroke: ' . $text_stroke_size_sub . 'px ' . $text_stroke_sub_color . '; color: ' . $text_color_sub . ' !important ; font-weight: ' . $text_font_weight_sub . ' !important ;font-family: ' . $text_font_family_sub . ' !important ; }
            .main-title-home{-webkit-text-stroke: ' . $text_stroke_size_main . 'px ' . $text_stroke_main_color . '; text-stroke: ' . $text_stroke_size_main . 'px ' . $text_stroke_main_color . '; color: ' . $text_color_main . ' !important ; font-weight: ' . $text_font_weight_main . ' !important ; font-family: ' . $text_font_family_main . ' !important ;}
    /************ Style Titles ********/
    </style>
        ';
    }
}
add_shortcode('home_titles_shortcode', 'home_titles');
/******Home Titles*****/

/******Corner Icons*****/
function home_corner_icons()
{
    $settings_page     = "option";    ///Get Options Page
    $show_corner_links = get_field("display_corner_icons_on_home_page", $settings_page);

    //Get Icons
    $icon_top_left     = get_field("top_left_icon", $settings_page);
    $icon_top_right    = get_field("top_right_icon", $settings_page);
    $icon_bottom_right = get_field("bottom_right_icon", $settings_page);
    $icon_bottom_left  = get_field("bottom_left_icon", $settings_page);

    //Corner icon Colors
    $icon_top_left_color     = get_field("top_left_icon_color", $settings_page);
    $icon_top_right_color    = get_field("top_right_icon_color", $settings_page);
    $icon_bottom_right_color = get_field("bottom_right_icon_color", $settings_page);
    $icon_bottom_left_color  = get_field("bottom_left_icon_color", $settings_page);

    //Corner icon  Stroke Colors
    $icon_top_left_color_stroke     = get_field("stroke_color_top_left", $settings_page);
    $icon_top_right_color_stroke    = get_field("stroke_color_top_right", $settings_page);
    $icon_bottom_right_color_stroke = get_field("stroke_color_bottom_right", $settings_page);
    $icon_bottom_left_color_stroke  = get_field("stroke_color_bottom_left", $settings_page);

    //Corner Icon New Window
    $icon_top_left_tab     = get_field("open_in_new_tab_topleft", $settings_page);
    $icon_top_right_tab    = get_field("open_in_new_tab_topright", $settings_page);
    $icon_bottom_right_tab = get_field("open_in_new_tab_bottomright", $settings_page);
    $icon_bottom_left_tab  = get_field("open_in_new_tab_bottomleft", $settings_page);

    //Corner Icon url
    $icon_top_left_URL     = get_field("top_left_icon_url", $settings_page);
    $icon_top_right_URL    = get_field("top_right_icon_url", $settings_page);
    $icon_bottom_right_URL = get_field("bottom_right_icon_url", $settings_page);
    $icon_bottom_left_URL  = get_field("bottom_left_icon_url", $settings_page);

    //Embed Field Choice
    $popup1  = get_field("enable_popup_1", $settings_page);
    $popup3  = get_field("enable_popup_3", $settings_page);
    $popup6  = get_field("enable_popup_6", $settings_page);
    $popup10 = get_field("enable_popup_10", $settings_page);

    //Full Screen Choice
    //Blank Else
    //Enable Full Screen
    $fullscreen1  = get_field("enable_full_screen_1", $settings_page);
    $fullscreen3  = get_field("enable_full_screen_3", $settings_page);
    $fullscreen6  = get_field("enable_full_screen_6", $settings_page);
    $fullscreen10 = get_field("enable_full_screen_10", $settings_page);

    //Blank Else
    $embed_fullscreen_1  = '';
    $embed_fullscreen_3  = '';
    $embed_fullscreen_6  = '';
    $embed_fullscreen_10 = '';

    //Full Screen Choice

    if ($fullscreen1 == 'Yes') {
        $embed_fullscreen_1 = 'full';
    }

    if ($fullscreen3 == 'Yes') {
        $embed_fullscreen_3 = 'full';
    }

    if ($fullscreen6 == 'Yes') {
        $embed_fullscreen_6 = 'full';
    }

    if ($fullscreen10 == 'Yes') {
        $embed_fullscreen_10 = 'full';
    }

    ///// If new window is true
    if ($icon_top_left_tab == 'Yes') {
        $icon_top_left_tab = 'target="_blank"';
    }

    if ($icon_top_right_tab == 'Yes') {
        $icon_top_right_tab = 'target="_blank"';
    }

    if ($icon_bottom_right_tab == 'Yes') {
        $icon_bottom_right_tab = 'target="_blank"';
    }

    if ($icon_bottom_left_tab == 'Yes') {
        $icon_bottom_left_tab = 'target="_blank"';
    }

    ///// If External UrL Empty Get Page
    if ($icon_top_left_URL == NULL) {
        $icon_top_left_URL = get_field("link_page_topleft", $settings_page);
    }

    if ($icon_top_right_URL == NULL) {
        $icon_top_right_URL = get_field("link_page_topright", $settings_page);
    }

    if ($icon_bottom_right_URL == NULL) {
        $icon_bottom_right_URL = get_field("link_page_bottomleft", $settings_page);
    }
    if ($icon_bottom_left_URL == NULL) {
        $icon_bottom_left_URL = get_field("link_page_bottomright", $settings_page);
    }

    if (is_front_page() && $show_corner_links === TRUE) {
        echo '
        <div class="elementor-element elementor-element-ef7793d fullscreenhide elementor-widget__width-auto elementor-widget-tablet__width-auto elementor-fixed elementor-view-default elementor-widget elementor-widget-icon" id=bottomleft>
        <div class=elementor-widget-container>
        <div class=elementor-icon-wrapper>
        <a class="ex_button ' . $embed_fullscreen_6 . ' ' . $popup6 . ' elementor-icon elementor-animation-pulse-grow" rel="noopener noreferrer" ' . $icon_bottom_left_tab . ' href="' . $icon_bottom_left_URL . '#">
        <i aria-hidden=true class="' . $icon_bottom_left . '"></i> </a>
        </div>
        </div>
        </div>
        <div class="elementor-element elementor-element-1e3c1e6 fullscreenhide elementor-widget__width-auto elementor-widget-tablet__width-auto elementor-fixed elementor-view-default elementor-widget elementor-widget-icon" id=bottomright>
        <div class=elementor-widget-container>
        <div class=elementor-icon-wrapper>
        <a class="ex_button ' . $embed_fullscreen_10 . ' ' . $popup10 . ' elementor-icon elementor-animation-pulse-grow" rel="noopener noreferrer" ' . $icon_bottom_right_tab . ' href="' . $icon_bottom_right_URL . '#">
        <i aria-hidden=true class="' . $icon_bottom_right . '"></i> </a>
        </div>
        </div>
        </div>
        <div class="elementor-element elementor-element-d2d6fa5 fullscreenhide elementor-widget__width-auto elementor-widget-tablet__width-auto elementor-fixed elementor-view-default elementor-widget elementor-widget-icon" id=topright>
        <div class=elementor-widget-container>
        <div class=elementor-icon-wrapper>
        <a class="ex_button ' . $embed_fullscreen_3 . ' ' . $popup3 . ' elementor-icon elementor-animation-pulse-grow" rel="noopener noreferrer" ' . $icon_top_right_tab . ' href="' . $icon_top_right_URL . '#">
        <i aria-hidden=true class=" ' . $icon_top_right . '"></i> </a>
        </div>
        </div>
        </div>
        <div class="elementor-element elementor-element-3d820c1 fullscreenhide elementor-widget__width-auto elementor-widget-tablet__width-auto elementor-fixed elementor-view-default elementor-widget elementor-widget-icon" id=topleft>
        <div class=elementor-widget-container>
        <div class=elementor-icon-wrapper>
        <a class="ex_button ' . $embed_fullscreen_1 . ' ' . $popup1 . ' elementor-icon elementor-animation-pulse-grow" rel="noopener noreferrer" ' . $icon_top_left_tab . ' href="' . $icon_top_left_URL . '#">
        <i aria-hidden=true class=" ' . $icon_top_left . '"></i> </a>
        </div>
        </div>
        </div>
        <style>
        /************ Style Text Links ********/
            #topleft i{-webkit-text-stroke: 1px ' . $icon_top_left_color_stroke . '; text-stroke: 1px ' . $icon_top_left_color_stroke . '; color: ' . $icon_top_left_color . ' ;} #topright i{-webkit-text-stroke: 1px ' . $icon_top_right_color_stroke . '; text-stroke: 1px ' . $icon_top_right_color_stroke . '; color: ' . $icon_top_right_color . ' ;} #bottomright i{ -webkit-text-stroke: 1px ' . $icon_bottom_right_color_stroke . '; text-stroke: 1px ' . $icon_bottom_right_color_stroke . '; color: ' . $icon_bottom_right_color . ' ;} #bottomleft i{ -webkit-text-stroke: 1px ' . $icon_bottom_left_color_stroke . '; text-stroke: 1px ' . $icon_bottom_left_color_stroke . '; color: ' . $icon_bottom_left_color . ' ;}
    /************ Style Text Links ********/
    </style>
        ';
    }
}
add_shortcode('corner_icons_shortcode', 'home_corner_icons');
/******Corner Icons*****/

/******Social Icons*****/
function icons_social()
{
    $settings_page = "options";    ///Get Page ID

    //Get Social Icon
    $social_icon_1 = get_field("social_icon_1", $settings_page);
    $social_icon_2 = get_field("social_icon_2", $settings_page);
    $social_icon_3 = get_field("social_icon_3", $settings_page);
    $social_icon_4 = get_field("social_icon_4", $settings_page);
    $social_icon_5 = get_field("social_icon_5", $settings_page);
    $social_icon_6 = get_field("social_icon_6", $settings_page);

    //Get Social Icon color
    $social_icon_color_1 = get_field("social_icon_color_1", $settings_page);
    $social_icon_color_2 = get_field("social_icon_color_2", $settings_page);
    $social_icon_color_3 = get_field("social_icon_color_3", $settings_page);
    $social_icon_color_4 = get_field("social_icon_color_4", $settings_page);
    $social_icon_color_5 = get_field("social_icon_color_5", $settings_page);
    $social_icon_color_6 = get_field("social_icon_color_6", $settings_page);

    //Get Social Icon color stroke
    $social_icon_color_1_stroke = get_field("stroke_color_1", $settings_page);
    $social_icon_color_2_stroke = get_field("stroke_color_2", $settings_page);
    $social_icon_color_3_stroke = get_field("stroke_color_3", $settings_page);
    $social_icon_color_4_stroke = get_field("stroke_color_4", $settings_page);
    $social_icon_color_5_stroke = get_field("stroke_color_5", $settings_page);
    $social_icon_color_6_stroke = get_field("stroke_color_6", $settings_page);

    //Get Social Icon external urls
    $social_icon_1_link_external = get_field("social_icon_url_1", $settings_page);
    $social_icon_2_link_external = get_field("social_icon_url_2", $settings_page);
    $social_icon_3_link_external = get_field("social_icon_url_3", $settings_page);
    $social_icon_4_link_external = get_field("social_icon_url_4", $settings_page);
    $social_icon_5_link_external = get_field("social_icon_url_5", $settings_page);
    $social_icon_6_link_external = get_field("social_icon_url_6", $settings_page);

    $social_icon_colors = get_field("social_icon_color", $settings_page);

    $social_icon_show = get_field("display_social_icons_on_home_page", $settings_page);

    if ($social_icon_1 == NULL) {
        echo '<style> .s1{display: none;}</style>';
    }
    if ($social_icon_2 == NULL) {
        echo '<style> .s2{display: none;}</style>';
    }
    if ($social_icon_3 == NULL) {
        echo '<style> .s3{display: none;}</style>';
    }
    if ($social_icon_4 == NULL) {
        echo '<style> .s4{display: none;}</style>';
    }
    if ($social_icon_5 == NULL) {
        echo '<style> .s5{display: none;}</style>';
    }
    if ($social_icon_6 == NULL) {
        echo '<style> .s6{display: none;}</style>';
    }

    if (is_front_page() && $social_icon_show != false) {
        echo '
	 <div id="icon_space" class="elementor-social-icons-wrapper elementor-grid">
 <span class="elementor-grid-item s1">
 <a class="elementor-icon elementor-social-icon elementor-social-icon-facebook elementor-animation-grow elementor-repeater-item-f302e77" rel="noopener noreferrer" href="' . $social_icon_1_link_external . '#" target=_blank>
 <i class=" fab fa-' . $social_icon_1 . '"></i> </a>
 </span>
 <span class="elementor-grid-item s2">
 <a class="elementor-icon elementor-social-icon elementor-social-icon-twitter elementor-animation-grow elementor-repeater-item-c96a0b7" rel="noopener noreferrer" href="' . $social_icon_2_link_external . '#" target=_blank>
 <i class=" fab fa-' . $social_icon_2 . '"></i> </a>
 </span>
 <span class="elementor-grid-item s3">
 <a class="elementor-icon elementor-social-icon elementor-social-icon-youtube elementor-animation-grow elementor-repeater-item-a671b13" rel="noopener noreferrer" href="' . $social_icon_3_link_external . '#" target=_blank>
 <i class=" fab fa-' . $social_icon_3 . '"></i> </a>
 </span>
 <span class="elementor-grid-item s4">
 <a class="elementor-icon elementor-social-icon elementor-social-icon-snapchat elementor-animation-grow elementor-repeater-item-8b81046" rel="noopener noreferrer" href="' . $social_icon_4_link_external . '#" target=_blank>
 <i class=" fab fa-' . $social_icon_4 . '"></i> </a>
 </span>
 <span class="elementor-grid-item s5">
 <a class="elementor-icon elementor-social-icon elementor-social-icon-twitch elementor-animation-grow elementor-repeater-item-d774c07" rel="noopener noreferrer" href="' . $social_icon_5_link_external . '#" target=_blank>
 <i class=" fab fa-' . $social_icon_5 . '"></i> </a>
 </span>
 <span class="elementor-grid-item s6">
 <a class="elementor-icon elementor-social-icon elementor-social-icon-linkedin elementor-animation-grow elementor-repeater-item-19dc1fa" rel="noopener noreferrer" href="' . $social_icon_6_link_external . '#" target=_blank>
 <i class=" fab fa-' . $social_icon_6 . '"></i> </a>
 </span>
 </div>
    <style>
    /************ Style Social Icons ********/
    .s1 i{-webkit-text-stroke: 0.2px ' . $social_icon_color_1_stroke . '; text-stroke: 0.2px ' . $social_icon_color_1_stroke . '; color: ' . $social_icon_color_1 . ' !important; }
    .s2 i{-webkit-text-stroke: 0.2px ' . $social_icon_color_2_stroke . '; text-stroke: 0.2px ' . $social_icon_color_2_stroke . '; color: ' . $social_icon_color_2 . ' !important; }
    .s3 i{-webkit-text-stroke: 0.2px ' . $social_icon_color_3_stroke . '; text-stroke: 0.2px ' . $social_icon_color_3_stroke . '; color: ' . $social_icon_color_3 . ' !important; }
    .s4 i{-webkit-text-stroke: 0.2px ' . $social_icon_color_4_stroke . '; text-stroke: 0.2px ' . $social_icon_color_4_stroke . '; color: ' . $social_icon_color_4 . ' !important; }
    .s5 i{-webkit-text-stroke: 0.2px ' . $social_icon_color_5_stroke . '; text-stroke: 0.2px ' . $social_icon_color_5_stroke . '; color: ' . $social_icon_color_5 . ' !important; }
    .s6 i{-webkit-text-stroke: 0.2px ' . $social_icon_color_6_stroke . '; text-stroke: 0.2px ' . $social_icon_color_6_stroke . '; color: ' . $social_icon_color_6 . ' !important; }
/************ Style Social Icons ********/
</style>
    ';
    }
}
add_shortcode('social_icons', 'icons_social');
/******Social Icons*****/

/******Background Video*****/

/******Buttons Video/Logo*****/

function buttons_front_page()
{
    $settings_page = "option";    ///Get Options
    $showbuttons   = get_field("show_play_&_fullscreen_buttons", $settings_page);

    if (is_front_page() && $showbuttons == "Yes") {
        //Check Logo Is Present
        $logo = get_field("site_logo", $settings_page);
        if ($logo == NULL) {
            echo '<style>#logo{display: none;}</style>';
        }
        //Hide Top Right Icon
        echo '<style>#topright{display: none;}</style>';
    }
        /// Hide If "No"
        else {
            echo '<style>.mute_control, #button_fullscreen{display: none !important;}</style>';
        }
}
add_action("wp_head", "buttons_front_page", 100);

/******Buttons Video/Logo*****/

//Fullscreen JS Load
function buttons_front_page_js_load()
{
    $settings_page = "option";    ///Get Options
    $showbuttons   = get_field("show_play_&_fullscreen_buttons", $settings_page);

    if (is_front_page() && $showbuttons == "Yes") {
        echo '<script defer src="';
        echo get_theme_file_uri('/assets/js/fullscreen.js');
        echo '"></script>';
    }
}
add_action("wp_footer", "buttons_front_page_js_load");

/******Video Autoplay*****/
function home_video_autoplay()
{
    ////////Only Home
    if (is_front_page()) {
        $settings_page_video = "option";    ///Get Page ID

        //Check User Staus For ACF
        /*
        if (is_user_logged_in() && !current_user_can('subsciber')) {

            $vid_id = get_field("enter_video_id_logged_in_home", $settings_page_video);
            $vid_id_mp4 = get_field("mp4_link_logged_in_users_home", $settings_page_video);
        }
        if (!is_user_logged_in()) {
            $vid_id = get_field("enter_video_id_home", $settings_page_video);
            $vid_id_mp4 = get_field("mp4_link_home", $settings_page_video);
        }
        if (current_user_can('subsciber')) {
            $vid_id = get_field("enter_video_id_subscribers_home", $settings_page_video);
            $vid_id_mp4 = get_field("mp4_link_subscribers_users", $settings_page_video);
        }
        if (is_user_logged_in() && !current_user_can('subsciber')) {
            $video_select = get_field("video_choices_home_logged_in", $settings_page_video);
        }
        if (!is_user_logged_in()) {
            $video_select = get_field("video_choices_home", $settings_page_video);
        }
        if (current_user_can('subsciber')) {
            $video_select = get_field("video_choices_home_subscribers", $settings_page_video);
        }
        */

        $vid_id       = get_field("enter_video_id_home", $settings_page_video);
        $vid_id_mp4   = get_field("mp4_link_home", $settings_page_video);
        $video_select = get_field("video_choices_home", $settings_page_video);

        if ($video_select == "Vimeo") {
            echo '
            ' . get_template_part('assets/js/vimeo') . '
                
                ';
        }

        /******Vimeo Autoplay*****/

        /******Youtube Autoplay*****/

        if ($video_select == "Youtube") {
            echo '
            <div id="bgvd" class="vid-wrapper">
            ' . get_template_part('assets/js/youtube_home') . '
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
    }
}
add_action('wp_footer', 'home_video_autoplay', 100);
/******MP4 Autoplay*****/

/******Background Video*****/

/******Background Image*****/
function background_image_color_homepage()
{
    $settings_page       = "option";    ///Get Page ID
    $bgimagehome         = get_field("background_image_home", $settings_page);
    $bg_position_mobile  = get_field("background_image_mobile_position", $settings_page);
    $bg_position_desktop = get_field("background_image_desktop_position", $settings_page);

    /////Check If Logged In
    /*
    if (is_user_logged_in() && !current_user_can('subsciber')) {
        $bgimagehome = get_field("background_image_logged_in_users_home", $settings_page);
    }
    if (!is_user_logged_in()) {
        $bgimagehome = get_field("background_image_home", $settings_page);
    }
    if (current_user_can('subsciber')) {
        $bgimagehome = get_field("background_image_subscribers", $settings_page);
    }
    */

    $bg_colorhome = get_field("background_color_home", $settings_page);
    if (is_front_page()) {
        echo '<style>
        @media (min-width:801px)  {
                body{ background-image: url("' . $bgimagehome . '") !important; background-position: 50% ' . $bg_position_desktop . '% !important; background-color: ' . $bg_colorhome . ' !important;} 
        }
        @media (max-width:800px)  {
            body{ background-image: url("' . $bgimagehome . '") !important; background-position: ' . $bg_position_mobile . '% !important;  background-color: ' . $bg_colorhome . ' !important;} 
    }
                
                </style>';
    }
}
add_action('wp_head', 'background_image_color_homepage', 100);
/******Background Image*****/

///////FRONTEND

// Discord Comments
// Check if Discord comments are enabled and we're on a singular page
function discord_comments()
{
    // Get value of "enable_comments" field on settings page
    $comment_pick = get_field("enable_comments");
    // If Discord comments are enabled and we're on a singular page, load the Discord comments widget
    if ($comment_pick == "Discord" && is_singular()) {
        // Get settings for Discord comments
        $server_id  = get_field("server_id");
        $channel_id = get_field("channel_id");
        // Echo HTML and JavaScript code to load the Discord comments widget
        echo '
        <widgetbot
        server="' . $server_id . '"
        channel="' . $channel_id . '"
        width="auto"
        ></widgetbot>
        <script defer src="https://cdn.jsdelivr.net/npm/@widgetbot/html-embed"></script>
        ';
    }
}
// Add shortcode for Discord comments
add_shortcode("discord_comment_shortcode", "discord_comments");

// Discord Comments Home
// Check if Discord comments are enabled and we're on a singular page
function discord_comments_home()
{
    // Get value of "enable_comments" field on settings page
    $settings_page = "option";    ///Get Options Page

    // Get settings for Discord comments
    $server_id  = get_field("server_id_home", $settings_page);
    $channel_id = get_field("channel_id_home", $settings_page);
    // Echo HTML and JavaScript code to load the Discord comments widget
    echo '
        <widgetbot style="max-height: 395px !important; margin: 0;"
        server="' . $server_id . '"
        channel="' . $channel_id . '"
        width="auto"
        ></widgetbot>
        <script style=" border-radius: 10px; box-shadow: -1px 1px 10px black; " defer src="https://cdn.jsdelivr.net/npm/@widgetbot/html-embed"></script>
        
        ';
}
// Add shortcode for Discord comments
add_shortcode("discord_comment_home_shortcode", "discord_comments_home");

// Telegram Comments Home
// Check if Telegram comments are enabled and we're on a singular page
function telegram_comments_home()
{
    // Get settings page ID
    // Get value of "enable_comments" field on settings page
    $settings_page = "option";                                                    ///Get Options Page
                                                                                  // Get settings for Telegram comments
    $site_id       = get_field("telegram_site_id_home", $settings_page);
    $comment_count = get_field("telegram_comment_count_home", $settings_page);
    $likes         = get_field("telegram_likes_home", $settings_page);
    $colornames    = get_field("telegram_color_names_home", $settings_page);
    // Get current page ID
    $page_id       = '-1';
    //Get Site Path
    $site_url      = get_site_url();
    $site_path     = parse_url($site_url, PHP_URL_PATH);
    $site_path     = ltrim($site_path, '/');
    $site_title    = get_field("site_title", "options");

    // Echo JavaScript code to load the Telegram comments widget
    echo '
    <iframe id="comments-app-' . $site_id . '-1" src="https://comments.app/embed/view?website=' . $site_id . '&amp;
        page_id=-1&amp;
        page_url=https://3pad.xyz/' . $site_path . '&amp;
        origin=https://3pad.xyz/' . $site_path . '&amp;
        page_title=' . $site_title . ' - Chat&amp;
        limit=' . $comment_count . '&amp;
        colorful=1&amp;
        dark=1&amp;
        dislikes=' . $likes . '&amp;
        height=390" width="100%" height="390" frameborder="0" style="border: none;"></iframe>
        ';
}

// Add shortcode for Telegram comments
add_shortcode("telegram_comment_home_shortcode", "telegram_comments_home");

// Telegram Comments
// Check if Telegram comments are enabled and we're on a singular page
function telegram_comments()
{
    // Get settings page ID
    // Get value of "enable_comments" field on settings page
    $comment_pick = get_field("enable_comments");
    // If Telegram comments are enabled and we're on a singular page, load the Telegram comments widget
    if ($comment_pick == "Telegram" && is_singular()) {
        // Get settings for Telegram comments
        $display_logged_in = get_field("hide_logged_in");
        $site_id           = get_field("telegram_site_id");
        $comment_count     = get_field("telegram_comment_count");
        $likes             = get_field("telegram_likes");
        $colornames        = get_field("telegram_color_names");
        $accentcolor       = get_field("telegram_accent");
        // Get current page ID
        $page_id           = get_the_ID();
        // Echo JavaScript code to load the Telegram comments widget
        echo '
        <script defer src="https://comments.app/js/widget.js?3" 
        data-comments-app-website=' . $site_id . ' 
        data-limit=' . $comment_count . ' data-page-id=' . $page_id . ' data-dislikes=' . $likes . ' 
        data-colorful=' . $colornames . '></script>	
        ';
    }
}

// Add shortcode for Telegram comments
add_shortcode("telegram_comment_shortcode", "telegram_comments");

// Darkmode
function darkmode()
{
    echo '
    <input id="dark-mode" class="toggle active-progress" type="checkbox" name="Dark mode" role="switch"
    value="on">
<label for="dark-mode" class="sr">Dark Mode</label>
<div class="curtain"></div>
    ';
}
// Add shortcode for darkmode
add_shortcode("darkmode_shortcode", "darkmode");

// Back To Top
// Generate SVG progress circle and wrap it in a div
function back_to_top()
{
    echo '
<div class="progress-wrap">
    <svg class="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
        <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"/>
    </svg>
</div>
    ';
}
// Add shortcode for back to top button
add_shortcode("back_to_top_shortcode", "back_to_top");

////Back To Top

// Disqus Comments
// Check if Disqus comments are enabled and we're on a singular page
function disqus_comments()
{
    // Get value of "enable_comments" field on settings page
    $comment_pick = get_field("enable_comments");
    // If Disqus comments are enabled and we're on a singular page, load the Disqus comments template
    if ($comment_pick == "Disqus" && is_singular()) {
        get_template_part('assets/js/disqus');
    }
}
// Add shortcode for Disqus comments
add_shortcode("disqus_shortcode", "disqus_comments");

// Disqus Comments Home Page
function disqus_comments_home()
{
    get_template_part('assets/js/disqus_home');
}
// Add shortcode for Disqus comments
add_shortcode("disqus_shortcode_home", "disqus_comments_home");

// Disqus Reactions
// Check if Disqus reactions are enabled and we're on a singular page
function disqus_reactions()
{
    // Get value of "enable_disqus_reactions" field on settings page
    $comment_pick = get_field("enable_disqus_reactions");
    // If reactions are enabled and we're on a singular page, load the Disqus reactions template
    if ($comment_pick == "Yes" && is_singular()) {
        get_template_part('assets/js/disqus-reactions');
    }
}
// Add shortcode for Disqus reactions
add_shortcode("disqus_react", "disqus_reactions");

//Add Analytics To Pages

function analytics()
{
    // Get options page
    $options_page = "options";
    // Get value of "analytics choics" field on optons page
    $analytics    = get_field("choose_analytics", $options_page);
    // If analytics are chosen and we're on a  page, load the analytics code
    if ($analytics == "Google" && is_page()) {
        get_template_part('assets/js/google_analytics');
    }
    if ($analytics == "Clicky" && is_page()) {
        get_template_part('assets/js/clicky_analytics');
    }
}
// Load in head for Analytics code
add_action("wp_head", "analytics");

////Page Encrypt Background Vid/Image
function encrypt_video_function()
{
    //Check if fullpage encrypt is enabled
    $fullpage_encrypt = get_field('full_page_encrypt_or_individual');

    if ($fullpage_encrypt == "Full Page") {
        /******Background Video Encrypt*****/

        $video_select = get_field("video_select_encrypt");

        //Get Vid ID
        $vid_id     = get_field("video_id_encrypted");
        $vid_id_mp4 = get_field("video_mp4_encrypted");

        if ($video_select == "Vimeo") {
            echo '
                <div class="vid-wrapper_encrypted">
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
            ' . get_template_part('assets/js/youtube_encrypt') . '
                </div>
            ';
        }

        /******Youtube Autoplay*****/

        /******MP4 Autoplay*****/

        if ($video_select == "MP4") {
            echo '
            <!-- The video -->
<video autoplay muted loop id="mp4video_encrypted">
  <source src="' . $vid_id_mp4 . '" type="video/mp4">
</video>
            
            ';
        }

        /******Background Video*****/
    }
}

add_shortcode("encrypt_video", "encrypt_video_function");

//Age Restriction Prompt Full Page
function age_restriction()
{
    if (!current_user_can('author')) {
        // Get options page
        $options_page = "options";
        // Get value of "age Restrction" field on optons page
        $age_restrict = get_field("is_the_sites_content_age_restricted", $options_page);

        if ($age_restrict == 'Yes') {
            get_template_part('pages/page-age-restrict');
        }
    }
}
add_action('get_footer', 'age_restriction');

///Embed Content All Pages
function show_comment_popup()
{
    $settings_page = "option";    ///Get Options Page

    //Custom Fields embed URL
    $content_embed1  = get_field("embed_1", $settings_page);
    $content_embed2  = get_field("embed_2", $settings_page);
    $content_embed3  = get_field("embed_3", $settings_page);
    $content_embed4  = get_field("embed_4", $settings_page);
    $content_embed5  = get_field("embed_5", $settings_page);
    $content_embed6  = get_field("embed_6", $settings_page);
    $content_embed7  = get_field("embed_7", $settings_page);
    $content_embed8  = get_field("embed_8", $settings_page);
    $content_embed9  = get_field("embed_9", $settings_page);
    $content_embed10 = get_field("embed_10", $settings_page);

    //Check If url entered
    if ($content_embed1 == NULL) {
        $content_embed1 = get_field("created_embed_1", $settings_page);
    }
    if ($content_embed2 == NULL) {
        $content_embed2 = get_field("created_embed_2", $settings_page);
    }
    if ($content_embed3 == NULL) {
        $content_embed3 = get_field("created_embed_3", $settings_page);
    }
    if ($content_embed4 == NULL) {
        $content_embed4 = get_field("created_embed_4", $settings_page);
    }
    if ($content_embed5 == NULL) {
        $content_embed5 = get_field("created_embed_5", $settings_page);
    }
    if ($content_embed6 == NULL) {
        $content_embed6 = get_field("created_embed_6", $settings_page);
    }
    if ($content_embed7 == NULL) {
        $content_embed7 = get_field("created_embed_7", $settings_page);
    }
    if ($content_embed8 == NULL) {
        $content_embed8 = get_field("created_embed_8", $settings_page);
    }
    if ($content_embed9 == NULL) {
        $content_embed9 = get_field("created_embed_9", $settings_page);
    }
    if ($content_embed10 == NULL) {
        $content_embed10 = get_field("created_embed_10", $settings_page);
    }

    //Check If comments is enabled
    $comment_check = get_field("enable_popup_1", $settings_page);
    $comment_check = get_field("enable_popup_2", $settings_page);
    $comment_check = get_field("enable_popup_3", $settings_page);

    //Enable Full Screen
    $fullscreen1  = get_field("enable_full_screen_1", $settings_page);
    $fullscreen2  = get_field("enable_full_screen_2", $settings_page);
    $fullscreen3  = get_field("enable_full_screen_3", $settings_page);
    $fullscreen4  = get_field("enable_full_screen_4", $settings_page);
    $fullscreen5  = get_field("enable_full_screen_5", $settings_page);
    $fullscreen6  = get_field("enable_full_screen_6", $settings_page);
    $fullscreen7  = get_field("enable_full_screen_7", $settings_page);
    $fullscreen8  = get_field("enable_full_screen_8", $settings_page);
    $fullscreen9  = get_field("enable_full_screen_9", $settings_page);
    $fullscreen10 = get_field("enable_full_screen_10", $settings_page);

    //Check Bottom Menu
    $bottom_menu = get_field("display_bottom_menu", $settings_page);

    //Jsnonce
    $jsnonce = wp_create_nonce('js-nonce');

    ///Fullscreen Code
    if ($fullscreen1 == 'Yes' && $bottom_menu != false) {
        echo "<style>
        .embed1-button-wrapper{
            right: 0 !important;
            bottom: 0 !important; 
        }
        .expanded .embed1-list {
            height: 100vh !important;
            width: 100vw !important;
            transform: translate(0px, 0px) scale(1) !important;
            border-radius: 0 !important;
            max-height: 100vh;
        }
        
        .embed1-list li{
            margin: 0 !important;
        }
        .embed_f_1{
            height: 100vh !important;
        }
       #embed1.iframe_style{
        height: 93vh !important;
       }
        </style>";
    }

    if ($fullscreen2 == 'Yes' && $bottom_menu != false) {
        echo "<style>
        .embed2-button-wrapper{
            right: 0 !important;
            bottom: 0 !important; 
        }
        .expanded .embed2-list {
            height: 100vh !important;
            width: 100vw !important;
            transform: translate(0px, 0px) scale(1) !important;
            border-radius: 0 !important;
            max-height: 100vh;
        }
        
        .embed2-list li{
            margin: 0 !important;
        }
        .embed_f_2{
            height: 100vh !important;
        }
        #embed2.iframe_style{
            height: 93vh !important;
           }
       
        </style>";
    }

    if ($fullscreen3 == 'Yes' && $bottom_menu != false) {
        echo "<style>
        .embed3-button-wrapper{
            right: 0 !important;
            bottom: 0 !important; 
        }
        .expanded .embed3-list {
            height: 100vh !important;
            width: 100vw !important;
            transform: translate(0px, 0px) scale(1) !important;
            border-radius: 0 !important;
            max-height: 100vh;
        }
        
        .embed3-list li{
            margin: 0 !important;
        }
        .embed_f_3{
            height: 100vh !important;
        }
        #embed3.iframe_style{
            height: 93vh !important;
           }
        </style>";
    }

    if ($fullscreen4 == 'Yes' && $bottom_menu != false) {
        echo "<style>
        .embed4-button-wrapper{
            right: 0 !important;
            bottom: 0 !important; 
        }
        .expanded .embed4-list {
            height: 100vh !important;
            width: 100vw !important;
            transform: translate(0px, 0px) scale(1) !important;
            border-radius: 0 !important;
            max-height: 100vh;
        }
        
        .embed4-list li{
            margin: 0 !important;
        }
        .embed_f_4{
            height: 100vh !important;
        }
        #embed4.iframe_style{
            height: 93vh !important;
           }
        </style>";
    }

    if ($fullscreen5 == 'Yes' && $bottom_menu != false) {
        echo "<style>
        .embed5-button-wrapper{
            right: 0 !important;
            bottom: 0 !important; 
        }
        .expanded .embed5-list {
            height: 100vh !important;
            width: 100vw !important;
            transform: translate(0px, 0px) scale(1) !important;
            border-radius: 0 !important;
            max-height: 100vh;
        }
        
        .embed5-list li{
            margin: 0 !important;
        }
        .embed_f_5{
            height: 100vh !important;
        }
        #embed5.iframe_style{
            height: 93vh !important;
           }
        </style>";
    }

    if ($fullscreen6 == 'Yes' && $bottom_menu != false) {
        echo "<style>
        .embed6-button-wrapper{
            right: 0 !important;
            bottom: 0 !important; 
        }
        .expanded .embed6-list {
            height: 100vh !important;
            width: 100vw !important;
            transform: translate(0px, 0px) scale(1) !important;
            border-radius: 0 !important;
            max-height: 100vh;
        }
        
        .embed6-list li{
            margin: 0 !important;
        }
        .embed_f_6{
            height: 100vh !important;
        }
        #embed6.iframe_style{
            height: 93vh !important;
           }
        </style>";
    }

    if ($fullscreen7 == 'Yes' && $bottom_menu != false) {
        echo "<style>
        .embed7-button-wrapper{
            right: 0 !important;
            bottom: 0 !important; 
        }
        .expanded .embed7-list {
            height: 100vh !important;
            width: 100vw !important;
            transform: translate(0px, 0px) scale(1) !important;
            border-radius: 0 !important;
            max-height: 100vh;
        }
        #embed7.iframe_style{
            height: 93vh!important;
        }
        .embed7-list li{
            margin: 0 !important;
        }
        .embed_f_7{
            height: 100vh !important;
        }
        #embed7.iframe_style{
            height: 93vh !important;
           }
        </style>";
    }

    if ($fullscreen8 == 'Yes' && $bottom_menu != false) {
        echo "<style>
        .embed1-button-wrapper{
            right: 0 !important;
            bottom: 0 !important; 
        }
        .expanded .embed8-list {
            height: 100vh !important;
            width: 100vw !important;
            transform: translate(0px, 0px) scale(1) !important;
            border-radius: 0 !important;
            max-height: 100vh;
        }
        
        .embed8-list li{
            margin: 0 !important;
        }
        .embed_f_8{
            height: 100vh !important;
        }
        #embed8.iframe_style{
            height: 93vh !important;
           }
        </style>";
    }

    if ($fullscreen9 == 'Yes' && $bottom_menu != false) {
        echo "<style>
        .embed9-button-wrapper{
            right: 0 !important;
            bottom: 0 !important; 
        }
        .expanded .embed9-list {
            height: 100vh !important;
            width: 100vw !important;
            transform: translate(0px, 0px) scale(1) !important;
            border-radius: 0 !important;
            max-height: 100vh;
        }
        
        .embed9-list li{
            margin: 0 !important;
        }
        .embed_f_9{
            height: 100vh !important;
        }
        #embed9.iframe_style{
            height: 93vh !important;
           }
        </style>";
    }

    if ($fullscreen10 == 'Yes' && $bottom_menu != false) {
        echo "<style>
        .embed10-button-wrapper{
            right: 0 !important;
            bottom: 0 !important; 
        }
        .expanded .embed10-list {
            height: 100vh !important;
            width: 100vw !important;
            transform: translate(0px, 0px) scale(1) !important;
            border-radius: 0 !important;
            max-height: 100vh;
        }
        
        .embed10-list li{
            margin: 0 !important;
        }
        .embed_f_10{
            height: 100vh !important;
        }
        #embed10.iframe_style{
            height: 93vh !important;
           }
        </style>";
    }

    //Get comment selection
    $comment_embed = get_field("comments_embed", $settings_page);
    if (is_page() && !is_main_site()) {
        //Comment Embed
        if ($comment_check !== NULL) {
            echo '<div class="comments-button-wrapper">
        <ul class="comments-list">
          <li>
            ';
            if ($comment_embed == 'Telegram') {
                echo do_shortcode('[telegram_comment_home_shortcode]');
            }
            if ($comment_embed == 'Discord') {
                echo do_shortcode('[discord_comment_home_shortcode]');
            }
            if ($comment_embed == 'Disqus') {
                echo do_shortcode('[disqus_shortcode_home]');
            }
            echo '</li>
          
        </ul>
      </div>';
        }

        //Embed 1
        if ($content_embed1 != NULL) {
            echo '<div style="" class="embed1-button-wrapper">
        <ul style="" class="embed1-list">
          <li>
          <div class="embed_f_1" style="left: 0; width: 100%; height: 400px; position: relative;"><i class="embedloading fas fa-circle-notch fa-spin"></i><iframe class="iframe_style" id="embed1" loading="lazy" allowfullscreen allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture; camera; microphone; clipboard-read; clipboard-write; display-capture;"></iframe></div>
        </li>  
        </ul>
      </div>';
        }

        //Embed 2
        if ($content_embed2 != NULL) {
            echo '<div class="embed2-button-wrapper">
        <ul class="embed2-list">
          <li>
          <div class="embed_f_2 style="left: 0; width: 100%; height: 400px; position: relative;"><i class="embedloading fas fa-circle-notch fa-spin"></i><iframe name="embed-frame" class="iframe_style" id="embed2" loading="lazy" src="" allowfullscreen allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture; camera; microphone; clipboard-read; clipboard-write; display-capture;"></iframe></div>
        </li>  
        </ul>
      </div>';
        }

        //Embed 3
        if ($content_embed3 != NULL) {
            echo '<div class="embed3-button-wrapper">
        <ul class="embed3-list">
          <li>
          <div class="embed_f_3 style="left: 0; width: 100%; height: 400px; position: relative;"><i class="embedloading fas fa-circle-notch fa-spin"></i><iframe name="embed-frame" class="iframe_style" id="embed3" loading="lazy" src="" allowfullscreen allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture; camera; microphone; clipboard-read; clipboard-write; display-capture;"></iframe></div>
        </li>  
        </ul>
      </div>';
        }

        //Embed 4
        if ($content_embed4 != NULL) {
            echo '<div class="embed4-button-wrapper ">
        <ul class="embed4-list">
          <li>
          <div class="embed_f_4 style="left: 0; width: 100%; height: 400px; position: relative;"><i class="embedloading fas fa-circle-notch fa-spin"></i><iframe class="iframe_style" id="embed4" loading="lazy" src="" allowfullscreen allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture; camera; microphone; clipboard-read; clipboard-write; display-capture;"></iframe></div>
        </li>  
        </ul>
      </div>';
        }

        //Embed 5
        if ($content_embed5 != NULL) {
            echo '<div class="embed5-button-wrapper">
        <ul class="embed5-list">
          <li>
          <div class="embed_f_5 style="left: 0; width: 100%; height: 400px; position: relative;"><i class="embedloading fas fa-circle-notch fa-spin"></i><iframe class="iframe_style" id="embed5" loading="lazy" src="" allowfullscreen allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture; camera; microphone; clipboard-read; clipboard-write; display-capture;"></iframe></div>
        </li>  
        </ul>
      </div>';
        }

        //Embed 6
        if ($content_embed6 != NULL) {
            echo '<div class="embed6-button-wrapper">
        <ul class="embed6-list">
          <li>
          <div class="embed_f_6 style="left: 0; width: 100%; height: 400px; position: relative;"><i class="embedloading fas fa-circle-notch fa-spin"></i><iframe class="iframe_style" id="embed6" loading="lazy" src="" allowfullscreen allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture; camera; microphone; clipboard-read; clipboard-write; display-capture;"></iframe></div>
        </li>  
        </ul>
      </div>';
        }

        //Embed 7
        if ($content_embed7 != NULL) {
            echo '<div class="embed7-button-wrapper">
        <ul class="embed7-list">
          <li>
          <div class="embed_f_7 style="left: 0; width: 100%; height: 400px; position: relative;"><i class="embedloading fas fa-circle-notch fa-spin"></i><iframe class="iframe_style" id="embed7" loading="lazy" src="" allowfullscreen allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture; camera; microphone; clipboard-read; clipboard-write; display-capture;"></iframe></div>
        </li>  
        </ul>
      </div>';
        }

        //Embed 8
        if ($content_embed8 != NULL) {
            echo '<div class="embed8-button-wrapper">
        <ul class="embed8-list">
          <li>
          <div class="embed_f_8 style="left: 0; width: 100%; height: 400px; position: relative;"><i class="embedloading fas fa-circle-notch fa-spin"></i><iframe class="iframe_style" id="embed8" loading="lazy" src="" allowfullscreen allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture; camera; microphone; clipboard-read; clipboard-write; display-capture;"></iframe></div>
        </li>  
        </ul>
      </div>';
        }

        //Embed 9
        if ($content_embed9 != NULL) {
            echo '<div class="embed9-button-wrapper">
        <ul class="embed9-list">
          <li>
          <div class="embed_f_9 style="left: 0; width: 100%; height: 400px; position: relative;"><i class="embedloading fas fa-circle-notch fa-spin"></i><iframe class="iframe_style" id="embed9" loading="lazy" src="" allowfullscreen allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture; camera; microphone; clipboard-read; clipboard-write; display-capture;"></iframe></div>
        </li>  
        </ul>
      </div>';
        }

        //Embed 10
        if ($content_embed10 != NULL) {
            echo '<div class="embed10-button-wrapper">
        <ul class="embed10-list">
          <li>
          <div class="embed_f_10 style="left: 0; width: 100%; height: 400px; position: relative;"><i class="embedloading fas fa-circle-notch fa-spin"></i><iframe class="iframe_style" id="embed10" loading="lazy" src="" allowfullscreen allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture; camera; microphone; clipboard-read; clipboard-write; display-capture;"></iframe></div>
        </li>  
        </ul>
      </div>';
        }
    }

    if (is_front_page() && !is_main_site()) {
        echo "
        <script nonce=" . $jsnonce . " defer>
        var button1=document.querySelector('.embed1-button'),iframeLoaded1=!1,button2=document.querySelector('.embed2-button'),iframeLoaded2=!1,button3=document.querySelector('.embed3-button'),iframeLoaded3=!1,button4=document.querySelector('.embed4-button'),iframeLoaded4=!1,button5=document.querySelector('.embed5-button'),iframeLoaded5=!1,button6=document.querySelector('.embed6-button'),iframeLoaded6=!1,button7=document.querySelector('.embed7-button'),iframeLoaded7=!1,button8=document.querySelector('.embed8-button'),iframeLoaded8=!1,button9=document.querySelector('.embed9-button'),iframeLoaded9=!1,button10=document.querySelector('.embed10-button'),iframeLoaded10=!1;
      
        button1&&button1.addEventListener('click',(function(){iframeLoaded1||(document.getElementById('embed1').src='$content_embed1',iframeLoaded1=!0)})),button2&&button2.addEventListener('click',(function(){iframeLoaded2||(document.getElementById('embed2').src='$content_embed2',iframeLoaded2=!0)})),button3&&button3.addEventListener('click',(function(){iframeLoaded3||(document.getElementById('embed3').src='$content_embed3',iframeLoaded3=!0)})),button4&&button4.addEventListener('click',(function(){iframeLoaded4||(document.getElementById('embed4').src='$content_embed4',iframeLoaded4=!0)})),button5&&button5.addEventListener('click',(function(){iframeLoaded5||(document.getElementById('embed5').src='$content_embed5',iframeLoaded5=!0)})),button6&&button6.addEventListener('click',(function(){iframeLoaded6||(document.getElementById('embed6').src='$content_embed6',iframeLoaded6=!0)})),button7&&button7.addEventListener('click',(function(){iframeLoaded7||(document.getElementById('embed7').src='$content_embed7',iframeLoaded7=!0)})),button8&&button8.addEventListener('click',(function(){iframeLoaded8||(document.getElementById('embed8').src='$content_embed8',iframeLoaded8=!0)})),button9&&button9.addEventListener('click',(function(){iframeLoaded9||(document.getElementById('embed9').src='$content_embed9',iframeLoaded9=!0)})),button10&&button10.addEventListener('click',(function(){iframeLoaded10||(document.getElementById('embed10').src='$content_embed10',iframeLoaded10=!0)}));
        </script>
        ";
    }
}
add_action('wp_footer', 'show_comment_popup');

/******CUSTOM FIELDS*****/

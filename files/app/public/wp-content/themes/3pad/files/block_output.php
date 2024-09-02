<?php
/**
 * Block Widget
 */

///Encrypted Content
function encrypt_block_template()
{
  $title = get_field('decrypt_id');
  $decrypt_text = get_field('encrypted_content');
  $background_image = get_field('lock_image_url');
  $button_text = get_field('button_text');
  $button_color = get_field('button_color');
  $background_color = get_field('background_color_encrypt');
  $button_text_color = get_field('button_text_color');

  //Check if fullpage encrypt is enabled
  $fullpage_encrypt = get_field('full_page_encrypt_or_individual');

  //Echo Shortcode

  //Random String
  $random = wp_rand();
  //Nonce
  $jsnonce = wp_create_nonce('js-nonce');

  if ($fullpage_encrypt == 'Full Page') {
    echo '<div class="encrypt_box_main" id="' . esc_attr($title) . '" title="' . esc_attr($decrypt_text) . '" >';
    //Echo Backgroundg Videos Inside encrypt DIv
    echo do_shortcode('[encrypt_video]');
    echo ' <style>
          .page-header, .progress-wrap, #dark-mode, .disqus_reactions, #disqus_comments, #comment-section { display: none; }
          body {
          background-image: url("' . $background_image . '") !important;
          background-color: ' . $background_color . ' !important;
          }
          .post-nav-links {position: sticky; margin-top: -29px; box-shadow: 0px 0px 20px 10px #000; z-index: 9;}
          </style>
          <body>
          <section class="section-login wf-section">
    <div class="container-login">
      <h1 id="header-paywall" class="centered-heading" >This Page Is Encrypted</h1>
      <p id="subheader-paywall" class="centered-subheading" >Unlock Content With Button Below</p>
      <div id="lockpay" class="container-2 w-container">
        <a id="decrypt-button_' . $random . '" nonce="' . $jsnonce . '" id="paylink" button="email"  class="purchase w-button encrypt_box_' . $random . '" >🗝️ Decrypt With Password</a>
      </div>
      </h1>
      </div>
      </section>
      </body>
      </div>
    <script defer nonce=' . $jsnonce . '>
		document.getElementById("decrypt-button_' . $random . '").addEventListener("click", function () {
			decryptText("' . esc_attr($title) . '");
		});
	</script>
    ';
  } else {
    echo '<div class="encrypt_box_main" id="' . esc_attr($title) . '" title="' . esc_attr($decrypt_text) . '" >
      <a><div nonce=' . $jsnonce . ' class="encrypt_box encrypt_box_' . $random . '" style="background-image: url( ' . esc_attr($background_image) . ') ;"><button style="color:' . esc_attr($button_text_color) . '; background: ' . esc_attr($button_color) . '; " id="decrypt-button_' . $random . '" class="encrypt_button">' . esc_attr($button_text) . '</button></div></a>
    </div>
    <script defer nonce=' . $jsnonce . '>
		document.getElementById("decrypt-button_' . $random . '").addEventListener("click", function () {
			decryptText("' . esc_attr($title) . '");
		});
	</script>
    ';
  }
}



////////////////////Bunny File Embed

function bunny_embed()
{
  $choice = get_field("choose_option"); //Get Video ID
  if ($choice == 'Other') {

    $settings_page = "options"; ///Get Page Options
    $file_path = get_field("url_path"); //Get Video ID
    $authkeyfiles = get_field("bunny_cdn_authentication_key_files", $settings_page); //Get Auth Key
    $expiration = get_field("token_expiration_file"); //Token Expiration
    $width_bunny = get_field("width_bunny_file"); //Token Expiration
    $height_bunny = get_field("height_bunny_file"); //Token Expiration


    $path = $file_path;
    $TOKENKEY = $authkeyfiles;


    // Single URL signing example
    echo '<embed allowfullscreen style="border: none; margin: 0 auto; display: block; width: ' . $width_bunny . ' ;  height: ' . $height_bunny . ' ;" referrerpolicy="strict-origin-when-cross-origin" loading="lazy" src="' . sign_bcdn_url(
      "$path",
      // Url to sign
      "$TOKENKEY",
      // Token Key
      "$expiration",
      // Expiration time in seconds
      false,
      // Directory token 
      "/"
    ) . '">';
    ;
  }

  ////////////////////Bunny Video Embed

  //Check Vid ID
  $vid_id = get_field("bunny_vid_id"); //Get Video ID

  if ($choice == 'Video') {

    $settings_page = "options"; ///Get Page Options
    $authkeyvid = get_field("bunny_cdn_authentication_key_video", $settings_page); //Get Auth Key
    $librarykeyvid = get_field("bunny_cdn_video_library_id_video", $settings_page); //Get Library ID
    $expiration = get_field("token_expiration_vid"); //Token Expiration

    $LIBRARY_ID = $librarykeyvid;
    $TOKEN_KEY = $authkeyvid;
    $VIDEO_ID = $vid_id;
    $EXPIRES = time() + $expiration;
    $URL = 'https://iframe.mediadelivery.net/embed/';
    $token = hash('sha256', $TOKEN_KEY . $VIDEO_ID . $EXPIRES);

    echo '<div style="text-align: initial; position: relative; padding-top: 56.25%; margin-bottom: 10px;"><iframe loading="lazy" style="border: none; position: absolute; top: 0; height: 100%; width: 100%;" allow="accelerometer; gyroscope; encrypted-media; picture-in-picture;" preload="none" allowfullscreen="true" referrerpolicy="strict-origin-when-cross-origin"  src="' . $URL . $LIBRARY_ID . '/' . $VIDEO_ID . '?autoplay=false&showHeatmap=true&trackView=false&refresh=undefined' . '&expires=' . $EXPIRES . '&token=' . $token . '" ></iframe></div>';
  }

}
<!-- Vimeo (.js) -->
<?php
$settings_page_video = "option"; ///Get Page ID
$vid_id = get_field("enter_video_id_home", $settings_page_video);
/*
if (is_user_logged_in() && !current_user_can('subsciber')) {
    $vid_id = get_field("enter_video_id_logged_in_home", $settings_page_video);
}
if (!is_user_logged_in()) {
    $vid_id = get_field("enter_video_id_home", $settings_page_video);
}
if (current_user_can('subsciber')) {
    $vid_id = get_field("enter_video_id_subscribers_home", $settings_page_video);
}
*/
?>

<script nonce="<?php echo $jsnonce = wp_create_nonce('js-nonce'); ?>"
    src="https://player.vimeo.com/api/player.js"></script>
<div id="bgvd" class="vid-wrapper" style="min-width: auto;"></div>
<script nonce="<?php echo $jsnonce = wp_create_nonce('js-nonce'); ?>">
    var options = {
        id: <?php echo $vid_id; ?>,
        background: true,
        muted: 1,
        loop: 1
        
    };
    var vid1 = new Vimeo.Player('bgvd', options);
    vid1.play();
</script>
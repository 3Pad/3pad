<!-- Vimeo (.js) -->
<?php
$settings_page_video = get_queried_object_id();  // /Get Page ID
$vid_id              = get_field("enter_video_id_home", $settings_page_video);

/*
 * if (is_user_logged_in() && !current_user_can('subsciber')) {
 *     $vid_id = get_field("enter_video_id_logged_in_home", $settings_page_video);
 * }
 * if (!is_user_logged_in()) {
 *     $vid_id = get_field("enter_video_id_home", $settings_page_video);
 * }
 * if (current_user_can('subsciber')) {
 *     $vid_id = get_field("enter_video_id_subscribers_home", $settings_page_video);
 * }
 */
?>

<script src="https://player.vimeo.com/api/player.js"></script>
<div id="bgvd" class="vid-wrapper" style="min-width: auto;"></div>
<script >
    var options = {
        id: <?php echo $vid_id; ?>,
        background: true,
        muted: 1,
        loop: 1
        
    };
    var vid1 = new Vimeo.Player('bgvd', options);
    vid1.play();
</script>
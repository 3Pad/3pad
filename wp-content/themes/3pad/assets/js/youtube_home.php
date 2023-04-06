<!-- Youtube (.js) -->
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


<script nonce="<?php echo $jsnonce = wp_create_nonce('js-nonce'); ?>" defer
    src="https://www.youtube.com/iframe_api"></script>
<script nonce="<?php echo $jsnonce = wp_create_nonce('js-nonce'); ?>" defer type="text/javascript">
    var playerVars = { controls: 0, playlist: '<?php echo $vid_id; ?>', loop: 1, autoplay: 1, disablekb: 1, enablejsapi: 1, iv_load_policy: 3, modestbranding: 0, showinfo: 0, rel: 0 }, events = { onReady: onPlayerReady }; function createPlayer(e, a) { return new YT.Player(e, { videoId: a, playerVars: playerVars, events: events }) } function onYouTubeIframeAPIReady() { player = createPlayer("bgvd", "<?php echo $vid_id; ?>") } function onPlayerReady(e) { player.mute(), player.playVideo() }
</script>
<!-- Embed (.js) -->
<?php
$content_embed1 = get_field("embed1", $settings_page);
$content_embed2 = get_field("embed2", $settings_page);
$content_embed3 = get_field("embed3", $settings_page);
$content_embed4 = get_field("embed4", $settings_page);
$content_embed5 = get_field("embed5", $settings_page);
$content_embed6 = get_field("embed6", $settings_page);
$content_embed7 = get_field("embed7", $settings_page);
$content_embed8 = get_field("embed8", $settings_page);
$content_embed9 = get_field("embed9", $settings_page);
$content_embed10 = get_field("embed10", $settings_page);
?>

<script>
    document.querySelector('.embed1-button').addEventListener('click', function () {
        document.getElementById('embed1').src = '<?php echo $content_embed1; ?>';
    });
</script>
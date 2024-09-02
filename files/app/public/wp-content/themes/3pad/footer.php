<?php

/**
 * The template for displaying the footer.
 *
 * Contains the body & html closing tags.
 *
 * @package HelloElementor
 */
if (!defined('ABSPATH')) {
	exit;  // Exit if accessed directly.
}

?>

<link href="<?php echo get_theme_file_uri('/assets/css/fontawesome.min.css'); ?>" rel="stylesheet" />
<link href="<?php echo get_theme_file_uri('/assets/css/brands.min.css'); ?>" rel="stylesheet" />
<link href="<?php echo get_theme_file_uri('/assets/css/solid.min.css'); ?>" rel="stylesheet" />
<script src="<?php echo get_theme_file_uri('/assets/js/jquery.js'); ?>"></script>
<script src="<?php echo get_theme_file_uri('/assets/js/3pad.js'); ?>" defer></script>

<?php wp_footer(); ?>


</body>

</html>
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


<script src="<?php echo get_theme_file_uri('/assets/js/jquery.js'); ?>"></script>
<script src="<?php echo get_theme_file_uri('/assets/js/3pad.js'); ?>" async></script>


<?php wp_footer(); ?>


</body>

</html>
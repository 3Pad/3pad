<?php

////Header
get_header();

if (is_singular()) {
	get_template_part('front-page');
}

if (is_main_site() && is_front_page()) {
	get_template_part('pages/login');
}

//For -Main Site- Front page Check front-page.php (Top)
////Footer
get_footer();

?>
<?php  // Get Main Site home Page default Id
if (!is_page(10)) {
?>


	
	<?php get_header(); ?>

	
	
	<!--- Home CSS --->
	<link href="<?php echo get_theme_file_uri('/assets/css/home.css'); ?>" rel="stylesheet" />
	<link href="<?php echo get_theme_file_uri('/assets/css/fontawesome.min.css'); ?>" rel="stylesheet" />
	<link href="<?php echo get_theme_file_uri('/assets/css/brands.min.css'); ?>" rel="stylesheet" />
	<link href="<?php echo get_theme_file_uri('/assets/css/solid.min.css'); ?>" rel="stylesheet" />
	<link rel="manifest" href="data:application/manifest+json,%7B%22background_color%22%3A%20%22%23000000%22%2C%22theme_color%22%3A%20%22%23000000%22%2C%22orientation%22%3A%20%22portrait%22%2C%22display%22%3A%20%22standalone%22%7D">
	</head>
	
	<!--- Body --->

	<body <?php body_class(); ?>>
		<div class="elementor elementor-4337 elementor-location-single page has-post-thumbnail">
			<section
				class="elementor-section elementor-top-section elementor-element elementor-element-68c70ec3 elementor-section-height-min-height elementor-section-items-stretch elementor-section-full_width elementor-section-height-default elementor-sticky elementor-sticky--effects elementor-sticky--active elementor-section--handles-inside"
				id=bgvid>
				<div class="elementor-background-overlay fullscreenhide"></div>
				<div class="elementor-container elementor-column-gap-no">
					<div
						class="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-1035dc25">
						<div class="elementor-widget-wrap elementor-element-populated">
							<section
								class="elementor-section elementor-inner-section elementor-element elementor-element-85f81df elementor-section-content-bottom elementor-section-boxed elementor-section-height-default">
								<div class="elementor-container elementor-column-gap-no">
									<div id="main_titles"
										class="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-298df52 fullscreenhide">
										<?php do_shortcode("[social_icons]"); ?>
										<div class="elementor-widget-wrap elementor-element-populated">
											<?php do_shortcode("[home_titles_shortcode]"); ?>
										</div>
									</div>
								</div>
							</section>

							<div class="elementor-element elementor-element-56c28ba8 mute elementor-widget__width-auto elementor-absolute elementor-invisible elementor-widget elementor-widget-html"
								id="mutefull">
								<div class="elementor-widget-container">
									<a class="mute_control elementor-icon elementor-animation-pulse-grow">
										<i aria-hidden="true" class="fas fa-volume-up"></i> </a>
								</div>
							</div>
							<div class="elementor-element elementor-element-662ffecc exitfullscreen elementor-widget__width-auto elementor-absolute elementor-widget elementor-widget-html animated fadeIn sf-hidden"
								id=mutefull>

							</div>
							<div
								class="elementor-element elementor-element-1c2f503 elementor-widget__width-auto elementor-absolute elementor-widget elementor-widget-html">
								<div class=elementor-widget-container>
									<a id="button_fullscreen" class="elementor-icon elementor-animation-pulse-grow
											fullscreen-button">
										<i aria-hidden="true" class="fas fa-expand"></i>
									</a>
								</div>
							</div>
							<div class="elementor-element elementor-element-15b92f80 unmute elementor-widget__width-auto elementor-absolute elementor-widget elementor-widget-html"
								data-id=15b92f80 data-element_type=widget id=mutefull
								data-settings='{"_animation":"none","_position":"absolute"}' data-widget_type=html.default>
								<div class=elementor-widget-container>
									<a class="mute_control elementor-icon elementor-animation-pulse-growunmute-button">
										<i aria-hidden="true" class="fas fa-volume-off"></i>
									</a>

								</div>
							</div>
							<div class="fullscreenshow" id=logo>
								<div class="elementor-widget-container sf-hidden">
									<img style="max-width: 100px;max-height: 100px;opacity: 0.5;float: left;" loading="lazy"
										src="<?php $settings_page = get_queried_object_id();
	echo get_field("site_logo", $settings_page); ?>"> </img>
								</div>
							</div>
							<?php do_shortcode("[corner_icons_shortcode]"); ?>
							<?php do_shortcode("[text_links_shortcode]"); ?>
							<?php do_shortcode("[video_player]"); ?>
						</div>
					</div>
				</div>
			</section>
		</div>
		<?php get_footer(); ?>
		<?php
}
// Load Login Page template For home page main site
else {
	get_template_part('pages/login');
}
		?>
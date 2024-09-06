<?php
/**
 * The template for displaying singular post-types: posts, pages and user-defined custom post types.
 *
 */


while (have_posts()):
	the_post();
	?>
	<!--sse-->

	<link href="<?php echo get_theme_file_uri('/assets/css/w3.css'); ?>" rel="stylesheet" />
	<link href="<?php echo get_theme_file_uri('/assets/css/n3.css'); ?>" rel="stylesheet" />
	<link href="<?php echo get_theme_file_uri('/assets/css/3pad.css'); ?>" rel="stylesheet" />

	<body <?php body_class(); ?>>
		<?php if (post_password_required()) { ?>
			<form method="post" class="password-protect" action="/wp-login.php?action=postpass">
				<div class="protect-text">This content is password protected. To view it please enter password below:</div>
				<input type="password" style="margin:10px 0;color: black;padding: 2px;border-radius: 10px;margin-right: 10px;"
					size="20" id="pwbox-<?php the_ID(); ?>" name="post_password" /><br />
				<input type="submit" style=" padding: 4px; border-radius: 10px; color: black; background: white;" value="Submit"
					name="Submit" />
			</form>
			<?php } else { ?>

			<main id="content" role="main">
				<div class="page-content">
					<header class="page-header">
						<?php
						// Print the title
						echo '<h1 class="entry-title">';
						the_title();
						echo '</h1>';

						// Get the time and modified time in Unix timestamp format
						$u_time = get_the_time('U');
						$u_modified_time = strtotime(get_the_modified_time());

						// If the modified time is more than one day later than the time,
						// print the modified time
				
						echo "<p id='modified_time'>Updated ";
						echo date_i18n(get_option('date_format'), $u_modified_time);
						echo " at ";
						echo date_i18n(get_option('time_format'), $u_modified_time);
						echo "</p> ";

						?>


					</header>
					<div id="ads_above_content_" class="content_ads_">
						<?php do_shortcode("[ads_above]"); ?>
					</div>
					<?php the_content(); ?>
					<?php wp_link_pages(); ?>
					<div id="ads_below_content_" class="content_ads_">
						<?php do_shortcode("[ads_below]"); ?>
					</div>
					<div id="comment-section">
						<?php do_shortcode("[telegram_comment_shortcode]"); ?>
						<?php do_shortcode("[discord_comment_shortcode]"); ?>
						<?php do_shortcode("[disqus_shortcode]"); ?>
						<?php do_shortcode("[custom_comment_shortcode]"); ?>
					</div>
				</div>
			</main>
			<?php do_shortcode("[back_to_top_shortcode]"); ?>
			<?php do_shortcode("[darkmode_shortcode]"); ?>
			<?php do_shortcode("[disqus_react]"); ?>
			<?php } ?>
		<script src="<?php echo get_theme_file_uri('/assets/js/3pad_single.js'); ?>" defer></script>
		<script src="<?php echo get_theme_file_uri('/assets/js/encrypt.js'); ?>" defer></script>

		<!--/sse-->

		<?php
endwhile;
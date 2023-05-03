<?php
$logo = get_field('site_logo');

if ($logo == NULL) {
  echo '<style> .logo_age {
    display: none !important;
  }
  </style>';
}
?>

<!-- HTML for the age restriction prompt -->
<div class="age-restriction-prompt" id="age-restriction-prompt">
	<div class="age-restriction-prompt-content">
		<div class="logo_age"><img style="max-width: 200px;max-height: 150px;" loading="lazy"
				src="<?php echo get_field('site_logo'); ?>"></div>
		<h3>
			<?php echo get_field('site_title'); ?>'s Content Is Age Restricted
		</h3>
		<p>Are you over 18 years of age?</p>
		<?php
/* Terms
		<p id="subheader-login" class="centered-subheading" style="font-size: 9px;line-height: 14px;text-transform: capitalize;">By entering, you agree to our <a target="_blank" href="https://hello.3pad.xyz/terms" style="font-weight: bold; color: bisque;">Terms</a>.</p>
		*/
?>
		<button class="yes">Yes</button>
		<button class="no">No</button>
	</div>
</div>

<style>
	.age-restriction-prompt {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		z-index: 9999999;
		backdrop-filter: blur(200px);
		-webkit-backdrop-filter: blur(200px)
	}

	.age-restriction-prompt-content {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 4px;
		text-align: center;
		padding: 20px;
		color: #fff;
		text-transform: uppercase;
		width: 90%;
		text-shadow: #000 1px 0 10px;
		font-family: system-ui
	}

	.age-restriction-prompt-content button {
		cursor: pointer;
		border: none;
		outline: none;
		background-color: #fff;
		color: #000;
		font-size: 16px;
		padding: 14px 20px;
		margin: 8px;
		border-radius: 4px
	}

	.age-restriction-prompt-content button.no {
		background-color: #000;
		color: #fff;
		width: 50%
	}

	.logo_age {
		display: block;
		position: initial;
		display: block;
		margin-left: auto;
		margin-right: auto
	}
</style>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=<?php $settings_page = get_queried_object_id(); echo get_field('google_gtag', $settings_page); ?>"></script>
<script>
	window.dataLayer = window.dataLayer || [];
	function gtag() { dataLayer.push(arguments); }
	gtag('js', new Date());

	gtag('config', '<?php $settings_page = get_queried_object_id(); echo get_field('google_gtag', $settings_page); ?>');
</script>
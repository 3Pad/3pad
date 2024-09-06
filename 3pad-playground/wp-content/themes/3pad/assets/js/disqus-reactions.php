<?php $did = get_queried_object_id(); ?>

<div id="disqus_thread" class="disqus_reactions"></div>
<script defer nonce="<?php echo $jsnonce = wp_create_nonce('js-nonce'); ?>">
	var disqus_config = function () { this.page.url = "<?php echo site_url(); ?>", this.page.identifier = "<?php echo $did; ?>" }; !function () { var e = document, t = e.createElement("script"); t.src = 'https://<?php echo get_field("disqus_shortname"); ?>.disqus.com/embed.js', t.setAttribute("data-timestamp", +new Date), (e.head || e.body).appendChild(t) }();
</script>
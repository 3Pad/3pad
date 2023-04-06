<?php $did = get_queried_object_id(); ?>
<iframe id="disqus_comments" srcdoc="<div id='disqus_thread'></div>
					<script nonce='<?php echo $jsnonce = wp_create_nonce('js-nonce'); ?>' defer>
					var disqus_config=function(){this.page.url='<?php echo site_url(); ?>',this.page.identifier='<?php echo $did; ?>'};(function(){var e=document,t=e.createElement('script');t.src='https://<?php echo get_field("disqus_shortname"); ?>.disqus.com/embed.js',t.setAttribute('data-timestamp',+new Date),(e.head||e.body).appendChild(t)})();
					</script><noscript>Please enable JavaScript to view the <a href=" https://disqus.com/?ref_noscript">comments
	powered byDisqus.</a></noscript>
</iframe>
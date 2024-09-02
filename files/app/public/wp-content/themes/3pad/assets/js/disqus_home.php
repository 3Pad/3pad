<iframe id="disqus_comments-home" srcdoc="<div id='disqus_thread'></div>
					<script nonce='<?php echo $jsnonce = wp_create_nonce('js-nonce'); ?>' defer>
					var disqus_config=function(){this.page.url='<?php echo site_url(); ?>',this.page.identifier='-1'};(function(){var e=document,t=e.createElement('script');t.src='https://<?php $settings_page = get_queried_object_id(); echo get_field("disqus_shortname_home", $settings_page); ?>.disqus.com/embed.js',t.setAttribute('data-timestamp',+new Date),(e.head||e.body).appendChild(t)})();
					</script><noscript>Please enable JavaScript to view the <a href=" https://disqus.com/?ref_noscript">comments
	powered byDisqus.</a></noscript>
</iframe>
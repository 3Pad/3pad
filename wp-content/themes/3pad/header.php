<!DOCTYPE html>
<html lang=en>
    <meta content="This site was built with Web3 platform 3Pad. More Info at https://hello.3pad.xyz">
    <meta content="3Pad - Version 1.0">
    <?php echo '<meta content="Main-Site-Launchpad">'; ?>

    <meta charset=utf-8>
    <meta content="width=device-width,initial-scale=1,maximum-scale=5" name=viewport>
    <meta content="ie=edge" http-equiv=x-ua-compatible>
    <meta content="3Pad | Your content. Redifined." name=description>
    <meta content="<?php echo get_field("site_title", 'options'); ?> | 3Pad" property=og:title>
    <meta content=3Pad property=og:site_name>
    <meta content="3Pad | Your content. Redifined." property=og:description>
    <meta content="<?php echo get_theme_file_uri('/assets/images/favicon.ico'); ?>" property=og:image>
    <meta content="<?php echo get_theme_file_uri('/assets/images/favicon.ico'); ?>" property=twitter:image>
    <meta content="<?php echo get_field("site_title", 'options'); ?> | 3Pad" name=twitter:title>
    <meta content="3Pad | Your content. Redifined." name=twitter:description>
    <meta content=summary_large_image property=twitter:card>
    <meta content=3Pad name=twitter:domain>
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <link rel="icon" href="<?php echo get_field("app_icon_url", 'options'); ?>">
    <!-- Main Link Tags  -->
    <link href="<?php echo get_field("app_icon_url", 'options'); ?>" rel="icon" type="image/png" sizes="16x16">
    <link href="<?php echo get_field("app_icon_url", 'options'); ?>" rel="icon" type="image/png" sizes="32x32">
    <link href="<?php echo get_field("app_icon_url", 'options'); ?>" rel="icon" type="image/png" sizes="48x48">

    <!-- iOS  -->
    <link href="<?php echo get_field("app_icon_url", 'options'); ?>" rel="apple-touch-icon">
    <link href="<?php echo get_field("app_icon_url", 'options'); ?>" rel="apple-touch-icon" sizes="76x76">
    <link href="<?php echo get_field("app_icon_url", 'options'); ?>" rel="apple-touch-icon" sizes="120x120">
    <link href="<?php echo get_field("app_icon_url", 'options'); ?>" rel="apple-touch-icon" sizes="152x152">

    <!-- Startup Image  -->
    <link href="<?php echo get_field("app_icon_url", 'options'); ?>" rel="apple-touch-startup-image">

    <!-- Pinned Tab  -->
    <link href="<?php echo get_field("app_icon_url", 'options'); ?>" rel="mask-icon" size="any">

    <!-- Android  -->
    <link href="<?php echo get_field("app_icon_url", 'options'); ?>" rel="icon" sizes="192x192">
    <link href="<?php echo get_field("app_icon_url", 'options'); ?>" rel="icon" sizes="128x128">

    <!-- Others -->
    <link href="<?php echo get_field("app_icon_url", 'options'); ?>" rel="shortcut icon" type="image/x-icon">

    <!-- UC Browser  -->
    <link href="<?php echo get_field("app_icon_url", 'options'); ?>" rel="apple-touch-icon-precomposed" sizes="57x57">
    <link href="<?php echo get_field("app_icon_url", 'options'); ?>" rel="apple-touch-icon" sizes="72x72">
    <meta content=website property="og:type ">
    <meta property=og:updated_time>
    <meta content="<?php echo get_field('view_port_theme_color', 'options'); ?>" name=theme-color>
    <meta name="apple-mobile-web-app-status-bar-style"
        content="<?php echo get_field('view_port_theme_color', 'options'); ?>">
    <noscript>
        <meta http-equiv="refresh" content="0;url=https://3pad.xyz/nojs.html">
    </noscript>
    <!-- Cloudflare Web Analytics -->
    <script defer src='https://static.cloudflareinsights.com/beacon.min.js'
        data-cf-beacon='{"token": "5092b35b470549b1af6e595e86ebcd1f"}'></script><!-- End Cloudflare Web Analytics -->
    <script async defer data-website-id="01986122-c6c5-4d5c-8e61-9282235ced87"
        src="https://analytics.3pad.xyz/umami.js"></script>
    <?php wp_head(); ?>
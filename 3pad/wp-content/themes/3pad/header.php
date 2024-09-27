<!DOCTYPE html>
<html lang=en>
    <meta content="This site was built with Web3 platform Burnafter. More Info at https:/burnafter.eth.limo">
    <meta content="Burnafter - Version 1.0">
    <?php echo '<meta content="Main-Site-Launchpad">'; ?>

    <meta charset=utf-8>
    <meta content="width=device-width,initial-scale=1" name=viewport>
    <meta content="ie=edge" http-equiv=x-ua-compatible>
    <meta content="Burnafter | Build,Export,Yours Forever." name=description>
    <meta content="<?php echo get_field("site_title"); ?> | Burnafter" property=og:title>
    <meta content=Burnafter property=og:site_name>
    <meta content="Burnafter | Build,Export,Yours Forever." property=og:description>
    <meta content="<?php echo get_theme_file_uri('/assets/images/favicon.ico'); ?>" property=og:image>
    <meta content="<?php echo get_theme_file_uri('/assets/images/favicon.ico'); ?>" property=twitter:image>
    <meta content="<?php echo get_field("site_title"); ?> | Burnafter" name=twitter:title>
    <meta content="Burnafter | Build,Export,Yours Forever." name=twitter:description>
    <meta content=summary_large_image property=twitter:card>
    <meta content=Burnafter name=twitter:domain>
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <link rel="icon" href="<?php echo get_field("app_icon_url"); ?>">
    <!-- Main Link Tags  -->
    <link href="<?php echo get_field("app_icon_url"); ?>" rel="icon" type="image/png" sizes="16x16">
    <link href="<?php echo get_field("app_icon_url"); ?>" rel="icon" type="image/png" sizes="32x32">
    <link href="<?php echo get_field("app_icon_url"); ?>" rel="icon" type="image/png" sizes="48x48">

    <!-- iOS  -->
    <link href="<?php echo get_field("app_icon_url"); ?>" rel="apple-touch-icon">
    <link href="<?php echo get_field("app_icon_url"); ?>" rel="apple-touch-icon" sizes="76x76">
    <link href="<?php echo get_field("app_icon_url"); ?>" rel="apple-touch-icon" sizes="120x120">
    <link href="<?php echo get_field("app_icon_url"); ?>" rel="apple-touch-icon" sizes="152x152">

    <!-- Startup Image  -->
    <link href="<?php echo get_field("app_icon_url"); ?>" rel="apple-touch-startup-image">

    <!-- Pinned Tab  -->
    <link href="<?php echo get_field("app_icon_url"); ?>" rel="mask-icon" size="any">

    <!-- Android  -->
    <link href="<?php echo get_field("app_icon_url"); ?>" rel="icon" sizes="192x192">
    <link href="<?php echo get_field("app_icon_url"); ?>" rel="icon" sizes="128x128">

    <!-- Others -->
    <link href="<?php echo get_field("app_icon_url"); ?>" rel="shortcut icon" type="image/x-icon">

    <!-- UC Browser  -->
    <link href="<?php echo get_field("app_icon_url"); ?>" rel="apple-touch-icon-precomposed" sizes="57x57">
    <link href="<?php echo get_field("app_icon_url"); ?>" rel="apple-touch-icon" sizes="72x72">
    <meta content=website property="og:type ">
    <meta property=og:updated_time>
    <meta content="<?php echo get_field('view_port_theme_color'); ?>" name=theme-color>
    <meta name="apple-mobile-web-app-status-bar-style"
        content="<?php echo get_field('view_port_theme_color'); ?>">
    <noscript>
        
    </noscript>

   
    <?php

        wp_head();
    ?>

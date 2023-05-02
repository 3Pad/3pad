<?php

if (!defined('ABSPATH')) {
    exit;
}

// this code loads the parent's stylesheet (leave it in place unless you know what you're doing)

function your_theme_enqueue_styles()
{
    $parent_style = 'parent-style';

    wp_enqueue_style(
        $parent_style,
        get_template_directory_uri() . '/style.css'
    );
}

add_action('wp_enqueue_scripts', 'your_theme_enqueue_styles');

///Autoload ACF PLUGIN
if (!function_exists('is_plugin_active')) {
    include_once (ABSPATH . 'wp-admin/includes/plugin.php');
}

function activate_acf()
{
    // Check if the plugin is not already activated.
    if (!is_plugin_active('advanced-custom-fields/acf.php')) {
        // Activate the plugin.
        activate_plugin('advanced-custom-fields/acf.php');
        echo 'MAKE SURE ACF IS INSTALLED IN FOLDER';
    }

    // Check if the plugin is not already activated.
    if (!is_plugin_active('simply-static/simply-static.php')) {
        // Activate the plugin.
        activate_plugin('simply-static/simply-static.php');
        echo 'MAKE SURE SIMPLY STATIC IS INSTALLED IN FOLDER';
    }

    // Check if the plugin is not already activated.
    if (!is_plugin_active('unlock-protocol/unlock-protocol.php')) {
        // Activate the plugin.
        activate_plugin('unlock-protocol/unlock-protocol.php');
        echo 'MAKE SURE UNLCOK PROTOCOL IS INSTALLED IN FOLDER';
    }
}

add_action('admin_init', 'activate_acf');

/**
 * Filters the URL of stylesheets, scripts, and assets.
 *
 * @param  string $url The original URL.
 * @return string The new URL.
 */
add_filter('style_loader_src', 'my_theme_style_url_filter', 10, 2);
add_filter('script_loader_src', 'my_theme_script_url_filter', 10, 2);
add_filter('theme_file_uri', 'my_theme_asset_url_filter', 10, 2);

function my_theme_style_url_filter($src, $handle)
{
    if (!is_admin() && !is_front_page()) {
        $src = str_replace(get_site_url(), ARWEAVE_FILES, $src);
    }
    return $src;
}

function my_theme_script_url_filter($src, $handle)
{
    if (!is_admin() && !is_front_page()) {
        $src = str_replace(get_site_url(), ARWEAVE_FILES, $src);
    }
    return $src;
}

function my_theme_asset_url_filter($url, $path)
{
    if (!is_admin() && !is_front_page()) {
        $new_url = str_replace(get_site_url(), ARWEAVE_FILES, $url);
        return $new_url !== $url ? $new_url : $url;
    }
    return $url;
}

/*  Add your own functions below this line.
======================================== */

/**
 * Multisite
 */
require_once ABSPATH . 'wp-content/themes/3pad/files/multisite-settings.php';

/**
 * Security
 */
require_once plugin_dir_path(__FILE__) . 'files/security.php';

/**
 * ACF
 */
require_once plugin_dir_path(__FILE__) . 'files/acf.php';

/**
 * CACHE
 */
require_once plugin_dir_path(__FILE__) . 'files/cache.php';

/**
 * ADMIN AREA
 */
require_once plugin_dir_path(__FILE__) . 'files/admin.php';

/**
 * Users
 */
require_once plugin_dir_path(__FILE__) . 'files/users.php';

/**
 * Custom Fields
 */
require_once plugin_dir_path(__FILE__) . 'files/custom-fields.php';

/**
 * Login Security
 */
require_once plugin_dir_path(__FILE__) . 'files/login-security.php';

/**
 * Unlock Protocol
 */
require_once plugin_dir_path(__FILE__) . 'files/unlock-protocol.php';

/**
 * Author Filter Html
 */
require_once plugin_dir_path(__FILE__) . 'files/author-unfiltered-html.php';

/**
 * Headers
 */
require_once plugin_dir_path(__FILE__) . 'files/headers.php';

/**
 * Git Push
 */
require_once plugin_dir_path(__FILE__) . 'files/git-push.php';

/**
 * Styling
 */
require_once plugin_dir_path(__FILE__) . 'files/styling.php';

/**
 * BLocks
 */
//require_once plugin_dir_path(__FILE__) . 'files/blocks.php';

/**
 * Blocks Output
 */
//require_once plugin_dir_path(__FILE__) . 'files/block_output.php';

/**
 * BunnCDN
 */
//require_once plugin_dir_path(__FILE__) . 'files/bunnycdn.php';

// Use the ACF "save_post" hook to save the ACF fields for each user individually.

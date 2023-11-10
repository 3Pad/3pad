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

// /Autoload ACF PLUGIN
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

    /*
     * if (!is_plugin_active('simply-static/simply-static.php')) {
     *     // Activate the plugin.
     *     activate_plugin('simply-static/simply-static.php');
     *     echo 'MAKE SURE SIMPLY STATIC IS INSTALLED IN FOLDER';
     * }
     */

    // Check if the plugin is not already activated.
    if (!is_plugin_active('unlock-protocol/unlock-protocol.php')) {
        // Activate the plugin.
        activate_plugin('unlock-protocol/unlock-protocol.php');
        echo 'MAKE SURE UNLCOK PROTOCOL IS INSTALLED IN FOLDER';
    }
}

add_action('admin_init', 'activate_acf');

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
// require_once plugin_dir_path(__FILE__) . 'files/author-unfiltered-html.php';

/**
 * Headers
 *
 * require_once plugin_dir_path(__FILE__) . 'files/headers.php';
 */

/**
 * Git Push
 */
// require_once plugin_dir_path(__FILE__) . 'files/git-push.php';

/**
 * Styling
 */
require_once plugin_dir_path(__FILE__) . 'files/styling.php';

/**
 * BLocks
 */
// require_once plugin_dir_path(__FILE__) . 'files/blocks.php';

/**
 * Blocks Output
 */
// require_once plugin_dir_path(__FILE__) . 'files/block_output.php';

/**
 * BunnCDN
 */
// require_once plugin_dir_path(__FILE__) . 'files/bunnycdn.php';

// Use the ACF "save_post" hook to save the ACF fields for each user individually.

// Load WordPress

// Hook to save_post

// Add this code to your theme's functions.php file or a custom plugin

// Replace 'https://example.com' with the URL of the page you want to fetch
// Assuming you are within the context of a WordPress function or hook

// Get the current post ID
function export_html_on_save_post($post_id)
{
    // Generate a nonce for your action
    // Generate a random string for the nonce
    $random_string = wp_generate_password(8, false);

    // Use the random string as part of the action name
    $action = 'create_page_nonce_' . $random_string;
    $nonce  = wp_create_nonce($action);

    // Get the permalink of the post being saved with nonce query
    $page_url = add_query_arg('unique_page_nonce', $nonce, get_permalink($post_id));

    // Get the post content
    $post_content = file_get_contents($page_url);

    // Minify the HTML content
    $minified_content = minify_html_sites($post_content);

    // Create the folder path to save the HTML content to
    $folder_path = ABSPATH . 'sites/_sites/';

    // Check if the user can manage options
    if (current_user_can('manage_options')) {
        // Append post title to the folder path
        $folder_path .= sanitize_title(get_the_title($post_id)) . '/';
    } else {
        // For non-admin users, append author name to the folder path
        $folder_path .= strtolower(get_the_author_meta('display_name', get_post_field('post_author', $post_id))) . '/';
    }

    // Create the folder if it doesn't exist
    if (!file_exists($folder_path)) {
        mkdir($folder_path, 0755, true);
    }

    // Save the minified HTML content to a file
    $file_path = $folder_path . 'index.html';
    file_put_contents($file_path, $minified_content);
}

add_action('save_post', 'export_html_on_save_post');

// Function to minify HTML content
function minify_html_sites($html)
{
    // Remove extra white spaces between tags
    $html = preg_replace('/>\s+</', '><', $html);

    // Remove white spaces around tags
    $html = preg_replace('/\s*<\s*([^\s>]+)\s*>/', '<$1>', $html);
    $html = preg_replace('/\s*>\s*([^\s<]+)\s*</', '>$1<', $html);

    return $html;
}

/**
 * Filters the URL of stylesheets, scripts, and assets.
 *
 * @param  string $url The original URL.
 * @return string The new URL.
 */

/*
 * function replace_urls_output_buffering($buffer)
 * {
 *     $old_domain = home_url();
 *     $new_domain = 'https://e2ab474kur2rcrauwl43tjkytipp4tvjyli3hshba6oqmortxp2a.arweave.net/JoAef4qkdRFEFLL5uaVYmh7-TqnC0bPI4QedBjozu_Q';
 *
 *     $buffer = str_replace($old_domain, $new_domain, $buffer);
 *
 *     return $buffer;
 * }
 *
 * function start_output_buffering()
 * {
 *     ob_start('replace_urls_output_buffering');
 * }
 *
 * function end_output_buffering()
 * {
 *     ob_end_flush();
 * }
 *
 * add_action('wp_head', 'start_output_buffering', 1);
 * add_action('wp_footer', 'end_output_buffering', 100);
 */

// ////

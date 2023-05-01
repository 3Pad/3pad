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

///Delete MU plugin On switch
function delete_my_mu_plugin_on_theme_change()
{
    $current_theme  = wp_get_theme();
    $previous_theme = get_option('theme_switched');
    $mu_plugin_path = WP_CONTENT_DIR . '/mu-plugins/3pad.php';

    if ($previous_theme && $previous_theme !== $current_theme->get('Name') && file_exists($mu_plugin_path)) {
        unlink($mu_plugin_path);
    }
}

add_action('after_switch_theme', 'delete_my_mu_plugin_on_theme_change');

/*  Add your own functions below this line.
======================================== */

/**
 * Multisite
 */
//require_once ABSPATH . 'wp-content/themes/3pad/files/multisite-settings.php';

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
//require_once plugin_dir_path(__FILE__) . 'files/admin.php';

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

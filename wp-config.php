<?php

/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * This has been slightly modified (to read environment variables) for use in Docker.
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// IMPORTANT: this file needs to stay in-sync with https://github.com/WordPress/WordPress/blob/master/wp-config-sample.php
// (it gets parsed by the upstream wizard in https://github.com/WordPress/WordPress/blob/f27cb65e1ef25d11b535695a660e7282b98eb742/wp-admin/setup-config.php#L356-L392)

// a helper function to lookup "env_FILE", "env", then fallback
if (!function_exists('getenv_docker')) {
	// https://github.com/docker-library/wordpress/issues/588 (WP-CLI will load this file 2x)
	function getenv_docker($env, $default)
	{
		if ($fileEnv = getenv($env . '_FILE')) {
			return rtrim(file_get_contents($fileEnv), "\r\n");
		}
		else
			if (($val = getenv($env)) !== false) {
				return $val;
			} else {
				return $default;
			}
	}
}

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', getenv_docker('WORDPRESS_DB_NAME', 'wordpress'));

/** Database username */
define('DB_USER', getenv_docker('WORDPRESS_DB_USER', 'example username'));

/** Database password */
define('DB_PASSWORD', getenv_docker('WORDPRESS_DB_PASSWORD', 'example password'));

/**
 * Docker image fallback values above are sourced from the official WordPress installation wizard:
 * https://github.com/WordPress/WordPress/blob/1356f6537220ffdc32b9dad2a6cdbe2d010b7a88/wp-admin/setup-config.php#L224-L238
 * (However, using "example username" and "example password" in your database is strongly discouraged.  Please use strong, random credentials!)
 */

/** Database hostname */
define('DB_HOST', getenv_docker('WORDPRESS_DB_HOST', 'mysql'));

/** Database charset to use in creating database tables. */
define('DB_CHARSET', getenv_docker('WORDPRESS_DB_CHARSET', 'utf8'));

/** The database collate type. Don't change this if in doubt. */
define('DB_COLLATE', getenv_docker('WORDPRESS_DB_COLLATE', ''));

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY', getenv_docker('WORDPRESS_AUTH_KEY', '06bb609bb135fc4ae9420bbe022100b41d1c001a'));
define('SECURE_AUTH_KEY', getenv_docker('WORDPRESS_SECURE_AUTH_KEY', '4558a9834f562d6b6de0ba930345bc47dead2a25'));
define('LOGGED_IN_KEY', getenv_docker('WORDPRESS_LOGGED_IN_KEY', 'ce65ed3b0b058253317edecde895a6722e650e89'));
define('NONCE_KEY', getenv_docker('WORDPRESS_NONCE_KEY', '647f163c049963b1c85edc19aae4941ba601fbba'));
define('AUTH_SALT', getenv_docker('WORDPRESS_AUTH_SALT', '96d4e8057767dec4d9b6f52a323efc5936d29fe8'));
define('SECURE_AUTH_SALT', getenv_docker('WORDPRESS_SECURE_AUTH_SALT', '8a0f7f2b875bcd333f2b4583e6a889751733adff'));
define('LOGGED_IN_SALT', getenv_docker('WORDPRESS_LOGGED_IN_SALT', 'f1700c7af9e4abc9a276c82e7b1776fde1114b94'));
define('NONCE_SALT', getenv_docker('WORDPRESS_NONCE_SALT', '241ee0bdd3656282529f4aceda1ffea325e4bb7e'));
// (See also https://wordpress.stackexchange.com/a/152905/199287)

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = getenv_docker('WORDPRESS_TABLE_PREFIX', 'wp_');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define('WP_DEBUG', !!getenv_docker('WORDPRESS_DEBUG', 'true'));

/* Add any custom values between this line and the "stop editing" line. */

// If we're behind a proxy server and using HTTPS, we need to alert WordPress of that fact
// see also https://wordpress.org/support/article/administration-over-ssl/#using-a-reverse-proxy
if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && strpos($_SERVER['HTTP_X_FORWARDED_PROTO'], 'https') !== false) {
	$_SERVER['HTTPS'] = 'on';
}
// (we include this by default because reverse proxying is extremely common in container environments)

if ($configExtra = getenv_docker('WORDPRESS_CONFIG_EXTRA', '')) {
	eval($configExtra);
}

//3pad CONFIGS

//SITE URLS
define('WP_HOME', getenv_docker('WORDPRESS_SITE_HOME', 'URL'));

define('WP_SITEURL', getenv_docker('WORDPRESS_SITE_URL', 'URL'));

////Moralis KEY
define('MORALIS_API_KEY', getenv_docker('WORDPRESS_MORALIS_KEY', 'API'));

// IPFS PATH
define('IPFS_PATH', getenv_docker('WORDPRESS_IPFS_PATH', 'PATH'));

// TEMP PATH STATIC
define('TEMP_PATH', getenv_docker('WORDPRESS_TEMP_PATH', 'PATH'));

// GITHUB ACCESS TOKEN
define('GITHUB_ACCESS_TOKEN', getenv_docker('WORDPRESS_GITHUB_TOKEN', 'TOKEN'));

//GIT PUSH SECONDS
define('GIT_PUSH_SECONDS', getenv_docker('WORDPRESS_GIT_PUSH_SECONDS', '300'));

# Set the default theme to '3pad'
define('WP_DEFAULT_THEME', '3pad');

# Disallow editing files from the WordPress dashboard
define('DISALLOW_FILE_EDIT', true);

# Enable the use of a caching plugin or system
define('WP_CACHE', true);

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if (!defined('ABSPATH')) {
	define('ABSPATH', __DIR__ . '/');
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

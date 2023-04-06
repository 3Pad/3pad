<?php

/**
 * Unlock box dynamic block class.
 *
 * @since 3.0.0
 *
 * @package unlock-protocol
 */

namespace Unlock_Protocol\Inc\Blocks;

use Unlock_Protocol\Inc\Login;
use Unlock_Protocol\Inc\Traits\Singleton;
use Unlock_Protocol\Inc\Unlock;


/**
 * Class Unlock_Box_Block
 *
 * @since 3.0.0
 */
class Unlock_Box_Block
{

	use Singleton;

	/**
	 * Construct method.
	 *
	 * @since 3.0.0
	 */
	protected function __construct()
	{

		$this->setup_hooks();

	}

	/**
	 * Setup hooks.
	 *
	 * @since 3.0.0
	 */
	protected function setup_hooks()
	{
		/**
		 * Actions.
		 */
		add_action('init', array($this, 'register_block_type'));
	}

	/**
	 * Register block type.
	 *
	 * @since 3.0.0
	 */
	public function register_block_type()
	{
		register_block_type(
			'unlock-protocol/unlock-box',
			array(
				'render_callback' => array($this, 'render_block'),
				'attributes' => array(
					'locks' => array(
						'type' => 'array',
						'default' => array(),
					),
					'ethereumNetworks' => array(
						'type' => 'array',
						'default' => array(),
					),
				),
				'supports' => array(
					'align' => true,
				),
			)
		);
	}

	/**
	 * Render block.
	 *
	 * @param array  $attributes List of attributes passed in block.
	 * @param string $content Block Content.
	 *
	 * @since 3.0.0
	 *
	 * @return string HTML elements.
	 */
	public function render_block($attributes, $content)
	{
		// Bail out if current user is admin or the author.
		if (current_user_can('manage_options') || (get_the_author_meta('ID') === get_current_user_id())) {
			return $content;
		}

		if (
			!is_user_logged_in() ||
			(is_user_logged_in() && !up_get_user_ethereum_address())
		) {
			$login_button_text = up_get_general_settings('login_button_text', __('Login', 'unlock-protocol'));
			$login_button_bg_color = up_get_general_settings('login_button_bg_color', '#000');
			$login_button_text_color = up_get_general_settings('login_button_text_color', '#fff');
			$blurred_image_activated = wp_validate_boolean(up_get_general_settings('login_blurred_image_button', true));

			$template_data = array(
				'login_url' => Unlock::get_login_url(get_permalink()),
				'login_button_text' => $login_button_text,
				'login_button_bg_color' => $login_button_bg_color,
				'login_button_text_color' => $login_button_text_color,
				'blurred_image_activated' => $blurred_image_activated,
			);

			// Fetching some more data if blurred image button type is activated.
			if ($blurred_image_activated) {
				$login_button_description = up_get_general_settings('login_button_description', __('To View This Content', 'unlock-protocol'));
				$login_bg_image = up_get_general_settings('login_bg_image');

				$template_data['login_button_description'] = $login_button_description;
				$template_data['login_bg_image'] = $login_bg_image;
			}

			$html_template = unlock_protocol_get_template('login/button', $template_data);

			return apply_filters('unlock_protocol_login_content', $html_template, $template_data);
		}

		$locks = $attributes['locks'];

		$settings = get_option('unlock_protocol_settings', array());
		$networks = isset($settings['networks']) ? $settings['networks'] : array();



		///Start Of Unlock::has_access

		if (Unlock::has_access($networks, $locks)) {
			//Add user to blog subscriber
			if (!is_main_site()) {
				// get the current user's ID
				$user_id = get_current_user_id();

				// add the current user to the "subscriber" role for the current site
				add_user_to_blog(get_current_blog_id(), $user_id, 'subscriber');
			}

			///Check If it's Main Site & Front Page
			if (is_main_site() && is_front_page()) {

				// Get the current time
				$current_time = time();

				// Calculate the expiration time 0
				$expiration_time = 'true';

				// Add the token as a user meta field
				$user_id = get_current_user_id();

				// Check if the 'wp-admin-token-expiration' meta field is set for the user
				$current_expiration = get_user_meta($user_id, 'admin-token-expiration', true);

				//Add new meta field if field is empty
				if (empty($current_expiration)) {
					update_user_meta($user_id, 'admin-token-expiration', $expiration_time);
					//add_user_meta($user_id, 'admin-premium', $expiration_time);
				}

			}


			return $content;
			///Main Access Secret Key



		}

		// Get the current time
		$current_time = time();

		//Current User Id
		$user_id = get_current_user_id();

		//Expiration = 0
		$expiration_time = '';

		//Check meta expiration time
		$user_meta_expiration_time = get_user_meta($user_id, 'admin-token-expiration', true);

		//If is mainsite . If Admin Token Expired. New Users
		if (is_main_site() && is_front_page() && empty($user_meta_expiration_time)) {
			remove_filter('the_content', 'my_custom_form_callback');
			echo'<style>.hide-from{display: none;}</style>';
		}

		//If is mainsite . If Premium Expired.
		if (is_main_site() && is_front_page() && !is_super_admin()) {
			update_user_meta($user_id, 'admin-premium', $expiration_time);
			update_user_meta($user_id, 'admin-token-expiration', $expiration_time);
		}

		///Only Subsite
		if (!is_main_site()) {
			// get the current user's ID
			$user_id = get_current_user_id();
			// Remove user from current site
			remove_user_from_blog($user_id, get_current_blog_id());
		}

		return $this->get_checkout_url($attributes);

	} ///End Of Unlock::has_access



	/**
	 * Get checkout url for block
	 *
	 * @param array $attributes attributes.
	 * @param array $networks networks from configuration.
	 *
	 * @return mixed|void
	 */
	private function get_checkout_url($attributes)
	{
		$checkout_url = Unlock::get_checkout_url($attributes["locks"], get_permalink());

		$checkout_button_text = up_get_general_settings('checkout_button_text', __('Continue Here', 'unlock-protocol'));
		$checkout_button_bg_color = up_get_general_settings('checkout_button_bg_color', '#000');
		$checkout_button_text_color = up_get_general_settings('checkout_button_text_color', '#fff');
		$blurred_image_activated = wp_validate_boolean(up_get_general_settings('checkout_blurred_image_button', true));

		$template_data = array(
			'checkout_url' => $checkout_url,
			'checkout_button_text' => $checkout_button_text,
			'checkout_button_bg_color' => $checkout_button_bg_color,
			'checkout_button_text_color' => $checkout_button_text_color,
			'blurred_image_activated' => $blurred_image_activated,
		);

		// Fetching some more data if blurred image button type is activated.
		if ($blurred_image_activated) {
			$checkout_button_description = up_get_general_settings('checkout_button_description', __('Membership Access', 'unlock-protocol'));
			$checkout_bg_image = up_get_general_settings('checkout_bg_image');

			$template_data['checkout_button_description'] = $checkout_button_description;
			$template_data['checkout_bg_image'] = $checkout_bg_image;
		}

		$html_template = unlock_protocol_get_template('login/checkout-button', $template_data);

		return apply_filters('unlock_protocol_checkout_content', $html_template, $template_data);
	}
}
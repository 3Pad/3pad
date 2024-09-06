<?php

//Remove JS Code from custom html block DB before save
function sanitize_html_block_content($content)
{
	$content = preg_replace('/<script.*?\/script>/is', '', $content);  // remove <script> tags
	$content = preg_replace('/<link.*?\/link>/is', '', $content);  // remove <link> tags
	$content = preg_replace('/<object.*?\/object>/is', '', $content);  // remove <object> tags
	$content = preg_replace('/<applet.*?\/applet>/is', '', $content);  // remove <applet> tags
	$content = preg_replace('/<embed.*?\/embed>/is', '', $content);  // remove <embed> tags
	$content = preg_replace('/<meta.*?\/meta>/is', '', $content);  // remove <meta> tags
	$content = preg_replace('/<form.*?\/form>/is', '', $content);  // remove <form> tags
	$content = preg_replace('/<noembed.*?\/noembed>/is', '', $content);  // remove <noembed> tags
	$content = preg_replace('/<xmp.*?\/xmp>/is', '', $content);  // remove <xmp> tags
	$content = preg_replace('/<noframes.*?\/noframes>/is', '', $content);  // remove <noframes> tags
	$content = preg_replace('/<svg.*?\/svg>/is', '', $content);  // remove <svg> tags
	$content = preg_replace('/<base.*?\/base>/is', '', $content);  // remove <base> tags
	$content = preg_replace('/<isindex.*?\/isindex>/is', '', $content);  // remove <isindex> tags

	return $content;
}

add_filter('content_save_pre', 'sanitize_html_block_content');

///Sanitize Post Edit Page ACF
function sanitize_acf_field_value($value, $post_id, $field)
{
	$sanitized_value = $value;  // default value for $sanitized_value

	// Sanitize the field value based on its type
	if ($field['type'] === 'url') {
		$sanitized_value = esc_url_raw($value);
	}
	else
		if ($field['type'] === 'color_picker') {
			$sanitized_value = sanitize_hex_color($value);
		}
		else
			if ($field['type'] === 'number') {
				$sanitized_value = intval($value);
			}
			else
				if ($field['type'] === 'checkbox' || $field['type'] === 'select') {
					$sanitized_value = sanitize_text_field($value);
				}
				else
					if ($field['type'] === 'textarea') {
						$sanitized_value = sanitize_textarea_field($value);
					}
					else
						if ($field['type'] === 'email') {
							$sanitized_value = sanitize_email($value);
						}
						else
							if ($field['type'] === 'password') {
								$sanitized_value = sanitize_text_field($value);
							}
							else
								if ($field['type'] === 'title') {
									$sanitized_value = sanitize_text_field($value);
								}
								else
									if ($field['type'] === 'text') {
										$sanitized_value = sanitize_text_field($value);
									} else {
										$sanitized_value = sanitize_text_field($value);
									}

	// Return the sanitized value
	return $sanitized_value;
}

add_filter('acf/update_value', 'sanitize_acf_field_value', 10, 3);

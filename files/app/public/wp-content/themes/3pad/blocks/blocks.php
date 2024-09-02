<?php
/**
 * Block Widget Register
 */

function my_block_editor_script()
{
	wp_register_script(
		'my-block-editor-script',
		plugins_url('my-block-editor.js', __FILE__),
		array('wp-blocks', 'wp-element')
	);
}
add_action('init', 'my_block_editor_script');

function my_block_editor_render($attributes, $content)
{
	$title = $attributes['title'];
	$id = $attributes['id'];
	$decrypt_text = $attributes['decryptText'];

	return '
      <div class="my-block">
        <RichText
          tagName="div"
          className="encrypt_box"
          value={ title }
          onChange={ onChangeTitle }
        />
        <TextControl
          label="ID"
          value={ id }
          onChange={ onChangeID }
        />
        <TextControl
          label="Decrypt Text"
          value={ decryptText }
          onChange={ onChangeDecryptText }
        />
        <a href="javascript:decryptText(\'' . esc_attr($decrypt_text) . '\')">Show encrypted text</a>
      </div>
    ';
}
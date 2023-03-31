<?php
/**
 * Block Widget
 */

///A Gutenberg Block For Encrypted Content
function encrypted_block()
{
    acf_register_block_type(
        array(
            'name' => 'encrypted-content',
            'title' => __('Encrypted Content'),
            'description' => __('A block that outputs your encryted code'),
            'render_callback' => 'encrypt_block_template',
            'category' => 'text',
            'icon' => 'lock',
            'keywords' => array('encrypt', 'text', 'block'),
        )
    );
}
add_action('acf/init', 'encrypted_block');

///A Gutenberg Block For Bunny CDN
function bunny_cdn_block()
{
    acf_register_block_type(
        array(
            'name' => 'bunny-cdn',
            'title' => __('BunnyCDN Video/Files'),
            'description' => __('A block that outputs your bunnycdn media with token signing'),
            'render_callback' => 'bunny_embed',
            'category' => 'text',
            'icon' => 'lock',
            'keywords' => array('videos', 'media', 'block'),
        )
    );
}
add_action('acf/init', 'bunny_cdn_block');
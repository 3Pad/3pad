
<?php
ob_start();
wp_list_pages(array('title_li' => ''));
$pages_list = ob_get_clean();
$pages_list = minify_html($pages_list);
echo '<ul class="sitemap">' . $pages_list . '</ul>';

function minify_html($html)
{
    // Remove comments
    $html = preg_replace('/<!--(.|\s)*?-->/', '', $html);
    // Remove whitespace
    $html = preg_replace('/\s+/', ' ', $html);
    $html = preg_replace('/\s*(>|\/>)/', '$1', $html);
    $html = preg_replace('/(>|\/>)\s*/', '$1', $html);
    return $html;
}
?>

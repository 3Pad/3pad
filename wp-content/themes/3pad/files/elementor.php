<?php
/**
 * Elementor
 */



/******ELEMENTOR*****/
//////ELEMENTOR PAGINATION FIX
if(!is_admin()){ /////FRONTEND
function pre_handle_404($preempt, $wp_query)
{
    if (isset($wp_query->query['page']) && $wp_query->query['page']) {
        return true;
    }

    return $preempt;
}
add_filter( 'pre_handle_404', 'pre_handle_404', 10, 2 );
}/////FRONTEND
//////ELEMENTOR PAGINATION FIX

/******ELEMENTOR*****/


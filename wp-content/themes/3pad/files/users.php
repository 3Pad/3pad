<?php

/**
 * Users
 */

/******USERS*****/
//////////////Hide Admin From List
if (is_admin()) {
  function isa_pre_user_query($user_search)
  {
    if (!is_admin()) {
      $user = wp_get_current_user();

      //if (!current_user_can('administrator')) { // Is Not Administrator - Remove Administrator
      global $wpdb;

      $user_ID = get_current_user_id();
      $user_search->query_where =
        str_replace(
          'WHERE 1=1',
          "WHERE 1=1 AND {$wpdb->users}.ID IN (
                 SELECT {$wpdb->usermeta}.user_id FROM $wpdb->usermeta 
                    WHERE {$wpdb->usermeta}.meta_key = '{$wpdb->prefix}capabilities'
                    AND {$wpdb->usermeta}.meta_value NOT LIKE '%administrator%')",
          $user_search->query_where
        );
      //}
    }
  }

  add_action('pre_user_query', 'isa_pre_user_query');
}
//////////////Hide Admin From List
///Admin Dashboard Close

////////////////////////////////End user session////////////////////////////////////
//Limit subscriber to have only ONE session at a time.
function check_user_other_sessions()
{
  //Get current user who is logged in
  $user = wp_get_current_user();

  //Check if user's role is admin
  if (is_user_logged_in() && current_user_can('subscriber')) {
    //Get current user's session
    $sessions = WP_Session_Tokens::get_instance($user->ID);

    //Get all his active wordpress sessions
    $all_sessions = $sessions->get_all();

    //If there is more than one session then destroy all other sessions except the current session.
    if (count($all_sessions) > 1) {
      $sessions->destroy_others(wp_get_session_token());
    }
  }
}

add_action("init", "check_user_other_sessions", 99);
////////////////////////////////End user session////////////////////////////////////

///////////////// Add role option theme customize

///////Subscriber
$subscriber = get_role('subscriber');
$subscriber->remove_cap('upload_files');
$subscriber->remove_cap('edit_pages');
$subscriber->add_cap('edit_published_pages');
$subscriber->remove_cap('edit_others_pages');
$subscriber->remove_cap('create_pages');

///////////////// Add role option theme customize

/******USERS*****/

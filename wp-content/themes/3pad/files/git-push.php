<?php

########### Main SIte

function ssp_run_static_export_cron()
{
    // Full static export
    $simply_static = Simply_Static\Plugin::instance();
    $simply_static->run_static_export();
}

add_action('ssp_run_static_export_cron_five_minute', 'ssp_run_static_export_cron');

///Cron Trigger Sub Sites
function ssp_delay_static_export()
{
    // Check if there is an existing scheduled event for this function
    $scheduled_event = wp_next_scheduled('ssp_run_static_export_cron_five_minute');
    if ($scheduled_event) {
        // If there is a scheduled event, cancel it to prevent duplicate events
        wp_unschedule_event($scheduled_event, 'ssp_run_static_export_cron_five_minute');
    }
    // Schedule the function to run * from now (Seconds)
    wp_schedule_single_event(time() + GIT_PUSH_SECONDS, 'ssp_run_static_export_cron_five_minute');
}

add_action('acf/save_post', 'ssp_delay_static_export');

////////// Minute Cron Save Post

//ss_get_options
//You can use this filter to modify the Simply Static settings array. Useful if you want to change certain options temporarily. A use case for that could be changing the export directory based on the language you are currently selected. It’s used to make the multilingual integration in Simply Static Pro:

///WP Static Site Settings
add_filter('ss_get_options', function ($options) {
    //Get Site Id
    $site_url  = get_site_url();
    $site_path = parse_url($site_url, PHP_URL_PATH);

    $site_id = get_current_blog_id();

    if (is_main_site()) {
        $options['github-branch']                 = 'main';
        $options['clear_directory_before_export'] = 'off';
        $options['local_dir']                     = IPFS_PATH;
        $options['temp_files_dir']                = TEMP_PATH;
        $options['destination_url_type']          = 'offline';
        $options['delivery_method']               = 'local';
    }

    if (!is_main_site()) {
        $options['local_dir']                     = IPFS_PATH . $site_path . '/';
        $options['use_cron']                      = 'off';
        $options['clear_directory_before_export'] = 'off';
        $options['debugging_mode']                = '0';
        $options['destination_url_type']          = 'offline';
        $options['delivery_method']               = 'local';
    }

    if (!is_main_site()) {
        $options['temp_files_dir'] = TEMP_PATH;
    }

    if (!is_main_site() && file_exists($options['local_dir'])) {
        $options['clear_directory_before_export'] = 'on';
    }

    return $options;
});

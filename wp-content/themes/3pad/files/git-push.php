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
    $event_hook      = 'ssp_run_static_export_cron_five_minute';
    $scheduled_event = wp_next_scheduled($event_hook);

    // If there is a scheduled event, do not schedule a new one
    if ($scheduled_event) {
        return;
    }

    // Schedule the function to run after GIT_PUSH_SECONDS seconds
    wp_schedule_single_event(time() + GIT_PUSH_SECONDS, $event_hook);
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

    $options['github-branch']                 = 'main';
    $options['clear_directory_before_export'] = 'off';
    $options['local_dir']                     = IPFS_PATH;
    $options['temp_files_dir']                = TEMP_PATH;
    $options['destination_url_type']          = 'offline';
    $options['delivery_method']               = 'local';

    return $options;
});

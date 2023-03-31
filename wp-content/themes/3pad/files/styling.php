<?php

///Super ADmin dont display styling

/**
 * Styling
 */

//REMOVE GUTENBERG BLOCK LIBRARY CSS FROM LOADING ON FRONT PAGES
function remove_wp_block_library_css()
{
  if (is_front_page()) {
    wp_dequeue_style('wp-block-library');
    wp_dequeue_style('wp-block-library-theme');
    wp_dequeue_style('wc-block-style');  // REMOVE WOOCOMMERCE BLOCK CSS
    wp_dequeue_style('global-styles');  // REMOVE THEME.JSON

    wp_deregister_style('classic-theme-styles');
    wp_dequeue_style('classic-theme-styles');
  }
}

add_action('wp_enqueue_scripts', 'remove_wp_block_library_css', 100);

//////////////////////////////Password Protected CSS///////////////////////////////////
function my_custom_password_form()
{
  if (is_page()) {  //Private Page
    global $post;
    $label  = 'pwbox-' . (empty($post->ID) ? rand() : $post->ID);
    $output = '
		<div class="secretlogin">
				<form action="' . esc_url(site_url('wp-login.php?action=postpass', 'login_post')) . '" class="form-inline post-password-form" method="post">
					<p>' . __('This session is resereved for our VIP members . To view it please enter your password below') . '</p>
					<label style="display: grid;" for="' . $label . '">' . __('') . ' <input name="post_password" id="' . $label . '" type="password" size="20" class="form-control" /></label><button style=" width: 100%; padding: 5px; margin-top: 9px; background: black; border: none; border-radius: 10px; color: white; font-family: inherit; font-weight: bold; text-transform: uppercase; box-shadow: -2px -1px 20px 0px #fd30f2; " type="submit" name="Submit" class="button-primary">' . esc_attr_x('Enter', 'post password form') . '</button>			
		</form>
				</div>';

    return $output;
  }
}

add_filter('the_password_form', 'my_custom_password_form', 99);
//////////////////////////////Password Protected CSS///////////////////////////////////

/////////Custom CSS for admin area
add_action('admin_head', 'my_custom_style');

function my_custom_style()
{
  if (!is_super_admin()) {
    echo '
            <style>
              body, td, textarea, input, select {
                font-family: system-ui;
                font-size: 13px;
                color: #000;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              } 

              * {
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }

              /*. Pages List */

              .subsubsub a{
                color: white;
              }

              table.fixed{
                background: #00000030;
                border: none;
                border-radius: 10px;
              }
              .wp-list-table a, .eaba-ddc--ae-fedadead-1n1x27z{
                color: white;
              }
              .widefat td, .widefat th{
                color: white !important;
              }
              #adminmenu{
                background-color: #1d232700;
              }
              #adminmenuwrap{
                  margin: 5px 0px 0px 5px;
              border-radius: 20px;
              background-color: #0000;
              }
              .auto-fold #adminmenu {
                  margin: 5px 0px 0px 0px;
                  border-radius: 20px;
                  background-color: #00000063;
                  backdrop-filter: blur(50px);
            -webkit-backdrop-filter: blur(50px);
              }
          

          #adminmenuback{
              bottom: inherit;
          }
          .postbox{
              border: none;
              background: #ffffff17;
              box-shadow: none;
              border-radius: 10px;
              margin: 10px;
              color: white;
              padding: 10px;
              min-width: 220px;
          }

          .postbox-header .hndle, .editor-styles-wrapper p, .wp-block-post-title, .components-tip p, .editor-post-url__link{
            color:white;
          }
          .postbox .handle-order-higher, .postbox .handle-order-lower{
            color: white;
          }.acf-block-component .acf-block-fields p, .components-toolbar-group .components-button.components-button svg, .components-toolbar-group .components-button.has-icon.has-icon svg, .edit-post-visual-editor .components-button, body > div.components-modal__screen-overlay > div > div > div.components-guide__container > div.components-guide__page > p, .components-modal__content > div:nth-child(3) > p:nth-child(1), .components-modal__content > div:nth-child(3) > p:nth-child(2), a.is-tertiary:nth-child(1), span.components-truncate, .ccbdb-cb--d-eafdccbfb-14izjh7 > button:nth-child(1){
            color: black;
          }
          .wp-first-item{
            border-radius: 10px;
          }
          .postbox-header{
              border: none;
              background: #ffffff2b;
              border-radius: 10px;

          }
          .block-editor-default-block-appender .block-editor-inserter__toggle.components-button.has-icon{
            background: #007cba;
          }
          #editor .postbox{
            color: white;
            margin-bottom: 10px;
          }
          .acf-block-component .acf-block-fields{
            background: #c6c6c670;
            border-radius: 10px;
          }
          .acf-field.acf-accordion .acf-label.acf-accordion-title{
            background: #00000030;
            border-radius: 10px;
            margin: 10px 0px;
          }
          .wp-core-ui .notice.is-dismissible {
            padding-right: 38px;
            position: relative;
            background: #00000038 !important;
            box-shadow: 1px -1px 20px 0px #ffffff8c;
        }

        .wp-core-ui .notice.is-dismissible p{
          text-align: center;
          color: white;
          text-transform: uppercase;
          font-weight: bolder;
        }

        .wp-core-ui .notice.is-dismissible p::before{
          content: "🆗 👍 ✅ ";
        }

        .wp-core-ui .notice.is-dismissible p::after{
          content: " It may take some time to see changes reflected for visitors. 🆗 👍 ✅";
        }

          .block-editor .edit-post-sidebar .acf-fields > .acf-field.acf-accordion .acf-accordion-title label, .components-button.is-tertiary, .ded-f-d-aee-abe-1n1x27z, .wp-block-image figcaption, .components-font-size-picker__header__hint, .wp-block-embed figcaption, .interface-complementary-area, .block-editor-block-types-list__item-title, .block-editor-block-icon.has-colors svg, .components-dropdown__content [role="menuitem"], .interface-complementary-area h2, .block-editor-block-styles__variants .block-editor-block-styles__item, .components-button, .components-panel__body-toggle.components-button, .block-editor-list-view-leaf .block-editor-list-view-block-contents, .interface-interface-skeleton__secondary-sidebar, .form-table th, span.description, .wrap h1.wp-heading-inline, .tablenav .one-page .displaying-num, .subsubsub a.current, .subsubsub a .count, .subsubsub a.current .count, .subsubsub, .block-editor-tool-selector__help, .editor-post-saved-state.is-saved[aria-disabled="true"], .editor-post-saved-state.is-saved[aria-disabled="true"]:hover, .editor-post-saved-state.is-saving[aria-disabled="true"], .editor-post-saved-state.is-saving[aria-disabled="true"]:hover, .block-editor-block-breadcrumb__current, .toggle-indicator, .components-menu-item__info, .components-menu-group__label, .acf-block-component .acf-block-fields, .plugins .desc p, .wp-die-message, p, .update-core-php h2, td.column-title p, td.plugin-title p, .postbox .inside h2, .wrap [class$=icon32]+h2, .wrap h1, .wrap>h2:first-child, .plugins .notice p, .components-popover__header-title, .form-table td p, .form-table td fieldset label, .form-table label, .sui-2-12-13 .sui-wrap .sui-row-with-sidenav .sui-sidenav .sui-vertical-tabs a, .sui-2-12-13 .sui-wrap .sui-header h1, input:disabled, .docs a, .editor-post-visibility__fieldset .editor-post-visibility__info, label, .components-truncate, .burst-wizard-help .burst-help-header, #collapse-button .collapse-button-label, #adminmenu *, h2.components-truncate, span.components-truncate, .editor-post-url__link-label, div.components-v-stack:nth-child(2), h3.components-truncate, .interface-complementary-area p:not(.components-base-control__help), .components-button.is-small, .editor-post-publish-panel__prepublish strong, #editor > div > div.edit-post-layout.is-mode-visual.is-sidebar-opened.has-metaboxes.interface-interface-skeleton.has-footer > div.interface-interface-skeleton__editor > div.interface-interface-skeleton__body > div.interface-interface-skeleton__actions > div:nth-child(2) > div > div > div.editor-post-publish-panel__content > div > div.components-site-card > div, #editor > div > div.edit-post-layout.is-mode-visual.is-sidebar-opened.has-metaboxes.interface-interface-skeleton.has-footer > div.interface-interface-skeleton__editor > div.interface-interface-skeleton__body > div.interface-interface-skeleton__actions > div:nth-child(2) > div > div > div.editor-post-publish-panel__content > div > div.components-site-card > div > span.components-site-home, .order-higher-indicator, .order-lower-indicator, .qe-help-and-support-bg-main, .qeappspwa-tab a, .qeappspwa-tab a.active, .input-accs, .post-publish-panel__postpublish .components-panel__body{
            color: white;
          }
          
          .block-editor-block-list__layout .block-editor-block-list__block:not([contenteditable]):focus::after{
            box-shadow: 0 0 0 var(--wp-admin-border-width-focus) #fff;
          }

          #editor .postbox > .postbox-header:hover{
            background: inherit;
          }
          .components-notice.is-warning{
            background-color: #fffb00ba;
          }

          .block-editor .edit-post-sidebar .acf-fields > .acf-field.acf-accordion{
            border: none;
            margin-bottom: 10px;
          }
          .block-editor-inserter__panel-title, .block-editor-inserter__panel-title button{
            color: white;
          }

          .acf-accordion .acf-accordion-title svg.acf-accordion-icon{
            color: white;
          }
          .components-base-control__help {
            color: white !important;
          }

          .acf-fields{
            border: none !important;
          }
          #adminmenu a.menu-top{
              font-size: 12px;
          }
          .wp-submenu.wp-submenu-wrap, .block-editor-media-placeholder__url-input-container .block-editor-media-placeholder__button{
              background: black !important;
          }
          #adminmenu .wp-has-current-submenu .wp-submenu, #adminmenu .wp-has-current-submenu .wp-submenu.sub-open, #adminmenu .wp-has-current-submenu.opensub .wp-submenu, #adminmenu a.wp-has-current-submenu:focus+.wp-submenu, .no-js li.wp-has-current-submenu:hover .wp-submenu, .block-editor-block-inspector__no-blocks {
            background-color: #00000000;
          }
          
          #wpadminbar {
            background: #00000000 !important;
            background-image: none;
            background-size: auto;
          background-blend-mode: unset;
          background-size: cover;
          position: fixed;
        }
       
          a {color: #135979; font-weight: 600; }
          .welcome-panel {background: #7fb97f;}
          .welcome-panel a{color: #fff;}

          .wrap h1.wp-heading-inline{
              font-weight: 900;
              text-transform: uppercase;
          }
          .fixed .column-comments{
              display: none;
          }
          .components-popover.block-editor-block-popover:not(.block-editor-block-popover__inbetween,.block-editor-block-list__block-side-inserter-popover) .components-popover__content *, .burst div[class^=burst-wizard-] .burst-grid-item-content label{
            color: black;
          }
          .alternate, .striped>tbody>:nth-child(odd), ul.striped>:nth-child(odd) {
          background-color: inherit;
          }
          .wrap .wp-heading-inline+.page-title-action{
              display: none !important;
          }
          .wp-core-ui .button, .wp-core-ui .button-secondary{
              color: #ffffff;
              background: #000000;
              border: none;
              box-shadow: 1px -1px 20px 0px #00000059;
          }
          .components-panel__body {
              border: none !important;
          }
          h1 {
            font-weight: 900 !important;
              text-transform: uppercase;
          }
          #major-publishing-actions{
            border-radius: 10px;
            border-top: 0;
          }
          .bg-image {
            position: fixed;
            width: 100vw;
            height: 103vh;
            overflow: hidden;
            background-color: #1a1a1a;
            top: -2px;
            filter: saturate(1.8);
            -webkit-filter: saturate(1.8);
          }
          
          .blue_bg {
            position: absolute;
            top: -5%;
            right: -5%;
            background-image: linear-gradient(
              to right top,
              #051937,
              #004d7a,
              #008793,
              #00bf72,
              #a8eb12
            );
            width: 30vw;
            height: 10vw;
            border-radius: 50%;
            animation: spin 10s linear infinite;
            z-index: 1;
          }
          
          .green_bg {
            position: absolute;
            top: 50%;
            right: -20%;
            background-image: linear-gradient(to right, #43e97b 0%, #38f9d7 100%);
            width: 30vw;
            height: 40vw;
            border-radius: 100px;
            animation: spinReverse 20s linear infinite;
            z-index: 10;
          }
          
          .red_bg {
            position: absolute;
            top: 5%;
            left: 5%;
            background-image: linear-gradient(to right, #fa709a 0%, #fee140 100%);
            width: 20vh;
            height: 65vw;
            border-radius: 100px;
            animation: spin 35s linear infinite;
            z-index: 5;
          }
          
          .red2 {
            position: absolute;
            bottom: 0%;
            left: 30%;
            background-image: linear-gradient(
              to right,
              #b8cbb8 0%,
              #b8cbb8 0%,
              #b465da 0%,
              #cf6cc9 33%,
              #ee609c 66%,
              #ee609c 100%
            );
            width: 100vh;
            height: 35vh;
            border-radius: 100px;
            animation: spin 20s linear infinite;
            z-index: 5;
          }
          
          .yellow_bg {
            position: absolute;
            top: 50%;
            left: -10%;
            background-image: linear-gradient(to top, #96fbc4 0%, blue 100%);
            width: 60vh;
            height: 40vh;
            border-radius: 100px;
            animation: spinReverse 45s linear infinite;
            z-index: 10;
          }
          
          .blur {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 50;
            backdrop-filter: blur(60px);
            -webkit-backdrop-filter: blur(60px);
          }
          
          
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          
          @keyframes spinReverse {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(-360deg);
            }
          }
          

          #wp-admin-bar-new-post, #wp-admin-bar-comments{
            display: none;
          }
          
          .acf-field.acf-accordion{
            border-color: #00000003;
            background: #0000;
          }
          .acf-fields > .acf-field{
            border-top-color: #99353500;
            border-bottom: #99353500;
            
          }
          .acf-field p.description{
            color: #fff;
            background: #14141478;
            border-radius: 10px;
            padding: 10px;
          }

          .acf-field .acf-label label{
            font-weight: 600;
          }

          .components-button:hover{
            background: #ffffff6b;
            color: black;
          }
          .edit-post-meta-boxes-area .postbox-header{
            margin-bottom: 10px;
          }
          .components-button.is-destructive {
            background: #ff3b3b;
            color: black;
            font-weight: bold;
          }
          
          .interface-interface-skeleton__footer, .interface-interface-skeleton__header, .edit-post-meta-boxes-area .postbox-header{
            border: none;
          }
          .components-panel__header.edit-post-sidebar__panel-tabs, .components-modal__content.hide-header{
            background: black;
          }

          td, #major-publishing-actions, .interface-interface-skeleton__footer, .block-editor-block-breadcrumb, .edit-post-layout__footer, .edit-post-visual-editor, .is-desktop-preview, .editor-styles-wrapper, .components-panel, .edit-post-header, .interface-complementary-area, .edit-post-text-editor, .notice, div.error, div.updated{
            background: #0000 !important;
          }
          .interface-interface-skeleton__sidebar, .interface-interface-skeleton__secondary-sidebar, .interface-complementary-area-header, .components-popover__content, .components-panel__header.interface-complementary-area-header__small, .components-popover__header, .plugins tr, .comment-ays, .feature-filter, .imgedit-group, .popular-tags, .stuffbox, .widgets-holder-wrap, .wp-editor-container, p.popular-tags, table.widefat, .plugin-update-tr.active td, .plugins .active th.check-column, .post-type-acf-field-group .notice.notice-success, .edit-post-layout .editor-post-publish-panel, .editor-post-publish-panel__header, .components-panel__body>.components-panel__body-title, .editor-post-publish-panel__prepublish .components-panel__body, .left-tab-bg-main-floter .form-table, #qeappspwa-status-section .block, .qe-help-and-support-bg-main, .qeappspwa-tab, #sistContainer #settingsPage{
            background: #00000029;
            backdrop-filter: blur(50px);
            -webkit-backdrop-filter: blur(50px);
            border: none;
            border-radius: 10px;
          }
          .editor-styles-wrapper{
            margin: 10px;
          }
          .title-hdng{
            background: #4a93ce00;
          }
          .components-popover.block-editor-block-popover:not(.block-editor-block-popover__inbetween, .block-editor-block-list__block-side-inserter-popover) .components-popover__content *{
            margin: 0;
          }
          .notice-success, div.updated {
            border-radius: 10px;
            filter: drop-shadow(0px 0px 9px #00000073);
          }
          .notice-warning.notice-alt {
            background-color: #ffffff87;
        }
          
          #publishing-action, #publish{
            width: 100%;
          }
          .encrypt_box{
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: grey;
            background-position: center;
            background-size: cover;
            height: 150px;
          }
          .wp-block-acf-bunny-cdn > div > div > .acf-block-preview {
            background: black;
            border-radius: 10px;
            text-align: center;
          }
          .wp-block-acf-bunny-cdn > div > div > .acf-block-preview::before {
            content: "Bunny CDN Embed";
            color: white;
            font-weight: 900;
          }
          .wrap h1{
            text-align: center;
          }
 
        div#preview-bt {
          width: 100%;
          text-align: center;
          background: cadetblue;
          margin-top: 8px;
        }
        #wpbody-content > table:nth-child(21) > tbody > tr.user-sessions-wrap.hide-if-no-js > td > p{
          color: white;
        }
        .css-kfhu3b{
          border: none !important;
        }
        @media only screen and (min-width: 850px) {
        img.instructions{
          width: 50% !important;
        }
        #major-publishing-actions.sticky {
          position: fixed;
          top: 54px;
          z-index: 9;
          min-width: 20em !important;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
      }
    }
      
      #wpadminbar.sticky{
        backdrop-filter: blur(50px);
      -webkit-backdrop-filter: blur(50px);
      background-color: #00000054 !important;
        }
      

      #major-publishing-actions.sticky {
        position: fixed;
        top: 54px;
        z-index: 9;
        min-width: 84vw;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    }

    /* Help */
        .help-button-wrapper {
          position: fixed;
          bottom: 1em;
          right: 1em;
          text-align: right;
          z-index: 9;
        }
        .help-button-wrapper.expanded{
          z-index: 9999;
        }
        .help-button {
          height: 40px;
          width: 90px;
          font-size: 14px;
          border-radius: 10px;
          border: 0 none;
          background: #000;
          color: #fff;
          cursor: pointer;
          box-shadow: 0 2px 11px 5px #ffffff30;
          transform: scale(1);
          transition: all 200ms ease;
        }
        .help-button:hover,
        .help-button:focus,
        .help-button:active {
          box-shadow: 0 2px 11px 5px #ffffff30;
          outline: 0;
        }
        .help-button span {
          display: block;
          font-size: 2em;
          transform: scale(1);
          transition: transform 100ms ease;
        }
        .help-button:hover span,
        .expanded .help-button span,
        .expanded .help-button span {
          transform: scale(1.25);
        }
        .expanded .help-button {
          color: white;
        background: #000000;
        z-index: 999;
        }
        .expanded .help-button::before{
          content: "❌";
        }
        .help-list {
          overflow:scroll;
          list-style: none;
          margin: 0;
          transition: all 200ms ease;
          transform: translate(0, 90px) scale(0.5);
          transform-origin: bottom center;
          opacity: 0;
          height: 0;
        }
        .expanded .help-list {
          height: 400px;
          transform: translate(0px, 20px) scale(1);
          opacity: 1;
          padding: 20px;
          border-radius: 10px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          background: #00000091;
        box-shadow: -1px 1px 10px black;
        }
        .help-list li {
          margin-bottom: 1em;
        }
        .help-list a {
          color: #212121;
        }

        /* Web App */
        .left-tab-bg-main-floter{
          width: 95%;
        }

        /* Lit Protocol 
        .js-select-link, #btn-lit-submit, .lit-btn-select-link-row{
          width: fit-content !important;
        }
        #shareModal{
          max-width: 26em;
        }

        .lit-table-header .lit-table-col{
          display: table-cell;
        }

        .lit-table-col__id span{
          color: #fff;
          background: black;
          padding: 10px;
          border-radius: 10px;
          font-weight: bold;
        }

        #btn-lit-submit{
          float: left;
        }

        #btn-lit-add-row, .lit-btn-create-requirement{
          margin-left: revert;
        }

        .lsm-single-condition-multiple-button p{
          color: black;
        }

        .lit-humanised{
          word-wrap: break-word;
        }

        .lit-table-col__path .lit-btn-select-link{
          width: 50vw;
          word-wrap: break-word;
          text-align: center;
        }
        .lit-logo section{
          display: table;
        }

        .lit-table-right{
          justify-content: flex-end;
          display: contents;
        }

        .lit-table-row, .lit-table-col__path{
          display: block;
        }

        div.lit-table{
          display: block ;
        }

        #wp-link #link-options label span, #wp-link .link-target label, #wp-link #search-panel label span.search-label{
          color: black;
        }

        #link-modal-title{
          color: black !important;
          font-size: 20px !important;
        }
        */
            </style>';
  }
}

/////////Custom CSS for admin area

///////////////Admin Custom Css Hide
add_action('admin_head', 'my_custom_fonts');

function my_custom_fonts()
{
  if (is_admin() && !is_super_admin()) {
    echo '<style>
              .resetpassword, .view, tr.user-description-wrap, .user-url-wrap,.user-profile-picture, 
              .nav-tab-wrapper, #taxonomy-elementor_library_category, .user-email-wrap, #acf-group_63193edd9e74d, #wpfooter,
              .uip-display-block, #toplevel_page_uip-overview, .uip-position-relative,
                label[for=comments_notify],label[for=moderation_notify],label[for=comment_order],label[for=default_comments_page],
                label[for=require_name_email], #uip-toolbar-content > div > div:nth-child(4) > div, #uip-toolbar-content > div > div:nth-child(2) > div > span,
                #elementor-switch-mode-button, #elementor-editor,
                #elementor-import-template-trigger .components-panel__body-toggle.components-button, #__wp-uploader-id-2, .supports-drag-drop, .block-editor-media-replace-flow__media-upload-menu, .color-option, label[for=comment_shortcuts],label[for=admin_bar_front], #screen-meta-links, .user-first-name-wrap, .user-last-name-wrap, #wpbody-content > h2:nth-child(20), #wpbody-content > h2:nth-child(18), #publishing-action .spinner, #wp-admin-bar-comments, .search-box, #burst-statistics > div > div.burst-content-area.burst-grid.burst-settings > div.burst-wizard-settings.burst-column-2 > div.burst-grid-item.burst-advanced > div.burst-grid-item-content > div:nth-child(1), .burst-tips-tricks, .burst-other-plugins, .button.button-black, .shepherd-element, .submitdelete, #wpbody-content > h2:nth-child(16), #wp-admin-bar-new-content, #wpbody-content > h2:nth-child(19), #wpbody-content > h2:nth-child(21), #wpbody-content > h2:nth-child(17), .components-site-icon, .right-tbl-text-main, .qeappspwa-right, #qeappspwa-section-three > table > tbody > tr:nth-child(1) > td > button, #qeappspwa-section-two > table > tbody > tr:nth-child(7), #qeappspwa-section-two > table > tbody > tr:nth-child(8) {
                  display:none !important;
              }
                  
                  </style>
            ';
  }
}
///////////////Admin Custom Css Hide

//Add Bg-Image
function add_bg_image_div()
{
  if (is_admin() && !is_super_admin()) {
    echo '<div class="bg-image">
    <div class="blur"></div>
    <div class="yellow_bg"></div>
    <div class="red_bg"></div>
    <div class="green_bg"></div>
    <div class="blue_bg"></div>
    <div class="red2"></div>
  </div>';
  }
}

add_action('admin_head', 'add_bg_image_div');

//Add Help Videos
function add_help_videos()
{
  if (is_admin() && !is_super_admin()) {
    echo '
    <div class="help-button-wrapper">
    <ul class="help-list">
      <li>
        <iframe loading="lazy" src="https://e.widgetbot.io/channels/1061496413474783352/1067294783153901588"
          height="300" width="100%"></iframe>
      </li>
      <li>
        <iframe loading="lazy" width="100%" src="https://www.youtube-nocookie.com/embed/5C7b_eqG0SY?vq=hd1080&rel=0"
          title="YouTube video player" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen></iframe>
      </li>
      <li>
        <iframe loading="lazy" data-tally-src="https://tally.so/embed/npeq51?alignLeft=1&transparentBackground=1&dynamicHeight=1" loading="lazy"
          width="100%" height="300" frameborder="0" marginheight="0" marginwidth="0" title="Bug Report"></iframe>
      </li>
    </ul>
    <script defer src="https://tally.so/widgets/embed.js"></script>
    <button class="help-button">
      👋 Help
    </button>
  </div>
  ';
  }
}

add_action('admin_head', 'add_help_videos', 100);

///Help Button Js
function help_js()
{
  if (is_admin() && !is_super_admin()) {
    echo " <script defer>
      jQuery(document).ready(function($){
        $('.help-button').on('click', function() {
          $('.help-button-wrapper').toggleClass('expanded');
        });
        });

        jQuery(document).ready(function($){
          $(window).scroll(function(){
              if($(this).scrollTop() > 10){
                  $('#wpadminbar').addClass('sticky');
              }
              else{
                  $('#wpadminbar').removeClass('sticky');
              }
          });
      });
        </script>
        ";
  }
}

add_action('admin_footer', 'help_js');

////Preview Button on home page customization
function my_custom_js()
{
  if (is_admin() && !is_super_admin()) {
    $site_url = get_site_url();
    $random   = wp_rand();

    echo "
            <script defer>
                jQuery(document).ready(function ($) {
                  $('#publishing-action').after('<a href=\"" . $site_url . '/?customize-home=' . $random . "\" target=\"_blank\"><div class=\'button button-primary button-large\' id=\'preview-bt\'>Preview</div></a>');
              
                });
            </script>
            <script defer>
jQuery(document).ready(function($){
    $(window).scroll(function(){
        if($(this).scrollTop() > 100){
            $('#major-publishing-actions').addClass('sticky');
        }
        else{
            $('#major-publishing-actions').removeClass('sticky');
        }
    });
});
</script>
        ";
  }
}

add_action('admin_footer', 'my_custom_js');

//Remove Dashboard Dropdown
function custom_dashboard_url($wp_admin_bar)
{
  // Remove the default "Dashboard" menu item
  $wp_admin_bar->remove_menu('dashboard');
}

add_action('admin_bar_menu', 'custom_dashboard_url', 999);

//Hide New Page For Non Premium
add_action('admin_bar_menu', 'remove_add_new_page', 999);

function remove_add_new_page($wp_admin_bar)
{
  // Check for the user's wp-admin-token-expiration meta field
  $user_id = get_current_user_id();

  // Get the current time & meta
  $current_time              = time();
  $user_meta_expiration_time = get_user_meta($user_id, 'admin-premium', true);

  // The user meta field is not valid (premium), deny access to the admin page...
  if ($user_meta_expiration_time < $current_time && !is_super_admin()) {
    // Remove the "Add New" menu item
    $wp_admin_bar->remove_node('new-content');
  }
}

function quick_styling()
{
  if (!is_front_page()) {
    echo '<style>.altmenu{ display: none;}</style>
  ';
  }
}

add_action('wp_head', 'quick_styling');

////// Super Admin Hide Dont add code below this

// Hide My Sites From Admin Bar
function hide_my_sites_admin_bar()
{
  // Only hide the "My Sites" menu for non-super admins who have the "author" role
  if (!is_super_admin() && current_user_can('author')) {
    // Echo a style element that sets the display property of the "My Sites" menu to "none"
    echo '<style>#wp-admin-bar-my-sites{display: none !important;}</style>';
  }
}

// Add the "hide_my_sites_admin_bar" function to the "wp_head" and "admin_head" actions
add_action('wp_head', 'hide_my_sites_admin_bar');
add_action('admin_head', 'hide_my_sites_admin_bar');

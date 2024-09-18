<?php
/**
 * Widget
 */



/******WIDGET*****/
/////////// Adds widget: Page Lock
class PageLock_Widget extends WP_Widget
{
    // Register widget with WordPress
    function __construct()
    {
        parent::__construct(
            "pagelock_widget",
            esc_html__("Page Lock", "textdomain")
        );
    }

    // Widget fields
    private $widget_fields = [
        [
            "label" => "Enter Page URL",
            "id" => "1",
            "type" => "text",
        ],
    ];

    // Frontend display of widget
    public function widget($args, $instance)
    {
        echo $args["before_widget"];

        // Output generated fields
        echo '<div id="wrapped"><iframe seamless="" src="' .
            $instance["1"] .
            '" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" loading="lazy"></div>
    Your browser does not support iframes
</iframe>';

        echo $args["after_widget"];
    }
    // Back-end widget fields
    public function field_generator($instance)
    {
        $output = "";
        foreach ($this->widget_fields as $widget_field) {
            $default = "";
            if (isset($widget_field["default"])) {
                $default = $widget_field["default"];
            }
            $widget_value = !empty($instance[$widget_field["id"]])
                ? $instance[$widget_field["id"]]
                : esc_html__($default, "textdomain");
            switch ($widget_field["type"]) {
                default:
                    $output .= "<p>";
                    $output .=
                        '<label for="' .
                        esc_attr($this->get_field_id($widget_field["id"])) .
                        '">' .
                        esc_attr($widget_field["label"], "textdomain") .
                        ":</label> ";
                    $output .=
                        '<input class="widefat" id="' .
                        esc_attr($this->get_field_id($widget_field["id"])) .
                        '" name="' .
                        esc_attr($this->get_field_name($widget_field["id"])) .
                        '" type="' .
                        $widget_field["type"] .
                        '" value="' .
                        esc_attr($widget_value) .
                        '">';
                    $output .= "</p>";
            }
        }
        echo $output;
    }

    public function form($instance)
    {
        $title = !empty($instance["title"])
            ? $instance["title"]
            : esc_html__("", "textdomain"); ?>
		<p>
			<label for="<?php echo esc_attr(
       $this->get_field_id("title")
   ); ?>"><?php esc_attr_e("Title:", "textdomain"); ?></label>
			<input class="widefat" id="<?php echo esc_attr(
       $this->get_field_id("title")
   ); ?>" name="<?php echo esc_attr($this->get_field_name("title")); ?>" type="text" value="<?php echo esc_attr($title); ?>">
		</p>
		<?php $this->field_generator($instance);
    }

    // Sanitize widget form values as they are saved
    public function update($new_instance, $old_instance)
    {
        $instance = [];
        $instance["title"] = !empty($new_instance["title"])
            ? strip_tags($new_instance["title"])
            : "";
        foreach ($this->widget_fields as $widget_field) {
            switch ($widget_field["type"]) {
                default:
                    $instance[$widget_field["id"]] = !empty(
                        $new_instance[$widget_field["id"]]
                    )
                        ? strip_tags($new_instance[$widget_field["id"]])
                        : "";
            }
        }
        return $instance;
    }
}

function register_PageLock_widget()
{
    register_widget("PageLock_Widget");
}
add_action("widgets_init", "register_PageLock_widget");
/////////// Adds widget: Page Lock

/******WIDGET*****/


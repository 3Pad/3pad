const Vr = function() {
  var r;
  return typeof process < "u" && ((r = process.release) == null ? void 0 : r.name) === "node" ? "NODE" : typeof window < "u" ? "WEB" : (
    // @ts-ignore
    typeof WorkerGlobalScope < "u" && // @ts-ignore
    self instanceof WorkerGlobalScope ? "WORKER" : "NODE"
  );
}();
if (Vr === "NODE") {
  let r = function(o) {
    return new Promise(function(p, l) {
      o.onload = o.onerror = function(i) {
        o.onload = o.onerror = null, i.type === "load" ? p(o.result) : l(new Error("Failed to read the blob/file"));
      };
    });
  }, t = function() {
    const o = new Uint8Array([1, 2, 3, 4]), l = new File([o], "test").stream();
    try {
      return l.getReader({ mode: "byob" }), !0;
    } catch {
      return !1;
    }
  };
  if (typeof File > "u") {
    class o extends Blob {
      constructor(l, i, e) {
        super(l);
        let f;
        e != null && e.lastModified && (f = /* @__PURE__ */ new Date()), (!f || isNaN(f.getFullYear())) && (f = /* @__PURE__ */ new Date()), this.lastModifiedDate = f, this.lastModified = f.getMilliseconds(), this.name = i || "";
      }
    }
    global.File = o;
  }
  typeof Blob.prototype.arrayBuffer > "u" && (Blob.prototype.arrayBuffer = function() {
    const p = new FileReader();
    return p.readAsArrayBuffer(this), r(p);
  }), typeof Blob.prototype.text > "u" && (Blob.prototype.text = function() {
    const p = new FileReader();
    return p.readAsText(this), r(p);
  }), (typeof Blob.prototype.stream > "u" || !t()) && (Blob.prototype.stream = function() {
    let o = 0;
    const p = this;
    return new ReadableStream({
      type: "bytes",
      // 0.5 MB seems like a reasonable chunk size, let's adjust
      // this if needed.
      autoAllocateChunkSize: 512 * 1024,
      async pull(l) {
        const i = l.byobRequest.view, f = await p.slice(
          o,
          o + i.byteLength
        ).arrayBuffer(), h = new Uint8Array(f);
        new Uint8Array(i.buffer).set(h);
        const b = h.byteLength;
        l.byobRequest.respond(b), o += b, o >= p.size && l.close();
      }
    });
  });
}
if (Vr === "NODE" && typeof CustomEvent > "u") {
  class r extends Event {
    constructor(o, p = {}) {
      super(o, p), this.detail = p.detail;
    }
    initCustomEvent() {
    }
  }
  globalThis.CustomEvent = r;
}
const Hr = [
  "db.php",
  "plugins/akismet",
  "plugins/hello.php",
  "plugins/wordpress-importer",
  "mu-plugins/sqlite-database-integration",
  "mu-plugins/playground-includes",
  "mu-plugins/0-playground.php",
  "mu-plugins/0-sqlite.php",
  /*
   * Listing core themes like that here isn't ideal, especially since
   * developers may actually want to use one of them.
   * @TODO Let's give the user a choice whether or not to include them.
   */
  "themes/twentytwenty",
  "themes/twentytwentyone",
  "themes/twentytwentytwo",
  "themes/twentytwentythree",
  "themes/twentytwentyfour",
  "themes/twentytwentyfive",
  "themes/twentytwentysix"
], Gr = Symbol("SleepFinished");
function _t(r) {
  return new Promise((t) => {
    setTimeout(() => t(Gr), r);
  });
}
class kt extends Error {
  constructor() {
    super("Acquiring lock timed out");
  }
}
class Ot {
  constructor({ concurrency: t, timeout: o }) {
    this._running = 0, this.concurrency = t, this.timeout = o, this.queue = [];
  }
  get remaining() {
    return this.concurrency - this.running;
  }
  get running() {
    return this._running;
  }
  async acquire() {
    for (; ; )
      if (this._running >= this.concurrency) {
        const t = new Promise((o) => {
          this.queue.push(o);
        });
        this.timeout !== void 0 ? await Promise.race([t, _t(this.timeout)]).then(
          (o) => {
            if (o === Gr)
              throw new kt();
          }
        ) : await t;
      } else {
        this._running++;
        let t = !1;
        return () => {
          t || (t = !0, this._running--, this.queue.length > 0 && this.queue.shift()());
        };
      }
  }
  async run(t) {
    const o = await this.acquire();
    try {
      return await t();
    } finally {
      o();
    }
  }
}
function se(...r) {
  function t(i) {
    return i.substring(i.length - 1) === "/";
  }
  let o = r.join("/");
  const p = o[0] === "/", l = t(o);
  return o = Zr(o), !o && !p && (o = "."), o && l && !t(o) && (o += "/"), o;
}
function Yr(r) {
  if (r === "/")
    return "/";
  r = Zr(r);
  const t = r.lastIndexOf("/");
  return t === -1 ? "" : t === 0 ? "/" : r.substr(0, t);
}
function Zr(r) {
  const t = r[0] === "/";
  return r = Et(
    r.split("/").filter((o) => !!o),
    !t
  ).join("/"), (t ? "/" : "") + r.replace(/\/$/, "");
}
function Et(r, t) {
  let o = 0;
  for (let p = r.length - 1; p >= 0; p--) {
    const l = r[p];
    l === "." ? r.splice(p, 1) : l === ".." ? (r.splice(p, 1), o++) : o && (r.splice(p, 1), o--);
  }
  if (t)
    for (; o; o--)
      r.unshift("..");
  return r;
}
function Qr(r = 36, t = "!@#$%^&*()_+=-[]/.,<>?") {
  const o = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" + t;
  let p = "";
  for (let l = r; l > 0; --l)
    p += o[Math.floor(Math.random() * o.length)];
  return p;
}
function $t() {
  return Qr(36, "-_");
}
function ie(r) {
  return `json_decode(base64_decode('${Tt(
    JSON.stringify(r)
  )}'), true)`;
}
function lr(r) {
  const t = {};
  for (const o in r)
    t[o] = ie(r[o]);
  return t;
}
function Tt(r) {
  return jt(new TextEncoder().encode(r));
}
function jt(r) {
  const t = String.fromCodePoint(...r);
  return btoa(t);
}
const At = "playground-log", Sr = (r, ...t) => {
  ae.dispatchEvent(
    new CustomEvent(At, {
      detail: {
        log: r,
        args: t
      }
    })
  );
}, qt = (r, ...t) => {
  switch (typeof r.message == "string" ? Reflect.set(r, "message", Pr(r.message)) : r.message.message && typeof r.message.message == "string" && Reflect.set(
    r.message,
    "message",
    Pr(r.message.message)
  ), r.severity) {
    case "Debug":
      console.debug(r.message, ...t);
      break;
    case "Info":
      console.info(r.message, ...t);
      break;
    case "Warn":
      console.warn(r.message, ...t);
      break;
    case "Error":
      console.error(r.message, ...t);
      break;
    case "Fatal":
      console.error(r.message, ...t);
      break;
    default:
      console.log(r.message, ...t);
  }
}, Rt = (r) => r instanceof Error ? [r.message, r.stack].join(`
`) : JSON.stringify(r, null, 2), Jr = [], xr = (r) => {
  Jr.push(r);
}, vr = (r) => {
  if (r.raw === !0)
    xr(r.message);
  else {
    const t = xt(
      typeof r.message == "object" ? Rt(r.message) : r.message,
      r.severity ?? "Info",
      r.prefix ?? "JavaScript"
    );
    xr(t);
  }
};
class Lt extends EventTarget {
  // constructor
  constructor(t = []) {
    super(), this.handlers = t, this.fatalErrorEvent = "playground-fatal-error";
  }
  /**
   * Get all logs.
   * @returns string[]
   */
  getLogs() {
    return this.handlers.includes(vr) ? [...Jr] : (this.error(`Logs aren't stored because the logToMemory handler isn't registered.
				If you're using a custom logger instance, make sure to register logToMemory handler.
			`), []);
  }
  /**
   * Log message with severity.
   *
   * @param message any
   * @param severity LogSeverity
   * @param raw boolean
   * @param args any
   */
  logMessage(t, ...o) {
    for (const p of this.handlers)
      p(t, ...o);
  }
  /**
   * Log message
   *
   * @param message any
   * @param args any
   */
  log(t, ...o) {
    this.logMessage(
      {
        message: t,
        severity: void 0,
        prefix: "JavaScript",
        raw: !1
      },
      ...o
    );
  }
  /**
   * Log debug message
   *
   * @param message any
   * @param args any
   */
  debug(t, ...o) {
    this.logMessage(
      {
        message: t,
        severity: "Debug",
        prefix: "JavaScript",
        raw: !1
      },
      ...o
    );
  }
  /**
   * Log info message
   *
   * @param message any
   * @param args any
   */
  info(t, ...o) {
    this.logMessage(
      {
        message: t,
        severity: "Info",
        prefix: "JavaScript",
        raw: !1
      },
      ...o
    );
  }
  /**
   * Log warning message
   *
   * @param message any
   * @param args any
   */
  warn(t, ...o) {
    this.logMessage(
      {
        message: t,
        severity: "Warn",
        prefix: "JavaScript",
        raw: !1
      },
      ...o
    );
  }
  /**
   * Log error message
   *
   * @param message any
   * @param args any
   */
  error(t, ...o) {
    this.logMessage(
      {
        message: t,
        severity: "Error",
        prefix: "JavaScript",
        raw: !1
      },
      ...o
    );
  }
}
const St = () => {
  try {
    if (process.env.NODE_ENV === "test")
      return [vr, Sr];
  } catch {
  }
  return [vr, qt, Sr];
}, ae = new Lt(St()), Pr = (r) => r.replace(/\t/g, ""), xt = (r, t, o) => {
  const p = /* @__PURE__ */ new Date(), l = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "UTC"
  }).format(p).replace(/ /g, "-"), i = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: !1,
    timeZone: "UTC",
    timeZoneName: "short"
  }).format(p), e = l + " " + i;
  return r = Pr(r), `[${e}] ${o} ${t}: ${r}`;
};
let mr = 0;
const Nr = "/wordpress/wp-content/debug.log", Nt = async (r) => await r.fileExists(Nr) ? await r.readFileAsText(Nr) : "", Ft = (r, t) => {
  t.addEventListener("request.end", async () => {
    const o = await Nt(t);
    if (o.length > mr) {
      const p = o.substring(mr);
      r.logMessage({
        message: p,
        raw: !0
      }), mr = o.length;
    }
  }), t.addEventListener("request.error", (o) => {
    o = o, o.error && (r.logMessage({
      message: `${o.error.message} ${o.error.stack}`,
      severity: "Fatal",
      prefix: o.source === "request" ? "PHP" : "WASM Crash"
    }), r.dispatchEvent(
      new CustomEvent(r.fatalErrorEvent, {
        detail: {
          logs: r.getLogs(),
          source: o.source
        }
      })
    ));
  });
}, $r = async (r, { pluginPath: t, pluginName: o }, p) => {
  p == null || p.tracker.setCaption(`Activating ${o || t}`);
  const l = await r.documentRoot, i = await r.run({
    code: `<?php
			define( 'WP_ADMIN', true );
			require_once( ${ie(l)}. "/wp-load.php" );
			require_once( ${ie(l)}. "/wp-admin/includes/plugin.php" );

			// Set current user to admin
			wp_set_current_user( get_users(array('role' => 'Administrator') )[0]->ID );

			$plugin_path = ${ie(t)};
			$response = false;
			if (!is_dir($plugin_path)) {
				$response = activate_plugin($plugin_path);
			}

			// Activate plugin by name if activation by path wasn't successful
			if ( null !== $response ) {
				foreach ( ( glob( $plugin_path . '/*.php' ) ?: array() ) as $file ) {
					$info = get_plugin_data( $file, false, false );
					if ( ! empty( $info['Name'] ) ) {
						$response = activate_plugin( $file );
						break;
					}
				}
			}

			if ( null === $response ) {
				die('Plugin activated successfully');
			} else if ( is_wp_error( $response ) ) {
				throw new Exception( $response->get_error_message() );
			}

			throw new Exception( 'Unable to activate plugin' );
		`
  });
  if (i.text !== "Plugin activated successfully")
    throw ae.debug(i), new Error(
      `Plugin ${t} could not be activated – WordPress exited with no error. Sometimes, when $_SERVER or site options are not configured correctly, WordPress exits early with a 301 redirect. Inspect the "debug" logs in the console for more details`
    );
}, Kr = async (r, { themeFolderName: t }, o) => {
  o == null || o.tracker.setCaption(`Activating ${t}`);
  const p = await r.documentRoot, l = `${p}/wp-content/themes/${t}`;
  if (!await r.fileExists(l))
    throw new Error(`
			Couldn't activate theme ${t}.
			Theme not found at the provided theme path: ${l}.
			Check the theme path to ensure it's correct.
			If the theme is not installed, you can install it using the installTheme step.
			More info can be found in the Blueprint documentation: https://wordpress.github.io/wordpress-playground/blueprints/steps/#ActivateThemeStep
		`);
  const i = await r.run({
    code: `<?php
			define( 'WP_ADMIN', true );
			require_once( getenv('docroot') . "/wp-load.php" );

			// Set current user to admin
			wp_set_current_user( get_users(array('role' => 'Administrator') )[0]->ID );

			switch_theme( getenv('themeFolderName') );

			if( wp_get_theme()->get_stylesheet() !== getenv('themeFolderName') ) {
				throw new Exception( 'Theme ' . getenv('themeFolderName') . ' could not be activated.' );				
			}
			die('Theme activated successfully');
		`,
    env: {
      docroot: p,
      themeFolderName: t
    }
  });
  if (i.text !== "Theme activated successfully")
    throw ae.debug(i), new Error(
      `Theme ${t} could not be activated – WordPress exited with no error. Sometimes, when $_SERVER or site options are not configured correctly, WordPress exits early with a 301 redirect. Inspect the "debug" logs in the console for more details`
    );
}, Ct = async (r, { code: t }) => await r.run({ code: t }), It = async (r, { options: t }) => await r.run(t), Xr = async (r, { path: t }) => {
  await r.unlink(t);
}, Dt = async (r, { sql: t }, o) => {
  o == null || o.tracker.setCaption("Executing SQL Queries");
  const p = `/tmp/${$t()}.sql`;
  await r.writeFile(
    p,
    new Uint8Array(await t.arrayBuffer())
  );
  const l = await r.documentRoot, i = lr({ docroot: l, sqlFilename: p }), e = await r.run({
    code: `<?php
		require_once ${i.docroot} . '/wp-load.php';

		$handle = fopen(${i.sqlFilename}, 'r');
		$buffer = '';

		global $wpdb;

		while ($bytes = fgets($handle)) {
			$buffer .= $bytes;

			if (!feof($handle) && substr($buffer, -1, 1) !== "
") {
				continue;
			}

			$wpdb->query($buffer);
			$buffer = '';
		}
	`
  });
  return await Xr(r, { path: p }), e;
}, _r = async (r, { request: t }) => {
  ae.warn(
    'Deprecated: The Blueprint step "request" is deprecated and will be removed in a future release.'
  );
  const o = await r.request(t);
  if (o.httpStatusCode > 399 || o.httpStatusCode < 200)
    throw ae.warn("WordPress response was", { response: o }), new Error(
      `Request failed with status ${o.httpStatusCode}`
    );
  return o;
}, Wt = `<?php

/**
 * Rewrites the wp-config.php file to ensure specific constants are defined
 * with specific values.
 * 
 * Example:
 * 
 * \`\`\`php
 * <?php
 * define('WP_DEBUG', true);
 * // The third define() argument is also supported:
 * define('SAVEQUERIES', false, true);
 * 
 * // Expression
 * define(true ? 'WP_DEBUG_LOG' : 'WP_DEBUG_LOG', 123);
 * 
 * // Guarded expressions shouldn't be wrapped twice
 * if(!defined(1 ? 'A' : 'B')) {
 *     define(1 ? 'A' : 'B', 0);
 * }
 * 
 * // More advanced expression
 * define((function() use($x) {
 *     return [$x, 'a'];
 * })(), 123);
 * \`\`\`
 * 
 * Rewritten with
 * 
 *     $constants = [
 *        'WP_DEBUG' => false,
 *        'WP_DEBUG_LOG' => true,
 *        'SAVEQUERIES' => true,
 *        'NEW_CONSTANT' => "new constant",
 *     ];
 * 
 * \`\`\`php
 * <?php
 * define('WP_DEBUG_LOG',true);
 * define('NEW_CONSTANT','new constant');
 * ?><?php
 * define('WP_DEBUG',false);
 * // The third define() argument is also supported:
 * define('SAVEQUERIES',true, true);
 * 
 * // Expression
 * if(!defined($const ? 'WP_DEBUG_LOG' : 'WP_DEBUG_LOG')) {
 *      define($const ? 'WP_DEBUG_LOG' : 'WP_DEBUG_LOG', 123);
 * }
 * 
 * // Guarded expressions shouldn't be wrapped twice
 * if(!defined(1 ? 'A' : 'B')) {
 *     define(1 ? 'A' : 'B', 0);
 * }
 * 
 * // More advanced expression
 * if(!defined((function() use($x) {
 *    return [$x, 'a'];
 * })())) {
 *     define((function() use($x) {
 *         return [$x, 'a'];
 *     })(), 123);
 * }
 * \`\`\`
 * 
 * @param mixed $content
 * @return string
 */
function rewrite_wp_config_to_define_constants($content, $constants = [])
{
    $tokens = array_reverse(token_get_all($content));
    $output = [];
    $defined_expressions = [];

    // Look through all the tokens and find the define calls
    do {
        $buffer = [];
        $name_buffer = [];
        $value_buffer = [];
        $third_arg_buffer = [];

        // Capture everything until the define call into output.
        // Capturing the define call into a buffer.
        // Example:
        //     <?php echo 'a'; define  (
        //     ^^^^^^^^^^^^^^^^^^^^^^
        //           output   |buffer
        while ($token = array_pop($tokens)) {
            if (is_array($token) && $token[0] === T_STRING && (strtolower($token[1]) === 'define' || strtolower($token[1]) === 'defined')) {
                $buffer[] = $token;
                break;
            }
            $output[] = $token;
        }

        // Maybe we didn't find a define call and reached the end of the file?
        if (!count($tokens)) {
            break;
        }

        // Keep track of the "defined" expressions that are already accounted for
        if($token[1] === 'defined') {
            $output[] = $token;
            $defined_expression = [];
            $open_parenthesis = 0;
            // Capture everything up to the opening parenthesis, including the parenthesis
            // e.g. defined  (
            //           ^^^^
            while ($token = array_pop($tokens)) {
                $output[] = $token;
                if ($token === "(") {
                    ++$open_parenthesis;
                    break;
                }
            }

            // Capture everything up to the closing parenthesis, including the parenthesis
            // e.g. defined  (
            //           ^^^^
            while ($token = array_pop($tokens)) {
                $output[] = $token;
                if ($token === ")") {
                    --$open_parenthesis;
                }
                if ($open_parenthesis === 0) {
                    break;
                }
                $defined_expression[] = $token;
            }

            $defined_expressions[] = stringify_tokens(skip_whitespace($defined_expression));
            continue;
        }

        // Capture everything up to the opening parenthesis, including the parenthesis
        // e.g. define  (
        //           ^^^^
        while ($token = array_pop($tokens)) {
            $buffer[] = $token;
            if ($token === "(") {
                break;
            }
        }

        // Capture the first argument – it's the first expression after the opening
        // parenthesis and before the comma:
        // Examples:
        //     define("WP_DEBUG", true);
        //            ^^^^^^^^^^^
        //
        //     define(count([1,2]) > 2 ? 'WP_DEBUG' : 'FOO', true);
        //            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        $open_parenthesis = 0;
        while ($token = array_pop($tokens)) {
            $buffer[] = $token;
            if ($token === "(" || $token === "[" || $token === "{") {
                ++$open_parenthesis;
            } elseif ($token === ")" || $token === "]" || $token === "}") {
                --$open_parenthesis;
            } elseif ($token === "," && $open_parenthesis === 0) {
                break;
            }

            // Don't capture the comma as a part of the constant name
            $name_buffer[] = $token;
        }

        // Capture everything until the closing parenthesis
        //     define("WP_DEBUG", true);
        //                       ^^^^^^
        $open_parenthesis = 0;
        $is_second_argument = true;
        while ($token = array_pop($tokens)) {
            $buffer[] = $token;
            if ($token === ")" && $open_parenthesis === 0) {
                // Final parenthesis of the define call.
                break;
            } else if ($token === "(" || $token === "[" || $token === "{") {
                ++$open_parenthesis;
            } elseif ($token === ")" || $token === "]" || $token === "}") {
                --$open_parenthesis;
            } elseif ($token === "," && $open_parenthesis === 0) {
                // This define call has more than 2 arguments! The third one is the
                // boolean value indicating $is_case_insensitive. Let's continue capturing
                // to $third_arg_buffer.
                $is_second_argument = false;
            }
            if ($is_second_argument) {
                $value_buffer[] = $token;
            } else {
                $third_arg_buffer[] = $token;
            }
        }

        // Capture until the semicolon
        //     define("WP_DEBUG", true)  ;
        //                             ^^^
        while ($token = array_pop($tokens)) {
            $buffer[] = $token;
            if ($token === ";") {
                break;
            }
        }

        // Decide whether $name_buffer is a constant name or an expression
        $name_token = null;
        $name_token_index = $token;
        $name_is_literal = true;
        foreach ($name_buffer as $k => $token) {
            if (is_array($token)) {
                if ($token[0] === T_WHITESPACE || $token[0] === T_COMMENT || $token[0] === T_DOC_COMMENT) {
                    continue;
                } else if ($token[0] === T_STRING || $token[0] === T_CONSTANT_ENCAPSED_STRING) {
                    $name_token = $token;
                    $name_token_index = $k;
                } else {
                    $name_is_literal = false;
                    break;
                }
            } else if ($token !== "(" && $token !== ")") {
                $name_is_literal = false;
                break;
            }
        }

        // We can't handle expressions as constant names. Let's wrap that define
        // call in an if(!defined()) statement, just in case it collides with
        // a constant name.
        if (!$name_is_literal) {
            // Ensure the defined expression is not already accounted for
            foreach ($defined_expressions as $defined_expression) {
                if ($defined_expression === stringify_tokens(skip_whitespace($name_buffer))) {
                    $output = array_merge($output, $buffer);
                    continue 2;
                }
            }
            $output = array_merge(
                $output,
                ["if(!defined("],
                $name_buffer,
                [")) {\\n     "],
                ['define('],
                $name_buffer,
                [','],
                $value_buffer,
                $third_arg_buffer,
                [");"],
                ["\\n}\\n"]
            );
            continue;
        }

        // Yay, we have a literal constant name in the buffer now. Let's
        // get its value:
        $name = eval('return ' . $name_token[1] . ';');

        // If the constant name is not in the list of constants we're looking,
        // we can ignore it.
        if (!array_key_exists($name, $constants)) {
            $output = array_merge($output, $buffer);
            continue;
        }

        // We now have a define() call that defines a constant we're looking for.
        // Let's rewrite its value to the one 
        $output = array_merge(
            $output,
            ['define('],
            $name_buffer,
            [','],
            [var_export($constants[$name], true)],
            $third_arg_buffer,
            [");"]
        );

        // Remove the constant from the list so we can process any remaining
        // constants later.
        unset($constants[$name]);
    } while (count($tokens));

    // Add any constants that weren't found in the file
    if (count($constants)) {
        $prepend = [
            "<?php \\n"
        ];
        foreach ($constants as $name => $value) {
            $prepend = array_merge(
                $prepend,
                [
                    "define(",
                    var_export($name, true),
                    ',',
                    var_export($value, true),
                    ");\\n"
                ]
            );
        }
        $prepend[] = "?>";
        $output = array_merge(
            $prepend,
            $output
        );
    }

    // Translate the output tokens back into a string
    return stringify_tokens($output);
}

function stringify_tokens($tokens) {
    $output = '';
    foreach ($tokens as $token) {
        if (is_array($token)) {
            $output .= $token[1];
        } else {
            $output .= $token;
        }
    }
    return $output;
}

function skip_whitespace($tokens) {
    $output = [];
    foreach ($tokens as $token) {
        if (is_array($token) && ($token[0] === T_WHITESPACE || $token[0] === T_COMMENT || $token[0] === T_DOC_COMMENT)) {
            continue;
        }
        $output[] = $token;
    }
    return $output;
}
`, sr = async (r, { consts: t, method: o = "define-before-run" }) => {
  switch (o) {
    case "define-before-run":
      await Mt(r, t);
      break;
    case "rewrite-wp-config": {
      const p = await r.documentRoot, l = se(p, "/wp-config.php"), i = await r.readFileAsText(l), e = await Bt(
        r,
        i,
        t
      );
      await r.writeFile(l, e);
      break;
    }
    default:
      throw new Error(`Invalid method: ${o}`);
  }
};
async function Mt(r, t) {
  for (const o in t)
    await r.defineConstant(o, t[o]);
}
async function Bt(r, t, o) {
  await r.writeFile("/tmp/code.php", t);
  const p = lr({
    consts: o
  });
  return await r.run({
    code: `${Wt}
	$wp_config_path = '/tmp/code.php';
	$wp_config = file_get_contents($wp_config_path);
	$new_wp_config = rewrite_wp_config_to_define_constants($wp_config, ${p.consts});
	file_put_contents($wp_config_path, $new_wp_config);
	`
  }), await r.readFileAsText("/tmp/code.php");
}
const kr = async (r, { username: t = "admin", password: o = "password" } = {}, p) => {
  var i, e, f;
  p == null || p.tracker.setCaption((p == null ? void 0 : p.initialCaption) || "Logging in"), await r.request({
    url: "/wp-login.php"
  });
  const l = await r.request({
    url: "/wp-login.php",
    method: "POST",
    body: {
      log: t,
      pwd: o,
      rememberme: "forever"
    }
  });
  if (!((f = (e = (i = l.headers) == null ? void 0 : i.location) == null ? void 0 : e[0]) != null && f.includes("/wp-admin/")))
    throw ae.warn("WordPress response was", {
      response: l,
      text: l.text
    }), new Error(
      `Failed to log in as ${t} with password ${o}`
    );
}, et = async (r, { options: t }) => {
  const o = await r.documentRoot;
  await r.run({
    code: `<?php
		include ${ie(o)} . '/wp-load.php';
		$site_options = ${ie(t)};
		foreach($site_options as $name => $value) {
			update_option($name, $value);
		}
		echo "Success";
		`
  });
}, Ut = async (r, { meta: t, userId: o }) => {
  const p = await r.documentRoot;
  await r.run({
    code: `<?php
		include ${ie(p)} . '/wp-load.php';
		$meta = ${ie(t)};
		foreach($meta as $name => $value) {
			update_user_meta(${ie(o)}, $name, $value);
		}
		`
  });
};
function rt(r) {
  return r.pathname.startsWith("/scope:");
}
function zt(r) {
  return rt(r) ? r.pathname.split("/")[1].split(":")[1] : null;
}
const Vt = async (r) => {
  var w;
  await sr(r, {
    consts: {
      WP_ALLOW_MULTISITE: 1
    }
  });
  const t = new URL(await r.absoluteUrl);
  if (t.port !== "") {
    let S = `The current host is ${t.host}, but WordPress multisites do not support custom ports.`;
    throw t.hostname === "localhost" && (S += " For development, you can set up a playground.test domain using the instructions at https://wordpress.github.io/wordpress-playground/contributing/code."), new Error(S);
  }
  const o = t.pathname.replace(/\/$/, "") + "/", p = `${t.protocol}//${t.hostname}${o}`;
  await et(r, {
    options: {
      siteurl: p,
      home: p
    }
  }), await kr(r, {});
  const l = await r.documentRoot, e = (await r.run({
    code: `<?php
define( 'WP_ADMIN', true );
require_once(${ie(l)} . "/wp-load.php");

// Set current user to admin
( get_users(array('role' => 'Administrator') )[0] );

require_once(${ie(l)} . "/wp-admin/includes/plugin.php");
$plugins_root = ${ie(l)} . "/wp-content/plugins";
$plugins = glob($plugins_root . "/*");

$deactivated_plugins = [];
foreach($plugins as $plugin_path) {
	if (str_ends_with($plugin_path, '/index.php')) {
		continue;
	}
	if (!is_dir($plugin_path)) {
		$deactivated_plugins[] = substr($plugin_path, strlen($plugins_root) + 1);
		deactivate_plugins($plugin_path);
		continue;
	}
	// Find plugin entry file
	foreach ( ( glob( $plugin_path . '/*.php' ) ?: array() ) as $file ) {
		$info = get_plugin_data( $file, false, false );
		if ( ! empty( $info['Name'] ) ) {
			deactivate_plugins( $file );
			$deactivated_plugins[] = substr($file, strlen($plugins_root) + 1);
			break;
		}
	}
}
echo json_encode($deactivated_plugins);
`
  })).json, h = (w = (await _r(r, {
    request: {
      url: "/wp-admin/network.php"
    }
  })).text.match(
    /name="_wpnonce"\s+value="([^"]+)"/
  )) == null ? void 0 : w[1], b = await _r(r, {
    request: {
      url: "/wp-admin/network.php",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: Ht({
        _wpnonce: h,
        _wp_http_referer: o + "wp-admin/network.php",
        sitename: "My WordPress Website Sites",
        email: "admin@localhost.com",
        submit: "Install"
      })
    }
  });
  if (b.httpStatusCode !== 200)
    throw ae.warn("WordPress response was", {
      response: b,
      text: b.text,
      headers: b.headers
    }), new Error(
      `Failed to enable multisite. Response code was ${b.httpStatusCode}`
    );
  await sr(r, {
    consts: {
      MULTISITE: !0,
      SUBDOMAIN_INSTALL: !1,
      SITE_ID_CURRENT_SITE: 1,
      BLOG_ID_CURRENT_SITE: 1,
      DOMAIN_CURRENT_SITE: t.hostname,
      PATH_CURRENT_SITE: o
    }
  });
  const k = new URL(await r.absoluteUrl), m = rt(k) ? "scope:" + zt(k) : null;
  await r.writeFile(
    "/internal/shared/preload/sunrise.php",
    `<?php
	$_SERVER['HTTP_HOST'] = ${ie(k.hostname)};
	$folder = ${ie(m)};
	if ($folder && strpos($_SERVER['REQUEST_URI'],"/$folder") === false) {
		$_SERVER['REQUEST_URI'] = "/$folder/" . ltrim($_SERVER['REQUEST_URI'], '/');
	}
`
  ), await r.writeFile(
    "/internal/shared/mu-plugins/sunrise.php",
    `<?php
		if ( !defined( 'BLOG_ID_CURRENT_SITE' ) ) {
			define( 'BLOG_ID_CURRENT_SITE', 1 );
		}
`
  ), await kr(r, {});
  for (const S of e)
    await $r(r, {
      pluginPath: S
    });
};
function Ht(r) {
  return Object.keys(r).map(
    (t) => encodeURIComponent(t) + "=" + encodeURIComponent(r[t])
  ).join("&");
}
const Gt = async (r, { fromPath: t, toPath: o }) => {
  await r.writeFile(
    o,
    await r.readFileAsBuffer(t)
  );
}, Yt = async (r, { fromPath: t, toPath: o }) => {
  await r.mv(t, o);
}, Zt = async (r, { path: t }) => {
  await r.mkdir(t);
}, Qt = async (r, { path: t }) => {
  await r.rmdir(t);
}, tt = async (r, { path: t, data: o }) => {
  o instanceof File && (o = new Uint8Array(await o.arrayBuffer())), t.startsWith("/wordpress/wp-content/mu-plugins") && !await r.fileExists("/wordpress/wp-content/mu-plugins") && await r.mkdir("/wordpress/wp-content/mu-plugins"), await r.writeFile(t, o);
}, st = async (r, { siteUrl: t }) => {
  await sr(r, {
    consts: {
      WP_HOME: t,
      WP_SITEURL: t
    }
  });
}, Jt = async (r, { file: t }, o) => {
  var l;
  (l = o == null ? void 0 : o.tracker) == null || l.setCaption("Importing content"), await tt(r, {
    path: "/tmp/import.wxr",
    data: t
  });
  const p = await r.documentRoot;
  await r.run({
    code: `<?php
		require ${ie(p)} . '/wp-load.php';
		require ${ie(p)} . '/wp-admin/includes/admin.php';
  
		kses_remove_filters();
		$admin_id = get_users(array('role' => 'Administrator') )[0]->ID;
        wp_set_current_user( $admin_id );
		$importer = new WXR_Importer( array(
			'fetch_attachments' => true,
			'default_author' => $admin_id
		) );
		$logger = new WP_Importer_Logger_CLI();
		$importer->set_logger( $logger );

		// Slashes from the imported content are lost if we don't call wp_slash here.
		add_action( 'wp_insert_post_data', function( $data ) {
			return wp_slash($data);
		});

		$result = $importer->import( '/tmp/import.wxr' );
		`
  });
}, it = async (r, { themeSlug: t = "" }, o) => {
  var l;
  (l = o == null ? void 0 : o.tracker) == null || l.setCaption("Importing theme starter content");
  const p = await r.documentRoot;
  await r.run({
    code: `<?php

		/**
		 * Ensure that the customizer loads as an admin user.
		 *
		 * For compatibility with themes, this MUST be run prior to theme inclusion, which is why this is a plugins_loaded filter instead
		 * of running _wp_customize_include() manually after load.
		 */
		function importThemeStarterContent_plugins_loaded() {
			// Set as the admin user, this ensures we can customize the site.
			wp_set_current_user(
				get_users( [ 'role' => 'Administrator' ] )[0]
			);

			// Force the site to be fresh, although it should already be.
			add_filter( 'pre_option_fresh_site', '__return_true' );

			/*
			 * Simulate this request as the customizer loading with the current theme in preview mode.
			 *
			 * See _wp_customize_include()
			 */
			$_REQUEST['wp_customize']    = 'on';
			$_REQUEST['customize_theme'] = ${ie(t)} ?: get_stylesheet();

			/*
			 * Claim this is a ajax request saving settings, to avoid the preview filters being applied.
			 */
			$_REQUEST['action'] = 'customize_save';
			add_filter( 'wp_doing_ajax', '__return_true' );

			$_GET = $_REQUEST;
		}
		playground_add_filter( 'plugins_loaded', 'importThemeStarterContent_plugins_loaded', 0 );

		require ${ie(p)} . '/wp-load.php';

		// Return early if there's no starter content.
		if ( ! get_theme_starter_content() ) {
			return;
		}

		// Import the Starter Content.
		$wp_customize->import_theme_starter_content();

		// Publish the changeset, which publishes the starter content.
		wp_publish_post( $wp_customize->changeset_post_id() );
		`
  });
}, yr = "/tmp/file.zip", ot = async (r, t, o, p = !0) => {
  if (t instanceof File) {
    const i = t;
    t = yr, await r.writeFile(
      t,
      new Uint8Array(await i.arrayBuffer())
    );
  }
  const l = lr({
    zipPath: t,
    extractToPath: o,
    overwriteFiles: p
  });
  await r.run({
    code: `<?php
        function unzip($zipPath, $extractTo, $overwriteFiles = true)
        {
            if (!is_dir($extractTo)) {
                mkdir($extractTo, 0777, true);
            }
            $zip = new ZipArchive;
            $res = $zip->open($zipPath);
            if ($res === TRUE) {
				for ($i = 0; $i < $zip->numFiles; $i++) {
					$filename = $zip->getNameIndex($i);
					$fileinfo = pathinfo($filename);
					$extractFilePath = rtrim($extractTo, '/') . '/' . $filename;
					// Check if file exists and $overwriteFiles is false
					if (!file_exists($extractFilePath) || $overwriteFiles) {
						// Extract file
						$zip->extractTo($extractTo, $filename);
					}
				}
				$zip->close();
				chmod($extractTo, 0777);
            } else {
                throw new Exception("Could not unzip file");
            }
        }
        unzip(${l.zipPath}, ${l.extractToPath}, ${l.overwriteFiles});
        `
  }), await r.fileExists(yr) && await r.unlink(yr);
}, Tr = async (r, { zipFile: t, zipPath: o, extractToPath: p }) => {
  if (o)
    ae.warn(
      'The "zipPath" option of the unzip() Blueprint step is deprecated and will be removed. Use "zipFile" instead.'
    );
  else if (!t)
    throw new Error("Either zipPath or zipFile must be provided");
  await ot(r, t || o, p);
}, Kt = async (r, { wordPressFilesZip: t, pathInZip: o = "" }) => {
  const p = await r.documentRoot;
  let l = se("/tmp", "import");
  await r.mkdir(l), await Tr(r, {
    zipFile: t,
    extractToPath: l
  }), l = se(l, o);
  const i = se(l, "wp-content"), e = se(p, "wp-content");
  for (const k of Hr) {
    const m = se(
      i,
      k
    );
    await Fr(r, m);
    const w = se(e, k);
    await r.fileExists(w) && (await r.mkdir(Yr(m)), await r.mv(w, m));
  }
  const f = se(
    l,
    "wp-content",
    "database"
  );
  await r.fileExists(f) || await r.mv(
    se(p, "wp-content", "database"),
    f
  );
  const h = await r.listFiles(l);
  for (const k of h)
    await Fr(r, se(p, k)), await r.mv(
      se(l, k),
      se(p, k)
    );
  await r.rmdir(l), await st(r, {
    siteUrl: await r.absoluteUrl
  });
  const b = ie(
    se(p, "wp-admin", "upgrade.php")
  );
  await r.run({
    code: `<?php
            $_GET['step'] = 'upgrade_db';
            require ${b};
            `
  });
};
async function Fr(r, t) {
  await r.fileExists(t) && (await r.isDir(t) ? await r.rmdir(t) : await r.unlink(t));
}
async function Xt(r) {
  const t = await r.request({
    url: "/wp-admin/export.php?download=true&content=all"
  });
  return new File([t.bytes], "export.xml");
}
async function nt(r, {
  targetPath: t,
  zipFile: o,
  ifAlreadyInstalled: p = "overwrite"
}) {
  const i = o.name.replace(/\.zip$/, ""), e = se(await r.documentRoot, "wp-content"), f = se(e, Qr()), h = se(f, "assets", i);
  await r.fileExists(h) && await r.rmdir(f, {
    recursive: !0
  }), await r.mkdir(f);
  try {
    await Tr(r, {
      zipFile: o,
      extractToPath: h
    });
    let b = await r.listFiles(h, {
      prependPath: !0
    });
    b = b.filter((D) => !D.endsWith("/__MACOSX"));
    const k = b.length === 1 && await r.isDir(b[0]);
    let m, w = "";
    k ? (w = b[0], m = b[0].split("/").pop()) : (w = h, m = i);
    const S = `${t}/${m}`;
    if (await r.fileExists(S)) {
      if (!await r.isDir(S))
        throw new Error(
          `Cannot install asset ${m} to ${S} because a file with the same name already exists. Note it's a file, not a directory! Is this by mistake?`
        );
      if (p === "overwrite")
        await r.rmdir(S, {
          recursive: !0
        });
      else {
        if (p === "skip")
          return {
            assetFolderPath: S,
            assetFolderName: m
          };
        throw new Error(
          `Cannot install asset ${m} to ${t} because it already exists and the ifAlreadyInstalled option was set to ${p}`
        );
      }
    }
    return await r.mv(w, S), {
      assetFolderPath: S,
      assetFolderName: m
    };
  } finally {
    await r.rmdir(f, {
      recursive: !0
    });
  }
}
function fr(r) {
  const t = r.split(".").shift().replace(/-/g, " ");
  return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}
const es = async (r, { pluginZipFile: t, ifAlreadyInstalled: o, options: p = {} }, l) => {
  const i = t.name.split("/").pop() || "plugin.zip", e = fr(i);
  l == null || l.tracker.setCaption(`Installing the ${e} plugin`);
  const { assetFolderPath: f } = await nt(r, {
    ifAlreadyInstalled: o,
    zipFile: t,
    targetPath: `${await r.documentRoot}/wp-content/plugins`
  });
  ("activate" in p ? p.activate : !0) && await $r(
    r,
    {
      pluginPath: f,
      pluginName: e
    },
    l
  );
}, rs = async (r, { themeZipFile: t, ifAlreadyInstalled: o, options: p = {} }, l) => {
  const i = fr(t.name);
  l == null || l.tracker.setCaption(`Installing the ${i} theme`);
  const { assetFolderName: e } = await nt(r, {
    ifAlreadyInstalled: o,
    zipFile: t,
    targetPath: `${await r.documentRoot}/wp-content/themes`
  });
  ("activate" in p ? p.activate : !0) && await Kr(
    r,
    {
      themeFolderName: e
    },
    l
  ), ("importStarterContent" in p ? p.importStarterContent : !1) && await it(
    r,
    {
      themeSlug: e
    },
    l
  );
}, ts = async (r, t, o) => {
  var l;
  (l = o == null ? void 0 : o.tracker) == null || l.setCaption("Resetting WordPress data");
  const p = await r.documentRoot;
  await r.run({
    env: {
      DOCROOT: p
    },
    code: `<?php
		require getenv('DOCROOT') . '/wp-load.php';

		$GLOBALS['@pdo']->query('DELETE FROM wp_posts WHERE id > 0');
		$GLOBALS['@pdo']->query("UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='wp_posts'");
		
		$GLOBALS['@pdo']->query('DELETE FROM wp_postmeta WHERE post_id > 1');
		$GLOBALS['@pdo']->query("UPDATE SQLITE_SEQUENCE SET SEQ=20 WHERE NAME='wp_postmeta'");

		$GLOBALS['@pdo']->query('DELETE FROM wp_comments');
		$GLOBALS['@pdo']->query("UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='wp_comments'");

		$GLOBALS['@pdo']->query('DELETE FROM wp_commentmeta');
		$GLOBALS['@pdo']->query("UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='wp_commentmeta'");
		`
  });
}, ss = async (r, { options: t }) => {
  await r.request({
    url: "/wp-admin/install.php?step=2",
    method: "POST",
    body: {
      language: "en",
      prefix: "wp_",
      weblog_title: "My WordPress Website",
      user_name: t.adminPassword || "admin",
      admin_password: t.adminPassword || "password",
      // The installation wizard demands typing the same password twice
      admin_password2: t.adminPassword || "password",
      Submit: "Install WordPress",
      pw_weak: "1",
      admin_email: "admin@localhost.com"
    }
  });
}, is = async (r, { selfContained: t = !1 } = {}) => {
  const o = "/tmp/wordpress-playground.zip", p = await r.documentRoot, l = se(p, "wp-content");
  let i = Hr;
  t && (i = i.filter((h) => !h.startsWith("themes/twenty")).filter(
    (h) => h !== "mu-plugins/sqlite-database-integration"
  ));
  const e = lr({
    zipPath: o,
    wpContentPath: l,
    documentRoot: p,
    exceptPaths: i.map(
      (h) => se(p, "wp-content", h)
    ),
    additionalPaths: t ? {
      [se(p, "wp-config.php")]: "wp-config.php"
    } : {}
  });
  await ns(
    r,
    `zipDir(${e.wpContentPath}, ${e.zipPath}, array(
			'exclude_paths' => ${e.exceptPaths},
			'zip_root'      => ${e.documentRoot},
			'additional_paths' => ${e.additionalPaths}
		));`
  );
  const f = await r.readFileAsBuffer(o);
  return r.unlink(o), f;
}, os = `<?php

function zipDir($root, $output, $options = array())
{
    $root = rtrim($root, '/');
    $additionalPaths = array_key_exists('additional_paths', $options) ? $options['additional_paths'] : array();
    $excludePaths = array_key_exists('exclude_paths', $options) ? $options['exclude_paths'] : array();
    $zip_root = array_key_exists('zip_root', $options) ? $options['zip_root'] : $root;

    $zip = new ZipArchive;
    $res = $zip->open($output, ZipArchive::CREATE);
    if ($res === TRUE) {
        $directories = array(
            $root . '/'
        );
        while (sizeof($directories)) {
            $current_dir = array_pop($directories);

            if ($handle = opendir($current_dir)) {
                while (false !== ($entry = readdir($handle))) {
                    if ($entry == '.' || $entry == '..') {
                        continue;
                    }

                    $entry = join_paths($current_dir, $entry);
                    if (in_array($entry, $excludePaths)) {
                        continue;
                    }

                    if (is_dir($entry)) {
                        $directory_path = $entry . '/';
                        array_push($directories, $directory_path);
                    } else if (is_file($entry)) {
                        $zip->addFile($entry, substr($entry, strlen($zip_root)));
                    }
                }
                closedir($handle);
            }
        }
        foreach ($additionalPaths as $disk_path => $zip_path) {
            $zip->addFile($disk_path, $zip_path);
        }
        $zip->close();
        chmod($output, 0777);
    }
}

function join_paths()
{
    $paths = array();

    foreach (func_get_args() as $arg) {
        if ($arg !== '') {
            $paths[] = $arg;
        }
    }

    return preg_replace('#/+#', '/', join('/', $paths));
}
`;
async function ns(r, t) {
  return await r.run({
    code: os + t
  });
}
const as = async (r, { command: t, wpCliPath: o = "/tmp/wp-cli.phar" }) => {
  if (!await r.fileExists(o))
    throw new Error(`wp-cli.phar not found at ${o}.
			You can enable wp-cli support by adding "wp-cli" to the list of extra libraries in your blueprint as follows:
			{
				"extraLibraries": [ "wp-cli" ]
			}

			Read more about it in the documentation.
			https://wordpress.github.io/wordpress-playground/blueprints/data-format#extra-libraries`);
  let p;
  if (typeof t == "string" ? (t = t.trim(), p = ps(t)) : p = t, p.shift() !== "wp")
    throw new Error('The first argument must be "wp".');
  await r.writeFile("/tmp/stdout", ""), await r.writeFile("/tmp/stderr", ""), await r.writeFile(
    "/wordpress/run-cli.php",
    `<?php
		// Set up the environment to emulate a shell script
		// call.

		// Set SHELL_PIPE to 0 to ensure WP-CLI formats
		// the output as ASCII tables.
		// @see https://github.com/wp-cli/wp-cli/issues/1102
		putenv( 'SHELL_PIPE=0' );

		// Set the argv global.
		$GLOBALS['argv'] = array_merge([
		  "/tmp/wp-cli.phar",
		  "--path=/wordpress"
		], ${ie(p)});

		// Provide stdin, stdout, stderr streams outside of
		// the CLI SAPI.
		define('STDIN', fopen('php://stdin', 'rb'));
		define('STDOUT', fopen('php://stdout', 'wb'));
		define('STDERR', fopen('php://stderr', 'wb'));

		require( ${ie(o)} );
		`
  );
  const i = await r.run({
    scriptPath: "/wordpress/run-cli.php"
  });
  if (i.errors)
    throw new Error(i.errors);
  return i;
};
function ps(r) {
  let p = 0, l = "";
  const i = [];
  let e = "";
  for (let f = 0; f < r.length; f++) {
    const h = r[f];
    p === 0 ? h === '"' || h === "'" ? (p = 1, l = h) : h.match(/\s/) ? (e && i.push(e), e = "") : e += h : p === 1 && (h === "\\" ? (f++, e += r[f]) : h === l ? (p = 0, l = "") : e += h);
  }
  return e && i.push(e), i;
}
const ls = async (r, { language: t }, o) => {
  o == null || o.tracker.setCaption((o == null ? void 0 : o.initialCaption) || "Translating"), await r.defineConstant("WPLANG", t);
  const p = await r.documentRoot, i = [
    {
      url: `https://downloads.wordpress.org/translation/core/${(await r.run({
        code: `<?php
			require '${p}/wp-includes/version.php';
			echo $wp_version;
		`
      })).text}/${t}.zip`,
      type: "core"
    }
  ], f = (await r.run({
    code: `<?php
		require_once('${p}/wp-load.php');
		require_once('${p}/wp-admin/includes/plugin.php');
		echo json_encode(
			array_values(
				array_map(
					function($plugin) {
						return [
							'slug'    => $plugin['TextDomain'],
							'version' => $plugin['Version']
						];
					},
					array_filter(
						get_plugins(),
						function($plugin) {
							return !empty($plugin['TextDomain']);
						}
					)
				)
			)
		);`
  })).json;
  for (const { slug: k, version: m } of f)
    i.push({
      url: `https://downloads.wordpress.org/translation/plugin/${k}/${m}/${t}.zip`,
      type: "plugin"
    });
  const b = (await r.run({
    code: `<?php
		require_once('${p}/wp-load.php');
		require_once('${p}/wp-admin/includes/theme.php');
		echo json_encode(
			array_values(
				array_map(
					function($theme) {
						return [
							'slug'    => $theme->get('TextDomain'),
							'version' => $theme->get('Version')
						];
					},
					wp_get_themes()
				)
			)
		);`
  })).json;
  for (const { slug: k, version: m } of b)
    i.push({
      url: `https://downloads.wordpress.org/translation/theme/${k}/${m}/${t}.zip`,
      type: "theme"
    });
  await r.isDir(`${p}/wp-content/languages/plugins`) || await r.mkdir(`${p}/wp-content/languages/plugins`), await r.isDir(`${p}/wp-content/languages/themes`) || await r.mkdir(`${p}/wp-content/languages/themes`);
  for (const { url: k, type: m } of i)
    try {
      const w = await fetch(k);
      if (!w.ok)
        throw new Error(
          `Failed to download translations for ${m}: ${w.statusText}`
        );
      let S = `${p}/wp-content/languages`;
      m === "plugin" ? S += "/plugins" : m === "theme" && (S += "/themes"), await ot(
        r,
        new File([await w.blob()], `${t}-${m}.zip`),
        S
      );
    } catch (w) {
      if (m === "core")
        throw new Error(
          `Failed to download translations for WordPress. Please check if the language code ${t} is correct. You can find all available languages and translations on https://translate.wordpress.org/.`
        );
      ae.warn(`Error downloading translations for ${m}: ${w}`);
    }
}, fs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  activatePlugin: $r,
  activateTheme: Kr,
  cp: Gt,
  defineSiteUrl: st,
  defineWpConfigConsts: sr,
  enableMultisite: Vt,
  exportWXR: Xt,
  importThemeStarterContent: it,
  importWordPressFiles: Kt,
  importWxr: Jt,
  installPlugin: es,
  installTheme: rs,
  login: kr,
  mkdir: Zt,
  mv: Yt,
  request: _r,
  resetData: ts,
  rm: Xr,
  rmdir: Qt,
  runPHP: Ct,
  runPHPWithOptions: It,
  runSql: Dt,
  runWpInstallationWizard: ss,
  setSiteLanguage: ls,
  setSiteOptions: et,
  unzip: Tr,
  updateUserMeta: Ut,
  wpCLI: as,
  writeFile: tt,
  zipWpContent: is
}, Symbol.toStringTag, { value: "Module" })), us = 5 * 1024 * 1024;
function ds(r, t) {
  const o = r.headers.get("content-length") || "", p = parseInt(o, 10) || us;
  function l(i, e) {
    t(
      new CustomEvent("progress", {
        detail: {
          loaded: i,
          total: e
        }
      })
    );
  }
  return new Response(
    new ReadableStream({
      async start(i) {
        if (!r.body) {
          i.close();
          return;
        }
        const e = r.body.getReader();
        let f = 0;
        for (; ; )
          try {
            const { done: h, value: b } = await e.read();
            if (b && (f += b.byteLength), h) {
              l(f, f), i.close();
              break;
            } else
              l(f, p), i.enqueue(b);
          } catch (h) {
            ae.error({ e: h }), i.error(h);
            break;
          }
      }
    }),
    {
      status: r.status,
      statusText: r.statusText,
      headers: r.headers
    }
  );
}
const hr = 1e-5;
class ur extends EventTarget {
  constructor({
    weight: t = 1,
    caption: o = "",
    fillTime: p = 4
  } = {}) {
    super(), this._selfWeight = 1, this._selfDone = !1, this._selfProgress = 0, this._selfCaption = "", this._isFilling = !1, this._subTrackers = [], this._weight = t, this._selfCaption = o, this._fillTime = p;
  }
  /**
   * Creates a new sub-tracker with a specific weight.
   *
   * The weight determines what percentage of the overall progress
   * the sub-tracker represents. For example, if the main tracker is
   * monitoring a process that has two stages, and the first stage
   * is expected to take twice as long as the second stage, you could
   * create the first sub-tracker with a weight of 0.67 and the second
   * sub-tracker with a weight of 0.33.
   *
   * The caption is an optional string that describes the current stage
   * of the operation. If provided, it will be used as the progress caption
   * for the sub-tracker. If not provided, the main tracker will look for
   * the next sub-tracker with a non-empty caption and use that as the progress
   * caption instead.
   *
   * Returns the newly-created sub-tracker.
   *
   * @throws {Error} If the weight of the new stage would cause the total weight of all stages to exceed 1.
   *
   * @param weight The weight of the new stage, as a decimal value between 0 and 1.
   * @param caption The caption for the new stage, which will be used as the progress caption for the sub-tracker.
   *
   * @example
   * ```ts
   * const tracker = new ProgressTracker();
   * const subTracker1 = tracker.stage(0.67, 'Slow stage');
   * const subTracker2 = tracker.stage(0.33, 'Fast stage');
   *
   * subTracker2.set(50);
   * subTracker1.set(75);
   * subTracker2.set(100);
   * subTracker1.set(100);
   * ```
   */
  stage(t, o = "") {
    if (t || (t = this._selfWeight), this._selfWeight - t < -hr)
      throw new Error(
        `Cannot add a stage with weight ${t} as the total weight of registered stages would exceed 1.`
      );
    this._selfWeight -= t;
    const p = new ur({
      caption: o,
      weight: t,
      fillTime: this._fillTime
    });
    return this._subTrackers.push(p), p.addEventListener("progress", () => this.notifyProgress()), p.addEventListener("done", () => {
      this.done && this.notifyDone();
    }), p;
  }
  /**
   * Fills the progress bar slowly over time, simulating progress.
   *
   * The progress bar is filled in a 100 steps, and each step, the progress
   * is increased by 1. If `stopBeforeFinishing` is true, the progress bar
   * will stop filling when it reaches 99% so that you can call `finish()`
   * explicitly.
   *
   * If the progress bar is filling or already filled, this method does nothing.
   *
   * @example
   * ```ts
   * const progress = new ProgressTracker({ caption: 'Processing...' });
   * progress.fillSlowly();
   * ```
   *
   * @param options Optional options.
   */
  fillSlowly({ stopBeforeFinishing: t = !0 } = {}) {
    if (this._isFilling)
      return;
    this._isFilling = !0;
    const o = 100, p = this._fillTime / o;
    this._fillInterval = setInterval(() => {
      this.set(this._selfProgress + 1), t && this._selfProgress >= 99 && clearInterval(this._fillInterval);
    }, p);
  }
  set(t) {
    this._selfProgress = Math.min(t, 100), this.notifyProgress(), this._selfProgress + hr >= 100 && this.finish();
  }
  finish() {
    this._fillInterval && clearInterval(this._fillInterval), this._selfDone = !0, this._selfProgress = 100, this._isFilling = !1, this._fillInterval = void 0, this.notifyProgress(), this.notifyDone();
  }
  get caption() {
    for (let t = this._subTrackers.length - 1; t >= 0; t--)
      if (!this._subTrackers[t].done) {
        const o = this._subTrackers[t].caption;
        if (o)
          return o;
      }
    return this._selfCaption;
  }
  setCaption(t) {
    this._selfCaption = t, this.notifyProgress();
  }
  get done() {
    return this.progress + hr >= 100;
  }
  get progress() {
    if (this._selfDone)
      return 100;
    const t = this._subTrackers.reduce(
      (o, p) => o + p.progress * p.weight,
      this._selfProgress * this._selfWeight
    );
    return Math.round(t * 1e4) / 1e4;
  }
  get weight() {
    return this._weight;
  }
  get observer() {
    return this._progressObserver || (this._progressObserver = (t) => {
      this.set(t);
    }), this._progressObserver;
  }
  get loadingListener() {
    return this._loadingListener || (this._loadingListener = (t) => {
      this.set(t.detail.loaded / t.detail.total * 100);
    }), this._loadingListener;
  }
  pipe(t) {
    t.setProgress({
      progress: this.progress,
      caption: this.caption
    }), this.addEventListener("progress", (o) => {
      t.setProgress({
        progress: o.detail.progress,
        caption: o.detail.caption
      });
    }), this.addEventListener("done", () => {
      t.setLoaded();
    });
  }
  addEventListener(t, o) {
    super.addEventListener(t, o);
  }
  removeEventListener(t, o) {
    super.removeEventListener(t, o);
  }
  notifyProgress() {
    const t = this;
    this.dispatchEvent(
      new CustomEvent("progress", {
        detail: {
          get progress() {
            return t.progress;
          },
          get caption() {
            return t.caption;
          }
        }
      })
    );
  }
  notifyDone() {
    this.dispatchEvent(new CustomEvent("done"));
  }
}
const ir = {
  0: "No error occurred. System call completed successfully.",
  1: "Argument list too long.",
  2: "Permission denied.",
  3: "Address in use.",
  4: "Address not available.",
  5: "Address family not supported.",
  6: "Resource unavailable, or operation would block.",
  7: "Connection already in progress.",
  8: "Bad file descriptor.",
  9: "Bad message.",
  10: "Device or resource busy.",
  11: "Operation canceled.",
  12: "No child processes.",
  13: "Connection aborted.",
  14: "Connection refused.",
  15: "Connection reset.",
  16: "Resource deadlock would occur.",
  17: "Destination address required.",
  18: "Mathematics argument out of domain of function.",
  19: "Reserved.",
  20: "File exists.",
  21: "Bad address.",
  22: "File too large.",
  23: "Host is unreachable.",
  24: "Identifier removed.",
  25: "Illegal byte sequence.",
  26: "Operation in progress.",
  27: "Interrupted function.",
  28: "Invalid argument.",
  29: "I/O error.",
  30: "Socket is connected.",
  31: "There is a directory under that path.",
  32: "Too many levels of symbolic links.",
  33: "File descriptor value too large.",
  34: "Too many links.",
  35: "Message too large.",
  36: "Reserved.",
  37: "Filename too long.",
  38: "Network is down.",
  39: "Connection aborted by network.",
  40: "Network unreachable.",
  41: "Too many files open in system.",
  42: "No buffer space available.",
  43: "No such device.",
  44: "There is no such file or directory OR the parent directory does not exist.",
  45: "Executable file format error.",
  46: "No locks available.",
  47: "Reserved.",
  48: "Not enough space.",
  49: "No message of the desired type.",
  50: "Protocol not available.",
  51: "No space left on device.",
  52: "Function not supported.",
  53: "The socket is not connected.",
  54: "Not a directory or a symbolic link to a directory.",
  55: "Directory not empty.",
  56: "State not recoverable.",
  57: "Not a socket.",
  58: "Not supported, or operation not supported on socket.",
  59: "Inappropriate I/O control operation.",
  60: "No such device or address.",
  61: "Value too large to be stored in data type.",
  62: "Previous owner died.",
  63: "Operation not permitted.",
  64: "Broken pipe.",
  65: "Protocol error.",
  66: "Protocol not supported.",
  67: "Protocol wrong type for socket.",
  68: "Result too large.",
  69: "Read-only file system.",
  70: "Invalid seek.",
  71: "No such process.",
  72: "Reserved.",
  73: "Connection timed out.",
  74: "Text file busy.",
  75: "Cross-device link.",
  76: "Extension: Capabilities insufficient."
};
function cs(r) {
  const t = typeof r == "object" ? r == null ? void 0 : r.errno : null;
  if (t in ir)
    return ir[t];
}
function ge(r = "") {
  return function(o, p, l) {
    const i = l.value;
    l.value = function(...e) {
      try {
        return i.apply(this, e);
      } catch (f) {
        const h = typeof f == "object" ? f == null ? void 0 : f.errno : null;
        if (h in ir) {
          const b = ir[h], k = typeof e[1] == "string" ? e[1] : null, m = k !== null ? r.replaceAll("{path}", k) : r;
          throw new Error(`${m}: ${b}`, {
            cause: f
          });
        }
        throw f;
      }
    };
  };
}
var ms = Object.defineProperty, ys = Object.getOwnPropertyDescriptor, be = (r, t, o, p) => {
  for (var l = p > 1 ? void 0 : p ? ys(t, o) : t, i = r.length - 1, e; i >= 0; i--)
    (e = r[i]) && (l = (p ? e(t, o, l) : e(l)) || l);
  return p && l && ms(t, o, l), l;
};
const we = class pe {
  static readFileAsText(t, o) {
    return new TextDecoder().decode(pe.readFileAsBuffer(t, o));
  }
  static readFileAsBuffer(t, o) {
    return t.readFile(o);
  }
  static writeFile(t, o, p) {
    t.writeFile(o, p);
  }
  static unlink(t, o) {
    t.unlink(o);
  }
  /**
   * Moves a file or directory in the PHP filesystem to a
   * new location.
   *
   * @param FS
   * @param fromPath The path to rename.
   * @param toPath The new path.
   */
  static mv(t, o, p) {
    try {
      const l = t.lookupPath(o).node.mount, i = pe.fileExists(t, p) ? t.lookupPath(p).node.mount : t.lookupPath(Yr(p)).node.mount;
      l.mountpoint !== i.mountpoint ? (pe.copyRecursive(t, o, p), pe.rmdir(t, o, { recursive: !0 })) : t.rename(o, p);
    } catch (l) {
      const i = cs(l);
      throw i ? new Error(
        `Could not move ${o} to ${p}: ${i}`,
        {
          cause: l
        }
      ) : l;
    }
  }
  static rmdir(t, o, p = { recursive: !0 }) {
    p != null && p.recursive && pe.listFiles(t, o).forEach((l) => {
      const i = `${o}/${l}`;
      pe.isDir(t, i) ? pe.rmdir(t, i, p) : pe.unlink(t, i);
    }), t.rmdir(o);
  }
  static listFiles(t, o, p = { prependPath: !1 }) {
    if (!pe.fileExists(t, o))
      return [];
    try {
      const l = t.readdir(o).filter(
        (i) => i !== "." && i !== ".."
      );
      if (p.prependPath) {
        const i = o.replace(/\/$/, "");
        return l.map((e) => `${i}/${e}`);
      }
      return l;
    } catch (l) {
      return ae.error(l, { path: o }), [];
    }
  }
  static isDir(t, o) {
    return pe.fileExists(t, o) ? t.isDir(t.lookupPath(o, { follow: !0 }).node.mode) : !1;
  }
  static isFile(t, o) {
    return pe.fileExists(t, o) ? t.isFile(t.lookupPath(o, { follow: !0 }).node.mode) : !1;
  }
  /**
   * Creates a symlink in the PHP filesystem.
   *
   * @param FS
   * @param target
   * @param link
   */
  static symlink(t, o, p) {
    return t.symlink(o, p);
  }
  /**
   * Checks if a path is a symlink in the PHP filesystem.
   *
   * @param FS
   * @param path
   * @returns True if the path is a symlink, false otherwise.
   */
  static isSymlink(t, o) {
    return pe.fileExists(t, o) ? t.isLink(t.lookupPath(o).node.mode) : !1;
  }
  /**
   * Reads the target of a symlink in the PHP filesystem.
   * @param FS
   * @param path
   * @returns The target of the symlink.
   * @throws {@link @php-wasm/universal:ErrnoError} – If the path is not a symlink.
   */
  static readlink(t, o) {
    return t.readlink(o);
  }
  static realpath(t, o) {
    return t.lookupPath(o, { follow: !0 }).path;
  }
  static fileExists(t, o) {
    try {
      return t.lookupPath(o), !0;
    } catch {
      return !1;
    }
  }
  static mkdir(t, o) {
    t.mkdirTree(o);
  }
  static copyRecursive(t, o, p) {
    const l = t.lookupPath(o).node;
    if (t.isDir(l.mode)) {
      t.mkdirTree(p);
      const i = t.readdir(o).filter(
        (e) => e !== "." && e !== ".."
      );
      for (const e of i)
        pe.copyRecursive(
          t,
          se(o, e),
          se(p, e)
        );
    } else
      t.writeFile(p, t.readFile(o));
  }
};
be([
  ge('Could not read "{path}"')
], we, "readFileAsText", 1);
be([
  ge('Could not read "{path}"')
], we, "readFileAsBuffer", 1);
be([
  ge('Could not write to "{path}"')
], we, "writeFile", 1);
be([
  ge('Could not unlink "{path}"')
], we, "unlink", 1);
be([
  ge('Could not remove directory "{path}"')
], we, "rmdir", 1);
be([
  ge('Could not list files in "{path}"')
], we, "listFiles", 1);
be([
  ge('Could not stat "{path}"')
], we, "isDir", 1);
be([
  ge('Could not stat "{path}"')
], we, "isFile", 1);
be([
  ge('Could not stat "{path}"')
], we, "realpath", 1);
be([
  ge('Could not stat "{path}"')
], we, "fileExists", 1);
be([
  ge('Could not create directory "{path}"')
], we, "mkdir", 1);
be([
  ge('Could not copy files from "{path}"')
], we, "copyRecursive", 1);
const hs = {
  500: "Internal Server Error",
  502: "Bad Gateway",
  404: "Not Found",
  403: "Forbidden",
  401: "Unauthorized",
  400: "Bad Request",
  301: "Moved Permanently",
  302: "Found",
  307: "Temporary Redirect",
  308: "Permanent Redirect",
  204: "No Content",
  201: "Created",
  200: "OK"
};
class or {
  constructor(t, o, p, l = "", i = 0) {
    this.httpStatusCode = t, this.headers = o, this.bytes = p, this.exitCode = i, this.errors = l;
  }
  static forHttpCode(t, o = "") {
    return new or(
      t,
      {},
      new TextEncoder().encode(
        o || hs[t] || ""
      )
    );
  }
  static fromRawData(t) {
    return new or(
      t.httpStatusCode,
      t.headers,
      t.bytes,
      t.errors,
      t.exitCode
    );
  }
  toRawData() {
    return {
      headers: this.headers,
      bytes: this.bytes,
      errors: this.errors,
      exitCode: this.exitCode,
      httpStatusCode: this.httpStatusCode
    };
  }
  /**
   * Response body as JSON.
   */
  get json() {
    return JSON.parse(this.text);
  }
  /**
   * Response body as text.
   */
  get text() {
    return new TextDecoder().decode(this.bytes);
  }
}
(function() {
  var r;
  return typeof process < "u" && ((r = process.release) == null ? void 0 : r.name) === "node" ? "NODE" : typeof window < "u" ? "WEB" : typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope ? "WORKER" : "NODE";
})();
const Cr = "/internal/shared/php.ini", { hasOwnProperty: gr } = Object.prototype, Or = (r, t = {}) => {
  typeof t == "string" && (t = { section: t }), t.align = t.align === !0, t.newline = t.newline === !0, t.sort = t.sort === !0, t.whitespace = t.whitespace === !0 || t.align === !0, t.platform = t.platform || typeof process < "u" && process.platform, t.bracketedArray = t.bracketedArray !== !1;
  const o = t.platform === "win32" ? `\r
` : `
`, p = t.whitespace ? " = " : "=", l = [], i = t.sort ? Object.keys(r).sort() : Object.keys(r);
  let e = 0;
  t.align && (e = Ee(
    i.filter((b) => r[b] === null || Array.isArray(r[b]) || typeof r[b] != "object").map((b) => Array.isArray(r[b]) ? `${b}[]` : b).concat([""]).reduce((b, k) => Ee(b).length >= Ee(k).length ? b : k)
  ).length);
  let f = "";
  const h = t.bracketedArray ? "[]" : "";
  for (const b of i) {
    const k = r[b];
    if (k && Array.isArray(k))
      for (const m of k)
        f += Ee(`${b}${h}`).padEnd(e, " ") + p + Ee(m) + o;
    else
      k && typeof k == "object" ? l.push(b) : f += Ee(b).padEnd(e, " ") + p + Ee(k) + o;
  }
  t.section && f.length && (f = "[" + Ee(t.section) + "]" + (t.newline ? o + o : o) + f);
  for (const b of l) {
    const k = at(b, ".").join("\\."), m = (t.section ? t.section + "." : "") + k, w = Or(r[b], {
      ...t,
      section: m
    });
    f.length && w.length && (f += o), f += w;
  }
  return f;
};
function at(r, t) {
  var o = 0, p = 0, l = 0, i = [];
  do
    if (l = r.indexOf(t, o), l !== -1) {
      if (o = l + t.length, l > 0 && r[l - 1] === "\\")
        continue;
      i.push(r.slice(p, l)), p = l + t.length;
    }
  while (l !== -1);
  return i.push(r.slice(p)), i;
}
const Ir = (r, t = {}) => {
  t.bracketedArray = t.bracketedArray !== !1;
  const o = /* @__PURE__ */ Object.create(null);
  let p = o, l = null;
  const i = /^\[([^\]]*)\]\s*$|^([^=]+)(=(.*))?$/i, e = r.split(/[\r\n]+/g), f = {};
  for (const b of e) {
    if (!b || b.match(/^\s*[;#]/) || b.match(/^\s*$/))
      continue;
    const k = b.match(i);
    if (!k)
      continue;
    if (k[1] !== void 0) {
      if (l = Xe(k[1]), l === "__proto__") {
        p = /* @__PURE__ */ Object.create(null);
        continue;
      }
      p = o[l] = o[l] || /* @__PURE__ */ Object.create(null);
      continue;
    }
    const m = Xe(k[2]);
    let w;
    t.bracketedArray ? w = m.length > 2 && m.slice(-2) === "[]" : (f[m] = ((f == null ? void 0 : f[m]) || 0) + 1, w = f[m] > 1);
    const S = w ? m.slice(0, -2) : m;
    if (S === "__proto__")
      continue;
    const D = k[3] ? Xe(k[4]) : !0, P = D === "true" || D === "false" || D === "null" ? JSON.parse(D) : D;
    w && (gr.call(p, S) ? Array.isArray(p[S]) || (p[S] = [p[S]]) : p[S] = []), Array.isArray(p[S]) ? p[S].push(P) : p[S] = P;
  }
  const h = [];
  for (const b of Object.keys(o)) {
    if (!gr.call(o, b) || typeof o[b] != "object" || Array.isArray(o[b]))
      continue;
    const k = at(b, ".");
    p = o;
    const m = k.pop(), w = m.replace(/\\\./g, ".");
    for (const S of k)
      S !== "__proto__" && ((!gr.call(p, S) || typeof p[S] != "object") && (p[S] = /* @__PURE__ */ Object.create(null)), p = p[S]);
    p === o && w === m || (p[w] = o[b], h.push(b));
  }
  for (const b of h)
    delete o[b];
  return o;
}, pt = (r) => r.startsWith('"') && r.endsWith('"') || r.startsWith("'") && r.endsWith("'"), Ee = (r) => typeof r != "string" || r.match(/[=\r\n]/) || r.match(/^\[/) || r.length > 1 && pt(r) || r !== r.trim() ? JSON.stringify(r) : r.split(";").join("\\;").split("#").join("\\#"), Xe = (r) => {
  if (r = (r || "").trim(), pt(r)) {
    r.charAt(0) === "'" && (r = r.slice(1, -1));
    try {
      r = JSON.parse(r);
    } catch {
    }
  } else {
    let t = !1, o = "";
    for (let p = 0, l = r.length; p < l; p++) {
      const i = r.charAt(p);
      if (t)
        "\\;#".indexOf(i) !== -1 ? o += i : o += "\\" + i, t = !1;
      else {
        if (";#".indexOf(i) !== -1)
          break;
        i === "\\" ? t = !0 : o += i;
      }
    }
    return t && (o += "\\"), o.trim();
  }
  return r;
};
var Dr = {
  parse: Ir,
  decode: Ir,
  stringify: Or,
  encode: Or,
  safe: Ee,
  unsafe: Xe
};
async function ai(r, t) {
  const o = Dr.parse(await r.readFileAsText(Cr));
  for (const [p, l] of Object.entries(t))
    l == null ? delete o[p] : o[p] = l;
  await r.writeFile(Cr, Dr.stringify(o));
}
ReadableStream.prototype[Symbol.asyncIterator] || (ReadableStream.prototype[Symbol.asyncIterator] = async function* () {
  const r = this.getReader();
  try {
    for (; ; ) {
      const { done: t, value: o } = await r.read();
      if (t)
        return;
      yield o;
    }
  } finally {
    r.releaseLock();
  }
}, ReadableStream.prototype.iterate = // @ts-ignore
ReadableStream.prototype[Symbol.asyncIterator]);
const jr = [
  "8.3",
  "8.2",
  "8.1",
  "8.0",
  "7.4",
  "7.3",
  "7.2",
  "7.1",
  "7.0"
], gs = jr[0], pi = jr, lt = [
  "iconv",
  "mbstring",
  "xml-bundle",
  "gd"
], Wr = {
  "kitchen-sink": lt,
  light: []
}, bs = [
  "vfs",
  "literal",
  "wordpress.org/themes",
  "wordpress.org/plugins",
  "url"
];
function ws(r) {
  return r && typeof r == "object" && typeof r.resource == "string" && bs.includes(r.resource);
}
class Le {
  /**
   * Creates a new Resource based on the given file reference
   *
   * @param ref The file reference to create the Resource for
   * @param options Additional options for the Resource
   * @returns A new Resource instance
   */
  static create(t, { semaphore: o, progress: p }) {
    let l;
    switch (t.resource) {
      case "vfs":
        l = new vs(t, p);
        break;
      case "literal":
        l = new Ps(t, p);
        break;
      case "wordpress.org/themes":
        l = new Os(t, p);
        break;
      case "wordpress.org/plugins":
        l = new Es(t, p);
        break;
      case "url":
        l = new ks(t, p);
        break;
      default:
        throw new Error(`Invalid resource: ${t}`);
    }
    return l = new $s(l), o && (l = new Ts(l, o)), l;
  }
  setPlayground(t) {
    this.playground = t;
  }
  /** Whether this Resource is loaded asynchronously */
  get isAsync() {
    return !1;
  }
}
class vs extends Le {
  /**
   * Creates a new instance of `VFSResource`.
   * @param playground The playground client.
   * @param resource The VFS reference.
   * @param progress The progress tracker.
   */
  constructor(t, o) {
    super(), this.resource = t, this.progress = o;
  }
  /** @inheritDoc */
  async resolve() {
    var o;
    const t = await this.playground.readFileAsBuffer(
      this.resource.path
    );
    return (o = this.progress) == null || o.set(100), new File([t], this.name);
  }
  /** @inheritDoc */
  get name() {
    return this.resource.path.split("/").pop() || "";
  }
}
class Ps extends Le {
  /**
   * Creates a new instance of `LiteralResource`.
   * @param resource The literal reference.
   * @param progress The progress tracker.
   */
  constructor(t, o) {
    super(), this.resource = t, this.progress = o;
  }
  /** @inheritDoc */
  async resolve() {
    var t;
    return (t = this.progress) == null || t.set(100), new File([this.resource.contents], this.resource.name);
  }
  /** @inheritDoc */
  get name() {
    return this.resource.name;
  }
}
class Ar extends Le {
  /**
   * Creates a new instance of `FetchResource`.
   * @param progress The progress tracker.
   */
  constructor(t) {
    super(), this.progress = t;
  }
  /** @inheritDoc */
  async resolve() {
    var o, p;
    (o = this.progress) == null || o.setCaption(this.caption);
    const t = this.getURL();
    try {
      let l = await fetch(t);
      if (!l.ok)
        throw new Error(`Could not download "${t}"`);
      if (l = await ds(
        l,
        ((p = this.progress) == null ? void 0 : p.loadingListener) ?? _s
      ), l.status !== 200)
        throw new Error(`Could not download "${t}"`);
      return new File([await l.blob()], this.name);
    } catch (l) {
      throw new Error(
        `Could not download "${t}".
				Check if the URL is correct and the server is reachable.
				If it is reachable, the server might be blocking the request.
				Check the browser console and network tabs for more information.

				## Does the console show the error "No 'Access-Control-Allow-Origin' header"?

				This means the server that hosts your file does not allow requests from other sites
				(cross-origin requests, or CORS).	You need to move the asset to a server that allows
				cross-origin file downloads. Learn more about CORS at
				https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS.

				If your file is on GitHub, load it from "raw.githubusercontent.com".
				Here's how to do that:

				1. Start with the original GitHub URL of the file. For example:
				https://github.com/username/repository/blob/branch/filename.
				2. Replace "github.com" with "raw.githubusercontent.com".
				3. Remove the "/blob/" part of the URL.

				The resulting URL should look like this:
				https://raw.githubusercontent.com/username/repository/branch/filename

				Error:
				${l}`
      );
    }
  }
  /**
   * Gets the caption for the progress tracker.
   * @returns The caption.
   */
  get caption() {
    return `Downloading ${this.name}`;
  }
  /** @inheritDoc */
  get name() {
    try {
      return new URL(this.getURL(), "http://example.com").pathname.split("/").pop();
    } catch {
      return this.getURL();
    }
  }
  /** @inheritDoc */
  get isAsync() {
    return !0;
  }
}
const _s = () => {
};
class ks extends Ar {
  /**
   * Creates a new instance of `UrlResource`.
   * @param resource The URL reference.
   * @param progress The progress tracker.
   */
  constructor(t, o) {
    super(o), this.resource = t;
  }
  /** @inheritDoc */
  getURL() {
    return this.resource.url;
  }
  /** @inheritDoc */
  get caption() {
    return this.resource.caption ?? super.caption;
  }
}
class Os extends Ar {
  constructor(t, o) {
    super(o), this.resource = t;
  }
  get name() {
    return fr(this.resource.slug);
  }
  getURL() {
    return `https://downloads.wordpress.org/theme/${ft(this.resource.slug)}`;
  }
}
class Es extends Ar {
  constructor(t, o) {
    super(o), this.resource = t;
  }
  /** @inheritDoc */
  get name() {
    return fr(this.resource.slug);
  }
  /** @inheritDoc */
  getURL() {
    return `https://downloads.wordpress.org/plugin/${ft(this.resource.slug)}`;
  }
}
function ft(r) {
  return !r || r.endsWith(".zip") ? r : r + ".latest-stable.zip";
}
class ut extends Le {
  constructor(t) {
    super(), this.resource = t;
  }
  /** @inheritDoc */
  async resolve() {
    return this.resource.resolve();
  }
  /** @inheritDoc */
  async setPlayground(t) {
    return this.resource.setPlayground(t);
  }
  /** @inheritDoc */
  get progress() {
    return this.resource.progress;
  }
  /** @inheritDoc */
  set progress(t) {
    this.resource.progress = t;
  }
  /** @inheritDoc */
  get name() {
    return this.resource.name;
  }
  /** @inheritDoc */
  get isAsync() {
    return this.resource.isAsync;
  }
}
class $s extends ut {
  /** @inheritDoc */
  async resolve() {
    return this.promise || (this.promise = super.resolve()), this.promise;
  }
}
class Ts extends ut {
  constructor(t, o) {
    super(t), this.semaphore = o;
  }
  /** @inheritDoc */
  async resolve() {
    return this.isAsync ? this.semaphore.run(() => super.resolve()) : super.resolve();
  }
}
const js = {
  type: "object",
  properties: {
    landingPage: {
      type: "string",
      description: "The URL to navigate to after the blueprint has been run."
    },
    description: {
      type: "string",
      description: "Optional description. It doesn't do anything but is exposed as a courtesy to developers who may want to document which blueprint file does what.",
      deprecated: "Use meta.description instead."
    },
    meta: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "A clear and concise name for your Blueprint."
        },
        description: {
          type: "string",
          description: "A brief explanation of what your Blueprint offers."
        },
        author: {
          type: "string",
          description: "A GitHub username of the author of this Blueprint."
        },
        categories: {
          type: "array",
          items: { type: "string" },
          description: "Relevant categories to help users find your Blueprint in the future Blueprints section on WordPress.org."
        }
      },
      required: ["title", "author"],
      additionalProperties: !1,
      description: "Optional metadata. Used by the Blueprints gallery at https://github.com/WordPress/blueprints"
    },
    preferredVersions: {
      type: "object",
      properties: {
        php: {
          anyOf: [
            { $ref: "#/definitions/SupportedPHPVersion" },
            { type: "string", const: "latest" }
          ],
          description: "The preferred PHP version to use. If not specified, the latest supported version will be used"
        },
        wp: {
          type: "string",
          description: "The preferred WordPress version to use. If not specified, the latest supported version will be used"
        }
      },
      required: ["php", "wp"],
      additionalProperties: !1,
      description: "The preferred PHP and WordPress versions to use."
    },
    features: {
      type: "object",
      properties: {
        networking: {
          type: "boolean",
          description: "Should boot with support for network request via wp_safe_remote_get?"
        }
      },
      additionalProperties: !1
    },
    extraLibraries: {
      type: "array",
      items: { $ref: "#/definitions/ExtraLibrary" },
      description: "Extra libraries to preload into the Playground instance."
    },
    constants: {
      type: "object",
      additionalProperties: { type: "string" },
      description: "PHP Constants to define on every request"
    },
    plugins: {
      type: "array",
      items: {
        anyOf: [
          { type: "string" },
          { $ref: "#/definitions/FileReference" }
        ]
      },
      description: "WordPress plugins to install and activate"
    },
    siteOptions: {
      type: "object",
      additionalProperties: { type: "string" },
      properties: {
        blogname: { type: "string", description: "The site title" }
      },
      description: "WordPress site options to define"
    },
    login: {
      anyOf: [
        { type: "boolean" },
        {
          type: "object",
          properties: {
            username: { type: "string" },
            password: { type: "string" }
          },
          required: ["username", "password"],
          additionalProperties: !1
        }
      ],
      description: "User to log in as. If true, logs the user in as admin/password."
    },
    phpExtensionBundles: {
      type: "array",
      items: { $ref: "#/definitions/SupportedPHPExtensionBundle" },
      description: "The PHP extensions to use."
    },
    steps: {
      type: "array",
      items: {
        anyOf: [
          { $ref: "#/definitions/StepDefinition" },
          { type: "string" },
          { not: {} },
          { type: "boolean", const: !1 },
          { type: "null" }
        ]
      },
      description: "The steps to run after every other operation in this Blueprint was executed."
    },
    $schema: { type: "string" }
  },
  additionalProperties: !1
}, As = {
  type: "string",
  enum: ["8.3", "8.2", "8.1", "8.0", "7.4", "7.3", "7.2", "7.1", "7.0"]
}, qs = { type: "string", enum: ["kitchen-sink", "light"] }, dt = Object.prototype.hasOwnProperty;
function re(r, { instancePath: t = "", parentData: o, parentDataProperty: p, rootData: l = r } = {}) {
  let i = null, e = 0;
  const f = e;
  let h = !1;
  const b = e;
  if (e === e)
    if (r && typeof r == "object" && !Array.isArray(r)) {
      let x;
      if (r.resource === void 0 && (x = "resource") || r.path === void 0 && (x = "path")) {
        const I = {
          instancePath: t,
          schemaPath: "#/definitions/VFSReference/required",
          keyword: "required",
          params: { missingProperty: x },
          message: "must have required property '" + x + "'"
        };
        i === null ? i = [I] : i.push(I), e++;
      } else {
        const I = e;
        for (const z in r)
          if (!(z === "resource" || z === "path")) {
            const c = {
              instancePath: t,
              schemaPath: "#/definitions/VFSReference/additionalProperties",
              keyword: "additionalProperties",
              params: { additionalProperty: z },
              message: "must NOT have additional properties"
            };
            i === null ? i = [c] : i.push(c), e++;
            break;
          }
        if (I === e) {
          if (r.resource !== void 0) {
            let z = r.resource;
            const c = e;
            if (typeof z != "string") {
              const A = {
                instancePath: t + "/resource",
                schemaPath: "#/definitions/VFSReference/properties/resource/type",
                keyword: "type",
                params: { type: "string" },
                message: "must be string"
              };
              i === null ? i = [A] : i.push(A), e++;
            }
            if (z !== "vfs") {
              const A = {
                instancePath: t + "/resource",
                schemaPath: "#/definitions/VFSReference/properties/resource/const",
                keyword: "const",
                params: { allowedValue: "vfs" },
                message: "must be equal to constant"
              };
              i === null ? i = [A] : i.push(A), e++;
            }
            var m = c === e;
          } else
            var m = !0;
          if (m)
            if (r.path !== void 0) {
              const z = e;
              if (typeof r.path != "string") {
                const A = {
                  instancePath: t + "/path",
                  schemaPath: "#/definitions/VFSReference/properties/path/type",
                  keyword: "type",
                  params: { type: "string" },
                  message: "must be string"
                };
                i === null ? i = [A] : i.push(A), e++;
              }
              var m = z === e;
            } else
              var m = !0;
        }
      }
    } else {
      const x = {
        instancePath: t,
        schemaPath: "#/definitions/VFSReference/type",
        keyword: "type",
        params: { type: "object" },
        message: "must be object"
      };
      i === null ? i = [x] : i.push(x), e++;
    }
  var w = b === e;
  if (h = h || w, !h) {
    const x = e;
    if (e === e)
      if (r && typeof r == "object" && !Array.isArray(r)) {
        let c;
        if (r.resource === void 0 && (c = "resource") || r.name === void 0 && (c = "name") || r.contents === void 0 && (c = "contents")) {
          const A = {
            instancePath: t,
            schemaPath: "#/definitions/LiteralReference/required",
            keyword: "required",
            params: { missingProperty: c },
            message: "must have required property '" + c + "'"
          };
          i === null ? i = [A] : i.push(A), e++;
        } else {
          const A = e;
          for (const $ in r)
            if (!($ === "resource" || $ === "name" || $ === "contents")) {
              const T = {
                instancePath: t,
                schemaPath: "#/definitions/LiteralReference/additionalProperties",
                keyword: "additionalProperties",
                params: { additionalProperty: $ },
                message: "must NOT have additional properties"
              };
              i === null ? i = [T] : i.push(T), e++;
              break;
            }
          if (A === e) {
            if (r.resource !== void 0) {
              let $ = r.resource;
              const T = e;
              if (typeof $ != "string") {
                const _ = {
                  instancePath: t + "/resource",
                  schemaPath: "#/definitions/LiteralReference/properties/resource/type",
                  keyword: "type",
                  params: { type: "string" },
                  message: "must be string"
                };
                i === null ? i = [_] : i.push(_), e++;
              }
              if ($ !== "literal") {
                const _ = {
                  instancePath: t + "/resource",
                  schemaPath: "#/definitions/LiteralReference/properties/resource/const",
                  keyword: "const",
                  params: { allowedValue: "literal" },
                  message: "must be equal to constant"
                };
                i === null ? i = [_] : i.push(_), e++;
              }
              var S = T === e;
            } else
              var S = !0;
            if (S) {
              if (r.name !== void 0) {
                const $ = e;
                if (typeof r.name != "string") {
                  const _ = {
                    instancePath: t + "/name",
                    schemaPath: "#/definitions/LiteralReference/properties/name/type",
                    keyword: "type",
                    params: { type: "string" },
                    message: "must be string"
                  };
                  i === null ? i = [_] : i.push(_), e++;
                }
                var S = $ === e;
              } else
                var S = !0;
              if (S)
                if (r.contents !== void 0) {
                  let $ = r.contents;
                  const T = e, _ = e;
                  let y = !1;
                  const g = e;
                  if (typeof $ != "string") {
                    const O = {
                      instancePath: t + "/contents",
                      schemaPath: "#/definitions/LiteralReference/properties/contents/anyOf/0/type",
                      keyword: "type",
                      params: { type: "string" },
                      message: "must be string"
                    };
                    i === null ? i = [O] : i.push(O), e++;
                  }
                  var D = g === e;
                  if (y = y || D, !y) {
                    const O = e;
                    if (e === O)
                      if ($ && typeof $ == "object" && !Array.isArray($)) {
                        let q;
                        if ($.BYTES_PER_ELEMENT === void 0 && (q = "BYTES_PER_ELEMENT") || $.buffer === void 0 && (q = "buffer") || $.byteLength === void 0 && (q = "byteLength") || $.byteOffset === void 0 && (q = "byteOffset") || $.length === void 0 && (q = "length")) {
                          const W = {
                            instancePath: t + "/contents",
                            schemaPath: "#/definitions/LiteralReference/properties/contents/anyOf/1/required",
                            keyword: "required",
                            params: {
                              missingProperty: q
                            },
                            message: "must have required property '" + q + "'"
                          };
                          i === null ? i = [W] : i.push(W), e++;
                        } else {
                          const W = e;
                          for (const R in $)
                            if (!(R === "BYTES_PER_ELEMENT" || R === "buffer" || R === "byteLength" || R === "byteOffset" || R === "length")) {
                              let V = $[R];
                              const ee = e;
                              if (!(typeof V == "number" && isFinite(
                                V
                              ))) {
                                const J = {
                                  instancePath: t + "/contents/" + R.replace(
                                    /~/g,
                                    "~0"
                                  ).replace(
                                    /\//g,
                                    "~1"
                                  ),
                                  schemaPath: "#/definitions/LiteralReference/properties/contents/anyOf/1/additionalProperties/type",
                                  keyword: "type",
                                  params: {
                                    type: "number"
                                  },
                                  message: "must be number"
                                };
                                i === null ? i = [
                                  J
                                ] : i.push(
                                  J
                                ), e++;
                              }
                              var P = ee === e;
                              if (!P)
                                break;
                            }
                          if (W === e) {
                            if ($.BYTES_PER_ELEMENT !== void 0) {
                              let R = $.BYTES_PER_ELEMENT;
                              const V = e;
                              if (!(typeof R == "number" && isFinite(
                                R
                              ))) {
                                const ee = {
                                  instancePath: t + "/contents/BYTES_PER_ELEMENT",
                                  schemaPath: "#/definitions/LiteralReference/properties/contents/anyOf/1/properties/BYTES_PER_ELEMENT/type",
                                  keyword: "type",
                                  params: {
                                    type: "number"
                                  },
                                  message: "must be number"
                                };
                                i === null ? i = [
                                  ee
                                ] : i.push(
                                  ee
                                ), e++;
                              }
                              var U = V === e;
                            } else
                              var U = !0;
                            if (U) {
                              if ($.buffer !== void 0) {
                                let R = $.buffer;
                                const V = e;
                                if (e === V)
                                  if (R && typeof R == "object" && !Array.isArray(
                                    R
                                  )) {
                                    let J;
                                    if (R.byteLength === void 0 && (J = "byteLength")) {
                                      const C = {
                                        instancePath: t + "/contents/buffer",
                                        schemaPath: "#/definitions/LiteralReference/properties/contents/anyOf/1/properties/buffer/required",
                                        keyword: "required",
                                        params: {
                                          missingProperty: J
                                        },
                                        message: "must have required property '" + J + "'"
                                      };
                                      i === null ? i = [
                                        C
                                      ] : i.push(
                                        C
                                      ), e++;
                                    } else {
                                      const C = e;
                                      for (const Q in R)
                                        if (Q !== "byteLength") {
                                          const M = {
                                            instancePath: t + "/contents/buffer",
                                            schemaPath: "#/definitions/LiteralReference/properties/contents/anyOf/1/properties/buffer/additionalProperties",
                                            keyword: "additionalProperties",
                                            params: {
                                              additionalProperty: Q
                                            },
                                            message: "must NOT have additional properties"
                                          };
                                          i === null ? i = [
                                            M
                                          ] : i.push(
                                            M
                                          ), e++;
                                          break;
                                        }
                                      if (C === e && R.byteLength !== void 0) {
                                        let Q = R.byteLength;
                                        if (!(typeof Q == "number" && isFinite(
                                          Q
                                        ))) {
                                          const M = {
                                            instancePath: t + "/contents/buffer/byteLength",
                                            schemaPath: "#/definitions/LiteralReference/properties/contents/anyOf/1/properties/buffer/properties/byteLength/type",
                                            keyword: "type",
                                            params: {
                                              type: "number"
                                            },
                                            message: "must be number"
                                          };
                                          i === null ? i = [
                                            M
                                          ] : i.push(
                                            M
                                          ), e++;
                                        }
                                      }
                                    }
                                  } else {
                                    const J = {
                                      instancePath: t + "/contents/buffer",
                                      schemaPath: "#/definitions/LiteralReference/properties/contents/anyOf/1/properties/buffer/type",
                                      keyword: "type",
                                      params: {
                                        type: "object"
                                      },
                                      message: "must be object"
                                    };
                                    i === null ? i = [
                                      J
                                    ] : i.push(
                                      J
                                    ), e++;
                                  }
                                var U = V === e;
                              } else
                                var U = !0;
                              if (U) {
                                if ($.byteLength !== void 0) {
                                  let R = $.byteLength;
                                  const V = e;
                                  if (!(typeof R == "number" && isFinite(
                                    R
                                  ))) {
                                    const J = {
                                      instancePath: t + "/contents/byteLength",
                                      schemaPath: "#/definitions/LiteralReference/properties/contents/anyOf/1/properties/byteLength/type",
                                      keyword: "type",
                                      params: {
                                        type: "number"
                                      },
                                      message: "must be number"
                                    };
                                    i === null ? i = [
                                      J
                                    ] : i.push(
                                      J
                                    ), e++;
                                  }
                                  var U = V === e;
                                } else
                                  var U = !0;
                                if (U) {
                                  if ($.byteOffset !== void 0) {
                                    let R = $.byteOffset;
                                    const V = e;
                                    if (!(typeof R == "number" && isFinite(
                                      R
                                    ))) {
                                      const J = {
                                        instancePath: t + "/contents/byteOffset",
                                        schemaPath: "#/definitions/LiteralReference/properties/contents/anyOf/1/properties/byteOffset/type",
                                        keyword: "type",
                                        params: {
                                          type: "number"
                                        },
                                        message: "must be number"
                                      };
                                      i === null ? i = [
                                        J
                                      ] : i.push(
                                        J
                                      ), e++;
                                    }
                                    var U = V === e;
                                  } else
                                    var U = !0;
                                  if (U)
                                    if ($.length !== void 0) {
                                      let R = $.length;
                                      const V = e;
                                      if (!(typeof R == "number" && isFinite(
                                        R
                                      ))) {
                                        const J = {
                                          instancePath: t + "/contents/length",
                                          schemaPath: "#/definitions/LiteralReference/properties/contents/anyOf/1/properties/length/type",
                                          keyword: "type",
                                          params: {
                                            type: "number"
                                          },
                                          message: "must be number"
                                        };
                                        i === null ? i = [
                                          J
                                        ] : i.push(
                                          J
                                        ), e++;
                                      }
                                      var U = V === e;
                                    } else
                                      var U = !0;
                                }
                              }
                            }
                          }
                        }
                      } else {
                        const q = {
                          instancePath: t + "/contents",
                          schemaPath: "#/definitions/LiteralReference/properties/contents/anyOf/1/type",
                          keyword: "type",
                          params: { type: "object" },
                          message: "must be object"
                        };
                        i === null ? i = [q] : i.push(q), e++;
                      }
                    var D = O === e;
                    y = y || D;
                  }
                  if (y)
                    e = _, i !== null && (_ ? i.length = _ : i = null);
                  else {
                    const O = {
                      instancePath: t + "/contents",
                      schemaPath: "#/definitions/LiteralReference/properties/contents/anyOf",
                      keyword: "anyOf",
                      params: {},
                      message: "must match a schema in anyOf"
                    };
                    i === null ? i = [O] : i.push(O), e++;
                  }
                  var S = T === e;
                } else
                  var S = !0;
            }
          }
        }
      } else {
        const c = {
          instancePath: t,
          schemaPath: "#/definitions/LiteralReference/type",
          keyword: "type",
          params: { type: "object" },
          message: "must be object"
        };
        i === null ? i = [c] : i.push(c), e++;
      }
    var w = x === e;
    if (h = h || w, !h) {
      const c = e;
      if (e === e)
        if (r && typeof r == "object" && !Array.isArray(r)) {
          let T;
          if (r.resource === void 0 && (T = "resource") || r.slug === void 0 && (T = "slug")) {
            const _ = {
              instancePath: t,
              schemaPath: "#/definitions/CoreThemeReference/required",
              keyword: "required",
              params: { missingProperty: T },
              message: "must have required property '" + T + "'"
            };
            i === null ? i = [_] : i.push(_), e++;
          } else {
            const _ = e;
            for (const y in r)
              if (!(y === "resource" || y === "slug")) {
                const g = {
                  instancePath: t,
                  schemaPath: "#/definitions/CoreThemeReference/additionalProperties",
                  keyword: "additionalProperties",
                  params: { additionalProperty: y },
                  message: "must NOT have additional properties"
                };
                i === null ? i = [g] : i.push(g), e++;
                break;
              }
            if (_ === e) {
              if (r.resource !== void 0) {
                let y = r.resource;
                const g = e;
                if (typeof y != "string") {
                  const v = {
                    instancePath: t + "/resource",
                    schemaPath: "#/definitions/CoreThemeReference/properties/resource/type",
                    keyword: "type",
                    params: { type: "string" },
                    message: "must be string"
                  };
                  i === null ? i = [v] : i.push(v), e++;
                }
                if (y !== "wordpress.org/themes") {
                  const v = {
                    instancePath: t + "/resource",
                    schemaPath: "#/definitions/CoreThemeReference/properties/resource/const",
                    keyword: "const",
                    params: {
                      allowedValue: "wordpress.org/themes"
                    },
                    message: "must be equal to constant"
                  };
                  i === null ? i = [v] : i.push(v), e++;
                }
                var te = g === e;
              } else
                var te = !0;
              if (te)
                if (r.slug !== void 0) {
                  const y = e;
                  if (typeof r.slug != "string") {
                    const v = {
                      instancePath: t + "/slug",
                      schemaPath: "#/definitions/CoreThemeReference/properties/slug/type",
                      keyword: "type",
                      params: { type: "string" },
                      message: "must be string"
                    };
                    i === null ? i = [v] : i.push(v), e++;
                  }
                  var te = y === e;
                } else
                  var te = !0;
            }
          }
        } else {
          const T = {
            instancePath: t,
            schemaPath: "#/definitions/CoreThemeReference/type",
            keyword: "type",
            params: { type: "object" },
            message: "must be object"
          };
          i === null ? i = [T] : i.push(T), e++;
        }
      var w = c === e;
      if (h = h || w, !h) {
        const T = e;
        if (e === e)
          if (r && typeof r == "object" && !Array.isArray(r)) {
            let g;
            if (r.resource === void 0 && (g = "resource") || r.slug === void 0 && (g = "slug")) {
              const v = {
                instancePath: t,
                schemaPath: "#/definitions/CorePluginReference/required",
                keyword: "required",
                params: { missingProperty: g },
                message: "must have required property '" + g + "'"
              };
              i === null ? i = [v] : i.push(v), e++;
            } else {
              const v = e;
              for (const O in r)
                if (!(O === "resource" || O === "slug")) {
                  const N = {
                    instancePath: t,
                    schemaPath: "#/definitions/CorePluginReference/additionalProperties",
                    keyword: "additionalProperties",
                    params: { additionalProperty: O },
                    message: "must NOT have additional properties"
                  };
                  i === null ? i = [N] : i.push(N), e++;
                  break;
                }
              if (v === e) {
                if (r.resource !== void 0) {
                  let O = r.resource;
                  const N = e;
                  if (typeof O != "string") {
                    const q = {
                      instancePath: t + "/resource",
                      schemaPath: "#/definitions/CorePluginReference/properties/resource/type",
                      keyword: "type",
                      params: { type: "string" },
                      message: "must be string"
                    };
                    i === null ? i = [q] : i.push(q), e++;
                  }
                  if (O !== "wordpress.org/plugins") {
                    const q = {
                      instancePath: t + "/resource",
                      schemaPath: "#/definitions/CorePluginReference/properties/resource/const",
                      keyword: "const",
                      params: {
                        allowedValue: "wordpress.org/plugins"
                      },
                      message: "must be equal to constant"
                    };
                    i === null ? i = [q] : i.push(q), e++;
                  }
                  var H = N === e;
                } else
                  var H = !0;
                if (H)
                  if (r.slug !== void 0) {
                    const O = e;
                    if (typeof r.slug != "string") {
                      const q = {
                        instancePath: t + "/slug",
                        schemaPath: "#/definitions/CorePluginReference/properties/slug/type",
                        keyword: "type",
                        params: { type: "string" },
                        message: "must be string"
                      };
                      i === null ? i = [q] : i.push(q), e++;
                    }
                    var H = O === e;
                  } else
                    var H = !0;
              }
            }
          } else {
            const g = {
              instancePath: t,
              schemaPath: "#/definitions/CorePluginReference/type",
              keyword: "type",
              params: { type: "object" },
              message: "must be object"
            };
            i === null ? i = [g] : i.push(g), e++;
          }
        var w = T === e;
        if (h = h || w, !h) {
          const g = e;
          if (e === e)
            if (r && typeof r == "object" && !Array.isArray(r)) {
              let N;
              if (r.resource === void 0 && (N = "resource") || r.url === void 0 && (N = "url")) {
                const q = {
                  instancePath: t,
                  schemaPath: "#/definitions/UrlReference/required",
                  keyword: "required",
                  params: { missingProperty: N },
                  message: "must have required property '" + N + "'"
                };
                i === null ? i = [q] : i.push(q), e++;
              } else {
                const q = e;
                for (const W in r)
                  if (!(W === "resource" || W === "url" || W === "caption")) {
                    const R = {
                      instancePath: t,
                      schemaPath: "#/definitions/UrlReference/additionalProperties",
                      keyword: "additionalProperties",
                      params: {
                        additionalProperty: W
                      },
                      message: "must NOT have additional properties"
                    };
                    i === null ? i = [R] : i.push(R), e++;
                    break;
                  }
                if (q === e) {
                  if (r.resource !== void 0) {
                    let W = r.resource;
                    const R = e;
                    if (typeof W != "string") {
                      const V = {
                        instancePath: t + "/resource",
                        schemaPath: "#/definitions/UrlReference/properties/resource/type",
                        keyword: "type",
                        params: { type: "string" },
                        message: "must be string"
                      };
                      i === null ? i = [V] : i.push(V), e++;
                    }
                    if (W !== "url") {
                      const V = {
                        instancePath: t + "/resource",
                        schemaPath: "#/definitions/UrlReference/properties/resource/const",
                        keyword: "const",
                        params: { allowedValue: "url" },
                        message: "must be equal to constant"
                      };
                      i === null ? i = [V] : i.push(V), e++;
                    }
                    var E = R === e;
                  } else
                    var E = !0;
                  if (E) {
                    if (r.url !== void 0) {
                      const W = e;
                      if (typeof r.url != "string") {
                        const V = {
                          instancePath: t + "/url",
                          schemaPath: "#/definitions/UrlReference/properties/url/type",
                          keyword: "type",
                          params: { type: "string" },
                          message: "must be string"
                        };
                        i === null ? i = [V] : i.push(V), e++;
                      }
                      var E = W === e;
                    } else
                      var E = !0;
                    if (E)
                      if (r.caption !== void 0) {
                        const W = e;
                        if (typeof r.caption != "string") {
                          const V = {
                            instancePath: t + "/caption",
                            schemaPath: "#/definitions/UrlReference/properties/caption/type",
                            keyword: "type",
                            params: {
                              type: "string"
                            },
                            message: "must be string"
                          };
                          i === null ? i = [V] : i.push(V), e++;
                        }
                        var E = W === e;
                      } else
                        var E = !0;
                  }
                }
              }
            } else {
              const N = {
                instancePath: t,
                schemaPath: "#/definitions/UrlReference/type",
                keyword: "type",
                params: { type: "object" },
                message: "must be object"
              };
              i === null ? i = [N] : i.push(N), e++;
            }
          var w = g === e;
          h = h || w;
        }
      }
    }
  }
  if (h)
    e = f, i !== null && (f ? i.length = f : i = null);
  else {
    const x = {
      instancePath: t,
      schemaPath: "#/anyOf",
      keyword: "anyOf",
      params: {},
      message: "must match a schema in anyOf"
    };
    return i === null ? i = [x] : i.push(x), e++, re.errors = i, !1;
  }
  return re.errors = i, e === 0;
}
const br = {
  type: "object",
  discriminator: { propertyName: "step" },
  required: ["step"],
  oneOf: [
    {
      type: "object",
      additionalProperties: !1,
      properties: {
        progress: {
          type: "object",
          properties: {
            weight: { type: "number" },
            caption: { type: "string" }
          },
          additionalProperties: !1
        },
        step: { type: "string", const: "activatePlugin" },
        pluginPath: {
          type: "string",
          description: "Path to the plugin directory as absolute path (/wordpress/wp-content/plugins/plugin-name); or the plugin entry file relative to the plugins directory (plugin-name/plugin-name.php)."
        },
        pluginName: {
          type: "string",
          description: "Optional. Plugin name to display in the progress bar."
        }
      },
      required: ["pluginPath", "step"]
    },
    {
      type: "object",
      additionalProperties: !1,
      properties: {
        progress: {
          type: "object",
          properties: {
            weight: { type: "number" },
            caption: { type: "string" }
          },
          additionalProperties: !1
        },
        step: { type: "string", const: "activateTheme" },
        themeFolderName: {
          type: "string",
          description: "The name of the theme folder inside wp-content/themes/"
        }
      },
      required: ["step", "themeFolderName"]
    },
    {
      type: "object",
      additionalProperties: !1,
      properties: {
        progress: {
          type: "object",
          properties: {
            weight: { type: "number" },
            caption: { type: "string" }
          },
          additionalProperties: !1
        },
        step: { type: "string", const: "cp" },
        fromPath: { type: "string", description: "Source path" },
        toPath: { type: "string", description: "Target path" }
      },
      required: ["fromPath", "step", "toPath"]
    },
    {
      type: "object",
      additionalProperties: !1,
      properties: {
        progress: {
          type: "object",
          properties: {
            weight: { type: "number" },
            caption: { type: "string" }
          },
          additionalProperties: !1
        },
        step: { type: "string", const: "defineWpConfigConsts" },
        consts: {
          type: "object",
          additionalProperties: {},
          description: "The constants to define"
        },
        method: {
          type: "string",
          enum: ["rewrite-wp-config", "define-before-run"],
          description: `The method of defining the constants in wp-config.php. Possible values are:

- rewrite-wp-config: Default. Rewrites the wp-config.php file to                      explicitly call define() with the requested                      name and value. This method alters the file                      on the disk, but it doesn't conflict with                      existing define() calls in wp-config.php.

- define-before-run: Defines the constant before running the requested                      script. It doesn't alter any files on the disk, but                      constants defined this way may conflict with existing                      define() calls in wp-config.php.`
        },
        virtualize: {
          type: "boolean",
          deprecated: `This option is noop and will be removed in a future version.
This option is only kept in here to avoid breaking Blueprint schema validation
for existing apps using this option.`
        }
      },
      required: ["consts", "step"]
    },
    {
      type: "object",
      additionalProperties: !1,
      properties: {
        progress: {
          type: "object",
          properties: {
            weight: { type: "number" },
            caption: { type: "string" }
          },
          additionalProperties: !1
        },
        step: { type: "string", const: "defineSiteUrl" },
        siteUrl: { type: "string", description: "The URL" }
      },
      required: ["siteUrl", "step"]
    },
    {
      type: "object",
      additionalProperties: !1,
      properties: {
        progress: {
          type: "object",
          properties: {
            weight: { type: "number" },
            caption: { type: "string" }
          },
          additionalProperties: !1
        },
        step: { type: "string", const: "enableMultisite" }
      },
      required: ["step"]
    },
    {
      type: "object",
      additionalProperties: !1,
      properties: {
        progress: {
          type: "object",
          properties: {
            weight: { type: "number" },
            caption: { type: "string" }
          },
          additionalProperties: !1
        },
        step: { type: "string", const: "importWxr" },
        file: {
          $ref: "#/definitions/FileReference",
          description: "The file to import"
        }
      },
      required: ["file", "step"]
    },
    {
      type: "object",
      additionalProperties: !1,
      properties: {
        progress: {
          type: "object",
          properties: {
            weight: { type: "number" },
            caption: { type: "string" }
          },
          additionalProperties: !1
        },
        step: {
          type: "string",
          const: "importThemeStarterContent",
          description: "The step identifier."
        },
        themeSlug: {
          type: "string",
          description: "The name of the theme to import content from."
        }
      },
      required: ["step"]
    },
    {
      type: "object",
      additionalProperties: !1,
      properties: {
        progress: {
          type: "object",
          properties: {
            weight: { type: "number" },
            caption: { type: "string" }
          },
          additionalProperties: !1
        },
        step: { type: "string", const: "importWordPressFiles" },
        wordPressFilesZip: {
          $ref: "#/definitions/FileReference",
          description: "The zip file containing the top-level WordPress files and directories."
        },
        pathInZip: {
          type: "string",
          description: "The path inside the zip file where the WordPress files are."
        }
      },
      required: ["step", "wordPressFilesZip"]
    },
    {
      type: "object",
      additionalProperties: !1,
      properties: {
        progress: {
          type: "object",
          properties: {
            weight: { type: "number" },
            caption: { type: "string" }
          },
          additionalProperties: !1
        },
        ifAlreadyInstalled: {
          type: "string",
          enum: ["overwrite", "skip", "error"],
          description: "What to do if the asset already exists."
        },
        step: {
          type: "string",
          const: "installPlugin",
          description: "The step identifier."
        },
        pluginZipFile: {
          $ref: "#/definitions/FileReference",
          description: "The plugin zip file to install."
        },
        options: {
          $ref: "#/definitions/InstallPluginOptions",
          description: "Optional installation options."
        }
      },
      required: ["pluginZipFile", "step"]
    },
    {
      type: "object",
      additionalProperties: !1,
      properties: {
        progress: {
          type: "object",
          properties: {
            weight: { type: "number" },
            caption: { type: "string" }
          },
          additionalProperties: !1
        },
        ifAlreadyInstalled: {
          type: "string",
          enum: ["overwrite", "skip", "error"],
          description: "What to do if the asset already exists."
        },
        step: {
          type: "string",
          const: "installTheme",
          description: "The step identifier."
        },
        themeZipFile: {
          $ref: "#/definitions/FileReference",
          description: "The theme zip file to install."
        },
        options: {
          type: "object",
          properties: {
            activate: {
              type: "boolean",
              description: "Whether to activate the theme after installing it."
            },
            importStarterContent: {
              type: "boolean",
              description: "Whether to import the theme's starter content after installing it."
            }
          },
          additionalProperties: !1,
          description: "Optional installation options."
        }
      },
      required: ["step", "themeZipFile"]
    },
    {
      type: "object",
      additionalProperties: !1,
      properties: {
        progress: {
          type: "object",
          properties: {
            weight: { type: "number" },
            caption: { type: "string" }
          },
          additionalProperties: !1
        },
        step: { type: "string", const: "login" },
        username: {
          type: "string",
          description: "The user to log in as. Defaults to 'admin'."
        },
        password: {
          type: "string",
          description: "The password to log in with. Defaults to 'password'."
        }
      },
      required: ["step"]
    },
    {
      type: "object",
      additionalProperties: !1,
      properties: {
        progress: {
          type: "object",
          properties: {
            weight: { type: "number" },
            caption: { type: "string" }
          },
          additionalProperties: !1
        },
        step: { type: "string", const: "mkdir" },
        path: {
          type: "string",
          description: "The path of the directory you want to create"
        }
      },
      required: ["path", "step"]
    },
    {
      type: "object",
      additionalProperties: !1,
      properties: {
        progress: {
          type: "object",
          properties: {
            weight: { type: "number" },
            caption: { type: "string" }
          },
          additionalProperties: !1
        },
        step: { type: "string", const: "mv" },
        fromPath: { type: "string", description: "Source path" },
        toPath: { type: "string", description: "Target path" }
      },
      required: ["fromPath", "step", "toPath"]
    },
    {
      type: "object",
      additionalProperties: !1,
      properties: {
        progress: {
          type: "object",
          properties: {
            weight: { type: "number" },
            caption: { type: "string" }
          },
          additionalProperties: !1
        },
        step: { type: "string", const: "resetData" }
      },
      required: ["step"]
    },
    {
      type: "object",
      additionalProperties: !1,
      properties: {
        progress: {
          type: "object",
          properties: {
            weight: { type: "number" },
            caption: { type: "string" }
          },
          additionalProperties: !1
        },
        step: { type: "string", const: "request" },
        request: {
          $ref: "#/definitions/PHPRequest",
          description: "Request details (See /wordpress-playground/api/universal/interface/PHPRequest)"
        }
      },
      required: ["request", "step"]
    },
    {
      type: "object",
      additionalProperties: !1,
      properties: {
        progress: {
          type: "object",
          properties: {
            weight: { type: "number" },
            caption: { type: "string" }
          },
          additionalProperties: !1
        },
        step: { type: "string", const: "rm" },
        path: { type: "string", description: "The path to remove" }
      },
      required: ["path", "step"]
    },
    {
      type: "object",
      additionalProperties: !1,
      properties: {
        progress: {
          type: "object",
          properties: {
            weight: { type: "number" },
            caption: { type: "string" }
          },
          additionalProperties: !1
        },
        step: { type: "string", const: "rmdir" },
        path: { type: "string", description: "The path to remove" }
      },
      required: ["path", "step"]
    },
    {
      type: "object",
      additionalProperties: !1,
      properties: {
        progress: {
          type: "object",
          properties: {
            weight: { type: "number" },
            caption: { type: "string" }
          },
          additionalProperties: !1
        },
        step: {
          type: "string",
          const: "runPHP",
          description: "The step identifier."
        },
        code: { type: "string", description: "The PHP code to run." }
      },
      required: ["code", "step"]
    },
    {
      type: "object",
      additionalProperties: !1,
      properties: {
        progress: {
          type: "object",
          properties: {
            weight: { type: "number" },
            caption: { type: "string" }
          },
          additionalProperties: !1
        },
        step: { type: "string", const: "runPHPWithOptions" },
        options: {
          $ref: "#/definitions/PHPRunOptions",
          description: "Run options (See /wordpress-playground/api/universal/interface/PHPRunOptions/))"
        }
      },
      required: ["options", "step"]
    },
    {
      type: "object",
      additionalProperties: !1,
      properties: {
        progress: {
          type: "object",
          properties: {
            weight: { type: "number" },
            caption: { type: "string" }
          },
          additionalProperties: !1
        },
        step: { type: "string", const: "runWpInstallationWizard" },
        options: { $ref: "#/definitions/WordPressInstallationOptions" }
      },
      required: ["options", "step"]
    },
    {
      type: "object",
      additionalProperties: !1,
      properties: {
        progress: {
          type: "object",
          properties: {
            weight: { type: "number" },
            caption: { type: "string" }
          },
          additionalProperties: !1
        },
        step: {
          type: "string",
          const: "runSql",
          description: "The step identifier."
        },
        sql: {
          $ref: "#/definitions/FileReference",
          description: "The SQL to run. Each non-empty line must contain a valid SQL query."
        }
      },
      required: ["sql", "step"]
    },
    {
      type: "object",
      additionalProperties: !1,
      properties: {
        progress: {
          type: "object",
          properties: {
            weight: { type: "number" },
            caption: { type: "string" }
          },
          additionalProperties: !1
        },
        step: {
          type: "string",
          const: "setSiteOptions",
          description: 'The name of the step. Must be "setSiteOptions".'
        },
        options: {
          type: "object",
          additionalProperties: {},
          description: "The options to set on the site."
        }
      },
      required: ["options", "step"]
    },
    {
      type: "object",
      additionalProperties: !1,
      properties: {
        progress: {
          type: "object",
          properties: {
            weight: { type: "number" },
            caption: { type: "string" }
          },
          additionalProperties: !1
        },
        step: { type: "string", const: "unzip" },
        zipFile: {
          $ref: "#/definitions/FileReference",
          description: "The zip file to extract"
        },
        zipPath: {
          type: "string",
          description: "The path of the zip file to extract",
          deprecated: "Use zipFile instead."
        },
        extractToPath: {
          type: "string",
          description: "The path to extract the zip file to"
        }
      },
      required: ["extractToPath", "step"]
    },
    {
      type: "object",
      additionalProperties: !1,
      properties: {
        progress: {
          type: "object",
          properties: {
            weight: { type: "number" },
            caption: { type: "string" }
          },
          additionalProperties: !1
        },
        step: { type: "string", const: "updateUserMeta" },
        meta: {
          type: "object",
          additionalProperties: {},
          description: 'An object of user meta values to set, e.g. { "first_name": "John" }'
        },
        userId: { type: "number", description: "User ID" }
      },
      required: ["meta", "step", "userId"]
    },
    {
      type: "object",
      additionalProperties: !1,
      properties: {
        progress: {
          type: "object",
          properties: {
            weight: { type: "number" },
            caption: { type: "string" }
          },
          additionalProperties: !1
        },
        step: { type: "string", const: "writeFile" },
        path: {
          type: "string",
          description: "The path of the file to write to"
        },
        data: {
          anyOf: [
            { $ref: "#/definitions/FileReference" },
            { type: "string" },
            {
              type: "object",
              properties: {
                BYTES_PER_ELEMENT: { type: "number" },
                buffer: {
                  type: "object",
                  properties: {
                    byteLength: { type: "number" }
                  },
                  required: ["byteLength"],
                  additionalProperties: !1
                },
                byteLength: { type: "number" },
                byteOffset: { type: "number" },
                length: { type: "number" }
              },
              required: [
                "BYTES_PER_ELEMENT",
                "buffer",
                "byteLength",
                "byteOffset",
                "length"
              ],
              additionalProperties: { type: "number" }
            }
          ],
          description: "The data to write"
        }
      },
      required: ["data", "path", "step"]
    },
    {
      type: "object",
      additionalProperties: !1,
      properties: {
        progress: {
          type: "object",
          properties: {
            weight: { type: "number" },
            caption: { type: "string" }
          },
          additionalProperties: !1
        },
        step: {
          type: "string",
          const: "wp-cli",
          description: "The step identifier."
        },
        command: {
          anyOf: [
            { type: "string" },
            { type: "array", items: { type: "string" } }
          ],
          description: "The WP CLI command to run."
        },
        wpCliPath: { type: "string", description: "wp-cli.phar path" }
      },
      required: ["command", "step"]
    },
    {
      type: "object",
      additionalProperties: !1,
      properties: {
        progress: {
          type: "object",
          properties: {
            weight: { type: "number" },
            caption: { type: "string" }
          },
          additionalProperties: !1
        },
        step: { type: "string", const: "setSiteLanguage" },
        language: {
          type: "string",
          description: "The language to set, e.g. 'en_US'"
        }
      },
      required: ["language", "step"]
    }
  ]
}, ct = {
  type: "string",
  enum: ["GET", "POST", "HEAD", "OPTIONS", "PATCH", "PUT", "DELETE"]
};
function ye(r, { instancePath: t = "", parentData: o, parentDataProperty: p, rootData: l = r } = {}) {
  let i = null, e = 0;
  if (e === 0)
    if (r && typeof r == "object" && !Array.isArray(r)) {
      let te;
      if (r.url === void 0 && (te = "url"))
        return ye.errors = [
          {
            instancePath: t,
            schemaPath: "#/required",
            keyword: "required",
            params: { missingProperty: te },
            message: "must have required property '" + te + "'"
          }
        ], !1;
      {
        const H = e;
        for (const E in r)
          if (!(E === "method" || E === "url" || E === "headers" || E === "body"))
            return ye.errors = [
              {
                instancePath: t,
                schemaPath: "#/additionalProperties",
                keyword: "additionalProperties",
                params: { additionalProperty: E },
                message: "must NOT have additional properties"
              }
            ], !1;
        if (H === e) {
          if (r.method !== void 0) {
            let E = r.method;
            const x = e;
            if (typeof E != "string")
              return ye.errors = [
                {
                  instancePath: t + "/method",
                  schemaPath: "#/definitions/HTTPMethod/type",
                  keyword: "type",
                  params: { type: "string" },
                  message: "must be string"
                }
              ], !1;
            if (!(E === "GET" || E === "POST" || E === "HEAD" || E === "OPTIONS" || E === "PATCH" || E === "PUT" || E === "DELETE"))
              return ye.errors = [
                {
                  instancePath: t + "/method",
                  schemaPath: "#/definitions/HTTPMethod/enum",
                  keyword: "enum",
                  params: { allowedValues: ct.enum },
                  message: "must be equal to one of the allowed values"
                }
              ], !1;
            var f = x === e;
          } else
            var f = !0;
          if (f) {
            if (r.url !== void 0) {
              const E = e;
              if (typeof r.url != "string")
                return ye.errors = [
                  {
                    instancePath: t + "/url",
                    schemaPath: "#/properties/url/type",
                    keyword: "type",
                    params: { type: "string" },
                    message: "must be string"
                  }
                ], !1;
              var f = E === e;
            } else
              var f = !0;
            if (f) {
              if (r.headers !== void 0) {
                let E = r.headers;
                const x = e;
                if (e === e)
                  if (E && typeof E == "object" && !Array.isArray(E))
                    for (const c in E) {
                      const A = e;
                      if (typeof E[c] != "string")
                        return ye.errors = [
                          {
                            instancePath: t + "/headers/" + c.replace(
                              /~/g,
                              "~0"
                            ).replace(
                              /\//g,
                              "~1"
                            ),
                            schemaPath: "#/definitions/PHPRequestHeaders/additionalProperties/type",
                            keyword: "type",
                            params: {
                              type: "string"
                            },
                            message: "must be string"
                          }
                        ], !1;
                      var h = A === e;
                      if (!h)
                        break;
                    }
                  else
                    return ye.errors = [
                      {
                        instancePath: t + "/headers",
                        schemaPath: "#/definitions/PHPRequestHeaders/type",
                        keyword: "type",
                        params: { type: "object" },
                        message: "must be object"
                      }
                    ], !1;
                var f = x === e;
              } else
                var f = !0;
              if (f)
                if (r.body !== void 0) {
                  let E = r.body;
                  const x = e, I = e;
                  let z = !1;
                  const c = e;
                  if (typeof E != "string") {
                    const $ = {
                      instancePath: t + "/body",
                      schemaPath: "#/properties/body/anyOf/0/type",
                      keyword: "type",
                      params: { type: "string" },
                      message: "must be string"
                    };
                    i === null ? i = [$] : i.push($), e++;
                  }
                  var b = c === e;
                  if (z = z || b, !z) {
                    const $ = e;
                    if (e === $)
                      if (E && typeof E == "object" && !Array.isArray(E)) {
                        let _;
                        if (E.BYTES_PER_ELEMENT === void 0 && (_ = "BYTES_PER_ELEMENT") || E.buffer === void 0 && (_ = "buffer") || E.byteLength === void 0 && (_ = "byteLength") || E.byteOffset === void 0 && (_ = "byteOffset") || E.length === void 0 && (_ = "length")) {
                          const y = {
                            instancePath: t + "/body",
                            schemaPath: "#/properties/body/anyOf/1/required",
                            keyword: "required",
                            params: {
                              missingProperty: _
                            },
                            message: "must have required property '" + _ + "'"
                          };
                          i === null ? i = [y] : i.push(y), e++;
                        } else {
                          const y = e;
                          for (const g in E)
                            if (!(g === "BYTES_PER_ELEMENT" || g === "buffer" || g === "byteLength" || g === "byteOffset" || g === "length")) {
                              let v = E[g];
                              const O = e;
                              if (!(typeof v == "number" && isFinite(
                                v
                              ))) {
                                const N = {
                                  instancePath: t + "/body/" + g.replace(
                                    /~/g,
                                    "~0"
                                  ).replace(
                                    /\//g,
                                    "~1"
                                  ),
                                  schemaPath: "#/properties/body/anyOf/1/additionalProperties/type",
                                  keyword: "type",
                                  params: {
                                    type: "number"
                                  },
                                  message: "must be number"
                                };
                                i === null ? i = [
                                  N
                                ] : i.push(
                                  N
                                ), e++;
                              }
                              var k = O === e;
                              if (!k)
                                break;
                            }
                          if (y === e) {
                            if (E.BYTES_PER_ELEMENT !== void 0) {
                              let g = E.BYTES_PER_ELEMENT;
                              const v = e;
                              if (!(typeof g == "number" && isFinite(
                                g
                              ))) {
                                const O = {
                                  instancePath: t + "/body/BYTES_PER_ELEMENT",
                                  schemaPath: "#/properties/body/anyOf/1/properties/BYTES_PER_ELEMENT/type",
                                  keyword: "type",
                                  params: {
                                    type: "number"
                                  },
                                  message: "must be number"
                                };
                                i === null ? i = [
                                  O
                                ] : i.push(
                                  O
                                ), e++;
                              }
                              var m = v === e;
                            } else
                              var m = !0;
                            if (m) {
                              if (E.buffer !== void 0) {
                                let g = E.buffer;
                                const v = e;
                                if (e === v)
                                  if (g && typeof g == "object" && !Array.isArray(
                                    g
                                  )) {
                                    let N;
                                    if (g.byteLength === void 0 && (N = "byteLength")) {
                                      const q = {
                                        instancePath: t + "/body/buffer",
                                        schemaPath: "#/properties/body/anyOf/1/properties/buffer/required",
                                        keyword: "required",
                                        params: {
                                          missingProperty: N
                                        },
                                        message: "must have required property '" + N + "'"
                                      };
                                      i === null ? i = [
                                        q
                                      ] : i.push(
                                        q
                                      ), e++;
                                    } else {
                                      const q = e;
                                      for (const W in g)
                                        if (W !== "byteLength") {
                                          const R = {
                                            instancePath: t + "/body/buffer",
                                            schemaPath: "#/properties/body/anyOf/1/properties/buffer/additionalProperties",
                                            keyword: "additionalProperties",
                                            params: {
                                              additionalProperty: W
                                            },
                                            message: "must NOT have additional properties"
                                          };
                                          i === null ? i = [
                                            R
                                          ] : i.push(
                                            R
                                          ), e++;
                                          break;
                                        }
                                      if (q === e && g.byteLength !== void 0) {
                                        let W = g.byteLength;
                                        if (!(typeof W == "number" && isFinite(
                                          W
                                        ))) {
                                          const R = {
                                            instancePath: t + "/body/buffer/byteLength",
                                            schemaPath: "#/properties/body/anyOf/1/properties/buffer/properties/byteLength/type",
                                            keyword: "type",
                                            params: {
                                              type: "number"
                                            },
                                            message: "must be number"
                                          };
                                          i === null ? i = [
                                            R
                                          ] : i.push(
                                            R
                                          ), e++;
                                        }
                                      }
                                    }
                                  } else {
                                    const N = {
                                      instancePath: t + "/body/buffer",
                                      schemaPath: "#/properties/body/anyOf/1/properties/buffer/type",
                                      keyword: "type",
                                      params: {
                                        type: "object"
                                      },
                                      message: "must be object"
                                    };
                                    i === null ? i = [
                                      N
                                    ] : i.push(
                                      N
                                    ), e++;
                                  }
                                var m = v === e;
                              } else
                                var m = !0;
                              if (m) {
                                if (E.byteLength !== void 0) {
                                  let g = E.byteLength;
                                  const v = e;
                                  if (!(typeof g == "number" && isFinite(
                                    g
                                  ))) {
                                    const N = {
                                      instancePath: t + "/body/byteLength",
                                      schemaPath: "#/properties/body/anyOf/1/properties/byteLength/type",
                                      keyword: "type",
                                      params: {
                                        type: "number"
                                      },
                                      message: "must be number"
                                    };
                                    i === null ? i = [
                                      N
                                    ] : i.push(
                                      N
                                    ), e++;
                                  }
                                  var m = v === e;
                                } else
                                  var m = !0;
                                if (m) {
                                  if (E.byteOffset !== void 0) {
                                    let g = E.byteOffset;
                                    const v = e;
                                    if (!(typeof g == "number" && isFinite(
                                      g
                                    ))) {
                                      const N = {
                                        instancePath: t + "/body/byteOffset",
                                        schemaPath: "#/properties/body/anyOf/1/properties/byteOffset/type",
                                        keyword: "type",
                                        params: {
                                          type: "number"
                                        },
                                        message: "must be number"
                                      };
                                      i === null ? i = [
                                        N
                                      ] : i.push(
                                        N
                                      ), e++;
                                    }
                                    var m = v === e;
                                  } else
                                    var m = !0;
                                  if (m)
                                    if (E.length !== void 0) {
                                      let g = E.length;
                                      const v = e;
                                      if (!(typeof g == "number" && isFinite(
                                        g
                                      ))) {
                                        const N = {
                                          instancePath: t + "/body/length",
                                          schemaPath: "#/properties/body/anyOf/1/properties/length/type",
                                          keyword: "type",
                                          params: {
                                            type: "number"
                                          },
                                          message: "must be number"
                                        };
                                        i === null ? i = [
                                          N
                                        ] : i.push(
                                          N
                                        ), e++;
                                      }
                                      var m = v === e;
                                    } else
                                      var m = !0;
                                }
                              }
                            }
                          }
                        }
                      } else {
                        const _ = {
                          instancePath: t + "/body",
                          schemaPath: "#/properties/body/anyOf/1/type",
                          keyword: "type",
                          params: { type: "object" },
                          message: "must be object"
                        };
                        i === null ? i = [_] : i.push(_), e++;
                      }
                    var b = $ === e;
                    if (z = z || b, !z) {
                      const _ = e;
                      if (e === _)
                        if (E && typeof E == "object" && !Array.isArray(E))
                          for (const g in E) {
                            let v = E[g];
                            const O = e, N = e;
                            let q = !1;
                            const W = e;
                            if (typeof v != "string") {
                              const R = {
                                instancePath: t + "/body/" + g.replace(
                                  /~/g,
                                  "~0"
                                ).replace(
                                  /\//g,
                                  "~1"
                                ),
                                schemaPath: "#/properties/body/anyOf/2/additionalProperties/anyOf/0/type",
                                keyword: "type",
                                params: {
                                  type: "string"
                                },
                                message: "must be string"
                              };
                              i === null ? i = [
                                R
                              ] : i.push(
                                R
                              ), e++;
                            }
                            var w = W === e;
                            if (q = q || w, !q) {
                              const R = e;
                              if (e === R)
                                if (v && typeof v == "object" && !Array.isArray(
                                  v
                                )) {
                                  let ee;
                                  if (v.BYTES_PER_ELEMENT === void 0 && (ee = "BYTES_PER_ELEMENT") || v.buffer === void 0 && (ee = "buffer") || v.byteLength === void 0 && (ee = "byteLength") || v.byteOffset === void 0 && (ee = "byteOffset") || v.length === void 0 && (ee = "length")) {
                                    const J = {
                                      instancePath: t + "/body/" + g.replace(
                                        /~/g,
                                        "~0"
                                      ).replace(
                                        /\//g,
                                        "~1"
                                      ),
                                      schemaPath: "#/properties/body/anyOf/2/additionalProperties/anyOf/1/required",
                                      keyword: "required",
                                      params: {
                                        missingProperty: ee
                                      },
                                      message: "must have required property '" + ee + "'"
                                    };
                                    i === null ? i = [
                                      J
                                    ] : i.push(
                                      J
                                    ), e++;
                                  } else {
                                    const J = e;
                                    for (const C in v)
                                      if (!(C === "BYTES_PER_ELEMENT" || C === "buffer" || C === "byteLength" || C === "byteOffset" || C === "length")) {
                                        let Q = v[C];
                                        const M = e;
                                        if (!(typeof Q == "number" && isFinite(
                                          Q
                                        ))) {
                                          const Y = {
                                            instancePath: t + "/body/" + g.replace(
                                              /~/g,
                                              "~0"
                                            ).replace(
                                              /\//g,
                                              "~1"
                                            ) + "/" + C.replace(
                                              /~/g,
                                              "~0"
                                            ).replace(
                                              /\//g,
                                              "~1"
                                            ),
                                            schemaPath: "#/properties/body/anyOf/2/additionalProperties/anyOf/1/additionalProperties/type",
                                            keyword: "type",
                                            params: {
                                              type: "number"
                                            },
                                            message: "must be number"
                                          };
                                          i === null ? i = [
                                            Y
                                          ] : i.push(
                                            Y
                                          ), e++;
                                        }
                                        var S = M === e;
                                        if (!S)
                                          break;
                                      }
                                    if (J === e) {
                                      if (v.BYTES_PER_ELEMENT !== void 0) {
                                        let C = v.BYTES_PER_ELEMENT;
                                        const Q = e;
                                        if (!(typeof C == "number" && isFinite(
                                          C
                                        ))) {
                                          const M = {
                                            instancePath: t + "/body/" + g.replace(
                                              /~/g,
                                              "~0"
                                            ).replace(
                                              /\//g,
                                              "~1"
                                            ) + "/BYTES_PER_ELEMENT",
                                            schemaPath: "#/properties/body/anyOf/2/additionalProperties/anyOf/1/properties/BYTES_PER_ELEMENT/type",
                                            keyword: "type",
                                            params: {
                                              type: "number"
                                            },
                                            message: "must be number"
                                          };
                                          i === null ? i = [
                                            M
                                          ] : i.push(
                                            M
                                          ), e++;
                                        }
                                        var D = Q === e;
                                      } else
                                        var D = !0;
                                      if (D) {
                                        if (v.buffer !== void 0) {
                                          let C = v.buffer;
                                          const Q = e;
                                          if (e === Q)
                                            if (C && typeof C == "object" && !Array.isArray(
                                              C
                                            )) {
                                              let Y;
                                              if (C.byteLength === void 0 && (Y = "byteLength")) {
                                                const K = {
                                                  instancePath: t + "/body/" + g.replace(
                                                    /~/g,
                                                    "~0"
                                                  ).replace(
                                                    /\//g,
                                                    "~1"
                                                  ) + "/buffer",
                                                  schemaPath: "#/properties/body/anyOf/2/additionalProperties/anyOf/1/properties/buffer/required",
                                                  keyword: "required",
                                                  params: {
                                                    missingProperty: Y
                                                  },
                                                  message: "must have required property '" + Y + "'"
                                                };
                                                i === null ? i = [
                                                  K
                                                ] : i.push(
                                                  K
                                                ), e++;
                                              } else {
                                                const K = e;
                                                for (const le in C)
                                                  if (le !== "byteLength") {
                                                    const fe = {
                                                      instancePath: t + "/body/" + g.replace(
                                                        /~/g,
                                                        "~0"
                                                      ).replace(
                                                        /\//g,
                                                        "~1"
                                                      ) + "/buffer",
                                                      schemaPath: "#/properties/body/anyOf/2/additionalProperties/anyOf/1/properties/buffer/additionalProperties",
                                                      keyword: "additionalProperties",
                                                      params: {
                                                        additionalProperty: le
                                                      },
                                                      message: "must NOT have additional properties"
                                                    };
                                                    i === null ? i = [
                                                      fe
                                                    ] : i.push(
                                                      fe
                                                    ), e++;
                                                    break;
                                                  }
                                                if (K === e && C.byteLength !== void 0) {
                                                  let le = C.byteLength;
                                                  if (!(typeof le == "number" && isFinite(
                                                    le
                                                  ))) {
                                                    const fe = {
                                                      instancePath: t + "/body/" + g.replace(
                                                        /~/g,
                                                        "~0"
                                                      ).replace(
                                                        /\//g,
                                                        "~1"
                                                      ) + "/buffer/byteLength",
                                                      schemaPath: "#/properties/body/anyOf/2/additionalProperties/anyOf/1/properties/buffer/properties/byteLength/type",
                                                      keyword: "type",
                                                      params: {
                                                        type: "number"
                                                      },
                                                      message: "must be number"
                                                    };
                                                    i === null ? i = [
                                                      fe
                                                    ] : i.push(
                                                      fe
                                                    ), e++;
                                                  }
                                                }
                                              }
                                            } else {
                                              const Y = {
                                                instancePath: t + "/body/" + g.replace(
                                                  /~/g,
                                                  "~0"
                                                ).replace(
                                                  /\//g,
                                                  "~1"
                                                ) + "/buffer",
                                                schemaPath: "#/properties/body/anyOf/2/additionalProperties/anyOf/1/properties/buffer/type",
                                                keyword: "type",
                                                params: {
                                                  type: "object"
                                                },
                                                message: "must be object"
                                              };
                                              i === null ? i = [
                                                Y
                                              ] : i.push(
                                                Y
                                              ), e++;
                                            }
                                          var D = Q === e;
                                        } else
                                          var D = !0;
                                        if (D) {
                                          if (v.byteLength !== void 0) {
                                            let C = v.byteLength;
                                            const Q = e;
                                            if (!(typeof C == "number" && isFinite(
                                              C
                                            ))) {
                                              const Y = {
                                                instancePath: t + "/body/" + g.replace(
                                                  /~/g,
                                                  "~0"
                                                ).replace(
                                                  /\//g,
                                                  "~1"
                                                ) + "/byteLength",
                                                schemaPath: "#/properties/body/anyOf/2/additionalProperties/anyOf/1/properties/byteLength/type",
                                                keyword: "type",
                                                params: {
                                                  type: "number"
                                                },
                                                message: "must be number"
                                              };
                                              i === null ? i = [
                                                Y
                                              ] : i.push(
                                                Y
                                              ), e++;
                                            }
                                            var D = Q === e;
                                          } else
                                            var D = !0;
                                          if (D) {
                                            if (v.byteOffset !== void 0) {
                                              let C = v.byteOffset;
                                              const Q = e;
                                              if (!(typeof C == "number" && isFinite(
                                                C
                                              ))) {
                                                const Y = {
                                                  instancePath: t + "/body/" + g.replace(
                                                    /~/g,
                                                    "~0"
                                                  ).replace(
                                                    /\//g,
                                                    "~1"
                                                  ) + "/byteOffset",
                                                  schemaPath: "#/properties/body/anyOf/2/additionalProperties/anyOf/1/properties/byteOffset/type",
                                                  keyword: "type",
                                                  params: {
                                                    type: "number"
                                                  },
                                                  message: "must be number"
                                                };
                                                i === null ? i = [
                                                  Y
                                                ] : i.push(
                                                  Y
                                                ), e++;
                                              }
                                              var D = Q === e;
                                            } else
                                              var D = !0;
                                            if (D)
                                              if (v.length !== void 0) {
                                                let C = v.length;
                                                const Q = e;
                                                if (!(typeof C == "number" && isFinite(
                                                  C
                                                ))) {
                                                  const Y = {
                                                    instancePath: t + "/body/" + g.replace(
                                                      /~/g,
                                                      "~0"
                                                    ).replace(
                                                      /\//g,
                                                      "~1"
                                                    ) + "/length",
                                                    schemaPath: "#/properties/body/anyOf/2/additionalProperties/anyOf/1/properties/length/type",
                                                    keyword: "type",
                                                    params: {
                                                      type: "number"
                                                    },
                                                    message: "must be number"
                                                  };
                                                  i === null ? i = [
                                                    Y
                                                  ] : i.push(
                                                    Y
                                                  ), e++;
                                                }
                                                var D = Q === e;
                                              } else
                                                var D = !0;
                                          }
                                        }
                                      }
                                    }
                                  }
                                } else {
                                  const ee = {
                                    instancePath: t + "/body/" + g.replace(
                                      /~/g,
                                      "~0"
                                    ).replace(
                                      /\//g,
                                      "~1"
                                    ),
                                    schemaPath: "#/properties/body/anyOf/2/additionalProperties/anyOf/1/type",
                                    keyword: "type",
                                    params: {
                                      type: "object"
                                    },
                                    message: "must be object"
                                  };
                                  i === null ? i = [
                                    ee
                                  ] : i.push(
                                    ee
                                  ), e++;
                                }
                              var w = R === e;
                              if (q = q || w, !q) {
                                const ee = e;
                                if (e === ee)
                                  if (v && typeof v == "object" && !Array.isArray(
                                    v
                                  )) {
                                    let C;
                                    if (v.lastModified === void 0 && (C = "lastModified") || v.name === void 0 && (C = "name") || v.size === void 0 && (C = "size") || v.type === void 0 && (C = "type") || v.webkitRelativePath === void 0 && (C = "webkitRelativePath")) {
                                      const Q = {
                                        instancePath: t + "/body/" + g.replace(
                                          /~/g,
                                          "~0"
                                        ).replace(
                                          /\//g,
                                          "~1"
                                        ),
                                        schemaPath: "#/properties/body/anyOf/2/additionalProperties/anyOf/2/required",
                                        keyword: "required",
                                        params: {
                                          missingProperty: C
                                        },
                                        message: "must have required property '" + C + "'"
                                      };
                                      i === null ? i = [
                                        Q
                                      ] : i.push(
                                        Q
                                      ), e++;
                                    } else {
                                      const Q = e;
                                      for (const M in v)
                                        if (!(M === "size" || M === "type" || M === "lastModified" || M === "name" || M === "webkitRelativePath")) {
                                          const Y = {
                                            instancePath: t + "/body/" + g.replace(
                                              /~/g,
                                              "~0"
                                            ).replace(
                                              /\//g,
                                              "~1"
                                            ),
                                            schemaPath: "#/properties/body/anyOf/2/additionalProperties/anyOf/2/additionalProperties",
                                            keyword: "additionalProperties",
                                            params: {
                                              additionalProperty: M
                                            },
                                            message: "must NOT have additional properties"
                                          };
                                          i === null ? i = [
                                            Y
                                          ] : i.push(
                                            Y
                                          ), e++;
                                          break;
                                        }
                                      if (Q === e) {
                                        if (v.size !== void 0) {
                                          let M = v.size;
                                          const Y = e;
                                          if (!(typeof M == "number" && isFinite(
                                            M
                                          ))) {
                                            const K = {
                                              instancePath: t + "/body/" + g.replace(
                                                /~/g,
                                                "~0"
                                              ).replace(
                                                /\//g,
                                                "~1"
                                              ) + "/size",
                                              schemaPath: "#/properties/body/anyOf/2/additionalProperties/anyOf/2/properties/size/type",
                                              keyword: "type",
                                              params: {
                                                type: "number"
                                              },
                                              message: "must be number"
                                            };
                                            i === null ? i = [
                                              K
                                            ] : i.push(
                                              K
                                            ), e++;
                                          }
                                          var P = Y === e;
                                        } else
                                          var P = !0;
                                        if (P) {
                                          if (v.type !== void 0) {
                                            const M = e;
                                            if (typeof v.type != "string") {
                                              const K = {
                                                instancePath: t + "/body/" + g.replace(
                                                  /~/g,
                                                  "~0"
                                                ).replace(
                                                  /\//g,
                                                  "~1"
                                                ) + "/type",
                                                schemaPath: "#/properties/body/anyOf/2/additionalProperties/anyOf/2/properties/type/type",
                                                keyword: "type",
                                                params: {
                                                  type: "string"
                                                },
                                                message: "must be string"
                                              };
                                              i === null ? i = [
                                                K
                                              ] : i.push(
                                                K
                                              ), e++;
                                            }
                                            var P = M === e;
                                          } else
                                            var P = !0;
                                          if (P) {
                                            if (v.lastModified !== void 0) {
                                              let M = v.lastModified;
                                              const Y = e;
                                              if (!(typeof M == "number" && isFinite(
                                                M
                                              ))) {
                                                const le = {
                                                  instancePath: t + "/body/" + g.replace(
                                                    /~/g,
                                                    "~0"
                                                  ).replace(
                                                    /\//g,
                                                    "~1"
                                                  ) + "/lastModified",
                                                  schemaPath: "#/properties/body/anyOf/2/additionalProperties/anyOf/2/properties/lastModified/type",
                                                  keyword: "type",
                                                  params: {
                                                    type: "number"
                                                  },
                                                  message: "must be number"
                                                };
                                                i === null ? i = [
                                                  le
                                                ] : i.push(
                                                  le
                                                ), e++;
                                              }
                                              var P = Y === e;
                                            } else
                                              var P = !0;
                                            if (P) {
                                              if (v.name !== void 0) {
                                                const M = e;
                                                if (typeof v.name != "string") {
                                                  const K = {
                                                    instancePath: t + "/body/" + g.replace(
                                                      /~/g,
                                                      "~0"
                                                    ).replace(
                                                      /\//g,
                                                      "~1"
                                                    ) + "/name",
                                                    schemaPath: "#/properties/body/anyOf/2/additionalProperties/anyOf/2/properties/name/type",
                                                    keyword: "type",
                                                    params: {
                                                      type: "string"
                                                    },
                                                    message: "must be string"
                                                  };
                                                  i === null ? i = [
                                                    K
                                                  ] : i.push(
                                                    K
                                                  ), e++;
                                                }
                                                var P = M === e;
                                              } else
                                                var P = !0;
                                              if (P)
                                                if (v.webkitRelativePath !== void 0) {
                                                  const M = e;
                                                  if (typeof v.webkitRelativePath != "string") {
                                                    const K = {
                                                      instancePath: t + "/body/" + g.replace(
                                                        /~/g,
                                                        "~0"
                                                      ).replace(
                                                        /\//g,
                                                        "~1"
                                                      ) + "/webkitRelativePath",
                                                      schemaPath: "#/properties/body/anyOf/2/additionalProperties/anyOf/2/properties/webkitRelativePath/type",
                                                      keyword: "type",
                                                      params: {
                                                        type: "string"
                                                      },
                                                      message: "must be string"
                                                    };
                                                    i === null ? i = [
                                                      K
                                                    ] : i.push(
                                                      K
                                                    ), e++;
                                                  }
                                                  var P = M === e;
                                                } else
                                                  var P = !0;
                                            }
                                          }
                                        }
                                      }
                                    }
                                  } else {
                                    const C = {
                                      instancePath: t + "/body/" + g.replace(
                                        /~/g,
                                        "~0"
                                      ).replace(
                                        /\//g,
                                        "~1"
                                      ),
                                      schemaPath: "#/properties/body/anyOf/2/additionalProperties/anyOf/2/type",
                                      keyword: "type",
                                      params: {
                                        type: "object"
                                      },
                                      message: "must be object"
                                    };
                                    i === null ? i = [
                                      C
                                    ] : i.push(
                                      C
                                    ), e++;
                                  }
                                var w = ee === e;
                                q = q || w;
                              }
                            }
                            if (q)
                              e = N, i !== null && (N ? i.length = N : i = null);
                            else {
                              const R = {
                                instancePath: t + "/body/" + g.replace(
                                  /~/g,
                                  "~0"
                                ).replace(
                                  /\//g,
                                  "~1"
                                ),
                                schemaPath: "#/properties/body/anyOf/2/additionalProperties/anyOf",
                                keyword: "anyOf",
                                params: {},
                                message: "must match a schema in anyOf"
                              };
                              i === null ? i = [
                                R
                              ] : i.push(
                                R
                              ), e++;
                            }
                            var U = O === e;
                            if (!U)
                              break;
                          }
                        else {
                          const g = {
                            instancePath: t + "/body",
                            schemaPath: "#/properties/body/anyOf/2/type",
                            keyword: "type",
                            params: {
                              type: "object"
                            },
                            message: "must be object"
                          };
                          i === null ? i = [g] : i.push(g), e++;
                        }
                      var b = _ === e;
                      z = z || b;
                    }
                  }
                  if (z)
                    e = I, i !== null && (I ? i.length = I : i = null);
                  else {
                    const $ = {
                      instancePath: t + "/body",
                      schemaPath: "#/properties/body/anyOf",
                      keyword: "anyOf",
                      params: {},
                      message: "must match a schema in anyOf"
                    };
                    return i === null ? i = [$] : i.push($), e++, ye.errors = i, !1;
                  }
                  var f = x === e;
                } else
                  var f = !0;
            }
          }
        }
      }
    } else
      return ye.errors = [
        {
          instancePath: t,
          schemaPath: "#/type",
          keyword: "type",
          params: { type: "object" },
          message: "must be object"
        }
      ], !1;
  return ye.errors = i, e === 0;
}
const Rs = {
  type: "object",
  properties: {
    relativeUri: {
      type: "string",
      description: "Request path following the domain:port part."
    },
    scriptPath: {
      type: "string",
      description: "Path of the .php file to execute."
    },
    protocol: { type: "string", description: "Request protocol." },
    method: {
      $ref: "#/definitions/HTTPMethod",
      description: "Request method. Default: `GET`."
    },
    headers: {
      $ref: "#/definitions/PHPRequestHeaders",
      description: "Request headers."
    },
    body: {
      anyOf: [
        { type: "string" },
        {
          type: "object",
          properties: {
            BYTES_PER_ELEMENT: { type: "number" },
            buffer: {
              type: "object",
              properties: { byteLength: { type: "number" } },
              required: ["byteLength"],
              additionalProperties: !1
            },
            byteLength: { type: "number" },
            byteOffset: { type: "number" },
            length: { type: "number" }
          },
          required: [
            "BYTES_PER_ELEMENT",
            "buffer",
            "byteLength",
            "byteOffset",
            "length"
          ],
          additionalProperties: { type: "number" }
        }
      ],
      description: "Request body."
    },
    env: {
      type: "object",
      additionalProperties: { type: "string" },
      description: "Environment variables to set for this run."
    },
    $_SERVER: {
      type: "object",
      additionalProperties: { type: "string" },
      description: "$_SERVER entries to set for this run."
    },
    code: {
      type: "string",
      description: "The code snippet to eval instead of a php file."
    }
  },
  additionalProperties: !1
};
function oe(r, { instancePath: t = "", parentData: o, parentDataProperty: p, rootData: l = r } = {}) {
  let i = null, e = 0;
  if (e === 0)
    if (r && typeof r == "object" && !Array.isArray(r)) {
      const D = e;
      for (const P in r)
        if (!dt.call(Rs.properties, P))
          return oe.errors = [
            {
              instancePath: t,
              schemaPath: "#/additionalProperties",
              keyword: "additionalProperties",
              params: { additionalProperty: P },
              message: "must NOT have additional properties"
            }
          ], !1;
      if (D === e) {
        if (r.relativeUri !== void 0) {
          const P = e;
          if (typeof r.relativeUri != "string")
            return oe.errors = [
              {
                instancePath: t + "/relativeUri",
                schemaPath: "#/properties/relativeUri/type",
                keyword: "type",
                params: { type: "string" },
                message: "must be string"
              }
            ], !1;
          var f = P === e;
        } else
          var f = !0;
        if (f) {
          if (r.scriptPath !== void 0) {
            const P = e;
            if (typeof r.scriptPath != "string")
              return oe.errors = [
                {
                  instancePath: t + "/scriptPath",
                  schemaPath: "#/properties/scriptPath/type",
                  keyword: "type",
                  params: { type: "string" },
                  message: "must be string"
                }
              ], !1;
            var f = P === e;
          } else
            var f = !0;
          if (f) {
            if (r.protocol !== void 0) {
              const P = e;
              if (typeof r.protocol != "string")
                return oe.errors = [
                  {
                    instancePath: t + "/protocol",
                    schemaPath: "#/properties/protocol/type",
                    keyword: "type",
                    params: { type: "string" },
                    message: "must be string"
                  }
                ], !1;
              var f = P === e;
            } else
              var f = !0;
            if (f) {
              if (r.method !== void 0) {
                let P = r.method;
                const U = e;
                if (typeof P != "string")
                  return oe.errors = [
                    {
                      instancePath: t + "/method",
                      schemaPath: "#/definitions/HTTPMethod/type",
                      keyword: "type",
                      params: { type: "string" },
                      message: "must be string"
                    }
                  ], !1;
                if (!(P === "GET" || P === "POST" || P === "HEAD" || P === "OPTIONS" || P === "PATCH" || P === "PUT" || P === "DELETE"))
                  return oe.errors = [
                    {
                      instancePath: t + "/method",
                      schemaPath: "#/definitions/HTTPMethod/enum",
                      keyword: "enum",
                      params: {
                        allowedValues: ct.enum
                      },
                      message: "must be equal to one of the allowed values"
                    }
                  ], !1;
                var f = U === e;
              } else
                var f = !0;
              if (f) {
                if (r.headers !== void 0) {
                  let P = r.headers;
                  const U = e;
                  if (e === e)
                    if (P && typeof P == "object" && !Array.isArray(P))
                      for (const E in P) {
                        const x = e;
                        if (typeof P[E] != "string")
                          return oe.errors = [
                            {
                              instancePath: t + "/headers/" + E.replace(
                                /~/g,
                                "~0"
                              ).replace(
                                /\//g,
                                "~1"
                              ),
                              schemaPath: "#/definitions/PHPRequestHeaders/additionalProperties/type",
                              keyword: "type",
                              params: {
                                type: "string"
                              },
                              message: "must be string"
                            }
                          ], !1;
                        var h = x === e;
                        if (!h)
                          break;
                      }
                    else
                      return oe.errors = [
                        {
                          instancePath: t + "/headers",
                          schemaPath: "#/definitions/PHPRequestHeaders/type",
                          keyword: "type",
                          params: { type: "object" },
                          message: "must be object"
                        }
                      ], !1;
                  var f = U === e;
                } else
                  var f = !0;
                if (f) {
                  if (r.body !== void 0) {
                    let P = r.body;
                    const U = e, te = e;
                    let H = !1;
                    const E = e;
                    if (typeof P != "string") {
                      const I = {
                        instancePath: t + "/body",
                        schemaPath: "#/properties/body/anyOf/0/type",
                        keyword: "type",
                        params: { type: "string" },
                        message: "must be string"
                      };
                      i === null ? i = [I] : i.push(I), e++;
                    }
                    var b = E === e;
                    if (H = H || b, !H) {
                      const I = e;
                      if (e === I)
                        if (P && typeof P == "object" && !Array.isArray(P)) {
                          let c;
                          if (P.BYTES_PER_ELEMENT === void 0 && (c = "BYTES_PER_ELEMENT") || P.buffer === void 0 && (c = "buffer") || P.byteLength === void 0 && (c = "byteLength") || P.byteOffset === void 0 && (c = "byteOffset") || P.length === void 0 && (c = "length")) {
                            const A = {
                              instancePath: t + "/body",
                              schemaPath: "#/properties/body/anyOf/1/required",
                              keyword: "required",
                              params: {
                                missingProperty: c
                              },
                              message: "must have required property '" + c + "'"
                            };
                            i === null ? i = [A] : i.push(A), e++;
                          } else {
                            const A = e;
                            for (const $ in P)
                              if (!($ === "BYTES_PER_ELEMENT" || $ === "buffer" || $ === "byteLength" || $ === "byteOffset" || $ === "length")) {
                                let T = P[$];
                                const _ = e;
                                if (!(typeof T == "number" && isFinite(
                                  T
                                ))) {
                                  const y = {
                                    instancePath: t + "/body/" + $.replace(
                                      /~/g,
                                      "~0"
                                    ).replace(
                                      /\//g,
                                      "~1"
                                    ),
                                    schemaPath: "#/properties/body/anyOf/1/additionalProperties/type",
                                    keyword: "type",
                                    params: {
                                      type: "number"
                                    },
                                    message: "must be number"
                                  };
                                  i === null ? i = [
                                    y
                                  ] : i.push(
                                    y
                                  ), e++;
                                }
                                var k = _ === e;
                                if (!k)
                                  break;
                              }
                            if (A === e) {
                              if (P.BYTES_PER_ELEMENT !== void 0) {
                                let $ = P.BYTES_PER_ELEMENT;
                                const T = e;
                                if (!(typeof $ == "number" && isFinite(
                                  $
                                ))) {
                                  const _ = {
                                    instancePath: t + "/body/BYTES_PER_ELEMENT",
                                    schemaPath: "#/properties/body/anyOf/1/properties/BYTES_PER_ELEMENT/type",
                                    keyword: "type",
                                    params: {
                                      type: "number"
                                    },
                                    message: "must be number"
                                  };
                                  i === null ? i = [
                                    _
                                  ] : i.push(
                                    _
                                  ), e++;
                                }
                                var m = T === e;
                              } else
                                var m = !0;
                              if (m) {
                                if (P.buffer !== void 0) {
                                  let $ = P.buffer;
                                  const T = e;
                                  if (e === T)
                                    if ($ && typeof $ == "object" && !Array.isArray(
                                      $
                                    )) {
                                      let y;
                                      if ($.byteLength === void 0 && (y = "byteLength")) {
                                        const g = {
                                          instancePath: t + "/body/buffer",
                                          schemaPath: "#/properties/body/anyOf/1/properties/buffer/required",
                                          keyword: "required",
                                          params: {
                                            missingProperty: y
                                          },
                                          message: "must have required property '" + y + "'"
                                        };
                                        i === null ? i = [
                                          g
                                        ] : i.push(
                                          g
                                        ), e++;
                                      } else {
                                        const g = e;
                                        for (const v in $)
                                          if (v !== "byteLength") {
                                            const O = {
                                              instancePath: t + "/body/buffer",
                                              schemaPath: "#/properties/body/anyOf/1/properties/buffer/additionalProperties",
                                              keyword: "additionalProperties",
                                              params: {
                                                additionalProperty: v
                                              },
                                              message: "must NOT have additional properties"
                                            };
                                            i === null ? i = [
                                              O
                                            ] : i.push(
                                              O
                                            ), e++;
                                            break;
                                          }
                                        if (g === e && $.byteLength !== void 0) {
                                          let v = $.byteLength;
                                          if (!(typeof v == "number" && isFinite(
                                            v
                                          ))) {
                                            const O = {
                                              instancePath: t + "/body/buffer/byteLength",
                                              schemaPath: "#/properties/body/anyOf/1/properties/buffer/properties/byteLength/type",
                                              keyword: "type",
                                              params: {
                                                type: "number"
                                              },
                                              message: "must be number"
                                            };
                                            i === null ? i = [
                                              O
                                            ] : i.push(
                                              O
                                            ), e++;
                                          }
                                        }
                                      }
                                    } else {
                                      const y = {
                                        instancePath: t + "/body/buffer",
                                        schemaPath: "#/properties/body/anyOf/1/properties/buffer/type",
                                        keyword: "type",
                                        params: {
                                          type: "object"
                                        },
                                        message: "must be object"
                                      };
                                      i === null ? i = [
                                        y
                                      ] : i.push(
                                        y
                                      ), e++;
                                    }
                                  var m = T === e;
                                } else
                                  var m = !0;
                                if (m) {
                                  if (P.byteLength !== void 0) {
                                    let $ = P.byteLength;
                                    const T = e;
                                    if (!(typeof $ == "number" && isFinite(
                                      $
                                    ))) {
                                      const y = {
                                        instancePath: t + "/body/byteLength",
                                        schemaPath: "#/properties/body/anyOf/1/properties/byteLength/type",
                                        keyword: "type",
                                        params: {
                                          type: "number"
                                        },
                                        message: "must be number"
                                      };
                                      i === null ? i = [
                                        y
                                      ] : i.push(
                                        y
                                      ), e++;
                                    }
                                    var m = T === e;
                                  } else
                                    var m = !0;
                                  if (m) {
                                    if (P.byteOffset !== void 0) {
                                      let $ = P.byteOffset;
                                      const T = e;
                                      if (!(typeof $ == "number" && isFinite(
                                        $
                                      ))) {
                                        const y = {
                                          instancePath: t + "/body/byteOffset",
                                          schemaPath: "#/properties/body/anyOf/1/properties/byteOffset/type",
                                          keyword: "type",
                                          params: {
                                            type: "number"
                                          },
                                          message: "must be number"
                                        };
                                        i === null ? i = [
                                          y
                                        ] : i.push(
                                          y
                                        ), e++;
                                      }
                                      var m = T === e;
                                    } else
                                      var m = !0;
                                    if (m)
                                      if (P.length !== void 0) {
                                        let $ = P.length;
                                        const T = e;
                                        if (!(typeof $ == "number" && isFinite(
                                          $
                                        ))) {
                                          const y = {
                                            instancePath: t + "/body/length",
                                            schemaPath: "#/properties/body/anyOf/1/properties/length/type",
                                            keyword: "type",
                                            params: {
                                              type: "number"
                                            },
                                            message: "must be number"
                                          };
                                          i === null ? i = [
                                            y
                                          ] : i.push(
                                            y
                                          ), e++;
                                        }
                                        var m = T === e;
                                      } else
                                        var m = !0;
                                  }
                                }
                              }
                            }
                          }
                        } else {
                          const c = {
                            instancePath: t + "/body",
                            schemaPath: "#/properties/body/anyOf/1/type",
                            keyword: "type",
                            params: {
                              type: "object"
                            },
                            message: "must be object"
                          };
                          i === null ? i = [c] : i.push(c), e++;
                        }
                      var b = I === e;
                      H = H || b;
                    }
                    if (H)
                      e = te, i !== null && (te ? i.length = te : i = null);
                    else {
                      const I = {
                        instancePath: t + "/body",
                        schemaPath: "#/properties/body/anyOf",
                        keyword: "anyOf",
                        params: {},
                        message: "must match a schema in anyOf"
                      };
                      return i === null ? i = [I] : i.push(I), e++, oe.errors = i, !1;
                    }
                    var f = U === e;
                  } else
                    var f = !0;
                  if (f) {
                    if (r.env !== void 0) {
                      let P = r.env;
                      const U = e;
                      if (e === U)
                        if (P && typeof P == "object" && !Array.isArray(P))
                          for (const H in P) {
                            const E = e;
                            if (typeof P[H] != "string")
                              return oe.errors = [
                                {
                                  instancePath: t + "/env/" + H.replace(
                                    /~/g,
                                    "~0"
                                  ).replace(
                                    /\//g,
                                    "~1"
                                  ),
                                  schemaPath: "#/properties/env/additionalProperties/type",
                                  keyword: "type",
                                  params: {
                                    type: "string"
                                  },
                                  message: "must be string"
                                }
                              ], !1;
                            var w = E === e;
                            if (!w)
                              break;
                          }
                        else
                          return oe.errors = [
                            {
                              instancePath: t + "/env",
                              schemaPath: "#/properties/env/type",
                              keyword: "type",
                              params: {
                                type: "object"
                              },
                              message: "must be object"
                            }
                          ], !1;
                      var f = U === e;
                    } else
                      var f = !0;
                    if (f) {
                      if (r.$_SERVER !== void 0) {
                        let P = r.$_SERVER;
                        const U = e;
                        if (e === U)
                          if (P && typeof P == "object" && !Array.isArray(P))
                            for (const H in P) {
                              const E = e;
                              if (typeof P[H] != "string")
                                return oe.errors = [
                                  {
                                    instancePath: t + "/$_SERVER/" + H.replace(
                                      /~/g,
                                      "~0"
                                    ).replace(
                                      /\//g,
                                      "~1"
                                    ),
                                    schemaPath: "#/properties/%24_SERVER/additionalProperties/type",
                                    keyword: "type",
                                    params: {
                                      type: "string"
                                    },
                                    message: "must be string"
                                  }
                                ], !1;
                              var S = E === e;
                              if (!S)
                                break;
                            }
                          else
                            return oe.errors = [
                              {
                                instancePath: t + "/$_SERVER",
                                schemaPath: "#/properties/%24_SERVER/type",
                                keyword: "type",
                                params: {
                                  type: "object"
                                },
                                message: "must be object"
                              }
                            ], !1;
                        var f = U === e;
                      } else
                        var f = !0;
                      if (f)
                        if (r.code !== void 0) {
                          const P = e;
                          if (typeof r.code != "string")
                            return oe.errors = [
                              {
                                instancePath: t + "/code",
                                schemaPath: "#/properties/code/type",
                                keyword: "type",
                                params: {
                                  type: "string"
                                },
                                message: "must be string"
                              }
                            ], !1;
                          var f = P === e;
                        } else
                          var f = !0;
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else
      return oe.errors = [
        {
          instancePath: t,
          schemaPath: "#/type",
          keyword: "type",
          params: { type: "object" },
          message: "must be object"
        }
      ], !1;
  return oe.errors = i, e === 0;
}
function n(r, { instancePath: t = "", parentData: o, parentDataProperty: p, rootData: l = r } = {}) {
  let i = null, e = 0;
  if (e === 0)
    if (r && typeof r == "object" && !Array.isArray(r)) {
      let cr;
      if (r.step === void 0 && (cr = "step"))
        return n.errors = [
          {
            instancePath: t,
            schemaPath: "#/required",
            keyword: "required",
            params: { missingProperty: cr },
            message: "must have required property '" + cr + "'"
          }
        ], !1;
      {
        const G = r.step;
        if (typeof G == "string")
          if (G === "activatePlugin") {
            if (e === e)
              if (r && typeof r == "object" && !Array.isArray(r)) {
                let d;
                if (r.pluginPath === void 0 && (d = "pluginPath") || r.step === void 0 && (d = "step"))
                  return n.errors = [
                    {
                      instancePath: t,
                      schemaPath: "#/oneOf/0/required",
                      keyword: "required",
                      params: {
                        missingProperty: d
                      },
                      message: "must have required property '" + d + "'"
                    }
                  ], !1;
                {
                  const F = e;
                  for (const s in r)
                    if (!(s === "progress" || s === "step" || s === "pluginPath" || s === "pluginName"))
                      return n.errors = [
                        {
                          instancePath: t,
                          schemaPath: "#/oneOf/0/additionalProperties",
                          keyword: "additionalProperties",
                          params: {
                            additionalProperty: s
                          },
                          message: "must NOT have additional properties"
                        }
                      ], !1;
                  if (F === e) {
                    if (r.progress !== void 0) {
                      let s = r.progress;
                      const u = e;
                      if (e === u)
                        if (s && typeof s == "object" && !Array.isArray(s)) {
                          const L = e;
                          for (const a in s)
                            if (!(a === "weight" || a === "caption"))
                              return n.errors = [
                                {
                                  instancePath: t + "/progress",
                                  schemaPath: "#/oneOf/0/properties/progress/additionalProperties",
                                  keyword: "additionalProperties",
                                  params: {
                                    additionalProperty: a
                                  },
                                  message: "must NOT have additional properties"
                                }
                              ], !1;
                          if (L === e) {
                            if (s.weight !== void 0) {
                              let a = s.weight;
                              const j = e;
                              if (!(typeof a == "number" && isFinite(
                                a
                              )))
                                return n.errors = [
                                  {
                                    instancePath: t + "/progress/weight",
                                    schemaPath: "#/oneOf/0/properties/progress/properties/weight/type",
                                    keyword: "type",
                                    params: {
                                      type: "number"
                                    },
                                    message: "must be number"
                                  }
                                ], !1;
                              var f = j === e;
                            } else
                              var f = !0;
                            if (f)
                              if (s.caption !== void 0) {
                                const a = e;
                                if (typeof s.caption != "string")
                                  return n.errors = [
                                    {
                                      instancePath: t + "/progress/caption",
                                      schemaPath: "#/oneOf/0/properties/progress/properties/caption/type",
                                      keyword: "type",
                                      params: {
                                        type: "string"
                                      },
                                      message: "must be string"
                                    }
                                  ], !1;
                                var f = a === e;
                              } else
                                var f = !0;
                          }
                        } else
                          return n.errors = [
                            {
                              instancePath: t + "/progress",
                              schemaPath: "#/oneOf/0/properties/progress/type",
                              keyword: "type",
                              params: {
                                type: "object"
                              },
                              message: "must be object"
                            }
                          ], !1;
                      var h = u === e;
                    } else
                      var h = !0;
                    if (h) {
                      if (r.step !== void 0) {
                        let s = r.step;
                        const u = e;
                        if (typeof s != "string")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/0/properties/step/type",
                              keyword: "type",
                              params: {
                                type: "string"
                              },
                              message: "must be string"
                            }
                          ], !1;
                        if (s !== "activatePlugin")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/0/properties/step/const",
                              keyword: "const",
                              params: {
                                allowedValue: "activatePlugin"
                              },
                              message: "must be equal to constant"
                            }
                          ], !1;
                        var h = u === e;
                      } else
                        var h = !0;
                      if (h) {
                        if (r.pluginPath !== void 0) {
                          const s = e;
                          if (typeof r.pluginPath != "string")
                            return n.errors = [
                              {
                                instancePath: t + "/pluginPath",
                                schemaPath: "#/oneOf/0/properties/pluginPath/type",
                                keyword: "type",
                                params: {
                                  type: "string"
                                },
                                message: "must be string"
                              }
                            ], !1;
                          var h = s === e;
                        } else
                          var h = !0;
                        if (h)
                          if (r.pluginName !== void 0) {
                            const s = e;
                            if (typeof r.pluginName != "string")
                              return n.errors = [
                                {
                                  instancePath: t + "/pluginName",
                                  schemaPath: "#/oneOf/0/properties/pluginName/type",
                                  keyword: "type",
                                  params: {
                                    type: "string"
                                  },
                                  message: "must be string"
                                }
                              ], !1;
                            var h = s === e;
                          } else
                            var h = !0;
                      }
                    }
                  }
                }
              } else
                return n.errors = [
                  {
                    instancePath: t,
                    schemaPath: "#/oneOf/0/type",
                    keyword: "type",
                    params: { type: "object" },
                    message: "must be object"
                  }
                ], !1;
          } else if (G === "activateTheme") {
            if (e === e)
              if (r && typeof r == "object" && !Array.isArray(r)) {
                let d;
                if (r.step === void 0 && (d = "step") || r.themeFolderName === void 0 && (d = "themeFolderName"))
                  return n.errors = [
                    {
                      instancePath: t,
                      schemaPath: "#/oneOf/1/required",
                      keyword: "required",
                      params: {
                        missingProperty: d
                      },
                      message: "must have required property '" + d + "'"
                    }
                  ], !1;
                {
                  const F = e;
                  for (const s in r)
                    if (!(s === "progress" || s === "step" || s === "themeFolderName"))
                      return n.errors = [
                        {
                          instancePath: t,
                          schemaPath: "#/oneOf/1/additionalProperties",
                          keyword: "additionalProperties",
                          params: {
                            additionalProperty: s
                          },
                          message: "must NOT have additional properties"
                        }
                      ], !1;
                  if (F === e) {
                    if (r.progress !== void 0) {
                      let s = r.progress;
                      const u = e;
                      if (e === u)
                        if (s && typeof s == "object" && !Array.isArray(s)) {
                          const L = e;
                          for (const a in s)
                            if (!(a === "weight" || a === "caption"))
                              return n.errors = [
                                {
                                  instancePath: t + "/progress",
                                  schemaPath: "#/oneOf/1/properties/progress/additionalProperties",
                                  keyword: "additionalProperties",
                                  params: {
                                    additionalProperty: a
                                  },
                                  message: "must NOT have additional properties"
                                }
                              ], !1;
                          if (L === e) {
                            if (s.weight !== void 0) {
                              let a = s.weight;
                              const j = e;
                              if (!(typeof a == "number" && isFinite(
                                a
                              )))
                                return n.errors = [
                                  {
                                    instancePath: t + "/progress/weight",
                                    schemaPath: "#/oneOf/1/properties/progress/properties/weight/type",
                                    keyword: "type",
                                    params: {
                                      type: "number"
                                    },
                                    message: "must be number"
                                  }
                                ], !1;
                              var b = j === e;
                            } else
                              var b = !0;
                            if (b)
                              if (s.caption !== void 0) {
                                const a = e;
                                if (typeof s.caption != "string")
                                  return n.errors = [
                                    {
                                      instancePath: t + "/progress/caption",
                                      schemaPath: "#/oneOf/1/properties/progress/properties/caption/type",
                                      keyword: "type",
                                      params: {
                                        type: "string"
                                      },
                                      message: "must be string"
                                    }
                                  ], !1;
                                var b = a === e;
                              } else
                                var b = !0;
                          }
                        } else
                          return n.errors = [
                            {
                              instancePath: t + "/progress",
                              schemaPath: "#/oneOf/1/properties/progress/type",
                              keyword: "type",
                              params: {
                                type: "object"
                              },
                              message: "must be object"
                            }
                          ], !1;
                      var k = u === e;
                    } else
                      var k = !0;
                    if (k) {
                      if (r.step !== void 0) {
                        let s = r.step;
                        const u = e;
                        if (typeof s != "string")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/1/properties/step/type",
                              keyword: "type",
                              params: {
                                type: "string"
                              },
                              message: "must be string"
                            }
                          ], !1;
                        if (s !== "activateTheme")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/1/properties/step/const",
                              keyword: "const",
                              params: {
                                allowedValue: "activateTheme"
                              },
                              message: "must be equal to constant"
                            }
                          ], !1;
                        var k = u === e;
                      } else
                        var k = !0;
                      if (k)
                        if (r.themeFolderName !== void 0) {
                          const s = e;
                          if (typeof r.themeFolderName != "string")
                            return n.errors = [
                              {
                                instancePath: t + "/themeFolderName",
                                schemaPath: "#/oneOf/1/properties/themeFolderName/type",
                                keyword: "type",
                                params: {
                                  type: "string"
                                },
                                message: "must be string"
                              }
                            ], !1;
                          var k = s === e;
                        } else
                          var k = !0;
                    }
                  }
                }
              } else
                return n.errors = [
                  {
                    instancePath: t,
                    schemaPath: "#/oneOf/1/type",
                    keyword: "type",
                    params: { type: "object" },
                    message: "must be object"
                  }
                ], !1;
          } else if (G === "cp") {
            if (e === e)
              if (r && typeof r == "object" && !Array.isArray(r)) {
                let d;
                if (r.fromPath === void 0 && (d = "fromPath") || r.step === void 0 && (d = "step") || r.toPath === void 0 && (d = "toPath"))
                  return n.errors = [
                    {
                      instancePath: t,
                      schemaPath: "#/oneOf/2/required",
                      keyword: "required",
                      params: {
                        missingProperty: d
                      },
                      message: "must have required property '" + d + "'"
                    }
                  ], !1;
                {
                  const F = e;
                  for (const s in r)
                    if (!(s === "progress" || s === "step" || s === "fromPath" || s === "toPath"))
                      return n.errors = [
                        {
                          instancePath: t,
                          schemaPath: "#/oneOf/2/additionalProperties",
                          keyword: "additionalProperties",
                          params: {
                            additionalProperty: s
                          },
                          message: "must NOT have additional properties"
                        }
                      ], !1;
                  if (F === e) {
                    if (r.progress !== void 0) {
                      let s = r.progress;
                      const u = e;
                      if (e === u)
                        if (s && typeof s == "object" && !Array.isArray(s)) {
                          const L = e;
                          for (const a in s)
                            if (!(a === "weight" || a === "caption"))
                              return n.errors = [
                                {
                                  instancePath: t + "/progress",
                                  schemaPath: "#/oneOf/2/properties/progress/additionalProperties",
                                  keyword: "additionalProperties",
                                  params: {
                                    additionalProperty: a
                                  },
                                  message: "must NOT have additional properties"
                                }
                              ], !1;
                          if (L === e) {
                            if (s.weight !== void 0) {
                              let a = s.weight;
                              const j = e;
                              if (!(typeof a == "number" && isFinite(
                                a
                              )))
                                return n.errors = [
                                  {
                                    instancePath: t + "/progress/weight",
                                    schemaPath: "#/oneOf/2/properties/progress/properties/weight/type",
                                    keyword: "type",
                                    params: {
                                      type: "number"
                                    },
                                    message: "must be number"
                                  }
                                ], !1;
                              var m = j === e;
                            } else
                              var m = !0;
                            if (m)
                              if (s.caption !== void 0) {
                                const a = e;
                                if (typeof s.caption != "string")
                                  return n.errors = [
                                    {
                                      instancePath: t + "/progress/caption",
                                      schemaPath: "#/oneOf/2/properties/progress/properties/caption/type",
                                      keyword: "type",
                                      params: {
                                        type: "string"
                                      },
                                      message: "must be string"
                                    }
                                  ], !1;
                                var m = a === e;
                              } else
                                var m = !0;
                          }
                        } else
                          return n.errors = [
                            {
                              instancePath: t + "/progress",
                              schemaPath: "#/oneOf/2/properties/progress/type",
                              keyword: "type",
                              params: {
                                type: "object"
                              },
                              message: "must be object"
                            }
                          ], !1;
                      var w = u === e;
                    } else
                      var w = !0;
                    if (w) {
                      if (r.step !== void 0) {
                        let s = r.step;
                        const u = e;
                        if (typeof s != "string")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/2/properties/step/type",
                              keyword: "type",
                              params: {
                                type: "string"
                              },
                              message: "must be string"
                            }
                          ], !1;
                        if (s !== "cp")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/2/properties/step/const",
                              keyword: "const",
                              params: {
                                allowedValue: "cp"
                              },
                              message: "must be equal to constant"
                            }
                          ], !1;
                        var w = u === e;
                      } else
                        var w = !0;
                      if (w) {
                        if (r.fromPath !== void 0) {
                          const s = e;
                          if (typeof r.fromPath != "string")
                            return n.errors = [
                              {
                                instancePath: t + "/fromPath",
                                schemaPath: "#/oneOf/2/properties/fromPath/type",
                                keyword: "type",
                                params: {
                                  type: "string"
                                },
                                message: "must be string"
                              }
                            ], !1;
                          var w = s === e;
                        } else
                          var w = !0;
                        if (w)
                          if (r.toPath !== void 0) {
                            const s = e;
                            if (typeof r.toPath != "string")
                              return n.errors = [
                                {
                                  instancePath: t + "/toPath",
                                  schemaPath: "#/oneOf/2/properties/toPath/type",
                                  keyword: "type",
                                  params: {
                                    type: "string"
                                  },
                                  message: "must be string"
                                }
                              ], !1;
                            var w = s === e;
                          } else
                            var w = !0;
                      }
                    }
                  }
                }
              } else
                return n.errors = [
                  {
                    instancePath: t,
                    schemaPath: "#/oneOf/2/type",
                    keyword: "type",
                    params: { type: "object" },
                    message: "must be object"
                  }
                ], !1;
          } else if (G === "defineWpConfigConsts") {
            if (e === e)
              if (r && typeof r == "object" && !Array.isArray(r)) {
                let d;
                if (r.consts === void 0 && (d = "consts") || r.step === void 0 && (d = "step"))
                  return n.errors = [
                    {
                      instancePath: t,
                      schemaPath: "#/oneOf/3/required",
                      keyword: "required",
                      params: {
                        missingProperty: d
                      },
                      message: "must have required property '" + d + "'"
                    }
                  ], !1;
                {
                  const F = e;
                  for (const s in r)
                    if (!(s === "progress" || s === "step" || s === "consts" || s === "method" || s === "virtualize"))
                      return n.errors = [
                        {
                          instancePath: t,
                          schemaPath: "#/oneOf/3/additionalProperties",
                          keyword: "additionalProperties",
                          params: {
                            additionalProperty: s
                          },
                          message: "must NOT have additional properties"
                        }
                      ], !1;
                  if (F === e) {
                    if (r.progress !== void 0) {
                      let s = r.progress;
                      const u = e;
                      if (e === u)
                        if (s && typeof s == "object" && !Array.isArray(s)) {
                          const L = e;
                          for (const a in s)
                            if (!(a === "weight" || a === "caption"))
                              return n.errors = [
                                {
                                  instancePath: t + "/progress",
                                  schemaPath: "#/oneOf/3/properties/progress/additionalProperties",
                                  keyword: "additionalProperties",
                                  params: {
                                    additionalProperty: a
                                  },
                                  message: "must NOT have additional properties"
                                }
                              ], !1;
                          if (L === e) {
                            if (s.weight !== void 0) {
                              let a = s.weight;
                              const j = e;
                              if (!(typeof a == "number" && isFinite(
                                a
                              )))
                                return n.errors = [
                                  {
                                    instancePath: t + "/progress/weight",
                                    schemaPath: "#/oneOf/3/properties/progress/properties/weight/type",
                                    keyword: "type",
                                    params: {
                                      type: "number"
                                    },
                                    message: "must be number"
                                  }
                                ], !1;
                              var S = j === e;
                            } else
                              var S = !0;
                            if (S)
                              if (s.caption !== void 0) {
                                const a = e;
                                if (typeof s.caption != "string")
                                  return n.errors = [
                                    {
                                      instancePath: t + "/progress/caption",
                                      schemaPath: "#/oneOf/3/properties/progress/properties/caption/type",
                                      keyword: "type",
                                      params: {
                                        type: "string"
                                      },
                                      message: "must be string"
                                    }
                                  ], !1;
                                var S = a === e;
                              } else
                                var S = !0;
                          }
                        } else
                          return n.errors = [
                            {
                              instancePath: t + "/progress",
                              schemaPath: "#/oneOf/3/properties/progress/type",
                              keyword: "type",
                              params: {
                                type: "object"
                              },
                              message: "must be object"
                            }
                          ], !1;
                      var D = u === e;
                    } else
                      var D = !0;
                    if (D) {
                      if (r.step !== void 0) {
                        let s = r.step;
                        const u = e;
                        if (typeof s != "string")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/3/properties/step/type",
                              keyword: "type",
                              params: {
                                type: "string"
                              },
                              message: "must be string"
                            }
                          ], !1;
                        if (s !== "defineWpConfigConsts")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/3/properties/step/const",
                              keyword: "const",
                              params: {
                                allowedValue: "defineWpConfigConsts"
                              },
                              message: "must be equal to constant"
                            }
                          ], !1;
                        var D = u === e;
                      } else
                        var D = !0;
                      if (D) {
                        if (r.consts !== void 0) {
                          let s = r.consts;
                          const u = e;
                          if (e === u && !(s && typeof s == "object" && !Array.isArray(
                            s
                          )))
                            return n.errors = [
                              {
                                instancePath: t + "/consts",
                                schemaPath: "#/oneOf/3/properties/consts/type",
                                keyword: "type",
                                params: {
                                  type: "object"
                                },
                                message: "must be object"
                              }
                            ], !1;
                          var D = u === e;
                        } else
                          var D = !0;
                        if (D) {
                          if (r.method !== void 0) {
                            let s = r.method;
                            const u = e;
                            if (typeof s != "string")
                              return n.errors = [
                                {
                                  instancePath: t + "/method",
                                  schemaPath: "#/oneOf/3/properties/method/type",
                                  keyword: "type",
                                  params: {
                                    type: "string"
                                  },
                                  message: "must be string"
                                }
                              ], !1;
                            if (!(s === "rewrite-wp-config" || s === "define-before-run"))
                              return n.errors = [
                                {
                                  instancePath: t + "/method",
                                  schemaPath: "#/oneOf/3/properties/method/enum",
                                  keyword: "enum",
                                  params: {
                                    allowedValues: br.oneOf[3].properties.method.enum
                                  },
                                  message: "must be equal to one of the allowed values"
                                }
                              ], !1;
                            var D = u === e;
                          } else
                            var D = !0;
                          if (D)
                            if (r.virtualize !== void 0) {
                              const s = e;
                              if (typeof r.virtualize != "boolean")
                                return n.errors = [
                                  {
                                    instancePath: t + "/virtualize",
                                    schemaPath: "#/oneOf/3/properties/virtualize/type",
                                    keyword: "type",
                                    params: {
                                      type: "boolean"
                                    },
                                    message: "must be boolean"
                                  }
                                ], !1;
                              var D = s === e;
                            } else
                              var D = !0;
                        }
                      }
                    }
                  }
                }
              } else
                return n.errors = [
                  {
                    instancePath: t,
                    schemaPath: "#/oneOf/3/type",
                    keyword: "type",
                    params: { type: "object" },
                    message: "must be object"
                  }
                ], !1;
          } else if (G === "defineSiteUrl") {
            if (e === e)
              if (r && typeof r == "object" && !Array.isArray(r)) {
                let d;
                if (r.siteUrl === void 0 && (d = "siteUrl") || r.step === void 0 && (d = "step"))
                  return n.errors = [
                    {
                      instancePath: t,
                      schemaPath: "#/oneOf/4/required",
                      keyword: "required",
                      params: {
                        missingProperty: d
                      },
                      message: "must have required property '" + d + "'"
                    }
                  ], !1;
                {
                  const F = e;
                  for (const s in r)
                    if (!(s === "progress" || s === "step" || s === "siteUrl"))
                      return n.errors = [
                        {
                          instancePath: t,
                          schemaPath: "#/oneOf/4/additionalProperties",
                          keyword: "additionalProperties",
                          params: {
                            additionalProperty: s
                          },
                          message: "must NOT have additional properties"
                        }
                      ], !1;
                  if (F === e) {
                    if (r.progress !== void 0) {
                      let s = r.progress;
                      const u = e;
                      if (e === u)
                        if (s && typeof s == "object" && !Array.isArray(s)) {
                          const L = e;
                          for (const a in s)
                            if (!(a === "weight" || a === "caption"))
                              return n.errors = [
                                {
                                  instancePath: t + "/progress",
                                  schemaPath: "#/oneOf/4/properties/progress/additionalProperties",
                                  keyword: "additionalProperties",
                                  params: {
                                    additionalProperty: a
                                  },
                                  message: "must NOT have additional properties"
                                }
                              ], !1;
                          if (L === e) {
                            if (s.weight !== void 0) {
                              let a = s.weight;
                              const j = e;
                              if (!(typeof a == "number" && isFinite(
                                a
                              )))
                                return n.errors = [
                                  {
                                    instancePath: t + "/progress/weight",
                                    schemaPath: "#/oneOf/4/properties/progress/properties/weight/type",
                                    keyword: "type",
                                    params: {
                                      type: "number"
                                    },
                                    message: "must be number"
                                  }
                                ], !1;
                              var P = j === e;
                            } else
                              var P = !0;
                            if (P)
                              if (s.caption !== void 0) {
                                const a = e;
                                if (typeof s.caption != "string")
                                  return n.errors = [
                                    {
                                      instancePath: t + "/progress/caption",
                                      schemaPath: "#/oneOf/4/properties/progress/properties/caption/type",
                                      keyword: "type",
                                      params: {
                                        type: "string"
                                      },
                                      message: "must be string"
                                    }
                                  ], !1;
                                var P = a === e;
                              } else
                                var P = !0;
                          }
                        } else
                          return n.errors = [
                            {
                              instancePath: t + "/progress",
                              schemaPath: "#/oneOf/4/properties/progress/type",
                              keyword: "type",
                              params: {
                                type: "object"
                              },
                              message: "must be object"
                            }
                          ], !1;
                      var U = u === e;
                    } else
                      var U = !0;
                    if (U) {
                      if (r.step !== void 0) {
                        let s = r.step;
                        const u = e;
                        if (typeof s != "string")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/4/properties/step/type",
                              keyword: "type",
                              params: {
                                type: "string"
                              },
                              message: "must be string"
                            }
                          ], !1;
                        if (s !== "defineSiteUrl")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/4/properties/step/const",
                              keyword: "const",
                              params: {
                                allowedValue: "defineSiteUrl"
                              },
                              message: "must be equal to constant"
                            }
                          ], !1;
                        var U = u === e;
                      } else
                        var U = !0;
                      if (U)
                        if (r.siteUrl !== void 0) {
                          const s = e;
                          if (typeof r.siteUrl != "string")
                            return n.errors = [
                              {
                                instancePath: t + "/siteUrl",
                                schemaPath: "#/oneOf/4/properties/siteUrl/type",
                                keyword: "type",
                                params: {
                                  type: "string"
                                },
                                message: "must be string"
                              }
                            ], !1;
                          var U = s === e;
                        } else
                          var U = !0;
                    }
                  }
                }
              } else
                return n.errors = [
                  {
                    instancePath: t,
                    schemaPath: "#/oneOf/4/type",
                    keyword: "type",
                    params: { type: "object" },
                    message: "must be object"
                  }
                ], !1;
          } else if (G === "enableMultisite") {
            if (e === e)
              if (r && typeof r == "object" && !Array.isArray(r)) {
                let d;
                if (r.step === void 0 && (d = "step"))
                  return n.errors = [
                    {
                      instancePath: t,
                      schemaPath: "#/oneOf/5/required",
                      keyword: "required",
                      params: {
                        missingProperty: d
                      },
                      message: "must have required property '" + d + "'"
                    }
                  ], !1;
                {
                  const F = e;
                  for (const s in r)
                    if (!(s === "progress" || s === "step"))
                      return n.errors = [
                        {
                          instancePath: t,
                          schemaPath: "#/oneOf/5/additionalProperties",
                          keyword: "additionalProperties",
                          params: {
                            additionalProperty: s
                          },
                          message: "must NOT have additional properties"
                        }
                      ], !1;
                  if (F === e) {
                    if (r.progress !== void 0) {
                      let s = r.progress;
                      const u = e;
                      if (e === u)
                        if (s && typeof s == "object" && !Array.isArray(s)) {
                          const L = e;
                          for (const a in s)
                            if (!(a === "weight" || a === "caption"))
                              return n.errors = [
                                {
                                  instancePath: t + "/progress",
                                  schemaPath: "#/oneOf/5/properties/progress/additionalProperties",
                                  keyword: "additionalProperties",
                                  params: {
                                    additionalProperty: a
                                  },
                                  message: "must NOT have additional properties"
                                }
                              ], !1;
                          if (L === e) {
                            if (s.weight !== void 0) {
                              let a = s.weight;
                              const j = e;
                              if (!(typeof a == "number" && isFinite(
                                a
                              )))
                                return n.errors = [
                                  {
                                    instancePath: t + "/progress/weight",
                                    schemaPath: "#/oneOf/5/properties/progress/properties/weight/type",
                                    keyword: "type",
                                    params: {
                                      type: "number"
                                    },
                                    message: "must be number"
                                  }
                                ], !1;
                              var te = j === e;
                            } else
                              var te = !0;
                            if (te)
                              if (s.caption !== void 0) {
                                const a = e;
                                if (typeof s.caption != "string")
                                  return n.errors = [
                                    {
                                      instancePath: t + "/progress/caption",
                                      schemaPath: "#/oneOf/5/properties/progress/properties/caption/type",
                                      keyword: "type",
                                      params: {
                                        type: "string"
                                      },
                                      message: "must be string"
                                    }
                                  ], !1;
                                var te = a === e;
                              } else
                                var te = !0;
                          }
                        } else
                          return n.errors = [
                            {
                              instancePath: t + "/progress",
                              schemaPath: "#/oneOf/5/properties/progress/type",
                              keyword: "type",
                              params: {
                                type: "object"
                              },
                              message: "must be object"
                            }
                          ], !1;
                      var H = u === e;
                    } else
                      var H = !0;
                    if (H)
                      if (r.step !== void 0) {
                        let s = r.step;
                        const u = e;
                        if (typeof s != "string")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/5/properties/step/type",
                              keyword: "type",
                              params: {
                                type: "string"
                              },
                              message: "must be string"
                            }
                          ], !1;
                        if (s !== "enableMultisite")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/5/properties/step/const",
                              keyword: "const",
                              params: {
                                allowedValue: "enableMultisite"
                              },
                              message: "must be equal to constant"
                            }
                          ], !1;
                        var H = u === e;
                      } else
                        var H = !0;
                  }
                }
              } else
                return n.errors = [
                  {
                    instancePath: t,
                    schemaPath: "#/oneOf/5/type",
                    keyword: "type",
                    params: { type: "object" },
                    message: "must be object"
                  }
                ], !1;
          } else if (G === "importWxr") {
            if (e === e)
              if (r && typeof r == "object" && !Array.isArray(r)) {
                let d;
                if (r.file === void 0 && (d = "file") || r.step === void 0 && (d = "step"))
                  return n.errors = [
                    {
                      instancePath: t,
                      schemaPath: "#/oneOf/6/required",
                      keyword: "required",
                      params: {
                        missingProperty: d
                      },
                      message: "must have required property '" + d + "'"
                    }
                  ], !1;
                {
                  const F = e;
                  for (const s in r)
                    if (!(s === "progress" || s === "step" || s === "file"))
                      return n.errors = [
                        {
                          instancePath: t,
                          schemaPath: "#/oneOf/6/additionalProperties",
                          keyword: "additionalProperties",
                          params: {
                            additionalProperty: s
                          },
                          message: "must NOT have additional properties"
                        }
                      ], !1;
                  if (F === e) {
                    if (r.progress !== void 0) {
                      let s = r.progress;
                      const u = e;
                      if (e === u)
                        if (s && typeof s == "object" && !Array.isArray(s)) {
                          const L = e;
                          for (const a in s)
                            if (!(a === "weight" || a === "caption"))
                              return n.errors = [
                                {
                                  instancePath: t + "/progress",
                                  schemaPath: "#/oneOf/6/properties/progress/additionalProperties",
                                  keyword: "additionalProperties",
                                  params: {
                                    additionalProperty: a
                                  },
                                  message: "must NOT have additional properties"
                                }
                              ], !1;
                          if (L === e) {
                            if (s.weight !== void 0) {
                              let a = s.weight;
                              const j = e;
                              if (!(typeof a == "number" && isFinite(
                                a
                              )))
                                return n.errors = [
                                  {
                                    instancePath: t + "/progress/weight",
                                    schemaPath: "#/oneOf/6/properties/progress/properties/weight/type",
                                    keyword: "type",
                                    params: {
                                      type: "number"
                                    },
                                    message: "must be number"
                                  }
                                ], !1;
                              var E = j === e;
                            } else
                              var E = !0;
                            if (E)
                              if (s.caption !== void 0) {
                                const a = e;
                                if (typeof s.caption != "string")
                                  return n.errors = [
                                    {
                                      instancePath: t + "/progress/caption",
                                      schemaPath: "#/oneOf/6/properties/progress/properties/caption/type",
                                      keyword: "type",
                                      params: {
                                        type: "string"
                                      },
                                      message: "must be string"
                                    }
                                  ], !1;
                                var E = a === e;
                              } else
                                var E = !0;
                          }
                        } else
                          return n.errors = [
                            {
                              instancePath: t + "/progress",
                              schemaPath: "#/oneOf/6/properties/progress/type",
                              keyword: "type",
                              params: {
                                type: "object"
                              },
                              message: "must be object"
                            }
                          ], !1;
                      var x = u === e;
                    } else
                      var x = !0;
                    if (x) {
                      if (r.step !== void 0) {
                        let s = r.step;
                        const u = e;
                        if (typeof s != "string")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/6/properties/step/type",
                              keyword: "type",
                              params: {
                                type: "string"
                              },
                              message: "must be string"
                            }
                          ], !1;
                        if (s !== "importWxr")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/6/properties/step/const",
                              keyword: "const",
                              params: {
                                allowedValue: "importWxr"
                              },
                              message: "must be equal to constant"
                            }
                          ], !1;
                        var x = u === e;
                      } else
                        var x = !0;
                      if (x)
                        if (r.file !== void 0) {
                          const s = e;
                          re(r.file, {
                            instancePath: t + "/file",
                            parentData: r,
                            parentDataProperty: "file",
                            rootData: l
                          }) || (i = i === null ? re.errors : i.concat(
                            re.errors
                          ), e = i.length);
                          var x = s === e;
                        } else
                          var x = !0;
                    }
                  }
                }
              } else
                return n.errors = [
                  {
                    instancePath: t,
                    schemaPath: "#/oneOf/6/type",
                    keyword: "type",
                    params: { type: "object" },
                    message: "must be object"
                  }
                ], !1;
          } else if (G === "importThemeStarterContent") {
            if (e === e)
              if (r && typeof r == "object" && !Array.isArray(r)) {
                let d;
                if (r.step === void 0 && (d = "step"))
                  return n.errors = [
                    {
                      instancePath: t,
                      schemaPath: "#/oneOf/7/required",
                      keyword: "required",
                      params: {
                        missingProperty: d
                      },
                      message: "must have required property '" + d + "'"
                    }
                  ], !1;
                {
                  const F = e;
                  for (const s in r)
                    if (!(s === "progress" || s === "step" || s === "themeSlug"))
                      return n.errors = [
                        {
                          instancePath: t,
                          schemaPath: "#/oneOf/7/additionalProperties",
                          keyword: "additionalProperties",
                          params: {
                            additionalProperty: s
                          },
                          message: "must NOT have additional properties"
                        }
                      ], !1;
                  if (F === e) {
                    if (r.progress !== void 0) {
                      let s = r.progress;
                      const u = e;
                      if (e === u)
                        if (s && typeof s == "object" && !Array.isArray(s)) {
                          const L = e;
                          for (const a in s)
                            if (!(a === "weight" || a === "caption"))
                              return n.errors = [
                                {
                                  instancePath: t + "/progress",
                                  schemaPath: "#/oneOf/7/properties/progress/additionalProperties",
                                  keyword: "additionalProperties",
                                  params: {
                                    additionalProperty: a
                                  },
                                  message: "must NOT have additional properties"
                                }
                              ], !1;
                          if (L === e) {
                            if (s.weight !== void 0) {
                              let a = s.weight;
                              const j = e;
                              if (!(typeof a == "number" && isFinite(
                                a
                              )))
                                return n.errors = [
                                  {
                                    instancePath: t + "/progress/weight",
                                    schemaPath: "#/oneOf/7/properties/progress/properties/weight/type",
                                    keyword: "type",
                                    params: {
                                      type: "number"
                                    },
                                    message: "must be number"
                                  }
                                ], !1;
                              var I = j === e;
                            } else
                              var I = !0;
                            if (I)
                              if (s.caption !== void 0) {
                                const a = e;
                                if (typeof s.caption != "string")
                                  return n.errors = [
                                    {
                                      instancePath: t + "/progress/caption",
                                      schemaPath: "#/oneOf/7/properties/progress/properties/caption/type",
                                      keyword: "type",
                                      params: {
                                        type: "string"
                                      },
                                      message: "must be string"
                                    }
                                  ], !1;
                                var I = a === e;
                              } else
                                var I = !0;
                          }
                        } else
                          return n.errors = [
                            {
                              instancePath: t + "/progress",
                              schemaPath: "#/oneOf/7/properties/progress/type",
                              keyword: "type",
                              params: {
                                type: "object"
                              },
                              message: "must be object"
                            }
                          ], !1;
                      var z = u === e;
                    } else
                      var z = !0;
                    if (z) {
                      if (r.step !== void 0) {
                        let s = r.step;
                        const u = e;
                        if (typeof s != "string")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/7/properties/step/type",
                              keyword: "type",
                              params: {
                                type: "string"
                              },
                              message: "must be string"
                            }
                          ], !1;
                        if (s !== "importThemeStarterContent")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/7/properties/step/const",
                              keyword: "const",
                              params: {
                                allowedValue: "importThemeStarterContent"
                              },
                              message: "must be equal to constant"
                            }
                          ], !1;
                        var z = u === e;
                      } else
                        var z = !0;
                      if (z)
                        if (r.themeSlug !== void 0) {
                          const s = e;
                          if (typeof r.themeSlug != "string")
                            return n.errors = [
                              {
                                instancePath: t + "/themeSlug",
                                schemaPath: "#/oneOf/7/properties/themeSlug/type",
                                keyword: "type",
                                params: {
                                  type: "string"
                                },
                                message: "must be string"
                              }
                            ], !1;
                          var z = s === e;
                        } else
                          var z = !0;
                    }
                  }
                }
              } else
                return n.errors = [
                  {
                    instancePath: t,
                    schemaPath: "#/oneOf/7/type",
                    keyword: "type",
                    params: { type: "object" },
                    message: "must be object"
                  }
                ], !1;
          } else if (G === "importWordPressFiles") {
            if (e === e)
              if (r && typeof r == "object" && !Array.isArray(r)) {
                let d;
                if (r.step === void 0 && (d = "step") || r.wordPressFilesZip === void 0 && (d = "wordPressFilesZip"))
                  return n.errors = [
                    {
                      instancePath: t,
                      schemaPath: "#/oneOf/8/required",
                      keyword: "required",
                      params: {
                        missingProperty: d
                      },
                      message: "must have required property '" + d + "'"
                    }
                  ], !1;
                {
                  const F = e;
                  for (const s in r)
                    if (!(s === "progress" || s === "step" || s === "wordPressFilesZip" || s === "pathInZip"))
                      return n.errors = [
                        {
                          instancePath: t,
                          schemaPath: "#/oneOf/8/additionalProperties",
                          keyword: "additionalProperties",
                          params: {
                            additionalProperty: s
                          },
                          message: "must NOT have additional properties"
                        }
                      ], !1;
                  if (F === e) {
                    if (r.progress !== void 0) {
                      let s = r.progress;
                      const u = e;
                      if (e === u)
                        if (s && typeof s == "object" && !Array.isArray(s)) {
                          const L = e;
                          for (const a in s)
                            if (!(a === "weight" || a === "caption"))
                              return n.errors = [
                                {
                                  instancePath: t + "/progress",
                                  schemaPath: "#/oneOf/8/properties/progress/additionalProperties",
                                  keyword: "additionalProperties",
                                  params: {
                                    additionalProperty: a
                                  },
                                  message: "must NOT have additional properties"
                                }
                              ], !1;
                          if (L === e) {
                            if (s.weight !== void 0) {
                              let a = s.weight;
                              const j = e;
                              if (!(typeof a == "number" && isFinite(
                                a
                              )))
                                return n.errors = [
                                  {
                                    instancePath: t + "/progress/weight",
                                    schemaPath: "#/oneOf/8/properties/progress/properties/weight/type",
                                    keyword: "type",
                                    params: {
                                      type: "number"
                                    },
                                    message: "must be number"
                                  }
                                ], !1;
                              var c = j === e;
                            } else
                              var c = !0;
                            if (c)
                              if (s.caption !== void 0) {
                                const a = e;
                                if (typeof s.caption != "string")
                                  return n.errors = [
                                    {
                                      instancePath: t + "/progress/caption",
                                      schemaPath: "#/oneOf/8/properties/progress/properties/caption/type",
                                      keyword: "type",
                                      params: {
                                        type: "string"
                                      },
                                      message: "must be string"
                                    }
                                  ], !1;
                                var c = a === e;
                              } else
                                var c = !0;
                          }
                        } else
                          return n.errors = [
                            {
                              instancePath: t + "/progress",
                              schemaPath: "#/oneOf/8/properties/progress/type",
                              keyword: "type",
                              params: {
                                type: "object"
                              },
                              message: "must be object"
                            }
                          ], !1;
                      var A = u === e;
                    } else
                      var A = !0;
                    if (A) {
                      if (r.step !== void 0) {
                        let s = r.step;
                        const u = e;
                        if (typeof s != "string")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/8/properties/step/type",
                              keyword: "type",
                              params: {
                                type: "string"
                              },
                              message: "must be string"
                            }
                          ], !1;
                        if (s !== "importWordPressFiles")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/8/properties/step/const",
                              keyword: "const",
                              params: {
                                allowedValue: "importWordPressFiles"
                              },
                              message: "must be equal to constant"
                            }
                          ], !1;
                        var A = u === e;
                      } else
                        var A = !0;
                      if (A) {
                        if (r.wordPressFilesZip !== void 0) {
                          const s = e;
                          re(
                            r.wordPressFilesZip,
                            {
                              instancePath: t + "/wordPressFilesZip",
                              parentData: r,
                              parentDataProperty: "wordPressFilesZip",
                              rootData: l
                            }
                          ) || (i = i === null ? re.errors : i.concat(
                            re.errors
                          ), e = i.length);
                          var A = s === e;
                        } else
                          var A = !0;
                        if (A)
                          if (r.pathInZip !== void 0) {
                            const s = e;
                            if (typeof r.pathInZip != "string")
                              return n.errors = [
                                {
                                  instancePath: t + "/pathInZip",
                                  schemaPath: "#/oneOf/8/properties/pathInZip/type",
                                  keyword: "type",
                                  params: {
                                    type: "string"
                                  },
                                  message: "must be string"
                                }
                              ], !1;
                            var A = s === e;
                          } else
                            var A = !0;
                      }
                    }
                  }
                }
              } else
                return n.errors = [
                  {
                    instancePath: t,
                    schemaPath: "#/oneOf/8/type",
                    keyword: "type",
                    params: { type: "object" },
                    message: "must be object"
                  }
                ], !1;
          } else if (G === "installPlugin") {
            if (e === e)
              if (r && typeof r == "object" && !Array.isArray(r)) {
                let d;
                if (r.pluginZipFile === void 0 && (d = "pluginZipFile") || r.step === void 0 && (d = "step"))
                  return n.errors = [
                    {
                      instancePath: t,
                      schemaPath: "#/oneOf/9/required",
                      keyword: "required",
                      params: {
                        missingProperty: d
                      },
                      message: "must have required property '" + d + "'"
                    }
                  ], !1;
                {
                  const F = e;
                  for (const s in r)
                    if (!(s === "progress" || s === "ifAlreadyInstalled" || s === "step" || s === "pluginZipFile" || s === "options"))
                      return n.errors = [
                        {
                          instancePath: t,
                          schemaPath: "#/oneOf/9/additionalProperties",
                          keyword: "additionalProperties",
                          params: {
                            additionalProperty: s
                          },
                          message: "must NOT have additional properties"
                        }
                      ], !1;
                  if (F === e) {
                    if (r.progress !== void 0) {
                      let s = r.progress;
                      const u = e;
                      if (e === u)
                        if (s && typeof s == "object" && !Array.isArray(s)) {
                          const L = e;
                          for (const a in s)
                            if (!(a === "weight" || a === "caption"))
                              return n.errors = [
                                {
                                  instancePath: t + "/progress",
                                  schemaPath: "#/oneOf/9/properties/progress/additionalProperties",
                                  keyword: "additionalProperties",
                                  params: {
                                    additionalProperty: a
                                  },
                                  message: "must NOT have additional properties"
                                }
                              ], !1;
                          if (L === e) {
                            if (s.weight !== void 0) {
                              let a = s.weight;
                              const j = e;
                              if (!(typeof a == "number" && isFinite(
                                a
                              )))
                                return n.errors = [
                                  {
                                    instancePath: t + "/progress/weight",
                                    schemaPath: "#/oneOf/9/properties/progress/properties/weight/type",
                                    keyword: "type",
                                    params: {
                                      type: "number"
                                    },
                                    message: "must be number"
                                  }
                                ], !1;
                              var $ = j === e;
                            } else
                              var $ = !0;
                            if ($)
                              if (s.caption !== void 0) {
                                const a = e;
                                if (typeof s.caption != "string")
                                  return n.errors = [
                                    {
                                      instancePath: t + "/progress/caption",
                                      schemaPath: "#/oneOf/9/properties/progress/properties/caption/type",
                                      keyword: "type",
                                      params: {
                                        type: "string"
                                      },
                                      message: "must be string"
                                    }
                                  ], !1;
                                var $ = a === e;
                              } else
                                var $ = !0;
                          }
                        } else
                          return n.errors = [
                            {
                              instancePath: t + "/progress",
                              schemaPath: "#/oneOf/9/properties/progress/type",
                              keyword: "type",
                              params: {
                                type: "object"
                              },
                              message: "must be object"
                            }
                          ], !1;
                      var T = u === e;
                    } else
                      var T = !0;
                    if (T) {
                      if (r.ifAlreadyInstalled !== void 0) {
                        let s = r.ifAlreadyInstalled;
                        const u = e;
                        if (typeof s != "string")
                          return n.errors = [
                            {
                              instancePath: t + "/ifAlreadyInstalled",
                              schemaPath: "#/oneOf/9/properties/ifAlreadyInstalled/type",
                              keyword: "type",
                              params: {
                                type: "string"
                              },
                              message: "must be string"
                            }
                          ], !1;
                        if (!(s === "overwrite" || s === "skip" || s === "error"))
                          return n.errors = [
                            {
                              instancePath: t + "/ifAlreadyInstalled",
                              schemaPath: "#/oneOf/9/properties/ifAlreadyInstalled/enum",
                              keyword: "enum",
                              params: {
                                allowedValues: br.oneOf[9].properties.ifAlreadyInstalled.enum
                              },
                              message: "must be equal to one of the allowed values"
                            }
                          ], !1;
                        var T = u === e;
                      } else
                        var T = !0;
                      if (T) {
                        if (r.step !== void 0) {
                          let s = r.step;
                          const u = e;
                          if (typeof s != "string")
                            return n.errors = [
                              {
                                instancePath: t + "/step",
                                schemaPath: "#/oneOf/9/properties/step/type",
                                keyword: "type",
                                params: {
                                  type: "string"
                                },
                                message: "must be string"
                              }
                            ], !1;
                          if (s !== "installPlugin")
                            return n.errors = [
                              {
                                instancePath: t + "/step",
                                schemaPath: "#/oneOf/9/properties/step/const",
                                keyword: "const",
                                params: {
                                  allowedValue: "installPlugin"
                                },
                                message: "must be equal to constant"
                              }
                            ], !1;
                          var T = u === e;
                        } else
                          var T = !0;
                        if (T) {
                          if (r.pluginZipFile !== void 0) {
                            const s = e;
                            re(
                              r.pluginZipFile,
                              {
                                instancePath: t + "/pluginZipFile",
                                parentData: r,
                                parentDataProperty: "pluginZipFile",
                                rootData: l
                              }
                            ) || (i = i === null ? re.errors : i.concat(
                              re.errors
                            ), e = i.length);
                            var T = s === e;
                          } else
                            var T = !0;
                          if (T)
                            if (r.options !== void 0) {
                              let s = r.options;
                              const u = e;
                              if (e === e)
                                if (s && typeof s == "object" && !Array.isArray(
                                  s
                                )) {
                                  const j = e;
                                  for (const ke in s)
                                    if (ke !== "activate")
                                      return n.errors = [
                                        {
                                          instancePath: t + "/options",
                                          schemaPath: "#/definitions/InstallPluginOptions/additionalProperties",
                                          keyword: "additionalProperties",
                                          params: {
                                            additionalProperty: ke
                                          },
                                          message: "must NOT have additional properties"
                                        }
                                      ], !1;
                                  if (j === e && s.activate !== void 0 && typeof s.activate != "boolean")
                                    return n.errors = [
                                      {
                                        instancePath: t + "/options/activate",
                                        schemaPath: "#/definitions/InstallPluginOptions/properties/activate/type",
                                        keyword: "type",
                                        params: {
                                          type: "boolean"
                                        },
                                        message: "must be boolean"
                                      }
                                    ], !1;
                                } else
                                  return n.errors = [
                                    {
                                      instancePath: t + "/options",
                                      schemaPath: "#/definitions/InstallPluginOptions/type",
                                      keyword: "type",
                                      params: {
                                        type: "object"
                                      },
                                      message: "must be object"
                                    }
                                  ], !1;
                              var T = u === e;
                            } else
                              var T = !0;
                        }
                      }
                    }
                  }
                }
              } else
                return n.errors = [
                  {
                    instancePath: t,
                    schemaPath: "#/oneOf/9/type",
                    keyword: "type",
                    params: { type: "object" },
                    message: "must be object"
                  }
                ], !1;
          } else if (G === "installTheme") {
            if (e === e)
              if (r && typeof r == "object" && !Array.isArray(r)) {
                let d;
                if (r.step === void 0 && (d = "step") || r.themeZipFile === void 0 && (d = "themeZipFile"))
                  return n.errors = [
                    {
                      instancePath: t,
                      schemaPath: "#/oneOf/10/required",
                      keyword: "required",
                      params: {
                        missingProperty: d
                      },
                      message: "must have required property '" + d + "'"
                    }
                  ], !1;
                {
                  const F = e;
                  for (const s in r)
                    if (!(s === "progress" || s === "ifAlreadyInstalled" || s === "step" || s === "themeZipFile" || s === "options"))
                      return n.errors = [
                        {
                          instancePath: t,
                          schemaPath: "#/oneOf/10/additionalProperties",
                          keyword: "additionalProperties",
                          params: {
                            additionalProperty: s
                          },
                          message: "must NOT have additional properties"
                        }
                      ], !1;
                  if (F === e) {
                    if (r.progress !== void 0) {
                      let s = r.progress;
                      const u = e;
                      if (e === u)
                        if (s && typeof s == "object" && !Array.isArray(s)) {
                          const L = e;
                          for (const a in s)
                            if (!(a === "weight" || a === "caption"))
                              return n.errors = [
                                {
                                  instancePath: t + "/progress",
                                  schemaPath: "#/oneOf/10/properties/progress/additionalProperties",
                                  keyword: "additionalProperties",
                                  params: {
                                    additionalProperty: a
                                  },
                                  message: "must NOT have additional properties"
                                }
                              ], !1;
                          if (L === e) {
                            if (s.weight !== void 0) {
                              let a = s.weight;
                              const j = e;
                              if (!(typeof a == "number" && isFinite(
                                a
                              )))
                                return n.errors = [
                                  {
                                    instancePath: t + "/progress/weight",
                                    schemaPath: "#/oneOf/10/properties/progress/properties/weight/type",
                                    keyword: "type",
                                    params: {
                                      type: "number"
                                    },
                                    message: "must be number"
                                  }
                                ], !1;
                              var _ = j === e;
                            } else
                              var _ = !0;
                            if (_)
                              if (s.caption !== void 0) {
                                const a = e;
                                if (typeof s.caption != "string")
                                  return n.errors = [
                                    {
                                      instancePath: t + "/progress/caption",
                                      schemaPath: "#/oneOf/10/properties/progress/properties/caption/type",
                                      keyword: "type",
                                      params: {
                                        type: "string"
                                      },
                                      message: "must be string"
                                    }
                                  ], !1;
                                var _ = a === e;
                              } else
                                var _ = !0;
                          }
                        } else
                          return n.errors = [
                            {
                              instancePath: t + "/progress",
                              schemaPath: "#/oneOf/10/properties/progress/type",
                              keyword: "type",
                              params: {
                                type: "object"
                              },
                              message: "must be object"
                            }
                          ], !1;
                      var y = u === e;
                    } else
                      var y = !0;
                    if (y) {
                      if (r.ifAlreadyInstalled !== void 0) {
                        let s = r.ifAlreadyInstalled;
                        const u = e;
                        if (typeof s != "string")
                          return n.errors = [
                            {
                              instancePath: t + "/ifAlreadyInstalled",
                              schemaPath: "#/oneOf/10/properties/ifAlreadyInstalled/type",
                              keyword: "type",
                              params: {
                                type: "string"
                              },
                              message: "must be string"
                            }
                          ], !1;
                        if (!(s === "overwrite" || s === "skip" || s === "error"))
                          return n.errors = [
                            {
                              instancePath: t + "/ifAlreadyInstalled",
                              schemaPath: "#/oneOf/10/properties/ifAlreadyInstalled/enum",
                              keyword: "enum",
                              params: {
                                allowedValues: br.oneOf[10].properties.ifAlreadyInstalled.enum
                              },
                              message: "must be equal to one of the allowed values"
                            }
                          ], !1;
                        var y = u === e;
                      } else
                        var y = !0;
                      if (y) {
                        if (r.step !== void 0) {
                          let s = r.step;
                          const u = e;
                          if (typeof s != "string")
                            return n.errors = [
                              {
                                instancePath: t + "/step",
                                schemaPath: "#/oneOf/10/properties/step/type",
                                keyword: "type",
                                params: {
                                  type: "string"
                                },
                                message: "must be string"
                              }
                            ], !1;
                          if (s !== "installTheme")
                            return n.errors = [
                              {
                                instancePath: t + "/step",
                                schemaPath: "#/oneOf/10/properties/step/const",
                                keyword: "const",
                                params: {
                                  allowedValue: "installTheme"
                                },
                                message: "must be equal to constant"
                              }
                            ], !1;
                          var y = u === e;
                        } else
                          var y = !0;
                        if (y) {
                          if (r.themeZipFile !== void 0) {
                            const s = e;
                            re(
                              r.themeZipFile,
                              {
                                instancePath: t + "/themeZipFile",
                                parentData: r,
                                parentDataProperty: "themeZipFile",
                                rootData: l
                              }
                            ) || (i = i === null ? re.errors : i.concat(
                              re.errors
                            ), e = i.length);
                            var y = s === e;
                          } else
                            var y = !0;
                          if (y)
                            if (r.options !== void 0) {
                              let s = r.options;
                              const u = e;
                              if (e === u)
                                if (s && typeof s == "object" && !Array.isArray(
                                  s
                                )) {
                                  const a = e;
                                  for (const j in s)
                                    if (!(j === "activate" || j === "importStarterContent"))
                                      return n.errors = [
                                        {
                                          instancePath: t + "/options",
                                          schemaPath: "#/oneOf/10/properties/options/additionalProperties",
                                          keyword: "additionalProperties",
                                          params: {
                                            additionalProperty: j
                                          },
                                          message: "must NOT have additional properties"
                                        }
                                      ], !1;
                                  if (a === e) {
                                    if (s.activate !== void 0) {
                                      const j = e;
                                      if (typeof s.activate != "boolean")
                                        return n.errors = [
                                          {
                                            instancePath: t + "/options/activate",
                                            schemaPath: "#/oneOf/10/properties/options/properties/activate/type",
                                            keyword: "type",
                                            params: {
                                              type: "boolean"
                                            },
                                            message: "must be boolean"
                                          }
                                        ], !1;
                                      var g = j === e;
                                    } else
                                      var g = !0;
                                    if (g)
                                      if (s.importStarterContent !== void 0) {
                                        const j = e;
                                        if (typeof s.importStarterContent != "boolean")
                                          return n.errors = [
                                            {
                                              instancePath: t + "/options/importStarterContent",
                                              schemaPath: "#/oneOf/10/properties/options/properties/importStarterContent/type",
                                              keyword: "type",
                                              params: {
                                                type: "boolean"
                                              },
                                              message: "must be boolean"
                                            }
                                          ], !1;
                                        var g = j === e;
                                      } else
                                        var g = !0;
                                  }
                                } else
                                  return n.errors = [
                                    {
                                      instancePath: t + "/options",
                                      schemaPath: "#/oneOf/10/properties/options/type",
                                      keyword: "type",
                                      params: {
                                        type: "object"
                                      },
                                      message: "must be object"
                                    }
                                  ], !1;
                              var y = u === e;
                            } else
                              var y = !0;
                        }
                      }
                    }
                  }
                }
              } else
                return n.errors = [
                  {
                    instancePath: t,
                    schemaPath: "#/oneOf/10/type",
                    keyword: "type",
                    params: { type: "object" },
                    message: "must be object"
                  }
                ], !1;
          } else if (G === "login") {
            if (e === e)
              if (r && typeof r == "object" && !Array.isArray(r)) {
                let d;
                if (r.step === void 0 && (d = "step"))
                  return n.errors = [
                    {
                      instancePath: t,
                      schemaPath: "#/oneOf/11/required",
                      keyword: "required",
                      params: {
                        missingProperty: d
                      },
                      message: "must have required property '" + d + "'"
                    }
                  ], !1;
                {
                  const F = e;
                  for (const s in r)
                    if (!(s === "progress" || s === "step" || s === "username" || s === "password"))
                      return n.errors = [
                        {
                          instancePath: t,
                          schemaPath: "#/oneOf/11/additionalProperties",
                          keyword: "additionalProperties",
                          params: {
                            additionalProperty: s
                          },
                          message: "must NOT have additional properties"
                        }
                      ], !1;
                  if (F === e) {
                    if (r.progress !== void 0) {
                      let s = r.progress;
                      const u = e;
                      if (e === u)
                        if (s && typeof s == "object" && !Array.isArray(s)) {
                          const L = e;
                          for (const a in s)
                            if (!(a === "weight" || a === "caption"))
                              return n.errors = [
                                {
                                  instancePath: t + "/progress",
                                  schemaPath: "#/oneOf/11/properties/progress/additionalProperties",
                                  keyword: "additionalProperties",
                                  params: {
                                    additionalProperty: a
                                  },
                                  message: "must NOT have additional properties"
                                }
                              ], !1;
                          if (L === e) {
                            if (s.weight !== void 0) {
                              let a = s.weight;
                              const j = e;
                              if (!(typeof a == "number" && isFinite(
                                a
                              )))
                                return n.errors = [
                                  {
                                    instancePath: t + "/progress/weight",
                                    schemaPath: "#/oneOf/11/properties/progress/properties/weight/type",
                                    keyword: "type",
                                    params: {
                                      type: "number"
                                    },
                                    message: "must be number"
                                  }
                                ], !1;
                              var v = j === e;
                            } else
                              var v = !0;
                            if (v)
                              if (s.caption !== void 0) {
                                const a = e;
                                if (typeof s.caption != "string")
                                  return n.errors = [
                                    {
                                      instancePath: t + "/progress/caption",
                                      schemaPath: "#/oneOf/11/properties/progress/properties/caption/type",
                                      keyword: "type",
                                      params: {
                                        type: "string"
                                      },
                                      message: "must be string"
                                    }
                                  ], !1;
                                var v = a === e;
                              } else
                                var v = !0;
                          }
                        } else
                          return n.errors = [
                            {
                              instancePath: t + "/progress",
                              schemaPath: "#/oneOf/11/properties/progress/type",
                              keyword: "type",
                              params: {
                                type: "object"
                              },
                              message: "must be object"
                            }
                          ], !1;
                      var O = u === e;
                    } else
                      var O = !0;
                    if (O) {
                      if (r.step !== void 0) {
                        let s = r.step;
                        const u = e;
                        if (typeof s != "string")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/11/properties/step/type",
                              keyword: "type",
                              params: {
                                type: "string"
                              },
                              message: "must be string"
                            }
                          ], !1;
                        if (s !== "login")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/11/properties/step/const",
                              keyword: "const",
                              params: {
                                allowedValue: "login"
                              },
                              message: "must be equal to constant"
                            }
                          ], !1;
                        var O = u === e;
                      } else
                        var O = !0;
                      if (O) {
                        if (r.username !== void 0) {
                          const s = e;
                          if (typeof r.username != "string")
                            return n.errors = [
                              {
                                instancePath: t + "/username",
                                schemaPath: "#/oneOf/11/properties/username/type",
                                keyword: "type",
                                params: {
                                  type: "string"
                                },
                                message: "must be string"
                              }
                            ], !1;
                          var O = s === e;
                        } else
                          var O = !0;
                        if (O)
                          if (r.password !== void 0) {
                            const s = e;
                            if (typeof r.password != "string")
                              return n.errors = [
                                {
                                  instancePath: t + "/password",
                                  schemaPath: "#/oneOf/11/properties/password/type",
                                  keyword: "type",
                                  params: {
                                    type: "string"
                                  },
                                  message: "must be string"
                                }
                              ], !1;
                            var O = s === e;
                          } else
                            var O = !0;
                      }
                    }
                  }
                }
              } else
                return n.errors = [
                  {
                    instancePath: t,
                    schemaPath: "#/oneOf/11/type",
                    keyword: "type",
                    params: { type: "object" },
                    message: "must be object"
                  }
                ], !1;
          } else if (G === "mkdir") {
            if (e === e)
              if (r && typeof r == "object" && !Array.isArray(r)) {
                let d;
                if (r.path === void 0 && (d = "path") || r.step === void 0 && (d = "step"))
                  return n.errors = [
                    {
                      instancePath: t,
                      schemaPath: "#/oneOf/12/required",
                      keyword: "required",
                      params: {
                        missingProperty: d
                      },
                      message: "must have required property '" + d + "'"
                    }
                  ], !1;
                {
                  const F = e;
                  for (const s in r)
                    if (!(s === "progress" || s === "step" || s === "path"))
                      return n.errors = [
                        {
                          instancePath: t,
                          schemaPath: "#/oneOf/12/additionalProperties",
                          keyword: "additionalProperties",
                          params: {
                            additionalProperty: s
                          },
                          message: "must NOT have additional properties"
                        }
                      ], !1;
                  if (F === e) {
                    if (r.progress !== void 0) {
                      let s = r.progress;
                      const u = e;
                      if (e === u)
                        if (s && typeof s == "object" && !Array.isArray(s)) {
                          const L = e;
                          for (const a in s)
                            if (!(a === "weight" || a === "caption"))
                              return n.errors = [
                                {
                                  instancePath: t + "/progress",
                                  schemaPath: "#/oneOf/12/properties/progress/additionalProperties",
                                  keyword: "additionalProperties",
                                  params: {
                                    additionalProperty: a
                                  },
                                  message: "must NOT have additional properties"
                                }
                              ], !1;
                          if (L === e) {
                            if (s.weight !== void 0) {
                              let a = s.weight;
                              const j = e;
                              if (!(typeof a == "number" && isFinite(
                                a
                              )))
                                return n.errors = [
                                  {
                                    instancePath: t + "/progress/weight",
                                    schemaPath: "#/oneOf/12/properties/progress/properties/weight/type",
                                    keyword: "type",
                                    params: {
                                      type: "number"
                                    },
                                    message: "must be number"
                                  }
                                ], !1;
                              var N = j === e;
                            } else
                              var N = !0;
                            if (N)
                              if (s.caption !== void 0) {
                                const a = e;
                                if (typeof s.caption != "string")
                                  return n.errors = [
                                    {
                                      instancePath: t + "/progress/caption",
                                      schemaPath: "#/oneOf/12/properties/progress/properties/caption/type",
                                      keyword: "type",
                                      params: {
                                        type: "string"
                                      },
                                      message: "must be string"
                                    }
                                  ], !1;
                                var N = a === e;
                              } else
                                var N = !0;
                          }
                        } else
                          return n.errors = [
                            {
                              instancePath: t + "/progress",
                              schemaPath: "#/oneOf/12/properties/progress/type",
                              keyword: "type",
                              params: {
                                type: "object"
                              },
                              message: "must be object"
                            }
                          ], !1;
                      var q = u === e;
                    } else
                      var q = !0;
                    if (q) {
                      if (r.step !== void 0) {
                        let s = r.step;
                        const u = e;
                        if (typeof s != "string")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/12/properties/step/type",
                              keyword: "type",
                              params: {
                                type: "string"
                              },
                              message: "must be string"
                            }
                          ], !1;
                        if (s !== "mkdir")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/12/properties/step/const",
                              keyword: "const",
                              params: {
                                allowedValue: "mkdir"
                              },
                              message: "must be equal to constant"
                            }
                          ], !1;
                        var q = u === e;
                      } else
                        var q = !0;
                      if (q)
                        if (r.path !== void 0) {
                          const s = e;
                          if (typeof r.path != "string")
                            return n.errors = [
                              {
                                instancePath: t + "/path",
                                schemaPath: "#/oneOf/12/properties/path/type",
                                keyword: "type",
                                params: {
                                  type: "string"
                                },
                                message: "must be string"
                              }
                            ], !1;
                          var q = s === e;
                        } else
                          var q = !0;
                    }
                  }
                }
              } else
                return n.errors = [
                  {
                    instancePath: t,
                    schemaPath: "#/oneOf/12/type",
                    keyword: "type",
                    params: { type: "object" },
                    message: "must be object"
                  }
                ], !1;
          } else if (G === "mv") {
            if (e === e)
              if (r && typeof r == "object" && !Array.isArray(r)) {
                let d;
                if (r.fromPath === void 0 && (d = "fromPath") || r.step === void 0 && (d = "step") || r.toPath === void 0 && (d = "toPath"))
                  return n.errors = [
                    {
                      instancePath: t,
                      schemaPath: "#/oneOf/13/required",
                      keyword: "required",
                      params: {
                        missingProperty: d
                      },
                      message: "must have required property '" + d + "'"
                    }
                  ], !1;
                {
                  const F = e;
                  for (const s in r)
                    if (!(s === "progress" || s === "step" || s === "fromPath" || s === "toPath"))
                      return n.errors = [
                        {
                          instancePath: t,
                          schemaPath: "#/oneOf/13/additionalProperties",
                          keyword: "additionalProperties",
                          params: {
                            additionalProperty: s
                          },
                          message: "must NOT have additional properties"
                        }
                      ], !1;
                  if (F === e) {
                    if (r.progress !== void 0) {
                      let s = r.progress;
                      const u = e;
                      if (e === u)
                        if (s && typeof s == "object" && !Array.isArray(s)) {
                          const L = e;
                          for (const a in s)
                            if (!(a === "weight" || a === "caption"))
                              return n.errors = [
                                {
                                  instancePath: t + "/progress",
                                  schemaPath: "#/oneOf/13/properties/progress/additionalProperties",
                                  keyword: "additionalProperties",
                                  params: {
                                    additionalProperty: a
                                  },
                                  message: "must NOT have additional properties"
                                }
                              ], !1;
                          if (L === e) {
                            if (s.weight !== void 0) {
                              let a = s.weight;
                              const j = e;
                              if (!(typeof a == "number" && isFinite(
                                a
                              )))
                                return n.errors = [
                                  {
                                    instancePath: t + "/progress/weight",
                                    schemaPath: "#/oneOf/13/properties/progress/properties/weight/type",
                                    keyword: "type",
                                    params: {
                                      type: "number"
                                    },
                                    message: "must be number"
                                  }
                                ], !1;
                              var W = j === e;
                            } else
                              var W = !0;
                            if (W)
                              if (s.caption !== void 0) {
                                const a = e;
                                if (typeof s.caption != "string")
                                  return n.errors = [
                                    {
                                      instancePath: t + "/progress/caption",
                                      schemaPath: "#/oneOf/13/properties/progress/properties/caption/type",
                                      keyword: "type",
                                      params: {
                                        type: "string"
                                      },
                                      message: "must be string"
                                    }
                                  ], !1;
                                var W = a === e;
                              } else
                                var W = !0;
                          }
                        } else
                          return n.errors = [
                            {
                              instancePath: t + "/progress",
                              schemaPath: "#/oneOf/13/properties/progress/type",
                              keyword: "type",
                              params: {
                                type: "object"
                              },
                              message: "must be object"
                            }
                          ], !1;
                      var R = u === e;
                    } else
                      var R = !0;
                    if (R) {
                      if (r.step !== void 0) {
                        let s = r.step;
                        const u = e;
                        if (typeof s != "string")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/13/properties/step/type",
                              keyword: "type",
                              params: {
                                type: "string"
                              },
                              message: "must be string"
                            }
                          ], !1;
                        if (s !== "mv")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/13/properties/step/const",
                              keyword: "const",
                              params: {
                                allowedValue: "mv"
                              },
                              message: "must be equal to constant"
                            }
                          ], !1;
                        var R = u === e;
                      } else
                        var R = !0;
                      if (R) {
                        if (r.fromPath !== void 0) {
                          const s = e;
                          if (typeof r.fromPath != "string")
                            return n.errors = [
                              {
                                instancePath: t + "/fromPath",
                                schemaPath: "#/oneOf/13/properties/fromPath/type",
                                keyword: "type",
                                params: {
                                  type: "string"
                                },
                                message: "must be string"
                              }
                            ], !1;
                          var R = s === e;
                        } else
                          var R = !0;
                        if (R)
                          if (r.toPath !== void 0) {
                            const s = e;
                            if (typeof r.toPath != "string")
                              return n.errors = [
                                {
                                  instancePath: t + "/toPath",
                                  schemaPath: "#/oneOf/13/properties/toPath/type",
                                  keyword: "type",
                                  params: {
                                    type: "string"
                                  },
                                  message: "must be string"
                                }
                              ], !1;
                            var R = s === e;
                          } else
                            var R = !0;
                      }
                    }
                  }
                }
              } else
                return n.errors = [
                  {
                    instancePath: t,
                    schemaPath: "#/oneOf/13/type",
                    keyword: "type",
                    params: { type: "object" },
                    message: "must be object"
                  }
                ], !1;
          } else if (G === "resetData") {
            if (e === e)
              if (r && typeof r == "object" && !Array.isArray(r)) {
                let d;
                if (r.step === void 0 && (d = "step"))
                  return n.errors = [
                    {
                      instancePath: t,
                      schemaPath: "#/oneOf/14/required",
                      keyword: "required",
                      params: {
                        missingProperty: d
                      },
                      message: "must have required property '" + d + "'"
                    }
                  ], !1;
                {
                  const F = e;
                  for (const s in r)
                    if (!(s === "progress" || s === "step"))
                      return n.errors = [
                        {
                          instancePath: t,
                          schemaPath: "#/oneOf/14/additionalProperties",
                          keyword: "additionalProperties",
                          params: {
                            additionalProperty: s
                          },
                          message: "must NOT have additional properties"
                        }
                      ], !1;
                  if (F === e) {
                    if (r.progress !== void 0) {
                      let s = r.progress;
                      const u = e;
                      if (e === u)
                        if (s && typeof s == "object" && !Array.isArray(s)) {
                          const L = e;
                          for (const a in s)
                            if (!(a === "weight" || a === "caption"))
                              return n.errors = [
                                {
                                  instancePath: t + "/progress",
                                  schemaPath: "#/oneOf/14/properties/progress/additionalProperties",
                                  keyword: "additionalProperties",
                                  params: {
                                    additionalProperty: a
                                  },
                                  message: "must NOT have additional properties"
                                }
                              ], !1;
                          if (L === e) {
                            if (s.weight !== void 0) {
                              let a = s.weight;
                              const j = e;
                              if (!(typeof a == "number" && isFinite(
                                a
                              )))
                                return n.errors = [
                                  {
                                    instancePath: t + "/progress/weight",
                                    schemaPath: "#/oneOf/14/properties/progress/properties/weight/type",
                                    keyword: "type",
                                    params: {
                                      type: "number"
                                    },
                                    message: "must be number"
                                  }
                                ], !1;
                              var V = j === e;
                            } else
                              var V = !0;
                            if (V)
                              if (s.caption !== void 0) {
                                const a = e;
                                if (typeof s.caption != "string")
                                  return n.errors = [
                                    {
                                      instancePath: t + "/progress/caption",
                                      schemaPath: "#/oneOf/14/properties/progress/properties/caption/type",
                                      keyword: "type",
                                      params: {
                                        type: "string"
                                      },
                                      message: "must be string"
                                    }
                                  ], !1;
                                var V = a === e;
                              } else
                                var V = !0;
                          }
                        } else
                          return n.errors = [
                            {
                              instancePath: t + "/progress",
                              schemaPath: "#/oneOf/14/properties/progress/type",
                              keyword: "type",
                              params: {
                                type: "object"
                              },
                              message: "must be object"
                            }
                          ], !1;
                      var ee = u === e;
                    } else
                      var ee = !0;
                    if (ee)
                      if (r.step !== void 0) {
                        let s = r.step;
                        const u = e;
                        if (typeof s != "string")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/14/properties/step/type",
                              keyword: "type",
                              params: {
                                type: "string"
                              },
                              message: "must be string"
                            }
                          ], !1;
                        if (s !== "resetData")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/14/properties/step/const",
                              keyword: "const",
                              params: {
                                allowedValue: "resetData"
                              },
                              message: "must be equal to constant"
                            }
                          ], !1;
                        var ee = u === e;
                      } else
                        var ee = !0;
                  }
                }
              } else
                return n.errors = [
                  {
                    instancePath: t,
                    schemaPath: "#/oneOf/14/type",
                    keyword: "type",
                    params: { type: "object" },
                    message: "must be object"
                  }
                ], !1;
          } else if (G === "request") {
            if (e === e)
              if (r && typeof r == "object" && !Array.isArray(r)) {
                let d;
                if (r.request === void 0 && (d = "request") || r.step === void 0 && (d = "step"))
                  return n.errors = [
                    {
                      instancePath: t,
                      schemaPath: "#/oneOf/15/required",
                      keyword: "required",
                      params: {
                        missingProperty: d
                      },
                      message: "must have required property '" + d + "'"
                    }
                  ], !1;
                {
                  const F = e;
                  for (const s in r)
                    if (!(s === "progress" || s === "step" || s === "request"))
                      return n.errors = [
                        {
                          instancePath: t,
                          schemaPath: "#/oneOf/15/additionalProperties",
                          keyword: "additionalProperties",
                          params: {
                            additionalProperty: s
                          },
                          message: "must NOT have additional properties"
                        }
                      ], !1;
                  if (F === e) {
                    if (r.progress !== void 0) {
                      let s = r.progress;
                      const u = e;
                      if (e === u)
                        if (s && typeof s == "object" && !Array.isArray(s)) {
                          const L = e;
                          for (const a in s)
                            if (!(a === "weight" || a === "caption"))
                              return n.errors = [
                                {
                                  instancePath: t + "/progress",
                                  schemaPath: "#/oneOf/15/properties/progress/additionalProperties",
                                  keyword: "additionalProperties",
                                  params: {
                                    additionalProperty: a
                                  },
                                  message: "must NOT have additional properties"
                                }
                              ], !1;
                          if (L === e) {
                            if (s.weight !== void 0) {
                              let a = s.weight;
                              const j = e;
                              if (!(typeof a == "number" && isFinite(
                                a
                              )))
                                return n.errors = [
                                  {
                                    instancePath: t + "/progress/weight",
                                    schemaPath: "#/oneOf/15/properties/progress/properties/weight/type",
                                    keyword: "type",
                                    params: {
                                      type: "number"
                                    },
                                    message: "must be number"
                                  }
                                ], !1;
                              var J = j === e;
                            } else
                              var J = !0;
                            if (J)
                              if (s.caption !== void 0) {
                                const a = e;
                                if (typeof s.caption != "string")
                                  return n.errors = [
                                    {
                                      instancePath: t + "/progress/caption",
                                      schemaPath: "#/oneOf/15/properties/progress/properties/caption/type",
                                      keyword: "type",
                                      params: {
                                        type: "string"
                                      },
                                      message: "must be string"
                                    }
                                  ], !1;
                                var J = a === e;
                              } else
                                var J = !0;
                          }
                        } else
                          return n.errors = [
                            {
                              instancePath: t + "/progress",
                              schemaPath: "#/oneOf/15/properties/progress/type",
                              keyword: "type",
                              params: {
                                type: "object"
                              },
                              message: "must be object"
                            }
                          ], !1;
                      var C = u === e;
                    } else
                      var C = !0;
                    if (C) {
                      if (r.step !== void 0) {
                        let s = r.step;
                        const u = e;
                        if (typeof s != "string")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/15/properties/step/type",
                              keyword: "type",
                              params: {
                                type: "string"
                              },
                              message: "must be string"
                            }
                          ], !1;
                        if (s !== "request")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/15/properties/step/const",
                              keyword: "const",
                              params: {
                                allowedValue: "request"
                              },
                              message: "must be equal to constant"
                            }
                          ], !1;
                        var C = u === e;
                      } else
                        var C = !0;
                      if (C)
                        if (r.request !== void 0) {
                          const s = e;
                          ye(
                            r.request,
                            {
                              instancePath: t + "/request",
                              parentData: r,
                              parentDataProperty: "request",
                              rootData: l
                            }
                          ) || (i = i === null ? ye.errors : i.concat(
                            ye.errors
                          ), e = i.length);
                          var C = s === e;
                        } else
                          var C = !0;
                    }
                  }
                }
              } else
                return n.errors = [
                  {
                    instancePath: t,
                    schemaPath: "#/oneOf/15/type",
                    keyword: "type",
                    params: { type: "object" },
                    message: "must be object"
                  }
                ], !1;
          } else if (G === "rm") {
            if (e === e)
              if (r && typeof r == "object" && !Array.isArray(r)) {
                let d;
                if (r.path === void 0 && (d = "path") || r.step === void 0 && (d = "step"))
                  return n.errors = [
                    {
                      instancePath: t,
                      schemaPath: "#/oneOf/16/required",
                      keyword: "required",
                      params: {
                        missingProperty: d
                      },
                      message: "must have required property '" + d + "'"
                    }
                  ], !1;
                {
                  const F = e;
                  for (const s in r)
                    if (!(s === "progress" || s === "step" || s === "path"))
                      return n.errors = [
                        {
                          instancePath: t,
                          schemaPath: "#/oneOf/16/additionalProperties",
                          keyword: "additionalProperties",
                          params: {
                            additionalProperty: s
                          },
                          message: "must NOT have additional properties"
                        }
                      ], !1;
                  if (F === e) {
                    if (r.progress !== void 0) {
                      let s = r.progress;
                      const u = e;
                      if (e === u)
                        if (s && typeof s == "object" && !Array.isArray(s)) {
                          const L = e;
                          for (const a in s)
                            if (!(a === "weight" || a === "caption"))
                              return n.errors = [
                                {
                                  instancePath: t + "/progress",
                                  schemaPath: "#/oneOf/16/properties/progress/additionalProperties",
                                  keyword: "additionalProperties",
                                  params: {
                                    additionalProperty: a
                                  },
                                  message: "must NOT have additional properties"
                                }
                              ], !1;
                          if (L === e) {
                            if (s.weight !== void 0) {
                              let a = s.weight;
                              const j = e;
                              if (!(typeof a == "number" && isFinite(
                                a
                              )))
                                return n.errors = [
                                  {
                                    instancePath: t + "/progress/weight",
                                    schemaPath: "#/oneOf/16/properties/progress/properties/weight/type",
                                    keyword: "type",
                                    params: {
                                      type: "number"
                                    },
                                    message: "must be number"
                                  }
                                ], !1;
                              var Q = j === e;
                            } else
                              var Q = !0;
                            if (Q)
                              if (s.caption !== void 0) {
                                const a = e;
                                if (typeof s.caption != "string")
                                  return n.errors = [
                                    {
                                      instancePath: t + "/progress/caption",
                                      schemaPath: "#/oneOf/16/properties/progress/properties/caption/type",
                                      keyword: "type",
                                      params: {
                                        type: "string"
                                      },
                                      message: "must be string"
                                    }
                                  ], !1;
                                var Q = a === e;
                              } else
                                var Q = !0;
                          }
                        } else
                          return n.errors = [
                            {
                              instancePath: t + "/progress",
                              schemaPath: "#/oneOf/16/properties/progress/type",
                              keyword: "type",
                              params: {
                                type: "object"
                              },
                              message: "must be object"
                            }
                          ], !1;
                      var M = u === e;
                    } else
                      var M = !0;
                    if (M) {
                      if (r.step !== void 0) {
                        let s = r.step;
                        const u = e;
                        if (typeof s != "string")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/16/properties/step/type",
                              keyword: "type",
                              params: {
                                type: "string"
                              },
                              message: "must be string"
                            }
                          ], !1;
                        if (s !== "rm")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/16/properties/step/const",
                              keyword: "const",
                              params: {
                                allowedValue: "rm"
                              },
                              message: "must be equal to constant"
                            }
                          ], !1;
                        var M = u === e;
                      } else
                        var M = !0;
                      if (M)
                        if (r.path !== void 0) {
                          const s = e;
                          if (typeof r.path != "string")
                            return n.errors = [
                              {
                                instancePath: t + "/path",
                                schemaPath: "#/oneOf/16/properties/path/type",
                                keyword: "type",
                                params: {
                                  type: "string"
                                },
                                message: "must be string"
                              }
                            ], !1;
                          var M = s === e;
                        } else
                          var M = !0;
                    }
                  }
                }
              } else
                return n.errors = [
                  {
                    instancePath: t,
                    schemaPath: "#/oneOf/16/type",
                    keyword: "type",
                    params: { type: "object" },
                    message: "must be object"
                  }
                ], !1;
          } else if (G === "rmdir") {
            if (e === e)
              if (r && typeof r == "object" && !Array.isArray(r)) {
                let d;
                if (r.path === void 0 && (d = "path") || r.step === void 0 && (d = "step"))
                  return n.errors = [
                    {
                      instancePath: t,
                      schemaPath: "#/oneOf/17/required",
                      keyword: "required",
                      params: {
                        missingProperty: d
                      },
                      message: "must have required property '" + d + "'"
                    }
                  ], !1;
                {
                  const F = e;
                  for (const s in r)
                    if (!(s === "progress" || s === "step" || s === "path"))
                      return n.errors = [
                        {
                          instancePath: t,
                          schemaPath: "#/oneOf/17/additionalProperties",
                          keyword: "additionalProperties",
                          params: {
                            additionalProperty: s
                          },
                          message: "must NOT have additional properties"
                        }
                      ], !1;
                  if (F === e) {
                    if (r.progress !== void 0) {
                      let s = r.progress;
                      const u = e;
                      if (e === u)
                        if (s && typeof s == "object" && !Array.isArray(s)) {
                          const L = e;
                          for (const a in s)
                            if (!(a === "weight" || a === "caption"))
                              return n.errors = [
                                {
                                  instancePath: t + "/progress",
                                  schemaPath: "#/oneOf/17/properties/progress/additionalProperties",
                                  keyword: "additionalProperties",
                                  params: {
                                    additionalProperty: a
                                  },
                                  message: "must NOT have additional properties"
                                }
                              ], !1;
                          if (L === e) {
                            if (s.weight !== void 0) {
                              let a = s.weight;
                              const j = e;
                              if (!(typeof a == "number" && isFinite(
                                a
                              )))
                                return n.errors = [
                                  {
                                    instancePath: t + "/progress/weight",
                                    schemaPath: "#/oneOf/17/properties/progress/properties/weight/type",
                                    keyword: "type",
                                    params: {
                                      type: "number"
                                    },
                                    message: "must be number"
                                  }
                                ], !1;
                              var Y = j === e;
                            } else
                              var Y = !0;
                            if (Y)
                              if (s.caption !== void 0) {
                                const a = e;
                                if (typeof s.caption != "string")
                                  return n.errors = [
                                    {
                                      instancePath: t + "/progress/caption",
                                      schemaPath: "#/oneOf/17/properties/progress/properties/caption/type",
                                      keyword: "type",
                                      params: {
                                        type: "string"
                                      },
                                      message: "must be string"
                                    }
                                  ], !1;
                                var Y = a === e;
                              } else
                                var Y = !0;
                          }
                        } else
                          return n.errors = [
                            {
                              instancePath: t + "/progress",
                              schemaPath: "#/oneOf/17/properties/progress/type",
                              keyword: "type",
                              params: {
                                type: "object"
                              },
                              message: "must be object"
                            }
                          ], !1;
                      var K = u === e;
                    } else
                      var K = !0;
                    if (K) {
                      if (r.step !== void 0) {
                        let s = r.step;
                        const u = e;
                        if (typeof s != "string")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/17/properties/step/type",
                              keyword: "type",
                              params: {
                                type: "string"
                              },
                              message: "must be string"
                            }
                          ], !1;
                        if (s !== "rmdir")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/17/properties/step/const",
                              keyword: "const",
                              params: {
                                allowedValue: "rmdir"
                              },
                              message: "must be equal to constant"
                            }
                          ], !1;
                        var K = u === e;
                      } else
                        var K = !0;
                      if (K)
                        if (r.path !== void 0) {
                          const s = e;
                          if (typeof r.path != "string")
                            return n.errors = [
                              {
                                instancePath: t + "/path",
                                schemaPath: "#/oneOf/17/properties/path/type",
                                keyword: "type",
                                params: {
                                  type: "string"
                                },
                                message: "must be string"
                              }
                            ], !1;
                          var K = s === e;
                        } else
                          var K = !0;
                    }
                  }
                }
              } else
                return n.errors = [
                  {
                    instancePath: t,
                    schemaPath: "#/oneOf/17/type",
                    keyword: "type",
                    params: { type: "object" },
                    message: "must be object"
                  }
                ], !1;
          } else if (G === "runPHP") {
            if (e === e)
              if (r && typeof r == "object" && !Array.isArray(r)) {
                let d;
                if (r.code === void 0 && (d = "code") || r.step === void 0 && (d = "step"))
                  return n.errors = [
                    {
                      instancePath: t,
                      schemaPath: "#/oneOf/18/required",
                      keyword: "required",
                      params: {
                        missingProperty: d
                      },
                      message: "must have required property '" + d + "'"
                    }
                  ], !1;
                {
                  const F = e;
                  for (const s in r)
                    if (!(s === "progress" || s === "step" || s === "code"))
                      return n.errors = [
                        {
                          instancePath: t,
                          schemaPath: "#/oneOf/18/additionalProperties",
                          keyword: "additionalProperties",
                          params: {
                            additionalProperty: s
                          },
                          message: "must NOT have additional properties"
                        }
                      ], !1;
                  if (F === e) {
                    if (r.progress !== void 0) {
                      let s = r.progress;
                      const u = e;
                      if (e === u)
                        if (s && typeof s == "object" && !Array.isArray(s)) {
                          const L = e;
                          for (const a in s)
                            if (!(a === "weight" || a === "caption"))
                              return n.errors = [
                                {
                                  instancePath: t + "/progress",
                                  schemaPath: "#/oneOf/18/properties/progress/additionalProperties",
                                  keyword: "additionalProperties",
                                  params: {
                                    additionalProperty: a
                                  },
                                  message: "must NOT have additional properties"
                                }
                              ], !1;
                          if (L === e) {
                            if (s.weight !== void 0) {
                              let a = s.weight;
                              const j = e;
                              if (!(typeof a == "number" && isFinite(
                                a
                              )))
                                return n.errors = [
                                  {
                                    instancePath: t + "/progress/weight",
                                    schemaPath: "#/oneOf/18/properties/progress/properties/weight/type",
                                    keyword: "type",
                                    params: {
                                      type: "number"
                                    },
                                    message: "must be number"
                                  }
                                ], !1;
                              var le = j === e;
                            } else
                              var le = !0;
                            if (le)
                              if (s.caption !== void 0) {
                                const a = e;
                                if (typeof s.caption != "string")
                                  return n.errors = [
                                    {
                                      instancePath: t + "/progress/caption",
                                      schemaPath: "#/oneOf/18/properties/progress/properties/caption/type",
                                      keyword: "type",
                                      params: {
                                        type: "string"
                                      },
                                      message: "must be string"
                                    }
                                  ], !1;
                                var le = a === e;
                              } else
                                var le = !0;
                          }
                        } else
                          return n.errors = [
                            {
                              instancePath: t + "/progress",
                              schemaPath: "#/oneOf/18/properties/progress/type",
                              keyword: "type",
                              params: {
                                type: "object"
                              },
                              message: "must be object"
                            }
                          ], !1;
                      var fe = u === e;
                    } else
                      var fe = !0;
                    if (fe) {
                      if (r.step !== void 0) {
                        let s = r.step;
                        const u = e;
                        if (typeof s != "string")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/18/properties/step/type",
                              keyword: "type",
                              params: {
                                type: "string"
                              },
                              message: "must be string"
                            }
                          ], !1;
                        if (s !== "runPHP")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/18/properties/step/const",
                              keyword: "const",
                              params: {
                                allowedValue: "runPHP"
                              },
                              message: "must be equal to constant"
                            }
                          ], !1;
                        var fe = u === e;
                      } else
                        var fe = !0;
                      if (fe)
                        if (r.code !== void 0) {
                          const s = e;
                          if (typeof r.code != "string")
                            return n.errors = [
                              {
                                instancePath: t + "/code",
                                schemaPath: "#/oneOf/18/properties/code/type",
                                keyword: "type",
                                params: {
                                  type: "string"
                                },
                                message: "must be string"
                              }
                            ], !1;
                          var fe = s === e;
                        } else
                          var fe = !0;
                    }
                  }
                }
              } else
                return n.errors = [
                  {
                    instancePath: t,
                    schemaPath: "#/oneOf/18/type",
                    keyword: "type",
                    params: { type: "object" },
                    message: "must be object"
                  }
                ], !1;
          } else if (G === "runPHPWithOptions") {
            if (e === e)
              if (r && typeof r == "object" && !Array.isArray(r)) {
                let d;
                if (r.options === void 0 && (d = "options") || r.step === void 0 && (d = "step"))
                  return n.errors = [
                    {
                      instancePath: t,
                      schemaPath: "#/oneOf/19/required",
                      keyword: "required",
                      params: {
                        missingProperty: d
                      },
                      message: "must have required property '" + d + "'"
                    }
                  ], !1;
                {
                  const F = e;
                  for (const s in r)
                    if (!(s === "progress" || s === "step" || s === "options"))
                      return n.errors = [
                        {
                          instancePath: t,
                          schemaPath: "#/oneOf/19/additionalProperties",
                          keyword: "additionalProperties",
                          params: {
                            additionalProperty: s
                          },
                          message: "must NOT have additional properties"
                        }
                      ], !1;
                  if (F === e) {
                    if (r.progress !== void 0) {
                      let s = r.progress;
                      const u = e;
                      if (e === u)
                        if (s && typeof s == "object" && !Array.isArray(s)) {
                          const L = e;
                          for (const a in s)
                            if (!(a === "weight" || a === "caption"))
                              return n.errors = [
                                {
                                  instancePath: t + "/progress",
                                  schemaPath: "#/oneOf/19/properties/progress/additionalProperties",
                                  keyword: "additionalProperties",
                                  params: {
                                    additionalProperty: a
                                  },
                                  message: "must NOT have additional properties"
                                }
                              ], !1;
                          if (L === e) {
                            if (s.weight !== void 0) {
                              let a = s.weight;
                              const j = e;
                              if (!(typeof a == "number" && isFinite(
                                a
                              )))
                                return n.errors = [
                                  {
                                    instancePath: t + "/progress/weight",
                                    schemaPath: "#/oneOf/19/properties/progress/properties/weight/type",
                                    keyword: "type",
                                    params: {
                                      type: "number"
                                    },
                                    message: "must be number"
                                  }
                                ], !1;
                              var Ie = j === e;
                            } else
                              var Ie = !0;
                            if (Ie)
                              if (s.caption !== void 0) {
                                const a = e;
                                if (typeof s.caption != "string")
                                  return n.errors = [
                                    {
                                      instancePath: t + "/progress/caption",
                                      schemaPath: "#/oneOf/19/properties/progress/properties/caption/type",
                                      keyword: "type",
                                      params: {
                                        type: "string"
                                      },
                                      message: "must be string"
                                    }
                                  ], !1;
                                var Ie = a === e;
                              } else
                                var Ie = !0;
                          }
                        } else
                          return n.errors = [
                            {
                              instancePath: t + "/progress",
                              schemaPath: "#/oneOf/19/properties/progress/type",
                              keyword: "type",
                              params: {
                                type: "object"
                              },
                              message: "must be object"
                            }
                          ], !1;
                      var $e = u === e;
                    } else
                      var $e = !0;
                    if ($e) {
                      if (r.step !== void 0) {
                        let s = r.step;
                        const u = e;
                        if (typeof s != "string")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/19/properties/step/type",
                              keyword: "type",
                              params: {
                                type: "string"
                              },
                              message: "must be string"
                            }
                          ], !1;
                        if (s !== "runPHPWithOptions")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/19/properties/step/const",
                              keyword: "const",
                              params: {
                                allowedValue: "runPHPWithOptions"
                              },
                              message: "must be equal to constant"
                            }
                          ], !1;
                        var $e = u === e;
                      } else
                        var $e = !0;
                      if ($e)
                        if (r.options !== void 0) {
                          const s = e;
                          oe(
                            r.options,
                            {
                              instancePath: t + "/options",
                              parentData: r,
                              parentDataProperty: "options",
                              rootData: l
                            }
                          ) || (i = i === null ? oe.errors : i.concat(
                            oe.errors
                          ), e = i.length);
                          var $e = s === e;
                        } else
                          var $e = !0;
                    }
                  }
                }
              } else
                return n.errors = [
                  {
                    instancePath: t,
                    schemaPath: "#/oneOf/19/type",
                    keyword: "type",
                    params: { type: "object" },
                    message: "must be object"
                  }
                ], !1;
          } else if (G === "runWpInstallationWizard") {
            if (e === e)
              if (r && typeof r == "object" && !Array.isArray(r)) {
                let d;
                if (r.options === void 0 && (d = "options") || r.step === void 0 && (d = "step"))
                  return n.errors = [
                    {
                      instancePath: t,
                      schemaPath: "#/oneOf/20/required",
                      keyword: "required",
                      params: {
                        missingProperty: d
                      },
                      message: "must have required property '" + d + "'"
                    }
                  ], !1;
                {
                  const F = e;
                  for (const s in r)
                    if (!(s === "progress" || s === "step" || s === "options"))
                      return n.errors = [
                        {
                          instancePath: t,
                          schemaPath: "#/oneOf/20/additionalProperties",
                          keyword: "additionalProperties",
                          params: {
                            additionalProperty: s
                          },
                          message: "must NOT have additional properties"
                        }
                      ], !1;
                  if (F === e) {
                    if (r.progress !== void 0) {
                      let s = r.progress;
                      const u = e;
                      if (e === u)
                        if (s && typeof s == "object" && !Array.isArray(s)) {
                          const L = e;
                          for (const a in s)
                            if (!(a === "weight" || a === "caption"))
                              return n.errors = [
                                {
                                  instancePath: t + "/progress",
                                  schemaPath: "#/oneOf/20/properties/progress/additionalProperties",
                                  keyword: "additionalProperties",
                                  params: {
                                    additionalProperty: a
                                  },
                                  message: "must NOT have additional properties"
                                }
                              ], !1;
                          if (L === e) {
                            if (s.weight !== void 0) {
                              let a = s.weight;
                              const j = e;
                              if (!(typeof a == "number" && isFinite(
                                a
                              )))
                                return n.errors = [
                                  {
                                    instancePath: t + "/progress/weight",
                                    schemaPath: "#/oneOf/20/properties/progress/properties/weight/type",
                                    keyword: "type",
                                    params: {
                                      type: "number"
                                    },
                                    message: "must be number"
                                  }
                                ], !1;
                              var De = j === e;
                            } else
                              var De = !0;
                            if (De)
                              if (s.caption !== void 0) {
                                const a = e;
                                if (typeof s.caption != "string")
                                  return n.errors = [
                                    {
                                      instancePath: t + "/progress/caption",
                                      schemaPath: "#/oneOf/20/properties/progress/properties/caption/type",
                                      keyword: "type",
                                      params: {
                                        type: "string"
                                      },
                                      message: "must be string"
                                    }
                                  ], !1;
                                var De = a === e;
                              } else
                                var De = !0;
                          }
                        } else
                          return n.errors = [
                            {
                              instancePath: t + "/progress",
                              schemaPath: "#/oneOf/20/properties/progress/type",
                              keyword: "type",
                              params: {
                                type: "object"
                              },
                              message: "must be object"
                            }
                          ], !1;
                      var Te = u === e;
                    } else
                      var Te = !0;
                    if (Te) {
                      if (r.step !== void 0) {
                        let s = r.step;
                        const u = e;
                        if (typeof s != "string")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/20/properties/step/type",
                              keyword: "type",
                              params: {
                                type: "string"
                              },
                              message: "must be string"
                            }
                          ], !1;
                        if (s !== "runWpInstallationWizard")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/20/properties/step/const",
                              keyword: "const",
                              params: {
                                allowedValue: "runWpInstallationWizard"
                              },
                              message: "must be equal to constant"
                            }
                          ], !1;
                        var Te = u === e;
                      } else
                        var Te = !0;
                      if (Te)
                        if (r.options !== void 0) {
                          let s = r.options;
                          const u = e;
                          if (e === e)
                            if (s && typeof s == "object" && !Array.isArray(
                              s
                            )) {
                              const j = e;
                              for (const ke in s)
                                if (!(ke === "adminUsername" || ke === "adminPassword"))
                                  return n.errors = [
                                    {
                                      instancePath: t + "/options",
                                      schemaPath: "#/definitions/WordPressInstallationOptions/additionalProperties",
                                      keyword: "additionalProperties",
                                      params: {
                                        additionalProperty: ke
                                      },
                                      message: "must NOT have additional properties"
                                    }
                                  ], !1;
                              if (j === e) {
                                if (s.adminUsername !== void 0) {
                                  const ke = e;
                                  if (typeof s.adminUsername != "string")
                                    return n.errors = [
                                      {
                                        instancePath: t + "/options/adminUsername",
                                        schemaPath: "#/definitions/WordPressInstallationOptions/properties/adminUsername/type",
                                        keyword: "type",
                                        params: {
                                          type: "string"
                                        },
                                        message: "must be string"
                                      }
                                    ], !1;
                                  var We = ke === e;
                                } else
                                  var We = !0;
                                if (We)
                                  if (s.adminPassword !== void 0) {
                                    const ke = e;
                                    if (typeof s.adminPassword != "string")
                                      return n.errors = [
                                        {
                                          instancePath: t + "/options/adminPassword",
                                          schemaPath: "#/definitions/WordPressInstallationOptions/properties/adminPassword/type",
                                          keyword: "type",
                                          params: {
                                            type: "string"
                                          },
                                          message: "must be string"
                                        }
                                      ], !1;
                                    var We = ke === e;
                                  } else
                                    var We = !0;
                              }
                            } else
                              return n.errors = [
                                {
                                  instancePath: t + "/options",
                                  schemaPath: "#/definitions/WordPressInstallationOptions/type",
                                  keyword: "type",
                                  params: {
                                    type: "object"
                                  },
                                  message: "must be object"
                                }
                              ], !1;
                          var Te = u === e;
                        } else
                          var Te = !0;
                    }
                  }
                }
              } else
                return n.errors = [
                  {
                    instancePath: t,
                    schemaPath: "#/oneOf/20/type",
                    keyword: "type",
                    params: { type: "object" },
                    message: "must be object"
                  }
                ], !1;
          } else if (G === "runSql") {
            if (e === e)
              if (r && typeof r == "object" && !Array.isArray(r)) {
                let d;
                if (r.sql === void 0 && (d = "sql") || r.step === void 0 && (d = "step"))
                  return n.errors = [
                    {
                      instancePath: t,
                      schemaPath: "#/oneOf/21/required",
                      keyword: "required",
                      params: {
                        missingProperty: d
                      },
                      message: "must have required property '" + d + "'"
                    }
                  ], !1;
                {
                  const F = e;
                  for (const s in r)
                    if (!(s === "progress" || s === "step" || s === "sql"))
                      return n.errors = [
                        {
                          instancePath: t,
                          schemaPath: "#/oneOf/21/additionalProperties",
                          keyword: "additionalProperties",
                          params: {
                            additionalProperty: s
                          },
                          message: "must NOT have additional properties"
                        }
                      ], !1;
                  if (F === e) {
                    if (r.progress !== void 0) {
                      let s = r.progress;
                      const u = e;
                      if (e === u)
                        if (s && typeof s == "object" && !Array.isArray(s)) {
                          const L = e;
                          for (const a in s)
                            if (!(a === "weight" || a === "caption"))
                              return n.errors = [
                                {
                                  instancePath: t + "/progress",
                                  schemaPath: "#/oneOf/21/properties/progress/additionalProperties",
                                  keyword: "additionalProperties",
                                  params: {
                                    additionalProperty: a
                                  },
                                  message: "must NOT have additional properties"
                                }
                              ], !1;
                          if (L === e) {
                            if (s.weight !== void 0) {
                              let a = s.weight;
                              const j = e;
                              if (!(typeof a == "number" && isFinite(
                                a
                              )))
                                return n.errors = [
                                  {
                                    instancePath: t + "/progress/weight",
                                    schemaPath: "#/oneOf/21/properties/progress/properties/weight/type",
                                    keyword: "type",
                                    params: {
                                      type: "number"
                                    },
                                    message: "must be number"
                                  }
                                ], !1;
                              var Me = j === e;
                            } else
                              var Me = !0;
                            if (Me)
                              if (s.caption !== void 0) {
                                const a = e;
                                if (typeof s.caption != "string")
                                  return n.errors = [
                                    {
                                      instancePath: t + "/progress/caption",
                                      schemaPath: "#/oneOf/21/properties/progress/properties/caption/type",
                                      keyword: "type",
                                      params: {
                                        type: "string"
                                      },
                                      message: "must be string"
                                    }
                                  ], !1;
                                var Me = a === e;
                              } else
                                var Me = !0;
                          }
                        } else
                          return n.errors = [
                            {
                              instancePath: t + "/progress",
                              schemaPath: "#/oneOf/21/properties/progress/type",
                              keyword: "type",
                              params: {
                                type: "object"
                              },
                              message: "must be object"
                            }
                          ], !1;
                      var je = u === e;
                    } else
                      var je = !0;
                    if (je) {
                      if (r.step !== void 0) {
                        let s = r.step;
                        const u = e;
                        if (typeof s != "string")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/21/properties/step/type",
                              keyword: "type",
                              params: {
                                type: "string"
                              },
                              message: "must be string"
                            }
                          ], !1;
                        if (s !== "runSql")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/21/properties/step/const",
                              keyword: "const",
                              params: {
                                allowedValue: "runSql"
                              },
                              message: "must be equal to constant"
                            }
                          ], !1;
                        var je = u === e;
                      } else
                        var je = !0;
                      if (je)
                        if (r.sql !== void 0) {
                          const s = e;
                          re(r.sql, {
                            instancePath: t + "/sql",
                            parentData: r,
                            parentDataProperty: "sql",
                            rootData: l
                          }) || (i = i === null ? re.errors : i.concat(
                            re.errors
                          ), e = i.length);
                          var je = s === e;
                        } else
                          var je = !0;
                    }
                  }
                }
              } else
                return n.errors = [
                  {
                    instancePath: t,
                    schemaPath: "#/oneOf/21/type",
                    keyword: "type",
                    params: { type: "object" },
                    message: "must be object"
                  }
                ], !1;
          } else if (G === "setSiteOptions") {
            if (e === e)
              if (r && typeof r == "object" && !Array.isArray(r)) {
                let d;
                if (r.options === void 0 && (d = "options") || r.step === void 0 && (d = "step"))
                  return n.errors = [
                    {
                      instancePath: t,
                      schemaPath: "#/oneOf/22/required",
                      keyword: "required",
                      params: {
                        missingProperty: d
                      },
                      message: "must have required property '" + d + "'"
                    }
                  ], !1;
                {
                  const F = e;
                  for (const s in r)
                    if (!(s === "progress" || s === "step" || s === "options"))
                      return n.errors = [
                        {
                          instancePath: t,
                          schemaPath: "#/oneOf/22/additionalProperties",
                          keyword: "additionalProperties",
                          params: {
                            additionalProperty: s
                          },
                          message: "must NOT have additional properties"
                        }
                      ], !1;
                  if (F === e) {
                    if (r.progress !== void 0) {
                      let s = r.progress;
                      const u = e;
                      if (e === u)
                        if (s && typeof s == "object" && !Array.isArray(s)) {
                          const L = e;
                          for (const a in s)
                            if (!(a === "weight" || a === "caption"))
                              return n.errors = [
                                {
                                  instancePath: t + "/progress",
                                  schemaPath: "#/oneOf/22/properties/progress/additionalProperties",
                                  keyword: "additionalProperties",
                                  params: {
                                    additionalProperty: a
                                  },
                                  message: "must NOT have additional properties"
                                }
                              ], !1;
                          if (L === e) {
                            if (s.weight !== void 0) {
                              let a = s.weight;
                              const j = e;
                              if (!(typeof a == "number" && isFinite(
                                a
                              )))
                                return n.errors = [
                                  {
                                    instancePath: t + "/progress/weight",
                                    schemaPath: "#/oneOf/22/properties/progress/properties/weight/type",
                                    keyword: "type",
                                    params: {
                                      type: "number"
                                    },
                                    message: "must be number"
                                  }
                                ], !1;
                              var Be = j === e;
                            } else
                              var Be = !0;
                            if (Be)
                              if (s.caption !== void 0) {
                                const a = e;
                                if (typeof s.caption != "string")
                                  return n.errors = [
                                    {
                                      instancePath: t + "/progress/caption",
                                      schemaPath: "#/oneOf/22/properties/progress/properties/caption/type",
                                      keyword: "type",
                                      params: {
                                        type: "string"
                                      },
                                      message: "must be string"
                                    }
                                  ], !1;
                                var Be = a === e;
                              } else
                                var Be = !0;
                          }
                        } else
                          return n.errors = [
                            {
                              instancePath: t + "/progress",
                              schemaPath: "#/oneOf/22/properties/progress/type",
                              keyword: "type",
                              params: {
                                type: "object"
                              },
                              message: "must be object"
                            }
                          ], !1;
                      var Ae = u === e;
                    } else
                      var Ae = !0;
                    if (Ae) {
                      if (r.step !== void 0) {
                        let s = r.step;
                        const u = e;
                        if (typeof s != "string")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/22/properties/step/type",
                              keyword: "type",
                              params: {
                                type: "string"
                              },
                              message: "must be string"
                            }
                          ], !1;
                        if (s !== "setSiteOptions")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/22/properties/step/const",
                              keyword: "const",
                              params: {
                                allowedValue: "setSiteOptions"
                              },
                              message: "must be equal to constant"
                            }
                          ], !1;
                        var Ae = u === e;
                      } else
                        var Ae = !0;
                      if (Ae)
                        if (r.options !== void 0) {
                          let s = r.options;
                          const u = e;
                          if (e === u && !(s && typeof s == "object" && !Array.isArray(
                            s
                          )))
                            return n.errors = [
                              {
                                instancePath: t + "/options",
                                schemaPath: "#/oneOf/22/properties/options/type",
                                keyword: "type",
                                params: {
                                  type: "object"
                                },
                                message: "must be object"
                              }
                            ], !1;
                          var Ae = u === e;
                        } else
                          var Ae = !0;
                    }
                  }
                }
              } else
                return n.errors = [
                  {
                    instancePath: t,
                    schemaPath: "#/oneOf/22/type",
                    keyword: "type",
                    params: { type: "object" },
                    message: "must be object"
                  }
                ], !1;
          } else if (G === "unzip") {
            if (e === e)
              if (r && typeof r == "object" && !Array.isArray(r)) {
                let d;
                if (r.extractToPath === void 0 && (d = "extractToPath") || r.step === void 0 && (d = "step"))
                  return n.errors = [
                    {
                      instancePath: t,
                      schemaPath: "#/oneOf/23/required",
                      keyword: "required",
                      params: {
                        missingProperty: d
                      },
                      message: "must have required property '" + d + "'"
                    }
                  ], !1;
                {
                  const F = e;
                  for (const s in r)
                    if (!(s === "progress" || s === "step" || s === "zipFile" || s === "zipPath" || s === "extractToPath"))
                      return n.errors = [
                        {
                          instancePath: t,
                          schemaPath: "#/oneOf/23/additionalProperties",
                          keyword: "additionalProperties",
                          params: {
                            additionalProperty: s
                          },
                          message: "must NOT have additional properties"
                        }
                      ], !1;
                  if (F === e) {
                    if (r.progress !== void 0) {
                      let s = r.progress;
                      const u = e;
                      if (e === u)
                        if (s && typeof s == "object" && !Array.isArray(s)) {
                          const L = e;
                          for (const a in s)
                            if (!(a === "weight" || a === "caption"))
                              return n.errors = [
                                {
                                  instancePath: t + "/progress",
                                  schemaPath: "#/oneOf/23/properties/progress/additionalProperties",
                                  keyword: "additionalProperties",
                                  params: {
                                    additionalProperty: a
                                  },
                                  message: "must NOT have additional properties"
                                }
                              ], !1;
                          if (L === e) {
                            if (s.weight !== void 0) {
                              let a = s.weight;
                              const j = e;
                              if (!(typeof a == "number" && isFinite(
                                a
                              )))
                                return n.errors = [
                                  {
                                    instancePath: t + "/progress/weight",
                                    schemaPath: "#/oneOf/23/properties/progress/properties/weight/type",
                                    keyword: "type",
                                    params: {
                                      type: "number"
                                    },
                                    message: "must be number"
                                  }
                                ], !1;
                              var Ue = j === e;
                            } else
                              var Ue = !0;
                            if (Ue)
                              if (s.caption !== void 0) {
                                const a = e;
                                if (typeof s.caption != "string")
                                  return n.errors = [
                                    {
                                      instancePath: t + "/progress/caption",
                                      schemaPath: "#/oneOf/23/properties/progress/properties/caption/type",
                                      keyword: "type",
                                      params: {
                                        type: "string"
                                      },
                                      message: "must be string"
                                    }
                                  ], !1;
                                var Ue = a === e;
                              } else
                                var Ue = !0;
                          }
                        } else
                          return n.errors = [
                            {
                              instancePath: t + "/progress",
                              schemaPath: "#/oneOf/23/properties/progress/type",
                              keyword: "type",
                              params: {
                                type: "object"
                              },
                              message: "must be object"
                            }
                          ], !1;
                      var ue = u === e;
                    } else
                      var ue = !0;
                    if (ue) {
                      if (r.step !== void 0) {
                        let s = r.step;
                        const u = e;
                        if (typeof s != "string")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/23/properties/step/type",
                              keyword: "type",
                              params: {
                                type: "string"
                              },
                              message: "must be string"
                            }
                          ], !1;
                        if (s !== "unzip")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/23/properties/step/const",
                              keyword: "const",
                              params: {
                                allowedValue: "unzip"
                              },
                              message: "must be equal to constant"
                            }
                          ], !1;
                        var ue = u === e;
                      } else
                        var ue = !0;
                      if (ue) {
                        if (r.zipFile !== void 0) {
                          const s = e;
                          re(
                            r.zipFile,
                            {
                              instancePath: t + "/zipFile",
                              parentData: r,
                              parentDataProperty: "zipFile",
                              rootData: l
                            }
                          ) || (i = i === null ? re.errors : i.concat(
                            re.errors
                          ), e = i.length);
                          var ue = s === e;
                        } else
                          var ue = !0;
                        if (ue) {
                          if (r.zipPath !== void 0) {
                            const s = e;
                            if (typeof r.zipPath != "string")
                              return n.errors = [
                                {
                                  instancePath: t + "/zipPath",
                                  schemaPath: "#/oneOf/23/properties/zipPath/type",
                                  keyword: "type",
                                  params: {
                                    type: "string"
                                  },
                                  message: "must be string"
                                }
                              ], !1;
                            var ue = s === e;
                          } else
                            var ue = !0;
                          if (ue)
                            if (r.extractToPath !== void 0) {
                              const s = e;
                              if (typeof r.extractToPath != "string")
                                return n.errors = [
                                  {
                                    instancePath: t + "/extractToPath",
                                    schemaPath: "#/oneOf/23/properties/extractToPath/type",
                                    keyword: "type",
                                    params: {
                                      type: "string"
                                    },
                                    message: "must be string"
                                  }
                                ], !1;
                              var ue = s === e;
                            } else
                              var ue = !0;
                        }
                      }
                    }
                  }
                }
              } else
                return n.errors = [
                  {
                    instancePath: t,
                    schemaPath: "#/oneOf/23/type",
                    keyword: "type",
                    params: { type: "object" },
                    message: "must be object"
                  }
                ], !1;
          } else if (G === "updateUserMeta") {
            if (e === e)
              if (r && typeof r == "object" && !Array.isArray(r)) {
                let d;
                if (r.meta === void 0 && (d = "meta") || r.step === void 0 && (d = "step") || r.userId === void 0 && (d = "userId"))
                  return n.errors = [
                    {
                      instancePath: t,
                      schemaPath: "#/oneOf/24/required",
                      keyword: "required",
                      params: {
                        missingProperty: d
                      },
                      message: "must have required property '" + d + "'"
                    }
                  ], !1;
                {
                  const F = e;
                  for (const s in r)
                    if (!(s === "progress" || s === "step" || s === "meta" || s === "userId"))
                      return n.errors = [
                        {
                          instancePath: t,
                          schemaPath: "#/oneOf/24/additionalProperties",
                          keyword: "additionalProperties",
                          params: {
                            additionalProperty: s
                          },
                          message: "must NOT have additional properties"
                        }
                      ], !1;
                  if (F === e) {
                    if (r.progress !== void 0) {
                      let s = r.progress;
                      const u = e;
                      if (e === u)
                        if (s && typeof s == "object" && !Array.isArray(s)) {
                          const L = e;
                          for (const a in s)
                            if (!(a === "weight" || a === "caption"))
                              return n.errors = [
                                {
                                  instancePath: t + "/progress",
                                  schemaPath: "#/oneOf/24/properties/progress/additionalProperties",
                                  keyword: "additionalProperties",
                                  params: {
                                    additionalProperty: a
                                  },
                                  message: "must NOT have additional properties"
                                }
                              ], !1;
                          if (L === e) {
                            if (s.weight !== void 0) {
                              let a = s.weight;
                              const j = e;
                              if (!(typeof a == "number" && isFinite(
                                a
                              )))
                                return n.errors = [
                                  {
                                    instancePath: t + "/progress/weight",
                                    schemaPath: "#/oneOf/24/properties/progress/properties/weight/type",
                                    keyword: "type",
                                    params: {
                                      type: "number"
                                    },
                                    message: "must be number"
                                  }
                                ], !1;
                              var ze = j === e;
                            } else
                              var ze = !0;
                            if (ze)
                              if (s.caption !== void 0) {
                                const a = e;
                                if (typeof s.caption != "string")
                                  return n.errors = [
                                    {
                                      instancePath: t + "/progress/caption",
                                      schemaPath: "#/oneOf/24/properties/progress/properties/caption/type",
                                      keyword: "type",
                                      params: {
                                        type: "string"
                                      },
                                      message: "must be string"
                                    }
                                  ], !1;
                                var ze = a === e;
                              } else
                                var ze = !0;
                          }
                        } else
                          return n.errors = [
                            {
                              instancePath: t + "/progress",
                              schemaPath: "#/oneOf/24/properties/progress/type",
                              keyword: "type",
                              params: {
                                type: "object"
                              },
                              message: "must be object"
                            }
                          ], !1;
                      var ve = u === e;
                    } else
                      var ve = !0;
                    if (ve) {
                      if (r.step !== void 0) {
                        let s = r.step;
                        const u = e;
                        if (typeof s != "string")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/24/properties/step/type",
                              keyword: "type",
                              params: {
                                type: "string"
                              },
                              message: "must be string"
                            }
                          ], !1;
                        if (s !== "updateUserMeta")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/24/properties/step/const",
                              keyword: "const",
                              params: {
                                allowedValue: "updateUserMeta"
                              },
                              message: "must be equal to constant"
                            }
                          ], !1;
                        var ve = u === e;
                      } else
                        var ve = !0;
                      if (ve) {
                        if (r.meta !== void 0) {
                          let s = r.meta;
                          const u = e;
                          if (e === u && !(s && typeof s == "object" && !Array.isArray(
                            s
                          )))
                            return n.errors = [
                              {
                                instancePath: t + "/meta",
                                schemaPath: "#/oneOf/24/properties/meta/type",
                                keyword: "type",
                                params: {
                                  type: "object"
                                },
                                message: "must be object"
                              }
                            ], !1;
                          var ve = u === e;
                        } else
                          var ve = !0;
                        if (ve)
                          if (r.userId !== void 0) {
                            let s = r.userId;
                            const u = e;
                            if (!(typeof s == "number" && isFinite(
                              s
                            )))
                              return n.errors = [
                                {
                                  instancePath: t + "/userId",
                                  schemaPath: "#/oneOf/24/properties/userId/type",
                                  keyword: "type",
                                  params: {
                                    type: "number"
                                  },
                                  message: "must be number"
                                }
                              ], !1;
                            var ve = u === e;
                          } else
                            var ve = !0;
                      }
                    }
                  }
                }
              } else
                return n.errors = [
                  {
                    instancePath: t,
                    schemaPath: "#/oneOf/24/type",
                    keyword: "type",
                    params: { type: "object" },
                    message: "must be object"
                  }
                ], !1;
          } else if (G === "writeFile") {
            if (e === e)
              if (r && typeof r == "object" && !Array.isArray(r)) {
                let d;
                if (r.data === void 0 && (d = "data") || r.path === void 0 && (d = "path") || r.step === void 0 && (d = "step"))
                  return n.errors = [
                    {
                      instancePath: t,
                      schemaPath: "#/oneOf/25/required",
                      keyword: "required",
                      params: {
                        missingProperty: d
                      },
                      message: "must have required property '" + d + "'"
                    }
                  ], !1;
                {
                  const F = e;
                  for (const s in r)
                    if (!(s === "progress" || s === "step" || s === "path" || s === "data"))
                      return n.errors = [
                        {
                          instancePath: t,
                          schemaPath: "#/oneOf/25/additionalProperties",
                          keyword: "additionalProperties",
                          params: {
                            additionalProperty: s
                          },
                          message: "must NOT have additional properties"
                        }
                      ], !1;
                  if (F === e) {
                    if (r.progress !== void 0) {
                      let s = r.progress;
                      const u = e;
                      if (e === u)
                        if (s && typeof s == "object" && !Array.isArray(s)) {
                          const L = e;
                          for (const a in s)
                            if (!(a === "weight" || a === "caption"))
                              return n.errors = [
                                {
                                  instancePath: t + "/progress",
                                  schemaPath: "#/oneOf/25/properties/progress/additionalProperties",
                                  keyword: "additionalProperties",
                                  params: {
                                    additionalProperty: a
                                  },
                                  message: "must NOT have additional properties"
                                }
                              ], !1;
                          if (L === e) {
                            if (s.weight !== void 0) {
                              let a = s.weight;
                              const j = e;
                              if (!(typeof a == "number" && isFinite(
                                a
                              )))
                                return n.errors = [
                                  {
                                    instancePath: t + "/progress/weight",
                                    schemaPath: "#/oneOf/25/properties/progress/properties/weight/type",
                                    keyword: "type",
                                    params: {
                                      type: "number"
                                    },
                                    message: "must be number"
                                  }
                                ], !1;
                              var Ve = j === e;
                            } else
                              var Ve = !0;
                            if (Ve)
                              if (s.caption !== void 0) {
                                const a = e;
                                if (typeof s.caption != "string")
                                  return n.errors = [
                                    {
                                      instancePath: t + "/progress/caption",
                                      schemaPath: "#/oneOf/25/properties/progress/properties/caption/type",
                                      keyword: "type",
                                      params: {
                                        type: "string"
                                      },
                                      message: "must be string"
                                    }
                                  ], !1;
                                var Ve = a === e;
                              } else
                                var Ve = !0;
                          }
                        } else
                          return n.errors = [
                            {
                              instancePath: t + "/progress",
                              schemaPath: "#/oneOf/25/properties/progress/type",
                              keyword: "type",
                              params: {
                                type: "object"
                              },
                              message: "must be object"
                            }
                          ], !1;
                      var Pe = u === e;
                    } else
                      var Pe = !0;
                    if (Pe) {
                      if (r.step !== void 0) {
                        let s = r.step;
                        const u = e;
                        if (typeof s != "string")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/25/properties/step/type",
                              keyword: "type",
                              params: {
                                type: "string"
                              },
                              message: "must be string"
                            }
                          ], !1;
                        if (s !== "writeFile")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/25/properties/step/const",
                              keyword: "const",
                              params: {
                                allowedValue: "writeFile"
                              },
                              message: "must be equal to constant"
                            }
                          ], !1;
                        var Pe = u === e;
                      } else
                        var Pe = !0;
                      if (Pe) {
                        if (r.path !== void 0) {
                          const s = e;
                          if (typeof r.path != "string")
                            return n.errors = [
                              {
                                instancePath: t + "/path",
                                schemaPath: "#/oneOf/25/properties/path/type",
                                keyword: "type",
                                params: {
                                  type: "string"
                                },
                                message: "must be string"
                              }
                            ], !1;
                          var Pe = s === e;
                        } else
                          var Pe = !0;
                        if (Pe)
                          if (r.data !== void 0) {
                            let s = r.data;
                            const u = e, L = e;
                            let a = !1;
                            const j = e;
                            re(
                              s,
                              {
                                instancePath: t + "/data",
                                parentData: r,
                                parentDataProperty: "data",
                                rootData: l
                              }
                            ) || (i = i === null ? re.errors : i.concat(
                              re.errors
                            ), e = i.length);
                            var Ne = j === e;
                            if (a = a || Ne, !a) {
                              const ce = e;
                              if (typeof s != "string") {
                                const Oe = {
                                  instancePath: t + "/data",
                                  schemaPath: "#/oneOf/25/properties/data/anyOf/1/type",
                                  keyword: "type",
                                  params: {
                                    type: "string"
                                  },
                                  message: "must be string"
                                };
                                i === null ? i = [
                                  Oe
                                ] : i.push(
                                  Oe
                                ), e++;
                              }
                              var Ne = ce === e;
                              if (a = a || Ne, !a) {
                                const Oe = e;
                                if (e === Oe)
                                  if (s && typeof s == "object" && !Array.isArray(
                                    s
                                  )) {
                                    let he;
                                    if (s.BYTES_PER_ELEMENT === void 0 && (he = "BYTES_PER_ELEMENT") || s.buffer === void 0 && (he = "buffer") || s.byteLength === void 0 && (he = "byteLength") || s.byteOffset === void 0 && (he = "byteOffset") || s.length === void 0 && (he = "length")) {
                                      const Ze = {
                                        instancePath: t + "/data",
                                        schemaPath: "#/oneOf/25/properties/data/anyOf/2/required",
                                        keyword: "required",
                                        params: {
                                          missingProperty: he
                                        },
                                        message: "must have required property '" + he + "'"
                                      };
                                      i === null ? i = [
                                        Ze
                                      ] : i.push(
                                        Ze
                                      ), e++;
                                    } else {
                                      const Ze = e;
                                      for (const Z in s)
                                        if (!(Z === "BYTES_PER_ELEMENT" || Z === "buffer" || Z === "byteLength" || Z === "byteOffset" || Z === "length")) {
                                          let me = s[Z];
                                          const Qe = e;
                                          if (!(typeof me == "number" && isFinite(
                                            me
                                          ))) {
                                            const ne = {
                                              instancePath: t + "/data/" + Z.replace(
                                                /~/g,
                                                "~0"
                                              ).replace(
                                                /\//g,
                                                "~1"
                                              ),
                                              schemaPath: "#/oneOf/25/properties/data/anyOf/2/additionalProperties/type",
                                              keyword: "type",
                                              params: {
                                                type: "number"
                                              },
                                              message: "must be number"
                                            };
                                            i === null ? i = [
                                              ne
                                            ] : i.push(
                                              ne
                                            ), e++;
                                          }
                                          var Pt = Qe === e;
                                          if (!Pt)
                                            break;
                                        }
                                      if (Ze === e) {
                                        if (s.BYTES_PER_ELEMENT !== void 0) {
                                          let Z = s.BYTES_PER_ELEMENT;
                                          const me = e;
                                          if (!(typeof Z == "number" && isFinite(
                                            Z
                                          ))) {
                                            const Qe = {
                                              instancePath: t + "/data/BYTES_PER_ELEMENT",
                                              schemaPath: "#/oneOf/25/properties/data/anyOf/2/properties/BYTES_PER_ELEMENT/type",
                                              keyword: "type",
                                              params: {
                                                type: "number"
                                              },
                                              message: "must be number"
                                            };
                                            i === null ? i = [
                                              Qe
                                            ] : i.push(
                                              Qe
                                            ), e++;
                                          }
                                          var de = me === e;
                                        } else
                                          var de = !0;
                                        if (de) {
                                          if (s.buffer !== void 0) {
                                            let Z = s.buffer;
                                            const me = e;
                                            if (e === me)
                                              if (Z && typeof Z == "object" && !Array.isArray(
                                                Z
                                              )) {
                                                let ne;
                                                if (Z.byteLength === void 0 && (ne = "byteLength")) {
                                                  const Je = {
                                                    instancePath: t + "/data/buffer",
                                                    schemaPath: "#/oneOf/25/properties/data/anyOf/2/properties/buffer/required",
                                                    keyword: "required",
                                                    params: {
                                                      missingProperty: ne
                                                    },
                                                    message: "must have required property '" + ne + "'"
                                                  };
                                                  i === null ? i = [
                                                    Je
                                                  ] : i.push(
                                                    Je
                                                  ), e++;
                                                } else {
                                                  const Je = e;
                                                  for (const Fe in Z)
                                                    if (Fe !== "byteLength") {
                                                      const Ce = {
                                                        instancePath: t + "/data/buffer",
                                                        schemaPath: "#/oneOf/25/properties/data/anyOf/2/properties/buffer/additionalProperties",
                                                        keyword: "additionalProperties",
                                                        params: {
                                                          additionalProperty: Fe
                                                        },
                                                        message: "must NOT have additional properties"
                                                      };
                                                      i === null ? i = [
                                                        Ce
                                                      ] : i.push(
                                                        Ce
                                                      ), e++;
                                                      break;
                                                    }
                                                  if (Je === e && Z.byteLength !== void 0) {
                                                    let Fe = Z.byteLength;
                                                    if (!(typeof Fe == "number" && isFinite(
                                                      Fe
                                                    ))) {
                                                      const Ce = {
                                                        instancePath: t + "/data/buffer/byteLength",
                                                        schemaPath: "#/oneOf/25/properties/data/anyOf/2/properties/buffer/properties/byteLength/type",
                                                        keyword: "type",
                                                        params: {
                                                          type: "number"
                                                        },
                                                        message: "must be number"
                                                      };
                                                      i === null ? i = [
                                                        Ce
                                                      ] : i.push(
                                                        Ce
                                                      ), e++;
                                                    }
                                                  }
                                                }
                                              } else {
                                                const ne = {
                                                  instancePath: t + "/data/buffer",
                                                  schemaPath: "#/oneOf/25/properties/data/anyOf/2/properties/buffer/type",
                                                  keyword: "type",
                                                  params: {
                                                    type: "object"
                                                  },
                                                  message: "must be object"
                                                };
                                                i === null ? i = [
                                                  ne
                                                ] : i.push(
                                                  ne
                                                ), e++;
                                              }
                                            var de = me === e;
                                          } else
                                            var de = !0;
                                          if (de) {
                                            if (s.byteLength !== void 0) {
                                              let Z = s.byteLength;
                                              const me = e;
                                              if (!(typeof Z == "number" && isFinite(
                                                Z
                                              ))) {
                                                const ne = {
                                                  instancePath: t + "/data/byteLength",
                                                  schemaPath: "#/oneOf/25/properties/data/anyOf/2/properties/byteLength/type",
                                                  keyword: "type",
                                                  params: {
                                                    type: "number"
                                                  },
                                                  message: "must be number"
                                                };
                                                i === null ? i = [
                                                  ne
                                                ] : i.push(
                                                  ne
                                                ), e++;
                                              }
                                              var de = me === e;
                                            } else
                                              var de = !0;
                                            if (de) {
                                              if (s.byteOffset !== void 0) {
                                                let Z = s.byteOffset;
                                                const me = e;
                                                if (!(typeof Z == "number" && isFinite(
                                                  Z
                                                ))) {
                                                  const ne = {
                                                    instancePath: t + "/data/byteOffset",
                                                    schemaPath: "#/oneOf/25/properties/data/anyOf/2/properties/byteOffset/type",
                                                    keyword: "type",
                                                    params: {
                                                      type: "number"
                                                    },
                                                    message: "must be number"
                                                  };
                                                  i === null ? i = [
                                                    ne
                                                  ] : i.push(
                                                    ne
                                                  ), e++;
                                                }
                                                var de = me === e;
                                              } else
                                                var de = !0;
                                              if (de)
                                                if (s.length !== void 0) {
                                                  let Z = s.length;
                                                  const me = e;
                                                  if (!(typeof Z == "number" && isFinite(
                                                    Z
                                                  ))) {
                                                    const ne = {
                                                      instancePath: t + "/data/length",
                                                      schemaPath: "#/oneOf/25/properties/data/anyOf/2/properties/length/type",
                                                      keyword: "type",
                                                      params: {
                                                        type: "number"
                                                      },
                                                      message: "must be number"
                                                    };
                                                    i === null ? i = [
                                                      ne
                                                    ] : i.push(
                                                      ne
                                                    ), e++;
                                                  }
                                                  var de = me === e;
                                                } else
                                                  var de = !0;
                                            }
                                          }
                                        }
                                      }
                                    }
                                  } else {
                                    const he = {
                                      instancePath: t + "/data",
                                      schemaPath: "#/oneOf/25/properties/data/anyOf/2/type",
                                      keyword: "type",
                                      params: {
                                        type: "object"
                                      },
                                      message: "must be object"
                                    };
                                    i === null ? i = [
                                      he
                                    ] : i.push(
                                      he
                                    ), e++;
                                  }
                                var Ne = Oe === e;
                                a = a || Ne;
                              }
                            }
                            if (a)
                              e = L, i !== null && (L ? i.length = L : i = null);
                            else {
                              const ce = {
                                instancePath: t + "/data",
                                schemaPath: "#/oneOf/25/properties/data/anyOf",
                                keyword: "anyOf",
                                params: {},
                                message: "must match a schema in anyOf"
                              };
                              return i === null ? i = [
                                ce
                              ] : i.push(
                                ce
                              ), e++, n.errors = i, !1;
                            }
                            var Pe = u === e;
                          } else
                            var Pe = !0;
                      }
                    }
                  }
                }
              } else
                return n.errors = [
                  {
                    instancePath: t,
                    schemaPath: "#/oneOf/25/type",
                    keyword: "type",
                    params: { type: "object" },
                    message: "must be object"
                  }
                ], !1;
          } else if (G === "wp-cli") {
            if (e === e)
              if (r && typeof r == "object" && !Array.isArray(r)) {
                let d;
                if (r.command === void 0 && (d = "command") || r.step === void 0 && (d = "step"))
                  return n.errors = [
                    {
                      instancePath: t,
                      schemaPath: "#/oneOf/26/required",
                      keyword: "required",
                      params: {
                        missingProperty: d
                      },
                      message: "must have required property '" + d + "'"
                    }
                  ], !1;
                {
                  const F = e;
                  for (const s in r)
                    if (!(s === "progress" || s === "step" || s === "command" || s === "wpCliPath"))
                      return n.errors = [
                        {
                          instancePath: t,
                          schemaPath: "#/oneOf/26/additionalProperties",
                          keyword: "additionalProperties",
                          params: {
                            additionalProperty: s
                          },
                          message: "must NOT have additional properties"
                        }
                      ], !1;
                  if (F === e) {
                    if (r.progress !== void 0) {
                      let s = r.progress;
                      const u = e;
                      if (e === u)
                        if (s && typeof s == "object" && !Array.isArray(s)) {
                          const L = e;
                          for (const a in s)
                            if (!(a === "weight" || a === "caption"))
                              return n.errors = [
                                {
                                  instancePath: t + "/progress",
                                  schemaPath: "#/oneOf/26/properties/progress/additionalProperties",
                                  keyword: "additionalProperties",
                                  params: {
                                    additionalProperty: a
                                  },
                                  message: "must NOT have additional properties"
                                }
                              ], !1;
                          if (L === e) {
                            if (s.weight !== void 0) {
                              let a = s.weight;
                              const j = e;
                              if (!(typeof a == "number" && isFinite(
                                a
                              )))
                                return n.errors = [
                                  {
                                    instancePath: t + "/progress/weight",
                                    schemaPath: "#/oneOf/26/properties/progress/properties/weight/type",
                                    keyword: "type",
                                    params: {
                                      type: "number"
                                    },
                                    message: "must be number"
                                  }
                                ], !1;
                              var He = j === e;
                            } else
                              var He = !0;
                            if (He)
                              if (s.caption !== void 0) {
                                const a = e;
                                if (typeof s.caption != "string")
                                  return n.errors = [
                                    {
                                      instancePath: t + "/progress/caption",
                                      schemaPath: "#/oneOf/26/properties/progress/properties/caption/type",
                                      keyword: "type",
                                      params: {
                                        type: "string"
                                      },
                                      message: "must be string"
                                    }
                                  ], !1;
                                var He = a === e;
                              } else
                                var He = !0;
                          }
                        } else
                          return n.errors = [
                            {
                              instancePath: t + "/progress",
                              schemaPath: "#/oneOf/26/properties/progress/type",
                              keyword: "type",
                              params: {
                                type: "object"
                              },
                              message: "must be object"
                            }
                          ], !1;
                      var _e = u === e;
                    } else
                      var _e = !0;
                    if (_e) {
                      if (r.step !== void 0) {
                        let s = r.step;
                        const u = e;
                        if (typeof s != "string")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/26/properties/step/type",
                              keyword: "type",
                              params: {
                                type: "string"
                              },
                              message: "must be string"
                            }
                          ], !1;
                        if (s !== "wp-cli")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/26/properties/step/const",
                              keyword: "const",
                              params: {
                                allowedValue: "wp-cli"
                              },
                              message: "must be equal to constant"
                            }
                          ], !1;
                        var _e = u === e;
                      } else
                        var _e = !0;
                      if (_e) {
                        if (r.command !== void 0) {
                          let s = r.command;
                          const u = e, L = e;
                          let a = !1;
                          const j = e;
                          if (typeof s != "string") {
                            const ce = {
                              instancePath: t + "/command",
                              schemaPath: "#/oneOf/26/properties/command/anyOf/0/type",
                              keyword: "type",
                              params: {
                                type: "string"
                              },
                              message: "must be string"
                            };
                            i === null ? i = [ce] : i.push(ce), e++;
                          }
                          var dr = j === e;
                          if (a = a || dr, !a) {
                            const ce = e;
                            if (e === ce)
                              if (Array.isArray(
                                s
                              )) {
                                var Lr = !0;
                                const Oe = s.length;
                                for (let Ye = 0; Ye < Oe; Ye++) {
                                  const he = e;
                                  if (typeof s[Ye] != "string") {
                                    const Z = {
                                      instancePath: t + "/command/" + Ye,
                                      schemaPath: "#/oneOf/26/properties/command/anyOf/1/items/type",
                                      keyword: "type",
                                      params: {
                                        type: "string"
                                      },
                                      message: "must be string"
                                    };
                                    i === null ? i = [
                                      Z
                                    ] : i.push(
                                      Z
                                    ), e++;
                                  }
                                  var Lr = he === e;
                                  if (!Lr)
                                    break;
                                }
                              } else {
                                const Oe = {
                                  instancePath: t + "/command",
                                  schemaPath: "#/oneOf/26/properties/command/anyOf/1/type",
                                  keyword: "type",
                                  params: {
                                    type: "array"
                                  },
                                  message: "must be array"
                                };
                                i === null ? i = [
                                  Oe
                                ] : i.push(
                                  Oe
                                ), e++;
                              }
                            var dr = ce === e;
                            a = a || dr;
                          }
                          if (a)
                            e = L, i !== null && (L ? i.length = L : i = null);
                          else {
                            const ce = {
                              instancePath: t + "/command",
                              schemaPath: "#/oneOf/26/properties/command/anyOf",
                              keyword: "anyOf",
                              params: {},
                              message: "must match a schema in anyOf"
                            };
                            return i === null ? i = [ce] : i.push(ce), e++, n.errors = i, !1;
                          }
                          var _e = u === e;
                        } else
                          var _e = !0;
                        if (_e)
                          if (r.wpCliPath !== void 0) {
                            const s = e;
                            if (typeof r.wpCliPath != "string")
                              return n.errors = [
                                {
                                  instancePath: t + "/wpCliPath",
                                  schemaPath: "#/oneOf/26/properties/wpCliPath/type",
                                  keyword: "type",
                                  params: {
                                    type: "string"
                                  },
                                  message: "must be string"
                                }
                              ], !1;
                            var _e = s === e;
                          } else
                            var _e = !0;
                      }
                    }
                  }
                }
              } else
                return n.errors = [
                  {
                    instancePath: t,
                    schemaPath: "#/oneOf/26/type",
                    keyword: "type",
                    params: { type: "object" },
                    message: "must be object"
                  }
                ], !1;
          } else if (G === "setSiteLanguage") {
            if (e === e)
              if (r && typeof r == "object" && !Array.isArray(r)) {
                let d;
                if (r.language === void 0 && (d = "language") || r.step === void 0 && (d = "step"))
                  return n.errors = [
                    {
                      instancePath: t,
                      schemaPath: "#/oneOf/27/required",
                      keyword: "required",
                      params: {
                        missingProperty: d
                      },
                      message: "must have required property '" + d + "'"
                    }
                  ], !1;
                {
                  const F = e;
                  for (const s in r)
                    if (!(s === "progress" || s === "step" || s === "language"))
                      return n.errors = [
                        {
                          instancePath: t,
                          schemaPath: "#/oneOf/27/additionalProperties",
                          keyword: "additionalProperties",
                          params: {
                            additionalProperty: s
                          },
                          message: "must NOT have additional properties"
                        }
                      ], !1;
                  if (F === e) {
                    if (r.progress !== void 0) {
                      let s = r.progress;
                      const u = e;
                      if (e === u)
                        if (s && typeof s == "object" && !Array.isArray(s)) {
                          const L = e;
                          for (const a in s)
                            if (!(a === "weight" || a === "caption"))
                              return n.errors = [
                                {
                                  instancePath: t + "/progress",
                                  schemaPath: "#/oneOf/27/properties/progress/additionalProperties",
                                  keyword: "additionalProperties",
                                  params: {
                                    additionalProperty: a
                                  },
                                  message: "must NOT have additional properties"
                                }
                              ], !1;
                          if (L === e) {
                            if (s.weight !== void 0) {
                              let a = s.weight;
                              const j = e;
                              if (!(typeof a == "number" && isFinite(
                                a
                              )))
                                return n.errors = [
                                  {
                                    instancePath: t + "/progress/weight",
                                    schemaPath: "#/oneOf/27/properties/progress/properties/weight/type",
                                    keyword: "type",
                                    params: {
                                      type: "number"
                                    },
                                    message: "must be number"
                                  }
                                ], !1;
                              var Ge = j === e;
                            } else
                              var Ge = !0;
                            if (Ge)
                              if (s.caption !== void 0) {
                                const a = e;
                                if (typeof s.caption != "string")
                                  return n.errors = [
                                    {
                                      instancePath: t + "/progress/caption",
                                      schemaPath: "#/oneOf/27/properties/progress/properties/caption/type",
                                      keyword: "type",
                                      params: {
                                        type: "string"
                                      },
                                      message: "must be string"
                                    }
                                  ], !1;
                                var Ge = a === e;
                              } else
                                var Ge = !0;
                          }
                        } else
                          return n.errors = [
                            {
                              instancePath: t + "/progress",
                              schemaPath: "#/oneOf/27/properties/progress/type",
                              keyword: "type",
                              params: {
                                type: "object"
                              },
                              message: "must be object"
                            }
                          ], !1;
                      var qe = u === e;
                    } else
                      var qe = !0;
                    if (qe) {
                      if (r.step !== void 0) {
                        let s = r.step;
                        const u = e;
                        if (typeof s != "string")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/27/properties/step/type",
                              keyword: "type",
                              params: {
                                type: "string"
                              },
                              message: "must be string"
                            }
                          ], !1;
                        if (s !== "setSiteLanguage")
                          return n.errors = [
                            {
                              instancePath: t + "/step",
                              schemaPath: "#/oneOf/27/properties/step/const",
                              keyword: "const",
                              params: {
                                allowedValue: "setSiteLanguage"
                              },
                              message: "must be equal to constant"
                            }
                          ], !1;
                        var qe = u === e;
                      } else
                        var qe = !0;
                      if (qe)
                        if (r.language !== void 0) {
                          const s = e;
                          if (typeof r.language != "string")
                            return n.errors = [
                              {
                                instancePath: t + "/language",
                                schemaPath: "#/oneOf/27/properties/language/type",
                                keyword: "type",
                                params: {
                                  type: "string"
                                },
                                message: "must be string"
                              }
                            ], !1;
                          var qe = s === e;
                        } else
                          var qe = !0;
                    }
                  }
                }
              } else
                return n.errors = [
                  {
                    instancePath: t,
                    schemaPath: "#/oneOf/27/type",
                    keyword: "type",
                    params: { type: "object" },
                    message: "must be object"
                  }
                ], !1;
          } else
            return n.errors = [
              {
                instancePath: t,
                schemaPath: "#/discriminator",
                keyword: "discriminator",
                params: {
                  error: "mapping",
                  tag: "step",
                  tagValue: G
                },
                message: 'value of tag "step" must be in oneOf'
              }
            ], !1;
        else
          return n.errors = [
            {
              instancePath: t,
              schemaPath: "#/discriminator",
              keyword: "discriminator",
              params: {
                error: "tag",
                tag: "step",
                tagValue: G
              },
              message: 'tag "step" must be string'
            }
          ], !1;
      }
    } else
      return n.errors = [
        {
          instancePath: t,
          schemaPath: "#/type",
          keyword: "type",
          params: { type: "object" },
          message: "must be object"
        }
      ], !1;
  return n.errors = i, e === 0;
}
function B(r, { instancePath: t = "", parentData: o, parentDataProperty: p, rootData: l = r } = {}) {
  let i = null, e = 0;
  if (e === 0)
    if (r && typeof r == "object" && !Array.isArray(r)) {
      const z = e;
      for (const c in r)
        if (!dt.call(js.properties, c))
          return B.errors = [
            {
              instancePath: t,
              schemaPath: "#/additionalProperties",
              keyword: "additionalProperties",
              params: { additionalProperty: c },
              message: "must NOT have additional properties"
            }
          ], !1;
      if (z === e) {
        if (r.landingPage !== void 0) {
          const c = e;
          if (typeof r.landingPage != "string")
            return B.errors = [
              {
                instancePath: t + "/landingPage",
                schemaPath: "#/properties/landingPage/type",
                keyword: "type",
                params: { type: "string" },
                message: "must be string"
              }
            ], !1;
          var f = c === e;
        } else
          var f = !0;
        if (f) {
          if (r.description !== void 0) {
            const c = e;
            if (typeof r.description != "string")
              return B.errors = [
                {
                  instancePath: t + "/description",
                  schemaPath: "#/properties/description/type",
                  keyword: "type",
                  params: { type: "string" },
                  message: "must be string"
                }
              ], !1;
            var f = c === e;
          } else
            var f = !0;
          if (f) {
            if (r.meta !== void 0) {
              let c = r.meta;
              const A = e;
              if (e === A)
                if (c && typeof c == "object" && !Array.isArray(c)) {
                  let T;
                  if (c.title === void 0 && (T = "title") || c.author === void 0 && (T = "author"))
                    return B.errors = [
                      {
                        instancePath: t + "/meta",
                        schemaPath: "#/properties/meta/required",
                        keyword: "required",
                        params: {
                          missingProperty: T
                        },
                        message: "must have required property '" + T + "'"
                      }
                    ], !1;
                  {
                    const _ = e;
                    for (const y in c)
                      if (!(y === "title" || y === "description" || y === "author" || y === "categories"))
                        return B.errors = [
                          {
                            instancePath: t + "/meta",
                            schemaPath: "#/properties/meta/additionalProperties",
                            keyword: "additionalProperties",
                            params: {
                              additionalProperty: y
                            },
                            message: "must NOT have additional properties"
                          }
                        ], !1;
                    if (_ === e) {
                      if (c.title !== void 0) {
                        const y = e;
                        if (typeof c.title != "string")
                          return B.errors = [
                            {
                              instancePath: t + "/meta/title",
                              schemaPath: "#/properties/meta/properties/title/type",
                              keyword: "type",
                              params: {
                                type: "string"
                              },
                              message: "must be string"
                            }
                          ], !1;
                        var h = y === e;
                      } else
                        var h = !0;
                      if (h) {
                        if (c.description !== void 0) {
                          const y = e;
                          if (typeof c.description != "string")
                            return B.errors = [
                              {
                                instancePath: t + "/meta/description",
                                schemaPath: "#/properties/meta/properties/description/type",
                                keyword: "type",
                                params: {
                                  type: "string"
                                },
                                message: "must be string"
                              }
                            ], !1;
                          var h = y === e;
                        } else
                          var h = !0;
                        if (h) {
                          if (c.author !== void 0) {
                            const y = e;
                            if (typeof c.author != "string")
                              return B.errors = [
                                {
                                  instancePath: t + "/meta/author",
                                  schemaPath: "#/properties/meta/properties/author/type",
                                  keyword: "type",
                                  params: {
                                    type: "string"
                                  },
                                  message: "must be string"
                                }
                              ], !1;
                            var h = y === e;
                          } else
                            var h = !0;
                          if (h)
                            if (c.categories !== void 0) {
                              let y = c.categories;
                              const g = e;
                              if (e === g)
                                if (Array.isArray(
                                  y
                                )) {
                                  var b = !0;
                                  const O = y.length;
                                  for (let N = 0; N < O; N++) {
                                    const q = e;
                                    if (typeof y[N] != "string")
                                      return B.errors = [
                                        {
                                          instancePath: t + "/meta/categories/" + N,
                                          schemaPath: "#/properties/meta/properties/categories/items/type",
                                          keyword: "type",
                                          params: {
                                            type: "string"
                                          },
                                          message: "must be string"
                                        }
                                      ], !1;
                                    var b = q === e;
                                    if (!b)
                                      break;
                                  }
                                } else
                                  return B.errors = [
                                    {
                                      instancePath: t + "/meta/categories",
                                      schemaPath: "#/properties/meta/properties/categories/type",
                                      keyword: "type",
                                      params: {
                                        type: "array"
                                      },
                                      message: "must be array"
                                    }
                                  ], !1;
                              var h = g === e;
                            } else
                              var h = !0;
                        }
                      }
                    }
                  }
                } else
                  return B.errors = [
                    {
                      instancePath: t + "/meta",
                      schemaPath: "#/properties/meta/type",
                      keyword: "type",
                      params: { type: "object" },
                      message: "must be object"
                    }
                  ], !1;
              var f = A === e;
            } else
              var f = !0;
            if (f) {
              if (r.preferredVersions !== void 0) {
                let c = r.preferredVersions;
                const A = e;
                if (e === A)
                  if (c && typeof c == "object" && !Array.isArray(c)) {
                    let T;
                    if (c.php === void 0 && (T = "php") || c.wp === void 0 && (T = "wp"))
                      return B.errors = [
                        {
                          instancePath: t + "/preferredVersions",
                          schemaPath: "#/properties/preferredVersions/required",
                          keyword: "required",
                          params: {
                            missingProperty: T
                          },
                          message: "must have required property '" + T + "'"
                        }
                      ], !1;
                    {
                      const _ = e;
                      for (const y in c)
                        if (!(y === "php" || y === "wp"))
                          return B.errors = [
                            {
                              instancePath: t + "/preferredVersions",
                              schemaPath: "#/properties/preferredVersions/additionalProperties",
                              keyword: "additionalProperties",
                              params: {
                                additionalProperty: y
                              },
                              message: "must NOT have additional properties"
                            }
                          ], !1;
                      if (_ === e) {
                        if (c.php !== void 0) {
                          let y = c.php;
                          const g = e, v = e;
                          let O = !1;
                          const N = e;
                          if (typeof y != "string") {
                            const q = {
                              instancePath: t + "/preferredVersions/php",
                              schemaPath: "#/definitions/SupportedPHPVersion/type",
                              keyword: "type",
                              params: {
                                type: "string"
                              },
                              message: "must be string"
                            };
                            i === null ? i = [q] : i.push(q), e++;
                          }
                          if (!(y === "8.3" || y === "8.2" || y === "8.1" || y === "8.0" || y === "7.4" || y === "7.3" || y === "7.2" || y === "7.1" || y === "7.0")) {
                            const q = {
                              instancePath: t + "/preferredVersions/php",
                              schemaPath: "#/definitions/SupportedPHPVersion/enum",
                              keyword: "enum",
                              params: {
                                allowedValues: As.enum
                              },
                              message: "must be equal to one of the allowed values"
                            };
                            i === null ? i = [q] : i.push(q), e++;
                          }
                          var k = N === e;
                          if (O = O || k, !O) {
                            const q = e;
                            if (typeof y != "string") {
                              const R = {
                                instancePath: t + "/preferredVersions/php",
                                schemaPath: "#/properties/preferredVersions/properties/php/anyOf/1/type",
                                keyword: "type",
                                params: {
                                  type: "string"
                                },
                                message: "must be string"
                              };
                              i === null ? i = [
                                R
                              ] : i.push(
                                R
                              ), e++;
                            }
                            if (y !== "latest") {
                              const R = {
                                instancePath: t + "/preferredVersions/php",
                                schemaPath: "#/properties/preferredVersions/properties/php/anyOf/1/const",
                                keyword: "const",
                                params: {
                                  allowedValue: "latest"
                                },
                                message: "must be equal to constant"
                              };
                              i === null ? i = [
                                R
                              ] : i.push(
                                R
                              ), e++;
                            }
                            var k = q === e;
                            O = O || k;
                          }
                          if (O)
                            e = v, i !== null && (v ? i.length = v : i = null);
                          else {
                            const q = {
                              instancePath: t + "/preferredVersions/php",
                              schemaPath: "#/properties/preferredVersions/properties/php/anyOf",
                              keyword: "anyOf",
                              params: {},
                              message: "must match a schema in anyOf"
                            };
                            return i === null ? i = [q] : i.push(q), e++, B.errors = i, !1;
                          }
                          var m = g === e;
                        } else
                          var m = !0;
                        if (m)
                          if (c.wp !== void 0) {
                            const y = e;
                            if (typeof c.wp != "string")
                              return B.errors = [
                                {
                                  instancePath: t + "/preferredVersions/wp",
                                  schemaPath: "#/properties/preferredVersions/properties/wp/type",
                                  keyword: "type",
                                  params: {
                                    type: "string"
                                  },
                                  message: "must be string"
                                }
                              ], !1;
                            var m = y === e;
                          } else
                            var m = !0;
                      }
                    }
                  } else
                    return B.errors = [
                      {
                        instancePath: t + "/preferredVersions",
                        schemaPath: "#/properties/preferredVersions/type",
                        keyword: "type",
                        params: { type: "object" },
                        message: "must be object"
                      }
                    ], !1;
                var f = A === e;
              } else
                var f = !0;
              if (f) {
                if (r.features !== void 0) {
                  let c = r.features;
                  const A = e;
                  if (e === A)
                    if (c && typeof c == "object" && !Array.isArray(c)) {
                      const T = e;
                      for (const _ in c)
                        if (_ !== "networking")
                          return B.errors = [
                            {
                              instancePath: t + "/features",
                              schemaPath: "#/properties/features/additionalProperties",
                              keyword: "additionalProperties",
                              params: {
                                additionalProperty: _
                              },
                              message: "must NOT have additional properties"
                            }
                          ], !1;
                      if (T === e && c.networking !== void 0 && typeof c.networking != "boolean")
                        return B.errors = [
                          {
                            instancePath: t + "/features/networking",
                            schemaPath: "#/properties/features/properties/networking/type",
                            keyword: "type",
                            params: {
                              type: "boolean"
                            },
                            message: "must be boolean"
                          }
                        ], !1;
                    } else
                      return B.errors = [
                        {
                          instancePath: t + "/features",
                          schemaPath: "#/properties/features/type",
                          keyword: "type",
                          params: { type: "object" },
                          message: "must be object"
                        }
                      ], !1;
                  var f = A === e;
                } else
                  var f = !0;
                if (f) {
                  if (r.extraLibraries !== void 0) {
                    let c = r.extraLibraries;
                    const A = e;
                    if (e === A)
                      if (Array.isArray(c)) {
                        var w = !0;
                        const T = c.length;
                        for (let _ = 0; _ < T; _++) {
                          let y = c[_];
                          const g = e;
                          if (typeof y != "string")
                            return B.errors = [
                              {
                                instancePath: t + "/extraLibraries/" + _,
                                schemaPath: "#/definitions/ExtraLibrary/type",
                                keyword: "type",
                                params: {
                                  type: "string"
                                },
                                message: "must be string"
                              }
                            ], !1;
                          if (y !== "wp-cli")
                            return B.errors = [
                              {
                                instancePath: t + "/extraLibraries/" + _,
                                schemaPath: "#/definitions/ExtraLibrary/const",
                                keyword: "const",
                                params: {
                                  allowedValue: "wp-cli"
                                },
                                message: "must be equal to constant"
                              }
                            ], !1;
                          var w = g === e;
                          if (!w)
                            break;
                        }
                      } else
                        return B.errors = [
                          {
                            instancePath: t + "/extraLibraries",
                            schemaPath: "#/properties/extraLibraries/type",
                            keyword: "type",
                            params: {
                              type: "array"
                            },
                            message: "must be array"
                          }
                        ], !1;
                    var f = A === e;
                  } else
                    var f = !0;
                  if (f) {
                    if (r.constants !== void 0) {
                      let c = r.constants;
                      const A = e;
                      if (e === A)
                        if (c && typeof c == "object" && !Array.isArray(c))
                          for (const T in c) {
                            const _ = e;
                            if (typeof c[T] != "string")
                              return B.errors = [
                                {
                                  instancePath: t + "/constants/" + T.replace(
                                    /~/g,
                                    "~0"
                                  ).replace(
                                    /\//g,
                                    "~1"
                                  ),
                                  schemaPath: "#/properties/constants/additionalProperties/type",
                                  keyword: "type",
                                  params: {
                                    type: "string"
                                  },
                                  message: "must be string"
                                }
                              ], !1;
                            var S = _ === e;
                            if (!S)
                              break;
                          }
                        else
                          return B.errors = [
                            {
                              instancePath: t + "/constants",
                              schemaPath: "#/properties/constants/type",
                              keyword: "type",
                              params: {
                                type: "object"
                              },
                              message: "must be object"
                            }
                          ], !1;
                      var f = A === e;
                    } else
                      var f = !0;
                    if (f) {
                      if (r.plugins !== void 0) {
                        let c = r.plugins;
                        const A = e;
                        if (e === A)
                          if (Array.isArray(c)) {
                            var D = !0;
                            const T = c.length;
                            for (let _ = 0; _ < T; _++) {
                              let y = c[_];
                              const g = e, v = e;
                              let O = !1;
                              const N = e;
                              if (typeof y != "string") {
                                const W = {
                                  instancePath: t + "/plugins/" + _,
                                  schemaPath: "#/properties/plugins/items/anyOf/0/type",
                                  keyword: "type",
                                  params: {
                                    type: "string"
                                  },
                                  message: "must be string"
                                };
                                i === null ? i = [
                                  W
                                ] : i.push(
                                  W
                                ), e++;
                              }
                              var P = N === e;
                              if (O = O || P, !O) {
                                const W = e;
                                re(
                                  y,
                                  {
                                    instancePath: t + "/plugins/" + _,
                                    parentData: c,
                                    parentDataProperty: _,
                                    rootData: l
                                  }
                                ) || (i = i === null ? re.errors : i.concat(
                                  re.errors
                                ), e = i.length);
                                var P = W === e;
                                O = O || P;
                              }
                              if (O)
                                e = v, i !== null && (v ? i.length = v : i = null);
                              else {
                                const W = {
                                  instancePath: t + "/plugins/" + _,
                                  schemaPath: "#/properties/plugins/items/anyOf",
                                  keyword: "anyOf",
                                  params: {},
                                  message: "must match a schema in anyOf"
                                };
                                return i === null ? i = [
                                  W
                                ] : i.push(
                                  W
                                ), e++, B.errors = i, !1;
                              }
                              var D = g === e;
                              if (!D)
                                break;
                            }
                          } else
                            return B.errors = [
                              {
                                instancePath: t + "/plugins",
                                schemaPath: "#/properties/plugins/type",
                                keyword: "type",
                                params: {
                                  type: "array"
                                },
                                message: "must be array"
                              }
                            ], !1;
                        var f = A === e;
                      } else
                        var f = !0;
                      if (f) {
                        if (r.siteOptions !== void 0) {
                          let c = r.siteOptions;
                          const A = e;
                          if (e === A)
                            if (c && typeof c == "object" && !Array.isArray(
                              c
                            )) {
                              const T = e;
                              for (const _ in c)
                                if (_ !== "blogname") {
                                  const y = e;
                                  if (typeof c[_] != "string")
                                    return B.errors = [
                                      {
                                        instancePath: t + "/siteOptions/" + _.replace(
                                          /~/g,
                                          "~0"
                                        ).replace(
                                          /\//g,
                                          "~1"
                                        ),
                                        schemaPath: "#/properties/siteOptions/additionalProperties/type",
                                        keyword: "type",
                                        params: {
                                          type: "string"
                                        },
                                        message: "must be string"
                                      }
                                    ], !1;
                                  var U = y === e;
                                  if (!U)
                                    break;
                                }
                              if (T === e && c.blogname !== void 0 && typeof c.blogname != "string")
                                return B.errors = [
                                  {
                                    instancePath: t + "/siteOptions/blogname",
                                    schemaPath: "#/properties/siteOptions/properties/blogname/type",
                                    keyword: "type",
                                    params: {
                                      type: "string"
                                    },
                                    message: "must be string"
                                  }
                                ], !1;
                            } else
                              return B.errors = [
                                {
                                  instancePath: t + "/siteOptions",
                                  schemaPath: "#/properties/siteOptions/type",
                                  keyword: "type",
                                  params: {
                                    type: "object"
                                  },
                                  message: "must be object"
                                }
                              ], !1;
                          var f = A === e;
                        } else
                          var f = !0;
                        if (f) {
                          if (r.login !== void 0) {
                            let c = r.login;
                            const A = e, $ = e;
                            let T = !1;
                            const _ = e;
                            if (typeof c != "boolean") {
                              const g = {
                                instancePath: t + "/login",
                                schemaPath: "#/properties/login/anyOf/0/type",
                                keyword: "type",
                                params: {
                                  type: "boolean"
                                },
                                message: "must be boolean"
                              };
                              i === null ? i = [
                                g
                              ] : i.push(
                                g
                              ), e++;
                            }
                            var te = _ === e;
                            if (T = T || te, !T) {
                              const g = e;
                              if (e === g)
                                if (c && typeof c == "object" && !Array.isArray(
                                  c
                                )) {
                                  let O;
                                  if (c.username === void 0 && (O = "username") || c.password === void 0 && (O = "password")) {
                                    const N = {
                                      instancePath: t + "/login",
                                      schemaPath: "#/properties/login/anyOf/1/required",
                                      keyword: "required",
                                      params: {
                                        missingProperty: O
                                      },
                                      message: "must have required property '" + O + "'"
                                    };
                                    i === null ? i = [
                                      N
                                    ] : i.push(
                                      N
                                    ), e++;
                                  } else {
                                    const N = e;
                                    for (const q in c)
                                      if (!(q === "username" || q === "password")) {
                                        const W = {
                                          instancePath: t + "/login",
                                          schemaPath: "#/properties/login/anyOf/1/additionalProperties",
                                          keyword: "additionalProperties",
                                          params: {
                                            additionalProperty: q
                                          },
                                          message: "must NOT have additional properties"
                                        };
                                        i === null ? i = [
                                          W
                                        ] : i.push(
                                          W
                                        ), e++;
                                        break;
                                      }
                                    if (N === e) {
                                      if (c.username !== void 0) {
                                        const q = e;
                                        if (typeof c.username != "string") {
                                          const W = {
                                            instancePath: t + "/login/username",
                                            schemaPath: "#/properties/login/anyOf/1/properties/username/type",
                                            keyword: "type",
                                            params: {
                                              type: "string"
                                            },
                                            message: "must be string"
                                          };
                                          i === null ? i = [
                                            W
                                          ] : i.push(
                                            W
                                          ), e++;
                                        }
                                        var H = q === e;
                                      } else
                                        var H = !0;
                                      if (H)
                                        if (c.password !== void 0) {
                                          const q = e;
                                          if (typeof c.password != "string") {
                                            const R = {
                                              instancePath: t + "/login/password",
                                              schemaPath: "#/properties/login/anyOf/1/properties/password/type",
                                              keyword: "type",
                                              params: {
                                                type: "string"
                                              },
                                              message: "must be string"
                                            };
                                            i === null ? i = [
                                              R
                                            ] : i.push(
                                              R
                                            ), e++;
                                          }
                                          var H = q === e;
                                        } else
                                          var H = !0;
                                    }
                                  }
                                } else {
                                  const O = {
                                    instancePath: t + "/login",
                                    schemaPath: "#/properties/login/anyOf/1/type",
                                    keyword: "type",
                                    params: {
                                      type: "object"
                                    },
                                    message: "must be object"
                                  };
                                  i === null ? i = [
                                    O
                                  ] : i.push(
                                    O
                                  ), e++;
                                }
                              var te = g === e;
                              T = T || te;
                            }
                            if (T)
                              e = $, i !== null && ($ ? i.length = $ : i = null);
                            else {
                              const g = {
                                instancePath: t + "/login",
                                schemaPath: "#/properties/login/anyOf",
                                keyword: "anyOf",
                                params: {},
                                message: "must match a schema in anyOf"
                              };
                              return i === null ? i = [
                                g
                              ] : i.push(
                                g
                              ), e++, B.errors = i, !1;
                            }
                            var f = A === e;
                          } else
                            var f = !0;
                          if (f) {
                            if (r.phpExtensionBundles !== void 0) {
                              let c = r.phpExtensionBundles;
                              const A = e;
                              if (e === A)
                                if (Array.isArray(
                                  c
                                )) {
                                  var E = !0;
                                  const T = c.length;
                                  for (let _ = 0; _ < T; _++) {
                                    let y = c[_];
                                    const g = e;
                                    if (typeof y != "string")
                                      return B.errors = [
                                        {
                                          instancePath: t + "/phpExtensionBundles/" + _,
                                          schemaPath: "#/definitions/SupportedPHPExtensionBundle/type",
                                          keyword: "type",
                                          params: {
                                            type: "string"
                                          },
                                          message: "must be string"
                                        }
                                      ], !1;
                                    if (!(y === "kitchen-sink" || y === "light"))
                                      return B.errors = [
                                        {
                                          instancePath: t + "/phpExtensionBundles/" + _,
                                          schemaPath: "#/definitions/SupportedPHPExtensionBundle/enum",
                                          keyword: "enum",
                                          params: {
                                            allowedValues: qs.enum
                                          },
                                          message: "must be equal to one of the allowed values"
                                        }
                                      ], !1;
                                    var E = g === e;
                                    if (!E)
                                      break;
                                  }
                                } else
                                  return B.errors = [
                                    {
                                      instancePath: t + "/phpExtensionBundles",
                                      schemaPath: "#/properties/phpExtensionBundles/type",
                                      keyword: "type",
                                      params: {
                                        type: "array"
                                      },
                                      message: "must be array"
                                    }
                                  ], !1;
                              var f = A === e;
                            } else
                              var f = !0;
                            if (f) {
                              if (r.steps !== void 0) {
                                let c = r.steps;
                                const A = e;
                                if (e === A)
                                  if (Array.isArray(
                                    c
                                  )) {
                                    var x = !0;
                                    const T = c.length;
                                    for (let _ = 0; _ < T; _++) {
                                      let y = c[_];
                                      const g = e, v = e;
                                      let O = !1;
                                      const N = e;
                                      n(
                                        y,
                                        {
                                          instancePath: t + "/steps/" + _,
                                          parentData: c,
                                          parentDataProperty: _,
                                          rootData: l
                                        }
                                      ) || (i = i === null ? n.errors : i.concat(
                                        n.errors
                                      ), e = i.length);
                                      var I = N === e;
                                      if (O = O || I, !O) {
                                        const W = e;
                                        if (typeof y != "string") {
                                          const V = {
                                            instancePath: t + "/steps/" + _,
                                            schemaPath: "#/properties/steps/items/anyOf/1/type",
                                            keyword: "type",
                                            params: {
                                              type: "string"
                                            },
                                            message: "must be string"
                                          };
                                          i === null ? i = [
                                            V
                                          ] : i.push(
                                            V
                                          ), e++;
                                        }
                                        var I = W === e;
                                        if (O = O || I, !O) {
                                          const V = e, ee = {
                                            instancePath: t + "/steps/" + _,
                                            schemaPath: "#/properties/steps/items/anyOf/2/not",
                                            keyword: "not",
                                            params: {},
                                            message: "must NOT be valid"
                                          };
                                          i === null ? i = [
                                            ee
                                          ] : i.push(
                                            ee
                                          ), e++;
                                          var I = V === e;
                                          if (O = O || I, !O) {
                                            const C = e;
                                            if (typeof y != "boolean") {
                                              const M = {
                                                instancePath: t + "/steps/" + _,
                                                schemaPath: "#/properties/steps/items/anyOf/3/type",
                                                keyword: "type",
                                                params: {
                                                  type: "boolean"
                                                },
                                                message: "must be boolean"
                                              };
                                              i === null ? i = [
                                                M
                                              ] : i.push(
                                                M
                                              ), e++;
                                            }
                                            if (y !== !1) {
                                              const M = {
                                                instancePath: t + "/steps/" + _,
                                                schemaPath: "#/properties/steps/items/anyOf/3/const",
                                                keyword: "const",
                                                params: {
                                                  allowedValue: !1
                                                },
                                                message: "must be equal to constant"
                                              };
                                              i === null ? i = [
                                                M
                                              ] : i.push(
                                                M
                                              ), e++;
                                            }
                                            var I = C === e;
                                            if (O = O || I, !O) {
                                              const M = e;
                                              if (y !== null) {
                                                const K = {
                                                  instancePath: t + "/steps/" + _,
                                                  schemaPath: "#/properties/steps/items/anyOf/4/type",
                                                  keyword: "type",
                                                  params: {
                                                    type: "null"
                                                  },
                                                  message: "must be null"
                                                };
                                                i === null ? i = [
                                                  K
                                                ] : i.push(
                                                  K
                                                ), e++;
                                              }
                                              var I = M === e;
                                              O = O || I;
                                            }
                                          }
                                        }
                                      }
                                      if (O)
                                        e = v, i !== null && (v ? i.length = v : i = null);
                                      else {
                                        const W = {
                                          instancePath: t + "/steps/" + _,
                                          schemaPath: "#/properties/steps/items/anyOf",
                                          keyword: "anyOf",
                                          params: {},
                                          message: "must match a schema in anyOf"
                                        };
                                        return i === null ? i = [
                                          W
                                        ] : i.push(
                                          W
                                        ), e++, B.errors = i, !1;
                                      }
                                      var x = g === e;
                                      if (!x)
                                        break;
                                    }
                                  } else
                                    return B.errors = [
                                      {
                                        instancePath: t + "/steps",
                                        schemaPath: "#/properties/steps/type",
                                        keyword: "type",
                                        params: {
                                          type: "array"
                                        },
                                        message: "must be array"
                                      }
                                    ], !1;
                                var f = A === e;
                              } else
                                var f = !0;
                              if (f)
                                if (r.$schema !== void 0) {
                                  const c = e;
                                  if (typeof r.$schema != "string")
                                    return B.errors = [
                                      {
                                        instancePath: t + "/$schema",
                                        schemaPath: "#/properties/%24schema/type",
                                        keyword: "type",
                                        params: {
                                          type: "string"
                                        },
                                        message: "must be string"
                                      }
                                    ], !1;
                                  var f = c === e;
                                } else
                                  var f = !0;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else
      return B.errors = [
        {
          instancePath: t,
          schemaPath: "#/type",
          keyword: "type",
          params: { type: "object" },
          message: "must be object"
        }
      ], !1;
  return B.errors = i, e === 0;
}
function er(r, { instancePath: t = "", parentData: o, parentDataProperty: p, rootData: l = r } = {}) {
  let i = null, e = 0;
  return B(r, {
    instancePath: t,
    parentData: o,
    parentDataProperty: p,
    rootData: l
  }) || (i = i === null ? B.errors : i.concat(B.errors), e = i.length), er.errors = i, e === 0;
}
const { wpCLI: Ls, ...Mr } = fs, Ss = {
  ...Mr,
  "wp-cli": Ls,
  importFile: Mr.importWxr
};
function xs(r, {
  progress: t = new ur(),
  semaphore: o = new Ot({ concurrency: 3 }),
  onStepCompleted: p = () => {
  }
} = {}) {
  var m, w, S, D, P, U, te, H, E;
  r = {
    ...r,
    steps: (r.steps || []).filter(Is).filter(Ds)
  };
  for (const x of r.steps)
    typeof x == "object" && x.step === "importFile" && (x.step = "importWxr", ae.warn(
      'The "importFile" step is deprecated. Use "importWxr" instead.'
    ));
  if (r.constants && r.steps.unshift({
    step: "defineWpConfigConsts",
    consts: r.constants
  }), r.siteOptions && r.steps.unshift({
    step: "setSiteOptions",
    options: r.siteOptions
  }), r.plugins) {
    const x = r.plugins.map((I) => typeof I == "string" ? I.startsWith("https://") ? {
      resource: "url",
      url: I
    } : {
      resource: "wordpress.org/plugins",
      slug: I
    } : I).map((I) => ({
      step: "installPlugin",
      pluginZipFile: I
    }));
    r.steps.unshift(...x);
  }
  r.login && r.steps.push({
    step: "login",
    ...r.login === !0 ? { username: "admin", password: "password" } : r.login
  }), r.phpExtensionBundles || (r.phpExtensionBundles = []), r.phpExtensionBundles || (r.phpExtensionBundles = []), r.phpExtensionBundles.length === 0 && r.phpExtensionBundles.push("kitchen-sink");
  const l = ((m = r.steps) == null ? void 0 : m.findIndex(
    (x) => typeof x == "object" && (x == null ? void 0 : x.step) === "wp-cli"
  )) ?? -1;
  if ((w = r == null ? void 0 : r.extraLibraries) != null && w.includes("wp-cli") || l > -1) {
    r.phpExtensionBundles.includes("light") && (r.phpExtensionBundles = r.phpExtensionBundles.filter(
      (I) => I !== "light"
    ), ae.warn(
      "WP-CLI is used in your Blueprint, and it requires the iconv and mbstring PHP extensions. However, you did not specify the kitchen-sink extension bundle. Playground will override your choice and load the kitchen-sink PHP extensions bundle to prevent the WP-CLI step from failing. "
    ));
    const x = {
      step: "writeFile",
      data: {
        resource: "url",
        /**
         * Use compression for downloading the wp-cli.phar file.
         * The official release, hosted at raw.githubusercontent.com, is ~7MB
         * and the transfer is uncompressed. playground.wordpress.net supports
         * transfer compression and only transmits ~1.4MB.
         *
         * @TODO: minify the wp-cli.phar file. It can be as small as 1MB when all the
         *        whitespaces and are removed, and even 500KB when libraries
         *        like the JavaScript parser or Composer are removed.
         */
        url: "https://playground.wordpress.net/wp-cli.phar"
      },
      path: "/tmp/wp-cli.phar"
    };
    l === -1 ? (S = r.steps) == null || S.push(x) : (D = r.steps) == null || D.splice(l, 0, x);
  }
  const i = (P = r.steps) == null ? void 0 : P.findIndex(
    (x) => typeof x == "object" && (x == null ? void 0 : x.step) === "importWxr"
  );
  i !== void 0 && i > -1 && (r.phpExtensionBundles.includes("light") && (r.phpExtensionBundles = r.phpExtensionBundles.filter(
    (x) => x !== "light"
  ), ae.warn(
    "The importWxr step used in your Blueprint requires the iconv and mbstring PHP extensions. However, you did not specify the kitchen-sink extension bundle. Playground will override your choice and load the kitchen-sink PHP extensions bundle to prevent the WP-CLI step from failing. "
  )), (U = r.steps) == null || U.splice(i, 0, {
    step: "installPlugin",
    pluginZipFile: {
      resource: "url",
      url: "https://playground.wordpress.net/wordpress-importer.zip",
      caption: "Downloading the WordPress Importer plugin"
    }
  }));
  const { valid: e, errors: f } = Ns(r);
  if (!e) {
    const x = new Error(
      `Invalid blueprint: ${f[0].message} at ${f[0].instancePath}`
    );
    throw x.errors = f, x;
  }
  const h = r.steps || [], b = h.reduce(
    (x, I) => {
      var z;
      return x + (((z = I.progress) == null ? void 0 : z.weight) || 1);
    },
    0
  ), k = h.map(
    (x) => Ws(x, {
      semaphore: o,
      rootProgressTracker: t,
      totalProgressWeight: b
    })
  );
  return {
    versions: {
      php: Fs(
        (te = r.preferredVersions) == null ? void 0 : te.php,
        jr,
        gs
      ),
      wp: ((H = r.preferredVersions) == null ? void 0 : H.wp) || "latest"
    },
    phpExtensions: Cs(
      [],
      r.phpExtensionBundles || []
    ),
    features: {
      // Disable networking by default
      networking: ((E = r.features) == null ? void 0 : E.networking) ?? !1
    },
    extraLibraries: r.extraLibraries || [],
    run: async (x) => {
      try {
        for (const { resources: I } of k)
          for (const z of I)
            z.setPlayground(x), z.isAsync && z.resolve();
        for (const [I, { run: z, step: c }] of Object.entries(k))
          try {
            const A = await z(x);
            p(A, c);
          } catch (A) {
            throw ae.error(A), new Error(
              `Error when executing the blueprint step #${I} (${JSON.stringify(
                c
              )}) ${A instanceof Error ? `: ${A.message}` : A}`,
              { cause: A }
            );
          }
      } finally {
        try {
          await x.goTo(
            r.landingPage || "/"
          );
        } catch {
        }
        t.finish();
      }
    }
  };
}
function Ns(r) {
  var l;
  const t = er(r);
  if (t)
    return { valid: t };
  const o = /* @__PURE__ */ new Set();
  for (const i of er.errors)
    i.schemaPath.startsWith("#/properties/steps/items/anyOf") || o.add(i.instancePath);
  const p = (l = er.errors) == null ? void 0 : l.filter(
    (i) => !(i.schemaPath.startsWith("#/properties/steps/items/anyOf") && o.has(i.instancePath))
  );
  return {
    valid: t,
    errors: p
  };
}
function Fs(r, t, o) {
  return r && t.includes(r) ? r : o;
}
function Cs(r, t) {
  const o = lt.filter(
    (l) => r.includes(l)
  ), p = t.flatMap(
    (l) => l in Wr ? Wr[l] : []
  );
  return Array.from(/* @__PURE__ */ new Set([...o, ...p]));
}
function Is(r) {
  return !!(typeof r == "object" && r);
}
function Ds(r) {
  return ["setPhpIniEntry", "request"].includes(r.step) ? (ae.warn(
    `The "${r.step}" Blueprint is no longer supported and you can remove it from your Blueprint.`
  ), !1) : !0;
}
function Ws(r, {
  semaphore: t,
  rootProgressTracker: o,
  totalProgressWeight: p
}) {
  var k;
  const l = o.stage(
    (((k = r.progress) == null ? void 0 : k.weight) || 1) / p
  ), i = {};
  for (const m of Object.keys(r)) {
    let w = r[m];
    ws(w) && (w = Le.create(w, {
      semaphore: t
    })), i[m] = w;
  }
  const e = async (m) => {
    var w;
    try {
      return l.fillSlowly(), await Ss[r.step](
        m,
        await Ms(i),
        {
          tracker: l,
          initialCaption: (w = r.progress) == null ? void 0 : w.caption
        }
      );
    } finally {
      l.finish();
    }
  }, f = Br(i), h = Br(i).filter(
    (m) => m.isAsync
  ), b = 1 / (h.length + 1);
  for (const m of h)
    m.progress = l.stage(b);
  return { run: e, step: r, resources: f };
}
function Br(r) {
  const t = [];
  for (const o in r) {
    const p = r[o];
    p instanceof Le && t.push(p);
  }
  return t;
}
async function Ms(r) {
  const t = {};
  for (const o in r) {
    const p = r[o];
    p instanceof Le ? t[o] = await p.resolve() : t[o] = p;
  }
  return t;
}
async function Bs(r, t) {
  await r.run(t);
}
function li() {
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const mt = Symbol("Comlink.proxy"), Us = Symbol("Comlink.endpoint"), zs = Symbol("Comlink.releaseProxy"), wr = Symbol("Comlink.finalizer"), rr = Symbol("Comlink.thrown"), yt = (r) => typeof r == "object" && r !== null || typeof r == "function", Vs = {
  canHandle: (r) => yt(r) && r[mt],
  serialize(r) {
    const { port1: t, port2: o } = new MessageChannel();
    return qr(r, t), [o, [o]];
  },
  deserialize(r) {
    return r.start(), Rr(r);
  }
}, Hs = {
  canHandle: (r) => yt(r) && rr in r,
  serialize({ value: r }) {
    let t;
    return r instanceof Error ? t = {
      isError: !0,
      value: {
        message: r.message,
        name: r.name,
        stack: r.stack
      }
    } : t = { isError: !1, value: r }, [t, []];
  },
  deserialize(r) {
    throw r.isError ? Object.assign(new Error(r.value.message), r.value) : r.value;
  }
}, xe = /* @__PURE__ */ new Map([
  ["proxy", Vs],
  ["throw", Hs]
]);
function Gs(r, t) {
  for (const o of r)
    if (t === o || o === "*" || o instanceof RegExp && o.test(t))
      return !0;
  return !1;
}
function qr(r, t = globalThis, o = ["*"]) {
  t.addEventListener("message", function p(l) {
    if (!l || !l.data)
      return;
    if (!Gs(o, l.origin)) {
      console.warn(`Invalid origin '${l.origin}' for comlink proxy`);
      return;
    }
    const { id: i, type: e, path: f } = Object.assign({ path: [] }, l.data), h = (l.data.argumentList || []).map(Re);
    let b;
    try {
      const k = f.slice(0, -1).reduce((w, S) => w[S], r), m = f.reduce((w, S) => w[S], r);
      switch (e) {
        case "GET":
          b = m;
          break;
        case "SET":
          k[f.slice(-1)[0]] = Re(l.data.value), b = !0;
          break;
        case "APPLY":
          b = m.apply(k, h);
          break;
        case "CONSTRUCT":
          {
            const w = new m(...h);
            b = wt(w);
          }
          break;
        case "ENDPOINT":
          {
            const { port1: w, port2: S } = new MessageChannel();
            qr(r, S), b = Ks(w, [w]);
          }
          break;
        case "RELEASE":
          b = void 0;
          break;
        default:
          return;
      }
    } catch (k) {
      b = { value: k, [rr]: 0 };
    }
    Promise.resolve(b).catch((k) => ({ value: k, [rr]: 0 })).then((k) => {
      const [m, w] = pr(k);
      t.postMessage(Object.assign(Object.assign({}, m), { id: i }), w), e === "RELEASE" && (t.removeEventListener("message", p), ht(t), wr in r && typeof r[wr] == "function" && r[wr]());
    }).catch((k) => {
      const [m, w] = pr({
        value: new TypeError("Unserializable return value"),
        [rr]: 0
      });
      t.postMessage(Object.assign(Object.assign({}, m), { id: i }), w);
    });
  }), t.start && t.start();
}
function Ys(r) {
  return r.constructor.name === "MessagePort";
}
function ht(r) {
  Ys(r) && r.close();
}
function Rr(r, t) {
  return Er(r, [], t);
}
function Ke(r) {
  if (r)
    throw new Error("Proxy has been released and is not useable");
}
function gt(r) {
  return Se(r, {
    type: "RELEASE"
  }).then(() => {
    ht(r);
  });
}
const nr = /* @__PURE__ */ new WeakMap(), ar = "FinalizationRegistry" in globalThis && new FinalizationRegistry((r) => {
  const t = (nr.get(r) || 0) - 1;
  nr.set(r, t), t === 0 && gt(r);
});
function Zs(r, t) {
  const o = (nr.get(t) || 0) + 1;
  nr.set(t, o), ar && ar.register(r, t, r);
}
function Qs(r) {
  ar && ar.unregister(r);
}
function Er(r, t = [], o = function() {
}) {
  let p = !1;
  const l = new Proxy(o, {
    get(i, e) {
      if (Ke(p), e === zs)
        return () => {
          Qs(l), gt(r), p = !0;
        };
      if (e === "then") {
        if (t.length === 0)
          return { then: () => l };
        const f = Se(r, {
          type: "GET",
          path: t.map((h) => h.toString())
        }).then(Re);
        return f.then.bind(f);
      }
      return Er(r, [...t, e]);
    },
    set(i, e, f) {
      Ke(p);
      const [h, b] = pr(f);
      return Se(r, {
        type: "SET",
        path: [...t, e].map((k) => k.toString()),
        value: h
      }, b).then(Re);
    },
    apply(i, e, f) {
      Ke(p);
      const h = t[t.length - 1];
      if (h === Us)
        return Se(r, {
          type: "ENDPOINT"
        }).then(Re);
      if (h === "bind")
        return Er(r, t.slice(0, -1));
      const [b, k] = Ur(f);
      return Se(r, {
        type: "APPLY",
        path: t.map((m) => m.toString()),
        argumentList: b
      }, k).then(Re);
    },
    construct(i, e) {
      Ke(p);
      const [f, h] = Ur(e);
      return Se(r, {
        type: "CONSTRUCT",
        path: t.map((b) => b.toString()),
        argumentList: f
      }, h).then(Re);
    }
  });
  return Zs(l, r), l;
}
function Js(r) {
  return Array.prototype.concat.apply([], r);
}
function Ur(r) {
  const t = r.map(pr);
  return [t.map((o) => o[0]), Js(t.map((o) => o[1]))];
}
const bt = /* @__PURE__ */ new WeakMap();
function Ks(r, t) {
  return bt.set(r, t), r;
}
function wt(r) {
  return Object.assign(r, { [mt]: !0 });
}
function Xs(r, t = globalThis, o = "*") {
  return {
    postMessage: (p, l) => r.postMessage(p, o, l),
    addEventListener: t.addEventListener.bind(t),
    removeEventListener: t.removeEventListener.bind(t)
  };
}
function pr(r) {
  for (const [t, o] of xe)
    if (o.canHandle(r)) {
      const [p, l] = o.serialize(r);
      return [
        {
          type: "HANDLER",
          name: t,
          value: p
        },
        l
      ];
    }
  return [
    {
      type: "RAW",
      value: r
    },
    bt.get(r) || []
  ];
}
function Re(r) {
  switch (r.type) {
    case "HANDLER":
      return xe.get(r.name).deserialize(r.value);
    case "RAW":
      return r.value;
  }
}
function Se(r, t, o) {
  return new Promise((p) => {
    const l = ei();
    r.addEventListener("message", function i(e) {
      !e.data || !e.data.id || e.data.id !== l || (r.removeEventListener("message", i), p(e.data));
    }), r.start && r.start(), r.postMessage(Object.assign({ id: l }, t), o);
  });
}
function ei() {
  return new Array(4).fill(0).map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)).join("-");
}
function ri(r, t = void 0) {
  si();
  const o = r instanceof Worker ? r : Xs(r, t), p = Rr(o), l = vt(p);
  return new Proxy(l, {
    get: (i, e) => e === "isConnected" ? async () => {
      for (; ; )
        try {
          await ti(p.isConnected(), 200);
          break;
        } catch {
        }
    } : p[e]
  });
}
async function ti(r, t) {
  return new Promise((o, p) => {
    setTimeout(p, t), r.then(o);
  });
}
let zr = !1;
function si() {
  if (zr)
    return;
  zr = !0, xe.set("EVENT", {
    canHandle: (o) => o instanceof CustomEvent,
    serialize: (o) => [
      {
        detail: o.detail
      },
      []
    ],
    deserialize: (o) => o
  }), xe.set("FUNCTION", {
    canHandle: (o) => typeof o == "function",
    serialize(o) {
      const { port1: p, port2: l } = new MessageChannel();
      return qr(o, p), [l, [l]];
    },
    deserialize(o) {
      return o.start(), Rr(o);
    }
  }), xe.set("PHPResponse", {
    canHandle: (o) => typeof o == "object" && o !== null && "headers" in o && "bytes" in o && "errors" in o && "exitCode" in o && "httpStatusCode" in o,
    serialize(o) {
      return [o.toRawData(), []];
    },
    deserialize(o) {
      return or.fromRawData(o);
    }
  });
  const r = xe.get("throw"), t = r == null ? void 0 : r.serialize;
  r.serialize = ({ value: o }) => {
    const p = t({ value: o });
    return o.response && (p[0].value.response = o.response), o.source && (p[0].value.source = o.source), p;
  };
}
function vt(r) {
  return new Proxy(r, {
    get(t, o) {
      switch (typeof t[o]) {
        case "function":
          return (...p) => t[o](...p);
        case "object":
          return t[o] === null ? t[o] : vt(t[o]);
        case "undefined":
        case "number":
        case "string":
          return t[o];
        default:
          return wt(t[o]);
      }
    }
  });
}
new Promise((r) => {
});
async function fi({
  iframe: r,
  blueprint: t,
  remoteUrl: o,
  progressTracker: p = new ur(),
  disableProgressBar: l,
  onBlueprintStepCompleted: i,
  onClientConnected: e = () => {
  },
  sapiName: f,
  onBeforeBlueprint: h,
  mounts: b,
  shouldInstallWordPress: k
}) {
  oi(o), ii(r), o = ni(o, {
    progressbar: !l
  }), p.setCaption("Preparing WordPress"), t || (t = {
    phpExtensionBundles: ["kitchen-sink"]
  });
  const m = xs(t, {
    progress: p.stage(0.5),
    onStepCompleted: i
  });
  await new Promise((D) => {
    r.src = o, r.addEventListener("load", D, !1);
  });
  const w = ri(
    r.contentWindow,
    r.ownerDocument.defaultView
  );
  await w.isConnected(), p.pipe(w);
  const S = p.stage();
  return await w.onDownloadProgress(S.loadingListener), await w.boot({
    mounts: b,
    sapiName: f,
    shouldInstallWordPress: k,
    phpVersion: m.versions.php,
    wpVersion: m.versions.wp,
    phpExtensions: m.phpExtensions,
    withNetworking: m.features.networking
  }), await w.isReady(), S.finish(), Ft(ae, w), e(w), h && await h(), await Bs(m, w), p.finish(), w;
}
function ii(r) {
  var t, o;
  (t = r.sandbox) != null && t.length && !((o = r.sandbox) != null && o.contains("allow-storage-access-by-user-activation")) && r.sandbox.add("allow-storage-access-by-user-activation");
}
const tr = "https://playground.wordpress.net";
function oi(r) {
  const t = new URL(r, tr);
  if ((t.origin === tr || t.hostname === "localhost") && t.pathname !== "/remote.html")
    throw new Error(
      `Invalid remote URL: ${t}. Expected origin to be ${tr}/remote.html.`
    );
}
function ni(r, t) {
  const o = new URL(r, tr), p = new URLSearchParams(o.search);
  for (const [l, i] of Object.entries(t))
    if (i != null && i !== !1)
      if (Array.isArray(i))
        for (const e of i)
          p.append(l, e.toString());
      else
        p.set(l, i.toString());
  return o.search = p.toString(), o.toString();
}
export {
  gs as LatestSupportedPHPVersion,
  jr as SupportedPHPVersions,
  pi as SupportedPHPVersionsList,
  $r as activatePlugin,
  Kr as activateTheme,
  xs as compileBlueprint,
  Gt as cp,
  st as defineSiteUrl,
  sr as defineWpConfigConsts,
  Vt as enableMultisite,
  Xt as exportWXR,
  it as importThemeStarterContent,
  Kt as importWordPressFiles,
  Jt as importWxr,
  es as installPlugin,
  rs as installTheme,
  kr as login,
  Zt as mkdir,
  Yt as mv,
  ie as phpVar,
  lr as phpVars,
  _r as request,
  ts as resetData,
  Xr as rm,
  Qt as rmdir,
  Bs as runBlueprintSteps,
  Ct as runPHP,
  It as runPHPWithOptions,
  Dt as runSql,
  ss as runWpInstallationWizard,
  ai as setPhpIniEntries,
  li as setPluginProxyURL,
  ls as setSiteLanguage,
  et as setSiteOptions,
  fi as startPlaygroundWeb,
  Tr as unzip,
  Ut as updateUserMeta,
  as as wpCLI,
  Hr as wpContentFilesExcludedFromExport,
  tt as writeFile,
  is as zipWpContent
};

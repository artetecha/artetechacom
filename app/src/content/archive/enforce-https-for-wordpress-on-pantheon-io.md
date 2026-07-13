---
title: 'Enforce HTTPS for WordPress on Pantheon.io'
description: 'Enforcing HTTPS for WordPress sites hosted on Pantheon by editing wp-config.php directly, without resorting to a plugin or .htaccess rules.'
pubDate: 2017-08-19
tags: ['wordpress']
originalUrl: '/enforce-https-for-wordpress-on-pantheon-io/2017/08/19/'
---

Not long ago, [Pantheon announced](https://pantheon.io/blog/pantheon-launches-global-cdn-automated-https-all-sites) that HTTPS would be available free of charge for all sites. We recently took advantage of this, and wanted to enforce HTTPS on our WordPress websites without using a plugin (which would force WordPress to bootstrap). Also, remember, on Pantheon you cannot use `.htaccess` (which is **good**).

As we write ([771b52e](https://github.com/pantheon-systems/WordPress/commit/771b52e40e729f98338f09e55d8595a4b6df5e97)), the `wp-config.php` file in Pantheon’s WordPress contains this section of code dealing with HTTP/HTTPS, which assumes HTTP as the default scheme:

```php
<?php

// ...

/** A couple extra tweaks to help things run well on Pantheon. **/
if (isset($_SERVER['HTTP_HOST'])) {
    // HTTP is still the default scheme for now. 
    $scheme = 'http';
    // If we have detected that the end use is HTTPS, make sure we pass that
    // through here, so <img> tags and the like don't generate mixed-mode
    // content warnings.
    if (isset($_SERVER['HTTP_USER_AGENT_HTTPS']) && $_SERVER['HTTP_USER_AGENT_HTTPS'] == 'ON') {
        $scheme = 'https';
    }
    define('WP_HOME', $scheme . '://' . $_SERVER['HTTP_HOST']);
    define('WP_SITEURL', $scheme . '://' . $_SERVER['HTTP_HOST']);
} 

// ...
```

Rather than adding extra code following [the templates suggested by Pantheon](https://pantheon.io/docs/domains/), what we did was to simply change this section of code so that HTTPS is considered the default scheme, and all non-secure requests would be redirected to HTTPS:

```php
<?php

// ...

/** A couple extra tweaks to help things run well on Pantheon. **/
if (isset($_SERVER['HTTP_HOST'])) {
    // HTTPS is now the default scheme.
    $scheme = 'https';
    $base_url = $scheme . '://' . $_SERVER['HTTP_HOST'];
    define('WP_HOME', $base_url);
    define('WP_SITEURL', $base_url);

    // Enforce HTTPS.
    if (!isset($_SERVER['HTTP_USER_AGENT_HTTPS']) || $_SERVER['HTTP_USER_AGENT_HTTPS'] != 'ON') {
      header('HTTP/1.0 301 Moved Permanently');
      header('Location: ' . $base_url . $_SERVER['REQUEST_URI']);
      exit();
    }
}

// ...
```

This is how the `diff` between the two files looks like (click on **view raw** below to download it):

```diff
diff --git a/wp-config.php b/wp-config.php
index 4639ada8..36786193 100755
--- a/wp-config.php
+++ b/wp-config.php
@@ -67,16 +67,18 @@ else:
 
     /** A couple extra tweaks to help things run well on Pantheon. **/
     if (isset($_SERVER['HTTP_HOST'])) {
-        // HTTP is still the default scheme for now. 
-        $scheme = 'http';
-        // If we have detected that the end use is HTTPS, make sure we pass that
-        // through here, so <img> tags and the like don't generate mixed-mode
-        // content warnings.
-        if (isset($_SERVER['HTTP_USER_AGENT_HTTPS']) && $_SERVER['HTTP_USER_AGENT_HTTPS'] == 'ON') {
-            $scheme = 'https';
+        // HTTPS is now the default scheme.
+        $scheme = 'https';
+        $base_url = $scheme . '://' . $_SERVER['HTTP_HOST'];
+        define('WP_HOME', $base_url);
+        define('WP_SITEURL', $base_url);
+
+        // Enforce HTTPS.
+        if (!isset($_SERVER['HTTP_USER_AGENT_HTTPS']) || $_SERVER['HTTP_USER_AGENT_HTTPS'] != 'ON') {
+          header('HTTP/1.0 301 Moved Permanently');
+          header('Location: ' . $base_url . $_SERVER['REQUEST_URI']);
+          exit();
         }
-        define('WP_HOME', $scheme . '://' . $_SERVER['HTTP_HOST']);
-        define('WP_SITEURL', $scheme . '://' . $_SERVER['HTTP_HOST']);
     }
     // Don't show deprecations; useful under PHP 5.5
     error_reporting(E_ALL ^ E_DEPRECATED);
```

Enjoy!

---
title: 'Exporting date formats to code with Multilingual Drupal'
description: 'A clean way to export localised date formats to code on a multilingual Drupal 7 site, working around the limitations of Features and Strongarm.'
pubDate: 2016-08-31
tags: ['drupal']
originalUrl: '/exporting-date-formats-to-code-with-multilingual-drupal/2016/08/31/'
---

One of the issues I came across while working on one of our main projects is that of exporting date formats to code in a multilingual Drupal (D7) setup in an efficient and clean manner. Although this project, like many out there, relies heavily on Features, we found that the latter lacks the ability to export all the localised date formats: all that Features will do is to export the date formats used in a single language set up; these are stored as variables (`date_format_<format-name>`), so Features uses Strongarm to export them. However, when you are in a multilingual setup and localise your date formats, these are stored in a database table named `date_format_locale`, which is not exportable via Features. As a margin note, you should know that in a multilingual environment the `date_format_<format-name>` variables are always synchronised to the values found in `date_format_locale` for the default language. Whenever the latter change, the variables also change.

### The path to the solution

_You can skip to the next paragraph if you are not interested in understanding why implementing`hook_date_formats()` is not enough, but you just want to get things done._

The first step was to find out about [`hook_date_formats()`](https://api.drupal.org/api/drupal/modules%21system%21system.api.php/function/hook_date_formats/7.x). Although this works just fine to _define_ date formats, which will then be correctly displayed in the regional settings, etc., that is also all it will do for you. If you are expecting that this hook will work like an export, you – like me at first – are misunderstanding what this hook does. And believe me: working on a big project where hardly any settings is ever allowed to be overridden at UI level will do that to you.

I had initially thought there was a flaw in Drupal as to how this hook is handled; so much so, that I even came up with a patch. The changes in the patch were based on the assumption that whatever is defined in `hook_date_formats()` should always be restored whenever one flushes the caches, thus clearing any “database override”. I went through the trouble of “visiting” the call graph and inspecting all the functions involved. I eventually decided that there were issues with how both [`system_date_format_save()`](https://api.drupal.org/api/drupal/modules%21system%21system.module/function/system_date_format_save/7.x) and [`_system_date_formats_build()`](https://api.drupal.org/api/drupal/modules%21system%21system.module/function/_system_date_formats_build/7.x) were implemented.

The latter gets all the date formats defined via `hook_date_formats()`, then merges them with those that have been saved directly to the database; however, it does that in such a way that, if what’s found in database is merely an override of what’s also found in code in the `hook_date_formats()` implementations, the database values take precedence, thus ultimately overriding whatever it’s in code. I was _convinced_ this was wrong behaviour, but I then understood that I was wrong. The behaviour is perfectly normal, as it allows CMS users to change what a module has defined. If flushing the caches were to restore the values specified in the `hook_date_formats()` every time, the user would see their overrides lost each time.

Regarding the issue I thought I had found with `system_date_format_save()`, when you compare this function to [`locale_date_format_save()`](https://api.drupal.org/api/drupal/includes%21locale.inc/function/locale_date_format_save/7.x), you’ll notice that the former doesn’t do anything if the locale has already been previously saved, thus making it impossible to restore a value from code. But of course, I then realised it’s not its job to restore a value from code.

### A solution

The solution I implemented is really simple, and I divided it in three steps.

**The first step** is actually optional, and it is simply a way to get a feature module where you can implement the second step. So, if you don’t and are not going to have any other feature module, then you might want to do this. Export the date formats for your default language into a feature module; like I said, this will use strongarm to actually store the data in code. Since I will be using actual code snippets, be aware that the default language in the examples below is Spanish (`es`). Some of the relevant code that will go into your feature module will be lines like the following added to the `.info` file:

```
features[variable][] = date_first_day
features[variable][] = date_format_long
features[variable][] = date_format_medium
features[variable][] = date_format_month_year
features[variable][] = date_format_short
features[variable][] = date_format_time
features[variable][] = date_format_year
```

and something like this added to the `.strongarm.inc` file of the same feature module:

```php
<?php 

// ... 

$strongarm = new stdClass();
$strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
$strongarm->api_version = 1;
$strongarm->name = 'date_first_day';
$strongarm->value = '1';
$export['date_first_day'] = $strongarm;

$strongarm = new stdClass();
$strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
$strongarm->api_version = 1;
$strongarm->name = 'date_format_long';
$strongarm->value = 'l, j \\d\\e F \\d\\e Y H:i';
$export['date_format_long'] = $strongarm;

$strongarm = new stdClass();
$strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
$strongarm->api_version = 1;
$strongarm->name = 'date_format_medium';
$strongarm->value = 'j \\d\\e F \\d\\e Y H:i';
$export['date_format_medium'] = $strongarm;

$strongarm = new stdClass();
$strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
$strongarm->api_version = 1;
$strongarm->name = 'date_format_month_year';
$strongarm->value = 'F \\d\\e Y';
$export['date_format_month_year'] = $strongarm;

$strongarm = new stdClass();
$strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
$strongarm->api_version = 1;
$strongarm->name = 'date_format_short';
$strongarm->value = 'd/m/y H:i';
$export['date_format_short'] = $strongarm;

$strongarm = new stdClass();
$strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
$strongarm->api_version = 1;
$strongarm->name = 'date_format_time';
$strongarm->value = 'H:i';
$export['date_format_time'] = $strongarm;

$strongarm = new stdClass();
$strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
$strongarm->api_version = 1;
$strongarm->name = 'date_format_year';
$strongarm->value = 'Y';
$export['date_format_year'] = $strongarm;

// ... 
```

**The second step** is to implement your `hook_date_formats()` in the `.module` file of your feature module. You may have noticed from above that we also defined additional date format types, so our code below will also show the implementation of [`hook_date_format_types()`](https://api.drupal.org/api/drupal/modules!system!system.api.php/function/hook_date_format_types/7.x). I thought I’d leave it in there 😉

```php
<?php

// ... 

**
 * Implements hook_date_format_types().
 */
function settings_date_format_types() {
  return array(
    'month_year' => 'Month Year',
    'year' => 'Year',
    'time' => 'Time',
  );
}

/**
 * Implements hook_date_formats().
 */
function settings_date_formats() {
  $formats = array();
  $formats[] = array(
    'type' => 'long',
    'format' => 'l, j \d\e F \d\e Y H:i',
    'locales' => array('es'),
  );
  $formats[] = array(
    'type' => 'long',
    'format' => 'l j F Y H:i',
    'locales' => array('en'),
  );
  $formats[] = array(
    'type' => 'medium',
    'format' => 'j \d\e F \d\e Y H:i',
    'locales' => array('es'),
  );
  $formats[] = array(
    'type' => 'medium',
    'format' => 'j F Y H:i',
    'locales' => array('en'),
  );
  $formats[] = array(
    'type' => 'short',
    'format' => 'd/m/y H:i',
    'locales' => array('es', 'en'),
  );
  $formats[] = array(
    'type' => 'year',
    'format' => 'Y',
    'locales' => array('es', 'en'),
  );
  $formats[] = array(
    'type' => 'month_year',
    'format' => 'F \d\e Y',
    'locales' => array('es'),
  );
  $formats[] = array(
    'type' => 'month_year',
    'format' => 'F Y',
    'locales' => array('en'),
  );
  $formats[] = array(
    'type' => 'time',
    'format' => 'H:i',
    'locales' => array('es', 'en'),
  );

  return $formats;
}

// ... 
```

You may have noticed that we have repeated here the same date formats already exported above via Strongarm. That is, again, because the first step is optional and if you already have a feature module available, you can implement the second step there. While the implementation for `hook_date_format_types()` will successfully add new types to your installation, as we said in our introduction, implementing `hook_date_formats()` will not actually act as an “export”; it’s simply a definition.

**The third and last step** is to implement [`hook_post_features_revert()`](https://web.archive.org/web/2016/http://www.drupalcontrib.org/api/drupal/contributions!features!features.api.php/function/hook_post_features_revert/7) in the same `.module` file as above. Although I am not familiar with the internal details, this I do know: that when the hook is implemented in a feature module, it will only be invoked when components from that same feature module are reverted. Which is quite convenient for what we need to achieve, as we don’t want the following code to run once for every single feature being reverted.

```php
<?php

// ... 

function settings_post_features_revert($component) {
  $date_formats = module_invoke('bcshop_settings', 'date_formats');
  foreach ($date_formats as $date_format) {
    foreach ($date_format['locales'] as $locale) {
      if (drupal_multilingual()) {
        locale_date_format_save($locale, $date_format['type'], $date_format['format']);
      }
    }
  }
}

// ... 
```

The code above should be fairly self-explanatory, as all it does is to get all the date formats we defined in our implementation of `hook_date_formats()` and save them all into the database.

### The proper solution

Of course, the proper solution would be to add to Features the support to export the `date_format_locale` database table. Since I have limited time, however, I was content with the solution outlined in this article. But if you do decide to implement proper Features support or you happen to know that it’s finally been done by the time you read this article, please do let me know in the comments!

Ad maiora.

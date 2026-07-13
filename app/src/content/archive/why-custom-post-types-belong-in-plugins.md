---
title: 'Why custom post types belong in plugins'
description: 'An argument from MVC/PAC first principles for why WordPress custom post types are data-layer concerns that belong in plugins, not themes.'
pubDate: 2014-05-14
tags: ['wordpress']
originalUrl: '/why-custom-post-types-belong-in-plugins/2014/05/14/'
---

Every now and then I notice a bit of noise around this matter in the WordPress community:

> Why custom post types belong in plugins.

To me, the matter is so simple that a tweet it's all it takes to settle it (and there is even a 'in' that shouldn't be there!):

> [@stevengliebe](https://twitter.com/stevengliebe) [@justintadlock](https://twitter.com/justintadlock) because they're Model and not View in from an MVC perspective 🙂
>
> — Vincenzo Russo (@enzoru) [May 13, 2014](https://twitter.com/enzoru/statuses/466290656860995584)

### Let's expand on it, though

Now, let's be honest. I have worked with WordPress, but unlike many out there, I am a lone wolf, in that I do not participate much in the community; indeed, it's very rare. It's also true that WordPress is not the main platform I focus on, that being Drupal instead.

However, I hold that you don't need to be a WordPress expert, guru, master, ninja, etc. to answer this question. All you need is basic solid understanding of fairly modern best practices is software engineering.

First things first, though: definitions.

### What's a post type?

In WordPress a *post type* may be seen as similar to a Drupal's content type. A very basic definition of a post type is that it is a data structure definition, a *data type*; that is, a post type is a collection of fields (e.g. title, body, image, etc.) who hold the information for entries of post type *X*. These fields are stored into the database. WordPress comes with default [post types](http://codex.wordpress.org/Post_Types), but custom post types can also be defined.

### What's a WordPress plugin?

[I quote](http://codex.wordpress.org/Writing_a_Plugin):

> A WordPress Plugin is a program, or a set of one or more functions, written in the PHP scripting language, that adds a specific set of features or services to the WordPress weblog, which can be seamlessly integrated with the weblog using access points and methods provided by the WordPress Plugin Application Program Interface (API).

### What's a WordPress theme?

Now, in an ideal world, a theme should just provide a presentation layer. In WordPress is very common that themes provide extra functionality too. Indeed, [I quote](http://codex.wordpress.org/Theme_Development):

> WordPress Themes are files that work together to create the design and functionality of a WordPress site

This can be fine as long as the functionality provided is aimed at specifically enhancing the presentation layer. The moment you add to your theme a piece of functionality that is intrinsically theme-agnostic, you have a problem. And this is exactly why the matter of whether custom post types should belong in a theme or in a plugin often comes up.

### Let's settle the matter

Post types, being data types, are located at the **data layer** and therefore should not be merged with the presentation layer, according to modern best practices. If you abstract your thinking away as [**MVC**](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) or [**PAC**](https://en.wikipedia.org/wiki/Presentation%E2%80%93abstraction%E2%80%93control), your custom post type would be part of the **M** in **MVC** or the **A** in **PAC**.

Extensions to the data layer (be it **M** or **A**), in architectures like WordPress (or Drupal), are done via plugins (in Drupal that would be called a *module*).

Themes implement the **presentation layer** and they can be seen either as the **V** of **MVC** or the **P** of **PAC**.

You can easily see, you simply **should not** put custom post types in a theme, because they **don't** belong together.

### Why the debate then?

I do not mean to be harsh, but we have two fundamental issues. First, WordPress architecture is not rigid at all, so, in the pure PHP spirit, you can put anything anywhere, and it will eventually still work. The second issue, related or even caused by the first one, in my opinion, is that many WordPress developers do not care about fundamental software engineering patterns and best practices; possibly because they were never trained as software engineers in the first place. Indeed, at least according to my personal experience, many are web designers turned "developers" thanks to the simplicity of WordPress, and that have never gone to great lengths to improve their understanding of software engineering.

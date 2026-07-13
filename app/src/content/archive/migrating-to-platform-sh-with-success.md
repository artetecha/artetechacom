---
title: 'Migrating to Platform.sh with success'
description: 'How the British Council moved 120+ Drupal multi-site installations off bare metal onto a container-based Platform.sh architecture.'
pubDate: 2015-12-16
tags: ['solutions-architecture']
originalUrl: '/migrating-to-platform-sh-with-success/2015/12/16/'
---

One of our biggest clients is the British Council.

Over the years, we have helped the British Council to design and develop the common Drupal distribution that powers over 120 of their sites.

We came on board as consultants after they had already received consultancy for the infrastructure and tied themselves into a long contract. Unfortunately, this old fashioned server configuration on bare metal, limited in number, size and capacity, eventually proved to be a tough bottleneck.

The sites were running in multi-site configuration; each release involved a deployment that would run `drush` commands against all 120+ sites at once. I don't need to detail how bad that is.

We have recently helped the British Council to get out of this nasty situation and approach a much more modern, container-based, solution, where each site has their own container and the bespoke Drupal distribution is now treated as a third party project (pulled into the build process via the very handy `drush make`). The solution adopted [Platform.sh](https://platform.sh), which due to a number of legal and technical constraints, proved to be the only alternative out there.

This has now opened up a broad range of new possibilities and developments for the project, and has brought refresh excitement to the in-house development team at the British Council.

We also will be still consulting with them to exploit all the new available options and technologies at their fullest.

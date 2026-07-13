---
title: 'PostGraphile: PostgreSQL-backed GraphQL API not just for your client'
description: 'How PostGraphile turns a PostgreSQL database into a full GraphQL API that can serve server-to-server integrations as well as client applications.'
pubDate: 2019-01-17
tags: ['software-engineering']
originalUrl: '/postgraphile-postgresql-backed-graphql-api-not-just-for-your-client/2019/01/17/'
---

GraphQL has seen a huge rise in popularity over the past two years. Consequently, a myriad of products, PaaS, API-based CMSs (headless), etc. have made their appearance on the market. One type of product that has caught our attention is that whose objective is to promote what’s been later defined as “database driven GraphQL API development”.

### Database Driven GraphQL API

Though GraphQL is backend-agnostic, it’s become very common to use GraphQL as API layer on top of a database, be it a SQL o noSQL one. If you developed anything like that, you certainly discovered very early in the process that you were defining two virtually identical schemas, one for your DB and one for your API. “But I use Mongo, it’s schemaless”, I hear you object. You’re right, but the reality is that the schema is still there implicitly, and you can still define an explicit schema if you want. That is an important detail.

So, it did not take long for products and platforms like [Prisma](https://www.prisma.io/) (originally born as Graph.Cool), [Hasura](https://hasura.io/), [Strapi](https://strapi.io/), [PostGraphile](https://www.graphile.org/postgraphile), and others to emerge. Similar products had existed for REST, the most prominent of which is definitely [LoopBack](https://web.archive.org/web/2019/http://v4.loopback.io/) by IBM, now able to support GraphQL, too.

However, not all these products were born with the same objective. For example, Prisma have decided to essentially create an ORM-like service which creates a GraphQL API from a given database (PostgreSQL or MongoDB, as I write this) that is **not** meant to be used directly by a client, rather by another backend, usually another GraphQL server.

Instead, Hasura and PostGraphile (both exploiting PostgreSQL reflection API to create a GraphQL API from your data on the fly) [make](https://blog.hasura.io/hasura-vs-prisma-9ffc7271eda8) it [clear](https://www.graphile.org/postgraphile/#client-facing-graphql-server) that their products produce an API that is ready to use; in other words, they are created for client usage.

### Which model is best?

Instinctively, one can see how the model adopted by Prisma allows us to carefully craft our final API so that we know what we are providing the client with. We have control over authentication, authorisation, and other things you may want to make sure are done properly before exposing your API publicly for client usage.

This, however, does not mean tools like Hasura or PostGraphile do not do a great job at providing the means for us to harden our API and make it secure for public exposure.

### The latter implies the former

One might actually miss the obvious: whilst Prisma (and others that might have chosen the same model) can only be used from another backend (that is, if you want any sort of protection on your API, thus on your data), Hasura or PostGraphile, though designed to be ready for clients out of the box, can still be used as one would use Prisma.

### GraphQL binding for PostGraphile

Up until some time ago, the only publicised way to integrate Prisma in your (Node.js) GraphQL server was to use [prisma-binding](https://github.com/prisma/prisma-binding), based on [graphql-binding](https://github.com/graphql-binding/graphql-binding) (read more about it [here](https://web.archive.org/web/2019/https://www.prisma.io/blog/reusing-and-composing-graphql-apis-with-graphql-bindings-80a4aa37cff5/)).

At Artetecha, we have been using PostGraphile for a while, which we find an amazing product. We actually wanted to integrate it in our own [Apollo](https://www.apollographql.com/)-based GraphQL server, and we decided to mimic Prisma’s original approach, and wrote a very basic implementation of GraphQL binding, quite boringly called [basic-binding](https://github.com/artetecha/basic-binding). This is by no means feature-rich and it might indeed require some more work. But it works for, well, the basic, and it’s general enough to be used with other GraphQL servers, too.

The package comes with [an example](https://github.com/artetecha/basic-binding/tree/master/examples/postgraphile) for PostGraphile.

### More about PostGraphile

Unlike other similar products out there, Benjie Gillam, PostGraphile’s maintainer, has so far strived to keep the FOSS spirit front and centre. Benjie’s very dedicated to PostGraphile, and that’s why he has a [Patreon page](https://www.patreon.com/benjie) to support his work. PostGraphile is currently regularly supported by a variety of sponsors (including Artetecha), small or big. Also, PostGraphile’s features and enhancements often come from direct sponsorship by a company that required them. The model has worked so far and [has taken PostGraphile](https://medium.com/@Benjie/how-i-made-postgraphile-faster-than-prisma-graphql-server-in-8-hours-e66b4c511160) where [people did not think possible](https://twitter.com/jbaxleyiii/status/1065726114205712384).

What’s really distinctive about PostGraphile is how heavily you can leverage PostgreSQL; which, if your data is expected to be stored in database for the most part, is very good news. To see why that is, I suggest [you watch this](https://www.youtube.com/watch?list=PLVSuvWb4Q2Y7oxwvpzlwFxAO6IbIjMDgB&v=XDOrhTXd4pE). Also, for an introduction, you may want to watch [this (older) video](https://www.youtube.com/watch?v=b3pwlCDy6vY) by former maintainer [Caleb Meredith](https://twitter.com/calebmer).

### More from us about PostGraphile

  * We’ve built [Grizzly](https://github.com/britishcouncil/grizzly) for one of our clients. It supports PostGraphile. Go and check what it does. 
  * We have our own [inflection rules](https://github.com/artetecha/postgraphile-artetecha-inflector) for PostGraphile. Of course, it’s a plugin.

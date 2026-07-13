---
title: 'Docker Compose “links” and Lando'
description: 'Using a Docker Compose override in Lando to restore container links after an upgrade broke inter-service hostname resolution.'
pubDate: 2018-02-28
tags: ['devops']
originalUrl: '/docker-compose-links-and-lando/2018/02/28/'
---

Once upon a time, there existed [release](https://github.com/lando/lando/releases) `3.0.0-beta.36` of [Lando](https://docs.devwithlando.io/). I downloaded it straightaway, and kept using it since. Some time later I found out that `3.0.0-beta.36` had been pulled soon after its official release, due to it breaking things for most of those who had installed it. Not for me or my team-mates, for that matter: it worked (and still works) just fine for us.

Nonetheless, we eventually came to the conclusion that it was probably not a good idea to depend on a no-longer-existing release that had been withdrawn because it broke most of the Lando projects out there. However, at this point we still thought we required the new [networking](https://docs.devwithlando.io/config/networking.html) stuff that is still not available in `3.0.0-beta.35` . So, I had to try and find another way to achieve similar results.

Thankfully, [Dustin LeBlanc](https://dustinleblanc.com/) was there to help, and we eventually landed on [Links](https://docs.docker.com/compose/networking/#links) for Docker Compose. Since Lando allows you to inject overrides, thus opening up to most of what one can do with bare Docker Compose, I was able to implement that. And quite quickly, too.

### Implementing Links in Lando overrides

This below is an extract of the Lando configuration file I am using in a project, where we have three NodeJS services. One of these, Panda, is an API server, and the other two are consumers of this API.

```yaml
name: zoo

proxy:
  panda:
    - panda.lndo.site
  puma:
    - puma.lndo.site
  rhino:
    - rhino.lndo.site
    - '*.rhino.lndo.site'

services:
  panda:
    type: node:8.9
    build:
      - "cd /app/panda && npm install"
    command: cd /app/panda && npm run dev
    overrides:
      services:
        environment:
          PORT: 80
  
  puma:
    type: node:8.9
    build:
      - "cd /app/puma && npm install"
    command: cd /app/puma && npm run dev
    overrides:
      services:
        environment:
          PORT: 80
        links:
          - "panda:panda.lndo.site"

  rhino:
    type: node:8.9
    build:
      - "cd /app/rhino && npm install"
    command: cd /app/rhino && npm run dev
    overrides:
      services:
        environment:
          PORT: 80
        links:
          - "panda:panda.lndo.site"
```

What we needed was to make sure that the other two services had access to the API server. Now, admittedly, in Lando `beta.35` this was already possible (though I did not realise that until later), albeit in a way that is different to how it is done in `beta.36`.

[With the latter](https://docs.devwithlando.io/config/networking.html), a service named `panda` in a Lando application named `zoo` would get two domains associated with its IP on the private network (that is, the network that links all the containers): `panda` and `panda.zoo.internal`. What I later found out is that in `beta.35` the service would still just get the `panda` domain on the internal network. Thus, we could have used that.

However, along the way I wanted to achieve something else: I wanted the domain the service is associated with on the external network (that is, the network between the container and the host machine) to also be the same domain with which the service would be known to the other containers on the internal network. In a nutshell, I wanted the same domain to resolve to a different IP depending on whether the request was coming from within the container’s internal network or the its external network.

That’s where _Links_ came in, and the configuration above should be self-explanatory in that regard.

### Limitations

As far as I know, within Lando I can easily make a network link of one service to another only if these services are all part of the same Lando app. The improved networking in `beta.36` (and in all future releases of Lando, as far as I understand) will provide a comprehensive internal networking that cuts across all services, even if belonging to different Lando apps (and I know that because that was our old set up when we were using `beta.36`). Nonetheless, so far the domains configured for the external networks are kept separate from those set up for the internal network. Links work with `beta.36` too, but like I said, you can only link services within the same Lando app, at the moment.

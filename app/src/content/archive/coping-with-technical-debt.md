---
title: 'Coping with Technical Debt'
description: 'A classification of healthy and unhealthy technical debt, with practical advice on managing it via Scrum, preventing it with code review, and communicating it to stakeholders.'
pubDate: 2012-04-03
tags: ['software-engineering']
originalUrl: '/coping-with-technical-debt/2012/04/03/'
---

Technical Debt is something whose repercussions are underestimated more often than not. Without managing and/or preventing technical debt in your project, you could soon end up with a codebase that is no longer maintainable/extendable. It is not much different to taking care of your own car. You can probably reach your destination 15000KM away without much maintenance, but it's quite sure you are not going to get back home afterwards. Surely, not with the same car. Well, the same could happen to your project. You can probably rush towards a release, take on all sorts of technical debts, but is your product then going to be able to sustain you along the path of making money out of it? And most important, are you going to be able to pay off your technical debt later on?

### Managing or preventing?

Not all the technical debt can be managed. Some need to be prevented, i.e. we need to make sure we never take it on. The type of debt we need to avoid taking on is called *unhealthy debt*. The one that you can understand, track and manage is fine, as long as there is a reason for it; this kind of debt is referred to as *healthy debt*. To better understand what debts are healthy and what are not, we need a brief classification of the types of technical debt.

### Types of Technical Debt

The two main classes of Technical Debt are

- Unintentional Technical Debt (UTD)
- Intentional Technical Debt (ITD)

UTD is mainly the result of doing a poor job. It was not planned, not accounted for. Many could be the sources of it (junior developers, contractors not following the internal standards, a codebase acquired by a third party, etc.), just one the result: bad code and bad design. ITD is planned, instead: you decide to go for a *quick and dirty* solution to get a specific release out (short-term ITD), or that you won’t need your application to have feature *XYZ* for a few years, so you keep it down below the [product backlog](https://en.wikipedia.org/wiki/Scrum_(development)#Product_Backlog) until strictly required (long-term ITD). Short-term ITD can also be "focused" (one single clear shortcut taken by design) or "unfocused" (many tiny shortcuts here and there due a general planned rush). All kinds of ITD, except unfocused short-term ITD, **are trackable** and one can schedule when to pay it off: this is the **healthy debt** I mentioned earlier. UTD and unfocused short-term ITD **are not trackable** and hard to be detected and paid off: this is the **unhealthy debt** we already mentioned.

### Managing the healthy debt

One can either track the healthy debt via [Scrum](https://en.wikipedia.org/wiki/Scrum_(development)) user stories or create a dedicated backlog in a bug-tracking system and put alarms on debts unpaid for longer than *X* days. Personally, I believe the latter makes the mistake of separating the technical debt from the product it belongs to. When using Scrum to manage your healthy debt, you create a story any time you decide to take on some technical debt. This story then goes into the product backlog and its priority, business value and size are worked out by the joint effort of Product Owner and Development Team. Usually, you'll see high priorities for short term ITD, and low priorities for long term ITD. This method allows to detect much more easily the changes in the priorities assigned to the "debt stories" as well as when the business is trying and neglecting the debt (repeated deprioritisation of "debt stories", etc.).

### Preventing the unhealthy debt

The unhealthy debt can have different sources, like I said: third party acquisition, plugins, third party contributions, poor developers, etc. Since we don't really know where it'd be coming from next time, it's important to have a single point of control where everything must pass through, whether it's code produced within your team who follows your best practices, or it's coming from somewhere else. That single point of control must be the [code review process](https://en.wikipedia.org/wiki/Code_review). Everything must be peer-reviewed before going in to the mainline code repository. Of course, code reviewing is not the only tool or process to be used. It must be included in a Continuous Building and Integration system where we also have:

- Strict coding standards;
- Test driven development, with tests at all level, from unit to system testing;
- QA;
- Code sniffers;
- etc.;

### Reporting to and communicating with stakeholders

Reporting technical debt to stakeholders is a matter of making the debt actually visible. Most of the time, in fact, the issue is that technical debt is not as visible as financial debt, so it’s easier to ignore it. So, how do you make the (healthy) technical debt more visible? Simply by exposing it through management, like explained in the previous paragraphs. The other challenge in communicating the debt to the stakeholders is the "language". Some tips for the development teams are:

- **Discuss technical debt in terms of money**, not in term of features. For instance: «We are currently spending 2 million pound a year to service our TD; best to pay it off now and save money later»;
- **Technical debt discussions are an ongoing dialog**, not a one-off chat;
- **Communicate the difference between healthy and unhealthy debt.** Healthy debt usually comes from good business decisions; unhealthy debt comes from poor technical quality and **it costs lots of money**. This will make the stakeholders understand why **unhealthy debt needs to be prevented** with apparently expensive processes like the one listed in the previous paragraph.

### When to act?

So, «what alarm bells trigger action?». A possibly non-comprehensive list of alarm bells, in sparse order:

- lack of code reviews;
- lack of strict coding standard;
- lack of testing;
- lack of QA;
- sudden or rapid increment in the number of features (stories) that require a long-term debt to be paid off sooner than expected;
- sudden or rapid increment in the number of features (stories) that will increase the “interests” on long-term debts, i.e. that will make harder to pay them off;
- repeated deprioritisation of “debt stories”;
- complete lack of debt management/debt tracking process;
- too much pressure from the business to postpone investigation to detect the presence of inherited unhealthy debt (e.g. inhering by acquiring a third-party company);
- high debt ratio, i.e. the time spent on “servicing the debt” (maintenance, fixes, etc.) is far greater than the time spent adding new functionalities.

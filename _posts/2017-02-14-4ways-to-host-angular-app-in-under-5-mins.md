---
layout:     post
title:      "4 ways to host your angular app in under 5 minutes"
date:       2017-02-14 12:00:00
comments: true
post-img: "nghost.png"
description: 4 modern ways to deploy your Angular application in 5 minutes or less
permalink: /4ways-to-host-angular-app-in-under-5-mins/
path: 2017-02-14-4ways-to-host-angular-app-in-under-5-mins.md
tags: [angular, angularcli,gh-pages,now,netlify,surge.sh,host]
sitemap:
    priority: 0.9
    changefreq: 'weekly'
    lastmod: 2017-02-25T09:13:30-06:00
---
From the time I started learning and playing with Angular2+ last year, I've been using AngularCLI for building projects. I like the packed features from creating a new project from a blank folder to hosting the same in gh-pages. You can do all these without leaving command line *(integrated terminal is available in most of the modern editors)*.

In the latest version of AngularCLI, support for `ng github-pages:deploy` has been dropped. Somehow I couldn't get the suggested alternative option working. So I set out to explore other options that are as simple as `ng github-pages:deploy`.

In this tutorial, I'm presenting the 4 simple ways to host your app in under 5 mins *(or less)* from the comfort of your command line.

1. gh-pages
2. now
3. surge.sh
4. netlify

> This tutorial assumes you have a simple angular project you would want to host. I'm using the `fake-rest-api` project created in previous tutorial. You can follow that article from [here](/fake-api-for-angular-2+-during-development-using-angularcli). 
> You should have the project ready and committed to `master` branch. 

### Initial Setup

From the root of the project (`fake-rest-api` in this case), run the following command from terminal.

{% highlight bash %}
  ng build 
{% endhighlight %}

This command would generate a folde named `dist` which is what we would be hosting.

> Delete the line `/dist` from `.gitignore` file.

### Deploy to `gh-pages`
Follow below steps to get the generated project hosted into `gh-pages`.

{% highlight bash %}
  git add dist
  git commit -m "checking in dist folder"
  git subtree push --prefix=dist origin gh-pages 
{% endhighlight %}

Go to `https://<username>.github.io/fake-rest-api/` to check the deployed app.

> Like me, you might hit some 404 errors when you launch the app from browser. To fix that, update `<base href="/">` to `<base href="./">` in your `index.html`.

Here is how my `index.html` file looks like after making this change.

{% highlight html%}
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>FakeRestApi</title>
    <base href="./">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
  </head>
  <body>
    <app-root>Loading...</app-root>
  </body>
  </html>
{% endhighlight%}

Redo the below steps once again and the app should now work perfectly fine.

{% highlight bash %}
  ng build
  git add dist
  git commit -m "checking in dist folder"
  git subtree push --prefix=dist origin gh-pages 
{% endhighlight %}

Below is the view you would see in the browser.

<img src="{{ site.baseurl }}/img/posts/fake-rest-api.png" alt="Fake REST API" class="img-responsive">

> `gh-pages` might take 5-10 mins to get the changes. So check back after few minutes. We can look at other options in the meantime.

### Deploy to `now`

`now` helps us to host our app quickly. Go to [https://zeit.co/now](https://zeit.co/now) to know more about `now`. Run below commands from your terminal.

{% highlight bash %}
  yarn global add now
  now
{% endhighlight %}

> Alternatively you can use `npm install -g now` as well.

Deployed app is available at [https://fake-rest-api-mujluuhuqy.now.sh](https://fake-rest-api-mujluuhuqy.now.sh).

> Every time you deploy a project, now will provide you with a new, unique URL (even before the upload has finished). These URLs will look like this (my-app is your automatically determined application name): my-app-erkgfjtrna.now.sh.

> When it's time to take your deployment to production, you simply pick an appropriate alias (a custom domain).

### Deploy to `surge.sh`

`surge` is a host for static web publishing from command line. Our angular app distribution package `dist` is a set of static files. We can deploy the app to `surge` in few steps as below. You can learn more about `surge` from [http://surge.sh](http://surge.sh).

{% highlight bash %}
  yarn global add surge
  cd dist
  surge
{% endhighlight %}

> Use `npm install -g surge` as an alternate.

App is deployed to [http://fine-zinc.surge.sh](http://fine-zinc.surge.sh).

### Deploy to `netlify`

Netlify helps in deploying frontend apps with ease. Know more about the platform from [https://www.netlify.com](https://www.netlify.com). Netlify offers both GUI as well as CLI for deploying the code. We would look at the CLI option in this tutorial. Execute below commands from dist folder (`fake-rest-api\dist`) to keep the project size to a minimum.

{% highlight bash %}
  yarn global add netlify-cli
  cd dist
  netlify deploy
{% endhighlight %}

> You can also use `npm install netlify-cli -g` as well to get the cli installed globally.

Type `Yes` for the question `? No site id specified, create a new site` and press enter for the question `? Path to deploy?`. You'll see a permalink to the hosted app.

For this deployment the URL is [http://58a27d58c4d9cc7292b8b74a.typesetter-antelope-50404.netlify.com](http://58a27d58c4d9cc7292b8b74a.typesetter-antelope-50404.netlify.com)

You also get a last build URL where you can go later and upgrade to paid plan, provide custom domain etc.

> Site password protection is available only in paid plans.

That's it for this tutorial. There are a lot more hosting options available but for my needs to keep something simple during development, I wanted something that I can run from command line.

> If you want to integrate these commands to your local deployment workflow, you can add those in the `package.json` file under `scripts` section. I have covered this briefly in my previous [tutorial](/fake-api-for-angular-2+-during-development-using-angularcli). Let me know in comments below if you want a separate article for that.

*Disclaimer* I'm not affiliated to any of the above mentioned services and views expressed here are my own.
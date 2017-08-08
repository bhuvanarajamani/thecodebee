---
layout:     post
title:      "Using Yarn in Angular CLI project"
date:       2017-03-02 12:00:00
comments: true
post-img: "yarn.png"
description: Using Yarn in Angular CLI project
permalink: /using-yarn-with-angular-cli/
path: 2017-03-02-using-yarn-with-angular-cli.md
tags: [angular, angularcli,yarn]
read_time: true
sitemap:
    priority: 0.9
    changefreq: 'weekly'
    lastmod: 2017-03-02T09:13:30-06:00
---

Yarn is the new package manager and is gaining popularity over npm as default package manager. I have been using yarn for around 2 months now. During my app development using Angular CLI, I had to use the default package manager during new app creation after which I was switching to yarn for rest of my development cycle. I couldn't be more happier when I read about the tweet saying we can set yarn as default package manager for Angular CLI (starting beta 31) .

Go to [official yarn page](https://yarnpkg.com/) to learn more.

In this post, I'm going to cover how to install yarn, set yarn as default package manager for Angular CLI and some handy commands.

### 1. Install Yarn

Since you could be already using npm as the current package manager, you can simply install yarn using below. Alternatively, there are lot of new ways to install yarn according to your OS.

{% highlight bash %}
    npm install --global yarn
{% endhighlight %}

### 2. Setting Yarn as default package manager for Angular CLI

After upgrading to latest Angular CLI and before scaffolding any new projects, run below command to set yarn as the default package manager for Angular CLI.

{% highlight bash %}
    ng set --global packageManager=yarn
{% endhighlight %}

### 3. When you don't want to set yarn as default package manager but want to use it...

In case you've not made up your mind to use yarn as default package manager for all furture apps, you can use below steps to still use yarn.

{% highlight bash %}
    ng new ngcli-project --skip-install
    cd ngcli-project
    yarn
{% endhighlight %}

This way, you can skip npm install during scaffolding and then use `yarn` to install packages.

### 4. Adding a dependency

You can add latest version of a package or mention a specific version or tag for the intended package.

{% highlight bash %}
    yarn add [package]
    yarn add [package]@[version]
    yarn add [package]@[tag]
{% endhighlight %}

This will  update your package.json and your yarn.lock files which gets checked into your version control system. That way, other developers working on the project will get the same dependencies as you when they run `yarn` or `yarn install`.

In order to add a package as a development dependency, you can use `--dev` or `-D` flag next to the add package command. Simply put, use below.

{% highlight bash %}
    yarn add [package] --dev
    yarn add [package]@[version] -D
    yarn add [package]@[tag] --dev
{% endhighlight %}

### 5. Upgrading a dependency

You may want to upgrade the packages while you progress on your app. To do that use `upgrade` command like below.

{% highlight bash %}
    yarn upgrade [package]
    yarn upgrade [package]@[version]
    yarn upgrade [package]@[tag]
{% endhighlight %}

Alternatively, if you want to upgrade all the packages to their respective latest versions based on the range you've specified in `package.json` by below command.

{% highlight bash %}
    yarn upgrade
{% endhighlight %}

### 6. Removing a dependency

During refactoring process, if you find unused packages that needed to be removed, you can use `remove` command as below.

{% highlight bash %}
    yarn remove [package]
{% endhighlight %}

> When you remove a package using this command, it is removed from all types of dependencies and hence you don't need to mention any additinal flags.

### 7. Install all the dependencies of a project

When you clone from an existing repo and want to install all packages, you can use `yarn install` or simply `yarn`.

{% highlight bash %}
    yarn
{% endhighlight %}

or 

{% highlight bash %}
    yarn install
{% endhighlight %}

### 8. Serving the Angular CLI project

You might be using `ng serve` so far to serve your angular `@angular/cli` app. After you've moved to `yarn`, you can use `yarn start` to serve your app.

{% highlight bash %}
    yarn start
{% endhighlight %}

Also, you can use `run` command like:

{% highlight bash %}
    yarn run
{% endhighlight %}

which prompts user to select the script like `start`, `e2e` etc.

or 

{% highlight bash %}
    yarn run start
{% endhighlight %}

in order to run the start script.

### 9. BONUS - Why is there a `yarn.lock` file?

After every add, upgrade, remove or install, yarn updates the contents of `yarn.lock` file.

According to official website:

> In order to get consistent installs across machines, Yarn needs more information than the dependencies you configure in your package.json. Yarn needs to store exactly which versions of each dependency were installed.

> To do this Yarn uses a yarn.lock file in the root of your project. 

So, it is a good practice to add the lock file to the source code repository.

### 10. Links

For full list of yarn command line options, go to [Yarn CLI](https://yarnpkg.com/en/docs/cli/).


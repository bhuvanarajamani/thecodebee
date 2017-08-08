---
layout:     post
title:      "Simple steps to add Font Awesome, jQuery and Bootstrap4 to an AngularCLI project"
date:       2017-04-02 12:00:00
comments: true
post-img: "ngdesign.png"
description: Simple steps to add Font Awesome, jQuery and Bootstrap4 to an Angular4 AngularCLI project
permalink: /simple-steps-to-add-font-awesome-jquery-and-bootstrap4-support-to-angulai4-cli-project/
path: simple-steps-to-add-font-awesome-jquery-and-bootstrap4-support-to-angulai4-cli-project.md
tags: [angular4, angularcli,bootstrap4,jquery,font-awesome,yarn]
read_time: true
sitemap:
    priority: 0.9
    changefreq: 'weekly'
    lastmod: 2017-04-02T09:13:30-06:00
---

This is a 'How-To' post where I'll walkthrough how you can set up some design defaults for your angular application. I'll be using bootstrap4 and font-awesome to get the basic good looking design for design challenged people like me *(or someone who's built their expertise in Bootstrap)*.

If you want to grab the source code alone, you can get it from the [repo](https://github.com/thecodebee/ng-design).

### 1. Scaffold a new app using Angular CLI

Let's start with the very first step by scaffolding a new app using Angular CLI.

{% highlight bash %}
    ng new ng-design
{% endhighlight %}

### 2. Start the project

Once you scaffold the app, you can start the app using yarn command below.

{% highlight bash %}
    yarn start
{% endhighlight %}

App should be running at `http://localhost:4200`

### 3. Install dependencies

Now that we have the basic app scaffold ready, let's start adding the dependencies.

#### 3a. Bootstrap

We would be using the latest version of Bootstrap which is Bootstrap4. You can find more information about Bootstrap4 [here](https://v4-alpha.getbootstrap.com).

{% highlight bash %}
    yarn add bootstrap@next
{% endhighlight %}

#### 3b. Font Awesome

I love font-awesome as it provides simple and clean icons that would give a rich look to the website.

{% highlight bash %}
    yarn add font-awesome
{% endhighlight %}

### 4. Set sass as default css processor (optional)

We would be using scss files for bootstrap and font-awesome. So, in case you want to add some custom styles, scss is a good choice here and AngularCLI supports it with one line of update.  

{% highlight bash %}
    ng set defaults.styleExt scss
{% endhighlight %}

This overwrites the defaults section in `.angular-cli.json`

{% highlight json %}
    "defaults": {
        "styleExt": "css",
        "component": {
        }
    }
{% endhighlight %}

to 

{% highlight json %}
    "defaults": {
        "styleExt": "scss",
        "component": {
        }
    }
{% endhighlight %}

### 5. Add dependencies to `.angular-cli.json`

Now that we have the packages installed, let's update the configuration to enable AngularCLI to reference these packages.

### 5a. Styles

Add `bootstrap.scss` and `font-awesome.scss` to styles array.

{% highlight json %}
    "styles": [
        "../node_modules/bootstrap/scss/bootstrap.scss",
        "../node_modules/font-awesome/scss/font-awesome.scss",
        "styles.css"
    ]
{% endhighlight %}

### 5b. Scripts

Add `jquery.js`, `tether.js` and `bootstrap.js` to scripts array in the order below. Jquery is used for toggles, modals etc. and tether is used for absolute positioning of some elements.

{% highlight json %}
    "scripts": [
        "../node_modules/jquery/dist/jquery.js",
        "../node_modules/tether/dist/js/tether.js",
        "../node_modules/bootstrap/dist/js/bootstrap.js"
    ]
{% endhighlight %}

### 6. UI changes to check how our basic setup works

Add below code snippet to `app.component.html`. This would create a basic navigation bar with few navigation elements.

{% highlight html %}
    <nav class="navbar navbar-toggleable-md navbar-inverse bg-primary">
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand" href="#">
        Angular4 app with AngularCLI to use Bootstrap4 and Fontawesome
        <i class="fa fa-bolt" aria-hidden="true"></i>
    </a>
    <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
            <a class="nav-link" href="#">
            <i class="fa fa-home" aria-hidden="true"></i>
            Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">
            <i class="fa fa-info-circle" aria-hidden="true"></i>
            About</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">
            <i class="fa fa-envelope" aria-hidden="true"></i>
            Contact</a>
        </li>
        </ul>
    </div>
    </nav>
{% endhighlight %}

### 7. App screenshot

By just adding Bootstrap & Font Awesome, we got a clean decent looking UI as seen by the screenshot below.

<img src="{{ site.baseurl }}/img/posts/bootstrap_fontawesome.png" alt="Bootstrap Fontawesome" class="img-responsive">

### 8. Links

* [Source Code Repo](https://github.com/thecodebee/ng-design)
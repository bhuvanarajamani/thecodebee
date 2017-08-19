---
layout:     post
title:      "Using Semantic UI in angular app"
date:       2017-08-18 12:00:00
comments: true
post-img: "angular-semantic.png"
description: Using Semantic UI in angular app
permalink: /using-semantic-ui-in-angular-app/
path: using-semantic-ui-in-angular-app.md
tags: [angular, angularcli, semantic-ui, css-framework]
read_time: true
toc: true
sitemap:
    priority: 0.9
    changefreq: 'weekly'
    lastmod: 2017-08-18T09:13:30-06:00
---
In this post, let's see how we can enable Semantic UI in an Angular application.

{% include toc.html %}

### What is Semantic UI?
Semantic is a UI component framework based around useful principles from natural language. 

Let's get started.

### Scaffold a new app using Angular CLI

Let's start with the very first step by scaffolding a new app using Angular CLI.

```bash
ng new ng4semantic
```

### Start the project

Once you scaffold the app, you can start the app using yarn command below.

```bash
ng serve
```

Your app should be running at `http://localhost:4200`

### Install dependencies

Now that we have the basic app scaffold ready, let's start adding the dependencies. We need to add semantic and jquery.

```bash
npm install semantic-ui-css jquery --save
```

### Update .angular-cli.json

Now that we have the dependent packages installed, let's update the configuration to enable AngularCLI to reference these packages.

#### Styles

Add `semantic.scss` to styles array.

```json
"styles": [
    "styles.css",
    "../node_modules/semantic-ui-css/semantic.css"
    ]
```

#### Scripts

Add `jquery.js` and `semantic.js` to scripts array in the order below.

```json
"scripts": [
    "../node_modules/jquery/dist/jquery.js",
    "../node_modules/semantic-ui-css/semantic.js"
    ]
```

> Note: You need to stop and start the angular app as we've updated configuration in .angular-cli.json.

### Add few Semantic UI components

Let's check if the setup works by adding few Semantic UI components.

```html
<div class="ui center aligned container">
  <h2 class="ui icon header">
    <i class="settings icon"></i>
    <div class="content">
      Account Settings
      <div class="sub header">Manage your account settings and set e-mail preferences.</div>
    </div>
  </h2>
</div>
<div class="ui raised very padded text container segment">
  <h2 class="ui header">Sample header</h2>
  <p>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus vitae repellendus repellat beatae sit molestiae tempora quod. Expedita unde perferendis at, delectus nihil recusandae facilis earum consequatur exercitationem corrupti ea?
  </p>
</div>
<div class="ui center aligned container">
  <div class="ui link cards">
    <div class="ui centered card">
      <div class="image">
        <img src="https://semantic-ui.com/images/avatar2/large/kristy.png">
      </div>
      <div class="content">
        <a class="header">Kristy</a>
        <div class="meta">
          <span class="date">Joined in 2013</span>
        </div>
        <div class="description">
          Kristy is an art director living in New York.
        </div>
      </div>
      <div class="extra content">
        <a>
          <i class="user icon"></i>
          22 Friends
        </a>
      </div>
    </div>
  </div>
</div>
```

### App screenshot

With the help of Semantic UI, we got a nice looking UI as seen by the screenshot below. Explore more by adding other components as needed by your app.

<img src="{{ site.baseurl }}/img/posts/angular-semantic-app.png" alt="Angular Semantic App" class="img-responsive">

### Links
* [Source Code Repo](https://github.com/thecodebee/ng4semantic)
* [Hosted App](https://thecodebee.com/ng4semantic/)
* [Semantic UI](https://semantic-ui.com)
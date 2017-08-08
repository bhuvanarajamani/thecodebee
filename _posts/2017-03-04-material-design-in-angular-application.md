---
layout:     post
title:      "Material Design in Angular Application"
date:       2017-03-04 12:00:00
comments: true
post-img: "material.jpg"
description: Google Material Design in Angular Application using Angular Material
permalink: /material-design-in-angular-application/
path: 2017-03-04-material-design-in-angular-application.md
tags: [angular, angularcli,material design,angular-material]
read_time: true
sitemap:
    priority: 0.9
    changefreq: 'weekly'
    lastmod: 2017-03-04T09:13:30-06:00
---
In this blog post, let's see how to add material design to your angular application.

Follow the step-by-step process below to accomplish that goal.

If you want to grab the source code alone, you can get it from the [repo](https://github.com/thecodebee/material-app).

### 1. Scaffold a new app using Angular CLI

{% highlight bash %}
    ng new material-app
{% endhighlight %}


### 2. Add Angular Material package

{% highlight bash %}
    yarn add @angular/material
{% endhighlight %}

### 3. Add Hammer for touch support

{% highlight bash %}
    yarn add hammerjs
{% endhighlight %}

### 4. Add `hammerjs` to `.angular-cli.json`

{% highlight json %}
    "scripts": [
        "../node_modules/hammerjs/hammer.min.js"
    ],
{% endhighlight %}

Restart the app as we've made an update to `.angular-cli.json`.

### 5. CSS updates to import material icons and pre-built themes

In the `style.css` add following lines.

{% highlight css %}
    @import '~https://fonts.googleapis.com/icon?family=Material+Icons';
    @import '~@angular/material/core/theming/prebuilt/purple-green.css';
{% endhighlight %}

### 6. Update App Module

Import the `MaterialModule` and add the same under `imports` dependencies in your `app.module.ts`. Below is the full `app.module.ts` after making necessary updates.

{% highlight javascript %}
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

{% endhighlight %}

### 7. Add material components to the UI

Now that we have all the pre-requisites set, let's start adding some UI components to our app template and see how it appears in the browser.

To get the content, let's add an array of objects to the component and iterate the same in UI. See the component files below.

> app.component.ts

{% highlight javascript %}
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  quotes = [
    {
      saying: "If you don't like how things are, change it! You're not a tree.",
      author: "Jim Rohn"
    },
    {
      saying: "If you are not willing to risk the unusual, you will have to settle for the ordinary.",
      author: "Jim Rohn"
    },
    {
      saying: "Discipline is the bridge between goals and accomplishment.",
      author: "Jim Rohn"
    },
    {
      saying: "Take care of your body. It's the only place you have to live.",
      author: "Jim Rohn"
    },
    {
      saying: "If you really want to do something, you'll find a way. If you don't, you'll find an excuse.",
      author: "Jim Rohn"
    },
    {
      saying: "Happiness is not something you postpone for the future; it is something you design for the present.",
      author: "Jim Rohn"
    },
    {
      saying: "Affirmation without discipline is the beginning of delusion.",
      author: "Jim Rohn"
    }
  ];
}

{% endhighlight %}

> app.component.html

{% highlight html %}
<div>
  <md-toolbar color="primary">
    <span>Angular App using Material Design</span>
    <span class="app-toolbar-filler"></span>
    <button md-raised-button color="accent">LOGIN</button>
  </md-toolbar>
  <div class="app-component">
    <md-grid-list cols="3" rowHeight="100px">
      <md-grid-tile *ngFor="let quote of quotes">
        <md-card>
          <md-card-content>{{quote.saying}}
            <span class="author">
              {{quote.author}}
            </span>
          </md-card-content>
        </md-card>
      </md-grid-tile>
    </md-grid-list>
  </div>
</div>
{% endhighlight %}

### 8. Additional styles
I've added some minimum style to style.css

{% highlight css %}
@import '~https://fonts.googleapis.com/icon?family=Material+Icons';
@import '~@angular/material/core/theming/prebuilt/purple-green.css';

body {
  margin: 0;
  font-family: Roboto, sans-serif;
}

.app-content {
  padding: 20px;
  margin: 5px 5px 5px 5px;
}

md-toolbar-row {
  justify-content: space-between;
}

.author {
  font-style: italic;
  font-size: 12px;
}

* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
{% endhighlight %}

### 9. App screenshot

<img src="{{ site.baseurl }}/img/posts/material-app.png" alt="Material App Demo" class="img-responsive">

### 10. Links

* [Source Code Repo](https://github.com/thecodebee/material-app)
* [Demo App](https://thecodebee.github.io/material-app/)
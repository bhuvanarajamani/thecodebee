---
layout:     post
title:      "How to create a simple Tic-Tac-Toe game using Angular with the help of Angular CLI - Part 1"
date:       2017-08-09 12:00:00
comments: true
post-img: "tictactoe.png"
description: How to create a simple Tic-Tac-Toe game using Angular with the help of Angular CLI - Part 1
permalink: /how-to-create-a-simple-tic-tac-toe-game-using-angular-with-the-help-of-angular-cli-part1/
path: how-to-create-a-simple-tic-tac-toe-game-using-angular-with-the-help-of-angular-cli-part1.md
tags: [angular, angula-cli,game,tic-tac-toe]
read_time: true
toc: true
sitemap:
    priority: 0.9
    changefreq: 'weekly'
    lastmod: 2017-08-09T09:13:30-06:00
---

In this series, let's see how to create the popular game Tic-Tac-Toe in Angular with the help of Angular CLI. 

This game is equivalent to a To-Do list app which has now become the de-facto standard for getting started in any new web framework. While learning and building projects using Angular, I was thinking if I could create a simple game with the framework. This is an attempt of accomplishing that goal. The core game logic is simple which allows us to focus on other aspects of the framework.

{% include toc.html %}

### Initial Setup

We would be building the game using Angular CLI and host it from `gh-pages`. For this article, we'll be using `@angular/cli: 1.0.0`. 
> We would be using Angular 4 for this series. 

#### Install Angular CLI

Install Angular CLI by running below command.

```bash
  npm install -g @angular/cli
```

> Use `sudo npm install -g @angular/cli` if you have any issues during installation. 

#### Install Yarn

Since you could be already using npm as the current package manager, you can simply install yarn using below. Alternatively, there are lot of new ways to install yarn according to your OS.

```bash
npm install --global yarn
```

#### Setting Yarn as default package manager for Angular CLI

After upgrading to latest Angular CLI and before scaffolding any new projects, run below command to set yarn as the default package manager for Angular CLI.

```bash
ng set --global packageManager=yarn
```

#### Scaffold new Angular project using AngularCLI

As this tutorial is about building Tic Tac Toe game, let's name our project accordingly. Run this in a folder where you would want to create your project.

```bash
ng new ng-tic-tac-toe
```

#### Set sass as default css processor

We would be using scss files for bootstrap and font-awesome. So, in case you want to add some custom styles, scss is a good choice here and AngularCLI supports it with one line of update.  

```bash
cd ng-tic-tac-toe
ng set defaults.styleExt scss
```

This overwrites the defaults section in `.angular-cli.json`

```json
"defaults": {
    "styleExt": "css",
    "component": {
    }
}
```

to 

```json
"defaults": {
    "styleExt": "scss",
    "component": {
    }
}
```

#### Serving the project

```bash
yarn start 
```

App should be running at `http://localhost:4200/`.

### Design the layout

Now that we have the basic setup and scaffolding done, let's begin to design the game layout. The app layout will look like below.

<img src="{{ site.baseurl }}/img/posts/tic-tac-toe.png" alt="Tic-Tac-Toe" class="img-responsive">

As we're building this app using Angular, let's think the app layout in terms of various components that would make up this app. Below is the pictorial representation of the same.

<img src="{{ site.baseurl }}/img/posts/tic-tac-toe-layout.png" alt="Tic-Tac-Toe Layout" class="img-responsive">

Here are the design elements for this app.

1. **App title** => Text in the main `AppComponent` 
2. **Board** => New component to be created. 
* **Game status** will be a text in Board component
* **New Game** will be a button in Board component
3. **Cell** => New component to be created; that will be laid out within Board component

We'll start creating the components and apply styles in [Part2](/how-to-create-a-simple-tic-tac-toe-game-using-angular-with-the-help-of-angular-cli-part2).
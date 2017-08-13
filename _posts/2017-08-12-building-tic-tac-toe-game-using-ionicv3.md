---
layout:     post
title:      "Building a Tic Tac Toe game using Ionic V3"
date:       2017-08-12 12:00:00
comments: true
post-img: "angular-firebase.png"
description: Building a Tic Tac Toe game using Ionic V3
permalink: /building-tic-tac-toe-game-using-ionicv3/
path: building-tic-tac-toe-game-using-ionicv3.md
tags: [angular, ionicv3, tic-tac-toe, game]
sitemap:
    priority: 0.9
    changefreq: 'weekly'
    lastmod: 2017-08-12T09:13:30-06:00
---

## What is Ionic ?

Ionic is the top open source framework for building amazing mobile apps. It enables us to build native and progressive web apps using the web technologies. For more information, please refer to [ionic](https://ionicframework.com) website.

> For this tutorial, we would be using Ionic V3 which user Angular 4 as the underlying javascript framework.

{% include toc.html %}

### Install Ionic & Cordova

Assuming you already have nodejs installed, you can use the below command to install ionic & Cordova.

> Cordova - formerly called as Phone Gap is a platform to build Native Mobile Applicatons using web technology.

```bash
npm install -g cordova ionic
```

> If you see errors while installing, try `sudo npm install -g cordova ionic`.

If you already have ionic cli installed, you can check the version by below command.

```bash
ionic info
```

### Create an app from existing ionic template.

Team Ionic has made it very easy for developer who are getting started with building mobile apps using their framework. There are various starter templates. For this tutorial, we would be using the `tabs` template.

Let's create our app using:

```bash
ionic start ionic-tic-tac-toe tabs
```

Enter 'Y' for the question "? Would you like to integrate your new app with Cordova to target native iOS and Android? (y/N)"

### Serve the newly created app

Next, go to your newly created project using:

```bash
cd ./ionic-tic-tac-toe
ionic serve
```

This will launch the app in your default browser in `http://localhost:8100/`.App looks like below.

<img src="{{ site.baseurl }}/img/posts/ionic-default.png" alt="Ionic Default" class="img-responsive">

### Understanding the app

Open the generated code `ionic-tic-tac-toe` in your favourite editor. 

Generated app contains 3 tabs named Home, About & Contact. The source code for these are available under `src/pages/home`, `src/pages/about` & `src/pages/contact` respectively. Tab names are configured in `src/pages/tabs`

As a beginning, let's start making some minor changes and check how it appears in the browser.

Lets update the icon and page name for Home screen. To do this, open the tabs.html and update the `tabTitle` and `tabIcon` properties for first tab. Updated code looks like below.

```html
<ion-tabs>
  <ion-tab [root]="tab1Root" tabTitle="Game" tabIcon="game-controller-b"></ion-tab>
  <ion-tab [root]="tab2Root" tabTitle="About" tabIcon="information-circle"></ion-tab>
  <ion-tab [root]="tab3Root" tabTitle="Contact" tabIcon="contacts"></ion-tab>
</ion-tabs>
```

> You can refer to [Ion Icon Docs](https://ionicframework.com/docs/ionicons/) to learn about all available ionic icons.


### Getting started with the game

For most of the logic, layout and styling we would leverage the Angular Tic Tac Toe app built earlier. You can refer to the details [here](/how-to-create-a-simple-tic-tac-toe-game-using-angular-with-the-help-of-angular-cli-part1).

We would be mainly working on the `home` page.

> If you are coming from the Angular 2+ development background, Pages in Ionic is equivalent to Angular components.

### Styling game board and cell

We'll be reusing the styles from the Angular app mentioned above.

#### Import google fonts

We'll be using Dosis & Gochi Hand google fonts for this game. In order for that to be available globally, we need to update the `src/app/app.scss` as below.

```css
@import url(//fonts.googleapis.com/css?family=Dosis|Gochi+Hand:400italic,700italic,400,700);
```

#### Style for board & cell

Copy and paste below code to your `home.scss`.

```css
page-home {

  .board {
    background-color: #a45632;
    color: #fff;
  }

  .gameStatus {
    margin: 0px;
    padding: 15px;
    color: #34495e;
    font-family: 'Dosis', Helvetica, sans-serif;
    text-transform: uppercase;
    font-size: 5em;
    font-weight: bold;
    text-align: center;
  }
  
  .restart {
    background-color: #34495e;
    color: #fff;
    border: 0px;
    font-family: 'Dosis', Helvetica, sans-serif;
    font-size: 1.4em;
    font-weight: bold;
    margin: 0px;
    padding: 15px;
    width: 100%;
  }

  .restart:hover {
    background-color: #c1cdcd;
    cursor: pointer;
  }

  .cell {
    width: 100px;
    height: 100px;
    box-sizing: border-box;
    border: 3px solid #f4af78;
    font-size: 5em; 
    font-family: 'Gochi Hand', sans-serif;
    text-align: center;
  }
  
  .cell:hover {
    background-color: #c1cdcd;
  }
}

```

### Game board layout

As the game board is in the form of a 3x3 grid, we would be using  <ion-grid> component for that purpose. We'll also add the game status and a button to start a new game. Here is the full content for `home/html`.

```html
<ion-header>
  <ion-navbar>
    <ion-title>Home</ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <div class="gameStatus" >
      {{gameStatusMessage}}
  </div>
  <ion-grid class="board">
    <ion-row *ngFor="let row of [0,1,2]">
      <ion-col col-4 class="cell"
            *ngFor="let col of [0,1,2]"
            (click)="handleMove(col+row*3)"
            >
            {{squares[col+row*3]}}
      </ion-col>
    </ion-row>
  </ion-grid>
  <button class="restart" (click)="restartGame()">New Game</button>
</ion-content>
```

### Game Logic for handling move, deciding winner

Let's write the game logic for handling player move and deciding the winner. Again, refer to the Angular tutorial for more details on the logic. Copy and paste below code from below into your `home.ts`.

```js
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  squares = Array(9).fill(null);
  player = 'X';
  winner = null;

  constructor(public navCtrl: NavController) {

  }

  get gameStatusMessage(){
    return this.winner? `${this.winner} has won!` : 
    `${this.player}'s turn`;
  }

  handleMove(position) {
    if(!this.winner && !this.squares[position] ){
      this.squares[position] = this.player;
      if(this.winnigMove()) {
        this.winner = this.player;
      }
      this.player = this.player === 'X' ? 'O' : 'X';
    }
  }

  winnigMove() {
    const conditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // colums
      [0, 4, 8], [2, 4, 6]             // diagonal 
    ];
    for (let condition of conditions) {
        if ( this.squares[condition[0]]
            && this.squares[condition[0]] === this.squares[condition[1]]
            && this.squares[condition[1]] === this.squares[condition[2]]) {
              return true;
        }
    }
    return false;
  }

  restartGame() {
    this.squares = Array(9).fill(null);
    this.player = 'X';
    this.winner = null;
  }

}
```

### Completed app

Completed Ionic Tic Tac Toe should look like below:

<img src="{{ site.baseurl }}/img/posts/ionic-tic-tac-toe-app.png" alt="Ionic Tic Tac Toe" class="img-responsive">

### Testing for iOS / Android

For testing the ionic app in iOS / Android, you should have Xcode (in a Mac OS) & Android Studio along with the libraries that could be used from command line. Once we have the pre-requisites, we can add the ios & android platforms to our project.

```bash
ionic cordova platform add ios android
ionic cordova emulate ios
ionic cordova emulate android
```

### Source Code

Here is the github repo for Ionic Tic Tac Toe app source code [here](https://github.com/thecodebee/ionic-tic-tac-toe.git){:target="_blank"}.

### Progressive Web App

PWA version of this app is hosted in gh-pages [here](https://thecodebee.com/ionic-tic-tac-toe/).

> To learn how to host the Angular app in github, refer to my other post [here](/4ways-to-host-angular-app-in-under-5-mins)

---
layout:     post
title:      "How to create a simple Tic-Tac-Toe game using Angular with the help of Angular CLI - Part 2"
date:       2017-08-10 12:00:00
comments: true
post-img: "tictactoe.png"
description: How to create a simple Tic-Tac-Toe game using Angular with the help of Angular CLI - Part 2
permalink: /how-to-create-a-simple-tic-tac-toe-game-using-angular-with-the-help-of-angular-cli-part2/
path: how-to-create-a-simple-tic-tac-toe-game-using-angular-with-the-help-of-angular-cli-part2.md
tags: [angular, angula-cli,game,tic-tac-toe]
read_time: true
toc: true
sitemap:
    priority: 0.9
    changefreq: 'weekly'
    lastmod: 2017-08-10T09:13:30-06:00
---

Welcome to part 2 of building a Tic Tac Toe game using Angular. [Here](/how-to-create-a-simple-tic-tac-toe-game-using-angular-with-the-help-of-angular-cli-part1) is part 1 of the series.

{% include toc.html %}

### Create the components

We need to create 2 components, Board and Cell. Let's use AngularCLI commands to create those under presentation folder.

```bash
ng g component presentation/board
ng g component presentation/cell
```

For simplicity, let's rename the selectors from `app-board` to `board` and `app-cell` to `cell` and call the board from `AppComponent`. 
Below is the complete `app.component.html`.

```html
<div>
  <div class="main-app">
    <div>
      <h1>{{ title }}</h1>
    </div>
    <board></board>
  </div>
</div>
```

Let's update the value of title variable to 'Tic Tac Toe in Angular 4'. Below is the complete `app.component.ts`.

```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tic Tac Toe in Angular 4';
}

```

> As we would be using sass pre-processor, let's rename `app.component.css` to `app.component.scss` and update the reference in app.component.ts`.

### Styling the components

In order for the app to look pleasing, let's add some css to the components. 

#### app.component.scss
```css
@import url(//fonts.googleapis.com/css?family=Dosis|Gochi+Hand:400italic,700italic,400,700);

.main-app {
  margin: 0 auto;
  max-width: 300px;
  color: #34495e;
}
```

#### styles.css
```css
body {
  background-color: #fff;
  color: #fff;
  font-family: 'Dosis', Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0px;
}

h1 {
  text-transform: uppercase;
  font-weight: bold;
  font-size: 3em;
}
```

We would be using css flex layout for laying out the board and the cells on the board. Here are the scss files for board & cell.

#### board.component.scss

```css
.board {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  background-color: #a45632;
  color: #fff;
}

.gameStatus {
	margin: 0px;
	padding: 15px;
  background-color: #34495e;
  color: #fff;
  font-size: 1.4em;
  font-weight: bold;
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
```

#### cell.component.scss

```css
.cell {
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  border: 3px solid #f4af78;
  font-size: 5em; 
  font-family: 'Gochi Hand', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cell:hover {
	background-color: #c1cdcd;
}
```

### Laying out components

Now that we have defined the basic styles, let's start laying out the cells on the board. Updated `cell.component.html` looks like below.

```html
<div class="cell" ></div>
```

And we need to lay 9 cells in a 3x3 matrix within board component. Updated `board.component.html` is below.

```html
<div>
  <div class="gameStatus" >
  </div>
  <div class="board" *ngFor="let row of [0,1,2]">
    <cell *ngFor="let col of [0,1,2]">
    </cell>
  </div>
  <button class="restart">New Game</button>
</div>

```

At this stage, our app looks like below.

<img src="{{ site.baseurl }}/img/posts/tic-tac-toe-ui.png" alt="Tic-Tac-Toe UI" class="img-responsive">

We'll implement the core game logic in [Part3](/how-to-create-a-simple-tic-tac-toe-game-using-angular-with-the-help-of-angular-cli-part3).


---
layout:     post
title:      "How to create a simple Tic-Tac-Toe game using Angular with the help of Angular CLI - Part 3"
date:       2017-08-11 12:00:00
comments: true
post-img: "tictactoe.png"
description: How to create a simple Tic-Tac-Toe game using Angular with the help of Angular CLI - Part 3
permalink: /how-to-create-a-simple-tic-tac-toe-game-using-angular-with-the-help-of-angular-cli-part3/
path: how-to-create-a-simple-tic-tac-toe-game-using-angular-with-the-help-of-angular-cli-part3.md
tags: [angular, angula-cli,game,tic-tac-toe]
read_time: true
toc: true
sitemap:
    priority: 0.9
    changefreq: 'weekly'
    lastmod: 2017-08-11T09:13:30-06:00
---

Welcome to part 3 of building a Tic Tac Toe game using Angular. For part1 & part2, visit below URLs.

1. [Part 1](/how-to-create-a-simple-tic-tac-toe-game-using-angular-with-the-help-of-angular-cli-part1)
2. [Part 2](/how-to-create-a-simple-tic-tac-toe-game-using-angular-with-the-help-of-angular-cli-part2)

{% include toc.html %}

### View from Part 1

At the end of part 2, our app looks like below.

<img src="{{ site.baseurl }}/img/posts/tic-tac-toe-ui.png" alt="Tic-Tac-Toe UI" class="img-responsive">

In our case, `board` is a stateful component and `cell` is a stateless child component. State of `cell` is passed to `board` through `@Input` binding.

### Setting properties for a Cell in the board - cell.component.js

```js
import { Component, Input } from '@angular/core';

@Component({
  selector: 'cell',
  template: `
    <div class="cell" >{{ state }}</div>
  `,
  styleUrls: ['./cell.component.scss']
})
export class CellComponent {
  @Input()
  state: string;
}
```

### Game logic

Entire game logic is defined in the `board.component.ts`. Let's build the logic step by step.

#### Setting initialization properties for game board

We need to initialize the array `squares` which would contain the state of all the 9 cells and fill with null. We'll set the first `player` to be 'X'. Variable `winner` will hold the final game winner which will be used to display the winner status.

```js
squares = Array(9).fill(null);
player = 'X';
winner = null;
```

#### Getting game status

Let's define a function named `gameStatusMessage()` which is used to display the player's turn as well as the winning player at the end.

```js
get gameStatusMessage(){
    return this.winner? `Player ${this.winner} has won!` : 
    `Player ${this.player}'s turn`;
}
```

#### Handling game move based on click of a cell

In order to handle the move of a player based on cell position, let's define a function named `handleMove(position)`.

```js
handleMove(position) {
  if(!this.winner && !this.squares[position] ){
    this.squares[position] = this.player;
    if(this.winnigMove()) {
      this.winner = this.player;
    }
    this.player = this.player === 'X' ? 'O' : 'X';
  }
}
```

#### Check for winner after every move

During every move, we need to check if that's a winning move. In order to that, we need to define another function `winnigMove()`. In this, we are checking if a player 'X' or 'O' have their moves across 3 rows/ 3 columns / left to right doagonal / right to left diagonal.

```js
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
```

#### Reset game properties for a new game

Restarting the game sets the defined variables back to original state. Let's defind a function `restartGame()` to do that.

```js
restartGame() {
    this.squares = Array(9).fill(null);
    this.player = 'X';
    this.winner = null;
}
```

### Calling functions from the UI

Now that we have the required logic defined, we are ready to call these in the board component UI.

```js
template: `
  <div>
    <div class="gameStatus" >
      {{gameStatusMessage}}
    </div>
    <div class="board" *ngFor="let row of [0,1,2]">
      <cell *ngFor="let col of [0,1,2]">
      </cell>
    </div>
    <button class="restart">New Game</button>
  </div>
`,
```

#### Full code of 'board.component.ts' looks like below.

```js
import { Component } from '@angular/core';

@Component({
  selector: 'board',
  template: `
    <div>
      <div class="gameStatus" >
        {{gameStatusMessage}}
      </div>
      <div class="board" *ngFor="let row of [0,1,2]">
        <cell *ngFor="let col of [0,1,2]"
        [state]="squares[col+row*3]"
				(click)="handleMove(col+row*3)">
        </cell>
      </div>
      <button class="restart" (click)="restartGame()">New Game</button>
    </div>
  `,
  styleUrls: ['./board.component.scss']
})

export class BoardComponent {
  squares = Array(9).fill(null);
  player = 'X';
  winner = null;

  get gameStatusMessage(){
    return this.winner? `Player ${this.winner} has won!` : 
    `Player ${this.player}'s turn`;
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

### Links

* [Source Code Repo](https://github.com/thecodebee/ng-tic-tac-toe.git){:target="_blank"}
* [Demo App](https://thecodebee.github.io/ng-tic-tac-toe/){:target="_blank"} 

> This app has been hosted in github using gh-pages. To learn how to host the Angular app in github, refer to my other post [here](/4ways-to-host-angular-app-in-under-5-mins)


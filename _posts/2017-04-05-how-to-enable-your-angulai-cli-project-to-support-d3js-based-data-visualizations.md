---
layout:     post
title:      "How to enable your Angular4 AngularCLI project to support D3 based data visualizations?"
date:       2017-08-06 12:00:00
comments: true
post-img: "d3js.png"
description: How to enable your Angular4 AngularCLI project to support D3 based data visualizations?
permalink: /how-to-enable-your-angulai-cli-project-to-support-d3js-based-data-visualizations/
path: how-to-enable-your-angulai-cli-project-to-support-d3js-based-data-visualizations.md
tags: [angular, angularcli, d3, d3v4, typescript, data visualization]
sitemap:
    priority: 0.9
    changefreq: 'weekly'
    lastmod: 2017-07-06T09:13:30-06:00
---

In your Angular development journey, you might often come across a need to present the data in the form of chart visualization. There are many javascript charting libraries out there. [D3.js](https://d3js.org) is one of the popular choices out there.

This is a How-To tutorial where I'll walk you through the steps in enabling your Angular CLI project with D3.js library by generating a basic bar chart.

> What is D3?
D3.js is a JavaScript library for manipulating documents based on data. D3 helps you bring data to life using HTML, SVG, and CSS.

### 1. Install Angular CLI
We would be building the project using Angular CLI and running the project locally. Version used for this article is `@angular/cli: 1.2.7`. 
Install Angular CLI by running below command.

```bash
  npm install -g @angular/cli
```

> Use `sudo npm install -g @angular/cli` if you have any issues during installation. 

### 2. Scaffold the project

Now that we have the Angular CLI installed, let's scaffold our new project.

```bash
    ng new ng4d3viz
```

### 3. Serving the project

```bash
  yarn start 
```

App should be running at `http://localhost:4200/`.

### 4. Install D3 dependencies

Let's now add the D3.js library and the related type definitions. 

> We would be using d3 version 4 for this tutorial.

```bash
    yarn add d3
```


```bash
    yarn add --dev @types/d3
```

### 5. Generating a bar chart

We would be generating a simple bar chart depicting the sales results of 5 sales persons. Our end result will look like below.

<img src="{{ site.baseurl }}/img/posts/d3js-bar.png" alt="D3js Bar" class="img-responsive">

#### 5.a. Pre-requisites

As this is a simple beginner app, we would have all the logic written directly in our `app.component.ts` without modularizing the component structure further.

First, we need to import the `d3.js`. We are going to access the DOM directly, so let's import `ElementRef` as well and inject the same. 

We are going to define the chart style defined in the component which then propogates to the DOM, so we would be using `ViewEncapsulation` set to `None`.

Here is how our updated `app.component.ts` would look like.

```javascript
    import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
    import * as d3 from 'd3';

    @Component({
    selector: 'app-root',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
    })
    export class AppComponent implements OnInit {
        constructor(private element: ElementRef){
        } 

        ngOnInit(){
        }
    }

```

#### 5.b. Data

Let's setup the data we want to visualize in the form of a javascript array. Create an array named 'data' in the `app.component.ts`.

```javascript

data = [
    {salesperson: 'Bob',sales:33},
    {salesperson: 'Robin',sales:12},
    {salesperson: 'Anne',sales:41},
    {salesperson: 'Mark',sales:16},
    {salesperson: 'Joe',sales:39}
  ];

```

#### 5.c. Generate Bar Chart

Now that we have the pre-requsites done, let's start setting up the chart. We would do that in a new function `generateBarChart()` we're going to define now.

##### 5.c.1. Define chart dimensions

```javascript
    let margin = {top: 5, right: 20, bottom: 30, left: 40};
    let width = 600 - margin.left - margin.right;
    let height = 600 - margin.top - margin.bottom;
```

##### 5.c.2. Define SVG

```javascript
    let svg = d3.select(this.element.nativeElement).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .style('background-color', '#efefef');
```

##### 5.c.3. Define chart plot area

```javascript
    let chart = svg.append("g")
      .attr('class', 'bar')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
```

##### 5.c.4. Define domain data for X & Y axes from the data array

```javascript
    let xDomain = this.data.map(d => d.salesperson);
    let yDomain = [0, d3.max(this.data, d=> d.sales)];
```

##### 5.c.5. Set the scale for X & Y

```javascript
    let x = d3.scaleBand()
              .domain(xDomain)
              .rangeRound([0, width])
              .padding(0.2);

    let y = d3.scaleLinear()
              .domain(yDomain)
              .range([height, 0]);
```

##### 5.c.6. Add X & Y axes to the SVG

```javascript
    // add the x Axis
    svg.append("g")
        .attr('class', 'x axis')
        .attr('transform', `translate(${margin.left}, ${margin.top + height})`)
        .call(d3.axisBottom(x));
  
    // add the y Axis
    svg.append("g")
        .attr('class', 'y axis')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .call(d3.axisLeft(y));
```

##### 5.c.7. Plotting the chart

```javascript
    svg.selectAll("bar")
        .data(this.data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return margin.left + x(d.salesperson) ; })
        .attr("width", x.bandwidth)
        .attr("y", function(d) { return y(d.sales); })
        .attr("height", function(d) { return height - y(d.sales); });
    }
```

#### 5.d. Completed method `generateBarChart()`

```javascript
generateBarChart(){
    // set the dimensions and margins of the graph
    let margin = {top: 5, right: 20, bottom: 30, left: 40};
    let width = 600 - margin.left - margin.right;
    let height = 600 - margin.top - margin.bottom;

    //create svg

    let svg = d3.select(this.element.nativeElement).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .style('background-color', '#efefef');

    //plot area

    let chart = svg.append("g")
      .attr('class', 'bar')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    let xDomain = this.data.map(d => d.salesperson);
    let yDomain = [0, d3.max(this.data, d=> d.sales)];

    // set the scale for data domain
    let x = d3.scaleBand()
              .domain(xDomain)
              .rangeRound([0, width])
              .padding(0.2);

    let y = d3.scaleLinear()
              .domain(yDomain)
              .range([height, 0]);

    // add the x Axis
    svg.append("g")
        .attr('class', 'x axis')
        .attr('transform', `translate(${margin.left}, ${margin.top + height})`)
        .call(d3.axisBottom(x));
  
    // add the y Axis
    svg.append("g")
        .attr('class', 'y axis')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .call(d3.axisLeft(y));

    // plot chart with data
    svg.selectAll("bar")
        .data(this.data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return margin.left + x(d.salesperson) ; })
        .attr("width", x.bandwidth)
        .attr("y", function(d) { return y(d.sales); })
        .attr("height", function(d) { return height - y(d.sales); });
  }
```

### 6. Full source code.

We should be calling the `generateBarChart()` method from `ngOnInit()` now in order for the chart to get generated at the time of page initialization. Full source code of `app.component.ts` looks like below.

```javascript
    import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
    import * as d3 from 'd3';

    @Component({
    selector: 'app-root',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
    })
    export class AppComponent implements OnInit {
        data = [
            {salesperson: 'Bob',sales:33},
            {salesperson: 'Robin',sales:12},
            {salesperson: 'Anne',sales:41},
            {salesperson: 'Mark',sales:16},
            {salesperson: 'Joe',sales:39}
        ];

        constructor(private element: ElementRef){
        } 

        ngOnInit(){
            this.generateBarChart();
        }

        generateBarChart(){
            // set the dimensions and margins of the graph
            let margin = {top: 5, right: 20, bottom: 30, left: 40};
            let width = 600 - margin.left - margin.right;
            let height = 600 - margin.top - margin.bottom;

            //create svg

            let svg = d3.select(this.element.nativeElement).append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .style('background-color', '#efefef');

            //plot area

            let chart = svg.append("g")
            .attr('class', 'bar')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

            let xDomain = this.data.map(d => d.salesperson);
            let yDomain = [0, d3.max(this.data, d=> d.sales)];

            // set the scale for data domain
            let x = d3.scaleBand()
                    .domain(xDomain)
                    .rangeRound([0, width])
                    .padding(0.2);

            let y = d3.scaleLinear()
                    .domain(yDomain)
                    .range([height, 0]);

            // add the x Axis
            svg.append("g")
                .attr('class', 'x axis')
                .attr('transform', `translate(${margin.left}, ${margin.top + height})`)
                .call(d3.axisBottom(x));
        
            // add the y Axis
            svg.append("g")
                .attr('class', 'y axis')
                .attr('transform', `translate(${margin.left}, ${margin.top})`)
                .call(d3.axisLeft(y));

            // plot chart with data
            svg.selectAll("bar")
                .data(this.data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return margin.left + x(d.salesperson) ; })
                .attr("width", x.bandwidth)
                .attr("y", function(d) { return y(d.sales); })
                .attr("height", function(d) { return height - y(d.sales); });
        }
    }

```

### 7. Finished app

Our finished app produces a bar chart for sales as below.

<img src="{{ site.baseurl }}/img/posts/d3js-bar.png" alt="D3js Bar" class="img-responsive">

### 8. Links

* [Source Code Repo](https://github.com/thecodebee/ng4d3viz.git){:target="_blank"}
* [Demo App](https://thecodebee.github.io/ng4d3viz/){:target="_blank"} 

> This chart has been hosted in github using gh-pages. To learn how to host the Angular app in github, refer to my other post [here](/4ways-to-host-angular-app-in-under-5-mins)


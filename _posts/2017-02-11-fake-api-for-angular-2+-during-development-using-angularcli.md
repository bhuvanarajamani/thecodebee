---
layout:     post
title:      "Setting up fake REST API for Angular2+ during development using Angular CLI"
date:       2017-02-11 12:00:00
comments: true
---

[Angular CLI](https://github.com/angular/angular-cli) has made the scaffolding of an Angular2+ application so simple. The next major use case for most of the web applications is accessing a REST API and perform one or all of the CRUD operations. Though there are services like [Firebase](https://firebase.google.com) which have made the data storage as well as API access possible in few simple steps, I'm going to explain about another easy approach for setting up the same.

### Table of contents

- <a href="#basic-setup">Basic setup</a>
  - <a href="#install-angular-cli">Angular CLI Installation</a>
  - <a href="#create-new-project">Create Project</a>
  - <a href="#install-yarn">Install Yarn Package Manager</a>
  - <a href="#serve-scaffolded-project">Serving the scaffolded project</a>
- <a href="#data-structure">Data structure</a>
  - <a href="#create-json">Create JSON file</a>
- <a href="#method-1">Access Fake REST API - Method#1</a>
  - <a href="#create-service-class">Scaffold Service Class</a>
  - <a href="#call-api">Call API</a>
  - <a href="#access-data">Access data from component</a>
  - <a href="#present-data">Present data in UI</a>
- <a href="#method-2">Access Fake REST API - Method#2</a>
  - <a href="#install-json-server">Install JSON Server</a>
  - <a href="#run-json-server">Run JSON Server</a>
  - <a href="#update-service">Update Service</a>
  - <a href="#proxy-setup">Setting up proxy for API</a>
- <a href="#method-3">Access Fake REST API - Method#3</a>
  - <a href="#install-concurrently">Install concurrently</a>
  - <a href="#updated-server-command">Start server</a>
- <a href="#source-code">Source Code Repo</a>

### Basic Setup

We would be building the project using Angular CLI and running the project locally. For this article, I'm using `@angular/cli: 1.0.0-beta.31`. 

#### Install Angular CLI
Install Angular CLI by running below command.

{% highlight bash %}
  npm install -g @angular/cli
{% endhighlight %}

> Use `sudo npm install -g @angular/cli` if you have any issues during installation. 

#### Create new project
As this tutorial is about building a Fake REST API, let's name our project accordingly. Run this in a folder where you would want to create a project.

{% highlight bash %}
  ng new fake-rest-api
{% endhighlight %}


#### Install Yarn
For most part of this tutorial, we would be using Yarn for package management as well as serving the project.

Head over to [https://yarnpkg.com/en/docs/install](https://yarnpkg.com/en/docs/install) to install the latest version. 

#### Serving the project

{% highlight bash %}
  yarn start 
{% endhighlight %}

App should be running at `http://localhost:4200/`.

### Data structure
Let's take a simple example of a Books API. Below is the structure of the data.

<div>
  <ul>
    <li>Book ID</li>
    <li>Book Title</li>
    <li>Author Name</li>
  </ul>
</div>

#### Create JSON data file

Let's create `data.json` file under `fake-rest-api\src\assets\` folder. Copy the entries provided below.

{% highlight json %}
  {
    "books": [
      {
          "book_id": 1,
          "book_title": "Unshakeable: Your Financial Freedom Playbook",
          "author_name": "Tony Robbins"
      }, 
      {
          "book_id": 2,
          "book_title": "Tools of Titans: The Tactics, Routines, and Habits of Billionaires, Icons, and World-Class Performers",
          "author_name": "Timothy Ferriss"
      }, 
      {
          "book_id": 3,
          "book_title": "The 10X Rule: The Only Difference Between Success and Failure",
          "author_name": "Grant Cardone"
      } 
    ]
  }
{% endhighlight %}

Stop the angular local server by pressing `ctrl+c` and start again using `yarn start`. Only then you can access the `data.json` file.

### Access Fake REST API - Method#1
Method#1 uses the relative path of `data.json` for API call.

#### Scaffold Service Class

Let's begin by creating a service which would talk to the API. Run below command to scaffold a service. Let's call the service as `FakeService`

{% highlight bash %}
  ng g service fake
{% endhighlight %}

You'll get below warning when the service class is generated.

`WARNING Service is generated but not provided, it must be provided`.

We need to add the generated service `FakeService` to `providers` array in `app.module.ts`. With this you'r `app.module.ts` should look like this.

{% highlight javascript %}
  import { BrowserModule } from '@angular/platform-browser';
  import { NgModule } from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { HttpModule } from '@angular/http';

  import { FakeService} from './fake.service';

  import { AppComponent } from './app.component';

  @NgModule({
    declarations: [
      AppComponent
    ],
    imports: [
      BrowserModule,
      FormsModule,
      HttpModule
    ],
    providers: [
      FakeService
    ],
    bootstrap: [AppComponent]
  })
  export class AppModule { }

{% endhighlight %}

#### Call API

Here is the content of `fake.service.ts`.
{% highlight javascript %}
  import { Injectable } from '@angular/core';

  import { Http } from '@angular/http';

  import { Observable } from 'rxjs/Rx'
  import 'rxjs/add/operator/map';
  import 'rxjs/add/operator/catch';
  import 'rxjs/add/observable/throw'

  const BOOKS_API: string = "./assets/data.json";

  @Injectable()
  export class FakeService {

    constructor(private http: Http) { }

    getBooks(): Observable<any[]>{
      return this.http
        .get(BOOKS_API)
        .map(resp => resp.json().books)
        .catch((error: any) => Observable.throw(error.json()));
    }

  }
{% endhighlight %}

`BOOKS_API` contains the path of the data.json file we've created before. We would need to import `Http`, `Observable` classes in order to access the `http` API. We also need `map`, `catch` & `throw` operators.

We now have the service ready and the method `getBooks()` is ready to be called from the component.

#### Access the data from service in component

Now that we have the data, let's access the same from our component. In order to keep rest of the project structure simple, we would leverage the `app.component.ts` component to access the data and display in the UI.

We need to subscribe to the `getBooks()` method in order to access the data. Here is how the `app.component.ts` file would look like with the `subscribe` method.

{% highlight javascript %}
  import { Component, OnInit } from '@angular/core';

  import { FakeService } from './fake.service';

  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent {
    books: any [];

    constructor(private fakeService: FakeService) { }

    ngOnInit() {
      this.fakeService.getBooks()
        .subscribe(
          books => {
            this.books = books;
          }
        );
    }
  }
{% endhighlight %}

> In order to type check the incoming data structure we can create a data model of type `Book`. But for the simplicity of this tutorial, it is left as `any`.

#### Present data in UI

In order to make the data decently presentable, let's add some basic style in `src\styles.css`. Copy the below contents to your `styles.css` file.

{% highlight css %}
  th, td {
      border-bottom: 1px solid #ddd;
      padding: 15px;
      text-align: left;
  }

  tr:hover {background-color: #f5f5f5}

  th {
      background-color: #fd6309;
      color: white;
  }
{% endhighlight %}

Here is the content that goes in the `app.component.html`.

{% highlight html %}
  <h1>Book data from the Fake REST API</h1>
  <div *ngIf="books">
    <table class="pure-table pure-table-bordered">
        <thead>
            <tr>
                <th>Book Id</th>
                <th>Book Title</th>
                <th>Author Name</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let book of books;">
                <td>{{book.book_id}}</td>
                <td>{{book.book_title}}</td>
                <td>{{book.author_name}}</td>
            </tr>
        </tbody>
    </table>
  </div>
{% endhighlight %}

This html rendering is pretty straightforward. We first check if the `books` object is available. When it is available, the data fetched from the API is presented in a table format.

Here is the final output in the browser.

<img src="{{ site.baseurl }}/img/fake-rest-api.png" alt="Fake REST API" class="img-responsive">

> Method#1 should work fine in gh-pages as well.
> `*ng github-pages:deploy*` has been removed from this version of Angular CLI. 

### Method#2 - Using JSON Server 

To learn more about `json-server` go [here](https://github.com/typicode/json-server)

#### Install JSON server dependencies

**Global install**

{% highlight bash%}
  yarn global add json-server
{% endhighlight %}
> Use `sudo install` if you hit any issues.

**Local Install**

{% highlight bash%}
  yarn add --dev json-server
{% endhighlight %}

#### Run JSON server
Run below command from the project root directory.

{% highlight bash%}
  json-server --watch "src/assets/data.json"
{% endhighlight %}

> JSON Server runs at `http://localhost:3000/books`

When you trigger that URL from your browser you should be able to see the JSON output.

{% highlight json%}
  [
    {
      "book_id": 1,
      "book_title": "Unshakeable: Your Financial Freedom Playbook",
      "author_name": "Tony Robbins"
    },
    {
      "book_id": 2,
      "book_title": "Tools of Titans: The Tactics, Routines, and Habits of Billionaires, Icons, and World-Class Performers",
      "author_name": "Timothy Ferriss"
    },
    {
      "book_id": 3,
      "book_title": "The 10X Rule: The Only Difference Between Success and Failure",
      "author_name": "Grant Cardone"
    }
  ]
{% endhighlight %}

And.. when you want to get the book for id=1, try the URL as `http://localhost:3000/books?book_id=1` and below will be the output.

{% highlight json%}
  [
    {
      "book_id": 1,
      "book_title": "Unshakeable: Your Financial Freedom Playbook",
      "author_name": "Tony Robbins"
    }
  ]
{% endhighlight %}

### Update Service

Only 2 lines need to be updated in `fake.service.ts`. 
`const BOOKS_API: string = "http://localhost:3000/books";` and `.map(resp => resp.json())`
Here is the updated code.

{% highlight javascript%}
  import { Injectable } from '@angular/core';

  import { Http } from '@angular/http';

  import { Observable } from 'rxjs/Rx'
  import 'rxjs/add/operator/map';
  import 'rxjs/add/operator/catch';
  import 'rxjs/add/observable/throw'

  const BOOKS_API: string = "http://localhost:3000/books";

  @Injectable()
  export class FakeService {

    constructor(private http: Http) { }

    getBooks(): Observable<any[]>{
      return this.http
        .get(BOOKS_API)
        .map(resp => resp.json())
        .catch((error: any) => Observable.throw(error.json()));
    }

  }

{% endhighlight %}

#### Setup proxy for JSON server API

In order to not change the Service when you later move the API to another backend during production, we can setup a proxy to the API.

**Create Proxy file**
Create a file named `proxy.conf.json` at the same level as `angular-cli.json` with below contents.

{% highlight json%}
  {
    "/books": {
      "target": "http://localhost:3000",
      "secure": false
    }
  }
{% endhighlight%}

**Update Service *(one last time)***

Change the API path to `const BOOKS_API: string = "/books";`

**Restart the angular server**

Stop the angular server and start with the command:

{% highlight bash%}
  ng serve --proxy-config proxy.conf.json
{% endhighlight%}

> Alternatively, you can configure another script named `startwithproxy` in `package.json` like below:

{% highlight json%}
"startwithproxy": "\"ng serve --proxy-config proxy.conf.json\""
{% endhighlight%}

Now you can simply use `yarn startwithproxy` to start the angular server.


### Method 3 - Using concurrently

#### Install concurrently

This method enables you to simultaneously stop/start the JSON Server which serves the API and the angular application server.

**Global install**

{% highlight bash%}
  yarn global add concurrently
{% endhighlight %}
> Use `sudo install` if you hit any issues.

**Local Install**

{% highlight bash%}
  yarn add --dev concurrently
{% endhighlight %}

**Restart the angular server**

Stop the angular server and start with the command:

{% highlight bash%}
  concurrently --kill-others "json-server -q src/assets/data.json" "ng serve --proxy-config proxy.conf.json"
{% endhighlight%}

> Alternatively, you can configure another script named `startconcurrentlywithproxy` in `package.json` like below:

{% highlight json%}
  "startconcurrentlywithproxy": "concurrently --kill-others \"json-server -q src/assets/data.json\" \"ng serve --proxy-config proxy.conf.json\""
{% endhighlight%}

Now you can simply use `yarn startconcurrentlywithproxy` to start the angular server.

### Source Code

You can find the source code in the github repo [here](https://github.com/thecodebee/fake-rest-api){:target="_blank"}
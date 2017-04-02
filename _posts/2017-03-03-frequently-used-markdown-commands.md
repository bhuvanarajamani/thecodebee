---
layout:     post
title:      "Frequently used Markdown commands"
date:       2017-03-03 12:00:00
comments: true
post-img: "md.png"
description: Markdown commands that I frequently use for my blog posts
permalink: /frequently-used-markdown-commands/
path: 2017-03-03-frequently-used-markdown-commands.md
tags: [markdown]
sitemap:
    priority: 0.9
    changefreq: 'weekly'
    lastmod: 2017-03-03T09:13:30-06:00
---
One main reason for me to choose Jekyll as my blog platform is the ability to write my content using plain text syntax like markdown. I can use markdown in the same text editor which I'm already using for my programming.

> Markdown is a lightweight markup language with plain text formatting syntax designed so that it can be converted to HTML and many other formats using a tool by the same name.[8] Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.

Go to [https://en.wikipedia.org/wiki/Markdown](https://en.wikipedia.org/wiki/Markdown) or [https://daringfireball.net](https://daringfireball.net) to know more about Markdown.

Here are some of the commands that I frequently use for writing my blog posts.

## 1. Heading Tags

I use heading tags mainly for section headers in order to organize the topics in long posts.

{% highlight markdown %}
  # Converts into <h1> tag
  ## Converts into <h2> tag
  ### Converts into <h3> tag
  #### Converts into <h4> tag
  ##### Converts into <h5> tag
  ###### Converts into <h6> tag
{% endhighlight %}

## 2. Links

I use this tag where I have to refer URLs within the post. You need to give website name and website URL adjacent to each other like below.

{% highlight markdown %}
[thecodebee](http://thecodebee.com/)
{% endhighlight %}

gets interpreted to: [thecodebee](http://thecodebee.com/)

If you want the link to open in a new window, you have to add `{:target="_blank"}` besides the URL.

{% highlight markdown %}
[thecodebee](http://thecodebee.com/){:target="_blank"}
{% endhighlight %}

gets interpreted to: [thecodebee](http://thecodebee.com/){:target="_blank"}

## 3. Block Quotes

I use blockquotes to quote references or emphasize content in my post. 

{% highlight markdown %}
> If you are not willing to risk the unusual, you will have to settle for the ordinary. - Jim Rohn
{% endhighlight %}

Above markdown gets converted as below.

> If you are not willing to risk the unusual, you will have to settle for the ordinary. - Jim Rohn

## 4. Images

Image reference is not simple and straightforward like most of the other tags. Use below syntax to place images within the content.

{% highlight markdown %}
![Code Bee](/img/mascot_small.png "Code Bee")
{% endhighlight %}

![Code Bee](/img/mascot_small.png "Code Bee")

You cannot mention dimensions in the markdown. When you need to mention size, you can go ahead and use the regular html syntaxt for img. 

## 5. Backticks

I use backticks for simple code line / snippet without having a need for syntax highlighting. Eg: `sudo npm install -g @angular/cli`

{% highlight markdown %}
`sudo npm install -g @angular/cli`
{% endhighlight %}

## 6. Lists
Markdown supports ordered (numbered) and unordered (bulleted) lists. Unordered lists use asterisks, pluses, and hyphens — interchangably — as list markers whereas ordered lists use numbers followed by periods.

### 6a. Unordered Lists

To have unordered lists like below, use the syntax as mentioned.

* Item 1
* Item 2
    * Item 2a
    * Item 2b

{% highlight markdown %}
* Item 1
* Item 2
    * Item 2a
    * Item 2b
{% endhighlight %}

### 6b. Ordered Lists

And to get ordered list of contents, use below syntax.

1. Item 1
2. Item 2
3. Item 3

{% highlight markdown %}
1. Item 1
2. Item 2
3. Item 3
{% endhighlight %}

## 7. Text Emphasis

When you want to bold or italizize the text, you can use asterisks and underscores interchangeably as per below syntax.

{% highlight markdown %}
    1. *This text will be italic*
    2. _This will also be italic_
    3. **This text will be bold**
    4. __This will also be bold__
    5. *You **can** combine them*
{% endhighlight %}
1. *This text will be italic*
2. _This will also be italic_
3. **This text will be bold**
4. __This will also be bold__
5. *You **can** combine them*


---
layout:     post
title:      "Syntax Highlighting"
date:       2017-01-22 12:00:00
author:     "Bhuvana Rajamani"
---
### CSS (Global Colour Change)

{% highlight css %}
/* IE9  - Also picked up by most modern browsers */
::selection {
  background:#AC2937;
  color:#FFF;
  text-shadow:none;
}
/* Safari & Chrome - Webkit Rendering */
::-webkit-selection {
  background:#AC2937;
  color:#FFF;
  text-shadow:none;
}
/* Mozilla based - Gecko Rendering */ 
::-moz-selection {
  background:#AC2937;
  color:#FFF;
  text-shadow:none;
}
{% endhighlight %}

### HTML
If you want to highlight different paragraphs, you can target individual elements like so:

{% highlight html %}
<!-- Green Paragraph -->
<p class="green-select">Your paragraph text here.</p>
<ul>
  <li class="item1"></li>
  <li class="item2"></li>
  <li class="item3"></li>
  <li class="item4"></li>
  <li class="item5"></li>
</ul>
{% endhighlight %}
    
### CSS (Specific Area Colour Change)

{% highlight css %}
/* Green Paragraph Custom Selection Colours */
.green-select::selection {
  background:#009E30;
  color:#FFF;
  text-shadow:none;
}

.green-select::-webkit-selection {
  background:#009E30;
  color:#FFF;
  text-shadow:none;
}

.green-select::-moz-selection {
  background:#009E30;
  color:#FFF;
  text-shadow:none;
}
{% endhighlight %}
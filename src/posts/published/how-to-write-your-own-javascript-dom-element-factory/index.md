---
categories: ['JavaScript', 'Web Development']
date: "2017-07-12"
slug: "how-to-write-your-own-javascript-dom-element-factory"
status: "publish"
subtitle: "A Basic HyperScript h() Function"
title: "How to Write Your Own JavaScript DOM Element Factory"
---

Recently at an interview I was asked to write a custom component from scratch with vanilla JavaScript. I thought I'd take a few minutes to write part of that code for you. It's not as scary as it might seem at first.

There are three basic parts to any DOM element: the type of element it is, any attributes we need the element to have, and any children of the element. Knowing this, we can start to write our factory function.

```
const elFactory = (type, attributes, children) => {}

```

The first thing we need to do is create the DOM element we will eventually return. We do this with the `createElement()` method.

```
const elFactory = (type, attributes, children) => {
  const el = document.createElement(type)

  return el
}

```

The next thing we need to do is apply each key/value pair found in the attributes object we pass in.

```
const elFactory = (type, attributes, children) => {
  const el = document.createElement(type)

  for (key in attributes) {
    el.setAttribute(key, attributes[key])
  }

  return el
}

```

The last thing we need to do is handle children. There are two basic types of children we might run into: strings and other elements. So our function will need to handle both cases. Also, implied by the variable name `children` is that we might receive any number of extra arguments, so we'll need to use the rest operator to gather up our remaining parameters into an array. That code looks like this:

```
const elFactory = (type, attributes, ...children) => {
  const el = document.createElement(type)

  for (key in attributes) {
    el.setAttribute(key, attributes[key])
  }

  children.forEach(child => {
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child))
    } else {
      el.appendChild(child)
    }
  })

  return el
}

```

And now we have a factory function that will create DOM elements for us. We can use it like this:

```
const markup = elFactory('div', { class: 'my-component' },
  elFactory('span', {}, 'Hello World!'),
  ' Thanks for reading my blog!'
)

document.body.appendChild(markup)

```

Which will output the following:

```
<div class='my-component'>
  <span>Hello World!</span> Thanks for reading my blog!
</div>

```

In the future, I'll discuss how we might be able to handle updates and have state available to our components. For now, this should help you if you're ever in a similar situation.
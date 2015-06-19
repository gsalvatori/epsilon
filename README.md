epsilon
---

A lightweight Javascript library for approximate string matching methods.

Use
---
Import epsilon as follow:

```html
<script src="epsilon.min.js"></script>
```
then, you can call every method with the standard Javascript notation. In this example, the Levenshtein Distance function:

```js
epsilon.leven("teststring","anotherstring")
```
that will return 6, as we expected.

What are we talking about?
---
Basically, approximate string matching or fuzzy string searching is a technique / method in text processing to find strings that match a certain pattern, considering that one or both of them can suffered some kind of error. Most algorithms will return an integer as a closeness measurement of a match, in terms of the number of operations necessary to convert the target string into an exact match. Approximate string matching is used in several worlds, not only in Computer Science; for example in biology, music, spam filtering and spell checking software. So you have to decide which algorithm to choose, considering temporal complexity, memory complexity and the form of your strings set, because some of them couldn't be the right approach for your goal.

Features
---
Currently, epsilon includes the following algorithms list
* Standard Levenshtein distance
* A dynamic programming implementation of LD
* Optimal String Alignment distance
* Damerau Levenshtein distance
* Hamming Distance
* Cosin Similarity of two strings


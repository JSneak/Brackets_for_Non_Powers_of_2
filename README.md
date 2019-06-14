# Brackets_for_Non_Powers_of_2

View a live demo **[here](http://sean.kim/brackets/go.html)**

---

Built a bracket diagram with automatic promotion as results are entered interactively and is capable of creating non-powers of 2 tournaments.

Most open source tournament generators are only capable of creating tournaments with powers of 2 or require Node.js. However, by creating a binary tree and utilizing breadth first search, I was able to create tournament brackets that will have players playing 1 more or less game.

I utilized [gojs](https://gojs.net/latest/index.html) to visualize and make the bracket interactive.

---
If you want to change the number of people in a bracket, simply add or delete names from the **playerList** array. 

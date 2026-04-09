import { HashMap } from "./hashMap.js";

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("grape", "purple");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test.length()); // Output: 12

test.set("banana", "green");
console.log(test.get("banana")); // Output: "green"
console.log(test.length()); // Output: 12

test.set("moon", "silver");
console.log(test.get("moon")); // Output: "silver"
console.log(test.length()); // Output: 13
console.log(test.capacity); // Output: 32 (after resizing)

test.get("nonexistent"); // Output: undefined
test.remove("carrot");  // Output: true
console.log(test.has("carrot")); // Output: false
console.log(test.length()); // Output: 12

console.log(test.keys()); // Output: ["apple", "banana", "grape", "dog", "elephant", "frog", "hat", "ice cream", "jacket", "kite", "lion", "moon"]
console.log(test.values()); // Output: ["red", "green", "purple", "brown", "gray", "green", "black", "white", "blue", "pink", "golden", "silver"]
console.log(test.entries()); // Output: [["apple", "red"], ["banana", "green"], ["grape", "purple"], ["dog", "brown"], ["elephant", "gray"], ["frog", "green"], ["hat", "black"], ["ice cream", "white"], ["jacket", "blue"], ["kite", "pink"], ["lion", "golden"], ["moon", "silver"]]

test.clear();
console.log(test.length()); // Output: 0
console.log(test.keys()); // Output: []
console.log(test.values()); // Output: []
console.log(test.entries()); // Output: []

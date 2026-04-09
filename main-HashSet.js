import { HashSet } from "./hashSet.js";

let set = new HashSet();
set.add("name");
set.add("lang");
set.add("course");
set.add("Instructor");

console.log(set.keys());
console.log(`Set Size: ${set.size()}`);
console.log(`Result: ${set.remove("Instructor")}`);
console.log(`Result: ${set.remove("instructor")}`);
console.log(set.keys());
console.log(`Set Size: ${set.size()}`);

export { HashSet };
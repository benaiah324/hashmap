import { HashSet } from "./hashSet.js";

describe("HashSet", () => {
    let set;

    beforeEach(() => {
        set = new HashSet(16, 0.75);
    });

    test("constructor initializes capacity, load factor, and empty buckets", () => {
        expect(set.capacity).toBe(16);
        expect(set.load_factor).toBe(0.75);
        expect(set.size()).toBe(0);
        expect(set.buckets).toHaveLength(16);
    });

    test("hash returns an index between 0 and capacity - 1", () => {
        const index = set.hash("John");
        expect(index).toBeGreaterThanOrEqual(0);
        expect(index).toBeLessThan(16);
    });

    test("hash produces different indexes for different keys", () => {
        expect(set.hash("John")).not.toBe(set.hash("hnoJ"));
    });

    test("add stores a new key and increments size", () => {
        set.add("name");
        expect(set.has("name")).toBe(true);
        expect(set.size()).toBe(1);
    });

    test("add does not add duplicate keys", () => {
        set.add("lang");
        expect(set.size()).toBe(1);
        set.add("lang");
        expect(set.size()).toBe(1);
    });

    test("has returns true for stored keys and false otherwise", () => {
        set.add("course");
        expect(set.has("course")).toBe(true);
        expect(set.has("unknown")).toBe(false);
    });

    test("remove deletes an existing key and decrements size", () => {
        set.add("Instructor");
        expect(set.remove("Instructor")).toBe(true);
        expect(set.has("Instructor")).toBe(false);
        expect(set.size()).toBe(0);
    });

    test("remove returns false when the key does not exist", () => {
        expect(set.remove("missing")).toBe(false);
    });

    test("size returns the number of stored keys", () => {
        set.add("a");
        set.add("b");
        expect(set.size()).toBe(2);
    });

    test("clear empties the set and resets size", () => {
        set.add("name");
        set.add("lang");
        set.clear();
        expect(set.size()).toBe(0);
        expect(set.keys()).toEqual([]);
    });

    test("keys returns all stored keys", () => {
        set.add("name");
        set.add("lang");
        expect(set.keys()).toEqual(["name", "lang"]);
    });

    test("supports collisions in the same bucket", () => {
        const collisionSet = new HashSet(2, 0.75);

        collisionSet.add("a");
        collisionSet.add("c");

        expect(collisionSet.hash("a")).toBe(collisionSet.hash("c"));
        expect(collisionSet.has("a")).toBe(true);
        expect(collisionSet.has("c")).toBe(true);
        expect(collisionSet.size()).toBe(2);
    });

    test("resize doubles capacity and preserves keys", () => {
        const smallSet = new HashSet(2, 0.5);

        smallSet.add("a");
        expect(smallSet.capacity).toBe(2);
        smallSet.add("b");

        expect(smallSet.capacity).toBe(4);
        expect(smallSet.size()).toBe(2);
        expect(smallSet.has("a")).toBe(true);
        expect(smallSet.has("b")).toBe(true);
    });
});
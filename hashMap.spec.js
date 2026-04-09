import { HashMap } from "./hashMap.js";

describe("HashMap", () => {
    let map;

    beforeEach(() => {
        map = new HashMap(16, 0.75);
    });

    test("constructor initializes capacity, load factor, and empty buckets", () => {
        expect(map.capacity).toBe(16);
        expect(map.load_factor).toBe(0.75);
        expect(map.size).toBe(0);
        expect(map.buckets).toHaveLength(16);
    });

    test("hash returns an index between 0 and capacity - 1", () => {
        const index = map.hash("John");
        expect(index).toBeGreaterThanOrEqual(0);
        expect(index).toBeLessThan(16);
    });

    test("hash produces different indexes for different keys", () => {
        expect(map.hash("John")).not.toBe(map.hash("hnoJ"));
    });

    test("set stores a new key/value pair and increments size", () => {
        map.set("name", "Benaiah");
        expect(map.get("name")).toBe("Benaiah");
        expect(map.size).toBe(1);
    });

    test("set updates an existing key without increasing size", () => {
        map.set("lang", "JavaScript");
        expect(map.size).toBe(1);
        map.set("lang", "TypeScript");
        expect(map.size).toBe(1);
        expect(map.get("lang")).toBe("TypeScript");
    });

    test("get returns undefined for a missing bucket and null for a missing key in an existing bucket", () => {
        expect(map.get("missing")).toBeUndefined();
        const index = map.hash("missing");
        map.buckets[index] = [["other", "value"]];
        expect(map.get("missing")).toBeNull();
    });

    test("has returns true for stored keys and false otherwise", () => {
        map.set("course", "Odin");
        expect(map.has("course")).toBe(true);
        expect(map.has("unknown")).toBe(false);
    });

    test("remove deletes an existing key and decrements size", () => {
        map.set("Instructor", "John");
        expect(map.remove("Instructor")).toBe(true);
        expect(map.has("Instructor")).toBe(false);
        expect(map.size).toBe(0);
    });

    test("remove returns false when the key does not exist", () => {
        expect(map.remove("missing")).toBe(false);
    });

    test("length returns the number of stored entries", () => {
        map.set("a", 1);
        map.set("b", 2);
        expect(map.length()).toBe(2);
    });

    test("clear empties the map and resets size", () => {
        map.set("name", "Benaiah");
        map.set("lang", "JavaScript");
        map.clear();
        expect(map.size).toBe(0);
        expect(map.keys()).toEqual([]);
        expect(map.values()).toEqual([]);
    });

    test("keys returns all stored keys", () => {
        map.set("name", "Benaiah");
        map.set("lang", "JavaScript");
        expect(map.keys()).toEqual(["name", "lang"]);
    });

    test("values returns all stored values", () => {
        map.set("name", "Benaiah");
        map.set("lang", "JavaScript");
        expect(map.values()).toEqual(["Benaiah", "JavaScript"]);
    });

    test("entries returns all key/value pairs", () => {
        map.set("name", "Benaiah");
        map.set("lang", "JavaScript");
        expect(map.entries()).toEqual([
            ["name", "Benaiah"],
            ["lang", "JavaScript"],
        ]);
    });

    test("supports collisions in the same bucket", () => {
        const collisionMap = new HashMap(2, 0.75);

        collisionMap.set("a", 1);
        collisionMap.set("c", 3);

        expect(collisionMap.hash("a")).toBe(collisionMap.hash("c"));
        expect(collisionMap.get("a")).toBe(1);
        expect(collisionMap.get("c")).toBe(3);
        expect(collisionMap.size).toBe(2);
    });

    test("resize doubles capacity and preserves entries", () => {
        const smallMap = new HashMap(2, 0.5);

        smallMap.set("a", "A");
        expect(smallMap.capacity).toBe(2);
        smallMap.set("b", "B");

        expect(smallMap.capacity).toBe(4);
        expect(smallMap.size).toBe(2);
        expect(smallMap.get("a")).toBe("A");
        expect(smallMap.get("b")).toBe("B");
    });
});

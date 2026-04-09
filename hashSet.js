class HashSet {
    constructor(capacity = 16, load_factor = 0.75) {
        this.buckets = new Array(capacity);
        this.capacity = capacity;
        this.load_factor = load_factor;
        this._size = 0;
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    add(key) {
        if (this._size / this.capacity >= this.load_factor) {
            this.resize();
        }

        const index = this.hash(key);
        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }

        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i] === key) {
                return; // Key already exists
            }
        }

        bucket.push(key);
        this._size++;
    }

    has(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        if (!bucket) {
            return false;
        }

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i] === key) {
                return true;
            }
        }
        return false;
    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        if (!bucket) {
            return false;
        }

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i] === key) {
                bucket.splice(i, 1);
                this._size--;
                return true;
            }
        }
        return false;
    }

    size() {
        return this._size;
    }

    clear() {
        this.buckets = new Array(this.capacity);
        this._size = 0;
    }

    keys() {
        const result = [];

        for (let i = 0; i < this.buckets.length; i++) {
            const bucket = this.buckets[i];
            if (bucket) {
                for (let j = 0; j < bucket.length; j++) {
                    result.push(bucket[j]);
                }
            }
        }

        return result;
    }

    resize() {
        const oldBuckets = this.buckets;
        this.capacity = this.capacity * 2;
        this.buckets = new Array(this.capacity);
        this._size = 0;

        for (let i = 0; i < oldBuckets.length; i++) {
            const bucket = oldBuckets[i];
            if (bucket) {
                for (let j = 0; j < bucket.length; j++) {
                    this.add(bucket[j]);
                }
            }
        }
    }
}

export { HashSet };
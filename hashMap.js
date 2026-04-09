class HashMap {
    constructor(capacity = 16, load_factor = 0.75) {
        this.buckets = new Array(capacity)
        this.capacity = capacity
        this.load_factor = load_factor
        this.size = 0
    }

    hash(key) {
        let hashCode = 0
        const primeNumber = 31

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity
            // console.log(`i:${i} (${primeNumber} * ${i} + ${key.charCodeAt(i)}) % ${this.capacity} = ${hashCode}`)
        }

        return hashCode
    }

    set(key, value) {
        if (this.size / this.capacity >= this.load_factor) {
            this.resize();
        }

        const index = this.hash(key)
        if (!this.buckets[index]) {
            this.buckets[index] = []
        }

        const bucket = this.buckets[index]

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return
            }
        }

        bucket.push([key, value])
        this.size++

    }

    get(key) {
        const index = this.hash(key)
        const bucket = this.buckets[index];

        if (!bucket) {
            return
        }

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1]
            }
        }
        return null
    }

    has(key) {
        const index = this.hash(key)
        const bucket = this.buckets[index];

        if (!bucket) {
            return false
        }

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return true
            }
        }
        return false
    }

    remove(key) {
        const index = this.hash(key)
        const bucket = this.buckets[index];

        if (!bucket) {
            return false
        }

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1)
                this.size--
                return true
            }
        }
        return false
    }

    length() {
        return this.size
    }

    clear() {
        this.buckets = new Array(this.capacity)
        this.size = 0
    }

    keys() {
        const result = [];

        for (let i = 0; i < this.buckets.length; i++) {
            const bucket = this.buckets[i];
            if (bucket) {
                for (let j = 0; j < bucket.length; j++) {
                    result.push(bucket[j][0]);
                }
            }
        }

        return result;
    }

    values() {
        const result = [];

        for (let i = 0; i < this.buckets.length; i++) {
            const bucket = this.buckets[i];
            if (bucket) {
                for (let j = 0; j < bucket.length; j++) {
                    result.push(bucket[j][1]);
                }
            }
        }

        return result;
    }

    entries() {
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
        this.size = 0;

        for (let i = 0; i < oldBuckets.length; i++) {
            const bucket = oldBuckets[i];
            if (bucket) {
                for (let j = 0; j < bucket.length; j++) {
                    this.set(bucket[j][0], bucket[j][1]);
                }
            }
        }
    }

}


export { HashMap }
let isFunction = function (tag) {
    return typeof tag === "function";
}
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJRCTED = 'REJRCTED';
class myPromise {
    constructor(handle) {
        if (!isFunction(handle)) throw new Error("MyPromise accept a function as a parameter");

        this._value = undefined;
        this._status = PENDING;

        this._fufilledQueues = [];
        this._rejectedQueues = [];

        try {
            handle(this._resolve.bind(this), this._reject.bind(this));
        } catch (error) {
            this._reject(error);
        }
    }

    then(onfullfill, onrejected) {
        const { _status, _value } = this;
        return new myPromise((nextResolve, nextReject) => {
            let fufilled = (value) => {
                try {
                    if (isFunction(onfullfill)) {
                        let res = onfullfill(value);
                        if (res instanceof myPromise) {
                            res.then(nextResolve, nextReject);
                        } else {
                            nextResolve(res);
                        }
                    } else {
                        nextResolve(value);
                    }
                } catch (error) {
                    nextReject(error);
                }
            }

            let rejected = (error) => {
                try {
                    if (isFunction(onrejected)) {
                        let res = onrejected(value);
                        if (res instanceof myPromise) {
                            res.then(nextResolve, nextReject);
                        } else {
                            nextReject(res);
                        }
                    } else {
                        nextReject(value);
                    }
                } catch (error) {
                    nextReject(error);
                }
            }

            switch (_status) {
                case PENDING:
                    this._fufilledQueues.push(fufilled);
                    this._rejectedQueues.push(rejected);
                    break
                case FULFILLED:
                    fufilled(_value);
                    break
                case REJRCTED:
                    rejected(_value);
                    break
            }
        })
    }

    _resolve(value) {
        if (this._status !== PENDING) return;

        const runFulFillQueues = (value) => {
            let item;
            while (item = this._fufilledQueues.shift()) {
                item(value);
            }
        }

        const runRejectQueues = (value) => {
            let item;
            while (item = this._rejectedQueues.shift()) {
                item(value);
            }
        }

        let next = () => {
            if (value instanceof myPromise) {
                value.then(value => {
                    this._value = value;
                    this._status = FULFILLED;
                    runFulFillQueues(value);
                }, error => {
                    this._value = error;
                    this._status = REJRCTED;
                    runFulFillQueues(error);
                });
            } else {
                this._status = FULFILLED;
                this._value = value;
                runFulFillQueues(value);
            }
        }
        setTimeout(() => {
            next();
        }, 0);
    }

    _reject(err) {
        if (this._status !== PENDING) return;
        let next = () => {
            this._status = REJRCTED;
            this._value = err;
            let item;
            while (item = this._rejectedQueues.shift()) {
                item(err);
            }
        }
        setTimeout(() => {
            next();
        }, 0);
    }
}

let myPromise1 = new myPromise((a,b)=>{
    a('lllll');
});
myPromise1.then(value => {
    console.log(value);
});

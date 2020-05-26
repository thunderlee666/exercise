let cbf = function (time) {
  return function (callBack) {
    try {
      setTimeout(() => {
        console.log(time);
        callBack(null, time);
      }, time);
    } catch (error) {
      callBack(error);
    }
  }
}

let prof = function (time) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        console.log(time);
        resolve(time);
      }, time);
    } catch (error) {
      reject(error);
    }
  })
}

let asyncArr = function* () {
  let a1 = yield cbf(1000);
  let a2 = yield prof(2000);
}

function isPromise(target) {
  return 'function' == typeof target.then;
}

function toPromise(obj) {
  if (isPromise(obj)) {
    return obj;
  }
  if ('function' == typeof obj) {
    return new Promise((resolve, reject) => {
      obj((err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      })
    })
  }
  return obj;
}

let run = function(gen) {
  return new Promise((resolve, reject) => {
    let asyncArrRun;
    if (typeof gen === 'function') {
      asyncArrRun = gen();  
    }
    if (asyncArrRun && typeof asyncArrRun.next === 'function') {
      onfufilled();
    } else {
      return resolve(asyncArrRun);
    }

    function onfufilled(res) {
      let ret;
      try {
        ret = asyncArrRun.next(res);
      } catch (error) {
        return reject(error);
      }
      next(ret);
    }

    function onRejected(err) {
      let ret;
      try {
        ret = asyncArrRun.throw(err);
      } catch (error) {
        return reject(error);
      }
      next(ret);
    }

    function next(data) {
      if (data.done) {
        return resolve(data.value);
      }

      let value = toPromise(data.value);

      if (value && isPromise(value)) {
        return value.then(onfufilled, onRejected);
      }
        // onfufilled(value);
        return onRejected(new TypeError('You may only yield a function, promise ' +
          'but the following object was passed: "' + String(ret.value) + '"'));
    }
  })
}

run(asyncArr);

export default run;
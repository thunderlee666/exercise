let cbf = function (time) {
  return function (callBack) {
    try {
      setTimeout(() => {
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
  if ('function' == typeof target.then) {
    return true;
  }
  return false;
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

(function() {
  let asyncArrRun = asyncArr();

  return new Promise((resolve, reject) => {
    function run(data) {
      try {
        var res = asyncArrRun.next(data);
      } catch (error) {
        reject(error)
      }

      if (res.done) {
        resolve(res.value);
        return;
      }

      let value = toPromise(res.value);

      value.then(data => {
        console.log(data);
        run(data);
      }, error => {
        reject(error);
      })
    }
    run()
  })
})()
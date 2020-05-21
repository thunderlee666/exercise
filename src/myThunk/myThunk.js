let myThunk = function(fn) {
  return function(...argu) {
    let that = this;
    return function(callBack) {
      let called = false;
      argu = [...argu,function(...argu2) {
        if (!called) {
          callBack.apply(null,argu2);
        }
        called = true;
      }];
      try {
        fn.apply(that, argu);
      } catch (error) {
        callBack(error);
      }
    }
  }
}

let asyncFn1 = function(time, callBack) {
  new Promise((a) => {
    setTimeout(()=>{a(time)},time)
  }).then(time => {
    callBack(time);
  });
}

let taf = myThunk(asyncFn1);

let tryThunk = function* () {
  let n = yield taf(2000);
  let m = yield taf(3000);
}

let result = tryThunk();

function next(...argu) {
  let res = result.next();
  if (argu.length > 0) console.log(...argu);
  if (res.done) return;
  res.value(next);
}

next();


/**
 * 0521 目前看来thunk函数的好处是可以自动执行Generator异步函数中每个异步操作
 * 异步操作需要有回调函数，且需要通过thunk包装一下
 */
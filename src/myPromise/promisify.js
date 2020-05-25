/**
 * 把一个函数最后的回调函数变为promise对象调用
 * @param { Function } fn 
 */
let promisify = function(fn) {
  return function(...argu) {
    return new Promise((resolve, rejuect) => {
      argu.push(function(error, ...argu2) {
        if (error) {
          rejuect(error);
        }
        resolve(...argu2);
      });
      fn.apply(this, argu)
    })
  }
}

function A(time, callBack) {
  setTimeout(() => {
    callBack(null, time);
  }, time);
}

let promisifyA = promisify(A);

promisifyA(2000).then((time) => {
  console.log('success' + time);
});
// function isType(str) {
//   return function(obj) {
//     return Object.prototype.toString.call(obj) === `[object ${str}]`;
//   }
// }
// let isString = isType('String');
// console.log(isString("123123"));

Function.prototype.before = function(beforeFnc) {
  let _self = this;
  return function() {
    beforeFnc(...arguments).then(
      () => {
        _self.apply(this)
      }
    )
  }
}

let i = 0;
setInterval(() => {
  i++;
}, 1000)

let wait = function() {
  console.log(`wait run ${i}`);
}

let temp = wait.before((...argu) => new Promise(resolve => {
  console.log(`before Run ${i} ${argu}`);
  setTimeout(() => {
    resolve()
  },2000)
}))

temp(1,2,3);
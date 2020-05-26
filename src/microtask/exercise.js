/**
 * 打印
 * parent
 * microtask1
 * promise
 * macrotask1
 * microtask2
 * promise2
 * microtask3
 * macrotask2
 * js的执行顺序，先执行主线，然后执行microtask队列，再从macrotask队列中去第一个来执行
 * 再检查microtask队列是否有待执行的任务，如果有的话把microtask队列里面的任务执行完
 * 包括执行microtask而生成的microtask
 */

console.log("parent");
setTimeout(() => {
  console.log("macrotask1");
  queueMicrotask(() => {
    console.log("microtask2");
    queueMicrotask(() => {
      console.log("microtask3");
    })
  })
  new Promise((resole) => {
    resole('promise2')
  }).then(onfufill => {
    console.log(onfufill);
  })
});
setTimeout(() => {
  console.log("macrotask2");
});
queueMicrotask(() => {
  console.log("microtask1");
})

new Promise((resole) => {
  resole('promise')
}).then(onfufill => {
  console.log(onfufill);
})
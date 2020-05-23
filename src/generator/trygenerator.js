//path1
function* tryGenerator(param) {
  console.log(param);
  let i = yield add(param);
  console.log(i);
}
function add(Num) {
  console.log(++Num);
  return Num;
}
let tg = tryGenerator(1);
console.log(tg.next('first'));
tg.next('second');

//path2
function* cycle1_3() {
  yield 1;
  yield 2;
  yield 3;
  return 4;
  yield 5;
}
for (const iterator of cycle1_3()) {
  console.log(iterator);
}

//path3
for (let index = 0; index < 2; index++) {
  try {
    throw new Error(index);
  } catch (error) {
    console.log(error);
  }
}

/**
 * 1、generator的执行顺序
 * 一次运行generator并不执行其中的代码
 * 第一个next先执行到yield后面的内容
 * 第二个next如果有入参的话会当做第一个yield的返回值
 * 
 * 2、forof的循环的时候如果最后有return是不会被循环到的
 * 
 * 3、trycatch只能捕获一次错误,捕获过一次错误就不会在进入try语句了
 */


function * fibonacci() {
  let [prev, curr] = [0, 1];
  while(true) {
    yield curr;
    [prev, curr] = [curr, curr + prev];
  }
}
let fibonacciRunner = fibonacci();
for (let index = 0; index < 100; index++) {
  console.log(fibonacciRunner.next().value);
}
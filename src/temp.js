let a = function () {
  let b = 1;//let 也符合必包的特性
  return function() {
    console.log(b);
  }
}

let c = a();
debugger
c();
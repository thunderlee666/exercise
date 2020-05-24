
/**
 * 箭头函数的this是取函数创建时候的[[scrpo]]作用域链
 * 箭头函数中的this总是指向初始化改函数时的this
 * 详细的this判断方式可以看冴羽大佬的git https://github.com/mqyqingfeng/Blog/issues/7
 * 
 * base value是该值的拥有者
 * 
 * 尤雨溪大大描述 Reference
 * 这里的 Reference 是一个 Specification Type，也就是 “只存在于规范里的抽象类型”。
 * 它们是为了更好地描述语言的底层行为逻辑才存在的，但并不存在于实际的 js 代码中。
 * 
 * GetValue 返回对象属性真正的值，但是要注意：调用 GetValue，
 * 返回的将是具体的值，而不再是一个 Reference
 * 
 * 1、先把()左边的内容( MemberExpression )ref提出来，看是否是 Reference 类型。
 * 2、如果ref是 Reference 类型，看 IsPropertyReference(ref) 的结果是多少，如果ref
 * 的 base value 是一个对象的话就返回true，如果是 true 的话 this = GetBase(ref);
 * 如果 ref 的 base value 是 EnvironmentRecord 的话，非严格模式下 this 指向全局对象，
 * 严格模式下 this 指向 undefined
 * 3、如果 ref 不是 Reference 类型，则在非严格模式下 this 指向全局对象，严格模式下 this 指向 undefined
 * 
 * 4、如果()左边有运算符、操作符或者条件判断，用GetValue来获取()左边的值，如果不是 Reference ，
 * 则 this 指向 undefined
 */

var foo = 1;
// 对应的Reference是：
var fooReference = {
  base: EnvironmentRecord,
  name: 'foo',
  strict: false
};
var foo = {
  bar: function () {
    return this;
  }
};
foo.bar(); // foo
// bar对应的Reference是：
var BarReference = {
  base: foo,
  propertyName: 'bar',
  strict: false
};

globalThis.z = 1;
this.z = 2;
let logZ1 = () => {
  console.log("logZ1 log this.z = " + this.z);
}
let logZ2 = function () {
  console.log("logZ2 log this.z = " + this.z);
}
let a = {
  z: 3,
  callLogZ() {
    let logZ3 = () => {
      console.log("logZ3 log this.z = " + this.z);
    }
    logZ1();
    logZ2();
    logZ3();
    logZ1.call(this)
    logZ2.call(this)
  }
}
a.callLogZ();

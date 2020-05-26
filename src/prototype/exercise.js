/**
 * [[Prototype]]内部属性就是 __proto__
 * 1、实例的 __proto__ 属性指向类的 prototype 对象。
 * 2、Object 的 prototype.__proto__ 指向的是 null 说明 Object 的 prototype 不是
 * 通过 Object 函数生成的，是浏览器根据 ECMAScript 规范创造的对象。
 * 3、类的 prototype.constructor 指向其本身。
 */
function Foo() {
  this.value = 'foo';
}
let f = new Foo()
console.log(`Object.getPrototypeOf(f) === Foo.prototype : ${Object.getPrototypeOf(f) === Foo.prototype}
Object.prototype.__proto__ === null : ${Object.prototype.__proto__ === null}
Foo === Foo.prototype.constructor : ${Foo === Foo.prototype.constructor}`);
console.log(f instanceof Foo, f instanceof Object);


/**
 * 1、实例的 prototype 是一个对象， Function.prototype 是一个函数。
 * 2、虽然 Function.prototype 是一个函数，但是 Function.prototype 是没有 prototype 对象。
 * 不然会无休止的 prototype 下去。
 */
console.log(`typeof Foo.prototype : ${typeof Foo.prototype}
typeof Function.prototype : ${typeof Function.prototype}
typeof Function.prototype.prototype : ${typeof Function.prototype.prototype}`);


/**
 * 1、 Object 和 普通函数 作为构造函数时，其 __proto__ 指向 Function.prototype 。
 * 2、 Function 的 [[Prototype]] 属性指向了 Function.prototype。
 */
let i = new Object();
console.log(`Object.__proto__ === Function.prototype : ${Object.__proto__ === Function.prototype}
Foo.__proto__ === Function.prototype : ${Foo.__proto__ === Function.prototype}
i.__proto__ === Object.prototype : ${i.__proto__ === Object.prototype}
Function.__proto__ === Function.prototype : ${Function.__proto__ === Function.prototype}`);


/**
 *  Object 和 Function 的原型都指向 Function ，他们原型的原型都指向 Object
 */
// Object instanceof Function 	即
Object.__proto__ === Function.prototype 					// true

// Function instanceof Object 	即
Function.__proto__.__proto__ === Object.prototype	// true

// Object instanceof Object 		即 			
Object.__proto__.__proto__ === Object.prototype 	// true

// Function instanceof Function 即	
Function.__proto__ === Function.prototype         // true

/**
 * 以下内容摘录 https://github.com/yygmind/blog/issues/35
 * 
 * JavaScript 内置类型是浏览器内核自带的，浏览器底层对 JavaScript 的实现基于 C/C++，那么浏览器在初始化 JavaScript 环境时都发生了什么？
 * 1、用 C/C++ 构造内部数据结构创建一个 OP 即 (Object.prototype) 以及初始化其内部属性但不包括行为。
 * 2、用 C/C++ 构造内部数据结构创建一个 FP 即 (Function.prototype) 以及初始化其内部属性但不包括行为。
 * 3、将 FP 的 [[Prototype]] 指向 OP。
 * 4、用 C/C++ 构造内部数据结构创建各种内置引用类型。
 * 5、将各内置引用类型的[[Prototype]]指向 FP。
 * 6、将 Function 的 prototype 指向 FP。
 * 7、将 Object 的 prototype 指向 OP。
 * 8、用 Function 实例化出 OP，FP，以及 Object 的行为并挂载。
 * 9、用 Object 实例化出除 Object 以及 Function 的其他内置引用类型的 prototype 属性对象。
 * 10、用 Function 实例化出除Object 以及 Function 的其他内置引用类型的 prototype 属性对象的行为并挂载。
 * 11、实例化内置对象 Math 以及 Grobal
 * 至此，所有内置类型构建完成。
 */
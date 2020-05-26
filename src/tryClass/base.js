/**
 * ES6 中 class 的一些特性
 * 1、class 的数据类型是 function
 * 2、class 等于自己原型上的构造函数
 * 3、class 中的方法不能通过 keys 来枚举
 * 4、必须用 new 调用
 * 5、每个 class 生成的实例的原型对象是相等的
 * 6、class 中属性的 get 和 set 在其 Descriptor 上面
 * 7、class 不会变量提升，也是绑定块级作用域，有暂时性死区的特性
 * 8、class 中的 this 指向当前实例
 * 9、在 class 中的方法签名加 static 改方法则为静态方法，静态方法
 * 只能用类名进行调用，类的实例是没有继承该方法的。静态方法可以和非静态
 * 方法重名。静态方法可以被继承，也可以在子类中重写。子类中可以通过 super 
 * 调用父类的静态方法。
 * 10、实例的属性可以写在 class 的顶部。
 * 11、在 class 的属性前面加 static 的话该属性为静态属性。
 * 12、私有属性和私有方法在属性和方法前面加“#”
 * 13、new.target 可以用来判断方法是否是通过new调用的，在 class 的 constructor 中 new.target 就
 * 是当前class。在子类中调用父类的构造函数时 new.target 指向的是子类。
 */

//基本用法
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getPoint() {
    console.log(`x = ${this.x}, y = ${this.y}`);
  }

  get z() {
    return 'getZ';
  }
  set z(Num) {
    console.log(`setZ = ${Num}`);
  }

  static getZ() {
    console.log('getZ is call.');
  }
}
let A = new Point(1,2);
let B = new Point(3,4);
A.getPoint();


//特性1
console.log(typeof Point, Point === Point.prototype.constructor);

//特性2
console.log(`keys = ${Object.keys(Point.prototype)}`);
console.log(`propertyNames = ${Object.getOwnPropertyNames(Point.prototype)}`);

//特性3
// Point()

//特性4
console.log(`原型对象相等${Object.getPrototypeOf(A) === Object.getPrototypeOf(B)}`);

//特性5
let Az = Object.getOwnPropertyDescriptor(Point.prototype, 'z');
console.log('get' in Az, 'set' in Az);

 export default Point;
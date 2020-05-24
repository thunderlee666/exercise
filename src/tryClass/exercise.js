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

/**
 * 1、class的数据类型是function
 * 2、class等于自己原型上的构造函数
 * 3、class中的方法不能通过keys来枚举
 * 4、必须用new调用
 * 5、实例的原型对象是相等的
 * 6、class中属性的get和set在其Descriptor上面
 * 7、class不会变量提升，也是绑定块级作用域，有暂时性死区的特性
 * 8、class中的this指向当前实例
 * 
 * 
 * 
 */
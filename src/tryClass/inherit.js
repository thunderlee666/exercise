import Point from './base.js';

/**
 * ES6 中函数继承的一些特性
 * 1、可以通过 extends 实现继承。
 * 2、子类必须在 constructor 方法中调用 super 方法，否则新建实例时会报错。
 * 这是因为子类自己的 this 对象，必须先通过父类的构造函数完成塑造，得到与
 * 父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。
 * 如果不调用 super 方法，子类就得不到 this 对象。
 * 3、子类用 super 调用父类的构造函数时，会把当前实例传入。
 * 4、super 作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
 * 5、super 在非静态方法中指向的是父类的 prototype 
 * 6、通过 super 对某个属性赋值这时 super 指向的是子类的实例。
 * 7、通过 super 取某个属性的值时，是取父类 prototype 上的属性。
 * 8、如果在静态方法中的 super 是指向父类，子类中的this也指向子类而非实例。
 * 9、子类的原型是父类，子类的 prototype 是父类 prototype 的实例。
 * 10、通过 class 可以继承原生的构造函数。
 */

class ColorPoint extends Point {
  constructor() {
    super(1, 2);
    Point.getZ();
  }
}

let a = new ColorPoint();

//下面是引用阮一峰的ES6 mixin,可以合并多个类
function mix(...mixins) {
  class Mix {
    constructor() {
      for (let mixin of mixins) {
        copyProperties(this, new mixin()); // 拷贝实例属性
      }
    }
  }
  for (let mixin of mixins) {
    copyProperties(Mix, mixin); // 拷贝静态属性
    copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
  }
  return Mix;
}
function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if ( key !== 'constructor'
      && key !== 'prototype'
      && key !== 'name'
    ) {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}

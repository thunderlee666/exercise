# 作用域链：

以下面的例子为例，理解一下函数执行上下文中作用域链和变量对象的创建过程：

``` ruby
var scope = "global scope";
function checkscope(){
    var scope2 = 'local scope';
    return scope2;
}
checkscope();
```
## 执行过程如下：

### 1. checkscope 函数被创建，保存作用域链到 内部属性 [[scope]]

>me：函数创建时会把当前上下文的作用域链保存。

``` ruby
checkscope.[[scope]] = [
    globalContext.VO
];
```

### 2. 执行 checkscope 函数，创建 checkscope 函数执行上下文，checkscope 函数执行上下文被压入执行上下文栈

>me：函数执行时会把当前函数的执行上下文push到执行栈中。

``` ruby
ECStack = [
    checkscopeContext,
    globalContext
];
```

### 3. checkscope 函数并不立刻执行，开始做准备工作，第一步：复制函数 [[scope]] 属性创建作用域链

``` ruby
checkscopeContext = {
    Scope: checkscope.[[scope]],
}
```

### 4. 第二步：用 arguments 创建活动对象，随后初始化活动对象，加入形参、函数声明、变量声明

``` ruby
checkscopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: undefined
    }，
    Scope: checkscope.[[scope]],
}
```

### 5. 第三步：将活动对象压入 checkscope 作用域链顶端

>me：函数执行之前会先做准备工作，先把创建时保存的作用域链放到当前执行上下文，再初始化当前函数的arguments
、实参和属性等，初始化活动对象，把活动对象放到作用域的顶部。

``` ruby
checkscopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: undefined
    },
    Scope: [AO, [[Scope]]]
}
```

### 6. 准备工作做完，开始执行函数，随着函数的执行，修改 AO 的属性值

>me：执行执行函数，修改活动对象的值。

``` ruby
checkscopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: 'local scope'
    },
    Scope: [AO, [[Scope]]]
}
```

### 7. 查找到 scope2 的值，返回后函数执行完毕，函数上下文从执行上下文栈中弹出

``` ruby
ECStack = [
    globalContext
];
```

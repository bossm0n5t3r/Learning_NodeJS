# Basic JavaScript

## 목차
- [ES2015+](#es2015)
  - [1. Declarations](#declarations)
  - [2. Template literals (Template strings)](#template-literals)
  - [3. Object literals](#object-literals)
  - [4. Arrow functions](#arrow-functions)
  - [5. 비구조화 할당 (Destructuring assignment)](#destructuring-assignment)
  - [6. 프로미스](#promise)
  - [7. async function](#async-function)
  - [8. await](#await)

<hr/>

<a name="es2015"></a>
## ES2015+

<a name="declarations"></a>
- ### 1. [Declarations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements#Declarations)
  - 변수를 선언하는 방법
    - 기존에는 var 로 변수를 선언함
    - But, 이제 const 와 let 이 대체
  - 블록 스코프
    - 기존의 var은 함수 스코프를 가지므로 블록과 관계없이 접근 가능
    - But, const 와 let 은 블록 스코프를 가지므로 블록 밖에서는 변수에 접근 x
    - 블록의 범위
      - if, while, for, function 등의 중괄호
    - 블록 스코프를 사용함으로써 코드 관리가 수월
  - const 와 let 의 차이
    - const
      - 한 번 대입하면 다른 값을 대입 x
    - let
      - 다른 값을 대입 가능

<a name="template-literals"></a>
- ### 2. [Template literals (Template strings)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
  - 백틱 (Back Quote / Backquote / Backtick) (`) 으로 감싸는 문자열
  - ```js
    `\`` === '`' // --> true
    
    console.log('string text line 1\n' +
    'string text line 2');
    // "string text line 1
    // string text line 2"

    console.log(`string text line 1
    string text line 2`);
    // "string text line 1
    // string text line 2"

    const a = 5;
    const b = 10;
    console.log(`Fifteen is ${a + b} and
    not ${2 * a + b}.`);
    // "Fifteen is 15 and
    // not 20."
    ```
  - Tagged templates
    - ```js
      var person = 'Mike';
      var age = 28;

      function myTag(strings, personExp, ageExp) {
        var str0 = strings[0]; // "That "
        var str1 = strings[1]; // " is a "

        // There is technically a string after
        // the final expression (in our example),
        // but it is empty (""), so disregard.
        // var str2 = strings[2];

        var ageStr;
        if (ageExp > 99){
          ageStr = 'centenarian';
        } else {
          ageStr = 'youngster';
        }

        // We can even return a string built using a template literal
        return `${str0}${personExp}${str1}${ageStr}`;
      }

      var output = myTag`That ${ person } is a ${ age }`;

      console.log(output);
      // That Mike is a youngster
      ```

<a name="object-literals"></a>
- ### 3. Object literals
  - ```js
    const sayNode = function() {
        console.log('Node');
    };
    const es = 'ES';
    const newObject = {
        sayJS() {
            console.log('JS');
        },
        sayNode,
        [es + 6]: 'Fantastic',
    };
    newObject.sayNode();        // Node
    newObject.sayJS();          // JS
    console.log(newObject.ES6); // Fantastic
    ```

<a name="arrow-functions"></a>
- ### 4. [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
  - Syntax
    - ```js
      (param1, param2, …, paramN) => { statements } 
      (param1, param2, …, paramN) => expression
      // equivalent to: => { return expression; }

      // Parentheses are optional when there's only one parameter name:
      (singleParam) => { statements }
      singleParam => { statements }

      // The parameter list for a function with no parameters should be written with a pair of parentheses.
      () => { statements }
      ```
    - ```js
      // Parenthesize the body of function to return an object literal expression:
      params => ({foo: bar})

      // Rest parameters and default parameters are supported
      (param1, param2, ...rest) => { statements }
      (param1 = defaultValue1, param2, …, paramN = defaultValueN) => { 
      statements }

      // Destructuring within the parameter list is also supported
      var f = ([a, b] = [1, 2], {x: c} = {x: a + b}) => a + b + c;
      f(); // 6
      ```
  - Arrow functions used as methods
    - ```js
      'use strict';

      var obj = {
        i: 10,
        b: () => console.log(this.i, this),
        c: function() {
          console.log(this.i, this);
        }
      }

      obj.b(); // prints undefined, Window {...} (or the global object)
      obj.c(); // prints 10, Object {...}
      ```
  - More examples
    - ```js
      // An empty arrow function returns undefined
      let empty = () => {};

      (() => 'foobar')(); 
      // Returns "foobar"
      // (this is an Immediately Invoked Function Expression 
      // see 'IIFE' in glossary)

      var simple = a => a > 15 ? 15 : a; 
      simple(16); // 15
      simple(10); // 10

      let max = (a, b) => a > b ? a : b;

      // Easy array filtering, mapping, ...

      var arr = [5, 6, 13, 0, 1, 18, 23];

      var sum = arr.reduce((a, b) => a + b);
      // 66

      var even = arr.filter(v => v % 2 == 0); 
      // [6, 0, 18]

      var double = arr.map(v => v * 2);
      // [10, 12, 26, 0, 2, 36, 46]

      // More concise promise chains
      promise.then(a => {
        // ...
      }).then(b => {
        // ...
      });

      // Parameterless arrow functions that are visually easier to parse
      setTimeout( () => {
        console.log('I happen sooner');
        setTimeout( () => {
          // deeper code
          console.log('I happen later');
        }, 1);
      }, 1);
      ```

<a name="destructuring-assignment"></a>
- ### 5. [비구조화 할당 (Destructuring assignment)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
  - Syntax
    - ```js
      var a, b, rest;
      [a, b] = [10, 20];
      console.log(a); // 10
      console.log(b); // 20

      [a, b, ...rest] = [10, 20, 30, 40, 50];
      console.log(a); // 10
      console.log(b); // 20
      console.log(rest); // [30, 40, 50]

      ({ a, b } = { a: 10, b: 20 });
      console.log(a); // 10
      console.log(b); // 20


      // Stage 4(finished) proposal
      ({a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40});
      console.log(a); // 10
      console.log(b); // 20
      console.log(rest); // {c: 30, d: 40}
      ```
  - Array destructuring
    - ```js
      // Basic variable assignment
      var foo = ['one', 'two', 'three'];

      var [one, two, three] = foo;
      console.log(one); // "one"
      console.log(two); // "two"
      console.log(three); // "three"

      // Assignment separate from declaration
      var a, b;

      [a, b] = [1, 2];
      console.log(a); // 1
      console.log(b); // 2

      // Default values
      var a, b;

      [a=5, b=7] = [1];
      console.log(a); // 1
      console.log(b); // 7

      // Swapping variables
      var a = 1;
      var b = 3;

      [a, b] = [b, a];
      console.log(a); // 3
      console.log(b); // 1

      // Parsing an array returned from a function
      function f() {
        return [1, 2];
      }

      var a, b; 
      [a, b] = f(); 
      console.log(a); // 1
      console.log(b); // 2

      // Ignoring some returned values
      function f() {
        return [1, 2, 3];
      }

      var [a, , b] = f();
      console.log(a); // 1
      console.log(b); // 3

      [,,] = f();

      // Assigning the rest of an array to a variable
      var [a, ...b] = [1, 2, 3];
      console.log(a); // 1
      console.log(b); // [2, 3]

      // Unpacking values from a regular expression match
      function parseProtocol(url) { 
        var parsedURL = /^(\w+)\:\/\/([^\/]+)\/(.*)$/.exec(url);
        if (!parsedURL) {
          return false;
        }
        console.log(parsedURL); // ["https://developer.mozilla.org/en-US/Web/JavaScript", "https", "developer.mozilla.org", "en-US/Web/JavaScript"]

        var [, protocol, fullhost, fullpath] = parsedURL;
        return protocol;
      }

      console.log(parseProtocol('https://developer.mozilla.org/en-US/Web/JavaScript')); // "https"
      ```
  - Object destructuring
    - ```js
      // Basic assignment
      var o = {p: 42, q: true};
      var {p, q} = o;

      console.log(p); // 42
      console.log(q); // true

      // Assignment without declaration
      var a, b;

      ({a, b} = {a: 1, b: 2});

      // Assigning to new variable names
      var o = {p: 42, q: true};
      var {p: foo, q: bar} = o;
      
      console.log(foo); // 42 
      console.log(bar); // true

      // Default values
      var {a = 10, b = 5} = {a: 3};

      console.log(a); // 3
      console.log(b); // 5

      // Assigning to new variables names and providing default values
      var {a: aa = 10, b: bb = 5} = {a: 3};

      console.log(aa); // 3
      console.log(bb); // 5

      // Setting a function parameter's default value
      function drawES2015Chart({size = 'big', coords = {x: 0, y: 0}, radius = 25} = {}) {
        console.log(size, coords, radius);
        // do some chart drawing
      }

      drawES2015Chart({
        coords: {x: 18, y: 30},
        radius: 30
      });

      // Nested object and array destructuring
      const metadata = {
        title: 'Scratchpad',
        translations: [
          {
            locale: 'de',
            localization_tags: [],
            last_edit: '2014-04-14T08:43:37',
            url: '/de/docs/Tools/Scratchpad',
            title: 'JavaScript-Umgebung'
          }
        ],
        url: '/en-US/docs/Tools/Scratchpad'
      };

      let {
        title: englishTitle, // rename
        translations: [
          {
            title: localeTitle, // rename
          },
        ],
      } = metadata;

      console.log(englishTitle); // "Scratchpad"
      console.log(localeTitle);  // "JavaScript-Umgebung"

      // For of iteration and destructuring
      var people = [
        {
          name: 'Mike Smith',
          family: {
            mother: 'Jane Smith',
            father: 'Harry Smith',
            sister: 'Samantha Smith'
          },
          age: 35
        },
        {
          name: 'Tom Jones',
          family: {
            mother: 'Norah Jones',
            father: 'Richard Jones',
            brother: 'Howard Jones'
          },
          age: 25
        }
      ];

      for (var {name: n, family: {father: f}} of people) {
        console.log('Name: ' + n + ', Father: ' + f);
      }
      // "Name: Mike Smith, Father: Harry Smith"
      // "Name: Tom Jones, Father: Richard Jones"

      // Unpacking fields from objects passed as function parameter
      function userId({id}) {
        return id;
      }

      function whois({displayName, fullName: {firstName: name}}) {
        console.log(displayName + ' is ' + name);
      }

      var user = { 
        id: 42, 
        displayName: 'jdoe',
        fullName: { 
            firstName: 'John',
            lastName: 'Doe'
        }
      };

      console.log('userId: ' + userId(user)); // "userId: 42"
      whois(user); // "jdoe is John"

      // Computed object property names and destructuring
      let key = 'z';
      let {[key]: foo} = {z: 'bar'};

      console.log(foo); // "bar"

      // Rest in Object Destructuring
      let {a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40}
      a; // 10 
      b; // 20 
      rest; // { c: 30, d: 40 }

      // Invalid JavaScript identifier as a property name
      const foo = { 'fizz-buzz': true };
      const { 'fizz-buzz': fizzBuzz } = foo;

      console.log(fizzBuzz); // "true"

      // Combined Array and Object Destructuring
      const props = [
        { id: 1, name: 'Fizz'},
        { id: 2, name: 'Buzz'},
        { id: 3, name: 'FizzBuzz'}
      ];

      const [,, { name }] = props;

      console.log(name); // "FizzBuzz"
      ```

<a name="promise"></a>
- ### 6. [프로미스](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
  - Promise 개체는 비동기 작업이 맞이할 미래의 완료 또는 실패와 그 결과 값을 나타냄
  - Promise는 다음 중 하나의 상태
    - 대기(pending) : 이행하거나 거부되지 않은 초기 상태
    - 이행(fulfilled) : 연산이 성공적으로 완료됨
    - 거부(rejected) : 연산이 실패함
  - 대기 중인 프로미스는 값과 함께 이행할 수도, 어떤 이유(오류)로 인해 거부될 수 있음
  - 이행이나 거부될 때, 프로미스에 연결한 처리기는 그 프로미스의 then 메서드에 의해 대기열에 오름
  - 이미 이행했거나 거부된 프로미스에 연결한 처리기도 호출
    - 비동기 연산과 처리기 연결 사이에 경합 조건(race condition)은 없음
  - ![promise.png](../src/img/promises.png)
  - 속성
    - **Promise.length**
      - 값이 언제나 1인 길이 속성 (생성자 인수의 수)
    - **Promise.prototype**
      - Promise 생성자의 프로토타입
  - Methods
    - **Promise.all(iterable)**
      - iterable 내의 모든 프로미스가 이행한 뒤 이행하고, 어떤 프로미스가 거부하면 즉시 거부하는 프로미스를 반환
      - 반환된 프로미스가 이행하는 경우 iterable 내의 프로미스가 결정한 값을 모은 배열이 이행 값
      - 반환된 프로미스가 거부하는 경우 iterable 내의 거부한 프로미스의 이유를 그대로 사용
      - 이 메서드는 여러 프로미스의 결과를 모을 때 유용
    - **Promise.race(iterable)**
      - iterable 내의 어떤 프로미스가 이행하거나 거부하는 즉시 스스로 이행하거나 거부하는 프로미스를 반환
      - 이행 값이나 거부 이유는 원 프로미스의 값이나 이유를 그대로 사용
    - **Promise.reject()**
      - 주어진 이유로 거부하는 Promise 객체를 반환
    - **Promise.resolve()**
      - 주어진 값으로 이행하는 Promise 객체를 반환
      - 값이 then 가능한 (즉, then 메서드가 있는) 경우, 반환된 프로미스는 then 메서드를 따라가고 마지막 상태를 취함
      - 그렇지 않은 경우 반환된 프로미스는 주어진 값으로 이행
      - 어떤 값이 프로미스인지 아닌지 알 수 없는 경우, Promise.resolve(value) 후 반환값을 프로미스로 처리
  - Basic Example
    - ```js
      let myFirstPromise = new Promise((resolve, reject) => {
        // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
        // In this example, we use setTimeout(...) to simulate async code. 
        // In reality, you will probably be using something like XHR or an HTML5 API.
        setTimeout(function(){
          resolve("Success!"); // Yay! Everything went well!
        }, 250);
      });

      myFirstPromise.then((successMessage) => {
        // successMessage is whatever we passed in the resolve(...) function above.
        // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
        console.log("Yay! " + successMessage);
      });
      ```
  - Advanced Example
    - ```js
      'use strict';
      var promiseCount = 0;

      function testPromise() {
          let thisPromiseCount = ++promiseCount;

          let log = document.getElementById('log');
          log.insertAdjacentHTML('beforeend', thisPromiseCount +
              ') Started (<small>Sync code started</small>)<br/>');

          // We make a new promise: we promise a numeric count of this promise, starting from 1 (after waiting 3s)
          let p1 = new Promise(
              // The executor function is called with the ability to resolve or
              // reject the promise
            (resolve, reject) => {
                  log.insertAdjacentHTML('beforeend', thisPromiseCount +
                      ') Promise started (<small>Async code started</small>)<br/>');
                  // This is only an example to create asynchronism
                  window.setTimeout(
                      function() {
                          // We fulfill the promise !
                          resolve(thisPromiseCount);
                      }, Math.random() * 2000 + 1000);
              }
          );

          // We define what to do when the promise is resolved with the then() call,
          // and what to do when the promise is rejected with the catch() call
          p1.then(
              // Log the fulfillment value
              function(val) {
                  log.insertAdjacentHTML('beforeend', val +
                      ') Promise fulfilled (<small>Async code terminated</small>)<br/>');
              }).catch(
              // Log the rejection reason
            (reason) => {
                  console.log('Handle rejected promise ('+reason+') here.');
              });

          log.insertAdjacentHTML('beforeend', thisPromiseCount +
              ') Promise made (<small>Sync code terminated</small>)<br/>');
      };
      ```

<a name="async-function"></a>
- ### 7. [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
  - Syntax
    - ```js
      async function name([param[, param[, ... param]]]) {
        statements
      }
      ```
    - Parameters
      - name
        - 함수의 이름
      - param
        - 함수에게 전달되기 위한 인자의 이름
      - statements
        - 함수본문을 구성하는 내용
    - Return value
      - Promise : async 함수에 의해 반환 된 값으로 해결되거나 async함수 내에서 발생하는 캐치되지 않는 예외로 거부되는 값
  - async 함수에는 await식이 포함될 수 있음
  - 이 식은 async 함수의 실행을 일시 중지하고 전달 된 Promise의 해결을 기다린 다음 async 함수의 실행을 다시 시작하고 완료후 값을 반환
  - await 키워드는 async 함수에서만 유효
  - async 함수의 본문 외부에서 사용하면 SyntaxError가 발생
  - async/await함수의 목적은 사용하는 여러 promise의 동작을 동기스럽게 사용할 수 있게 함
  - 어떠한 동작을 여러 promise의 그룹에서 간단하게 동작하게 하는 것
  - promise가 구조화된 callback과 유사한 것 처럼 async/await또한 제네레이터(generator)와 프로미스(promise)를 묶는것과 유사
  - Examples
    - Simple example
      - ```js
        var resolveAfter2Seconds = function() {
          console.log("starting slow promise");
          return new Promise(resolve => {
            setTimeout(function() {
              resolve("slow");
              console.log("slow promise is done");
            }, 2000);
          });
        };

        var resolveAfter1Second = function() {
          console.log("starting fast promise");
          return new Promise(resolve => {
            setTimeout(function() {
              resolve("fast");
              console.log("fast promise is done");
            }, 1000);
          });
        };

        var sequentialStart = async function() {
          console.log('==SEQUENTIAL START==');

          // 1. Execution gets here almost instantly
          const slow = await resolveAfter2Seconds();
          console.log(slow); // 2. this runs 2 seconds after 1.

          const fast = await resolveAfter1Second();
          console.log(fast); // 3. this runs 3 seconds after 1.
        }

        var concurrentStart = async function() {
          console.log('==CONCURRENT START with await==');
          const slow = resolveAfter2Seconds(); // starts timer immediately
          const fast = resolveAfter1Second(); // starts timer immediately

          // 1. Execution gets here almost instantly
          console.log(await slow); // 2. this runs 2 seconds after 1.
          console.log(await fast); // 3. this runs 2 seconds after 1., immediately after 2., since fast is already resolved
        }

        var concurrentPromise = function() {
          console.log('==CONCURRENT START with Promise.all==');
          return Promise.all([resolveAfter2Seconds(), resolveAfter1Second()]).then((messages) => {
            console.log(messages[0]); // slow
            console.log(messages[1]); // fast
          });
        }

        var parallel = async function() {
          console.log('==PARALLEL with await Promise.all==');
          
          // Start 2 "jobs" in parallel and wait for both of them to complete
          await Promise.all([
              (async()=>console.log(await resolveAfter2Seconds()))(),
              (async()=>console.log(await resolveAfter1Second()))()
          ]);
        }

        // This function does not handle errors. See warning below!
        var parallelPromise = function() {
          console.log('==PARALLEL with Promise.then==');
          resolveAfter2Seconds().then((message)=>console.log(message));
          resolveAfter1Second().then((message)=>console.log(message));
        }

        sequentialStart(); // after 2 seconds, logs "slow", then after 1 more second, "fast"

        // wait above to finish
        setTimeout(concurrentStart, 4000); // after 2 seconds, logs "slow" and then "fast"

        // wait again
        setTimeout(concurrentPromise, 7000); // same as concurrentStart

        // wait again
        setTimeout(parallel, 10000); // truly parallel: after 1 second, logs "fast", then after 1 more second, "slow"

        // wait again
        setTimeout(parallelPromise, 13000); // same as parallel
        ```

<a name="await"></a>
- ### 8. [await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)
  - await연산자는 Promise를 기다리기 위해 사용
  - [async function](#async-function) 내부에서만 사용
  - Syntax
    - ```js
      [rv] = await expression;
      ```
    - expression
      - 기다릴 Promise 혹은 아무 값
    - rv
      - Promise에 의해 fulfill되는 값이 반환
      - Promise가 아닌 경우에는 그 값 자체가 반환
  - await 문은 async함수의 실행을 중단시키고, Promise가 fulfill되거나 reject되기를 기다리고, 다시 async함수를 실행
    - 이때  await 문의 값은 Promise 에서 fulfill된 값
  - 만약 Promise가 reject되면, await은 reject된 값을 throw
  - await 연산자 다음에 나오는 문의 값이 Promise가 아니면 해당 값을 resolved Promise로 변환
  - Examples
    - 만약 Promise가 await에 넘겨지면, await은 Promise가 fulfill되기를 기다렸다가, 해당 값을 리턴
      - ```js
        function resolveAfter2Seconds(x) { 
          return new Promise(resolve => {
            setTimeout(() => {
              resolve(x);
            }, 2000);
          });
        }

        async function f1() {
          var x = await resolveAfter2Seconds(10);
          console.log(x); // 10
        }
        f1();
        ```
    - 만약 값이 Promise가 아니라면, 해당 값은 resolve된 Promise로 변환되며 이를 기다림
      - ```js
        async function f2() {
          var y = await 20;
          console.log(y); // 20
        }
        f2();
        ```
    - 만약 Promise가 reject되면, reject된 값이 throw
      - ```js
        async function f3() {
          try {
            var z = await Promise.reject(30);
          } catch(e) {
            console.log(e); // 30
          }
        }
        f3();
        ```
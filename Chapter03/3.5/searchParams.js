const { URL } = require('url');

const myURL = new URL('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');
console.log('searchParams:              ', myURL.searchParams);
console.log('searchParams.getAll():     ', myURL.searchParams.getAll('category'));
console.log('searchParams.get():        ', myURL.searchParams.get('limit'));
console.log('searchParams.has():        ', myURL.searchParams.has('page'));

console.log('searchParams.keys():       ', myURL.searchParams.keys());
console.log('searchParams.values():     ', myURL.searchParams.values());

myURL.searchParams.append('filter', 'es3');
myURL.searchParams.append('filter', 'es5');
console.log(myURL.searchParams.getAll('filter'));

myURL.searchParams.set('filter', 'es6');
console.log(myURL.searchParams.getAll('filter'));

myURL.searchParams.delete('filter');
console.log(myURL.searchParams.getAll('filter'));

console.log('searchParams.toString():   ', myURL.searchParams.toString());
myURL.search = myURL.searchParams.toString();

/*
getAll(키):     키에 해당하는 모든 값들을 가져옴.
                category 키에는 두 가지 값, 즉 nodejs와 javascript의 값이 들어 있음.
get(키):        키에 해당하는 첫 번째 값만
has(키):        해당 키가 있는지 없는지 검사
keys():         searchParams의 모든 키를 반복기(iterator) 객체로 가져옴.
values():       searchParams의 모든 값을 반복기 객체로 가져옴.
append(키, 값): 해당 키를 추가. 같은 키의 값이 있다면 유지하고 하나 더 추가
set(키, 값):    append와 비슷하지만 같은 키의 값들을 모두 지우고 새로 추가
delete(키):     해당 키를 제거
toString():     조작한 searchParams 객체를 다시 문자열로 만듦.
                이 문자열을 search에 대입하면 주소 객체에 반영됨.


* query 같은 문자열보다 searchParams가 유용한 이유는 query의 경우 querystring 모듈을 한 번 더 사용해야 하기 때문
*/
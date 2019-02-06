const url = require('url');

const address = 'http://www.gilbut.co.kr/book/bookList.aspx?sercate=1=001001000#anchor';

const URL = url.URL;
const myURL = new URL(address);

console.log('new URL():     ', myURL);
console.log('url.format():  ', url.format(myURL));
console.log('-------------------------------------------');

const parseURL = url.parse(address);

console.log('url.parse():   ', parseURL);
console.log('url.format():  ', url.format(parseURL));

/*
url 모듈 안에 URL 생성자가 있음. 이 생성자에 주소를 넣어 객체로 만들면 주소가 부분별로 정리.
이 방식이 WHATWG의 url이다.
WHATWG에만 있는 username, password, origin, searchParams 속성이 존재.

기존 노드 방식에서는 두 메서드를 주로 사용한다.
url.parse(주소):    주소를 분해.
                    WHATWG 방식과 비교하면 username과 password대신 auth 속성이 있고, searchParams 대신 query가 있음.
url.format(객체):   WHATWG 방식의 url과 기존 노드의 url 모두 사용할 수 있음.
                    분해되었던 url 객체를 다시 원래 상태로 조립.
*/
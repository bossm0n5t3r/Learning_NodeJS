const timeout = setTimeout(() => {
    console.log('1.5초 후 실행');
}, 1500);

const interval = setInterval(() => {
    console.log('1초마다 실행');
}, 1000);

const timeout2 = setTimeout(() => {
    console.log('실행되지 않습니다.');
}, 3000);

setTimeout(() => {
    clearTimeout(timeout2);
    clearInterval(interval);
}, 2500);

const immediate = setImmediate(() => {
    console.log('즉시 실행');
});

const immediate2 = setImmediate(() => {
    console.log('실행되지 않습니다.');
});

clearImmediate(immediate2);

/*
setTimeout(콜백 함수, 밀리초):  주어진 밀리초(1/1000 초) 이후에 콜백 함수를 실행
setInterval(콜백 함수, 밀리초): 주어진 밀리초마다 콜백 함수를 반복 실행
setImmediate(콜백 함수):        콜백 함수를 즉시 실행

clearTimeout(아이디):   setTimeout을 취소
clearInterval(아이디):  setInterval을 취소
clearImmediate(아이디): setImmediate을 취소

setImmediate(콜백) vs setTimeout(콜백, 0)
=>  setImmediate(콜백)과 setTimeout(콜백, 0)에 담긴 콜백 함수는 이벤트 루프를 거친 뒤 즉시 실행
    특수한 경우에 setImmediate가 setTimeout(콜백, 0)보다 먼저 실행
    =>  파일 시스템 접근, 네트워킹 같은 I/O 작업의 콜백 함수 안에서 타이머를 호출하는 경우
    BUT, setImmediate가 항상 setTimeout(콜백, 0)보다 먼저 호출되는 것은 X

    헷갈리지 않게 setTimeout(콜백, 0)은 사용하지 않는 것을 권장
*/
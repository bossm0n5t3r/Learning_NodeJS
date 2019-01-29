setImmediate(() => {
    console.log('immediate');
});
process.nextTick(() => {
    console.log('nextTick');
});
setTimeout(() => {
    console.log('timeout');
}, 0);
Promise.resolve().then(() => console.log('promise'));

/*
process.nextTick은 setImmediate나 setTimeout보다 먼저 실행
코드 맨 밑에 Promise를 넣은 것은 resolve된 Promise도 nextTick처럼 다른 콜백들 보다 우선시 되기 때문

process.nextTick과 Promise를 마이크로테스크(microtask)라고 따로 구분지어 부른다.
*/
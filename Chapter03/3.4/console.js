const string = 'abc';
const number = 1;
const boolean = true;
const obj = {
    outside: {
        inside: {
            key: 'value',
        },
    },
};
console.time('전체 시간');
console.log('평범한 로그입니다. 쉼표로 구분해 여러 값을 찍을 수 있습니다.');
console.log(string, number, boolean);
console.error('에러 메시지는 console.error에 담아주세요.');

console.dir(obj, { colors: false, depth:2 });
console.dir(obj, { colors: true, depth:1 });
console.dir(obj, { colors: true, depth:2 });
console.dir(obj, { colors: true, });

console.time('시간 측정');
for (let i = 0; i < 100000; i++) {
    continue;
}
console.timeEnd('시간 측정');

function b() {
    console.trace('에러 위치 추적');
}

function a() {
    b();
}
a();

console.timeEnd('전체 시간');

/*
console.time(레이블):   console.timeEnd(레이블)과 대응되어 같은 레이블을 가진 time과 timeEnd 사이의 시간 측정.
console.log(내용):      평범한 로그를 콘솔에 표시. 여러 내용인 경우, console.log(내용, 내용, ... , 내용)
console.error(에러 내용):   에러를 콘솔에 표시
console.dir(객체, 내용):    객체를 콘솔에 표시할 때 사용. 첫 번째 인자로 표시할 객체를 넣고, 두 번째 인자로 옵션을 넣음.
                            옵션의 colors를 true => 콘솔에 색이 추가됨. 가독성 좋아짐.
                            depth는 객체 안의 객체를 몇 단계까지 보여줄지 결정
                            depth의 기본값: 2
console.trace(레이블):  에러가 어디서 발생했는지 추적. 보통은 에러 발생 시 에러 위치를 알려주나, 위치가 나오지 않는다면 사용.
*/
const util = require('util');
const crypto = require('crypto');

const dontUseMe = util.deprecate((x, y) => {
    console.log(x + y);
}, 'dontUseMe 함수는 deprecated되었으니 더 이상 사용하지 마세요!');
dontUseMe(1, 2);

const randomBytesPromise = util.promisify(crypto.randomBytes);
randomBytesPromise(64)
    .then((buf) => {
        console.log(buf.toString('base64'));
    })
    .catch((error) => {
        console.log(error);
    });

/*
util.deprecate: 함수가 deprecated 처리되었음을 알려줌.
                첫 번째 인자로 넣은 함수를 사용했을 때 경고 메시지가 출력됨.
                두 번째 인자로 경고 메시지 내용을 넣으면 된다.
                함수가 조만간 사라지거나 변경될 때 알려줄 수 있어 유용함.
util.promisify: 콜백 패턴을 프로미스 패턴으로 바꿔줌.
                바꿀 함수를 인자로 제공하면 된다.
                이렇게 바꾸어두면 async/await 패턴까지 사용할 수 있으므로 좋다.
                util.callbackify도 있지만 자주 사용되지는 않음.
*/
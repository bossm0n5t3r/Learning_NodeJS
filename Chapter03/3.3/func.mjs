import { odd, even } from './var';

function checkOddOrEven(num) {
    if (num % 2) {
        return odd;
    }
    return even;
}

export default checkOddOrEven;

// require -> import
// module.exports -> export default
// 노드에서도 9 버전부터 ES2015의 모듈 시스템을 사용 가능
// BUT 파일의 확장자를 mjs로 지정해야 하고,
// 실행 시 node --experimental-modules [파일명] 처럼 특별한 옵션을 붙여주어야 하는 제한
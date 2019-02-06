const crypto = require('crypto');

console.log('base64:    ', crypto.createHash('sha512').update('비밀번호').digest('base64'));
console.log('hex:       ', crypto.createHash('sha512').update('비밀번호').digest('hex'));
console.log('base64:    ', crypto.createHash('sha512').update('다른 비밀번호').digest('base64'));

/*
createHash(알고리즘):   사용할 해시 알고리즘을 넣어줌. md5, sha1, sha256, sha512 등이 가능.
                        BUT, md5, sha1은 이미 취약점이 발견!
                        현재는 sha512 정도로 충분하지만, 나중에 sha512마저도 취약해지면 더 강화된 알고리즘으로 바꿔야함.
update(문자열):         변환할 문자열을 넣어줌.
digest(인코딩):         인코딩할 알고리즘을 넣어줌. base64, hex, latin1이 주로 사용되는데,
                        그 중 base64가 결과 문자열이 가장 짧아 애용됨.
                        결과물로 변환된 문자열을 반환.
*/
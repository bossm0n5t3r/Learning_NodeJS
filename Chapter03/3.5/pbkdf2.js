const crypto = require('crypto');

crypto.randomBytes(64, (err, buf) => {
    const salt = buf.toString('base64');
    console.log('salt:      ', salt);
    crypto.pbkdf2('비밀번호', salt, 100000, 64, 'sha512', (err, key) => {
        console.log('password:  ', key.toString('base64'));
    });
});

/*
crypto.randomBytes(문자열 바이트):                                      64바이트 길이의 문자열 생성. 이것이 salt가 됨.
crypto.pbkdf2(비밀번호, salt, 반복 횟수, 출력 바이트, 해시 알고리즘):   비밀번호에 salt를 붙여, 해시 알고리즘으로 반복 횟수만큼 변환.
*/
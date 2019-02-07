const fs = require('fs');

fs.copyFile('readme4.txt', 'writeme4.txt', (error) => {
    if (error) {
        return console.log(error);
    }
    console.log('복사 완료');
});

/*
pipe.js 방식으로 하지 않아도 파일 복사 가능
*/
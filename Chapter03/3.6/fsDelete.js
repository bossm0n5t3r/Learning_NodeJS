const fs = require('fs');

fs.readdir('./folder', (err, dir) => {
    if (err) {
        throw err;
    }
    console.log('폴더 내용 확인', dir);
    fs.unlink('./folder/newFile.js', (err) => {
        if (err) {
            throw err;
        }
        console.log('파일 삭제 성공');
        fs.rmdir('./folder', (err) => {
            if (err) {
                throw err;
            }
            console.log('폴더 삭제 성공');
        });
    });
});

/*
fs.readdir(경로, 콜백): 폴더 안의 내용물을 확인
                        배열 안에 내부 파일과 폴더명이 나옴
fs.unlink(경로, 콜백):  파일을 지울 수 있음
                        파일이 없다면 에러가 발생하므로 먼저 존재 여부 확인
fs.rmdir(경로, 콜백):   폴더를 지울 수 있음
                        폴더 안에 파일이 있다면 에러가 발생하므로 먼저 내부 파일을 모두 지우고 호출
*/
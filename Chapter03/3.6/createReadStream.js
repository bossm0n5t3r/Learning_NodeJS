const fs = require('fs');

const readStream = fs.createReadStream('./readme3.txt', { highWaterMark: 16 });
const data = [];

readStream.on('data', (chunk) => {
    data.push(chunk);
    console.log('data:  ', chunk, chunk.length);
});

readStream.on('end', () => {
    console.log('end:   ', Buffer.concat(data).toString());
});

readStream.on('error', (err) => {
    console.log('error: ', err);
});

/*
createReadStream(): 읽기 스트림을 생성. 첫 번째 인자로 읽을 파일 경로,
                    두 번째 인자는 옵션 객체로 highWaterMark라는 옵션이 버퍼의 크기(바이트 단위)를 정하는 옵션.
                    기본값은 64KB이지만 여러 번 나눠서 보내는 모습을 위해 16B로 설정.
readStream:         이벤트 리스너를 붙여서 사용. 보통 data, end, error 이벤트를 사용.
*/
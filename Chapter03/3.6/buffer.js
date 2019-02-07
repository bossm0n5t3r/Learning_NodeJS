const buffer = Buffer.from('저를 버퍼로 바꿔보세요.');
console.log('from():        ', buffer);
console.log('length:        ', buffer.length);
console.log('toString():    ', buffer.toString());

const array = [Buffer.from('띄엄 '), Buffer.from('띄엄 '), Buffer.from('띄어쓰기')];
const buffer2 = Buffer.concat(array);
console.log('concat():      ', buffer2.toString());

const buffer3 = Buffer.alloc(5);
console.log('alloc():       ', buffer3);

/*
from(문자열):       문자열을 버퍼로 바꿈. length 속성은 버퍼의 크기 리턴 (바이트 단위).
toString(버퍼):     버퍼를 다시 문자열로 바꿈. 이때 base64나 hex를 인자로 넣으면 해당 인코딩으로 변환.
concat(배열):       배열 안에 든 버퍼들을 하나로 합침.
alloc(바이트):      빈 버퍼를 생성. 바이트를 인자로 지정해주면 해당 크기의 버퍼가 생성.
*/
/*
폴더와 파일의 경로를 쉽게 조작하도록 도와주는 모듈

이유 => 운영체제별로 경로 구분자가 다르기 때문

Windows:    \ 로 구분
POSIX:      / 로 구분 (macOS, Linux)
*/

const path = require('path');

const string = __filename;

console.log('path.sep:          ', path.sep);
console.log('path.delimiter:    ', path.delimiter);
console.log('------------------------------------------');
console.log('path.dirname():    ', path.dirname(string));
console.log('path.extname():    ', path.extname(string));
console.log('path.basename():   ', path.basename(string));
console.log('path.basename():   ', path.basename(string, path.extname(string)));
console.log('------------------------------------------');
console.log('path.parse():      ', path.parse(string));
console.log('path.format():     ', path.format({
    dir:    'c:\\Users\\hoon\\Desktop\\gitFolders\\Learning_NodeJS\\Chapter03\\3.4',
    name:   'path',
    ext:    '.js',
}));
// 일부러 경로를 올바르지 않게 넣음
console.log('path.normalize():  ', path.normalize('c://Users\\\\\\hoon\\\\Desktop\\gitFolders\\Learning_NodeJS\\Chapter03\\3.4\\path.js'));
console.log('------------------------------------------');
console.log('path.isAbsolute(): ', path.isAbsolute('c:\\'));
console.log('path.isAbsolute(): ', path.isAbsolute('./home'));
console.log('------------------------------------------');
console.log('path.relative():   ', path.relative('c:\\Users\\hoon\\Desktop\\gitFolders\\Learning_NodeJS\\Chapter03\\3.4\\path.js', 'c:\\'));
console.log('path.join():       ', path.join(__dirname, '..', '..', '/users', '.', '/hoon'));
console.log('path.resolve():    ', path.resolve(__dirname, '..', 'users', '.', '/hoon'));

/*
path.sep:                           경로의 구분자, Windows: \, POSIX: /
path.delimiter:                     환경 변수의 구분자, process.env.PATH를 입력하면 여러개의 경로가 이 구분자로 구분되어있음
                                    Windows: ;, POSIX: :
path.dirname(경로):                 파일이 위치한 폴더 경로
path.extname(경로):                 파일의 확장자
path.basename(경로, 확장자):        파일의 이름(확장자 포함)을 보여줌
                                    파일의 이름만 표시하고 싶다면 basename의 두 번째 인자로 파일의 확장자를 넣어주면 됨
path.parse(경로):                   파일의 경로를 root, dir, base, ext, name으로 분리
path.normalize(경로):               /나 \를 실수로 여러 번 사용했거나 혼용했을 때 정상적인 경로로 변환
path.isAbsolute(경로):              파일의 경로가 절대경로인지 상대경로인지 true나 false로 알려줌
path.relative(기준경로, 비교경로):  경로를 두 개 넣으면 첫 번째 경로에서 두 번째 경로로 가는 방법을 알려줌
path.join(경로, ...):               여러 인자를 넣으면 하나의 경로로 합쳐줌
                                    상대경로인 ..(부모 디렉토리)과 .(현 위치)도 알아서 처리
path.resolve(경로, ...):            path.join()과 비슷하지만 동작 방식이 다름

 - path.join 과 path.resolve의 차이
path.resolve는 /를 만나면 절대경로로 인식해서 앞의 경로를 무시하고,
path.join은 상대경로로 처리

path.join('/a', '/b', 'c');     결과: /a/b/c
path.resolve('/a', '/b', 'c');  결과: /b/c

 - \\과 \ 사용의 차이
기본적으로 경로는 \ 하나를 사용해서 표시
하지만 자바스크립트 문자열에서는 \가 특수문자이므로, \를 두 개 붙여 경로를 표시
path 모듈은 위와 같은 경우에 발생하는 문제를 알아서 처리
그래서 Windows에서 path 모듈이 꼭 필요함

 - Windows에서 POSIX 스타일 path를 사용할 때, 혹은 그 반대의 경우에는?
Windows:    path.posix.sep이나 path.posix.join() 같이 사용
POSIX:      path.win32.sep이나 path.win32.join() 같이 사용
*/
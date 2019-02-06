const os = require('os');

console.log('운영체제 정보  -------------------------------');
console.log('os.arch():         ', os.arch());
console.log('os.platform():     ', os.platform());
console.log('os.type():         ', os.type());
console.log('os.uptime():       ', os.uptime());
console.log('os.hostname():     ', os.hostname());
console.log('os.release():      ', os.release());

console.log('경로           -------------------------------');
console.log('os.homedir():      ', os.homedir());
console.log('os.tmpdir():       ', os.tmpdir());

console.log('cpu 정보       -------------------------------');
console.log('os.cpus():         ', os.cpus());
console.log('os.cpus().length:  ', os.cpus().length);

console.log('메모리 정보    -------------------------------');
console.log('os.freemem():      ', os.freemem());
console.log('os.totalmem():     ', os.totalmem());

console.log('os.constants   -------------------------------');
console.log(os.constants);

/*
os.arch():      process.arch 와 동일
os.platform():  process.platform 과 동일
os.type():      운영체제의 종류를 보여줌
os.uptime():    운영체제 부팅 이후 흐른 시간(초)를 보여줌
                process.uptime() 은 노드의 실행 시간
os.hostname():  컴퓨터의 이름
os.release():   운영체제의 버전
os.homedir():   홈 디렉토리 경로
os.tmpdir():    임시 파일 저장 경로
os.cpus():      컴퓨터의 코어 정보
os.freemem():   사용 가능한 메모리(RAM)
os.totalmem():  전체 메모리 용량

 - 코어 개수 확인하기
os.cpus().length를 하면 코어의 개수가 숫자로 나옴.
하지만 노드는 싱글 스레드라, 코어가 몇 개이든 대부분의 경우 코어를 하나밖에 사용하지 않음.
하지만 cluster 모듈을 사용하는 경우 코어 개수에 맞춰서 프로세스를 늘릴 수 있음.
이때 cpus() 메서드를 사용할 것.

os.constants:   각종 에러와 신호에 대한 정보
                에러가 발생했을 때, EADDRINUSE (Address already in use) 나, ECONNRESET 같은 에러 코드를 함께 보여줌.
                ("ECONNRESET" means the other side of the TCP conversation abruptly closed its end of the connection.)
                이러한 코드들이 os.constants 안에 들어있음.
                에러가 발생할 때마다 검색해보는 것이 좋음.

* 일반적인 웹 서비스를 제작할 때는 사용 빈도가 높지 않으나, 운영체제별로 다른 서비스를 제공하고 싶을 때 os 모듈이 유용함.
*/
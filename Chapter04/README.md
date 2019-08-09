# Creating a Web server with the http module

## Request and Response
- 클라이언트 --- 요청 (request)  --> 서버
- 클라이언트 <-- 응답 (response) --- 서버
- [createServer.js](./4.1/createServer.js)
  - http 서버가 있어야 웹 브라우저의 요청을 처리할 수 있으므로 [http 모듈](https://nodejs.org/api/http.html) 사용
  - createServer
    - http 모듈에 포함
    - 인자로 요청에 대한 콜백함수를 넣을 수 있음
    - 요청이 들어올 때마다 매번 콜백 함수가 실행
    - 따라서 콜백 함수에 응답을 적어주면 됨
    - 콜백 함수의 매개 변수
      - 매개 변수의 이름은 자유롭게 바꿔도 됨
      - req (request)
        - 요청에 관한 정보
      - res (response)
        - 응답에 관한 정보
- [server1.js](./4.1/server1.js)
  - createServer 메서드 뒤에 listen 메서드를 붙이고 클라이언트에게 공개할 포트 번호와 포트 연결 완료 후 실행될 콜백 함수를 넣어줌
  - 이 파일을 실행하면 서버는 8080 포트에서 요청 대기
- [server1-0.js](./4.1/server1-0.js)
  - [server1.js](./4.1/server1.js)에서 listen 메서드에 콜백 함수를 넣는 대신, [server1-0.js](./4.1/server1-0.js)같이 서버에 listening 이벤트 리스너를 붙여도 됨
  - 추가로 error 이벤트 리스너도 붙임
  - res 객체에는 [res.write](https://nodejs.org/api/http.html#http_response_write_chunk_encoding_callback) 와 [res.end](https://nodejs.org/api/http.html#http_response_end_data_encoding_callback) 메서드가 있음
    - [res.write](https://nodejs.org/api/http.html#http_response_write_chunk_encoding_callback)
      - 첫 번째 parameter는 chunk
        - 반드시 포함
        - chunk는 string 또는 buffer 로 구성되어 있음
        - 만약 chunk가 string이면, 두 번째 parameter는 byte stream으로 인코딩하는 방법을 지정
        - 클라이언트로 보낼 데이터
      - 두 번째 parameter는 encoding
        - 생략이 가능함
        - Default : 'utf-8'
      - 세 번째 parameter는 callback function
        - 생략이 가능함
        - chunk of data 가 flushed 되면 호출됨
    - [res.end](https://nodejs.org/api/http.html#http_response_end_data_encoding_callback)
      - 응답을 종료하는 메서드
      - 만약 data가 있다면, data도 클라이언트에 보내고 응답을 종료
      - 이 method 는 **반드시 각각의 response 마다 호출**해야 함
        - 안하는 경우 클라이언트는 호출되기를 계속 대기
- [server2.html](./4.1/server2.html), [server2.js](./4.1/server2.js)
  - 요청이 들어오면 fs 모듈로 HTML 파일을 읽음
  - 그리고 data 변수에 저장된 버퍼를 그대로 클라이언트에 보내면 됨

## Cookie and Session
- Cookie 란?
  - 'key - value' 쌍
  - 서버는 미리 클라이언트에 요청자가 추정할 만한 정보를 쿠키로 만들어 보내고, 그 다음부터는 클라이언트로부터 쿠키를 받아 요청자를 파악
  - 쿠키는 사용자가 누구인지 추적
  - 요청과 응답의 헤더(header)에 저장
  - 요청과 응답은 각각 헤더(header)와 본문(body)을 가짐
- [server3.js](./4.2/server3.js)
  - parseCookies
    - 쿠키는 name=mudo;year=2005 처럼 문자열 형식으로 오므로 이를 { name: 'mudo', year: '2005' } 와 같이 객체로 바꾸는 함수
  - createServer
    - 콜백에서는 제일 먼저 req 객체의 쿠키를 분석
    - 쿠키는 req.headers.cookie 에 들어있음
    - req.headers 는 요청의 헤더를 의미
    - 응답의 헤더에 쿠키를 기록하려면 res.writeHead 메서드 사용
    - res.writeHead
      - 첫 번째 인자
        - 200 : 성공의 의미
      - 두 번째 인자
        - 헤더의 내용을 입력
        - Set-Cookie 는 브라우저한테 다음과 같은 값의 쿠키를 저장하라는 의미
        - 실제로 응답을 받은 브라우저는 mycookie=test 라는 쿠키를 저장
- HTTP 상태 코드
  - 2XX
    - 성공을 알리는 상태 코드
    - 200(성공), 201(작성됨)
  - 3XX
    - 리다이렉션(다른 페이지로 이동)을 알리는 상태 코드
    - 어떤 주소를 입력했는데 다른 주소의 페이지로 넘어갈 때 이 코드가 사용
    - 301(영구 이동), 302(임시 이동)
  - 4XX
    - 요청 오류
    - 요청 자체에 오류가 있을 때 표시
    - 401(권한 없음), 403(금지됨), 404(찾을 수 없음)
  - 5XX
    - 서버 오류
    - 요청은 제대로 왔지만 서버에 오류가 생겼을 때 발생
    - 서버가 알아서 5XX대 코드를 보냄
    - 500(내부 서버 오류), 502(불량 게이트웨이), 503(서비스를 사용할 수 없음)
- [server4.html](./4.2/server4.html), [server4.js](./4.2/server4.js)
  - 쿠키 설정 옵션
    - 쿠키명=쿠키값
      - 기본적인 쿠키의 값
    - Expires=날짜
      - 만료 기한
      - 기본 값
        - 클라이언트가 종료될 때 까지
    - Max-age=초
      - Expires와 비슷하지만 날짜 대신 초를 입력
      - 초가 지나면 쿠키가 제거
      - Expires보다 우선
    - Domain=도메인명
      - 쿠키가 전송될 도메인을 특정
      - 기본값
        - 현재 도메인
    - Path=URL
      - 쿠키가 전송될 URL을 특정
      - 기본값
        - /
          - 이 경우 모든 URL에서 쿠키를 전송 가능
    - Secure
      - HTTPS일 경우에만 쿠키가 전송
    - HttpOnly
      - 설정 시 자바스크립트에서 쿠키에 접근할 수 없음
      - 쿠키 조작을 방지하기 위해 설정하는 것이 좋음
- [server5.js](./4.2/server5.js)
  - 이름 같은 민감한 개인정보를 쿠키에 넣어두는 것은 적절하지 못함
  - 쿠키에 이름을 담아서 보내는 대신, randomInt 라는 임의의 숫자를 보냄
  - 사용자의 이름과 만료시간은 session 이라는 객체에 대신 저장
  - cookie.session 이 있고 만료 기한을 넘기지 않았다면 session 변수에서 사용자 정보를 가져와서 사용

## REST API and Routing
- REST API
  - REpresentational State Transfer
  - 네트워크 구조의 한 형식
  - 서버의 자원을 정의하고, 자원에 대한 주소를 지정하는 방법을 가리킴
    - 주소는 의미를 명확히 전달하기 위해 명사로 구성됨
  - 주소 외에도 HTTP 요청 메서드를 사용
  - HTTP 요청 메서드
    - GET
      - 서버의 자원을 가져올 때 사용
      - 요청의 본문에 데이터를 넣지 않음
      - 데이터를 서버로 보내야 한다면 쿼리스트링을 사용
    - POST
      - 서버에 자원을 새로 등록하고자 할 때 사용
      - 요청의 본문에 새로 등록할 데이터를 넣어 보냄
    - PUT
      - 서버의 자원을 요청에 들어 있는 자원으로 치환하고자 할 때 사용
      - 요청의 본문에 치환할 데이터를 넣어 보냄
    - PATCH
      - 서버 자원의 일부만 수정하고자 할 때 사용
      - 요청의 본문에 일부 수정할 데이터를 넣어 보냄
    - DELETE
      - 서버의 자원을 삭제하고자 할 때 사용
  - 주소 하나가 요청 메서드를 여러 개 가질 수 있음
  - 주소와 메서드만 보고 요청의 내용을 명확하게 알아볼 수 있다는 것이 장점
  - GET 메서드 같은 경우에는 브라우저에서 캐싱할 수도 있어서 같은 주소의 GET 요청을 할 때 서버에서 가져오는 것이 아니라 캐시에서 가져올 수도 있음
    - 캐싱이 되면 성능이 좋아짐
  - HTTP 프로토콜을 사용하면 클라이언트가 누구든 상관없이 서버와 소통 가능
  - 즉, 서버와 클라이언트가 분리
    - 서버와 클라이언트를 분리하면 클라이언트와 상관없이 추후에 서버를 확장 가능
  - REST API를 따르는 서버를 RESTful 하다고 함
  - 서버 주소의 구조
  - | HTTP 메서드 | 주소            | 역할                     |
    |:-----------:|:---------------:|:------------------------:|
    | GET 	      | /  	            | restFront.html 파일 제공 |
    | GET  	      | /about  	      | about.html 파일 제공  	 |
    | GET  	      | /users  	      | 사용자 목록 제공  	     |
    | GET  	      | 기타  	        | 기타 정적 파일 제공  	   |
    | POST        | /users  	      | 사용자 등록  	           |
    | PUT  	      | /users/사용자id | 해당 id의 사용자 수정  	 |
    | DELETE      | /users/사용자id | 해당 id의 사용자 제거  	 |

## http and http2
- https 모듈은 웹 서버에 SSL 암호화를 추가
- GET 이나 POST 요청을 할 때 오고 가는 데이터를 암호화해서 중간에 요청을 훔쳐가도 내용을 확인할 수 없게 만듦
- 요즘은 로그인이나 결제가 필요한 창에서 https 적용은 필수
- [server1.js](./4.4/server1.js)
  - 이 서버에 암호화를 적용하려면 https 모듈을 사용
  - 암호화를 적용하는 만큼, 그것을 인증해줄 수 있는 기관도 필요
  - 인증서는 인증 기관에서 구입
  - [Let's Encrypt](https://letsencrypt.org/) 같은 기관에서 무료로 발급도 가능
  - 발급받은 인증서가 있다면 다음과 같이 하면 됨
- [server1-1.js](./4.4/server1-1.js)
  - createServer 메서드가 두 개의 인자를 받음
    - 인증서에 관련된 옵션 객체
    - http 모듈과 같은 서버 로직
  - 인증서를 구입하면 pem 이나 crt, 또는 key 확장자를 가진 파일들을 제공
  - 이 파일들을 fs.readFileSync 메서드로 읽어서 cert, key, ca 옵션에 알맞게 넣어주면 됨
- [server1-2.js](./4.4/server1-2.js)
  - 노드의 http2 모듈은 SSL 암호화와 더불어 http/2 프로토콜을 사용할 수 있게 해줌
  - http/2는 요청 및 응답 방식이 기존 http/1.1 보다 개선되어 훨씬 효율적으로 요청 보냄
  - http/2를 사용하면 웹의 속도도 많이 개선
  - https 모듈과 거의 유사
    - https -> http2 
    - createServer -> createSecureServer

## cluster

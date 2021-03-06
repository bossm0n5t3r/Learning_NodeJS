# Create Express Web Server

## Quickly install with Express-generator
- Express-generator 를 전역 설치
  - ```sh
    $ npm i -g express-generator
    ```
- 새 익스프레스 프로젝트 생성
  - ```sh
    $ express <프로젝트 이름> [명령어]
    ```
  - --view=pug? --view=ejs?
    - 템플릿 엔진에 관한 것
    - Express-generator 는 기본적으로 Jade를 템플릿 엔진으로 설치
    - 하지만 Jade 는 Pug로 개명했기에, 옵션으로 --view=pug 를 주어 설치
    - EJS 템플릿 엔진으로 사용하고 싶으면 옵션으로 --view=ejs 를 주어 설치
- 폴더 구조
  - app.js
    - 핵심적인 서버 역할
  - bin/www
    - 서버를 실행하는 스크립트
  - public
    - 외부(클라이언트)에서 접근 가능한 파일들을 모아둔 곳
    - 이미지, 자바스크립트, CSS 파일 등
  - routes (서버의 로직)
    - 주소별 라우터들을 모아둔 곳
  - views (화면 부분)
    - 템플릿 파일들
  - models (데이터 부분)
    - 데이터 부분
- MVC 패턴 (Model - View - Contorler)

## Understanding Express Structures
- bin/[www](./6.1/learning-express/bin/www)
  - 핵심 파일
  - http 모듈에 express 모듈을 연결하고, 포트를 지정하는 부분
  - #!/usr/bin/env node
    - 콘솔 명령어로 만듦
- [app.js](./6.1/learning-express/app.js)
  - express 패키지를 호출하여 app 변수 객체를 생성
    - 해당 변수에 각종 기능을 연결
  - app.set 메서드로 express 앱을 설정
  - app.use 부분은 미들웨어 연결하는 부분
  - 마지막엔 app 객체를 모듈로 만듦
    - bin/www에서 사용된 app 모듈

## Middleware
- 미들웨어는 익스프레스의 핵심
  - 요청과 응답 중간(middle)에 위치하여 미들웨어라고 부름
- 라우터와 에러 핸들러 또한 미들웨어의 일종
- 미들웨어의 역할
  - 요청과 응답을 조작하여 기능을 추가하기도 하고, 나쁜 요청을 거르기도 함
- 미들웨어는 주로 app.use와 함께 사용됨
- app.use의 역할
  - app.use 메서드의 인자로 들어 있는 함수가 미들웨어
- 미들웨어는 use 메서드로 app에 장착
- 커스텀 미들웨어
  - ```js
    app.use(function(req, res, next) {
        console.log(req.url, '저도 미들웨어입니다');
        next();
    });
    ```
  - 주의해야 할 점
    - 반드시 미들웨어 안에서 next()를 호출해야 다음 미들웨어로 넘어감
    - logger, express.json, express.url.urlencoded, cookieParser, express.static 모두 내부적으로 next() 호출
    - next()는 미들웨어의 흐름을 제어하는 핵심적인 함수
    - next()를 주석처리하면?
      - 요청의 흐름이 끊겨서 계속 로딩 표시
  - next() 함수의 기능
    - 인자의 종류로 기능이 구분
    - 인자를 아무것도 넣지 않으면
      - 다음 미들웨어로 넘어감
    - 인자로 route를 넣으면 특수한 기능
    - route 외의 다른 값을 넣으면 다른 미들웨어나 라우터를 건너 뛰고 바로 에러 핸들러로 이동
      - 넣어준 값은 에러에 대한 내용으로 간주
  - 에러 핸들링 미들웨어는 일반적으로 미들웨어 중 제일 아래에 위치하여 위에 있는 미들웨어에서 발생하는 에러를 받아서 처리
- app.use의 응용방법
  - 하나의 use에 미들웨어를 여러 개 장착 가능
    - ```js
      app.use('/', function1, function2, function3, ...)
      ```
- morgan
  - 콘솔에 나오는 로그는 모두 morgan 미들웨어에서 나옴
  - 요청에 대한 정보를 콘솔에 기록
  - 사용방법
    - ```js
      ...
      var logger = require('morgan')
      ...
      app.use(logger('dev'))
      ...
      ```
    - 함수의 인자로 dev 대신 short, common, combined 등을 줄 수 있음
    - 인자에 따라 콘솔에 나오는 로그가 다름
    - dev
      - [HTTP요청] [주소] [HTTP상태코드] [응답속도] - [응답바이트]
  - 보통 개발 시에는 short이나 dev를 많이 사용
  - 배포 시에는 common이나 combined를 많이 사용
  - 콘솔뿐만 아니라 파일이나 데이터베이스에 로그를 남길 수도 있음
    - winston 모듈을 더 많이 사용
- body-parser
  - 요청의 본문을 해석해주는 미들웨어
  - 보통 폼 데이터나 AJAX 요청의 데이터를 처리
  - express 4.16.0 버전부터 body-parser 의 일부 기능이 express에 내장
  - 사용 방법
    - ```js
      app.use(express.json());
      app.use(express.urlencoded({ extended: false }));
      ```
  - body-parser가 필요한 경우
    - JSON과 URL-encoded 형식의 본문 외에도, Raw, Text 형식의 본문을 추가로 해석 가능
    - Raw
      - 본문이 버퍼 데이터일 때 해석
    - Text
      - 본문이 텍스트 데이터일 때 해석
    - 서비스에 적용하는 방법
      - ```js
        app.use(bodyParser.raw());
        app.use(bodyParser.text());
        ```
    - JSON
      - JSON 형식의 데이터 전달 방식
    - URL-encoded
      - 주소 형식으로 데이터를 보내는 방식
      - 보통 폼 전송이 URL-encoded 방식을 주로 사용
  - urlencoded({ extended: false })
    - false
      - 노드의 querystring 모듈을 사용하여 쿼리스트링을 해석
    - true
      - qs 모듈을 사용하여 쿼리스트링을 해석
      - qs 모듈은 내장 모듈이 아니라, npm 패키지
        - querystring 모듈의 기능을 조금 더 확장한 모듈
  - body-parser가 모든 본문을 해석해주는 것은 아님
    - multipart/form-data 같은 폼을 통해 전송된 데이터는 해석 못함
    - 이는 다른 모듈을 사용해서 해석해야 함
- cookie-parser
  - 요청에 동봉된 쿠키를 해석
  - 해석된 쿠키들은 req.cookies 객체에 들어감
  - ```js
    app.use(cookieParser('secret code')); //와 같이 첫 번째 인자로 문자열을 넣어줄 수 있음
    ```
  - 이제 쿠키들은 제공한 문자열로 서명된 쿠키가 됨
  - 서명된 쿠키들은 클라이언트에서 수정시 에러가 발생하므로, 클라이언트에서 쿠키로 위험한 행동을 하는 것을 방지할 수 있음
- static
  - 정적인 파일들을 제공
  - ```js
    app.use(express.static(path.join(__dirname, 'public')));
    ```
  - 함수의 인자로 정적 파일들이 담겨 있는 폴더를 지정하면 됨
  - 서버의 폴더 경로와 요청 경로가 다르므로, 외부인이 서버의 구조를 쉽게 파악할 수 없음
    - 보안에 큰 도움
  - 정적 파일들을 알아서 제공
  - ```js
    app.use('/img', express.static(path.join(__dirname, 'public')));
    ```
    - 정적 파일을 제공할 주소를 지정
    - /img 경로를 붙인 http://localhost:3000/img/해당파일 주소로 접근 가능
  - 요청에 부합하는 정적 파일을 발견한 경우 응답으로 해당 파일을 전송
  - 이 경우 응답을 보냈으므로 다음에 나오는 라우터가 실행되지 않음
    - 만약 파일을 찾지 못했다면 요청을 라우터로 넘김
  - 자체적으로 정적 파일 라우터 기능을 수행하므로 최대한 위쪽에 배치하는 것이 좋음
    - 그래야 서버가 쓸데없는 미들웨어 작업을 수행하는 것을 막을 수 있음
    - 필자는 보통 morgan 다음에 배치
      - morgan 위의 경우에는 정적 파일 요청이 기록되지 않기 때문
  - 서비스에 따라 쿠키 같은 것이 정적 파일을 제공하는데 영향을 끼칠 수 있으므로 자신의 서비스에 맞는 위치를 선택해야 함
- express-session
  - 세션 관리용 미들웨어
  - 로그인 등의 이유로 세션을 구현할 때 매우 유용
  - express-generator로 설치되지 않으므로 직접 설치가 필요
  - 인자로 세션에 대한 설정을 받음
  - resave
    - 요청이 왔을 때 세션에 수정사항이 생기지 않더라도 세션을 다시 저장할지에 대한 설정
  - saveUninitialized
    - 세션에 저장할 내역이 없더라도 세션을 저장할지에 대한 설정
    - 방문자 추적시 사용
  - secret
    - 필수 항목
    - cookie-parser의 비밀키와 같은 역할
  - 세션 관리시 클라이언트에 쿠키를 보냄
    - 이것을 **세션 쿠키**라고 부름
  - 안전하게 쿠키를 전송하려면 쿠키에 서명을 추가해야 하고, 쿠키를 서명하는 데 secret의 값이 필요
    - cookie-parser의 secret과 같게 설정
  - cookie 옵션은 세션 쿠키에 대한 설정
    - maxAge, domain, path, expires, sameSite, httpOnly, secure 등 일반적인 쿠키 옵션이 모두 제공
    - 배포 시에는 https를 적용하고, secure도 true로 설정하는 것이 좋음
  - store
    - 메모리에 세션을 저장하게 되면, 서버 재시작시 메모리가 초기화되어 세션이 모두 사라짐
    - 배포 시에는 store에 데이터베이스를 연결하여 세션을 유지하는 것이 좋음
    - 보통 Redis 가 자주 쓰임
  - req 객체 안에 req.session 객체를 생성
    - 이 객체에 값을 대입하거나 삭제해서 세션을 변경 가능
    - 나중에 세션을 한번에 삭제하려면 req.session.destory() 메서드를 호출
  - 현재 세션의 아이디는 req.sessionID 로 확인 가능
- connect-flash
  - 상대적으로 중요도가 떨어지는 미들웨어
  - 일회성 메시지들을 웹 브라우저에 나타낼 때 좋음
  - cookie-parser와 express-session을 사용하므로, 이들보다는 뒤에 위치
  - flash 미들웨어는 req 객체에 req.flash 메서드를 추가
    - req.flash(키, 값)으로 해당 키에 값을 설정하고, req.flash(키)로 해당 키에 대한 값을 불러옴
  - 일회성 메시지라는 성질을 이용하여 로그인 에러나 회원가입 에러 같은 일회성 경고 메시지 활용에 좋음

## Routing to Router object
- Express 사용하는 이유 중 하나가 라우팅을 깔끔하게 관리 가능
- ```js
  ...
  var indexRouter = require('./routes/index');
  var usersRouter = require('./routes/users');
  ...
  app.use('/', indexRouter);
  app.use('/users', usersRouter);
  ...
  ```
  - use 대신에 get, post, put, patch, delete 같은 HTTP 메서드 사용 가능
  - use 메서드는 모든 HTTP 메서드에 대해 요청 주소만 일치하면 실행
  - get, post, put, patch, delete 같은 메서드는 주소뿐만 아니라 HTTP 메서드까지 일치하는 요청일 때만 실행
- 라우터
  - 라우터 파일들은 routes 폴더 안에 있음
  - router 객체는 express.Router()로 생성
  - 마지막에는 module.exports = router;로 라우터를 모듈로 만듦
  - router에도 app처럼 use, get, post, put, patch, delete 같은 메서드를 붙일 수 있음
    - use를 제외하고 HTTP 요청 메서드와 상응
  - app.use 처럼 router 하나에 미들웨어를 여러 개 장착 가능
  - 실제 라우터 로직이 실행되는 미들웨어 전에 로그인 여부 또는 관리자 여부를 체크하는 미들웨어를 중간에 넣어 두곤 함
    - ```js
      router.get('/', middleware1, middleware2, middleware3)
      ```
- 코드 설명
  - ```js
    router.get('/')
    ```
    - / 주소로 GET 요청을 하는 것과 같음
  - ```js
    res.render
    ```
    - 클라이언트에 응답 보냄
    - 익스프레스가 응답 객체에 개로 추가한 메서드
    - 템플릿 엔진을 사용하는 부분
- 라우터에서는 반드시 요청에 대한 응답을 보내거나 에러 핸들러로 요청을 넘겨야 함
- 응답을 보내지 않으면 브라우저는 계속 응답을 기다림
- res 객체에 들어있는 메서드들로 응답을 보냄
- next 함수에는 라우터에서만 동작하는 특수 기능이 존재
  - ```js
    next('route')
    ```
  - 라우터에 연결된 나머지 미들웨어들을 건너뛰고 싶을 때 사용
- 라우터 주소에는 특수한 패턴을 사용 가능
  - ```js
    router.get('/users/:id', function(req, res) {
        console.log(req.params, req.query);
    });
    ```
  - 주소에 :id 가 있음
    - /users/1 또는 /users/123 등의 요청이 라우터에 걸릴 때 req.params.id 를 통해서 조회가능
    - :type 이면 req.params.type 으로 조회 가능
  - 주소에 쿼리스트링을 쓸 때도 있음
    - 쿼리스트링의 키-값 정보는 req.query 객체 안에 들어 있음
  - Example
    - ```js
      /users/123?limit=5&skip=10
      // 이라는 주소의 요청이 들어 왔을 때
      // req.params 와 req.query 객체는 다음과 같다
      // { id: '123' } { limit: '5', skip: '10' }
      ```
    - 요청 주소에 대한 정보가 담겨 있어서 요긴하게 활용 가능
      - 주의할 점
        - 일반 라우터보다 뒤에 위치
        - 다양한 라우터를 아우르는 와일드카드 역할을 하므로 일반 라우터보다 뒤에 위치해야 다른 라우터를 방해하지 않음
- 에러가 발생하지 않았다면 라우터는 요청을 보낸 클라이언트에게 응답을 보내줘야 함
  - 응답 메서드
    - send, sendFile, json, redirect, render 등
  - send
    - 만능 메서드
    - 버퍼 데이터나 문자열 전송
    - HTML 코드 전송
    - JSON 데이터 전송
  - sendFile
    - 파일을 응답으로 보냄
  - json
    - JSON 데이터를 보냄
  - redirect
    - 응답을 다른 라우터로 보냄
    - 로그인 완료 후 다시 메인 화면으로 돌아갈 때
      - res.redirect(메인 화면 주소)
  - 기본적으로 200 HTTP 상태 코드를, res.redirect는 302를 응답하지만, 직접 바꾸는 것이 가능
    - status 메서드 사용
      - ```js
        res.status(404).send('Not Found')
        ```
  - render
    - 템플릿 엔진을 렌더링할 때 사용
  - 하나의 요청에 대한 응답은 한 번만 보내야 함
    - 두 번 이상 보내면 에러 발생
- 라우터가 요청을 처리하지 못하는 경우
  - 요청을 처리할 수 있는 라우터가 없다면 다음 미들웨어로 넘어감
  - 404 HTTP 상태 코드를 보내주어야 하므로 다음 미들웨어에서 새로운 에러를 만들고 에러의 상태코드를 404로 설정한 뒤 에러 처리 미들웨어로 넘김

## Using the template engine
- 템플릿 엔진은 자바스크립트를 사용해서 HTML을 렌더링할 수 있게 해줌
- 대표적인 템플릿 엔진 Pug, EJS
- [Pug (Jade)](https://pugjs.org/)
  - 예전 이름이 Jade, 현재는 Pug
  - 문법이 간단하여 코드의 양이 줄어듦
  - 자세한 사항은 [해당 사이트](https://pugjs.org/) 참고
- [EJS](https://ejs.co/)
  - 자바의 JSP 문법과 상당히 유사
  - 자세한 사항은 [해당 사이트](https://ejs.co/) 참고
- Numjucks, Hogan, Dust, Twig, Vash 등 여러 템플릿 엔진 존재
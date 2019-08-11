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

## Middleware
## Routing to Router object
## Using the template engine
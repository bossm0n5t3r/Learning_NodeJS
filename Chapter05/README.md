# Package Manager

## What is npm?
- npm 이란?
  - Node Package Manager
- 패키지
  - npm에 업로드된 노드 모듈
  - 다른 패키지를 사용하는 관계를 의존 관계라고 부름

## Managing packages with package.json
- package.json
  - 설치한 패키지의 버전을 관리하는 파일
- 프로젝트 시작하기전에 package.json부터 만들고 시작하는게 좋음
- package.json 만드는 명령어
  - ```sh
    $ npm init
    ```
- 패키지 설치
  - ```sh
    $ npm install [패키지 이름] [패키지 이름] [패키지 이름] [...]
    ```
  - dependencies 속성에서 관리
- --save 옵션
  - npm@5 부터는 기본값으로 설정
- 개발용 패키지 설치
  - 실제 배포 시에는 사용되지 않고, 개발 중에만 사용되는 패키지
  - ```sh
    $ npm install --save-dev [패키지] [...]
    ```
  - devDependencies 속성에서 관리
- 전역 설치
  - ```sh
    $ npm install --global [패키지] [...]
    ```
  - 전역 설치한 패키지는 package.json 에 기록되지 않음
- node_modules
  - 패키지가 설치된 폴더
  - 언제든지 npm install을 통해서 설치가 가능
  - 버전 관리 프로그램(Git)등을 사용할 때에도 커밋하지 않음
  - 중요한 파일은 package.json 이므로 이 파일만 있으면 됨
- npx 명령어
  - 전역 설치를 기피하는 경우에 사용
  - 사용 방법
    - 일반적인 설치 후, 실행 시 앞에 npx 를 붙여서 사용하면 전역 설치한 것과 같은 효과를 얻을 수 있음
    - ```sh
      $ npx [패키지] [해당 패키지 명령어]
      ```
- npm에 등록되지 않은 패키지
  - ```sh
    $ npm install [저장소 주소]
    ```
- 명령어 줄여쓰기
  - npm install -> npm i
  - --save-dev  -> -D
  - --global    -> -g

## Understanding package version
## npm commands
## Distributing package
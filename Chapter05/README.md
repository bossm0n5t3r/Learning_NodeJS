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
- | 원래 명령어 | 명령어 줄여쓰기 |
  |:-----------:|:---------------:|
  | npm install	| npm i  	        |
  | --save-dev  | -D  	          |
  | --global  	| -g  	          |

## Understanding package version
- 노드 패키지들의 버전은 항상 세 자리
- 심지어 노드의 버전도 세 자리
- 왜냐하면 SemVer 방식의 버전 넘버링을 따르기 때문임
- SemVer 이란?
  - Semantic Versioning (유의적 버전)
  - 각각 패키지는 모두 버전이 다르고, 패키지 간의 의존 관계도 복잡
  - 만약 어떤 패키지의 버전을 업그레이드 했는데, 그것을 사용하는 다른 패키지에서 에러 발생하면 문제
  - 따라서 버전 번호를 어떻게 정하고 올려야 하는지를 명시하는 규칙
- 버전의 첫 번째 자리
  - major 버전
  - 주 버전이 0이면 초기 개발 중
  - 1 부터 정식 버전
  - major 버전은 하위 호환이 안 될 정도로 패키지의 내용이 수정되었을 때 올림
- 버전의 두 번째 자리
  - minor 버전
  - 하위 호환이 되는 기능 업데이트 시 올림
  - minor 버전까지는 하위호환 보장됨
- 버전의 세 번째 자리
  - patch 버전
  - 기존 기능에 문제가 있어서 수정한 것을 내놓았을 때 올림
- 새 버전을 배포한 후에는 그 버전의 내용을 절대 수정하면 안됨
- 배포된 버전 내용이 바뀌지 않기 때문에 패키지 간 의존 관계에 큰 도움
- 버전의 숫자마다 의미가 부여되어 있으므로 다른 패키지를 사용할 때도 버전만 보고 에러 발생 여부를 가늠 가능
- 버전 앞의 기호들
  - | 기호	   | 의미                                |
    |:--------:|:-----------------------------------:|
    | ^ 	     | minor 버전까지만 설치 또는 업데이트 |
    | ~ 	     | patch 버전까지만 설치 또는 업데이트 |
    | >     	 | 초과 	                             |
    | < 	     | 미만 	                             |
    | >= 	     | 이상  	                             |
    | <= 	     | 이하  	                             |
    | =        | 동일  	                             |
    | @lastest | 최신 (x로도 표현)                   |

## npm commands
- |명령어                                         |기능                                                                                                      |
  |:---------------------------------------------:|:--------------------------------------------------------------------------------------------------------:|
  | npm outdated                                  |업데이트할 수 있는 패키지가 있는지 확인                                                                 	 |
  | npm update [패키지명]   	                    |업데이트   	                                                                                             |
  | npm update   	                                |업데이트 가능한 패키지가 모두 Wanted 에 적힌 버전으로 업데이트   	                                       |
  | npm uninstall [패키지명]<br>npm rm [패키지명] |해당 패키지를 제거<br>패키지가 node_modules폴더와 package.json에서 사라짐   	                             |
  | npm search [검색어]   	                      |npm의 패키지를 검색   	                                                                                   |
  | npm info [패키지명]   	                      |패키지의 세부정보<br>package.json의 내용과 의존관계, 설치 가능한 버전 정보 등   	                         |
  | npm adduser   	                              |npm 로그인을 위한 명령어<br>npm 공식 사이트에서 가입한 계정으로 로그인                              	     |
  | npm whoami                                    | 로그인한 사용자가 누구인지 알려줌<br>로그인된 상태가 아니면 에러 발생                                    |
  | npm logout                                    | npm adduser로 로그인한 계정을 로그아웃할 때 사용                                                         |
  | npm version [버전]                            | package.json의 버전을 올려줌<br>버전 대신에 major, minor, patch라는 문자열을 넣으면 해당 부분의 숫자 + 1 |
  | npm deprecate [패키지명][버전] [메시지]       | 해당 패키지를 설치할 때 경고 메시지를 띄우게 하는 명령어<br>자신의 패키지에만 명령서 적용 가능           |
  | npm publish                                   | 자신이 만든 패키지를 배포할 때 사용                                                                      |
  | npm unpublish                                 | 배포한 패키지를 제거<br>24시간 이내에 배포한 패키지만 제거 가능 (의존성 관계 때문에)                     |
  | etc                                           |[https://docs.npmjs.com/cli-documentation/](https://docs.npmjs.com/cli-documentation/)                    |
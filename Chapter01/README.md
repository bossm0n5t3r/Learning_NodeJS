# 노드란 무엇인가

## 목차
- [1. 핵심 개념](#core-concept)
  - [1.1. 서버](#1.1.-서버)
  - [1.2. 특성 및 라이브러리](#1.2.-특성-및-라이브러리)
  - [1.3. 이벤트 기반](#1.3.-이벤트-기반)
  - [1.4. 논블로킹 I/O](#1.4.-논블로킹-I/O)
  - [1.5. 싱글 스레드](#1.5.-싱글-스레드)
- [2. 서버로서의 노드](#server-node)
- [3. 개발 환경 설정](#dev-env-settings)

<hr/>

<a name="core-concept"></a>
## 1. 핵심 개념
- ### 1.1. 서버
  - 노드는 서버 애플리케이션을 실행하는데 제일 많이 사용
  - 서버란 무엇이며, 어떤 역할을 하는가?
    - 서버는 <strong>네트워크를 통해 클라이언트에 정보나 서비스를 제공하는 컴퓨터 또는 프로그램</strong>을 의미
    - 클라이언트란 <strong>요청을 보내는 주체</strong> (ex. 브라우저, 데스크톱 프로그램, 모바일 앱, 다른 서버에 요청을 보내는 서버 등)
    - 사용자 또는 서비스의 데이터가 생성될 경우, 이 데이터를 어딘가에 저장하고, 그 어딘가에서 클라이언트로 데이터를 받아오는 역할
  - 요약
    - 서버는 <strong>클라이언트의 요청에 대해 응답</strong>
    - 노드는 자바스크립트 애플리케이션이 서버로서 가능하기 위한 도구를 제공하므로 <strong>서버 역할을 수행 가능</strong>

- ### 1.2. 특성 및 라이브러리
  - 노드는 <strong>자바스크립트 런타임</strong>
  - 노드는 V8, libuv 라는 라이브러리를 사용
  - libuv 라이브러리는 노드의 특성인 <strong>[이벤트 기반](#1.3.-이벤트-기반), [논블로킹 I/O](#1.4.-논블로킹-I/O) 모델을 구현</strong>

- ### 1.3. 이벤트 기반
  - 이벤트 기반(event-driven)이란 <strong>이벤트가 발생할 때 미리 지정해둔 작업을 수행하는 방식</strong>
    - 이벤트 예시 : 클릭, 네트워크 요청 등
  - 이벤트 기반 시스템에서는 특정 이벤트가 발생할 때 무엇을 할지 미리 등록해두어야 함
  - 노드는 이벤트 기반 방식으로 동작
  - 노드는 발생한 이벤트가 없거나 발생했던 이벤트를 다 처리하면 다음 이벤트가 발생할 때까지 대기
  - 이벤트 루프
    - 이벤트 발생 시 호출할 콜백 함수들을 관리하고, 호출된 콜백 함수의 실행 순서를 결정
    - 노드가 종료될 때까지 이벤트 처리를 위한 작업을 반복하므로 루프
    - 호출 <strong>스택</strong>을 통해서 실행
  - 태스크 큐
    - 이벤트 발생 후 호출되어야 할 콜백 함수들이 기다리는 공간
    - 콜백 <strong>큐</strong>라고도 부름
  - 백그라운드
    - 타이머 or I/O 작업 콜백 or 이벤트 리스너들이 대기하는 곳
  - 이벤트 루프는 호출 스택이 비어있을 때만 태스크 큐에 있는 함수를 호출 스택으로 가져옴

- ### 1.4. 논블로킹 I/O
  - 이벤트 루프를 잘 활용하면 오래 걸리는 작업을 효율적으로 처리할 수 있음
  - 논블로킹 방식
    - 오래 걸리는 함수를 백그라운드로 보내서 다음 코드가 먼저 실행되게 하고, 그 함수가 다시 태스크 큐를 거쳐 호출 스택으로 올라오기를 기다리는 방식
  - 논블로킹이란?
    - 이전 작업이 완료될 때까지 멈추지 않고 다음 작업을 수행함을 의미
  - 하지만, 싱글 스레드라는 한계 때문에 자바스크립트의 모든 코드가 이 방식으로 시간적 이득을 볼 수 있는 것은 아님
  - 현재 노드 프로세스 외의 다른 컴퓨팅 작원을 사용할 수 있는 I/O 작업이 주로 시간적 이득을 많이 봄
  - I/O 란?
    - 입력(input)/출력(output)을 의미
    - 파일 시스템 접근이나 네트워크 요청같은 작업이 I/O의 일종
    - <strong>I/O 작업을 할 때 노드는 논블로킹 방식으로 동작</strong>
  - 동기와 비동기, 블로킹과 논블로킹
    - 동기와 비동기 : 함수가 바로 return 되는지 여부
    - 블로킹과 논블로킹 : 백그라운드 작업 완료 여부
  - 노드에서는 동기-블로킹 방식과 비동기-논블로킹 방식이 대부분
  - 동기-블로킹 방식
    - 백그라운드 작업 완료 여부를 계속 확인하여, 호출한 함수가 바로 return 되지 않고 백그라운드 작업이 끝나야 return
  - 비동기-논블로킹 방식
    - 호출한 함수가 바로 return 되어 다음 작업으로 넘어가고, 백그라운드 작업 완료 여부는 신경 쓰지 않고 나중에 백그라운드가 알림을 줄 때 처리
  - 동기-논블로킹, 비동기-블로킹 방식은 없다고 보면 됨

- ### 1.5. 싱글 스레드
  - 노드는 <strong>싱글 스레드, 논블로킹 모델</strong>
  - 프로세스
    - 운영체제에서 할당하는 작업의 단위
    - 프로세스 간에는 메모리 등의 자원 공유 x
  - 스레드
    - 프로세스 내에서 실행되는 흐름의 단위
    - 하나의 프로세스는 여러 개의 스레드를 가질 수 있음
    - 스레드들은 부모 프로세스의 자원을 공유
      - 즉, 같은 메모리에 접근 o
  - 노드 프로세스도 내부적으로는 스레드를 여러 개 가지고 있으나, 직접 제어할 수 있는 스레드는 하나뿐
  - 노드는 프로세스 자체를 복사해 여러 작업을 동시에 처리하는 멀티 프로세스 방식을 선택
    - 자바스크립트 언어 자체가 싱글 스레드 특성을 지니기 때문

<a name="server-node"></a>
## 2. 서버로서의 노드
- 노드가 싱글 스레드, 논블로킹 모델이므로, 노드 서버 또한 <strong>싱글 스레드, 논블로킹 모델</strong>
- I/O가 많은 작업에 적합
  - libuv 라이브러리를 사용하여 I/O 작업을 논블로킹 방식으로 처리
  - 스레드 하나가 많은 수의 I/O 를 혼자서도 감당 가능
  - But, CPU 부하가 큰 작업에는 적합 x
    - CPU 연산을 많이 요구하면 블로킹이 발생해 스레드 하나가 감당하기 어려움
- 싱글 스레드 방식의 프로그래밍은 멀티 스레드 방식보다 상대적으로 쉬움
  - 에러를 제대로 처리하지 못하면 서버 전체가 멈추므로 잘 관리
- 웹 서버가 내장
  - But, 서버 규모가 커지면 결국 nginx 등의 웹 서버를 노드 서버와 연결
- 노드는 생산성이 좋지만, Go 처럼 비동기에 강점을 보이는 언어나 nginx 처럼 정적 파일 제공, 로드 밸런싱에 특화된 서버에 비해서는 속도가 느림
  - But, 극단적인 성능이 필요하지 않다면 노드의 생산성으로 어느 정도 극복 가능
- 데이터를 JSON으로 주고 받는데, JSON이 자바스크립트 형식이어서 노드에서도 쉽게 처리 가능
- | 장점                                    | 단점                                   |
  | :-------------------------------------: | :------------------------------------: |
  | [싱글 스레드] 컴퓨터 자원을 적게 사용함 | [싱글 스레드] CPU 코어를 하나만 사용함 |
  | I/O 작업이 많은 서버로 적합             | CPU 작업이 많은 서버로는 부적합        |
  | 멀티 스레드 방식보다 쉬움               | 하나뿐인 스레드가 멈추지 않도록 관리   |
  | 웹 서버가 내장                          | 서버 규모가 커졌을 때 관리가 어려움    |
  | 자바스크립트 사용                       | 어중간한 성능(?)                       |
  | JSON 형식과 호환하기 쉬움               |                                        |
- 어디에 적합할까?
  - 개수는 많지만 크기는 작은 데이터를 실시간으로 주고 받는 곳
    - 네트워크나 데이터베이스, 디스크 작업 같은 I/O 에 특화되어 있기 때문
  - 실시간 채팅 애플리케이션이나 주식 차트, JSON 데이터를 제공하는 API 서버가 노드를 많이 사용
- 어디에 부적합할까?
  - 이미지나 비디오 처리, 대규모 데이터 처리 같이 CPU를 많이 사용하는 작업을 위한 서버로는 x
  - AWS Lambda 나 Google Cloud Functions 같은 서비스에서 노드로 CPU를 많이 사용하는 작업을 처리하는 것을 지원

<a name="dev-env-settings"></a>
## 3. 개발 환경 설정
- Ubuntu 기준
  - https://github.com/nodesource/distributions/blob/master/README.md
  - 설치 확인
    - 터미널에 다음 명령어를 입력해서 정상출력되는지 확인
    - $ node -v
    - $ npm -v
  - npm의 버전 업데이트
    - $ sudo npm install -g npm
  - VS Code 설치
    - https://code.visualstudio.com/docs/setup/linux
# MySQL

## What is a database?
- **데이터베이스**는 관련성을 가지며 중복이 없는 데이터들의 집합
- 이러한 데이터베이스를 관리하는 시스템을 **DBMS**(데이터베이스 관리 시스템)라고 부름
- 서버에 데이터베이스를 올리면 여러 사람이 동시에 사용할 수 있음
- **RDBMS**
  - 관계형 DBMS
  - Oracle, MySQL, MSSQL 등

## Installing MySQL
- Windows
  - [공식 사이트](https://dev.mysql.com/downloads/installer/)
  - Custom
    - MySQL Server
      - Authentication Method
        - Use Legacy Authentication Method (Retain MySQL 5.x Compatibility) 선택
        - 대부분의 회사가 MySQL 5 버전대를 사용하고 있으므로
    - MySQL Workbench
  - 설치 경로
    - C:\Program Files\MySQL\MySQL Server 8.0\bin
  - 실행 명령어
    - ```sh
      net start mysql80
      cd C:\Program Files\MySQL\MySQL Server 8.0\bin
      mysql -h localhost -u root -p
      ```
  - 종료
    - ```sh
      exit
      net stop mysql80
      ```

## Installing MySQL Workbench
- Windows
  - 위에서 함께 설치됨

## Creating databases and tables
- 데이터베이스 생성하기
  - ```sql
    CREATE SCHEMA [데이터베이스명];
    ```
- 데이터 베이스 사용하기
  - ```sql
    use [데이터베이스명];
    ```
- 테이블 생성하기
  - 사용자의 정보를 저장하는 테이블
    - ```sql
      CREATE TABLE nodejs.users (
          id            INT             NOT NULL AUTO_INCREMENT,
          name          VARCHAR(20)     NOT NULL,
          age           INT UNSIGNED    NOT NULL,
          married       TINYINT         NOT NULL,
          comment       TEXT NULL,
          created_at    DATETIME        NOT NULL DEFAULT now(),
          PRIMARY KEY(id),
          UNIQUE INDEX name_UNIQUE(name ASC)
      )   COMMENT = '사용자 정보'
          DEFAULT CHARSET=utf8
          ENGINE=InnoDB;
      ```
  - 사용자의 댓글을 저장하는 테이블
    - ```sql
      CREATE TABLE nodejs.comments (
          id            INT             NOT NULL AUTO_INCREMENT,
          commenter     INT             NOT NULL,
          comment       VARCHAR(100)    NOT NULL,
          created_at    DATETIME        NOT NULL DEFAULT now(),
          PRIMARY KEY(id),
          INDEX commenter_idx (commenter ASC),
          CONSTRAINT commenter
          FOREIGN KEY (commenter)
          REFERENCES nodejs.users (id)
          ON DELETE CASCADE
          ON UPDATE CASCADE
      )   COMMENT = '댓글'
          DEFAULT CHARSET=utf8
          ENGINE=InnoDB;
      ```

## CRUD
- CREATE
  - ```sql
    INSERT INTO nodejs.users (name, age, married, comment)
    VALUES ('zero', 24, 0, '자기소개1');
    INSERT INTO nodejs.users (name, age, married, comment)
    VALUES ('one', 32, 1, '자기소개2');

    INSERT INTO nodejs.comments (commenter, comment)
    VALUES (1, '안녕하세요. zero의 댓글입니다.');
    ```
- READ
  - ```sql
    SELECT * FROM nodejs.users;
    SELECT * FROM nodejs.comments;
    ```
- UPDATE
  - ```sql
    UPDATE nodejs.users
    SET comment = '바꿀 내용'
    WHERE id = 2;
    ```
- DELETE
  - ```sql
    DELETE FROM nodejs.users WHERE id = 2;
    ```

## Using Sequelize
- MySQL 작업을 쉽게 할 수 있도록 도와주는 라이브러리
- ORM (Object-relational Mapping) 으로 분류
  - 객체와 데이터베이스의 릴레이션을 매핑해주는 도구
- Sequelize 설치
  - ```sh
    npm i sequelize mysql2
    npm i -g sequelize-cli
    sequelize init          # config, models, migrations, seeders 폴더가 생성됨
    ```
- sequelize-cli 가 자동으로 생성해주는 models/index.js 코드는 그대로 사용 시 에러 발생
  - 다음과 같이 수정
  - ```js
    const path = require('path');
    const Sequelize = require('sequelize');

    const env = process.env.NODE_ENV || 'development';
    const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
    const db = {};

    const sequelize = new Sequelize(config.database, config.username, config.password, config);

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    db.User = require('./user')(sequelize, Sequelize);
    db.Comment = require('./comment')(sequelize, Sequelize);

    db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
    db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });

    module.exports = db;
    ```
- MySQL 연결하기
  - ```js
    ...
    var indexRouter = require('./routes/index');
    var usersRouter = require('./routes/users');
    var sequelize = require('./models').sequelize;

    var app = express();
    sequelize.sync();
    ...
    ```
  - 폴더 내의 index.js 파일은 require 시 이름을 생략 가능
    - require('./models') = require('./models/index.js')
  - sync 메서드를 사용하면 서버 실행 시 자동으로 MySQL과 연동
- 모델 정의하기
  - MySQL에서 정의한 테이블을 Sequelize 에서도 정의해야 함
  - MySQL의 테이블은 Sequelize 의 모델과 대응
  - Sequelize 는 모델과 MySQL의 테이블을 연결(Mapping)해주는 역할
  - Seqeulize 는 기본적으로 모델 이름은 단수형으로, 테이블 이름은 복수형으로 사용
  - [models/user.js](./7.6/learning-sequelize/models/user.js)
    - 알아서 id를 기본 키로 연결하므로 id 컬럼은 적어줄 필요가 없음
    - seqeulize.define 메서드로 테이블명과 각 컬럼의 스펙을 입력
    - MySQL 테이블과 컬럼 내용이 일치해야 정확하게 대응
    - [Seqeulize 의 자료형](https://sequelize.org/master/manual/data-types.html)
    - define 메서드의 세 번째 인자는 테이블 옵션
      - timestamps 속성의 값이 false
        - created_at 컬럼을 만들었기 때문
      - timestamps 속성이 true이면 Seqeulize는 createdAt 과 updateAt 컬럼을 추가
      - 로우가 생성될 때와 수정될 때의 시간이 자동으로 입력
  - 모델 생성 후 [models/index.js](./7.6/learning-sequelize/models/index.js)와 연결해야 함
    - ```js
      db.User = require('./user')(sequelize, Sequelize);
      db.Comment = require('./comment')(sequelize, Sequelize);
      ```
    - db 라는 객체에 User와 Comment 모델을 담아둠
    - db 를 require 하여 User와 Comment 모델에 접근 가능
  - 마지막으로 [config/config.json](./7.6/learning-sequelize/config/config.json)수정
    - ```json
        {
            "development": {
                "username": "root",
                "password": "password",
                "database": "nodejs",
                "host": "127.0.0.1",
                "dialect": "mysql",
                "operatorsAliases": false
            },
            ...
        }
      ```
    - password 속성에는 MySQL 비밀번호 입력
    - database 속성에는 nodejs (데이터베이스명)
    - operatorsAliases 속성
      - 보안에 취약한 연산자를 사용할지 여부를 설정하는 옵션
    - 해당 설정은 process.env.NODE_ENV가 development 일 때 적용
    - 나중에 배포할 때는 process.env.NODE_ENV를 production 속성으로 설정
    - 배포 환경을 위해서 데이터베이스를 설정할 때는 config/config.json 의 production 속성을 수정
    - test 일 때는 test 속성을 수정
- 관계 정의하기
  - 1 : N
    - hasMany 메서드 사용
      - users 테이블의 로우 하나를 불러올 때 연결된 comments 테이블의 로우들도 같이 불러올 수 있음
    - 반대로 belongsTo 메서드도 존재
      - comments 테이블의 로우를 불러올 때 연결된 users 테이블의 로우를 가져옴
    - | 1       | :              | N       |
      |:-------:|:--------------:|:-------:|
      | User    |  - hasMany ->  | Comment |
      | Comment | <- belongsTo - | User    |
  - 1 : 1
    - hasOne 메서드 사용
    - belongsTo 와 hasOne이 반대여도 상관없음
      - 1 : 1 이기 때문에
    - | 1       | :              | 1       |
      |:-------:|:--------------:|:-------:|
      | User    |  - hasOne  ->  | Comment |
      | Comment | <- belongsTo - | User    |
  - N : M
    - belongsToMany 메서드 사용
    - | N       | :                   | M       |
      |:-------:|:-------------------:|:-------:|
      | Post    |  - belongsToMany -> | Hashtag |
      | Hashtag | <- belongsToMany -  | Post    |
    - async/await 코드로 작성
      - ```js
        async (req, res, next) => {
          const tag = await Hashtag.find({ where: { title: '노드' } });
          const posts = await tag.getPosts();
        };
        ```
- 쿼리 알아보기
  - 시퀄라이즈로 CRUD 작업을 하려면 먼저 시퀄라이즈 쿼리에 대해서 알아야 함
  - SQL문을 자바스크립트로 생성하는 것이라 시퀄라이즈만의 방식이 있음
  - 쿼리는 프로미스를 반환하므로 then을 붙여 결과값을 받을 수 있음
  - async/await 문법과 같이 사용 가능
  - Examples
    - ```sql
      INSERT INTO nodejs.users (name, age, married, comment)
      VALUES ('zero', 24, 0, '자기소개1');
      ```
      - ```js
        const { User } = require('../models');
        User.create({
          name: 'zero',
          age: 24,
          married: false,
          comment: '자기소개1',
        });
        ```
    - ```sql
      SELECT * FROM nodejs.users;
      ```
      - ```js
        User.findAll({});
        ```
    - 데이터를 하나만 가져올 때는 find 메서드, 여러 개 가져올 때는 findAll 메서드
    - ```sql
      SELECT * FROM nodejs.users LIMIT 1;
      ```
      - ```js
        User.find({});
        ```
    - ```sql
      SELECT name, married FROM nodejs.users;
      ```
      - ```js
        User.findAll({
          attributes: ['name', 'married'],
        });
        ```
    - ```sql
      SELECT name, age FROM nodejs.users WHERE married = 1 AND age > 30;
      ```
      - ```js
        const { User, Sequelize: { Op } } = require('../models');
        User.findAll({
          attributes: ['name', 'age'],
          where: {
            married: 1,
            age: { [Op.gt]: 30 },
          },
        });
        ```
    - | 연산자   | 의미                  |
      |:--------:|:---------------------:|
      | Op.gt    | 초과                  |
      | Op.gte   | 이상                  |
      | Op.lt    | 미만                  |
      | Op.lte   | 이하                  |
      | Op.ne    | 같지 않음             |
      | Op.or    | 또는                  |
      | Op.in    | 배열 요소 중 하나     |
      | Op.notIn | 배열 요소와 모두 다름 |
    - ```sql
      UPDATE nodejs.users
      SET comment = '바꿀 내용'
      WHERE id = 2;
      ```
      - ```js
        User.update({
          comment: '바꿀 내용',
        }, {
          where: { id: 2 },
        });
        ```
    - ```sql
      DELETE FROM nodejs.users WHERE id = 2;
      ```
      - ```js
        User.destory({
          where: { id: 2 },
        });
        ```
- 쿼리 수행하기
  - [views/sequelize.ejs](./7.6/learning-sequelize/views/sequelize.ejs) 생성
  - [public/sequelize.js](./7.6/learning-sequelize/public/sequelize.js) 생성
  - [app.js](./7.6/learning-sequelize/app.js)
    - 라우터들 연결
      - [commentsRouter](./7.6/learning-sequelize/routes/comments.js)
  - [routes/index.js](./7.6/learning-sequelize/routes/index.js)
    - GET, POST, PUT, DELETE 요청에 해당하는 라우터를 만듦
    - ```js
      router.get('/', function (req, res, next) {
        User.findAll()
          .then((users) => {
            res.render('sequelize', { users });
          })
          .catch((err) => {
            console.error(err);
            next(err);
          });
      });
      ```
      - GET / 로 접속했을 때의 라우터
      - User.findAll 메서드로 모든 사용자를 찾은 후
      - [public/sequelize.js](./7.6/learning-sequelize/public/sequelize.js)를 랜더링할 때 결과값인 users를 넣어줌
      - 시퀄라이즈는 프로미스를 기본적으로 지원하므로 then과 catch를 사용해서 각각 조회 성공 시와 실패 시의 정보를 얻을 수 있음
      - async/await 문법
        - ```js
          router.get('/', async (req, res, next) => {
            try {
              const users = await User.findAll();
              res.render('sequelize', { users });
            } catch (error) {
              console.error(error);
              next(error);
            }
          });
          ```
  - [routes/users.js](./7.6/learning-sequelize/routes/users.js)
  - [routes/comments.js](./7.6/learning-sequelize/routes/comments.js)
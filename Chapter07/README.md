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
## Using Sequelize
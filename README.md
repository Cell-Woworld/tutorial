# learning
This project is a tutorial example for the Cell framework. The installation steps are as follows: (中文說明在下方)<br>

### 1. Environment Requirements:<br>
   a. A Linux system that supports Docker<br>
   b. Run mkdir ~/Projects<br>
   c. Extract Learning.zip into the ~/Projects directory<br>

### 2. Initialization:<br>
   a. Start the system: Navigate to ~/Projects/Learning and run ./power_Learning up to start the system<br>
   b. The system will sequentially launch and create Docker containers for db, ap, and web<br>
   c. Waiting for the database to initialize automatically (Database initialization may take several minutes. During this stage, please temporarily ignore any error messages from the AP server indicating it cannot connect to the database.)<br>
   d. When you see the following messages, it indicates that the database has been successfully initialized:

      [Server] X Plugin ready for connections. Bind-address: '::' port: 33060, socket: /var/run/mysqld/mysqlx.sock
      [Server] /usr/sbin/mysqld: ready for connections. Version: '9.1.0'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server - GPL.

### 3. Database Setup:<br>
   a. Import database schema:<br>

      (1) Use MySQL CLI, Workbench, DBeaver, or similar tools to log in to the database as 'root'@'%' (refer to Learning.yml for the password)<br>
      (2) Import the schema files (*.sql):
         ~/Projects/Learning/scxml/Learning/DB/schema/Learning.sql
         ~/Projects/Learning/scxml/Example/DB/schema/Example.sql
         ~/Projects/Learning/scxml/Account/DB/schema/Account.sql

   b. Create a new database user and set permissions for the ap server to use (using MySQL CLI as an example):<br>

      (1) Enter the Learning-DB container:
         ./bash_Learning db
      (2) Log into MySQL:
         mysql -u root -p
      (3) Create a database user:
         CREATE USER 'Learning'@'%' IDENTIFIED BY 'Learning';
      (4) Grant permissions:
         GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE, CREATE ROUTINE, ALTER ROUTINE ON Learning.* TO 'Learning'@'%';

   c. To stop monitoring: Press Ctrl-C to exit<br>
   d. To shut down the system: Run ./power_Learning down<br>
### 4. Restart the System:<br>
   a. Start the system:
>     ./power_Learning up -d
   b. Monitor the ap server:
>     docker logs -f Learning-AP
   c. When the following message appears, the ap server has successfully started:
>     Listening on port 8888
## 5. Login:<br>
   a. Front-end: login http://localhost:8080 with test1/test1<br>
   b. Back-end: login http://localhost:8080 with admin/admin
---
本專案為Cell framework的教學範例，安裝步驟如下:
## 1. 環境需求:<br>
   a. 支援docker的Linux系統<br>
   b. mkdir ~/Projects<br>
   c. 將Learning.zip解壓縮到 ~/Projects目錄內<br>

## 2. 初始化:<br>
   a. 啟動系統: 進入 ~/Projects/Learning 目錄，透過 ./power_Learning up 啟動系統<br>
   b. 系統將依序開啟並建立db, ap, web的docker container<br>
   c. 等待資料庫自動初始化 (資料庫初始化可能需要數分鐘，本階段請暫時忽略ap server無法連接db的錯誤訊息)<br>
   d. 待出現以下的內容，表示資料庫已成功初始化

     [Server] X Plugin ready for connections. Bind-address: '::' port: 33060, socket: /var/run/mysqld/mysqlx.sock
     [Server] /usr/sbin/mysqld: ready for connections. Version: '9.1.0'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server - GPL.

## 3. 建立資料庫:<br>
   a. 導入db schema:<br>

      (1) 透過mysql CLI、workbench或dbeaver等軟體，以'root'@'%'帳號登入資料庫 (密碼請參考Learning.yml)
      (2) 導入db schema (*.sql):
          ~/Projects/Learning/scxml/Learning/DB/schema/Learning.sql
          ~/Projects/Learning/scxml/Example/DB/schema/Example.sql
          ~/Projects/Learning/scxml/Account/DB/schema/Account.sql
   
   b. 建立新db帳號，並設定權限，以提供ap server使用 (以mysql CLI為例)<br>
   
      (1) 進入Learning-DB container:
         ./bash_Learning db
      (2) 透過mysql登入db:
         mysql -u root -p
      (3) 建立db帳號:
         CREATE USER 'Learning'@'%' IDENTIFIED BY 'Learning';
      (4) 授予權限:
         GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE, CREATE ROUTINE, ALTER ROUTINE ON Learning.* TO 'Learning'@'%';
         
   c. 中斷監控: 以 Ctrl-C 離開監控<br>
   d. 關閉系統: 透過 ./power_Learning down 關閉系統<br>
## 4. 重啟系統:<br>
   a. 啟動系統:<br>
>     ./power_Learning up -d
   b. 監控ap server:
>     docker logs -f Learning-AP
   c. 等待ap server出現以下的內容，即成功啟動 ap server
>     Listening on port 8888
## 5. 登入系統:<br>
   a. 前台: 以test1/test1登入http://localhost:8080<br>
   b. 後台: 以admin/admin登入http://localhost:8080
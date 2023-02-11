# Flight Information System

Steps to run the code


There are 2 directories in the code ‘backend’ and ‘frontend’. As the names suggest ‘backend’ directory has backend code and ‘frontend’ has the frontend code.

Need to install node first (https://nodejs.org/en/download/). After installation check the node version. We are using node 16 for this project (node 18 should also work)

![image](https://user-images.githubusercontent.com/15613143/201775046-41c9f18b-987e-4ffb-8b82-669e109ff12e.png)

 
Create an account at https://airlabs.co/. Once account is created, API key can be obtained from https://airlabs.co/account. API key is essential to download flight data and API allows 1000 queries per month for free.
We will also need MySQL, which can be downloaded from this link https://dev.mysql.com/downloads/workbench/. Create a user (generally ‘root’ is used) and password.

Backend

•	Open the backend directory on gitbash or cmd and run ‘npm install’

![image](https://user-images.githubusercontent.com/15613143/201775007-93bbb367-0c8c-45bd-8395-1291c443ae91.png)
 

•	After successful installation of libraries we need to create a ‘.env’ file in the backend directory  (name of the file is .env). This ‘.env’ file stores all the environment variables and username, passwords needed to run the code.
We are using only 3 constants API_KEY (which stores API key of airlabs.co, to download data), DB_USER (mysql DB username, which is usually ‘root’) and DB_PASS (which saves password for mysql).

![image](https://user-images.githubusercontent.com/15613143/201774980-79cdd0e9-5a8e-472d-8105-ee7866c023d6.png)
 

•	After successful ‘npm install’ and ‘.env’ file creation we can start our backend using ‘node app.js’

 ![image](https://user-images.githubusercontent.com/15613143/201774936-b2ae7d10-7ef7-4ee4-9a5c-22bb2b741729.png)

Backend API will run on port 8080 of localhost. We are using postman to test it.

![image](https://user-images.githubusercontent.com/15613143/201774912-ecb8b13e-5789-449a-a8fb-3276258e0cf4.png)

 

Frontend

•	Open the frontend directory on gitbash or cmd and run ‘npm install’

 ![image](https://user-images.githubusercontent.com/15613143/201774879-4ae8d389-8d66-42dc-b4ec-e9a4b8369f1e.png)

•	After successful libraries installation we can run the frontend using ‘npm start’

![image](https://user-images.githubusercontent.com/15613143/201774817-7a3ebc30-812e-4bec-b1e0-a4719fddee59.png)

Frontend generally runs on port 3000 of localhost (http://localhost:3000/).

![image](https://user-images.githubusercontent.com/15613143/201774172-de96ca4e-c4df-4ddc-a63f-d1e8784e2912.png)

 


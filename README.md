# ShopBridge

This project was generated with Angular CLI version 10.0.1.

### Prerequisites:
Node.js
Angular cli
.Net core 2
Visual studio

### How to run?

### Backend:
1.In DemoTest/appsetting.json file and change the connection string
"ConnectionStrings": { "Default": "Server=YourServerName; Database=ShopBridgeDb; Trusted_Connection=True;" },
OR
"ConnectionStrings": { "Default": "Server=YourServerName; Database=ShopBridgeDb; User=YourDBUsername; Password=YourDBPassword;" },

2.In Visual Studio goto Tools +> NuGet Package Manager => Package Manager Console
on consol the run command  => update-database
it willl create the database

3.In sulution explorer right click on DemoTest and select Set as Startup Project

4.Run the project by clicking IIS Server

### Front End:
1. open command prompt and and goto to project path
e.g.  cd "project path"

2.then run command => npm i
it will install all the packages

3.then run the project using command => npm start
4.open the project on browser using path http://localhost:4200


# EKart

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.7.

# Description
EKart is a web shop application. It was built using Angular, Bootstrap and jQuery as Frontend, Oracle as Database, and Spring framework and Hibernate as Backend. The development of the project loosely followed the methodology of SCRUM.
 
I was responsible to build the frontend from scatch, which is the codes in this repo. Due to the fact that the backend-side contains skeleton codes from Infosys and it was done by the backend team, I didn't include it in this repo.

> Remeber, this app doesn't store product images in the database, all product images are randomly generate using "https://picsum.photos/150/150/?random"

The app provides few key features:

- User registration/login either as Seller or Customer.
- Account management.
- Display all products.
- Seller can add new products, or modify product details.

see [my wix blog](https://xuchen323.wixsite.com/website/single-post/2018/09/11/EKart----A-web-shop-application) for detail screenshots and walkthrough.
 To run the application, first move to client-side folder by run ```cd client-side``` in the terminal, then install [Node.js](https://nodejs.org/en/), next install [Angular](https://angular.io/guide/quickstart) by running ```npm install -g @angular/cli```. After this step, please run ```npm install``` to install all necessary modules, following by ```ng serve --open```. This will run the app and the browser will automatically open.

# Ekart – Frontend

>EKart is a web shop application. It was built using Angular, Bootstrap and jQuery for the Frontend, Oracle SQL for Database, and Spring framework and Hibernate for the Backend. 

Here are details of the functions supporting by the app:

* Account registration as a seller or as a customer, input format validators are used to check the input type, for example, the password should be between 6-20 characters, and it must contains an uppercase, lowercase and a special character.
* Seller or customer login.
* When login as a seller, the seller can upload new products, or modify details for existing products.
* Authenticated users can change account profile, including name, password and address.

> I am presenting the frontend codes ONLY in this repository, which is completely designed and implemented by me (as the frontend developer for this project).

Please see my blog for detail screenshots and walkthrough of the full application.

## How to run the frontend

To run the application, first install Node.js and run npm install -g @angular/cli in the terminal. After both are installed, please move into client-side folder, then run npm install to install all necessary modules. After that, simply run ng serve –open to run the app and the browser will automatically open.

For demonstration purpose, I have change a few functions. Instead of making http request to the backend, it is simply going to read dummy data stored in JSON objects, they can be found at “/assets”. No request to backend was made on this demo (since backend is missing in this repo). 

## User Guide
* Once the browser is open, you will see the homepage. Within the homepage you can find all products from the system. like I have mentioned earlier, these are dummy data stored in “/assets/dummyProducts.” To see the actual method that communicate with the backend, please refer to “all-products.service.ts” and check the functions that I have commented out. Also, all product images are randomly generated, they are just there for visual purpose.

* Please click “register” button to try to register an account. Every field has a input validator, for example, the password should have a length of 6 to 20 characters, and it should be the combination of uppercase letter, lowercase letter, special characters and numbers. The submit button will stay inactive unless all field have met the correct format.

* When user click the submit button, the frontend will send the form to the backend, and the backend will check for email and mobile duplication. If it is duplicated, the registration will fail and an error message will be return. Otherwise registration is successful and user will be redirect to the home page. (In this demo, the registration would always fail since the backend is not presented.)

* Please click “login” button, select “seller” type, and enter “jackleet@gmail.com” for email and “Abcd123!” for password. Originally the frontend should send a POST request to the backend and the backend will verify the combination of email id and password (refer to “/login” and “services/auth-manager.service.ts” for details). I have changed the function to make it read a dummy user data, therefore any input can “login” successfully, and user of Jack Lee is always return.

* Now you should see the “Jack Lee’s profile” button on the navigation bar. Click it to get into the seller’s profile. The left side is the user profile, and the right side is all products uploaded by the authenticated seller.

* On the left side of seller’s  profile page, you can view the user’s profile, including name, password, email address, etc. Click edit to edit the information and click the submit button to submit the form.  However, the email id cannot be changed. Please check for “services/auth-manager.service.ts” and “/seller-profile” for details. As you guess, the request will always failed in this demo because we don’t have backend running! 

* On the right side of the seller’s  profile page, you will a “add new product” button. Please click it to add new products. Every field in the form has a validator to check the format, and the submit button will be disable unless all inputs met the correct format. After user submit the form, if the product is successfully added to the database, a success message will be displayed, otherwise users will see an error message.

* Below the add-product button, you can view all products under the login seller’s account (In this demo, they are just dummy data). Please click any product to get into the page where you can modify its details. You should see a form with all information automatically populated for that product you selected.

Family Shopping List

A simple, modern and mobile-friendly shopping list application designed to make everyday shopping easier.

Family Shopping List is a full-stack web application built with Angular, TypeScript, Node.js, Express and MongoDB. It allows users to manage shopping suggestions and keep track of the products they need to buy.
✨ Features

📝 Shopping List

Add products to the shopping list.

Mark products as completed or uncompleted.

Remove products from the list.

Keep completed products visible, with a different visual appearance.

Display an empty-state message when there are no products to buy.

💡 Suggested Products

Maintain a list of suggested products.

Add suggested products to the shopping list.

Enter product names manually.

Add products using voice input, where supported by the browser.

📱 User Interface

Responsive, mobile-friendly design.

Simple navigation between the Suggested Products and Shopping List pages.

Minimalist design with warm colors and sage green accents.

Loading and error states for a better user experience.

⚙️ Application Architecture

The application follows a frontend-backend architecture:

Angular frontend – displays the interface and handles user interactions.

Express backend – provides the REST API and processes HTTP requests.

MongoDB database – stores shopping list items.

The frontend communicates with the backend through HTTP requests. Angular Signals are used to manage and reactively display application data, while RxJS handles asynchronous operations.

🎯 Project Goals

This project was created as a practical learning experience to develop skills in:

Building applications with Angular and TypeScript.

Working with Angular Signals and RxJS.

Creating REST APIs with Node.js and Express.

Connecting a frontend application to MongoDB.

Managing application state and asynchronous HTTP requests.

Building responsive user interfaces.

## 🚀 Future Improvements

- User authentication and account management.
- Private shopping lists for each family.
- Family member accounts with access to their own family's shopping list.
- Recipe management with ingredient lists.
- Automatically adding recipe ingredients to the shopping list, without quantities.
- Avoiding duplicate ingredients when adding multiple recipes.
- Product categories and better shopping list organization.

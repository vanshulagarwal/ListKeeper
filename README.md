# List Keeper

List Keeper is a web application that helps users categorize and organize their tasks efficiently by creating multiple lists, consisting of tasks. It provides a user-friendly interface for creating, managing, and prioritizing tasks through lists. The application is fully secure. With authentication and authorization features, the lists of tasks are completely protected, ensuring that only authorized users can access their respective lists. 

## Features

- **Task Organization:** Create, edit, and delete tasks effortlessly. The tasks are grouped into lists for better organization.
- **Authentication:** User can register on our platform effortlessly through the interactive UI. Secure user authentication ensures that only authorized users can access and manage their tasks.
- **Authorization:** Users can only view and manage their own lists, ensuring data privacy and security.
- **Cross-Platform Access:** Access your tasks from any device with internet connectivity.
- **Security:** Users data is made fully secure using middlewares, so that no one can breach data through various platforms.
- **Flash messages:** Flash messages for interactive feedback.


## Technologies Used

- **Node.js:** Server-side JavaScript runtime.
- **Express:** Web application framework for Node.js.
- **MongoDB:** NoSQL database for storing task and user data.
- **MongoDB Atlas:** cloud database by mongodb helps in making the application platform independent.
- **Bcrypt:** Library for secure password hashing.
- **Helmet:** Middleware for securing Express apps by setting various HTTP headers.

## Getting Started

1. Clone this repository:

```bash
git clone https://github.com/vanshulagarwal/ListKeeper.git
```

2. Navigate to the project directory:

```bash
cd ListKeeper
```

3. Install the dependencies:

```bash
npm install
```

4. Environment Variables:
If you do not have mongoDB installed on your system, create a .env file for sensitive information like database credentials of mongoDB Atlas, and ensure it is included in your .gitignore file.

5. Start the application:

```bash
node app.js
```

6. Open your web browser and navigate to `http://localhost:3000` to access ListKeeper.

## Contributing
Contributions are welcome! If you'd like to contribute to List Keeper, please make your changes and create a pull request.

## Acknowledgements

- Listkeeper uses icons provided by https://fontawesome.com/
- The favicon for the app was provided by https://www.flaticon.com/
- The fonts for the app are provided by https://fonts.google.com/
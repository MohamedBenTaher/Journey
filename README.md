# Journey - A platform for sharing travel experiences

Journey is a full-stack web application built using the MERN stack, which stands for MongoDB, Express, React, and Node.js. The app allows users to share their travel and touring experiences with others in a community setting.

The application features several key functionalities, including:

- **Authentication** : Users can create an account and log in using Google OAuth.

- **Pagination** : The app uses pagination to display a limited number of posts per page, improving performance and making it easier for users to navigate through the site.

- **Comments** : Users can leave comments on posts, allowing them to engage with other members of the community and share their own thoughts and experiences.

- **Search** : The app includes a search feature, allowing users to easily find posts related to specific topics or destinations.

- **Material UI** : The app is built using Material UI, a popular React UI framework that provides a set of reusable components and styles.
    
## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you can get started with this project, you'll need to have the following software installed on your machine:

- Node.js (version 12.0 or higher)
- MongoDB (version 4.0 or higher)

### Installing

To get started with this project, follow these steps:

1. Clone this repository to your local machine using the following command:

```
git clone https://github.com/<your_username>/journey.git
```

2. Navigate to the `client` directory and install the required dependencies:

```
cd journey/client
npm install
```

3. Navigate to the `server` directory and install the required dependencies:

```
cd ../server
npm install
```

4. Start the MongoDB server by running the following command:

```
mongod
```

5. Start the server by running the following command from the `server` directory:

```
npm run start
```

6. Start the client by running the following command from the `client` directory:

```
npm run start
```

The application should now be running on your local machine at [http://localhost:3000](http://localhost:3000).

## Built With

- MongoDB - A document-oriented database used to store data for the application
- Express - A web framework used for building the REST API
- React - A JavaScript library used for building the client-side user interface
- Node.js - A JavaScript runtime used for building the server-side application


## Acknowledgments

- This project was inspired by the need for a platform to share travel experiences with others in a community setting.

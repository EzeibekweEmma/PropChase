# <img src="https://prop-chase.s3.amazonaws.com/PropChase-1689119285182.png" height="40px" width="40px" alt="Logo"/> PropChase <img src="https://prop-chase.s3.amazonaws.com/PropChase-1689118854280.png" height="40px" width="40px" alt="Logo"/> 

---

## Introduction
PropChase is a real estate like web application where users can rent and list properties such as apartments, houses, or commercial space, It aimed at helping users search and discover properties for sale or rent. The objective of PropChase is to provide a user-friendly platform that enables users easily find and evaluate real estate listings based on their preferences and requirements. By offering a comprehensive search functionality, detailed property information,  making bookings, communicate with sellers, and interactive features, PropChase aims to simplify the process of property hunting and empower users to make informed decisions when it comes to buying or renting properties.

- **Deployed Site:** [PropChase](https://prop-chase.vercel.app)
- **Final Project Blog Article:** [PropChase Blog Article](https://medium.com/@ezeibekweemma/propchase-project-blog-post-fc457ac96861)
- **Author LinkedIn:** [Ezeibekwe Emmanuel](https://www.linkedin.com/in/ezeibekweemma)
- **Author Role:** Designing, developing, maintaining both the client-side and server-side components of this web application, managing database, ensuring  the smooth integration of all components and a seamless user experience.

---

## Installation

To run the PropChase project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/ezeibekweemma/propchase.git
   ```

2. Navigate to the project directory:

   ```bash
   cd propchase
   ```

3. Install the dependencies for the server:

   ```bash
   cd server && npm install
   ```

4. Create an `.env` file for the server environment variable:

   ```bash
   vim .env
   ```
- Set up the environment variables by adding the following environment variables to the .env file:
   ```vim
    MONGO_URL=mongodb-url
    S3_ACCESS_KEY=s3_access_key_from_AWS
    S3_SECRET_ACCESS_KEY=s3_secret_access_key_from_AWS
    CLIENT_URL="http://127.0.0.1:5173"
    JWTSECRET_KEY=random_input_as_your_secret_key
    SERVICE_PROVIDER=email-service
    MAIL_USERNAME=example@service.com
    MAIL_PASSWORD=email-password
    PORT=4000
   ```
   **Note:** Edit the values but don't touch the variable names

5. Install the dependencies for the client:

   ```bash
   cd ../client && npm install
   ```

6. Create an `.env` file for the client environment variable:

   ```bash
   echo "VITE_API_BASE_URL=http://127.0.0.1:4000/api" > .env
   ```

---

## Usage

To start the PropChase application locally, follow these steps:

1. Start the server:

   ```bash
   cd ../server && npm nodemon index.js 
   ```

2. Start the client:

   ```bash
   cd ../client && npm run dev
   ```
3. Access the application in your browser at `http://localhost:5173`.

---

## App Features
- User authentication
- - User registration and login authentication
- - User reset password
- User profile management
- - Editing of profile article/about me
- - Changing of user image
- - Changing of user password
- Property management
- - Property listing and details
- - Deletion of listed properties
- - Editing of listed properties details
- - Explore properties
- - Properties search and filtering  - *Not fully implemented*
- Booking management
- - Viewing of Booking 
- - Making Booking - *Not fully implemented*
- communicate with sellers - *Not implemented*

---

## Current Problem
- Navigation bar vanishes once logout is confirmed until the page is reloaded

---

## Technology Used
- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Deployment: Vercel
#### Third modules/packages Used
- MongoDB Atlas
- Mongoose
- Bcryptjs
- JSONWebToken
- Image-downloader
- Multer
- Date-fns
- AWS-S3

---

## Architecture
PropChase follows a client-server architecture. The frontend is built with React and Vite, providing a dynamic and responsive user interface. The backend is developed using Node.js and Express.js, providing RESTful API endpoints for data retrieval and management. MongoDB is used as the database to store property and user information. The application is deployed on Vercel, providing a scalable and reliable hosting environment.
![App Screenshots](https://prop-chase.s3.amazonaws.com/PropChase-1689124758863.png)


---
## Contributing
**Contribution Guidelines**
- Please ensure your pull request adheres to the following guidelines:
- - Alphabetize your entry.
- - Search previous suggestions before making a new one, as yours may be a duplicate.
- - Suggested READMEs should be beautiful or stand out in some way.
- - Make an individual pull request for each suggestion.
- - New categories, or improvements to the existing categorization are welcome.
- - Keep descriptions short and simple, but descriptive.
- - Start the description with a capital and end with a full stop/period.
- - Check your spelling and grammar.
- - Make sure your text editor is set to remove trailing whitespace.
- - Use the #readme anchor for GitHub READMEs to link them directly
- - Thank you for your suggestions!

Contributions to PropChase project are welcome!

---

## Related Projects

Here are some related projects that you may find interesting:

- [PropChase API](https://dull-tan-binturong-toga.cyclic.app/api) - Backend API for the PropChase application.
To interact with the PropChase API hosted at https://dull-tan-binturong-toga.cyclic.app/api, you can use the following HTTP methods:

1. **GET:** Retrieve data from the API.
   - **Endpoint:** `/properties`
   - **Description:** Get all properties.
   - **Example:** `GET https://dull-tan-binturong-toga.cyclic.app/api/properties`

2. **GET:** Retrieve a specific data from the API.
   - **Endpoint:** `/property/{propertyId}`
   - **Description:** Get details of a specific property.
   - **Example:** `GET https://dull-tan-binturong-toga.cyclic.app/api/property/{propertyId}`

**Note:** Replace `{propertyId}` with the actual ID of the property you want to retrieve others methods requires token to access it.

---

## App Screenshots
#### Destop mode
![App Screenshots](https://prop-chase.s3.amazonaws.com/PropChase-1689124109950.png)
![App Screenshots](https://prop-chase.s3.amazonaws.com/PropChase-1689124112246.png)
![App Screenshots](https://prop-chase.s3.amazonaws.com/PropChase-1689124114760.png)
![App Screenshots](https://prop-chase.s3.amazonaws.com/PropChase-1689124116142.png)
#### Tablet mode
![App Screenshots](https://prop-chase.s3.amazonaws.com/PropChase-1689124119651.png)
#### Moblie mode
![App Screenshots](https://prop-chase.s3.amazonaws.com/PropChase-1689124118065.png)

---

## Licensing

The PropChase project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Please see the [LICENSE](https://github.com/ezeibekweemma/propchase/blob/main/LICENSE) file for more details.

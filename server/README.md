# PropChase Server Side <img src="https://prop-chase.s3.amazonaws.com/PropChase-1689118854280.png" height="40px" width="40px" alt="Logo"/> 

This is the server side for the PropChase application.

## Technology Used
  - **Node.js:** JavaScript runtime for building server-side applications.
  - **Express.js:** Web application framework for Node.js.
  - **MongoDB:** NoSQL database for storing property and user information.
  - **Mongoose:** MongoDB object modeling tool for Node.js.
  - **Bcryptjs:** Library for hashing passwords.
  - **JSONWebToken:** Library for generating and verifying JSON web tokens.
  - **Multer:** Middleware for handling file uploads.
  - **Date-fns:** JavaScript library that provides efficient and easy-to-use functions for working with dates and times.
  - **AWS-S3:** Service for storing and retrieving files.

### Project API [Link...](https://dull-tan-binturong-toga.cyclic.app/api)
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

#### Api screenshot
![Api screenshot](https://prop-chase.s3.amazonaws.com/PropChase-1689183902435.png)
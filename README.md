# Finance Tracker Frontend

### Overview
  The Finance Tracker App is a web application designed to help users manage their finances by tracking income, expenses, and overall balance. The app will offer users the ability to log in, record financial transactions, view their current balance, and analyse their spending habits through visual reports. The application will be developed using the MERN Stack (MongoDB, Express.js, React.js, Node.js), with the frontend and backend deployed separately.

### Features
- **User Authentication**:
    1. Users will be able to create an account and log in securely.
    2. User sessions will be managed to ensure data privacy.

- **Income and Expense Tracking**:
    1. Users can add income and expenses with a title, date, and amount.
    2. Transactions will be stored and categorised for easy retrieval.

- **Balance Overview**:
    1. The app will display the current balance based on the logged income and expenses.
    2. Users can see a breakdown of their financial status at a glance.

- **Financial Reports**:
    1. Pie charts to display the proportion of different categories of expenses.
    2. Line graphs to show income and expenses trends over time.
    3. Bar graph to compare between income and expenses.

- **Pages**:
    1. Registration Page: User creation interface.
    2. Login Page: User authentication interface.
    3. Dashboard: Overview of current balance and quick add transaction feature.
    4. Transactions Page: Detailed list of all transactions with options to add or delete.


### Technology Stack
-	**Frontend: React.js**
    *	State Management: Context API
    *	Component Library: Flowbite React
    *   Styling: Tailwind CSS
    *	Charts: Recharts
    *   Others: Luxon for date formatting, 
                react-router-dom for routing, 
                react-toastify for showing toast messages
-	**Backend: Node.js with Express.js**
    *	Database: MongoDB (hosted on MongoDB Atlas)
    *	Authentication: JWT (JSON Web Tokens) and Bcryptjs
-	**Deployment**:
    *	Frontend: Deployed on Vercel
    *	Backend: Deployed on Render


### Security Considerations
-	Passwords is hashed before storage.
-	Each user is authenticated with secure cookie storage.
-	HTTPS is enforced on both frontend and backend deployments




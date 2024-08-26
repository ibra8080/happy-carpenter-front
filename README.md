# Happy Carpenter

Happy Carpenter is a community website for woodworking enthusiasts and professionals. It provides a platform for users to connect, share their projects, offer services, and arrange collaborations within the woodworking community.

![Responsive Design](src/assets/documentation/readme/resposivness.png)

## Project Overview

Happy Carpenter consists of two main components:

1. Backend API: Developed using Django Rest Framework
   - Repository: [Happy Carpenter API](https://github.com/ibra8080/happycarpenter)
   - Deployed at: [https://happy-carpenter-ebf6de9467cb.herokuapp.com/](https://happy-carpenter-ebf6de9467cb.herokuapp.com/)

2. Frontend Application: Built with React
   - Repository: [Happy Carpenter Frontend](https://github.com/ibra8080/happy-carpenter-front)
   - Deployed at: [https://happy-carpenter-front-26472ba73a7c.herokuapp.com/](https://happy-carpenter-front-26472ba73a7c.herokuapp.com/)

This README focuses on the frontend application, detailing its features, setup, and usage.

## Table of Contents

- [User Experience](#user-experience)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Credits](#credits)

## User Experience

### Target Audience

Happy Carpenter caters to:
- Amateur woodworking enthusiasts
- Professional carpenters and woodworkers
- People interested in custom woodworking projects
- Individuals looking to learn more about woodworking

### User Stories

1. As a user, I can view a navbar from every page so that I can navigate easily between pages.
2. As a logged-out user, I can see sign-in and sign-up options so that I can sign in/sign up.
3. As a user, I can create an account to access all features of the application.
4. As a logged-in user, I can easily log out to ensure the security of my account.
5. As a user, I can tell if I am logged in or not so that I can log in if I need to.
6. As a user, I can view other users' profiles to learn more about them and their work.
7. As a user, I can view users' avatars so that I can easily identify users of the application.
8. As a logged-in user, I can create posts to share my woodworking projects.
9. As a user, I can view all posts to see the latest content from the community.
10. As a logged-in user, I can like posts to show appreciation for other users' work.
11. As a logged-in user, I can comment on posts to engage with the community.
12. As a logged-in user, I can edit my own posts and comments to update or correct information.
13. As a user, I can search and filter posts to find specific content I'm interested in.
14. As a professional user, I can create ads to offer my woodworking services.
15. As a user, I can view ads to find woodworking services or opportunities.

### User Goals

#### Amateur Woodworkers
- Share their projects and get feedback from the community
- Learn from more experienced woodworkers
- Find inspiration for new projects

#### Professional Woodworkers
- Showcase their portfolio of work
- Offer services and attract potential clients
- Network with other professionals in the field

#### General Users
- Explore woodworking projects and techniques
- Connect with woodworking enthusiasts
- Find custom woodworking services

### Design Choices

The design of Happy Carpenter is crafted to reflect the warmth and craftsmanship of woodworking while maintaining a modern, user-friendly interface.

#### Logo

The Happy Carpenter logo comes in two versions:
1. Primary logo: Full logotype with text
2. Icon: A simplified icon version for smaller spaces or favicon use

#### Color Scheme

The color palette is chosen to evoke the feel of wood and craftsmanship:

- Primary Color: #a60d0d (Deep Red)
- Secondary Color: #D69723 (Warm Gold)
- Text Color: #3f3f3f (Dark Gray)
- Background Color: #fffcec (Soft Cream)

This color combination provides a warm, inviting feel while ensuring good readability and contrast.

#### Typography

The primary font used throughout the application is Poppins, a clean and modern sans-serif typeface that offers excellent readability across different screen sizes.

```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"> 
```
Poppins is used in various weights to create hierarchy and emphasis in the design:

Headings: Bold (700) or Extra Bold (800)
Body Text: Regular (400)
Accents and Buttons: Medium (500) or Semi-Bold (600)

## Features

Happy Carpenter offers a range of features to support the woodworking community:

### Components

#### Navbar
- Visible on every page for easy navigation
- Displays logo, main navigation links, and user authentication options
- Responsive design, collapsing into a hamburger menu on smaller screens

#### Avatar
- Displays user profile images throughout the site
- Clickable to view user profiles

#### Spinner Asset
- Indicates loading states to improve user experience

### User Authentication

- Sign Up: Users can create new accounts
- Sign In: Registered users can log into their accounts
- Sign Out: Users can securely log out of the application

### Posts

- Create Post: Users can share their woodworking projects
- View Posts: Browse through a feed of community posts
- Like Posts: Show appreciation for other users' work
- Comment on Posts: Engage in discussions about projects
- Edit/Delete: Users can manage their own posts

### Profile

- View Profile: See user information and posted content
- Edit Profile: Users can update their information and profile picture
- Follow/Unfollow: Connect with other users

### Professional Accounts

- Professional Status: Users can identify as professional woodworkers
- Enhanced Profile: Showcase professional skills and experience
- Service Listings: Ability to list and manage woodworking services
- Reviews and Ratings: Professionals can receive reviews and ratings from clients
- Job Offers: Professionals can receive job offers through the platform

### Search and Filter

- Search Posts: Find specific content or users
- Filter Posts: Narrow down posts by category or user preference

### Responsive Design

- The application is fully responsive, providing a seamless experience across desktop, tablet, and mobile devices

### Accessibility

- Semantic HTML for improved screen reader experience
- Color contrast adhering to WCAG guidelines
- Alt text for images

### Future Features

- Messaging system for direct user communication
- Geolocation integration for localized service matching
- Professionals can advertise their work through featured listings or sponsored content
- Users can follow each other to stay updated on specific woodworkers' activities

## Tools & Technologies Used

- [![Markdown Builder](https://img.shields.io/badge/Markdown_Builder-grey?logo=markdown&logoColor=000000)](https://tim.2bn.dev/markdown-builder) used to generate README and TESTING templates.
- [![Git](https://img.shields.io/badge/Git-grey?logo=git&logoColor=F05032)](https://git-scm.com) used for version control. (`git add`, `git commit`, `git push`)
- [![GitHub](https://img.shields.io/badge/GitHub-grey?logo=github&logoColor=181717)](https://github.com) used for secure online code storage.
- ⚠️⚠️ IDE: CHOOSE ONLY ONE <-- delete me ⚠️⚠️
- [![Gitpod](https://img.shields.io/badge/Gitpod-grey?logo=gitpod&logoColor=FFAE33)](https://gitpod.io) used as a cloud-based IDE for development.
- [![HTML](https://img.shields.io/badge/HTML-grey?logo=html5&logoColor=E34F26)](https://en.wikipedia.org/wiki/HTML) used for the main site content.
- [![CSS](https://img.shields.io/badge/CSS-grey?logo=css3&logoColor=1572B6)](https://en.wikipedia.org/wiki/CSS) used for the main site design and layout.
- [![JavaScript](https://img.shields.io/badge/JavaScript-grey?logo=javascript&logoColor=F7DF1E)](https://www.javascript.com) used for user interaction on the site.
- [![jQuery](https://img.shields.io/badge/jQuery-grey?logo=jquery&logoColor=0769AD)](https://jquery.com) used for user interaction on the site.
- [![Heroku](https://img.shields.io/badge/Heroku-grey?logo=heroku&logoColor=430098)](https://www.heroku.com) used for hosting the deployed back-end site.
- [![Bootstrap](https://img.shields.io/badge/Bootstrap-grey?logo=bootstrap&logoColor=7952B3)](https://getbootstrap.com) used as the front-end CSS framework for modern responsiveness and pre-built components.
- [![Jest](https://img.shields.io/badge/Jest-grey?logo=jest&logoColor=c21325)](https://jestjs.io) used for automated JavaScript testing.
- [![PostgreSQL by Code Institute](https://img.shields.io/badge/PostgreSQL_by_Code_Institute-grey?logo=okta&logoColor=F05223)](https://dbs.ci-dbs.net) used as the Postgres database from Code Institute.
- [![Cloudinary](https://img.shields.io/badge/Cloudinary-grey?logo=cloudinary&logoColor=3448C5)](https://cloudinary.com) used for online static file storage.
- [![Figma](https://img.shields.io/badge/Figma-grey?logo=figma&logoColor=F24E1E)](https://www.figma.com) used for creating wireframes.
- [![Font Awesome](https://img.shields.io/badge/Font_Awesome-grey?logo=fontawesome&logoColor=528DD7)](https://fontawesome.com) used for the icons.
- [![ChatGPT](https://img.shields.io/badge/ChatGPT-grey?logo=chromatic&logoColor=75A99C)](https://chat.openai.com) used to help debug, troubleshoot, and explain things.

## Setup and Installation

To get the Happy Carpenter application running on your local machine, follow these steps:

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (usually comes with Node.js)
- Git

### Clone the Repository

1. Open your terminal
2. Clone the repository:
git clone https://github.com/ibra8080/happy-carpenter-front.git
3. Navigate to the project directory:
cd happy-carpenter-front
### Install Dependencies

Install the project dependencies:
npm install
### Set Up Environment Variables

1. Create a `.env` file in the root directory of the project
2. Add the following variables to the `.env` file:
REACT_APP_API_URL=https://happy-carpenter-ebf6de9467cb.herokuapp.com
Replace the URL with your API URL if different.

### Run the Application

Start the development server: npmstart
The application should now be running on [http://localhost:3000](http://localhost:3000).

### Building for Production

To create a production build:npm run build
This will create a `build` directory with a production build of your app.

### Connect to the Backend

Ensure that the backend API is running and accessible. You may need to update the `REACT_APP_API_URL` in the `.env` file to point to your local backend server if you're running it locally.

### Additional Notes

- Make sure you have the necessary API keys and access to any external services used in the project.
- If you encounter any CORS issues, ensure that your backend is configured to accept requests from your frontend's URL.

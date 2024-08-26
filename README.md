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
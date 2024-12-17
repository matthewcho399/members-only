# Members Only

This project is a private space where members can share anonymous posts. Inside the clubhouse, members can view the authors of the posts, but to the outside world, the authors remain a mystery. 🕵️‍♂️

This project utilizes authentication, database modeling, and user roles to create a secure and dynamic application.

Features  
Anonymous Posting: Non-members can view posts but cannot see the authors or timestamps.  
Membership System: Only users who enter the secret membership passcode can see author details.  
Secure Authentication: Passwords are hashed using bcrypt, and passport.js is used for login authentication.  
Message Creation: Logged-in users can create posts with a title, timestamp, and message body.  

Tech Stack  
Backend: Node.js, Express.js  
Database: PostgreSQL  
Authentication: Passport.js, bcrypt  
Frontend: HTML, CSS, EJS templates  
Deployment: Hosted on Railway  

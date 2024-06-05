# Lekha-Lipi Travel Blog Web App

Lekha-Lipi is a travel blog web application built with React. It allows users to share their travel experiences, view posts from other travelers, and interact with the community. This README provides an overview of the project, installation instructions, and information on how to get started.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## Features

- User authentication and authorization with Firebase
- Create, read, update, and delete blog posts
- Responsive design with Tailwind CSS
- Data fetching with React Query and Axios
- Form handling with React Hook Form
- Interactive charts with Recharts
- Real-time notifications with React Hot Toast
- Routing with React Router DOM
- Cookie management with js-cookie
- Date handling with Moment.js

## Tech Stack

- **Frontend**: React.js(Vite), Tailwind CSS, DaisyUI, React Hot Toast, Moment.js
- **Authentication**: Firebase, JWT
- **Routing**: React Router 
- **Icons**: React Icons
- **Fetching**: AXIOS

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/sumonkaysar/lekha-lipi.git
    cd lekha-lipi
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the development server**:
    ```bash
    npm run dev
    ```

The app should now be running on `http://localhost:5173`.

## Usage

1. **Create an account or log in:**

   - If you're a new user, click on the "Sign Up" link to create a new account.
   - If you already have an account, click on the "Log In" link to enter your credentials.

2. **Dashboard:**

   - After logging in, you'll be directed to your dashboard.
   - Here, you can manage your blog posts, including creating new posts, editing existing ones, or deleting them.
   - Use the navigation menu to explore different sections of the dashboard.

3. **Explore blog posts:**

   - Visit the home page to explore blog posts from various authors.
   - Browse through different categories or use the search feature to find specific posts.
   - Click on a post to view its details, including text content, images, comments, and likes.

4. **Create your own posts:**

   - Click on the "New Post" button in the dashboard to create a new blog post.
   - Add a title, write your content, upload images, and select relevant categories and tags.
   - Once published, your post will be visible to other users.

5. **Logout:**

   - When you're done using the app, click on the "Log Out" link to securely logout of your account.

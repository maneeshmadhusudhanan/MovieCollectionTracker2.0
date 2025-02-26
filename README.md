

# 🎬 MovieCollectionTracker 2.0





*Manage your movie collection with style*

---

## About the Project

**MovieCollectionTracker 2.0** is a feature-rich web and mobile application designed for movie enthusiasts who want to **track, manage, and organize** their movie collections effortlessly.

> Built with **React Native, Expo, Node.js, and MongoDB Atlas**, this app ensures a seamless and engaging user experience.

---

## ✨ Features

✅ **Secure Authentication** – Register & login to protect your collection\
⭐ **Movie Ratings & Reviews** – Rate and write reviews for your favorite movies\
📊 **Personalized Dashboard** – A visually appealing dashboard to manage your collection\
🔍 **Advanced Search** – Find movies using filters like genre, year, and rating\
🌙 **Dark Mode Support** – Enjoy the app in a comfortable dark mode\
📤 **Social Sharing** – Share your favorite movies with friends\
🖼 **Responsive UI** – Optimized for mobile, tablet, and desktop devices\
🔄 **Real-time Updates** – Instant updates when adding or modifying your collection

---

## 🚀 Tech Stack

| Frontend           | Backend    | Database      |
| ------------------ | ---------- | ------------- |
| React Native       | Express.js | MongoDB Atlas |
| Expo               | Node.js    | Mongoose      |
| NativeWind         | Axios      |               |
| React Native Paper |            |               |

---

## 📷 Screenshots

---

## 🛠️ Installation Guide

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB Atlas** account or local MongoDB setup
- **Expo CLI**

### Setup Steps

```bash
# Clone the repository
git clone https://github.com/yourusername/MovieCollectionTracker2.0.git

# Navigate to the project directory
cd MovieCollectionTracker2.0

# Install dependencies
npm install

# Create a .env file in the root directory
MONGODB_URI=your_mongodb_connection_string
PORT=3000

# Start the server
npm start

# Open a new terminal and start the Expo development server
npm run dev
```

---

## 📱 Usage

1. **Register/Login** to access your personal movie collection
2. **Add new movies** to your collection with details
3. **View movie details** and manage your watchlist
4. **Rate and review** your favorite films
5. **Search** for movies based on title, genre, or year

---

## 🌟 Project Structure

```
MovieCollectionTracker2.0/
├── assets/               # Images and static assets
├── components/           # Reusable UI components
├── app/                  # Expo Router screens
│   ├── index.js          # Home screen
│   ├── movie/[id].js     # Movie details screen
│   └── movie/edit.js     # Edit movie screen
├── services/             # API services
│   └── MovieService.js   # Movie-related API calls
├── server.js             # Express server
├── .env                  # Environment variables
└── package.json          # Project dependencies
```

---

## 🔄 API Endpoints

| Method | Endpoint         | Description          |
| ------ | ---------------- | -------------------- |
| GET    | /api/movies      | Get all movies       |
| POST   | /api/movies      | Add a new movie      |
| GET    | /api/movies/\:id | Get a specific movie |
| PUT    | /api/movies/\:id | Update a movie       |
| DELETE | /api/movies/\:id | Delete a movie       |

---

## 🤝 Contributing

🚀 Contributions are always welcome! Follow these steps to contribute:

1. **Fork** the repository
2. **Create a feature branch** (`git checkout -b feature/your-feature`)
3. **Commit changes** (`git commit -m 'Add your feature'`)
4. **Push to GitHub** (`git push origin feature/your-feature`)
5. **Submit a Pull Request**

---

## 📝 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.

---











<!-- # MovieCollectionTraker2.0
Movie Collection Tracker is a web application that allows users to track, manage, and watch their favorite movies. It includes authentication, user dashboards, movie collections, ratings, reviews, social sharing, and more.
🎬 MovieCollectionTracker 2.0

🎬 MovieCollectionTracker 2.0





Manage your movie collection with style

📌 About the Project

MovieCollectionTracker 2.0 is a feature-rich web and mobile application designed for movie enthusiasts who want to track, manage, and organize their movie collections effortlessly.

Built with React Native, Expo, Node.js, and MongoDB Atlas, this app ensures a seamless and engaging user experience.

✨ Features

✅ Secure Authentication – Register & login to protect your collection⭐ Movie Ratings & Reviews – Rate and write reviews for your favorite movies📊 Personalized Dashboard – A visually appealing dashboard to manage your collection🔍 Advanced Search – Find movies using filters like genre, year, and rating🌙 Dark Mode Support – Enjoy the app in a comfortable dark mode📤 Social Sharing – Share your favorite movies with friends🖼 Responsive UI – Optimized for mobile, tablet, and desktop devices🔄 Real-time Updates – Instant updates when adding or modifying your collection

🚀 Tech Stack

Frontend

Backend

Database

React Native

Express.js

MongoDB Atlas

Expo

Node.js

Mongoose

NativeWind

Axios



React Native Paper







🛠️ Installation Guide

Prerequisites

Node.js (v16 or higher)

MongoDB Atlas account or local MongoDB setup

Expo CLI

Setup Steps

# Clone the repository
git clone https://github.com/yourusername/MovieCollectionTracker2.0.git

# Navigate to the project directory
cd MovieCollectionTracker2.0

# Install dependencies
npm install

# Create a .env file in the root directory
MONGODB_URI=your_mongodb_connection_string
PORT=3000

# Start the server
npm start

# Open a new terminal and start the Expo development server
npm run dev

📱 Usage

Register/Login to access your personal movie collection

Add new movies to your collection with details

View movie details and manage your watchlist

Rate and review your favorite films

Search for movies based on title, genre, or year

🌟 Project Structure

MovieCollectionTracker2.0/
├── assets/               # Images and static assets
├── components/           # Reusable UI components
├── app/                  # Expo Router screens
│   ├── index.js          # Home screen
│   ├── movie/[id].js     # Movie details screen
│   └── movie/edit.js     # Edit movie screen
├── services/             # API services
│   └── MovieService.js   # Movie-related API calls
├── server.js             # Express server
├── .env                  # Environment variables
└── package.json          # Project dependencies

🔄 API Endpoints

Method

Endpoint

Description

GET

/api/movies

Get all movies

POST

/api/movies

Add a new movie

GET

/api/movies/:id

Get a specific movie

PUT

/api/movies/:id

Update a movie

DELETE

/api/movies/:id

Delete a movie

🤝 Contributing

🚀 Contributions are always welcome! Follow these steps to contribute:

Fork the repository

Create a feature branch (git checkout -b feature/your-feature)

Commit changes (git commit -m 'Add your feature')

Push to GitHub (git push origin feature/your-feature)

Submit a Pull Request

📝 License

This project is licensed under the MIT License. See the LICENSE file for more details. -->




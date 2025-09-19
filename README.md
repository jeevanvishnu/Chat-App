# Chaty 💬

A real-time chat application built with modern web technologies, featuring user authentication, email verification, and rate limiting for a secure and smooth chatting experience.

## ✨ Features

- **Real-time messaging** - Instant communication using Socket.IO
- **User authentication** - Secure signup and login system
- **Email verification** - Account verification via Resend email service
- **Image sharing** - Upload and share images with Cloudinary integration
- **Rate limiting** - Protection against spam and abuse using Arcjet
- **Responsive design** - Beautiful UI with Tailwind CSS and DaisyUI
- **Modern interface** - Clean and intuitive user experience

## 🚀 Tech Stack

### Frontend
- **HTML** - Structure and markup
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind CSS

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Socket.IO** - Real-time bidirectional event-based communication
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling for Node.js

### Services
- **Resend** - Email delivery service for signup verification
- **Arcjet** - Rate limiting and security protection
- **Cloudinary** - Cloud-based image and video management service

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (running locally or MongoDB Atlas)
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   https://github.com/jeevanvishnu/Chat-App.git
   cd Chat-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory and add the following variables:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/chaty
   # or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chaty

   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # Email Service (Resend)
   RESEND_API_KEY=your_resend_api_key_here

   # Rate Limiting (Arcjet)
   ARCJET_KEY=your_arcjet_key_here

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret

   # JWT Secret (generate a secure random string)
   JWT_SECRET=your_jwt_secret_here

   # App Configuration
   CLIENT_URL=http://localhost:3000
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # For local MongoDB installation
   mongoose
   
   # Or if using MongoDB Atlas, ensure your connection string is correct in .env
   ```

## 🚀 Usage

1. **Start the development server**
   ```bash
   npm start
   ```
   or for development with auto-restart:
   ```bash
   npm run dev
   ```

2. **Access the application**
   
   Open your browser and navigate to `http://localhost:3000`

3. **Create an account**
   - Sign up with your email address
   - Check your email for verification link
   - Verify your account and start chatting!

## 📁 Project Structure

```
chaty/
├── public/                 # Static files
│   ├── css/               # Stylesheets
│   ├── js/                # Client-side JavaScript
│   └── index.html         # Main HTML file
├── src/                   # Source code
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   └── utils/             # Utility functions
├── config/                # Configuration files
├── .env.example           # Environment variables example
├── package.json           # Dependencies and scripts
└── server.js              # Main server file
```

## 🔧 Configuration

### Email Setup (Resend)
1. Sign up at [Resend](https://resend.com/)
2. Create an API key
3. Add the API key to your `.env` file
4. Configure your domain for email sending

### Rate Limiting (Arcjet)
1. Sign up at [Arcjet](https://arcjet.com/)
2. Create a new project
3. Get your API key
4. Add the key to your `.env` file

### Image Management (Cloudinary)
1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to your dashboard to find your credentials:
   - Cloud Name
   - API Key
   - API Secret
3. Add these credentials to your `.env` file
4. Configure upload presets if needed for additional security

### Database Setup
- **Local MongoDB**: Ensure MongoDB is installed and running
- **MongoDB Atlas**: Create a cluster and get your connection string
- **Mongoose**: Used for elegant MongoDB object modeling and schema validation

## 🧪 Scripts

```bash
# Start the application
npm start

# Development mode with auto-restart
npm run dev

# Run tests (if implemented)
npm test

# Lint code (if configured)
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## 🙏 Acknowledgments

- [Socket.IO](https://socket.io/) for real-time communication
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [DaisyUI](https://daisyui.com/) for beautiful components
- [Mongoose](https://mongoosejs.com/) for MongoDB object modeling
- [Resend](https://resend.com/) for email services
- [Cloudinary](https://cloudinary.com/) for image and media management
- [Arcjet](https://arcjet.com/) for security and rate limiting

---

⭐ If you found this project helpful, please give it a star on GitHub!

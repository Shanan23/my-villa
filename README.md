# VillaLux - Villa Catalog & CMS

A modern villa catalog website with CMS functionality built using React.js, MongoDB, and Tailwind CSS.

## 🏗️ Features

### Frontend (React.js + Tailwind CSS)
- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Villa Catalog**: Browse and search villas with advanced filtering
- **Villa Details**: Detailed villa pages with image galleries
- **User Authentication**: Login/Register with JWT tokens
- **Admin Dashboard**: Full CMS functionality for managing villas and users
- **Responsive Design**: Works perfectly on all devices

### Backend (Node.js + MongoDB)
- **RESTful API**: Complete CRUD operations for villas
- **User Management**: Authentication and authorization system
- **File Upload**: Image upload functionality for villa photos
- **Search & Filtering**: Advanced search with multiple criteria
- **Pagination**: Efficient data loading with pagination
- **Security**: JWT authentication, password hashing, input validation

### CMS Features
- **Villa Management**: Add, edit, delete villas
- **User Management**: Manage admin users and roles
- **Image Management**: Upload and organize villa images
- **Dashboard Analytics**: Overview of system statistics
- **Role-based Access**: Different permission levels (admin, editor, viewer)

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd villa-catalog-cms
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install server dependencies
   cd server && npm install
   
   # Install client dependencies
   cd ../client && npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the server directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://172.30.220.43:27018/villa-catalog
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud)
   # Update MONGODB_URI in .env file
   ```

5. **Run the application**
   ```bash
   # From root directory
   npm run dev
   
   # This will start both server (port 5000) and client (port 3000)
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
villa-catalog-cms/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   └── ...
│   ├── package.json
│   └── tailwind.config.js
├── server/                 # Node.js backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── uploads/           # File uploads
│   ├── index.js           # Server entry point
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## 🔧 Configuration

### MongoDB Setup
1. Install MongoDB locally or use MongoDB Atlas
2. Create a database named `villa-catalog`
3. Update the `MONGODB_URI` in your `.env` file

### JWT Secret
Generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### File Upload
The application supports image uploads for villa photos. Files are stored in the `server/uploads/` directory.

## 👥 User Roles

- **Admin**: Full access to all features
- **Editor**: Can manage villas but not users
- **Viewer**: Read-only access

## 🛠️ Development

### Available Scripts

```bash
# Root directory
npm run dev          # Start both server and client
npm run server       # Start only server
npm run client       # Start only client
npm run build        # Build client for production
npm run install-all  # Install all dependencies

# Server directory
npm run dev          # Start server with nodemon
npm start           # Start server in production

# Client directory
npm start           # Start React development server
npm run build       # Build for production
npm test            # Run tests
```

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

#### Villas
- `GET /api/villas` - Get all villas (with filters)
- `GET /api/villas/:id` - Get single villa
- `POST /api/villas` - Create villa (admin)
- `PUT /api/villas/:id` - Update villa (admin)
- `DELETE /api/villas/:id` - Delete villa (admin)

#### Admin
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/villas` - Admin villa list
- `POST /api/admin/upload-images` - Upload images
- `GET /api/admin/users` - User management

## 🎨 Customization

### Styling
The application uses Tailwind CSS for styling. You can customize:
- Colors in `client/tailwind.config.js`
- Components in `client/src/index.css`
- Individual component styles

### Adding Features
- New villa fields: Update the Villa model in `server/models/Villa.js`
- New API endpoints: Add routes in `server/routes/`
- New components: Create in `client/src/components/`

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the client: `cd client && npm run build`
2. Deploy the `build` folder to your hosting service

### Backend (Heroku/Railway)
1. Set environment variables
2. Deploy the `server` directory
3. Update frontend API base URL

### Database
- Use MongoDB Atlas for cloud database
- Set up proper indexes for performance
- Configure backup and monitoring

## 🔒 Security

- JWT tokens for authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Rate limiting (recommended for production)

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team

---

**Built with ❤️ using React.js, MongoDB, and Tailwind CSS** 
# Data Marketplace - Command Cheatsheet

## 🚀 Installation Commands

```bash
# Clone or navigate to project
cd data-web

# Automated installation (recommended)
./install.sh

# OR manual installation
npm run install-all

# OR install separately
cd backend && npm install
cd ../frontend && npm install
```

## 🏃 Running the Application

### Run Both Servers Together

```bash
# From root directory
npm run dev
```

### Run Servers Separately

```bash
# Terminal 1 - Backend
cd backend
npm run dev
# Server: http://localhost:3001

# Terminal 2 - Frontend
cd frontend
npm run dev
# App: http://localhost:3000
```

## 🔧 Development Commands

### Backend

```bash
cd backend

# Development mode (with nodemon)
npm run dev

# Production mode
npm start

# Install new package
npm install package-name
```

### Frontend

```bash
cd frontend

# Development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint
npm run lint

# Install new package
npm install package-name
```

## 📝 Environment Setup

### Create Environment Files

```bash
# Backend
cd backend
cp .env.example .env
nano .env  # or use your editor

# Frontend
cd frontend
cp .env.local.example .env.local
nano .env.local  # or use your editor
```

### Generate JWT Secret

```bash
# Generate a secure random string
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🗄️ Database Commands

### MongoDB Commands (via MongoDB Shell)

```javascript
// Connect to MongoDB
mongosh "your-connection-string"

// Create admin user
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)

// View all users
db.users.find()

// View all data
db.datas.find()

// View all purchases
db.purchases.find()

// Count documents
db.datas.countDocuments()

// Drop database (careful!)
db.dropDatabase()
```

## 🧪 Testing the Application

### Create Test User

```bash
# Via Frontend
1. Go to http://localhost:3000/register
2. Fill in details and register
3. Login at http://localhost:3000/login
```

### Create Admin User

```bash
# Via MongoDB
mongosh "your-connection-string"
use data-marketplace

db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

### Test Razorpay Payment

```
Test Card: 4111 1111 1111 1111
CVV: Any 3 digits
Expiry: Any future date
```

## 📦 Package Management

### Update Dependencies

```bash
# Backend
cd backend
npm update

# Frontend
cd frontend
npm update
```

### Check for Outdated Packages

```bash
npm outdated
```

### Install Specific Version

```bash
npm install package-name@version
```

## 🔍 Debugging Commands

### Backend Debugging

```bash
cd backend

# Check if server is running
lsof -i :3001

# Kill process on port 3001
kill -9 $(lsof -t -i:3001)

# View logs (if using pm2)
pm2 logs

# Check Node version
node --version

# Check npm version
npm --version
```

### Frontend Debugging

```bash
cd frontend

# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Check for errors
npm run lint

# Build to check for errors
npm run build
```

## 📊 API Testing

### Using cURL

```bash
# Register
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'

# Get filter options (replace TOKEN)
curl http://localhost:3001/api/data/filter-options \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🔄 Git Commands

### Initialize Git

```bash
git init
git add .
git commit -m "Initial commit: Data Marketplace"
```

### Push to GitHub

```bash
git remote add origin your-repo-url
git branch -M main
git push -u origin main
```

### Create .gitignore

Already created with:

- node_modules/
- .env files
- .DS_Store
- logs

## 🚀 Deployment Commands

### Deploy Backend (Heroku Example)

```bash
cd backend
heroku create your-app-name
heroku config:set MONGODB_URI=your-uri
heroku config:set JWT_SECRET=your-secret
heroku config:set RAZORPAY_KEY_ID=your-key
heroku config:set RAZORPAY_KEY_SECRET=your-secret
git push heroku main
```

### Deploy Frontend (Vercel Example)

```bash
cd frontend
vercel
# Follow prompts
# Set environment variables in Vercel dashboard
```

## 🧹 Cleanup Commands

### Remove node_modules

```bash
# From root
rm -rf backend/node_modules frontend/node_modules node_modules

# Reinstall
npm run install-all
```

### Clear All Logs

```bash
find . -name "*.log" -type f -delete
```

### Reset Git History

```bash
rm -rf .git
git init
```

## 📝 Useful One-Liners

```bash
# Check all running Node processes
ps aux | grep node

# Check disk space
df -h

# Check memory usage
free -m

# Find large files
find . -type f -size +10M

# Count lines of code
find . -name "*.js" -not -path "*/node_modules/*" | xargs wc -l

# Search in files
grep -r "search-term" --include="*.js" .
```

## 🎯 Quick Access URLs

### Development

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- API Docs: http://localhost:3001/api

### Pages

- Homepage: http://localhost:3000
- Login: http://localhost:3000/login
- Register: http://localhost:3000/register
- Dashboard: http://localhost:3000/dashboard
- Purchases: http://localhost:3000/dashboard/purchases
- Admin Upload: http://localhost:3000/dashboard/admin/upload

## 💡 Pro Tips

```bash
# Run backend in background
cd backend
nohup npm run dev > output.log 2>&1 &

# Monitor logs in real-time
tail -f output.log

# Create alias for quick start (add to ~/.bashrc or ~/.zshrc)
alias dmstart='cd ~/path/to/data-web && npm run dev'
```

## 🆘 Emergency Commands

```bash
# Kill all node processes (careful!)
killall node

# Reset everything
rm -rf node_modules backend/node_modules frontend/node_modules
npm run install-all

# Check port conflicts
lsof -i :3000
lsof -i :3001
```

---

**Save this file for quick reference!** 🚀

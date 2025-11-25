# Data Marketplace - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies

**Backend:**

```bash
cd backend
npm install
```

**Frontend:**

```bash
cd frontend
npm install
```

### Step 2: Configure Environment Variables

**Backend (.env):**

```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB Atlas and Razorpay credentials
```

**Frontend (.env.local):**

```bash
cd frontend
cp .env.local.example .env.local
# Edit .env.local with your API URL and Razorpay key
```

### Step 3: Start Development Servers

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

Server runs on: http://localhost:3001

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

App runs on: http://localhost:3000

### Step 4: Test the Application

1. **Visit Homepage**: http://localhost:3000
2. **Sign Up**: Create a new account
3. **Login**: Access the dashboard
4. **Browse Data**: Use filters to search
5. **Purchase**: Buy data (use Razorpay test mode)

### Step 5: Create Admin User

After signing up, make yourself an admin:

1. Connect to your MongoDB database
2. Find your user and update the role:

```javascript
db.users.updateOne({ email: "your@email.com" }, { $set: { role: "admin" } });
```

3. Logout and login again
4. You'll see the "Upload" button in dashboard

## 📋 Checklist

- [ ] Node.js installed (v18+)
- [ ] MongoDB Atlas cluster created
- [ ] Razorpay test account created
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Backend .env configured
- [ ] Frontend .env.local configured
- [ ] Backend server running
- [ ] Frontend server running
- [ ] Signed up and logged in
- [ ] Admin role assigned (if needed)

## 🔑 Key Features to Test

### As User:

- ✅ Register/Login
- ✅ Browse data with filters
- ✅ View blurred preview (top 10)
- ✅ Purchase data with Razorpay
- ✅ View purchased data
- ✅ Export data as CSV

### As Admin:

- ✅ Upload new data
- ✅ Access all features

## 💡 Tips

- **Price**: ₹0.50 per record (₹1 for 2 records)
- **Razorpay Test Mode**: Use test card 4111 1111 1111 1111
- **Data Snapshot**: Purchased data remains unchanged
- **Filters**: All filters are dynamic and connected to real data

## 🐛 Common Issues

**"Cannot connect to MongoDB"**

- Check your MongoDB Atlas connection string
- Whitelist your IP address
- Verify username/password

**"Razorpay not loading"**

- Check your Razorpay key is correct
- Ensure it's a test mode key (starts with rzp*test*)

**"Not authorized"**

- Check JWT_SECRET is set
- Ensure token is saved in localStorage
- Try logging out and back in

## 📚 Next Steps

1. Add sample data through admin upload
2. Test filtering with different criteria
3. Make a test purchase
4. View and export purchased data
5. Explore the code and customize!

## 🎨 UI Note

Built with Shadcn UI - minimal, clean design as requested!

---

Need help? Check README.md and SETUP_GUIDE.md for detailed information.

# Quick Deployment Guide

## 🚀 Deploy in 10 Minutes

### Step 1: Deploy Backend to Render (5 min)

1. **Go to Render**: https://render.com → Sign up/Login
2. **New Web Service**: Click "New +" → "Web Service"
3. **Connect GitHub**: Connect and select your repository
4. **Configure**:
   - Name: `data-marketplace-backend`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. **Environment Variables** (Click "Advanced"):
   ```
   MONGODB_URI=mongodb+srv://akarshrajput01_db_user:zFNXhPWfXN4lOY23@datawebcluster0.wctmddk.mongodb.net/?appName=DataWebCluster0
   JWT_SECRET=your_jwt_secret_key_here_minimum_32_characters
   JWT_EXPIRE=7d
   RAZORPAY_KEY_ID=rzp_test_RinAAEid78k2sA
   RAZORPAY_KEY_SECRET=YBoXJKQ9j9Oht3Gai67aEc50
   CLIENT_URL=https://YOUR-FRONTEND.vercel.app
   ```
6. **Click "Create Web Service"**
7. **Copy your backend URL**: e.g., `https://data-marketplace-backend.onrender.com`

### Step 2: Deploy Frontend to Vercel (5 min)

1. **Go to Vercel**: https://vercel.com → Sign up/Login
2. **Import Project**: Click "Add New..." → "Project"
3. **Select Repository**: Choose your GitHub repo
4. **Configure**:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `frontend`
5. **Environment Variables**:
   ```
   NEXT_PUBLIC_API_URL=https://YOUR-BACKEND.onrender.com/api
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_RinAAEid78k2sA
   ```
6. **Click "Deploy"**
7. **Copy your frontend URL**: e.g., `https://your-app.vercel.app`

### Step 3: Update Backend CLIENT_URL

1. Go back to **Render Dashboard**
2. Select your backend service
3. Go to **Environment**
4. Update `CLIENT_URL` to your Vercel URL
5. Save (auto-redeploys)

### Step 4: MongoDB Atlas Setup

1. Go to **MongoDB Atlas**: https://cloud.mongodb.com
2. **Network Access** → **Add IP Address**
3. Add: `0.0.0.0/0` (Allow access from anywhere)
4. Click **Confirm**

## ✅ Done!

Visit your Vercel URL and test the application!

---

## 📝 Important URLs to Save

- **Frontend**: https://YOUR-APP.vercel.app
- **Backend**: https://YOUR-BACKEND.onrender.com
- **MongoDB**: https://cloud.mongodb.com
- **Render Dashboard**: https://dashboard.render.com
- **Vercel Dashboard**: https://vercel.com/dashboard

---

## 🐛 Quick Fixes

**Backend not working?**

- Wait 30 seconds (Render free tier spins up)
- Check MongoDB Atlas allows `0.0.0.0/0`

**Frontend not connecting?**

- Verify `NEXT_PUBLIC_API_URL` in Vercel
- Check backend `CLIENT_URL` matches Vercel URL

**CORS Error?**

- Update `CLIENT_URL` in Render to match Vercel URL exactly

---

For detailed instructions, see `DEPLOYMENT.md`

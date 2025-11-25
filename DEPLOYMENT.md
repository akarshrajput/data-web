# Deployment Guide

## Backend Deployment (Render)

### Prerequisites

1. Create a [Render account](https://render.com)
2. Push your code to GitHub (if not already done)

### Steps:

1. **Create New Web Service on Render**

   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `data-web` repository

2. **Configure Service**

   - **Name**: `data-marketplace-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Region**: Choose closest to you
   - **Branch**: `main` (or your default branch)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

3. **Add Environment Variables**
   Click "Advanced" and add these environment variables:

   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://akarshrajput01_db_user:zFNXhPWfXN4lOY23@datawebcluster0.wctmddk.mongodb.net/?appName=DataWebCluster0
   JWT_SECRET=your_jwt_secret_key_here_minimum_32_characters
   JWT_EXPIRE=7d
   RAZORPAY_KEY_ID=rzp_test_RinAAEid78k2sA
   RAZORPAY_KEY_SECRET=YBoXJKQ9j9Oht3Gai67aEc50
   CLIENT_URL=https://your-frontend-url.vercel.app
   ```

   **Important**: Update `CLIENT_URL` after deploying frontend

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy your backend URL (e.g., `https://data-marketplace-backend.onrender.com`)

### Notes:

- Render free tier spins down after inactivity (first request may be slow)
- Backend URL will be: `https://YOUR_SERVICE_NAME.onrender.com`

---

## Frontend Deployment (Vercel)

### Prerequisites

1. Create a [Vercel account](https://vercel.com)
2. Install Vercel CLI (optional): `npm install -g vercel`

### Method 1: Using Vercel Dashboard (Recommended)

1. **Import Project**

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Select the `data-web` repository

2. **Configure Project**

   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

3. **Add Environment Variables**
   Click "Environment Variables" and add:

   ```
   NEXT_PUBLIC_API_URL=https://YOUR-BACKEND-URL.onrender.com/api
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_RinAAEid78k2sA
   ```

   **Important**: Replace `YOUR-BACKEND-URL` with your actual Render backend URL

4. **Deploy**

   - Click "Deploy"
   - Wait for deployment to complete
   - Copy your frontend URL (e.g., `https://your-app.vercel.app`)

5. **Update Backend CORS**
   - Go back to Render dashboard
   - Update `CLIENT_URL` environment variable with your Vercel URL
   - Backend will automatically redeploy

### Method 2: Using Vercel CLI

1. **Install Vercel CLI** (if not installed)

   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**

   ```bash
   vercel login
   ```

3. **Deploy from frontend directory**
   ```bash
   cd frontend
   vercel
   ```
4. **Add Environment Variables**

   ```bash
   vercel env add NEXT_PUBLIC_API_URL
   # Enter: https://YOUR-BACKEND-URL.onrender.com/api

   vercel env add NEXT_PUBLIC_RAZORPAY_KEY_ID
   # Enter: rzp_test_RinAAEid78k2sA
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

---

## Post-Deployment Checklist

### 1. Update CORS in Backend

Make sure your backend allows your Vercel domain. Check `backend/server.js`:

```javascript
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
};
```

### 2. Update Environment Variables

- **Render**: Update `CLIENT_URL` to your Vercel URL
- **Vercel**: Update `NEXT_PUBLIC_API_URL` to your Render URL

### 3. Test the Application

1. Visit your Vercel URL
2. Try signing up/logging in
3. Test data upload (admin)
4. Test data purchase with Razorpay

### 4. MongoDB Atlas Whitelist

Make sure MongoDB Atlas allows connections:

- Go to MongoDB Atlas → Network Access
- Add IP Address: `0.0.0.0/0` (allow all) for Render/Vercel

### 5. Razorpay Webhook (Optional)

If using Razorpay webhooks:

- Go to Razorpay Dashboard → Webhooks
- Add webhook URL: `https://YOUR-BACKEND-URL.onrender.com/api/payment/webhook`

---

## Troubleshooting

### Backend Issues

- **503 Service Unavailable**: Render free tier - wait 30s for spin-up
- **CORS Error**: Check `CLIENT_URL` environment variable matches Vercel URL
- **Database Connection**: Verify MongoDB Atlas Network Access allows `0.0.0.0/0`

### Frontend Issues

- **API Connection Failed**: Check `NEXT_PUBLIC_API_URL` is correct
- **Blank Page**: Check browser console for errors
- **Build Failed**: Ensure all dependencies are in `package.json`

### Common Fixes

```bash
# Clear Next.js cache
cd frontend
rm -rf .next
npm run build

# Check environment variables
# On Vercel: Dashboard → Settings → Environment Variables
# On Render: Dashboard → Environment
```

---

## Environment Variables Summary

### Backend (Render)

```env
NODE_ENV=production
PORT=10000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
JWT_EXPIRE=7d
RAZORPAY_KEY_ID=<your-razorpay-key>
RAZORPAY_KEY_SECRET=<your-razorpay-secret>
CLIENT_URL=<your-vercel-url>
```

### Frontend (Vercel)

```env
NEXT_PUBLIC_API_URL=<your-render-url>/api
NEXT_PUBLIC_RAZORPAY_KEY_ID=<your-razorpay-key>
```

---

## Continuous Deployment

Both platforms support automatic deployments:

- **Render**: Auto-deploys on push to main branch
- **Vercel**: Auto-deploys on push to main branch

To disable auto-deploy:

- **Render**: Settings → Build & Deploy → Turn off "Auto-Deploy"
- **Vercel**: Settings → Git → Disable auto-deploy

---

## Cost

### Free Tier Limits

- **Render**: 750 hours/month, sleeps after inactivity
- **Vercel**: Unlimited deployments, 100GB bandwidth/month

### Upgrade Options

- **Render**: $7/month for always-on instance
- **Vercel**: $20/month for Pro features

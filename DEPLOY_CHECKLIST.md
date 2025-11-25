# Deployment Checklist ✅

Your repository is ready to deploy! Follow these steps:

## ✅ Pre-deployment (Already Done)

- [x] Code pushed to GitHub: https://github.com/akarshrajput/data-web
- [x] Backend render.yaml configured
- [x] Frontend vercel.json configured
- [x] Environment variable setup documented
- [x] .gitignore files in place

## 🔴 Step 1: Deploy Backend to Render

1. **Go to Render**: https://render.com

   - Sign up or login with GitHub

2. **Create Web Service**:
   - Click "New +" → "Web Service"
   - Connect GitHub account if not connected
   - Select repository: `akarshrajput/data-web`
3. **Configure Service**:

   ```
   Name: data-marketplace-backend
   Root Directory: backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Add Environment Variables** (Critical!):

   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://akarshrajput01_db_user:zFNXhPWfXN4lOY23@datawebcluster0.wctmddk.mongodb.net/?appName=DataWebCluster0
   JWT_SECRET=your_jwt_secret_minimum_32_characters_change_this
   JWT_EXPIRE=7d
   RAZORPAY_KEY_ID=rzp_test_RinAAEid78k2sA
   RAZORPAY_KEY_SECRET=YBoXJKQ9j9Oht3Gai67aEc50
   CLIENT_URL=https://temporary.vercel.app
   ```

   ⚠️ **Important**: Change JWT_SECRET to a strong secret key!

5. **Deploy**:
   - Click "Create Web Service"
   - Wait 3-5 minutes for deployment
   - **Copy your backend URL** (e.g., `https://data-marketplace-backend.onrender.com`)

## 🔵 Step 2: Deploy Frontend to Vercel

1. **Go to Vercel**: https://vercel.com

   - Sign up or login with GitHub

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Select repository: `akarshrajput/data-web`
3. **Configure Project**:

   ```
   Framework Preset: Next.js (auto-detected)
   Root Directory: frontend
   Build Command: (leave default)
   Output Directory: (leave default)
   Install Command: (leave default)
   ```

4. **Add Environment Variables**:

   ```
   NEXT_PUBLIC_API_URL=https://YOUR-BACKEND-URL.onrender.com/api
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_RinAAEid78k2sA
   ```

   ⚠️ **Replace `YOUR-BACKEND-URL` with the actual URL from Step 1**

5. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes
   - **Copy your frontend URL** (e.g., `https://data-web.vercel.app`)

## 🟢 Step 3: Update Backend with Frontend URL

1. **Go back to Render Dashboard**:

   - Select your backend service
   - Click "Environment" in left sidebar

2. **Update CLIENT_URL**:
   - Find `CLIENT_URL` variable
   - Change value to your Vercel URL (from Step 2)
   - Click "Save Changes"
   - Service will auto-redeploy (1-2 minutes)

## 🎉 Step 4: Test Your Deployment

1. **Open your frontend URL** (from Step 2)
2. **Test signup**: Create a new account
3. **Test login**: Login with created account
4. **Test dashboard**: Check if data loads
5. **Test filters**: Try filtering data

## 🐛 Troubleshooting

### Backend Issues:

- **Build fails**: Check Render logs in dashboard
- **MongoDB connection fails**: Verify MONGODB_URI is correct
- **Environment variables**: Make sure all are set correctly

### Frontend Issues:

- **API calls fail**: Check NEXT_PUBLIC_API_URL is correct
- **Build fails**: Check Vercel deployment logs
- **Payment not working**: Verify NEXT_PUBLIC_RAZORPAY_KEY_ID is set

### CORS Errors:

- Make sure CLIENT_URL in backend matches your Vercel URL exactly
- No trailing slash in URLs

## 📝 Post-Deployment

### Update Razorpay Webhook (if needed):

1. Go to Razorpay Dashboard
2. Settings → Webhooks
3. Add webhook URL: `https://YOUR-BACKEND-URL.onrender.com/api/payment/webhook`

### Custom Domain (Optional):

- **Vercel**: Project Settings → Domains → Add
- **Render**: Service Settings → Custom Domain → Add

## 🔒 Security Checklist

- [ ] Change JWT_SECRET to a strong random string
- [ ] Enable MongoDB IP whitelist (allow 0.0.0.0/0 for Render)
- [ ] In production, use Razorpay live keys (remove test keys)
- [ ] Enable HTTPS on custom domains
- [ ] Review Render logs regularly

## 📞 Support Links

- **Render Documentation**: https://render.com/docs
- **Vercel Documentation**: https://vercel.com/docs
- **MongoDB Atlas**: https://cloud.mongodb.com
- **Razorpay Dashboard**: https://dashboard.razorpay.com

---

## Quick Commands Reference

### Force Redeploy Backend (Render):

- Go to service → Manual Deploy → "Deploy latest commit"

### Force Redeploy Frontend (Vercel):

- Go to project → Deployments → Click "..." → Redeploy

### View Logs:

- **Render**: Service → Logs tab
- **Vercel**: Project → Deployments → Click deployment → View Function Logs

---

**Repository**: https://github.com/akarshrajput/data-web

Good luck with your deployment! 🚀

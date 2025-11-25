# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### 🚫 Installation Issues

#### Issue: "npm install" fails

**Symptoms:**

- Error during package installation
- Missing dependencies

**Solutions:**

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock
rm -rf node_modules package-lock.json
npm install

# Try with different Node version (use nvm)
nvm install 18
nvm use 18
npm install

# Check for permission issues
sudo chown -R $USER:$USER .
```

#### Issue: Permission denied when running install.sh

**Solution:**

```bash
chmod +x install.sh
./install.sh
```

---

### 🔌 Backend Issues

#### Issue: "Cannot connect to MongoDB"

**Symptoms:**

- Server crashes on startup
- Error: "MongoServerError"

**Solutions:**

1. Check connection string in `.env`:

   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
   ```

2. Verify MongoDB Atlas settings:

   - IP Whitelist: Add your IP or use `0.0.0.0/0` for development
   - Username/Password: Correct credentials
   - Database User: Has read/write permissions

3. Test connection:

   ```bash
   # Install MongoDB Compass
   # Connect using your connection string
   # If it works there, it should work in app
   ```

4. Check network:
   ```bash
   ping cluster.mongodb.net
   ```

#### Issue: "Port 3001 already in use"

**Solution:**

```bash
# Find process using port 3001
lsof -i :3001

# Kill the process
kill -9 <PID>

# Or change port in backend/.env
PORT=3002
```

#### Issue: "JWT malformed" or "Invalid token"

**Solutions:**

1. Check JWT_SECRET in `.env` (minimum 32 characters)
2. Clear browser localStorage:
   ```javascript
   // In browser console
   localStorage.clear();
   ```
3. Logout and login again

#### Issue: Backend returns 500 error

**Check:**

```bash
# View server logs
cd backend
npm run dev

# Common causes:
# - Missing environment variables
# - Database connection issues
# - Invalid data in request
```

---

### 🎨 Frontend Issues

#### Issue: "Cannot find module '@/...'"

**Solution:**

```bash
# Check jsconfig.json exists
cat frontend/jsconfig.json

# If missing, create it with:
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}

# Restart Next.js server
```

#### Issue: "Module not found: Can't resolve 'next/font'"

**Solution:**

```bash
cd frontend
npm install next@latest
```

#### Issue: Styling not working / Tailwind classes not applied

**Solutions:**

```bash
# Rebuild CSS
cd frontend
rm -rf .next
npm run dev

# Check tailwind.config.js content paths
# Ensure postcss.config.js exists
# Check globals.css imports Tailwind
```

#### Issue: "Hydration failed" error

**Causes:**

- Using localStorage in component body
- Server/client rendering mismatch

**Solution:**

```javascript
// Use useEffect for browser-only code
useEffect(() => {
  const token = localStorage.getItem("token");
}, []);

// Check for window object
if (typeof window !== "undefined") {
  // browser code
}
```

#### Issue: Page shows "Not authenticated" but user is logged in

**Solution:**

```javascript
// Check Zustand store persistence
// In store/authStore.js, ensure persist is working

// Clear and re-login
localStorage.clear();
// Login again
```

---

### 💳 Payment Integration Issues

#### Issue: Razorpay checkout not loading

**Solutions:**

1. Check Razorpay script is loaded:

   ```javascript
   // Should see script in network tab
   https://checkout.razorpay.com/v1/checkout.js
   ```

2. Verify Razorpay keys:

   ```bash
   # backend/.env
   RAZORPAY_KEY_ID=rzp_test_xxxxx
   RAZORPAY_KEY_SECRET=xxxxx

   # frontend/.env.local
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
   ```

3. Check browser console for errors

#### Issue: Payment verification fails

**Causes:**

- Wrong Razorpay secret
- Signature mismatch

**Debug:**

```javascript
// In backend/controllers/paymentController.js
// Add logging
console.log("Order ID:", razorpay_order_id);
console.log("Payment ID:", razorpay_payment_id);
console.log("Signature:", razorpay_signature);
```

#### Issue: "Payment gateway error"

**Solutions:**

- Use Razorpay test mode keys
- Test card: 4111 1111 1111 1111
- Any CVV, any future expiry date
- Ensure Razorpay account is active

---

### 🗄️ Database Issues

#### Issue: Data not saving

**Check:**

```javascript
// Model validation
// Check required fields in models
// View backend logs for errors
```

#### Issue: Query returns no results

**Debug:**

```javascript
// In backend/controllers/dataController.js
console.log("Query:", query);
console.log("Results:", data);

// Check indexes
db.datas.getIndexes();

// Rebuild indexes if needed
db.datas.reIndex();
```

#### Issue: Purchase snapshot empty

**Solution:**

```javascript
// Ensure data exists before purchase
// Check filterCriteria is correct
// Verify completePurchase is called after payment
```

---

### 🔐 Authentication Issues

#### Issue: User can't login

**Check:**

1. Correct email/password
2. Password is minimum 6 characters
3. User exists in database:
   ```javascript
   db.users.findOne({ email: "user@example.com" });
   ```

#### Issue: "Not authorized as admin"

**Solution:**

```javascript
// Update user role in MongoDB
db.users.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } });
```

#### Issue: Token expires too quickly

**Solution:**

```bash
# backend/.env
JWT_EXPIRE=30d  # Change from 7d to 30d
```

---

### 🌐 API Issues

#### Issue: CORS errors

**Symptoms:**

- "Access-Control-Allow-Origin" error in browser console

**Solution:**

```javascript
// In backend/server.js
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Check CLIENT_URL in backend/.env
CLIENT_URL=http://localhost:3000
```

#### Issue: 404 on API endpoints

**Check:**

1. Backend server is running
2. Correct API URL in frontend:
   ```bash
   # frontend/.env.local
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```
3. Route is defined in backend/server.js

#### Issue: Request hangs / times out

**Causes:**

- Database connection slow
- Missing await in async function
- Infinite loop

**Debug:**

```bash
# Add timeouts
axios.defaults.timeout = 10000;
```

---

### 📱 UI/UX Issues

#### Issue: Components not rendering

**Check:**

```javascript
// Import paths correct
import { Button } from "@/components/ui/button";

// Components exported correctly
export { Button };

// No syntax errors
```

#### Issue: State not updating

**Debug:**

```javascript
// Zustand store
const authStore = useAuthStore();
console.log("Current state:", authStore);

// Component re-rendering
console.log("Component rendered");
```

#### Issue: Forms not submitting

**Check:**

```javascript
// Prevent default
e.preventDefault();

// Loading state
const [loading, setLoading] = useState(false);

// Error handling
try {
  // submit
} catch (error) {
  console.error(error);
}
```

---

### 🚀 Deployment Issues

#### Issue: Build fails

**Solution:**

```bash
cd frontend
npm run build

# Check errors
# Fix any TypeScript/ESLint errors
# Ensure all imports are correct
```

#### Issue: Environment variables not working in production

**Solution:**

- Vercel: Set in dashboard → Settings → Environment Variables
- Heroku: Use `heroku config:set KEY=value`
- Make sure NEXT*PUBLIC* prefix for client-side variables

#### Issue: Database connection fails in production

**Solution:**

```bash
# Whitelist production server IP in MongoDB Atlas
# Or use 0.0.0.0/0 (not recommended for production)
```

---

### 🐛 General Debugging Tips

#### Enable Detailed Logging

```javascript
// Backend
console.log("Request received:", req.body);
console.log("User:", req.user);
console.log("Database query:", query);

// Frontend
console.log("API call:", endpoint, data);
console.log("Response:", response);
console.log("Error:", error.response?.data);
```

#### Check Network Tab

- Open browser DevTools → Network
- See all API calls
- Check request/response
- Look for errors

#### Check Console

- Frontend: Browser console
- Backend: Terminal where server runs

#### Test API with Postman/cURL

```bash
# Register
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

---

### 📞 Still Having Issues?

#### Checklist:

- [ ] All dependencies installed (`npm install`)
- [ ] Environment variables set correctly
- [ ] MongoDB connection working
- [ ] Both servers running (backend & frontend)
- [ ] Browser console checked
- [ ] Network tab checked
- [ ] Backend logs checked
- [ ] Database has data
- [ ] User is logged in (if needed)
- [ ] Correct API URL in frontend

#### Debug Steps:

1. Start with backend - ensure it runs without errors
2. Test API endpoints with Postman/cURL
3. Check database connections and data
4. Then start frontend
5. Test each feature step by step
6. Check browser console for errors
7. Check network tab for failed requests

#### Get Help:

- Review code in this project
- Check similar projects on GitHub
- Read official documentation:
  - Next.js: https://nextjs.org/docs
  - Express: https://expressjs.com/
  - MongoDB: https://www.mongodb.com/docs/
  - Razorpay: https://razorpay.com/docs/

---

## 🔍 Error Messages Explained

### "Cannot read property 'x' of undefined"

- Variable is undefined/null
- Check if data loaded before accessing
- Use optional chaining: `data?.property`

### "Network Error"

- Backend not running
- Wrong API URL
- CORS issue
- Firewall blocking connection

### "401 Unauthorized"

- Not logged in
- Token expired/invalid
- Wrong credentials

### "403 Forbidden"

- Not admin (for admin routes)
- Insufficient permissions

### "404 Not Found"

- Wrong URL
- Route not defined
- Resource doesn't exist

### "500 Internal Server Error"

- Backend error
- Check backend logs
- Database issue
- Validation error

---

**Remember:** Most issues are due to:

1. Missing/incorrect environment variables
2. Not starting one of the servers
3. Wrong API URLs
4. Database connection issues
5. Missing authentication token

Check these first! 🚀

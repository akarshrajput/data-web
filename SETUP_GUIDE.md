# Backend Environment Variables

## MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string
4. Replace `<username>` and `<password>` with your credentials
5. Add your IP to whitelist (or use 0.0.0.0/0 for development)

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/data-marketplace?retryWrites=true&w=majority

## JWT Secret

Generate a secure random string (minimum 32 characters):

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

JWT_SECRET=your_generated_secure_secret_key_here
JWT_EXPIRE=7d

## Razorpay

1. Go to https://razorpay.com/
2. Sign up and get your API keys from Dashboard
3. Use Test Mode keys for development

RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxx

## Other

PORT=3001
CLIENT_URL=http://localhost:3000

---

# Frontend Environment Variables

## API URL

NEXT_PUBLIC_API_URL=http://localhost:3001/api

## Razorpay Key (same as backend)

NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx

---

# Creating Admin User

After setting up the backend, you can create an admin user:

1. Register a normal user through the frontend
2. Connect to MongoDB and update the user's role:

```javascript
db.users.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } });
```

Or use MongoDB Compass/Atlas to manually change the role field to "admin"

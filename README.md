# Data Marketplace Application

A full-stack data marketplace where users can browse, filter, and purchase business data. Built with Node.js, Next.js, MongoDB, and Razorpay.

## Features

- **User Authentication**: Login/Signup with JWT
- **Role-Based Access**: User and Admin roles
- **Dynamic Filters**: Search data by type, category, industry, location, etc.
- **Blurred Preview**: View top 10 results with sensitive data hidden
- **Secure Payments**: Razorpay integration for purchases
- **Data Snapshots**: Purchased data remains unchanged even if new data is added
- **Excel-like View**: View purchased data in table format
- **CSV Export**: Download purchased data as CSV
- **Admin Upload**: Admin-only interface to upload new data

## Tech Stack

### Backend

- Node.js & Express
- MongoDB with Mongoose
- JWT Authentication
- Razorpay Payment Gateway
- bcryptjs for password hashing

### Frontend

- Next.js 14 (App Router)
- React 18
- Shadcn UI components
- Tailwind CSS
- Zustand for state management
- Axios for API calls

## Project Structure

```
data-web/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── dataController.js
│   │   ├── paymentController.js
│   │   └── purchaseController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Data.js
│   │   └── Purchase.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── dataRoutes.js
│   │   ├── paymentRoutes.js
│   │   └── purchaseRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── app/
    │   ├── dashboard/
    │   │   ├── admin/
    │   │   │   └── upload/
    │   │   ├── purchases/
    │   │   │   └── [id]/
    │   │   ├── purchase/
    │   │   ├── layout.jsx
    │   │   └── page.jsx
    │   ├── login/
    │   ├── register/
    │   ├── globals.css
    │   ├── layout.jsx
    │   └── page.jsx
    ├── components/
    │   ├── ui/
    │   └── DashboardNav.jsx
    ├── lib/
    │   ├── api.js
    │   └── utils.js
    ├── store/
    │   └── authStore.js
    ├── .env.local.example
    ├── next.config.js
    ├── package.json
    ├── postcss.config.js
    └── tailwind.config.js
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- Razorpay account

### Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):

```bash
cp .env.example .env
```

4. Update `.env` with your credentials:

```env
PORT=3001
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret_minimum_32_characters
JWT_EXPIRE=7d
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CLIENT_URL=http://localhost:3000
```

5. Start the server:

```bash
npm run dev
```

Backend will run on http://localhost:3001

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env.local` file (copy from `.env.local.example`):

```bash
cp .env.local.example .env.local
```

4. Update `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
```

5. Start the development server:

```bash
npm run dev
```

Frontend will run on http://localhost:3000

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Data

- `POST /api/data/filter` - Get filtered data with blurred info (Protected)
- `GET /api/data/filter-options` - Get available filter options (Protected)
- `POST /api/data/upload` - Upload new data (Admin only)
- `GET /api/data/all` - Get all data (Admin only)
- `GET /api/data/:id` - Get single data (Admin only)
- `PUT /api/data/:id` - Update data (Admin only)
- `DELETE /api/data/:id` - Delete data (Admin only)

### Payment

- `POST /api/payment/create-order` - Create Razorpay order (Protected)
- `POST /api/payment/verify` - Verify payment (Protected)
- `GET /api/payment/key` - Get Razorpay key (Protected)

### Purchase

- `POST /api/purchase/complete/:id` - Complete purchase and create snapshot (Protected)
- `GET /api/purchase/my-purchases` - Get user's purchases (Protected)
- `GET /api/purchase/:id` - Get purchase details (Protected)
- `GET /api/purchase/:id/data` - Get purchased data snapshot (Protected)

## Usage Guide

### For Regular Users

1. **Sign Up**: Create an account on the registration page
2. **Login**: Access your account
3. **Browse Data**: Use filters to find specific business data
4. **Preview**: View top 10 results with blurred sensitive information
5. **Purchase**: Select quantity and proceed to payment
6. **Access Data**: View and export your purchased data anytime

### For Admins

1. **Login**: Use admin credentials
2. **Upload Data**: Access the Upload page from the dashboard
3. **Add Records**: Fill in business information and submit
4. **Manage**: View and manage all data in the system

## Data Model

### User

- name, email, password (hashed)
- role: 'user' | 'admin'

### Data (Flexible Schema)

- name, type, email, phone, website
- address (street, city, state, country, pincode)
- category, industry, employeeCount
- establishedYear, description
- socialMedia links
- contacts array
- metadata (flexible Map for additional data)

### Purchase

- user, quantity, pricePerUnit, totalAmount
- filterCriteria (applied filters)
- purchasedData (array of data IDs)
- dataSnapshot (complete data snapshot)
- payment details (Razorpay IDs)
- status and timestamps

## Pricing

- **₹0.50 per data record**
- Minimum purchase: 1 record
- Maximum: Based on available filtered results

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected API routes
- Role-based access control
- Payment verification with Razorpay signature

## Notes

- Data snapshots ensure purchased data remains unchanged
- Blurred preview shows only name and basic info
- Full data access only after purchase
- CSV export available for purchased data
- MongoDB indexes for fast filtering

## Support

For issues or questions, please contact support.

---

Built with ❤️ using modern web technologies

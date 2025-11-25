#!/bin/bash

echo "================================================"
echo "  Data Marketplace - Installation Script"
echo "================================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js (v18+) first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
echo ""

# Create backend .env if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating backend .env file..."
    cp .env.example .env
    echo "⚠️  Please update backend/.env with your credentials!"
else
    echo "✅ Backend .env already exists"
fi
cd ..
echo ""

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
echo ""

# Create frontend .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating frontend .env.local file..."
    cp .env.local.example .env.local
    echo "⚠️  Please update frontend/.env.local with your credentials!"
else
    echo "✅ Frontend .env.local already exists"
fi
cd ..
echo ""

echo "================================================"
echo "  ✅ Installation Complete!"
echo "================================================"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Configure your environment variables:"
echo "   - backend/.env (MongoDB, JWT, Razorpay)"
echo "   - frontend/.env.local (API URL, Razorpay)"
echo ""
echo "2. Start the development servers:"
echo "   - Option A: Run both together:"
echo "     npm run dev"
echo ""
echo "   - Option B: Run separately:"
echo "     Terminal 1: npm run dev:backend"
echo "     Terminal 2: npm run dev:frontend"
echo ""
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "📚 For detailed setup, check:"
echo "   - QUICKSTART.md"
echo "   - SETUP_GUIDE.md"
echo "   - README.md"
echo ""
echo "================================================"

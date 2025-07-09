# Secret Messages - Private Couple Communication Platform

A secure, stealth messaging platform disguised as a Pinterest-style inspiration board. Perfect for couples who want a private space to share secret messages, images, and emotional content.

## 🌟 Features

### 🕵️ Stealth Mode
- **Public Homepage**: Looks like a Pinterest-style inspiration board
- **Hidden Access**: Enter "chingi" in the search bar to access the secret dashboard
- **Non-Suspicious URL**: Secret area uses `/x983-fav` instead of obvious paths
- **Auto-Complete Protection**: Input field has autocomplete disabled to prevent browser suggestions

### 💌 Secret Messaging
- **Text Messages**: Send encrypted text messages with emotional animations
- **Image Messages**: Share photos with optional captions
- **View Policies**: 
  - View once (disappears after reading)
  - 24-hour expiration
  - Custom hour expiration
- **Real-time Updates**: Messages refresh automatically
- **Secure Storage**: All messages stored in MongoDB with proper encryption

### 🎨 Beautiful UI
- **Glassmorphism Design**: Modern glass-like effects with backdrop blur
- **Animated Backgrounds**: Gradient animations and floating elements
- **Framer Motion**: Smooth transitions and micro-interactions
- **Responsive Design**: Works perfectly on desktop and mobile

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Animation**: Framer Motion
- **Database**: MongoDB Atlas
- **Deployment**: Vercel-ready
- **Security**: bcryptjs for encryption, environment variables for secrets

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd secret-messages
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/secret-messages?retryWrites=true&w=majority

# Secret keyword for access
SECRET_KEYWORD=chingi

# Next.js Secret for session management
NEXTAUTH_SECRET=your-secret-key-here

# Optional: Encryption key for additional security
ENCRYPTION_KEY=your-encryption-key-here
```

### 4. MongoDB Setup
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Create a database named `secret-messages`
4. Get your connection string and add it to `.env.local`

### 5. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the Pinterest-style homepage.

### 6. Access the Secret Dashboard
1. Type "chingi" in the search bar on the homepage
2. You'll be redirected to `/x983-fav` - the secret dashboard
3. Start sending and receiving secret messages!

## 🔒 Security Features

- **Stealth Access**: Hidden behind a fake Pinterest interface
- **Secure Keywords**: Custom keyword authentication
- **Auto-Complete Protection**: Prevents browser from suggesting the secret keyword
- **Message Expiration**: Automatic message deletion based on policies
- **Environment Variables**: Sensitive data stored securely
- **MongoDB Security**: Encrypted connections and proper authentication

## 🎯 Usage Guide

### For the "Public" Homepage
- Browse the Pinterest-style inspiration board
- Use the search bar (but only "chingi" will work)
- Looks completely normal to outsiders

### For the Secret Dashboard
1. **Accessing**: Type "chingi" in the search bar
2. **Sending Messages**: 
   - Choose text or image message
   - Set view policy (once, 24hr, custom)
   - Add sender/recipient names
   - Send with beautiful animations
3. **Viewing Messages**:
   - Check inbox for new messages
   - View-once messages disappear after reading
   - Time-based messages show countdown

### Message Policies
- **View Once**: Message disappears forever after first read
- **24 Hours**: Message expires after 24 hours
- **Custom Hours**: Set your own expiration time (1-168 hours)

## 🚀 Deployment

### Vercel Deployment
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables for Production
```env
MONGODB_URI=your-production-mongodb-uri
SECRET_KEYWORD=chingi
NEXTAUTH_SECRET=your-production-secret
ENCRYPTION_KEY=your-production-encryption-key
```

---

**Remember**: This is a private, couples-only platform. Keep your secret keyword safe and enjoy your hidden messaging space! 💕

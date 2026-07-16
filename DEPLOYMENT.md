# Royal Blue PG - Deployment Guide

## Pre-Deployment Checklist

### 1. **Services Setup** ✅ (You have these configured)
- [ ] MongoDB Atlas cluster (get connection string)
- [ ] Cloudinary account (get API credentials)
- [ ] SMTP email service (Gmail, SendGrid, or similar)
- [ ] GitHub repository created

### 2. **Environment Variables**

#### Server Environment Variables (server/.env)
```env
# Core
PORT=5000
NODE_ENV=production

# Database
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/royalbluepg

# JWT
JWT_SECRET=your_strong_jwt_secret_key_here_minimum_32_characters
JWT_EXPIRE=30d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (SMTP)
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
ADMIN_EMAIL=admin@royalbluepg.com

# Client URL (for CORS)
CLIENT_URL=https://royalbluepg.com
```

#### Client Environment Variables (client/.env.production)
```env
VITE_API_URL=https://your-domain.com/api
```

---

## Deployment Steps

### Step 1: Initialize Git & Push to GitHub

```bash
# Navigate to project directory
cd path/to/Royalbluepg-main

# Initialize Git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Royal Blue PG - refactored structure"

# Add remote repository
git remote add origin https://github.com/anushkathorat23/RoyalBluePG.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. **Visit** https://vercel.com and sign in with GitHub
2. **Click** "New Project"
3. **Import** your `RoyalBluePG` repository
4. **Configure Project:**
   - Framework: Other (since we have custom build)
   - Build Command: `cd client && npm install && npm run build`
   - Output Directory: `client/dist`
   - Install Command: `npm install`

5. **Add Environment Variables:**
   - Go to "Settings" → "Environment Variables"
   - Add all variables from `server/.env` (listed above)

6. **Deploy:** Click "Deploy"

### Step 3: Configure Root Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

```
MONGO_URI = mongodb+srv://...
JWT_SECRET = your_secret
CLOUDINARY_CLOUD_NAME = your_name
CLOUDINARY_API_KEY = your_key
CLOUDINARY_API_SECRET = your_secret
SMTP_USER = your_email
SMTP_PASSWORD = your_password
ADMIN_EMAIL = admin@royalbluepg.com
CLIENT_URL = https://your-vercel-domain.vercel.app
NODE_ENV = production
```

### Step 4: Test Deployment

After deployment:

1. **Test Frontend:** Visit your domain
2. **Test API:** Visit `https://your-domain.vercel.app/api/health`
3. **Test Admin:** Visit `https://your-domain.vercel.app/admin/login`

---

## Project Structure After Refactoring

```
Royalbluepg-main/
├── client/                    # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── server/                    # Node.js backend
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── seed/
│   ├── uploads/
│   ├── .env
│   └── package.json
├── api/                       # Vercel serverless function
│   └── index.js
├── vercel.json                # Vercel configuration
└── DEPLOYMENT.md              # This file
```

---

## API Endpoints

### Public Routes
- `GET /api/health` - Health check
- `GET /api/gallery` - Get gallery images
- `GET /api/amenities` - Get amenities
- `GET /api/faqs` - Get FAQs
- `GET /api/testimonials` - Get testimonials
- `GET /api/content` - Get content (hero, about, etc)
- `POST /api/enquiries` - Submit enquiry

### Admin Routes (Protected)
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get admin info
- `GET /api/enquiries` - List all enquiries
- `PATCH /api/enquiries/:id` - Update enquiry status
- `DELETE /api/enquiries/:id` - Delete enquiry
- `POST /api/gallery` - Upload image
- `GET /api/gallery` - List images
- `DELETE /api/gallery/:id` - Delete image
- And more for amenities, FAQs, testimonials, content...

---

## Troubleshooting

### Build Errors
- **TypeScript errors:** Run `npm run build` locally to test
- **Missing packages:** Ensure `npm install` runs in build step
- **Path issues:** Check relative imports in source files

### Runtime Errors
- **Database connection:** Verify `MONGO_URI` is correct
- **Cloudinary errors:** Check `CLOUDINARY_*` variables
- **Email not sending:** Verify SMTP credentials
- **CORS errors:** Check `CLIENT_URL` in server env

### Deployment Issues
- Check Vercel build logs: Dashboard → Deployments → View logs
- Verify environment variables are set correctly
- Ensure `vercel.json` routes are correct

---

## Post-Deployment

1. **Add Custom Domain:**
   - Vercel Dashboard → Settings → Domains
   - Add your domain and follow DNS instructions

2. **Enable Auto-Deploy:**
   - Vercel automatically deploys on `main` branch pushes
   - Set up branch protection rules on GitHub

3. **Monitor:**
   - Set up error tracking (Sentry recommended)
   - Monitor API response times

4. **Database:**
   - Set up MongoDB backups
   - Configure IP whitelist in MongoDB Atlas

---

## Contact & Support

For issues, check:
- Vercel logs: https://vercel.com/dashboard
- MongoDB Atlas status: https://status.mongodb.com/
- GitHub repository issues

---

**Deployment Ready!** 🚀

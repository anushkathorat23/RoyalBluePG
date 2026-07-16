# 🚀 Vercel Deployment Checklist

## Step 1: Prepare Environment Variables

**Before deploying, gather these values:**

### Required for Production:

```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/royalbluepg

# Authentication
JWT_SECRET=generate_a_strong_random_string_32_chars_minimum

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here

# Email Service
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_specific_password
ADMIN_EMAIL=admin@royalbluepg.com

# Client Configuration
CLIENT_URL=https://royalbluepg.vercel.app

# Other
NODE_ENV=production
PORT=5000
```

---

## Step 2: Deploy on Vercel

### 2.1 Visit Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**

### 2.2 Import Your GitHub Repository
1. Select **"Import Git Repository"**
2. Search for: `RoyalBluePG`
3. Click **"Import"**

### 2.3 Configure Project Settings
When prompted, configure:

- **Build Command:** Already set by `vercel.json` ✓
- **Output Directory:** Already set by `vercel.json` ✓
- **Install Command:** Keep default (npm install)

### 2.4 Add Environment Variables

1. Click on **"Environment Variables"** section
2. Add each variable from the list above:
   - MONGO_URI
   - JWT_SECRET
   - CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_API_KEY
   - CLOUDINARY_API_SECRET
   - SMTP_USER
   - SMTP_PASSWORD
   - ADMIN_EMAIL
   - CLIENT_URL
   - NODE_ENV
   - PORT

3. Select scope: **"Production"** for each variable

### 2.5 Deploy
1. Click **"Deploy"**
2. Wait for build to complete (usually 2-3 minutes)

---

## Step 3: Configure Custom Domain (Optional)

After deployment succeeds:

1. Go to **Project Settings** → **"Domains"**
2. Add your custom domain
3. Follow Vercel's DNS configuration steps

---

## Step 4: Test Deployment

After deployment completes:

### Test Endpoints:
```
✓ Frontend: https://your-deployment.vercel.app
✓ API Health: https://your-deployment.vercel.app/api/health
✓ Admin Login: https://your-deployment.vercel.app/admin/login
```

### Verify:
- [ ] Frontend loads correctly
- [ ] Admin login page accessible
- [ ] API responds to health check
- [ ] Database connection working
- [ ] Images upload to Cloudinary
- [ ] Emails send correctly

---

## Step 5: Monitor Deployments

Once deployed:

- **Automatic Redeploys:** Any push to `main` branch triggers automatic deployment
- **View Logs:** Dashboard → Deployments → Click any deployment → View Logs
- **Environment:** Update env variables anytime in Settings

---

## Troubleshooting Guide

### Build Fails
```
❌ Error: Cannot find module
✓ Solution: Ensure all dependencies are in package.json

❌ Error: TypeScript compilation error  
✓ Solution: Run `npm run build` locally to test

❌ Error: ENOENT: no such file or directory
✓ Solution: Check file paths in code (use relative imports)
```

### Runtime Errors
```
❌ API returns 500 error
✓ Solution: Check Vercel logs → Environment Variables → Database connection

❌ Database connection timeout
✓ Solution: Verify MONGO_URI is correct and MongoDB is accessible

❌ Images not uploading
✓ Solution: Verify Cloudinary credentials are correct

❌ Emails not sending
✓ Solution: Verify SMTP credentials and check spam folder
```

### CORS/Access Errors
```
❌ Frontend can't connect to API
✓ Solution: Check CLIENT_URL env variable in server config

❌ Endpoint returns 403
✓ Solution: Check CORS configuration in server.js
```

---

## Database Setup (if not done yet)

### MongoDB Atlas:
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Whitelist IP: 0.0.0.0/0 (or Vercel IPs)
5. Copy connection string → Add to `MONGO_URI`

### Cloudinary:
1. Sign up at https://cloudinary.com
2. Get Cloud Name, API Key, API Secret
3. Add to environment variables

### SMTP Email:
1. **Gmail:** Enable 2FA, generate App Password
2. **SendGrid:** Create API key
3. Add credentials to env variables

---

## Commands Reference

```bash
# Test locally before deploying
npm run dev          # Start dev server
npm run build        # Build for production
npm run seed         # Seed database

# Git commands
git status           # Check changes
git add .            # Stage all changes
git commit -m "msg"  # Commit changes
git push origin main # Push to GitHub
```

---

## Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **MongoDB Docs:** https://docs.mongodb.com
- **Express API:** https://expressjs.com
- **Vite Guide:** https://vitejs.dev

---

## Expected Timeline

- GitHub push: ✅ Complete
- Vercel setup: ~5 minutes
- Environment variables: ~2 minutes  
- Deployment build: ~3 minutes
- **Total: ~10 minutes to live!**

---

**Ready to deploy?** Follow Steps 1-5 above! 🎉

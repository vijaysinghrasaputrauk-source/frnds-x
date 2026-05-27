# 🚀 Deploy Your App in 2 Minutes!

Your QR code doesn't work yet because the app is only on your computer. Follow these steps to make it live:

## Option 1: Deploy to Vercel (Easiest - FREE)

### Step 1: Create Vercel Account
1. Go to **https://vercel.com**
2. Click **"Sign Up"**
3. Sign up with **GitHub** (recommended)

### Step 2: Install Vercel CLI
Open terminal and run:
```bash
npm install -g vercel
```

### Step 3: Deploy
```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your username
- **Link to existing project?** → No
- **Project name?** → frnds-x (or any name)
- **Which directory?** → ./ (just press Enter)
- **Auto-detected settings?** → Yes

### Step 4: Your App is LIVE! 🎉
After deployment completes, you'll get a URL like:
```
https://frnds-x.vercel.app
```

### Step 5: Update QR Code
Edit `src/app/pages/SharePage.tsx` line 12:
```typescript
const shareableLink = "frnds-x.vercel.app"; // Your real URL
```

Then redeploy:
```bash
vercel --prod
```

---

## Option 2: Deploy via Vercel Dashboard (No Code)

### Step 1: Push to GitHub
1. Go to **https://github.com/new**
2. Create a new repository called **"frnds-x"**
3. Run these commands:
```bash
git remote add origin https://github.com/YOUR-USERNAME/frnds-x.git
git push -u origin master
```

### Step 2: Import to Vercel
1. Go to **https://vercel.com/new**
2. Click **"Import Git Repository"**
3. Select your **frnds-x** repository
4. Click **"Deploy"**

### Step 3: Done!
Your app is live at: `https://frnds-x.vercel.app`

---

## Option 3: Netlify (Alternative)

1. Go to **https://netlify.com**
2. Drag your project folder to the upload area
3. Configure:
   - Build command: `pnpm build`
   - Publish directory: `dist`
4. Click **"Deploy"**

Your app will be at: `https://frnds-x.netlify.app`

---

## ⚡ Quick Fix for Testing RIGHT NOW

If you want to test the QR code before deploying, you can use your local network:

### Step 1: Find Your Local IP
```bash
# On Mac/Linux:
ifconfig | grep "inet " | grep -v 127.0.0.1

# On Windows:
ipconfig
```

You'll get something like: `192.168.1.100`

### Step 2: Update SharePage.tsx
Replace line 12 with:
```typescript
const shareableLink = "192.168.1.100:5173"; // Your local IP
```

### Step 3: Make Sure Dev Server is Running
```bash
pnpm run dev
```

### Step 4: Test QR Code
Now the QR code will work on any phone **connected to the same WiFi**!

⚠️ **Note:** This only works on your home WiFi. For public sharing, you MUST deploy.

---

## 🎯 After Deployment

1. ✅ Your app is live on the internet
2. ✅ QR code works on any phone anywhere
3. ✅ Share link works worldwide
4. ✅ Ready to share with students!

---

## 💡 Next Steps After Deploy

1. Visit your live URL: `https://frnds-x.vercel.app/share`
2. Download the QR code
3. Share on Instagram, WhatsApp, campus posters
4. Watch your users grow! 🚀

---

## ❓ Troubleshooting

**"Command not found: vercel"**
→ Install it: `npm install -g vercel`

**"Build failed"**
→ Make sure `pnpm install` ran successfully first

**"Can't reach site after deploy"**
→ Wait 1-2 minutes for DNS to propagate

---

## 🆘 Need Help?

Having issues? Common solutions:
1. Make sure you committed all changes: `git status`
2. Make sure dependencies installed: `pnpm install`
3. Try building locally first: `pnpm build`
4. Check Vercel logs in the dashboard

---

**Ready? Deploy now and your QR code will work! 🚀**

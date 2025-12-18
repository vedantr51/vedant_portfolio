# Contact Form Email Setup Instructions

Your contact form is currently set up but needs a backend service to send emails. Here are your options:

## ✅ Recommended: Formspree (Easiest)

### Step 1: Sign up for Formspree
1. Go to https://formspree.io/
2. Sign up with your email: **vedantr51@gmail.com**
3. Verify your email

### Step 2: Create a Form
1. Click "New Form" in your Formspree dashboard
2. Name it "Portfolio Contact Form"
3. Copy your **Form ID** (looks like `xyzabc12`)

### Step 3: Update Your Code
Open `src/app/contact/page.tsx` and find this line (around line 64):
```tsx
const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
```

Replace `YOUR_FORM_ID` with your actual form ID:
```tsx
const response = await fetch("https://formspree.io/f/xyzabc12", {
```

### Step 4: Test
1. Visit http://localhost:3000/contact
2. Fill out the form and submit
3. Check your email (vedantr51@gmail.com) for the message!

**Free tier**: 50 submissions/month

---

## Alternative: EmailJS

If you prefer EmailJS instead:

### Step 1: Sign up
1. Go to https://www.emailjs.com/
2. Sign up and verify your email

### Step 2: Install Package
```bash
npm install @emailjs/browser
```

### Step 3: Get Credentials
- Service ID
- Template ID  
- Public Key

### Step 4: Update Code
I can help you implement this if you choose EmailJS instead.

**Free tier**: 200 emails/month

---

## Alternative: Next.js API Route + Nodemailer

This requires more setup but gives you full control. Let me know if you want this option.

---

## Current Status

The form is **ready to go** - you just need to:
1. Choose a service (Formspree recommended)
2. Get your form ID
3. Replace `YOUR_FORM_ID` in the code
4. Test it!

All submissions will be sent to: **vedantr51@gmail.com**

# 🚀 GitHub Pages Deployment Guide

Follow these step-by-step instructions to publish your QA Handbook on GitHub Pages.

## 📋 Prerequisites

- A GitHub account (free)
- Git installed on your computer
- Your QA Handbook files ready

## 🔧 Step 1: Create GitHub Repository

1. **Go to GitHub**: Visit [github.com](https://github.com) and sign in
2. **Create New Repository**:
   - Click the "+" icon in the top right
   - Select "New repository"
   - Name it `qa-handbook` (or any name you prefer)
   - Make it **Public** (required for free GitHub Pages)
   - ✅ Check "Add a README file"
   - Click "Create repository"

## 📁 Step 2: Upload Your Files

### Option A: Using GitHub Web Interface (Easiest)

1. **Navigate to your new repository**
2. **Upload files**:
   - Click "uploading an existing file" or "Add file" → "Upload files"
   - Drag and drop ALL your QA handbook files:
     - `index.html`
     - `styles.css`
     - `script.js`
     - `_config.yml`
     - `.gitignore`
     - `Gemfile`
     - `README.md`
     - `LICENSE`
     - `CLAUDE.md`
   - Write commit message: "Initial QA Handbook upload"
   - Click "Commit changes"

### Option B: Using Git Command Line

1. **Clone your repository**:
   ```bash
   git clone https://github.com/YOURUSERNAME/qa-handbook.git
   cd qa-handbook
   ```

2. **Copy your files** into the cloned folder

3. **Add and commit**:
   ```bash
   git add .
   git commit -m "Initial QA Handbook upload"
   git push origin main
   ```

## ⚙️ Step 3: Enable GitHub Pages

1. **Go to your repository settings**:
   - Click on your repository
   - Click "Settings" tab (at the top)

2. **Find Pages section**:
   - Scroll down to "Pages" in the left sidebar
   - Click on "Pages"

3. **Configure Pages**:
   - **Source**: Select "Deploy from a branch"
   - **Branch**: Select "main" (or "master" if that's your default)
   - **Folder**: Select "/ (root)"
   - Click "Save"

4. **Wait for deployment**:
   - GitHub will show a message: "Your site is ready to be published"
   - It takes 5-10 minutes for the first deployment
   - You'll get a green checkmark when ready

## 🌐 Step 4: Access Your Website

Your QA Handbook will be available at:
```
https://YOURUSERNAME.github.io/qa-handbook
```

Replace `YOURUSERNAME` with your actual GitHub username.

## 🔧 Step 5: Customize Your Deployment

### Update _config.yml
Edit the `_config.yml` file to match your details:

```yaml
# Replace these with your information
title: "QA Engineer's Handbook"
author: "Your Name"
email: "your.email@example.com"
url: "https://YOURUSERNAME.github.io"
baseurl: "/qa-handbook"
github_username: YOURUSERNAME
```

### Update README.md
Edit the README.md file:
- Replace `yourusername` with your GitHub username
- Update contact information
- Add your LinkedIn profile

## 🔄 Step 6: Making Updates

When you want to update your handbook:

1. **Edit files** directly on GitHub or locally
2. **Commit changes**:
   - On GitHub: Edit file → Commit changes
   - Locally: `git add .` → `git commit -m "Update message"` → `git push`
3. **Wait 2-3 minutes** for GitHub Pages to rebuild
4. **Refresh your website** to see changes

## ✅ Verification Checklist

- [ ] Repository is public
- [ ] All files are uploaded
- [ ] GitHub Pages is enabled
- [ ] Website loads at your GitHub Pages URL
- [ ] Navigation works properly
- [ ] All sections display correctly
- [ ] Interactive features work (search, checkboxes, etc.)

## 🐛 Troubleshooting

### Common Issues:

**❌ "404 Page Not Found"**
- Check that your repository is public
- Verify GitHub Pages is enabled
- Wait 10-15 minutes after enabling

**❌ "Site not loading properly"**
- Check `_config.yml` has correct `baseurl`
- Ensure all file paths are correct
- Check browser console for errors

**❌ "Styles not loading"**
- Verify `styles.css` is uploaded
- Check file paths in `index.html`
- Clear browser cache

**❌ "JavaScript not working"**
- Verify `script.js` is uploaded
- Check browser console for errors
- Ensure file paths are correct

## 🔧 Advanced Configuration (Optional)

### Custom Domain
If you own a domain name:
1. Add a `CNAME` file with your domain
2. Configure DNS settings
3. Update `_config.yml` with your domain

### Local Development
To test changes locally:
1. Install Ruby and Bundler
2. Run `bundle install`
3. Run `bundle exec jekyll serve`
4. Visit `http://localhost:4000`

## 📞 Getting Help

If you encounter issues:

1. **Check GitHub Pages Status**: [githubstatus.com](https://githubstatus.com)
2. **GitHub Pages Documentation**: [docs.github.com/pages](https://docs.github.com/pages)
3. **GitHub Community**: [github.community](https://github.community)

## 🎉 Success!

Once deployed, you'll have:
- ✅ A professional QA reference website
- ✅ Accessible from anywhere
- ✅ Easy to update and maintain
- ✅ Free hosting on GitHub
- ✅ Professional URL to share

## 📱 Sharing Your Handbook

Share your QA Handbook with:
- Fellow QA engineers
- Your team members
- LinkedIn network
- QA communities
- Job interviews (shows your dedication to the field!)

---

**🌟 Congratulations!** Your QA Handbook is now live on the internet!
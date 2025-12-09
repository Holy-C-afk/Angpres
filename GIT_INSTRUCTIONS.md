# Instructions to Push to GitHub

Since Git is not installed on this laptop, here are your options:

## Option 1: Install Git (Recommended)

1. Download Git for Windows from: https://git-scm.com/download/win
2. Install it (use default settings)
3. Open PowerShell or Command Prompt in this folder
4. Run these commands:

```bash
# Initialize git (if not already done)
git init

# Add the remote repository
git remote add origin https://github.com/Holy-C-afk/Angpres.git

# Check current status
git status

# Add all files
git add .

# Commit your changes
git commit -m "Update sex education presentation with smooth animations"

# Push to GitHub
git push -u origin main
```

If you get an error about the branch name, try:
```bash
git push -u origin master
```

## Option 2: Use GitHub Desktop (Easier)

1. Download GitHub Desktop from: https://desktop.github.com/
2. Install and sign in with your GitHub account
3. Click "File" > "Add Local Repository"
4. Select this folder: `C:\Users\omaima\Desktop\HDSHI DIAL TACHFINE\AngPres`
5. Click "Publish repository" or "Push origin" button

## Option 3: Upload via GitHub Website

1. Go to: https://github.com/Holy-C-afk/Angpres
2. Click "Add file" > "Upload files"
3. Drag and drop your files (index.html, styles.css, script.js)
4. Click "Commit changes"

## Current Files to Push:
- index.html
- styles.css
- script.js


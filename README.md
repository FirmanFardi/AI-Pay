# AI.Pay - Payment Gateway Portal

A minimalist and futuristic static payment gateway portal with dark mode and neon accents.

## Features

- 🎨 **Modern Dark UI** - Sleek dark theme with neon cyan and purple accents
- 📊 **Dashboard** - Overview with stats, charts, and analytics
- 💳 **Payment Management** - View and manage payment transactions
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ⚡ **Fast & Static** - Pure HTML, CSS, and JavaScript - no backend required
- 🔒 **Secure** - Client-side only, ready for integration with payment APIs

## Pages

- **Dashboard** - Overview with statistics and charts
- **Collection** - Payment collection management
  - View Collection
  - View Payments
- **Products** - Product management
- **Store Front** - Store configuration
- **Customers** - Customer management
- **Accounts** - Account settings
- **Pool Fund** - Pool fund overview
- **Payout** - Payout management
- **Settlement** - Settlement records
- **Reports** - Financial reports and analytics

## Deployment to GitHub Pages

### Method 1: Using GitHub Web Interface

1. Create a new repository on GitHub (e.g., `payment-gateway-portal`)
2. Upload all files from this folder to the repository
3. Go to repository **Settings** > **Pages**
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** branch and **/ (root)** folder
6. Click **Save**
7. Your site will be available at: `https://yourusername.github.io/payment-gateway-portal/`

### Method 2: Using Git Command Line

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: AI.Pay payment gateway portal"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/payment-gateway-portal.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Then follow steps 3-7 from Method 1.

### Method 3: Using GitHub Actions (Optional)

If you want automatic deployment, you can use the included `.github/workflows/deploy.yml` file.

## Local Development

Simply open `index.html` in your browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## Customization

### Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --accent-neon-cyan: #00f5ff;
    --accent-neon-purple: #7b2cbf;
    --accent-neon-pink: #ff006e;
    /* ... */
}
```

### Logo

The logo "AI.Pay" is in the header. You can modify it in `index.html`:

```html
<div class="logo">
    <span class="logo-ai">AI</span>
    <span class="logo-dot">.</span>
    <span class="logo-pay">Pay</span>
</div>
```

### Data

All data is currently hardcoded in `index.html`. To connect to a real API, modify `script.js` to fetch data from your backend.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for use.

## Future Enhancements

- [ ] Connect to payment API
- [ ] Add payment form
- [ ] Real-time data updates
- [ ] Export functionality
- [ ] Advanced filtering
- [ ] User authentication


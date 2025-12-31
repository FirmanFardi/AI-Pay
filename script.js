// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation items
    const navItems = document.querySelectorAll('.nav-item[data-page]');
    const submenuToggle = document.querySelector('.nav-item.has-submenu[data-submenu="collection"]');
    const collectionSubmenu = document.getElementById('collection-submenu');

    // Handle submenu toggle
    if (submenuToggle && collectionSubmenu) {
        submenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            collectionSubmenu.classList.toggle('active');
        });
    }

    // Handle navigation clicks
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetPage = this.getAttribute('data-page');
            
            // Remove active class from all nav items
            document.querySelectorAll('.nav-item').forEach(nav => {
                nav.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.add('hidden');
            });
            
            // Show target page
            const targetPageElement = document.getElementById(`${targetPage}-page`);
            if (targetPageElement) {
                targetPageElement.classList.remove('hidden');
            }
            
            // Update breadcrumbs based on page
            updateBreadcrumbs(targetPage);
        });
    });

    // Update breadcrumbs
    function updateBreadcrumbs(page) {
        const breadcrumbs = document.querySelector('.breadcrumbs');
        const pageNames = {
            'dashboard': 'Dashboard',
            'view-collection': 'Collection > View Collection',
            'view-payments': 'Collection > Payment',
            'products': 'Products',
            'store-front': 'Store Front',
            'customers': 'Customers',
            'accounts': 'Accounts',
            'pool-fund': 'Pool Fund',
            'payout': 'Payout',
            'settlement': 'Settlement',
            'reports': 'Reports'
        };

        const breadcrumbText = pageNames[page] || page;
        const parts = breadcrumbText.split(' > ');
        
        breadcrumbs.innerHTML = `
            <span class="breadcrumb-item">🏠 Home</span>
            ${parts.map((part, index) => `
                <span class="breadcrumb-separator">›</span>
                <span class="breadcrumb-item ${index === parts.length - 1 ? 'active' : ''}">${part}</span>
            `).join('')}
        `;
    }

    // Initialize with dashboard page
    updateBreadcrumbs('dashboard');

    // Refresh button functionality
    const refreshBtn = document.querySelector('.refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            // Add rotation animation
            this.style.transform = 'rotate(360deg)';
            this.style.transition = 'transform 0.5s ease';
            
            setTimeout(() => {
                this.style.transform = 'rotate(0deg)';
            }, 500);
            
            // Simulate refresh (in real app, this would fetch new data)
            console.log('Refreshing data...');
        });
    }

    // Search functionality
    const searchBtn = document.querySelector('.filters-bar .btn-primary:last-child');
    const searchInput = document.querySelector('.filters-bar .filter-input[type="text"]');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value;
            console.log('Searching for:', searchTerm);
            // In real app, this would filter the table
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }

    // Table row hover effects
    const tableRows = document.querySelectorAll('.data-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            // In real app, this could open a detail modal
            console.log('Row clicked:', this);
        });
    });

    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});


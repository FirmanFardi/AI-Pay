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
            'reports': 'Reports',
            'payment-form': 'Payment Form'
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

    // FPX Payment Channels Data
    const fpxChannels = [
        { id: 'fpx-mb2u', name: 'Maybank2u', code: 'MB2U', logo: '🏦', status: 'active' },
        { id: 'fpx-cimb', name: 'CIMB Clicks', code: 'CIMB', logo: '🏦', status: 'active' },
        { id: 'fpx-pbb', name: 'Public Bank', code: 'PBB', logo: '🏦', status: 'active' },
        { id: 'fpx-rhb', name: 'RHB Bank', code: 'RHB', logo: '🏦', status: 'active' },
        { id: 'fpx-hlb', name: 'Hong Leong Bank', code: 'HLB', logo: '🏦', status: 'active' },
        { id: 'fpx-amb', name: 'AmBank', code: 'AMB', logo: '🏦', status: 'active' },
        { id: 'fpx-uob', name: 'UOB Bank', code: 'UOB', logo: '🏦', status: 'active' },
        { id: 'fpx-ocbc', name: 'OCBC Bank', code: 'OCBC', logo: '🏦', status: 'active' },
        { id: 'fpx-hsbc', name: 'HSBC Bank', code: 'HSBC', logo: '🏦', status: 'active' },
        { id: 'fpx-standard', name: 'Standard Chartered', code: 'SCB', logo: '🏦', status: 'active' },
        { id: 'fpx-affin', name: 'Affin Bank', code: 'ABB', logo: '🏦', status: 'active' },
        { id: 'fpx-alliance', name: 'Alliance Bank', code: 'ABMB', logo: '🏦', status: 'active' },
        { id: 'fpx-bimb', name: 'Bank Islam', code: 'BIMB', logo: '🏦', status: 'active' },
        { id: 'fpx-bsn', name: 'Bank Simpanan Nasional', code: 'BSN', logo: '🏦', status: 'active' },
        { id: 'fpx-bkrm', name: 'Bank Rakyat', code: 'BKRM', logo: '🏦', status: 'active' }
    ];

    // Initialize Payment Form Page
    function initializePaymentForm() {
        const paymentFormPage = document.getElementById('payment-form-page');
        if (!paymentFormPage) return;

        const fpxChannelsGrid = document.getElementById('fpx-channels-grid');
        const proceedBtn = document.getElementById('proceed-payment-btn');
        const cancelBtn = document.getElementById('cancel-payment-btn');
        let selectedChannel = null;

        // Generate random payment details
        function generatePaymentDetails() {
            const amount = (Math.random() * 1000 + 100).toFixed(2);
            const ref = 'REF-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
            document.getElementById('payment-amount').textContent = parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            document.getElementById('payment-reference').textContent = ref;
        }

        // Render FPX Channels
        function renderFPXChannels() {
            if (!fpxChannelsGrid) return;
            
            fpxChannelsGrid.innerHTML = fpxChannels.map(channel => `
                <div class="fpx-channel-card ${channel.status === 'active' ? 'active' : 'inactive'}" 
                     data-channel-id="${channel.id}" 
                     data-channel-code="${channel.code}">
                    <div class="fpx-channel-logo">${channel.logo}</div>
                    <div class="fpx-channel-info">
                        <div class="fpx-channel-name">${channel.name}</div>
                        <div class="fpx-channel-code">${channel.code}</div>
                    </div>
                    <div class="fpx-channel-status">
                        <span class="status-badge ${channel.status}">${channel.status === 'active' ? '✓' : '✗'}</span>
                    </div>
                </div>
            `).join('');

            // Add click handlers to channel cards
            document.querySelectorAll('.fpx-channel-card.active').forEach(card => {
                card.addEventListener('click', function() {
                    // Remove selected class from all cards
                    document.querySelectorAll('.fpx-channel-card').forEach(c => c.classList.remove('selected'));
                    
                    // Add selected class to clicked card
                    this.classList.add('selected');
                    
                    // Store selected channel
                    selectedChannel = {
                        id: this.getAttribute('data-channel-id'),
                        code: this.getAttribute('data-channel-code'),
                        name: this.querySelector('.fpx-channel-name').textContent
                    };
                    
                    // Enable proceed button
                    if (proceedBtn) {
                        proceedBtn.disabled = false;
                    }
                });
            });
        }

        // Proceed to payment
        if (proceedBtn) {
            proceedBtn.addEventListener('click', function() {
                if (selectedChannel) {
                    alert(`Redirecting to ${selectedChannel.name} (${selectedChannel.code}) payment gateway...\n\nIn a real application, this would redirect to the bank's payment page.`);
                    console.log('Selected FPX Channel:', selectedChannel);
                }
            });
        }

        // Cancel payment
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function() {
                // Reset selection
                document.querySelectorAll('.fpx-channel-card').forEach(c => c.classList.remove('selected'));
                selectedChannel = null;
                if (proceedBtn) {
                    proceedBtn.disabled = true;
                }
                // Navigate back to dashboard
                const dashboardNav = document.querySelector('.nav-item[data-page="dashboard"]');
                if (dashboardNav) {
                    dashboardNav.click();
                }
            });
        }

        // Initialize when page is shown
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const isHidden = paymentFormPage.classList.contains('hidden');
                    if (!isHidden) {
                        generatePaymentDetails();
                        renderFPXChannels();
                    }
                }
            });
        });

        observer.observe(paymentFormPage, {
            attributes: true,
            attributeFilter: ['class']
        });

        // Initial render if page is already visible
        if (!paymentFormPage.classList.contains('hidden')) {
            generatePaymentDetails();
            renderFPXChannels();
        }
    }

    // Initialize payment form when DOM is ready
    initializePaymentForm();
});


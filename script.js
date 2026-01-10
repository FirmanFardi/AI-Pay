/* ============================================
   RESPONSIVE JAVASCRIPT STRUCTURE
   ============================================
   
   IMPORTANT FOR DEVELOPERS:
   - Mobile menu toggle functionality is included
   - Some features work differently on mobile vs desktop
   - When adding new features, consider mobile behavior
   - Test on BOTH mobile and webview after changes
   
   ============================================ */

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Logo variant toggle (shared UX pattern)
    // Persists selection in localStorage so the chosen style stays after refresh.
    (function initLogoSwitcher() {
        const logo = document.getElementById('paynex-logo');
        if (!logo) return;

        const variants = ['classic', 'simple', 'minimal', 'futuristic'];
        const storageKey = 'paynex_logo_variant';

        const applyHidden = (variant) => {
            logo.querySelectorAll('[data-variant]').forEach((el) => {
                const v = el.getAttribute('data-variant');
                if (v === variant) {
                    el.hidden = false;
                } else {
                    el.hidden = true;
                }
            });
        };

        const setVariant = (v) => {
            const next = variants.includes(v) ? v : 'classic';
            logo.setAttribute('data-logo-variant', next);
            applyHidden(next);
            try { localStorage.setItem(storageKey, next); } catch (_) {}
        };

        const getStored = () => {
            try { return localStorage.getItem(storageKey); } catch (_) { return null; }
        };

        // Initial variant
        setVariant(getStored() || 'classic');

        // Cycle on click
        logo.addEventListener('click', () => {
            const current = logo.getAttribute('data-logo-variant') || 'classic';
            const idx = variants.indexOf(current);
            const next = variants[(idx + 1) % variants.length];
            setVariant(next);
        });
    })();

    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            sidebar.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on nav item
    const navItems = document.querySelectorAll('.nav-item[data-page]');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
                if (sidebar) sidebar.classList.remove('active');
            }
        });
    });

    // Get all navigation items

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
        if (!breadcrumbs) {
            // Breadcrumbs element doesn't exist, skip update
            return;
        }
        
        const pageNames = {
            'dashboard': 'Dashboard',
            'transaction': 'Transaction',
            'customers': 'Customers',
            'accounts': 'Accounts',
            'payout': 'Payout',
            'settlement': 'Settlement',
            'reports': 'Reports',
            'payment-form': 'Payment Form',
            'onboarding': 'Onboarding'
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

    // Initialize with dashboard page (only if breadcrumbs exist)
    updateBreadcrumbs('dashboard');

    // Search and Filter Functionality
    function initializeSearch() {
        // Search functionality for Transaction page
        const transactionSearchInput = document.getElementById('transaction-search');
        const transactionStatusFilter = document.getElementById('transaction-status-filter');
        
        if (transactionSearchInput) {
            transactionSearchInput.addEventListener('input', function() {
                filterTransactionTable();
            });
        }

        if (transactionStatusFilter) {
            transactionStatusFilter.addEventListener('change', function() {
                filterTransactionTable();
            });
        }

        // Search for Payout page
        const payoutSearchBtn = document.querySelector('#payout-page .filters-bar .btn-primary:last-child');
        const payoutSearchInput = document.querySelector('#payout-page .filters-bar .filter-input[type="text"]');
        
        if (payoutSearchBtn) {
            payoutSearchBtn.addEventListener('click', function() {
                filterPayoutTable();
            });
        }

        // Search for Settlement page
        const settlementSearchBtn = document.querySelector('#settlement-page .filters-bar .btn-primary:last-child');
        if (settlementSearchBtn) {
            settlementSearchBtn.addEventListener('click', function() {
                filterSettlementTable();
            });
        }
    }

    function filterTransactionTable() {
        const table = document.getElementById('transaction-table-body');
        if (!table) return;

        const searchInput = document.getElementById('transaction-search');
        const statusFilter = document.getElementById('transaction-status-filter');
        
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const statusFilterValue = statusFilter ? statusFilter.value.toLowerCase() : '';
        
        const rows = table.querySelectorAll('tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            const statusBadge = row.querySelector('.status-badge');
            const status = statusBadge ? statusBadge.textContent.trim().toLowerCase() : '';
            
            const matchesSearch = !searchTerm || text.includes(searchTerm);
            const matchesStatus = !statusFilterValue || status === statusFilterValue;
            
            row.style.display = (matchesSearch && matchesStatus) ? '' : 'none';
        });
    }

    function filterPayoutTable() {
        const table = document.getElementById('payout-table-body');
        if (!table) return;

        const searchInput = document.getElementById('payout-search');
        const statusFilter = document.getElementById('payout-status-filter');
        
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const statusFilterValue = statusFilter ? statusFilter.value.toLowerCase() : '';
        
        const rows = table.querySelectorAll('tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            const statusBadge = row.querySelector('.status-badge');
            const status = statusBadge ? statusBadge.textContent.trim().toLowerCase() : '';
            
            const matchesSearch = !searchTerm || text.includes(searchTerm);
            const matchesStatus = !statusFilterValue || status === statusFilterValue;
            
            row.style.display = (matchesSearch && matchesStatus) ? '' : 'none';
        });
    }
    
    // Add event listeners for payout search
    const payoutSearchInput = document.getElementById('payout-search');
    const payoutStatusFilter = document.getElementById('payout-status-filter');
    
    if (payoutSearchInput) {
        payoutSearchInput.addEventListener('input', function() {
            filterPayoutTable();
        });
    }
    
    if (payoutStatusFilter) {
        payoutStatusFilter.addEventListener('change', function() {
            filterPayoutTable();
        });
    }

    function filterSettlementTable() {
        const table = document.getElementById('settlement-table-body');
        if (!table) return;

        const searchInput = document.getElementById('settlement-search');
        const statusFilter = document.getElementById('settlement-status-filter');
        
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const statusFilterValue = statusFilter ? statusFilter.value.toLowerCase() : '';
        
        const rows = table.querySelectorAll('tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            const statusBadge = row.querySelector('.status-badge');
            const status = statusBadge ? statusBadge.textContent.trim().toLowerCase() : '';
            
            const matchesSearch = !searchTerm || text.includes(searchTerm);
            const matchesStatus = !statusFilterValue || status === statusFilterValue;
            
            row.style.display = (matchesSearch && matchesStatus) ? '' : 'none';
        });
    }
    
    // Add event listeners for settlement search
    const settlementSearchInput = document.getElementById('settlement-search');
    const settlementStatusFilter = document.getElementById('settlement-status-filter');
    
    if (settlementSearchInput) {
        settlementSearchInput.addEventListener('input', function() {
            filterSettlementTable();
        });
    }
    
    if (settlementStatusFilter) {
        settlementStatusFilter.addEventListener('change', function() {
            filterSettlementTable();
        });
    }

    // CSV Export Functionality
    function exportToCSV(tableId, filename) {
        const page = document.getElementById(tableId);
        if (!page) return;
        
        const table = page.querySelector('.data-table');
        if (!table) return;

        let csv = [];
        
        // Add header row
        const headerRow = table.querySelector('thead tr');
        if (headerRow) {
            const headers = [];
            headerRow.querySelectorAll('th').forEach(th => {
                headers.push(`"${th.textContent.trim()}"`);
            });
            csv.push(headers.join(','));
        }

        // Add data rows
        const tbody = table.querySelector('tbody');
        if (tbody) {
            const rows = tbody.querySelectorAll('tr');
            rows.forEach(row => {
                if (row.style.display === 'none') return; // Skip hidden rows
                
                const cols = row.querySelectorAll('td');
                const rowData = [];
                
                cols.forEach(col => {
                    // Remove status badge HTML and get text only
                    const text = col.textContent.replace(/\s+/g, ' ').trim();
                    rowData.push(`"${text}"`);
                });
                
                csv.push(rowData.join(','));
            });
        }

        const csvContent = csv.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // ============================================
    // DUMMY DATA GENERATION
    // ============================================
    
    // Generate Transaction Data
    function generateTransactionData(count = 50) {
        const customers = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Williams', 'Charlie Brown', 'Diana Prince', 'Ethan Hunt', 'Fiona Chen', 'George Wilson', 'Hannah Lee'];
        const paymentMethods = ['FPX - Maybank2u', 'FPX - CIMB Clicks', 'FPX - Public Bank', 'FPX - RHB Bank', 'FPX - Hong Leong', 'FPX - AmBank', 'FPX - UOB', 'FPX - OCBC'];
        const statuses = ['Success', 'Pending', 'Failed'];
        const transactions = [];
        
        for (let i = 0; i < count; i++) {
            const date = new Date();
            date.setDate(date.getDate() - Math.floor(Math.random() * 90));
            const hours = Math.floor(Math.random() * 24);
            const minutes = Math.floor(Math.random() * 60);
            const dateStr = date.toISOString().split('T')[0];
            const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
            
            transactions.push({
                id: `TXN-${String(i + 1).padStart(6, '0')}`,
                reference: `REF-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
                customer: customers[Math.floor(Math.random() * customers.length)],
                amount: (Math.random() * 5000 + 50).toFixed(2),
                method: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
                status: statuses[Math.floor(Math.random() * statuses.length)],
                date: `${dateStr} ${timeStr}`
            });
        }
        
        return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    // Generate Payout Data
    function generatePayoutData(count = 30) {
        const banks = ['Maybank', 'CIMB Bank', 'Public Bank', 'RHB Bank', 'Hong Leong Bank', 'AmBank'];
        const statuses = ['Completed', 'Pending', 'Processing'];
        const payouts = [];
        
        for (let i = 0; i < count; i++) {
            const date = new Date();
            date.setDate(date.getDate() - Math.floor(Math.random() * 60));
            const hours = Math.floor(Math.random() * 24);
            const minutes = Math.floor(Math.random() * 60);
            const dateStr = date.toISOString().split('T')[0];
            const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
            
            const bank = banks[Math.floor(Math.random() * banks.length)];
            const accountNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
            
            payouts.push({
                id: `PO-${dateStr.replace(/-/g, '')}-${String(i + 1).padStart(3, '0')}`,
                amount: (Math.random() * 10000 + 500).toFixed(2),
                bankAccount: `${bank} ****${accountNum}`,
                status: statuses[Math.floor(Math.random() * statuses.length)],
                date: `${dateStr} ${timeStr}`
            });
        }
        
        return payouts.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    // Generate Settlement Data
    function generateSettlementData(count = 20) {
        const statuses = ['Settled', 'Pending'];
        const settlements = [];
        
        for (let i = 0; i < count; i++) {
            const endDate = new Date();
            endDate.setDate(endDate.getDate() - (i * 7));
            const startDate = new Date(endDate);
            startDate.setDate(startDate.getDate() - 6);
            
            const endDateStr = endDate.toISOString().split('T')[0];
            const startDateStr = startDate.toISOString().split('T')[0];
            
            const transactionCount = Math.floor(Math.random() * 200 + 50);
            const totalAmount = transactionCount * (Math.random() * 500 + 100);
            const fees = totalAmount * 0.03;
            const netAmount = totalAmount - fees;
            
            settlements.push({
                id: `STL-${endDateStr.replace(/-/g, '')}-${String(i + 1).padStart(3, '0')}`,
                period: `${startDateStr} to ${endDateStr}`,
                amount: totalAmount.toFixed(2),
                transactions: transactionCount,
                status: i < 2 ? 'Pending' : 'Settled',
                date: endDateStr
            });
        }
        
        return settlements.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    // Generate Reports Data
    function generateReportsData(count = 30) {
        const reports = [];
        
        for (let i = 0; i < count; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            
            const transactionCount = Math.floor(Math.random() * 200 + 50);
            const successCount = Math.floor(transactionCount * (0.85 + Math.random() * 0.1));
            const failedCount = transactionCount - successCount;
            const totalAmount = transactionCount * (Math.random() * 500 + 100);
            const successRate = ((successCount / transactionCount) * 100).toFixed(1);
            const avgTransaction = (totalAmount / transactionCount).toFixed(2);
            
            reports.push({
                date: dateStr,
                transactionCount: transactionCount,
                totalAmount: totalAmount.toFixed(2),
                successRate: successRate,
                avgTransaction: avgTransaction
            });
        }
        
        return reports.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    // Populate Transaction Table
    function populateTransactionTable() {
        const tbody = document.getElementById('transaction-table-body');
        if (!tbody) return;
        
        const transactions = generateTransactionData(50);
        tbody.innerHTML = transactions.map(txn => {
            const statusClass = txn.status.toLowerCase();
            return `
                <tr>
                    <td>${txn.id}</td>
                    <td>${txn.reference}</td>
                    <td>${txn.customer}</td>
                    <td>MYR ${parseFloat(txn.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td>${txn.method}</td>
                    <td><span class="status-badge ${statusClass}">${txn.status}</span></td>
                    <td>${txn.date}</td>
                </tr>
            `;
        }).join('');
    }
    
    // Populate Payout Table
    function populatePayoutTable() {
        const tbody = document.getElementById('payout-table-body');
        if (!tbody) return;
        
        const payouts = generatePayoutData(30);
        tbody.innerHTML = payouts.map(payout => {
            const statusClass = payout.status.toLowerCase();
            return `
                <tr>
                    <td>${payout.id}</td>
                    <td>MYR ${parseFloat(payout.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td>${payout.bankAccount}</td>
                    <td><span class="status-badge ${statusClass}">${payout.status}</span></td>
                    <td>${payout.date}</td>
                </tr>
            `;
        }).join('');
    }
    
    // Populate Settlement Table
    function populateSettlementTable() {
        const tbody = document.getElementById('settlement-table-body');
        if (!tbody) return;
        
        const settlements = generateSettlementData(20);
        tbody.innerHTML = settlements.map(settlement => {
            const statusClass = settlement.status.toLowerCase();
            return `
                <tr>
                    <td>${settlement.id}</td>
                    <td>${settlement.period}</td>
                    <td>MYR ${parseFloat(settlement.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td>${settlement.transactions}</td>
                    <td><span class="status-badge ${statusClass}">${settlement.status}</span></td>
                    <td>${settlement.date}</td>
                </tr>
            `;
        }).join('');
    }
    
    // Populate Reports Table
    function populateReportsTable() {
        const tbody = document.getElementById('reports-table-body');
        if (!tbody) return;
        
        const reports = generateReportsData(30);
        tbody.innerHTML = reports.map(report => {
            return `
                <tr>
                    <td>${report.date}</td>
                    <td>${report.transactionCount}</td>
                    <td>MYR ${parseFloat(report.totalAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td>${report.successRate}%</td>
                    <td>MYR ${parseFloat(report.avgTransaction).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                </tr>
            `;
        }).join('');
    }
    
    // Initialize all tables with data
    function initializeTables() {
        populateTransactionTable();
        populatePayoutTable();
        populateSettlementTable();
        populateReportsTable();
    }
    
    // Initialize search on page load
    initializeSearch();
    
    // Initialize tables with dummy data
    initializeTables();

    // Add CSV export buttons
    const exportReportBtn = document.querySelector('#reports-page .btn-secondary');
    if (exportReportBtn) {
        exportReportBtn.addEventListener('click', function() {
            exportToCSV('reports-page', `reports-${new Date().toISOString().split('T')[0]}.csv`);
        });
    }
    
    const exportTransactionBtn = document.getElementById('transaction-export-btn');
    if (exportTransactionBtn) {
        exportTransactionBtn.addEventListener('click', function() {
            exportToCSV('transaction-page', `transactions-${new Date().toISOString().split('T')[0]}.csv`);
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

    // Onboarding Functionality
    function initializeOnboarding() {
        const onboardingPage = document.getElementById('onboarding-page');
        if (!onboardingPage) return;

        // Ensure only step 1 is visible initially
        document.querySelectorAll('.onboarding-step').forEach(step => {
            step.classList.remove('active');
        });
        const step1 = document.getElementById('step-1');
        if (step1) step1.classList.add('active');

        let currentStep = 1;
        const totalSteps = 4;
        const nextBtn = document.getElementById('onboarding-next-btn');
        const prevBtn = document.getElementById('onboarding-prev-btn');
        const submitBtn = document.getElementById('onboarding-submit-btn');

        // File upload handlers
        function setupFileUpload(inputId, nameId) {
            const input = document.getElementById(inputId);
            const nameDisplay = document.getElementById(nameId);
            
            if (input && nameDisplay) {
                input.addEventListener('change', function(e) {
                    if (this.files && this.files.length > 0) {
                        if (this.multiple) {
                            nameDisplay.textContent = `${this.files.length} file(s) selected`;
                        } else {
                            nameDisplay.textContent = this.files[0].name;
                        }
                    } else {
                        nameDisplay.textContent = '';
                    }
                });
            }
        }

        setupFileUpload('bank-statement', 'bank-statement-name');
        setupFileUpload('business-cert', 'business-cert-name');
        setupFileUpload('ic-passport', 'ic-passport-name');
        setupFileUpload('proof-address', 'proof-address-name');
        setupFileUpload('additional-docs', 'additional-docs-name');

        function showStep(step) {
            // Hide all steps
            document.querySelectorAll('.onboarding-step').forEach(s => s.classList.remove('active'));
            document.querySelectorAll('.progress-step').forEach(s => s.classList.remove('active', 'completed'));
            
            // Show current step
            document.getElementById(`step-${step}`).classList.add('active');
            
            // Update progress
            for (let i = 1; i <= step; i++) {
                const progressStep = document.querySelector(`.progress-step[data-step="${i}"]`);
                if (progressStep) {
                    if (i < step) {
                        progressStep.classList.add('completed');
                    } else {
                        progressStep.classList.add('active');
                    }
                }
            }
            
            // Update buttons
            if (prevBtn) prevBtn.style.display = step > 1 ? 'inline-block' : 'none';
            if (nextBtn) nextBtn.style.display = step < totalSteps ? 'inline-block' : 'none';
            if (submitBtn) submitBtn.style.display = step === totalSteps ? 'inline-block' : 'none';
        }

        function validateStep(step) {
            const stepElement = document.getElementById(`step-${step}`);
            if (!stepElement) return false;
            
            const requiredFields = stepElement.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (field.type === 'checkbox') {
                    if (!field.checked) {
                        isValid = false;
                        field.style.borderColor = 'var(--accent-neon-pink)';
                    } else {
                        field.style.borderColor = '';
                    }
                } else if (field.type === 'file') {
                    if (!field.files || field.files.length === 0) {
                        isValid = false;
                        const uploadContainer = field.closest('.file-upload');
                        if (uploadContainer) uploadContainer.style.borderColor = 'var(--accent-neon-pink)';
                    } else {
                        const uploadContainer = field.closest('.file-upload');
                        if (uploadContainer) uploadContainer.style.borderColor = '';
                    }
                } else {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.style.borderColor = 'var(--accent-neon-pink)';
                    } else {
                        field.style.borderColor = '';
                    }
                }
            });

            return isValid;
        }

        function updateReview() {
            const setReviewValue = (id, value) => {
                const el = document.getElementById(id);
                if (el) el.textContent = value || '-';
            };

            setReviewValue('review-business-name', document.getElementById('business-name')?.value);
            const businessType = document.getElementById('business-type');
            setReviewValue('review-business-type', businessType?.options[businessType.selectedIndex]?.text);
            setReviewValue('review-business-reg', document.getElementById('business-reg')?.value);
            setReviewValue('review-contact-email', document.getElementById('contact-email')?.value);
            setReviewValue('review-account-name', document.getElementById('account-name')?.value);
            const bankName = document.getElementById('bank-name');
            setReviewValue('review-bank-name', bankName?.options[bankName.selectedIndex]?.text);
            const accountNum = document.getElementById('account-number')?.value;
            setReviewValue('review-account-number', accountNum ? '****' + accountNum.slice(-4) : null);
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                if (validateStep(currentStep)) {
                    if (currentStep < totalSteps) {
                        currentStep++;
                        if (currentStep === totalSteps) {
                            updateReview();
                        }
                        showStep(currentStep);
                    }
                } else {
                    alert('Please fill in all required fields');
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                if (currentStep > 1) {
                    currentStep--;
                    showStep(currentStep);
                }
            });
        }

        if (submitBtn) {
            submitBtn.addEventListener('click', function() {
                if (validateStep(currentStep)) {
                    alert('Application submitted successfully! Your application is under review. You will receive an email confirmation shortly.');
                    currentStep = 1;
                    showStep(currentStep);
                } else {
                    alert('Please complete all required fields and accept the terms');
                }
            });
        }

        // Initialize when page is shown
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const isHidden = onboardingPage.classList.contains('hidden');
                    if (!isHidden) {
                        currentStep = 1;
                        showStep(currentStep);
                    }
                }
            });
        });

        observer.observe(onboardingPage, {
            attributes: true,
            attributeFilter: ['class']
        });

        // Initial setup
        if (!onboardingPage.classList.contains('hidden')) {
            showStep(1);
        }
    }

    // Initialize onboarding when DOM is ready
    initializeOnboarding();
    
    // Also initialize immediately if onboarding page is visible
    const onboardingPage = document.getElementById('onboarding-page');
    if (onboardingPage && !onboardingPage.classList.contains('hidden')) {
        // Force hide all steps except step-1
        document.querySelectorAll('.onboarding-step').forEach(step => {
            step.classList.remove('active');
        });
        const step1 = document.getElementById('step-1');
        if (step1) {
            step1.classList.add('active');
        }
    }
});


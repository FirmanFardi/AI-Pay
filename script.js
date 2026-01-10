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

    // Initialize with dashboard page
    updateBreadcrumbs('dashboard');

    // Search and Filter Functionality
    function initializeSearch() {
        // Search functionality for Transaction page
        const transactionSearchBtn = document.querySelector('#transaction-page .filters-bar .btn-primary:last-child');
        const transactionSearchInput = document.querySelector('#transaction-page .filters-bar .filter-input[type="text"]');
        
        if (transactionSearchBtn && transactionSearchInput) {
            transactionSearchBtn.addEventListener('click', function() {
                filterTransactionTable();
            });

            transactionSearchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    filterTransactionTable();
                }
            });

            transactionSearchInput.addEventListener('input', function() {
                filterTransactionTable();
            });
        }

        // Status filter for Transaction page
        const transactionStatusFilter = document.querySelector('#transaction-page .filter-select');
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
        const table = document.querySelector('#transaction-page .data-table tbody');
        if (!table) return;

        const searchInput = document.querySelector('#transaction-page .filters-bar .filter-input[type="text"]');
        const statusFilter = document.querySelector('#transaction-page .filter-select');
        
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const statusFilterValue = statusFilter ? statusFilter.value : 'All Status';
        
        const rows = table.querySelectorAll('tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            const statusBadge = row.querySelector('.status-badge');
            const status = statusBadge ? statusBadge.textContent.trim() : '';
            
            const matchesSearch = !searchTerm || text.includes(searchTerm);
            const matchesStatus = statusFilterValue === 'All Status' || 
                (statusFilterValue === 'Success' && status === 'Success') ||
                (statusFilterValue === 'Pending' && status === 'Pending') ||
                (statusFilterValue === 'Failed' && status === 'Failed');
            
            row.style.display = (matchesSearch && matchesStatus) ? '' : 'none';
        });
    }

    function filterPayoutTable() {
        const table = document.querySelector('#payout-page .data-table tbody');
        if (!table) return;

        const statusFilter = document.querySelector('#payout-page .filter-select');
        const statusFilterValue = statusFilter ? statusFilter.value : 'All Status';
        
        const rows = table.querySelectorAll('tr');
        
        rows.forEach(row => {
            const statusBadge = row.querySelector('.status-badge');
            const status = statusBadge ? statusBadge.textContent.trim() : '';
            
            const matchesStatus = statusFilterValue === 'All Status' || 
                (statusFilterValue === 'Completed' && status === 'Completed') ||
                (statusFilterValue === 'Pending' && status === 'Pending') ||
                (statusFilterValue === 'Failed' && status === 'Failed');
            
            row.style.display = matchesStatus ? '' : 'none';
        });
    }

    function filterSettlementTable() {
        const table = document.querySelector('#settlement-page .data-table tbody');
        if (!table) return;

        const statusFilter = document.querySelector('#settlement-page .filter-select');
        const statusFilterValue = statusFilter ? statusFilter.value : 'All Status';
        
        const rows = table.querySelectorAll('tr');
        
        rows.forEach(row => {
            const statusBadge = row.querySelector('.status-badge');
            const status = statusBadge ? statusBadge.textContent.trim() : '';
            
            const matchesStatus = statusFilterValue === 'All Status' || 
                (statusFilterValue === 'Settled' && status === 'Settled') ||
                (statusFilterValue === 'Pending' && status === 'Pending') ||
                (statusFilterValue === 'Processing' && status === 'Processing');
            
            row.style.display = matchesStatus ? '' : 'none';
        });
    }

    // CSV Export Functionality
    function exportToCSV(tableId, filename) {
        const table = document.querySelector(`#${tableId} .data-table`);
        if (!table) return;

        let csv = [];
        const rows = table.querySelectorAll('tr');

        rows.forEach(row => {
            if (row.style.display === 'none') return; // Skip hidden rows
            
            const cols = row.querySelectorAll('th, td');
            const rowData = [];
            
            cols.forEach(col => {
                // Remove status badge HTML and get text only
                const text = col.textContent.replace(/\s+/g, ' ').trim();
                rowData.push(`"${text}"`);
            });
            
            csv.push(rowData.join(','));
        });

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

    // Initialize search on page load
    initializeSearch();

    // Add CSV export to Reports page
    const exportBtn = document.querySelector('#reports-page .btn-secondary');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            exportToCSV('reports-page', `reports-${new Date().toISOString().split('T')[0]}.csv`);
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


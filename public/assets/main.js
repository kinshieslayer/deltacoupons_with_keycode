window.getCouponAvailability = function(couponId) {
    const STORAGE_KEY = 'coupon_availability';
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    const data = JSON.parse(stored);
    const couponData = data.coupons?.[couponId];
    return couponData?.count || null;
};
// Utility functions
const utils = {
    formatNumber: (num) => new Intl.NumberFormat().format(num),
    truncateText: (text, length) => {
        return text.length > length ? text.substring(0, length) + '...' : text;
    },
    escapeHtml: (str) => {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },
    decodeHtmlEntities: (text) => {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = text;
        return textarea.value;
    },
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    validateSearchQuery: (query) => {
        return query.length >= 3 && /^[a-zA-Z0-9\s-]+$/.test(query);
    }
};

// Coupon Uses Counter Class
class CouponUsesCounter {
    constructor() {
        this.STORAGE_KEY = 'coupon_uses_today';
        this.DAY_IN_MS = 24 * 60 * 60 * 1000;
        this.initialize();
    }

    initialize() {
        if (document.querySelector('.uses-today')) {
            this.updateUsesDisplay();
        }
        if (document.querySelector('.total-uses-today')) {
            this.updateTotalUses();
        }
    }

    initializeUsesCount() {
        let stored = localStorage.getItem(this.STORAGE_KEY);
        let usesData;

        if (stored) {
            usesData = JSON.parse(stored);
            if (this.isDataExpired(usesData.timestamp)) {
                usesData = this.createNewUsesData();
            }
        } else {
            usesData = this.createNewUsesData();
        }

        return usesData;
    }

    isDataExpired(timestamp) {
        const now = new Date();
        const stored = new Date(timestamp);
        return now.toDateString() !== stored.toDateString();
    }

    createNewUsesData() {
        return {
            timestamp: new Date().toISOString(),
            uses: {}
        };
    }

    getRandomUses() {
        const base = Math.floor(Math.random() * 50) + 20;
        const variation = Math.floor(Math.random() * 30) - 15;
        return Math.max(5, base + variation);
    }
    updateTotalUses() {
        const usesData = this.initializeUsesCount();
        const totalUsesElement = document.querySelector('.total-uses-today');
        
        if (totalUsesElement) {
            // Get only the coupon IDs that are displayed on the current page
            const visibleCouponIds = Array.from(document.querySelectorAll('.uses-today'))
                .map(el => el.dataset.couponId);
            
            // Sum up uses only for visible coupons
            const total = visibleCouponIds.reduce((sum, couponId) => {
                return sum + (usesData.uses[couponId] || 0);
            }, 0);
    
            this.animateCount(totalUsesElement, total);
        }
    }
    updateUsesDisplay() {
        const usesData = this.initializeUsesCount();
        const elements = document.querySelectorAll('.uses-today');

        elements.forEach(element => {
            const couponId = element.dataset.couponId;
            const countElement = element.querySelector('.uses-count');

            if (!usesData.uses[couponId]) {
                usesData.uses[couponId] = this.getRandomUses();
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usesData));
            }

            this.animateCount(countElement, usesData.uses[couponId]);
        });

        this.updateTotalUses();
    }
    
    animateCount(element, target) {
        let current = 0;
        const duration = 1000;
        const start = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);

            current = Math.floor(target * progress);
            element.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };

        requestAnimationFrame(update);
    }
}

// Stats Counter Class
class StatsCounter {
    constructor() {
        this.initialize();
    }

    initialize() {
        document.querySelectorAll('.stat-counter').forEach(counter => {
            this.animateCounter(counter);
        });
    }

    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };

        updateCounter();
    }
}

// Live Search Class
class LiveSearch {
    constructor() {
        this.form = document.getElementById('searchForm');
        this.input = document.getElementById('searchInput');
        this.dropdown = document.getElementById('searchDropdown');
        this.loader = this.form.querySelector('.search-loader');
        this.searchIcon = this.loader.querySelector('.bi-search');
        this.spinner = this.loader.querySelector('.spinner-border');
        
        this.debounceTimeout = null;
        this.minChars = 3;
        this.baseUrl = document.querySelector('meta[name="base-url"]')?.content || window.location.origin;
        this.activeItem = null;
        this.initialize();
        
    }

    initialize() {
        // Show loader and search icon initially
        this.loader.classList.remove('d-none');

        // Search input handler with debounce
        this.input.addEventListener('input', utils.debounce(() => {
            this.performSearch();
        }, 300));

        // Prevent form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.form.contains(e.target)) {
                this.hideDropdown();
            }
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideDropdown();
                this.input.blur();
            }
        });

        // Add keyboard navigation
        this.addKeyboardNavigation();
    }

    async performSearch() {
        const query = this.input.value.trim();
        
        if (!utils.validateSearchQuery(query)) {
            this.hideDropdown();
            this.hideLoading();
            return;
        }
    
        this.showLoading();
    
        try {
            // Get the base URL and ensure it uses the same protocol as the current page
            let searchUrl = this.baseUrl;
            if (!searchUrl.startsWith('http')) {
                searchUrl = window.location.protocol + '//' + window.location.host;
            } else if (window.location.protocol === 'https:' && searchUrl.startsWith('http:')) {
                searchUrl = 'https://' + searchUrl.substring(7);
            }
    
            const response = await fetch(`${searchUrl}/search?q=${encodeURIComponent(query)}`, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Search error response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.updateDropdown(data, query);
        } catch (error) {
            console.error('Search error:', error);
            this.showError();
        } finally {
            this.hideLoading();
        }
    }

    showLoading() {
        this.loader.classList.add('is-searching');
        this.spinner.classList.remove('d-none');
        this.searchIcon.classList.add('d-none');
    }

    hideLoading() {
        this.loader.classList.remove('is-searching');
        this.spinner.classList.add('d-none');
        this.searchIcon.classList.remove('d-none');
    }

    showError() {
        this.dropdown.innerHTML = `
            <div class="search-empty">
                <i class="bi bi-exclamation-circle"></i>
                <p class="m-0 text-third">An error occurred. Please try again.</p>
            </div>`;
        this.dropdown.classList.add('show');
    }

    updateDropdown(data, query) {
        const { brands = [], coupons = [] } = data;
        
        if (brands.length === 0 && coupons.length === 0) {
            this.dropdown.innerHTML = `
                <div class="search-empty">
                    <i class="bi bi-search"></i>
                    <p class="m-0 text-third">${window.searchTranslations.noResultsTitle}</p>
                    <p class="small text-third mt-1">${window.searchTranslations.noResultsDesc}</p>
                </div>`;
            this.dropdown.classList.add('show');
            return;
        }

        let html = '';

        // Brands section
        if (brands.length > 0) {
            html += `
                <div class="search-section">
                    <div class="search-section-title">Brands</div>
                    ${brands.map(brand => this.renderBrandItem(brand)).join('')}
                </div>`;
        }

        // Coupons section
        if (coupons.length > 0) {
            html += `
                <div class="search-section">
                    <div class="search-section-title">Coupons</div>
                    ${coupons.map(coupon => this.renderCouponItem(coupon)).join('')}
                </div>`;
        }

        this.dropdown.innerHTML = html;
        this.dropdown.classList.add('show');

        // Add click handlers for coupon items
        this.dropdown.querySelectorAll('.search-coupon-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const couponId = item.dataset.couponId;
                // Open the coupon modal
                window.Alpine.store('couponModal').open(parseInt(couponId));
                // Hide the search dropdown
                this.hideDropdown();
            });
        });
    }

    renderBrandItem(brand) {
        // Add a decodeHtmlEntities utility function at the top of main.js
        const decodeHtmlEntities = (text) => {
            const textarea = document.createElement('textarea');
            textarea.innerHTML = text;
            return textarea.value;
        };
    
        return `
            <a href="${this.baseUrl}/brand/${brand.id}" class="search-item">
                ${brand.brand_logo ? `
                    <img src="${this.baseUrl}/public/${brand.brand_logo}" 
                        alt="${utils.escapeHtml(decodeHtmlEntities(brand.brand_name))}"
                        class="search-item-image rounded-2"
                        loading="lazy"
                        onerror="this.onerror=null; this.src='${this.baseUrl}/assets/img/placeholder.png';">
                ` : ''}
                <div class="search-item-content">
                    <div class="search-item-title">${decodeHtmlEntities(brand.brand_name)}</div>
                    <div class="search-item-subtitle">
                        ${parseInt(brand.coupon_count).toLocaleString()} Coupons
                    </div>
                </div>
            </a>`;
    }

    renderCouponItem(coupon) {
        return `
            <a href="#" class="search-item search-coupon-item" data-coupon-id="${coupon.id}">
                <div class="search-item-content">
                    <div class="search-item-title">${utils.decodeHtmlEntities(coupon.coupon_title)}</div>
                    <div class="search-item-subtitle">
                        ${coupon.brand_name ? utils.decodeHtmlEntities(coupon.brand_name) + ' • ' : ''}
                        ${utils.decodeHtmlEntities(coupon.coupon_short_incent || '')}
                    </div>
                </div>
            </a>`;
    }

    addKeyboardNavigation() {
        this.input.addEventListener('keydown', (e) => {
            if (!this.dropdown.classList.contains('show')) return;
            
            const items = this.dropdown.querySelectorAll('.search-item');
            const current = this.dropdown.querySelector('.search-item.active');
            
            switch(e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    if (!current) {
                        this.setActiveItem(items[0]);
                    } else {
                        const next = [...items].indexOf(current) + 1;
                        if (items[next]) {
                            this.setActiveItem(items[next]);
                        }
                    }
                    break;
                    
                case 'ArrowUp':
                    e.preventDefault();
                    if (current) {
                        const prev = [...items].indexOf(current) - 1;
                        if (prev >= 0) {
                            this.setActiveItem(items[prev]);
                        } else {
                            this.clearActiveItem();
                            this.input.focus();
                        }
                    }
                    break;
                    
                case 'Enter':
                    if (current) {
                        e.preventDefault();
                        current.click();
                    }
                    break;
                
                case 'Escape':
                    this.hideDropdown();
                    this.input.blur();
                    break;
            }
        });
    }

    setActiveItem(element) {
        this.clearActiveItem();
        element?.classList.add('active');
        this.activeItem = element;
        
        // Ensure the active item is visible in the dropdown
        if (element) {
            element.scrollIntoView({ block: 'nearest' });
        }
    }

    clearActiveItem() {
        this.activeItem?.classList.remove('active');
        this.activeItem = null;
    }

    hideDropdown() {
        this.dropdown.classList.remove('show');
        this.clearActiveItem();
    }
}

class CouponAvailability {
    constructor() {
        if (!document.querySelector('.coupons-remaining-wrapper')) {
            return;
        }

        const settingsElement = document.querySelector('meta[name="appearance-settings"]');
        const settings = settingsElement ? JSON.parse(settingsElement.content) : {};
        
        this.MIN_COUPONS = parseInt(settings.available_coupons_min) || 20;
        this.MAX_COUPONS = parseInt(settings.available_coupons_max) || 120;

        this.STORAGE_KEY = 'coupon_availability';
        this.UPDATE_INTERVAL = 20000; // Base interval (20 seconds)
        this.VARIANCE = 10000; // Random variance (+/- 10 seconds)
        this.intervals = new Map(); // Store intervals for each coupon
        this.initialize();
    }

    initialize() {
        // Clean expired data first
        this.cleanExpiredData();
        
        // Initialize for all coupon elements on the page
        document.querySelectorAll('.coupons-remaining-wrapper').forEach(wrapper => {
            const couponId = wrapper.dataset.couponId;
            this.initializeCoupon(couponId, wrapper);
        });
    }

    initializeCoupon(couponId, wrapper) {
        // Find the count element
        const countElement = wrapper.matches('.count') ? 
            wrapper : 
            wrapper.querySelector('.count');
            
        if (!countElement) return;

        let availabilityData = this.getAvailabilityData();
        let couponData = availabilityData.coupons[couponId];

        // Initialize if not exists or expired
        if (!couponData || this.isExpired(couponData.timestamp)) {
            couponData = {
                count: this.generateInitialCount(),
                timestamp: new Date().getTime(),
                lastUpdate: new Date().getTime()
            };
            availabilityData.coupons[couponId] = couponData;
            this.saveAvailabilityData(availabilityData);
        }

        // Update display
        this.updateDisplay(couponId, countElement);

        // Set up interval for this coupon if not already running
        if (!this.intervals.has(couponId)) {
            const interval = setInterval(() => {
                this.updateCouponCount(couponId, countElement);
            }, this.getRandomInterval());
            this.intervals.set(couponId, interval);
        }
    }

    getAvailabilityData() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (!stored) {
            return { 
                timestamp: new Date().getTime(), 
                coupons: {} 
            };
        }

        const data = JSON.parse(stored);
        // Check if data is expired
        if (this.isExpired(data.timestamp)) {
            const newData = { 
                timestamp: new Date().getTime(), 
                coupons: {} 
            };
            this.saveAvailabilityData(newData);
            return newData;
        }

        return data;
    }

    saveAvailabilityData(data) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    }

    generateInitialCount() {
        return Math.max(1, Math.floor(Math.random() * (this.MAX_COUPONS - this.MIN_COUPONS + 1)) + this.MIN_COUPONS);
    }

    getRandomInterval() {
        return this.UPDATE_INTERVAL + (Math.random() * this.VARIANCE - this.VARIANCE / 2);
    }

    isExpired(timestamp) {
        const now = new Date().getTime();
        const hours24 = 24 * 60 * 60 * 1000;
        return (now - timestamp) > hours24;
    }

    updateCouponCount(couponId, element) {
        const data = this.getAvailabilityData();
        const couponData = data.coupons[couponId];
        
        if (!couponData) return;

        // Only update if current count is greater than 1
        if (couponData.count > 1 && Math.random() < 0.7) { // 70% chance to decrease
            const newCount = Math.max(1, couponData.count - 1);
            couponData.count = newCount;
            couponData.lastUpdate = new Date().getTime();
            
            this.saveAvailabilityData(data);
            
            // Update all elements with this coupon ID
            this.updateAllCountElements(couponId);

            // If count reaches 1, stop the interval
            if (newCount === 1) {
                if (this.intervals.has(couponId)) {
                    clearInterval(this.intervals.get(couponId));
                    this.intervals.delete(couponId);
                }
            }
        }
    }

    updateAllCountElements(couponId) {
        // Find all elements that need updating
        const countElements = document.querySelectorAll(`[data-coupon-id="${couponId}"]`);
        countElements.forEach(wrapper => {
            // Find the count element within the wrapper
            const countElement = wrapper.matches('.count') ? 
                wrapper : 
                wrapper.querySelector('.count');
                
            if (countElement) {
                this.updateDisplay(couponId, countElement);
            }
        });

        // Dispatch event for Alpine.js components
        const data = this.getAvailabilityData();
        const couponData = data.coupons[couponId];
        
        if (couponData) {
            window.dispatchEvent(new CustomEvent('couponCountUpdated', {
                detail: { 
                    couponId, 
                    count: couponData.count,
                    timestamp: new Date().getTime()
                }
            }));
        }
    }

    updateDisplay(couponId, element) {
        const data = this.getAvailabilityData();
        const couponData = data.coupons[couponId];
        
        if (!couponData || !element) return;
    
        // Add animation class
        element.classList.add('updating');
        
        // Update the text content
        element.textContent = couponData.count;
        
        // Remove animation class after animation completes
        setTimeout(() => {
            element.classList.remove('updating');
        }, 300);
    }

    cleanExpiredData() {
        const data = this.getAvailabilityData();
        let hasChanges = false;

        // Check if the main timestamp is expired
        if (this.isExpired(data.timestamp)) {
            // Reset everything if main data is expired
            data.timestamp = new Date().getTime();
            data.coupons = {};
            hasChanges = true;
        } else {
            // Check individual coupons
            Object.entries(data.coupons).forEach(([couponId, couponData]) => {
                if (this.isExpired(couponData.timestamp)) {
                    delete data.coupons[couponId];
                    hasChanges = true;

                    // Clear any existing interval
                    if (this.intervals.has(couponId)) {
                        clearInterval(this.intervals.get(couponId));
                        this.intervals.delete(couponId);
                    }
                }
            });
        }

        if (hasChanges) {
            this.saveAvailabilityData(data);
        }
    }

    // Cleanup method to clear intervals when needed (e.g., page unload)
    destroy() {
        this.intervals.forEach(interval => clearInterval(interval));
        this.intervals.clear();
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize main components
    new CouponUsesCounter();
    new StatsCounter();
    new LiveSearch();

    // Handle coupon card clicks
    document.querySelectorAll('.coupon-card-link').forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const couponId = this.dataset.couponId;
            console.log('Show coupon:', couponId);
        });
    });
    
    const couponAvailability = new CouponAvailability();

    // Cleanup on page unload
    window.addEventListener('unload', () => {
        couponAvailability.destroy();
    });
});
// Export utilities globally
window.utils = utils;

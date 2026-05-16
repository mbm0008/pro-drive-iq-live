// ══════════════════════════════════════════════════════════════
//  ProDrive IQ — script.js
//  All JavaScript for the site in one shared file.
//  Each section checks which page is loaded before running.
// ══════════════════════════════════════════════════════════════


// ── A. Validation Utilities ───────────────────────────────────
//  Reusable helpers used on the login/register page.

function validateEmail(email) {
    if (email.trim() === '') return 'Email is required';
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(email)) return 'Please enter a valid email address';
    return '';
}

function validatePassword(password) {
    if (password.trim() === '') return 'Password is required';
    if (password.length < 8)   return 'Minimum 8 characters required';
    if (!/[A-Z]/.test(password)) return 'Must include at least one uppercase letter';
    if (!/[0-9]/.test(password)) return 'Must include at least one number';
    return '';
}

function showError(id, msg) {
    var errEl = document.getElementById(id + 'Error');
    if (errEl) errEl.textContent = msg;
    var input = document.getElementById(id);
    if (input) { input.classList.remove('input-valid'); input.classList.add('input-error'); }
}

function clearError(id) {
    var errEl = document.getElementById(id + 'Error');
    if (errEl) errEl.textContent = '';
    var input = document.getElementById(id);
    if (input) { input.classList.remove('input-error'); input.classList.add('input-valid'); }
}


// ── B. Global Data ────────────────────────────────────────────
//  Workshop list used by the home page, providers page, and booking page.

var workshops = [
    { id: 1,  name: 'Elite Motors Workshop',     city: 'riyadh', services: ['mechanical', 'maintenance'], price: 250, rating: 4.9, icon: 'build',                  specialty: 'German & European',      location: 'Al Olaya, Riyadh'          },
    { id: 2,  name: 'Precision Auto Jeddah',     city: 'jeddah', services: ['maintenance', 'electrical'], price: 180, rating: 4.7, icon: 'settings',               specialty: 'Full Diagnostics',       location: 'Ash Shati, Jeddah'         },
    { id: 3,  name: 'Al Khobar Specialist',      city: 'khobar', services: ['mechanical'],                price: 320, rating: 4.8, icon: 'precision_manufacturing',  specialty: 'Transmission & Engine',  location: 'Rakah, Al Khobar'          },
    { id: 4,  name: 'Dammam Performance Center', city: 'dammam', services: ['mechanical', 'maintenance'], price: 150, rating: 4.6, icon: 'speed',                  specialty: 'Sport & Performance',    location: 'Industrial Area, Dammam'   },
    { id: 5,  name: 'German Auto Experts',       city: 'riyadh', services: ['mechanical'],                price: 450, rating: 4.9, icon: 'directions_car',          specialty: 'BMW & Mercedes Only',    location: 'Al Malqa, Riyadh'          },
    { id: 6,  name: 'Red Sea Repair Hub',        city: 'jeddah', services: ['body'],                     price: 200, rating: 4.5, icon: 'format_paint',            specialty: 'Body & Paint',           location: 'Al Hamra, Jeddah'          },
    { id: 7,  name: 'Al Nakheel Auto Care',      city: 'riyadh', services: ['maintenance'],               price: 120, rating: 4.4, icon: 'oil_barrel',              specialty: 'Express & Routine',      location: 'Al Nakheel, Riyadh'        },
    { id: 8,  name: 'Eastern Province Garage',   city: 'dammam', services: ['electrical'],               price: 160, rating: 4.6, icon: 'electrical_services',     specialty: 'Electrical & AC',        location: 'Al Faisaliyah, Dammam'     },
    { id: 9,  name: 'Safa Motors',               city: 'jeddah', services: ['body', 'maintenance'],      price: 500, rating: 4.9, icon: 'local_car_wash',          specialty: 'Luxury Detailing',       location: 'Al Safa, Jeddah'           },
    { id: 10, name: 'Crown Auto Service',        city: 'khobar', services: ['mechanical', 'maintenance', 'electrical'], price: 280, rating: 4.7, icon: 'workspace_premium', specialty: 'Full-Service Workshop', location: 'Corniche, Al Khobar' }
];

// Navigate to booking — checks login first.
// Used by both the home page cards and the providers page cards.
function goToBooking(id) {
    var user     = JSON.parse(localStorage.getItem('user') || 'null');
    var workshop = workshops.find(function(w) { return w.id === id; });

    if (!user) {
        // Save the intended workshop so we can restore it after login
        if (workshop) localStorage.setItem('pendingProvider', JSON.stringify(workshop));
        window.location.href = 'login.html?redirect=booking';
        return;
    }

    if (workshop) localStorage.setItem('selectedProvider', JSON.stringify(workshop));
    window.location.href = 'booking.html';
}

// Helper: deselect all elements matching selector, select the clicked one, then run callback.
function selectChip(selector, clickedEl, callback) {
    document.querySelectorAll(selector).forEach(function(el) {
        el.classList.remove('selected');
    });
    clickedEl.classList.add('selected');
    if (callback) callback();
}


// ── C. Nav State ──────────────────────────────────────────────
//  Show Dashboard button when logged in, show Login/Register when logged out.

function updateNav() {
    var user        = JSON.parse(localStorage.getItem('user') || 'null');
    var loginBtn    = document.getElementById('navLoginBtn');
    var registerBtn = document.getElementById('navRegisterBtn');
    var dashBtn     = document.getElementById('navDashboardBtn');

    if (user) {
        if (loginBtn)    loginBtn.style.display    = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        if (dashBtn)     dashBtn.style.display     = 'inline-block';
    } else {
        if (loginBtn)    loginBtn.style.display    = '';
        if (registerBtn) registerBtn.style.display = '';
        if (dashBtn)     dashBtn.style.display     = 'none';
    }
}

updateNav();


// ── D. Home Page ──────────────────────────────────────────────

if (document.getElementById('searchBtn')) {

    var searchBtn   = document.getElementById('searchBtn');
    var searchInput = document.getElementById('searchInput');
    var citySelect  = document.getElementById('citySelect');

    searchBtn.addEventListener('click', function() {
        var service = searchInput.value.trim();
        var city    = citySelect.value;
        window.location.href = 'providers.html?service=' + encodeURIComponent(service) + '&city=' + encodeURIComponent(city);
    });

    // Allow pressing Enter in the search box
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') searchBtn.click();
    });

    // Popular chip buttons fill the search input on click
    document.querySelectorAll('[data-search]').forEach(function(chip) {
        chip.addEventListener('click', function() {
            searchInput.value = this.getAttribute('data-search');
            searchInput.focus();
        });
    });
}


// ── E. Providers Page ─────────────────────────────────────────

if (document.getElementById('workshopsGrid')) {

    var cityFilterEl = document.getElementById('cityFilter');

    // Read URL params passed from the home page search
    var urlParams  = new URLSearchParams(window.location.search);
    var urlCity    = (urlParams.get('city')    || '').toLowerCase();
    var urlService = (urlParams.get('service') || '').toLowerCase();

    // Pre-select city from URL
    if (urlCity && cityFilterEl) cityFilterEl.value = urlCity;

    // Pre-check the matching service checkbox based on search keyword
    var serviceKeywords = {
        maintenance: ['oil', 'brake', 'engine', 'tire', 'battery', 'alignment', 'tune'],
        body:        ['body', 'detail', 'paint', 'wash'],
        electrical:  ['electric', 'ac', 'air']
    };

    Object.keys(serviceKeywords).forEach(function(type) {
        var matched = serviceKeywords[type].some(function(k) { return urlService.includes(k); });
        if (matched) {
            var el = document.getElementById('filter-' + type);
            if (el) el.checked = true;
        }
    });

    // Returns the filtered workshop list based on current filter values
    function getFilteredWorkshops() {
        var city    = cityFilterEl ? cityFilterEl.value : 'all';
        var checked = [];

        ['mechanical', 'maintenance', 'body', 'electrical'].forEach(function(type) {
            var el = document.getElementById('filter-' + type);
            if (el && el.checked) checked.push(type);
        });

        return workshops.filter(function(w) {
            var cityMatch    = city === 'all' || w.city === city;
            var serviceMatch = checked.length === 0 || checked.some(function(s) {
                return w.services.includes(s);
            });
            return cityMatch && serviceMatch;
        });
    }

    // Build and insert workshop cards into the grid
    function renderWorkshops(list) {
        var grid = document.getElementById('workshopsGrid');

        if (list.length === 0) {
            grid.innerHTML = '<div style="grid-column:span 3;text-align:center;padding:5rem 0;"><span class="material-symbols-outlined" style="font-size:3rem;color:#d1d5db;display:block;margin-bottom:0.75rem;">search_off</span><p style="color:#9ca3af;font-weight:500;">No workshops match your filters.</p></div>';
            return;
        }

        var svcStyle = {
            mechanical:  'background:#dbeafe;color:#1e40af',
            maintenance: 'background:#dcfce7;color:#166534',
            body:        'background:#fce7f3;color:#9d174d',
            electrical:  'background:#fef9c3;color:#92400e'
        };
        var svcLabel = { mechanical:'Mechanical', maintenance:'Maintenance', body:'Body & Paint', electrical:'Electrical' };

        grid.innerHTML = list.map(function(w) {
            var chips = w.services.map(function(s) {
                return '<span style="display:inline-block;padding:0.2rem 0.65rem;border-radius:9999px;font-size:0.7rem;font-weight:700;' + (svcStyle[s] || 'background:#f3f4f6;color:#6b7280') + ';">' + (svcLabel[s] || s) + '</span>';
            }).join('');

            return `
            <div style="background:#fff;border-radius:1rem;overflow:hidden;box-shadow:0 2px 16px rgba(25,28,30,0.08);display:flex;flex-direction:column;transition:box-shadow 0.28s ease,transform 0.22s ease;"
                 onmouseover="this.style.boxShadow='0 16px 40px rgba(0,64,139,0.15)';this.style.transform='translateY(-4px)'"
                 onmouseout="this.style.boxShadow='0 2px 16px rgba(25,28,30,0.08)';this.style.transform='translateY(0)'">
                <div class="workshop-img-container" style="height:11rem;">
                    <div class="icon-fallback" style="background:#eef2ff;">
                        <span class="material-symbols-outlined" style="color:#c7d2fe;font-size:3rem;">${w.icon}</span>
                    </div>
                    <img src="images/workshop-${w.id}.jpg" alt="${w.name}" onerror="this.style.display='none'">
                </div>
                <div style="padding:1.125rem 1.25rem 1.25rem;flex:1;display:flex;flex-direction:column;gap:0.5rem;">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                        <h3 style="font-weight:700;font-size:0.9375rem;color:#191c1e;line-height:1.3;flex:1;margin-right:0.5rem;">${w.name}</h3>
                        <span style="display:inline-flex;align-items:center;gap:3px;background:#fef9c3;color:#92400e;padding:0.2rem 0.55rem;border-radius:9999px;font-size:0.75rem;font-weight:700;flex-shrink:0;">
                            <span class="material-symbols-outlined" style="font-size:13px;font-variation-settings:'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24;">star</span>${w.rating}
                        </span>
                    </div>
                    <p style="color:#6b7280;font-size:0.8125rem;display:flex;align-items:center;gap:3px;margin:0;">
                        <span class="material-symbols-outlined" style="font-size:0.9rem;color:#9ca3af;flex-shrink:0;">location_on</span>${w.location}
                    </p>
                    <p style="color:#9ca3af;font-size:0.75rem;margin:0;">${w.specialty}</p>
                    <div style="display:flex;flex-wrap:wrap;gap:0.35rem;margin-top:0.125rem;">${chips}</div>
                    <div style="margin-top:auto;padding-top:0.875rem;border-top:1px solid #f3f4f6;display:flex;justify-content:space-between;align-items:center;">
                        <div>
                            <p style="font-size:0.65rem;color:#9ca3af;text-transform:uppercase;letter-spacing:0.07em;margin-bottom:1px;">Starting from</p>
                            <p style="font-size:1.1875rem;font-weight:800;color:#00408b;line-height:1;">${w.price} <span style="font-size:0.7rem;font-weight:600;color:#6b7280;">SAR</span></p>
                        </div>
                        <button onclick="goToBooking(${w.id})" class="btn-primary" style="padding:0.5rem 1.25rem;display:inline-flex;align-items:center;gap:4px;">
                            Book <span class="material-symbols-outlined" style="font-size:1rem;">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>`;
        }).join('');
    }

    // Re-render when filters change
    if (cityFilterEl) {
        cityFilterEl.addEventListener('change', function() {
            renderWorkshops(getFilteredWorkshops());
        });
    }

    ['mechanical', 'maintenance', 'body', 'electrical'].forEach(function(type) {
        var el = document.getElementById('filter-' + type);
        if (el) el.addEventListener('change', function() {
            renderWorkshops(getFilteredWorkshops());
        });
    });

    var clearBtn = document.getElementById('clearFiltersBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            if (cityFilterEl) cityFilterEl.value = 'all';
            ['mechanical', 'maintenance', 'body', 'electrical'].forEach(function(type) {
                var el = document.getElementById('filter-' + type);
                if (el) el.checked = false;
            });
            renderWorkshops(workshops);
        });
    }

    renderWorkshops(getFilteredWorkshops());
}


// ── F. Booking Page ───────────────────────────────────────────

if (document.getElementById('confirmBtn')) {

    // Redirect to login if not logged in
    if (!JSON.parse(localStorage.getItem('user') || 'null')) {
        window.location.href = 'login.html?redirect=booking';
    }

    var selectedService      = null;
    var selectedServicePrice = 0;
    var selectedDate         = '';
    var selectedTime         = '';

    // Show the saved provider in the summary
    var savedProvider = JSON.parse(localStorage.getItem('selectedProvider') || 'null');
    if (savedProvider) {
        var provEl = document.getElementById('summaryProvider');
        var locEl  = document.getElementById('summaryLocation');
        if (provEl) provEl.textContent = savedProvider.name;
        if (locEl)  locEl.textContent  = savedProvider.location || '';
    }

    // Generate date buttons for the next 7 days
    function buildDateChips() {
        var container = document.getElementById('dateContainer');
        if (!container) return;

        var days   = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        container.innerHTML = '';

        for (var i = 0; i < 7; i++) {
            var d = new Date();
            d.setDate(d.getDate() + i);

            var dateStr = months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();

            var chip = document.createElement('button');
            chip.type      = 'button';
            chip.className = 'date-chip';
            chip.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:0.75rem 1rem;border-radius:0.75rem;background:#f3f4f6;color:#191c1e;min-width:68px;border:none;font-family:inherit;';
            chip.setAttribute('data-date', dateStr);
            chip.innerHTML = '<span class="text-xs text-gray-400">' + days[d.getDay()] + '</span>'
                           + '<span class="text-lg font-bold">'    + d.getDate()         + '</span>'
                           + '<span class="text-xs text-gray-400">' + months[d.getMonth()] + '</span>';
            container.appendChild(chip);
        }

        // Attach click listeners to the generated chips
        container.querySelectorAll('.date-chip').forEach(function(chip) {
            chip.addEventListener('click', function() {
                var date = this.getAttribute('data-date');
                selectChip('.date-chip', this, function() {
                    selectedDate = date;
                    updateSummary();
                });
            });
        });
    }

    buildDateChips();

    // Service card click — mark selected and update summary
    document.querySelectorAll('.service-card').forEach(function(card) {
        card.addEventListener('click', function() {
            var service = card.getAttribute('data-service');
            var price   = parseFloat(card.getAttribute('data-price'));
            selectChip('.service-card', this, function() {
                selectedService      = service;
                selectedServicePrice = price;
                updateSummary();
            });
        });
    });

    // Time chip click
    document.querySelectorAll('.time-chip').forEach(function(chip) {
        chip.addEventListener('click', function() {
            var time = chip.getAttribute('data-time');
            selectChip('.time-chip', this, function() {
                selectedTime = time;
                updateSummary();
            });
        });
    });

    // Update the right-column summary whenever any selection changes
    function updateSummary() {
        var svcEl = document.getElementById('summaryService');
        var schEl = document.getElementById('summarySchedule');
        var vehEl = document.getElementById('summaryVehicleDisplay');
        var subEl = document.getElementById('summarySubtotal');
        var vatEl = document.getElementById('summaryVAT');
        var totEl = document.getElementById('summaryTotal');
        var mmEl  = document.getElementById('makeModel');
        var yrEl  = document.getElementById('yearSelect');

        if (svcEl) svcEl.textContent = selectedService || '—';
        if (schEl) schEl.textContent = (selectedDate || '—') + (selectedTime ? ', ' + selectedTime : '');

        if (vehEl && mmEl) {
            vehEl.textContent = mmEl.value.trim()
                ? mmEl.value.trim() + (yrEl ? ' ' + yrEl.value : '')
                : '—';
        }

        var vat   = selectedServicePrice * 0.15;
        var total = selectedServicePrice + vat;

        if (subEl) subEl.textContent = selectedServicePrice > 0 ? selectedServicePrice.toFixed(2) + ' SAR' : '—';
        if (vatEl) vatEl.textContent = selectedServicePrice > 0 ? vat.toFixed(2) + ' SAR' : '—';
        if (totEl) totEl.textContent = selectedServicePrice > 0 ? total.toFixed(2) + ' SAR' : '—';
    }

    // Update vehicle display as the user types
    var makeModelInput = document.getElementById('makeModel');
    if (makeModelInput) makeModelInput.addEventListener('input', updateSummary);

    var yearSelectEl = document.getElementById('yearSelect');
    if (yearSelectEl) yearSelectEl.addEventListener('change', updateSummary);

    // Confirm booking button
    document.getElementById('confirmBtn').addEventListener('click', function() {
        var makeModel = document.getElementById('makeModel') ? document.getElementById('makeModel').value.trim() : '';
        var year      = document.getElementById('yearSelect') ? document.getElementById('yearSelect').value : '';

        if (!selectedService) { alert('Please select a service.'); return; }
        if (!selectedDate)    { alert('Please select a date.'); return; }
        if (!selectedTime)    { alert('Please select a time slot.'); return; }
        if (!makeModel)       { alert('Please enter your vehicle make and model.'); return; }

        var vat   = selectedServicePrice * 0.15;
        var total = selectedServicePrice + vat;

        var booking = {
            id:       'PIQ-' + Math.floor(1000 + Math.random() * 9000),
            provider: savedProvider ? savedProvider.name     : 'ProDrive Workshop',
            location: savedProvider ? savedProvider.location : '',
            service:  selectedService,
            price:    selectedServicePrice,
            vat:      parseFloat(vat.toFixed(2)),
            total:    parseFloat(total.toFixed(2)),
            date:     selectedDate,
            time:     selectedTime,
            vehicle:  makeModel + ' ' + year,
            status:   'Confirmed',
            bookedOn: new Date().toISOString()
        };

        var bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        bookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(bookings));

        var toast = document.getElementById('toast');
        if (toast) toast.classList.add('show');

        setTimeout(function() { window.location.href = 'dashboard.html'; }, 1600);
    });
}


// ── G. Dashboard ──────────────────────────────────────────────

if (document.getElementById('upcomingList')) {

    // Redirect to login if not logged in
    if (!JSON.parse(localStorage.getItem('user') || 'null')) {
        window.location.href = 'login.html';
    }

    // Fill in user name and email
    function loadUser() {
        var user = JSON.parse(localStorage.getItem('user') || 'null');
        if (!user) return;

        var nameEl  = document.getElementById('userDisplayName');
        var nameEl2 = document.getElementById('profileName');
        var emailEl = document.getElementById('userEmail');
        var totalEl = document.getElementById('totalServiceValue');

        if (nameEl)  nameEl.textContent  = user.name;
        if (nameEl2) nameEl2.textContent = user.name;
        if (emailEl) emailEl.textContent = user.email;

        var bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        var total = bookings.reduce(function(sum, b) { return sum + (b.total || 0); }, 0);
        if (totalEl) totalEl.textContent = 'SAR ' + total.toFixed(2);
    }

    // Render a list of bookings into a container
    // isPast = true shows a simpler invoice-style row
    function renderBookings(list, containerId, isPast) {
        var container = document.getElementById(containerId);
        if (!container) return;

        if (list.length === 0) {
            var msg = isPast
                ? 'No past services recorded.'
                : 'No upcoming bookings. <a href="providers.html" style="color:#00408b;font-weight:600;text-decoration:none;">Book a service →</a>';
            container.innerHTML = '<p style="color:#9ca3af;font-size:0.875rem;padding:1rem 0;">' + msg + '</p>';
            return;
        }

        container.innerHTML = list.map(function(b) {
            if (isPast) {
                return `
                <div style="display:flex;justify-content:space-between;align-items:center;padding:1rem 0;border-bottom:1px solid #f3f4f6;">
                    <div style="display:flex;align-items:center;gap:0.75rem;">
                        <span class="material-symbols-outlined" style="color:#9ca3af;">receipt_long</span>
                        <div>
                            <p style="font-weight:600;font-size:0.875rem;color:#191c1e;">${b.service}</p>
                            <p style="color:#9ca3af;font-size:0.75rem;">${b.provider} &bull; ${b.date}</p>
                        </div>
                    </div>
                    <div style="text-align:right;">
                        <p style="font-weight:700;font-size:0.875rem;">${b.total ? b.total.toFixed(2) + ' SAR' : '—'}</p>
                        <p style="color:#9ca3af;font-size:0.75rem;">${b.id || ''}</p>
                    </div>
                </div>`;
            } else {
                var badgeBg    = b.status === 'Confirmed' ? '#dbeafe' : '#fef9c3';
                var badgeColor = b.status === 'Confirmed' ? '#1d4ed8' : '#854d0e';
                return `
                <div style="display:flex;align-items:flex-start;gap:1rem;padding:1rem;background:#ffffff;border:1px solid #f3f4f6;border-radius:0.75rem;margin-bottom:0.75rem;box-shadow:0 2px 8px rgba(25,28,30,0.05);">
                    <div style="width:2.75rem;height:2.75rem;border-radius:50%;background:#d8e2ff;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <span class="material-symbols-outlined" style="color:#00408b;font-size:1.25rem;">car_repair</span>
                    </div>
                    <div style="flex:1;min-width:0;">
                        <p style="font-weight:700;font-size:0.9375rem;color:#191c1e;margin-bottom:0.25rem;">${b.service}</p>
                        <p style="color:#424752;font-size:0.8125rem;margin-bottom:0.125rem;">${b.provider}</p>
                        <p style="color:#6b7280;font-size:0.75rem;margin-bottom:0.125rem;">
                            <span class="material-symbols-outlined" style="font-size:0.875rem;vertical-align:-2px;margin-right:2px;">calendar_today</span>${b.date} &bull; ${b.time}
                        </p>
                        ${b.vehicle ? '<p style="color:#6b7280;font-size:0.75rem;"><span class="material-symbols-outlined" style="font-size:0.875rem;vertical-align:-2px;margin-right:2px;">directions_car</span>' + b.vehicle + '</p>' : ''}
                    </div>
                    <div style="text-align:right;flex-shrink:0;display:flex;flex-direction:column;align-items:flex-end;gap:0.375rem;">
                        <span style="display:inline-block;padding:0.2rem 0.65rem;border-radius:9999px;font-size:0.75rem;font-weight:600;background:${badgeBg};color:${badgeColor};">${b.status}</span>
                        <p style="font-weight:800;font-size:0.9375rem;color:#191c1e;">${b.total ? b.total.toFixed(2) + ' SAR' : ''}</p>
                    </div>
                </div>`;
            }
        }).join('');
    }

    // Logout
    var logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('user');
            window.location.href = 'login.html';
        });
    }

    // Sidebar section switching
    document.querySelectorAll('.sidebar-link').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var target = this.getAttribute('data-section');

            document.querySelectorAll('.sidebar-link').forEach(function(l) {
                l.classList.remove('sidebar-active');
            });
            this.classList.add('sidebar-active');

            document.querySelectorAll('.dashboard-section').forEach(function(s) {
                s.style.display = s.id === target ? 'block' : 'none';
            });
        });
    });

    loadUser();

    var allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');

    // Show demo booking if the user has no bookings yet
    if (allBookings.length === 0) {
        allBookings = [
            {
                id: 'PIQ-4491', provider: 'Elite Motors Workshop', location: 'Al Olaya, Riyadh',
                service: 'Oil Change', price: 119, vat: 17.85, total: 136.85,
                date: 'May 20, 2026', time: '10:30 AM', vehicle: 'Toyota Camry 2022',
                status: 'Confirmed', bookedOn: new Date().toISOString()
            }
        ];
    }

    renderBookings(allBookings, 'upcomingList', false);
    renderBookings([],          'pastList',     true);
}


// ── H. Login / Register Page ──────────────────────────────────

if (document.getElementById('authForm')) {

    var urlParams      = new URLSearchParams(window.location.search);
    var redirectTo     = urlParams.get('redirect');
    var isRegisterMode = urlParams.get('mode') === 'register';

    var authForm      = document.getElementById('authForm');
    var formTitle     = document.getElementById('formTitle');
    var formSubtitle  = document.getElementById('formSubtitle');
    var submitBtnText = document.getElementById('submitBtnText');
    var toggleModeBtn = document.getElementById('toggleModeBtn');
    var toggleText    = document.getElementById('toggleText');

    // Update the form labels and show/hide register-only fields
    function applyMode() {
        if (isRegisterMode) {
            if (formTitle)     formTitle.textContent     = 'Create Account';
            if (formSubtitle)  formSubtitle.textContent  = 'Join ProDrive IQ and simplify your car care';
            if (submitBtnText) submitBtnText.textContent = 'Create Account';
            if (toggleText)    toggleText.textContent    = 'Already have an account?';
            if (toggleModeBtn) toggleModeBtn.textContent = 'Sign in';
            document.querySelectorAll('.register-fields').forEach(function(el) { el.classList.add('open'); });
        } else {
            if (formTitle)     formTitle.textContent     = 'Welcome back';
            if (formSubtitle)  formSubtitle.textContent  = 'Manage your car services easily and efficiently';
            if (submitBtnText) submitBtnText.textContent = 'Login';
            if (toggleText)    toggleText.textContent    = "Don't have an account?";
            if (toggleModeBtn) toggleModeBtn.textContent = 'Create one';
            document.querySelectorAll('.register-fields').forEach(function(el) { el.classList.remove('open'); });
        }
    }

    applyMode();

    // Toggle between login and register when clicking the link
    if (toggleModeBtn) {
        toggleModeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            isRegisterMode = !isRegisterMode;
            // Clear any existing errors
            ['email', 'password', 'fullName', 'confirmPassword'].forEach(function(id) {
                var errEl = document.getElementById(id + 'Error');
                if (errEl) errEl.textContent = '';
                var inp = document.getElementById(id);
                if (inp) inp.classList.remove('input-error', 'input-valid');
            });
            applyMode();
        });
    }

    // After a successful login or register, redirect appropriately
    function redirectAfterAuth() {
        if (redirectTo === 'booking') {
            var pending = localStorage.getItem('pendingProvider');
            if (pending) {
                localStorage.setItem('selectedProvider', pending);
                localStorage.removeItem('pendingProvider');
            }
            window.location.href = 'booking.html';
        } else {
            window.location.href = 'dashboard.html';
        }
    }

    // Real-time field validation on blur
    var emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            var err = validateEmail(this.value);
            err ? showError('email', err) : clearError('email');
        });
    }

    var passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('blur', function() {
            var err = validatePassword(this.value);
            err ? showError('password', err) : clearError('password');
        });
    }

    // Form submission
    authForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var email    = document.getElementById('email').value.trim();
        var password = document.getElementById('password').value;
        var isValid  = true;

        var emailErr    = validateEmail(email);
        var passwordErr = validatePassword(password);

        if (emailErr)    { showError('email', emailErr);       isValid = false; } else { clearError('email'); }
        if (passwordErr) { showError('password', passwordErr); isValid = false; } else { clearError('password'); }

        if (isRegisterMode) {

            var nameEl    = document.getElementById('fullName');
            var confirmEl = document.getElementById('confirmPassword');
            var name      = nameEl    ? nameEl.value.trim() : '';
            var confirm   = confirmEl ? confirmEl.value     : '';

            if (name === '') {
                showError('fullName', 'Full name is required');
                isValid = false;
            } else {
                clearError('fullName');
            }

            if (confirm === '') {
                showError('confirmPassword', 'Please confirm your password');
                isValid = false;
            } else if (confirm !== password) {
                showError('confirmPassword', 'Passwords do not match');
                isValid = false;
            } else {
                clearError('confirmPassword');
            }

            if (isValid) {
                var registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
                var exists = registeredUsers.find(function(u) { return u.email === email; });
                if (exists) {
                    showError('email', 'An account with this email already exists');
                } else {
                    registeredUsers.push({ name: name, email: email, password: password });
                    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
                    localStorage.setItem('user', JSON.stringify({ name: name, email: email }));
                    redirectAfterAuth();
                }
            }

        } else {

            if (isValid) {
                var registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
                var match = registeredUsers.find(function(u) { return u.email === email; });
                if (!match) {
                    showError('email', 'No account found. Please register first.');
                } else if (match.password !== password) {
                    showError('password', 'Incorrect password');
                } else {
                    localStorage.setItem('user', JSON.stringify({ name: match.name, email: match.email }));
                    redirectAfterAuth();
                }
            }
        }
    });
}

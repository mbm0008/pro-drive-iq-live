# ProDrive IQ

A car service booking platform for Saudi Arabia. Built as a fully functional front-end web application for BIS351 — Web Business Applications (Milestone 2).

🌐 **Live Site:** [mbm0008.github.io/prodrive-iq-live](https://mbm0008.github.io/prodrive-iq-live/)

---

## Overview

ProDrive IQ solves three real problems car owners face in Saudi Arabia:

- Hard to find trusted workshops without personal referrals
- No price transparency before visiting a workshop
- Booking requires phone calls or physical visits

The platform lets users browse verified workshops, filter by city and service type, book appointments online with full VAT pricing, and manage bookings from a personal dashboard.

---

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Home — search bar and 6 featured workshop cards |
| `login.html` | Login and register with form validation |
| `providers.html` | All 10 workshops with city and service filters |
| `booking.html` | Book a service — select service, date, time, vehicle |
| `dashboard.html` | User dashboard — upcoming bookings, history, profile |
| `about.html` | Company info, how it works, values, contact |

---

## Features

- **Authentication** — register and login with credential validation, session stored in localStorage
- **Workshop filtering** — filter by city (Riyadh, Jeddah, Dammam, Al Khobar) and service type (Mechanical, Maintenance, Body & Paint, Electrical)
- **Booking flow** — select service, pick from dynamic date chips, choose time slot, enter vehicle details
- **Live VAT summary** — booking summary updates in real time with 15% VAT and total in SAR
- **Dashboard** — view upcoming bookings and past service history, sidebar navigation
- **Auth guard** — attempting to book without logging in redirects to login, then restores the booking after authentication

---

## Tech Stack

- **HTML5** — semantic structure (`nav`, `main`, `section`, `aside`, `footer`)
- **CSS3** — custom `style.css` with reusable helper classes (`.btn-primary`, `.card`, `.page-input`, `.nav-link`)
- **Tailwind CSS** — via CDN for layout and spacing utilities
- **JavaScript (ES5)** — single shared `script.js` for all pages
- **localStorage** — stores users, sessions, and bookings (no backend required)

---

## File Structure

```
├── index.html
├── login.html
├── providers.html
├── booking.html
├── dashboard.html
├── about.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── images/
    ├── hero-bg.jpg
    └── workshop-1.jpg … workshop-10.jpg
```

---

## How to Run

No build step required. Open any `.html` file directly in a browser, or visit the live site linked above.

---

## Milestones

**Milestone 1 (Week 10)** — UI/UX prototype, business problem definition, Figma screens

**Milestone 2 (Week 14)** — Fully functional implementation with working auth, booking flow, filters, dashboard, and GitHub Pages deployment

---

## Team

- Mansour Alkhater
- Faisal Alsaleh
- Sultan Alqasim
- Abdullah Alsinan

**Course:** BIS351 — Web Business Applications

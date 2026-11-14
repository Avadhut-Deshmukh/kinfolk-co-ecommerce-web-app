# KINFOLK & CO. — Architectural Objects for Daily Rituals

A production-grade, multi-page **MERN Stack (MongoDB, Express.js, React 18, Node.js)** startup e-commerce platform bridging Nordic architectural restraint and Japanese craft permanence.

Featuring dual real payment gateway engines (**Razorpay** + **Stripe** + **Atelier Direct Wire / COD**), multi-page routing, startup growth/trust essentials, and interactive luxury direct-to-consumer storefront capabilities.

---

## 1. Aesthetic & Design System

- **Palette**: Soft Cream (`#F7F4EF`), Warm Stone (`#EBE6DD`), Structural Border Stone (`#DCD6CC`), and Matte Black (`#111111`).
- **Typography**: `Cormorant Garamond` (editorial serif headings) + `Plus Jakarta Sans` (UI controls and body copy).
- **Vibe**: Understated Copenhagen/Kyoto D2C luxury. Zero rounded pill buttons—sharp 1px architectural borders and smooth micro-interactions.

---

## 2. Multi-Page Startup Architecture

1. **`Home` (`/`)**:
   - Editorial Hero Split with Monograph headline, dual CTAs, and interactive featured product spotlight.
   - Curated Objects 4-card preview with secondary photo crossfades, wishlist heart-pop, and quick-add bars.
   - Tactile Materiality Banner in dark matte black (`#111111`) highlighting Hasami Porcelain, Belgian Flax, and Roman Travertine.
   - Architectural Brand Pillars: Carbon-Neutral Courier Dispatch, Belgian Linen Gift Wrapping, Lifetime Atelier Warranty.
   - Slow Living Monograph / Journal preview for SEO authority.

2. **`Collection` (`/collection`)**:
   - Full interactive catalog with category filters (`All Objects`, `Tableware`, `Lighting`, `Workspace`, `Textiles`).
   - Live search across titles, materials, and origins.
   - Sorting by `Featured`, `Price: Low to High`, `Price: High to Low`, and `Highest Rated`.
   - Staggered product cards with secondary hover crossfades, animated wishlist heart-pop, and slide-up Quick Add bars.

3. **`About Us` (`/about`)**:
   - Founding Manifesto bridging Nordic restraint and Japanese craft permanence.
   - 3-Pillar Philosophy Grid: Small-Batch Provenance, Raw Honest Materials, Generational Longevity.
   - Partner Ateliers Directory: *Nagasaki Ceramic Kiln*, *Aarhus Iron Foundry*, *Ghent Linen Mill*, and *Tivoli Stone Quarry*.
   - Sustainability & Impact Ledger: 100% plastic-free molded packaging, OEKO-TEX flax, carbon-neutral logistics.

4. **`Contact Us` (`/contact`)**:
   - Global Showrooms Directory: Copenhagen Flagship, Kyoto Craft Studio, and New York Viewing Room.
   - Client Concierge & Trade Form wired to `POST /api/contact` with MongoDB persistence and instant confirmation reference ID (`KC-CON-xxxx`).
   - Expandable Client Care FAQ Accordion.

5. **`Journal` (`/journal`)**:
   - Dedicated reading view for monograph essays on slow living, material care guides, and workshop interviews.
   - Interactive full-essay reader modal with author bios, pull quotes, and referenced atelier objects.

6. **`Legal & Policies`**:
   - Accessible via the architectural footer: Shipping & Returns, Privacy & Data Restraint (no advertising pixels), Terms of Atelier Sale, and Lifetime Warranty Registration.

---

## 3. Real Payment Gateway Integrations

The checkout drawer features a 4-step flow (`Bag` → `Shipping` → `Payment` → `Confirmed`):

- **Razorpay Official Checkout**:
  - Backend: `POST /api/payments/razorpay/create-order` + `POST /api/payments/razorpay/verify`.
  - Frontend: Loads `https://checkout.razorpay.com/v1/checkout.js` with 256-bit encryption. Supports cards, UPI, net banking, and wallets, with an instant sandbox test mode for local demonstration.
- **Stripe Official Payment Engine**:
  - Backend: `POST /api/payments/stripe/create-payment-intent` + `POST /api/payments/stripe/confirm-payment`.
  - Frontend: Credit card input with auto-formatting, test card autofill (`4242 4242 4242 4242`), and authorization.
- **Atelier Direct Wire / Cash on Delivery (COD)**:
  - Instant order placement for studio invoicing and post-inspection settlement.
- **Order Confirmation**:
  - Confetti celebration, order reference ID (`KC-xxxxx`), tracking number (`TRK-xxxxx-US`), and live sync to the Order Tracking modal.

---

## 4. Backend REST API (`server/index.js`)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health status, database mode, and payment gateway status |
| `GET` | `/api/config/payments` | Public publishable keys for Razorpay & Stripe |
| `GET` | `/api/products` | Retrieve all 12 atelier objects |
| `GET` | `/api/products/:id` | Retrieve single object with reviews |
| `POST` | `/api/products/:id/reviews` | Submit verified customer review |
| `POST` | `/api/orders` | Create order, deduct stock, and return tracking number |
| `GET` | `/api/orders` | List recent atelier orders |
| `GET` | `/api/orders/track/:query` | Track shipment by Order ID or Tracking Number |
| `POST` | `/api/contact` | Submit client concierge or trade inquiry |
| `GET` | `/api/contact` | List registered inquiries |
| `POST` | `/api/newsletter` | Slow living journal email subscription |
| `POST` | `/api/payments/razorpay/create-order` | Create official Razorpay order |
| `POST` | `/api/payments/razorpay/verify` | Verify Razorpay HMAC SHA256 signature |
| `POST` | `/api/payments/stripe/create-payment-intent` | Create Stripe PaymentIntent |
| `POST` | `/api/payments/stripe/confirm-payment` | Confirm Stripe payment status |

*Note: The backend features an automatic zero-config hybrid architecture: if a MongoDB instance is connected, it uses Mongoose models; if MongoDB is not running locally, it gracefully operates via a persistent in-memory store so the app never crashes.*

---

## 5. Quick Start & Execution

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run both Backend API and Frontend Dev Server:**
   ```bash
   npm run dev:all
   ```
   Or run individually:
   - Backend Express API: `npm run server` (Runs on `http://localhost:5000`)
   - Frontend Vite: `npm run dev` (Runs on `http://localhost:5173`)

3. **Build for production:**
   ```bash
   npm run build
   ```

1. Landing Page PRD
Product

ShilpMitra — AI-powered digital companion for artisans

Objective

Landing page ka primary goal:

ShilpMitra ko immediately understandable banana.
Artisan-focused mission communicate karna.
AI capabilities showcase karna.
Sahayak ko major differentiator ke roop mein introduce karna.
User ko future application ke liye Get Started journey ki taraf guide karna.
SIH presentation mein polished, modern and trustworthy first impression dena.
Target Users
Primary
Traditional artisans
Weavers
Small craft producers
Secondary
Customers
NGOs / organizations working with artisans
Marketplace/e-commerce stakeholders
Hackathon judges / evaluators
2. Landing Page Sections
01 — Navbar

Elements:

ShilpMitra logo/name
Home
How It Works
Features
Sahayak
About
Language selector
Login
Get Started

Phase 1: Buttons/navigation visually present but backend functionality is not required.

02 — Hero

Main message:

Your Craft. Your Story. Your Market.

Supporting message explaining that ShilpMitra helps artisans digitally present, market and sell their products using AI.

Primary CTA:

Get Started

Secondary CTA:

Meet Sahayak

Hero visual should communicate:

Traditional Craft → AI → Digital Market

03 — AI Features

Heading:

Everything You Need to Take Your Craft Digital

Four feature cards:

AI Product Enhancement
Improve product presentation/images.
AI Story & Description
Generate professional descriptions and craft stories.
Smart Pricing
Provide AI-assisted pricing guidance.
Digital Selling
Help prepare products for online selling.

Each card should have:

Icon
Title
Short description
Hover interaction
04 — About ShilpMitra

Heading:

Turning Traditional Craft into Digital Opportunity

Explain the problem simply:

Artisans may have excellent products but face difficulty with professional product presentation, digital marketing, pricing and online selling.

ShilpMitra acts as an AI-powered digital assistant.

Visual:

Artisan
Handmade product
Digital transformation elements

CTA:

Explore ShilpMitra

05 — Craft → Customer Journey

Heading:

From Craft to Customer

Show the journey:

Create
  ↓
Enhance
  ↓
Describe
  ↓
Price
  ↓
List
  ↓
Sell
  ↓
Fulfil

Each stage gets a small visual/icon.

This section should communicate that ShilpMitra isn't just an image-generation tool; it supports the broader artisan journey.

06 — Sahayak

Heading:

Meet Sahayak — Your Voice-Based Digital Companion

Description:

Sahayak guides artisans through their digital journey in their preferred regional language using voice-based interaction.

Visual:

Artisan
Voice interface
Conversation bubbles
Microphone/voice indicator

Example conversation UI:

Sahayak:
“Namaskar! Aapke product ka order aaya hai. Kya stock available hai?”

Artisan:
“Haan, available hai.”

Sahayak:
“Bahut badhiya. Product ko ready rakhiye.”

This is a visual demonstration only in Phase 1.

07 — Product Showcase

Heading:

Crafts That Deserve to Be Seen

Display 3–4 sample artisan products.

Each card:

Product image
Product name
Craft/category
Short information
Price/design placeholder

These are static demo products for now.

08 — Final CTA

Heading:

Your Craft Deserves to Be Seen.

Supporting text about bringing traditional craft to the digital marketplace.

CTA:

Start Your Journey

09 — Footer

Include:

ShilpMitra branding
Navigation
Features
Sahayak
About
Social/contact placeholders
Copyright
3. Non-Functional Requirements
Responsive

Must work properly on:

Desktop
Laptop
Tablet
Mobile
Performance
Optimized images
Avoid unnecessarily heavy animations
Lazy-load non-critical imagery where appropriate
Maintain smooth scrolling
Accessibility
Proper semantic HTML
Image alt text
Keyboard-accessible interactive elements
Sufficient text contrast
Visual

Design should maintain:

Warm artisan-oriented aesthetic
Cream/light background
Orange accent
Dark typography
Rounded cards
Premium whitespace
Organic/decorative shapes
4. Animation Requirements

Animations should make the page feel alive, not distracting.

Hero
Text entrance
Image fade/scale
Subtle floating decorative elements
Feature Cards
Scroll reveal
Hover elevation
Icon micro-animation
Journey
Sequential reveal
Connecting-line animation if visually appropriate
Sahayak
Conversation bubbles appearing sequentially
Subtle voice-wave animation
CTA
Subtle hover animation

Avoid:

Excessive bouncing
Constant movement
Heavy particle effects
Long loading animations
5. TRD — Technical Requirements Document
Framework

Next.js

Use the modern App Router architecture.

Language

TypeScript

Styling

Tailwind CSS

Animation

Motion for React / Framer Motion ecosystem

Icons

Lucide React

Images

Use:

next/image

where appropriate.

Fonts

Use Next.js font optimization:

next/font
6. Recommended Architecture
src/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── navbar/
│   ├── hero/
│   ├── features/
│   ├── about/
│   ├── journey/
│   ├── sahayak/
│   ├── products/
│   ├── cta/
│   └── footer/
│
├── data/
│
├── types/
│
├── lib/
│
└── public/
    └── images/

Components should be reusable wherever practical.

7. Frontend Scope
Included

✅ Static landing page
✅ Responsive design
✅ Navigation UI
✅ Buttons
✅ Hover states
✅ Scroll animations
✅ Sahayak visual simulation
✅ Product cards
✅ Mobile navigation UI
✅ Accessibility basics

Not included yet

❌ Authentication
❌ Database
❌ AI APIs
❌ Image-generation API
❌ Speech-to-text
❌ Text-to-speech
❌ E-commerce APIs
❌ Payment
❌ Real order management
❌ Real language switching backend

This keeps the first development sprint focused.

8. Acceptance Criteria

Landing page is considered complete when:

 All planned sections are implemented.
 Design follows the approved reference direction.
 Responsive layout works on desktop and mobile.
 Navigation is visually complete.
 CTA buttons have correct visual states.
 Animations are smooth and purposeful.
 Sahayak section clearly communicates its purpose.
 No section looks like an unrelated template.
 Images are optimized.
 No major console errors.
 Components are reasonably reusable.
 Code is organized according to the agreed architecture.
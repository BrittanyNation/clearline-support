# Clearline Support — Help Center for Clearline Invoicing

**Live site:** https://brittanynation.github.io/clearline-support/

A fully functional support center website for **Clearline**, a fictional simple invoicing tool for small businesses: search and browse twelve help articles written in plain words, read any article in full and mark it helpful, send a support ticket that gets a real reference number and can be tracked, replied to, resolved and closed, request a callback with a confirmed booking reference, and get instant automatic answers in the chat panel, which says plainly that it is automatic and not a person. Every interactive element works, with no dead buttons and no placeholder links.

This is an original portfolio concept by Brittany Nation. No affiliation with any real business is claimed. It supports applications for Customer Success Specialist, Patient Support Associate, Patient Experience Coordinator, Front End Developer, Junior Copywriter and Technical Author roles, because it combines a coded front end, real support copy, and task based help writing in one site. Design workflow: Sketch / Webflow for layout thinking, built with HTML, CSS and JavaScript.

## Course track: complete — combined-skills build

The daily projects followed Dr. Angela Yu's *Full-Stack Web Development Bootcamp* (Udemy) one skill at a time: live APIs + async JavaScript (Solstice Skies), Node.js + Express (Willow Bend Paddle Co.), databases + REST API design (Tinker Commons), authentication (Haven Desk Collective), and React (Saffron & Sage Kitchen, deepened by Fieldnotes Studio). With all five steps complete, this build combines the front-end patterns from across the course in plain JavaScript, with the code commented as study material:

- **Data-driven rendering** — the article shelf is one array of objects in `help.js`; cards, counts and the empty state are all built from data.
- **State + persistence** — tickets, helpful votes, callback bookings and letter signups are saved to localStorage on every change and restored on load.
- **Derived state** — the visible article list (topic + search + sort) and the visible ticket list (status + lookup search) are computed from state, never stored.
- **Validated forms** — the ticket form and callback form validate every field inline before generating a `CL-XXXXXX` or `CL-C-XXXXX` confirmation reference.
- **Honest simulation** — the chat panel labels itself as automatic answers matched from the help articles, and the ticket desk states that tickets live in the visitor's own browser on this static demo.

## What works on the site

- **Help Center** — 12 articles from data; topic chips (Getting Started / Billing / Invoices / Account), live search in two places, three sort orders, live result count and an honest empty state; a full article reader modal with numbered steps and a helpful vote that persists in localStorage; a live status band stamped with the visitor's own time.
- **Tickets** — validated new-ticket form (name, email, topic, priority, subject of 5+ characters, message of 20+ characters) ending in a confirmation with a generated `CL-XXXXXX` reference; ticket list with status filter chips and lookup by reference, email or subject; a conversation view where replies append to the thread, the first reply moves the ticket to In Progress with a support acknowledgement, and tickets can be marked Resolved or Closed.
- **Contact & FAQs** — callback request form with full validation ending in a `CL-C-XXXXX` booking reference; support hours table with today highlighted; six FAQ accordions; and a duplicate-aware product letter signup.
- **Chat panel (every page)** — a keyword-matching assistant that answers billing, password, invoice, export and human questions from the article content, with a typing pause, and labels itself automatic.

## Verified

42 automated DOM checks against the built files, all passed: 12 cards render from data, the Billing filter narrows 12 to 3 and All restores 12, search narrows correctly and the empty state shows, A to Z sort order, the article modal opens with steps and its vote persists and disables, the chat answers a billing question, an invalid ticket submit shows field errors, a valid ticket confirms with a `CL-XXXXXX` reference and persists, replies move the ticket to In Progress with a support acknowledgement, lookup by reference works and a miss shows the empty state, status filters work, Resolve and Close work, today is highlighted in the hours table, FAQ accordions switch, the callback form validates and confirms with a `CL-C-XXXXX` reference, and the letter signup succeeds and recognises a duplicate.

## Palette

Midnight slate `#202A3D`, signal blue `#2F6FED`, pale sky `#E8EEF7`, warm paper `#FFFBF2`, coral `#E85D4D`, amber `#E9A331`.

## Files

- `index.html` — help center with Open Graph tags
- `help.js` — article data, filtering/search/sort, article reader and votes, commented as study code
- `tickets.html` — ticket form and ticket tracker
- `tickets.js` — ticket state, validation, thread, replies and status changes, commented as study code
- `contact.html` — callback booking, hours, FAQs and letter signup
- `contact.js` — callback validation and confirmation, hours highlight, accordions, letter, commented as study code
- `chat.js` — shared automatic-answers chat panel, commented as study code
- `styles.css` — design system (midnight slate / signal blue / coral)
- `images/` — 8 real Pexels photographs (hero agent, support team, paperwork, keyboard, shop owner, colleagues, video call, calm workspace)
- `og-image.png` — branded social preview image, 1200×627

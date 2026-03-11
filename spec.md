# Rahul Coaching Classes

## Current State
New project — no existing code.

## Requested Changes (Diff)

### Add
- Home page with hero section, class grid (Class 1–12), announcements, and stats
- Study Materials page: browse/filter by class and subject, upload PDFs/docs
- Sample Papers page: browse/filter by class, subject, and year
- Admin panel (login-protected) to add/edit/delete materials, sample papers, and announcements
- Backend: data models for StudyMaterial, SamplePaper, Announcement; CRUD operations; authorization for admin

### Modify
- N/A

### Remove
- N/A

## Implementation Plan
1. Select authorization component for admin login
2. Generate Motoko backend with StudyMaterial, SamplePaper, Announcement entities and CRUD APIs
3. Build frontend: Home, Study Materials, Sample Papers, Admin pages with routing and filters

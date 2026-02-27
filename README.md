🚀 Jobby App – Job Search & Filter Platform

A responsive Job Search Application built using React.js that allows users to explore jobs, apply advanced filters, and view detailed job descriptions with authentication-based routing.

🔗 Live Application:
https://honeykumar8.github.io/JobbyApp

🔗 GitHub Repository:
https://github.com/HoneyKumar8/JobbyApp

📌 Project Overview

The goal of this project was to build a structured job listing platform where users can:

Authenticate securely

Browse jobs dynamically from API

Apply multiple filters simultaneously

View detailed job information

Experience clean routing & protected navigation

The focus was on clean state management, filter logic, and API-driven UI rendering.

🛠 Tech Stack

Frontend:

React.js (Functional Components + Hooks)

React Router

CSS (Custom Styling)

React Icons

Authentication:

JWT (via API)

Protected Routes

API Integration:

REST API calls with Fetch

Query parameter handling

Conditional rendering based on API status

Deployment:

GitHub Pages

✨ Key Features

• Login authentication with JWT
• Protected routes (only accessible after login)
• Dynamic job listing from API
• Filter by:

Employment Type

Salary Range

Location
• Search functionality with query parameters
• Combined filter logic (multiple filters work together)
• Sticky sidebar filters
• Sticky header across routes
• Job details page with:

Company information

Skills section

Life at company section

Similar jobs section
• Loading & failure state handling
• Responsive UI

🧠 Technical Highlights

Implemented dynamic query parameter building:
employment_type, minimum_package, search, location

Managed complex filter state:
Multiple checkbox selections + radio inputs + search trigger

Prevented unnecessary API calls by controlling useEffect dependencies

Handled edge cases like:

Empty job results

API failures

Authentication expiry

📂 Project Structure

components/

Header

Login

Jobs

FiltersGroup

JobsList

JobCard

JobItemDetails

ProtectedRoute

NotFound

🚀 Future Improvements

• Save jobs feature
• User profile dashboard
• Apply job functionality
• Pagination support
• Better UI enhancements

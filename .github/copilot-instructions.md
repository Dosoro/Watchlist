# MERN Stack Watchlist Application - Development Guide

## Context

I'm building a movie/TV show watchlist application using the MERN stack (MongoDB, Express, React, Node.js). I have basic MERN experience from a previous project and want to level up my skills with this more complex application.

## Tech Stack Requirements

- **Frontend**: React with modern hooks (useState, useEffect, useContext)
- **Backend**: Node.js + Express REST API
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication
- **External API**: The Movie Database (TMDB) API for movie/TV data
- **Best Practices**: Follow industry standards for folder structure, error handling, security, and code organization

## Core Features to Implement

### 1. Authentication System

- User registration with email/password
- User login with JWT token generation
- Protected routes (both frontend and backend)
- Password hashing with bcrypt
- Token validation middleware
- Refresh token mechanism (optional but recommended)
- Logout functionality (token invalidation)

### 2. Movie/TV Search

- Proxy TMDB API requests through backend (never expose API keys on frontend)
- Search endpoint that queries TMDB
- Return: title, poster, release date, overview, genres
- Implement proper error handling for API failures
- Add rate limiting to prevent abuse
- Cache frequently searched results (consider Redis or in-memory cache)

### 3. Personal Watchlist CRUD

- **Create**: Add movies/TV shows from search results
- **Read**: Fetch user's watchlist items (with pagination)
- **Update**: Modify rating, thoughts, watched status
- **Delete**: Remove items from watchlist
- User can only access/modify their own watchlist items
- Prevent duplicate additions (same TMDB ID for same user)
- Soft delete option (mark as deleted instead of removing)

### 4. Watchlist Item Schema

Each watchlist item should store:

- TMDB ID (for reference)
- Media type (movie or TV show)
- User rating (1-10 scale or similar)
- Personal thoughts/notes (text field)
- Watched/Unwatched status (boolean)
- Date added (timestamp)
- Date watched (timestamp, nullable)
- Poster URL (from TMDB)
- Title (from TMDB)
- Release/first air date (from TMDB)
- Streaming provider info (if available from TMDB)
- For TV shows: episode tracking, "still airing" status, next episode date
- Priority level (optional: high/medium/low)

### 5. Additional Features

- Display streaming providers with direct links (use TMDB watch providers endpoint)
- For TV shows: indicate if series is ongoing vs completed
- Show next episode air date for ongoing series
- Sort/filter watchlist by various criteria (date added, rating, watched status, media type)
- Search within user's own watchlist
- Export watchlist to JSON/CSV (bonus feature)

## Technical Guidelines to Follow

### Backend Architecture

- Implement RESTful API design patterns
- Use Express Router for route organization
- Separate concerns: routes → controllers → services → models
- Implement proper error handling middleware (centralized error handler)
- Use environment variables for sensitive data (.env file)
- Add request validation using express-validator or Joi
- Implement CORS properly for frontend communication
- Add request logging (morgan or similar)
- **Create a proper folder structure from the start:**
  ```
  backend/
  ├── config/         # DB connection, env config
  ├── controllers/    # Request handlers
  ├── middleware/     # Auth, validation, error handling
  ├── models/         # Mongoose schemas
  ├── routes/         # API endpoints
  ├── services/       # Business logic (TMDB API calls, etc.)
  ├── utils/          # Helper functions
  ├── .env
  └── server.js       # Entry point
  ```

### Frontend Architecture

- Component-based architecture with proper separation
- Use Context API or state management for auth state
- Implement protected routes with React Router
- Create reusable components (SearchBar, WatchlistCard, Modal, etc.)
- Handle loading states and errors gracefully
- Use axios for API calls with interceptors for auth tokens
- Implement proper form validation
- Responsive design with CSS modules or styled-components
- **Create a proper folder structure from the start:**
  ```
  frontend/
  ├── public/
  ├── src/
  │   ├── api/           # API service layer
  │   ├── components/    # Reusable UI components
  │   ├── context/       # React Context (auth, etc.)
  │   ├── hooks/         # Custom hooks
  │   ├── pages/         # Page components
  │   ├── styles/        # Global styles
  │   ├── utils/         # Helper functions
  │   ├── App.js
  │   └── index.js
  ```

### Database Design

- Create proper Mongoose schemas with validation
- Index frequently queried fields (userId, tmdbId)
- Implement compound indexes to prevent duplicates
- Use proper relationships (User has many WatchlistItems)
- Add timestamps (createdAt, updatedAt)
- **Design schemas before implementing routes**
- Consider data that will be queried together
- Use virtual properties for computed fields

### Version Control & Git Standards (CRITICAL)

- **Initialize Immediately**: `git init` must be the first step.
- **Ignore Files**: Create a `.gitignore` immediately to exclude `node_modules`, `.env`, and build artifacts.
- **Commit Frequency**: Prompt me to commit after every completed step/feature.
- **Commit Message Convention**: Use strict **Conventional Commits**:
  - `feat: add user registration logic`
  - `fix: correct typo in mongoose schema`
  - `chore: update dependency versions`
  - `docs: update readme instructions`
  - `refactor: clean up auth middleware`

### Security Best Practices

- Never commit .env files or API keys (.gitignore them)
- Validate and sanitize all user inputs (prevent injection attacks)
- Implement rate limiting on API endpoints (express-rate-limit)
- Use helmet.js for HTTP headers security
- Implement CSRF protection if needed
- Hash passwords with bcrypt (10+ salt rounds)
- Set proper JWT expiration times (access: 15min, refresh: 7days)
- Store JWTs securely on frontend (httpOnly cookies preferred over localStorage)
- Implement proper CORS configuration (don't use "\*" in production)
- Add input length limits to prevent DOS attacks

### Performance Considerations

- Implement pagination for watchlist endpoints (don't return 500 items at once)
- Use select() in Mongoose to only fetch needed fields
- Cache TMDB API responses (frequently searched movies)
- Lazy load images on frontend
- Debounce search inputs (wait 300ms before API call)
- Use indexes for faster database queries
- Consider implementing infinite scroll instead of traditional pagination

## Code Quality Standards

- Use ESLint for code linting (set it up early)
- Follow consistent naming conventions (camelCase for variables, PascalCase for components)
- Write DRY (Don't Repeat Yourself) code
- Add meaningful comments for complex logic only
- Use async/await instead of promise chains
- Implement proper error handling with try-catch blocks
- Create utility functions for reusable logic
- **Follow single responsibility principle** - One function does one thing
- **Keep functions small** - If it doesn't fit on screen, break it down
- **Name things clearly** - `getUserWatchlist` not `get` or `data`
- **Avoid magic numbers** - Use constants (e.g., `const MAX_RATING = 10`)
- **Handle edge cases** - Empty arrays, null values, missing data
- **Return early** - Avoid deep nesting with guard clauses

## Common Pitfalls to Avoid (Learn from Others' Mistakes)

### Backend Mistakes:

- ❌ Not validating user input (leads to security issues)
- ❌ Exposing error details to frontend (leaks system info)
- ❌ Not using middleware for auth (repeating code everywhere)
- ❌ Hardcoding values instead of using environment variables
- ❌ Not handling async errors properly (crashes your server)
- ❌ Forgetting to hash passwords (catastrophic security failure)
- ❌ Not implementing rate limiting (API abuse)
- ❌ Using `SELECT *` in queries (performance hit)
- ❌ Not indexing database fields (slow queries as data grows)
- ❌ Storing JWT in database (defeats the purpose)

### Frontend Mistakes:

- ❌ Storing sensitive data in localStorage (XSS vulnerability)
- ❌ Not handling loading states (bad UX)
- ❌ Making API calls in render (causes infinite loops)
- ❌ Not cleaning up useEffect (memory leaks)
- ❌ Prop drilling hell (use Context API)
- ❌ Not validating forms client-side (bad UX)
- ❌ Trusting backend responses blindly (no error handling)
- ❌ Not debouncing search inputs (API spam)
- ❌ Loading all images at once (performance nightmare)
- ❌ Mixing business logic with UI components (hard to maintain)

### Database Mistakes:

- ❌ Not using schemas/validation (garbage data gets in)
- ❌ Forgetting to add indexes (queries get slower as data grows)
- ❌ Not preventing duplicates at DB level (race conditions)
- ❌ Using embedded documents incorrectly (breaks as data grows)
- ❌ Not considering query patterns when designing schema
- ❌ Storing computed values instead of calculating them (data inconsistency)

### General Architecture Mistakes:

- ❌ Building everything at once (overwhelming, hard to debug)
- ❌ Not separating concerns (mixing database, business logic, routes)
- ❌ Skipping error handling "for now" (it never gets added)
- ❌ Not testing authentication thoroughly (security holes)
- ❌ Assuming happy path only (real world is messy)
- ❌ Not considering mobile users (desktop-only design)
- ❌ Premature optimization (optimize when you have actual bottlenecks)

## When Assisting Me - CRITICAL INSTRUCTIONS

### Pacing and Structure

1. **ONE STEP AT A TIME** - Break everything into small, digestible steps
2. **WAIT FOR MY CONFIRMATION** - After each step, ask: "Have you completed this? Ready to move on?"
3. **DO NOT proceed to the next step** until I explicitly confirm I'm ready
4. **DO NOT overwhelm me** with multiple concepts or steps at once
5. **Keep explanations focused** - explain ONE thing thoroughly before moving to the next

### How to Present Information

1. **Provide guidance, not complete solutions** - explain the approach and key concepts
2. **Suggest industry-standard patterns** - show me the professional way to implement features
3. **Explain trade-offs** - when there are multiple approaches, explain pros/cons
4. **Point out potential issues** - security concerns, performance issues, edge cases
5. **Reference documentation** - point me to relevant docs for deeper understanding
6. **Code snippets should be examples** - not full implementations, leave room for me to think

### Code Presentation Rules - FOLLOW STRICTLY

1. **MINIMAL COMMENTS IN CODE** - Keep code clean and production-ready

   - Only add comments for complex logic that isn't self-explanatory
   - No obvious comments like `// Import express`
   - Prefer self-documenting code with clear variable/function names

2. **REAL-TIME IMPLEMENTATION ONLY (NO "FUTURE CODE")**
   - **Do not** insert placeholders for features we haven't reached yet (e.g., `// Auth middleware goes here later` or `// TODO: Add validation`).
   - If a feature is not being built in the _current_ step, the code for it should not exist.
   - The code provided must work _as is_ for the current step. We will refactor/add to it when we reach that specific phase.
3. **DETAILED EXPLANATION AFTER CODE** - After every code block, provide:

   - Line-by-line breakdown of what each line does
   - WHY each line is necessary (the reasoning)
   - HOW it works (the mechanism/technical detail)
   - What would happen if that line was removed or changed

4. **Explanation Format:**

```
[CODE BLOCK - CLEAN, MINIMAL COMMENTS]

---

**Line-by-Line Breakdown:**

Line X: `const express = require('express');`
- WHAT: Imports the Express framework
- WHY: We need Express to create our web server and handle HTTP requests
- HOW: Node's require() function loads the express module from node_modules
- Impact: Without this, we can't create routes or middleware

Line Y: `const app = express();`
- WHAT: Creates an Express application instance
- WHY: This object gives us access to all Express methods (get, post, use, etc.)
- HOW: Calling express() as a function returns a configured Express app object
- Impact: This is the core of our backend - all routes and middleware attach to this

[Continue for every significant line...]
```

4. **Example of What NOT to Do:**

```javascript
// Import express - DON'T ADD THIS COMMENT
const express = require("express");

// Create app - DON'T ADD THIS COMMENT
const app = express();

// Listen on port 5000 - DON'T ADD THIS COMMENT
app.listen(5000);
```

5. **Example of What TO Do:**

```javascript
const express = require("express");
const app = express();

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
```

**Then provide explanation:**

Line 1: `const express = require('express');`

- WHAT: Imports Express framework
- WHY: Foundation for building our REST API
- HOW: Node's CommonJS require loads the module
- Impact: No Express = no web server

[etc...]

6. **Comment Guidelines:**

- ✅ DO comment: Complex algorithms, business logic, non-obvious workarounds
- ✅ DO comment: Security-critical sections, regex patterns, magic numbers
- ❌ DON'T comment: Imports, obvious declarations, self-explanatory code
- ❌ DON'T comment: Every single line like tutorial code

### Step Format (Follow This Every Time)

```
**Current Step: [Step Name]**

**What we're doing:** [Brief explanation]

**Why it matters:** [Context and purpose]

**How to implement:** [Specific guidance]

**Code example:** [Small example if needed]

**Common mistakes to avoid:** [Pitfalls]

**Checkpoint Question:** Have you completed this step? Any questions before we move on?
```

### Example of Good Pacing:

✅ "Let's set up your Express server structure. First, create your server.js file with basic Express setup. Once you've done that and can run the server, confirm and we'll add authentication middleware."

❌ "Set up Express, add authentication middleware, create your user model, implement JWT tokens, set up bcrypt hashing, create login and register endpoints, add validation middleware, and configure CORS."

### Never Do This:

- Don't dump 10 steps at once
- Don't move forward without my confirmation
- Don't assume I've completed previous steps
- Don't skip explanations because "it's simple"
- Don't provide massive code blocks without breaking them down

### Always Do This:

- Explain the current step thoroughly
- Wait for my "ready" signal
- Check my understanding with questions
- Celebrate progress ("Nice! Server is running. Now let's add...")
- Recap what we've accomplished before moving forward

## Questions to Address as We Build

- How should I structure my API endpoints? (RESTful conventions)
- What's the best way to handle authentication state in React?
- How do I prevent duplicate watchlist entries at the database level?
- Should I cache TMDB API responses? If so, how?
- How do I handle pagination for large watchlists?
- What's the best way to handle TMDB API rate limits?
- How should I structure my frontend folder architecture?
- What testing approach should I use (unit, integration, e2e)?
- Where should JWT tokens be stored on the frontend? (localStorage vs httpOnly cookies)
- How do I handle token refresh without disrupting user experience?
- Should I use TypeScript or stick with JavaScript?
- How do I handle image optimization for movie posters?
- What's the best way to handle form validation (client vs server)?
- Should I implement real-time features (WebSockets) for any functionality?

## Project Planning & Development Flow

### Phase 1: Foundation (Start Here)

1. **Initialize Git Repository** (Run `git init` and create `.gitignore` FIRST)
2. Project setup and folder structure (both frontend/backend)
3. Environment configuration (.env, .gitignore)
4. Database connection setup
5. Basic Express server with middleware (CORS, helmet, morgan)
6. Test that everything runs before moving forward

### Phase 2: Authentication (Build This Second)

1. User model with Mongoose schema
2. Password hashing with bcrypt
3. JWT token generation and validation
4. Auth routes (register, login, logout)
5. Auth middleware for protected routes
6. Test authentication thoroughly before moving on

### Phase 3: TMDB Integration (Third Priority)

1. TMDB API service layer
2. Search endpoint (proxy through backend)
3. Fetch movie/TV details endpoint
4. Error handling for API failures
5. Optional: Basic caching implementation
6. Test TMDB integration works

### Phase 4: Watchlist CRUD (Core Feature)

1. Watchlist item model with proper schema
2. Create watchlist item endpoint
3. Get user's watchlist (with pagination)
4. Update watchlist item endpoint
5. Delete watchlist item endpoint
6. Duplicate prevention logic
7. Test all CRUD operations

### Phase 5: Frontend Implementation

1. React app setup with routing
2. Auth context and protected routes
3. Login/Register pages
4. Search page with TMDB integration
5. Watchlist page with CRUD UI
6. Individual item detail/edit components
7. Loading states and error handling

### Phase 6: Polish & Features

1. Sorting and filtering
2. Search within watchlist
3. Streaming provider integration
4. TV show tracking features
5. Responsive design improvements
6. Performance optimizations

### Phase 7: Testing & Deployment

1. Write tests (start with critical paths)
2. Fix bugs discovered during testing
3. Deployment preparation
4. Environment-specific configs
5. Deploy backend and frontend

### Development Principles to Follow Throughout:

- **Test each phase before moving to the next** - Don't build on broken foundation
- **Commit frequently with clear messages** - You'll thank yourself later
- **One feature at a time** - Finish auth completely before starting watchlist
- **Mobile-first if doing responsive** - Easier to scale up than down
- **Handle errors from day one** - Don't leave it for later
- **Document weird decisions** - Future you will forget why you did something

## Success Criteria

- Clean, maintainable code following MERN best practices
- Secure authentication implementation
- Efficient API design with proper error handling
- Responsive and user-friendly frontend
- No duplicate watchlist entries
- Proper separation of concerns across all layers
- Code that could be shown in a portfolio or interview

---

**Remember**: Guide me through the process, suggest best practices, and help me understand WHY certain approaches are better - don't just give me the solution. I want to learn and improve my MERN skills.

## Critical Reminders for the Agent

### Before Starting Any Implementation:

1. **Confirm I understand the previous step** - Don't assume
2. **Explain the "why" before the "how"** - Context matters
3. **Show me the wrong way first** - Then explain why it's wrong
4. **Highlight what could go wrong** - Edge cases, security issues, performance problems
5. **Connect to industry standards** - "This is how companies like X do it because..."

### During Implementation:

1. **Stop me if I'm about to make a mistake** - Don't let me proceed with bad patterns
2. **Explain trade-offs when choices exist** - There's rarely one "correct" way
3. **Point out technical debt early** - "This works now but will cause problems when..."
4. **Celebrate progress** - Acknowledge when something is done right
5. **Keep complexity appropriate to current phase** - Don't over-engineer early features
6. **Enforce Version Control** - Remind me to commit after every successful step.

### After Each Implementation:

1. **Review what we built and why it matters**
2. **Explain how it connects to other parts of the system**
3. **Discuss what we'd do differently in production** (if anything)
4. **Suggest optional improvements** - But don't require them
5. **Confirm understanding before moving forward**

### Red Flags to Watch For:

- If I'm copying code without understanding it - **STOP ME**
- If I'm skipping error handling - **CALL IT OUT**
- If I'm about to commit sensitive data - **WARN IMMEDIATELY**
- If I'm creating security vulnerabilities - **EXPLAIN THE RISK**
- If my code is becoming spaghetti - **SUGGEST REFACTORING**
- If I'm optimizing prematurely - **REDIRECT TO BASICS**
- If I'm asking for "future code" or placeholders - **REFUSE AND EXPLAIN WHY WE BUILD REAL-TIME ONLY**

### Ultimate Goal:

By the end of this project, I should be able to:

- Build a MERN app from scratch without following a tutorial
- Explain every technical decision I made and why
- Identify security issues in code
- Structure a production-ready application
- Debug issues independently
- Apply these patterns to future projects

**This is a learning project, not a race to finish. Quality understanding > speed.**

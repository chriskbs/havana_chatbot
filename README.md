
# School Chatbot Project
A web-based chatbot that simulates a prospective student interacting with a school’s website.
The bot can answer FAQs, escalate to a human, or schedule a follow-up call.
An admin dashboard is provided for monitoring and intervention.

## Timeline

- **Preparation (schema design + realtime learning):** ~1 hour  
- **Start coding:** Sat, 27 Sept @ 2:30 PM  
- **Core implementation (Vercel + Supabase setup, features):** Finished by 5:30 PM  
- **Total coding time (excluding docs/comments):** ~4 hours  

**After dinner break**  
- 6:15 PM → resumed for documentation & code commenting  
- 7:30 PM → finished documentation pass  

# Features

## Student-facing chat page
💬 Ask simple questions about the school (FAQs)
👨‍🏫 Escalate to a human if needed
📞 Book a follow-up call with an admin

## Admin dashboard
📊 View all chat sessions and their statuses
🛠 Intervene in a chat if necessary
✅ No authentication required (for demo simplicity)

# Tech Stack
Next.js (React + API routes) – frontend + backend
Supabase – database + realtime API
OpenAI API – intent detection, FAQ answering, booking info extraction
TailwindCSS – styling

# Architecture & Design Choices

### Deployment with Vercel:
Used Vercel for rapid development with a variety of next.js templates to choose from.

Project first initialized using a vercel template (https://github.com/vercel-labs/ai-sdk-preview-attachments)

### Supabase as DB: 
Chose Supabase (Postgres + Realtime API) for chat logging and session state.

Previously worked with Supabase, but had to spend ~30 minutes learning the Realtime API for 2-way chat.

### OpenAI structured outputs: 
Used to classify user intents (info, admin, admin_now, book_call) and answer relevant questions.

This keeps bot logic simple and predictable for the assignment

### Bot logic:
The chatbot follows a two-tier logic model combining intent classification with FAQ retrieval / escalation handling.

Overall flow:
1. classfiy user intent into one of the following categories:
    - ask information
    - ask for admin
    - book call
    - ask for admin now
    - general/small talk
    - unknown
2. using classified intent bot will act accordingly
    - Information request → Search FAQ for relevant information. If no answer is found, escalate to an admin.
    - Admin request → Ask if the user would like to book a call or connect with an admin now.
    - Book a call → Collect phone number and preferred contact time.
    - Admin now → Notify the user to wait while an admin is contacted.
    - General queries (e.g. greetings, introductions) → Respond as a helpful attendant for the university.
    - Fallback → If unsure, ask if the user would like to contact an admin (book later / connect now).

### Admin flow:
The admin dashboard is designed to support both live chat intervention and call bookings, with state management handled via flags in the chat_sessions table (is_admin, escalation_pending, book_call)

Overall design flow
1. Live chat
    - Table with current live chats (active within past 5 minutes) for admins to intervere (enter chat and message manually)
    - Chat sessions that require assistance (escalation_pending) will be flaged yellow and a red escalation_pending indicator
    - Once an admin sends a message, the chat is flagged as admin handled to prevent multiple admins intervening in the same session.
2. Booked calls
    - Table with all chats that booked a call, with respective phone numbers and schedule timing
    - amdins can click a button to call
    - admins are also able to open chat history for additional context

# Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/chriskbs/havana_chatbot
cd havana_chatbot
```

### 2. Install Dependencies
```bash
pnpm install
```
### 3. Set up environment variables 

Set the required environment variables as shown in the `.env.example` file, but in a new file called `.env`.
#### Supabase
SUPABASE_POSTGRES_NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_POSTGRES_NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
#### OpenAI
OPENAI_API_KEY=your_openai_api_key

### 4. Launch development server
```bash
pnpm run dev
```

# Known Limitations
- Optimized for desktop and light mode only.
- Mobile responsiveness and dark mode styling are not yet fully implemented.
- The initial assistant greeting (“Hi, I’m May, your assistant...”) may not appear on the very first load, but refreshing the page and starting a new session resolves it.

# Further improvements

1. Booking Integration
- Connect the chatbot’s booking flow to external services such as Google Calendar or Calendly, so that scheduled calls sync automatically with staff availability.

2. Dedicated Booking Table
- Introduce a normalized database table for bookings linked to chat sessions, allowing users to make and manage multiple bookings across different conversations.

3. Admin Dashboard Enhancements
- Improve the UI/UX for admins, including a collapsible/auto-closing sidebar and smoother navigation between active chats.

4. Improved Escalation Flow
-  Enable real-time notifications (e.g. email or Slack integration) for admins when a chat requires human intervention. 
- Could be done with realtime subscription for the table to listen to updates (similar to live chat)

5. Knowledge Base Expansion
- Connect the chatbot to a structured FAQ or CMS for more scalable and easily updatable answers. 
- Need to add more information to FAQ. Currently limited to sample seeded information from ChatGPT. Could not answer information such as how many degrees provided as information is not in FAQ database.

6. Performance Optimizations
- Optimize API calls and caching to reduce response times for a smoother chat experience.

7. Responsive Design & Theming
- Extend support for mobile layouts and dark mode to improve accessibility and user experience across devices.
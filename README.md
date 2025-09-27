
# School Chatbot Project
A web-based chatbot that simulates a prospective student interacting with a school’s website.
The bot can answer FAQs, escalate to a human, or schedule a follow-up call.
An admin dashboard is provided for monitoring and intervention.

## Timeline

- **Preparation (schema design + realtime learning):** ~1 hour  
- **Start coding:** Sat, 27 Sept @ 2:30 PM  
- **Core implementation (Vercel + Supabase setup, features):** Finished by 5:30 PM  
- **Total coding time (excluding docs/comments):** ~4 hours  

**After break**  
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

### Used Vercel for Deployment:
Easy to set up vercel project with a variety of next.js templates to choose from to speed up development.

Project first initialized using a vercel template (https://github.com/vercel-labs/ai-sdk-preview-attachments)

### Supabase as DB: 
Easy to set up Postgres with Realtime API, perfect for chat logging and session state. Had a wealth of experience using Supabase Postgres for my own projects and was aware of Realtime as a hook to implement 2-way chat.

Initally had to spend 30 minutes learning Realtime API as previous chatbots I created were only 1-way

### OpenAI structured outputs: 
Used to classify user intents (info, admin, admin_now, book_call). Keeps bot logic simple and predictable.

### Two-tier bot logic:
Intent classification (what type of request is this?)
FAQ retrieval / escalation handling

### Minimal admin flow:
Escalation is represented by flags in the chat_sessions table (is_admin, escalation_pending, book_call).

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


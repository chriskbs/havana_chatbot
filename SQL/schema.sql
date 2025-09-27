/* schema.sql

schema for the project backend postgresql
tables are chat_sessions, chat_messages, categories, subcategories, faq_items

future implementation could include:
seperate booking table that references chat_sessions
user registration

currenlty for simplicity I combined the booking information into chat_session itself

*/

-- enum types
CREATE TYPE chat_role AS ENUM ('user', 'assistant', 'admin');
CREATE TYPE call_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');


-- chat session table
create table chat_sessions (
  id uuid primary key default gen_random_uuid(),
  is_online boolean default true,
  is_admin boolean default false,
  escalation_pending boolean default false,
  booked_call timestamptz default null,
  phone_number text,
  call_status call_status default 'pending' 
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- chat message table
create table chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references chat_sessions(id) on delete cascade,
  role chat_role,
  content text not null,
  created_at timestamptz default now()
);

-- categories table, currently not in use in implementation
create table categories (
  id serial primary key,
  name text not null
);

-- subcategories table
create table subcategories (
  id serial primary key,
  category_id int references categories(id),
  name text not null
);

-- faq item tables, list of question and answers for different subcategories
create table faq_items (
  id serial primary key,
  subcategory_id int references subcategories(id),
  question text not null,
  answer text not null,
  created_at timestamptz default now()
);

create index messages_chat_id_created_at_idx on chat_messages(session_id, created_at);


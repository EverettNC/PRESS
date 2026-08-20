-- Christman Command — single-operator desk. No accounts. One owner.
create table if not exists desk_notes (
  id         serial primary key,
  body       text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists library_items (
  id         text primary key,
  platform   text not null,
  title      text not null,
  body       text not null,
  url        text,
  posted_at  text,
  views      int,
  likes      int,
  reposts    int,
  diagnosis  text,
  source     text not null default 'seed',
  created_at timestamptz not null default now()
);

create table if not exists drafts (
  id         serial primary key,
  kind       text not null,
  title      text not null,
  body       text not null,
  source_id  text,
  status     text not null default 'ready',
  created_at timestamptz not null default now()
);

create table if not exists calendar_items (
  id         serial primary key,
  day        text not null,
  slot       text not null,
  title      text not null,
  body       text not null,
  channel    text not null,
  status     text not null default 'planned',
  created_at timestamptz not null default now()
);

create table if not exists chat_messages (
  id         serial primary key,
  role       text not null,
  content    text not null,
  created_at timestamptz not null default now()
);

create table if not exists recon_reports (
  id         serial primary key,
  summary    text not null,
  created_at timestamptz not null default now()
);

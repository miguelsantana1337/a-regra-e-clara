create index if not exists idx_events_session_name_created_at
  on public.events(session_id, name, created_at desc);

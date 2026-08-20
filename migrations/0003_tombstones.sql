-- Owner can delete anything. Seed must not resurrect it.
create table if not exists tombstones (
  kind     text not null,
  item_key text not null,
  primary key (kind, item_key)
);

-- we don't know how to generate root <with-no-name> (class Root) :(

comment on database postgres is 'default administrative connection database';

create table _prisma_migrations
(
    id                  varchar(36)                            not null
        primary key,
    checksum            varchar(64)                            not null,
    finished_at         timestamp with time zone,
    migration_name      varchar(255)                           not null,
    logs                text,
    rolled_back_at      timestamp with time zone,
    started_at          timestamp with time zone default now() not null,
    applied_steps_count integer                  default 0     not null
);

alter table _prisma_migrations
    owner to postgres;

create table "User"
(
    id   serial
        primary key,
    name text not null
);

alter table "User"
    owner to postgres;

create unique index "User_name_key"
    on "User" (name);

create table "Book"
(
    id   serial
        primary key,
    name text not null
);

alter table "Book"
    owner to postgres;

create unique index "Book_name_key"
    on "Book" (name);

create table "Borrow"
(
    id           serial
        primary key,
    "borrowDate" timestamp(3) default CURRENT_TIMESTAMP not null,
    "returnDate" timestamp(3),
    "userId"     integer                                not null
        references "User"
            on update cascade on delete restrict,
    "bookId"     integer                                not null
        references "Book"
            on update cascade on delete restrict,
    score        integer
);

alter table "Borrow"
    owner to postgres;


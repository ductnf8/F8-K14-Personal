drop table category cascade;
create table if not exists category
(
    id          bigserial primary key,
    name        text,
    created_at  timestamp with time zone default now(),
    created_by  bigint,
    modified_at timestamp with time zone,
    modified_by bigint,
    deleted_at  timestamp with time zone,
    deleted_by  bigint,
    active      bool                     default true
);

create unique index idx_category_id_actove on category (id, active);


drop table product cascade;
create table if not exists product
(
    id          bigserial primary key,
    category_id bigint references category (id, active),
    name        text,
    price       int,
    created_at  timestamp with time zone default now(),
    created_by  bigint,
    modified_at timestamp with time zone,
    modified_by bigint,
    deleted_at  timestamp with time zone,
    deleted_by  bigint,
    active      bool                     default true
);

alter table product
    add constraint pk_product_id_category_id foreign key (category_id) references category (id);

insert into category(name)
values ('laptop'),
       ('phone');

insert into product(name, category_id)
values ('lenovo', 1),
       ('asus', 2);

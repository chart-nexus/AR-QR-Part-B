create table file
(
    id              bigint unsigned auto_increment
        primary key,
    folder_location varchar(255)         null,
    file_path       varchar(255)         null,
    need_verify     tinyint(1) default 1 null,
    scoring_done    tinyint(1) default 0 null,
    page            int        default 0 null,
    constraint file_id_uindex
        unique (id),
    constraint id
        unique (id)
);

create table keyword
(
    id              int auto_increment
        primary key,
    sheet_config_id int          null,
    score           int          null,
    word            varchar(255) null
);

create table page
(
    id          int auto_increment
        primary key,
    file_id     int           null,
    file_path   varchar(255)  null,
    page        int           null,
    orientation int           null,
    score       int default 0 null,
    sheet       varchar(255)  null,
    done_by     varchar(255)  null,
    status      varchar(255)  null
);

create table sheet_config
(
    id         int auto_increment
        primary key,
    sheet_name varchar(255) null,
    threshold  int          null
);


insert ignore into sheet_config
  (id, sheet_name, threshold)
VALUES
  (0, "Cash Flow", 100);

insert ignore into sheet_config
  (id, sheet_name, threshold)
VALUES
  (1, "Balance Sheet", 100);

insert ignore into sheet_config
  (id, sheet_name, threshold)
VALUES
  (2, "Income Statement", 100);
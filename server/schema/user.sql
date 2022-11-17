CREATE TABLE IF NOT EXISTS public."user"
(
    id VARCHAR(50)  NOT NULL,
    email VARCHAR(50)  NOT NULL,
    first_name VARCHAR(50)  NOT NULL,
    last_name VARCHAR(50)  NOT NULL,
    facility integer NOT NULL,
    CONSTRAINT user_pkey PRIMARY KEY (email),
    CONSTRAINT user_id_key UNIQUE (id)
)
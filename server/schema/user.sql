-- Table: public.user

-- DROP TABLE IF EXISTS public."user";

CREATE TABLE IF NOT EXISTS public."user"
(
    id character varying(50) COLLATE pg_catalog."default" NOT NULL DEFAULT nextval('id_seq'::regclass),
    email character varying(50) COLLATE pg_catalog."default" NOT NULL,
    first_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    role character varying(50) COLLATE pg_catalog."default" NOT NULL,
    registration_id uuid,
    uid character varying(50) COLLATE pg_catalog."default" DEFAULT NULL::character varying,
    account_type character varying(50) COLLATE pg_catalog."default",
    image text COLLATE pg_catalog."default",
    CONSTRAINT user_pkey PRIMARY KEY (id),
    CONSTRAINT user_id_key UNIQUE (id),
    CONSTRAINT check_first_name_non_empty CHECK (first_name::text <> ''::text),
    CONSTRAINT check_last_name_non_empty CHECK (last_name::text <> ''::text),
    CONSTRAINT check_role_non_empty CHECK (role::text <> ''::text),
    CONSTRAINT check_account_type_non_empty CHECK (account_type::text <> ''::text)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."user"
    OWNER to ctc;
-- Table: public.facility_contacts

-- DROP TABLE IF EXISTS public.facility_contacts;

CREATE TABLE IF NOT EXISTS public.facility_contacts
(
    facility_id integer NOT NULL,
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    title character varying(50) COLLATE pg_catalog."default" NOT NULL,
    phone_number character varying(50) COLLATE pg_catalog."default" NOT NULL,
    email_address character varying(50) COLLATE pg_catalog."default" NOT NULL,
    id integer NOT NULL DEFAULT nextval('facility_contacts_id_seq'::regclass),
    CONSTRAINT facility_contacts_pkey PRIMARY KEY (id),
    CONSTRAINT facility_id FOREIGN KEY (facility_id)
        REFERENCES public.facility (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.facility_contacts
    OWNER to ctc;
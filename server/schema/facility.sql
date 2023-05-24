-- Table: public.facility

-- DROP TABLE IF EXISTS public.facility;

CREATE TABLE IF NOT EXISTS public.facility
(
    id integer NOT NULL DEFAULT nextval('facility_facility_id_seq'::regclass),
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    address_line character varying(150) COLLATE pg_catalog."default" NOT NULL,
    description character varying(500) COLLATE pg_catalog."default" NOT NULL,
    image text COLLATE pg_catalog."default",
    CONSTRAINT facility_pkey PRIMARY KEY (id),
    CONSTRAINT check_name_non_empty CHECK (name::text <> ''::text),
    CONSTRAINT check_address_line_non_empty CHECK (address_line::text <> ''::text)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.facility
    OWNER to ctc;
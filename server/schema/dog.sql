-- Table: public.dog

-- DROP TABLE IF EXISTS public.dog;

CREATE TABLE IF NOT EXISTS public.dog
(
    dogid integer NOT NULL DEFAULT nextval('dog_dog_id_seq'::regclass),
    facilityid integer NOT NULL,
    groupnum integer NOT NULL,
    graddate date NOT NULL,
    dogname character varying(50) COLLATE pg_catalog."default" NOT NULL,
    age integer NOT NULL,
    shelter character varying(50) COLLATE pg_catalog."default" NOT NULL,
    breed character varying(50) COLLATE pg_catalog."default" NOT NULL,
    chiptype character varying(50) COLLATE pg_catalog."default" NOT NULL,
    chipnum integer NOT NULL,
    gender vax NOT NULL,
    altname character varying(50) COLLATE pg_catalog."default" NOT NULL,
    notes character varying(200) COLLATE pg_catalog."default" NOT NULL,
    adoptername character varying(50) COLLATE pg_catalog."default" NOT NULL,
    adopterphone character varying(11) COLLATE pg_catalog."default" NOT NULL,
    addrline character varying(100) COLLATE pg_catalog."default" NOT NULL,
    adoptcity character varying(50) COLLATE pg_catalog."default" NOT NULL,
    adoptstate character varying(30) COLLATE pg_catalog."default" NOT NULL,
    zip character varying(5) COLLATE pg_catalog."default" NOT NULL,
    adoptemail character varying(100) COLLATE pg_catalog."default" NOT NULL,
    fees integer NOT NULL,
    revenue integer NOT NULL,
    service boolean NOT NULL,
    therapy boolean NOT NULL,
    "staffAdoption" boolean NOT NULL,
    "specialNeeds" boolean NOT NULL,
    deceased boolean NOT NULL,
    "facilityUnit" character varying(50) COLLATE pg_catalog."default",
    image text COLLATE pg_catalog."default",
    CONSTRAINT dog_pkey PRIMARY KEY (dogid),
    CONSTRAINT dog_facilityid_fkey FOREIGN KEY (facilityid)
        REFERENCES public.facility (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.dog
    OWNER to ctc;

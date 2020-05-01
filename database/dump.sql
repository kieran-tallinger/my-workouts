--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.routines DROP CONSTRAINT routines_pkey;
ALTER TABLE ONLY public."routineExercises" DROP CONSTRAINT "routineExercises_pkey";
ALTER TABLE ONLY public.exercises DROP CONSTRAINT exercises_pkey;
ALTER TABLE public.routines ALTER COLUMN "routineId" DROP DEFAULT;
ALTER TABLE public."routineExercises" ALTER COLUMN "routineExerciseId" DROP DEFAULT;
ALTER TABLE public.exercises ALTER COLUMN "exerciseId" DROP DEFAULT;
DROP SEQUENCE public."routines_routineId_seq";
DROP TABLE public.routines;
DROP SEQUENCE public."routineExercises_routineExerciseId_seq";
DROP TABLE public."routineExercises";
DROP SEQUENCE public."exercises_exerciseId_seq";
DROP TABLE public.exercises;
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: exercises; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.exercises (
    "exerciseId" integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: exercises_exerciseId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."exercises_exerciseId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: exercises_exerciseId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."exercises_exerciseId_seq" OWNED BY public.exercises."exerciseId";


--
-- Name: routineExercises; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."routineExercises" (
    "routineExerciseId" integer NOT NULL,
    "routineId" integer NOT NULL,
    "exerciseId" integer NOT NULL,
    sets integer NOT NULL,
    reps integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: routineExercises_routineExerciseId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."routineExercises_routineExerciseId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: routineExercises_routineExerciseId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."routineExercises_routineExerciseId_seq" OWNED BY public."routineExercises"."routineExerciseId";


--
-- Name: routines; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.routines (
    "routineId" integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    difficulty text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: routines_routineId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."routines_routineId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: routines_routineId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."routines_routineId_seq" OWNED BY public.routines."routineId";


--
-- Name: exercises exerciseId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.exercises ALTER COLUMN "exerciseId" SET DEFAULT nextval('public."exercises_exerciseId_seq"'::regclass);


--
-- Name: routineExercises routineExerciseId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."routineExercises" ALTER COLUMN "routineExerciseId" SET DEFAULT nextval('public."routineExercises_routineExerciseId_seq"'::regclass);


--
-- Name: routines routineId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.routines ALTER COLUMN "routineId" SET DEFAULT nextval('public."routines_routineId_seq"'::regclass);


--
-- Data for Name: exercises; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.exercises ("exerciseId", name, description, "createdAt") FROM stdin;
1	Push Ups	Basic push ups with focus on 3-2-3 count	2020-05-01 16:20:42.902314-07
2	Sit Ups	Basic sit ups with arms crossed	2020-05-01 16:20:42.902314-07
3	Lunges	Alternating lunges with light weight in each hand	2020-05-01 16:20:42.902314-07
\.


--
-- Data for Name: routineExercises; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."routineExercises" ("routineExerciseId", "routineId", "exerciseId", sets, reps, "createdAt") FROM stdin;
\.


--
-- Data for Name: routines; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.routines ("routineId", name, description, difficulty, "createdAt") FROM stdin;
1	Legs	An endurance focused leg workout	Hard	2020-05-01 16:23:57.029618-07
2	Core	Just a quick core toning set for at home	Easy	2020-05-01 16:23:57.029618-07
3	General	Full body, comprehensive workout with no particular focus	Medium	2020-05-01 16:23:57.029618-07
\.


--
-- Name: exercises_exerciseId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."exercises_exerciseId_seq"', 3, true);


--
-- Name: routineExercises_routineExerciseId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."routineExercises_routineExerciseId_seq"', 1, false);


--
-- Name: routines_routineId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."routines_routineId_seq"', 3, true);


--
-- Name: exercises exercises_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.exercises
    ADD CONSTRAINT exercises_pkey PRIMARY KEY ("exerciseId");


--
-- Name: routineExercises routineExercises_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."routineExercises"
    ADD CONSTRAINT "routineExercises_pkey" PRIMARY KEY ("routineExerciseId");


--
-- Name: routines routines_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.routines
    ADD CONSTRAINT routines_pkey PRIMARY KEY ("routineId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--


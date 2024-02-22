# VexaSearch

VexaSearch is a simple AI-powered search application designed to determine the actions to perform based on a function call.

Currently, the application is able to perform the following tasks:

- Generate images
- Search the internet
- Retrieve information about a specific URL

## Models currently used:

- firefunction-v1 (for function calls)
- Mixtral for text generation
- stable-diffusion-xl-1024-v1-0 (for image generation)
- nomic-ai/nomic-embed-text-v1.5 (for RAG)


## Prerequisites

- Supabase account
- Firework account
- Google Custom Search Engine API key and Search Engine ID
- Bing Search API key


## Supabase


1. Create a new project on [Supabase](https://supabase.com/)

2. Create a `Search` table with the following columns:

- `id` (Primary Key) 
- `response` (Text)
- `links` (Text Array)
- `query` (Text)
-  `slug` (Text)
- `created_at` (Timestamp)


```sql
CREATE TABLE Search (
  id SERIAL PRIMARY KEY,
  response TEXT,
  links TEXT[],
  query TEXT,
  slug TEXT,
  created_at TIMESTAMP DEFAULT now()
);
```

3. Create a `Query` table with the following columns:

- `id` (Primary Key)
- `query` (Text)
- `slug` (Text)

```sql
CREATE TABLE Query (
  id SERIAL PRIMARY KEY,
  query TEXT,
  slug TEXT
);
```

## Installation

1. Clone the repository

```bash
git clone https://github.com/n4ze3m/vexasearch.git
```

2. Copy the `.env.example` file to `.env` and fill in the required information

```bash
cp .env.example .env
```

- Open the `.env` file and fill in the required information

3. Install the required packages

```bash
npm install
```

4. Start the application

```bash
npm run dev
```

This will start the application on `http://localhost:3000`


or you can start the application using Docker

```bash
docker-compose up
```

This will start the application on `http://localhost:3000`


## Support

If you like the project and want to support it, you can buy me a coffee. It will help me to keep working on the project.

<a href='https://ko-fi.com/M4M3EMCLL' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi2.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
# File Processing System

An asynchronous file processing system built with Node.js, BullMQ, Redis, PostgreSQL, MinIO, Docker, and FFmpeg.

## Features

* Asynchronous job processing with BullMQ
* Redis-backed job queue
* File storage using MinIO
* Video processing with FFmpeg
* Real-time job status updates via Socket.IO
* PostgreSQL job tracking
* Dockerized worker service
* Stream-based file upload/download for efficient memory usage

## Architecture

```text
Client
   │
   ▼
API
   │
   ▼
MinIO + BullMQ
   │
   ▼
Worker
   ├── Download File
   ├── Process with FFmpeg
   ├── Upload Result
   ├── Update Database
   └── Publish Events
   │
   ▼
Socket.IO
   │
   ▼
Client
```

## Tech Stack

* Node.js
* Express
* PostgreSQL
* Redis
* BullMQ
* MinIO
* FFmpeg
* Docker
* Socket.IO

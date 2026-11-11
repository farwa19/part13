# Express application

Install dependencies with `npm install`

Run with `npm start`

Or in development mode with `npm run dev`

# Local environment

The start scripts load variables from `.env` when it exists. Set `MONGO_URL` there to connect to MongoDB without Docker, then run `npm run dev` from this directory. Use a valid MongoDB connection string and keep `.env` private. If Node cannot resolve MongoDB's SRV record with the system DNS, optionally set `DNS_SERVERS=1.1.1.1,1.0.0.1` to use Cloudflare DNS.

# Visit counter

When running the server, visit http://localhost:3000 to see the visit counter, or give environment variable `PORT` to change the port. When Redis is enabled, the counter is stored under the Redis key `visits`; otherwise, it is kept in memory and resets when the server restarts.

# MongoDB

The application has /todos crud which requires a MongoDB. Pass connection url with env `MONGO_URL`

# Redis

Pass connection url with env `REDIS_URL`
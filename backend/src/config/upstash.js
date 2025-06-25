import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

import dontenv from "dotenv"
dontenv.config()

// Create a Rate Limiter that allows 100 requests per 60 seconds
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, "60 s")
})

export default ratelimit
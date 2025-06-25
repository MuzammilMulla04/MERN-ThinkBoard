import ratelimit from "../config/upstash.js"

const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit("my-limit-key")
        // const { success } = await ratelimit.limit(userid) // But we don't have authentication system to ratelimit users specifically


        if (!success) return res.status(429).json({ message: "Too Many Requests! Please Try Again Later" })

        next()
    } catch (error) {
        console.group("Rate Limit Error", error)
        next(error)
    }
}

export default rateLimiter
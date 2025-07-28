import {Ratelimit} from '@upstash/ratelimit';
import {Redis} from '@upstash/redis';
import dotenv from 'dotenv';
dotenv.config({ quiet: true });

const ratelimit = new Ratelimit({
    redis : Redis.fromEnv(),
    limiter : Ratelimit.slidingWindow(10, "5 s"),
});

export default ratelimit; 
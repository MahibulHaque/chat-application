import {z} from 'zod'

export const userRegistrationValidator = z.object({
    username:z.string().min(3).max(20),
    email:z.string().email(),
    password: z.string().min(6).regex(new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]).*$/))
})
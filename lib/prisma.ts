import { PrismaClient } from '@/prisma/generated/client'

export const prisma = new PrismaClient()

export { type Location, type Place } from '@/prisma/generated/client'

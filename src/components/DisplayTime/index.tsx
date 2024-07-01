'use client'

import { Badge } from '@/components/Badge'

import { formatTime } from '@/lib/stringFormaters'

interface DisplayTimeProps {
  description: string
  timestamp: number
}

export function DisplayTime({ description, timestamp }: DisplayTimeProps) {
  return <Badge>{`${description} ${formatTime(timestamp)}`}</Badge>
}

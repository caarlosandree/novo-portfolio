export interface CertificationCategory {
  title: string
  items: string[]
}

export interface TrackLevel {
  level: string
  description: string
}

export interface CertificationTrack {
  title: string
  description?: string
  iconImage?: string
  items?: string[]
  levels?: TrackLevel[]
}


export interface ContactItem {
  label: string
  href: string
  color: string
}

export interface Contact {
  email: string
  phone: string
  contacts: ContactItem[]
}


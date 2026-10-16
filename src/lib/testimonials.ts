export type Testimonial = {
  id: string
  name: string
  location: string
  initials: string
  rating: number
  text: string
  tour: string
  date: string
}

/** Real traveler reviews are added in the admin; none ship with the site. */
export const testimonials: Testimonial[] = []

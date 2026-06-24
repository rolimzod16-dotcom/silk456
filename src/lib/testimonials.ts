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

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Anna Kovaleva",
    location: "Moscow, Russia",
    initials: "AK",
    rating: 5,
    text: "Samarkand exceeded all expectations. Our guide told legends that gave us goosebumps. Organization was top-notch — from transfers to open-air dinners.",
    tour: "Samarkand Gold",
    date: "September 2024",
  },
  {
    id: "t2",
    name: "Dmitry Petrov",
    location: "Almaty, Kazakhstan",
    initials: "DP",
    rating: 5,
    text: "I did the entire Greater Turkestan route in 14 days. The most powerful journey of my life. The Darvaza Crater at night is simply otherworldly.",
    tour: "Greater Turkestan",
    date: "August 2024",
  },
  {
    id: "t3",
    name: "Maria Schneider",
    location: "Berlin, Germany",
    initials: "MS",
    rating: 5,
    text: "Persia opened up to me in a completely different way — not as in textbooks, but alive, warm and poetic. I will remember Naqsh-e Jahan Square at sunset forever.",
    tour: "Persian Silk Roads",
    date: "April 2024",
  },
  {
    id: "t4",
    name: "Alexey Sokolov",
    location: "St. Petersburg, Russia",
    initials: "AS",
    rating: 5,
    text: "A night in a yurt on Son-Kul was like going back to childhood. Stars, horses, beshbarmak by the fire. Thank you to the team for such sincerity.",
    tour: "Charyn & the Heavenly Mountains",
    date: "July 2024",
  },
  {
    id: "t5",
    name: "Sophie Laurent",
    location: "Lyon, France",
    initials: "SL",
    rating: 5,
    text: "Kashgar bazaar is overwhelming in the best way. Our guide made us feel at home with Uyghur families. The Silk Road is truly alive here.",
    tour: "Kashgar Caravan",
    date: "June 2024",
  },
  {
    id: "t6",
    name: "Igor Volkov",
    location: "Minsk, Belarus",
    initials: "IV",
    rating: 5,
    text: "I took my wife and teenage daughter on Steppe Nomads. The girls still talk about the eagle hunters. Professional and done with heart.",
    tour: "Steppe Nomads",
    date: "August 2024",
  },
]

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
    name: "Анна Ковалёва",
    location: "Москва, Россия",
    initials: "АК",
    rating: 5,
    text: "Самарканд превзошёл все ожидания. Гид рассказал такие легенды, что мурашки по коже. Организация — на высшем уровне, от трансферов до ужинов под открытым небом.",
    tour: "Самаркандское Золото",
    date: "Сентябрь 2024",
  },
  {
    id: "t2",
    name: "Дмитрий Петров",
    location: "Алматы, Казахстан",
    initials: "ДП",
    rating: 5,
    text: "Прошёл весь Великий Туркестан за 14 дней. Это было самое мощное путешествие в моей жизни. Кратер Дарваза ночью — это что-то неземное.",
    tour: "Великий Туркестан",
    date: "Август 2024",
  },
  {
    id: "t3",
    name: "Мария Шнайдер",
    location: "Берлин, Германия",
    initials: "МШ",
    rating: 5,
    text: "Персия открылась мне совершенно иначе — не как в учебниках, а живая, тёплая, поэтичная. Площадь Накш-е-Джахан на закате запомню навсегда.",
    tour: "Персидские Шёлковые Пути",
    date: "Апрель 2024",
  },
  {
    id: "t4",
    name: "Алексей Соколов",
    location: "Санкт-Петербург, Россия",
    initials: "АС",
    rating: 5,
    text: "Ночёвка в юрте на Сон-Куле — это было как вернуться в детство. Звёзды, лошади, бешбармак у костра. Спасибо команде за искренность.",
    tour: "Чарын и Небесные горы",
    date: "Июль 2024",
  },
  {
    id: "t5",
    name: "Sophie Laurent",
    location: "Lyon, France",
    initials: "SL",
    rating: 5,
    text: "Kashgar bazaar is overwhelming in the best way. Our guide made us feel at home with Uyghur families. The Silk Road is alive here.",
    tour: "Караван в Кашгар",
    date: "June 2024",
  },
  {
    id: "t6",
    name: "Игорь Волков",
    location: "Минск, Беларусь",
    initials: "ИВ",
    rating: 5,
    text: "Взял жену и дочь-подростка на «Степных кочевников». Девочки до сих пор вспоминают орлов-охотников. Профессионально и с душой.",
    tour: "Степные Кочевники",
    date: "Август 2024",
  },
]

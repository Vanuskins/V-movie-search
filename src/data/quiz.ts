export type Mood =
  | "comfort"
  | "thrill"
  | "mind"
  | "romance"
  | "laugh"
  | "epic"
  | "dark"
  | "family"
  | "art";

export type AnswerOption = {
  label: string;
  hint?: string;
  scores: Partial<Record<Mood, number>>;
};

export type Question = {
  id: string;
  title: string;
  subtitle: string;
  options: AnswerOption[];
};

export type Movie = {
  title: string;
  year: string;
  genre: string;
  duration: string;
  vibe: string;
  why: string;
  tags: Mood[];
  color: string;
  poster: string;
  description: string;
};

export const questions: Question[] = [
  {
    id: "mood",
    title: "Какое настроение хочется поймать?",
    subtitle: "Выбери ощущение, а не жанр. V дальше сам разберется.",
    options: [
      { label: "Уют и спокойствие", hint: "чтобы выдохнуть", scores: { comfort: 4, family: 1 } },
      { label: "Адреналин", hint: "чтобы не отлипать от экрана", scores: { thrill: 4, dark: 1 } },
      { label: "Пища для мозга", hint: "чтобы потом обсуждать", scores: { mind: 4, art: 1 } },
      { label: "Красивые эмоции", hint: "чтобы тронуло", scores: { romance: 4, art: 1 } },
    ],
  },
  {
    id: "company",
    title: "С кем смотришь?",
    subtitle: "Компания сильно меняет идеальный выбор.",
    options: [
      { label: "Один", scores: { mind: 2, dark: 2, art: 1 } },
      { label: "С парой", scores: { romance: 3, comfort: 1, laugh: 1 } },
      { label: "С друзьями", scores: { laugh: 3, thrill: 2, epic: 1 } },
      { label: "С семьей", scores: { family: 4, comfort: 2 } },
    ],
  },
  {
    id: "tempo",
    title: "Какой темп нужен?",
    subtitle: "Медитативный вечер или полный газ?",
    options: [
      { label: "Медленный и атмосферный", scores: { art: 3, mind: 2, comfort: 1 } },
      { label: "Средний, без суеты", scores: { comfort: 2, romance: 1, family: 1 } },
      { label: "Бодрый", scores: { laugh: 2, thrill: 2, epic: 1 } },
      { label: "Очень динамичный", scores: { thrill: 4, epic: 2 } },
    ],
  },
  {
    id: "ending",
    title: "Какой финал приятнее?",
    subtitle: "Это помогает избежать неправильного вайба.",
    options: [
      { label: "Светлый", scores: { comfort: 3, family: 2, romance: 1 } },
      { label: "Неожиданный", scores: { thrill: 2, mind: 3 } },
      { label: "Горько-сладкий", scores: { romance: 2, art: 2, dark: 1 } },
      { label: "Пусть выбьет из колеи", scores: { dark: 4, mind: 2, art: 1 } },
    ],
  },
  {
    id: "visual",
    title: "Насколько важна картинка?",
    subtitle: "Иногда хочется именно красивый визуальный опыт.",
    options: [
      { label: "Главное сюжет", scores: { mind: 2, thrill: 1 } },
      { label: "Хочу стильно", scores: { art: 3, romance: 1 } },
      { label: "Хочу масштаб", scores: { epic: 4, thrill: 1 } },
      { label: "Хочу мягко и приятно", scores: { comfort: 3, family: 1 } },
    ],
  },
  {
    id: "complexity",
    title: "Насколько сложным может быть фильм?",
    subtitle: "V не будет грузить, если тебе хочется простого вечера.",
    options: [
      { label: "Максимально простой", scores: { comfort: 3, laugh: 2, family: 1 } },
      { label: "Немного думать можно", scores: { romance: 1, thrill: 1, family: 1 } },
      { label: "Люблю загадки", scores: { mind: 4, thrill: 1 } },
      { label: "Можно странно и глубоко", scores: { art: 4, dark: 2, mind: 1 } },
    ],
  },
  {
    id: "humor",
    title: "Юмор нужен?",
    subtitle: "Даже серьезный фильм может быть с улыбкой.",
    options: [
      { label: "Да, хочу смеяться", scores: { laugh: 4, comfort: 1 } },
      { label: "Легкая ирония ок", scores: { laugh: 2, romance: 1, family: 1 } },
      { label: "Можно без юмора", scores: { mind: 1, thrill: 1 } },
      { label: "Хочу мрачно", scores: { dark: 4, thrill: 1 } },
    ],
  },
  {
    id: "world",
    title: "Какой мир интереснее?",
    subtitle: "Реальность, фантазия или что-то между ними.",
    options: [
      { label: "Реальная жизнь", scores: { romance: 2, comfort: 1, art: 1 } },
      { label: "Будущее или фантастика", scores: { mind: 2, epic: 3 } },
      { label: "Криминал и тайны", scores: { thrill: 3, dark: 2 } },
      { label: "Сказка или приключение", scores: { family: 3, epic: 2, comfort: 1 } },
    ],
  },
  {
    id: "length",
    title: "Сколько времени есть?",
    subtitle: "Подберем фильм под реальный вечер.",
    options: [
      { label: "До 100 минут", scores: { laugh: 2, comfort: 1 } },
      { label: "Около двух часов", scores: { thrill: 1, romance: 1, family: 1 } },
      { label: "Можно длинный", scores: { epic: 3, mind: 1 } },
      { label: "Время не важно", scores: { art: 1, dark: 1, epic: 1 } },
    ],
  },
  {
    id: "era",
    title: "Какая эпоха ближе?",
    subtitle: "Стиль времени тоже влияет на настроение.",
    options: [
      { label: "Современность", scores: { thrill: 1, romance: 1, laugh: 1 } },
      { label: "Классика", scores: { art: 2, comfort: 1, mind: 1 } },
      { label: "Исторический вайб", scores: { epic: 3, romance: 1 } },
      { label: "Не важно", scores: { family: 1, mind: 1 } },
    ],
  },
  {
    id: "emotion",
    title: "Какая эмоция в приоритете?",
    subtitle: "Выберем главный вкус вечера.",
    options: [
      { label: "Надежда", scores: { comfort: 2, family: 2, romance: 1 } },
      { label: "Напряжение", scores: { thrill: 4, dark: 1 } },
      { label: "Вдохновение", scores: { epic: 2, art: 2, comfort: 1 } },
      { label: "Меланхолия", scores: { romance: 2, art: 2, dark: 1 } },
    ],
  },
  {
    id: "violence",
    title: "Окей ли жесткие сцены?",
    subtitle: "Чтобы рекомендация не испортила вечер.",
    options: [
      { label: "Лучше без них", scores: { family: 3, comfort: 2, romance: 1 } },
      { label: "Немного можно", scores: { thrill: 1, mind: 1 } },
      { label: "Да, если уместно", scores: { thrill: 3, dark: 2 } },
      { label: "Чем жестче, тем лучше", scores: { dark: 4, thrill: 2 } },
    ],
  },
  {
    id: "romance",
    title: "Романтика нужна?",
    subtitle: "От фона до главной линии.",
    options: [
      { label: "Да, побольше", scores: { romance: 4, comfort: 1 } },
      { label: "Можно как часть истории", scores: { romance: 2, epic: 1, family: 1 } },
      { label: "Не обязательно", scores: { mind: 1, thrill: 1 } },
      { label: "Лучше без нее", scores: { thrill: 2, dark: 1, laugh: 1 } },
    ],
  },
  {
    id: "rewatch",
    title: "Хочется пересматривать?",
    subtitle: "Некоторые фильмы уютные, другие одноразово мощные.",
    options: [
      { label: "Да, комфортный фильм", scores: { comfort: 4, family: 2 } },
      { label: "Да, ради шуток", scores: { laugh: 4 } },
      { label: "Нет, хочу сильный опыт", scores: { dark: 2, art: 2, mind: 1 } },
      { label: "Хочу эпичность", scores: { epic: 4 } },
    ],
  },
  {
    id: "dialogues",
    title: "Диалоги или действие?",
    subtitle: "Выбираем ритм сцен.",
    options: [
      { label: "Диалоги", scores: { mind: 3, romance: 1, art: 1 } },
      { label: "Баланс", scores: { comfort: 1, family: 1, thrill: 1 } },
      { label: "Действие", scores: { thrill: 3, epic: 2 } },
      { label: "Атмосфера важнее всего", scores: { art: 3, dark: 1, comfort: 1 } },
    ],
  },
  {
    id: "sound",
    title: "Музыка и звук важны?",
    subtitle: "Для некоторых фильмов это половина магии.",
    options: [
      { label: "Да, хочу саундтрек", scores: { art: 2, romance: 2, epic: 1 } },
      { label: "Главное атмосфера", scores: { dark: 1, art: 2, mind: 1 } },
      { label: "Не особо", scores: { laugh: 1, comfort: 1 } },
      { label: "Хочу мощно", scores: { epic: 3, thrill: 1 } },
    ],
  },
  {
    id: "risk",
    title: "Готов к необычному выбору?",
    subtitle: "V может посоветовать не самый очевидный вариант.",
    options: [
      { label: "Лучше проверенное", scores: { comfort: 2, family: 2, laugh: 1 } },
      { label: "Можно слегка необычно", scores: { romance: 1, mind: 1, art: 1 } },
      { label: "Да, удиви меня", scores: { art: 3, mind: 2 } },
      { label: "Хочу странное", scores: { art: 4, dark: 2 } },
    ],
  },
  {
    id: "hero",
    title: "Какой герой интереснее?",
    subtitle: "Персонаж задает тон истории.",
    options: [
      { label: "Добрый и теплый", scores: { comfort: 2, family: 2 } },
      { label: "Умный и сложный", scores: { mind: 3, art: 1 } },
      { label: "Опасный", scores: { thrill: 2, dark: 3 } },
      { label: "Большой мечтатель", scores: { romance: 2, epic: 1, comfort: 1 } },
    ],
  },
  {
    id: "aftertaste",
    title: "Что должно остаться после фильма?",
    subtitle: "Последний вкус важнее первого впечатления.",
    options: [
      { label: "Тепло", scores: { comfort: 4, family: 1 } },
      { label: "Вау", scores: { epic: 3, thrill: 1 } },
      { label: "Мысли", scores: { mind: 4, art: 1 } },
      { label: "Ком в горле", scores: { romance: 2, dark: 1, art: 2 } },
    ],
  },
  {
    id: "tonight",
    title: "И последнее: что лучше звучит прямо сейчас?",
    subtitle: "Финальный импульс для V.",
    options: [
      { label: "Хочу почувствовать себя лучше", scores: { comfort: 3, family: 2 } },
      { label: "Хочу залипнуть", scores: { thrill: 3, epic: 1 } },
      { label: "Хочу красивую грусть", scores: { romance: 3, art: 2 } },
      { label: "Хочу, чтобы мозг заискрил", scores: { mind: 4, dark: 1 } },
    ],
  },
];

export const movies: Movie[] = [
  {
    title: "Амели",
    year: "2001",
    genre: "романтическая сказка",
    duration: "122 мин",
    vibe: "уютный, светлый, французский",
    why: "подходит, если хочется тепла, красоты и ощущения маленького чуда",
    description: "Застенчивая официантка Амели решает тайно менять жизни людей вокруг себя и постепенно находит собственную смелость для любви.",
    tags: ["comfort", "romance", "art"],
    color: "#f59e0b",
    poster: "https://image.tmdb.org/t/p/w500/nSxDa3M9aMvGVLoItzWTepQ5h5d.jpg",
  },
  {
    title: "Интерстеллар",
    year: "2014",
    genre: "научная фантастика",
    duration: "169 мин",
    vibe: "масштабный, эмоциональный, космический",
    why: "для вечера, где хочется и эпика, и сильных чувств",
    description: "Группа исследователей отправляется через червоточину за пределы Солнечной системы, чтобы найти человечеству новый дом.",
    tags: ["epic", "mind", "romance"],
    color: "#60a5fa",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
  {
    title: "Достать ножи",
    year: "2019",
    genre: "детектив",
    duration: "130 мин",
    vibe: "умный, бодрый, ироничный",
    why: "когда хочется загадку без тяжелого послевкусия",
    description: "После смерти известного писателя детектив Бенуа Блан распутывает семейные тайны, ложь и подозрительно удобные алиби.",
    tags: ["mind", "laugh", "thrill"],
    color: "#a78bfa",
    poster: "https://image.tmdb.org/t/p/w500/pThyQovXQrw2m0s9x82twj48Jq4.jpg",
  },
  {
    title: "Остров собак",
    year: "2018",
    genre: "анимация",
    duration: "101 мин",
    vibe: "стильный, добрый, странноватый",
    why: "идеален для мягкого, визуально приятного и необычного просмотра",
    description: "Мальчик отправляется на мусорный остров, чтобы найти своего пса, а стая собак помогает ему в трогательном приключении.",
    tags: ["family", "comfort", "art"],
    color: "#f97316",
    poster: "https://image.tmdb.org/t/p/w500/rSluCePdXXtNiQeE6Na5yRGamhL.jpg",
  },
  {
    title: "Безумный Макс: Дорога ярости",
    year: "2015",
    genre: "экшен",
    duration: "120 мин",
    vibe: "яростный, визуальный, быстрый",
    why: "если нужен чистый адреналин и мощнейший визуальный ритм",
    description: "В постапокалиптической пустыне Макс и Фуриоса пытаются вырваться из власти тирана в безумной погоне на выживание.",
    tags: ["thrill", "epic", "dark"],
    color: "#ef4444",
    poster: "https://image.tmdb.org/t/p/w500/hA2ple9q4qnwxp3hKVNhroipsir.jpg",
  },
  {
    title: "Она",
    year: "2013",
    genre: "романтическая фантастика",
    duration: "126 мин",
    vibe: "нежный, меланхоличный, умный",
    why: "если хочется любви, одиночества и красивых мыслей о будущем",
    description: "Одинокий писатель влюбляется в интеллектуальную операционную систему, которая понимает его лучше большинства людей.",
    tags: ["romance", "mind", "art"],
    color: "#fb7185",
    poster: "https://image.tmdb.org/t/p/w500/lEIaL12hSkqqe83kgADkbUqEnvk.jpg",
  },
  {
    title: "Гранд Будапешт",
    year: "2014",
    genre: "комедия, приключение",
    duration: "99 мин",
    vibe: "элегантный, смешной, кукольный",
    why: "легкий, стильный и очень пересматриваемый фильм",
    description: "Консьерж легендарного отеля и его юный помощник оказываются в центре кражи картины, наследства и абсурдной погони.",
    tags: ["laugh", "comfort", "art"],
    color: "#e879f9",
    poster: "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
  },
  {
    title: "Семь",
    year: "1995",
    genre: "триллер",
    duration: "127 мин",
    vibe: "мрачный, напряженный, тяжелый",
    why: "для настроения, когда хочется темного детектива и сильного удара",
    description: "Два детектива расследуют серию убийств, где каждое преступление связано с одним из семи смертных грехов.",
    tags: ["dark", "thrill", "mind"],
    color: "#64748b",
    poster: "https://image.tmdb.org/t/p/w500/69Sns8WoET6CfaYlIkHbla4l7nC.jpg",
  },
  {
    title: "Начало",
    year: "2010",
    genre: "фантастический триллер",
    duration: "148 мин",
    vibe: "умный, динамичный, многослойный",
    why: "баланс загадки, экшена и большого кино",
    description: "Профессиональный вор проникает в сны людей, но его самая сложная миссия требует не украсть идею, а внедрить ее.",
    tags: ["mind", "thrill", "epic"],
    color: "#38bdf8",
    poster: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
  },
  {
    title: "Душа",
    year: "2020",
    genre: "анимация",
    duration: "100 мин",
    vibe: "теплый, философский, семейный",
    why: "подходит, если хочется вдохновения без перегруза",
    description: "Джазовый музыкант оказывается между жизнью и смертью и заново учится замечать маленькие радости обычного дня.",
    tags: ["family", "comfort", "mind"],
    color: "#22c55e",
    poster: "https://image.tmdb.org/t/p/w500/hm58Jw4Lw8OIeECIq5qyPYhAeRJ.jpg",
  },
  {
    title: "Ла-Ла Ленд",
    year: "2016",
    genre: "мюзикл, романтика",
    duration: "128 мин",
    vibe: "мечтательный, музыкальный, грустно-светлый",
    why: "для красивой романтики и послевкусия мечты",
    description: "Актриса и джазовый музыкант влюбляются в Лос-Анджелесе, пытаясь совместить чувства, мечты и цену успеха.",
    tags: ["romance", "art", "comfort"],
    color: "#facc15",
    poster: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
  },
  {
    title: "Паразиты",
    year: "2019",
    genre: "драма, триллер",
    duration: "132 мин",
    vibe: "острый, умный, непредсказуемый",
    why: "если хочется кино, которое и развлекает, и заставляет думать",
    description: "Бедная семья постепенно внедряется в дом богачей, но хитрая афера оборачивается жестким столкновением миров.",
    tags: ["mind", "dark", "thrill"],
    color: "#84cc16",
    poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
  },
  {
    title: "Властелин колец: Братство кольца",
    year: "2001",
    genre: "фэнтези",
    duration: "178 мин",
    vibe: "эпичный, теплый, приключенческий",
    why: "лучший вариант для большого путешествия и чувства дружбы",
    description: "Фродо и его спутники начинают опасный путь, чтобы уничтожить Кольцо Всевластия и спасти Средиземье от тьмы.",
    tags: ["epic", "family", "comfort"],
    color: "#10b981",
    poster: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
  },
  {
    title: "Бойцовский клуб",
    year: "1999",
    genre: "драма, триллер",
    duration: "139 мин",
    vibe: "дерзкий, темный, культовый",
    why: "если нужен фильм с нервом, идеей и мощной энергетикой",
    description: "Офисный работник и харизматичный Тайлер Дерден создают подпольный бойцовский клуб, который быстро выходит из-под контроля.",
    tags: ["dark", "mind", "thrill"],
    color: "#dc2626",
    poster: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  },
  {
    title: "Стажер",
    year: "2015",
    genre: "комедия, драма",
    duration: "121 мин",
    vibe: "добрый, спокойный, человеческий",
    why: "когда нужен безопасный и приятный фильм на вечер",
    description: "Пенсионер становится стажером в модном онлайн-магазине и неожиданно помогает молодой основательнице вернуть баланс в жизни.",
    tags: ["comfort", "laugh", "family"],
    color: "#c084fc",
    poster: "https://image.tmdb.org/t/p/w500/9UoAC9tu8kIyRy8AcJnGhnH0gOH.jpg",
  },
];

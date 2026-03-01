"use client";
import { useState, useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ShoppingBag, Search } from 'lucide-react';

type Category = 'all' | 'waffles' | 'iceCream' | 'fondue' | 'desserts' | 'combos' | 'sandwiches' | 'croissants' | 'coffee' | 'freshJuices' | 'lemonades' | 'mojito' | 'smoothies' | 'milkshakes' | 'teas';

const MENU_ITEMS = [
    // Fondue
    { id: 101, title: 'Ананас и клубника', price: '84 000 сум', weight: '500', category: 'fondue', image: '/menu_photos/Ananas and klubnika.jpeg', description: { ru: "Десерт с клубникой, ананасом и бананом. Сочный и сладкий выбор для компании.", uz: "Qulupnay, ananas va bananli desert. Do'stlar davrasi uchun suvli va shirin tanlov.", en: "Dessert with strawberries, pineapples, and bananas. A juicy and sweet choice to share." } },
    { id: 102, title: 'Банан', price: '84 000 сум', weight: '500', category: 'fondue', image: '/menu_photos/Banan mix.jpeg', description: { ru: "Отличается нежностью, легкостью и незабываемым вкусом спелых бананов.", uz: "Nafisligi, yengilligi va pishgan bananlarning unutilmas ta'mi bilan ajralib turadi.", en: "Distinguished by its tenderness, lightness, and the unforgettable taste of ripe bananas." } },
    { id: 103, title: 'Банан и ананас', price: '84 000 сум', weight: '500', category: 'fondue', image: '/menu_photos/Banan and ananas.jpeg', description: { ru: "Отличается нежностью, легкостью и незабываемым вкусом тропических фруктов.", uz: "Nafisligi, yengilligi va tropik mevalarning unutilmas ta'mi bilan ajralib turadi.", en: "Distinguished by its tenderness, lightness, and the unforgettable taste of tropical fruits." } },
    { id: 104, title: 'Банан и киви', price: '84 000 сум', weight: '500', category: 'fondue', image: '/menu_photos/Banan and kivi.jpeg', description: { ru: "Отличается нежностью, легкостью и незабываемым сочетанием сладкого банана и кисло-сладкого киви.", uz: "Nafisligi, yengilligi va shirin banan bilan nordon-shirin kivining ajoyib uyg'unligi bilan ajralib turadi.", en: "Distinguished by its tenderness, lightness, and the unforgettable combination of sweet banana and sweet-sour kiwi." } },
    { id: 105, title: 'Клубника', price: '125 000 сум', weight: '550', category: 'fondue', image: '/menu_photos/Qlupnay.jpeg', description: { ru: "Шикарное клубничное фондю из отборной сочной клубники и горячего шоколада.", uz: "Saralangan suvli qulupnay va qaynoq shokoladdan iborat dabdabali qulupnay fondyusi.", en: "A chic strawberry fondue made from selected juicy strawberries and hot chocolate." } },
    { id: 106, title: 'Клубника банан', price: '105 000 сум', weight: '550', category: 'fondue', image: '/menu_photos/Qulbnay and banan.jpeg', description: { ru: "Классическое сочетание любимых ягод и фруктов с настоящим бельгийским шоколадом.", uz: "Sevimli meva va rezavorlarning haqiqiy Belgiya shokoladi bilan klassik uyg'unligi.", en: "A classic combination of favorite berries and fruits with real Belgian chocolate." } },
    { id: 107, title: 'Клубника и киви', price: '84 000 сум', weight: '500', category: 'fondue', image: '/menu_photos/Qulibnay and kivi.jpeg', description: { ru: "Отличается нежностью, легкостью и незабываемым ярким вкусом ягод.", uz: "Nafisligi, yengilligi va rezavorlarning unutilmas yorqin ta'mi bilan ajralib turadi.", en: "Distinguished by its tenderness, lightness, and unforgettable bright berry flavor." } },
    { id: 108, title: 'Клубникой с бананом', price: '84 000 сум', weight: '500', category: 'fondue', image: '/menu_photos/Qlubnay with banan.jpeg', description: { ru: "Отличается нежностью, легкостью и незабываемым переплетением вкусов.", uz: "Nafisligi, yengilligi va ta'mlarning unutilmas qorishmasi bilan ajralib turadi.", en: "Distinguished by its tenderness, lightness, and unforgettable blend of flavors." } },
    { id: 109, title: 'Фруктовый ассорти', price: '110 000 сум', weight: '550', category: 'fondue', image: '/menu_photos/Mevali accorti.jpeg', description: { ru: "Идеальный выбор для больших компаний - богатство витаминов и вкусов в одной тарелке.", uz: "Katta davralar uchun ideal tanlov - bir likopchada vitaminlar va ta'mlar boyligi.", en: "Perfect choice for large groups - a wealth of vitamins and flavors on one plate." } },
    { id: 110, title: 'Фруктовый микс', price: '115 000 сум', weight: '550', category: 'fondue', image: '/menu_photos/Mevali mix.jpeg', description: { ru: "Роскошный микс из самых свежих и вкусных тропических фруктов и ягод.", uz: "Eng yangi va mazali tropik mevalar va rezavorlardan iborat hashamatli miks.", en: "A luxurious mix of the freshest and tastiest tropical fruits and berries." } },

    // Waffles
    { id: 201, title: 'Kids Waffel', price: '53 000 сум', weight: '200', category: 'waffles', image: '/menu_photos/Kids Waffel.jpeg', description: { ru: "Праздник для вашего ребенка! Мягкие бельгийские вафли, политые сладким сиропом.", uz: "Bolajonlar uchun haqiqiy bayram! Shirin sirop quyilgan yumshoq Belgiya vaflilari.", en: "A true delight for kids! Soft Belgian waffles drizzled with sweet syrup." } },
    { id: 202, title: 'Банан и Нутелла', price: '63 000 сум', weight: '200', category: 'waffles', image: '/menu_photos/Banan and Nutella.jpeg', description: { ru: "Мягкие аппетитные вафли с добавками", uz: "Qo'shimchali yumshoq ishtahaochar vaflilar", en: "Soft appetizing waffles with toppings" } },
    { id: 203, title: 'Банан и клубника', price: '72 000 сум', weight: '200', category: 'waffles', image: '/menu_photos/Banan and klubnika.jpeg', description: { ru: "Мягкие аппетитные вафли с добавками", uz: "Qo'shimchali yumshoq ishtahaochar vaflilar", en: "Soft appetizing waffles with toppings" } },
    { id: 204, title: 'Вафли Фруктовый микс', price: '74 000 сум', weight: '200', category: 'waffles', image: '/menu_photos/Vafli Fructoviy mix.jpeg', description: { ru: "Настоящий витаминный заряд: хрустящие вафли в сочетании с миксом из сочных сезонных фруктов.", uz: "Haqiqiy vitaminlar manbai: mavsumiy mevalar miksi bilan uyg'unlashgan qarsildoq vaflilar.", en: "A real vitamin boost: crispy waffles combined with a mix of juicy seasonal fruits." } },
    { id: 205, title: 'Вафли манго с клубникой', price: '76 000 сум', weight: '200', category: 'waffles', image: '/menu_photos/Vafli mango with klubnikov.jpeg', description: { ru: "Это настоящий праздник для сладкоежек...", uz: "Shirinliksevarlar uchun ekzotik ta'm! Suvli mango va yangi qulupnay bo'laklari.", en: "An exotic taste for gourmets! Waffles with pieces of juicy mango and fresh strawberries." } },
    { id: 206, title: 'Вафли с Манго', price: '80 000 сум', weight: '200', category: 'waffles', image: '/menu_photos/Vafli with mango.jpeg', description: { ru: "Это сладкий дуэт, который сочетает в себе нежность и...", uz: "Ekzotik mango bilan nafislik va shirinliging ajoyib dueti ustunlik qiladi.", en: "This is a sweet duo that combines tenderness and exotic mango flavor." } },
    { id: 207, title: 'Вафля клубника с апельсином', price: '63 000 сум', weight: '200', category: 'waffles', image: '/menu_photos/Vafli klubnika with apelsin.jpeg', description: { ru: "Вафли с клубникой и цитрусовыми нотками", uz: "Qulupnay va sitrus notalari bilan vaflalar", en: "Waffles with strawberry and citrus notes" } },
    { id: 208, title: 'Клубника и Нутелла', price: '69 000 сум', weight: '200', category: 'waffles', image: '/menu_photos/Klubnika and Nutella.jpeg', description: { ru: "Мягкие аппетитные вафли с добавками", uz: "Qo'shimchali yumshoq ishtahaochar vaflilar", en: "Soft appetizing waffles with toppings" } },
    { id: 209, title: 'Красный бархат', price: '74 000 сум', weight: '200', category: 'waffles', image: '/menu_photos/Krasniy barxat.jpeg', description: { ru: "Это настоящее произведение искусства в мире...", uz: "Hashamatli qizil baxmal vaflilar bu shirinliklar olami asari.", en: "Exquisite red velvet waffles, a true masterpiece of desserts." } },
    { id: 210, title: 'Микс вафли', price: '74 000 сум', weight: '200', category: 'waffles', image: '/menu_photos/Mix vafli.jpeg', description: { ru: "Мягкие аппетитные вафли с добавками", uz: "Qo'shimchali yumshoq ishtahaochar vaflilar", en: "Soft appetizing waffles with toppings" } },
    { id: 211, title: 'Нутелла', price: '42 000 сум', weight: '200', category: 'waffles', image: '/menu_photos/Nutella vafli.jpeg', description: { ru: "Мягкие аппетитные вафли с добавками", uz: "Qo'shimchali yumshoq ishtahaochar vaflilar", en: "Soft appetizing waffles with toppings" } },
    { id: 212, title: 'Орео', price: '53 000 сум', weight: '200', category: 'waffles', image: '/menu_photos/Oreo vafli.jpeg', description: { ru: "Мягкие аппетитные вафли с добавками", uz: "Qo'shimchali yumshoq ishtahaochar vaflilar", en: "Soft appetizing waffles with toppings" } },
    { id: 213, title: 'Фисташка', price: '63 000 сум', weight: '200', category: 'waffles', image: '/menu_photos/Fistashka vafli.jpeg', description: { ru: "Мягкие аппетитные вафли с добавками", uz: "Qo'shimchali yumshoq ishtahaochar vaflilar", en: "Soft appetizing waffles with toppings" } },

    // Sandwiches
    { id: 801, title: 'Сэндвич с цезарем', price: '30 000 сум', weight: '250', category: 'sandwiches', image: '/menu_photos/Sendvich sezap.jpeg', description: { ru: "Идеально сбалансированный вкус: нежная куриная грудка, свежий салат айсберг, хрустящие гренки и пикантный соус Цезарь в румяной чиабатте.", uz: "Mukammal muvozanatli ta'm: yumshoq tovuq ko'kragi, yangi aysberg salati, qarsildoq non bo'laklari va qizargan chiabattadagi pikant Sezar sousi.", en: "Perfectly balanced flavor: tender chicken breast, fresh iceberg lettuce, crispy croutons, and piquant Caesar sauce in a golden ciabatta." } },
    { id: 802, title: 'Сэндвич с говядиной', price: '30 000 сум', weight: '300', category: 'sandwiches', image: '/menu_photos/Sendvich with govyadinov.jpeg', description: { ru: "Сытный и сочный сэндвич с тонкими ломтиками обжаренной говядины, маринованными огурчиками, сыром и фирменным соусом.", uz: "Qovurilgan mol go'shtining yupqa bo'laklari, tuzlangan bodring, pishloq va firma sousi bilan boyitilgan to'yimli va suvli sendvich.", en: "Hearty and juicy sandwich with thin slices of roasted beef, pickled cucumbers, cheese, and signature sauce." } },
    { id: 803, title: 'Сэндвич с индейкой', price: '30 000 сум', weight: '250', category: 'sandwiches', image: '/menu_photos/Sendvich with indeykov.jpeg', description: { ru: "Легкий и невероятно вкусный сэндвич: диетическая индейка, свежие томаты и хрустящий салат в мягкой булочке.", uz: "Yengil va nihoyatda mazali sendvich: parhezbop kurka go'shti, yangi pomidor va yumshoq nonda qarsildoq salat.", en: "Light and incredibly tasty sandwich: dietary turkey, fresh tomatoes, and crisp lettuce in a soft bun." } },
    { id: 804, title: 'Каприз', price: '30 000 сум', weight: '250', category: 'sandwiches', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80', description: { ru: "Нежный сэндвич с изысканным вкусом Каприз", uz: "Kapriz izzkan ta'mli yumshoq sendvich", en: "Tender sandwich with exquisite Caprice taste" } },

    // Croissants
    { id: 901, title: 'Классический Круассан', price: '25 000 сум', weight: '100', category: 'croissants', image: '/menu_photos/Classic Croissant.jpeg', description: { ru: "Свежий хрустящий круассан из настоящего слоеного теста на сливочном масле.", uz: "Sariyog'da tayyorlangan asl qatlamli xamirdan ishlangan yangi va qarsildoq kruassan.", en: "Fresh, crispy croissant made from authentic butter puff pastry." } },
    { id: 902, title: 'Миндальный круассан', price: '32 000 сум', weight: '150', category: 'croissants', image: '/menu_photos/Classic Croissant.jpeg', description: { ru: "Нежный круассан с миндальным кремом, покрытый лепестками миндаля и сладкой пудрой.", uz: "Bodom kremli nafis kruassan, ustiga bodom yaproqlari va g'ubor kukunlari sepilgan.", en: "Delicate croissant with almond cream, topped with almond flakes and sweet powder." } },

    // Ice Cream / Gelato
    { id: 301, title: 'Currant', price: '13 000 сум', weight: '50', category: 'iceCream', image: '/menu_photos/currant.jpeg', description: { ru: "Изысканное десертное блюдо, которое сочетает в себе нежную текстуру и освежающий вкус черной смородины.", uz: "O'zida nafis tekstura va qora smorodina ta'mini mujassam etgan ajoyib desert.", en: "An exquisite dessert that combines a delicate texture with a refreshing blackcurrant flavor." } },
    { id: 302, title: 'Nutella', price: '13 000 сум', weight: '50', category: 'iceCream', image: '/menu_photos/Nutella.jpeg', description: { ru: "Изысканное десертное блюдо, которое сочетает в себе нежную текстуру и богатый шоколадно-ореховый вкус Nutella.", uz: "O'zida nafis tekstura va boy Nutella shokolad-yong'oq ta'mini mujassam etgan ajoyib desert.", en: "An exquisite dessert that combines a delicate texture with a rich Nutella chocolate-hazelnut flavor." } },
    { id: 303, title: 'Oreo', price: '13 000 сум', weight: '50', category: 'iceCream', image: '/menu_photos/Oreo.jpeg', description: { ru: "Изысканное десертное блюдо, которое сочетает в себе нежную текстуру и хрустящие кусочки печенья Oreo.", uz: "O'zida nafis tekstura va qarsildoq Oreo pechenyesi bo'laklarini mujassam etgan ajoyib desert.", en: "An exquisite dessert that combines a delicate texture with crunchy Oreo cookie pieces." } },
    { id: 304, title: 'Банан', price: '13 000 сум', weight: '50', category: 'iceCream', image: '/menu_photos/Banan.jpeg', description: { ru: "Изысканное десертное блюдо, которое сочетает в себе нежную текстуру и сладкий вкус спелого банана.", uz: "O'zida nafis tekstura va pishgan bananning shirin ta'mini mujassam etgan ajoyib desert.", en: "An exquisite dessert that combines a delicate texture with the sweet taste of ripe banana." } },
    { id: 305, title: 'Баунти', price: '13 000 сум', weight: '50', category: 'iceCream', image: '/menu_photos/Baunti.jpeg', description: { ru: "Изысканное десертное блюдо, которое сочетает в себе нежную текстуру и тропический кокосовый вкус Баунти.", uz: "O'zida nafis tekstura va Baunti tropik kokos ta'mini mujassam etgan ajoyib desert.", en: "An exquisite dessert that combines a delicate texture with a tropical Bounty coconut flavor." } },
    { id: 306, title: 'Вишня', price: '13 000 сум', weight: '50', category: 'iceCream', image: '/menu_photos/Vishnya.jpeg', description: { ru: "Изысканное десертное блюдо, которое сочетает в себе нежную текстуру и приятную вишневую кислинку.", uz: "O'zida nafis tekstura va yoqimli olcha nordonligini mujassam etgan ajoyib desert.", en: "An exquisite dessert that combines a delicate texture with a pleasant cherry tartness." } },
    { id: 307, title: 'Йогурт', price: '13 000 сум', weight: '50', category: 'iceCream', image: '/menu_photos/Yogurt.jpeg', description: { ru: "Изысканное десертное блюдо, которое сочетает в себе нежную текстуру и легкий освежающий вкус натурального йогурта.", uz: "O'zida nafis tekstura va tabiiy yogurtning yengil tetiklashtiruvchi ta'mini mujassam etgan ajoyib desert.", en: "An exquisite dessert that combines a delicate texture with a light, refreshing yogurt flavor." } },
    { id: 308, title: 'Киви', price: '13 000 сум', weight: '50', category: 'iceCream', image: '/menu_photos/Kivi.jpeg', description: { ru: "Изысканное десертное блюдо, которое сочетает в себе нежную текстуру и яркий фруктовый вкус освежающего киви.", uz: "O'zida nafis tekstura va tetiklashtiruvchi kivining yorqin mevali ta'mini mujassam etgan ajoyib desert.", en: "An exquisite dessert that combines a delicate texture with the bright fruity taste of refreshing kiwi." } },
    { id: 309, title: 'Клубника', price: '13 000 сум', weight: '50', category: 'iceCream', image: '/menu_photos/Klubnika.jpeg', description: { ru: "Изысканное десертное блюдо, которое сочетает в себе нежную текстуру и классический вкус сочной клубники.", uz: "O'zida nafis tekstura va suvli qulupnayning klassik ta'mini mujassam etgan ajoyib desert.", en: "An exquisite dessert that combines a delicate texture with the classic taste of juicy strawberries." } },
    { id: 310, title: 'Манго', price: '13 000 сум', weight: '50', category: 'iceCream', image: '/menu_photos/Mango.jpeg', description: { ru: "Изысканное десертное блюдо, которое сочетает в себе нежную текстуру и экзотический тропический вкус спелого манго.", uz: "O'zida nafis tekstura va pishgan mangoning ekzotik tropik ta'mini mujassam etgan ajoyib desert.", en: "An exquisite dessert that combines a delicate texture with the exotic tropical flavor of ripe mango." } },
    { id: 311, title: 'Милк', price: '13 000 сум', weight: '50', category: 'iceCream', image: '/menu_photos/Milk.jpeg', description: { ru: "Изысканное десертное блюдо, которое сочетает в себе нежную текстуру и классический сливочно-молочный вкус.", uz: "O'zida nafis tekstura va klassik qaymoqli-sutli ta'mni mujassam etgan ajoyib desert.", en: "An exquisite dessert that combines a delicate texture with a classic creamy milk flavor." } },
    { id: 312, title: 'Фисташка', price: '13 000 сум', weight: '50', category: 'iceCream', image: '/menu_photos/Fistashka.jpeg', description: { ru: "Изысканное десертное блюдо, которое сочетает в себе нежную текстуру и богатый ореховый вкус настоящих фисташек.", uz: "O'zida nafis tekstura va haqiqiy xandon pistalarining boy yong'oqli ta'mini mujassam etgan ajoyib desert.", en: "An exquisite dessert that combines a delicate texture with the rich nutty flavor of real pistachios." } },
    { id: 313, title: 'Шоколад', price: '13 000 сум', weight: '50', category: 'iceCream', image: '/menu_photos/Shokolad.jpeg', description: { ru: "Изысканное десертное блюдо, которое сочетает в себе нежную текстуру и глубокий, насыщенный шоколадный вкус.", uz: "O'zida nafis tekstura va chuqur, to'yingan shokolad ta'mini mujassam etgan ajoyib desert.", en: "An exquisite dessert that combines a delicate texture with a deep, rich chocolate flavor." } },

    // Coffee
    { id: 501, title: 'Эспрессо', price: '15 000 сум', category: 'coffee', image: '/menu_photos/Expresso.jpeg', description: { ru: "Классический крепкий кофе", uz: "Klassik achchiq qahva", en: "Classic strong coffee" } },
    { id: 502, title: 'Американо', price: '18 000 сум', category: 'coffee', image: '/menu_photos/Americano.jpeg', description: { ru: "Мягкий кофе на основе эспрессо", uz: "Espresso asosida yumshoq qahva", en: "Mild coffee based on espresso" } },
    { id: 503, title: 'Капучино', price: '23 000 сум', category: 'coffee', image: '/menu_photos/Kapucgino.jpeg', description: { ru: "Нежный кофе с молочной пенкой", uz: "Sutli ko'pik bilan mayin qahva", en: "Delicate coffee with milk foam" } },
    { id: 504, title: 'Латте', price: '25 000 сум', category: 'coffee', image: '/menu_photos/Latte.jpeg', description: { ru: "Кофе с большим количеством молока", uz: "Ko'p miqdorda sutli qahva", en: "Coffee with plenty of milk" } },
    { id: 505, title: 'Айс Кофе', price: '28 000 сум', category: 'coffee', image: '/menu_photos/ays kofe.jpeg', description: { ru: "Охлаждающий кофе со льдом", uz: "Muz bilan muzlatilgan qahva", en: "Chilled iced coffee" } },
    { id: 506, title: 'Двойной Эспрессо', price: '20 000 сум', category: 'coffee', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=400&q=80', description: { ru: "Удвоенная порция классического эспрессо", uz: "Klassik esspressoning ikki barobar porsiyasi", en: "Double shot of classic espresso" } },
    { id: 507, title: 'Двойной Американо', price: '22 000 сум', category: 'coffee', image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=400&q=80', description: { ru: "Удвоенная порция американо", uz: "Amerikanoning ikki barobar porsiyasi", en: "Double portion of americano" } },
    { id: 508, title: 'Двойной Капучино', price: '28 000 сум', category: 'coffee', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=400&q=80', description: { ru: "Большая порция капучино с пышной пенкой", uz: "Ko'p ko'pikli kapuchinoning katta porsiyasi", en: "Large cappuccino with fluffy foam" } },
    { id: 509, title: 'Айс кофе Classic', price: '25 000 сум', category: 'coffee', image: 'https://images.unsplash.com/photo-1517701550927-30cfcb64db18?auto=format&fit=crop&w=400&q=80', description: { ru: "Классический холодный кофе со льдом", uz: "Klassik muzli sovuq qahva", en: "Classic iced coffee" } },
    { id: 510, title: 'Айс кофе Gusttimo', price: '32 000 сум', category: 'coffee', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=400&q=80', description: { ru: "Фирменный холодный кофе от Gusttimo", uz: "Gusttimodan maxsus sovuq qahva", en: "Signature iced coffee by Gusttimo" } },
    { id: 511, title: 'Холодный какао', price: '25 000 сум', category: 'coffee', image: 'https://images.unsplash.com/photo-1558238692-a12da97003f5?auto=format&fit=crop&w=400&q=80', description: { ru: "Освежающий холодный какао", uz: "Yoz uchun tetiklantiruvchi sovuq kakao", en: "Refreshing cold cocoa" } },
    { id: 512, title: 'Горячий шоколад', price: '30 000 сум', category: 'coffee', image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=400&q=80', description: { ru: "Плотный горячий шоколад", uz: "Quyultirilgan qaynoq shokolad", en: "Thick hot chocolate" } },
    { id: 513, title: 'Горячий какао', price: '25 000 сум', category: 'coffee', image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=400&q=80', description: { ru: "Теплый уютный какао", uz: "Issiq va shinam kakao", en: "Warm cozy cocoa" } },

    // Fresh Juices
    { id: 1001, title: 'Апельсин', price: '50 000 сум', category: 'freshJuices', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=400&q=80', description: { ru: "Свежевыжатый апельсиновый сок", uz: "Yangi siqilgan apelsin sharbati", en: "Freshly squeezed orange juice" } },
    { id: 1002, title: 'Апельсин - Яблоко', price: '40 000 сум', category: 'freshJuices', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=400&q=80', description: { ru: "Микс апельсина и яблока", uz: "Apelsin va olma miksi", en: "Orange and apple mix" } },
    { id: 1003, title: 'Апельсин - Лимон', price: '35 000 сум', category: 'freshJuices', image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=400&q=80', description: { ru: "Освежающий микс апельсина и лимона", uz: "Apelsin va limon tetiklantiruvchi miksi", en: "Refreshing mix of orange and lemon" } },
    { id: 1004, title: 'Яблоко', price: '40 000 сум', category: 'freshJuices', image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=400&q=80', description: { ru: "Свежевыжатый яблочный сок", uz: "Yangi siqilgan olma sharbati", en: "Freshly squeezed apple juice" } },
    { id: 1005, title: 'Яблоко - Морковь', price: '35 000 сум', category: 'freshJuices', image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=400&q=80', description: { ru: "Витаминный микс яблока и моркови", uz: "Olma va sabzidan vitaminli miks", en: "Vitamin mix of apple and carrot" } },
    { id: 1006, title: 'Морковный', price: '30 000 сум', category: 'freshJuices', image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=400&q=80', description: { ru: "Полезный морковный сок", uz: "Foydali sabzi sharbati", en: "Healthy carrot juice" } },

    // Lemonades
    { id: 1101, title: 'Тропический', price: '30 000 сум', category: 'lemonades', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80', description: { ru: "Тропический лимонад с экзотическим вкусом", uz: "Ekzotik ta'mli tropik limonad", en: "Tropical lemonade with exotic twist" } },
    { id: 1102, title: 'Ягодный', price: '30 000 сум', category: 'lemonades', image: 'https://images.unsplash.com/photo-1497534547324-0ebb3f052e88?auto=format&fit=crop&w=400&q=80', description: { ru: "Лимонад из лесных ягод", uz: "O'rmon mevalaridan tayyorlangan limonad", en: "Berry lemonade" } },
    { id: 1103, title: 'Цитрусовый', price: '30 000 сум', category: 'lemonades', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&q=80', description: { ru: "Освежающий цитрусовый лимонад", uz: "Tetiklantiruvchi sitrus limonadi", en: "Refreshing citrus lemonade" } },
    { id: 1104, title: 'Манго - Маракуйя', price: '30 000 сум', category: 'lemonades', image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=400&q=80', description: { ru: "Сладкий лимонад со вкусом манго и маракуйи", uz: "Mango va marakuya ta'mli shirin limonad", en: "Sweet lemonade with mango and passion fruit" } },

    // Mojito
    { id: 1201, title: 'Классический Мохито', price: '30 000 сум', category: 'mojito', image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=400&q=80', description: { ru: "Классический вкус мяты и лимона", uz: "Yalpiz va limonning klassik ta'mi", en: "Classic taste of mint and lemon" } },
    { id: 1202, title: 'Клубника', price: '30 000 сум', category: 'mojito', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=400&q=80', description: { ru: "Мохито с ноткой клубники", uz: "Qulupnay qo'shilgan moxito", en: "Mojito with a hint of strawberry" } },
    { id: 1203, title: 'Киви', price: '30 000 сум', category: 'mojito', image: 'https://images.unsplash.com/photo-1622597467822-ba8f07b4ce16?auto=format&fit=crop&w=400&q=80', description: { ru: "Освежающий мохито с киви", uz: "Kivi qo'shilgan tetiklantiruvchi moxito", en: "Refreshing mojito with kiwi" } },
    { id: 1204, title: 'Персик', price: '30 000 сум', category: 'mojito', image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=400&q=80', description: { ru: "Мохито с нежным персиком", uz: "Mayin shaftoli bilan moxito", en: "Mojito with delicate peach" } },

    // Smoothies
    { id: 1301, title: 'Банан с клубникой', price: '25 000 сум', category: 'smoothies', image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=400&q=80', description: { ru: "Питательный смузи с бананом и клубникой", uz: "Banan va qulupnayli to'yimli smuzi", en: "Nutritious smoothie with banana and strawberry" } },
    { id: 1302, title: 'Киви', price: '25 000 сум', category: 'smoothies', image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80', description: { ru: "Смузи из свежего киви", uz: "Yangi kividan tayyorlangan smuzi", en: "Smoothie made from fresh kiwi" } },
    { id: 1303, title: 'Апельсин', price: '25 000 сум', category: 'smoothies', image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=400&q=80', description: { ru: "Цитрусовый апельсиновый смузи", uz: "Sitrusli apelsin smuzisi", en: "Citrus orange smoothie" } },
    { id: 1304, title: 'Ананас', price: '25 000 сум', category: 'smoothies', image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=400&q=80', description: { ru: "Экзотический ананасовый смузи", uz: "Ekzotik ananas smuzisi", en: "Exotic pineapple smoothie" } },

    // Milkshakes
    { id: 1401, title: 'Банан', price: '35 000 сум', category: 'milkshakes', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80', description: { ru: "Классический банановый милкшейк", uz: "Klassik bananli milksteyk", en: "Classic banana milkshake" } },
    { id: 1402, title: 'Клубника', price: '35 000 сум', category: 'milkshakes', image: 'https://images.unsplash.com/photo-1579954115563-e72bf1a8147d?auto=format&fit=crop&w=400&q=80', description: { ru: "Нежный клубничный милкшейк", uz: "Mayin qulupnayli milksteyk", en: "Delicate strawberry milkshake" } },
    { id: 1403, title: 'Шоколад', price: '35 000 сум', category: 'milkshakes', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80', description: { ru: "Насыщенный шоколадный милкшейк", uz: "Quyultirilgan shokoladli milksteyk", en: "Rich chocolate milkshake" } },
    { id: 1404, title: 'Молочный', price: '35 000 сум', category: 'milkshakes', image: 'https://images.unsplash.com/photo-1579954115563-e72bf1a8147d?auto=format&fit=crop&w=400&q=80', description: { ru: "Простой ванильный милкшейк", uz: "Oddiy vanilli milksteyk", en: "Simple vanilla milkshake" } },
    { id: 1405, title: 'Орео', price: '35 000 сум', category: 'milkshakes', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80', description: { ru: "Милкшейк с печеньем Орео", uz: "Oreo pechenyeli milksteyk", en: "Milkshake with Oreo cookies" } },

    // Teas
    { id: 1501, title: 'Цитрусовый чай', price: '18 000 сум', category: 'teas', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80', description: { ru: "Маленький: 18к / Большой: 35к", uz: "Kichik: 18k / Katta: 35k", en: "Small: 18k / Large: 35k" } },
    { id: 1502, title: 'С облепихой', price: '18 000 сум', category: 'teas', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80', description: { ru: "Маленький: 18к / Большой: 35к", uz: "Kichik: 18k / Katta: 35k", en: "Small: 18k / Large: 35k" } },
    { id: 1503, title: 'С лесными ягодами', price: '18 000 сум', category: 'teas', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80', description: { ru: "Маленький: 18к / Большой: 35к", uz: "Kichik: 18k / Katta: 35k", en: "Small: 18k / Large: 35k" } },
    { id: 1504, title: 'Манго - Маракуйя', price: '18 000 сум', category: 'teas', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80', description: { ru: "Маленький: 18к / Большой: 35к", uz: "Kichik: 18k / Katta: 35k", en: "Small: 18k / Large: 35k" } },
    { id: 1505, title: 'Чёрный', price: '8 000 сум', category: 'teas', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80', description: { ru: "Маленький: 8к / Большой: 15к", uz: "Kichik: 8k / Katta: 15k", en: "Small: 8k / Large: 15k" } },
    { id: 1506, title: 'Зеленый', price: '8 000 сум', category: 'teas', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80', description: { ru: "Маленький: 8к / Большой: 15к", uz: "Kichik: 8k / Katta: 15k", en: "Small: 8k / Large: 15k" } },
    { id: 1507, title: 'С лимоном', price: '13 000 сум', category: 'teas', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80', description: { ru: "Маленький: 13к / Большой: 25к", uz: "Kichik: 13k / Katta: 25k", en: "Small: 13k / Large: 25k" } },
    { id: 1508, title: 'С молоком', price: '13 000 сум', category: 'teas', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80', description: { ru: "Маленький: 13к / Большой: 25к", uz: "Kichik: 13k / Katta: 25k", en: "Small: 13k / Large: 25k" } },

    // Desserts
    { id: 601, title: 'Малиновый Чизкейк', price: '45 000 сум', weight: '100', category: 'desserts', image: '/menu_photos/Malinobiy chizkeyk.jpeg', description: { ru: "Нежный чизкейк с лёгкой кислинкой свежей малины", uz: "Yangi malina mevasining yengil nordon ta'miga ega nafis chizkeyk", en: "Delicate cheesecake with the light tartness of fresh raspberries" } },
    { id: 602, title: 'Фисташковый Чизкейк', price: '55 000 сум', weight: '100', category: 'desserts', image: '/menu_photos/Fistashkoviy Chizkeyk.jpeg', description: { ru: "Сливочный чизкейк с фисташковым вкусом", uz: "Qaymoqli chizkeyk, xandon pista ta'mi bilan", en: "Creamy cheesecake with pistachio flavor" } },
    { id: 603, title: 'Чизкейк классик', price: '35 000 сум', weight: '100', category: 'desserts', image: '/menu_photos/Chiskeyk klassik.jpeg', description: { ru: "Классический чизкейк с насыщенным сливочным вкусом", uz: "Boy qaymoqli ta'mga ega klassik chizkeyk", en: "Classic cheesecake with a rich creamy flavor" } },
    { id: 604, title: 'Шоколадный Чизкейк', price: '45 000 сум', weight: '100', category: 'desserts', image: '/menu_photos/Chocolatniy chizkeyik.jpeg', description: { ru: "Плотный чизкейк с глубоким вкусом тёмного шоколада", uz: "To'q shokoladning chuqur ta'miga ega zich chizkeyk", en: "Dense cheesecake with a deep dark chocolate flavor" } },

    // Combos
    { id: 801, title: 'Комбо 2', price: '90 000 сум', weight: '500', category: 'combos', image: '/menu_photos/kombo 2.jpeg' },
    { id: 802, title: 'Комбо 3', price: '120 000 сум', weight: '700', category: 'combos', image: '/menu_photos/kombo 3.jpeg' },
];

export default function MenuSection() {
    const t = useTranslations('Menu');
    const tHero = useTranslations('Hero');
    const locale = useLocale();
    const [activeCategory, setActiveCategory] = useState<Category>('all');
    const [selectedItem, setSelectedItem] = useState<typeof MENU_ITEMS[0] | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    const categories: Category[] = [
        'all',
        'waffles',
        'sandwiches',
        'croissants',
        'iceCream',
        'fondue',
        'desserts',
        'combos',
        'coffee',
        'freshJuices',
        'lemonades',
        'mojito',
        'smoothies',
        'milkshakes',
        'teas'
    ];

    const categoriesToRender = activeCategory === 'all'
        ? categories.filter(c => c !== 'all')
        : [activeCategory];

    return (
        <section id="menu" className="min-h-screen py-12 bg-background border-t border-foreground/5 relative">
            <div className="container mx-auto px-6 md:px-12">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-12 mt-10">
                    <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-foreground mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-foreground/70 text-xl font-medium mb-8">
                        {t('subtitle')}
                    </p>

                    {/* Search Bar */}
                    <div className="relative max-w-md mx-auto group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="w-5 h-5 text-foreground/40 group-focus-within:text-primary transition-colors duration-300" />
                        </div>
                        <input
                            type="text"
                            placeholder={t('searchPlaceholder') || "Search menu..."}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-12 py-3.5 bg-foreground/5 border border-foreground/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-medium text-foreground placeholder:text-foreground/40 shadow-sm"
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-0 pr-4 flex items-center text-foreground/40 hover:text-foreground transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* 3D Glass Category Scroll Menu */}
                <div className="relative mb-16">
                    <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto gap-3 md:gap-4 py-4 px-4 custom-scrollbar snap-x snap-mandatory"
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`shrink-0 px-6 py-3 rounded-2xl font-bold text-sm uppercase tracking-wide transition-all duration-300 snap-center border overflow-hidden relative group/btn ${activeCategory === cat
                                    ? "bg-foreground text-background border-foreground shadow-[0_12px_24px_-8px_rgba(0,0,0,0.15)] scale-[1.02]"
                                    : "bg-background text-foreground/60 border-foreground/10 hover:border-foreground/30 hover:bg-foreground/5 hover:shadow-[0_8px_16px_-6px_rgba(0,0,0,0.05)]"
                                    }`}
                            >
                                {t(`categories.${cat}`)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Menu Grid - 3D Tilt Cards */}
                {/* Menu Grid - 3D Tilt Cards */}
                <div className="flex flex-col gap-20">
                    {categoriesToRender.map(cat => {
                        const items = MENU_ITEMS.filter(item => {
                            if (item.category !== cat) return false;

                            if (searchQuery) {
                                const q = searchQuery.toLowerCase();
                                const inTitle = item.title.toLowerCase().includes(q);
                                let inDesc = false;
                                if ((item as any).description) {
                                    inDesc = typeof (item as any).description === 'object'
                                        ? Object.values((item as any).description).some((v: any) => v.toLowerCase().includes(q))
                                        : ((item as any).description as unknown as string).toLowerCase().includes(q);
                                }
                                return inTitle || inDesc;
                            }
                            return true;
                        });

                        if (items.length === 0) return null;

                        return (
                            <div key={cat} className="w-full">
                                {activeCategory === 'all' && (
                                    <div className="flex items-center justify-center mb-10">
                                        <div className="h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent flex-1" />
                                        <h3 className="text-4xl md:text-5xl font-serif font-black italic tracking-tighter text-primary px-8">{t(`categories.${cat}`)}</h3>
                                        <div className="h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent flex-1" />
                                    </div>
                                )}
                                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    <AnimatePresence mode="popLayout">
                                        {items.map(item => (
                                            <motion.div
                                                layout
                                                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.8, y: 30 }}
                                                transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
                                                key={item.id}
                                            >
                                                <div
                                                    onClick={() => setSelectedItem(item)}
                                                    className="group relative bg-background rounded-3xl overflow-hidden border border-foreground/5 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col h-[400px]"
                                                >
                                                    {/* Full bleed Image Section */}
                                                    <div className="absolute inset-0 overflow-hidden">
                                                        <img
                                                            src={item.image}
                                                            alt={item.title}
                                                            className="w-full h-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                                                        />
                                                        {/* Gradient overlays to ensure text readability */}
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-500 group-hover:opacity-90" />

                                                        {/* Top right weight badge */}
                                                        {item.weight && (
                                                            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                                                                <span className="text-white/90 font-bold text-sm tracking-wide">{item.weight}g</span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Content Overlay */}
                                                    <div className="relative h-full p-6 flex flex-col justify-end text-white z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                                        <div className="mb-2">
                                                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-black italic leading-tight text-white/95 group-hover:text-primary transition-colors duration-300">
                                                                {item.title}
                                                            </h3>
                                                        </div>

                                                        <div className="flex items-end justify-between mt-1">
                                                            <div className="flex flex-col">
                                                                <span className="text-[10px] text-white/60 font-bold uppercase tracking-widest mb-0.5">{t('priceLabel')}</span>
                                                                <span className="text-white font-black text-2xl tracking-tighter">
                                                                    {item.price.replace('сум', '').replace('сўм', '')}<span className="text-lg opacity-70 ml-1">SUM</span>
                                                                </span>
                                                            </div>

                                                            {/* Elegant interactive floating button icon */}
                                                            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out group-hover:bg-primary group-hover:border-primary">
                                                                <ChevronRight className="text-white w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>

                {/* Enhanced Empty State Check considering both categories and search */}
                {categoriesToRender.every(cat => MENU_ITEMS.filter(item => item.category === cat).length === 0) && !searchQuery && (
                    <div className="text-center py-24 text-foreground/50 font-medium">
                        More items coming soon...
                    </div>
                )}

                {searchQuery && categoriesToRender.every(cat =>
                    MENU_ITEMS.filter(item => {
                        if (item.category !== cat) return false;
                        const q = searchQuery.toLowerCase();
                        const inTitle = item.title.toLowerCase().includes(q);
                        const inDesc = (item as any).description && (typeof (item as any).description === 'object' ? Object.values((item as any).description).some((v: any) => v.toLowerCase().includes(q)) : false);
                        return inTitle || inDesc;
                    }).length === 0
                ) && (
                        <div className="text-center py-24 flex flex-col items-center justify-center">
                            <Search className="w-12 h-12 text-foreground/20 mb-4" />
                            <h3 className="text-2xl font-serif italic text-foreground/60 mb-2">No items found</h3>
                            <p className="text-foreground/40">Try adjusting your search query to find what you're looking for.</p>
                            <button
                                onClick={() => setSearchQuery('')}
                                className="mt-6 px-6 py-2 rounded-full border border-foreground/10 text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors font-medium text-sm"
                            >
                                Clear Search
                            </button>
                        </div>
                    )}
            </div>

            {/* Product Details Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedItem(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-background w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-2xl relative flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh]"
                        >
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
                                aria-label={t('close')}
                            >
                                <X size={24} />
                            </button>

                            <div className="md:w-1/2 relative h-64 md:h-auto border-r border-foreground/5">
                                <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden pointer-events-none" />
                            </div>

                            <div className="md:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col overflow-y-auto w-full">
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black italic text-foreground mb-4 sm:mb-6 leading-[1.1] text-balance">{selectedItem.title}</h3>

                                    {/* Description */}
                                    <p className="text-foreground/70 font-medium text-lg leading-relaxed mb-10">
                                        {typeof (selectedItem as any).description === 'object' && (selectedItem as any).description
                                            ? (selectedItem as any).description[locale]
                                            : t('descriptionFallback')}
                                    </p>
                                </motion.div>

                                <div className="mt-4 sm:mt-auto">
                                    <div className="flex items-center justify-between mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-foreground/10">
                                        <div>
                                            <span className="text-xs text-foreground/50 font-bold uppercase tracking-wider block mb-1">{t('priceLabel')}</span>
                                            <span className="text-primary font-black text-3xl sm:text-4xl tracking-tighter">
                                                {selectedItem.price.replace('сум', '').replace('сўм', '')}<span className="text-xl sm:text-2xl opacity-80"> SUM</span>
                                            </span>
                                        </div>
                                        {selectedItem.weight && (
                                            <div className="text-right">
                                                <span className="text-xs text-foreground/50 font-bold uppercase tracking-wider block mb-1">{t('weightLabel')}</span>
                                                <span className="text-foreground/80 font-bold text-xl sm:text-2xl bg-foreground/5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl block">
                                                    {selectedItem.weight}g
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <a
                                        href="https://wolt.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-5 bg-primary text-background rounded-2xl font-bold text-xl hover:shadow-[0_15px_30px_-10px_rgba(245,166,35,0.6)] transition-all flex items-center justify-center gap-3 hover:-translate-y-1 active:scale-95"
                                    >
                                        <ShoppingBag size={24} />
                                        {tHero('orderWolt')}
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

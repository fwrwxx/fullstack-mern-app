import mongoose from "mongoose";

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const users = [
  {
    _id: userIds[0],
    firstName: "Taras",
    lastName: "Shevchenko",
    email: "taras.shevchenko@example.com",
    password: "$2b$10$asdg12asdg12asdgasdg12asdgasdg12asdgas",
    picturePath: "p11.jpeg",
    friends: [],
    location: "Kaniv, Ukraine",
    occupation: "Poet",
    viewedProfile: 15421,
    impressions: 402311,
    createdAt: 1615211422,
    updatedAt: 1615211422,
    __v: 0,
  },
  {
    _id: userIds[1],
    firstName: "Lesya",
    lastName: "Ukrainka",
    email: "lesya.ukrainka@example.com",
    password: "$2b$10$asdasdasd12asda12asd12asd12asd12asd12",
    picturePath: "p3.jpeg",
    friends: [],
    location: "Zviahel, Ukraine",
    occupation: "Writer",
    viewedProfile: 22111,
    impressions: 88855,
    createdAt: 1695589072,
    updatedAt: 1695589072,
    __v: 0,
  },
  {
    _id: userIds[2],
    firstName: "Ivan",
    lastName: "Franko",
    email: "ivan.franko@example.com",
    password: "b39a3fe21e6b4b0a9912bfef95601890afd80721",
    picturePath: "p4.jpeg",
    friends: [],
    location: "Nahuievychi, Ukraine",
    occupation: "Philosopher",
    viewedProfile: 34122,
    impressions: 21342,
    createdAt: 1488090662,
    updatedAt: 1488090662,
    __v: 0,
  },
  {
    _id: userIds[3],
    firstName: "Mykhailo",
    lastName: "Hrushevsky",
    email: "mykhailo.hrushevsky@example.com",
    password: "$2b$10$ds123123asda//G9JxQ4bQ8KXf9821KJHn12kj3j",
    picturePath: "p6.jpeg",
    friends: [],
    location: "Chelm, Poland",
    occupation: "Politician",
    viewedProfile: 25210,
    impressions: 35221,
    createdAt: 1519214568,
    updatedAt: 1519214568,
    __v: 0,
  },
  {
    _id: userIds[4],
    firstName: "Symon",
    lastName: "Petliura",
    email: "symon.petliura@example.com",
    password: "$2b$10$hgsasdgsagas12//G1123JxQ9Xf4OAIe/31Ak9k12",
    picturePath: "p5.jpeg",
    friends: [],
    location: "Poltava, Ukraine",
    occupation: "Supreme Commander",
    viewedProfile: 28441,
    impressions: 13321,
    createdAt: 1593463661,
    updatedAt: 1593463661,
    __v: 0,
  },
  {
    _id: userIds[5],
    firstName: "Dmytro",
    lastName: "Dontsov",
    email: "dmytro.dontsov@example.com",
    password: "$2b$10$as12sdgasda98//VC4bQ4bQ8KXf4OAIE/AK9skyy",
    picturePath: "p7.jpeg",
    friends: [],
    location: "Melitopol, Ukraine",
    occupation: "Ideologist",
    viewedProfile: 976,
    impressions: 4658,
    createdAt: 1381326073,
    updatedAt: 1381326073,
    __v: 0,
  },
  {
    _id: userIds[6],
    firstName: "Bohdan",
    lastName: "Khmelnytsky",
    email: "bohdan.khmelnytsky@example.com",
    password: "$2b$10$dgasdg123asdg//G9JxQ4bQ8KXf4OAkdssAK9sky",
    picturePath: "p8.jpeg",
    friends: [],
    location: "Subotiv, Ukraine",
    occupation: "Hetman",
    viewedProfile: 1510,
    impressions: 77579,
    createdAt: 1714704324,
    updatedAt: 1642716557,
    __v: 0,
  },
  {
    _id: userIds[7],
    firstName: "Ivan",
    lastName: "Mazepa",
    email: "ivan.mazepa@example.com",
    password: "$2b$10$asdgasdg123asdg123asdgsdg12asdgsdg12",
    picturePath: "p9.jpeg",
    friends: [],
    location: "Mazepyntsi, Ukraine",
    occupation: "Hetman",
    viewedProfile: 19420,
    impressions: 82970,
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  },
];

export const posts = [
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[0], // Taras Shevchenko
    firstName: "Taras",
    lastName: "Shevchenko",
    location: "Kaniv, Ukraine",
    description:
      "Woke up today and realized: if poetry doesn't work out, I can always become a motivational speaker for sad villagers.",
    picturePath: "post1.jpeg",
    userPicturePath: "p11.jpeg",
    likes: new Map([
      [userIds[2], true],
      [userIds[3], true],
    ]),
    comments: [
      "Lesya: Taras, please stop depressing the entire timeline.",
      "Ivan F.: Bro, the villagers were already sad. You just optimized the process.",
      "Mykhailo: As a historian, I confirm — your poems caused 12% of national melancholy.",
    ],
  },

  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[1], // Lesya Ukrainka
    firstName: "Lesya",
    lastName: "Ukrainka",
    location: "Zviahel, Ukraine",
    description:
      "Writing dramatic poems again because someone ate my chocolate. Tragedy truly follows me everywhere.",
    picturePath: "post2.jpeg",
    userPicturePath: "p3.jpeg",
    likes: new Map([
      [userIds[0], true],
      [userIds[6], true],
    ]),
    comments: [
      "Taras: Chocolate is temporary. Drama is eternal. You made the right choice.",
      "Bohdan: I can declare war on the chocolate thief if needed.",
      "Ivan M.: This is why we can't have nice things.",
    ],
  },

  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[2], // Ivan Franko
    firstName: "Ivan",
    lastName: "Franko",
    location: "Nahuievychi, Ukraine",
    description:
      "Philosophy update: I spent 3 hours thinking about bread. Turns out, I was just hungry.",
    picturePath: "post3.jpeg",
    userPicturePath: "p4.jpeg",
    likes: new Map([
      [userIds[0], true],
      [userIds[4], true],
      [userIds[7], true],
    ]),
    comments: [
      "Taras: Deep thought. Profound. Revolutionary.",
      "Symon: At least you didn’t write a manifesto about it. Proud of you.",
      "Mazepa: Bread is life, philosopher man.",
    ],
  },

  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[3], // Hrushevsky
    firstName: "Mykhailo",
    lastName: "Hrushevsky",
    location: "Chelm, Poland",
    description:
      "Accidentally wrote 200 pages of history today. I swear I only sat down to drink tea.",
    picturePath: "post4.jpeg",
    userPicturePath: "p6.jpeg",
    likes: new Map([
      [userIds[1], true],
      [userIds[5], true],
    ]),
    comments: [
      "Lesya: How does someone 'accidentally' write 200 pages?",
      "Dmytro: Tea is dangerous. I always knew it.",
      "Taras: Bro, give pen a rest.",
    ],
  },

  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[4], // Petliura
    firstName: "Symon",
    lastName: "Petliura",
    location: "Poltava, Ukraine",
    description:
      "Training the army today. Step 1: find the army. Step 2: convince them I'm funny.",
    picturePath: "post5.jpeg",
    userPicturePath: "p5.jpeg",
    likes: new Map([
      [userIds[3], true],
      [userIds[6], true],
    ]),
    comments: [
      "Bohdan: Have you tried bribery?",
      "Mykhailo: Historically speaking, humor is not the strongest leadership tool.",
      "Lesya: Let him dream.",
    ],
  },

  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[5], // Dontsov
    firstName: "Dmytro",
    lastName: "Dontsov",
    location: "Melitopol, Ukraine",
    description:
      "Tried being positive for 5 minutes. Failed. Writing another ideology instead.",
    picturePath: "post6.jpeg",
    userPicturePath: "p7.jpeg",
    likes: new Map([
      [userIds[2], true],
      [userIds[7], true],
    ]),
    comments: [
      "Ivan F.: Mood.",
      "Mazepa: Let me guess — it's dramatic again.",
      "Taras: Bro needs a vacation.",
    ],
  },

  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[6], // Bohdan Khmelnytsky
    firstName: "Bohdan",
    lastName: "Khmelnytsky",
    location: "Subotiv, Ukraine",
    description:
      "Me: I will not start another rebellion today. Also me: 👀",
    picturePath: "post7.jpeg",
    userPicturePath: "p8.jpeg",
    likes: new Map([
      [userIds[0], true],
      [userIds[4], true],
      [userIds[5], true],
    ]),
    comments: [
      "Symon: Respectfully… same.",
      "Dmytro: Let me write an ideological justification real quick.",
      "Lesya: Boys will be boys, I guess.",
    ],
  },

  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[7], // Ivan Mazepa
    firstName: "Ivan",
    lastName: "Mazepa",
    location: "Mazepyntsi, Ukraine",
    description:
      "Bought a horse today. Named it 'Independence'. Now everyone keeps asking why I'm always running away with it.",
    picturePath: "post8.jpeg",
    userPicturePath: "p9.jpeg",
    likes: new Map([
      [userIds[3], true],
      [userIds[6], true],
    ]),
    comments: [
      "Bohdan: Give me the horse. I have plans.",
      "Taras: Independence runs fast. I like that.",
      "Lesya: At least you're self-aware.",
    ],
  },
];

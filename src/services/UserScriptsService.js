export default class UserScriptsService {
  data = [
    {
      id: 24,
      title: "Выгрузка табеля учета рабочего времени",
      description:
        "Тут будет описание для этого сцернария. Пользователь только почитать может, а редактор изменить еще. Надо придумать ограничение по количеству симоволов.",
      tags: ["Google Sheets", "табель"],
      date: "222222",
      timeLength: "1",
      slides: [
        {
          img: "",
          description: "Текст 1",
        },
        {
          img: "",
          description: "Текст 2",
        },
        {
          img: "",
          description: "Текст 3",
        },
        {
          img: "",
          description: "Текст 4",
        },
        {
          img: "",
          description: "Текст 5",
        },
      ],
    },
    {
      id: 11,
      title: "Сценарий №32",
      description: "Они из Перми",
      tags: ["янеробот"],
      date: "3123111",
      timeLength: "1",
      slides: [
        {
          img: "",
          description: "Текст 1",
        },
        {
          img: "",
          description: "Текст 2",
        },
        {
          img: "",
          description: "Текст 3",
        },
        {
          img: "",
          description: "Текст 4",
        },
      ],
    },
    {
      id: 54,
      title: "Слава чудесный человек",
      description: "И хуй у него здоровенный",
      tags: ["пиздеж", "fake", "fake-news"],
      date: "02.12.2020202",
      timeLength: "12",
      slides: [
        {
          img: "",
          description: "Текст 1",
        },
        {
          img: "",
          description: "Текст 2",
        },
        {
          img: "",
          description: "Текст 3",
        },
        {
          img: "",
          description: "Текст 4",
        },
        {
          img: "",
          description: "Текст 4",
        },
        {
          img: "",
          description: "Текст 4",
        },
        {
          img: "",
          description: "Текст 4",
        },
        {
          img: "",
          description: "Текст 4",
        },
        {
          img: "",
          description: "Текст 5",
        },
      ],
    },
    {
      id: 22,
      title: "Я обожаю реакт",
      description: "Дайте денег",
      tags: [""],
      date: "1111111",
      timeLength: "1",
      slides: [
        {
          img: "",
          description: "Текст 1",
        },
        {
          img: "",
          description: "Текст 2",
        },
        {
          img: "",
          description: "Текст 3",
        },
        {
          img: "",
          description: "Текст 4",
        },
        {
          img: "",
          description: "Текст 5",
        },
      ],
    },
    {
      id: 112,
      title: "Сценарий №32",
      description: "Они из Перми",
      tags: ["янеробот"],
      date: "3123111",
      timeLength: "1",
      slides: [
        {
          img: "",
          description: "Текст 1",
        },
        {
          img: "",
          description: "Текст 2",
        },
        {
          img: "",
          description: "Текст 3",
        },
        {
          img: "",
          description: "Текст 4",
        },
        {
          img: "",
          description: "Текст 5",
        },
      ],
    },
    {
      id: 51,
      title: "Слава чудесный человек",
      description: "И хуй у него здоровенный",
      tags: ["пиздеж", "fake", "fake-news"],
      date: "02.12.2020202",
      timeLength: "1",
      slides: [
        {
          img: "",
          description: "Текст 1",
        },
        {
          img: "",
          description: "Текст 2",
        },
        {
          img: "",
          description: "Текст 3",
        },
        {
          img: "",
          description: "Текст 4",
        },
        {
          img: "",
          description: "Текст 5",
        },
      ],
    },
    {
      id: 52,
      title: "Слава чудесный человек",
      description: "И хуй у него здоровенный",
      tags: ["пиздеж", "fake", "fake-news"],
      date: "02.12.2020202",
      timeLength: "1",
      slides: [
        {
          img: "",
          description: "Текст 1",
        },
        {
          img: "",
          description: "Текст 2",
        },
        {
          img: "",
          description: "Текст 3",
        },
        {
          img: "",
          description: "Текст 4",
        },
        {
          img: "",
          description: "Текст 5",
        },
      ],
    },
    {
      id: 53,
      title: "Слава чудесный человек",
      description: "И хуй у него здоровенный",
      tags: ["пиздеж", "fake", "fake-news"],
      date: "02.12.2020202",
      timeLength: "1",
      slides: [
        {
          img: "",
          description: "Текст 1",
        },
        {
          img: "",
          description: "Текст 2",
        },
        {
          img: "",
          description: "Текст 3",
        },
        {
          img: "",
          description: "Текст 4",
        },
        {
          img: "",
          description: "Текст 5",
        },
      ],
    },
    {
      id: 29,
      title: "Я обожаю реакт",
      description: "Дайте денег",
      tags: [""],
      date: "1111111",
      timeLength: "1",
      slides: [
        {
          img: "",
          description: "Текст 1",
        },
        {
          img: "",
          description: "Текст 2",
        },
        {
          img: "",
          description: "Текст 3",
        },
        {
          img: "",
          description: "Текст 4",
        },
        {
          img: "",
          description: "Текст 5",
        },
      ],
    },
  ];

  getUserScripts() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.data);
      }, 400);
    });
  }
}

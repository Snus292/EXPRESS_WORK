const {
	v4: uuid
} = require("uuid");
const path = require("path");
const fs = require("fs");


class Course {
	constructor(title, price, img) {
		this.title = title;
		this.price = price;
		this.img = img;
		this.id = uuid();
	}

	toJSON() {
		return {
			title: this.title,
			price: this.price,
			img: this.img,
			id: this.id,
		};
	}

	async save() {
		const courses = await Course.getAll();
		courses.push(this.toJSON());

		return new Promise((resolve, reject) => {
			fs.writeFile(
				path.join(__dirname, "..", "data", "courses.json"),
				JSON.stringify(courses, null, 2),
				(err) => {
					if (err) {
						reject(err);
					} else {
						resolve();
					}
				}
			);
		});
	}

	static async update(course) { // Объявляет статический асинхронный метод update, который принимает один параметр - объект course.
		const courses = await Course.getAll(); // Используем await для ожидания выполнения асинхронного метода getAll() класса Course, который возвращает список всех курсов. Результат сохраняется в переменную courses.

		const idx = courses.findIndex(c => c.id === course.id); // Находим индекс курса в массиве courses, идентификатор которого совпадает с идентификатором обновляемого курса.
		courses[idx] = course; // Заменяет старый курс новым в массиве courses по найденному индексу.

		return new Promise((resolve, reject) => { // Возвращаем новое обещание (Promise), которое будет завершено при записи обновленного списка курсов в файл.
			fs.writeFile( // Метод fs.writeFile записывает данные в файл. Если файла нет, он будет создан.
				path.join(__dirname, "..", "data", "courses.json"), // Указываем путь к файлу, в который будет произведена запись. Используем path.join для создания пути к файлу, чтобы он был корректным на всех операционных системах.
				JSON.stringify(courses), // Преобразуем объект courses в строку формата JSON. Параметры null и 2 используются для форматирования JSON с отступами для удобного чтения.
				(err) => { // Колбэк-функция, которая вызывается после завершения записи в файл.
					if (err) { // Если произошла ошибка при записи в файл, выполняется эта ветка кода.
						reject(err); // Отклоняет обещание и передаем ошибку в функцию reject.
					} else { // Если запись в файл прошла успешно, выполняется эта ветка кода.
						resolve(); // Завершает обещание успешно, вызывая функцию resolve.
					}
				}
			)
		})
	}

	static getAll() {
		return new Promise((resolve, reject) => {
			fs.readFile(
				path.join(__dirname, "..", "data", "courses.json"),
				"utf-8",
				(err, content) => {
					if (err) {
						reject(err);
					} else {
						resolve(JSON.parse(content));
					}
				}
			);
		});
	}

	static async getById(id) { // Объявление статического асинхронного метода getById в классе. Статический метод доступен на уровне класса и не требует создания экземпляра класса., принимает один параметр - id
		const courses = await Course.getAll(); // await для ожидания выполнения асинхронного метода getAll() класса Course, который должен вернуть список всех курсов. Результат сохраняется в переменную courses.
		return courses.find(c => c.id === id); // Метод find перебирает все элементы массива courses и возвращает первый элемент, удовлетворяющий условию course.id === id. Если такой элемент не найден, возвращает undefined.
	}
}

module.exports = Course;
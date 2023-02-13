/* let controller = {
	userAction: function(e) {
		let name;
		if (e.className === "todo") {
			name = "todo";
		} else {
			name = e.name;
		}
		switch (name) {
			case 'add':
				model.add();
				break;

			case "delete":
				model.delete(e);
				break;

			case "done":
				model.changeTodoStatus(e);
				break;

			case "active":
				model.changeTodoStatus(e);
				break;
			
			case "todo":
				model.update(e);
				break;
		}	
	}
}

let model = {
	add: function() {
		let todo_text = document.querySelector(".input_text").value;
		let date = new Date();
		if (todo_text === "" || todo_text === undefined) {
			return false;
		}
		view.display(todo_text, date);
		document.querySelector(".input_text").value = "";
	},
	delete: function(e) {
		let elem = e.closest(".elem");
		view.delete(elem);
	},
	changeTodoStatus: function(e) {
		let elem = e.closest(".elem");
		let listStatus = document.querySelector(".todo").dataset.option;
		console.log(listStatus);
		let status;
		if (elem.dataset.status === "active") {
			status = "completed";
		} else {
			status = "active";
		}
		view.changeTodoStatus(elem, status);
	},
	update: function(e) {
		let option = document.querySelector(".options").value;
		view.update(option);
	}
};

let view = {
	display: function(text, date) {
		document.querySelector(".todo").insertAdjacentHTML("beforeend" ,`<li class="elem" data-status = "active"><input type="checkbox" class="ch_box" data-status = "active">${text}<div class="control_panel">
		<button name="delete" class="delete">delete</button>
		<button name="done" class="done">done</button>
		<button name="active" class="active">active</button>
		</div><br><span class = "date">${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}   ${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}<span></li>`);
	},
	delete: function(e) {
		e.remove();
	},
	changeTodoStatus: function(e, stat) {
		e.dataset.status = stat;
	},
	update: function(e) {
		document.querySelector(".todo").dataset.option = e;
	}
};
document.querySelector(".list").addEventListener("click", function(e) {
	let target = e.target;
	controller.userAction(target);
});
document.querySelector(".options").addEventListener("change", function() {
	controller.userAction(document.querySelector("ul"));
}); */

class Controller {
	constructor(model, view) {
		this.model = model;
		this.view = view;
	};
	static add(el) {
		Model.add(View.add, el);
	};
	static delete(el) {
		Model.delete(View.delete, el);
	};
	static changeStatus(el) {
		Model.changeStatus(View.changeStatus, el);
	};
	static update(el) {
		Model.update(View.update, el);
	};
};

class Model {
	static add(callback, element) {
		let title = element.value;
		if (title === "" || title === undefined) {
			return false;
		} else {
			callback(title);
		}
		element.value = "";
	};
	static delete(callback, el) {
		callback(el);
	};
	static changeStatus(callback, el) {
		callback(el);
	};
	static update(callback, el) {
		let status = el.value;
		callback(status);
	}
};

 class View {
	constructor() {
		document.querySelector(".options").addEventListener("change", function() {return Controller.update(document.querySelector(".options"))});
		document.querySelector(".list").addEventListener("click", (e) =>{
			let target = e.target;
			switch (target.className) {
				case "add_btn":
					let input = document.querySelector(".input_text");
					Controller.add(input);
					break;
				case "delete":
					Controller.delete(target);
					break;
				case "done" || "active":
					Controller.changeStatus(target);
					break;
			}
		});
	};
	static add(text) {
		let date = new Date();
		document.querySelector(".todo").insertAdjacentHTML("beforeend" ,`<li class="elem" data-status = "active"><input type="checkbox" class="ch_box" data-status = "active">${text}<div class="control_panel">
		<button name="delete" class="delete">delete</button>
		<button name="done" class="done">done</button>
		<button name="active" class="active">active</button>
		</div><br><span class = "date">${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}   ${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}<span></li>`);
	};
	static delete(element) {
		element.closest(".elem").remove();
	};
	static changeStatus(element) {
		if (element.closest(".elem").dataset.status === "active") {
			element.closest(".elem").dataset.status = "completed"
		} else {
			element.closest(".elem").dataset.status = "active";
		}
	};
	static update(status) {
		document.querySelector(".todo").dataset.option = status;
	}
};

document.addEventListener("DOMContentLoaded", () => {
	let model = new Model();
	let view = new View();
	let controller = new Controller(model, view);
});
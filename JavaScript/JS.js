function create(text){
	return `<li class = "item" data-todo-state="active">
  	<span class="todo__task">${text}
  	<span>добавлено: ${new Date().toLocaleString().slice(0, -3)}</span>
  	</span>
	</li>`};
function edit(){};
function add(){
	let input = document.querySelector('.input__text').value;
	if (input == '' || input == undefined) {
		return false;
	} else {
		document.querySelector('.list').insertAdjacentHTML('afterbegin', create(input));
	}
	document.querySelector('.input__text').value = '';
}
function action(e){
	const target = e.target;
	if (target.classList.contains('item') || target.classList.contains('todo__task')) {
		const elemItem = target.closest('.item');
		const toEdit = target.closest('.todo__task');
		del.addEventListener('click', function(){elemItem.remove()});
		change.addEventListener('click', function(){
			let status = elemItem.dataset.todoState;
			if (status === 'active') {
				elemItem.dataset.todoState = 'completed';
			} else if (status === 'completed') {
				elemItem.dataset.todoState = 'active';
			}
		});
	}

	document.querySelector('.todo_options').addEventListener('change', this.update());
}

function update(){
	let option = document.querySelector('.todo_options').value;
	document.querySelector('.list').dataset.todoOption = option;
}

function rem(){
	let items = document.querySelectorAll('.item');
	for(let i = 0; i < items.length; i++){
		items[i].outerHTML = '';
	}
}
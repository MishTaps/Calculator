// Информация в мониторе
const monitorText = document.querySelector('.monitor__text');
const monitorAction = document.querySelector('.monitor__action');
// Максимальная длина чисел в мониторе
const maxMonitorText = 13;

// Информация о действиях
let actionNow = null;
let isActionJustClicked,
	isError,
	isEqualsJustClicked,
	isPercentWasClicked,
	isDotWasClicked = false;

// Типы действий
const actionType = {
	plus: '+',
	minus: '-',
	multiply: '*',
	divide: '/',
	exp: '^',
	percent: '%',
	equals: '=',
};

// Числа, над которыми производятся действия
let firstNumber,
	secondNumber,
	finalNumber = null;

// Кнопка действий (+, -, *, /, ^)
function addAction(operationType) {
	if (isActionJustClicked) {
		monitorAction.innerHTML = operationType;
		actionNow = operationType;
		return;
	}
	isActionJustClicked = true;
	if (actionNow) {
		secondNumber = monitorText.textContent;
		doAction();
		if (checkUnexpectedError()) {
			return;
		}
		monitorText.innerHTML = finalNumber;
		monitorAction.innerHTML = operationType;
		if (checkMaxLength()) {
			return;
		}
		firstNumber = finalNumber;
		actionNow = operationType;
	} else {
		actionNow = operationType;
		monitorAction.innerHTML = operationType;
		firstNumber = monitorText.textContent;
	}
}
// Кнопка %
function actionPercent() {
	if (!isPercentWasClicked) {
		isPercentWasClicked = true;
		if (firstNumber) {
			secondNumber = (firstNumber / 100) * monitorText.textContent;
			monitorText.innerHTML = secondNumber;
			if (checkMaxLength()) {
				return;
			}
		} else {
			firstNumber = monitorText.textContent / 100;
			finalNumber = firstNumber;
			if (checkUnexpectedError()) {
				return;
			}
			monitorText.innerHTML = firstNumber;
			if (checkMaxLength()) {
				return;
			}
		}
	}
}
// Выполнение действия (+, -, *, /, ^, %)
function doAction() {
	switch (actionNow) {
		case actionType.plus:
			finalNumber = parseFloat(firstNumber) + parseFloat(secondNumber);
			finalNumber = parseFloat(finalNumber.toFixed(3));
			break;
		case actionType.minus:
			finalNumber = parseFloat(firstNumber) - parseFloat(secondNumber);
			finalNumber = parseFloat(finalNumber.toFixed(3));
			break;
		case actionType.multiply:
			finalNumber = parseFloat(firstNumber) * parseFloat(secondNumber);
			break;
		case actionType.divide:
			finalNumber = parseFloat(firstNumber) / parseFloat(secondNumber);
			finalNumber = parseFloat(finalNumber.toFixed(5));
			break;
		case actionType.exp:
			finalNumber = Math.pow(parseFloat(firstNumber), parseFloat(secondNumber));
			finalNumber = parseFloat(finalNumber.toFixed(5));
			break;
		case actionType.percent:
			finalNumber = parseFloat(firstNumber) + parseFloat(secondNumber);
			finalNumber = parseFloat(finalNumber.toFixed(3));
			break;
		default:
			break;
	}
}
// Кнопка =
function actionEquals() {
	isEqualsJustClicked = true;
	if (isActionJustClicked || !firstNumber) {
		monitorAction.innerHTML = actionType.equals;
		return;
	}
	secondNumber = monitorText.textContent;
	monitorAction.innerHTML = actionType.equals;
	doAction();
	if (checkUnexpectedError()) {
		return;
	}
	monitorText.innerHTML = finalNumber;
	if (checkMaxLength()) {
		return;
	}
	actionNow = null;
	return;
}
// Кнопка DEL
function actionDel() {
	monitorText.innerHTML = 0;
	monitorAction.innerHTML = '';
	resetAll();
}
// Кнопка .
function addDot() {
	if (!isDotWasClicked) {
		monitorText.innerHTML += this.value;
		if (checkMaxLength()) {
			return;
		}
		isDotWasClicked = true;
	}
}
// Кнопка добавление номера
function addNumber(number) {
	if (isError) {
		resetAll();
		isError = true;
		return;
	}
	if (monitorText.textContent == '0' || isActionJustClicked || isEqualsJustClicked || isError) {
		isActionJustClicked = false;
		isEqualsJustClicked = false;
		isPercentWasClicked = false;
		isDotWasClicked = false;
		isError = false;
		monitorText.innerHTML = number.value;
	} else {
		monitorText.innerHTML += number.value;
		checkMaxLength();
	}
}
// Сброс параметров, переменных
function resetAll() {
	actionNow = null;
	isActionJustClicked = false;
	isEqualsJustClicked = false;
	isPercentWasClicked = false;
	isDotWasClicked = false;
	isError = false;
	firstNumber = null;
	secondNumber = null;
	finalNumber = null;
}
// Проверки на ошибки
function checkUnexpectedError() {
	if (!isFinite(finalNumber) || finalNumber == null) {
		isError = true;
		monitorText.innerHTML = "<img src='img/error.gif' alt='error' class='monitor__error'>";
		return true;
	}
}
function checkMaxLength() {
	if (monitorText.textContent.length >= maxMonitorText) {
		resetAll();
		isError = true;
		monitorText.textContent = 'too long...';
		return true;
	}
}

// Функции делегирования
function checkNumberElement(event) {
	let target = event.target;

	if (target.id != 'num') return;
	addNumber(event.target);
}
function checkActionElement(event) {
	let target = event.target;

	if (target.id != 'action') return;
	addAction(target.value);
}
// События для кнопок чисел и действий (+, -, *, /, ^)
const elemWorkspace = document.querySelector('.calculator__workspace');
elemWorkspace.addEventListener('click', checkNumberElement);
elemWorkspace.addEventListener('click', checkActionElement);

// Событие для кнопки "DEL"
const elemDelete = document.querySelector('#del');
elemDelete.addEventListener('click', actionDel);

// Событие для кнопки "."
const elemDot = document.querySelector('#dot');
elemDot.addEventListener('click', addDot);

// Событие для кнопки "="
const elemEquals = document.querySelector('#equals');
elemEquals.addEventListener('click', actionEquals);

// Событие для кнопки "%"
const elemPercent = document.querySelector('#percent');
elemPercent.addEventListener('click', actionPercent);

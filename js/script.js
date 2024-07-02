// Информация в дисплее
const displayData = document.querySelector('.display__text');
const displayAction = document.querySelector('.display__action');
// Максимальная длина чисел в дисплее
const MAX_DISPLAY_DATA_LENGTH = 13;

// Информация о действиях
let actionNow = null,
	isActionJustClicked = false,
	isError = false,
	isEqualsJustClicked = false,
	isPercentWasClicked = false,
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
let firstNumber = null,
	secondNumber = null,
	finalNumber = null;

// Кнопка действий (+, -, *, /, ^)
function addAction(operationType) {
	if (isActionJustClicked) {
		displayAction.innerHTML = operationType;
		actionNow = operationType;
		return;
	}
	isActionJustClicked = true;
	if (actionNow) {
		secondNumber = displayData.textContent;
		doAction();
		if (checkUnexpectedError()) {
			return;
		}
		displayData.innerHTML = finalNumber;
		displayAction.innerHTML = operationType;
		if (checkMaxLength()) {
			return;
		}
		firstNumber = finalNumber;
		actionNow = operationType;
	} else {
		actionNow = operationType;
		displayAction.innerHTML = operationType;
		firstNumber = displayData.textContent;
	}
}
// Кнопка %
function actionPercent() {
	if (!isPercentWasClicked) {
		isPercentWasClicked = true;
		if (firstNumber) {
			secondNumber = (firstNumber / 100) * displayData.textContent;
			displayData.innerHTML = secondNumber;
			if (checkMaxLength()) {
				return;
			}
		} else {
			firstNumber = displayData.textContent / 100;
			finalNumber = firstNumber;
			if (checkUnexpectedError()) {
				return;
			}
			displayData.innerHTML = firstNumber;
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
		displayAction.innerHTML = actionType.equals;
		return;
	}
	secondNumber = displayData.textContent;
	displayAction.innerHTML = actionType.equals;
	doAction();
	if (checkUnexpectedError()) {
		return;
	}
	displayData.innerHTML = finalNumber;
	if (checkMaxLength()) {
		return;
	}
	actionNow = null;
	return;
}
// Кнопка DEL
function actionDel() {
	displayData.innerHTML = 0;
	displayAction.innerHTML = '';
	resetAll();
}
// Кнопка .
function addDot() {
	if (!isDotWasClicked) {
		displayData.innerHTML += this.value;
		if (checkMaxLength()) {
			return;
		}
		isDotWasClicked = true;
	}
}
// Кнопка добавление номера
function addNumber(number) {
	if (isError) {
		actionDel();
	}
	if (displayData.textContent == '0' || isActionJustClicked || isEqualsJustClicked || isError) {
		isActionJustClicked = false;
		isEqualsJustClicked = false;
		isPercentWasClicked = false;
		isDotWasClicked = false;
		isError = false;
		displayData.innerHTML = number.value;
	} else {
		displayData.innerHTML += number.value;
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
		displayData.innerHTML = "<img src='img/error.gif' alt='error' class='display__error'>";
		return true;
	}
}
function checkMaxLength() {
	if (displayData.textContent.length >= MAX_DISPLAY_DATA_LENGTH) {
		resetAll();
		isError = true;
		displayData.textContent = 'too long...';
		return true;
	}
}

// Функции делегирования
function checkNumberElement(event) {
	let target = event.target;

	if (target.classList[2] != 'num') return;
	addNumber(event.target);
}
function checkActionElement(event) {
	let target = event.target;

	if (target.classList[2] != 'action') return;
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

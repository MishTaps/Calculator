// Информация в мониторе
let monitorText = document.querySelector('.monitor__text');
let monitorAction = document.querySelector('.monitor__action');
// Максимальная длина чисел в мониторе
let maxMonitorText = 13;

// Информация о действиях
let actionNow = null;
let isActionJustClicked,
	isError,
	isEqualsJustClicked,
	isPercentWasClicked,
	isDotWasClicked = false;

// Числа, над которыми производятся действия
let firstNumber,
	secondNumber,
	finalNumber = null;

// Функции кнопок
function actionPlus() {
	if (isActionJustClicked) {
		monitorAction.innerHTML = '+';
		actionNow = '+';
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
		if (checkMaxLength()) {
			return;
		}
		firstNumber = finalNumber;
		actionNow = '+';
	} else {
		actionNow = '+';
		monitorAction.innerHTML = '+';
		firstNumber = monitorText.textContent;
	}
}
function actionMinus() {
	if (isActionJustClicked) {
		monitorAction.innerHTML = '-';
		actionNow = '-';
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
		if (checkMaxLength()) {
			return;
		}
		firstNumber = finalNumber;
		actionNow = '-';
	} else {
		actionNow = '-';
		monitorAction.innerHTML = '-';
		firstNumber = monitorText.textContent;
	}
}
function actionMultiply() {
	if (isActionJustClicked) {
		monitorAction.innerHTML = '*';
		actionNow = '*';
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
		if (checkMaxLength()) {
			return;
		}
		firstNumber = finalNumber;
		actionNow = '*';
	} else {
		actionNow = '*';
		monitorAction.innerHTML = '*';
		firstNumber = monitorText.textContent;
	}
}
function actionDivide() {
	if (isActionJustClicked) {
		monitorAction.innerHTML = '/';
		actionNow = '/';
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
		if (checkMaxLength()) {
			return;
		}
		firstNumber = finalNumber;
		actionNow = '/';
	} else {
		actionNow = '/';
		monitorAction.innerHTML = '/';
		firstNumber = monitorText.textContent;
	}
}
function actionExp() {
	if (isActionJustClicked) {
		monitorAction.innerHTML = '^';
		actionNow = '^';
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
		if (checkMaxLength()) {
			return;
		}
		firstNumber = finalNumber;
		actionNow = '^';
	} else {
		actionNow = '^';
		monitorAction.innerHTML = '^';
		firstNumber = monitorText.textContent;
	}
}
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
function doAction() {
	switch (actionNow) {
		case '+':
			finalNumber = parseFloat(firstNumber) + parseFloat(secondNumber);
			finalNumber = parseFloat(finalNumber.toFixed(3));
			break;
		case '-':
			finalNumber = parseFloat(firstNumber) - parseFloat(secondNumber);
			finalNumber = parseFloat(finalNumber.toFixed(3));
			break;
		case '*':
			finalNumber = parseFloat(firstNumber) * parseFloat(secondNumber);
			break;
		case '/':
			finalNumber = parseFloat(firstNumber) / parseFloat(secondNumber);
			finalNumber = parseFloat(finalNumber.toFixed(5));
			break;
		case '^':
			finalNumber = Math.pow(parseFloat(firstNumber), parseFloat(secondNumber));
			finalNumber = parseFloat(finalNumber.toFixed(5));
			break;
		case '%':
			finalNumber = parseFloat(firstNumber) + parseFloat(secondNumber);
			finalNumber = parseFloat(finalNumber.toFixed(3));
			break;
		default:
			break;
	}
}
function actionEquals() {
	isEqualsJustClicked = true;
	if (isActionJustClicked || !firstNumber) {
		monitorAction.innerHTML = '=';
		return;
	}
	secondNumber = monitorText.textContent;
	doAction();
	if (checkUnexpectedError()) {
		return;
	}
	monitorText.innerHTML = finalNumber;
	if (checkMaxLength()) {
		return;
	}
	actionNow = null;
	monitorAction.innerHTML = '=';
	return;
}
function actionDel() {
	monitorText.innerHTML = 0;
	monitorAction.innerHTML = '';
	resetAll();
}
function addDot() {
	if (!isDotWasClicked) {
		monitorText.innerHTML += this.value;
		if (checkMaxLength()) {
			return;
		}
		isDotWasClicked = true;
	}
}
function checkNumberElement(event) {
	let target = event.target;

	if (target.id != 'num') return;
	addNumber(event.target);
}
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
// Событие для кнопок-чисел (будет переписано под делегирование)
let elemWorkspace = document.querySelector('.body');
elemWorkspace.addEventListener('click', checkNumberElement);

// Событие для кнопки "DEL"
let elemDelete = document.querySelector('#del');
elemDelete.addEventListener('click', actionDel);

// Событие для кнопки "."
let elemDot = document.querySelector('#dot');
elemDot.addEventListener('click', addDot);

// Событие для кнопки "="
let elemEquals = document.querySelector('#equals');
elemEquals.addEventListener('click', actionEquals);

// Событие для кнопки "+"
let elemPlus = document.querySelector('#plus');
elemPlus.addEventListener('click', actionPlus);

// Событие для кнопки "-"
let elemMinus = document.querySelector('#minus');
elemMinus.addEventListener('click', actionMinus);

// Событие для кнопки "*"
let elemMultiply = document.querySelector('#multiply');
elemMultiply.addEventListener('click', actionMultiply);

// Событие для кнопки "/"
let elemDivide = document.querySelector('#divide');
elemDivide.addEventListener('click', actionDivide);

// Событие для кнопки "^"
let elemExp = document.querySelector('#exp');
elemExp.addEventListener('click', actionExp);

let elemPercent = document.querySelector('#percent');
elemPercent.addEventListener('click', actionPercent);

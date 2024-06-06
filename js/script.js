// Информация в мониторе
let monitorText = document.querySelector('.monitor__text');
let monitorAction = document.querySelector('.monitor__action');

// Информация о действиях
let isActionWasClicked,
	isActionActive,
	isPlusWasClicked,
	isMinusWasClicked,
	isMultiplyWasClicked,
	isDivideWasClicked,
	isEpxWasClicked,
	isEqualsWasClicked,
	isDotWasClicked,
	isPercentWasClicked = false;

// Числа, над которыми производятся действия
let firstNumber,
	secondNumber,
	finalNumber = null;

// Функции операций
function actionPlus() {
	isActionWasClicked = true;
	isActionActive = true;
	isPlusWasClicked = true;
	monitorAction.innerHTML = '+';
	firstNumber = monitorText.textContent;
}
function actionMinus() {
	isActionWasClicked = true;
	isActionActive = true;
	isMinusWasClicked = true;
	monitorAction.innerHTML = '-';
	firstNumber = monitorText.textContent;
}
function actionMultiply() {
	isActionWasClicked = true;
	isActionActive = true;
	isMultiplyWasClicked = true;
	monitorAction.innerHTML = '*';
	firstNumber = monitorText.textContent;
}
function actionDivide() {
	isActionWasClicked = true;
	isDivideWasClicked = true;
	isActionActive = true;
	monitorAction.innerHTML = '/';
	firstNumber = monitorText.textContent;
}
function actionExp() {
	isActionWasClicked = true;
	isEpxWasClicked = true;
	monitorAction.innerHTML = '^';
	firstNumber = monitorText.textContent;
}
function actionPercent() {
	if (isPercentWasClicked) {
		return;
	}
	isPercentWasClicked = true;
	if (firstNumber) {
		secondNumber = monitorText.textContent;
		alert(secondNumber);
	} else {
		firstNumber = monitorText.textContent;
		alert(firstNumber);
	}
	monitorText.innerHTML += '%';
}
function doAction() {
	if (isPlusWasClicked) {
		finalNumber = parseFloat(firstNumber) + parseFloat(secondNumber);
	}
	if (isMinusWasClicked) {
		finalNumber = parseFloat(firstNumber) - parseFloat(secondNumber);
	}
	if (isMultiplyWasClicked) {
		finalNumber = parseFloat(firstNumber) * parseFloat(secondNumber);
	}
	if (isDivideWasClicked) {
		finalNumber = parseFloat(firstNumber) / parseFloat(secondNumber);
	}
	if (isEpxWasClicked) {
		finalNumber = Math.pow(parseFloat(firstNumber), parseFloat(secondNumber));
	}
}
function actionEquals() {
	isEqualsWasClicked = true;
	monitorAction.innerHTML = '=';
	secondNumber = monitorText.textContent;
	if (isPercentWasClicked) {
		if (!isActionActive) {
			finalNumber = firstNumber / 100;
		} else {
			secondNumber = (firstNumber / 100) * secondNumber;
			alert(firstNumber);
			alert(secondNumber);
			doAction();
		}
	}
	doAction();
	if (!isFinite(finalNumber)) {
		monitorText.innerHTML = "<img src='img/error.gif' alt='error' class='monitor__error'>";
		return;
	}
	isPercentWasClicked = false;
	isActionActive = false;
	monitorText.innerHTML = finalNumber;
	return;
}

// Событие для кнопок-чисел
let elemNumber = document.querySelectorAll('#num');
for (let i = 0; i <= 9; i++) {
	elemNumber[i].onclick = function (event) {
		if (monitorText.textContent == '0' || isActionWasClicked) {
			isDotWasClicked = false;
			monitorText.innerHTML = this.value;
			isActionWasClicked = false;
		} else {
			monitorText.innerHTML += this.value;
		}
	};
}

// Событие для кнопки удаления
let elemDelete = document.querySelector('#del');
elemDelete.onclick = function (event) {
	monitorText.innerHTML = 0;
	isDotWasClicked = false;
	monitorAction.innerHTML = '';
	isPercentWasClicked = false;
	isActionActive = false;
};

// Событие для кнопки-точки
let elemDot = document.querySelector('#dot');
elemDot.onclick = function (event) {
	if (isDotWasClicked == false) {
		monitorText.innerHTML += this.value;
		isDotWasClicked = true;
	}
};

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

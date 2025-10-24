const displayEl = document.querySelector("#display");
const operandEl = document.querySelector("#operand-container");
const clrBtnEl = document.querySelector("#btn-clr");
const dltBtnEl = document.querySelector("#btn-dlt");
const eqlBtnEl = document.querySelector("#btn-eql");
const perBtnEl = document.querySelector("#btn-per");
const operatorBtnElList = document.querySelectorAll(".operators");

let num1 = null,
	num2 = null,
	operator = null,
	isOperatorClicked = false,
	isEqualClicked = false;

function resetOperator() {
	operatorBtnElList.forEach((element) => {
		element.classList.remove("change-background");
	});
	isOperatorClicked = false;
}

function clearAll() {
	console.log("=============== All Clear ===================="); // =================================================
	num1 = null;
	num2 = null;
	isEqualClicked = false;
	resetOperator();
}

function responseToDltClick() {
	if (displayEl.value == "Undefined") {
		return;
	}
	if (
		displayEl.value == "-0" ||
		displayEl.value == "0." ||
		displayEl.value.length == 1 ||
		isOperatorClicked
	) {
		displayEl.value = "0";
		clrBtnEl.textContent = "AC";
		resetOperator();
	} else if (displayEl.value.length == 2 && displayEl.value[0] == "-") {
		displayEl.value = "-0";
	} else {
		displayEl.value = displayEl.value.slice(0, -1);
	}
}

function responseToClrClick() {
	if (displayEl.value == "Undefined") {
		displayEl.value = "0";
		clearAll();
	} else if (displayEl.value == "0") {
		clearAll();
	} else {
		displayEl.value = "0";
		clrBtnEl.textContent = "AC";
	}
}

function displayNumber(char) {
	if (displayEl.value == "Undefined") {
	} else {
		if (char == "+/-" || char == "+" || char == "-") {
			if (isOperatorClicked) {
				displayEl.value = "0";
				resetOperator();
			}
			if (isEqualClicked) {
				clearAll();
			}
			if (displayEl.value[0] != "-") {
				displayEl.value = "-" + displayEl.value;
			} else {
				displayEl.value = displayEl.value.slice(1);
			}
		} else if (
			char.length == 1 &&
			displayEl.value.length <= 20 &&
			!(displayEl.value == "0" && char == "0")
		) {
			if (isOperatorClicked) {
				displayEl.value = "0";
				resetOperator();
			}
			if (isEqualClicked) {
				displayEl.value = "0";
				clearAll();
			}

			if (char == ".") {
				if (!displayEl.value.includes(".")) {
					displayEl.value = displayEl.value + char;
				}
			} else {
				if (displayEl.value == "0") {
					displayEl.value = char;
				} else if (displayEl.value == "-0") {
					displayEl.value = "-" + char;
				} else {
					displayEl.value = displayEl.value + char;
				}
			}
		}
		if (displayEl.value == "0") {
			clrBtnEl.textContent = "AC";
		} else {
			clrBtnEl.textContent = "C";
		}
	}
}

function responseToOperandClick(event) {
	const char = event.target.textContent;
	displayNumber(char);
}

function calculateResult() {
	switch (operator) {
		case "+":
			console.log(`Operation: ${num1} + ${num2} = ${num1 + num2}`); // ==========================================
			return num1 + num2;
		case "-":
			console.log(`Operation: ${num1} - ${num2} = ${num1 - num2}`); // ==========================================
			return num1 - num2;
		case "X":
			console.log(`Operation: ${num1} * ${num2} = ${num1 * num2}`); // ==========================================
			return num1 * num2;
		case "/":
			console.log(`Operation: ${num1} / ${num2} = ${num1 / num2}`); // ==========================================
			return num1 / num2;
		default:
			console.log("Wrong operator" + operator);
	}
}

function operate(newOperator) {
	if (displayEl.value == "Undefined") {
		return;
	}
	if (isEqualClicked) {
		clearAll();
	}
	if (num1 == null) {
		num1 = Number(displayEl.value);
		console.log("num1 assigned: " + num1); // =============================================
	} else if (num2 == null && !isOperatorClicked) {
		if (
			(displayEl.value == "0" || displayEl.value == "-0") &&
			operator == "/"
		) {
			displayEl.value = "Undefined";
			resetOperator();
			clrBtnEl.textContent = "AC";
		} else {
			num2 = Number(displayEl.value);
			console.log("num2 assigned: " + num2); // =============================================
			const result = calculateResult();
			displayEl.value = result;
			num1 = result;
		}
	}
	num2 = null;
	resetOperator();
	operator = newOperator;
	operatorBtnElList.forEach((element) => {
		if (element.textContent == operator) {
			element.classList.toggle("change-background");
		}
	});
	console.log("operator assigned: " + operator); // ==============================================
	isOperatorClicked = true;
}

function responseToOperatorsClick(event) {
	operate(event.target.textContent);
}

function responseToEqlClick() {
	if (displayEl.value == "Undefined" || isOperatorClicked) {
		return;
	}
	console.log("====================EQUALS=================="); // ===========================================================
	if (num1 != null && num2 == null) {
		num2 = Number(displayEl.value);
		console.log("num2 assigned: " + num2); // =============================================
	}
	if (num2 != null) {
		if (num2 == 0 && operator == "/") {
			displayEl.value = "Undefined";
			resetOperator();
			clrBtnEl.textContent = "AC";
		} else {
			const result = calculateResult();
			displayEl.value = result;
			num1 = result;
			isEqualClicked = true;
		}
	}
}

function responseToPerClick() {
	if (displayEl.value == "Undefined" || isOperatorClicked) {
		return;
	}
	if (num1 == null) {
		displayEl.value = Number(displayEl.value) / 100;
	} else {
		console.log(
			`${num1} X ${(Number(displayEl.value) * num1) / 100}% = ${
				(Number(displayEl.value) * num1) / 100
			}`
		); // ============================================================
		displayEl.value = (Number(displayEl.value) * num1) / 100;
	}
}

function responseToKeyboardClick(event) {
	let key = event.key;
	if (("0" <= key && key <= "9") || key == ".") {
		displayNumber(key);
	} else if (key == "Backspace") {
		responseToDltClick();
	} else if (key == "c" || key == "C") {
		responseToClrClick();
	} else if ("+-*/".includes(key)) {
		if (key == "*") {
			key = "X";
		}
		operate(key);
	} else if (key == "=" || key == "Enter") {
		responseToEqlClick();
	} else if (key == "%") {
		responseToPerClick();
	}
}

dltBtnEl.addEventListener("click", responseToDltClick);
clrBtnEl.addEventListener("click", responseToClrClick);
operandEl.addEventListener("click", responseToOperandClick);
operatorBtnElList.forEach((element) => {
	element.addEventListener("click", responseToOperatorsClick);
});
eqlBtnEl.addEventListener("click", responseToEqlClick);
perBtnEl.addEventListener("click", responseToPerClick);
document.addEventListener("keydown", responseToKeyboardClick);

const displayEl = document.querySelector("#display");
const operandEl = document.querySelector("#operand-container");
const clrBtnEl = document.querySelector("#btn-clr");
const dltBtnEl = document.querySelector("#btn-dlt");
const eqlBtnEl = document.querySelector("#btn-eql");
const perBtnEl = document.querySelector("#btn-per");
const operatorBtnElList = document.querySelectorAll(".operators");

displayEl.value = "0";

let num1 = null,
	num2 = null,
	operator = null,
	isOperatorClicked = false,
	isEqualClicked = false;

function clearAll() {
	console.log("=============== All Clear ===================="); // =================================================
	num1 = null;
	num2 = null;
	isEqualClicked = false;
	isOperatorClicked = false;
}

operandEl.addEventListener("click", (e) => {
	if (displayEl.value == "Undefined") {
		return;
	}
	const char = e.target.textContent;
	if (char == "+/-" || char == "+" || char == "-") {
		if (isOperatorClicked) {
			displayEl.value = "0";
			isOperatorClicked = false;
		}
		if (isEqualClicked) {
			displayEl.value = "0";
			clearAll();
		}
		if (displayEl.value == "0") {
		} else if (displayEl.value[0] != "-") {
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
			isOperatorClicked = false;
		}
		if (isEqualClicked) {
			displayEl.value = "0";
			clearAll();
		}
		if (char != "." || (char == "." && !displayEl.value.includes("."))) {
			displayEl.value =
				(displayEl.value == "0" ? "" : displayEl.value) + char;
			clrBtnEl.textContent = "C";
		}
	}
});

clrBtnEl.addEventListener("click", () => {
	if (displayEl.value == "Undefined") {
		displayEl.value = "0";
		clearAll();
	} else if (displayEl.value == "0") {
		clearAll();
	} else {
		displayEl.value = "0";
		clrBtnEl.textContent = "AC";
	}
});

dltBtnEl.addEventListener("click", () => {
	if (displayEl.value == "Undefined") {
		return;
	}
	if (displayEl.value.length == 1 || isOperatorClicked) {
		displayEl.value = "0";
		clrBtnEl.textContent = "AC";
		isOperatorClicked = false;
	} else {
		displayEl.value = displayEl.value.slice(0, -1);
	}
});

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

Array.from(operatorBtnElList).forEach((element) => {
	element.addEventListener("click", (event) => {
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
			if (displayEl.value == "0" && operator == "/") {
				displayEl.value = "Undefined";
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
		operator = event.target.textContent;
		console.log("operator assigned: " + operator); // ==============================================
		isOperatorClicked = true;
	});
});

eqlBtnEl.addEventListener("click", () => {
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
			clrBtnEl.textContent = "AC";
		} else {
			const result = calculateResult();
			displayEl.value = result;
			num1 = result;
			isEqualClicked = true;
		}
	}
});

perBtnEl.addEventListener("click", () => {
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
});

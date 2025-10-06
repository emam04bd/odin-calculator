const displayEl = document.querySelector("#display");
const operandEl = document.querySelector("#operand-container");
const clrBtnEl = document.querySelector("#btn-clr");
const dltBtnEl = document.querySelector("#btn-dlt");
const eqlBtnEl = document.querySelector("#btn-eql");
const operatorBtnElList = document.querySelectorAll(".operators");

displayEl.value = "0";

let num1 = null,
	num2 = null,
	operator = null,
	isOperatorClicked = false,
	isEqualClicked = false;

function clearScreen() {
	displayEl.value = "0";
	isOperatorClicked = false;
}

function clearAll() {
	console.log("=============== All Clear ===================="); // =================================================
	num1 = null;
	num2 = null;
	isEqualClicked = false;
}

operandEl.addEventListener("click", (e) => {
	const char = e.target.textContent;
	if (char == "+/-" || char == "+" || char == "-") {
		if (isOperatorClicked) {
			if (isEqualClicked) {
				clearAll();
			}
			clearScreen();
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
			if (isEqualClicked) {
				clearAll();
			}
			clearScreen();
		}
		if (char != "." || (char == "." && !displayEl.value.includes("."))) {
			displayEl.value =
				(displayEl.value == "0" ? "" : displayEl.value) + char;
			clrBtnEl.textContent = "C";
		}
	}
});

clrBtnEl.addEventListener("click", () => {
	if (displayEl.value != "0") {
		clearScreen();
		clrBtnEl.textContent = "AC";
	} else {
		clearAll();
	}
});

dltBtnEl.addEventListener("click", () => {
	if (displayEl.value.length == 1) {
		displayEl.value = "0";
		clrBtnEl.textContent = "AC";
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
		if (isEqualClicked) {
			clearAll();
		}
		if (num1 == null) {
			num1 = Number(displayEl.value);
			console.log("num1 assigned: " + num1); // =============================================
		} else if (num2 == null && !isOperatorClicked) {
			num2 = Number(displayEl.value);
			console.log("num2 assigned: " + num2); // =============================================
			const result = calculateResult();
			displayEl.value = result;
			num1 = result;
		}
		num2 = null;
		operator = event.target.textContent;
		console.log("operator assigned: " + operator); // ==============================================
		isOperatorClicked = true;
	});
});

eqlBtnEl.addEventListener("click", () => {
	console.log("====================EQUALS=================="); // ===========================================================
	if (num1 != null && num2 == null) {
		num2 = Number(displayEl.value);
		console.log("num2 assigned: " + num2); // =============================================
	}
	if (num2) {
		const result = calculateResult();
		displayEl.value = result;
		num1 = result;
		isEqualClicked = true;
	}
});

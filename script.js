const displayEl = document.querySelector("#display");
const operandEl = document.querySelector("#operand-container");
const clrBtnEl = document.querySelector("#btn-clr");
const dltBtnEl = document.querySelector("#btn-dlt");
const addBtnEl = document.querySelector("#btn-add");
const eqlBtnEl = document.querySelector("#btn-eql");

displayEl.value = "0";

let num1 = null,
	num2 = null,
	isOperatorClicked = false,
	isEqualClicked = false;

function clearScreen() {
	displayEl.value = "0";
	isOperatorClicked = false;
}

function clearAll() {
	displayEl.value = "0";
	num1 = null;
	num2 = null;
	isOperatorClicked = false;
	isEqualClicked = false;
}

operandEl.addEventListener("click", (e) => {
	const char = e.target.textContent;
	if (char == "+/-" || char == "+" || char == "-") {
		if (isOperatorClicked) {
			clearScreen();
		}
		if (isEqualClicked) {
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
			clearScreen();
		}
		if (isEqualClicked) {
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
	if (displayEl.value != "0") {
		clearScreen();
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

addBtnEl.addEventListener("click", () => {
	if (num1 == null) {
		num1 = Number(displayEl.value);
	} else if (num2 == null && !isOperatorClicked) {
		num2 = Number(displayEl.value);
		const result = num1 + num2;
		displayEl.value = result;
		num1 = result;
	}
	isOperatorClicked = true;
});

eqlBtnEl.addEventListener("click", () => {
	if (num1 != null && num2 == null) {
		num2 = Number(displayEl.value);
	}
	if (num2) {
		const result = num1 + num2;
		displayEl.value = result;
		num1 = result;
		isEqualClicked = true;
	}
});

const operandEl = document.querySelector("#operand");
const displayEl = document.querySelector("#display");
const clrBtnEl = document.querySelector("#btn-clr");
const dltBtnEl = document.querySelector("#btn-dlt");

operandEl.addEventListener("click", (e) => {
	const char = e.target.textContent;
	const text = displayEl.value;
	if (char.length == 1 && text.length <= 20) {
		if (char != "." || (char == "." && !text.includes("."))) {
			displayEl.value = text + char;
		}
	} else if (char == "+/-") {
		if (text[0] != "-") {
			displayEl.value = "-" + text;
		} else {
			displayEl.value = text.slice(1);
		}
	}
});

clrBtnEl.addEventListener("click", () => {
	displayEl.value = "";
});

dltBtnEl.addEventListener("click", () => {
	displayEl.value = displayEl.value.slice(0, -1);
});

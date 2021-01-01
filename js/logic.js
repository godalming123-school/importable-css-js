//vars
var root = document.querySelector(":root");
var popupContainer = document.querySelector(".popups");
var popups = document.querySelectorAll(".popups > *")
var settingsContent = document.getElementById("settings").appendChild(
	document.createElement("content")
);

//functions
export function updateCssVarAndTextOnChangedInput(label, input, cssVar, addToCssVar) {
	label.innerHTML = input.value;
	root.style.setProperty(cssVar, input.value + addToCssVar);//if addToCssVar isnt defined this wile return a error
}

export function liveInputToCssVarAndLabel (label, input, cssVar, addToCssVar) {
	updateCssVarAndTextOnChangedInput(label, input, cssVar, addToCssVar);
	input.oninput = () => {
		updateCssVarAndTextOnChangedInput(label, input, cssVar, addToCssVar);
	};
}

export function CreateSetting(name, cssVarToChange, extraCode, addToVariable, settingType = "range") {
	var settingsContainer = settingsContent.appendChild(document.createElement("label"));
	settingsContainer.append(name)
	
	var settingsInput = settingsContainer.appendChild(document.createElement("input"));
	settingsInput.setAttribute("type", settingType);

	var settingsLabel = settingsContainer.appendChild(document.createElement("span"))

	extraCode(settingsInput);

	// updating everything when settings changes
	liveInputToCssVarAndLabel(settingsLabel, settingsInput, cssVarToChange, addToVariable);
}

// functions for navigation and show or hide system
function ShowOrHideBasedOnShowOrHidePropertyOfElement () {
	document.querySelector(this.attributes.showOrHide).classList.toggle("hide")
	popupContainer.classList.toggle("backdrop")
}

// executions
document.querySelectorAll("*[show-or-hide]").forEach(item => {
	item.attributes.showOrHide = item.getAttribute("show-or-hide");
	item.addEventListener ("click", ShowOrHideBasedOnShowOrHidePropertyOfElement, false)
})

popupContainer.addEventListener("click", () => {
	popups.forEach(popup => {
		popup.classList.add("hide");
	})
	popupContainer.classList.remove("backdrop");
}, false)

//create settings
main.CreateSetting(
	"animation duration",
	"--transition",
	function (settingsInput) {
		settingsInput.setAttribute("min", 0);
		settingsInput.setAttribute("max", 4);
		settingsInput.setAttribute("value", 1);
	},
	"s",
	"range"
);

main.CreateSetting(
	"roundness",
	"--border-radius",
	function (settingsInput) {
		settingsInput.setAttribute("step", 0.2)
		settingsInput.setAttribute("min", 0);
		settingsInput.setAttribute("max", 4);
		settingsInput.setAttribute("value", 1);
	},
	"vh",
	"range"
);
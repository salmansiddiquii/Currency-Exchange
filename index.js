const BASE_URL =
  "https://v6.exchangerate-api.com/v6/ccc0f785237af8090658e349/pair";

const dropDowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
for (let select of dropDowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    select.append(newOption);

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "Selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "Selected";
    }
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  console.log(element.value);
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}//flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}/${fromCurr.value}/${toCurr.value}`;
  const response = await fetch(URL);
  const data = await response.json();
  console.log(
    `${data.base_code} = ${parseFloat(data.conversion_rate.toFixed(2))}${
      data.target_code
    }`
  );

  const rate = parseFloat(data.conversion_rate.toFixed(2));
  console.log(rate);

  let finalAmt = amount.value * rate;
  let finalExchangeRate = `${amount.value} = ${finalAmt}`;
  msg.innerHTML = finalExchangeRate;
  console.log(finalAmt);
});

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();

  const spinner = btn.querySelector(".spinner");
  spinner.style.display = "inline-block";
  btn.disabled = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
  } catch (error) {
    console.error("Error:", error);
    msg.innerHTML = "Failed to convert.";
  } finally {
    spinner.style.display = "none";
    btn.disabled = false;
  }
});

function updateProgressBar() {
  console.log("version 2");
  
  document
    .querySelectorAll(".calc-grogress")
    .forEach(el => el.classList.remove("active"));

  if (currentStep === 0) {

    document
      .getElementById("progress-step-0")
      ?.classList.add("active");

  } else if (currentStep === 1) {

    document
      .getElementById("progress-step-1")
      ?.classList.add("active");

  } else if (currentStep >= 2 && currentStep <= 6) {

    document
      .getElementById("progress-step-2")
      ?.classList.add("active");

  }

  const progressWrap =
    document.querySelector(".calc_progress");

  if (progressWrap) {

    progressWrap.classList.toggle(
      "hidden",
      currentStep === 7
    );

  }

  updateYearNodes();
  updateYearProgress();

}


function updateYearNodes() {

  const yearNodes = [
    document.querySelector("[data-first-year]"),
    document.querySelector("[data-second-year]"),
    document.querySelector("[data-third-year]"),
    document.querySelector("[data-fourth-year]"),
    document.querySelector("[data-fifth-year]"),
  ];

  yearNodes.forEach((node, index) => {

    if (!node) return;

    node.textContent = taxYears[index] || "";

  });

  if (currentStep < 2) {

    yearNodes.forEach(node => {

      if (!node) return;

      node.classList.remove("hidden");

      node.previousElementSibling
        ?.classList.remove("hidden");

    });

    return;

  }

  yearNodes.forEach(node => {

    if (!node) return;

    const year = node.textContent.trim();

    const isSelected =
      state.selectedYears.includes(year);

    node.classList.toggle("hidden", !isSelected);

    node.previousElementSibling
      ?.classList.toggle("hidden", !isSelected);

  });

}


function updateYearProgress() {

  if (currentStep < 2) return;

  const yearNodes = [
    document.querySelector("[data-first-year]"),
    document.querySelector("[data-second-year]"),
    document.querySelector("[data-third-year]"),
    document.querySelector("[data-fourth-year]"),
    document.querySelector("[data-fifth-year]"),
  ];

  yearNodes.forEach((node, index) => {

    if (!node) return;

    const year = node.textContent.trim();

    if (!state.selectedYears.includes(year)) return;
    const isFirstSelected =
      year === state.selectedYears[0];

    if (isFirstSelected) {

      node.classList.add("active");

      return;

    }

    // Решта — перевіряємо стейт
    const data = state.years[year] || {};

    const isFilled =
      !!data.grossAnnualSalary &&
      !!data.employeeContribution &&
      !!data.employerContribution &&
      !!data.pensionScheme;

    node.classList.toggle("active", isFilled);

  });

}

  
document.addEventListener("click", (e) => {

  const toggle = e.target.closest(
    "[data-add-toggle]"
  );

  if (!toggle) return;

  const wrapper = toggle.closest(
    "[data-add-wrapper]"
  );

  if (!wrapper) return;

  const block = wrapper.querySelector(
    "[data-add-block]"
  );

  const active =
    wrapper.classList.contains("active");

  if (active) {

    wrapper.classList.remove("active");

    block
      .querySelectorAll("input")
      .forEach(input => {

        input.value = "";

        input.dispatchEvent(
          new Event("input", {
            bubbles: true
          })
        );

      });

  } else {

    wrapper.classList.add("active");

  }

});
  
const navCalculate = document.getElementById("navCalculate");
  
function renderResults(results) {

  const {
    total,
    years,
    status,
    messages
  } = results;

  document
    .querySelectorAll(
      "[data-total-result]"
    )
    .forEach(el => {

      el.textContent =
        `£${total.toLocaleString()}`;

    });

  const eligible =
    document.getElementById(
      "eligible"
    );

  if (eligible) {

    eligible.textContent =
      status;

  }

  const rows =
    document.querySelectorAll(
      "[data-result-row]"
    );

  rows.forEach(row => {

    row.classList.remove(
      "active"
    );

  });

  years.forEach(
    (
      item,
      index
    ) => {

      const row =
        rows[index];

      if (!row) return;

      row.classList.add(
        "active"
      );

      row.querySelector(
        "[data-result-year]"
      ).textContent =
        item.year;

      row.querySelector(
        "[data-result]"
      ).textContent =
        `£${item.amount.toLocaleString()}`;

    }
  );

  document
    .querySelectorAll(
      "[data-message]"
    )
    .forEach(el => {

      el.classList.remove(
        "active"
      );

    });

  messages.forEach(
    message => {

      document
        .querySelector(
          `[data-message="${message}"]`
        )
        ?.classList.add(
          "active"
        );

    }
  );

}


const AAR = {

  "2026/27": {
    std: 60000,
    min: 10000,
    ti: 200000,
    ai: 260000,

    pa: 12570,
    paWd: 100000
  },

  "2025/26": {
    std: 60000,
    min: 10000,
    ti: 200000,
    ai: 260000,

    pa: 12570,
    paWd: 100000
  },

  "2024/25": {
    std: 60000,
    min: 10000,
    ti: 200000,
    ai: 260000,

    pa: 12570,
    paWd: 100000
  },

  "2023/24": {
    std: 60000,
    min: 10000,
    ti: 200000,
    ai: 260000,

    pa: 12570,
    paWd: 100000
  },

  "2022/23": {
    std: 40000,
    min: 4000,
    ti: 200000,
    ai: 240000,

    pa: 12570,
    paWd: 100000
  }

};

const BND_RUK = {
  "2026/27": { basicBand: 37700, higher: 112570, rHigher: 0.40, rTop: 0.45 },
  "2025/26": { basicBand: 37700, higher: 112570, rHigher: 0.40, rTop: 0.45 },
  "2024/25": { basicBand: 37700, higher: 112570, rHigher: 0.40, rTop: 0.45 },
  "2023/24": { basicBand: 37700, higher: 112570, rHigher: 0.40, rTop: 0.45 },
  "2022/23": { basicBand: 37700, higher: 137430, rHigher: 0.40, rTop: 0.45 }, // особливий поріг
};

const BND_SCOT = {
  "2026/27": { starter: 3967, basic: 16956, inter: 31092, higher: 62430, advanced: 112570, rHigher: 0.42, rAdvanced: 0.45, rTop: 0.48 },
  "2025/26": { starter: 2827, basic: 14921, inter: 31092, higher: 62430, advanced: 112570, rHigher: 0.42, rAdvanced: 0.45, rTop: 0.48 },
  "2024/25": { starter: 2306, basic: 13991, inter: 31092, higher: 62430, advanced: 112570, rHigher: 0.42, rAdvanced: 0.45, rTop: 0.48 },
  "2023/24": { starter: 2162, basic: 13118, inter: 31092, higher: 112570, advanced: null,   rHigher: 0.42, rAdvanced: null, rTop: 0.47 },
  "2022/23": { starter: 2162, basic: 13118, inter: 31092, higher: 137430, advanced: null,   rHigher: 0.41, rAdvanced: null, rTop: 0.46 },
};


function calcTaxRUK(taxable, year, extension = 0) {
  if (taxable <= 0) return 0;

  const band = BND_RUK[year];
  const extBasic = band.basicBand + extension;
  const extHigher = band.higher + extension;

  let tax = 0;

  const basicPart = Math.min(taxable, extBasic);
  tax += basicPart * 0.20;

  const higherPart = Math.max(0, Math.min(taxable, extHigher) - extBasic);
  tax += higherPart * band.rHigher;

  const additionalPart = Math.max(0, taxable - extHigher);
  tax += additionalPart * band.rTop;

  return tax;
}

function calcTaxScot(taxable, year, extension = 0) {
  if (taxable <= 0) return 0;

  const band = BND_SCOT[year];
  let rem = taxable;
  let tax = 0;

  const s  = band.starter  + extension;
  const bs = band.basic    + extension;
  const it = band.inter    + extension;
  const hr = band.higher   + extension;
  const av = band.advanced !== null ? band.advanced + extension : null;

  const inS = Math.min(rem, s);          tax += inS * 0.19; rem -= inS;
  const inB = Math.min(rem, bs - s);     tax += inB * 0.20; rem -= inB;
  const inI = Math.min(rem, it - bs);    tax += inI * 0.21; rem -= inI;
  const inH = Math.min(rem, hr - it);    tax += inH * band.rHigher; rem -= inH;

  if (av !== null) {
    const inA = Math.min(rem, av - hr);
    tax += inA * band.rAdvanced;
    rem -= inA;
  }

  if (rem > 0) tax += rem * band.rTop;

  return tax;
}

function calcTax(taxable, year, extension = 0, region = "ew") {
    return region === "sc"
      ? calcTaxScot(taxable, year, extension)
      : calcTaxRUK(taxable, year, extension);
  }

function calculateReliefBreakdown(txB, txA, totalExt, year, region, relief) {

    if (region === "sc") {
      return calculateScotReliefBreakdown(txB, txA, totalExt, year, relief);
    }
  
    const band = BND_RUK[year];
    const additionalBandStart = band.higher;
  
    const additionalIncomeBefore =
      Math.max(0, txB - additionalBandStart);
  
    const additionalIncomeAfter =
      Math.max(0, txA - (additionalBandStart + totalExt));
  
    const additionalRateRelief =
      Math.max(
        0,
        Math.round(
          (additionalIncomeBefore - additionalIncomeAfter) * (band.rTop - band.rHigher)
        )
      );
  
    const higherRateRelief =
      Math.max(0, relief - additionalRateRelief);
  
    return { higherRateRelief, additionalRateRelief };
  }

  function calculateScotReliefBreakdown(txB, txA, totalExt, year, relief) {

    const band = BND_SCOT[year];
  
    const bands = [
      { start: band.inter,  end: band.higher,                    rate: band.rHigher },
      { start: band.higher, end: band.advanced ?? Infinity,       rate: band.advanced !== null ? band.rAdvanced : band.rTop },
      ...(band.advanced !== null
        ? [{ start: band.advanced, end: Infinity, rate: band.rTop }]
        : [])
    ];
  
    const breakdown = { higherRateRelief: 0, additionalRateRelief: 0 };
  
    bands.forEach((b, index) => {
      const before = Math.max(0, Math.min(txB, b.end) - b.start);
      const afterEnd = b.end === Infinity ? Infinity : b.end + totalExt;
      const after = Math.max(0, Math.min(txA, afterEnd) - (b.start + totalExt));
      const amount = Math.max(0, Math.round((before - after) * (b.rate - 0.20)));
  
      // перша смуга вище basic → "higher", решта → "additional"
      if (index === 0) {
        breakdown.higherRateRelief += amount;
      } else {
        breakdown.additionalRateRelief += amount;
      }
    });
  
    // Захист від округлень — сума розбивки не повинна перевищувати total relief
    const sum = breakdown.higherRateRelief + breakdown.additionalRateRelief;
    if (sum > relief) {
      breakdown.additionalRateRelief = Math.max(0, relief - breakdown.higherRateRelief);
    }
  
    return breakdown;
  }

  function calculateYear(year, data, cfPool = 0, region = "ew") {

    const salary =
      Math.max(0, Number(data.grossAnnualSalary) || 0);
  
    const emp =
      Math.max(0, Number(data.employeeContribution) || 0);
  
    const employer =
      Math.max(0, Number(data.employerContribution) || 0);
  
    const sipp =
      Math.max(0, Number(data.pensionSIPP) || 0);
  
    const otherIncome =
      Math.max(0, Number(data.otherTaxableIncome) || 0);
  
    const annualAmount =
      Math.max(0, Number(data.annualAmount) || 0);
  
    const companyCar =
      Math.max(0, Number(data.companyCar) || 0);
  
    const medicalInsurance =
      Math.max(0, Number(data.medicalInsurance) || 0);
  
    const beneficialLoan =
      Math.max(0, Number(data.beneficialLoan) || 0);
  
    const livingAccommodation =
      Math.max(0, Number(data.livingAccommodation) || 0);
  
    const giftAid =
      Math.max(0, Number(data.giftAidDonations) || 0);
  
    const messages = [];
  
    let empRasG = 0;
    let empNpa = 0;
    let empSs = 0;
  
    switch (data.pensionScheme) {
  
      case "reliefAtSource":
        empRasG = emp / 0.8;
        break;
  
      case "netPay":
        empNpa = emp;
        break;
  
      case "salarySacrifice":
      case "notSure":
        empSs = emp;
        break;
  
    }
  
    const sippG = sipp / 0.8;
  
    if (salary > 0 && sippG > salary) {
      messages.push("earnings-cap");
    }
  
    const gaGross = giftAid / 0.8;
  
    const totalRasG = sippG + empRasG;
  
    const bik =
      companyCar +
      medicalInsurance +
      beneficialLoan +
      livingAccommodation;
  
    const NI =
      salary -
      annualAmount -
      empSs -
      empNpa +
      otherIncome +
      bik;
  
    const TI =
      NI +
      empSs -
      totalRasG -
      gaGross;
  
    const AI =
      NI +
      empNpa +
      employer +
      empSs;
  
    let aa = AAR[year].std;
    let tapered = false;
    let taperReduction = 0;
  
    if (data.mpaa) {
  
      aa = 10000;
      messages.push("mpaa-warning");
  
    } else if (TI > AAR[year].ti && AI > AAR[year].ai) {
  
      taperReduction =
        Math.floor((AI - AAR[year].ai) / 2);
  
      aa = Math.max(
        AAR[year].min,
        AAR[year].std - taperReduction
      );
  
      tapered = true;
  
    }
  
    let pia = 0;
  
    if (empRasG > 0) {
      pia = empRasG + employer + sippG;
    } else if (empNpa > 0) {
      pia = empNpa + employer + sippG;
    } else {
      pia = empSs + employer + sippG;
    }
  
    const availableAA = aa + cfPool;
  
    const aaExcess = pia > availableAA;
  
    const aaExcessAmount =
      Math.max(0, pia - availableAA);
  
    if (aaExcess) {
      messages.push("aa-excess");
    }
  
    const aniB = NI - gaGross;
    const aniA = NI - totalRasG - gaGross;
  
    function calculatePA(ani) {
  
      const pa = AAR[year].pa;
      const paWd = AAR[year].paWd;
  
      if (ani >= paWd + pa * 2) return 0;
  
      if (ani > paWd) {
        return Math.max(
          0,
          pa - Math.floor((ani - paWd) / 2)
        );
      }
  
      return pa;
  
    }
  
    const paB = calculatePA(aniB);
    const paA = calculatePA(aniA);
  
    const txB = Math.max(0, NI - paB);
    const txA = Math.max(0, NI - paA);
  
    const totalExt = totalRasG + gaGross;
  
    // ⬇️ ВИКОРИСТОВУЄ calcTax з урахуванням регіону (rUK / Scotland)
    const taxBefore = calcTax(txB, year, 0, region);
    const taxAfter = calcTax(txA, year, totalExt, region);
  
    const relief =
      Math.max(0, Math.round(taxBefore - taxAfter));
  
    const basicRateRelief =
      Math.round(totalRasG * 0.20);
  
    // ⬇️ Розбивка relief по ставках — тепер через окрему функцію
    // (враховує порічний поріг additionalBandStart та регіон)
    const { higherRateRelief, additionalRateRelief } =
      calculateReliefBreakdown(txB, txA, totalExt, year, region, relief);
  
    return {
  
      year,
  
      // Вхідні
      grossIncome: salary,
      otherIncome,
      bik,
      companyCar,
      medicalInsurance,
      beneficialLoan,
      livingAccommodation,
      sippNet: sipp,

      netRAS: sipp + (data.pensionScheme === "reliefAtSource" ? emp : 0),

      sippG,
      empRasG,
      empNpa,
      empSs,
      totalRasG,
      gaGross,
      employeeContribution: emp,
      employerContribution: employer,
      pensionScheme: data.pensionScheme,
      mpaa: data.mpaa || false,
  
      // Проміжні
      NI,
      TI,
      AI,
      aniB,
      aniA,
      paB,
      paA,
      tapered,
      taperReduction,
  
      // AA
      aa,
      pia,
      availableAA,
      aaExcess,
      aaExcessAmount,
  
      // Relief
      basicRateRelief,
      higherRateRelief,
      additionalRateRelief,
      relief,
      totalRelief: basicRateRelief + relief,
      eligible: relief > 0 && !aaExcess,
  
      messages
  
    };
  
  }

function calculateResults() {

  // Масив джерел перенесення (тільки роки з увімкненим membership-тоглом,
  // не заявлені окремо)
  const cfSources = [];

  taxYears
    .slice()
    .reverse()
    .forEach(year => {

      const isMember =
        state.cfMemberYears[year];

      const isClaimed =
        state.selectedYears.includes(year);

      if (isMember && !isClaimed && AAR[year]) {

        cfSources.push({
          year,
          amount: AAR[year].std,
          expiresOn: `5 April ${Number(year.slice(0, 4)) + 4}`
        });

      }

    });

  // FIFO — найближчий термін експірації списується першим
  cfSources.sort(
    (a, b) => new Date(a.expiresOn) - new Date(b.expiresOn)
  );

  const cfSnapshot = {};
  const yearResults = [];

  Object.entries(state.years)

    .sort(
      ([a], [b]) =>
        Number(a.slice(0, 4)) -
        Number(b.slice(0, 4))
    )

.forEach(([year, data]) => {

  const cfAvailableTotal =
    cfSources.reduce((sum, s) => sum + s.amount, 0);

  const result = calculateYear(year, data, cfAvailableTotal, state.region);

  const cfNeeded =
    Math.max(0, result.pia - result.aa);

  const cfUsed =
    Math.min(cfNeeded, cfAvailableTotal);

  let remaining = cfUsed;

  cfSources.forEach(source => {

    if (remaining <= 0) return;

    const take = Math.min(source.amount, remaining);

    source.amount -= take;
    remaining -= take;

  });


const unused =
  Math.max(0, result.aa - result.pia);

if (unused > 0) {
  cfSources.push({
    year,
    amount: unused,
    expiresOn: `5 April ${Number(year.slice(0, 4)) + 4}`
  });

  cfSources.sort(
    (a, b) => new Date(a.expiresOn) - new Date(b.expiresOn)
  );
}

cfSnapshot[year] = { cfAvailable: cfAvailableTotal, cfUsed, unused };
yearResults.push(result);
  
});
  
  // Джерела, що лишились не повністю вичерпаними
  const remainingCfSources =
    cfSources.filter(s => s.amount > 0);

  const cfPool =
    remainingCfSources.reduce((sum, s) => sum + s.amount, 0);

  const total =
    yearResults.reduce(
      (sum, item) =>
        sum +
        (item.eligible ? item.relief : 0),
      0
    );

  const years =
    yearResults
      .filter(
        item =>
          item.eligible &&
          item.relief > 0
      )
      .map(item => ({
        year: item.year,
        amount: item.relief
      }));

  const allMessages =
    [...new Set(
      yearResults.flatMap(
        item => item.messages
      )
    )];

  const hasEligibleYears =
    yearResults.some(
      item =>
        item.eligible &&
        item.relief > 0
    );

  return {

    selectedYears: state.selectedYears,
    region: state.region,
    cfMemberYears: state.cfMemberYears,

    yearData: yearResults,

carryForward: {
  byYear: cfSnapshot,

  sources: remainingCfSources.map(s => ({
    year: s.year,
    unusedAllowance: s.amount,
    expiresOn: s.expiresOn
  })),

  hasCarryForward: remainingCfSources.length > 0,

  confirmedMemberYears: remainingCfSources.map(s => s.year),

  totalAvailable: cfPool,
  standardAllowanceNextYear:
    AAR[taxYears[0]]?.std || 60000,
  maxContributionNextYear:
    cfPool + (AAR[taxYears[0]]?.std || 60000)
},

    total,

    status:
      hasEligibleYears
        ? "YOU ARE ELIGIBLE TO CLAIM"
        : "NO ADDITIONAL RELIEF AVAILABLE",

    years,

    messages:
      hasEligibleYears
        ? ["success", ...allMessages]
        : ["no-relief", ...allMessages]

  };

}
  
  

navCalculate.addEventListener(
  "click",
  () => {

    if (currentStep === 5) {
      collectBaseYearData();
    }

    console.log("INPUT DATA", state.years);

    const results = calculateResults();

    // Зберігаємо в localStorage для іншої сторінки
    try {

      localStorage.setItem(
        "potly_calculator_results",
        JSON.stringify(results)
      );

      localStorage.setItem(
        "potly_calculator_state",
        JSON.stringify({
          region: state.region,
          selectedYears: state.selectedYears,
          cfMemberYears: state.cfMemberYears,
          years: state.years
        })
      );

    } catch (e) {

      console.error("localStorage error:", e);

    }

    renderResults(results);

    document
      .getElementById("navBar")
      ?.classList.add("result-state");

    goToStep(7);

  }
);

const reviewsWrap =
  document.querySelector(
    "[data-step-reviews]"
  );

function getRemainingYears() {

  const firstYear =
    state.selectedYears[0];

  return state.selectedYears.filter(
    year => year !== firstYear
  );

}

function getReviewCardTemplate(year) {

  return `

    <div class="step_review-card-title">

      <div>

        <div class="mb-16">

          <p
            data-review-year
            class="text-size-xmedium text-color-dark"
          >
            ${year}
          </p>

        </div>

        <div
          data-filled
          class="text-size-regular text-color-gray-light"
        >
          Not filled yet
        </div>

      </div>

      <img
        src="https://cdn.prod.website-files.com/6a295f5b80b1e8ff581c257e/6a3a60f4c33c76213ee823db_arrow-right-01-sharp.svg"
        loading="lazy"
        alt=""
        class="icon-20"
      >

    </div>

    <div class="step_review-card-content-w">

      <div class="step_review-card-content">

        <!-- Gross annual salary -->

        <div>

          <div class="mb-16">

            <p class="text-size-xmedium text-color-dark">
              Gross annual salary
            </p>

          </div>

          <div class="field-w">

            <input
            name="grossAnnualSalary[${year}]"
            data-input-required
              type="number"
              class="field left w-input"
              data-year="${year}"
              data-field="grossAnnualSalary"
              placeholder="0"
            >

            <div class="input_icon left">

              <div class="text-size-regular">
                £
              </div>

            </div>

          </div>

        </div>

        <!-- Other taxable income -->

<div data-add-wrapper>

  <div class="mb-20">

    <p class="text-size-xmedium text-color-dark">
      Other taxable income?
    </p>

  </div>

  <div class="step_fake-field">

    <div class="text-size-regular text-color-gray-light">
      Dividends, rental, savings, pension income
    </div>

    <div class="toggle" data-add-toggle>
      <div class="toggle_icon"></div>
    </div>

  </div>

  <div
    class="step_add"
    data-add-block
  >

    <div class="mb-20">

      <p class="text-size-xmedium text-color-dark">
        Annual other taxable income
      </p>

    </div>

    <div class="field-w">

      <input
        type="number"
        class="field left w-input"
        name="otherTaxableIncome[${year}]"
        data-year="${year}"
        data-field="otherTaxableIncome"
        placeholder="0"
      >

      <div class="input_icon left">
        <div class="text-size-regular">£</div>
      </div>

    </div>

  </div>

</div>



<!-- Salary sacrifice -->

<div data-add-wrapper>

  <div class="mb-20">

    <p class="text-size-xmedium text-color-dark">
      Non-pension salary sacrifice?
    </p>

  </div>

  <div class="step_fake-field">

    <div class="text-size-regular text-color-gray-light">
      Dividends, rental, savings, pension income
    </div>

    <div class="toggle" data-add-toggle>
      <div class="toggle_icon"></div>
    </div>

  </div>

  <div
    class="step_add"
    data-add-block
  >

    <div class="mb-20">

      <p class="text-size-medium">
        Annual amount for salary sacrifice benefits
      </p>

    </div>

    <div class="field-w">

      <input
        type="number"
        class="field left w-input"
        name="annualAmount[${year}]"
        data-year="${year}"
        data-field="annualAmount"
        placeholder="0"
      >

      <div class="input_icon left">
        <div class="text-size-regular">£</div>
      </div>

    </div>

  </div>

</div>






<!-- Benefits in kind -->

<div data-add-wrapper>

  <div class="mb-20">

    <p class="text-size-xmedium text-color-dark">
      Taxable benefits in kind?
    </p>

  </div>

  <div class="step_fake-field">

    <div class="text-size-regular text-color-gray-light">
      Company car, medical insurance, loan or accommodation
    </div>

    <div class="toggle" data-add-toggle>
      <div class="toggle_icon"></div>
    </div>

  </div>

  <div
    class="step_add grid "
    data-add-block
  >

    <div>

      <div class="mb-20">
        <p class="text-size-medium">Company car</p>
      </div>

      <div class="field-w">

        <input
          type="number"
          class="field left w-input"
          name="companyCar[${year}]"
          data-year="${year}"
          data-field="companyCar"
          placeholder="0"
        >

      <div class="input_icon left">
        <div class="text-size-regular">£</div>
      </div>

      </div>

    </div>

    <div>

      <div class="mb-20">
        <p class="text-size-medium">Medical insurance</p>
      </div>

      <div class="field-w">

        <input
          type="number"
          class="field left w-input"
          name="medicalInsurance[${year}]"
          data-year="${year}"
          data-field="medicalInsurance"
          placeholder="0"
        >

       <div class="input_icon left">
        <div class="text-size-regular">£</div>
      </div>

      </div>

    </div>

    <div>

      <div class="mb-20">
        <p class="text-size-medium">Beneficial loan</p>
      </div>

      <div class="field-w">

        <input
          type="number"
          class="field left w-input"
          name="beneficialLoan[${year}]"
          data-year="${year}"
          data-field="beneficialLoan"
          placeholder="0"
        >

      <div class="input_icon left">
        <div class="text-size-regular">£</div>
      </div>

      </div>

    </div>

    <div>

      <div class="mb-20">
        <p class="text-size-medium">Living accommodation</p>
      </div>

      <div class="field-w">

        <input
          type="number"
          class="field left w-input"
          name="livingAccommodation[${year}]"
          data-year="${year}"
          data-field="livingAccommodation"
          placeholder="0"
        >

      <div class="input_icon left">
        <div class="text-size-regular">£</div>
      </div>

      </div>

    </div>

  </div>

</div>




<!-- Gift Aid -->

<div data-add-wrapper>

  <div class="mb-20">

    <p class="text-size-xmedium text-color-dark">
      Gift Aid donations?
    </p>

  </div>

  <div class="step_fake-field">

    <div class="text-size-regular text-color-gray-light">
      Donations to charity under Gift Aid
    </div>

    <div
      class="toggle"
      data-add-toggle
    >
      <div class="toggle_icon"></div>
    </div>

  </div>

  <div
    class="step_add"
    data-add-block
  >

    <div class="mb-20">

      <p class="text-size-medium">
        Total Gift Aid donations (net amount paid)
      </p>

    </div>

    <div class="field-w">

      <input
        type="number"
        class="field left w-input"
        name="giftAidDonations[${year}]"
        data-year="${year}"
        data-field="giftAidDonations"
        placeholder="0"
      >

      <div class="input_icon left">
        <div class="text-size-regular">£</div>
      </div>

    </div>

  </div>

</div>



        <!-- Employee contribution -->

        <div>

          <div class="mb-16">

            <p class="text-size-xmedium text-color-dark">
              Employee pension contribution
            </p>

          </div>

          <div class="field-w">

            <input
            name="employeeContribution[${year}]"
              type="number"
              class="field left w-input"
              data-year="${year}"
              data-field="employeeContribution"
              placeholder="0"
            >

            <div class="input_icon left">

              <div class="text-size-regular">
                £
              </div>

            </div>

          </div>

        </div>

        <!-- Employer contribution -->

        <div>

          <div class="mb-16">

            <p class="text-size-xmedium text-color-dark">
              Employer contribution
            </p>

          </div>

          <div class="field-w">

            <input
            name="employerContribution[${year}]"
            data-input-required
              type="number"
              class="field left w-input"
              data-year="${year}"
              data-field="employerContribution"
              placeholder="0"
            >

            <div class="input_icon left">

              <div class="text-size-regular">
                £
              </div>

            </div>

          </div>

        </div>

        <!-- Personal pension -->

        <div>

          <div class="mb-16">

            <p class="text-size-xmedium text-color-dark">
              Personal pension / SIPP
            </p>

          </div>

          <div class="field-w">

            <input
            name="pensionSIPP[${year}]"
            data-input-required
              type="number"
              class="field left w-input"
              data-year="${year}"
              data-field="pensionSIPP"
              placeholder="0"
            >

            <div class="input_icon left">

              <div class="text-size-regular">
                £
              </div>

            </div>

          </div>

        </div>


        

        <!-- Pension scheme -->

        <div>

          <div class="mb-16">

            <p class="text-size-xmedium text-color-dark">
              Pension scheme type
            </p>

          </div>

          <div
            data-scheme-grid
            class="step_buttons grid"
          >

            <label class="step_btn w-radio">

              <input
                type="radio"
                name="pensionScheme[${year}]"
                value="salarySacrifice"
                data-year="${year}"
                data-field="pensionScheme"
                class="w-radio-input step_checkbox-trigger"
              >

              <div
                class="text-size-regular"
              >
                Salary Sacrifice
              </div>

            </label>

            <label class="step_btn w-radio">

              <input
                type="radio"
                name="pensionScheme[${year}]"
                value="netPay"
                data-year="${year}"
                data-field="pensionScheme"
                class="w-radio-input step_checkbox-trigger"
              >

              <div
                class="text-size-regular"
              >
                Net Pay
              </div>

            </label>

            <label class="step_btn w-radio">

              <input
                type="radio"
                name="pensionScheme[${year}]"
                value="reliefAtSource"
                data-year="${year}"
                data-field="pensionScheme"
                class="w-radio-input step_checkbox-trigger"
              >

              <div
                class="text-size-regular"
              >
                Relief at Source
              </div>

            </label>

            <label class="step_btn w-radio">

              <input
                type="radio"
                name="pensionScheme[${year}]"
                value="notSure"
                data-year="${year}"
                data-field="pensionScheme"
                class="w-radio-input step_checkbox-trigger"
              >

              <div
                class="text-size-regular"
              >
                Not sure
              </div>

            </label>

          </div>

        </div>

        <!-- MPAA -->

      <div class="mpaa-wrap">
      
        <label
          data-f-mpaa
          class="w-checkbox checkbox"
        >
      
          <input
          name="mpaa[${year}]"
            type="checkbox"
            data-year="${year}"
            data-field="mpaa"
            class="w-checkbox-input checkbox_icon"
          >
      
          <span
            class="checkbox_label w-form-label"
          >
            Have you taken any taxable cash from a pension already?
          </span>
      
        </label>
      
        <div
          data-warn
          class="step_message"
        >
      
          <p
            class="text-size-small text-color-neutral-medium"
          >
      
            Your Money Purchase Annual Allowance is £10,000.
            Contributions above this limit may result in
            an annual allowance charge.
      
          </p>
      
        </div>
      
      </div>

      </div>

    </div>

  `;

}

function generateReviewCards() {

  if (!reviewsWrap) return;

  const remainingYears =
    getRemainingYears();

  const existingCards =
    reviewsWrap.querySelectorAll(
      ".step_review-card"
    );

  const existingYears =
    [...existingCards].map(
      card => card.dataset.year
    );

  const yearsMatch =
    existingYears.length === remainingYears.length &&
    remainingYears.every(
      year => existingYears.includes(year)
    );

  if (yearsMatch && existingCards.length > 0) {

    refreshReviewCards();

    existingCards.forEach(card =>
      updateReviewCardStatus(card)
    );

    return;

  }

  reviewsWrap.innerHTML = "";

  remainingYears.forEach(year => {

    if (!state.years[year]) {

      state.years[year] =
        createEmptyYearData();

    }

    const card =
      document.createElement("div");

    card.className = "step_review-card";

    card.dataset.year = year;

    card.innerHTML =
      getReviewCardTemplate(year);

    reviewsWrap.appendChild(card);

    updateReviewCardStatus(card);

    const title =
      card.querySelector(
        ".step_review-card-title"
      );

    title?.addEventListener(
      "click",
      () => card.classList.toggle("open")
    );

  });

  const firstCard =
    reviewsWrap.querySelector(
      ".step_review-card"
    );

  firstCard?.classList.add("open");

}


function createEmptyYearData() {

  return {

    grossAnnualSalary: "",

    otherTaxableIncome: "",

    annualAmount: "",

    giftAidDonations: "",

    companyCar: "",

    medicalInsurance: "",

    beneficialLoan: "",

    livingAccommodation: "",

    employeeContribution: "",

    employerContribution: "",

    pensionSIPP: "",

    pensionScheme: "",

    mpaa: false

  };

}


function updateReviewCardStatus(card) {

  if (!card) return;

  const year = card.dataset.year;

  const data = state.years[year] || {};

  const isFilled =
    !!data.grossAnnualSalary &&
    !!data.employeeContribution &&
    !!data.employerContribution &&
    !!data.pensionScheme;

  const status =
    card.querySelector("[data-filled]");

  if (status) {

    status.textContent =
      isFilled ? "Filled" : "Not filled yet";

  }

  updateYearProgress();

}
  

reviewsWrap.addEventListener(
  "input",
  event => {

    const input = event.target;

    if (!input.matches("[data-field]")) return;

    const card =
      input.closest(".step_review-card");

    const year = card.dataset.year;

    const field = input.dataset.field;

    if (!state.years[year]) {
      state.years[year] = {};
    }

    state.years[year][field] =
      input.value;

    updateReviewCardStatus(card);
    validateCurrentStep(); 

  }
);

reviewsWrap.addEventListener(
  "change",
  event => {

    const input = event.target;

    if (!input.matches("[data-field]")) return;

    const card =
      input.closest(".step_review-card");

    const year = card.dataset.year;

    const field = input.dataset.field;

    if (!state.years[year]) {
      state.years[year] = {};
    }

    if (input.type === "checkbox") {

      state.years[year][field] =
        input.checked;

    } else {

      state.years[year][field] =
        input.value;

    }

    updateReviewCardStatus(card);
    validateCurrentStep();

  }
);



document.addEventListener(
  "input",
  event => {

    const field =
      event.target.closest(
        "[data-year]"
      );

    if (!field) return;

    const year =
      field.dataset.year;

    const key =
      field.dataset.field;

    if (!state.years[year]) {

      state.years[year] = {};

    }

    state.years[year][key] =
      field.value;

    const card =
      field.closest(
        ".step_review-card"
      );

    updateReviewCardStatus(
      card
    );

  }
);

document.addEventListener(
  "change",
  event => {

    const field =
      event.target.closest(
        "[data-year]"
      );

    if (!field) return;

    const year =
      field.dataset.year;

    const key =
      field.dataset.field;

    if (
      field.type === "checkbox"
    ) {

      state.years[year][key] =
        field.checked;

    } else {

      state.years[year][key] =
        field.value;

    }

    const firstYear =
      state.selectedYears[0];

    if (year === firstYear) {

      syncOtherYears();

    }

    const card =
      field.closest(
        ".step_review-card"
      );

    updateReviewCardStatus(
      card
    );

  }
);

  const copyTog = document.getElementById("copyTog");

  function syncMPAACheckboxes() {
  const sourceCheckbox =
    document.getElementById("f_mpaa");

  if (!sourceCheckbox) return;

  document
    .querySelectorAll(
      ".step_review-card [data-field='mpaa']"
    )
    .forEach(checkbox => {

      checkbox.checked =
        sourceCheckbox.checked;

      checkbox.dispatchEvent(
        new Event("change", {
          bubbles: true
        })
      );

    });

}

function copyFirstYearToOthers() {

  const firstYear = state.selectedYears[0];

  const sourceData = state.years[firstYear];

  if (!sourceData) return;

  getRemainingYears().forEach(year => {

    state.years[year] = { ...sourceData };

  });

  refreshReviewCards();
  syncMPAACheckboxes();
  validateCurrentStep();

  document
    .querySelectorAll(".step_review-card")
    .forEach(card => updateReviewCardStatus(card));

}

function clearOtherYears() {

  getRemainingYears().forEach(year => {

    state.years[year] =
      createEmptyYearData();

  });

  refreshReviewCards();
  validateCurrentStep();

  document
    .querySelectorAll(".step_review-card")
    .forEach(card => updateReviewCardStatus(card));

}

function syncOtherYears() {

  if (!state.copyToAllYears)
    return;

  copyFirstYearToOthers();

}


function fillReviewCard(card, data) {

  if (!card || !data) return;

  card
    .querySelectorAll("[data-field]")
    .forEach(field => {

      const key =
        field.dataset.field;

      if (
        data[key] === undefined
      ) return;

      /* RADIO */
      if (
        field.type === "radio"
      ) {

        field.checked =
          field.value === data[key];

        return;

      }

      /* пропускаємо MPAA */
      if (
          field.type === "checkbox"
        ) {
        
          field.checked =
            !!data[key];
        
          return;
        
        }

      /* INPUTS */
      field.value =
        data[key];

    });

}


function refreshReviewCards() {

  document
    .querySelectorAll(
      ".step_review-card"
    )
    .forEach(card => {

      const year =
        card.dataset.year;

      fillReviewCard(
        card,
        state.years[year]
      );

    });

}


/* Клік */
copyTog?.addEventListener(
  "click",
  () => {

    state.copyToAllYears =
      !state.copyToAllYears;

    copyTog.classList.toggle(
      "active",
      state.copyToAllYears
    );

    if (
      state.copyToAllYears
    ) {

      console.log(
        "FIRST YEAR DATA",
        state.years[
          state.selectedYears[0]
        ]
      );

      copyFirstYearToOthers();

    } else {

      clearOtherYears();

    }

    console.log(
      "copyToAllYears:",
      state.copyToAllYears
    );

  }
);

/* STATE */

const state = {

  region: "ew",

  selectedYears: [],

  cfMemberYears: {},

  yearQueue: [],

  years: {},

  currentYearIndex: 0,

  copyToAllYears: false

};


/* NAVIGATION */

const steps = document.querySelectorAll(".step");
const navBar = document.getElementById("navBar");
const navBack = document.getElementById("navBack");
const navNext = document.getElementById("navNext");

let currentStep = 0;

function goToStep(stepIndex) {

  steps.forEach(step => {
    step.classList.remove("active");
  });

  steps[stepIndex].classList.add("active");

  currentStep = stepIndex;

  updateNavVisibility();
  validateCurrentStep();
  updateProgressBar();

}
  
function updateNavVisibility() {

  if (currentStep < 2) {

    navBack.classList.remove("active");

  } else {

    navBack.classList.add("active");

  }

  const isSingleYear =
    state.selectedYears.length === 1;

  const isLastDataStep =
    currentStep === 6 ||
    (currentStep === 5 && isSingleYear);

  if (isLastDataStep) {

    navNext.classList.add("hidden");

    navCalculate.classList.add("active");

  } else {

    navNext.classList.remove("hidden");

    navCalculate.classList.remove("active");

  }

  const navAgain =
    document.getElementById("navAgain");

  if (currentStep === 7) {

    navBack.classList.remove("active");

    navNext.classList.add("hidden");

    navCalculate.classList.remove("active");

    navAgain?.classList.add("active");

  } else {

    navAgain?.classList.remove("active");

  }

  validateCurrentStep();

}


/* STEP 0 */

const btnYes =
  document.getElementById("btn_yes");

btnYes.addEventListener("click", () => {

  goToStep(1);

  navBar.classList.add("active");

});


/* STEP 1 */

function getTaxYears() {

  const currentYear =
    new Date().getFullYear();

  return [

    `${currentYear}/${String(currentYear + 1).slice(-2)}`,

    `${currentYear - 1}/${String(currentYear).slice(-2)}`,

    `${currentYear - 2}/${String(currentYear - 1).slice(-2)}`,

    `${currentYear - 3}/${String(currentYear - 2).slice(-2)}`,

    `${currentYear - 4}/${String(currentYear - 3).slice(-2)}`

  ];

}

const taxYears = getTaxYears();

const cfWrap =
  document.getElementById("cfWrap");

const yearCheckboxes =
  document.querySelectorAll(
    "#yrRow input[type='checkbox']"
  );

const chipTexts =
  document.querySelectorAll(
    "#yrRow .chip-text"
  );

const cfRows =
  document.querySelectorAll(
    "#cfWrap .step_message-row"
  );

const scotlandCheckbox =
  document.getElementById("scotland");


/* FILL YEARS */

chipTexts.forEach((chip, index) => {

  chip.textContent =
    taxYears[index];

});

yearCheckboxes.forEach((checkbox, index) => {

  checkbox.value =
    taxYears[index];

});

const firstTrigger =
  yearCheckboxes[0]
    .closest(".chip")
    ?.querySelector(
      ".step_checkbox-trigger"
    );

if (firstTrigger) {

  firstTrigger.classList.add("on");

}

scotlandCheckbox.addEventListener(
  "change",
  () => {

    state.region =
      scotlandCheckbox.checked
        ? "sc"
        : "ew";

  }
);

/* SELECTED YEARS */

function updateBaseYearFieldNames() {

  const firstYear =
    state.selectedYears[0];

  if (!firstYear) return;

  document
    .querySelectorAll("[data-field]")
    .forEach(field => {

      if (field.dataset.year) return;

      const fieldName =
        field.dataset.field;

      field.name =
        `${fieldName}[${firstYear}]`;

    });

}
      
function updateSelectedYears() {

  state.selectedYears =
    [...yearCheckboxes]
      .filter(cb => cb.checked)
      .map(cb => cb.value);

  state.yearQueue =
    [...state.selectedYears];

}

function updateCheckboxUI() {

  yearCheckboxes.forEach(
    checkbox => {

      const trigger =
        checkbox
          .closest(".chip")
          ?.querySelector(
            ".step_checkbox-trigger"
          );

      if (!trigger) return;

      trigger.classList.toggle(
        "on",
        checkbox.checked
      );

    }
  );

}

const cfIndexes = [1, 2, 3];

function updateCarryForward() {

  let visibleRows = 0;

  cfRows.forEach((row, rowIndex) => {

    const checkboxIndex =
      cfIndexes[rowIndex];

    const checkbox =
      yearCheckboxes[checkboxIndex];

    const year =
      taxYears[checkboxIndex];

    row.querySelector("span")
      .textContent = year;

    if (!checkbox.checked) {

      row.classList.add("active");

      visibleRows++;

    } else {

      row.classList.remove("active");

    }

  });

  cfWrap.classList.toggle(
    "active",
    visibleRows > 0
  );

}

const cfMembershipCheckboxes = [

  document.getElementById(
    "member-second-year"
  ),

  document.getElementById(
    "member-third-year"
  ),

  document.getElementById(
    "member-fourth-year"
  )

];

function updateMembershipYears() {

  state.cfMemberYears = {};

  cfMembershipCheckboxes.forEach(
    (checkbox, index) => {

      const yearIndex =
        cfIndexes[index];

      state.cfMemberYears[
        taxYears[yearIndex]
      ] = checkbox.checked;

    }
  );

}

/* STEP 4 */

function validateCurrentStep() {

  const currentStepElement =
    steps[currentStep];

  let isValid = true;

  /* REQUIRED INPUTS */

  const requiredFields =
    currentStepElement.querySelectorAll(
      "[data-input-required]"
    );

  requiredFields.forEach(field => {

    if (!field.value.trim()) {

      isValid = false;

    }

  });

  if (currentStepElement.id === "step4") {

    const selectedRadio =
      currentStepElement.querySelector(
        "[data-field='pensionScheme']:checked"
      );

    if (!selectedRadio) {

      isValid = false;

    }

  }

  if (currentStepElement.id === "step6") {

    const cards =
      currentStepElement.querySelectorAll(
        ".step_review-card"
      );

    cards.forEach(card => {

      const year =
        card.dataset.year;

      const data =
        state.years[year] || {};

      const requiredKeys = [
        "grossAnnualSalary",
        "employeeContribution",
        "employerContribution"
      ];

      requiredKeys.forEach(key => {

        if (!data[key]) {

          isValid = false;

        }

      });

      const hasScheme =
        data.pensionScheme &&
        data.pensionScheme !== "";

      if (!hasScheme) {

        isValid = false;

      }

    });

  }

  navNext.classList.toggle(
    "disabled",
    !isValid
  );

  navCalculate.classList.toggle(
    "disabled",
    !isValid
  );

}

const pensionSchemeRadios =
  document.querySelectorAll(
    "input[name='workplace-pension-collected']"
  );

function updatePensionScheme(radio) {

  const step =
    radio.closest(".step");

  const pensionCollectedMessage =
    step?.querySelector(
      "[data-pension-collected-message]"
    );

  if (!radio.checked) return;

  state.workplacePensionCollected =
    radio.value;

  pensionCollectedMessage
    ?.classList.toggle(
      "active",
      radio.value === "Not sure"
    );

}

pensionSchemeRadios.forEach(
  radio => {

    radio.addEventListener(
      "change",
      () => {

        updatePensionScheme(radio);

        validateCurrentStep();

      }
    );

  }
);

const mpaaCheckbox =
  document.querySelector(
    "[data-f-mpaa] input[type='checkbox']"
  );


const whyWeAskBtn =
  document.querySelector(
  "[data-why-we-ask]"
)

const whyPanel =
  document.querySelector(
    "[data-why-panel]"
  );

const mpaaWarn =
  document.querySelector(
    "[data-warn]"
  );

whyWeAskBtn?.addEventListener(
  "click",
  (event) => {

    event.preventDefault();

    whyPanel?.classList.toggle(
      "active"
    );

  }
);

function updateMPAA() {

  if (!mpaaCheckbox) return;

  mpaaWarn?.classList.toggle(
    "active",
    mpaaCheckbox.checked
  );

  state.mpaa =
    mpaaCheckbox.checked;

}

mpaaCheckbox?.addEventListener(
  "change",
  updateMPAA
);

function collectBaseYearData() {

  const selectedScheme =
    document.querySelector(
      "[data-field='pensionScheme']:checked"
    );

  console.log(
    "SIPP value:",
    document.querySelector(
      "[data-field='pensionSIPP']"
    )?.value
  );
  
  console.log(
    "MPAA value:",
    document.querySelector(
      "[data-field='mpaa']"
    )?.checked
  );

  const firstYear = state.selectedYears[0];

	state.years[firstYear] = {

    grossAnnualSalary:
      document.querySelector(
        "[data-field='grossAnnualSalary']"
      )?.value || "",

    otherTaxableIncome:
      document.querySelector(
        "[data-field='otherTaxableIncome']"
      )?.value || "",

    annualAmount:
      document.querySelector(
        "[data-field='annualAmount']"
      )?.value || "",

    companyCar:
      document.querySelector(
        "[data-field='companyCar']"
      )?.value || "",

    medicalInsurance:
      document.querySelector(
        "[data-field='medicalInsurance']"
      )?.value || "",

    beneficialLoan:
      document.querySelector(
        "[data-field='beneficialLoan']"
      )?.value || "",

    livingAccommodation:
      document.querySelector(
        "[data-field='livingAccommodation']"
      )?.value || "",

    giftAidDonations:
      document.querySelector(
        "[data-field='giftAidDonations']"
      )?.value || "",

  employeeContribution:
    document.querySelector(
      "[data-field='employeeContribution']"
    )?.value || "",

    employerContribution:
      document.querySelector(
        "[data-field='employerContribution']"
      )?.value || "",

    pensionSIPP:
      document.querySelector(
        "[data-field='pensionSIPP']"
      )?.value || "",

    pensionScheme:
      selectedScheme?.value || "",

    mpaa:
      document.querySelector(
    "[data-field='mpaa']"
  )?.checked || false

  };

}



navNext.addEventListener(
  "click",
  () => {

  if (currentStep === 5) {
  
    collectBaseYearData();
    generateReviewCards();
  
  }
  
  if (
    currentStep <
    steps.length - 1
  ) {
  
    goToStep(
      currentStep + 1
    );
  
  }

  }
);

navBack.addEventListener(
  "click",
  () => {

    const isSingleYear =
      state.selectedYears.length === 1;

    if (currentStep === 7 && isSingleYear) {

      goToStep(5);

      return;

    }

    if (currentStep > 1) {

      goToStep(currentStep - 1);

    }

  }
);


const navAgain =
  document.getElementById("navAgain");

navAgain?.addEventListener(
  "click",
  () => {

    state.region = "ew";
    state.selectedYears = [];
    state.cfMemberYears = {};
    state.yearQueue = [];
    state.years = {};
    state.currentYearIndex = 0;
    state.copyToAllYears = false;

    yearCheckboxes.forEach((checkbox, index) => {

      checkbox.checked = index === 0;

    });

    const scotlandCheckbox =
      document.getElementById("scotland");

    if (scotlandCheckbox) {

      scotlandCheckbox.checked = false;

    }

  document
    .getElementById("copyTog")
    ?.classList.remove("active");

    const mpaaCheckbox =
      document.querySelector(
        "[data-f-mpaa] input[type='checkbox']"
      );

    if (mpaaCheckbox) {

      mpaaCheckbox.checked = false;

    }

  document
    .getElementById("navBar")
    ?.classList.remove("result-state");

    cfMembershipCheckboxes.forEach(cb => {

      cb.checked = false;

    });

    if (reviewsWrap) {

      reviewsWrap.innerHTML = "";

    }

    document
      .querySelectorAll(
        ".step input:not(#yrRow input)"
      )
      .forEach(input => {

        if (
          input.type === "checkbox" ||
          input.type === "radio"
        ) {

          input.checked = false;

        } else {

          input.value = "";

        }

      });

    updateSelectedYears();
    updateBaseYearFieldNames();
    updateCarryForward();
    updateMembershipYears();
    updateCheckboxUI();

    goToStep(0);

  }
);


/* LISTENERS */

yearCheckboxes.forEach((checkbox) => {

  checkbox.addEventListener("change", () => {

    const checkedCount =
      [...yearCheckboxes]
        .filter(cb => cb.checked)
        .length;

    if (checkedCount === 0) {

      checkbox.checked = true;

      const trigger =
        checkbox.parentElement.querySelector(
          ".step_checkbox-trigger"
        );

      trigger.classList.add("on");

      return;

    }

  updateSelectedYears();
  updateBaseYearFieldNames();
  updateCarryForward();
  updateCheckboxUI();

  });

});

cfMembershipCheckboxes.forEach(
  checkbox => {

    checkbox.addEventListener(
      "change",
      updateMembershipYears
    );

  }
);

document.addEventListener(
  "input",
  event => {

    if (
      event.target.matches(
        "[data-input-required]"
      )
    ) {

      validateCurrentStep();

    }

  }
);

/* INIT */

if (
  ![...yearCheckboxes]
    .some(cb => cb.checked)
) {

  yearCheckboxes[0].checked = true;

}

  updateSelectedYears();
  updateBaseYearFieldNames();
  updateCarryForward();
  updateMembershipYears();
  updateMPAA();
  updateCheckboxUI();
  validateCurrentStep();

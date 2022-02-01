const fromSelect = document.querySelector('[name="from_currency"]');
const toSelect = document.querySelector('[name="to_currency"]');
const fromInput = document.querySelector('[name="from_amount"]');
const toOutput = document.querySelector('.to_amount');
const form = document.querySelector('.app form');

const endpoint = 'https://api.exchangeratesapi.io/latest';
const ratesByBase = {};

const currencies = {
  USD: 'United States Dollar',
  AUD: 'Australian Dollar',
  BGN: 'Bulgarian Lev',
  BRL: 'Brazilian Real',
  CAD: 'Canadian Dollar',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan',
  CZK: 'Czech Republic Koruna',
  DKK: 'Danish Krone',
  GBP: 'British Pound Sterling',
  HKD: 'Hong Kong Dollar',
  HRK: 'Croatian Kuna',
  HUF: 'Hungarian Forint',
  IDR: 'Indonesian Rupiah',
  ILS: 'Israeli New Sheqel',
  INR: 'Indian Rupee',
  JPY: 'Japanese Yen',
  KRW: 'South Korean Won',
  MXN: 'Mexican Peso',
  MYR: 'Malaysian Ringgit',
  NOK: 'Norwegian Krone',
  NZD: 'New Zealand Dollar',
  PHP: 'Philippine Peso',
  PLN: 'Polish Zloty',
  RON: 'Romanian Leu',
  RUB: 'Russian Ruble',
  SEK: 'Swedish Krona',
  SGD: 'Singapore Dollar',
  THB: 'Thai Baht',
  TRY: 'Turkish Lira',
  ZAR: 'South African Rand',
  EUR: 'Euro',
};

/**
 *
 * @param {Object} options
 */
function generateOptions(options) {
  return Object.entries(options)
    .map(([code, name]) => `<option value="${code}">${code} - ${name}</option>`)
    .join('');
}

async function fetchRates(base = 'USD') {
  const response = await fetch(`${endpoint}?base=${base}`);
  const rates = await response.json();
  console.log(rates);
  return rates;
}

/**
 * Format the given amount with the specified currency.
 *
 * @param {number} amount
 * @param {string} currency
 * @returns {string}
 */
function formatCurrency(amount, currency) {
  return Intl.NumberFormat('en-US', { style: 'currency', currency }).format(
    amount
  );
}

/**
 * Convert the given amount of currency to a target amount of currency.
 *
 * @param {number} amount The amount to convert from
 * @param {string} from The currency being converted from
 * @param {string} to The target currency type
 * @returns {number}
 */
async function convert(amount, from, to) {
  // First check if it is cached
  if (!ratesByBase[from]) {
    console.warn(`Rates for ${from} currently not cached`);
    const rates = await fetchRates(from);
    ratesByBase[from] = rates;
  }

  // Do the conversion
  const rate = ratesByBase[from].rates[to];
  const convertedAmount = rate * amount;
  console.log(`${amount} ${from} is ${convertedAmount} ${to}`);
  return convertedAmount;
}

async function handleInput(e) {
  const amount = fromInput.value;
  const from = fromSelect.value;
  const to = toSelect.value;
  const rawAmount = await convert(amount, from, to);
  toOutput.textContent = formatCurrency(rawAmount, to);
}

const optionsHtml = generateOptions(currencies);
fromSelect.innerHTML = optionsHtml;
toSelect.innerHTML = optionsHtml;

form.addEventListener('input', handleInput);

export async function handleButtonClick(event) {
  const { localCurrency, default: currencies } = await import(
    './currencies.js'
  );
  console.log(currencies);
  console.log(localCurrency);
}

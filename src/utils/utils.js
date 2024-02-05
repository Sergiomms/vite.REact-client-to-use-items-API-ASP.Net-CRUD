export function onlyNumbers(value) {
  const number = `${value}`;
  if (number !== null && number !== undefined && number !== '') {
    return number.replace(/\D/g, '');
  }
  return '';
}

export function amountMask(value) {
  if (value !== null && value !== undefined) {
    const amount = onlyNumbers(value);

    // 9999,99
    return amount.replace(/(\d{1,4})(\d{2})/, '$1.$2');
  }
  return '';
}

export function formatCurrencyBRL(value, options) {
  const strValue = value === Infinity ? 0 : value;
  const maximumFractionDigits = options.maximumFractionDigits || 2;
  const formatter = new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
    maximumFractionDigits,
    ...options,
  });
  return formatter.format(strValue);
}
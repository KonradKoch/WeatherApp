export const classifyInput = (input: string) => {
  const cityCodeRegex = /^\d{1,5}$/; // City code: numeric, 1 to 5 digits
  const countryCodeRegex = /^[A-Za-z]{2}$/; // Country code: exactly 2 alphabetic characters
  const cityNameRegex = /^[A-Za-z\s\-]+$/; // City name: alphabetic characters, spaces, or hyphens

  let inputType;

  switch (true) {
    case cityCodeRegex.test(input):
      inputType = 'cityCode';
      break;
    case countryCodeRegex.test(input):
      inputType = 'countryCode';
      break;
    case cityNameRegex.test(input):
      inputType = 'cityName';
      break;
    default:
      inputType = 'unknown';
  }

  switch (inputType) {
    case 'cityCode':
      return { type: 'cityCode', value: input };
    case 'countryCode':
      return { type: 'countryCode', value: input.toUpperCase() };
    case 'cityName':
      return { type: 'cityName', value: input };
    case 'unknown':
    default:
      return {
        type: 'unknown',
        value: input,
        message: 'Input format not recognized',
      };
  }
};

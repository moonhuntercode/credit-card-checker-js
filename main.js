// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];
const valid6 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [
  valid1,
  valid2,
  valid3,
  valid4,
  valid5,
  invalid1,
  invalid2,
  invalid3,
  invalid4,
  invalid5,
  mystery1,
  mystery2,
  mystery3,
  mystery4,
  mystery5,
];

/* 
create a function that accepts a string and converts it into an array of numbers like the initially provided arrays.
 */
const str1 = "123456789101112";
function stringToArray(str) {
  const arr = str.split("").map(Number);
  return arr;
}
console.log(typeof stringToArray(str1));
const res = valid6.join(",");
console.log(res);
console.log(typeof res);

// Add your functions below:
// This function takes in an array of digits representing a credit card number (arr).
// It validates the credit card number using the Luhn algorithm.
// Returns true if the credit card number is valid, false otherwise.
function validateCred(arr) {
  // Convert each element in the array to a number
  const tempArr = arr.map(Number);
  // Iterate through the array in reverse, starting from the second-to-last element
  for (let i = tempArr.length - 2; i >= 0; i -= 2) {
    // Double the value of every other element
    let multipliedValue = tempArr[i] * 2;
    // If the doubled value is greater than 9, subtract 9
    if (multipliedValue > 9) {
      multipliedValue -= 9;
    }
    // Store the modified value back into the array
    tempArr[i] = multipliedValue;
  }
  // Calculate the sum of all the elements in the array
  const sum = tempArr.reduce((partial_sum, a) => partial_sum + a, 0);
  // Check if the sum is divisible by 10
  return sum % 10 === 0;
}

//console.log(validateCred(batch[5]));
//console.log(batch[5])

// Renamed the function to be more descriptive.
// Used arrow function shorthand to further reduce the code length.
// Replaced the filter method with the more efficient reduce method.
const findInvalidCards = (nestedArr) =>
  nestedArr.reduce((invalidCards, element) => {
    if (!validateCred(element)) {
      invalidCards.push(element);
    }
    return invalidCards;
  }, []);

let invalidCards = findInvalidCards(batch);

// Refactored code to improve readability and adhere to coding conventions
const idInvalidCardCompanies = (nestedArr) => {
  // Map to store card company names based on their first digit
  const companyMap = {
    3: "Amex (American Express)",
    4: "Visa",
    5: "MasterCard",
    6: "Discover",
  };
  // Array to store the names of valid card companies
  const companies = [];
  // Set to store unique card company names
  const uniqueCompanies = new Set();
  // Iterate over each element in the nested array
  nestedArr.forEach((element) => {
    // Retrieve the card company name based on the first digit of the card number
    const company = companyMap[element[0]];
    // If the card company name is found, add it to the set of unique companies
    if (company) {
      uniqueCompanies.add(company);
    } else {
      // If the card company name is not found, log an error message
      console.log(`Company not found. Card: (${element})`);
    }
  });
  // Convert the set of unique companies to an array
  uniqueCompanies.forEach((company) => {
    companies.push(company);
  });
  // Sort the array of company names in ascending order
  companies.sort();
  // Return the array of valid card company names
  return companies;
};

const cardCompaniesWithInvalid = idInvalidCardCompanies(invalidCards);
console.log(`These companies issued invalid cards:${cardCompaniesWithInvalid}`);
/* 
Create a function that will convert invalid numbers into valid numbers.
*/

function convertirNumeroInvalidoAValido(numero) {
  // Eliminar el dígito de control
  numero = numero.slice(0, -1);
  // Calcular el dígito de control usando el algoritmo de Luhn
  let suma = 0;
  let par = false;
  for (let i = numero.length - 1; i >= 0; i--) {
    let digito = parseInt(numero[i]);
    if (par) {
      digito *= 2;
      if (digito > 9) {
        digito -= 9;
      }
    }
    suma += digito;
    par = !par;
  }
  let digitoDeControl = (10 - (suma % 10)) % 10;
  // Añadir el dígito de control al número
  numero = numero + digitoDeControl;
  // Devolver el número válido
  return numero; 
}

// Klasa Validator, której obiektów będziemy używać do walidacji formularzy
export class Validator {

  // Konstruktor klasy Validator. W parametrze 'validationConfigs' podajemy tablicę obiektów
  // typu ValidationConfig które przechowują informację o tym jakie pola walidujemy
  // oraz listę funkcji walidujących dla zdefiniowanych pól
  constructor(validationConfigs) {
    this.validationConfigs = validationConfigs;
  }

  // Metoda do której przekazujemy obiekt który następnie będzie zwalidowany za pomocą funkcji
  // zdefiniowanych w konfiguracji. Zwraca obiekt typu ValidationResult
  validate(data) {

    let isValid = true;
    let errorMessages = {}; // obiekt zawierający listę błędów walidacyjnych np: { "title": "title is not valid"}

    // Dla każdej nazwy pola (item) w obiekcie data
    for (let item in data) {

      if (data.hasOwnProperty(item)) { // sprawdza czy to pole faktycznie znajduje się w tym obiekcie

        // Znajdujemy na liście konfiguracji, tą która jest zdefiniowana dla pola o nazwie określonej w zmiennej 'item'
        const config = this.validationConfigs.find(e => e.fieldName === item)
        if (config) {

          // Dla każdej funkcji walidacyjnej w konfiguracji dla tego pola
          for (let validationFunc of config.validationFunctionList) {

            const valFuncErrorMessage = validationFunc(data, item); // Wywołujemu tą funkcję... ważne aby wszystkie funkcje tego typu miały takie same parametry

            // Jeśli zwrócono komunikat walidacyjny to wtedy obiekt jest niepoprawny oraz dodajemy komunikat do obiektu z błędami walidacji
            if (valFuncErrorMessage !== undefined && valFuncErrorMessage !== null && valFuncErrorMessage !== "") {
              isValid = false;
              errorMessages[item] = valFuncErrorMessage;

              break;
            }
          }
        }
      }
    }

    return new ValidationResult(isValid, errorMessages)
  }
}

// Klasa ValidationConfig zawiera konfigurację walidacji dla pojedynczego pola
// którego nazwa znajduje się w polu 'fieldName'. Natomiast w polu 'validationFunctionList'
// znajduje się tablica rodziny funkcji o sygnaturze (obj, fieldName) które będą użyte do
// walidacji pola o tej nazwie.
// - fieldName - nazwa pola dla którego określamy konfigurację
// - validationFunctionList - lista funkcji za pomocą których pole będzie walidowane
export class ValidationConfig {
  constructor(fieldName, validationFunctionList) {
    this.fieldName = fieldName;
    this.validationFunctionList = validationFunctionList;
  }
}

// Klasa ValidationResult zawiera informacje o wyniku walidacji obiektu
// - isValid - pole to określa czy obiekt jest poprawny czy nie
// - errorMessages - obiekt który zawiera listę komunikatów błędów
class ValidationResult {

  constructor(isValid, errorMessages) {
    this.isValid = isValid;
    this.errorMessages = errorMessages;
  }

  getErrorMessage(fieldName) {
    return this.errorMessages[fieldName];
  }
}
//-------------------FUNKCJE WALIDUJĄCE------------------------------//
// Funkcja o parametrach (obj, fieldName) służąca do sprawdzenia czy pole 'fieldName' w obiekcie 'obj' jest wypełnione.
// Jeśli nie jest to zwraca komunikat błędu walidacji.
export function validateRequired(obj, fieldName) {
  if (obj[fieldName] === undefined || obj[fieldName] === null || obj[fieldName] === "") {
    return `${fieldName} is required`
  }
}

// Funkcja o parametrach (obj, fieldName) służąca do sprawdzenia czy pole 'fieldName' w obiekcie 'obj' zawiera
// maksymalną ilość znaków (10).
// Jeśli nie to zwraca komunikat błędu walidacji.
//Funkcja wymaga więcej parametrów, żeby je przekazać poprawnie musimy stworzyć funkcję opakowującą, która zwraca funkcję z odpowiednią liczbą parametrów.
function validateMaxLenght(obj, fieldName, maxLenght) {
  if (obj[fieldName].length > maxLenght) {
    return `maximum length: ${maxLenght} characters`
  }
}

export function useValidateMaxLenght(maxLenght) {
  return (obj, fieldName) => validateMaxLenght(obj, fieldName, maxLenght);
}

//Funkcja sprawdzająca, czy godzina 'do' jest większa od godziny 'od'

function validateTimeValues(obj, fieldname, taskStartTimeValue) {
  if (obj[fieldname] < taskStartTimeValue) {
    return `invalid time range`
  }
}

export function useValidateTimeValues(taskStartTimeValue) {
  return (obj, fieldname) => validateTimeValues(obj, fieldname, taskStartTimeValue)
}
import { faker } from '@faker-js/faker';

export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
  language: string;
  phoneNumber: string;
  acceptTerms: boolean;
  acceptMarketing: boolean;
}

const generateRandomBirthDate = (): string => {
  return faker.date
    .between({
      from: new Date(1950, 0, 1),
      to: new Date(2005, 11, 31),
    })
    .toISOString()
    .split('T')[0];
};

const generateRandomPhoneNumber = (): string => {
  return faker.helpers.fromRegExp(/^[1-9]{1}[0-9]{8}$/);
};

const generateFirstName = (): string => {
  const firstName = faker.person.firstName();
  return firstName.replace(/[^a-zA-Z]/g, '');
};

const generatePassword = (): string => {
  const length = 8;
  const specialChars = '!@#$%^&*';
  const randomSpecialChar = specialChars.charAt(
    faker.number.int({ max: specialChars.length - 1 }),
  );
  const randomNumber = faker.number.int({ max: 9 }).toString();
  const randomString = faker.internet.password({
    length: length,
    memorable: false,
    pattern: /[a-zA-Z0-9]/,
  });

  return randomString + randomNumber + randomSpecialChar;
};

export const generateRandomRegistrationData = (
  num: number,
): RegistrationData[] => {
  const languages = [
    'polski',
    'arabski',
    'angielski',
    'niemiecki',
    'francuski',
    'hiszpański',
    'włoski',
  ];

  return Array.from({ length: num }, () => {
    const password = generatePassword();

    return {
      firstName: generateFirstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: password,
      confirmPassword: password,
      birthDate: generateRandomBirthDate(),
      language: faker.helpers.arrayElement(languages),
      phoneNumber: generateRandomPhoneNumber(),
      acceptTerms: true,
      acceptMarketing: true,
    };
  });
};

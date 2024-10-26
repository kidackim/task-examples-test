import { test, expect, Page } from '@playwright/test';
import { RegisterFormPage, RegistrationData } from '@models/RegisterFormPage';

test.describe('Formularz - Testy poprawności formatu danych', () => {
  let registerPage: RegisterFormPage;
  let data: RegistrationData;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterFormPage(page);
    data = registerPage.getValidData();
    await registerPage.goto();
  });

  test("Nieprawidłowy format e-maila - brak znaku '@'", async ({ page }) => {
    await registerPage.fillForm({
      ...data,
      email: 'jankowalski.com',
    });
    await registerPage.submitForm();
    await expect(
      page.locator('text=Pole E-mail musi być poprawnym adresem email'),
    ).toBeVisible();
  });

  test('Nieprawidłowy format e-maila - brak domeny', async ({ page }) => {
    await registerPage.fillForm({
      ...data,
      email: 'jan@',
    });
    await registerPage.submitForm();
    await expect(
      page.locator('text=Pole E-mail musi być poprawnym adresem email'),
    ).toBeVisible();
  });

  test('Nieprawidłowy format e-maila - nieprawidłowe rozszerzenie domeny', async ({
    page,
  }) => {
    await registerPage.fillForm({
      ...data,
      email: 'jan.kowalski@example.c',
    });
    await registerPage.submitForm();
    await expect(
      page.locator('text=Pole E-mail musi być poprawnym adresem email'),
    ).toBeVisible();
  });

  test('Zbyt krótkie hasło', async ({ page }) => {
    await registerPage.fillForm({
      ...data,
      password: '12345',
      confirmPassword: '12345',
    });
    await registerPage.submitForm();
    await expect(
      page.locator(
        'text=Hasło musi zawierać: co najmniej 8 znaków, dużą literę, znak specjalny!',
      ),
    ).toBeVisible();
  });

  test('Hasło bez dużych liter, cyfr lub znaków specjalnych', async ({
    page,
  }) => {
    await registerPage.fillForm({
      ...data,
      password: 'haslosame',
      confirmPassword: 'haslosame',
    });
    await registerPage.submitForm();
    await expect(
      page.locator(
        'text=Hasło musi zawierać: dużą literę, liczbę, znak specjalny!',
      ),
    ).toBeVisible();
  });

  test('Numer telefonu zawierający litery', async ({ page }) => {
    await registerPage.fillForm({
      ...data,
      phoneNumber: '123abc456',
    });
    await registerPage.submitForm();
    await expect(
      page.locator('text=To pole może zawierać tylko cyfry i spacje'),
    ).toBeVisible();
  });

  test('Numer telefonu za krótki', async ({ page }) => {
    await registerPage.fillForm({
      ...data,
      phoneNumber: '123',
    });
    await registerPage.submitForm();
    await expect(
      page.locator('text=To pole musi zawierać co najmniej 9 cyfr'),
    ).toBeVisible();
  });

  test('Numer telefonu za długi', async ({ page }) => {
    await registerPage.fillForm({
      ...data,
      phoneNumber: '123456789012',
    });
    await registerPage.submitForm();
    await expect(
      page.locator('text=Numer telefonu jest niepoprawny'),
    ).toBeVisible();
  });

  test('Data urodzenia w przyszłości', async ({ page }) => {
    await registerPage.fillForm({
      ...data,
      birthDate: '2050-01-01',
    });
    await registerPage.submitForm();
    await expect(
      page.locator('text=Data urodzenia jest niepoprawna'),
    ).toBeVisible();
  });

  test('Data urodzenia w nieodpowiednim formacie', async ({ page }) => {
    await registerPage.fillBirthDate('01-01-2020');
    await registerPage.submitForm();
    await expect(
      page.locator('text=Pole Data urodzenia jest wymagane'),
    ).toBeVisible();
  });
});

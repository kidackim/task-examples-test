import { test, expect } from '@playwright/test';
import { RegisterFormPage, RegistrationData } from '@models/RegisterFormPage';

test.describe('Formularz - Testy negatywne (niedozwolone wartości)', () => {
  let registerPage: RegisterFormPage;
  let data: RegistrationData;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterFormPage(page);
    data = registerPage.getValidData();
    await registerPage.goto();
  });

  test('Niepoprawny format adresu e-mail', async ({ page }) => {
    await registerPage.fillForm({
      ...data,
      email: 'niepoprawnyemail',
    });
    await registerPage.submitForm();

    await expect(
      page.locator('text=Pole E-mail musi być poprawnym adresem email'),
    ).toBeVisible();
  });

  test('Zbyt krótkie hasło', async ({ page }) => {
    await registerPage.fillForm({
      ...data,
      password: '123',
      confirmPassword: '123',
    });
    await registerPage.submitForm();

    await expect(
      page.locator(
        'text=Hasło musi zawierać: co najmniej 8 znaków, dużą literę, znak specjalny!',
      ),
    ).toBeVisible();
  });

  test('Niezgodne hasła', async ({ page }) => {
    await registerPage.fillForm({
      ...data,
      confirmPassword: 'InneHaslo123!',
    });
    await registerPage.submitForm();

    await expect(page.locator('text=Hasła nie są jednakowe!')).toBeVisible();
  });

  test('Niepoprawny format numeru telefonu', async ({ page }) => {
    await registerPage.fillForm({
      ...data,
      phoneNumber: 'abcd123',
    });
    await registerPage.submitForm();

    await expect(
      page.locator('text=Niepoprawny format numeru telefonu'),
    ).toBeVisible();
  });

  test('Niepoprawna data urodzenia (przyszła data)', async ({ page }) => {
    await registerPage.fillForm({
      ...data,
      birthDate: '2050-01-01',
    });
    await registerPage.submitForm();

    await expect(
      page.locator('text=Data urodzenia jest niepoprawna'),
    ).toBeVisible();
  });
});

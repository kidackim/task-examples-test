import { test, expect } from '@playwright/test';
import { RegisterFormPage, RegistrationData } from '@models/RegisterFormPage';

test.describe('Formularz - Testy weryfikacji pól wymaganych', () => {
  let registerPage: RegisterFormPage;
  let data: RegistrationData;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterFormPage(page);
    data = registerPage.getValidData();
    await registerPage.goto();
  });

  test('Brak nazwiska - komunikat błędu', async ({ page }) => {
    await registerPage.fillForm({
      ...data,
      lastName: '',
    });
    await expect(
      page.locator('text=Pole Nazwisko jest wymagane'),
    ).toBeVisible();
  });

  test('Brak adresu e-mail - komunikat błędu', async ({ page }) => {
    await registerPage.fillForm({
      ...data,
      email: '',
    });
    await expect(page.locator('text=Pole E-mail jest wymagane')).toBeVisible();
  });

  test('Brak hasła - komunikat błędu', async ({ page }) => {
    await registerPage.fillForm({
      ...data,
      password: '',
    });
    await expect(
      page.locator('text=Pole password jest wymagane'),
    ).toBeVisible();
  });

  test('Brak powtórzenia hasła - komunikat błędu', async ({ page }) => {
    await registerPage.fillForm({
      ...data,
      confirmPassword: '',
    });
    await expect(
      page.locator('text=Pole Powtórz hasło jest wymagane'),
    ).toBeVisible();
  });

  test('Brak daty urodzenia - komunikat błędu', async ({ page }) => {
    await registerPage.fillForm({
      ...data,
      birthDate: '',
    });
    await expect(
      page.locator('text=Pole Data urodzenia jest wymagane'),
    ).toBeVisible();
  });

  test('Brak akceptacji regulaminu - komunikat błędu', async ({ page }) => {
    await registerPage.fillForm({
      ...data,
      acceptMarketing: false,
    });
    await registerPage.submitForm();

    await expect(page.locator('text=To pole jest wymagane')).toBeVisible();
  });
});

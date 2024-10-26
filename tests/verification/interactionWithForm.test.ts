import { test, expect } from '@playwright/test';
import { RegisterFormPage, RegistrationData } from '@models/RegisterFormPage';

test.describe('Formularz - Testy poprawności interakcji z formularzem', () => {
  let registerPage: RegisterFormPage;
  let data: RegistrationData;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterFormPage(page);
    data = registerPage.getValidData();
    await registerPage.goto();
  });

  test("Komunikat walidacyjny dla pustego pola 'Imię'", async ({ page }) => {
    await registerPage.fillFirstName('');
    await registerPage.fillLastName(data.lastName);

    await expect(page.locator('text=Pole Imię jest wymagane')).toBeVisible();
  });

  test("Przycisk 'Wyślij' zablokowany dla niepełnego formularza", async () => {
    await registerPage.fillForm({
      ...data,
      email: '',
    });
    await registerPage.submitForm();
    await expect(registerPage.submitButton).toBeDisabled();
  });

  test("Pole 'Powtórz hasło' waliduje się automatycznie po zmianie hasła", async ({
    page,
  }) => {
    await registerPage.fillPassword(data.password);
    await registerPage.fillConfirmPassword('HasloNiePasuje');
    await registerPage.fillFirstName(data.firstName);

    await expect(page.locator('text=Hasła nie są jednakowe!')).toBeVisible();

    await registerPage.fillConfirmPassword(data.password);
    await registerPage.fillFirstName(data.firstName);

    await expect(
      page.locator('text=Hasła nie są jednakowe!'),
    ).not.toBeVisible();
  });

  test("Walidacja natychmiastowa dla pola 'Numer telefonu'", async ({
    page,
  }) => {
    await registerPage.fillPhoneNumber('abc123');
    await registerPage.fillFirstName(data.firstName);

    await expect(
      page.locator('text=Niepoprawny format numeru telefonu'),
    ).toBeVisible();

    await registerPage.fillPhoneNumber(data.phoneNumber);
    await registerPage.fillFirstName(data.firstName);

    await expect(
      page.locator('text=Niepoprawny format numeru telefonu'),
    ).not.toBeVisible();
  });
});

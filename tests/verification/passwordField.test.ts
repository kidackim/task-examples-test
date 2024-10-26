import { test, expect } from '@playwright/test';
import { RegisterFormPage, RegistrationData } from '@models/RegisterFormPage';

test.describe('Formularz - Testy zgodności haseł', () => {
  let registerPage: RegisterFormPage;
  let data: RegistrationData;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterFormPage(page);
    data = registerPage.getValidData();
    await registerPage.goto();
  });

  test('Różne hasła - komunikat błędu', async ({ page }) => {
    await registerPage.fillForm({
      ...data,
      password: 'Haslo321!',
    });
    await expect(page.locator('text=Hasła nie są jednakowe!')).toBeVisible();
  });

  test("Puste pole 'Powtórz hasło' - komunikat błędu", async ({ page }) => {
    await registerPage.fillForm({
      ...data,
      confirmPassword: '',
    });
    await expect(
      page.locator('text=Pole Powtórz hasło jest wymagane'),
    ).toBeVisible();
  });

  test("Puste pole 'Hasło' - komunikat błędu", async ({ page }) => {
    await registerPage.fillForm({
      ...data,
      password: '',
    });
    await expect(
      page.locator('text=Pole password jest wymagane'),
    ).toBeVisible();
  });

  test('Poprawne zgodne hasła - brak komunikatu błędu', async () => {
    await registerPage.fillForm({
      ...data,
    });
    await registerPage.assertTextNotVisible('Pole password jest wymagane');
  });
});

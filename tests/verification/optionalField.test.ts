import { test, expect } from '@playwright/test';
import { RegisterFormPage, RegistrationData } from '@models/RegisterFormPage';

test.describe('Formularz - Testy pól opcjonalnych (zgody marketingowe)', () => {
  let registerPage: RegisterFormPage;
  let data: RegistrationData;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterFormPage(page);
    data = registerPage.getValidData();
    await registerPage.goto();
  });

  test('Wysłanie formularza bez zgód marketingowych - formularz wysłany poprawnie', async ({
    page,
  }) => {
    await registerPage.fillForm({
      ...data,
      acceptMarketing: false,
    });
    await registerPage.submitForm();
    const successEmail = page.locator(`//h1/..//p/span`);
    await expect(successEmail).toBeVisible();
    await expect(successEmail).toContainText(data.email);
  });

  test('Wysłanie formularza z zaznaczonymi zgodami marketingowymi - formularz wysłany poprawnie', async ({
    page,
  }) => {
    await registerPage.fillForm({
      ...data,
      acceptMarketing: true,
    });
    await registerPage.submitForm();
    const successEmail = page.locator(`//h1/..//p/span`);
    await expect(successEmail).toBeVisible();
    await expect(successEmail).toContainText(data.email);
  });
});

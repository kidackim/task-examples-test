import { test, expect, Page } from '@playwright/test';
import { generateRandomRegistrationData } from '@helpers/dataRandom';
import { RegisterFormPage } from '@models/RegisterFormPage';
import { RegistrationData } from '@models/RegisterFormPage';

const randomDataArray: RegistrationData[] = generateRandomRegistrationData(2);

const fillAndVerifyRegistrationForm = async (
  page: Page,
  data: RegistrationData,
): Promise<void> => {
  const registerPage = new RegisterFormPage(page);

  await registerPage.goto();

  await registerPage.fillForm(data);
  await registerPage.submitForm();

  const successEmail = page.locator(`//h1/..//p/span`);
  await expect(successEmail).toBeVisible();
  await expect(successEmail).toContainText(data.email);
};

test.describe('Rejestracja użytkowników', () => {
  randomDataArray.forEach((data, index) => {
    test(`Rejestracja użytkownika ${index + 1}`, async ({ page }) => {
      await fillAndVerifyRegistrationForm(page, data);
    });
  });
});

import { Page, Locator, expect } from '@playwright/test';

export interface RegistrationData {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  birthDate?: string;
  language?: string;
  phoneNumber?: string;
  acceptTerms?: boolean;
  acceptMarketing?: boolean;
}

export class RegisterFormPage {
  readonly page: Page;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly confirmPasswordField: Locator;
  readonly birthDateField: Locator;
  readonly languageDropdown: Locator;
  readonly phoneNumberField: Locator;
  readonly termsCheckbox: Locator;
  readonly marketingCheckbox: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameField = page.locator('input[placeholder="Imię"]');
    this.lastNameField = page.locator('input[placeholder="Nazwisko"]');
    this.emailField = page.locator('input[type="email"]');
    this.passwordField = page.locator('input[placeholder="Hasło"]');
    this.confirmPasswordField = page.locator(
      'input[placeholder="Powtórz hasło"]',
    );
    this.birthDateField = page.locator('input[name="date"]');
    this.languageDropdown = page.locator('select.input.select');
    this.phoneNumberField = page.locator('input[placeholder="Numer telefonu"]');
    this.termsCheckbox = page.locator(
      '//span[text()=" Akceptuję "]/../div[@class="fake-input"]',
    );
    this.marketingCheckbox = page.locator(
      '//span[contains(text(),"Wyrażam zgodę na")]/../div[@class="fake-input"]',
    );
    this.submitButton = page.locator('button[type="submit"]');
  }

  async goto(url: string = 'http://localhost:8082/'): Promise<void> {
    await this.page.goto(url);
  }

  async fillFirstName(firstName: string): Promise<void> {
    await this.firstNameField.fill(firstName);
  }

  async fillLastName(lastName: string): Promise<void> {
    await this.lastNameField.fill(lastName);
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailField.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordField.fill(password);
  }

  async fillConfirmPassword(confirmPassword: string): Promise<void> {
    await this.confirmPasswordField.fill(confirmPassword);
  }

  async fillBirthDate(birthDate: string): Promise<void> {
    await this.birthDateField.fill(birthDate);
  }

  async selectLanguage(language: string): Promise<void> {
    await this.languageDropdown.selectOption(language);
  }

  async fillPhoneNumber(phoneNumber: string): Promise<void> {
    await this.phoneNumberField.fill(phoneNumber);
  }

  async checkTerms(): Promise<void> {
    await this.termsCheckbox.click();
  }

  async checkMarketingConsent(): Promise<void> {
    await this.marketingCheckbox.click();
  }

  async submitForm(): Promise<void> {
    await this.submitButton.click();
  }

  async fillForm(data: RegistrationData): Promise<void> {
    await this.fillFirstName(data.firstName);
    await this.fillLastName(data.lastName);
    await this.fillEmail(data.email);
    await this.fillPassword(data.password);
    await this.fillConfirmPassword(data.confirmPassword);
    await this.selectLanguage(data.language);

    await this.fillBirthDate(data.birthDate);
    await this.fillPhoneNumber(data.phoneNumber);

    if (data.acceptTerms) {
      await this.checkTerms();
    }
    if (data.acceptMarketing) {
      await this.checkMarketingConsent();
    }
  }

  async assertTextNotVisible(text: string): Promise<void> {
    const locator: Locator = this.page.locator(`text=${text}`);
    await expect(locator).not.toBeVisible();
  }

  getValidData(overrides?: Partial<RegistrationData>): RegistrationData {
    const defaultData: RegistrationData = {
      firstName: 'Jan',
      lastName: 'Kowalski',
      email: 'jan.kowalski@example.com',
      password: 'Haslo123!',
      confirmPassword: 'Haslo123!',
      birthDate: '2020-01-01',
      language: 'polski',
      phoneNumber: '123456789',
      acceptTerms: true,
      acceptMarketing: true,
    };

    return { ...defaultData, ...overrides };
  }
}

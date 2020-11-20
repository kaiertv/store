import { element, by, ElementFinder } from 'protractor';

export class CalificacionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-calificacion div table .btn-danger'));
  title = element.all(by.css('jhi-calificacion div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class CalificacionUpdatePage {
  pageTitle = element(by.id('jhi-calificacion-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  dateInput = element(by.id('field_date'));
  evaluacionSelect = element(by.id('field_evaluacion'));

  productSelect = element(by.id('field_product'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDateInput(date: string): Promise<void> {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput(): Promise<string> {
    return await this.dateInput.getAttribute('value');
  }

  async setEvaluacionSelect(evaluacion: string): Promise<void> {
    await this.evaluacionSelect.sendKeys(evaluacion);
  }

  async getEvaluacionSelect(): Promise<string> {
    return await this.evaluacionSelect.element(by.css('option:checked')).getText();
  }

  async evaluacionSelectLastOption(): Promise<void> {
    await this.evaluacionSelect.all(by.tagName('option')).last().click();
  }

  async productSelectLastOption(): Promise<void> {
    await this.productSelect.all(by.tagName('option')).last().click();
  }

  async productSelectOption(option: string): Promise<void> {
    await this.productSelect.sendKeys(option);
  }

  getProductSelect(): ElementFinder {
    return this.productSelect;
  }

  async getProductSelectedOption(): Promise<string> {
    return await this.productSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class CalificacionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-calificacion-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-calificacion'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}

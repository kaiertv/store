import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CalificacionComponentsPage, CalificacionDeleteDialog, CalificacionUpdatePage } from './calificacion.page-object';

const expect = chai.expect;

describe('Calificacion e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let calificacionComponentsPage: CalificacionComponentsPage;
  let calificacionUpdatePage: CalificacionUpdatePage;
  let calificacionDeleteDialog: CalificacionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Calificacions', async () => {
    await navBarPage.goToEntity('calificacion');
    calificacionComponentsPage = new CalificacionComponentsPage();
    await browser.wait(ec.visibilityOf(calificacionComponentsPage.title), 5000);
    expect(await calificacionComponentsPage.getTitle()).to.eq('storeApp.calificacion.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(calificacionComponentsPage.entities), ec.visibilityOf(calificacionComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Calificacion page', async () => {
    await calificacionComponentsPage.clickOnCreateButton();
    calificacionUpdatePage = new CalificacionUpdatePage();
    expect(await calificacionUpdatePage.getPageTitle()).to.eq('storeApp.calificacion.home.createOrEditLabel');
    await calificacionUpdatePage.cancel();
  });

  it('should create and save Calificacions', async () => {
    const nbButtonsBeforeCreate = await calificacionComponentsPage.countDeleteButtons();

    await calificacionComponentsPage.clickOnCreateButton();

    await promise.all([
      calificacionUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      calificacionUpdatePage.evaluacionSelectLastOption(),
      calificacionUpdatePage.productSelectLastOption(),
    ]);

    expect(await calificacionUpdatePage.getDateInput()).to.contain('2001-01-01T02:30', 'Expected date value to be equals to 2000-12-31');

    await calificacionUpdatePage.save();
    expect(await calificacionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await calificacionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Calificacion', async () => {
    const nbButtonsBeforeDelete = await calificacionComponentsPage.countDeleteButtons();
    await calificacionComponentsPage.clickOnLastDeleteButton();

    calificacionDeleteDialog = new CalificacionDeleteDialog();
    expect(await calificacionDeleteDialog.getDialogTitle()).to.eq('storeApp.calificacion.delete.question');
    await calificacionDeleteDialog.clickOnConfirmButton();

    expect(await calificacionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

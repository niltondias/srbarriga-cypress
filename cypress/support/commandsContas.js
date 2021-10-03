import loc from './locators'

Cypress.Commands.add('acessarMenuContas', () => {
    // Clicar em configurações
    cy.get(loc.MENU.SETTINGS).click()

    // Clicar em contas
    cy.get(loc.MENU.CONTAS).click()

})

Cypress.Commands.add('inserirConta', conta => {
    // Preencher o nome da conta
    cy.get(loc.CONTAS.NOME).type(conta)

    // Clicar no botão para salvar a conta
    cy.get(loc.CONTAS.BTN_SALVAR).click()

})



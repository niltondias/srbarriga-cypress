/// <reference types="cypress" />

import loc from '../support/locators'
import '../support/commandsContas'

describe('Desafio SrBarriga React - Casos de testes', () => {

	before(() => {
		cy.login('nilton.dias@email.com', '1234')
		cy.resetApp()

	})

	it('Incluir uma conta com sucesso', () => {

		// Acessar o menu
		cy.acessarMenuContas()

		// Inserir uma conta
		cy.inserirConta('Conta Bradesco')

		// Assertiva verificando a mensagem de sucesso
		cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
	})

	it('Alterar conta com sucesso ', () => {

		// Acessar o menu
		cy.acessarMenuContas()

		// Clicar no botão alterar conta
		cy.xpath(loc.CONTAS.XP_BTN_ALTERAR).click()

		// Digitar novo nome da conta
		cy.get(loc.CONTAS.NOME)
			.clear()
			.type('Conta Itau')

		// Clicar no botão para salvar a conta
		cy.get(loc.CONTAS.BTN_SALVAR).click()

		// Assertiva verificando a mensagem de sucesso
		cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')

	})

	it('Não deve incluir uma conta repetida e valiar mensagem', () => {

		// Acessar o menu contas
		cy.acessarMenuContas()

		// Preencher o nome da conta
		cy.inserirConta('Conta Itau')

		// Assertiva verificando a mensagem de sucesso
		cy.get(loc.MESSAGE).should('contain', 'code 400')

	})

	it('Inserir movimentação com sucesso', () => {

		// Clicar no menu movimentações
		cy.get(loc.MENU.MOVIMENTACAO).click()

		// Descrição da movientação
		cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Saldo inicial')

		// Valor do movimento
		cy.get(loc.MOVIMENTACAO.VALOR).type('1500')

		// Interessado / envolvido
		cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Eu mesmo')

		cy.xpath(loc.MOVIMENTACAO.XP_CONTA).select('Conta Itau')

		// Clicar no botão para salvar o movimento
		cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()

		cy.get(loc.MESSAGE).should('contain', 'Movimentação inserida com sucesso!')

		// Clicar no menu movimentação para validar quantidade de regitros
		cy.get(loc.MENU.EXTRATO).click()

		// Assertiva veriificando se a lista possui 7 elementos
		// Isso indica que a nova movimentação foi incluída
		cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)

		// Localizando o movimento na lista validando descrição e valor
		cy.xpath(loc.EXTRATO.XP_BUSCA_ELEMENTO).should('exist')


	})

	it.skip('Calcular saldo da conta', () => {

		// Clicar no link de saldo das contas
		cy.get(':nth-child(1) > .nav-link > .fas').click()

		// Localizando o registro da conta e validando o saldo
		cy.xpath("//td[contains(.,'Conta Itau')]/following-sibling::td").should('contain', '1.500,00')

	})

	it.skip('Excluindo a movimentação', () => {

		// Clicando no botão que abre exibe as movimentações
		cy.get(':nth-child(3) > .nav-link > .fas').click()

		// CLicando no botão para excluir a movimentação
		cy.get(':nth-child(3) > .nav-link > .fas').click()

		//Validando a mensagem de exclusão do movimento com sucesso
		cy.get('.toast-message').should('contain', 'Movimentação inserida com sucesso!')

	})

})
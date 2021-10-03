/// <reference types="cypress" />

import loc from '../support/locators'

describe('Desafio SrBarriga React - Casos de testes', () => {

	before(() => {
		cy.visit('http://barrigareact.wcaquino.me')

		// Informar o com o email
		cy.get(loc.LOGIN.USER).type('nilton.dias@email.com')

		// Informar a senha
		cy.get(loc.LOGIN.PASSWORD).type('1234')

		// Clicar no botão entrar
		cy.get(loc.LOGIN.BTN_LOGIN).click()

		cy.get(loc.MESSAGE).should('contain', 'Bem vindo')

	})

	it('Incluir uma conta com sucesso', () => {

		// Clicar em configurações
		cy.get(loc.MENU.SETTINGS).click()

		// Clicar em contas
		cy.get(loc.MENU.CONTAS).click()

		// Preencher o nome da conta
		cy.get(loc.CONTAS.NOME).type('Conta Bradesco')

		// Clicar no botão para salvar a conta
		cy.get(loc.CONTAS.BTN_SALVAR).click()

		// Assertiva verificando a mensagem de sucesso
		cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')

	})

	it('Alterar conta com sucesso ', () => {

		// Clicar em configurações
		cy.get(loc.MENU.SETTINGS).click()

		// Clicar em contas
		cy.get(loc.MENU.CONTAS).click()

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

	it('Incluir conta repetida e valiar mensagem', () => {

		// Clicar em configurações
		cy.get('[data-test=menu-settings]').click()

		// Clicar em contas
		cy.contains('Contas').click()

		// Preencher o nome da conta
		cy.get('[data-test=nome]').type('Conta Itau')

		// Clicar no botão para salvar a conta
		cy.get('.btn').click()

		// Assertiva verificando a mensagem de sucesso
		cy.get('.toast-message').should('contain', '400')

	})

	it('Inserir movimentação com sucesso', () => {

		// Clicar em movimentações
		cy.get(':nth-child(2) > .nav-link > .fas').click()

		// Descrição da movientação
		cy.get('#descricao').type('Saldo inicial')

		// Valor do movimento
		cy.get('.col-4 > .form-control').type('1500')

		// Interessado / envolvido
		cy.get('#envolvido').type('Eu mesmo')

		// Conta corrente ( Select )
		let conta

		cy.xpath("//select/option[contains(.,'Conta Itau')]").then($el => {
			conta = $el.val();
		})

		cy.xpath("//select").select(conta)

		// CLicar no botão para trocar o tipo para receita
		cy.get('.col-2 > .btn').click()

		// Clicar no botão para salvar o movimento
		cy.get('.btn-primary').click()

	})

	it('Calcular saldo da conta', () => {

		// Clicar no link de saldo das contas
		cy.get(':nth-child(1) > .nav-link > .fas').click()

		// Localizando o registro da conta e validando o saldo
		cy.xpath("//td[contains(.,'Conta Itau')]/following-sibling::td").should('contain', '1.500,00')

	})

	it('Excluindo a movimentação', () => {

		// Clicando no botão que abre exibe as movimentações
		cy.get(':nth-child(3) > .nav-link > .fas').click()

		// CLicando no botão para excluir a movimentação
		cy.get(':nth-child(3) > .nav-link > .fas').click()

		//Validando a mensagem de exclusão do movimento com sucesso
		cy.get('.toast-message').should('contain', 'Movimentação inserida com sucesso!')

	})

})
/// <reference types="cypress" />

describe('Desafio SrBarriga React - Casos de testes', () => {

	before(() => {
		cy.visit('http://barrigareact.wcaquino.me')

		// Informar o com o email
		cy.get("[data-test='email']").type('nilton.dias@email.com')

		// Informar a senha
		cy.get("[data-test='passwd']").type('1234')

		// Clicar no botão entrar
		cy.get('.btn').click()

	})

	it('Incluir uma conta com sucesso', () => {

		// Clicar em configurações
		cy.get('[data-test=menu-settings]').click()

		// Clicar em contas
		cy.contains('Contas').click()

		// Preencher o nome da conta
		cy.get('[data-test=nome]').type('Conta Bradesco')

		// Clicar no botão para salvar a conta
		cy.get('.btn').click()

		// Assertiva verificando a mensagem de sucesso
		cy.get('.toast-message').should('contain', 'Conta inserida com sucesso!')

	})

	it('Alterar conta com sucesso ', () => {

		// Clicar no botão alterar conta
		cy.get('.fa-edit').click()

		// Digitar novo nome da conta
		cy.get('[data-test=nome]').clear()
		cy.get('[data-test=nome]').type('Conta Itau')


		// Clicar no botão para salvar a conta
		cy.get('.btn').click()

		// Assertiva verificando a mensagem de sucesso
		cy.get('.toast-message').should('contain', 'Conta atualizada com sucesso!')

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
		//cy.xpath("//*[data-test=conta]/option[contains(.,'teste')]").click()

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
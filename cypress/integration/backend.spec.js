/// <reference types="cypress" />

describe('Desafio SrBarriga React - Testes funcionais', () => {

	before(() => {
		// cy.login('nilton.dias@email.com', '1234')

	})

	beforeEach(() => {
		// cy.resetApp()

	})

	it('Incluir uma conta com sucesso', () => {
		cy.request({
			method: 'POST',
			url: 'https://barrigarest.wcaquino.me/signin',
			body: {
				email: "nilton.dias@email.com",
				redirecionar: false,
				senha: "1234"
			}
		}).its('body.token').should('not.be.empty')

	})

	it('Alterar conta com sucesso ', () => {

	})

	it('Não deve incluir uma conta repetida e valiar mensagem', () => {

	})

	it('Inserir movimentação com sucesso', () => {

	})

	it('Calcular saldo da conta', () => {

	})

	it('Excluindo a movimentação com sucesso', () => {

	})

})
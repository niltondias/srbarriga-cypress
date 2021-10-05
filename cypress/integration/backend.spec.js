/// <reference types="cypress" />

describe('Desafio SrBarriga React - Testes funcionais', () => {
	let token

	before(() => {
		cy.getToken('nilton.dias@email.com', '1234')
			.then(tkn => {
				token = tkn
			})
	})

	beforeEach(() => {
		// cy.resetApp()

	})

	it('Incluir uma conta com sucesso', () => {
		// cy.request({
		// 	method: 'POST',
		// 	url: 'https://barrigarest.wcaquino.me/signin',
		// 	body: {
		// 		email: "nilton.dias@email.com",
		// 		redirecionar: false,
		// 		senha: "1234"
		// 	}
		// }).its('body.token').should('not.be.empty')
		cy.request({
			url: 'https://barrigarest.wcaquino.me/contas',
			method: 'POST',
			headers: {
				Authorization: `JWT ${token}`
			},
			body: {
				nome: 'Conta incluida com rest'
			}
		}).as('response')

		cy.get('@response').then(res => {

			expect(res.status).to.be.equals(201)
			expect(res.body).have.property('id')
			expect(res.body).to.be.property('nome', 'Conta incluida com rest')

		})

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
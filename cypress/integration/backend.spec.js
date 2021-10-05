/// <reference types="cypress" />

describe('Desafio SrBarriga React - Testes funcionais', () => {
	let token
	const usuario = 'nilton.dias@email.com'
	const senha = '1234'

	before(() => {
		cy.getToken(usuario, senha)
			.then(tkn => {
				token = tkn
			})
	})

	beforeEach(() => {
		cy.resetRest(token, usuario, senha)

	})

	it('Incluir uma conta com sucesso', () => {
		cy.request({
			url: '/contas',
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
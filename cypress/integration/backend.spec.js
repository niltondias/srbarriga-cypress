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
				nome: 'Conta incluida via rest'
			}
		}).as('response')

		cy.get('@response').then(res => {

			expect(res.status).to.be.equals(201)
			expect(res.body).have.property('id')
			expect(res.body).to.be.property('nome', 'Conta incluida via rest')

		})

	})

	it('Alterar conta com sucesso ', () => {
		cy.getContaByName('Conta para alterar')
			.then(contaId => {
				cy.request({
					url: `/contas/${contaId}`,
					method: "PUT",
					headers: {
						Authorization: `JWT ${token}`
					},
					body: {
						nome: "Conta alterada via rest"
					}
				}).as('response')

				cy.get('@response').its('status').should('be.equal', 200)
			})

	})

	it('Não deve incluir uma conta repetida e valiar mensagem', () => {
		cy.request({
			url: '/contas',
			method: 'POST',
			headers: {
				Authorization: `JWT ${token}`
			},
			body: {
				nome: 'Conta mesmo nome'
			},
			failOnStatusCode: false
		}).as('response')

		cy.get('@response').then(res => {

			expect(res.status).to.be.equals(400)
			expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')

		})


	})

	it('Inserir movimentação com sucesso', () => {
		cy.getContaByName('Conta para movimentacoes').then(contaId => {
			cy.request({
				method: 'POST',
				url: '/transacoes',
				headers: {
					Authorization: `JWT ${token}`
				},
				body: {
					conta_id: contaId,
					data_pagamento: Cypress.moment().add({ days: 1 }).format('DD/MM/YYYY'),
					data_transacao: Cypress.moment().format('DD/MM/YYYY'),
					descricao: "Desc",
					envolvido: "Eu",
					status: true,
					tipo: "REC",
					valor: 123
				}
			}).as('response')

		})

		cy.get('@response').its('status').should('be.equal', 201)
		cy.get('@response').its('body.id').should('exist')

	})

	it('Calcular saldo da conta', () => {

	})

	it('Excluindo a movimentação com sucesso', () => {

	})

})
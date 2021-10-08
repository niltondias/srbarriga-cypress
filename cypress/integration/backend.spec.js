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
				headers: { Authorization: `JWT ${token}` },
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

	it.only('Calcular saldo da conta', () => {
		// Consultando o saldo da conta antes da movimentação
		cy.request({
			method: 'GET',
			url: '/saldo',
			headers: { Authorization: `JWT ${token}` }
		}).then(res => {
			let saldoConta = null
			res.body.forEach(c => {
				if (c.conta === 'Conta para saldo') saldoConta = c.saldo
			})
			expect(saldoConta).to.be.equal('534.00')
		})

		//Localizando a movimentação a ser alterada
		cy.request({
			method: 'GET',
			url: '/transacoes',
			headers: { Authorization: `JWT ${token}` },
			qs: { descricao: 'Movimentacao 1, calculo saldo' }
		}).then(res => {
			//Efetuando uma movimentação para depois consulta o saldo da conta
			cy.request({
				method: 'PUT',
				url: `/transacoes/${res.body[0].id}`,
				headers: { Authorization: `JWT ${token}` },
				body: {
					conta_id: res.body[0].conta_id,
					data_pagamento: Cypress.moment(res.body[0].data_pagamento).format('DD/MM/YYYY'),
					data_transacao: Cypress.moment(res.body[0].data_transacao).format('DD/MM/YYYY'),
					descricao: "Movimentacao 1, calculo saldo",
					envolvido: res.body[0].envolvido,
					status: true,
					valor: res.body[0].valor
				}
			}).its('status').should('be.equal', 200)
		})
		// Consultando o saldo da conta após a movimentação
		cy.request({
			method: 'GET',
			url: '/saldo',
			headers: { Authorization: `JWT ${token}` }
		}).then(res => {
			let saldoConta = null
			res.body.forEach(c => {
				if (c.conta === 'Conta para saldo') saldoConta = c.saldo
			})
			expect(saldoConta).to.be.equal('4034.00')
		})
	})


	it('Excluindo a movimentação com sucesso', () => {

	})
})



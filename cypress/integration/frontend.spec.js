/// <reference types="cypress" />

import loc from '../support/locators'
import '../support/commandsContas'
import buildEnv from '../support/buildEnv'

describe('Desafio SrBarriga React - Testes FrontEnd', () => {

	after(() => {
		cy.clearLocalStorage()
	})

	beforeEach(() => {
		buildEnv()
		cy.login('nilton.dias@email.com', '1234 Senha errada')
		// cy.resetApp()

	})

	it('Incluir uma conta com sucesso', () => {
		// Acessar o menu
		cy.acessarMenuContas()

		// Inserir uma conta
		cy.route({
			method: 'POST',
			url: '/contas',
			response: { "id": 3, "nome": "Banco Bradesco", "visivel": true, "usuario_id": 1 }
		})

		// Redefinir rota após incluir conta
		cy.route({
			method: 'GET',
			url: '/contas',
			response: [
				{ "id": 1, "nome": "Carteira", "visivel": true, "usuario_id": 1 },
				{ "id": 2, "nome": "Banco", "visivel": true, "usuario_id": 1 },
				{ "id": 3, "nome": "Conta Bradesco", "visivel": true, "usuario_id": 1 }
			]
		}).as('ContasSalvas')

		cy.inserirConta('Conta Bradesco')

		// Acessar o menu
		cy.acessarMenuContas()

		// Assertiva verificando a mensagem de sucesso
		cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
	})

	it('Alterar conta com sucesso ', () => {
		cy.route({
			method: 'PUT',
			url: '/contas/**',
			response: { "id": 1, "nome": "Carteira Alterada", "visivel": true, "usuario_id": 1 }
		})

		// Acessar o menu
		cy.acessarMenuContas()

		// Clicar no botão alterar conta
		cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Carteira')).click()

		// Digitar novo nome da conta
		cy.get(loc.CONTAS.NOME)
			.clear()
			.type('Carteira alterada')

		// Redefinir a rota para refletir a alteração da conta
		cy.route({
			method: 'GET',
			url: '/contas',
			response: [
				{ "id": 1, "nome": "Carteira Alterada", "visivel": true, "usuario_id": 1 },
				{ "id": 2, "nome": "Banco", "visivel": true, "usuario_id": 1 },
			]
		}).as('ContaAlterda')

		// Clicar no botão para salvar a conta
		cy.get(loc.CONTAS.BTN_SALVAR).click()

		// Assertiva verificando a mensagem de sucesso
		cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
	})

	it('Não deve incluir uma conta repetida e valiar mensagem', () => {

		cy.route({
			method: 'POST',
			url: '/contas',
			response: { "error": "Já existe uma conta com esse nome!" },
			status: 400
		}).as('saveContaMesmoNome')

		// Acessar o menu contas
		cy.acessarMenuContas()

		// Preencher o nome da conta
		cy.inserirConta('Banco')

		// Assertiva verificando a mensagem de sucesso
		cy.get(loc.MESSAGE).should('contain', 'code 400')

	})

	it.only('Inserir movimentação com sucesso', () => {

		// Rota para incluir uma nova transação financeira
		cy.route({
			method: 'POST',
			url: '/transacoes',
			response: {
				"id": 788803,
				"descricao": "teste",
				"envolvido": "eu mesmo",
				"observacao": null,
				"tipo": "REC",
				"data_transacao": "2021-10-11T03:00:00.000Z",
				"data_pagamento": "2021-10-11T03:00:00.000Z",
				"valor": "115.00",
				"status": false,
				"conta_id": 1,
				"usuario_id": 1,
				"transferencia_id": null,
				"parcelamento_id": null
			}
		}).as('novaTransacao')

		// Rota para extrada das transações
		cy.route({
			method: 'GET',
			url: '/extrato/**',
			response: 'fixture:movimentacaoSalva'
		}).as('extratoMovIncluida')

		// Clicar no menu movimentações
		cy.get(loc.MENU.MOVIMENTACAO).click()

		// Descrição da movientação
		cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Saldo inicial')

		// Valor do movimento
		cy.get(loc.MOVIMENTACAO.VALOR).type('1500')

		// Interessado / envolvido
		cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Eu mesmo')

		// Selecionar a conta
		cy.xpath(loc.MOVIMENTACAO.XP_CONTA).select('Banco')

		// Marcar o status como compensado
		cy.get(loc.MOVIMENTACAO.STATUS).click()

		// Clicar no botão para salvar o movimento
		cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()

		cy.get(loc.MESSAGE).should('contain', 'Movimentação inserida com sucesso!')

		// Clicar no menu movimentação para validar quantidade de regitros
		cy.get(loc.MENU.EXTRATO).click()

		// Assertiva veriificando se a lista possui 7 elementos
		// Isso indica que a nova movimentação foi incluída
		cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)

		// Localizando o movimento na lista validando descrição e valor
		cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Saldo inicial', '1.500,00')).should('exist')

	})

	it('Calcular saldo da conta', () => {

		// Clicando no botão que abre exibe as movimentações
		cy.get(loc.MENU.HOME).click()

		// CLicando no botão para excluir a movimentação
		cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta Itau')).should('contain', '1.500,00')

	})

	it('Excluindo a movimentação com sucesso', () => {

		// Clicando no botão que abre exibe as movimentações
		cy.get(loc.MENU.EXTRATO).click()

		// CLicando no botão para excluir a movimentação
		cy.xpath(loc.EXTRATO.FN_XP_BTN_EXCLUIR('Saldo inicial')).click()

		//Validando a mensagem de exclusão do movimento com sucesso
		cy.get('.toast-message').should('contain', 'sucesso')

	})

})
const buildEnv = () => {
    //Criando o servidor
    cy.server()

    //Criando a rota para o login
    cy.route({
        method: 'POST',
        url: '/signin',
        response: {
            id: 1000,
            nome: 'Usuario fake',
            toke: 'Um token inválido que na verdade vai funcionar'
        }
    }).as('signin')

    //Criando a rota de saldos
    cy.route({
        method: 'GET',
        url: '/saldo',
        response: [{
            "conta_id": 999,
            "conta": "Carteira",
            "saldo": "1000.00"
        },
        {
            "conta_id": 9909,
            "conta": "Banco",
            "saldo": "1000000000.00"
        }]
    }).as('saldo')
    cy.route({
        method: 'GET',
        url: '/contas',
        response: [
            { "id": 1, "nome": "Carteira", "visivel": true, "usuario_id": 1 },
            { "id": 2, "nome": "Banco", "visivel": true, "usuario_id": 1 },
        ]
    }).as('Contas')

    // Rota para extrada das transações
    cy.route({
        method: 'GET',
        url: '/extrato/**',
        response: [
            { "conta": "Conta para movimentacoes", "id": 788803, "descricao": "teste", "envolvido": "eu mesmo", "observacao": null, "tipo": "REC", "data_transacao": "2021-10-11T03:00:00.000Z", "data_pagamento": "2021-10-11T03:00:00.000Z", "valor": "115.00", "status": false, "conta_id": 847985, "usuario_id": 25366, "transferencia_id": null, "parcelamento_id": null },
            { "conta": "Conta com movimentacao", "id": 787291, "descricao": "Movimentacao de conta", "envolvido": "BBB", "observacao": null, "tipo": "DESP", "data_transacao": "2021-10-08T03:00:00.000Z", "data_pagamento": "2021-10-08T03:00:00.000Z", "valor": "-1500.00", "status": true, "conta_id": 847986, "usuario_id": 25366, "transferencia_id": null, "parcelamento_id": null },
            { "conta": "Conta para saldo", "id": 787292, "descricao": "Movimentacao 1, calculo saldo", "envolvido": "CCC", "observacao": null, "tipo": "REC", "data_transacao": "2021-10-08T03:00:00.000Z", "data_pagamento": "2021-10-08T03:00:00.000Z", "valor": "3500.00", "status": false, "conta_id": 847987, "usuario_id": 25366, "transferencia_id": null, "parcelamento_id": null },
            { "conta": "Conta para saldo", "id": 787293, "descricao": "Movimentacao 2, calculo saldo", "envolvido": "DDD", "observacao": null, "tipo": "DESP", "data_transacao": "2021-10-08T03:00:00.000Z", "data_pagamento": "2021-10-08T03:00:00.000Z", "valor": "-1000.00", "status": true, "conta_id": 847987, "usuario_id": 25366, "transferencia_id": null, "parcelamento_id": null },
            { "conta": "Conta para saldo", "id": 787294, "descricao": "Movimentacao 3, calculo saldo", "envolvido": "EEE", "observacao": null, "tipo": "REC", "data_transacao": "2021-10-08T03:00:00.000Z", "data_pagamento": "2021-10-08T03:00:00.000Z", "valor": "1534.00", "status": true, "conta_id": 847987, "usuario_id": 25366, "transferencia_id": null, "parcelamento_id": null },
            { "conta": "Conta para extrato", "id": 787296, "descricao": "Saldo inicial", "envolvido": "FFF", "observacao": null, "tipo": "DESP", "data_transacao": "2021-10-08T03:00:00.000Z", "data_pagamento": "2021-10-08T03:00:00.000Z", "valor": "1500.00", "status": true, "conta_id": 847988, "usuario_id": 25366, "transferencia_id": null, "parcelamento_id": null }
        ]
    }).as('extrato')

}

export default buildEnv
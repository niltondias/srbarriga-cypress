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

    cy.route({
        method: 'POST',
        url: '/contas',
        response: {
            "id": 3,
            "nome": "Conta Bradesco",
            "visivel": true,
            "usuario_id": 1
        }
    }).as('Incluir conta')

}

export default buildEnv
const locators = {
    LOGIN: {
        USER: '[data-test=email]',
        PASSWORD: '[data-test=passwd]',
        BTN_LOGIN: '.btn'
    },

    MENU: {
        SETTINGS: '[data-test=menu-settings]',
        CONTAS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        MOVIMENTACAO: '[data-test=menu-movimentacao]',
        EXTRATO: '[data-test=menu-extrato]'
    },

    CONTAS: {
        NOME: '[data-test=nome]',
        BTN_SALVAR: '.btn',
        XP_BTN_ALTERAR: "//td[contains(.,'Conta Bradesco')]/following-sibling::td/i[@class='far fa-edit']"
    },

    MOVIMENTACAO: {
        DESCRICAO: '#descricao',
        VALOR: '[data-test=valor]',
        INTERESSADO: '#envolvido',
        BTN_SALVAR: '.btn-primary',
        XP_CONTA: '//select'
    },

    EXTRATO: {
        LINHAS: '.list-group > li',
        XP_BUSCA_ELEMENTO: "//span[contains(.,'Saldo inicial')]/following-sibling::small[contains(.,'1.500')]"
    },

    MESSAGE: '.toast-message',
}

export default locators;
const locators = {
    LOGIN: {
        USER: '[data-test=email]',
        PASSWORD: '[data-test=passwd]',
        BTN_LOGIN: '.btn'
    },

    MENU: {
        HOME: '[data-test=menu-home]',
        SETTINGS: '[data-test=menu-settings]',
        CONTAS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        MOVIMENTACAO: '[data-test=menu-movimentacao]',
        EXTRATO: '[data-test=menu-extrato]'
    },

    CONTAS: {
        NOME: '[data-test=nome]',
        BTN_SALVAR: '.btn',
        FN_XP_BTN_ALTERAR: nome => `//td[contains(.,'${nome}')]/following-sibling::td/i[@class='far fa-edit']`
    },

    MOVIMENTACAO: {
        DESCRICAO: '#descricao',
        VALOR: '[data-test=valor]',
        INTERESSADO: '#envolvido',
        STATUS: '[data-test=status]',
        BTN_SALVAR: '.btn-primary',
        XP_CONTA: '//select'
    },

    EXTRATO: {
        LINHAS: '.list-group > li',
        FN_XP_BUSCA_ELEMENTO: (desc, valor) => `//span[contains(.,'${desc}')]/following-sibling::small[contains(.,'${valor}')]`
    },

    SALDO: {
        FN_XP_SALDO_CONTA: nome => `//td[contains(.,'${nome}')]/following-sibling::td`
    },

    MESSAGE: '.toast-message',
}

export default locators;
export default `
query me {
    me {
        defaultAccount {
            wallets {
              walletCurrency
              id
            }
        }
    }
}
`
export default `
query me {
    me {
        username
        defaultAccount {
            wallets {
              walletCurrency
              balance
            }
        }
    }
}
`;

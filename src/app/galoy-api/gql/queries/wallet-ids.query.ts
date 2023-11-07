export default `
query Me {
  me {
    defaultAccount {
      wallets {
        id
        walletCurrency
      }
    }
  }
}
`;

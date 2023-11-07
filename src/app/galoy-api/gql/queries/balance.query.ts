export default `
query Me {
  me {
    defaultAccount {
      wallets {
        walletCurrency
        balance
      }
    }
  }
}
`;

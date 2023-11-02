import { GaloyApi } from "./galoy-api";

type WalletIdsResponse = {
  data: {
    data: {
      me: {
        defaultAccount: {
          wallets: {
            walletCurrency: "BTC" | "USD"
            id: string
          }[]
        }
      }
    }
  }
}

const parseWalletIds = (resp: WalletIdsResponse): { btcWalletId: string, usdWalletId: string } => {
  const wallets = resp.data.data.me.defaultAccount.wallets

  const btcWallet = wallets.find((w) => w.walletCurrency === "BTC")
  if (btcWallet === undefined) throw new Error("missing BTC wallet")

  const usdWallet = wallets.find((w) => w.walletCurrency === "USD")
  if (usdWallet === undefined) throw new Error("missing USD wallet")

  return { btcWalletId: btcWallet.id, usdWalletId: usdWallet.id, }
}

export const walletIds = async (): Promise<{ btcWalletId: string, usdWalletId: string }> => {
  const walletIdsResp = await GaloyApi().queries.walletIds()
  const walletIds = parseWalletIds(walletIdsResp)
  console.log({ walletIds })
  return walletIds
}

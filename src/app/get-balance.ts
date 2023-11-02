import { GaloyApi } from "./galoy-api";

type BalanceResponse = {
  data: {
    data: {
      me: {
        defaultAccount: {
          wallets: {
            walletCurrency: "BTC" | "USD";
            balance: number;
          }[];
        };
      };
    };
  };
};

const parseBtcBalance = (
  resp: BalanceResponse
): { btc: number; usd: number } => {
  const wallets = resp.data.data.me.defaultAccount.wallets;

  const btcWallet = wallets.find((w) => w.walletCurrency === "BTC");
  if (btcWallet === undefined) throw new Error("missing BTC wallet");

  const usdWallet = wallets.find((w) => w.walletCurrency === "USD");
  if (usdWallet === undefined) throw new Error("missing USD wallet");

  return { btc: btcWallet.balance, usd: usdWallet.balance };
};

export const getAccountBalance = async (): Promise<string> => {
  const balanceResp = await GaloyApi().queries.balance();
  const balances = parseBtcBalance(balanceResp);
  console.log({ balances });
  return `${balances.btc.toLocaleString("en-US")} sats + $${(
    balances.usd / 100
  ).toFixed(2)}`;
};

import axios from "axios";

import lnInvoiceCreateMutation from "./gql/mutations/ln-invoice-create.mutation";
import balanceQuery from "./gql/queries/balance.query";
import walletIdsQuery from "./gql/queries/wallet-ids.query";

// For staging (signet) use: "https://api.staging.galoy.io/graphql" 
// For mainnet use: "https://api.blink.sv/graphql"
const GALOY_ENDPOINT = process.env.galoy_endpoint;
//const TOKEN = process.env.auth_token; // legacy token
const TOKEN = process.env.api_key; // API key from the Blink Dashboard
const HEADERS = {
  "Content-Type": "application/json",
};

type GqlCallArgs = {
  query: string;
  variables?: Record<string, any>;
};

const gqlCall = async (args: GqlCallArgs) =>
  axios.post(GALOY_ENDPOINT, args, { headers: HEADERS });

const authedGqlCall = (args: GqlCallArgs) => {
  if (!TOKEN) throw new Error("missing token");
  return axios.post(GALOY_ENDPOINT, args, {
    // headers: { ...HEADERS, Authorization: `Bearer ${TOKEN}` }, // legacy token
    headers: { ...HEADERS, "X-API-KEY": TOKEN }, // API key from the Blink Dashboard:
  });
};

export const GaloyApi = () => ({
  queries: {
    balance: () => authedGqlCall({ query: balanceQuery }),
    walletIds: () => authedGqlCall({ query: walletIdsQuery }),
  },
  mutations: {
    lnInvoiceCreate: (variables: {
      amount: number;
      walletId: string;
      memo?: string;
    }) =>
      authedGqlCall({
        query: lnInvoiceCreateMutation,
        variables: {
          input: variables,
        },
      }),
  },
});

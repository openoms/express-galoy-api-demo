1. Open the [project on replit](https://replit.com/@openoms/express-galoy-api-demo)

2. Fork it!

3. Fill in the GraphQL requests
   * the files are:
     ```
     src/app/galoy-api/gql/mutations/ln-invoice-create.mutation.ts
     ```
     ```
     src/app/galoy-api/gql/queries/balance.query.ts
     ```
     ```
     src/app/galoy-api/gql/queries/wallet-ids.query.ts
     ```

   * find the requests on
     * the [API tutorials of dev.blink.sv](https://dev.blink.sv/api/btc-ln-receive#get-the-wallet-ids-and-check-the-balances)



     * [GraphQL playground](https://api.blink/graphql)
     * [Postman collection](https://documenter.getpostman.com/view/29391384/2s9YCAQq3z#f3e8e86e-67c1-411d-8208-03220fd1ed43)

4. Fill in the secrets:
   * `galoy_endpoint`:
     * for mainnet use:
       ```
       https://api.blink.sv/graphql
       ```
     * for staging (signet) use:
       ```
       https://api.staging.galoy.io/graphql"
       ```

   * `api_key`
     * log in or register on https://dashboard.blink.sv
     * generate and copy an API key

5. Run the repl
6. Check your balance
7. Create and invoice and share it

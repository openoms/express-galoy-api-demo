import { GaloyApi } from "./galoy-api"

type InvoiceResponse = {
  data: {
    data: {
      lnInvoiceCreate: {
        invoice: {
          paymentRequest: string
        }
      }
    }
  }
}

const parseInvoice = (resp: InvoiceResponse): { paymentRequest: string } =>
  resp.data.data.lnInvoiceCreate.invoice


export const addInvoice = async (
  variables: {
    amount: number,
    walletId: string,
    memo?: string,
  }): Promise<{ paymentRequest: string }> => {
  const invoiceResp = await GaloyApi().mutations.lnInvoiceCreate(variables)
  const { paymentRequest } = parseInvoice(invoiceResp)
  console.log({ invoice: paymentRequest })
  return { paymentRequest }
}

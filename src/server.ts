import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { addInvoice } from './app/add-invoice'
import { getAccountBalance } from './app/get-balance'
import { walletIds } from './app/wallet-ids'
import {generateQRCode} from './app/generate-qrcode'

const PORT = 3000

let btcWalletId: string

const app = express()

const currentDirectory = path.dirname(fileURLToPath(import.meta.url))

app.set('view engine', 'ejs')
app.set('views', path.join(currentDirectory, 'views'))
app.use(express.static(path.join(currentDirectory, 'views/public')))
app.use(bodyParser.json())

/// Views routes
app.get('/', (req: Request, res: Response) => {
  res.render('index')
})

// API routes
app.get('/get-balance', async (req: Request, res: Response) => {
  const balance = await getAccountBalance()
  res.json({ balance })
})

app.post('/create-invoice', async (req: Request, res: Response) => {
  const amount = req.body.amount

  const { paymentRequest } = await addInvoice({ amount, walletId: btcWalletId })

  res.json({ paymentRequest })
})

app.get('/get-qrcode', async (req: Request, res: Response) => {
  const paymentRequest = req.query.paymentRequest as string;

  try {
    const qrCodeDataUrl = await generateQRCode(paymentRequest);
    res.json({ qrCodeDataUrl });
  } catch (err) {
    console.error('Error generating QR Code:', err);
    res.status(500).send('Error generating QR Code');
  }
});


// Start server
const main = async () => {
  ; ({ btcWalletId } = await walletIds())

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}

main()

import { useState, useEffect } from 'react'
import currency from 'currency.js'
import Head from 'next/head'

export default function Home() {
  const [shares, setShares] = useState(1)
  const [price, setPrice] = useState(currency(1))
  const [earnings, setEarnings] = useState(currency(0))
  const [earningPercentage, setEarningPercentage] = useState(0)
  const [currentPrice, setCurrentPrice] = useState(null)

  useEffect(() => {
    fetch('/api/gme').then(async (res) => {
      const { c } = await res.json()
      setCurrentPrice(currency(c))
    })
  }, [])

  useEffect(() => {
    if (currentPrice) {
      setEarnings(
        currentPrice.multiply(shares).subtract(price.multiply(shares))
      )

      const currentTotalValue = currentPrice.value * shares
      const purchaseValue = price.value * shares

      setEarningPercentage(
        ((currentTotalValue - purchaseValue) / purchaseValue) * 100
      )
    }
  }, [currentPrice, shares, price.value])

  if (!currentPrice) {
    return <div className="min-h-screen min-w-screen bg-green-500"></div>
  }

  return (
    <div className="min-h-screen min-w-screen flex flex-col justify-center items-center bg-gradient-to-b from-green-700 to-green-900 text-green-300 space-y-8 tracking-widest leading-loose">
      <Head>
        <title>If I bought $GME...</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💸</text></svg>"
        />
        <meta property="og:image" content="https://ifiboughtg.me/og.png" />
      </Head>

      <div className="text-3xl lg:text-6xl flex justify-center items-center space-x-2">
        <p>If I bought</p>

        <span
          className="font-bold font-serif text-white"
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => setShares(e.target.innerText)}
        >
          1
        </span>

        <p>share{shares === '1' ? '' : 's'}</p>
      </div>

      <div className="text-3xl lg:text-6xl flex justify-center items-center space-x-2">
        <p>
          of{' '}
          <a
            className="font-serif font-bold hover:text-white transition duration-300 ease-in-out"
            href="https://finance.yahoo.com/quote/GME?p=GME&.tsrc=fin-srch"
            target="_blank"
            rel="noreferrer noopener"
          >
            $GME
          </a>{' '}
          at
        </p>

        <p className="font-bold font-serif text-white">
          $
          <span
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => setPrice(currency(e.target.innerText))}
          >
            1
          </span>
        </p>

        <p>per share</p>
      </div>

      <div className="text-3xl lg:text-6xl text-center lg:flex justify-center items-center space-x-2">
        <p>I would have earned</p>

        <p className="font-serif font-bold text-white">
          {earnings.format()}{' '}
          {earningPercentage !== Infinity && (
            <span
              className={`${
                earningPercentage < 0 ? 'text-red-300' : 'text-green-300'
              }`}
            >
              ({Math.floor(earningPercentage)}%)
            </span>
          )}
        </p>
      </div>

      <p className="uppercase font-bold text-xs pt-4">
        <a
          className="font-serif font-extrabold hover:text-white transition duration-300 ease-in-out"
          href="https://finance.yahoo.com/quote/GME?p=GME&.tsrc=fin-srch"
          target="_blank"
          rel="noreferrer noopener"
        >
          $GME
        </a>{' '}
        is currently trading at {currentPrice.format()}
      </p>

      <footer className="absolute bottom-0 p-4 font-bold hover:text-white transition duration-300 ease-in-out">
        <a
          href="https://anthonymorris.dev"
          target="_blank"
          rel="noreferrer noopener"
        >
          Made with 💸 in Vancouver
        </a>
      </footer>
    </div>
  )
}

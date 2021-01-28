export default async (req, res) => {
  const gmeQuote = await fetch(
    `https://finnhub.io/api/v1/quote?symbol=GME&token=${process.env.FINN_HUB_TOKEN}`
  ).then((res) => res.json())

  res.statusCode = 200
  res.json(gmeQuote)
}

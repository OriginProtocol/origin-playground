const offerFields = offer => ({
  value: offer.value,
  commission: offer.commission,
  refund: offer.refunt,
  currency: offer.currency,
  buyer: { id: offer.buyer },
  affiliate: { id: offer.affiliate },
  arbitrator: { id: offer.arbitrator },
  finalizes: offer.finalizes,
  status: offer.status
})

export default offerFields

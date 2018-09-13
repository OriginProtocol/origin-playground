import { withClientState } from 'apollo-link-state'
import gql from 'graphql-tag'
import { post } from 'utils/ipfsHash'

const stateLink = withClientState({
  cache,
  typeDefs: `
    type Transaction {
      id: String!
      status: String
      confirmations: Int
    }
    type Query {
      transactions: [Transaction]
      transaction(id: String!): Transaction
      activeWallet: String
    }
  `,
  resolvers: {
    Mutation: {
      createListing: async (_, { obj, transactionId, from }, { cache }) => {
        const contract = new web3.eth.Contract(
          Marketplace.abi,
          localStorage.marketplaceContract
        )
        const ipfsHash = await post('http://localhost:5002', obj.ipfs)
        // const from = web3.eth.defaultAccount // accounts[3]

        const query = gql`
          query AllTransactions {
            transactions @client {
              id
              status
              confirmations
            }
          }
        `

        const data = client.readQuery({ query })
        data.transactions.push({
          __typename: 'Transaction',
          id: transactionId,
          status: 'submitted',
          confirmations: 0
        })
        client.writeQuery({ query, data })

        return new Promise((resolve, reject) => {
          contract.methods
            .createListing(ipfsHash, obj.deposit, obj.arbitrator)
            .send({ gas: 4612388, from })
            .on('confirmation', confirmations => {
              const id = `Transaction:${transactionId}`
              const fragment = gql`
                fragment transactionConfirmations on Transaction {
                  confirmations
                  status
                }
              `
              const transaction = cache.readFragment({ fragment, id })
              const data = { ...transaction, confirmations, status: 'success' }
              client.writeFragment({ fragment, id, data })

              if (confirmations === 1) {
                resolve(null)
              }
            })
            .on('error', reject)
            .then(() => {
              // data.marketplace.allListings[listingIdx].status = 'pending'
              // client.writeQuery({ query, data })
            })
        })
      }
    }
  },
  defaults: {
    transactions: [],
    activeWallet: 'abc' //web3.eth.accounts.wallet[0].address
  }
})

client.onResetStore(stateLink.writeDefaults)

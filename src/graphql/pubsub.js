import { PubSub } from 'graphql-subscriptions'

const pubsub = new PubSub();
window.pubsub = pubsub
export default pubsub

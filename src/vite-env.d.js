// Describes metadata related to a provider according to EIP-6963.
/**
 * @typedef {Object} EIP6963ProviderInfo
 * @property {string} walletId
 * @property {string} uuid
 * @property {string} name
 * @property {string} icon
 */

// Represents the structure of an Ethereum provider based on the EIP-1193 standard.
/**
 * @typedef {Object} EIP1193Provider
 * @property {boolean} [isStatus]
 * @property {string} [host]
 * @property {string} [path]
 * @property {Function} [sendAsync]
 * @property {Function} [send]
 * @property {Function} request
 */

// Combines the provider's metadata with an actual provider object, creating a complete picture of a wallet provider at a glance.
/**
 * @typedef {Object} EIP6963ProviderDetail
 * @property {EIP6963ProviderInfo} info
 * @property {EIP1193Provider} provider
 */

// Represents the structure of an event dispatched by a wallet to announce its presence based on EIP-6963.
/**
 * @typedef {Object} EIP6963AnnounceProviderEvent
 * @property {Object} detail
 * @property {EIP6963ProviderInfo} detail.info
 * @property {EIP1193Provider} detail.provider
 */

// An error object with optional properties, commonly encountered when handling eth_requestAccounts errors.
/**
 * @typedef {Object} MMError
 * @property {string} [code]
 * @property {string} [message]
 */

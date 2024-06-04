// Extends WindowEventMap interface, including a custom event eip6963:announceProvider.
/**
 * @typedef {Object} CustomEvent
 * @property {Object} detail
 */

/**
 * @typedef {Object} EIP6963ProviderInfo
 * @property {string} walletId
 * @property {string} uuid
 * @property {string} name
 * @property {string} icon
 */

/**
 * @typedef {Object} EIP1193Provider
 * @property {boolean} [isStatus]
 * @property {string} [host]
 * @property {string} [path]
 * @property {Function} [sendAsync]
 * @property {Function} [send]
 * @property {Function} request
 */

/**
 * @typedef {Object} EIP6963ProviderDetail
 * @property {EIP6963ProviderInfo} info
 * @property {EIP1193Provider} provider
 */

/**
 * @typedef {Object} EIP6963AnnounceProviderEvent
 * @property {Object} detail
 * @property {EIP6963ProviderInfo} detail.info
 * @property {EIP1193Provider} detail.provider
 */

// Array that stores detected wallet providers and their details.
let providers = [];

// Object containing two methods. The store holds the state of detected Ethereum wallet providers.
// It's implemented as an external store, making it available for subscription and synchronization
// across the dapp.
export const store = {
  // Returns the current state of providers.
  value: () => providers,
  // Subscribes to provider announcements and updates the store accordingly.
  // Takes a callback function to be invoked on each store update, returning a function to
  // unsubscribe from the event.
  subscribe: (callback) => {
    function onAnnouncement(event) {
      if (providers.map((p) => p.info.uuid).includes(event.detail.info.uuid)) return;
      providers = [...providers, event.detail];
      callback();
    }
    window.addEventListener("eip6963:announceProvider", onAnnouncement);
    window.dispatchEvent(new Event("eip6963:requestProvider"));

    return () => window.removeEventListener("eip6963:announceProvider", onAnnouncement);
  },
};

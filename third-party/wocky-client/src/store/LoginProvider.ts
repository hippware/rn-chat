export interface ILoginProvider {
  providerName: string

  // Returns an object of JWT fields
  // This is actually a function iterator. How to declare in an interface?
  getLoginCredentials(): {}

  // Notifies the provider of logout
  // This is actually a function iterator. How to declare in an interface?
  onLogout()
}

// A simple registry of provider objects
const providers = {}

export function registerProvider(name: string, provider: ILoginProvider) {
  providers[name] = provider
}

export function getProvider(name: string): ILoginProvider {
  return providers[name]
}

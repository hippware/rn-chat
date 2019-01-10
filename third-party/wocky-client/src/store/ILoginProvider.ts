export interface ILoginProvider {
  providerName: string

  // Returns an object of JWT fields
  getLoginCredentials(): {}

  // Notifies the provider of logout
  onLogout()
}

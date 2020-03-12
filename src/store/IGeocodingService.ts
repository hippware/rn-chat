export interface IGeocodingService {
  reverse(location: {latitude: number; longitude: number}): Promise<any>
  details(placeId: string): Promise<any>
  query(text: string, location: {latitude: number; longitude: number}): Promise<any>
}

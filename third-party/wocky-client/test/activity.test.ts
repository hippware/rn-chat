import {createUser, dumpProfile} from './support/testuser'
import {ILocationSnapshot} from '../src/model/Location'
import {UserActivityType} from '../src/transport/types'
import {IWocky} from '../src'

let service: IWocky

const location: ILocationSnapshot = {
  latitude: 1,
  longitude: 2,
  accuracy: 3,
  activity: undefined,
  activityConfidence: undefined,
}

describe('Activity indicator tests', () => {
  beforeAll(async () => {
    jest.setTimeout(10000)
    service = await createUser()
    await dumpProfile(service)
  })

  // Just a convenience to reduce typing
  function injectActivity(activity: UserActivityType, activityConfidence = 100) {
    service!.profile!.setLocation({
      ...location,
      createdAt: new Date(),
      activity,
      activityConfidence,
    })
  }

  it('Test that high confidence values are used', async () => {
    const profile = service!.profile
    injectActivity('in_vehicle')
    expect(profile!.activity).toBe('in_vehicle')
    injectActivity('walking', 50)
    expect(profile!.activity).toBe('walking')
    injectActivity('in_vehicle')
    expect(profile!.activity).toBe('in_vehicle')
  })

  it('Test that low confidence values are ignored', async () => {
    const profile = service!.profile
    injectActivity('in_vehicle')
    expect(profile!.activity).toBe('in_vehicle')
    injectActivity('walking', 49)
    expect(profile!.activity).toBe('in_vehicle')
    injectActivity('in_vehicle')
    expect(profile!.activity).toBe('in_vehicle')
  })

  afterAll(async () => {
    await service.remove()
  })
})

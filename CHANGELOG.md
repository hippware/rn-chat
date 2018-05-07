# Change Log

Internal use only.

# iphone-2.6.2

* New 'currentUser' query (PR #40)
* Don't use amazon urls as file uri (PR #41, related: hippware/rn-chat#2225)
* New 'active bots' query (PR #42)
* Fix unit tests

# iphone-2.6.1

* Upgrade to latest nodejs and yarn (PR #35)
* Graphql connectivity test (PR #33)
* Simplify graphql login logic (because internal reconnect is disabled) (PR #34)
* Increase timeout to work with EDGE network (PR #36)
* Enable subscription disabled tests
* expose `resource` on wocky.transport (PR #39)

# iphone-2.6.0

* Make latest visitor always on the top (PR #29)
* Improve GraphQL connectivity (PR #31)
* Add getLocations (PR #32)
* Fix finished flag (hippware/rn-chat#2213) (PR #37)

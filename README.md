### Shop Acceptance tests
```javascript
$ npm install --registry http://npm.paypal.com
```

#### run Acceptance tests locally
```javascript
$ NODE_ENV=prod grunt acceptance
```

#### run Smoke test locally
smoke test runs all the cucumber tests tagged with @p1
```javascript
$ NODE_ENV=prod grunt smoke
```

#### run tests on sauce labs
Pass a `SAUCE` parameter with the browser name. `shopNemo` is configured to run test on sauce labs Firefox and Chrome browser, more browsers will be added soon.
```javascript
$ NODE_ENV=prod SAUCE=firefox grunt acceptance
```

#### run specific cucumber tags
e.g. below command will run two tests
```javascript
$ NODE_ENV=prod grunt acceptance --tags=@affiliate_details_tile,@affiliate_details_modal
```

#### debug tests
```javascript
$ NODE_ENV=prod DEBUG=nemo* grunt acceptance
```
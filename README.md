### Shop Acceptance tests
```javascript
1. npm install --registry http://npm.paypal.com
```

#### run tests locally
To run all the acceptance tests locally,
```javascript
$ NODE_ENV=qa grunt acceptance
```
#### run tests on sauce labs
Pass a `SAUCE` parameter with the browser name. `shopNemo` is configured to run test on sauce labs Firefox and Chrome browser.
To run all the acceptance tests on Sauce Labs,
```javascript
$ NODE_ENV=qa SAUCE=firefox grunt acceptance
```

#### to run particular tags
e.g. below command will run two tests
```javascript
$ NODE_ENV=qa grunt acceptance --tags=@affiliate_details_tile,@affiliate_details_modal
```
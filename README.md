# Import / Export

[![Build Status](https://travis-ci.com/dhis2/import-export-app.svg?branch=master)](https://travis-ci.com/dhis2/import-export-app)

Import / Export entities from DHIS2 system

## Documentation

_create-react-app_ was used to create this App. Latest docs can be found [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## E2E Testing

This app uses cypress to test the implementation.
As both the app and cypress need to know the backend's url,
it needs to be provided via an environment variable:
<b>The `DHIS2_HOME` env variable must match the `LOGIN_URL` variable in the
cypress.env.json file!**</b>

#### Fish
```bash
env DHIS2_HOME=/path/to/dhis2/config yarn cypress:open

# or
set -x DHIS2_HOME /path/to/dhis2/config
yarn cypress:open
```

#### Bash
```bash
DHIS2_HOME=/path/to/dhis2/config yarn cypress:open

# or
export DHIS2_HOME=/path/to/dhis2/config
yarn cypress:open
```

### Opening the GUI

The command to use the GUI is (still needs the env var, see above):

```bash
yarn cypress:open
```

### Running the CI command

To run the CI command is (still needs the env var, see above), use:

```bash
yarn cypress:run
```

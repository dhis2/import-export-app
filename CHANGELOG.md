## [101.1.6](https://github.com/dhis2/import-export-app/compare/v101.1.5...v101.1.6) (2024-06-09)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([f2e9e64](https://github.com/dhis2/import-export-app/commit/f2e9e64182e33a52d5db76537f6d05c5cf18941a))

## [101.1.5](https://github.com/dhis2/import-export-app/compare/v101.1.4...v101.1.5) (2024-06-03)


### Bug Fixes

* **DHIS2-16988:** download uncompressed json rather than open inline ([#2037](https://github.com/dhis2/import-export-app/issues/2037)) ([b7732b5](https://github.com/dhis2/import-export-app/commit/b7732b548cb941d05df12dc7a7989b0ff67f7846))

## [101.1.4](https://github.com/dhis2/import-export-app/compare/v101.1.3...v101.1.4) (2024-06-02)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([8d8ba83](https://github.com/dhis2/import-export-app/commit/8d8ba83703b31b0b87a79737e2429c19bfc37528))

## [101.1.3](https://github.com/dhis2/import-export-app/compare/v101.1.2...v101.1.3) (2024-05-26)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([2e6e9de](https://github.com/dhis2/import-export-app/commit/2e6e9de2c5998bec8bcbd26e5c9c1a40e25ba759))

## [101.1.2](https://github.com/dhis2/import-export-app/compare/v101.1.1...v101.1.2) (2024-05-19)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([2b20a03](https://github.com/dhis2/import-export-app/commit/2b20a03418b3b7a27c0440b718838cf4ad4e73bc))

## [101.1.1](https://github.com/dhis2/import-export-app/compare/v101.1.0...v101.1.1) (2024-04-25)


### Bug Fixes

* fix typeError that crashes app when job overview is clicked ([6f335fa](https://github.com/dhis2/import-export-app/commit/6f335faa9e959532bc1d942ae796b0870d8e6540))

# [101.1.0](https://github.com/dhis2/import-export-app/compare/v101.0.5...v101.1.0) (2024-04-25)


### Features

* update the query to filter programs by program type ([8f95800](https://github.com/dhis2/import-export-app/commit/8f95800f9bb356a451b23ab237cbd1873238b054))

## [101.0.5](https://github.com/dhis2/import-export-app/compare/v101.0.4...v101.0.5) (2024-04-21)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([232dbc7](https://github.com/dhis2/import-export-app/commit/232dbc71bb9977644813b6cfcde88707dd0d8c41))

## [101.0.4](https://github.com/dhis2/import-export-app/compare/v101.0.3...v101.0.4) (2024-04-05)


### Bug Fixes

* **geojson-import:** only run validator when the use geometry option is selected ([#2003](https://github.com/dhis2/import-export-app/issues/2003)) ([77b25f8](https://github.com/dhis2/import-export-app/commit/77b25f84b80f489da7220bd66ad54d3aae3c33c5))

## [101.0.3](https://github.com/dhis2/import-export-app/compare/v101.0.2...v101.0.3) (2024-03-11)


### Bug Fixes

* **tracker-api-migration:** fix 'created' value not displaying in the job summary ([35e7df7](https://github.com/dhis2/import-export-app/commit/35e7df72bcd979d7963e309dcc9b824de701fdb1))

## [101.0.2](https://github.com/dhis2/import-export-app/compare/v101.0.1...v101.0.2) (2024-03-10)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([9d597c9](https://github.com/dhis2/import-export-app/commit/9d597c940247c46929eb4bbb1b303c8d8a5f2ab9))

## [101.0.1](https://github.com/dhis2/import-export-app/compare/v101.0.0...v101.0.1) (2024-03-06)


### Bug Fixes

* **tracker-api-migration:** change separator for array from semicolon to comma ([9620d4d](https://github.com/dhis2/import-export-app/commit/9620d4d2a5f03d5761bfa7147435025cbe9d9e69))
* **tracker-api-migration:** remove skipPaging parameter ([47687ba](https://github.com/dhis2/import-export-app/commit/47687bab0aa8ae34df082ae2015d07f041ca10c5))
* **tracker-api-migration:** update the casing of followup parameter ([bef8c21](https://github.com/dhis2/import-export-app/commit/bef8c213b45a2c689133317e68abbbfcb6ab4eb5))

# [101.0.0](https://github.com/dhis2/import-export-app/compare/v100.0.2...v101.0.0) (2024-03-06)


### Features

* **DHIS2-16133:** migrate events and tracker entities to new tracker API ([#1951](https://github.com/dhis2/import-export-app/issues/1951)) ([da9fbad](https://github.com/dhis2/import-export-app/commit/da9fbadbbfdfa571a07ba4a8ad1fbede6d99544d))


### BREAKING CHANGES

* **DHIS2-16133:** migrate to new API for tracker import/export. This expects a format incompatible with previous versions. 

* fix: loader keeps showing when opening export in new page

we were assigning setting the state to an event in the new window.
That reference doesn't work one outside the React app in the new window,
so the loader never hides. Not sure if this pattern worked at some point,
but even if it did, it was propbably disabled as a security issue

* feat: migrate TEI and Event export to new tracker API

* feat: move Event import to new tracker endpoints

* feat: move TEI import to new tracker endpoints

* refactor: change TEI references to Tracked entity

* fix(migration-events): change start and endDate to occuuredBefore and occuredAfter

* fix(migration-trackedentity): change lastUpdateStartDate to updatedAfter

also change lastUpdateEndDate to updatedBefore, and lastUpdatedDuration to updatedWithin

* fix(migration-trackedentity): change programStateDate to enrollmentEnrolledAfter

and same for endDate to enrollmentEnrolledBefore

* fix(migration-trackedentity): change followupStatus to followup

and ensure that the parameter is not selected if ALL is chosen

* fix: lint issues

* fix: update tests snapshots

* refactor: apply code review comments

## [100.0.2](https://github.com/dhis2/import-export-app/compare/v100.0.1...v100.0.2) (2024-03-03)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([da9cd2f](https://github.com/dhis2/import-export-app/commit/da9cd2f7aa14028f640c06dc1d5e5c5b52b69721))

## [100.0.1](https://github.com/dhis2/import-export-app/compare/v100.0.0...v100.0.1) (2024-03-01)


### Bug Fixes

* remove merge mode from metadata import UI ([2862267](https://github.com/dhis2/import-export-app/commit/2862267815e86793c4ec7bd4d54e5463afef4b48))

# [100.0.0](https://github.com/dhis2/import-export-app/compare/v99.10.0...v100.0.0) (2024-02-28)


### Features

* force trigger a release ([1951397](https://github.com/dhis2/import-export-app/commit/19513979f1558c9ccbdf9ea3e2a06d0766136120))


### BREAKING CHANGES

* bump to v100 for continuous release

# [99.10.0](https://github.com/dhis2/import-export-app/compare/v99.9.10...v99.10.0) (2024-02-28)


### Features

* force trigger a release ([faea011](https://github.com/dhis2/import-export-app/commit/faea0117561976dd19f91f55dc9b7260962cfcbd))

## [99.9.10](https://github.com/dhis2/import-export-app/compare/v99.9.9...v99.9.10) (2024-02-28)


### Bug Fixes

* force trigger a release ([87f4003](https://github.com/dhis2/import-export-app/commit/87f400305f1a75c8bbe66d4018f84853ed390f8d))

## [1.6.1](https://github.com/dhis2/import-export-app/compare/v1.6.0...v1.6.1) (2024-02-28)


### Bug Fixes

* update github action to ensure yarn install is run before releasing ([e58a204](https://github.com/dhis2/import-export-app/commit/e58a204ee708094bb5006d182eaf10f7691c3482))

# [1.6.0](https://github.com/dhis2/import-export-app/compare/v1.5.69...v1.6.0) (2024-02-28)


### Features

* publish first version under continuous release ([39b58cb](https://github.com/dhis2/import-export-app/commit/39b58cb08e035adaadfbb302138b680491da22ac))

## [1.5.69](https://github.com/dhis2/import-export-app/compare/v1.5.68...v1.5.69) (2024-02-21)


### Bug Fixes

* update captions and options to reflect the menus below [DHIS2-12655] ([#1977](https://github.com/dhis2/import-export-app/issues/1977)) ([a12296d](https://github.com/dhis2/import-export-app/commit/a12296d2ace4cfcb6139e65ee9a2d4c9aa1456a2))

## [1.5.68](https://github.com/dhis2/import-export-app/compare/v1.5.67...v1.5.68) (2024-01-21)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([f14c9bc](https://github.com/dhis2/import-export-app/commit/f14c9bc5455ddf1e06f4464d11a83c8ba28768c0))

## [1.5.67](https://github.com/dhis2/import-export-app/compare/v1.5.66...v1.5.67) (2023-12-24)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([f6367f5](https://github.com/dhis2/import-export-app/commit/f6367f5d3714c8a67c47dc1d0455b6bfdee9d599))

## [1.5.66](https://github.com/dhis2/import-export-app/compare/v1.5.65...v1.5.66) (2023-12-15)


### Bug Fixes

* avoid breaking selects [DHIS2-16264] ([#1963](https://github.com/dhis2/import-export-app/issues/1963)) ([4300ef2](https://github.com/dhis2/import-export-app/commit/4300ef2e10809f072e59391f182df71bad8944d5))

## [1.5.65](https://github.com/dhis2/import-export-app/compare/v1.5.64...v1.5.65) (2023-11-26)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([a3c359a](https://github.com/dhis2/import-export-app/commit/a3c359a03e69a002d5cd8b281511a94b197ac816))

## [1.5.64](https://github.com/dhis2/import-export-app/compare/v1.5.63...v1.5.64) (2023-11-19)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([cac8a62](https://github.com/dhis2/import-export-app/commit/cac8a6212613c70683b8c9c36ff6a549d9173c79))

## [1.5.63](https://github.com/dhis2/import-export-app/compare/v1.5.62...v1.5.63) (2023-10-29)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([34e6bb6](https://github.com/dhis2/import-export-app/commit/34e6bb6d28fbbc7811415bec9407af6a787f8df4))

## [1.5.62](https://github.com/dhis2/import-export-app/compare/v1.5.61...v1.5.62) (2023-10-22)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([c436077](https://github.com/dhis2/import-export-app/commit/c436077fa8fe34756029e9aa8a18b0bfeb6f1c5e))

## [1.5.61](https://github.com/dhis2/import-export-app/compare/v1.5.60...v1.5.61) (2023-09-14)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([bab504a](https://github.com/dhis2/import-export-app/commit/bab504aa45e5f78013e69af253b8f48aed7f52a2))

## [1.5.60](https://github.com/dhis2/import-export-app/compare/v1.5.59...v1.5.60) (2023-08-02)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([2bd91a8](https://github.com/dhis2/import-export-app/commit/2bd91a81bb41d71cf04b0b1985abb8b7e3cbd355))

## [1.5.59](https://github.com/dhis2/import-export-app/compare/v1.5.58...v1.5.59) (2023-07-29)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([d294156](https://github.com/dhis2/import-export-app/commit/d2941560ac4d308f734276bfd8a1d4846b1560d7))

## [1.5.58](https://github.com/dhis2/import-export-app/compare/v1.5.57...v1.5.58) (2023-07-28)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([90dd607](https://github.com/dhis2/import-export-app/commit/90dd6074dae6b596eb1ef4267678b972f6bd1b63))

## [1.5.57](https://github.com/dhis2/import-export-app/compare/v1.5.56...v1.5.57) (2023-07-27)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([2dcdced](https://github.com/dhis2/import-export-app/commit/2dcdced1c66915bec2abfe36f9fe4df76421871c))

## [1.5.56](https://github.com/dhis2/import-export-app/compare/v1.5.55...v1.5.56) (2023-07-26)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([0b04e6a](https://github.com/dhis2/import-export-app/commit/0b04e6aea68f0a0ad7b4e0d6b821a2adea5e3908))

## [1.5.55](https://github.com/dhis2/import-export-app/compare/v1.5.54...v1.5.55) (2023-07-25)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([d78b31d](https://github.com/dhis2/import-export-app/commit/d78b31d5104fd55f1a659bdddf658c7403da1a75))

## [1.5.54](https://github.com/dhis2/import-export-app/compare/v1.5.53...v1.5.54) (2023-07-21)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([7abf81a](https://github.com/dhis2/import-export-app/commit/7abf81aab9b89b32bd4503fc40396f79249da7ee))

## [1.5.53](https://github.com/dhis2/import-export-app/compare/v1.5.52...v1.5.53) (2023-07-20)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([b3cdb25](https://github.com/dhis2/import-export-app/commit/b3cdb258f2b75f35fabae99404051d0ecfc75b25))

## [1.5.52](https://github.com/dhis2/import-export-app/compare/v1.5.51...v1.5.52) (2023-07-19)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([2c5c4a5](https://github.com/dhis2/import-export-app/commit/2c5c4a523bf862b628660e4ff1b4bd38355e3f8a))

## [1.5.51](https://github.com/dhis2/import-export-app/compare/v1.5.50...v1.5.51) (2023-07-18)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([adf3a61](https://github.com/dhis2/import-export-app/commit/adf3a6109fee33ba6fb041483ea0a52b6677056a))

## [1.5.50](https://github.com/dhis2/import-export-app/compare/v1.5.49...v1.5.50) (2023-07-17)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([35eee9e](https://github.com/dhis2/import-export-app/commit/35eee9e0669e2aefaefe6ed647580efd2fec2d2d))

## [1.5.49](https://github.com/dhis2/import-export-app/compare/v1.5.48...v1.5.49) (2023-07-15)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([f8d12a3](https://github.com/dhis2/import-export-app/commit/f8d12a33b9cf85c55f28a12a9e54fb097a63ac58))

## [1.5.48](https://github.com/dhis2/import-export-app/compare/v1.5.47...v1.5.48) (2023-07-14)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([141c53b](https://github.com/dhis2/import-export-app/commit/141c53ba19853830a29e3a94f60370925d60cf0a))

## [1.5.47](https://github.com/dhis2/import-export-app/compare/v1.5.46...v1.5.47) (2023-07-13)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([3527787](https://github.com/dhis2/import-export-app/commit/3527787cc5a4c6b8c3a0808bc5a3fbd63dec36a7))

## [1.5.46](https://github.com/dhis2/import-export-app/compare/v1.5.45...v1.5.46) (2023-07-12)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([3888477](https://github.com/dhis2/import-export-app/commit/388847772f576bf6c904b1920d59edba5087a23e))

## [1.5.45](https://github.com/dhis2/import-export-app/compare/v1.5.44...v1.5.45) (2023-07-11)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([473eb15](https://github.com/dhis2/import-export-app/commit/473eb153b92c3448d41ecbe21178e06a0d7f9f3b))

## [1.5.44](https://github.com/dhis2/import-export-app/compare/v1.5.43...v1.5.44) (2023-07-09)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([ef7072e](https://github.com/dhis2/import-export-app/commit/ef7072e3c77e5d61eba194f2f54c47d0dd0d44f8))

## [1.5.43](https://github.com/dhis2/import-export-app/compare/v1.5.42...v1.5.43) (2023-07-06)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([ea2bd99](https://github.com/dhis2/import-export-app/commit/ea2bd9971d80399d7c96e90eb5d3fd374d836627))

## [1.5.42](https://github.com/dhis2/import-export-app/compare/v1.5.41...v1.5.42) (2023-07-04)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([97542b8](https://github.com/dhis2/import-export-app/commit/97542b89b3d2abab54acd54e47428f879451fc26))

## [1.5.41](https://github.com/dhis2/import-export-app/compare/v1.5.40...v1.5.41) (2023-06-30)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([3f1fa9a](https://github.com/dhis2/import-export-app/commit/3f1fa9a98c9d1b9142bee2e6be7ff385f2f07bf0))

## [1.5.40](https://github.com/dhis2/import-export-app/compare/v1.5.39...v1.5.40) (2023-06-29)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([5df0fb7](https://github.com/dhis2/import-export-app/commit/5df0fb7179f55313c00759fbcae0ef770b3df965))

## [1.5.39](https://github.com/dhis2/import-export-app/compare/v1.5.38...v1.5.39) (2023-06-28)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([93d8827](https://github.com/dhis2/import-export-app/commit/93d8827a2b1590482e71cd58371c276a54b1a25b))

## [1.5.38](https://github.com/dhis2/import-export-app/compare/v1.5.37...v1.5.38) (2023-06-24)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([17175cb](https://github.com/dhis2/import-export-app/commit/17175cb9e3dd974c8418d6f267f277409a4e03f7))

## [1.5.37](https://github.com/dhis2/import-export-app/compare/v1.5.36...v1.5.37) (2023-06-22)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([904ebc3](https://github.com/dhis2/import-export-app/commit/904ebc3b23335fbbddc36ad02f53500eb1e84318))

## [1.5.36](https://github.com/dhis2/import-export-app/compare/v1.5.35...v1.5.36) (2023-06-21)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([2a27ccd](https://github.com/dhis2/import-export-app/commit/2a27ccdd4ad47e4500a7b6daf535403d357d3218))

## [1.5.35](https://github.com/dhis2/import-export-app/compare/v1.5.34...v1.5.35) (2023-06-20)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([037571e](https://github.com/dhis2/import-export-app/commit/037571e2eb415dcea2d4a34a48180a52ed23c5fc))

## [1.5.34](https://github.com/dhis2/import-export-app/compare/v1.5.33...v1.5.34) (2023-06-19)


### Bug Fixes

* use string for date inputs [DHIS2-12489] ([#1750](https://github.com/dhis2/import-export-app/issues/1750)) ([2c1d98b](https://github.com/dhis2/import-export-app/commit/2c1d98bbf82081be0aa3cd0dcf94d1b3596a136a))

## [1.5.33](https://github.com/dhis2/import-export-app/compare/v1.5.32...v1.5.33) (2023-06-17)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([7905cd1](https://github.com/dhis2/import-export-app/commit/7905cd15c100c41ccbcb9fda7351420c7d51550d))

## [1.5.32](https://github.com/dhis2/import-export-app/compare/v1.5.31...v1.5.32) (2023-06-16)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([39851eb](https://github.com/dhis2/import-export-app/commit/39851eb6a12fbc2031f1650b100d92043b483199))

## [1.5.31](https://github.com/dhis2/import-export-app/compare/v1.5.30...v1.5.31) (2023-06-15)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([4d59024](https://github.com/dhis2/import-export-app/commit/4d59024acda935731e4446a4ac3d6586c891186f))

## [1.5.30](https://github.com/dhis2/import-export-app/compare/v1.5.29...v1.5.30) (2023-06-13)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([4ff3cab](https://github.com/dhis2/import-export-app/commit/4ff3cab1bbee284421d21c43bb33cd585f292b0b))

## [1.5.29](https://github.com/dhis2/import-export-app/compare/v1.5.28...v1.5.29) (2023-06-05)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([e2c2f5b](https://github.com/dhis2/import-export-app/commit/e2c2f5ba73d21a827a9c9ab29405fba8c406cce9))

## [1.5.28](https://github.com/dhis2/import-export-app/compare/v1.5.27...v1.5.28) (2023-06-02)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([752ae6b](https://github.com/dhis2/import-export-app/commit/752ae6b74e4f5266eafc5bc530aab0df1e6de205))

## [1.5.27](https://github.com/dhis2/import-export-app/compare/v1.5.26...v1.5.27) (2023-05-30)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([e5a6563](https://github.com/dhis2/import-export-app/commit/e5a656398e3734bca4cc2980aa966237f1ca17c2))

## [1.5.26](https://github.com/dhis2/import-export-app/compare/v1.5.25...v1.5.26) (2023-05-28)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([6bad3f1](https://github.com/dhis2/import-export-app/commit/6bad3f1cf5569cb9030031131d99dcf0bfb5bbed))

## [1.5.25](https://github.com/dhis2/import-export-app/compare/v1.5.24...v1.5.25) (2023-05-27)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([831e92f](https://github.com/dhis2/import-export-app/commit/831e92f44b05bf2a97b2863ca0eede328a8a720c))

## [1.5.24](https://github.com/dhis2/import-export-app/compare/v1.5.23...v1.5.24) (2023-05-26)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([2f9b1a3](https://github.com/dhis2/import-export-app/commit/2f9b1a3754d22fedf42e7bcdcee76608a1141b51))

## [1.5.23](https://github.com/dhis2/import-export-app/compare/v1.5.22...v1.5.23) (2023-05-23)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([7d0644e](https://github.com/dhis2/import-export-app/commit/7d0644ecdf23522e0c8ae789f11cdc4b32000723))

## [1.5.22](https://github.com/dhis2/import-export-app/compare/v1.5.21...v1.5.22) (2023-04-19)


### Bug Fixes

* padding fixes for Earth Engine import ([#1544](https://github.com/dhis2/import-export-app/issues/1544)) ([36ce867](https://github.com/dhis2/import-export-app/commit/36ce8671593a52bc6a97159a9ef26b23b5c356aa))

## [1.5.21](https://github.com/dhis2/import-export-app/compare/v1.5.20...v1.5.21) (2023-04-14)


### Bug Fixes

* use same dataset for total population ([#1683](https://github.com/dhis2/import-export-app/issues/1683)) ([aeb2e5b](https://github.com/dhis2/import-export-app/commit/aeb2e5b94e77f24835b6be5715ab78fb8cd57a03))

## [1.5.20](https://github.com/dhis2/import-export-app/compare/v1.5.19...v1.5.20) (2023-03-06)


### Bug Fixes

* label text [DHIS2-11265] ([#1677](https://github.com/dhis2/import-export-app/issues/1677)) ([444d99b](https://github.com/dhis2/import-export-app/commit/444d99bf94827aa6d8d5d52e39ec10e3f8d4e792))

## [1.5.19](https://github.com/dhis2/import-export-app/compare/v1.5.18...v1.5.19) (2023-02-08)


### Bug Fixes

* use correct update strategy for metadata import [DHIS-12479] ([d620949](https://github.com/dhis2/import-export-app/commit/d6209494bc7f40a718d0964fc3a5d6fa74981ad9))

## [1.5.18](https://github.com/dhis2/import-export-app/compare/v1.5.17...v1.5.18) (2023-01-10)


### Bug Fixes

* adjust advanced options control ([3a91a7c](https://github.com/dhis2/import-export-app/commit/3a91a7c74cdf0f36b90b1171e871ade06bb863e7))
* adjust job overview and summary design ([fa7dd12](https://github.com/dhis2/import-export-app/commit/fa7dd120e5031141ca512f815fe58d0e3f013aca))
* adjust org unit tree component ([b36292e](https://github.com/dhis2/import-export-app/commit/b36292e3b91ca865d624b9a081816ff4916d74a3))
* adjust overview card design and interaction ([4ad0e09](https://github.com/dhis2/import-export-app/commit/4ad0e0937533ddb910da134cf21df6fed76a01a3))
* adjust page appearance, add transparent prop ([39793a7](https://github.com/dhis2/import-export-app/commit/39793a772b32d912e5d228fa7bc4a242a132acb9))
* adjust radio prefix ([05fc24c](https://github.com/dhis2/import-export-app/commit/05fc24c7551d8c27150dde63117ff57173c88393))
* adjust schemas layout, typography ([69101f7](https://github.com/dhis2/import-export-app/commit/69101f7406ec05ac3be72a95ef88e279a19d8d58))
* adjust sidebar style ([4fa5948](https://github.com/dhis2/import-export-app/commit/4fa5948f1fce50a267aebe9713eccefd4d4c7585))
* standardize typography ([a27d92e](https://github.com/dhis2/import-export-app/commit/a27d92e09f067f40d65e2c2a981183c8b7485d16))

## [1.5.17](https://github.com/dhis2/import-export-app/compare/v1.5.16...v1.5.17) (2022-12-01)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([90192ef](https://github.com/dhis2/import-export-app/commit/90192efd717aa3d7e65dbf341b0892c50d103161))

## [1.5.16](https://github.com/dhis2/import-export-app/compare/v1.5.15...v1.5.16) (2022-11-30)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([0929f4d](https://github.com/dhis2/import-export-app/commit/0929f4d0995fdf915e5999753f5457c07510efee))

## [1.5.15](https://github.com/dhis2/import-export-app/compare/v1.5.14...v1.5.15) (2022-11-25)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([2f9a4b7](https://github.com/dhis2/import-export-app/commit/2f9a4b782fe35948b21ea9753cf1e9d4635b85b9))

## [1.5.14](https://github.com/dhis2/import-export-app/compare/v1.5.13...v1.5.14) (2022-11-16)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([853bbb8](https://github.com/dhis2/import-export-app/commit/853bbb824a28d2a658e17f2cd44e22aa31b8d771))

## [1.5.13](https://github.com/dhis2/import-export-app/compare/v1.5.12...v1.5.13) (2022-11-05)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([39b29bc](https://github.com/dhis2/import-export-app/commit/39b29bc0ae6f14da99a66c81d7dd565408055844))

## [1.5.12](https://github.com/dhis2/import-export-app/compare/v1.5.11...v1.5.12) (2022-10-26)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([0441874](https://github.com/dhis2/import-export-app/commit/04418747412361e837b175cb8000c35fa0a0593a))

## [1.5.11](https://github.com/dhis2/import-export-app/compare/v1.5.10...v1.5.11) (2022-10-22)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([19660f0](https://github.com/dhis2/import-export-app/commit/19660f08f5b976eb7fe2825c500efcfefcd13c88))

## [1.5.10](https://github.com/dhis2/import-export-app/compare/v1.5.9...v1.5.10) (2022-10-21)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([a770f5b](https://github.com/dhis2/import-export-app/commit/a770f5b2b2caab3e2b6a5de43610f5c6e38b8074))

## [1.5.9](https://github.com/dhis2/import-export-app/compare/v1.5.8...v1.5.9) (2022-10-20)


### Bug Fixes

* don't show list when empty ([#1551](https://github.com/dhis2/import-export-app/issues/1551)) ([b739049](https://github.com/dhis2/import-export-app/commit/b7390497758114e5901c2cbf403d5fd8f8441f56))

## [1.5.8](https://github.com/dhis2/import-export-app/compare/v1.5.7...v1.5.8) (2022-10-20)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([1db882d](https://github.com/dhis2/import-export-app/commit/1db882dc21b97559beda6f5e0a33f1899ebc95bb))

## [1.5.7](https://github.com/dhis2/import-export-app/compare/v1.5.6...v1.5.7) (2022-10-19)


### Reverts

* "fix: address issue via workaround" ([9728104](https://github.com/dhis2/import-export-app/commit/9728104f8a15f495cd9fe5637cb40eea19a32d3d))

## [1.5.6](https://github.com/dhis2/import-export-app/compare/v1.5.5...v1.5.6) (2022-10-18)


### Bug Fixes

* **tei-export:** use correct param name for teiTypeFilter ([#1546](https://github.com/dhis2/import-export-app/issues/1546)) ([fedd637](https://github.com/dhis2/import-export-app/commit/fedd63775f288f40755475505a2cc0f69ef60364))

## [1.5.5](https://github.com/dhis2/import-export-app/compare/v1.5.4...v1.5.5) (2022-10-14)


### Bug Fixes

* keep the scroll from happening on preview table unnecessarily ([#1539](https://github.com/dhis2/import-export-app/issues/1539)) ([56e9085](https://github.com/dhis2/import-export-app/commit/56e90857f9933e608308cd362f337084c9d13fbf))

## [1.5.4](https://github.com/dhis2/import-export-app/compare/v1.5.3...v1.5.4) (2022-10-14)


### Bug Fixes

* add earth engine card to home page ([#1541](https://github.com/dhis2/import-export-app/issues/1541)) ([12a6b18](https://github.com/dhis2/import-export-app/commit/12a6b180a2818ed8e75610da7d858904ef3c1c70))

## [1.5.3](https://github.com/dhis2/import-export-app/compare/v1.5.2...v1.5.3) (2022-10-11)


### Bug Fixes

* add tooltip and disabled Period component when no EE has been selected ([#1500](https://github.com/dhis2/import-export-app/issues/1500)) ([7313280](https://github.com/dhis2/import-export-app/commit/7313280de66d2ce74455097d5ae934e38e97923d))
* adjust margins and add divider for Data preview section ([#1510](https://github.com/dhis2/import-export-app/issues/1510)) ([8716bf9](https://github.com/dhis2/import-export-app/commit/8716bf9640f4458c0c2cdd6f166951f8d4c0ca28))
* adjust spacing so Job summary header and tags look better ([#1509](https://github.com/dhis2/import-export-app/issues/1509)) ([c24763e](https://github.com/dhis2/import-export-app/commit/c24763e1f91ff955bb5aab9d5d7f6012c98bad27))
* dataElementGroup no longer needed to fetch current data values ([#1503](https://github.com/dhis2/import-export-app/issues/1503)) ([9a9602f](https://github.com/dhis2/import-export-app/commit/9a9602fae09c4a02e46508b8d964ceec4b2b4522))
* display ou parent name in preview with grey color ([#1507](https://github.com/dhis2/import-export-app/issues/1507)) ([d711133](https://github.com/dhis2/import-export-app/commit/d711133d53333ff35316ee11f5133d0cb3777cf2))
* earth engine import - pre-fill cocs for ee bands if coc code matches band name ([#1501](https://github.com/dhis2/import-export-app/issues/1501)) ([22470ee](https://github.com/dhis2/import-export-app/commit/22470eea9a7b1903b467d93d455fae278949b577))
* earth engine import string fixes ([#1499](https://github.com/dhis2/import-export-app/issues/1499)) ([c91d434](https://github.com/dhis2/import-export-app/commit/c91d434bbe95e2e11944ee6ed1f1916411ca3ba0))
* ee import - refactor to make sure all useEffect dependencies are listed ([#1506](https://github.com/dhis2/import-export-app/issues/1506)) ([e14ff2f](https://github.com/dhis2/import-export-app/commit/e14ff2f0eba6115be1fdf99a918cf18a078fdfcc))
* page number needs to be reset to 1 when new preview generated ([#1508](https://github.com/dhis2/import-export-app/issues/1508)) ([295de97](https://github.com/dhis2/import-export-app/commit/295de97db42196d8ff13edffa2d01a5b7035f973))
* preserve users preferred rows per page for data preview ([#1504](https://github.com/dhis2/import-export-app/issues/1504)) ([742889a](https://github.com/dhis2/import-export-app/commit/742889ac0476c3092717bc6df001de27d46ef406))
* use convention for page summary text ([#1502](https://github.com/dhis2/import-export-app/issues/1502)) ([34e40d5](https://github.com/dhis2/import-export-app/commit/34e40d581ac6f1314e48f29e119ef389d31750a2))

## [1.5.2](https://github.com/dhis2/import-export-app/compare/v1.5.1...v1.5.2) (2022-10-08)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([a621450](https://github.com/dhis2/import-export-app/commit/a621450611b0db144fa3ea34f6922bf486f47c9c))

## [1.5.1](https://github.com/dhis2/import-export-app/compare/v1.5.0...v1.5.1) (2022-10-07)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([75b1d3f](https://github.com/dhis2/import-export-app/commit/75b1d3fa9990059856bad7e31f45585ba74c145a))

# [1.5.0](https://github.com/dhis2/import-export-app/compare/v1.4.8...v1.5.0) (2022-10-06)


### Bug Fixes

* **metadata dependency export:** remove "xml" from intro text ([6c11144](https://github.com/dhis2/import-export-app/commit/6c11144cdf84282428f3fafeb2ec2cdd0cd03244))


### Features

* **metadata export:** remove csv option and adjust intro text ([f8d05e6](https://github.com/dhis2/import-export-app/commit/f8d05e69471ed46d0f14c659c9d4cd64fd3e6de7))

## [1.4.8](https://github.com/dhis2/import-export-app/compare/v1.4.7...v1.4.8) (2022-10-04)


### Bug Fixes

* patch webpack to support webworker importScripts with relative publicPath ([#1516](https://github.com/dhis2/import-export-app/issues/1516)) ([eedaa20](https://github.com/dhis2/import-export-app/commit/eedaa201e6347240aa5827df82aef8a21d0ad831))

## [1.4.7](https://github.com/dhis2/import-export-app/compare/v1.4.6...v1.4.7) (2022-09-15)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([e2d2cbc](https://github.com/dhis2/import-export-app/commit/e2d2cbc3d04bb7fe3d683f1c462d94bccb3a4b75))

## [1.4.6](https://github.com/dhis2/import-export-app/compare/v1.4.5...v1.4.6) (2022-09-14)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([e3fc929](https://github.com/dhis2/import-export-app/commit/e3fc929fdafa6f364abc63cb4cf6bc755d49ad1d))

## [1.4.5](https://github.com/dhis2/import-export-app/compare/v1.4.4...v1.4.5) (2022-09-13)


### Bug Fixes

* geojson property name should match input field ([533b534](https://github.com/dhis2/import-export-app/commit/533b534910f7a7c50bdb5edcc0816b1e25c5b210))

## [1.4.4](https://github.com/dhis2/import-export-app/compare/v1.4.3...v1.4.4) (2022-09-13)


### Bug Fixes

* avoid app crash when GeoJSON file is invalid ([af09883](https://github.com/dhis2/import-export-app/commit/af09883efbaf0d3304c12fbb1ace4bba4a566e94))

## [1.4.3](https://github.com/dhis2/import-export-app/compare/v1.4.2...v1.4.3) (2022-09-09)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([64412f9](https://github.com/dhis2/import-export-app/commit/64412f900eaebf2e910097da0365cdc9bf173613))

## [1.4.2](https://github.com/dhis2/import-export-app/compare/v1.4.1...v1.4.2) (2022-09-08)


### Bug Fixes

* **metadata:** use correct format names on metadata pages ([c52ece8](https://github.com/dhis2/import-export-app/commit/c52ece8d9c5407255484e81d909bbbd663d443ba))

## [1.4.1](https://github.com/dhis2/import-export-app/compare/v1.4.0...v1.4.1) (2022-09-08)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([6d8f2c0](https://github.com/dhis2/import-export-app/commit/6d8f2c055dff3c4003c2821f92ec3448c8e39660))

# [1.4.0](https://github.com/dhis2/import-export-app/compare/v1.3.7...v1.4.0) (2022-09-07)


### Features

* import Earth Engine data for population ([#1457](https://github.com/dhis2/import-export-app/issues/1457)) ([3cbd173](https://github.com/dhis2/import-export-app/commit/3cbd173185681215701bb45d5239471b39bfda6c))

## [1.3.7](https://github.com/dhis2/import-export-app/compare/v1.3.6...v1.3.7) (2022-09-06)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([4fccf72](https://github.com/dhis2/import-export-app/commit/4fccf72f3598a1a6a780890d0af90e5f084bc0ad))

## [1.3.6](https://github.com/dhis2/import-export-app/compare/v1.3.5...v1.3.6) (2022-08-27)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([d89b3cd](https://github.com/dhis2/import-export-app/commit/d89b3cd10fea02ace60d00732f8eeebf08b02f94))

## [1.3.5](https://github.com/dhis2/import-export-app/compare/v1.3.4...v1.3.5) (2022-08-25)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([867b75a](https://github.com/dhis2/import-export-app/commit/867b75aa0692c135194a5ab26cbfc5d4f3cd6683))

## [1.3.4](https://github.com/dhis2/import-export-app/compare/v1.3.3...v1.3.4) (2022-06-30)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([80a8116](https://github.com/dhis2/import-export-app/commit/80a8116dbe55397a4a9cfad24cd325cfad7ffcc4))

## [1.3.3](https://github.com/dhis2/import-export-app/compare/v1.3.2...v1.3.3) (2022-06-28)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([eda0f18](https://github.com/dhis2/import-export-app/commit/eda0f18a8ecf1104f8ddcd17f0411c4a2d00b600))

## [1.3.2](https://github.com/dhis2/import-export-app/compare/v1.3.1...v1.3.2) (2022-06-23)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([55e0a0c](https://github.com/dhis2/import-export-app/commit/55e0a0cf7029db3df920fbeb690a5be4c672dab2))

## [1.3.1](https://github.com/dhis2/import-export-app/compare/v1.3.0...v1.3.1) (2022-06-22)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([ba2c0c6](https://github.com/dhis2/import-export-app/commit/ba2c0c6a8639a4a15157f982ac8ffbca4e83793a))

# [1.3.0](https://github.com/dhis2/import-export-app/compare/v1.2.23...v1.3.0) (2022-06-21)


### Bug Fixes

* async import ([52f1936](https://github.com/dhis2/import-export-app/commit/52f193602c20ec6b04bffb029bd451c6619cd4ac))
* component class name ([e5abe36](https://github.com/dhis2/import-export-app/commit/e5abe36cc6e0b8f29d456771eac6a1ef146b1a42))
* hide and show associated geometry attribute select ([3b36943](https://github.com/dhis2/import-export-app/commit/3b36943d7458d5b6fca6401257865148c70de561))


### Features

* geojson attribute picker ([6158786](https://github.com/dhis2/import-export-app/commit/615878694ba3f6abee95a409adcbfbef6ede3787))
* geojson import icon ([1c65de5](https://github.com/dhis2/import-export-app/commit/1c65de525697f5a711db8a41f65fcacbf7eebf45))
* geojson import job summary ([e761818](https://github.com/dhis2/import-export-app/commit/e7618180dd7ab45cbc47931f7203c5c114b3325f))
* geojson import page setup ([3320632](https://github.com/dhis2/import-export-app/commit/3320632b5942a799322bfc29162e4010e2ee6a62))
* geojson property match ([81c4e80](https://github.com/dhis2/import-export-app/commit/81c4e8086f7e1ce9fea658284ed2e9223e02b220))
* org unit core id scheme select ([534451d](https://github.com/dhis2/import-export-app/commit/534451ddc5b7abe42470891e7b4ad55de0b1ce65))

## [1.2.23](https://github.com/dhis2/import-export-app/compare/v1.2.22...v1.2.23) (2022-06-09)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([7ce548e](https://github.com/dhis2/import-export-app/commit/7ce548eb03ec76a0d9b94e41950b8c39c76657e2))

## [1.2.22](https://github.com/dhis2/import-export-app/compare/v1.2.21...v1.2.22) (2022-06-01)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([8bc37b0](https://github.com/dhis2/import-export-app/commit/8bc37b01e5be631bf7b58ba52f482576264f62cc))

## [1.2.21](https://github.com/dhis2/import-export-app/compare/v1.2.20...v1.2.21) (2022-05-27)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([33db927](https://github.com/dhis2/import-export-app/commit/33db9274e203be920e0659c42da91c138d101636))

## [1.2.20](https://github.com/dhis2/import-export-app/compare/v1.2.19...v1.2.20) (2022-05-26)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([43e994e](https://github.com/dhis2/import-export-app/commit/43e994e4f32a9667870f272d4d556c2d1d8f0206))

## [1.2.19](https://github.com/dhis2/import-export-app/compare/v1.2.18...v1.2.19) (2022-05-24)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([0641b58](https://github.com/dhis2/import-export-app/commit/0641b58d497e91f9cdc1b0a71af1de66b40ea80b))

## [1.2.18](https://github.com/dhis2/import-export-app/compare/v1.2.17...v1.2.18) (2022-05-19)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([c0a17c1](https://github.com/dhis2/import-export-app/commit/c0a17c140e7b7eef5758ee3002bfb9289a5e983e))

## [1.2.17](https://github.com/dhis2/import-export-app/compare/v1.2.16...v1.2.17) (2022-05-13)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([455c265](https://github.com/dhis2/import-export-app/commit/455c2651f25973a480bd233ad2cf81c45195e321))

## [1.2.16](https://github.com/dhis2/import-export-app/compare/v1.2.15...v1.2.16) (2022-04-23)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([2263127](https://github.com/dhis2/import-export-app/commit/22631270206b30b0ec943d27c79d2910a426333e))

## [1.2.15](https://github.com/dhis2/import-export-app/compare/v1.2.14...v1.2.15) (2022-03-26)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([111c46e](https://github.com/dhis2/import-export-app/commit/111c46ec641c93fe352fa04e119b28181811b579))

## [1.2.14](https://github.com/dhis2/import-export-app/compare/v1.2.13...v1.2.14) (2022-03-18)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([5309091](https://github.com/dhis2/import-export-app/commit/53090911527208a2893165ea85a7d49793f6c761))

## [1.2.13](https://github.com/dhis2/import-export-app/compare/v1.2.12...v1.2.13) (2022-03-15)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([8d89408](https://github.com/dhis2/import-export-app/commit/8d8940836c009f4501fd7396f0398bff67d19689))

## [1.2.12](https://github.com/dhis2/import-export-app/compare/v1.2.11...v1.2.12) (2022-03-14)


### Bug Fixes

* update descent orgUnit message [DHIS2-11265] ([ef370d6](https://github.com/dhis2/import-export-app/commit/ef370d6a291a0e0b21cf0ad9b9397e324967a82d))

## [1.2.11](https://github.com/dhis2/import-export-app/compare/v1.2.10...v1.2.11) (2022-03-06)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([1fca847](https://github.com/dhis2/import-export-app/commit/1fca847bf270ae078dcd9d0a7df6b11f648c4128))

## [1.2.10](https://github.com/dhis2/import-export-app/compare/v1.2.9...v1.2.10) (2022-02-15)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([67a2373](https://github.com/dhis2/import-export-app/commit/67a2373c2363275edc836aebdd03976980542376))

## [1.2.9](https://github.com/dhis2/import-export-app/compare/v1.2.8...v1.2.9) (2022-01-28)


### Bug Fixes

* add adx to data export options ([f35806e](https://github.com/dhis2/import-export-app/commit/f35806ef64393c6f449cd252b3d830b65c3daae9))

## [1.2.8](https://github.com/dhis2/import-export-app/compare/v1.2.7...v1.2.8) (2021-12-13)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([f652639](https://github.com/dhis2/import-export-app/commit/f652639c8306b97a77a55dec8bd24274203fbe9f))

## [1.2.7](https://github.com/dhis2/import-export-app/compare/v1.2.6...v1.2.7) (2021-12-10)


### Bug Fixes

* **schemas component:** use "useEffect" instead of "onComplete" ([a554260](https://github.com/dhis2/import-export-app/commit/a5542603b705e6dd0e3b27293db6bafb2e0d711a))

## [1.2.6](https://github.com/dhis2/import-export-app/compare/v1.2.5...v1.2.6) (2021-09-23)


### Bug Fixes

* **deps:** add @dhis2/prop-types as direct dependency ([2e8035d](https://github.com/dhis2/import-export-app/commit/2e8035db8df0d9990c2adf122d0c5dc8b64c9ff8))

## [1.2.5](https://github.com/dhis2/import-export-app/compare/v1.2.4...v1.2.5) (2021-08-31)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([0d1f040](https://github.com/dhis2/import-export-app/commit/0d1f040368e0579e13cc8a1a84a646c886921da2))

## [1.2.4](https://github.com/dhis2/import-export-app/compare/v1.2.3...v1.2.4) (2021-08-17)


### Bug Fixes

* apply text wrapping to navigation bar items ([a728ef3](https://github.com/dhis2/import-export-app/commit/a728ef369fe745146778e446812f96e9b8d4f8dc))

## [1.2.3](https://github.com/dhis2/import-export-app/compare/v1.2.2...v1.2.3) (2021-08-17)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([311f993](https://github.com/dhis2/import-export-app/commit/311f993a83ebd4ba8d35363e362feb95230ad5fe))

## [1.2.2](https://github.com/dhis2/import-export-app/compare/v1.2.1...v1.2.2) (2021-08-16)


### Bug Fixes

* ensure locales are imported before components ([8bcb3fb](https://github.com/dhis2/import-export-app/commit/8bcb3fb276ad83e669f913cab1e854c715c4083d))

## [1.2.1](https://github.com/dhis2/import-export-app/compare/v1.2.0...v1.2.1) (2021-08-12)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([ba1fee1](https://github.com/dhis2/import-export-app/commit/ba1fee189a321ca7bf1dfb2096285a5dc8dd7589))

# [1.2.0](https://github.com/dhis2/import-export-app/compare/v1.1.3...v1.2.0) (2021-06-30)


### Features

* add href to sidebar items ([41af322](https://github.com/dhis2/import-export-app/commit/41af322693d605cef7221fb637981035d0fb487c))

## [1.1.3](https://github.com/dhis2/import-export-app/compare/v1.1.2...v1.1.3) (2021-06-29)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([d9e4fb4](https://github.com/dhis2/import-export-app/commit/d9e4fb4c7259878b952cd7011852002bed6f2dd4))

## [1.1.2](https://github.com/dhis2/import-export-app/compare/v1.1.1...v1.1.2) (2021-06-25)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([d3a1b23](https://github.com/dhis2/import-export-app/commit/d3a1b231f0d537a3ff3bd44089f5396b127412fd))

## [1.1.1](https://github.com/dhis2/import-export-app/compare/v1.1.0...v1.1.1) (2021-06-25)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([d7830d6](https://github.com/dhis2/import-export-app/commit/d7830d67318d4ce1641590d14ec25e129e0a9ee3))

# [1.1.0](https://github.com/dhis2/import-export-app/compare/v1.0.25...v1.1.0) (2021-06-22)


### Features

* **metadata import:** remove "AUTO" option, closes DHIS2-10385 ([#1114](https://github.com/dhis2/import-export-app/issues/1114)) ([a5fb925](https://github.com/dhis2/import-export-app/commit/a5fb925d91fd62d84452bb2675b099ce729e5662))

## [1.0.25](https://github.com/dhis2/import-export-app/compare/v1.0.24...v1.0.25) (2021-06-11)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([1104e8b](https://github.com/dhis2/import-export-app/commit/1104e8bdeb081609c2c546c4df6084eb686d9692))

## [1.0.24](https://github.com/dhis2/import-export-app/compare/v1.0.23...v1.0.24) (2021-06-11)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([2fd1442](https://github.com/dhis2/import-export-app/commit/2fd14426317e3ec6b5cb15916e9ee003a946ec58))

## [1.0.23](https://github.com/dhis2/import-export-app/compare/v1.0.22...v1.0.23) (2021-06-01)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([02e0e48](https://github.com/dhis2/import-export-app/commit/02e0e48fce7a043933940e47957bf960861d8f31))

## [1.0.22](https://github.com/dhis2/import-export-app/compare/v1.0.21...v1.0.22) (2021-05-05)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([dad10c5](https://github.com/dhis2/import-export-app/commit/dad10c5608218b11be0a617d79bd9cbff08bcd4c))

## [1.0.21](https://github.com/dhis2/import-export-app/compare/v1.0.20...v1.0.21) (2021-04-22)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([7e5cd7c](https://github.com/dhis2/import-export-app/commit/7e5cd7cdb433d650f64f0a630babeb554c2bbe34))

## [1.0.20](https://github.com/dhis2/import-export-app/compare/v1.0.19...v1.0.20) (2021-04-21)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([e6fc710](https://github.com/dhis2/import-export-app/commit/e6fc710fda273c6f1e0ec15a34c1293bbd538551))

## [1.0.19](https://github.com/dhis2/import-export-app/compare/v1.0.18...v1.0.19) (2021-04-20)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([9ea010a](https://github.com/dhis2/import-export-app/commit/9ea010a35388c3f509f984ac81b4278e04f91891))

## [1.0.18](https://github.com/dhis2/import-export-app/compare/v1.0.17...v1.0.18) (2021-04-19)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([569504c](https://github.com/dhis2/import-export-app/commit/569504c3abc0c72acccba39eb448f37b5936ac5a))

## [1.0.17](https://github.com/dhis2/import-export-app/compare/v1.0.16...v1.0.17) (2021-04-16)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([055e96c](https://github.com/dhis2/import-export-app/commit/055e96c75a23c2918842ebc6b95581d4aba16994))

## [1.0.16](https://github.com/dhis2/import-export-app/compare/v1.0.15...v1.0.16) (2021-03-30)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([5718865](https://github.com/dhis2/import-export-app/commit/5718865b6dcc196e5482a5b20d79917eae9a0e57))

## [1.0.15](https://github.com/dhis2/import-export-app/compare/v1.0.14...v1.0.15) (2021-03-29)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([e4fac96](https://github.com/dhis2/import-export-app/commit/e4fac964f8994386e5c9b68c7f5aec6e30d3c1d3))

## [1.0.14](https://github.com/dhis2/import-export-app/compare/v1.0.13...v1.0.14) (2021-03-27)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([1e6597c](https://github.com/dhis2/import-export-app/commit/1e6597c053fca35f7576353b990b07708af65650))

## [1.0.13](https://github.com/dhis2/import-export-app/compare/v1.0.12...v1.0.13) (2021-03-12)


### Bug Fixes

* upgrade to @dhis2/cli-app-scripts@6 (DHIS2-9893) ([#1006](https://github.com/dhis2/import-export-app/issues/1006)) ([28e9fec](https://github.com/dhis2/import-export-app/commit/28e9fec084fdfb8464515bba84674efec8e64f56))

## [1.0.12](https://github.com/dhis2/import-export-app/compare/v1.0.11...v1.0.12) (2021-02-19)


### Bug Fixes

* **import metadata:** remove preheat mode ([5cfe8bf](https://github.com/dhis2/import-export-app/commit/5cfe8bf3a14149ea63e272f5ccfcee3ad7939701))

## [1.0.11](https://github.com/dhis2/import-export-app/compare/v1.0.10...v1.0.11) (2021-02-15)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([df6240e](https://github.com/dhis2/import-export-app/commit/df6240edfca63961fb5ae0f415d2ae96a4f100a7))

## [1.0.10](https://github.com/dhis2/import-export-app/compare/v1.0.9...v1.0.10) (2021-02-01)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([2dbf0fb](https://github.com/dhis2/import-export-app/commit/2dbf0fba0b336ff640ccebc6e71717468d58ea99))

## [1.0.9](https://github.com/dhis2/import-export-app/compare/v1.0.8...v1.0.9) (2021-01-18)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([d16c474](https://github.com/dhis2/import-export-app/commit/d16c4742f582ed0866d2d7db16656602a6817813))

## [1.0.8](https://github.com/dhis2/import-export-app/compare/v1.0.7...v1.0.8) (2021-01-14)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([44b99a1](https://github.com/dhis2/import-export-app/commit/44b99a1ab1a1b43cc40b11ed446d6ae57e2b8d57))

## [1.0.7](https://github.com/dhis2/import-export-app/compare/v1.0.6...v1.0.7) (2021-01-01)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([963295d](https://github.com/dhis2/import-export-app/commit/963295d46314a29295ad297135b6ed7c716925b9))

## [1.0.6](https://github.com/dhis2/import-export-app/compare/v1.0.5...v1.0.6) (2020-12-24)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([67e932e](https://github.com/dhis2/import-export-app/commit/67e932e7f095710e463147952819ef4c6bc80eaf))

## [1.0.5](https://github.com/dhis2/import-export-app/compare/v1.0.4...v1.0.5) (2020-12-21)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([04c6c51](https://github.com/dhis2/import-export-app/commit/04c6c517d18f2b1ae790ab6a872afd4210441f7e))

## [1.0.4](https://github.com/dhis2/import-export-app/compare/v1.0.3...v1.0.4) (2020-12-16)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([a10f541](https://github.com/dhis2/import-export-app/commit/a10f541ca1c81d2a5b37bf78a796955cdd0cc021))

## [1.0.3](https://github.com/dhis2/import-export-app/compare/v1.0.2...v1.0.3) (2020-12-04)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([4e07063](https://github.com/dhis2/import-export-app/commit/4e0706350c3f2e6e6b1ff7597ae58b81cfa990fd))

## [1.0.2](https://github.com/dhis2/import-export-app/compare/v1.0.1...v1.0.2) (2020-12-03)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([966b5d6](https://github.com/dhis2/import-export-app/commit/966b5d6efee1b81244d890afc04d9cc8b8b5c1e8))

## [1.0.1](https://github.com/dhis2/import-export-app/compare/v1.0.0...v1.0.1) (2020-12-01)


### Bug Fixes

* **translations:** sync translations from transifex (master) ([6ef708f](https://github.com/dhis2/import-export-app/commit/6ef708ff25052d6c92e12737f94ef38f4fff28b9))

# 1.0.0 (2020-11-30)


### Bug Fixes

* **assigned-user-mode:** add left margin to user picker ([c0391f9](https://github.com/dhis2/import-export-app/commit/c0391f97264702f24840daa6d64a1deda62bf9fd))
* **assigned-user-mode:** shorten text and remove one header ([f787f73](https://github.com/dhis2/import-export-app/commit/f787f73dd0ff7fd7ac467bfcfb14bb3a8f93c99f))
* **data/tei-export:** send attachment parameter ([6a6be58](https://github.com/dhis2/import-export-app/commit/6a6be583c1a633f07ecb5880244327bcd09a07fc))
* **job-overview:** add responsivness ([1006514](https://github.com/dhis2/import-export-app/commit/10065142705e27dbea397ff7e601925581dca346))
* **job-overview:** unselect selected job if filtered out ([4c749e8](https://github.com/dhis2/import-export-app/commit/4c749e854dbfb19af106a3c239f4e25c445d3ee9))
* **job-summary:** update wording ([6cd26ea](https://github.com/dhis2/import-export-app/commit/6cd26ea94c5f4569ed84be14b798ee508390fbb4))
* **tei-export:** only include `assignedUser` when user filter is on ([7a58940](https://github.com/dhis2/import-export-app/commit/7a5894049c69187401414d50fe26199d8d7535c2))
* **tei-export/assigned-user-mode:** add option to disable this filter ([a2ca740](https://github.com/dhis2/import-export-app/commit/a2ca740509f525b785b1ddecc1f0f4121cc5660f))
* **tei-export/org-unit-mode:** correctly show ouMode overrides ([5f8f7f8](https://github.com/dhis2/import-export-app/commit/5f8f7f80b7e6e36a4a2b30f6e75e67e50a3e2de9))
* **tei-import:** remove async option and keep all imports sync ([c4fa2ee](https://github.com/dhis2/import-export-app/commit/c4fa2eeab51a4433260e0d9e018f7b00f4e1aaf9))
* **translations:** sync translations from transifex (master) ([b921c25](https://github.com/dhis2/import-export-app/commit/b921c258cc9a0105fd4d12452085a7eceac50465))
* **translations:** sync translations from transifex (master) ([e13ee77](https://github.com/dhis2/import-export-app/commit/e13ee77248f4a44161f43d0100a692bd7db04752))
* **translations:** sync translations from transifex (master) ([269b697](https://github.com/dhis2/import-export-app/commit/269b697f4f304e33350b2032d0ee218f813f327c))
* **translations:** sync translations from transifex (master) ([11fcd88](https://github.com/dhis2/import-export-app/commit/11fcd880dfecd3ebc1b517e8ed4245119b5d5179))
* **translations:** sync translations from transifex (master) ([d4f8f39](https://github.com/dhis2/import-export-app/commit/d4f8f398976a5706566108087f01ea22a138207a))
* **translations:** sync translations from transifex (master) ([49c1165](https://github.com/dhis2/import-export-app/commit/49c1165685cc11f54f7019f9e3eddc51a521fb62))
* **translations:** sync translations from transifex (master) ([58b8a7a](https://github.com/dhis2/import-export-app/commit/58b8a7afc366291c2cf2c88f35ccc64268776ffe))
* **translations:** sync translations from transifex (master) ([02abac6](https://github.com/dhis2/import-export-app/commit/02abac64964798349a9ff90b19642b6eb3ac3547))
* **translations:** sync translations from transifex (master) ([ff4990e](https://github.com/dhis2/import-export-app/commit/ff4990ee7743006d5fcf84678774eb8c0ab18b26))
* **translations:** sync translations from transifex (master) ([4dd1190](https://github.com/dhis2/import-export-app/commit/4dd1190cbffa8280bc73cb2d88973b19cd812f8a))
* **translations:** sync translations from transifex (master) ([4ae25ed](https://github.com/dhis2/import-export-app/commit/4ae25ed22e30c01f6ee8ed952b9f395523305047))
* **translations:** sync translations from transifex (master) ([10e1263](https://github.com/dhis2/import-export-app/commit/10e1263ccaaee97c664b0b1a877dc8c0fb2dae3e))
* **translations:** sync translations from transifex (master) ([f3a698d](https://github.com/dhis2/import-export-app/commit/f3a698d578502e277900f85cf89ab9dec712c125))
* **translations:** sync translations from transifex (master) ([f55fb7c](https://github.com/dhis2/import-export-app/commit/f55fb7ca1c72a88ea177547ad8df18b4025f398d))
* **translations:** sync translations from transifex (master) ([294d85e](https://github.com/dhis2/import-export-app/commit/294d85e2b09a862d66bb026836ea24652dc91733))
* **translations:** sync translations from transifex (master) ([45ae4be](https://github.com/dhis2/import-export-app/commit/45ae4be5a07179e6cf86a9accd181d60c7ba32dc))
* **translations:** sync translations from transifex (master) ([da63dba](https://github.com/dhis2/import-export-app/commit/da63dbae6ecd71566b165b288202bef57dce91a6))
* **translations:** sync translations from transifex (master) ([48096ae](https://github.com/dhis2/import-export-app/commit/48096ae36bf7950a3cec271a9652b7d83a3bca2d))
* **translations:** sync translations from transifex (master) ([e5e7b91](https://github.com/dhis2/import-export-app/commit/e5e7b91058ce538d154a096b8fea9f85c551b45c))
* **translations:** sync translations from transifex (master) ([5accbf2](https://github.com/dhis2/import-export-app/commit/5accbf2f6f0b985f4269f50141399912ec0243e8))
* **translations:** sync translations from transifex (master) ([672ba67](https://github.com/dhis2/import-export-app/commit/672ba679dd3b418550da4c945139166b93464bfe))
* **translations:** sync translations from transifex (master) ([0961e22](https://github.com/dhis2/import-export-app/commit/0961e228e28ddb06243be6b39bb7f6ac35ee5ad0))
* **translations:** sync translations from transifex (master) ([3f240df](https://github.com/dhis2/import-export-app/commit/3f240df2e76191c944c74b1387bcf412c7231e19))
* **translations:** sync translations from transifex (master) ([934ef2c](https://github.com/dhis2/import-export-app/commit/934ef2c1023e216960b4dc302d431b0c7376a40a))
* **translations:** sync translations from transifex (master) ([2c56ff3](https://github.com/dhis2/import-export-app/commit/2c56ff32533ec34ed2364d6316df29ccc243bc3c))
* **translations:** sync translations from transifex (master) ([ca82c53](https://github.com/dhis2/import-export-app/commit/ca82c53612372e045f75a9c86e65c8962288f720))
* corrects capitalization of data-element-id-scheme labels ([7e6ebcf](https://github.com/dhis2/import-export-app/commit/7e6ebcf002bb13a9637951c1a8fa960b53829893))
* **translations:** sync translations from transifex (master) ([df84baa](https://github.com/dhis2/import-export-app/commit/df84baa9700c6ede2608d0b3ffca0e1a03d3d676))
* **translations:** sync translations from transifex (master) ([f068a1b](https://github.com/dhis2/import-export-app/commit/f068a1b3ac0db73e9a08943a5889d3f21123783b))
* **translations:** sync translations from transifex (master) ([96df50d](https://github.com/dhis2/import-export-app/commit/96df50dd1158af25a33a197e379e12ba4761f7ad))
* **translations:** sync translations from transifex (master) ([653c960](https://github.com/dhis2/import-export-app/commit/653c960654728388fda5d7c6e41f01fd5298ef18))
* **translations:** sync translations from transifex (master) ([11ec0a2](https://github.com/dhis2/import-export-app/commit/11ec0a276112e75de11b10b2b8d7a7ab3e8c9f8b))
* make FormAlerts component purely functional ([cfef938](https://github.com/dhis2/import-export-app/commit/cfef9388e0591fb9e695407be3ed415339311046))
* **cypress:** correctly use environment file ([34d917b](https://github.com/dhis2/import-export-app/commit/34d917b2194b006939dc3e9a7db60de3903f688a))
* **export:** open download url in a new tab ([86c17ea](https://github.com/dhis2/import-export-app/commit/86c17eacb9ad8e6f6ecc482068f4ebcf2a354e73))
* **i18n:** correctly handle colon ([d000b47](https://github.com/dhis2/import-export-app/commit/d000b475c8866bf8173e51aa9dc4898dcadf326d))
* **i18n:** correctly import translations ([076e166](https://github.com/dhis2/import-export-app/commit/076e1666aca739cdbdedb8d6ca6e66c82988d49a))
* **import-job-creation:** correctly set isAsync property ([c7fd0a2](https://github.com/dhis2/import-export-app/commit/c7fd0a2a7bb114fd604e060f0285713450df2646))
* **jest:** css moduleNameMapper ([1853684](https://github.com/dhis2/import-export-app/commit/185368448790bb39e8bc53d14d9feae6fb707c4d))
* **labels/strategy:** delete label description ([ac0916c](https://github.com/dhis2/import-export-app/commit/ac0916c7cb2f353e1186518f7a40da951f853da3))
* **org-unit-tree:** add max-height ([dc3fbef](https://github.com/dhis2/import-export-app/commit/dc3fbef9a4b21e30d4aa30ae007b70dd33aa6d19))
* **tei-export:** add download flag and add compression type to url ([91594cc](https://github.com/dhis2/import-export-app/commit/91594cc35c1a2313a8f7587482fd41388a5a2f57))
* **tei-export:** correctly check programStatus form value ([38885e8](https://github.com/dhis2/import-export-app/commit/38885e8742825df62d4437b28ab004b3247a22bd))
* **tei-import:** extract the report correctly when job is synchronous ([b3afa48](https://github.com/dhis2/import-export-app/commit/b3afa48c26e0465b8ea03e529b3e0888ab515e6c))
* **tei-import:** use strategy instead of importStrategy ([be207dc](https://github.com/dhis2/import-export-app/commit/be207dcacc46ad2059be464099f97eb47264178d))
* **translations:** sync translations from transifex (master) ([880f1e9](https://github.com/dhis2/import-export-app/commit/880f1e912f8360e4e06ea7aedb958b7a17d228e2))
* correcly check date falsy value ([ff1fdea](https://github.com/dhis2/import-export-app/commit/ff1fdea920d1a88e6a930043a33de5d58aec47d3))
* give event table rows unique keys ([e8284b8](https://github.com/dhis2/import-export-app/commit/e8284b8281dea0a7e382e32b6a46d5db2d3f9316))
* set proper default values for checkbox inputs ([1a40055](https://github.com/dhis2/import-export-app/commit/1a400554b8aaa5dd0812e9deb9e268d2f44a8f53))
* **cypress:** temporarily remove cli-utils-cypress support import ([d330d18](https://github.com/dhis2/import-export-app/commit/d330d18254e543ed4b2e6cccbbcaa69545896e81))
* **cypress:** update dynamic attribute tests ([4cc2041](https://github.com/dhis2/import-export-app/commit/4cc20418d82ef0180eb4a89adaa98bf5953043e2))
* **event export:** parameter name typo ([63fe47e](https://github.com/dhis2/import-export-app/commit/63fe47ea1be6eee1af71ca18a9335b95c86395a2))
* **failing tests:** required `label` prop ([584a528](https://github.com/dhis2/import-export-app/commit/584a5286aee016b10837eb0d8cd957b173271e2b))
* **tei-import:** show import strategy delete warning ([b68196b](https://github.com/dhis2/import-export-app/commit/b68196b7f503af10a6c2ed5cfac20272e365dd06))
* **translations:** sync translations from transifex (master) ([9276a61](https://github.com/dhis2/import-export-app/commit/9276a61959a9c8e4c33cfb390874a378fc161bd6))
* **translations:** sync translations from transifex (master) ([562bd5d](https://github.com/dhis2/import-export-app/commit/562bd5d451b892f1b7c9126f87a5865ac562f9d0))
* **translations:** sync translations from transifex (master) ([e1a8b4f](https://github.com/dhis2/import-export-app/commit/e1a8b4f5f63f060e9bf95d80c2c49d14557d00fc))
* **translations:** sync translations from transifex (master) ([cbe9633](https://github.com/dhis2/import-export-app/commit/cbe9633346bdea109e93075847c18e44b7bd5925))
* **translations:** sync translations from transifex (master) ([000abfd](https://github.com/dhis2/import-export-app/commit/000abfdb91e3623b5ed1e037d3b4302e5b9cb9df))
* **translations:** sync translations from transifex (master) ([067f358](https://github.com/dhis2/import-export-app/commit/067f35876c940967be7ea9c3c497f74dcae98eea))
* **ui:** position alerts fixed in the center of the screen ([1680894](https://github.com/dhis2/import-export-app/commit/16808940bef57102dcdd7cddb51794ff6cd985da))
* **ui:** prefix long labels with keywords used in previous versions ([c2470e0](https://github.com/dhis2/import-export-app/commit/c2470e0fc5cb3a6bd00f4bddcbb7f31c19ee0d47))
* **ui:** styling adjustments according to ui-review([#668](https://github.com/dhis2/import-export-app/issues/668)) ([bb0d309](https://github.com/dhis2/import-export-app/commit/bb0d3098ac4b436d0679a487183b37fcf3c84e1b))
* add export form validation ([a25922a](https://github.com/dhis2/import-export-app/commit/a25922a7e10426b70e30220f0b0d859a212ebf1e))
* adjust tests to new style and fix found refactoring bugs ([4f76870](https://github.com/dhis2/import-export-app/commit/4f76870586baf513e59d5789d6115f1b9a3f66bc))
* app-platform core-app ([a2e4250](https://github.com/dhis2/import-export-app/commit/a2e42502a6816304b39d403a9cb2f059ac67e764))
* assign download url correctly ([da0f575](https://github.com/dhis2/import-export-app/commit/da0f575057fc7828db65f837680583c9e6775d7f))
* correctly pass typeReport on error ([7396cf6](https://github.com/dhis2/import-export-app/commit/7396cf6ee34440f51d55cd6da2aeacde881877c3))
* critical warning alert when server returns an error on POST ([222386a](https://github.com/dhis2/import-export-app/commit/222386aa5a6fead61299968eda15757d66f0d9b0))
* don't crash if server returns null summary ([4c89958](https://github.com/dhis2/import-export-app/commit/4c89958c08c3e9cb7db4987fdaaa6d8b0986c6b9))
* don't postfix app name in manifest ([cd6c6be](https://github.com/dhis2/import-export-app/commit/cd6c6beaf33026f72f12706d18f1f9a3b60638b6))
* **ui:** select/clear all checkboxes converted to buttons ([cde22b8](https://github.com/dhis2/import-export-app/commit/cde22b8fb4b0adfb8bc88f71644a36f45b215a54))
* csv format check ([83c9b20](https://github.com/dhis2/import-export-app/commit/83c9b20e5c300848fc258100bedd838b520de06c))
* error handling IdScheme ([26adf20](https://github.com/dhis2/import-export-app/commit/26adf2039bb3841e4f76468a1decfad65626dfa0))
* error when conditionally rendering fields ([63d1fbd](https://github.com/dhis2/import-export-app/commit/63d1fbd23135c5074b17a1610711c0680a7f872a))
* eslint build error work-around ([4192630](https://github.com/dhis2/import-export-app/commit/4192630f09c63bc414caacbe753a640c8a2307a8))
* failing Schemas test ([#42](https://github.com/dhis2/import-export-app/issues/42)) ([703579f](https://github.com/dhis2/import-export-app/commit/703579fa6863214b28ad0916f203e4575c9f4c27))
* failing test ([9bdd3f6](https://github.com/dhis2/import-export-app/commit/9bdd3f6ad5d178fb7a96e12e904ef2670a0be380))
* failing test. Update UI dep ([01cbdbe](https://github.com/dhis2/import-export-app/commit/01cbdbe58c21afcd3fad0a8960eead7e47c10e9e))
* fossa readme badge ([6dd48bd](https://github.com/dhis2/import-export-app/commit/6dd48bde74ca8cfdd3232870016dafb3fbfbff57))
* global element schema context ([95ece0b](https://github.com/dhis2/import-export-app/commit/95ece0b311464f2db130fbfa09d9925d7874ddae))
* global user context ([ef8df5b](https://github.com/dhis2/import-export-app/commit/ef8df5be9b3b4de8ae2508e5c8db9ae8a4dfb1d5))
* handle all xhr errors ([fcb230e](https://github.com/dhis2/import-export-app/commit/fcb230e3de34525207ecba694099a0d99cbecab0))
* handle HTTP errors when fetching attributes ([bc036fe](https://github.com/dhis2/import-export-app/commit/bc036fe86d831dff0ee3e48357e3aa50532eb413))
* handle query errors ([07ca351](https://github.com/dhis2/import-export-app/commit/07ca3519476cdc65a4d6d483f8f6d3fe97187608))
* handle unknown api response shape ([#62](https://github.com/dhis2/import-export-app/issues/62)) (DHIS2-7207) ([e35c55f](https://github.com/dhis2/import-export-app/commit/e35c55f92b17ca9005004d5d304c5ae02f7fa816))
* id is always string ([7f3053b](https://github.com/dhis2/import-export-app/commit/7f3053b24aff8b87a13e416f21e821b44306e001))
* import pages progress bar ([3764e6d](https://github.com/dhis2/import-export-app/commit/3764e6d555d0bcd09aca30b82991f552e7a6f9a2))
* job overview initial render bug ([c1d3d54](https://github.com/dhis2/import-export-app/commit/c1d3d54c836937fa1bf502b39446090ca902aebb))
* label as prop ([e5338b8](https://github.com/dhis2/import-export-app/commit/e5338b874b5eb01880abbcc9cf93fcc24cd9570f))
* label uppercase ([cb2b37a](https://github.com/dhis2/import-export-app/commit/cb2b37a0cb3c7d270a11f16f07decd628816022b))
* make location assignment functionality stubbable ([12c6116](https://github.com/dhis2/import-export-app/commit/12c6116794c4d3b54aeb3df61628fa48fcc83bb1))
* move common select logic to SelectableList ([c6d0ede](https://github.com/dhis2/import-export-app/commit/c6d0ede19d9f48978b38eb2566f632bc103a4682))
* move internal components to separate subfolders ([ee55277](https://github.com/dhis2/import-export-app/commit/ee55277b4807ab3ca467147ca71ea38296080c56))
* move schema logic inside components ([0947fed](https://github.com/dhis2/import-export-app/commit/0947fedb3c25802d452382384f676a312527607f))
* move user, scheme and task logic to HOCs ([3d27c33](https://github.com/dhis2/import-export-app/commit/3d27c336b7919a9c0f3dca7dcafb76772a0961e1))
* multiselect correctly works when turned off ([0daf8a5](https://github.com/dhis2/import-export-app/commit/0daf8a5bd286f8d2c30b5c1e9643aca737fd2082))
* no import summaries ([26d03b7](https://github.com/dhis2/import-export-app/commit/26d03b7531b958885ca8b42c25fc06b2362e78bf))
* page supports progress in percentage ([2ec221a](https://github.com/dhis2/import-export-app/commit/2ec221afe027046db5c9438acf8bd1ceefb2ff4e))
* param generation ([79b3279](https://github.com/dhis2/import-export-app/commit/79b327975140100e96dfa909f0b5dad2b32aec92))
* progress in correctly set ([6398c92](https://github.com/dhis2/import-export-app/commit/6398c9249925ce6d97cd1890d49f6a8dc6e73366))
* react-final-forms form-errors subscription ([534b843](https://github.com/dhis2/import-export-app/commit/534b8431f36a050a2817ed66fe371f3b380ca40e))
* remove error message print from i18n ([c518ecb](https://github.com/dhis2/import-export-app/commit/c518ecbad91b6af0db0b945ec1a17a324969681c))
* rename more appropriately ([8924fa6](https://github.com/dhis2/import-export-app/commit/8924fa65b9ccdf89684b739148ffac8b0652585d))
* renamed to SelectableList ([3633888](https://github.com/dhis2/import-export-app/commit/3633888029474f6bb9f8bbe3e931c525f633c0de))
* select/clear all only makes sense when multi-select ([ca06169](https://github.com/dhis2/import-export-app/commit/ca06169d5c6d00903f42be56180403427c11e9dd))
* setSelected doesn't need current state value ([7c87233](https://github.com/dhis2/import-export-app/commit/7c872335e667b2620545f55b280656d6099a83dc))
* state updates on unmounted component ([07b27f5](https://github.com/dhis2/import-export-app/commit/07b27f56834150542da8851e57e6a481867d998e))
* tag tasks that have error events as erroneous ([382a0c8](https://github.com/dhis2/import-export-app/commit/382a0c8d211595387c1483ecc0735e4bf3489f1d))
* tag tasks that have error in task-summary as erroneous ([caa7f5c](https://github.com/dhis2/import-export-app/commit/caa7f5c676c84cb74d9e330dee36a12a7e5315e4))
* test check i18n string ([7192b02](https://github.com/dhis2/import-export-app/commit/7192b02b88034a22d66fa4e8a2d151d90f5e7ce9))
* unique keys when duplicate object names ([9505b09](https://github.com/dhis2/import-export-app/commit/9505b09fd640a5dbef5c1236a22d9f32e167d227))
* use onComplete/onError callback functions ([8c5c7b9](https://github.com/dhis2/import-export-app/commit/8c5c7b9c40c65ef1b77dc295b073230506ce47d8))
* **api helper:** extract correct name in getProgramStages helper ([7412dff](https://github.com/dhis2/import-export-app/commit/7412dff5c05960ce5babde9e1d14957c10e641b4))
* **css:** overflow ([2f9efb8](https://github.com/dhis2/import-export-app/commit/2f9efb8909b45831a8ab2b7716e9a7960f1e9f00))
* **data import:** add missing skip audit request parameter ([#60](https://github.com/dhis2/import-export-app/issues/60)) (DHIS2-7020) ([5f2217c](https://github.com/dhis2/import-export-app/commit/5f2217c527bd7fc5c17311bc68efb912bd6f8c79))
* **import meta data:** send correct file format ([7628b4c](https://github.com/dhis2/import-export-app/commit/7628b4c0964b5fd51d23c3ddda165c1dae6e0bd9))
* **metadata dependency:** use objectType and objectList in url ([#76](https://github.com/dhis2/import-export-app/issues/76)) ([ffa66bc](https://github.com/dhis2/import-export-app/commit/ffa66bca7b3872dc47a5b4c388b44e56702ad53b))
* add crossorigin to fix chrome-bug (fixes DHIS2-6122) ([59a56d5](https://github.com/dhis2/import-export-app/commit/59a56d5438405de2fd60bae374aff8f3c4c8c5d5))
* **metadata export:** filter selectable schemas on metadata and exclude schemas ([#30](https://github.com/dhis2/import-export-app/issues/30)) ([587bbfb](https://github.com/dhis2/import-export-app/commit/587bbfb15ec4c54f8cf8051a5b695635eb7a8802))
* clear log fix ([6d90210](https://github.com/dhis2/import-export-app/commit/6d9021079050df79d1b16d4e3f6b415725208c7a))
* label used before it was defined ([61d2c98](https://github.com/dhis2/import-export-app/commit/61d2c98932fe05fa135c5b74301158ea414b321e))
* show summary after data imports ([61d4ef6](https://github.com/dhis2/import-export-app/commit/61d4ef602d49ef4dfcbe479641919aca7d3540b3))
* use selected format instead of file extension for Content-Type header ([#50](https://github.com/dhis2/import-export-app/issues/50)) ([cf9cfb3](https://github.com/dhis2/import-export-app/commit/cf9cfb34ebb351538bea5d0688407a64d11a6929))
* **add/remove:** org unit ([0a19acf](https://github.com/dhis2/import-export-app/commit/0a19acf95106e5f90b2a1d2a0d4dd21f57412ebf))
* **code-style:** eslint configuration issues ([cfae816](https://github.com/dhis2/import-export-app/commit/cfae8161c366af9ddbdb895e9e7d6bfa4c9af32f))
* **DataExport:** fix default True, include descendant of org. unit ([355f7fc](https://github.com/dhis2/import-export-app/commit/355f7fcc70a83f0ec711bc4263c005d12ecc2533))
* **Date:** component ([15c2c27](https://github.com/dhis2/import-export-app/commit/15c2c27d80ce327b5274abffc5115fffdffc8d97))
* **eslint-loader:** add dependency ([5da95e8](https://github.com/dhis2/import-export-app/commit/5da95e8c4ffeb5363bc879ac5b61e445082e94d2))
* **EventImport:** reference to getParamsFromFormState func. in helpers ([23b9cd2](https://github.com/dhis2/import-export-app/commit/23b9cd22bade2aa239dbefa6085dda0f5bdab020))
* **logger:** remove truncation of date in logger ([f3a8aaf](https://github.com/dhis2/import-export-app/commit/f3a8aafd644e1211f72cf545a845748e22af23c7))
* **metadata-export:** add support for csv. Download directly from server ([becd9cd](https://github.com/dhis2/import-export-app/commit/becd9cdf86aa99cbb1fca8ae53c070fe1c109002))
* remove xhr onprogress code ([a521338](https://github.com/dhis2/import-export-app/commit/a521338713f2aaedf6c860ce024a4dde79e524c9))
* upgrade d2/ui, fix import to reduce bundle-size ([3cfefb6](https://github.com/dhis2/import-export-app/commit/3cfefb6ed299540d05327678d758e20030021411))
* **getFormValues:** add exception for calculated values ([4a10865](https://github.com/dhis2/import-export-app/commit/4a1086593ca4f7cd88ca8c2eea59dca34a5a5fa7))
* **getMimeType:** return NULL if filename is empty ([d9acced](https://github.com/dhis2/import-export-app/commit/d9accedf6e2830de2c83404c6762d2fb536dc485))
* **HeaderBar:** enable HeaderBaR ([f358718](https://github.com/dhis2/import-export-app/commit/f358718976af6526d80f8c499e14a71fcfdc9f16))
* **logger:** add placeholder to messages without timestamp ([fa8f427](https://github.com/dhis2/import-export-app/commit/fa8f42754de9bb5d1cf96d7439741591ae69060e))
* **logger:** Add truncation options to getDate ([f3078d7](https://github.com/dhis2/import-export-app/commit/f3078d7b961d0d62a7908092c644d80e42324fbd))
* **Metadata Import:** append object type if format is CSV ([ffd4794](https://github.com/dhis2/import-export-app/commit/ffd47946992c4538772ebdfedbc3aa72f39ed381))
* **metadata-dep:** fix optionset support ([20bb9e7](https://github.com/dhis2/import-export-app/commit/20bb9e70c1fddf4b9eb65ec1bf53d3475080e153)), closes [#DHIS2-6074](https://github.com/dhis2/import-export-app/issues/DHIS2-6074)
* **MetadataDependencyExport:** missing ObjectType field ([643bcc5](https://github.com/dhis2/import-export-app/commit/643bcc54bf6313d6f12cbd0fd444682ad6d30aaf))
* **MetadataExport:** amend skipSharing param when sharing = false ([910413f](https://github.com/dhis2/import-export-app/commit/910413f076b71ce95395aa8682af19c72eb4cf41))
* **MetadataExport:** send list of exclude params ([137bde7](https://github.com/dhis2/import-export-app/commit/137bde70b5eafc50b075b83e9bb009329f135429))
* **MetadataImport:** duplicate ObjectType field ([14928f8](https://github.com/dhis2/import-export-app/commit/14928f841c8683f70773a6c9d75d2a6004c244d0))
* **MetaDataImport:** set response to json ([99c15b6](https://github.com/dhis2/import-export-app/commit/99c15b60b2bab8a126f96f5d7c5e73e39228bd19))
* check data response before logging stats ([1b20bad](https://github.com/dhis2/import-export-app/commit/1b20bade5c198991f9eb3f4f1f78cb9450dd4a33))
* use format json, in MetaData & MetaDataDependency import/export ([5d65d03](https://github.com/dhis2/import-export-app/commit/5d65d03ce7503fec43df9ae84e37a084efc65711))
* **metadata dependency export:** repeated api/api in url ([0a9436a](https://github.com/dhis2/import-export-app/commit/0a9436a2d53b95e3f0ae5d263947a3b2e3f3b532))
* **RadioButton:** set default valueSelected ([8638240](https://github.com/dhis2/import-export-app/commit/8638240f8167ec3252f2f08e6513c9e412d09dcb))
* **rxjs:** include dependency for headerbar ([77ae860](https://github.com/dhis2/import-export-app/commit/77ae8604de50b9a92b94f9188a564660808cbe3b))
* **syntax:** use map instead of forEach ([227d779](https://github.com/dhis2/import-export-app/commit/227d779f2f2bb16cb2c58fa2e979608d2c158b63))
* **Tree:** sibling sub-tree expand ([ba261db](https://github.com/dhis2/import-export-app/commit/ba261dbc7739206fd427260926157a536c7561c2))
* **xhr setRequestHeader:** open XHR before setting headers ([3d6968f](https://github.com/dhis2/import-export-app/commit/3d6968fc00892fb962b3067d51e1be2981ce7770))
* add format param for Export for correct server export ([9d1c9a9](https://github.com/dhis2/import-export-app/commit/9d1c9a9d7bfb38b561c8e90a590562cc1baca6d2))
* blob mime types ([7dde8cd](https://github.com/dhis2/import-export-app/commit/7dde8cd27768c9e4fd09bd73ce58617234332860))
* enable HeaderBar ([dc59375](https://github.com/dhis2/import-export-app/commit/dc59375960e8287621fce2262cd0f724d187aaca))
* enable HeaderBar ([3e3da0b](https://github.com/dhis2/import-export-app/commit/3e3da0b2b9d348d535680b6a5eaed28e72025e45))
* fetchLog first param ([8e95750](https://github.com/dhis2/import-export-app/commit/8e95750fb640a921e4abcb9b7d581b376e9abace))
* use prop name as name ([490548a](https://github.com/dhis2/import-export-app/commit/490548a44148495fa59ef9150ee3ffe998b8be51))
* **schemas:** Component ([10ca642](https://github.com/dhis2/import-export-app/commit/10ca642fe83add067e1bb75fc55b87674e72db94))
* **SelectField:** layout and selection issues ([52bc7c5](https://github.com/dhis2/import-export-app/commit/52bc7c53650c01941580f12913ccd557daa9a4b5))
* **tasksummary:** add check for errorReports ([ec81d52](https://github.com/dhis2/import-export-app/commit/ec81d52df9c442ec556cc761f68eb0bd118dbfe4))


### Features

* ability to hide task details ([cde23f5](https://github.com/dhis2/import-export-app/commit/cde23f5e1a3f6fe3506aa9ed5a004030d829456b))
* add dynamic attributes to data & event import page ([#68](https://github.com/dhis2/import-export-app/issues/68)) (DHIS2-7495) ([f9a64bf](https://github.com/dhis2/import-export-app/commit/f9a64bfa991c8c9f630d713ec94f4f9e82161591))
* add home page ([83fc914](https://github.com/dhis2/import-export-app/commit/83fc914e0a95735a756d4e1c68fecdfe84af283a))
* component DatePicker tests ([b7f267b](https://github.com/dhis2/import-export-app/commit/b7f267b8c50c748b2f6f112e737cda242b0b4e24))
* component FormField tests ([3034d77](https://github.com/dhis2/import-export-app/commit/3034d779ef55530ad0b848be55cfd17e76507fe9))
* component Icon tests ([11030e0](https://github.com/dhis2/import-export-app/commit/11030e0b911aad394070b70edf05a45d4d71ff0b))
* component ImportButtonStrip tests ([4b6d69f](https://github.com/dhis2/import-export-app/commit/4b6d69fd059fd7a191585a7c0b19aea7cb7a0cec))
* component JobSummary ([fb5ec44](https://github.com/dhis2/import-export-app/commit/fb5ec44ab1aa53254f83bee938433dcbf83e3cfa))
* dry run as primary form submit button ([6099a4a](https://github.com/dhis2/import-export-app/commit/6099a4a131c17769980f2c0b66a606a909101516))
* floating action button component ([b784578](https://github.com/dhis2/import-export-app/commit/b78457888400e9b413fa427c87314a32e46c21f7))
* integrate job overview modal ([ccfaf09](https://github.com/dhis2/import-export-app/commit/ccfaf09f3194b9caff0c56d0f724a11d6f0d680c))
* job overview and modal component ([0bff1d3](https://github.com/dhis2/import-export-app/commit/0bff1d39395c69f84db941d01de88bf4bac6af9e))
* move ClassKey to own component ([433308a](https://github.com/dhis2/import-export-app/commit/433308a8679536b997daf357cde262790b99d902))
* move job overview to own page; no modal ([beb504f](https://github.com/dhis2/import-export-app/commit/beb504f4b48431331ea19bddbd08479857cad41e))
* only show full summary of most recent import once by default ([1a947f5](https://github.com/dhis2/import-export-app/commit/1a947f582d7263e2d8d78d5a3b781dfe241b34dd))
* recreate previously run jobs from job overview page ([6b32878](https://github.com/dhis2/import-export-app/commit/6b3287849d3630e3cd091b095ca6dba20622f035))
* show form validation summary when form is submitted ([da14924](https://github.com/dhis2/import-export-app/commit/da14924dbdbb37d2b3534318d69823a5e8913a2a))
* **export:** disable export button while content is loading ([8e63341](https://github.com/dhis2/import-export-app/commit/8e63341a78462d275cce828be4646ea21eaaf759))
* **menu:** display icons for import / export section headers ([53ae61c](https://github.com/dhis2/import-export-app/commit/53ae61c4595a81738481a7135f849fa20116a5b9))
* **ui:** style prefix technical terms ([2d1fbc4](https://github.com/dhis2/import-export-app/commit/2d1fbc4501e5dab9bd7729d088697a162fec2529))
* add @dhis2/ui-forms dependency ([5ac2ea3](https://github.com/dhis2/import-export-app/commit/5ac2ea3204d0bd3c33967b16f949d78ea33946fb))
* add dataElement Scheme to Event import parameters ([c92b375](https://github.com/dhis2/import-export-app/commit/c92b3751eb0e366c4fc073146f1a2b9c8dcd551c))
* add fields used for data export page ([13a3d46](https://github.com/dhis2/import-export-app/commit/13a3d4667693ac5ecec9206d30f78abf5b08d861))
* all previous cypress tests passing ([3fa669c](https://github.com/dhis2/import-export-app/commit/3fa669c3ac3282a138e6276ac48250c17b7009bd))
* async form submission, extracted form elements ([6410e7b](https://github.com/dhis2/import-export-app/commit/6410e7ba397bdea8f503e0e1680dc503efd3f0b9))
* context Schemes removed ([817aeec](https://github.com/dhis2/import-export-app/commit/817aeecaa24eeb000a7cc03b7906fbcdc24c3698))
* optimize api schema request ([75884cf](https://github.com/dhis2/import-export-app/commit/75884cfec39cf1f05e1151c87e82c4d0c63ad2b9))
* show a `job started` alert when a job is started without error ([90d56a5](https://github.com/dhis2/import-export-app/commit/90d56a50f1e1102cd826179e30a9d4b14d3882ae))
* **attributes:** prepare attributes fetching & state management ([#67](https://github.com/dhis2/import-export-app/issues/67)) ([f61ee93](https://github.com/dhis2/import-export-app/commit/f61ee93254649a75d378a6fef5c9d0732c973ca4))
* **ui/strategy:** show warning box when DELETE is selected ([75eed04](https://github.com/dhis2/import-export-app/commit/75eed0419f5ef575aedc1c05207b42dcb4ef90a6))
* add firstRowIsHeader param for csv meta data import ([#43](https://github.com/dhis2/import-export-app/issues/43)) ([7a049ea](https://github.com/dhis2/import-export-app/commit/7a049eac8a29df0f3c67c769c38298fb0358001e))
* add schemes for event import export ([1b271d0](https://github.com/dhis2/import-export-app/commit/1b271d0f8ababe53e515f953d4efe51ca70f5419))
* add skip audit option to data import page ([#55](https://github.com/dhis2/import-export-app/issues/55)) (DHIS2-7020) ([eb07f9e](https://github.com/dhis2/import-export-app/commit/eb07f9e7671357baab77b37cdef8b9b5a01adb0c))
* checkbox list component ([034be33](https://github.com/dhis2/import-export-app/commit/034be331d5826fc2aad360dcaba349dad6aa81dc))
* component ClassKey converted to a hook ([84e98b9](https://github.com/dhis2/import-export-app/commit/84e98b978c12250831ff19f16cb3b80b9e08d1ee))
* component ObjectSelect converted to a hook ([7cc13c2](https://github.com/dhis2/import-export-app/commit/7cc13c2cb795a71088a7b177154f3a41b56646ea))
* component ProgramStageSelect converted to a hook ([49ede5b](https://github.com/dhis2/import-export-app/commit/49ede5b240df40ec15623fd91aa241daacdefdbc))
* **Blob:** helper functions ([c56d7f5](https://github.com/dhis2/import-export-app/commit/c56d7f5e94bc6ce54d286acbdaa9c80c71d30e54))
* **DataExport:** Include children in data export ([#15](https://github.com/dhis2/import-export-app/issues/15)) ([b5b8542](https://github.com/dhis2/import-export-app/commit/b5b8542adff050755cb5526591102711a7ebccbe))
* **DataImport:** show import conflicts in task summary ([95e03d3](https://github.com/dhis2/import-export-app/commit/95e03d30841befaf42bce6f41a7267a2cbb81eea))
* **metadata dependency:** add support for optionSet ([#31](https://github.com/dhis2/import-export-app/issues/31)) ([c80b1c3](https://github.com/dhis2/import-export-app/commit/c80b1c339b495992c51411a6a434a62cacd88150))
* add support for required fields and validation ([1976778](https://github.com/dhis2/import-export-app/commit/1976778dd765677a808c8092ae8c151d5c851dcb))
* **DataExport:** compressed + uncompressed ([1d208b3](https://github.com/dhis2/import-export-app/commit/1d208b3fe9f8340ed5a945440adc551025cc6936))
* **GMLImport:** detect typeReport errors ([6d7cb99](https://github.com/dhis2/import-export-app/commit/6d7cb993f6b8c9bbd617e265568be1892163ac6c))
* **TaskSummary:** detect importSummaries in xhr response and show ([6bbd9e7](https://github.com/dhis2/import-export-app/commit/6bbd9e7a5ce2908c22fbb1acf9b05b111bc99234))
* EventImport form ([bac4f4e](https://github.com/dhis2/import-export-app/commit/bac4f4e31ef67252aec49bbd119faa7609435cb9))
* Metadata Dependency ˆExport form ([deab466](https://github.com/dhis2/import-export-app/commit/deab4667451c6bc2f69d7ad12898686d1be4f61f))
* support zipped imports ([fae56b6](https://github.com/dhis2/import-export-app/commit/fae56b613f9740c460b9b3cdea1d590149ca5f4b))
* **API:** get user details ([f053cd1](https://github.com/dhis2/import-export-app/commit/f053cd118597730b498d3926c58e0bcaf64e893a))
* **DataExport:** export uncompressed data ([4e94623](https://github.com/dhis2/import-export-app/commit/4e94623bf9ddc5cc8452e6a72052a2d3df90be9e))
* **Import Error:** show error on invalid file import ([8284226](https://github.com/dhis2/import-export-app/commit/8284226d88e0a8123cd59938b53ba6ab389a79a3))
* **Org. Unit:** single select ([eebffad](https://github.com/dhis2/import-export-app/commit/eebffad564932ecad50279fd40076376cb674569))
* **testing:** Loading ([e868e65](https://github.com/dhis2/import-export-app/commit/e868e65a7c4e9bfaffc4e080bbba8ea1d1f5b496))
* Data ˆExport form ([a60cf55](https://github.com/dhis2/import-export-app/commit/a60cf55f5603b864820db3376ef8d9089a89b5d9))
* data export page ([3b48fed](https://github.com/dhis2/import-export-app/commit/3b48fed436abe6e20ee3efff7389bdc667d8f679))
* data import page ([d558e3d](https://github.com/dhis2/import-export-app/commit/d558e3dea67003a7e413896541f6a701622c7ed6))
* data set picker component ([2250335](https://github.com/dhis2/import-export-app/commit/2250335de54d0a11770c15b76498fe18a4eab62a))
* Date field ([51fa907](https://github.com/dhis2/import-export-app/commit/51fa9079cf2f9a1b9cd600bcddd58d52a2c8a189))
* date picker component ([5e0be2c](https://github.com/dhis2/import-export-app/commit/5e0be2c5d387c789dca708bfe65bc7c346c1d5dd))
* Event Export formˆ ([b3610e3](https://github.com/dhis2/import-export-app/commit/b3610e37f0d3dba42e08cda6113b3f38bf2b0a6c))
* event export page ([40daed8](https://github.com/dhis2/import-export-app/commit/40daed89359ca500ded7d5ab2ea1fe5af7fdf6a2))
* event import page ([ce821ea](https://github.com/dhis2/import-export-app/commit/ce821ea8c2eaf3d6418cab140b56df631885d6de))
* extract job recreation state logic to separate functions ([11d698d](https://github.com/dhis2/import-export-app/commit/11d698df9f69430c1d6c31cf37bc1984e016d9e7))
* follow react code style + propTypes + dataTest ([87f276b](https://github.com/dhis2/import-export-app/commit/87f276b42c285293b4990eb7e1dfa45746f61067))
* form alert component ([c88f86a](https://github.com/dhis2/import-export-app/commit/c88f86abd42e95cd057b8fb011b62460ab468057))
* form field with label helper component ([200e9d4](https://github.com/dhis2/import-export-app/commit/200e9d4b934f3b4edfaa3a4fcb740286ceb876b6))
* gml import page ([080255b](https://github.com/dhis2/import-export-app/commit/080255bfdd366363efae3c5577dfa1ace2bc9cab))
* install cli-utils-cypress ([5b76611](https://github.com/dhis2/import-export-app/commit/5b76611a8e6d8d3e6cbede552364ea1e2ae46e71))
* integrate date/time locale ([28a6e93](https://github.com/dhis2/import-export-app/commit/28a6e93c5049e11d63e9ac8be2353f613fac9c05))
* metadata dependency export page ([d226c69](https://github.com/dhis2/import-export-app/commit/d226c69be7cb5e8160ceb3503d78b205fca97ada))
* Metadata Export form ([e012bec](https://github.com/dhis2/import-export-app/commit/e012bece319400ceccb879fa243eafd64deb3a67))
* metadata export page ([0dceea0](https://github.com/dhis2/import-export-app/commit/0dceea0ad3af6564fadd2a7400745896954e68e2))
* metadata import page ([08a9af6](https://github.com/dhis2/import-export-app/commit/08a9af6bec002cf87c2098e792642192e14586de))
* navigation and routing basic skeleton ([afb70df](https://github.com/dhis2/import-export-app/commit/afb70df3cfadd58893c65123532c7b2d73dbd6c1))
* organsition unit component ([d6e3275](https://github.com/dhis2/import-export-app/commit/d6e3275ecbccc518dccb085be5ee68aa690c0882))
* page can show JobSummary before rest of body ([da6f5f7](https://github.com/dhis2/import-export-app/commit/da6f5f7b3944510de7afefd6c35bda6da0338bdb))
* plus, minus icons ([94bc57b](https://github.com/dhis2/import-export-app/commit/94bc57bb1239e6246f6775f94796c113da91e849))
* program picker component ([ab37238](https://github.com/dhis2/import-export-app/commit/ab37238d79931e28619a8c904aa6dcf4ab1135ff))
* remove Icon component ([ec6bc05](https://github.com/dhis2/import-export-app/commit/ec6bc059c6671a1186366ae11b88edb6bb7af54a))
* responsive grid and icons ([e6d013f](https://github.com/dhis2/import-export-app/commit/e6d013fd1564921e06958a65565e49929ed1d45d))
* save Radio btn. updates to Form state ([b69b2f1](https://github.com/dhis2/import-export-app/commit/b69b2f1f2b08e91dc61c384a312f2bd95b50b6c4))
* Schema component ([a8aabd2](https://github.com/dhis2/import-export-app/commit/a8aabd2ad85c03cea17a8d8ad73bbc2e09d7fc87))
* show validation messages ([5fe6dc8](https://github.com/dhis2/import-export-app/commit/5fe6dc898efd070a2c168e00c8cca2be6bffa645))
* string trimming function ([efe7c2d](https://github.com/dhis2/import-export-app/commit/efe7c2dd9f777fccdb8715a64112a460b858725d))
* summary statistics extraction function ([66b0f38](https://github.com/dhis2/import-export-app/commit/66b0f382668f31f799c71dacb6292f89ae41a721))
* support for import task state and fetching ([7cfe0d1](https://github.com/dhis2/import-export-app/commit/7cfe0d1de51bb9027631e56339691634b0fefeb9))
* switch with label component ([ba8889f](https://github.com/dhis2/import-export-app/commit/ba8889fe6b76155a661f9ac5572526b4903c4be1))
* tasks HOC converted to a hook ([9e1addb](https://github.com/dhis2/import-export-app/commit/9e1addb5950dda860a11d3c802d12f49466cd932))
* tasks icon ([739a5e4](https://github.com/dhis2/import-export-app/commit/739a5e457cdd17416be35badbb6f87311b188aaf))
* test click events ([3fa2170](https://github.com/dhis2/import-export-app/commit/3fa2170947576f2715f7ec696c597d8aa330b4e3))
* tests for DataSetPicker ([31172bf](https://github.com/dhis2/import-export-app/commit/31172bf620e39666da103dda486937ed97c3c80b))
* tests for ElementSchemas ([078f7e3](https://github.com/dhis2/import-export-app/commit/078f7e36aa9bee1824662a17ea61d55c232ffdb7))
* tests for FormAlerts ([075451e](https://github.com/dhis2/import-export-app/commit/075451e6fa116e2d9059b3fe03d13f78dc894665))
* tests for JobOverview component ([8d70a08](https://github.com/dhis2/import-export-app/commit/8d70a08a561bc1aef6d9236f3af2646c9c5c9254))
* tests for JobSummary ([a098746](https://github.com/dhis2/import-export-app/commit/a098746fc59412c24e452e783302e40499843266))
* tests for MenuLabel ([a1fe8ae](https://github.com/dhis2/import-export-app/commit/a1fe8ae753610e4572a7be1a638334e0d0e90ceb))
* tests for MoreOptions ([63839f2](https://github.com/dhis2/import-export-app/commit/63839f24a53c0a916f8b8bbc3720f6b200758516))
* tests for OrgUnitTree ([5193c7e](https://github.com/dhis2/import-export-app/commit/5193c7ebece8a805725783568c70d974cd8806ea))
* tests for Page ([a370d66](https://github.com/dhis2/import-export-app/commit/a370d66fd467fbcebbcdbb69f308dd086b8b1f6a))
* tests for ProgramPicker ([025b845](https://github.com/dhis2/import-export-app/commit/025b845b12113b5cf23e58982eb6b056dbae0f82))
* tests for RadioGroup ([eba6ff9](https://github.com/dhis2/import-export-app/commit/eba6ff98ea71a3c925915ae63a9829cb9262a6ba))
* tests for Select ([a60ea1a](https://github.com/dhis2/import-export-app/commit/a60ea1aa948ef570db4f864cb45ce1dfa7e39097))
* tests for SelectableList ([eff2873](https://github.com/dhis2/import-export-app/commit/eff28730bcaffce1e94e29e0a9f3116d64138593))
* tests for Switch ([a9d33d3](https://github.com/dhis2/import-export-app/commit/a9d33d3a515f10a665d933b1d696a0d8566b744a))
* tests for WithAuthority ([e82fb0f](https://github.com/dhis2/import-export-app/commit/e82fb0f3618139874bd7c246abcd3dc9cb897200))
* togglable options component ([1424ad4](https://github.com/dhis2/import-export-app/commit/1424ad412a9ab9b60cdfa74b240b94451d85a6e6))
* toString() instead of string literals ([40f25ba](https://github.com/dhis2/import-export-app/commit/40f25ba18c4ea22bb38258cf77c47a04742451a6))
* tracked entity instances export page ([6964acd](https://github.com/dhis2/import-export-app/commit/6964acdb2cde4eaa72401537b97bec49edd30b79))
* tracked entity instances import page ([072f291](https://github.com/dhis2/import-export-app/commit/072f2918a98d01d769f563f6eb91a128dd1f1942))
* upload icon ([90e46d0](https://github.com/dhis2/import-export-app/commit/90e46d07bb8855a75b085e5ffde260948453d804))
* use [@dhis2](https://github.com/dhis2) scoped dependencies ([4bcab8e](https://github.com/dhis2/import-export-app/commit/4bcab8e32971fdd5a7b67ecdefb815fe6298883c))
* use Page components ability to show newest job ([64bc8b2](https://github.com/dhis2/import-export-app/commit/64bc8b203e373a1ca21f89eb95009342537eb16a))
* use ui-forms RFF in export/data page ([27c5deb](https://github.com/dhis2/import-export-app/commit/27c5deb26053ed5c15b1e34850a222ab32e66b8d))
* use ui-forms RFF in export/event page ([1b35646](https://github.com/dhis2/import-export-app/commit/1b356461f411cadd2010682ca6a715c6b4979e9e))
* use ui-forms RFF in export/metadata page ([aa678ce](https://github.com/dhis2/import-export-app/commit/aa678ce3cac7b868c405d9f3b088bc70762e9cb4))
* use ui-forms RFF in export/metadata-dependency page ([5396f76](https://github.com/dhis2/import-export-app/commit/5396f76b7347a0d109add9ecb8fe3b8c16a0da3f))
* use ui-forms RFF in import/data page ([370c783](https://github.com/dhis2/import-export-app/commit/370c783c9d9c219c9be8e660f8caa5959cbec610))
* use ui-forms RFF in import/event page ([70fc33e](https://github.com/dhis2/import-export-app/commit/70fc33eb597893b772eac0037fe6ee4dfaa75faf))
* use ui-forms RFF in import/gml page ([a0c3b9f](https://github.com/dhis2/import-export-app/commit/a0c3b9fcf1dcde284763a49cc207b0ae71daf602))
* use ui-forms RFF in import/metadata page ([a08c1d4](https://github.com/dhis2/import-export-app/commit/a08c1d4c79de6de201de540bfa6f96c50bccbfee))
* user HOC converted to a hook ([5a18c16](https://github.com/dhis2/import-export-app/commit/5a18c16565daaeebdf6a15b8dc1694936bbccb9a))
* WithAuthority component ([bea2758](https://github.com/dhis2/import-export-app/commit/bea275863efd87b78ac148c42e8bdb48db3d75c8))
* **gh-pages:** add hosting onto github pages ([76a4559](https://github.com/dhis2/import-export-app/commit/76a4559936a2707ac1db894abff23acd2590ae8e))
* **id scheme inputs:** use select instead of radio buttons (DHIS2-7495) ([#71](https://github.com/dhis2/import-export-app/issues/71)) ([3711fef](https://github.com/dhis2/import-export-app/commit/3711fef7c9bfee4f10652a3745bd590218bd25ad))
* **input components:** add missing components for Event export page ([c0cd92f](https://github.com/dhis2/import-export-app/commit/c0cd92f75421ce27ec1da46997d72ae349cc2a97))
* **integrate react-router:** use hash routing ([9b1355b](https://github.com/dhis2/import-export-app/commit/9b1355bb81e1dbe62ac593a15fd0e201a4d68862))
* **Loading:** show loading while authenticating ([a111491](https://github.com/dhis2/import-export-app/commit/a1114915f8e445886df9fa4c7049a10e1dbcccf7))
* **material-ui:** use theme at root level ([58ff5a3](https://github.com/dhis2/import-export-app/commit/58ff5a31d4643cb809315cd9db5cb2be39b2cabb))
* **object:** add api helpers ([be4fe6d](https://github.com/dhis2/import-export-app/commit/be4fe6d06059f99581d156eea6c2ae9a46646ee6))
* **object:** add ObjectList and ObjectType components ([39c0ec5](https://github.com/dhis2/import-export-app/commit/39c0ec59acfc259c40a0b10b91e7fb492bb5ddd8))
* **object:** add redux components ([a0cc1bc](https://github.com/dhis2/import-export-app/commit/a0cc1bc284f92f2f4780345c4a4891f5e0056e89))
* **postcss:** automated RTL language support ([faae688](https://github.com/dhis2/import-export-app/commit/faae68814e96ff4df155b9772095184b01d1785e))
* **program:** add redux components ([c55c64c](https://github.com/dhis2/import-export-app/commit/c55c64c4ac6354f43a991ec7144dbc47e33ebbc5))
* **program & stages:** add translations ([6c9a8c6](https://github.com/dhis2/import-export-app/commit/6c9a8c62350038f5035c2bdd75a6a4c3d5b8263f))
* **program stages:** add redux components ([3459942](https://github.com/dhis2/import-export-app/commit/3459942c5f7c203388a1b2e7968dd452ca90d357))

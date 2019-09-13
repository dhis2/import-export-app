import { Before } from 'cypress-cucumber-preprocessor/steps'

Before((testCase, callback) => cy.login())

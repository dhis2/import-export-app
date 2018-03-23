import React from 'react'
import styled from 'styled-components'
import i18n from 'd2-i18n'
import { NavLink } from 'react-router-dom'

const Container = styled.div`
  width: 260px;
  height: 100vh;
  background-color: #f0f0f0;
  border-right: 1px solid #d0d0d0;
`

const Heading = styled.div`
  font-size: 20px;
  font-weight: 300;
  padding-left: 20px;
  margin-top: 30px;
  margin-bottom: 10px;
`

const Item = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  font-size: 15px;
  font-weight: 300;
  padding: 8px 0 8px 20px;

  &:hover {
    background-color: #d0d0d0;
  }
`

const List = styled.div`
  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
  }

  a.active ${Item} {
    background-color: #d0d0d0;
  }
`

const Text = styled.div``

const importLinks = [
  {
    to: '/import/metadata',
    text: i18n.t('Metadata Import'),
  },
  {
    to: '/import/data',
    text: i18n.t('Data Import'),
  },
  {
    to: '/import/gml',
    text: i18n.t('GML Import'),
  },
  {
    to: '/import/event',
    text: i18n.t('Event Import'),
  },
]

const exportLinks = [
  {
    to: '/export/metadata',
    text: i18n.t('Metadata Export'),
  },
  {
    to: '/export/metadata-dependency',
    text: i18n.t('Metadata Dependency Export'),
  },
  {
    to: '/export/data',
    text: i18n.t('Data Export'),
  },
  {
    to: '/export/event',
    text: i18n.t('Event Export'),
  },
]

export class SidePanel extends React.Component {
  render() {
    return (
      <Container>
        <Heading>{i18n.t('Import')}</Heading>
        <List>
          {importLinks.map(({ to, text }) => (
            <NavLink to={to} key={`import-${to}`} activeClassName="active">
              <Item>
                <Text>{text}</Text>
              </Item>
            </NavLink>
          ))}
        </List>

        <Heading>{i18n.t('Export')}</Heading>
        <List>
          {exportLinks.map(({ to, text }) => (
            <NavLink to={to} key={`export-${to}`} activeClassName="active">
              <Item>
                <Text>{text}</Text>
              </Item>
            </NavLink>
          ))}
        </List>
      </Container>
    )
  }
}

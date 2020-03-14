import React from 'react'

import Layout from '@components/Layout'
import AuthorsList from './AuthorsList.jsx'

function switchAuthors (site) {
  const sites = {
    '/': 'Dashboard',
    '/hvac': 'formularz HVAC',
    '/authors': <AuthorsList />
  }
  return sites[site] || 'Coś poszło nie tak'
}

export default function Home () {
  return (
    <Layout site={switchAuthors(window.location.pathname)} />
  )
}

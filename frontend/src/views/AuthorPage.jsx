import React from 'react'
import Marta from '@components/Authors/cards/Marta'
import Hanna from '@components/Authors/cards/Hanna'
import Kamil from '@components/Authors/cards/Kamil'
import Jakub from '@components/Authors/cards/Jakub'
import Karol from '@components/Authors/cards/Karol'
import NotExistingAuthor from '@components/Authors/cards/NotExistingAuthor'

function switchAuthors (id) {
  const authors = {
    1: <Marta />,
    2: <Hanna />,
    3: <Kamil />,
    4: <Jakub />,
    5: <Karol />
  }
  return authors[id] || <NotExistingAuthor />
}

export default function AuthorPage (props) {
  return (
    switchAuthors(props.match.params.id)
  )
}

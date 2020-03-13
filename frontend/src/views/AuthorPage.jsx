import React from 'react'
import Marta from '@components/Authors/Marta'
import Hanna from '@components/Authors/Hanna'
import Kamil from '@components/Authors/Kamil'
import Jakub from '@components/Authors/Jakub'
import Karol from '@components/Authors/Karol'
import NotExistingAuthor from '@components/Authors/NotExistingAuthor'

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

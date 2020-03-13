import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchAuthorsRequest, fetchAuthorsCancel } from '@data/actions/author'
import CustomList from '@components/List'

export default function AuthorsList () {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAuthorsRequest())
    return () => {
      dispatch(fetchAuthorsCancel())
    }
  }, [dispatch])

  const { fetchError, fetching, authors } = useSelector((state) => state.author)

  if (fetching) {
    return <div>Loading...</div>
  }

  if (fetchError) {
    return <div>{fetchError.message}</div>
  }
  return (
    <>
      {
        authors
          ? <CustomList
            array={authors}
            renderItem={(author) => (
              <CustomList.Tile key={author.id}>
                {author}
              </CustomList.Tile>
            )}
          >
            <CustomList.Header title='Authors' />
          </CustomList>
          : <div>No authors available</div>
      }
    </>
  )
}

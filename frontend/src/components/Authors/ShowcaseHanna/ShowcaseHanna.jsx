import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import { fetchAuthorRequest, fetchAuthorCancel } from '@data/actions/author';
import Showcase from '@components/Authors/ShowcaseHanna/Showcase.jsx';

export default function ShowcaseHanna (props) {
  const dispatch = useDispatch();
  const { id = '1', name = '', github = '', avatar = '' } = props;

  useEffect(() => {
    dispatch(fetchAuthorRequest(id));
    return () => {
      dispatch(fetchAuthorCancel())
    }
  }, [dispatch]);

  const { 
    fetchSingleError, 
    fetchingSingle, 
    author 
  } = useSelector((state) => state.author);

  if (fetchingSingle) {
    return <div>Loading...</div>
  }

  if (fetchSingleError) {
    return <div>{fetchSingleError.message}</div>
  }
 
  return (
    <>
      {
        author ?
        <Showcase>
          <Showcase.Section>
            <Showcase.Section.Header title="Fetched Info" />
            { 
              Object.keys(author).map((key) => (
                <Showcase.Section.InfoField 
                  infoName={key} 
                  infoValue={author[key]} />
              ))
            }
          </Showcase.Section>
          <Showcase.Section>
            <Showcase.Section.Header title="Address" />
            <Showcase.Section.InfoField infoName="Street" infoValue="Przykładowa" />
            <Showcase.Section.InfoField infoName="Home" infoValue="13" />
            <Showcase.Section.InfoField infoName="Zip code" infoValue="99-999" />
            <Showcase.Section.InfoField infoName="Phone number" infoValue="111 222 333" />
          </Showcase.Section>
          <Showcase.Section>
            <Showcase.Section.Header title="Languages" />
            <Showcase.Section.InfoField infoName="Polish" infoValue="*****" />
            <Showcase.Section.InfoField infoName="English" infoValue="***" />
            <Showcase.Section.InfoField infoName="German" infoValue="***" />
            <Showcase.Section.InfoField infoName="Spanish" infoValue="" />
          </Showcase.Section>
          <Showcase.Section>
            <Showcase.Section.Header title="Hobby" />
            <Showcase.Section.InfoField infoName="Cooking" infoValue="*****" />
            <Showcase.Section.InfoField infoName="Caligraphing" infoValue="***" />
            <Showcase.Section.InfoField infoName="Drinking coffee" infoValue="*****" />
          </Showcase.Section>
        </Showcase> :
        <div>No author showcase available :(</div>
      }
    </>
  )
}

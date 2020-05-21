import React from 'react'
import styled from 'styled-components'
import hoverCss from './hoverCss'

const Wrapper = styled.nav`
  margin: 0 auto;
  padding: 0.5rem;
  text-align: center;
  border-bottom: 1px solid #e9ecef;
  margin-bottom: 1.0rem;
  transition: 0.4s; /* Adds a transition effect when the padding is decreased */
  position: fixed;
  width: 100%;
  background-color: white;
`


const Title = styled.div`
  display: inline-block;
  font-weight: bold;
  font-size: 1.3rem;
  margin: 0.2rem 0;
  padding: 0.25rem 0.5rem;
  ${hoverCss}
`

const NavList = styled.ul`
  color: #333333;
  font-size: 0.8rem;
  line-height: 1.2rem;
  margin: 0;
  li {
    display: inline;
  }
`

const OutLink = styled.a`
  text-decoration: none;
  color: inherit;
  padding: 0.25rem;
  margin: 0.25rem;
  ${ hoverCss}
`
const Profile = () => (
  <Wrapper>
      <Title>
        <a
          href='/'
          style={{ textDecoration: `none`, color: `inherit` }}>Jaehyun Baek
        </a>
      </Title>
      <NavList>
        <li>
        <OutLink href="/" >home</OutLink>
        </li>
      ·
      <li>
      <OutLink href="/wiki" >wiki</OutLink>
      </li>
      ·
      <li>
      <OutLink href="/about" >about</OutLink>
      </li>
      ·
      <li>
      <OutLink href="/search" >search</OutLink>
      </li>
      </NavList>    
  </Wrapper>
)

export default Profile;

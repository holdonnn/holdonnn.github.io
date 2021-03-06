import React from 'react'
import { graphql } from 'gatsby'

import styled from 'styled-components'
import Layout from '../component/Layout';


const Wrapper = styled.div`
  margin: 0 auto;
  text-align: center;
  max-width: 480px;
`;

const AboutPage = ({ data }) => (
  <Layout>
    <Wrapper>
      <br/>
      <br/>
      <a href="https://bit.ly/jaehyunbaek">linkedin</a>
      <br/>
      <a href="https://github.com/byjay">github</a>
      <br/>
      <a href="mailto:jaehyunbaek.engineer@gmail.com">jaehyunbaek.engineer@gmail.com</a><br/>
    </Wrapper>
  </Layout>
)

export default AboutPage

export const query = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

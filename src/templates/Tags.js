import React, { Fragment } from 'react'
import { css } from '@emotion/core'
import { graphql, Link } from 'gatsby'
import Seo from '../components/Seo'
import { bs } from '../shevy'
import AddedValue from '../components/AddedValue'

const linkStyles = css`
  display: block;
  margin-bottom: ${bs(0.5)};
`
const Tags = ({ data, ...props }) => {
  const posts = data.allMdx.edges.map(edge => edge.node)
  const { tag } = props.pageContext

  return (
    <Fragment>
      <Seo title={`${tag} | Tags`} />

      <h1>{tag}</h1>

      <div>
        {posts.map(post => {
          const { slug, title } = post.frontmatter

          return (
            <Link key={slug} css={linkStyles} to={slug}>
              {title}
            </Link>
          )
        })}
      </div>
      <AddedValue />
    </Fragment>
  )
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMdx(
      filter: {
        fileAbsolutePath: { regex: "/posts/" }
        frontmatter: { tags: { in: [$tag] } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
          }
        }
      }
    }
  }
`

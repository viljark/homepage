import React from 'react'
import { Link, graphql } from 'gatsby'
import Masonry from 'react-masonry-component'
import Img from 'gatsby-image'
import Layout from "../components/layout"
import {formatDate} from "../utils/formatters";

const IndexPage = ({ data }) => {
    data.allDatoCmsWork.edges = data.allDatoCmsWork.edges.sort(function(a,b){
        return new Date(b.node.meta.createdAt) - new Date(a.node.meta.createdAt);
    });
    return (
        <Layout>
            <Masonry className="showcase" >
                {data.allDatoCmsWork.edges.map(({ node: work }) => (
                    <div key={work.id} className="showcase__item">
                        <figure className="card">
                            <Link to={`/post/${work.slug}`} className="card__image">
                                <Img fluid={work.coverImage.fluid} className="filter-aden" />
                            </Link>
                            <figcaption className="card__caption">
                                <h6 className="card__title">
                                    <Link to={`/post/${work.slug}`}>{work.title}</Link>
                                </h6>
                                <p className="card__date">
                                    {formatDate(work.meta.createdAt)}
                                </p>
                                <div className="card__description">
                                    <Link to={`/post/${work.slug}`}>
                                        <p>{work.excerpt}</p>
                                    </Link>
                                </div>
                            </figcaption>
                        </figure>
                    </div>
                ))}
            </Masonry>
        </Layout>
    )
}

export default IndexPage

export const query = graphql`
  query IndexQuery {
    allDatoCmsWork(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          title
          slug
          excerpt
          meta {
            createdAt
          }
          coverImage {
            fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  }
`

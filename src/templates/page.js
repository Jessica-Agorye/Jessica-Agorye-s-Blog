import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import { Layout } from '../components/index';
import SEO from '../components/Seo';
import { htmlToReact, withPrefix } from '../utils';

// this minimal GraphQL query ensures that when 'gatsby develop' is running,
// any changes to content files are reflected in browser
export const query = graphql`
  query($url: String) {
    sitePage(path: {eq: $url}) {
      id
    }
  }
`;

export default class Page extends React.Component {
  render() {
    let twitter = "";
    if (
      _.get(this.props, "pageContext.site.siteMetadata.footer.has_social") &&
      _.get(this.props, "pageContext.site.siteMetadata.footer.social_links")
    ) {
      let social_links = _.get(
        this.props,
        "pageContext.site.siteMetadata.footer.social_links"
      );
      twitter =
        "@" +
        social_links
          .find((element) => element.label === "Twitter")
          .url.split("/")
          .pop();
      }
      return (
        <Layout {...this.props}>
          <SEO
            title={_.get(this.props, "pageContext.frontmatter.title")}
            description={_.get(this.props, "pageContext.frontmatter.excerpt")}
            image={_.get(this.props, "pageContext.frontmatter.image")}
            pathname={this.props.location.pathname}
            author={twitter}
          />
          <article className="post page post-full">
            <header className="post-header inner-md">
              <h1 className="post-title">{_.get(this.props, 'pageContext.frontmatter.title', null)}</h1>
              {_.get(this.props, 'pageContext.frontmatter.subtitle', null) && (
                <div className="post-subtitle">
                  {htmlToReact(_.get(this.props, 'pageContext.frontmatter.subtitle', null))}
                </div>
              )}
            </header>
            {_.get(this.props, 'pageContext.frontmatter.img_path', null) && (
              <div className="post-thumbnail">
                <img className="thumbnail" src={withPrefix(_.get(this.props, 'pageContext.frontmatter.img_path', null))} alt={_.get(this.props, 'pageContext.frontmatter.title', null)} />
              </div>
            )}
            <div className="post-content inner-md">
              {htmlToReact(_.get(this.props, 'pageContext.html', null))}
            </div>
          </article>
        </Layout>
      );
    }
  }

import React from "react";
import styled from "styled-components";
import CommonPageLayout from "../../components/Layout/CommonPageLayout";

import client from "../../database/sanity";
import BlockContent from "@sanity/block-content-to-react";

const StyledContent = styled.div``;

const serializers = {
  types: {
    table: (props) => (
      <table>
        <tbody>
          {props.node.rows.map((row) => (
            <tr>
              {row.cells.map((cell) => (
                <td>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    ),
  },
};

const CommonPage = ({ post, toc }) => {
  console.log(toc);
  return (
    <CommonPageLayout toc={toc}>
      {/* <StyledContent>content</StyledContent> */}
      <h1>{post.title}</h1>
      <BlockContent blocks={post.body} serializers={serializers} />
    </CommonPageLayout>
  );
};

export async function getStaticPaths() {
  const slugs = await client.fetch(
    `*[_type == "singlePage" && categories == "vi-sao-chon-khai-tam"]{slug}`
  );

  const paths = slugs.map((slug) => ({
    params: {
      slug: slug.slug.current,
    },
  }));

  console.log(paths);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  let doc = await client.fetch(
    `*[_type == "singlePage" && slug.current == $slug]{body[]{..., "asset": asset->}}[0]`,
    { slug }
  );

  console.log("DOC", doc);

  function generateToc(post) {
    // doc.body.forEach((block) => {
    //   console.log(block);
    //   console.log("/n--------------------------------");
    // });
    let toc = [];
    let heading = ["h1", "h2", "h3", "h4"];

    post.body.forEach((block, index) => {
      if (block._type === "block" && heading.indexOf(block.style) !== -1) {
        toc.push({
          label: block.children[0].text,
          key: block._key,
          indent: parseInt(block.style[1]),
        });
      }
    });
    // console.log("TABLE OF CONTENT", toc);
    return toc;
  }

  let toc = generateToc(doc);

  return {
    props: {
      post: doc,
      toc,
    },
  };
}

export default CommonPage;

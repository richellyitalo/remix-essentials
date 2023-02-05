import { Link } from "@remix-run/react";
import { Col, Row } from "react-grid-system";
import { CATEGORIES, POSTS } from "~/../data/dummy";
import PostsList from "~/components/site/post/PostList";

const category = CATEGORIES[0];

export default function CategoriesDetailPage() {
  return (
    <>
      <Row>
        <Col sm={8}>
          <h1 className="font-bold text-lg border-b">
            Posts of {category.name}
          </h1>
        </Col>
        <Col
          sm={4}
          className="text-right"
        >
          <Link
            to=".."
            className="hover:underline text-blue-500"
            relative="path"
          >
            back to Categories
          </Link>
        </Col>
      </Row>
      <PostsList posts={POSTS} />
    </>
  );
}

import {
  Outlet,
  useLocation
} from "@remix-run/react";
import SiteHeader from "~/components/nav/SiteHeader";
import { Row, Col } from "react-grid-system";

import { CATEGORIES as categories, POSTS as posts } from "~/../data/dummy";
import Sidebar from "~/components/site/shared/Sidebar/Sidebar";


export default function SiteLayout() {
  const location = useLocation();

  const isCategoriesPage = ["/categories", "/categories/"].includes(
    location.pathname
  );

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <SiteHeader />

      <Row>
        <Col sm={9}>
          <Outlet />
        </Col>

        <Col sm={3}>
          {isCategoriesPage ? (
            <Sidebar posts={posts.slice(0, 4)} />
          ) : (
            <Sidebar categories={categories} />
          )}
        </Col>
      </Row>
    </div>
  );
}

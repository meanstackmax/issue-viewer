import { FC, Fragment } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { BreadcrumbProps } from "./types";

export const Breadcrumb: FC<BreadcrumbProps> = ({ paths }) => (
  <Row className="align-items-center p-3">
    {paths.map((path, idx) => (
      <Fragment key={`${path.name}-${idx}`}>
        {paths.indexOf(path) !== paths.length && idx !== 0 && (
          <Col sm="auto">/</Col>
        )}
        <Col sm="auto">
          <Button
            variant="link"
            href={path.link}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            style={{ fontWeight: 700 }}
          >
            {path.name}
          </Button>
        </Col>
      </Fragment>
    ))}
  </Row>
);

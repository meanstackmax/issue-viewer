import {
  FC,
  useContext,
  useEffect,
  useState,
  useCallback,
  ChangeEvent,
  FormEvent,
} from "react";
import { IssuesContext } from "context";
import { Button, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";

export const SearchInput: FC = () => {
  const context: any = useContext(IssuesContext);
  const [search, setSearch] = useState("");

  useEffect(() => {
    void context.fetchRepo();
  }, []);

  useEffect(() => {
    const repoName = context?.repo?.data?.name;

    if (repoName) {
      void context.fetchIssues(repoName);
    }
  }, [context?.repo?.data]);

  const handleSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [context],
  );

  const handleSearchSubmit = useCallback(
    (e: FormEvent) => {
      void e.preventDefault();
      void context.fetchRepo(search);
    },
    [search],
  );

  return (
    <Form onSubmit={handleSearchSubmit} noValidate>
      <Row className="align-content-center p-3">
        <Col sm="10">
          <Form.Control
            value={search}
            className="mb-2"
            id="form-input"
            placeholder="Repo Url"
            onChange={handleSearchChange}
          />
        </Col>
        <Col sm="2">
          <Button variant="primary" type="submit">
            Load Issues
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

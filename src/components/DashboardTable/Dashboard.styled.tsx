import styled from "@emotion/styled";
import { Col, Row } from "react-bootstrap";

const TableWrapper = styled.div`
  background-color: #ebeded;
  width: inherit;
  min-height: 560px;
  opacity: ${({ loading = false }: { loading: boolean }) =>
    loading ? "0.2" : 1};
  padding-top: 24px;
  padding-left: 16px;
  padding-right: 16px;
  pointer-events: ${({ loading = false }: { loading: boolean }) =>
    loading ? "none" : "auto"};
`;

const StyledHeading = styled(Col)`
  font-size: 24px;
  font-weight: 700;
  color: black;
  text-align: left;
`;

const StyledTitle = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #464545;
`;

const StyledSubtitle = styled.span`
  font-size: 8px;
  font-weight: 400px;
  color: #999896;
  margin-top: 4px;
`;

const Card = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 8px;
`;

const Column = styled(Row)`
  min-height: 300px;
`;

export {
  TableWrapper,
  StyledHeading,
  StyledTitle,
  StyledSubtitle,
  Card,
  Column,
};

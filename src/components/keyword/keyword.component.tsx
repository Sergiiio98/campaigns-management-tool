import Badge from "react-bootstrap/Badge";
import "./keyword.styles.scss";

interface IKeyword {
  name: string;
}

const Keyword = ({ name }: IKeyword) => {
  const renderBadge = (arg: string) => {
    switch (arg) {
      case "IT":
        return (
          <span className="badge">
            <Badge bg="secondary">{name}</Badge>
          </span>
        );
      case "Food":
        return (
          <span className="badge">
            <Badge bg="warning">{name}</Badge>
          </span>
        );
      case "Entertaiment":
        return (
          <span className="badge">
            <Badge bg="primary">{name}</Badge>
          </span>
        );
      case "Chiarity":
        return (
          <span className="badge">
            <Badge bg="info">{name}</Badge>
          </span>
        );
      case "Social":
        return (
          <span className="badge">
            <Badge bg="success">{name}</Badge>
          </span>
        );
      default:
        return (
          <span className="badge">
            <Badge bg="primary">{name}</Badge>
          </span>
        );
    }
  };
  return renderBadge(name);
};
export default Keyword;

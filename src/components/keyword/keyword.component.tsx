import Badge from "react-bootstrap/Badge";

interface IKeyword {
  name: string;
}

const Keyword = ({ name }: IKeyword) => {
  const bg_map: { [key: string]: string } = {
    IT: "secondary",
    Food: "warning",
    Entertainment: "primary",
    Charity: "info",
    Social: "success",
    default: "primary",
  };

  return (
    <span className="badge">
      <Badge bg={bg_map[name]}>{name}</Badge>
    </span>
  );
};

export default Keyword;

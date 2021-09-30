const Card = ({ title, operations }) => {
  const amount = operations.reduce(
    (acum, operation) => (acum += Number(operation.amount)),
    0
  );
  return (
    <div className="bg-white py-2 px-5 mx-5 my-3 rounded">
      <div>{title}</div>
      <div>$ {amount}</div>
    </div>
  );
};

export default Card;

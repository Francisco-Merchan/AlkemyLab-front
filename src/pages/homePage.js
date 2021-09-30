import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import clientAxios from "../config/clientAxios";
import Card from "../components/Cards/cards";
import ListOperations from "../components/ListOperations/listOperations";

const HomePage = () => {
  const history = useHistory();

  const [operations, setOperations] = useState([]);

  const getOperations = async () => {
    const { data } = await clientAxios.get(`/operations`);
    setOperations(data.data);
  };

  useEffect(() => {
    getOperations();
  }, [operations]);

  const income = operations.filter((operation) => operation.type === "Entry");
  const expenses = operations.filter(
    (operation) => operation.type === "Egress"
  );

  return (
    <>
      <div className="container mx-auto vh-100">
        <div className="cardsContainer d-flex flex-wrap justify-content-around align-items-center">
          <Card title={"Ingresos"} operations={income} />
          <Card title={"Egresos"} operations={expenses} />
        </div>
        <div className="ListContainer mx-auto">
          <h3 className="p-3 mt-4">Mis gastos</h3>
          <button
            type="button"
            className="btn btn-success my-3"
            onClick={() => {
              history.push("/create");
            }}
          >
            Nueva Operacion
          </button>
          {operations.length !== 0 ? (
            <ListOperations operations={operations} />
          ) : (
            <h3 className="text-center py-3"> No hay Operaciones</h3>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;

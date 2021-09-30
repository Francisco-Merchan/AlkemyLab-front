import { useHistory } from "react-router";
import clientAxios from "../../config/clientAxios";

const ListOperations = ({ operations }) => {
  const history = useHistory();

  const deleteOperation = async (id) => {
    await clientAxios.delete(`/operations/${id}`);
  };

  return (
    <>
      <ul className="list-group">
        {operations.map((operation) => (
          <li
            className="list-group-item d-flex align-items-center justify-content-center"
            key={operation._id}
          >
            <div className="w-50">
              {operation.concept} / {operation.type} / ${operation.amount} /{" "}
              {operation.date}
            </div>
            <div>
              <button
                onClick={() => {
                  history.push(`/edit/${operation._id}`);
                }}
                type="button"
                className="btn btn-warning m-1"
              >
                Editar
              </button>
              <button
                type="button"
                className="btn btn-danger m-1"
                onClick={() => {
                  deleteOperation(operation._id);
                }}
              >
                Borrar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListOperations;

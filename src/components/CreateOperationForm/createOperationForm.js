import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import clientAxios from "../../config/clientAxios";

const CreateOperationForm = ({ isEdit }) => {
  const history = useHistory();
  const { id } = useParams();
  const [operationData, setOperationData] = useState({
    concept: "",
    amount: "",
    date: "",
    type: "",
  });
  const [message, setMessage] = useState(null);

  const { concept, amount, date, type } = operationData;

  const handleOnchange = (e) => {
    setOperationData({
      ...operationData,
      [e.target.name]: e.target.value,
    });
  };

  const getOperationById = async () => {
    const { data } = await clientAxios.get(`/operations/${id}`);
    console.log(data.data);
    setOperationData({
      concept: data.data.concept,
      amount: data.data.amount,
      date: data.data.date,
    });
  };

  useEffect(() => {
    if (id) {
      getOperationById();
    }
  }, []);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await clientAxios.put(`/operations/${id}`, operationData);
      history.goBack();
    } else {
      const data = await clientAxios.post("/operations", operationData);
      if (data.status === 201) {
        history.goBack();
      } else {
        setMessage("No se pudo crear la operacion");
      }
    }
  };

  return (
    <form className="d-flex flex-column" onSubmit={handleOnSubmit}>
      <h1 className="py-3">
        {isEdit ? "Editar Operacion" : "Crear Operacion"}
      </h1>
      <label>Concepto</label>
      <input
        className="my-3"
        type="text"
        name="concept"
        value={concept}
        onChange={handleOnchange}
      />
      <label>Monto</label>
      <input
        className="my-3"
        type="text"
        name="amount"
        value={amount}
        onChange={handleOnchange}
      />
      <label>Fecha</label>
      <input
        className="my-3"
        type="date"
        name="date"
        value={date}
        onChange={handleOnchange}
      />
      {isEdit ? (
        ""
      ) : (
        <>
          <label>Tipo de operacion</label>
          <div>
            <input
              className="m-2"
              type="radio"
              name="type"
              value={"Entry"}
              onChange={handleOnchange}
            />
            <span>Ingreso</span>
            <input
              className="m-2"
              type="radio"
              name="type"
              value={"Egress"}
              onChange={handleOnchange}
            />
            <span>Egreso</span>
          </div>
        </>
      )}
      <div className="d-flex justify-content-between py-3">
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            history.goBack();
          }}
        >
          Volver
        </button>
        <button type="submit" className="btn btn-primary">
          {isEdit ? "Editar" : "Crear"}
        </button>
      </div>
      {message && <p>{message}</p>}
    </form>
  );
};

export default CreateOperationForm;

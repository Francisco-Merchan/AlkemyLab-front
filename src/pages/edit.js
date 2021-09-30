import CreateOperationForm from "../components/CreateOperationForm/createOperationForm";

const Edit = () => {
  return (
    <>
      <div className="container d-flex vh-100 align-items-center justify-content-center">
        <CreateOperationForm isEdit />
      </div>
    </>
  );
};

export default Edit;

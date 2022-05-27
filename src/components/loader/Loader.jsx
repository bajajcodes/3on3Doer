function Loader({ message }) {
  return (
    <>
      <div className="loader"></div>
      <h1 className="loader-text">{message}</h1>
    </>
  );
}

export { Loader };

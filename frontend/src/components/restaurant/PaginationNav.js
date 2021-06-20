const PaginationNav = ({ page, total, prev, next }) => {


  return (
    <nav aria-label="Page navigation" className="row justify-content-center my-5">
      <ul className="pagination align-items-center">
        <li className="page-item">
          <button
            className="btn btn-outline-primary"
            type="button"
            disabled={page === 1}
            onClick={prev}
          >
            Prev
          </button>
        </li>
        <li className="page-item mx-3 text-primary">{page}/{total}</li>
        <li className="page-item disabled">
          <button
            className="btn btn-outline-primary"
            type="button"
            disabled={page === total}
            onClick={next}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default PaginationNav
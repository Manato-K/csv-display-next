import { useState } from "react";
import Papa from "papaparse";

export default function Home() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result: any) => {
          setData(result.data);
          setCurrentPage(0); // Reset to the first page
        },
      });
    }
  };

  const itemsPerPage = 20;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageChange = (pageIndex: any) => {
    setCurrentPage(pageIndex);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">CSV File Viewer</h1>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="form-control mb-4"
      />

      {data.length > 0 && (
        <>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  {Object.keys(data[0]).map((column, index) => (
                    <th key={index}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.keys(row).map((column, colIndex) => (
                      <td key={colIndex}>{row[column]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <nav>
            <ul className="pagination justify-content-center">
              {[...Array(totalPages)].map((_, pageIndex) => (
                <li
                  key={pageIndex}
                  className={`page-item ${
                    pageIndex === currentPage ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(pageIndex)}
                  >
                    {pageIndex + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}

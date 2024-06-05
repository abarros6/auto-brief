function Navbar ({uploadOnClick, handleFileChange, exportAsPDF, clearDocument, exportDocument, exportAsDOCX, uploaded}) {
    return ( 
        <div className="navbar rounded-md bg-secondary">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li>
                        <a>Parent</a>
                        <ul className="p-2">
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                        </ul>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl" href="/">Auto-Brief</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal gap-2">
                    <div>
                        <button
                            onClick={uploadOnClick}
                            className='btn btn-primary m-1'
                            disabled={uploaded}
                        >
                            Upload PDF
                        </button>
                        
                        <input className='file-input file-input-bordered file-input-primary  max-w-x' type="file" accept=".pdf" onChange={handleFileChange} />
                        
                    </div>
                </ul>
            </div>
            <div className="navbar-end hidden lg:flex">
                <details className="dropdown dropdown-end">
                    <summary className="m-1 btn bg-primary">Editable Document Options</summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                        <li>
                            <button className='btn btn-primary m-1' onClick={exportAsPDF}>
                                Export as PDF
                            </button>
                        </li>
                        <li>
                            <a className='btn btn-primary m-1' onClick={exportDocument}>
                                Export as file
                            </a>
                        </li>
                        <li>
                            <a className='btn btn-primary m-1' onClick={exportAsDOCX}>
                                Export as DOCX
                            </a>
                        </li>
                        <li>
                            <a className='btn btn-primary m-1' onClick={clearDocument}>
                                Clear Document
                            </a>
                        </li>
                    </ul>
                </details>
            </div>
        </div>
    )
}

export default Navbar
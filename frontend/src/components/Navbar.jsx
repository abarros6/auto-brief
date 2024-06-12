import { useState } from "react";

function Navbar ({pdf, uploadOnClick, handleFileChange, exportAsPDF, clearDocument, exportDocument, exportAsDOCX, uploaded}) {

    const [currentCitation, setCurrentCitation] = useState(1);

    const goToNextCitation = () => {
        setCurrentCitation(currentCitation + 1);
    }

    const goToPreviousCitation = () => {
        setCurrentCitation(currentCitation - 1);
    }

    const closeMenu = () => {
        document.getElementById("my-drawer-3").checked = false;
    }

    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
            <div className="drawer-content flex flex-col">
                <div className="navbar rounded-md bg-secondary mb-2">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div> 
                    <div className="navbar-start ">
                        <a className="btn btn-ghost text-xl" >Auto-Brief</a>
                        {/* <a className = "btn btn-primary"   href={`#citation-${currentCitation}`}>Next Citation</a>
                        <a className = "btn btn-primary"   href={`#citation-${currentCitation}`}>Last Citation</a> */}
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal gap-2">
                            <div>
                                <button
                                    onClick={uploadOnClick}
                                    className='btn btn-primary m-1'
                                    disabled={uploaded || pdf === null}
                                >
                                    Upload PDF
                                </button>
                                
                                <input className='file-input file-input-bordered file-input-primary' type="file" accept=".pdf" onChange={handleFileChange} />
                                
                            </div>

                            <a
                                onClick={goToPreviousCitation}
                                className='btn btn-primary m-1'
                                disabled={pdf === null}
                                href={`#citation-${currentCitation}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                    <path d="M12 1L1 15h10v8h4v-8h10L12 1z"/>
                                </svg>
                            </a>
                            <a
                                onClick={goToNextCitation}
                                className='btn btn-primary m-1'
                                disabled={pdf === null}
                                href={`#citation-${currentCitation}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                    <path d="M12 23L23 9h-10v-8h-4v8H1l11 14z"/>
                                </svg>
                            </a>
                            <div className="flex items-center">
                                <h1 className="text-xl font-bold" >Citation {currentCitation}</h1>
                            </div>
                        </ul>
                    </div>
                    <div className="navbar-end hidden lg:flex" >
                        <details className="dropdown dropdown-end">
                            <summary className="m-1 btn bg-primary">Editable Document Options</summary>
                            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                                <li>
                                    <button disabled={!uploaded} className='btn btn-primary m-1' onClick={exportAsPDF}>
                                        Export as PDF
                                    </button>
                                </li>
                                <li>
                                    <button disabled={!uploaded} className='btn btn-primary m-1' onClick={exportDocument}>
                                        Export as file
                                    </button>
                                </li>
                                <li>
                                    <button disabled={!uploaded} className='btn btn-primary m-1' onClick={exportAsDOCX}>
                                        Export as DOCX
                                    </button>
                                </li>
                                <li>
                                    <button disabled={!uploaded} className='btn btn-primary m-1' onClick={clearDocument}>
                                        Clear Document
                                    </button>
                                </li>
                                
                            </ul>
                        </details>
                    </div>
                </div>
            </div> 
            <div className="drawer-side z-50">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
                <ul className="menu w-full min-h-full bg-base-300 flex justify-center">
                    <li>
                        <button className='btn btn-primary m-auto w-3/4' onClick={closeMenu}>
                            Close Menu
                        </button>
                    </li>
                    <li>
                        <button disabled={!uploaded} className='btn btn-primary m-auto w-3/4 my-4' onClick={exportAsPDF}>
                            Export as PDF
                        </button>
                    </li>
                    <li>
                        <button disabled={!uploaded} className='btn btn-primary m-auto w-3/4' onClick={exportDocument}>
                            Export as file
                        </button>
                    </li>
                    <li>
                        <button disabled={!uploaded} className='btn btn-primary m-auto w-3/4 my-4' onClick={exportAsDOCX}>
                            Export as DOCX
                        </button>
                    </li>
                    <li>
                        <button disabled={!uploaded} className='btn btn-primary m-auto w-3/4' onClick={clearDocument}>
                            Clear Document
                        </button>
                    </li>
                    <li className="flex flex-row m-auto my-4 w-3/4">
                        <input className='file-input file-input-bordered file-input-primary w-3/4' type="file" accept=".pdf" onChange={handleFileChange} />
                        <button
                            onClick={uploadOnClick}
                            className='btn btn-primary w-1/4'
                            disabled={uploaded || pdf === null}
                        >
                            Upload PDF
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
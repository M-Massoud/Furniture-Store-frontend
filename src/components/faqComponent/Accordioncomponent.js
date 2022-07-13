function Accordion(props) {
    return (
        <>
             {/* ////////////////////////////// */}
             <div className="accordion-item">
                  <h2 className="accordion-header" id={props.QusetionID}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                        data-bs-target={`#${props.bodyID}`}
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                       <strong>  {props.Question}</strong>
                    </button>
                  </h2>
                  <div
                    id={props.bodyID}
                    className="accordion-collapse collapse"
                    aria-labelledby={props.QusetionID}
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                        { props.body}
                    </div>
                  </div>
                </div>
                              {/* ////////////////////////////// */}
        </>
    );
};


export default Accordion;
function ItemImg(props) {
    return (
        <>
            {/* <div className=" "> */}
            <div className={ props.divclass}>
                    <img src={props.src} alt={props.alt} title={props.title} className={props.class} />
                    <h6 className="text-center col-12  mt-3">{props.name }</h6>
            </div>    
            {/* </div> */}
        </>
    );
};


export default ItemImg;
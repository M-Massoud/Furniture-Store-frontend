function Leftimg(props) {
    return (
        <>
            <div className=" rounded-4">
               <div className="imgcontainer rounded-4 shadow"> <img src={props.src} alt={props.alt} title={props.title} className={props.class} /></div> 
                <h5 className="text-center col-12  mt-3">{props.name }</h5>
            </div>
            
        </>
    );
};

export default Leftimg;
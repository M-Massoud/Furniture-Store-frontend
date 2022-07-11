function Rightimg(props) {
    return (
        <>
            <div className={ props.divclass}>
                <div className="imgcontainer rounded-4 shadow">
                <img src={props.src} alt={props.alt} title={props.title} className={props.class} />
                </div>
                <h5 className="text-center col-12  mt-4 ">{props.name }</h5>
            </div>
        </>
    );
};

export default Rightimg;
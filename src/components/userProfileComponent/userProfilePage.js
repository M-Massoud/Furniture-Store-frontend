function UserProfile({ userData }) {
    return (
        <>
            <div className="container m-auto  row flex-wrap">
                <div className="col-11 m-auto col-md-4 mt-2 mt-md-3 mb-2 mb-md-3  p-5 shadow rounded ">
                    <div className=" m-auto text-center ">
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuoo6sKRiK25j45Ir_uLe2hi6YX5VAZg2fmA&usqp=CAU' alt="userImg" title="userImg" />
                    </div>
                    <h6 className="text-center p-2">Wellcome Back {userData.firstName} </h6>
                    <h3 className="text-center border p-2 shadow bg-white rounded">{userData.firstName + ' ' + userData.lastName}</h3>

                    <div className="  p-2  m-auto mt-5 mt-3 " >
                        <div className="border shadow text-center col-md-12 m-auto rounded py-3 bg-white "> <strong>wishList</strong>
                            <div className="col-md-11 m-auto text-center my-3 "> You have {userData.wishList.length} items in your wish list.</div>
                        </div>
                    </div>
                </div>
                <div className=" col-11 m-auto mt-4 mb-4 mb-md-3 mt-md-3 col-md-7 offset-md-1  p-5 shadow rounded">
                    <h3 className=" shadow p-3  m-auto rounded "> Information </h3>
                    <div className=" mt-4 p-3 shadow rounded bg-white">
                        <h5> Email : </h5> <h6>{userData.email}</h6>
                    </div>
                    <div className=" mt-4 p-3 shadow rounded bg-white">
                        <h5> Phone : </h5> <h6> +(02) {userData.mobile} </h6>
                    </div>
                    <div className=" mt-4 p-3 shadow rounded bg-white">
                        <h5> Address : </h5> <h6> {userData.address.city + ',' + userData.address.street + ',' + userData.address.building} </h6>
                    </div>
                    <div className=" mt-4 p-3 shadow rounded bg-white">
                        <h5> Orders status : </h5> <h6 className="text-center"> {userData.orders.length} </h6>
                    </div>
                </div>
            </div>

        </>
    )
};

export default UserProfile;
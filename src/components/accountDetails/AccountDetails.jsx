import "./accountDetails.css";

export default function AccountDetails() {

    return (

        <div className="account-details">
            <div className="socials-container">
                <div className="details-heading">
                </div>

                <div className="cols-lg-8">
                    <div className="cards mb-4">
                        <div className="cards-body">
                            <div className="rows">
                                    <button type="button" className="btn btn-primary">Created Lobbies</button>
                            </div>
                            <div className="rows">
                                    <button type="button" className="btn btn-primary">Joined Lobbies</button>

                            </div>
                            <div className="rows">
                                    <button type="button" className="btn btn-primary">Friends</button>
                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </div>

    )


}

import React from 'react'
// import img from '../../images/1.jpg'
import './Guarntee.css'
function Guarntee() {
    return (
        <div className='Guarntee container'>
            <h1>Guarantee & After-Sales Service</h1>
            <p>Quite often, even after we’ve chosen an item and purchased it successfully, there may be some things we might want to change or repair afterward - either during or following the delivery process, when filing a return or applying for using our warranty. Here we'll try to explain in plain terms how does our store’s warranty policy works and how you can be using it when shopping with us!</p>
            {/* <p className="imgContainer"><img src={img} alt="img" /></p> */}
            <p>&nbsp;</p>
            <h2>Cases not covered by the guarantee</h2>
            <ol>
                <li>The product is not stored well. Kindly check our guide on how to store our products.</li>
                <li>Wrong installation by the customer.</li>
                <li>Product misuse.</li>
                <li>Damage caused due to wrong cleaning of products. Kindly check our guide on how to care for our products.</li>
                <li>Any damage resulting from wear and tear such as damage resulting from excess wrong use of pets, children etc.</li>
            </ol>
            <p>&nbsp;</p>
            <h2>Products NOT included in the warranty</h2>
            <ul>
                <li>Last piece products with defects stated in the invoice.</li>
            </ul>
            <p>&nbsp;</p>
            <h2>Products included in the warranty</h2>
            <ul>
                <li>
                    <h4>Living room furniture set: </h4>
                    <ol>
                        <li>Furniture Chassis - 5 years</li>
                        <li>Fabrics - 1 year</li>
                        <li>Furniture sponge - 1 year</li>
                        <li>Leather - 1 year</li>
                        <li>Mechanism - 5 years</li>
                        <li>Spring / Tape - 1 year</li>
                        <li>Fibre - 1 year</li>
                    </ol>
                </li>
                <li>
                    <h4>Bedrooms and Dining rooms: </h4>
                    <ol>
                        <li>Wood - 3 years</li>
                        <li>Hinges - 1 year</li>
                        <li>Soft closing mechanism - 1 year</li>
                        <li>Sliding mechanism - 3 years</li>
                        <li>Knobs - 5 years</li>
                        <li>Paints - 3 years</li>
                        <li>Upholstery, leather or fabric - 1 year</li>
                        <li>Natural wood for the dining chair - 3 years</li>
                        <li>Dining Chair Chassis - years</li>
                        <li>Accessories - 3 years</li>
                    </ol>
                </li>
                <li>
                    <h4>Natural wood bedrooms and dining rooms: 5 years</h4>

                </li>
            </ul>
            <p>&nbsp;</p>
            <h2>More things to know:</h2>
            <ul>
                <li>Our products -except outdoor products- are meant for home use and accordingly any damage resulting from wrong storage is not covered by the warranty.</li>
                <li>Our outdoor products can be safely stored outside but without direct exposure to sunlight. Accordingly, any damage resulting from wrong storage is not covered by the warranty.</li>
            </ul>
            <p>&nbsp;</p>
            <h2>Tips to ensure a smooth delivery process:</h2>
            <ul>
                <li>Make sure someone's home on the day of delivery.</li>
                <li>Ensure that the product can enter the house in the original packaging - the space for the ladder must be taken into account, the entrance to the property, the door of the apartment and the door of the room to be installed.</li>
                <li>Make sure to remove any obstacles such as paintings, lamps, personal valuables or other breakable objects either on the floor or hung on the wall.</li>
                <li>We need 3 days in advance to reschedule delivery.</li>
                <li>Delivery and installation is done by the same technical team in case of receiving some of the products only, as explained by the sales officer.</li>
                <li>Delivery and installation are on the same day.</li>
                <li>To ensure a smooth delivery process, please make sure to follow the mentioned points.</li>
            </ul>
        </div>
    )
}

export default Guarntee
import React from 'react'
import './ReturnPolicy.css'
function ReturnPolicy() {
    return (
        <div className="ReturnPolicy">
            <h1>Return and exchange:</h1>
            <ol>
                <li>The client changed their mind due to unappealing color combination (within 14 days + expenses)</li>
                <li>Change in sizes (within 14 days + fees)</li>
                <li> Wrong information regarding the material used (immediate exchange or return)</li>
                <li>    Difference in the material used (immediate exchange or return)
                </li>
                <li>Product defects (immediate exchange or return)</li>
                <li>Defects resulting from installation or delivery (immediate exchange or return)</li>
            </ol>
            <p>&nbsp;</p>
            
            <h3>Cases not covered by the guarantee</h3>
            <ol>
                <li>The product is not stored well by the customer</li>
                <li>Wrong installation by the customer</li>
                <li>Product misuse</li>
                <li>Damage caused due to wrong cleaning of products</li>
                <li>Any damage resulting from wear and tear (except if the damage is due to poor material)</li>
            </ol>
            <p>&nbsp;</p>
            <h3>Products included in the warranty</h3>
            <ol>
                <li>Glass</li>
                <li>Last piece products with defects stated in the invoice and is sold with a special offer due to defects</li>
                <li>Living room furniture set:</li>
                <ol>
                    <li>Furniture Chassis - 5 years</li>
                    <li> Fabrics - 1 year</li>
                    <li> Furniture sponge - 1 year</li>
                    <li> Leather - 1 year</li>
                    <li>Mechanism - 5 years</li>
                    <li>Spring / Tape - 1 year</li>
                    <li>Fibre - 1 year</li>
                </ol>
                <li>Bedrooms and Dining rooms:</li>
                <ol>
                    <li>Wood - 3 years</li>
                    <li>Hinges - 1 year</li>
                    <li>Drawer slides - 1 year</li>
                    <li>Soft closing mechanism - 1 year</li>
                    <li>Sliding mechanism - 1 year</li>
                    <li>Knobs - 1 year</li>
                    <li>Paints - 3 years</li>
                    <li>Upholstery, leather or fabric - 1 year</li>
                    <li>Natural wood for the dining chair - 3 years</li>
                </ol>
            </ol>

        </div>
    )
}

export default ReturnPolicy
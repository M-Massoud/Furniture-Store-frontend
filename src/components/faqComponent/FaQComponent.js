import Accordion from "./Accordioncomponent";
function FaqComponent() {
  return (
    <>
      <div className="row flex-wrap p-2 border rounded  ">
              <div className=" col-md-3 p-2 col-8 m-auto order-2 order-md-1  mt-md-5 mt-3 " >
                  <div className="border shadow text-center col-11 m-auto rounded py-3"> <strong>wishList</strong>
                  <div className="col-11 m-auto text-center my-3 "> You have no items in your wish list.</div>
                  </div>
        </div>
        <div className=" col-md-9 col-12 m-auto order-1 order-md-2 p-3 ">
          <div className=" col-11 m-auto">
            <h5 className="p-1"> Frequently asked questions:</h5>
            <div className=" col-11 m-auto">
              {/* ////////////////////////// */}
              <div className="accordion shadow " id="accordionExample">
                {/* ////////////////////////////// */}

                <Accordion
                  QusetionID={"headingOne"}
                  bodyID={"collapseOne"}
                  Question={`What are the types of wood used in bedrooms and dining
                    rooms?`}
                  body={`Panel wood and solid woods are both used in the
                  manufacturing of bedrooms and dining rooms depending on
                  the model type.`}
                />
                {/* ////////////////////////////// */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                    >
                      <strong> Where are your showrooms located?</strong>
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <strong>
                        We have 15 different branches located across Egypt.
                        <br></br>
                      </strong>
                      1- 6th of October: Dandy Mall & Mall of Egypt<br></br>
                      2- New Cairo: Concord Plaza & Cairo Festival City<br></br>
                      3- Nasr City: Tiba Mall & City Stars<br></br>
                      4- Mohandessin - 7&5 Geziret el Arab street, Star Capital
                      tower under city bank<br></br>
                      5- El Sherouk City - Sky Plaza Mall<br></br>
                      6- Alexandria - City Center Alexandria<br></br>
                      7- Ain Sokhna - Porto El Sokhna<br></br>
                      8- Qena<br></br>
                      9- Hurghada- Nasr Road<br></br>
                      10- El Mansoura<br></br>
                      11- Suez New Corniche<br></br>
                      12- Porto Sharm El Sheikh<br></br>
                    </div>
                  </div>
                </div>
                {/* ////////////////////////////// */}
                <Accordion
                  QusetionID={"headingThree"}
                  bodyID={"collapseThree"}
                  Question={" What are the working hours for HUB Furniture?"}
                  body={` We are open from Saturday to Thursday from 10:00 am to 10:00pm.
                    On Fridays we are open from 10:00 am to 11:30 am and then
                    from 1:30 pm to 10:00 pm.`}
                />
                {/* ////////////////////////////// */}
                {/* ////////////////////////////// */}
                <Accordion
                  QusetionID={"headingFour"}
                  bodyID={"collapseFour"}
                  Question={" Can you offer me a customized size upon request?"}
                  body={
                    "Unfortunately, we currently do not offer customization services."
                  }
                />
                {/* ////////////////////////////// */}
                <Accordion
                  QusetionID={"headingFive"}
                  bodyID={"collapseFive"}
                  Question={
                    "Are HUB Furniture products manufactured locally or globally?"
                  }
                  body={
                    "All HUB Furniture products are proudly manufactured in Egypt."
                  }
                />
                <Accordion
                  QusetionID={"headingSix"}
                  bodyID={"collapseSix"}
                  Question={
                    "Are the available installments plans directly with the bank or do you have other plans with the company?"
                  }
                  body={
                    "We have different installments plans, either through banks or financing companies. For the banks we deal with CIB, QNB, National Bank of Egypt and Banque Misr. As for the financing companies, you can obtain an installment plan through Contact, Valu, Premium Card and Souhoola."
                  }
                />
                <Accordion
                  QusetionID={"headingSeven"}
                  bodyID={"collapseSeven"}
                  Question={"What are the shipping fees?"}
                  body={
                    "We offer free delivery to Cairo, Giza, 6th of October City, Alexandria and North coast. For other governorates, the shipping fees vary."
                  }
                />
                <Accordion
                  QusetionID={"heading8"}
                  bodyID={"collapse8"}
                  Question={"Can I add an extra piece on a purchased set?"}
                  body={
                    "Yes you can purchase our products in sets or individually. "
                  }
                />
                <Accordion
                  QusetionID={"heading9"}
                  bodyID={"collapse9"}
                  Question={
                    "Is it possible to change the colors of the sofa sets?"
                  }
                  body={
                    "We currently do not have a customization service. However, we would like to listen to your color preferences in case we can do it for you."
                  }
                />
                <Accordion
                  QusetionID={"heading10"}
                  bodyID={"collapse10"}
                  Question={
                    "Do you deliver to different governorates and how much does it cost?"
                  }
                  body={
                    "Yes we deliver across all governorates but the fees varies depending on the governorate. "
                  }
                />
                <Accordion
                  QusetionID={"heading11"}
                  bodyID={"collapse11"}
                  Question={"What are the shipping fees?"}
                  body={
                    "We offer free delivery to Cairo, Giza, 6th of October City, Alexandria and North coast. For other governorates, the shipping fees vary."
                  }
                />
                <Accordion
                  QusetionID={"heading12"}
                  bodyID={"collapse12"}
                  Question={
                    "How long does it take to receive the products ordered?"
                  }
                  body={
                    "It usually takes 48 hours depending on the product's availability."
                  }
                />
                <Accordion
                  QusetionID={"heading13"}
                  bodyID={"collapse13"}
                  Question={
                    "Do I have to purchase a full set or I can purchase each item separately?"
                  }
                  body={
                    "You can purchase your items in full sets or separately, it's totally up to you!"
                  }
                />
                <Accordion
                  QusetionID={"heading14"}
                  bodyID={"collapse14"}
                  Question={
                    "Can I make an order and ask to receive it after more than a month?"
                  }
                  body={
                    "Definitely. You can make your order and schedule the date you want to receive it and leave the rest on us :)"
                  }
                />
                <Accordion
                  QusetionID={"heading15"}
                  bodyID={"collapse15"}
                  Question={
                    "Do you offer an after sales service after the warranty expires?"
                  }
                  body={
                    "Yes we gladly offer you after sales services even after the warranty period."
                  }
                />
                <Accordion
                  QusetionID={"heading16"}
                  bodyID={"collapse16"}
                  Question={
                    "n case of online orders, if the products received are not identical to what is available on the website, can I refund the products?"
                  }
                  body={
                    "In this case you can immediately refund your order, just make sure to have your receipt and the return label printed out by you and put at the top of the package."
                  }
                />
                <Accordion
                  QusetionID={"heading17"}
                  bodyID={"collapse17"}
                  Question={"How much does the delivery of my item(s) cost?"}
                  body={
                    "We offer free delivery services in Cairo, Alexandria, Hurghada and Sharm Elsheikh - places where our showrooms are located. For deliveries to any other location throughout Egypt we charge a delivery fee that varies depending on the distance to the address of your order from our main warehouse located in Cairo."
                  }
                />
                <Accordion
                  QusetionID={"heading18"}
                  bodyID={"collapse18"}
                  Question={"Will all my items be delivered together?"}
                  body={
                    "In most cases your full order will be delivered at the same time regardless of how many items you order. However, some products are delivered on our behalf by a supplier using specialized transportation, which may require an additional delivery if ordered with another item of furniture."
                  }
                />
                <Accordion
                  QusetionID={"heading19"}
                  bodyID={"collapse19"}
                  Question={"Are my goods warranted?"}
                  body={
                    "All products sold on this website come with a full 3 years warranty."
                  }
                />
                <Accordion
                  QusetionID={"heading20"}
                  bodyID={"collapse20"}
                  Question={
                    "How can I make sure that my furniture fits my space?"
                  }
                  body={
                    "To avoid disappointment, please make sure that the item (s) you intend to purchase can fit into your home and chosen location. The size of each product is shown on our website so that you can take measurements and confirm.  If you are unsure in any way, please visit your nearest store and discuss any possible restrictions so that we can perform a risk assessment with you. Please measure all the spaces which need to be passed through during delivery: vehicle access, lifts, entryways, staircase, turning corners etc. If windows or doors need to be removed in order for access to be gained it is your responsibility to arrange this at your cost and risk."
                  }
                />
                <Accordion
                  QusetionID={"heading21"}
                  bodyID={"collapse21"}
                  Question={
                    "Should I consider measurements before purchasing my furniture?"
                  }
                  body={
                    "When purchasing any furniture items it is vital to correctly measure the relevant space. We recommend that you measure the entrance, the access route by which the item (s) will enter the property and the space that it will occupy. Please do use our online Room Planner; it is a great way to fit furniture to scale into your home plan."
                  }
                />
              </div>
              {/* ////////////////////////////// */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FaqComponent;

import React, {useRef, useEffect} from 'react'
import { useHistory } from 'react-router-dom';


function Checkout() {
  const paypal = useRef();
  const history = useHistory();
  const orderdetails = JSON.parse(localStorage.getItem('order'));
  const price = localStorage.getItem('price');
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Name of room/service",
                amount: {
                  currency_code: "CAD",
                  value: price ,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
           alert("Payment Successful");
           localStorage.removeItem('price');
           
        //    axios.put("http://localhost:8082/checkout/" + _id,
        //  { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        //     .then(response => {
        //         if (response.data != null) {
        //             this.setState({ "show": true });
        //             setTimeout(() => this.setState({ "show": false }), 3000);
        //             this.setState({
        //                 orders: this.state.orders.filter(order => order._id !== _id)
                          
        //             });
                    
        //          } else {
        //              this.setState({ "show": false });
        //          }
        //      });
           history.push("/receptionist/activeorder");
         

        },
        onError: (err) => {
          console.log(err);
          
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
    
}

export default Checkout
